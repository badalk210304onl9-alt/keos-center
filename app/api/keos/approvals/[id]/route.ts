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

function getConfig() {
  const baseUrl = (
    process.env.KRVE_CENTRAL_API_URL ||
    process.env.KRVE_API_URL ||
    "https://krve-central-api.badalk210304-onl9.workers.dev"
  ).replace(/\/+$/, "");

  return {
    baseUrl,
    secret:
      process.env.KEOS_API_SECRET?.trim(),
  };
}

async function readResponse(
  response: Response,
) {
  const text =
    await response.text();

  if (!text) {
    return {
      success: response.ok,
    };
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: response.ok,
      message: text,
    };
  }
}

export async function GET(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } =
      await context.params;

    const {
      baseUrl,
      secret,
    } = getConfig();

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

    const response =
      await fetch(
        `${baseUrl}/keos/approvals/${encodeURIComponent(id)}`,
        {
          method: "GET",
          headers: {
            Accept:
              "application/json",
            "X-KEOS-API-Key":
              secret,
          },
          cache: "no-store",
        },
      );

    const data =
      await readResponse(response);

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
            : "Unable to load approval.",
      },
      { status: 500 },
    );
  }
}
