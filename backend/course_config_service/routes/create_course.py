from fastapi import APIRouter, Depends, HTTPException, status

course_create_router = APIRouter()

'''
HTTP POST /api/course_config/create/create_course_material
Creates a new course in the database

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_name": "string",
    "course_description": "string",
    "files": [
        {
            "file_name": "string",
            "content": "blob",
        },
        ...
    ]
}

Response Body:
{
    "course_id": "string"
}

Error Body:
{
    "detail": "string"
}
'''
