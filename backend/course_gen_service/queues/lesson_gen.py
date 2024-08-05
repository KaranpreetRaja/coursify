import sys
import os
# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from common.comms import start_consuming_service, request_service, request_service_with_response
import logging
import concurrent.futures

logger = logging.getLogger(__name__)


def generate_lesson(lesson_id: str, lesson_name: str, lesson_explanation: str) -> dict:

    # Stage 1: Generate lessons for each topic using the topic names and explinations
    # TODO: Implement lesson generation


    lesson_content = "Lesson content here"

    # Stage 2: add generated lesson to existing document by sending it to lesson_db_queue
    data = {
        "action": "add_lesson_content",
        "lesson_id": lesson_id,
        "lesson_name": lesson_name,
        "lesson_explanation": lesson_explanation,
        "lesson_content": lesson_content
    }
    return request_service_with_response("lesson_db", data)



def handle_lesson_gen_requests(data):
    action = data["action"]
    lesson_id = data["lesson_id"]
    lesson_name = data["lesson_name"]
    lesson_explanation = data["lesson_explanation"]
    
    if action == "generate_lessons":
        logger.info(f"Generating lessons for lesson {lesson_id} named {lesson_name}")
        # create a sub-process to generate the lesson that runs asynchronously
        future = executor.submit(generate_lesson, lesson_id, lesson_name, lesson_explanation)
        future.add_done_callback(lambda f: print(f"Lesson {lesson_id} named {lesson_name} generated. {f.result()}"))
        return
    
        
executor = concurrent.futures.ProcessPoolExecutor(max_workers=4)

start_consuming_service("lesson_gen", handle_lesson_gen_requests)