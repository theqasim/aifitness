import React, { useState, useEffect } from "react";

function Loadinganimation() {
  const [loadingText, setLoadingText] = useState(
    "Analysing your preferences and goals..."
  );
  const loadingOptions = [
    "Picking optimal exercises...",
    "Generating your workout plan...",
    "Assigning sets and reps per exercise...",
    "Doing the final touches...",
  ];

  useEffect(() => {
    let index = -1;
    const interval = setInterval(() => {
      index++;
      if (index < loadingOptions.length) {
        setLoadingText(loadingOptions[index]);
      } else {
        clearInterval(interval);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-5 rounded-lg flex items-center justify-center">
        <div className="border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin mr-3"></div>
        <span className="text-white">{loadingText}</span>
      </div>
    </div>
  );
}

export default Loadinganimation;
