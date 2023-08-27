"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    gender: "",
    fitnessGoals: "",
    laggingMuscles: "",
    workoutDays: "",
    preference: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-bggrey">
      <div className="mb-12 text-center w-full">
        <h1 className="text-4xl font-bold mb-4 font-mons text-white">
          Start your fitness journey today!
        </h1>
        <p className="text-xl text-white lg:w-1/2 sm:w-2/2 mx-auto font-poppins">
          <span className="font-bold underline-effect">FitnessAI</span> was
          built to remove the guesswork from working out, and to simplify the
          process of starting. Within seconds you will be given a plan to help
          you reach your goals.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center w-full space-y-6 lg:space-y-0 lg:space-x-6">
        <Image
          src="/resources/avatar2.png"
          alt="Description of the image"
          width={600}
          height={300}
          className="w-full md:w-auto object-none rounded-lg drop-shadow-lg"
        />
        <div className="flex flex-col items-center justify-center w-full lg:w-2/4 shadow-lg p-5 bg-white rounded-md font-mons">
          <div className="flex items-center justify-center w-4/4 mt-10">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fitnessGoals"
                >
                  Fitness Goals:
                </label>
                <select
                  id="fitnessGoals"
                  name="fitnessGoals"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="strength">Strength Training</option>
                  <option value="muscle">Muscle Building</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="laggingMuscles"
                >
                  Lagging Muscle Groups:
                </label>
                <input
                  id="laggingMuscles"
                  type="text"
                  name="laggingMuscles"
                  onChange={handleChange}
                  placeholder="e.g., biceps, calves"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="workoutDays"
                >
                  How many days a week do you want to workout?
                </label>
                <input
                  id="workoutDays"
                  type="number"
                  name="workoutDays"
                  min="1"
                  max="7"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="weightgoal"
                >
                  Weight Goal:
                </label>
                <select
                  id="weightgoal"
                  name="weightgoal"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="bulk">Bulk Up</option>
                  <option value="lean">Lean Out</option>
                </select>
              </div>
              <div className="flex items-center justify-center">
                <a
                  href="#_"
                  className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:bg-black hover:text-white group bg-white"
                >
                  <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="relative">Generate Workout Plan</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
