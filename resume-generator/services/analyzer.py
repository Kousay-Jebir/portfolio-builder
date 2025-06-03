
import os
import json
import requests
from dotenv import load_dotenv
from typing import Generator
from models.schema import ResumeRequest

load_dotenv(dotenv_path=".env.development") 

OLLAMA_API_URL = os.getenv("OLLAMA_API_URL")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL")

def build_prompt(portfolio_str: str) -> str:
    return f"""
Here is a resume:

{portfolio_str}

List missing or weak fields in this resume.
Just output the missing field names in a json format {"missing" } and the missing field is a list.
"""

def analyze_resume(portfolio_str: ResumeRequest) -> Generator[str, None, None]:
    prompt = build_prompt(portfolio_str.portfolio)
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": True
    }

    with requests.post(OLLAMA_API_URL, json=payload, stream=True) as response:
        for line in response.iter_lines():
            if line:
                chunk = json.loads(line)
                if "response" in chunk:
                    yield chunk["response"]
