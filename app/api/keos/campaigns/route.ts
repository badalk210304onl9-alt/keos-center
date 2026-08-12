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
    } = getConfig();

    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "KEOS_API_SECRET is missing.",
        },
        {
          status: 500,
        },
      );
    }

    const includeHistory =
      request.nextUrl.searchParams.get(
        "includeHistory",
      );

    const url =
      new URL(
        `${baseUrl}/keos/campaigns`,
      );

    if (includeHistory) {
      url.searchParams.set(
        "includeHistory",
        includeHistory,
      );
    }

    const response =
      await fetch(
        url.toString(),
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
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load seasonal campaigns.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(
  request: NextRequest,
) {
  try {
    const {
      baseUrl,
      secret,
    } = getConfig();

    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "KEOS_API_SECRET is missing.",
        },
        {
          status: 500,
        },
      );
    }

    const body =
      await request.text();

    const response =
      await fetch(
        `${baseUrl}/keos/campaigns`,
        {
          method:
            "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            "X-KEOS-API-Key":
              secret,
          },

          body,

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
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to create seasonal campaign.",
      },
      {
        status: 500,
      },
    );
  }
}
