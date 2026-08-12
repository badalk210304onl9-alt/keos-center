import {
  NextRequest,
  NextResponse,
} from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function getConfig() {
  const baseUrl = (
    process.env.KRVE_CENTRAL_API_URL ||
    "https://krve-central-api.badalk210304-onl9.workers.dev"
  ).replace(/\/+$/, "");

  const secret =
    process.env.KEOS_API_SECRET;

  return {
    baseUrl,
    secret,
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

/*
 * =========================================================
 * GET SINGLE CAMPAIGN
 * =========================================================
 */

export async function GET(
  _request: NextRequest,
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
            "KEOS_API_SECRET is missing.",
        },
        {
          status: 500,
        },
      );
    }

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Campaign ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const response =
      await fetch(
        `${baseUrl}/keos/campaigns/${encodeURIComponent(
          id,
        )}`,
        {
          method: "GET",

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
      await readResponse(
        response,
      );

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      },
    );
  } catch (error) {
    console.error(
      "KEOS_CAMPAIGN_GET_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load campaign.",
      },
      {
        status: 500,
      },
    );
  }
}

/*
 * =========================================================
 * UPDATE CAMPAIGN
 * =========================================================
 */

export async function PATCH(
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
            "KEOS_API_SECRET is missing.",
        },
        {
          status: 500,
        },
      );
    }

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Campaign ID is required.",
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
        `${baseUrl}/keos/campaigns/${encodeURIComponent(
          id,
        )}`,
        {
          method: "PATCH",

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
      await readResponse(
        response,
      );

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      },
    );
  } catch (error) {
    console.error(
      "KEOS_CAMPAIGN_PATCH_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to update campaign.",
      },
      {
        status: 500,
      },
    );
  }
}

/*
 * =========================================================
 * DELETE / ARCHIVE CAMPAIGN
 * =========================================================
 */

export async function DELETE(
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
            "KEOS_API_SECRET is missing.",
        },
        {
          status: 500,
        },
      );
    }

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Campaign ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Forward query parameters too.
     *
     * Example:
     * ?deleteProducts=true
     *
     * This allows Central API to decide
     * whether campaign products should
     * also be removed.
     */

    const targetUrl =
      new URL(
        `${baseUrl}/keos/campaigns/${encodeURIComponent(
          id,
        )}`,
      );

    request.nextUrl.searchParams.forEach(
      (value, key) => {
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
          method: "DELETE",

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
      await readResponse(
        response,
      );

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      },
    );
  } catch (error) {
    console.error(
      "KEOS_CAMPAIGN_DELETE_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to delete campaign.",
      },
      {
        status: 500,
      },
    );
  }
}
