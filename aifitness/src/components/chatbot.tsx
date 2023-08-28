import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: 'Coach',
      text: 'Hello! How can I assist you with your workout plan today?'
    },
    {
      sender: 'You',
      text: "I'm looking for a strength training routine."
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: 'You', text: inputValue.trim() }]);
      setInputValue(''); // clear the input
    }
  };

  return (
    <div className="mt-20 w-full lg:w-2/4 bg-white rounded-md shadow-lg font-mons">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">FitnessAI Coach</h2>
      </div>

      {/* Chat display area */}
      <div className="p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
          <div className={message.sender === 'You' ? 'text-blue-600 mb-2' : 'text-green-600 mb-2'}>
              {message.sender}
          </div>
          <div className={message.sender === 'You' ? 'bg-blue-100 p-2 rounded-md' : 'bg-green-100 p-2 rounded-md'}>
              <p>{message.text}</p>
          </div>
      </div>

        ))}
      </div>

      {/* Chat input area */}
      <div className="p-4 border-t">
        <textarea
          rows={2}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="w-full p-2 rounded-md border focus:outline-none focus:border-blue-500 resize-y"
        ></textarea>

        <button onClick={handleSendClick} className="mt-2 bg-blue-500 text-white p-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
