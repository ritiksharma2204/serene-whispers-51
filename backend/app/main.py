from fastapi import FastAPI, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.websocket import manager
from app.database import engine, get_db
from app.models import Base, User
from app.schemas import UserRegister, UserLogin
from app.auth import hash_password, verify_password

app = FastAPI(title="Signal Clone Backend")



app = FastAPI(title="Signal Clone Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",
        "http://127.0.0.1:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}


@app.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == user.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Created",
        "id": new_user.id,
    }


@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == user.email).first()

    if not existing:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, existing.password):
        raise HTTPException(status_code=401, detail="Wrong password")

    return {
        "message": "Login Success",
        "user_id": existing.id,
        "username": existing.username,
    }

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):

    await manager.connect(user_id, websocket)

    try:
        while True:

            data = await websocket.receive_json()

            receiver = data["receiver_id"]

            await manager.send_personal_message(
                receiver,
                {
                    "sender_id": user_id,
                    "message": data["message"]
                }
            )

    except WebSocketDisconnect:
        manager.disconnect(user_id)