import { NextRequest, NextResponse } from "next/server";

type UpdateOrderStatusBody = {
  status?: string;
  courier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  location?: string;
};

const ALLOWED_STATUSES = new Set([
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const body =
      (await request.json()) as UpdateOrderStatusBody;

    const status = String(body.status || "")
      .trim()
      .toLowerCase()
      .replaceAll(" ", "_");

    if (!ALLOWED_STATUSES.has(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status.",
        },
        {
          status: 400,
        },
      );
    }

    const courier = String(body.courier || "").trim();

    const trackingNumber = String(
      body.trackingNumber || "",
    ).trim();

    const trackingUrl = String(
      body.trackingUrl || "",
    ).trim();

    const location = String(
      body.location || "",
    ).trim();

    /*
     * Shipment information is compulsory when an
     * order is marked as shipped.
     */
    if (status === "shipped") {
      if (!courier) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Courier name is required before marking the order as shipped.",
          },
          {
            status: 400,
          },
        );
      }

      if (!trackingNumber) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Tracking number is required before marking the order as shipped.",
          },
          {
            status: 400,
          },
        );
      }
    }

    /*
     * IMPORTANT:
     * The KEOS secret remains on the server.
     * It is never sent to the browser.
     */
    const centralApiUrl = (
      process.env.KRVE_CENTRAL_API_URL ||
      "https://krve-central-api.badalk210304-onl9.workers.dev"
    ).replace(/\/+$/, "");

    const keosSecret =
      process.env.KRVE_KEOS_SECRET ||
      process.env.KEOS_API_SECRET;

    if (!keosSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "KRVE KEOS API secret is not configured in Vercel.",
        },
        {
          status: 500,
        },
      );
    }

    const centralResponse = await fetch(
      `${centralApiUrl}/keos/orders/${encodeURIComponent(id)}/status`,
      {
        method: "PATCH",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          /*
           * Keep the authentication credential
           * server-side only.
           */
          "X-KEOS-Secret": keosSecret,
        },

        body: JSON.stringify({
          status,

          courier:
            courier || undefined,

          trackingNumber:
            trackingNumber || undefined,

          trackingUrl:
            trackingUrl || undefined,

          location:
            location || undefined,

          createdBy: "KEOS",
        }),

        cache: "no-store",
      },
    );

    let centralData: unknown = null;

    try {
      centralData = await centralResponse.json();
    } catch {
      centralData = null;
    }

    if (!centralResponse.ok) {
      const apiMessage =
        centralData &&
        typeof centralData === "object" &&
        "message" in centralData &&
        typeof centralData.message === "string"
          ? centralData.message
          : `Central API returned ${centralResponse.status}.`;

      return NextResponse.json(
        {
          success: false,
          message: apiMessage,
        },
        {
          status: centralResponse.status,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order status updated successfully.",
        data: centralData,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error(
      "KEOS_UPDATE_ORDER_STATUS_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Order status could not be updated.",
      },
      {
        status: 500,
      },
    );
  }
}
