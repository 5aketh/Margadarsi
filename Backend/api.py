from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scraper import *
from vertexConnect import *
from credsCheck import *

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define request models for better validation
class LoginRequest(BaseModel):
    username: str
    password: str


class JobRequest(BaseModel):
    keyword: str
    location: str
    experience: str


class NewsRequest(BaseModel):
    keyword: str


class QuestionsRequest(BaseModel):
    keyword: str
    location: str
    experience: str


class InterviewRequest(BaseModel):
    url: str
    keyword: str
    location: str
    experience: str


@app.post("/api/login")
def api_login(data: LoginRequest):
    login_stat = login(data.username, data.password)

    if len(login_stat) < 2:
        return {"message": "Wrong credentials"}

    return login_stat


@app.post("/api/jobs")
def api_scrape_jobs(data: JobRequest):
    scraped_data = scrape_jobs(data.keyword, data.location, data.experience)
    return scraped_data


@app.post("/api/news")
def api_scrape_news(data: NewsRequest):
    scraped_data = scrape_news(data.keyword)
    return scraped_data


@app.post("/api/questions")
def api_questions(data: QuestionsRequest):
    questions = fetch_questions(data.keyword, data.location, data.experience)
    return questions


@app.post("/api/interview_result")
def api_results(data: InterviewRequest):
    review = interview_result(data.url, data.keyword, data.location, data.experience)
    return review


# Run with: uvicorn main:app --reload
