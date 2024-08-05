from database import initialize_db
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

# Start the user_queue consumer
from queues.user_queue import start_user_db_consumer
user_queue_consumer_process = multiprocessing.Process(target=start_user_db_consumer)
processes.append(user_queue_consumer_process)

# register signal handler
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


# start all processes
for process in processes:
    process.start()

# wait for all processes to finish
for process in processes:
    process.join()