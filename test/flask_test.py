from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/message', methods=['POST'])
def message():
    data = request.json
    print(f'Received from client: {data}')
    response = {'message': 'What is the learning rate in gradient descent?'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000)
