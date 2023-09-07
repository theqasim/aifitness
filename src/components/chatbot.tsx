import React, { useEffect, useRef, useState } from "react";
import { formatWorkoutMessage } from "@/app/lib/formatWorkoutMessage";

interface ChatbotProps {
  initialMessage?: string | JSX.Element[];
  convoData: any[];
}

function Chatbot({ initialMessage, convoData }: ChatbotProps) {
  const chatRef = useRef<HTMLDivElement>(null);
  const [latestUserMessage, setLatestUserMessage] = useState<string | null>(
    null
  );
  const [localConvoData, setLocalConvoData] = useState<any[]>(convoData);
  const [isCoachTyping, setIsCoachTyping] = useState(false);

  type Message = {
    sender: string;
    text: string | JSX.Element[];
  };

  const defaultMessages: Message[] = [
    {
      sender: "Coach",
      text: "Hello! Here is your personalized workout plan, let me know if you have any questions!",
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

      const fetchData = async (retryCount = 3, delay = 1000) => {
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
            if (response.status === 500 && retryCount > 0) {
              setTimeout(() => {
                fetchData(retryCount - 1, delay * 2); // Retry the request with double the delay
              }, delay);
              return;
            }
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
              className={`relative p-2 rounded-md ${
                message.sender === "You" ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              {typeof message.text === "string" ? (
                <p className="w-4/5">{message.text}</p>
              ) : (
                message.text
              )}
              {message.sender === "Coach" && (
                <span
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={(e) =>
                    copyToClipboard(
                      e.currentTarget.parentElement! as HTMLDivElement
                    )
                  }
                >
                  <img
                    className="hover:drop-shadow mr-2 mt-2 rounded-md outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                    src="/resources/clipboardicon.png"
                    alt="Copy to Clipboard"
                  />
                </span>
              )}
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

        <button onClick={handleSendClick}>
          <a
            href="#_"
            className="box-border relative z-30 inline-flex items-center justify-center w-auto px-4 ml-2 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-black rounded-md cursor-pointer group  ring-black ease focus:outline-none"
          >
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="relative z-20 flex items-center text-sm">
              <svg
                className="relative w-5 h-5 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Send
            </span>
          </a>
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
