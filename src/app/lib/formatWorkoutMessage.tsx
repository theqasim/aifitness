import React from "react";

interface Exercise {
  name: string;
  reps: string;
}

interface Day {
  day: string;
  exercises: Exercise[];
}

export function formatWorkoutMessage(workoutJson: string): JSX.Element[] {
  const workoutData = JSON.parse(workoutJson);

  const formattedMessage: JSX.Element[] = [];

  const keys = Object.keys(workoutData);

  keys.forEach((workoutDayKey) => {
    const workoutDay: Day = workoutData[workoutDayKey];
    const day: string = workoutDay.day;
    const exercises: Exercise[] = workoutDay.exercises;

    if (exercises) {
      const formattedExercises: string = exercises
        .map((exercise: Exercise) => {
          return `${exercise.name} - ${exercise.reps}`;
        })
        .join("\n");

      formattedMessage.push(
        <div className="mt-2" key={day}>
          <h3>{`${day}:`}</h3>
          <ul>
            {formattedExercises
              .split("\n")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </div>
      );
    } else {
      console.warn(`No exercises found for ${day}`);
    }
  });

  return formattedMessage;
}
