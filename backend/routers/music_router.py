from fastapi import APIRouter
from backend.services.lastfm_service import get_now_playing_lastfm

router = APIRouter(prefix="/api/music", tags=["music"])


@router.get("/now-playing")
async def now_playing():
    return await get_now_playing_lastfm()
