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

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      applicationId: string;
    }>;
  },
) {
  try {
    const {
      applicationId,
    } =
      await context.params;

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

    if (
      !applicationId ||
      !applicationId.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const body =
      await request.text();

    const response =
      await fetch(
        `${baseUrl}/keos/live-projects/${encodeURIComponent(
          applicationId,
        )}`,
        {
          method:
            "PATCH",

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

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error(
      "KEOS_LIVE_PROJECT_UPDATE_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Live project could not be updated.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      applicationId: string;
    }>;
  },
) {
  return PATCH(
    request,
    context,
  );
}
