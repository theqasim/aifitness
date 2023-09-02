import React, { useEffect, useRef, useState } from "react";
import { formatWorkoutMessage } from "@/app/lib/formatWorkoutMessage";

function Chatbot({
  initialMessage,
  convoData,
}: {
  initialMessage?: string;
  convoData: any[];
}) {
  const chatRef = useRef<HTMLDivElement>(null);
  const [latestUserMessage, setLatestUserMessage] = useState<string | null>(
    null
  );
  const [localConvoData, setLocalConvoData] = useState<any[]>(convoData);
  const [isCoachTyping, setIsCoachTyping] = useState(false);

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
    const textToCopy = element.innerText;
    navigator.clipboard.writeText(textToCopy);
  };

  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
      }, 0);
    }
  }, [messages, isCoachTyping]);

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: "You", text: inputValue.trim() }]);
      setInputValue("");
      setLatestUserMessage(inputValue.trim());
    }
  };

  useEffect(() => {
    if (latestUserMessage !== null) {
      const updatedConvoData = [
        ...localConvoData,
        {
          role: "user",
          content: latestUserMessage,
        },
      ];
      setLocalConvoData(updatedConvoData);

      const fetchData = async () => {
        setIsCoachTyping(true);
        try {
          const response = await fetch("/api/aiCoach", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ convoBody: updatedConvoData }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }

          const responseData = await response.json();

          const coachMessage = responseData.choices[0].message.content;

          let formattedCoachMessage;
          try {
            JSON.parse(coachMessage);
            formattedCoachMessage = formatWorkoutMessage(coachMessage);
          } catch (e) {
            formattedCoachMessage = coachMessage;
          }

          const newConvoData = [
            ...localConvoData,
            {
              role: "assistant",
              content: JSON.stringify(coachMessage),
            },
          ];
          setLocalConvoData(newConvoData);

          setMessages([
            ...messages,
            { sender: "Coach", text: formattedCoachMessage },
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setIsCoachTyping(false);
      };

      fetchData();
    }
  }, [latestUserMessage]);

  return (
    <div className="mt-10 w-full lg:w-3/4 bg-white rounded-md shadow-lg font-mons">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold black-underline-effect">
          FitnessAI Coach
        </h2>
      </div>

      <div ref={chatRef} className="p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.sender === "You" ? "justify-end" : ""
            }`}
          >
            {message.sender === "Coach" && (
              <img
                src="/resources/coach-image.png"
                alt="Coach profile"
                className="h-10 w-10 mr-2 rounded-full"
              />
            )}
            <div
              className={`p-2 rounded-md ${
                message.sender === "You" ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              <p>{message.text}</p>
            </div>
            {message.sender === "You" && (
              <img
                src="/resources/generic-image.png"
                alt="Your profile"
                className="ml-2 h-10 w-10 rounded-full"
              />
            )}
          </div>
        ))}
        {isCoachTyping && (
          <div className="mb-4 flex justify-start">
            <img
              src="/resources/coach-image.png"
              alt="Coach profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-2 p-2 bg-green-100 rounded-md">
              <p>
                Coach is typing
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t flex items-center">
        <textarea
          rows={2}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={`flex-grow p-2 rounded-md border resize-none focus:outline-none focus:border-blue-500  ${
            isCoachTyping ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
          disabled={isCoachTyping}
        ></textarea>
        {/* <button
          onClick={handleSendClick}
          className="ml-4 bg-black text-white p-2 rounded-md"
        >
          Send
        </button> */}
        <button
          className="relative inline-block text-sm group ml-2"
          onClick={handleSendClick}
        >
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Send</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
