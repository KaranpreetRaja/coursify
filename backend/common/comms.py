'''
This module provides functions to send and receive messages to and from RabbitMQ.

Author: Karanpreet Raja

To receive a message use start_consuming_service(queue_name, handle_request_func)
queue_name: String, name of the queue to consume messages from
handle_request_func: Function, function to handle incoming requests and perform the necessary actions, must take a single argument which is the data received in the message, must return a response to the message if reply_to is not None

To send a message use request_service(queue, data) or request_service_with_response(queue, data)
queue: String, name of the queue to send the message to
data: Dictionary, data to send to the queue

Response format:
{
    "status": "success" or "error",
    "data": "string"
}

Usage Standards:
- use an action key in the data to specify the action to be performed
- use the status key in the response to indicate success or error. If error, the error message should be in the data key
'''

import pika
import json
import os
from functools import partial
from random import randint

# Create a connection to RabbitMQ
def create_connection():
    rabbitmq_host = os.getenv("RABBITMQ_HOST", "localhost")
    rabbitmq_port = int(os.getenv("RABBITMQ_PORT", 5672))
    connection = pika.BlockingConnection(pika.ConnectionParameters(rabbitmq_host, rabbitmq_port))
    channel = connection.channel()
    return connection, channel

# FUNCTIONS TO RECEIVE MESSAGES
def on_request(ch, method, properties, body, handle_request_func):
    # callback function to handle incoming requests
    data = json.loads(body)
    print(data)
    response = None

    response = handle_request_func(data)
    
    # if reply_to is not None, send a response
    if properties.reply_to is not None:
        ch.basic_publish(
            exchange='',
            routing_key=properties.reply_to,
            properties=pika.BasicProperties(correlation_id=properties.correlation_id),
            body=json.dumps(response)
        )
    
    ch.basic_ack(delivery_tag=method.delivery_tag)


def start_consuming_service(queue_name, handle_request_func):
    connection, channel = create_connection()
    channel.queue_declare(queue=queue_name)
    channel.basic_qos(prefetch_count=1)
    # using a partial function to pass additional arguments to the on_request function
    on_request_partial = partial(on_request, handle_request_func=handle_request_func)
    channel.basic_consume(queue= queue_name, on_message_callback=on_request_partial)
    print("Consuming Service Starting")
    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        channel.stop_consuming()
    finally:
        connection.close()




# FUNCTIONS TO SEND MESSAGES
def send_message(queue, data, reply_to):
    connection, channel = create_connection()
    channel.queue_declare(queue=queue)
    channel.basic_publish(
        exchange='',
        routing_key=queue,
        properties=pika.BasicProperties(reply_to=reply_to),
        body=json.dumps(data)
    )
    return connection, channel


def receive_reply(connection, channel, reply_to):
    channel.queue_declare(queue=reply_to)
    response = None

    def on_response(ch, method, properties, body):
        nonlocal response
        response = json.loads(body)
        print(response)
        # stop consuming after receiving a response
        ch.stop_consuming()

    channel.basic_consume(
        queue=reply_to,
        on_message_callback=on_response,
        auto_ack=True
    )

    while response is None:
        try:
            connection.process_data_events(time_limit=1)
        except Exception as e:
            print(f"RabbitMQ_comms: Exception during processing data events: {e}")

    return response

def request_service_with_response(queue: str, data: dict) -> dict:
    reply_to = f"{queue}_reply_{randint(0, 1000000)}"
    connection, channel = send_message(queue, data, reply_to)
    response = receive_reply(connection, channel, reply_to)
    connection.close()
    return response

def request_service(queue: str, data: dict) -> None:
    connection, channel = send_message(queue, data, None)
    connection.close()
    return
