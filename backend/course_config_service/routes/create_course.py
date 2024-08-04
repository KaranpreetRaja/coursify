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

    print("Creating course material")
    print(f"COURSE NAME\n: {course_name} \nCOURSE DESCRIPTION\n: {course_description} \nFILES\n: {files} \nUID\n: {uid} \nSESSION ID\n: {session_id} ") 

    for file in files:
        print(f"FILE: {file.filename}")


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

    print("Setting course topics")
    print(f"COURSE ID\n: {course_id} \nTOPICS\n: {topics} \nUID\n: {uid} \nSESSION ID\n: {session_id} ")


