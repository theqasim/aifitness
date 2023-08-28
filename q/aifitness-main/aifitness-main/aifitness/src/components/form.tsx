import { useState } from "react";
import Loadinganimation from "./loadinganimation";
import Chatbot from "./chatbot";

function WorkoutForm({ onFormSubmit }: { onFormSubmit: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstChatbotMessage, setFirstChatbotMessage] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    gender: "male",
    fitnessGoals: "strength",
    laggingMuscles: "",
    workoutDays: "",
    weightgoal: "weightgoal",
  });

  const isFormValid = (): boolean => {
    const { gender, fitnessGoals, laggingMuscles, workoutDays, weightgoal } =
      formData;

    return (
      !!gender &&
      !!fitnessGoals &&
      !!laggingMuscles &&
      !!workoutDays &&
      !!weightgoal
    );
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/generateWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      setFirstChatbotMessage(responseData.choices[0].message.content); // assuming the data has a "data" field, adjust if different
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(
        "There was an error generating your workout plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <option value="nopref">N/A</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            {loading && <Loadinganimation />}
            <button
              type="submit"
              className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:bg-black hover:text-white group bg-white"
            >
              <span className="relative">Generate Workout Plan</span>
            </button>
          </div>
        </form>
      </div>

      {firstChatbotMessage && <Chatbot initialMessage={firstChatbotMessage} />}
    </div>
  );
}

export default WorkoutForm;
