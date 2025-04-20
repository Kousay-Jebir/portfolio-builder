from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch
from models.schema import ResumeRequest,AnalysisResponse
model_id = "google/gemma-2b"

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, device_map="auto", torch_dtype="auto")

def analyze_resume(data: ResumeRequest) -> AnalysisResponse:
    pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)
    res = pipe("Give me 3 missing fields in this resume JSON:", max_new_tokens=200)
    return AnalysisResponse(missing_fields=[res], questions=[])
