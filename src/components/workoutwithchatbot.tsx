import React, { useRef, useEffect, useState } from "react";
import WorkoutForm from "./form";
import Chatbot from "./chatbot";

function WorkoutWithChatbot() {
  const chatbotRef = useRef<HTMLDivElement>(null);
  const [chatbotMessage, setChatbotMessage] = useState<
    string | JSX.Element[] | null
  >(null);
  const [convoData, setConvoData] = useState<any[]>([]);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleFormSubmit = (message: string | JSX.Element[]) => {
    setChatbotMessage(message);
    setShowChatbot(true);
  };

  useEffect(() => {
    if (showChatbot && chatbotRef.current) {
      setTimeout(() => {
        chatbotRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [showChatbot]);

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <div className="flex flex-col lg:flex-row w-full lg:space-x-6 ">
        <WorkoutForm
          onFormSubmit={handleFormSubmit}
          onConvoDataChange={setConvoData}
        />
      </div>
      <div ref={chatbotRef} className="w-full ">
        {chatbotMessage && (
          <Chatbot initialMessage={chatbotMessage} convoData={convoData} />
        )}
      </div>
    </div>
  );
}

export default WorkoutWithChatbot;
