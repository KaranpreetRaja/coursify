import sys
import os
import re
import json

from firebase_admin import firestore

# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from db_service.database import get_db
from common.comms import start_consuming_service, request_service, request_service_with_response


def handle_course_db_requests(data):
    print(f"Handling course db requests with action: {data['action']}")

    try:
        if data["action"] == "create_course":
            course_data = {
                "course_name": data["course_name"],
                "course_description": data["course_description"],
                "course_author_uid": data["uid"],
                "course_material": data["pdf_material"],
                # "course_topics": data["topics"]
            }
            course_ref = course_collection.add(course_data)
            print(f"Course created with name: {data['course_name']} and id: {course_ref[1].id}") 
            course_id = course_ref[1].id

            return {
                "status": "success",
                "message": "Course created",
                "course_id": course_id
            }
        
        elif data["action"] == "add_lessons_to_course":
            course_id = data["course_id"]
            lessons = data["lessons"]

            course_ref = course_collection.document(course_id)
            course_ref.update({"lessons": lessons})

            print(f"Lessons added to course with id: {course_id}")

            return {
                "status": "success",
                "message": "Lessons added to course"
            }

        elif data["action"] == "get_course":
            course_id = data["course_id"]
            course_ref = course_collection.document(course_id)
            course_data = course_ref.get()

            return {
                "status": "success",
                "message": "Course retrieved",
                "course_data": course_data.to_dict()
            }
        
        elif data["action"] == "get_courses_by_author":
            author_uid = data["uid"]
            courses = course_collection.where("course_author_uid", "==", author_uid).stream()

            course_data = []
            for course in courses:
                course_data.append(course.to_dict())

            return {
                "status": "success",
                "message": "Courses retrieved",
                "courses": course_data
            }


    except Exception as e:
        print(f"Error handling request: {e}")
        return {
            "status": "error",
            "message": f"Error handling request {e}"
        }

db = get_db()

course_collection = db.collection("courses")

def start_course_db_consumer():
    start_consuming_service("course_db", handle_request_func=handle_course_db_requests)