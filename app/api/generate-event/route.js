import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Simple non-AI logic (can be improved later)
    const eventData = {
      title: prompt.slice(0, 40) + " Event",
      description: `This event is based on the idea: ${prompt}`,
      category: "general",
      suggestedCapacity: 50,
      suggestedTicketType: "free",
    };

    return NextResponse.json(eventData);
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
