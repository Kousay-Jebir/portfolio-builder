from models.schema import ResumeRequest, AnalysisResponse

from transformers import pipeline

from config import settings
def analyze_resume(data: ResumeRequest) -> AnalysisResponse:
    missing_fields = []
    questions = []

    generator = pipeline('text-generation', model='gpt2')

    input_text = "give me a the perfect profile for a softwar engineer"
    output = generator(input_text)

    print(output[0]['generated_text'])

    missing_fields.append(output[0]["generated_text"])




    return AnalysisResponse(missing_fields=missing_fields, questions=questions)
