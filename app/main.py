from fastapi import FastAPI

from app.api.routes import router


app = FastAPI(
    title="RecoverAI",
    description=(
        "AI-powered payment recovery "
        "prioritization and decision engine."
    ),
    version="0.1.0",
)


app.include_router(router)


@app.get("/")
def root():

    return {
        "name": "RecoverAI",
        "status": "running",
        "message": (
            "AI-powered payment recovery system"
        ),
    }