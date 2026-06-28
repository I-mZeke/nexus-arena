from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()

# Data en memoria para la demo
tournaments_db = [
    {"id": 1, "name": "Valorant Cup #1", "game": "Valorant", "slots": 16, "registered": 12, "status": "open", "date": "2024-07-15"},
    {"id": 2, "name": "CS2 Championship", "game": "Counter-Strike 2", "slots": 32, "registered": 28, "status": "open", "date": "2024-07-20"},
    {"id": 3, "name": "LoL Summer Split", "game": "League of Legends", "slots": 8, "registered": 8, "status": "full", "date": "2024-07-10"},
]

class Tournament(BaseModel):
    name: str
    game: str
    slots: int
    date: str

@router.get("/")
def get_tournaments():
    return tournaments_db

@router.post("/")
def create_tournament(t: Tournament):
    new = {"id": len(tournaments_db) + 1, **t.dict(), "registered": 0, "status": "open"}
    tournaments_db.append(new)
    return new

@router.post("/{tournament_id}/join")
def join_tournament(tournament_id: int):
    for t in tournaments_db:
        if t["id"] == tournament_id:
            if t["registered"] < t["slots"]:
                t["registered"] += 1
                if t["registered"] == t["slots"]:
                    t["status"] = "full"
                return {"message": "Inscripción exitosa", "tournament": t}
            raise Exception("Torneo lleno")
    return {"error": "No encontrado"}