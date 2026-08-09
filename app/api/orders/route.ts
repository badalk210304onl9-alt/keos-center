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

    const search =
      searchParams
        .get("search")
        ?.trim();

    const status =
      searchParams
        .get("status")
        ?.trim();

    const paymentStatus =
      searchParams
        .get("paymentStatus")
        ?.trim();

    const limit =
      searchParams
        .get("limit")
        ?.trim();

    const offset =
      searchParams
        .get("offset")
        ?.trim();

    if (search) {
      upstreamParams.set(
        "search",
        search,
      );
    }

    if (status) {
      upstreamParams.set(
        "status",
        status,
      );
    }

    if (paymentStatus) {
      upstreamParams.set(
        "paymentStatus",
        paymentStatus,
      );
    }

    if (limit) {
      upstreamParams.set(
        "limit",
        limit,
      );
    }

    if (offset) {
      upstreamParams.set(
        "offset",
        offset,
      );
    }

    const queryString =
      upstreamParams.toString();

    const endpoint =
      `${apiUrl}/keos/orders` +
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
            "Accept":
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

          data?: {
            orders?: Array<{
              id: string;
              orderNumber: string;

              customerId:
                string | null;

              customer: {
                name: string;

                firstName:
                  string | null;

                lastName:
                  string | null;

                email: string;
                phone: string;
              };

              status: string;

              paymentStatus:
                string;

              subtotal: number;
              discount: number;
              shipping: number;
              tax: number;
              total: number;

              currency: string;

              couponCode:
                string | null;

              shippingAddress:
                Record<
                  string,
                  unknown
                >;

              billingAddress:
                Record<
                  string,
                  unknown
                >;

              notes:
                string | null;

              itemCount: number;

              createdAt: string;
              updatedAt: string;
            }>;

            pagination?: {
              total: number;
              limit: number;
              offset: number;
              hasMore: boolean;
            };
          };
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
        "KEOS_ORDER_API_ERROR",
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
            "Unable to load orders from KRVE Central API.",

          orders: [],
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

        orders:
          data.data?.orders ??
          [],

        pagination:
          data.data?.pagination ??
          {
            total: 0,
            limit: 100,
            offset: 0,
            hasMore: false,
          },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "KEOS_ORDERS_ROUTE_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load KRVE orders.",

        orders: [],
      },
      {
        status: 500,
      },
    );
  }
}
