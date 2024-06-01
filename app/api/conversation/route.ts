import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

const FLASK_SERVER_URL = process.env.FLASK_SERVER_URL;

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!process.env.OPENAI_API_KEY)
      return new NextResponse("OpenAI API Key not configured", { status: 500 });

    if (!messages)
      return new NextResponse("Messages field is required", { status: 400 });

    const response = await axios.post(FLASK_SERVER_URL + "/api/conversation", {
      model: "gpt-3.5-turbo",
      apiKey: process.env.OPENAI_API_KEY,
      messages,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
