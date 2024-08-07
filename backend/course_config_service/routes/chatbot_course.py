from fastapi import APIRouter, FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from typing import List, Dict
import sys
import os

# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from common.comms import request_service_with_response

from ai71 import AI71
from dotenv import load_dotenv

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

chat_bot_router = APIRouter()

sessions = {}

@chat_bot_router.post("/start_session")
async def start_session(context: str):
    session_id = "some_unique_session_id"  # Replace with actual session management
    messages = [
        {"role": "system", "content": "You are a helpful teacher."},
        {"role": "user", "content": f"Answer the questions based on the text: {context}. Answer in great detail, with proper examples."},
    ]
    sessions[session_id] = messages
    return JSONResponse({"session_id": session_id})

@chat_bot_router.post("/use_session")
async def use_session(session_id: str, question: str):
    if session_id not in sessions:
        return JSONResponse({"error": "Invalid session ID"}, status_code=400)
    
    sessions[session_id].append({"role": "user", "content": question})
    return JSONResponse({"message": "Question added to session"})

@chat_bot_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, session_id: str, lesson_id: str):
    await websocket.accept()

    if session_id not in sessions:
        await websocket.close()
        return

    try:
        load_dotenv()
        api_key = os.getenv('API_KEY')

        client = AI71(api_key)

        lesson_payload = {
            "action": "get_lesson",
            "lesson_id": lesson_id
        }

        lesson_content = request_service_with_response("lesson_db", lesson_payload)["lesson_material"]

        #lesson content
        messages = [
                {"role": "system", "content": "You are a helpful teacher."},
                {"role": "user", "content": f"Answer the questions based to the text: {lesson_content}. Answer in great detail, with proper examples."},
                ]
        
        client.chat.completions.create(
            messages=messages,
            model="tiiuae/falcon-180B-chat",
            stream=True,
        )

        while True:
            data = await websocket.receive_text()

            # sessions[session_id] +  << Dont need this?
            messages = [{"role": "user", "content": data}]
            
            # Call your LLM model here and stream the response
            # response = requests.post(LLM_API_URL, json={"messages": messages, "model": "tiiuae/falcon-180B-chat", "stream": True})

            for chunk in client.chat.completions.create(
                messages=messages,
                model="tiiuae/falcon-180B-chat",
                stream=True,
            ):
                delta_content = chunk.choices[0].delta.content
                if delta_content:
                    await websocket.send_text(delta_content)

    except WebSocketDisconnect:
        print("Client disconnected")