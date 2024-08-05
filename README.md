# coursify
A generative AI application that can be used to automatically generate courses for any subject


## Architecture
The applications architecture is a hybrid between a monolithic and microservices architecture. This allows for the application to be launched as a monolithic application or as a microservices application. This is possible a the backend is split into multiple services that can be run independently or together. The services are as follows:






## Setup and Installation
### Monolithic Setup


#### Python Setup

Create a new virtual enviorment and install the dependencies using the `Requirements.txt` file
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r Requirements.txt
```

#### Setting up Firebase

Create a new project in Firebase and download the service account key. Move the json file to `backend/db_service` in the project and rename it to `coursify-key.json`

You can generate the key by going to the Firebase Console -> Project Settings -> Service Accounts -> Generate New Private Key

Firebase setup:
- You need to enable authentication using email and password in the Firebase Console
- You need to enable Firestore in the Firebase Console and create the following collections:
    - `courses`
    - `users`
    - `course-requests`
    - `course-requests-queue`


#### Setting up RabbitMQ Locally

```bash
sudo apt-get update
sudo apt-get install rabbitmq-server
sudo systemctl start rabbitmq-server
sudo systemctl enable rabbitmq-server
```

You can check if the server is running using:
```bash
sudo systemctl status rabbitmq-server
```

You need to declare the following enviorment variables for to set up RabbitMQ
```bash
export RABBITMQ_HOST=localhost
export RABBITMQ_PORT=5672
```

To run a specific service, you need to cd into the backend directory and run the main file for the service.

For example to run the `db_service` you would do the following:
```bash
cd path/to/project
source venv/bin/activate
cd backend/
python db_service/db_main.py
```




