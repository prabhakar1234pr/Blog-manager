import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Astra DataStax Langflow API configuration
  const API_URL = 'https://api.langflow.astra.datastax.com/lf/664e2890-0079-4091-88d4-68d3da05aa38/api/v1/run/fcd9e235-d213-41f1-b1da-f8536bd3872b';
  // Replace with your actual token
  const API_TOKEN = '<YOUR_APPLICATION_TOKEN>';
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const payload = {
        "input_value": inputValue,
        "output_type": "chat",
        "input_type": "chat",
        "session_id": "user_1" // You can generate unique session IDs for each user
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify(payload)
      };

      const response = await fetch(API_URL, options);
      const data = await response.json();
      console.log('API response:', data);
      
      // Extract the response text from the API response
      // Adjust this according to actual response structure
      let responseText = "";
      if (data && data.data && data.data.result) {
        responseText = data.data.result;
      } else if (data && data.result) {
        responseText = data.result;
      } else {
        responseText = "Sorry, I couldn't understand the response from the server.";
      }
      
      // Add AI response to chat
      const aiMessage = { 
        text: responseText,
        isUser: false 
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error communicating with API:', error);
      // Add error message
      const errorMessage = { 
        text: "Sorry, I encountered an error. Please try again.", 
        isUser: false 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <button className="floating-button" onClick={toggleChat}>
        {isOpen ? '×' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div>Blog Assistant</div>
            <span className="close-button" onClick={toggleChat}>×</span>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="message ai-message">Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="input-form" onSubmit={sendMessage}>
            <input
              type="text"
              className="message-input"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="send-button" type="submit">
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
