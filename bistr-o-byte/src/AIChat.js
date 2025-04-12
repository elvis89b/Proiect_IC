import React from 'react';
import './AIChat.css'; 

function AIChat() {
  return (
    <div className="ai-chat-container">
      <div className="chat-messages">
      </div>
      <form className="chat-form">
        <input
          type="text"
          placeholder="Scrie mesajul aici..."
        />
        <button type="submit" className="button_homepage">Send</button>
      </form>
    </div>
  );
}

export default AIChat;
