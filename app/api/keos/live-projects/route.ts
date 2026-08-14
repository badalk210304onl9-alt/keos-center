import { NextRequest, NextResponse } from "next/server";

const CENTRAL_API_URL =
  process.env.KRVE_CENTRAL_API_URL?.replace(/\/$/, "") ?? "";

const KEOS_API_KEY =
  process.env.KEOS_API_KEY ?? "";

function configurationError() {
  return NextResponse.json(
    {
      success: false,
      error: "KEOS Live Project API is not configured.",
    },
    {
      status: 500,
    },
  );
}

function headers() {
  return {
    "Content-Type": "application/json",
    "X-KEOS-Key": KEOS_API_KEY,
  };
}

export async function GET(request: NextRequest) {
  if (!CENTRAL_API_URL || !KEOS_API_KEY) {
    return configurationError();
  }

  try {
    const incomingUrl = new URL(request.url);

    const targetUrl = new URL(
      `${CENTRAL_API_URL}/keos/live-projects`,
    );

    incomingUrl.searchParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value);
    });

    const response = await fetch(targetUrl.toString(), {
      method: "GET",
      headers: headers(),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("LIVE_PROJECT_GET_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load live projects.",
      },
      {
        status: 500,
      },
    );
  }
}
