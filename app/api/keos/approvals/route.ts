import { NextResponse } from "next/server";

const CENTRAL_API_URL =
  process.env.KRVE_CENTRAL_API_URL ||
  process.env.NEXT_PUBLIC_KRVE_CENTRAL_API_URL ||
  "http://localhost:4000";

async function getCentralUrl(path: string) {
  return `${CENTRAL_API_URL.replace(/\/$/, "")}${path}`;
}

export async function GET() {
  try {
    const url = await getCentralUrl("/api/keos/approvals");

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const text = await response.text();

    let data: unknown = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = {
        error: text || "Invalid response from KRVE Central API",
      };
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            typeof data === "object" &&
            data !== null &&
            "error" in data
              ? String(
                  (data as { error?: unknown }).error ??
                    `KRVE Central API returned ${response.status}`,
                )
              : `KRVE Central API returned ${response.status}`,
          status: response.status,
          data,
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("KEOS_APPROVALS_PROXY_ERROR", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to connect to KRVE Central API.",
      },
      {
        status: 500,
      },
    );
  }
}
