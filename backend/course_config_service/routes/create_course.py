from fastapi import APIRouter, Depends, HTTPException, status, File, Form, UploadFile
from typing import List
from ...common.comms import request_service_with_response, request_service

course_create_router = APIRouter()


'''
HTTP POST /api/course_config/create/create_course_topics
Creates a new course in the database

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_name": "string",
    "course_description": "string",
}
Files will be sent using File from fastapi

Response Body:
{
    "course_id": "string",
    "topics": [
        "string", "string", "string", ...
    ]
}

Error Body:
{
    "detail": "string"
}
'''
@course_create_router.post("/create_course_topics")
async def create_course_material(
    uid: str = Form(...),
    session_id: str = Form(...),
    course_name: str = Form(...),
    course_description: str = Form(...),
    files: List[UploadFile] = File(...)
    ):


    data = {
        "action": "create_course_topics",
        "uid": uid,
        "session_id": session_id,
        "course_name": course_name,
        "course_description": course_description,
        "pdf_material": pdf_content,
    }


'''
HTTP POST /api/course_config/create/set_course_topics
Sets the topics for a course in the database

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_id": "string",
    "topics": [
        "string", "string", "string", ...
    ]
}

Response Body:
{
    "status": "success"
}

Error Body:
{
    "detail": "string"
}
'''
@course_create_router.post("/set_course_topics")
async def set_course_topics(
    uid: str = Form(...),
    session_id: str = Form(...),
    course_id: str = Form(...),
    topics: List[str] = Form(...)
    ):

    data = {
        "action": "set_course_topics",
        "uid": uid,
        "session_id": session_id,
        "course_id": course_id,
        "topics": topics
    }
