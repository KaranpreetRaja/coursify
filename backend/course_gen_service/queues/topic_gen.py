import sys
import os
from ai71 import AI71
from dotenv import load_dotenv
import re
import json

# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from common.comms import start_consuming_service, request_service, request_service_with_response


def create_course(uid: str, course_name: str, course_description: str, pdf_material: str, topics: dict) -> dict:
    data = {
        "action": "create_course",
        "uid": uid,
        "course_name": course_name,
        "course_description": course_description,
        "pdf_material": pdf_material,
        "topics": topics
    }
    return request_service_with_response("course_db", data)

# Function to clean and fix the JSON strings
def fix_json_string(json_string):
    # Removing leading and trailing spaces and newlines
    json_string = json_string.strip()
    # Adding brackets if they are missing
    if not json_string.startswith('['):
        json_string = '[' + json_string
    if not json_string.endswith(']'):
        json_string = json_string + ']'
    # Ensure proper comma separation between objects
    json_string = json_string.replace('}\n', '},\n').replace('},\n]', '}\n]')
    return json_string


def create_lesson_topics(text_list):
    
    load_dotenv()
    api_key = os.getenv('API_KEY')

    client = AI71(api_key)
    
    lesson_topics = []
    if len(text_list) == 1:
        response = client.chat.completions.create(
        model="tiiuae/falcon-180B-chat",
        messages=[
            {"role": "system", "content": "You are a lesson planner."},
            {"role": "user", "content": text_list},
            {"role": "user", "content": "Create 3 small lesson topics to teach the given material in json format giving a proper explanation on what the lesson should teach."},
        ],
        )
        lesson_topics.append(response)
    else:
        response = client.chat.completions.create(
            model="tiiuae/falcon-180B-chat",
            messages=[
                {"role": "system", "content": "You are a lesson planner."},
                {"role": "user", "content": text_list[0]},
                {"role": "user", "content": "Suggest 2 small lesson topics that can be taught from the given material and give a proper explanation on what the lesson should teach. Please provide the topics in json format like this: [{'topic': 'topic name', 'explanation': 'explanation of the topic'}]"},
            ],
            )
        lesson_topics.append(response)
        for i in text_list[1:len(text_list)]:
            
            response = client.chat.completions.create(
            model="tiiuae/falcon-180B-chat",
            messages=[
                {"role": "system", "content": "You are a lesson planner."},
                {"role": "user", "content": i},
                {"role": "user", "content": f"{response} are the topics which have already been covered (please do not suggest them or their related subtopics). Suggest 2 more topics to teach the given material in json format giving a proper explanation on what the lesson should teach. The json format should be like this: [{{'topic': 'topic name', 'explanation': 'explanation of the topic'/}}]. Please only respond with the new topics and their explanations in json, not the old ones."},
            ],
            )
            lesson_topics.append(response)
    return lesson_topics

 
def handle_topic_requests(data):
    try:
        uid = data["uid"]
        action = data["action"]
    
        if action == "create_course_topics":
            course_name = data["course_name"]
            course_description = data["course_description"]
            pdf_material = data["pdf_material"]

            # Stage 1: Segment the PDF material into topics

            text = pdf_material.replace("\n", " ")
            text = re.sub(r'\s{2,}', ' ', text)

            if len(text) > 4000:
                text_list = [text[i:i+4000] for i in range(0, len(text), 4000)]

            # response = [{'topic_name': 'topic explanation'}]
            response = create_lesson_topics(text_list)

            json_strings = [resp.choices[0].message.content.replace("User:", "") for resp in response]

            all_lessons = []

            # Iterate through each JSON string, fix the formatting, parse it, and extend the all_lessons list
            for json_str in json_strings:
                try:
                    fixed_json_str = fix_json_string(json_str)
                    lessons = json.loads(fixed_json_str)
                    all_lessons.extend(lessons)
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON: {e}")

            # Merge the dictionaries into a single dictionary
            lesson_topics = {lesson['topic']: lesson['explanation'] for lesson in all_lessons}


            # Stage 2: Create course in database
            response = create_course(uid, course_name, course_description, pdf_material, lesson_topics)

            if response["status"] == "error":
                return {
                    "status": "error",
                    "message": response["message"]
                }
                
            
            return {
                "status": "success",
                "course_id": response["course_id"],
                "topics": all_lessons
            }

        elif action == "set_topics":
            print("Came here")
            course_id = data["course_id"]
            topics = data["topics"]

            # Stage 1: create lessons in the database
            lessons = []
            for lesson in topics:
                lesson_name = lesson["topic"]
                lesson_explanation = lesson["explanation"]

                data = {
                    "action": "create_lesson",
                    "lesson_name": lesson_name,
                    "lesson_description": lesson_explanation
                }
                response = request_service_with_response("lesson_db", data)
                lesson_id = response["lesson_id"]
                lessons.append({
                    "lesson_id": lesson_id,
                    "lesson_name": lesson_name,
                    "lesson_explanation": lesson_explanation
                })

            # Stage 2: add lessons to course in the database
            data = {
                "action": "add_lessons_to_course",
                "course_id": course_id,
                "lessons": lessons
            }

            request_service_with_response("course_db", data)


            # Stage 3: use `lesson_gen` queue to generate lessons for each topic
            for lesson in lessons:
                lesson_id = lesson["lesson_id"]
                lesson_name = lesson["lesson_name"]
                lesson_explanation = lesson["lesson_explanation"]

                data = {
                    "action": "generate_lessons",
                    "lesson_id": lesson_id,
                    "lesson_name": lesson_name,
                    "lesson_explanation": lesson_explanation
                }
                request_service("lesson_gen", data)

            return {
                "status": "success",
                "message": "Lessons are being generated"
            }

    
    except Exception as e:
        print(f"Error handling topic request: {str(e)}")
        return {
            "status": "error",
            "message": f"Error handling topic request {str(e)}"
        }


def start_topic_gen_consumer():
    start_consuming_service("topic_gen", handle_topic_requests)