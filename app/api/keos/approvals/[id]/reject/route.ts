import { NextRequest, NextResponse } from "next/server";

const CENTRAL_API_URL =
  process.env.KRVE_CENTRAL_API_URL ||
  process.env.NEXT_PUBLIC_KRVE_CENTRAL_API_URL ||
  "http://localhost:4000";

function centralUrl(path: string) {
  return `${CENTRAL_API_URL.replace(/\/$/, "")}${path}`;
}

export async function POST(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Approval ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const body = await request
      .json()
      .catch(() => ({}));

    const response = await fetch(
      centralUrl(
        `/api/keos/approvals/${encodeURIComponent(id)}/reject`,
      ),
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          decisionNote:
            typeof body?.decisionNote === "string"
              ? body.decisionNote
              : "",
        }),
      },
    );

    const text = await response.text();

    let data: unknown = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = {
        error:
          text ||
          "Invalid response from KRVE Central API.",
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
    console.error(
      "KEOS_APPROVAL_REJECT_PROXY_ERROR",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to reject this request.",
      },
      {
        status: 500,
      },
    );
  }
}
