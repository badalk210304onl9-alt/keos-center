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

export async function GET() {
  try {
    const apiUrl = getApiUrl();
    const secret = getKeosSecret();

    const response = await fetch(
      `${apiUrl}/keos/founder/dashboard`,
      {
        method: "GET",

        headers: {
          Accept: "application/json",

          "X-KEOS-API-Key":
            secret,
        },

        cache: "no-store",
      },
    );

    let data:
      | {
          success?: boolean;

          message?: string;

          data?: {
            summary?: {
              totalRevenue?: number;
              totalOrders?: number;
              totalCustomers?: number;
              activeProducts?: number;
              openOrders?: number;
              deliveredOrders?: number;
            };

            recentOrders?: Array<{
              id: string;
              orderNumber: string;
              customerName: string;
              customerEmail: string;
              customerPhone: string;
              status: string;
              paymentStatus: string;
              total: number;
              currency: string;
              createdAt: string;
            }>;

            generatedAt?: string;
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
        "KEOS_FOUNDER_DASHBOARD_API_ERROR",
        {
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
            "Unable to load founder dashboard data.",

          summary: {
            totalRevenue: 0,
            totalOrders: 0,
            totalCustomers: 0,
            activeProducts: 0,
            openOrders: 0,
            deliveredOrders: 0,
          },

          recentOrders: [],
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

        summary: {
          totalRevenue:
            Number(
              data.data?.summary
                ?.totalRevenue ??
                0,
            ),

          totalOrders:
            Number(
              data.data?.summary
                ?.totalOrders ??
                0,
            ),

          totalCustomers:
            Number(
              data.data?.summary
                ?.totalCustomers ??
                0,
            ),

          activeProducts:
            Number(
              data.data?.summary
                ?.activeProducts ??
                0,
            ),

          openOrders:
            Number(
              data.data?.summary
                ?.openOrders ??
                0,
            ),

          deliveredOrders:
            Number(
              data.data?.summary
                ?.deliveredOrders ??
                0,
            ),
        },

        recentOrders:
          data.data?.recentOrders ??
          [],

        generatedAt:
          data.data?.generatedAt ??
          new Date().toISOString(),
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "KEOS_FOUNDER_DASHBOARD_ROUTE_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load founder dashboard.",

        summary: {
          totalRevenue: 0,
          totalOrders: 0,
          totalCustomers: 0,
          activeProducts: 0,
          openOrders: 0,
          deliveredOrders: 0,
        },

        recentOrders: [],
      },
      {
        status: 500,
      },
    );
  }
}
