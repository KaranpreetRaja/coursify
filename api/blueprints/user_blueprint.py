from flask import Blueprint, request, jsonify
from firebase_admin import firestore, auth

user_blueprint = Blueprint('user', __name__)

db = firestore.client()
users_ref = db.collection('users')




'''
JSON Error Response body:
{
    "error": "error message"
}
'''



'''
POST /user/register

Description: Registers a new user in the database

JSON Request body:
{
    "email": "email",
    "password": "password",
    "name": "name",
    "phone": "phone" (optional),
    "email_address": "address",
    "email_verified": boolean (optional),
    "disabled": boolean (optional)
}

JSON Response body:
{
    "uid": "uid"
}
'''
@user_blueprint.route('/register', methods=['POST'])
def register():
    try:
        email = request.json['email']
        password = request.json['password']
        name = request.json['name']
        phone = request.json.get('phone', None)
        address = request.json['address']
        email_verified = request.json.get('email_verified', False)
        disabled = request.json.get('disabled', False)

        user = auth.create_user(
            email=email,
            password=password,
            display_name=name,
            phone_number=phone,
            email_verified=email_verified,
            disabled=disabled
        )

        users_ref.document(user.uid).set({
            'email': email,
            'name': name,
            'phone': phone,
            'address': address
        })

        return jsonify({'uid': user.uid}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    

'''
POST /user/login

Description: Logs in a user

JSON Request body:
{
    "email": "email",
    "password": "password"
}

JSON Response body:
{
    "uid": "uid"
}
'''
@user_blueprint.route('/login', methods=['POST'])
def login():
    try:
        email = request.json['email']
        password = request.json['password']

        user = auth.get_user_by_email(email)
        if user is None:
            raise Exception('User does not exist')
        
        user = auth.update_user(
            user.uid,
            email=email,
            password=password
        )

        return jsonify({'uid': user.uid}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
'''
POST /user/login_with_google

Description: Logs in a user with Google

JSON Request body:
{
    "id_token": "id_token"
}

JSON Response body:
{
    "uid": "uid"
}
'''
@user_blueprint.route('/login_with_google', methods=['POST'])
def login_with_google():
    try:
        id_token = request.json['id_token']

        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        user = auth.get_user(uid)

        return jsonify({'uid': user.uid}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

'''
GET /user/info

Description: Gets user info

JSON Request body:
{
    "uid": "uid"
}

JSON Response body:
{
    "email": "email",
    "name": "name",
    "phone": "phone",
    "email_address": "address"
    email_verified": boolean,
    "disabled": boolean
}
'''
@user_blueprint.route('/info', methods=['GET'])
def info():
    try:
        uid = request.args.get('uid')
        user = auth.get_user(uid)
        user_info = users_ref.document(uid).get().to_dict()

        return jsonify({
            'email': user.email,
            'name': user.display_name,
            'phone': user.phone_number,
            'address': user_info['address'],
            'email_verified': user.email_verified,
            'disabled': user.disabled
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400