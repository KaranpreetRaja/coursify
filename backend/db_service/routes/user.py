from fastapi import APIRouter, HTTPException, Depends
import random
import time
from firebase_admin import db, auth

db_user_router = APIRouter()


'''
HTTP POST /api/db/user/register_user
Registers a new user with Firebase Authentication

Request Body:
{
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string"
}

Response Body:
{
    "uid": "string",
    "session_id": "string"
}

Error Body:
{
    "detail": "string"
}
'''
# app.include_router(db_user_router, prefix="/api/db/user", dependencies=[Depends(lambda: db), Depends(lambda: auth)])
@db_user_router.post("/register_user")
async def register_user(user: dict, db: db.Client = Depends(lambda: db_user_router), auth: auth.Client = Depends(lambda: auth)):
    try:
        # Create a new user with Firebase Authentication
        user = auth.create_user(
            email=user["email"],
            password=user["password"],
            display_name=user["first_name"] + " " + user["last_name"]
        )
        
        # Create a new session for the user using a random session_id
        session_id = random.randint(100000000, 999999999)
        user_sessions = db.collection("user_sessions")
        user_sessions.document(str(session_id)).set({
            "uid": user.uid,
            "created_at": int(time.time())
        })

        return {"uid": user.uid, "session_id": str(session_id)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

''''
HTTP PUT /api/db/user/login_user
Logs in an existing user with Firebase Authentication

Request Body:
{
    "email": "string",
    "password": "string"
}

Response Body:
{
    "uid": "string",
    "session_id": "string"
}

Error Body:
{
    "detail": "string"
}
'''
@db_user_router.put("/login_user")
async def login_user(user: dict):
    try:
        user = auth.get_user_by_email(user["email"])
        session_id = random.randint(100000000, 999999999)
        user_sessions.document(str(session_id)).set({
            "uid": user.uid,
            "created_at": int(time.time())
        })

        return {"uid": user.uid, "session_id": str(session_id)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

'''
HTTP GET /api/db/user/validate_session
Validates a user's session

Request Body:
{
    "uid": "string",
    "session_id": "string"
}

Response Body:
{
    "valid": "bool"
}

Error Body:
{
    "detail": "string"
}
'''
@db_user_router.get("/validate_session")
async def validate_session(uid: str, session_id: str):
    try:
        session = user_sessions.document(session_id).get()

        if session.exists:
            session = session.to_dict()
            # Check if the session belongs to the user and if it has not expired (1 hour)
            if session["uid"] == uid and (int(time.time()) - session["created_at"] < 3600):
                return {"valid": True}
            else:
                return {"valid": False}
        else:
            return {"valid": False}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
'''
HTTP DELETE /api/db/user/logout_user
Logs out a user by deleting their session

Request Body:
{
    "session_id": "string"
}

Response Body:
{
    "success": "bool"
}

Error Body:
{
    "detail": "string"
}
'''
@db_user_router.delete("/logout_user")
async def logout_user(session_id: str):
    try:
        user_sessions.document(session_id).delete()
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

