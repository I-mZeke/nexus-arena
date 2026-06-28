from fastapi import APIRouter

router = APIRouter()

leaderboard_data = [
    {"rank": 1, "player": "ShadowStrike", "game": "Valorant", "wins": 47, "losses": 8, "winrate": 85.5},
    {"rank": 2, "player": "NeonBlaze", "game": "CS2", "wins": 42, "losses": 11, "winrate": 79.2},
    {"rank": 3, "player": "PhantomX", "game": "League of Legends", "wins": 38, "losses": 14, "winrate": 73.1},
    {"rank": 4, "player": "CryptoKnight", "game": "Valorant", "wins": 35, "losses": 15, "winrate": 70.0},
    {"rank": 5, "player": "StormRider", "game": "CS2", "wins": 31, "losses": 18, "winrate": 63.3},
]

@router.get("/")
def get_leaderboard(game: str = None):
    if game:
        return [p for p in leaderboard_data if p["game"].lower() == game.lower()]
    return leaderboard_data