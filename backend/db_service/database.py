from firebase_admin import credentials, initialize_app, auth, firestore
import os
import json

def initialize_db():
    # file_name = "coursify-serviceAccountKey.json"
    file_name = "coursify-key.json"
    file_path = os.path.join(os.path.dirname(__file__), file_name)

    print(file_path)
    cred = credentials.Certificate(file_path)
    initialize_app(credential=cred)


def get_db():
    db = firestore.client()
    return db
