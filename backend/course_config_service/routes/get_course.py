from fastapi import APIRouter, Depends, HTTPException, status

course_get_router = APIRouter()

''''
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
    lessons_loaded: int,
    all_lessons_loaded: bool,

    // THE FOLLOWING FIELDS WILL BE NULL IF lessons_loaded is 0
    "Lessons": [
        {
            "lesson_id": "string",
            "lesson_name": "string",
            "lesson_description": "string",
            "lesson_material": [
                {
                    "material_id": "string",
                    "material_name": "string",
                    "material_type": "string",
                    "material_link": "string",
                }
            ]
        }
    ]

    quizzes_loaded: int,
    all_quizzes_loaded: bool,

    // lessons_loaded >= quizzes_loaded
    // THE FOLLOWING FIELDS WILL BE NULL IF quizzes_loaded is 0

    "Quizzes": [
        {
            "quiz_id": "string",
            "quiz_name": "string",
            "quiz_description": "string",
            "quiz_questions": [
                {
                    "question_id": "string",
                    "question_text": "string",
                    "question_type": "string",
                    "question_options": [
                        {
                            "option_id": "string",
                            "option_text": "string",
                            "option_correct": "bool"
                        }
                    ]
                }
            ]
        }
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
        "course_name": "string",
        "course_description": "string",
        "Lessons": [
            {
                "lesson_id": "string",
                "lesson_name": "string",
                "lesson_description": "string",
                "lesson_material": [
                    {
                        "material_id": "string",
                        "material_name": "string",
                        "material_type": "string",
                        "material_link": "string",
                    }
                ]
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

