from firebase_admin import auth

import sys
import os
# adds top-level project directory to the sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from common.comms import start_consuming_service

def handle_user_requests(data):
    print("Handling user requests")

    try: 
        if data["action"] == "register_user":
            # create new user
            user = auth.create_user(
                email=data["email"],
                password=data["password"],
                display_name=data["first_name"] + " " + data["last_name"],
                email_verified=False,
                disabled=False
            )

            # create custom jwt token
            session_id = auth.create_custom_token(user.uid)
            print(f'Custom token created: {session_id}')

            return {
                "status": "success",
                "message": "User registered",
                "uid": user.uid,
                "session_id": session_id.decode("utf-8")
            }
        
        elif data["action"] == "login_user":
            password = data["password"]
            # find user by email
            user = auth.get_user_by_email(data["email"])
            if user is None:
                return {
                    "status": "error",
                    "message": "User not found"
                }
            
            # verify password
            try:
                stored_password = user["password"]  
                auth.verify_password(stored_password, password)
            except Exception as e:
                return {
                    "status": "error",
                    "message": "Invalid password"
                }
            
            # create custom jwt token for session_id
            session_id = auth.create_custom_token(user.uid)
            print(f'Custom token created: {session_id}') 

            return {
                "status": "success",
                "message": "User logged in",
                "uid": user.uid,
                "session_id": session_id 
            }
            
        elif data["action"] == "validate_session":
            # validate session_id is a valid jwt token
            session_id = data["session_id"]
            try:
                auth.verify_id_token(session_id)
                return {
                    "status": "success",
                    "message": "Session is valid"
                }
            except Exception as e:
                return {
                    "status": "error",
                    "message": f"Invalid session: {str(e)}"
                }
        
        elif data["action"] == "logout_user":
            # delete jwt token
            uid = data["uid"]
            try:
                auth.revoke_refresh_tokens(uid)
                return {
                    "status": "success",
                    "message": "User logged out"
                }
            except Exception as e:
                return {
                    "status": "error",
                    "message": "Error logging out user"
                }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

    

def start_user_db_consumer():
    start_consuming_service("user_queue", handle_user_requests)