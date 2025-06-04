from fastapi import APIRouter
from models.schema import ResumeRequest
from services.analyzer import analyze_resume
from fastapi.responses import StreamingResponse

router = APIRouter()

# @router.post("/analyze-portfolio", response_class=StreamingResponse)
# def analyze_portfolio(data: ResumeRequest):
#     return analyze_resume(data)
@router.post("/analyze-portfolio")
async def analyze_portfolio(payload: ResumeRequest):
    missing_fields = analyze_resume(payload)
    return {"missing": missing_fields}
