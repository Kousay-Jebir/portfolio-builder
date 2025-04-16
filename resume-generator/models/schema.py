from pydantic import BaseModel
from typing import Optional, List
class Project(BaseModel):
    title: str
    description: Optional[str] = None
    tech_stack: Optional[List[str]] = []
    link: Optional[str] = None

class Experience(BaseModel):
    company: str
    position: str
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None

class Education(BaseModel):
    institution: str
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    grade: Optional[str] = None

class Certification(BaseModel):
    name: str
    issuer: Optional[str] = None
    date: Optional[str] = None
    link: Optional[str] = None

class SocialLinks(BaseModel):
    github: Optional[str] = None
    linkedin: Optional[str] = None
    website: Optional[str] = None
    other: Optional[List[str]] = []

class Portfolio(BaseModel):
    skills: Optional[List[str]] = []
    projects: Optional[List[Project]] = []
    experience: Optional[List[Experience]] = []
    education: Optional[List[Education]] = []
    certifications: Optional[List[Certification]] = []
    achievements: Optional[List[str]] = []
    interests: Optional[List[str]] = []
    social_links: Optional[SocialLinks] = None

class User(BaseModel):
    id: str
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    languages: Optional[List[str]] = []

class JobTarget(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

class ResumeRequest(BaseModel):
    user: User
    portfolio: Portfolio
    job_target: Optional[JobTarget] = None

# === Analysis Response ===
class AnalysisResponse(BaseModel):
    missing_fields: List[str]
    questions: List[str]
