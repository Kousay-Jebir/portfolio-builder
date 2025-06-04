
import os
import json
import requests
from dotenv import load_dotenv
from typing import Generator
from models.schema import ResumeRequest
import re
from models.constants import VALID_FIELDS
load_dotenv(dotenv_path=".env") 

OLLAMA_API_URL = os.getenv("OLLAMA_API_URL")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL")

def build_prompt(portfolio_str: str) -> str:
    return f"""
You are an AI assistant that evaluates resumes. Your job is to analyze the following resume content and identify which of the following fields are either missing or weakly described:

["skills", "projects", "experience", "education", "certifications", "achievements", "interests", "social_links", "job_target"]

Resume content:
{portfolio_str}

Respond with only a JSON object in this exact format:
{{
  "missing": ["field1", "field2", ...]
}}

Only include fields from the provided list. Do not include explanations or any text outside the JSON. If all fields are present and well elaborated, respond with:
{{ "missing": [] }}
"""


def extract_valid_fields(raw_response: str) -> list[str]:
    try:
        data = json.loads(raw_response)
        raw_items = data.get("missing", [])
    except json.JSONDecodeError:
        raw_items = json.loads(raw_response)

    extracted = []
    for item in raw_items:

        clean = re.split(r"\s|\(", item)[0].strip().lower()
        if clean in VALID_FIELDS:
            extracted.append(clean)
    return list(set(extracted)) 

def analyze_resume(portfolio_str: ResumeRequest) -> list[str]:
    prompt = build_prompt(portfolio_str.portfolio)
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": True
    }

    response = requests.post(OLLAMA_API_URL, json=payload, stream=True)
    response.raise_for_status()

    full_response = ""
    buffer = ""

    for line in response.iter_lines():
        if line:
            try:
                buffer += line.decode('utf-8')
                while buffer:
                    try:
                        chunk = json.loads(buffer)
                        buffer = "" 
                        if "response" in chunk:
                            full_response += chunk["response"]
                    except json.JSONDecodeError:
                        break
            except UnicodeDecodeError:
                continue
    return extract_valid_fields(full_response)
