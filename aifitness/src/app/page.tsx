"use client"

import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    gender: '',
    fitnessGoals: '',
    laggingMuscles: '',
    workoutDays: '',
    preference: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
<main className="flex flex-col items-center justify-center min-h-screen p-24 bg-gradient-to-t from-violet-600 to-cyan-300">

<div className="mb-12 text-center w-full">
    <h1 className="text-4xl font-bold mb-4 font-mons text-stone-950">Start your fitness journey today!</h1>
    <p className="text-xl text-stone-950">FitnessAI was built to remove the guesswork from working out, and to simply the process of starting. Within seconds you will be given a plan to help you reach your goals.</p>
</div>

<div className="flex flex-col md:flex-row items-center w-full space-y-6 md:space-y-0 md:space-x-6">
    <Image
        src="/resources/avatar2.png"
        alt="Description of the image"
        width={600}
        height={300}
        className="w-full md:w-auto object-none rounded-lg"
    />
    <div className="flex flex-col items-center justify-center w-full lg:w-2/4 shadow-lg p-5 bg-white rounded-md font-mons">
          <div className="flex items-center justify-center w-4/4 mt-10">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  Gender:
                </label>
                <select id="gender" name="gender" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fitnessGoals">
                  Fitness Goals:
                </label>
                <select id="fitnessGoals" name="fitnessGoals" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="strength">Strength Training</option>
                  <option value="muscle">Muscle Building</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="laggingMuscles">
                  Lagging Muscle Groups:
                </label>
                <input id="laggingMuscles" type="text" name="laggingMuscles" onChange={handleChange} placeholder="e.g., biceps, calves" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workoutDays">
                  How many days a week do you want to workout?
                </label>
                <input id="workoutDays" type="number" name="workoutDays" min="1" max="7" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weightgoal">
                  Weight Goal:
                </label>
                <select id="weightgoal" name="weightgoal" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="bulk">Bulk Up</option>
                  <option value="lean">Lean Out</option>
                </select>
              </div>
              <div className="flex items-center justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
