from fastapi import FastAPI
from api import ask

app = FastAPI()

app.include_router(ask.router)


