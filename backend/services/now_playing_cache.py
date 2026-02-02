import time
import asyncio
from typing import Any, Dict, Optional

from backend.services.lastfm_service import get_now_playing_lastfm

TTL_SECONDS = 45          # Cada cuánto consultamos Last.fm
FAIL_BACKOFF_SECONDS = 120  # Si falla, esperamos 2 min antes de reintentar

_lock = asyncio.Lock()
_cached: Optional[Dict[str, Any]] = None
_cached_at = 0.0
_next_allowed_fetch_at = 0.0


def _is_fresh(now: float) -> bool:
    return _cached is not None and (now - _cached_at) < TTL_SECONDS


async def get_now_playing_cached() -> Dict[str, Any]:
    global _cached, _cached_at, _next_allowed_fetch_at

    now = time.time()

    # 1) Si el cache está fresco, devolvemos sin llamar a Last.fm
    if _is_fresh(now):
        return _cached  # type: ignore

    # 2) Si estamos en backoff (por fallo reciente), devolvemos el último valor
    if now < _next_allowed_fetch_at:
        return _cached or {"isPlaying": False}

    # 3) Solo un request a la vez refresca el cache
    async with _lock:
        now = time.time()

        if _is_fresh(now):
            return _cached  # type: ignore

        if now < _next_allowed_fetch_at:
            return _cached or {"isPlaying": False}

        try:
            data = await get_now_playing_lastfm()

            # Si viene raro/vacío, no destrozamos la respuesta
            if not data or "isPlaying" not in data:
                data = {"isPlaying": False}

            _cached = data
            _cached_at = time.time()
            return data

        except Exception:
            _next_allowed_fetch_at = time.time() + FAIL_BACKOFF_SECONDS
            return _cached or {"isPlaying": False}
