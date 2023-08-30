import React, { useEffect, useRef, useState } from "react";

function Chatbot({ initialMessage }: { initialMessage?: string }) {
  const chatRef = useRef<HTMLDivElement>(null);

  const defaultMessages = [
    {
      sender: "Coach",
      text: "Hello! Here is your personalized workout plan, let me know if you have any questions! ",
    },
  ];

  if (initialMessage) {
    defaultMessages.unshift({
      sender: "Coach",
      text: initialMessage,
    });
  }

  const [messages, setMessages] = useState(defaultMessages);
  const [inputValue, setInputValue] = useState("");

  const copyToClipboard = (element: HTMLDivElement) => {
    const textToCopy = element.innerText; // Gets all text within the div
    navigator.clipboard.writeText(textToCopy);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: "You", text: inputValue.trim() }]);
      setInputValue("");
    }
  };

  return (
    <div className="mt-20 w-full lg:w-2/4 bg-white rounded-md shadow-lg font-mons">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">FitnessAI Coach</h2>
      </div>

      <div ref={chatRef} className="p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-4 relative">
            <div
              className={
                message.sender === "You"
                  ? "text-blue-600 mb-2"
                  : "text-green-600 mb-2"
              }
            >
              {message.sender}
            </div>
            <div
              className={
                message.sender === "You"
                  ? "bg-blue-100 p-2 rounded-md"
                  : "bg-green-100 p-2 rounded-md"
              }
              data-clipboard-text={message.text}
            >
              <p className="w-11/12">{message.text}</p>
              {message.sender === "Coach" && (
                <span
                  className="absolute mt-10 mr-2 top-0 right-0 cursor-pointer"
                  onClick={(e) =>
                    copyToClipboard(
                      e.currentTarget.parentElement! as HTMLDivElement
                    )
                  }
                >
                  <img
                    className="hover:drop-shadow rounded-md outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                    src="/resources/clipboardicon.png"
                    alt="Copy to Clipboard"
                  ></img>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex items-center">
        <textarea
          rows={2}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-md border focus:outline-none focus:border-blue-500 resize-y"
        ></textarea>
        <button
          onClick={handleSendClick}
          className="ml-4 bg-black text-white p-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
