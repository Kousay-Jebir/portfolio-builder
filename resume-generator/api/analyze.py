from fastapi import APIRouter
from models.schema import ResumeRequest, AnalysisResponse
from services.analyzer import analyze_resume

router = APIRouter()

@router.post("/analyze-portfolio", response_model=AnalysisResponse)
def analyze_portfolio(data: ResumeRequest):
    return analyze_resume(data)
