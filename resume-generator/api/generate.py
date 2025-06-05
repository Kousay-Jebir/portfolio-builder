from fastapi import APIRouter
from models.schema import GenerationRequest
from services.generator import parse_resume

router = APIRouter()

@router.post("/generate-resume")
async def generate_resume(payload: GenerationRequest):
    return parse_resume(payload.profile)
