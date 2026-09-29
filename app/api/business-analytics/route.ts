import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getApiUrl() {
  const value =
    process.env.KRVE_API_URL?.trim();

  if (!value) {
    throw new Error(
      "KRVE_API_URL is missing in Vercel Environment Variables.",
    );
  }

  return value.replace(/\/+$/, "");
}

function getKeosSecret() {
  const value =
    process.env.KEOS_API_SECRET?.trim();

  if (!value) {
    throw new Error(
      "KEOS_API_SECRET is missing in Vercel Environment Variables.",
    );
  }

  return value;
}

export async function GET(
  request: Request,
) {
  try {
    const apiUrl = getApiUrl();
    const secret = getKeosSecret();

    const incomingUrl =
      new URL(request.url);

    const searchParams =
      incomingUrl.searchParams;

    const upstreamParams =
      new URLSearchParams();

    const from =
      searchParams
        .get("from")
        ?.trim();

    const to =
      searchParams
        .get("to")
        ?.trim();

    if (from) {
      upstreamParams.set(
        "from",
        from,
      );
    }

    if (to) {
      upstreamParams.set(
        "to",
        to,
      );
    }

    const queryString =
      upstreamParams.toString();

    const endpoint =
      `${apiUrl}/keos/business-analytics` +
      (
        queryString
          ? `?${queryString}`
          : ""
      );

    const response =
      await fetch(
        endpoint,
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

    let data:
      | {
          success?: boolean;
          message?: string;
          data?: unknown;
        }
      | null = null;

    try {
      data =
        await response.json();
    } catch {
      data = null;
    }

    if (
      !response.ok ||
      !data?.success
    ) {
      console.error(
        "KEOS_BUSINESS_ANALYTICS_API_ERROR",
        {
          endpoint,
          status:
            response.status,
          response:
            data,
        },
      );

      return NextResponse.json(
        {
          success: false,

          message:
            data?.message ||
            "Unable to load business analytics from KRVE Central API.",

          data: null,
        },
        {
          status:
            response.status >= 400
              ? response.status
              : 500,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:
          data.data ?? null,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "KEOS_BUSINESS_ANALYTICS_ROUTE_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load KRVE business analytics.",

        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
