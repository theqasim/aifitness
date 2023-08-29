import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  // Manually parsing the body
  const body = await req.text();
  const parsedBody = JSON.parse(body);

  const { gender, fitnessGoals, laggingMuscles, workoutDays, weightGoal } =
    parsedBody;

  const userContent = `Gender: ${gender}, Fitness Goals: ${fitnessGoals}, Lagging Muscle Groups: ${laggingMuscles}, Days a week I want to train: ${workoutDays}, Weight Goal: ${weightGoal}`;

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an expert in fitness. Based on user inputs, please provide daily workouts consisting of exercises and reps in JSON format. Each day must be given a numeric format. Users will specify their gender, goals (strength training or muscle building), any lagging muscle groups, how many days a week they want to workout, and whether they aim to bulk up or lean out. Each workout day should be represented as an object with a 'day' key and an 'exercises' array that contains objects with 'name' and 'reps' keys. Do not mix upper and lower body exercises on the same day. Provide 4-6 exercises per day, and ensure that exercises cover all muscle groups. No additional notes or advice are needed.",
      },
      {
        role: "user",
        content: userContent,
      },
    ],
    temperature: 1,
    max_tokens: 1750,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_API_KEY}`,
        },
      }
    );

    if (response && response.data) {
      return new NextResponse(JSON.stringify(response.data));
    }

    throw new Error("No response from the API.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in POST:", error.message);
      return new NextResponse(
        JSON.stringify({
          error: "Error fetching data from OpenAI: " + error.message,
        }),
        { status: 500 }
      );
    } else {
      console.error("Unknown error in POST");
      return new NextResponse(
        JSON.stringify({
          error: "An unknown error occurred.",
        }),
        { status: 500 }
      );
    }
  }
}

export { POST };
