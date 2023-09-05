import React from "react";
import WorkoutForm from "./form";
import Chatbot from "./chatbot";

function WorkoutWithChatbot() {
  const [chatbotMessage, setChatbotMessage] = React.useState<
    string | JSX.Element[] | null
  >(null);

  const [convoData, setConvoData] = React.useState<any[]>([]);

  const handleFormSubmit = (message: string | JSX.Element[]) => {
    setChatbotMessage(message);
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <div className="flex flex-col lg:flex-row w-full lg:space-x-6 ">
        <WorkoutForm
          onFormSubmit={handleFormSubmit}
          onConvoDataChange={setConvoData}
        />
      </div>
      <div className="w-full ">
        {chatbotMessage && (
          <Chatbot initialMessage={chatbotMessage} convoData={convoData} />
        )}
      </div>
    </div>
  );
}
export default WorkoutWithChatbot;
