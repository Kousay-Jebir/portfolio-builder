from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from services.test import stream_chat_response

router = APIRouter()

@router.post("/test")
async def chat(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "Hello!")

    return StreamingResponse(stream_chat_response(prompt), media_type="text/plain")

