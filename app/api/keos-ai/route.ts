import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is missing on Vercel.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const question =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    if (!question) {
      return NextResponse.json(
        {
          error: "Question is empty.",
        },
        { status: 400 }
      );
    }

    // Use Google's current REST endpoint with a known model.
    const model = "gemini-2.0-flash";

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are KRVE AI, the internal AI assistant for KRVE – The Fashion Studio and KEOS.

Answer this question clearly:

${question}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024,
        },
      }),
    });

    const raw = await response.text();

    console.log("========== GEMINI DEBUG ==========");
    console.log("STATUS:", response.status);
    console.log("MODEL:", model);
    console.log("RESPONSE:", raw);
    console.log("===================================");

    if (!response.ok) {
     return NextResponse.json(
  {
    error: `Gemini request failed (${response.status})`,
    details: raw,
  },
  { status: 502 }
);
    }

    let data: any;

    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        {
          error: "Gemini returned invalid JSON.",
          details: raw,
        },
        { status: 502 }
      );
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: any) => part?.text || "")
        .join("")
        .trim();

    if (!answer) {
      return NextResponse.json(
        {
          error: "Gemini returned no answer.",
          details: data,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      answer,
      source: "Gemini",
      model,
    });
  } catch (error) {
    console.error("KRVE AI ERROR:", error);

    return NextResponse.json(
      {
        error: "KRVE AI server error.",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}
