"use client";
import Image from "next/image";
import TopSection from "@/components/topsection";
import { useState } from "react";
import WorkoutWithChatbot from "@/components/workoutwithchatbot";

export default function Home() {
  const [chatbotMessage, setChatbotMessage] = useState<string | null>(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-bggrey">
      <TopSection />
      <div className="grid grid-rows-[auto,1fr] gap-6 w-full ">
        <div className="flex flex-col  lg:flex-row items-start w-full space-y-6 lg:space-y-0 lg:space-x-6">
          <Image
            src="/resources/avatar5.png"
            alt="Description of the image"
            width={600}
            height={300}
            className="w-full md:w-auto object-none rounded-lg drop-shadow-lg border-4 border-white"
          />
          {<WorkoutWithChatbot />}
        </div>
      </div>
    </main>
  );
}
