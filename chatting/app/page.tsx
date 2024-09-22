'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]); 
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    
    newSocket.onopen = () => {
      console.log("Connection Established");
      newSocket.send('hello server'); 
    };

    newSocket.onmessage = (messageEvent) => {
      console.log('Message received:', messageEvent.data);
      setMessages((prevMessages) => [...prevMessages, messageEvent.data]); 
    };

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleSendMessage = () => {
    if (socket && message) {
      socket.send(message); 
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]); 
      setMessage(""); 
    }
  };

  if (!socket) {
    return (
      <div className="flex justify-center h-screen items-center">
        loading......
      </div>
    );
  }
 
  return ( 
    <div>
      <div className=" flex justify-center mt-10 ">Chat messages</div>
      
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="mb-4 w-full text-black max-w-md bg-gray-100 p-4 rounded-lg overflow-y-auto h-64">
            {messages.map((msg, index) => (
              <div key={index}>
                {msg}
                </div> 
            ))}
          </div>

          <div className="flex items-center">
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text" 
              placeholder="Type your message" 
              className="rounded-lg text-black p-2"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-violet-400 rounded-lg px-5 ml-2"
            > 
              Send
            </button>
          </div>
        </div>
    </div> 
  );
}
