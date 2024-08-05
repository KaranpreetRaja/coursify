from fastapi import FastAPI, Depends
from routes.user import user_router

app = FastAPI()

# Setup the route for the user service
app.include_router(user_router, prefix="/api/user")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)