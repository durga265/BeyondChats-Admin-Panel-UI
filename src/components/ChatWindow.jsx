import './ChatWindow.css';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// emoji-mart v5 imports
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const ChatWindow = ({ conversation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const endRef = useRef(null);

  // Reset messages whenever conversation changes
  useEffect(() => {
    setMessages([
      { id: 1, sender: 'user', text: conversation.message, timestamp: Date.now() - 1000 * 60 * 5 },
      { id: 2, sender: 'agent', text: 'Sure, I can help you with that!', timestamp: Date.now() - 1000 * 60 * 4 },
    ]);
    setInput('');
    setShowEmojiPicker(false);
    setIsTyping(false);
  }, [conversation]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Add emoji to input
  const addEmoji = (emoji) => {
    setInput(prev => prev + emoji.native);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setShowEmojiPicker(false);

    // Simulate typing indicator delay
    setIsTyping(true);
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        sender: 'agent',
        text: 'Thanks for your message! Let me check that.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      sendMessage();
    }
  };

  const formatTime = (ts) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-window" role="region" aria-label={`Chat with ${conversation.name}`}>
      <div className="messages">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`message ${msg.sender}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="message-content">{msg.text}</div>
            <div className="message-time">{formatTime(msg.timestamp)}</div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="message agent typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
          >
            <span className="typing-indicator">
              Agent is typing<span className="dots">...</span>
            </span>
          </motion.div>
        )}

        <div ref={endRef} />
      </div>

      <div className="message-input-wrapper">
        <button
          className="emoji-toggle-btn"
          aria-label="Toggle emoji picker"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          type="button"
        >
          😊
        </button>

        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <Picker data={data} onEmojiSelect={addEmoji} />
          </div>
        )}

        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          aria-label="Message input"
          disabled={isTyping}
        />

        <button
          onClick={sendMessage}
          disabled={isTyping || !input.trim()}
          aria-label="Send message"
          type="button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
