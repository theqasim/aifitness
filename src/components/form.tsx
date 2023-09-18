import { useState } from "react";
import Loadinganimation from "./loadinganimation";
import { formatWorkoutMessage } from "@/app/lib/formatWorkoutMessage";

interface WorkoutFormProps {
  onFormSubmit: (message: string | JSX.Element[]) => void;
  onConvoDataChange: (data: any[]) => void;
}

function WorkoutForm(props: WorkoutFormProps) {
  const { onFormSubmit, onConvoDataChange } = props;
  const [showChatbot, setShowChatbot] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(true);
  const [isCustomGoal, setIsCustomGoal] = useState(false);

  const [firstChatbotMessage, setFirstChatbotMessage] = useState<
    string | JSX.Element[] | null
  >(null);
  const [formattedChatbotMessage, setFormattedChatbotMessage] = useState<
    JSX.Element[] | null
  >(null);
  const [formData, setFormData] = useState({
    gender: "male",
    fitnessGoals: "strength",
    targetMuscles: "",
    workoutDays: "",
    weightgoal: "Bulk Up",
    extranotes: "",
  });

  const isFormValid = (): boolean => {
    const { gender, fitnessGoals, targetMuscles, workoutDays, weightgoal, extranotes } =
      formData;

    return (
      !!gender &&
      !!fitnessGoals &&
      !!targetMuscles &&
      !!workoutDays &&
      !!extranotes &&
      !!weightgoal
    );
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    if (name === "targetMuscles") {
      const hasNumbers = /\d/.test(value);
      if (hasNumbers) {
        setIsValid(false);
        return;
      } else {
        setIsValid(true);
      }
    }

    if (name === "fitnessGoals" && value === "custom") {
      setIsCustomGoal(true);
    } else if (name === "fitnessGoals") {
      setIsCustomGoal(false);
    }

    if (name === "customGoal") {
      setFormData((prevData) => ({ ...prevData, fitnessGoals: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    if (!isValid) {
      alert("Please enter only letters in the targetMuscles' field.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generateWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      const formattedData = `Gender: ${formData.gender}, Fitness Goals: ${formData.fitnessGoals}, Target Muscles: ${formData.targetMuscles}, Workout Days: ${formData.workoutDays}, Weight Goal: ${formData.weightgoal}`;
      const convoDataStructure = [
        {
          role: "system",
          content:
            "You are an expert in fitness. Based on user inputs, please provide daily workouts consisting of exercises and reps in JSON format...",
        },
        {
          role: "user",
          content: formattedData,
        },
      ];

      const fetchedMessage = responseData.choices[0].message.content;
      const formattedMessage = formatWorkoutMessage(fetchedMessage);
      if (formattedMessage.length > 0) {
        convoDataStructure.push({
          role: "assistant",
          content: fetchedMessage,
        });

        setFirstChatbotMessage(formattedMessage);
        onFormSubmit(formattedMessage);
      } else {
        onFormSubmit("No formatted message available.");
      }

      setShowChatbot(true);
      onConvoDataChange(convoDataStructure);
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
    <div className="flex flex-col items-center justify-center md:mt-8 w-full lg:w-3/4 shadow-lg p-5 bg-white rounded-md font-mons">
      <div className="flex items-center justify-center w-4/4">
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
              <option value="custom">Custom</option>
            </select>
            {isCustomGoal && (
              <div className="mt-2">
                <input
                  type="text"
                  name="customGoal"
                  placeholder="Enter your custom fitness goal"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="targetMuscles"
            >
              Target Muscle Groups:
            </label>
            <input
              id="targetMuscles"
              type="text"
              name="targetMuscles"
              onChange={handleChange}
              placeholder="e.g. biceps, calves"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {!isValid && (
            <p className=" mb-2 text-red-500">
              Please enter only what is requested.
            </p>
          )}
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
              htmlFor="targetMuscles"
            >
              Is there anything else I should know?
            </label>
            <input
              id="extranotes"
              type="text"
              name="extranotes"
              onChange={handleChange}
              placeholder="e.g. I only have dumbbells available"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
          <div className="flex items-center justify-center">
            {loading && <Loadinganimation />}
            <button
              type="submit"
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
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;
