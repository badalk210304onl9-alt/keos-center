import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return NextResponse.json(
        {
          error: "Please enter a question.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not configured on the server.",
        },
        {
          status: 500,
        }
      );
    }

    const model =
      process.env.GEMINI_MODEL ||
      "gemini-2.5-flash";

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      model +
      ":generateContent";

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },

      body: JSON.stringify({
        contents: [
          {
            role: "user",

            parts: [
              {
                text:
                  "You are KRVE AI, the internal AI assistant for KRVE – The Fashion Studio and KEOS. Answer clearly and professionally.\n\nUser question:\n" +
                  message,
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

    const responseText =
      await response.text();

    if (!response.ok) {
      console.error(
        "Gemini API error:",
        response.status,
        responseText
      );

      return NextResponse.json(
        {
          error:
            "Gemini API error (" +
            response.status +
            ")",
        },
        {
          status: 502,
        }
      );
    }

    let data: any;

    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid response received from Gemini.",
        },
        {
          status: 502,
        }
      );
    }

    const parts =
      data?.candidates?.[0]?.content?.parts;

    let answer = "";

    if (Array.isArray(parts)) {
      for (const part of parts) {
        if (
          typeof part?.text === "string"
        ) {
          answer += part.text;
        }
      }
    }

    answer = answer.trim();

    if (!answer) {
      return NextResponse.json(
        {
          error:
            "Gemini did not return an answer.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      answer: answer,
      source: "Gemini",
      model: model,
    });
  } catch (error) {
    console.error(
      "KRVE AI route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to process your KRVE AI request.",
      },
      {
        status: 500,
      }
    );
  }
}
