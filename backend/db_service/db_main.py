from fastapi import FastAPI, Depends
from .database import initialize_db
import signal
import multiprocessing

initialize_db()

processes = []

def terminate_processes():
    for process in processes:
        process.terminate()
    
def signal_handler(sig, frame):
    print("Terminating child processes...")
    terminate_processes()
    exit(0)


# register signal handler
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


# start all processes
for process in processes:
    process.start()

# wait for all processes to finish
for process in processes:
    process.join()