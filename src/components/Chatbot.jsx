import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        "https://smile-dental-backend.onrender.com/api/chat",
        { message }
      );

      setChat([
        ...chat,
        { user: message, bot: res.data.reply }
      ]);

      setMessage("");
    } catch (error) {
      console.error("Chat error", error);
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "15px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          zIndex: 1000
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 1000
          }}
        >
          <h4>Smile Dental AI Assistant</h4>

          <div
            style={{
              height: "300px",
              overflowY: "auto",
              marginBottom: "10px"
            }}
          >
            {chat.map((c, index) => (
              <div key={index}>
                <p><b>You:</b> {c.user}</p>
                <p><b>Bot:</b> {c.bot}</p>
              </div>
            ))}
          </div>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              width: "70%",
              padding: "5px"
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              width: "25%",
              padding: "5px",
              marginLeft: "5px",
              cursor: "pointer"
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;