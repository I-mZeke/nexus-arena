from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, tournaments, leaderboard

app = FastAPI(title="NEXUS ARENA API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(tournaments.router, prefix="/api/tournaments", tags=["Tournaments"])
app.include_router(leaderboard.router, prefix="/api/leaderboard", tags=["Leaderboard"])

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "nexus-arena-api"}