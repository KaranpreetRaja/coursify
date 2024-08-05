import sys
import os
# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from common.comms import start_consuming_service, request_service, request_service_with_response


def create_course(uid: str, course_name: str, course_description: str, pdf_material: str, topics: dict) -> dict:
    data = {
        "action": "create_course_with_topics",
        "uid": uid,
        "course_name": course_name,
        "course_description": course_description,
        "pdf_material": pdf_material,
        "topics": topics
    }
    return request_service_with_response("course_db", data)

def handle_topic_requests(data):
    uid = data["uid"]
    action = data["action"]
    course_name = data["course_name"]
    course_description = data["course_description"]

    pdf_material = data["pdf_material"]

    if action == "create_topics":
        
        # Stage 1: Segment the PDF material into topics

        # Stage 2: Create course in database
        
        pass

    elif action == "set_topics":
        pass
