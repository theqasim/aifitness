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
    const textToCopy = element.innerText; // Gets all text within the div
    navigator.clipboard.writeText(textToCopy);
    //console.log(convoData);
  };

  useEffect(() => {
    if (chatRef.current) {
      // Use a timeout to ensure the DOM has updated before setting the scroll position
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
      setLatestUserMessage(inputValue.trim()); // Store the latest user message
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
      console.log("After update:", updatedConvoData);

      // Make the POST request to /api/aiCoach
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

          // Extract the coach's message from the response
          const coachMessage = responseData.choices[0].message.content;

          let formattedCoachMessage;
          try {
            JSON.parse(coachMessage);
            formattedCoachMessage = formatWorkoutMessage(coachMessage);
          } catch (e) {
            // If parsing fails, it's not a JSON-formatted workout plan
            formattedCoachMessage = coachMessage;
          }

          // Add the coach's message to the local conversation data and messages state
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
        <h2 className="text-xl font-bold">FitnessAI Coach</h2>
      </div>

      <div ref={chatRef} className="p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 flex ${message.sender === "You" ? "justify-end" : ""}`}>
            {message.sender === "Coach" && (
              <img src="/resources/coach-image.png" alt="Coach profile" className="h-10 w-10 mr-2 rounded-full" />
            )}
            <div className={`p-2 rounded-md ${message.sender === "You" ? "bg-blue-100" : "bg-green-100"}`}>
              <p>{message.text}</p>
            </div>
            {message.sender === "You" && (
              <img src="/resources/generic-image.png" alt="Your profile" className="ml-2 h-10 w-10 rounded-full" />
            )}
          </div>
        ))}
        {isCoachTyping && (
          <div className="mb-4 flex justify-start">
            <img src="/resources/coach-image.png" alt="Coach profile" className="h-10 w-10 rounded-full" />
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
          className={`flex-grow p-2 rounded-md border focus:outline-none focus:border-blue-500 resize-y ${isCoachTyping ? "bg-gray-300 cursor-not-allowed" : ""}`}
          disabled={isCoachTyping}
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
