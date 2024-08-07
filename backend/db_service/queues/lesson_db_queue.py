import sys
import os
import re
import json

from firebase_admin import firestore

# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from db_service.database import get_db
from common.comms import start_consuming_service, request_service, request_service_with_response


def handle_lesson_db_requests(data):
    print(f"Handling lesson db requests with action: {data['action']} and data: {data}")

    try:
        if data["action"] == "create_lesson":

            lesson_data = {
                "lesson_name": data["lesson_name"],
                "lesson_description": data["lesson_description"],
                "lesson_loaded": False,
                "quiz_loaded": False,

            }
            lesson_ref = lesson_collection.add(lesson_data)
            print(f"Lesson created: {lesson_ref}")
            lesson_id = lesson_ref[1].id

            return {
                "status": "success",
                "message": "Lesson created",
                "lesson_id": lesson_id
            }
        
        elif data["action"] == "add_lesson_material":
            lesson_id = data["lesson_id"]
            lesson_material = data["lesson_material"]

            lesson_ref = lesson_collection.document(lesson_id)
            lesson_ref.update({"lesson_material": lesson_material})
            lesson_ref.update({"lesson_loaded": True})

            return {
                "status": "success",
                "message": "Lesson material added"
            }

        elif data["action"] == "add_quiz":
            lesson_id = data["lesson_id"]
            quiz = data["quiz"]

            lesson_ref = lesson_collection.document(lesson_id)
            lesson_ref.update({"questions": quiz})
            lesson_ref.update({"quiz_loaded": True})

            return {
                "status": "success",
                "message": "Quiz added"
            }

        
        elif data["action"] == "get_lesson":
            lesson_id = data["lesson_id"]
            lesson_ref = lesson_collection.document(lesson_id)
            lesson_data = lesson_ref.get()

            return {
                "status": "success",
                "message": "Lesson retrieved",
                "lesson_data": lesson_data.to_dict()
            }
        
        elif data["action"] == "get_quiz":
            lesson_id = data["lesson_id"]
            lesson_ref = lesson_collection.document(lesson_id)
            lesson_data = lesson_ref.get()

            return {
                "status": "success",
                "message": "Quiz retrieved",
                "quiz_loaded": lesson_data.to_dict()["quiz_loaded"],
                "lesson_name": lesson_data.to_dict()["lesson_name"],
                "quiz": lesson_data.to_dict()["questions"]
            }

        elif data["action"] == "get_lesson_loaded":
            lesson_id = data["lesson_id"]
            lesson_ref = lesson_collection.document(lesson_id)
            lesson_data = lesson_ref.get()

            return {
                "status": "success",
                "message": "Lesson retrieved",
                "lesson_loaded": lesson_data.to_dict()["lesson_loaded"]
            }

        elif data["action"] == "get_quiz_loaded":
            lesson_id = data["lesson_id"]
            lesson_ref = lesson_collection.document(lesson_id)
            lesson_data = lesson_ref.get()

            return {
                "status": "success",
                "message": "Lesson retrieved",
                "quiz_loaded": lesson_data.to_dict()["quiz_loaded"]
            }
        
        

    
    except Exception as e:
        print(f"Error handling lesson db request: {str(e)}")
        return {
            "status": "error",
            "message": f"Error handling lesson db request {str(e)}"
        }


lesson_collection = get_db().collection("lessons")

def start_lesson_db_consumer():
    start_consuming_service("lesson_db", handle_request_func=handle_lesson_db_requests)