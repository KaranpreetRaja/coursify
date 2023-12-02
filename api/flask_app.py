import os
from flask import Flask, jsonify
from firebase_admin import credentials, initialize_app
from api.blueprints.user_blueprint import user_blueprint

current_dir = os.path.dirname(os.path.abspath(__file__))
cred = credentials.Certificate(os.path.join(current_dir, 'serviceAccountKey.json'))
default_app = initialize_app(cred)

app = Flask(__name__)


# ping route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

app.register_blueprint(user_blueprint, url_prefix='/user')

if __name__ == '__main__':
    app.run(debug=True)