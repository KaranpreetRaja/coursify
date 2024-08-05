import sys
import os

from ai71 import AI71
from dotenv import load_dotenv

# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from common.comms import start_consuming_service, request_service, request_service_with_response
import logging
import concurrent.futures

logger = logging.getLogger(__name__)


def generate_lesson(lesson_id: str, lesson_name: str, lesson_explanation: str) -> dict:

    # Stage 1: Generate lessons for each topic using the topic names and explinations
    # TODO: Implement lesson generation


    lesson_content = create_lesson(lesson_name, lesson_explanation)

    # Stage 2: add generated lesson to existing document by sending it to lesson_db_queue
    data = {
        "action": "add_lesson_content",
        "lesson_id": lesson_id,
        "lesson_name": lesson_name,
        "lesson_explanation": lesson_explanation,
        "lesson_content": lesson_content
    }
    return request_service_with_response("lesson_db", data)


def create_lesson(topic, explanation):
    load_dotenv()
    api_key = os.getenv('API_KEY')

    client = AI71(api_key)

    response = client.chat.completions.create(
        model="tiiuae/falcon-180B-chat",
        messages=[
            {"role": "system", "content": "You are a great teacher bot. You create emersive and long lessons for students. They are straight to the point and not addressed to anyone. You are writing long and extensive course material that is easy to understand."},
            {"role": "user", "content": f"Write a long, detailed and extensive overview for '{topic}'. It should be structured like a teacher explaining the topic to a class, covering all relevant aspects including fundamental principles, key concepts, detailed explanations, practical applications, and in-depth examples. {explanation}"},
        ],
    )
    return response

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