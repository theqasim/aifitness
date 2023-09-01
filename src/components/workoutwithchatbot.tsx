import React from "react";
import WorkoutForm from "./form";
import Chatbot from "./chatbot";

function WorkoutWithChatbot() {
  console.log("Parent component rendering");
  const [chatbotMessage, setChatbotMessage] = React.useState<string | null>(
    null
  );
  const [convoData, setConvoData] = React.useState<any[]>([]);

  const handleFormSubmit = (message: string) => {
    setChatbotMessage(message);
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <div className="flex flex-col lg:flex-row w-full lg:space-x-6">
        <WorkoutForm
          onFormSubmit={handleFormSubmit}
          onConvoDataChange={setConvoData}
        />
      </div>
      <div className="w-full">
        {chatbotMessage && (
          <Chatbot initialMessage={chatbotMessage} convoData={convoData} />
        )}
      </div>
    </div>
  );
}
export default WorkoutWithChatbot;
