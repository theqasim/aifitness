import React from 'react';
import WorkoutForm from './form';
import Chatbot from './chatbot';

function WorkoutWithChatbot() {
  const [chatbotMessage, setChatbotMessage] = React.useState<string | null>(null);

  const handleFormSubmit = (message: string) => {
    setChatbotMessage(message);
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      <WorkoutForm onFormSubmit={handleFormSubmit} /> {/* Passing down the callback */}
      {chatbotMessage && <Chatbot initialMessage={chatbotMessage} />}
    </div>
  );
}

export default WorkoutWithChatbot;
