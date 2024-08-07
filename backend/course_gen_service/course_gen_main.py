import signal
import multiprocessing

processes = []

def terminate_processes():
    for process in processes:
        process.terminate()
    
def signal_handler(sig, frame):
    print("Terminating child processes...")
    terminate_processes()
    exit(0)

# Start the lesson_gen consumer
from queues.lesson_gen import start_lesson_gen_consumer
lesson_gen_consumer_process = multiprocessing.Process(target=start_lesson_gen_consumer)
processes.append(lesson_gen_consumer_process)

# Start the topic_gen consumer
from queues.topic_gen import start_topic_gen_consumer
topic_gen_consumer_process = multiprocessing.Process(target=start_topic_gen_consumer)
processes.append(topic_gen_consumer_process)

from queues.quiz_gen import start_quiz_gen_consumer
quiz_gen_consumer_process = multiprocessing.Process(target=start_quiz_gen_consumer)
processes.append(quiz_gen_consumer_process)

# register signal handler
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


# start all processes
for process in processes:
    process.start()

# wait for all processes to finish
for process in processes:
    process.join()
    