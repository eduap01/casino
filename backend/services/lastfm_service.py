import os
from typing import Any, Dict

import httpx

LASTFM_URL = "https://ws.audioscrobbler.com/2.0/"


def _pick_best_image(images: list[dict]) -> str:
    order = ["extralarge", "large", "medium", "small"]
    for size in order:
        for img in images:
            if img.get("size") == size and img.get("#text"):
                return img["#text"]
    for img in images:
        if img.get("#text"):
            return img["#text"]
    return ""


async def get_now_playing_lastfm() -> Dict[str, Any]:
    api_key = os.getenv("LASTFM_API_KEY", "").strip()
    username = os.getenv("LASTFM_USERNAME", "").strip()

    # Si aún no hay config, devolvemos "no sonando"
    if not api_key or not username:
        return {"isPlaying": False}

    params = {
        "method": "user.getrecenttracks",
        "user": username,
        "api_key": api_key,
        "format": "json",
        "limit": 1,
        "extended": 1,
    }

    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.get(LASTFM_URL, params=params)

    if r.status_code >= 400:
        return {"isPlaying": False}

    js = r.json()
    tracks = (js.get("recenttracks") or {}).get("track") or []
    if not tracks:
        return {"isPlaying": False}

    track = tracks[0]
    is_playing = ((track.get("@attr") or {}).get("nowplaying") == "true")

    title = track.get("name") or ""
    artist_obj = track.get("artist") or {}
    artist = artist_obj.get("name") or artist_obj.get("#text") or ""
    album = (track.get("album") or {}).get("#text") or ""
    album_art = _pick_best_image(track.get("image") or [])
    track_url = track.get("url") or ""

    return {
        "isPlaying": bool(is_playing),
        "title": title,
        "artist": artist,
        "album": album,
        "albumArt": album_art,
        "trackUrl": track_url,
    }
