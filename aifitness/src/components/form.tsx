import { useState } from "react";

function Workoutform() {
  const [formData, setFormData] = useState({
    gender: "male",
    fitnessGoals: "strength",
    laggingMuscles: "",
    workoutDays: "",
    weightgoal: "weightgoal",
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
export default Workoutform;
