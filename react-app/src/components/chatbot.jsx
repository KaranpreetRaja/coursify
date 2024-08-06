import React, { useState, useRef, useEffect } from 'react';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TbMessageChatbot } from "react-icons/tb";
import axios from 'axios';
import 'daisyui/dist/full.css'; // Make sure to include DaisyUI CSS

export default function Chatbot({ context }) {
    const uid = window.localStorage.getItem('uid');
    const session_id = window.localStorage.getItem('session_id');
    const [chatSessionId, setChatSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const ws = useRef(null);

    const startChatSession = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/start_session', { context });
            console.log("Start sesssion")
            console.log(response.data)
            setChatSessionId(response.data.session_id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        if (input.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: input, sender: "user" }]);

            try {
                const response = await axios.post('http://127.0.0.1:8000/use_session', {
                    session_id: chatSessionId,
                    question: input
                });
                console.log("use sesssion")
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }

            setInput("");

            if (ws.current) {
                ws.current.close();
            }

            ws.current = new WebSocket(`ws://localhost:8000/ws?session_id=${chatSessionId}`);

            ws.current.onopen = () => {
                ws.current.send(input);
            };

            ws.current.onmessage = (e) => {
                setMessages((prevMessages) => [...prevMessages, { text: e.data, sender: "bot" }]);
            };

            ws.current.onclose = () => {
                console.log("WebSocket closed");
            };
        }
    };

    useEffect(() => {
        startChatSession();
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <Popup
            trigger={
                <button className="fixed bottom-4 right-4 flex items-center border-4 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:bg-gray-100">
                    <TbMessageChatbot size={40} className="text-xl mr-2" />
                    <span>Chatbot</span>
                    <span className="bg-green-500 rounded-full w-2 h-2 ml-2"></span>
                </button>
            }
            modal
            nested
            closeOnDocumentClick={false}
            contentStyle={{ background: 'transparent', border: 'none', padding: 0 }}
        >
            {(close) => (
                <div className="fixed right-0 top-0 bottom-0 bg-white p-6 rounded-lg flex flex-col space-y-4 overflow-y-auto h-screen w-96 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Chatbot</h2>
                    <div className="flex-1 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat ${message.sender === "user" ? "chat-end" : "chat-start"}`}>
                                <div className="chat-bubble">{message.text}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Send message..."
                        />
                        <button onClick={handleSendMessage} className="btn btn-primary">
                            Send
                        </button>
                    </div>
                    <button
                        onClick={close}
                        className="btn btn-error mt-4"
                    >
                        Close
                    </button>
                </div>
            )}
        </Popup>
    );
}
