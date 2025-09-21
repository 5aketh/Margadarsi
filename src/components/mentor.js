import React, { useState } from "react";
import Header from "./header";

const Mentor = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    // Simulate bot response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Thanks for your message! A mentor will reply soon." },
      ]);
    }, 800);
    setInput("");
  };

  return (
    <div className="dash-container">
      <Header options={[
        { label: "Home", href: "/dashboard" },
        { label: "News", href: " /news" },
        { label: "Mentor", href: "/mentor" },
        { label: "Community", href: "/community" },
        { label: "Reference", href: "/reference" }
      ]} />
      <div style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", margin: "24px auto", display: "flex", flexDirection: "column", width: '60%', height: '80%', borderRadius: "2vh" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #eee", fontWeight: "bold", fontSize: "1.2rem", background: "#ff6f61", borderRadius: "2vh 2vh 0 0" }}>
          Mentor Chatbot
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ alignSelf: msg.from === "user" ? "flex-end" : "flex-start", background: msg.from === "user" ? "#00000028" : "#ff6e61ae", color: "#333", borderRadius: "16px", padding: "10px 16px", maxWidth: "75%", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} style={{ display: "flex", borderTop: "1px solid #eee", padding: "12px", background: "#ff6f61", borderRadius: "0 0 2vh 2vh" }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." style={{ flex: 1, border: "none", outline: "none", padding: "10px", borderRadius: "8px", background: "#f5f7fa", marginRight: "8px" }} />
          <button type="submit" style={{ background: "#fff", color: "#ff6f61", border: "none", borderRadius: "8px", padding: "10px 18px", cursor: "pointer", fontWeight: "bold" }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mentor;