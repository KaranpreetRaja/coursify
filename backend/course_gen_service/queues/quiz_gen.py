import sys
import os
from ai71 import AI71
from dotenv import load_dotenv
import re
import json

# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from common.comms import start_consuming_service, request_service, request_service_with_response

def generate_quiz(topic, lesson):
    load_dotenv()
    api_key = os.getenv('API_KEY')

    client = AI71(api_key)

    response = client.chat.completions.create(
        model="tiiuae/falcon-180B-chat",
        messages=[
            {"role": "system", "content": "You are a quiz bot. You create quizzes for students to test their knowledge on a specific lesson. You strictly follow the format provided and include the headers for the start of the two sections 'Multiple Choice Questions:' and 'True/False Questions:'."},
            {"role": "user", "content": 
f"""Create a quiz for the topic '{topic}' and lesson: {lesson[0:3000]}. 
The questions should be designed to test the student's understanding of the lesson. The quiz should be engaging and informative. Format the quiz as follows (Strickly follow the format):
Multiple Choice Questions:
1. [Question 1]
   A) [Option A]
   B) [Option B]
   C) [Option C]
   D) [Option D]

Answer: [Correct option letter]

2. [Question 2]
   A) [Option A]
   B) [Option B]
   C) [Option C]
   D) [Option D]

Answer: [Correct option letter]

3. [Question 3]
   A) [Option A]
   B) [Option B]
   C) [Option C]
   D) [Option D]

Answer: [Correct option letter]

4. [Question 4]
   A) [Option A]
   B) [Option B]
   C) [Option C]
   D) [Option D]

Answer: [Correct option letter]

5. [Question 5]
   A) [Option A]
   B) [Option B]
   C) [Option C]
   D) [Option D]

Answer: [Correct option letter]

True/False Questions:
6. [True/False statement]

Answer: [True/False correct answer]

7. [True/False statement]

Answer: [True/False correct answer]

8. [True/False statement]

Answer: [True/False correct answer]

9. [True/False statement]

Answer: [True/False correct answer]

10. [True/False statement]

Answer: [True/False correct answer]
"""}
        ],
    )
    return response

def convert_to_json(input_string):
    lines = input_string.strip().split('\n')
    result = {
        "Multiple Choice Questions": [],
        "True/False Questions": []
    }
    
    current_section = None
    question = None
    for line in lines:
        line = line.strip()
        if line.startswith('Multiple Choice Questions:'):
            current_section = "Multiple Choice Questions"
        elif line.startswith('True/False Questions:'):
            if question:
                result[current_section].append(question)
                question = None
            current_section = "True/False Questions"
        elif line and line[0].isdigit() and line[1] == '.':
            if question:
                result[current_section].append(question)
            question = {"Question": line}
        elif line.startswith('A)') or line.startswith('B)') or line.startswith('C)') or line.startswith('D)'):
            if 'Options' not in question:
                question['Options'] = []
            question['Options'].append(line)
        elif line.startswith('Answer:'):
            if current_section == "Multiple Choice Questions":
                question['Answer'] = line.split('Answer: ')[1]
            else:
                question['Answer'] = line.split('Answer: ')[1] == 'True'
        else:
            if question is not None:
                if 'Question' in question:
                    question['Question'] += ' ' + line
                else:
                    question['Question'] = line
    
    if question:
        result[current_section].append(question)
    
    return result

def handle_quiz_gen_requests(data):
    action = data["action"]
    lesson_id = data["lesson_id"]
    lesson_name = data["lesson_name"]
    lesson_explanation = data["lesson_explanation"]
    lesson_text = data["lesson_material"]

    if action == "generate_quiz":
        response = generate_quiz(lesson_name, lesson_explanation)
        json_string = response.choices[0].message.content.replace("User:", "")
        quiz = convert_to_json(json_string)

        return quiz
    

start_consuming_service("quiz_gen", handle_quiz_gen_requests)