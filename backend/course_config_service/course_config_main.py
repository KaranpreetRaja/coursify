from fastapi import FastAPI, Depends
from routes.create_course import course_create_router
from routes.get_course import course_get_router
from routes.chatbot_course import chat_bot_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; replace with specific origins for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Setup the route for the db-service
app.include_router(course_create_router, prefix="/api/course_config/create")
app.include_router(course_get_router, prefix="/api/course_config/get")
app.include_router(chat_bot_router, prefix="/api/chatbot")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)