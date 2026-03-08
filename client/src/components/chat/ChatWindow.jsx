import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const DummyChatData = [
  {
    senderId: 1,
    receiverId: 2,
    message: "Hi, how are you?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "I am good! How about you?",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Doing well. Are you free today?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Yes, mostly in the evening.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Great, we should catch up.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Sure, what time works for you?",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Maybe around 6 PM?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "6 PM sounds good.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Let's meet at the cafe near the office.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Perfect, I like that place.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Did you finish the project work?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Almost done, just a few things left.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Nice! Let me know if you need help.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Thanks, I will.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Also, did you check the new tech article I shared?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Yes, it was really interesting.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "The part about real-time apps was great.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "True, especially the Socket.IO example.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Exactly! I want to try building one.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Let's discuss it in the evening then.",
  },
];



const ChatWindow = ({ receiver, setReceiver }) => {
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState("");

  const scrolltoBottom = () => {
    console.log(bottomRef);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //On Every New Message
  useEffect(() => {
    scrolltoBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleSend();
  };

  const handleSend = () => {
    //call Backend

    const messagePacket = {
      senderId: 1,
      receiverId: 2,
      message: inputMessage,
    };
    setMessages((prev) => [...prev, messagePacket]);
    setInputMessage("");
  };

  const fetchAllOldMessage = () => {
    try {
      setTimeout(() => {
        setMessages(DummyChatData);
      }, 5000);
    } catch (error) {
      toast.error("Some Error");
    }
  };

  //on component Load
  useEffect(() => {
    setMessages([]);
    fetchAllOldMessage();
  }, [receiver]);








  if (!receiver) {
    return (
      <div className="p-2 h-full flex items-center justify-center">
        <span className="text-sm text-primary">
          Select a contact to start chatting...
        </span>
      </div>
    );
  }
  return (
    <>
      <div className="p-2 h-full">
        <div className="border rounded-lg h-full p-2">
          <div className="bg-primary p-3 rounded-lg mb-2">
            <h2 className="text-lg font-bold text-primary-content">
              {receiver.fullName}
            </h2>
          </div>

          <div className="h-4/5 overflow-y-auto p-2 border rounded-lg bg-accent/30">
            {/* Chat messages will go here */}
            {messages.length > 0 ? (
              messages.map((chat, idx) => (
                <div
                  key={idx}
                  className={`chat ${chat.senderId === 2 ? "chat-receiver" : "chat-sender"}`}
                >
                  <div className="chat-header text-base-content">
                    {chat.senderId === 2 ? receiver.fullName : "Arpit Gupta"}
                  </div>
                  <div className="chat-bubble">{chat.message}</div>

            
                </div>
                 ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {" "}
                Loading Chats ...
              </div>
             )}

            {/* Dummy div to scroll to bottom */}
            <div ref={bottomRef} />
          </div>

          <div className="mt-2 flex gap-2">
            <input
              type="text"
               value={inputMessage}
              placeholder="Type your message..."
              className="input input-bordered w-full"
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" onClick={handleSend}>
              Send
            </button>
          </div>

          <div className="text-center text-sm text-base-content/60 mt-1">
            Powered by <span className="font-bold">ChatAppFSD45</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;