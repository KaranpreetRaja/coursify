from fastapi import FastAPI, Depends
from routes.user import db_user_router
from firebase_admin import initialize_app, credentials, auth, firestore


# Initialize Firebase Auth and Firestore
cred = credentials.Certificate("firebase-adminsdk.json")
initialize_app(cred)

db = firestore.Client()

app = FastAPI()

# Setup the route for the db-service
app.include_router(db_user_router, prefix="/api/db/user", dependencies=[Depends(lambda: db), Depends(lambda: auth)])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)