import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  // Manually parsing the body
  const body = await req.text();
  const parsedBody = JSON.parse(body);

  // Extract the convoBody structure from the parsed body
  const { convoBody } = parsedBody;

  if (!convoBody) {
    return new NextResponse("Missing convoBody in request", { status: 400 });
  }

  // Prepare the data for the API request
  const data = {
    model: "gpt-3.5-turbo",
    messages: convoBody,
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