import {
  NextRequest,
  NextResponse,
} from "next/server";

function getConfig() {
  const baseUrl =
    (
      process.env
        .KRVE_CENTRAL_API_URL ||
      "https://krve-central-api.badalk210304-onl9.workers.dev"
    ).replace(/\/+$/, "");

  const secret =
    process.env
      .KEOS_API_SECRET;

  return {
    baseUrl,
    secret,
  };
}

export async function GET(
  request: NextRequest,
) {
  try {
    const {
      baseUrl,
      secret,
    } =
      getConfig();

    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "KEOS_API_SECRET is missing in Vercel Environment Variables.",
        },
        {
          status: 500,
        },
      );
    }

    const targetUrl =
      new URL(
        `${baseUrl}/keos/live-projects`,
      );

    request.nextUrl.searchParams.forEach(
      (
        value,
        key,
      ) => {
        targetUrl.searchParams.set(
          key,
          value,
        );
      },
    );

    const response =
      await fetch(
        targetUrl.toString(),
        {
          method:
            "GET",

          headers: {
            Accept:
              "application/json",

            "X-KEOS-API-Key":
              secret,
          },

          cache:
            "no-store",
        },
      );

    const data =
      await response.json();

    return NextResponse.json(
      data,
      {
        status:
          response.status,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error(
      "KEOS_LIVE_PROJECTS_GET_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Live projects could not be loaded.",
      },
      {
        status: 500,
      },
    );
  }
}
