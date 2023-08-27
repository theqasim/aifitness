"use client";

import Image from "next/image";
import TopSection from "@/components/topsection";
import WorkoutForm from "@/components/form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-bggrey">
      <TopSection />
      <div className="flex flex-col lg:flex-row items-center w-full space-y-6 lg:space-y-0 lg:space-x-6">
        <Image
          src="/resources/avatar2.png"
          alt="Description of the image"
          width={600}
          height={300}
          className="w-full md:w-auto object-none rounded-lg drop-shadow-lg"
        />
        <WorkoutForm />
      </div>
    </main>
  );
}
