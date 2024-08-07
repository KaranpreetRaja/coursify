from fastapi import APIRouter, Depends, HTTPException, status
import json

from common.comms import request_service_with_response

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
    try:
        print(f"Request received: Getting course {course_id}")

        payload = {
            "action": "get_course",
            "course_id": course_id
        }

        response = request_service_with_response("course_db", payload)

        print(f"Response received: {response}")
        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])

        return json.dumps(response["course_data"])
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



    

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

    "quiz_loaded": bool,

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
@course_get_router.get("/get_lesson")
async def get_lesson(
    uid: str,
    session_id: str,
    course_id: str,
    lesson_id: str
    ):
    try:
        payload = {
            "action": "get_lesson",
            "lesson_id": lesson_id
        }

        response = request_service_with_response("lesson_db", payload)

        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])

        return json.dumps(response["lesson_data"])

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

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
    "lesson_name": "string",
    "quiz_loaded": "bool",

    // If quiz_loaded is false, questions will be empty
    "questions":{
        "Multiple Choice Questions": [
            {
                "question": "string",
                "options": [
                    "string", "string", "string", ...
                ],
                "answer": "string"
            },
            ...
        ],
        "True/False Questions": [
            {
                "question": "string",
                "answer": "string"
            },
            ...
        ]
    }
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

    try:
        payload = {
            "action": "get_quiz",
            "lesson_id": lesson_id
        }

  
        response = request_service_with_response("lesson_db", payload)
        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=f"Error getting quiz: {response['message']}")

        return json.dumps(response["quiz"])

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 


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

    try:
        print("Getting all courses user")
        print(f"UID\n: {uid} \nSESSION ID\n: {session_id} ") 

        payload = {
            "action": "get_courses_by_author",
            "uid": uid
        }

        response = request_service_with_response("course_db", payload)

        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])

        return json.dumps(response["courses"])
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


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

'''
HTTP GET /api/course_config/get/get_lesson_loaded
Checks if a lesson is loaded

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_id": "string",
    "lesson_id": "string",
}

Response Body:
{
    "lesson_loaded": "bool",
}

Error Body:
{
    "detail": "string"
}
'''
@course_get_router.get("/get_lesson_loaded")
async def get_lesson_loaded(
    uid: str,
    session_id: str,
    course_id: str,
    lesson_id: str
    ):

    try:
        payload = {
            "action": "get_lesson_loaded",
            "lesson_id": lesson_id
        }

        response = request_service_with_response("lesson_db", payload)

        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])

        return json.dumps(response["lesson_loaded"])
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

'''
HTTP GET /api/course_config/get/get_quiz_loaded
Checks if a quiz is loaded

Request Body:
{
    "uid": "string",
    "session_id": "string",

    "course_id": "string",
    "lesson_id": "string",
}

Response Body:
{
    "quiz_loaded": "bool",
}

Error Body:
{
    "detail": "string"
}
'''
@course_get_router.get("/get_quiz_loaded")
async def get_quiz_loaded(
    uid: str,
    session_id: str,
    course_id: str,
    lesson_id: str
    ):

    try:
        payload = {
            "action": "get_quiz_loaded",
            "lesson_id": lesson_id
        }

        response = request_service_with_response("lesson_db", payload)

        if response["status"] == "error":
            raise HTTPException(status_code=400, detail=response["message"])

        return json.dumps(response["quiz_loaded"])
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    