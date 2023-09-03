import React from "react";
import WorkoutForm from "./form";
import Chatbot from "./chatbot";

function WorkoutWithChatbot() {
  const [chatbotMessage, setChatbotMessage] = React.useState<string | null>(
    null
  );
  const [convoData, setConvoData] = React.useState<any[]>([]);

  const handleFormSubmit = (message: string) => {
    setChatbotMessage(message);
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <div className="flex flex-col lg:flex-row w-full lg:space-x-6 ml-16">
        <WorkoutForm
          onFormSubmit={handleFormSubmit}
          onConvoDataChange={setConvoData}
        />
      </div>
      <div className="w-full ml-16">
        {chatbotMessage && (
          <Chatbot initialMessage={chatbotMessage} convoData={convoData} />
        )}
      </div>
    </div>
  );
}
export default WorkoutWithChatbot;
