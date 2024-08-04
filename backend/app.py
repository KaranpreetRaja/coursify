from fastapi import FastAPI
import uvicorn
import os
from user_service.routes.user import user_router
from db_service.database import initialize_db
import signal
import multiprocessing

# Import consumer functions
from db_service.queues.user_queue import start_user_db_consumer


initialize_db()

app = FastAPI()

# Import routers for FastAPI
# Add new routes here using the example syntax below
# app.include_router(router, prefix="/api/service-name")
app.include_router(user_router, prefix="/api/user")

# PROCESS MANAGEMENT CODE
processes = []

def terminate_processes():
    for process in processes:
        process.terminate()
    
def signal_handler(sig, frame):
    print("Terminating child processes...")
    terminate_processes()
    exit(0)


# INDIVIDUAL PROCESS DEFINITIONS

# start the FastAPI app
fast_api_process = multiprocessing.Process(target=uvicorn.run, args=(app,), kwargs={'host': '0.0.0.0', 'port': 8000})
processes.append(fast_api_process)

# Start the user_queue consumer
user_queue_consumer_process = multiprocessing.Process(target=start_user_db_consumer)
processes.append(user_queue_consumer_process)



# PROCESS LAUNCHING CODE

# register signal handler
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

# start all processes
for process in processes:
    process.start()

# wait for all processes to finish
for process in processes:
    process.join()



