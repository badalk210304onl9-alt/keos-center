import {
  NextRequest,
  NextResponse,
} from "next/server";

type UpdateOrderStatusBody = {
  status?: string;
  courier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  location?: string;
};

const ALLOWED_STATUSES =
  new Set([
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
    const {
      id,
    } =
      await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const body =
      (await request.json()) as UpdateOrderStatusBody;

    const status =
      String(
        body.status || "",
      )
        .trim()
        .toLowerCase()
        .replaceAll(
          " ",
          "_",
        );

    if (
      !ALLOWED_STATUSES.has(
        status,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid order status.",
        },
        {
          status: 400,
        },
      );
    }

    const courier =
      String(
        body.courier || "",
      ).trim();

    const trackingNumber =
      String(
        body.trackingNumber ||
          "",
      ).trim();

    const trackingUrl =
      String(
        body.trackingUrl || "",
      ).trim();

    const location =
      String(
        body.location || "",
      ).trim();

    /*
     * Courier + tracking number
     * compulsory before marking
     * an order as shipped.
     */
    if (
      status === "shipped"
    ) {
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

      if (
        !trackingNumber
      ) {
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
     * Central API base URL
     */
    const centralApiUrl =
      (
        process.env
          .KRVE_CENTRAL_API_URL ||
        process.env
          .KRVE_API_URL ||
        "https://krve-central-api.badalk210304-onl9.workers.dev"
      ).replace(
        /\/+$/,
        "",
      );

    /*
     * IMPORTANT:
     * This must match Cloudflare's
     * KEOS_API_SECRET exactly.
     */
    const keosSecret =
      process.env
        .KEOS_API_SECRET;

    if (!keosSecret) {
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

    /*
     * Send status update
     * securely to KRVE Central API.
     *
     * IMPORTANT FIX:
     * Header must be:
     *
     * X-KEOS-API-Key
     *
     * NOT:
     * X-KEOS-Secret
     */
    const centralResponse =
      await fetch(
        `${centralApiUrl}/keos/orders/${encodeURIComponent(
          id,
        )}/status`,
        {
          method:
            "PATCH",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            "X-KEOS-API-Key":
              keosSecret,
          },

          body:
            JSON.stringify({
              status,

              courier:
                courier ||
                undefined,

              trackingNumber:
                trackingNumber ||
                undefined,

              trackingUrl:
                trackingUrl ||
                undefined,

              location:
                location ||
                undefined,

              createdBy:
                "KEOS",
            }),

          cache:
            "no-store",
        },
      );

    let centralData:
      unknown =
      null;

    try {
      centralData =
        await centralResponse.json();
    } catch {
      centralData =
        null;
    }

    if (
      !centralResponse.ok
    ) {
      let apiMessage =
        `KRVE Central API returned ${centralResponse.status}.`;

      if (
        centralData &&
        typeof centralData ===
          "object" &&
        "message" in
          centralData &&
        typeof (
          centralData as {
            message?: unknown;
          }
        ).message ===
          "string"
      ) {
        apiMessage =
          (
            centralData as {
              message: string;
            }
          ).message;
      }

      console.error(
        "KRVE_CENTRAL_STATUS_UPDATE_FAILED",
        {
          status:
            centralResponse.status,
          response:
            centralData,
          orderId:
            id,
        },
      );

      return NextResponse.json(
        {
          success: false,
          message:
            apiMessage,
        },
        {
          status:
            centralResponse.status,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,

        message:
          "Order status updated successfully.",

        orderId:
          id,

        status,

        data:
          centralData,
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
          error instanceof
          Error
            ? error.message
            : "Order status could not be updated.",
      },
      {
        status: 500,
      },
    );
  }
}
