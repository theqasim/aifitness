// Home.tsx
"use client";
import Image from "next/image";
import TopSection from "@/components/topsection";
import WorkoutForm from "@/components/form";
import { useState } from "react";
import Chatbot from "../components/chatbot";

export default function Home() {
  const [showChatbot, setShowChatbot] = useState(false); // state to control the display of Chatbot

  const handleFormSubmission = () => {
    setShowChatbot(true); // Set the state to display the Chatbot when form is submitted
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-bggrey">
      <TopSection />
      <div className="flex flex-col lg:flex-row items-center w-full space-y-6 lg:space-y-0 lg:space-x-6">
        <Image
          src="/resources/avatar2.png"
          alt="Description of the image"
          width={600}
          height={300}
          className="w-full md:w-auto object-none rounded-lg drop-shadow-lg border-4 border-white"
        />
        <WorkoutForm onFormSubmit={handleFormSubmission} />{" "}
        {/* Passing the callback here */}
      </div>
      {showChatbot && <Chatbot />}
    </main>
  );
}