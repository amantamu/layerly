from fastapi import FastAPI

app = FastAPI(
    title="Layerly API",
    description="Layerly backend API",
    version="0.0.0",
)


@app.get("/")
async def root():
    return {"message": "Welcome to Layerly API"}


@app.get("/health")
async def health():
    return {"status": "healthy"}

