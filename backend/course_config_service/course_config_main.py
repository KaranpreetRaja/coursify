from fastapi import FastAPI, Depends

from routes.create_course import course_create_router

app = FastAPI()

# Setup the route for the db-service
app.include_router(course_create_router, prefix="/api/course_config/create")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)