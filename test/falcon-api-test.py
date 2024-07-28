from ai71 import AI71
from dotenv import load_dotenv
import os

from extract_pdf import extract_text_from_pdf, extract_text_from_pdfs

load_dotenv()
api_key = os.getenv('API_KEY')


client = AI71(api_key)

text = extract_text_from_pdf("/home/space/Downloads/test.pdf")
multiple_texts = extract_text_from_pdfs(["/home/space/Downloads/test.pdf", "/home/space/Downloads/test.pdf"])

# very rough
response = client.chat.completions.create(
    model="tiiuae/falcon-180B-chat",
    messages=[
        {"role": "system", "content": "You are a lesson planner."},
        {"role": "user", "content": text[0:5500]},
        {"role": "user", "content": "Create lesson topics to teach the given material."},
    ],
    # max_tokens=100,
)


print()