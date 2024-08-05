from fastapi import APIRouter, Depends, HTTPException, status, File, Form, UploadFile
from pypdf import PdfReader 
from typing import List, Optional
import sys
import os

# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))


from fastapi import APIRouter, HTTPException
from common.comms import request_service_with_response

course_create_router = APIRouter()


'''
HTTP POST /api/course_config/create/create_course_topics
Generates topics that a course can be made from

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_name": "string",
    "course_description": "string"
}
Files will be sent using File from fastapi

Response Body:
{
    "course_id": "string",
    "topics": [
        {
            "topic": "string",
            "explanation": "string"
        },
        {
            "topic": "string",
            "explanation": "string"
        },
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
    try:
        pdf_content = extract_text_from_pdfs(files)    
        # pdf_content = files
        data = {
            "action": "create_course_topics",
            "uid": uid,
            "course_name": course_name,
            "course_description": course_description,
            "pdf_material": pdf_content,
        }

        response = request_service_with_response("topic_gen", data)

        if response["status"] == "error":
            print("Error in response from course_gen")
            raise HTTPException(status_code=400, detail=response["message"])

        response_topics = response["topics"]

        return {
            "course_id": response["course_id"],
            "topics": response_topics
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



def extract_text_from_pdfs(pdf_paths):
    extracted_text = {}
    for pdf_path in pdf_paths:
        pdf = PdfReader(pdf_path)
        text = ''

        for page in pdf.pages:
            text += page.extract_text()
        extracted_text[pdf_path] = text
    return extracted_text

'''
HTTP POST /api/course_config/create/set_course_topics
Sets the topics for a course in the database

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_id": "string",
    "topics": [
    {
        "topic": "string",
        "explanation": "string"
    },
    {
        "topic": "string",
        "explanation": "string"
    }
    ...
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

    try:
        data = {
            "action": "set_topics",
            "uid": uid,
            "course_id": course_id,
            "topics": topics
        }

        response = request_service_with_response("course_gen", data)

        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])
        
        return {
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    