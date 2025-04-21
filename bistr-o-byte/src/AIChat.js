import React, { useState, useEffect, useRef } from "react";
import "./AIChat.css";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages(m => [...m, { sender: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    // doar ultimele 6 mesaje pt context  -> vedem daca trebuie mai multe
    const ctx = messages.slice(-5).map(m => ({
      role: m.sender === "ai" ? "assistant" : "user",
      content: m.text
    }));
    const payload = [
      ...ctx,
      { role: "user", content: trimmed }
    ];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setMessages(m => [...m, { sender: "ai", text: data.reply.trim() }]);
    } catch (err) {
      console.error(err);
      setMessages(m => [...m, { sender: "ai", text: "Error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aichat-container">
      <div className="messages-window">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "ai" ? "ai-message" : "user-message"}>
            <span className="message-sender">{m.sender === "ai" ? "AI" : "You"}:</span>
            <span className="message-text">{m.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="input-area">
        <input
          value={input}
          placeholder="Type your message…"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
