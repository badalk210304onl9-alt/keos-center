import {
  NextRequest,
  NextResponse,
} from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } =
      await context.params;

    const baseUrl = (
      process.env.KRVE_CENTRAL_API_URL ||
      process.env.KRVE_API_URL ||
      "https://krve-central-api.badalk210304-onl9.workers.dev"
    ).replace(/\/+$/, "");

    const secret =
      process.env.KEOS_API_SECRET?.trim();

    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "KEOS_API_SECRET is missing in Vercel Environment Variables.",
        },
        { status: 500 },
      );
    }

    const body =
      await request.text();

    const response =
      await fetch(
        `${baseUrl}/keos/approvals/${encodeURIComponent(id)}/approve`,
        {
          method: "POST",
          headers: {
            Accept:
              "application/json",
            "Content-Type":
              "application/json",
            "X-KEOS-API-Key":
              secret,
          },
          body,
          cache: "no-store",
        },
      );

    const text =
      await response.text();

    let data: unknown;

    try {
      data = text
        ? JSON.parse(text)
        : {
            success:
              response.ok,
          };
    } catch {
      data = {
        success:
          response.ok,
        message: text,
      };
    }

    return NextResponse.json(
      data,
      {
        status:
          response.status,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to approve request.",
      },
      { status: 500 },
    );
  }
}
