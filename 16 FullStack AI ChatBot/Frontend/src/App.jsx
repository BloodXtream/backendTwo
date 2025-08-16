import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text: "Welcome! Type a message and press Send or Enter.",
    },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };
    // Update messages state with the new user message
    // This will trigger a re-render and scroll to the bottom
    // setMessages((s) => [...s, userMsg]);
    setMessages((s) => [...s, userMsg]);
    // Emit the message to the server
    socket?.emit("ai-message", trimmed);
    // Clear input after sending
    setInput("");

    // small simulated reply to demonstrate history behavior
    setTimeout(() => {
      setMessages((s) => [
        ...s,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Auto-reply: I received: '" + trimmed + "'",
        },
      ]);
    }, 700);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("ai-message-response", (response) => {
      const botMsg = {
        id: Date.now() + 1,
        role: "bot",
        text: response,
        timestamp: new Date().toLocaleTimeString(),
        sender: "AI",
      };
      setMessages((s) => [...s, botMsg]);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="chat-app">
      <header className="chat-header">AI Chat (Dark)</header>

      <div className="chat-panel">
        <main className="chat-main">
          <div className="messages" role="log" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`message ${m.role}`}>
                <div className="bubble">{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </main>

        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Write a message... (Shift+Enter for newline)"
            aria-label="Message input"
            rows={1}
          />
          <button type="submit" className="send-btn" aria-label="Send message">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
