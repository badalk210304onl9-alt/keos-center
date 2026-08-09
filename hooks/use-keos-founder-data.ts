"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

export interface FounderDashboardData {
  statistics: {
    totalRevenue: string;
    totalOrders: string;
    totalCustomers: string;
    totalEmployees: string;
  };

  recentOrders: {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
    date: string;
  }[];
}

type DashboardApiResponse = {
  success?: boolean;

  message?: string;

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

const emptyData: FounderDashboardData = {
  statistics: {
    totalRevenue: "₹0",
    totalOrders: "0",
    totalCustomers: "0",
    totalEmployees: "—",
  },

  recentOrders: [],
};

function formatMoney(
  value: number,
  currency = "INR",
) {
  try {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency:
          currency || "INR",

        maximumFractionDigits: 0,
      },
    ).format(
      Number(value || 0),
    );
  } catch {
    return `₹${Number(
      value || 0,
    ).toLocaleString("en-IN")}`;
  }
}

function formatNumber(
  value: number,
) {
  return Number(
    value || 0,
  ).toLocaleString(
    "en-IN",
  );
}

function formatDate(
  value: string,
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function formatStatus(
  status: string,
  paymentStatus: string,
) {
  const orderStatus =
    status
      ?.trim()
      .toLowerCase();

  const payment =
    paymentStatus
      ?.trim()
      .toLowerCase();

  if (
    orderStatus ===
      "delivered"
  ) {
    return "Delivered";
  }

  if (
    orderStatus ===
      "shipped"
  ) {
    return "Shipped";
  }

  if (
    orderStatus ===
      "processing"
  ) {
    return "Processing";
  }

  if (
    orderStatus ===
      "packed"
  ) {
    return "Packed";
  }

  if (
    orderStatus ===
      "cancelled" ||
    orderStatus ===
      "canceled"
  ) {
    return "Cancelled";
  }

  if (
    orderStatus ===
      "returned"
  ) {
    return "Returned";
  }

  if (
    payment === "paid"
  ) {
    return "Paid";
  }

  if (
    payment === "failed"
  ) {
    return "Payment Failed";
  }

  return "Pending";
}

export function useKeosFounderData() {
  const [
    data,
    setData,
  ] =
    useState<FounderDashboardData>(
      emptyData,
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    source,
    setSource,
  ] =
    useState<
      "demo" | "api"
    >("demo");

  const [
    error,
    setError,
  ] =
    useState("");

  const refresh =
    useCallback(
      async () => {
        setLoading(true);
        setError("");

        try {
          const response =
            await fetch(
              "/api/founder/dashboard",
              {
                method:
                  "GET",

                cache:
                  "no-store",

                headers: {
                  Accept:
                    "application/json",
                },
              },
            );

          const result =
            (await response.json()) as DashboardApiResponse;

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
                `Dashboard API returned ${response.status}.`,
            );
          }

          const summary =
            result.summary ??
            {};

          const recentOrders =
            Array.isArray(
              result.recentOrders,
            )
              ? result.recentOrders.map(
                  (order) => ({
                    id:
                      order.orderNumber ||
                      order.id,

                    customer:
                      order.customerName ||
                      order.customerEmail ||
                      "Guest Customer",

                    product:
                      "KRVE Website Order",

                    amount:
                      formatMoney(
                        Number(
                          order.total ??
                            0,
                        ),
                        order.currency ||
                          "INR",
                      ),

                    status:
                      formatStatus(
                        order.status,
                        order.paymentStatus,
                      ),

                    date:
                      formatDate(
                        order.createdAt,
                      ),
                  }),
                )
              : [];

          setData({
            statistics: {
              totalRevenue:
                formatMoney(
                  Number(
                    summary.totalRevenue ??
                      0,
                  ),
                  "INR",
                ),

              totalOrders:
                formatNumber(
                  Number(
                    summary.totalOrders ??
                      0,
                  ),
                ),

              totalCustomers:
                formatNumber(
                  Number(
                    summary.totalCustomers ??
                      0,
                  ),
                ),

              /*
                Employees are not yet coming
                from Central API, therefore
                we do not show fake data.
              */
              totalEmployees:
                "—",
            },

            recentOrders,
          });

          setSource(
            "api",
          );
        } catch (
          loadError
        ) {
          console.error(
            "KEOS_FOUNDER_DASHBOARD_LOAD_ERROR",
            loadError,
          );

          /*
            IMPORTANT:
            No fake revenue,
            fake orders or
            fake customers.
          */

          setData(
            emptyData,
          );

          setSource(
            "demo",
          );

          setError(
            loadError instanceof
              Error
              ? loadError.message
              : "Unable to load live Founder Dashboard data.",
          );
        } finally {
          setLoading(
            false,
          );
        }
      },
      [],
    );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    data,
    loading,
    source,
    error,
    refresh,
  };
}
