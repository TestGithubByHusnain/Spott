import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Call GPT-3.5-turbo
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an event planning assistant. 
Return EXACT JSON with these fields: title, description, category, suggestedCapacity, suggestedTicketType.
Use single-line strings only. Example:
{
  "title": "Event title",
  "description": "Event description",
  "category": "tech",
  "suggestedCapacity": 50,
  "suggestedTicketType": "free"
}`,
        },
        {
          role: "user",
          content: `User's event idea: ${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    // Parse JSON safely
    let eventData;
    try {
      eventData = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse JSON:", text, err);
      return NextResponse.json(
        { error: "Failed to parse OpenAI JSON. Response: " + text },
        { status: 500 }
      );
    }

    return NextResponse.json(eventData);
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
