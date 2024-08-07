import sys
import os
# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))


from fastapi import APIRouter, HTTPException
from common.comms import request_service_with_response
import logging
import httpx

from dotenv import load_dotenv
load_dotenv()
user_router = APIRouter()

'''
HTTP POST /api/user/register_user
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
@user_router.post("/register_user")
async def register_user(
    user: dict,
   ):
    try:
        data = {
            "action": "register_user",
            "email": user["email"],
            "password": user["password"],
            "first_name": user["first_name"],
            "last_name": user["last_name"]
        }
        response = request_service_with_response("user_queue", data)

        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    


''''
HTTP PUT /api/user/login_user
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
@user_router.put("/login_user")
async def login_user(
    email: str,
    password: str
    ):
    try:
        FIREBASE_WEB_API_KEY = os.getenv("FIREBASE_WEB_API_KEY")
        async with httpx.AsyncClient() as client:
            print(f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_WEB_API_KEY}")
            response = await client.post(
                f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_WEB_API_KEY}",
                json={
                    "email": email,
                    "password": password,
                    "returnSecureToken": True
                }
            )
        
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail=response.json()["error"]["message"])
        
        return {
            "uid": response.json()["localId"],
            "session_id": response.json()["idToken"],
            **response.json()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))




    # try:
    #     data = {
    #         "action": "login_user",
    #         "email": email,
    #         "password": password
    #     }
    #     response = request_service_with_response("user_queue", data)

    #     if response["status"] == "error":
    #         raise HTTPException(status_code=400, detail=response["message"])
    #     return response
    # except Exception as e:
    #     raise HTTPException(status_code=400, detail=str(e))

'''
HTTP POST /api/user/validate_session
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
@user_router.post("/validate_session")
async def validate_session(session_data: dict):
    try:
        logging.info(f"Validating session for user {session_data['uid']}")

        data = {
            "action": "validate_session",
            "uid": session_data["uid"],
            "session_id": session_data["session_id"]
        }
        response = request_service_with_response("user_queue", data)

        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
'''
HTTP DELETE /api/user/logout_user
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
@user_router.delete("/logout_user")
async def logout_user(
    session_id: str
    ):
    try:
        data = {
            "action": "logout_user",
            "session_id": session_id
        }
        response = request_service_with_response("user_queue", data)

        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    