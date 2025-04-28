import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Langflow API details
  const LANGFLOW_API_URL = 'http://127.0.0.1:7860/api/v1/run/72303bc9-05f4-4df6-87d2-235eced25180?stream=false';
  const LANGFLOW_API_KEY = 'sk-i8pOatkqGzymV0So3tJ3uQQ64ljFe9yBUmKdN2nPEB8';
  // You'll need to replace this with your actual auth token if required
  const LANGFLOW_AUTH_TOKEN = '<TOKEN>';

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to safely extract text from potentially complex message objects
  const extractTextFromMessage = (messageObj) => {
    if (typeof messageObj === 'string') return messageObj;
    
    // If it's an object with a text property
    if (messageObj && typeof messageObj === 'object') {
      if (typeof messageObj.text === 'string') return messageObj.text;
      if (typeof messageObj.message === 'string') return messageObj.message;
      
      // Specific structure we've seen in the error
      if (messageObj.data && typeof messageObj.data.text === 'string') {
        return messageObj.data.text;
      }
    }
    
    // Last resort, try to stringify if possible or return default message
    try {
      return typeof messageObj === 'object' 
        ? JSON.stringify(messageObj) 
        : "Sorry, I couldn't process that request.";
    } catch (e) {
      return "Sorry, I couldn't process that request.";
    }
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
      // Use Langflow API with the exact format provided
      const response = await fetch(LANGFLOW_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': LANGFLOW_API_KEY
        },
        body: JSON.stringify({
          input_value: userMessage.text,
          output_type: "chat",
          input_type: "chat",
          tweaks: {
            "ChatInput-xhLar": {},
            "Agent-UtSYh": {},
            "ChatOutput-dc8KG": {},
            "PythonREPLComponent-nMGPz": {}
          }
        })
      });

      const data = await response.json();
      console.log('Full response:', JSON.stringify(data));
      
      // Extract response from the correct path in the complex response structure
      let responseMessage = null;
      
      if (data && data.outputs && Array.isArray(data.outputs) && data.outputs.length > 0) {
        const output = data.outputs[0];
        console.log('Output[0]:', JSON.stringify(output));
        
        // Try all possible paths where the message might be
        if (output.messages && Array.isArray(output.messages) && output.messages.length > 0) {
          console.log('Messages path exists:', output.messages[0]);
          responseMessage = output.messages[0].message;
        }
        else if (output.results && output.results.message) {
          console.log('Results.message path exists');
          responseMessage = output.results.message;
        }
        else if (output.artifacts && output.artifacts.message) {
          console.log('Artifacts.message path exists');
          responseMessage = output.artifacts.message;
        }
        else {
          // Last resort: try to find any text or message field at any level
          console.log('Trying to find message in any field');
          const findMessage = (obj) => {
            if (!obj || typeof obj !== 'object') return null;
            
            if (obj.text) return obj.text;
            if (obj.message) return obj.message;
            
            for (const key in obj) {
              const result = findMessage(obj[key]);
              if (result) return result;
            }
            
            return null;
          };
          
          responseMessage = findMessage(output);
        }
      }
      
      // Make sure we extract just the text string to avoid rendering objects
      const responseText = extractTextFromMessage(responseMessage);
      console.log('Final response text:', responseText);
      
      // Add AI response to chat
      const aiMessage = { 
        text: responseText,
        isUser: false 
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error communicating with Langflow:', error);
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
