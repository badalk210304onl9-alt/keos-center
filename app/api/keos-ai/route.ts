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
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not configured on the server.",
        },
        { status: 500 }
      );
    }

    const model =
      process.env.GEMINI_MODEL || "gemini-3.8-flash";

    const url =
      "https://generativelanguage.googleapis.com/v1beta/interactions";

    const systemInstruction = [
      "You are KRVE AI, the internal AI assistant for KRVE – The Fashion Studio and KEOS.",
      "",
      "Answer clearly, professionally and concisely.",
      "",
      "IMPORTANT RULES:",
      "1. Never invent KRVE business data.",
      "2. Never invent sales, revenue, inventory, orders, candidates, employees or financial figures.",
      "3. If business data is not provided to you, clearly say that the data is not available in the current context.",
      "4. Do not claim that you checked KEOS unless KEOS data was actually provided.",
      "5. For general questions, answer normally.",
      "6. For KRVE-specific questions, use only verified information supplied in the prompt.",
    ].join("\n");

    const input = [
      systemInstruction,
      "",
      "User question:",
      message,
    ].join("\n");

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },

      body: JSON.stringify({
        model: model,
        input: input,
        store: false,
        generation_config: {
          thinking_level: "low",
        },
      }),
    });

    const responseText = await response.text();

    console.log(
      "KRVE AI Gemini status:",
      response.status
    );

    if (!response.ok) {
      console.error(
        "KRVE AI Gemini response:",
        responseText
      );

      let googleMessage = "";

      try {
        const errorData = JSON.parse(responseText);

        googleMessage =
          errorData?.error?.message ||
          errorData?.error?.status ||
          "";
      } catch {
        googleMessage = responseText;
      }

      return NextResponse.json(
        {
          error:
            "Gemini API error (" +
            response.status +
            "). " +
            (googleMessage || "Unknown Gemini API error."),
        },
        { status: 502 }
      );
    }

    let data: any;

    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          error: "Invalid response received from Gemini.",
        },
        { status: 502 }
      );
    }

    let answer = "";

    if (typeof data?.output_text === "string") {
      answer = data.output_text.trim();
    }

    if (!answer && Array.isArray(data?.steps)) {
      for (const step of data.steps) {
        if (
          step?.type === "model_output" &&
          Array.isArray(step?.content)
        ) {
          for (const content of step.content) {
            if (typeof content?.text === "string") {
              answer += content.text;
            }
          }
        }
      }
    }

    answer = answer.trim();

    if (!answer) {
      return NextResponse.json(
        {
          error: "Gemini did not return an answer.",
        },
        { status: 502 }
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
      { status: 500 }
    );
  }
}
