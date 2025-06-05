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

def build_resume_parser_prompt(resume_text: str) -> str:
    return f"""
You are an AI resume parser. Convert the following raw resume text into a structured JSON format:

Input resume:
{resume_text}

Convert this into a clean JSON structure with these fields:
{{
  "portfolio": {{
    "skills": ["list", "of", "skills"],
    "projects": [
      {{
        "title": "Project Name",
        "description": "Project description",
        "tech_stack": ["technologies", "used"],
        "link": "URL if available"
      }}
    ],
    "experience": [
      {{
        "company": "Company Name",
        "position": "Job Title",
        "location": "Location",
        "start_date": "Start Date",
        "end_date": "End Date",
        "description": "Job responsibilities"
      }}
    ],
    "education": [
      {{
        "institution": "School Name",
        "degree": "Degree",
        "field_of_study": "Major",
        "start_date": "Start Year",
        "end_date": "End Year"
      }}
    ],
    "certifications": [
      {{
        "name": "Certification Name",
        "issuer": "Issuing Organization",
        "date": "Date Earned"
      }}
    ],
    "achievements": ["list", "of", "achievements"],
    "interests": ["list", "of", "interests"],
    "social_links": {{
      "github": "URL",
      "linkedin": "URL",
      "website": "URL"
    }}
  }},
  "job_target": {{
    "title": "Desired Job Title",
    "description": "Career objective"
  }}
 
Rules:
1. Extract and organize all available information
2. For missing fields, use empty arrays/objects
3. Never add fields that don't exist in the template
4. Output ONLY valid JSON, no additional text
"""

def parse_resume(raw_resume: str)->dict :

    prompt = build_resume_parser_prompt(raw_resume)
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": True,
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
                return "error"
    return json.loads(full_response)
    

   
        
 