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
            {"role": "user", "content": 
            f"""Write an extremely comprehensive, in-depth, and extensive lesson on '{topic}'. {explanation}.
            Approach this as if you're a passionate teacher delivering a master class to eager students, covering every conceivable aspect of the topic in extraordinary detail.
            Include the following elements, elaborating extensively on each:

            Fundamental Principles

            Break down each core principle in great detail, providing multiple explanations to cater to different learning styles.
            Include relevant formulas, theories, or models, explaining each component comprehensively.


            Key Concepts

            Elaborate on all related concepts, no matter how tangential
            Explore the interrelationships between concepts
            Discuss any debates or controversies surrounding these concepts


            Detailed Explanations

            Use analogies, metaphors, and similes to illustrate complex ideas
            Break down processes step-by-step, explaining the reasoning behind each step
            Address common misconceptions and explain why they're incorrect


            Practical Applications

            Provide numerous real-world examples of how {topic} is applied
            Discuss potential future applications and innovations
            Explain how {topic} intersects with other fields or disciplines


            In-depth Examples

            Walk through multiple comprehensive examples, explaining every detail
            Include a mix of simple and complex examples to cater to different skill levels
            Provide practice problems with detailed solutions

            """},
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