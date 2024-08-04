from fastapi import APIRouter, Depends, HTTPException, status

course_get_router = APIRouter()

'''
HTTP GET /api/course_config/get/get_course
Gets the course information from the database

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_id": "string",
}

Response Body:
{
    "course_name": "string",
    "course_description": "string",
 
    "Lessons": [
        {
            "lesson_id": "string",
            "lesson_name": "string",
            "lesson_description": "string",
            "lesson_loaded": "bool",
        },
        ...
    ]
}

Error Body:
{
    "detail": "string"
}
'''
@course_get_router.get("/get_course")
async def get_course(
    uid: str,
    session_id: str,
    course_id: str
    ):

    print("Getting course")
    print(f"COURSE ID\n: {course_id} \nUID\n: {uid} \nSESSION ID\n: {session_id} ") 

    return {
        "course_name": "course 1",
        "course_description": "This is course 1",
        "Lessons": [
            {
                "lesson_id": "lesson_1",
                "lesson_name": "lesson 1",
                "lesson_description": "This is lesson 1",
                "lesson_loaded": "true"
            }
        ]
    }

'''
HTTP GET /api/course_config/get/get_lesson
Gets the lesson information from the database

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_id": "string",
    "lesson_id": "string",
}

Response Body:
{
    "lesson_name": "string",
    "lesson_description": "string",
    "lesson_loaded": "bool",

    // If lesson_loaded is false, material will be Null
    "material: "string", // material will be in Latex format
}

Error Body:
{
    "detail": "string"
}
'''
@course_get_router.get("/get_lesson")
async def get_lesson(
    uid: str,
    session_id: str,
    course_id: str,
    lesson_id: str
    ):

    print("Getting lesson")
    print(f"COURSE ID\n: {course_id} \nLESSON ID\n: {lesson_id} \nUID\n: {uid} \nSESSION ID\n: {session_id} ") 

    return {
        "lesson_name": "lesson 1",
        "lesson_description": "This is lesson 1",
        "lesson_loaded": "true",
        "material": """
# Lesson 1

## Introduction
This is the introduction to lesson 1

## Body
This is the body of lesson 1
"""
    }
 


'''
GET /api/course_config/get/get_quiz
Gets the quiz information from the database

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_id": "string",
    "lesson_id": "string",
}

Response Body:
{
    "name": "string",
    "quiz_loaded": "bool",

    // If quiz_loaded is false, questions will be empty
    "questions": [
        {
            "question_type": "string", // "multiple_choice" or "true_false"
            
            // If question_type is "true_false", options will be empty
            "options": [
                "string", "string", "string", ...
            ],
            "question": "string",
            "answer": "string"
        },
        ...
    ]
}

Error Body:
{
    "detail": "string"
}
'''
@course_get_router.get("/get_quiz")
async def get_quiz(
    uid: str,
    session_id: str,
    course_id: str,
    lesson_id: str
    ):

    print("Getting quiz")
    print(f"COURSE ID\n: {course_id} \nLESSON ID\n: {lesson_id} \nUID\n: {uid} \nSESSION ID\n: {session_id} ")

    return {
        "name": "quiz 1",
        "quiz_loaded": "true",
        "questions": [
            {
                "question_type": "multiple_choice",
                "question": "What is the powerhouse of the cell?",
                "options": [
                    "Mitochondria",
                    "Nucleus",
                    "Ribosome",
                    "Golgi Apparatus"
                ],
                "answer": "Mitochondria"
            }
        ]
    }


'''
HTTP GET /api/course_config/get/get_all_courses_user
Gets all the courses that a user owns

Request Body:
{
    "uid": "string",
    "session_id": "string",
}

Response Body:
{
    "courses": [
        {
            "course_id": "string",
            "course_name": "string",
            "course_description": "string",
        },
        ...
    ]
}

Error Body
{
    "detail": "string"
}
'''
@course_get_router.get("/get_all_courses_user")
async def get_all_courses_user(
    uid: str,
    session_id: str
    ):

    print("Getting all courses user")
    print(f"UID\n: {uid} \nSESSION ID\n: {session_id} ") 

    return {
        "courses": [
            {
                "course_id": "string",
                "course_name": "string",
                "course_description": "string",
            }
        ]
    }


'''
HTTP GET /api/course_config/get/get_all_courses_trending
Gets all the courses that are trending

Request Body:
{
    "uid": "string",
    "session_id": "string",
}

Response Body:
{
    "courses": [
        {
            "course_id": "string",
            "course_name": "string",
            "course_description": "string",
        },
        ...
    ]
}
'''
@course_get_router.get("/get_all_courses_trending")
async def get_all_courses_trending(
    uid: str,
    session_id: str
    ):

    print("Getting all courses trending")
    print(f"UID\n: {uid} \nSESSION ID\n: {session_id} ") 

    return {
        "courses": [
            {
                "course_id": "string",
                "course_name": "string",
                "course_description": "string",
            }
        ]
    }

