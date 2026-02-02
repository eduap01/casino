from fastapi import APIRouter
from backend.services.now_playing_cache import get_now_playing_cached

router = APIRouter(prefix="/api/music", tags=["music"])

@router.get("/now-playing")
async def now_playing():
    try:
        return await get_now_playing_cached()
    except Exception:
        return {"isPlaying": False}
