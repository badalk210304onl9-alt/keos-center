"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
  Download,
  Eye,
  IndianRupee,
  MapPin,
  PackageCheck,
  RefreshCcw,
  ShoppingBag,
  Sparkles,
  Target,
  UserCheck,
  Users,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DateRange =
  | "7D"
  | "30D"
  | "90D"
  | "1Y";

type MetricCardProps = {
  title: string;
  value: string;
  change?: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  tone:
    | "blue"
    | "red"
    | "green"
    | "orange";
};

type AnalyticsData = {
  live: boolean;
  generatedAt: string;

  period: {
    from: string;
    to: string;
  };

  revenue: {
    grossSales: number;
    netSales: number;
    discounts: number;
    shipping: number;
    tax: number;
    orderCount: number;
    averageOrderValue: number;
    growthPercent: number;
  };

  sales: {
    daily: Array<{
      date: string;
      orders: number;
      revenue: number;
    }>;

    orderStatus: Array<{
      status: string;
      count: number;
    }>;

    paymentStatus: Array<{
      status: string;
      count: number;
    }>;

    paymentMethod: Array<{
      method: string;
      orders: number;
      revenue: number;
    }>;
  };

  products: {
    topSelling: Array<{
      productId?: string;
      name: string;
      sku?: string | null;
      quantity?: number;
      units?: number;
      revenue?: number;
      orders?: number;
    }>;

    slowMoving: Array<{
      productId?: string;
      name: string;
      sku?: string | null;
      quantity?: number;
      units?: number;
      revenue?: number;
      orders?: number;
    }>;

    categoryPerformance: Array<{
      category: string;
      revenue: number;
      orders: number;
      quantity?: number;
      units?: number;
    }>;
  };

  customers: {
    newCustomers: number;
    returningCustomers: number;
    activeCustomers: number;
    repeatPurchaseRate: number;
    customerRevenue: number;
    averageCustomerValue: number;
  };

  inventory: {
    totalProducts: number;
    inStockProducts: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    totalUnits: number;
    inventoryValue: number;

    movement: Array<{
      type: string;
      quantity: number;
      value?: number;
    }>;
  };

  finance: {
    revenue: number;
    expensesAvailable: boolean;
    grossProfitAvailable: boolean;
    netCashFlowAvailable: boolean;
    note: string;
  };
};

type AnalyticsApiResponse = {
  success: boolean;
  message?: string;
  data?: AnalyticsData | null;
};

const CHART_COLORS = [
  "#2563eb",
  "#ef4444",
  "#16a34a",
  "#f59e0b",
];

function formatCurrency(
  value: number,
) {
  if (!Number.isFinite(value)) {
    return "₹0";
  }

  if (value >= 10000000) {
    return `₹${(
      value / 10000000
    ).toFixed(1)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(
      value / 100000
    ).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${Math.round(
      value / 1000,
    )}K`;
  }

  return `₹${Math.round(value)}`;
}

function formatFullCurrency(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    },
  ).format(
    Number.isFinite(value)
      ? value
      : 0,
  );
}

function formatNumber(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-IN",
  ).format(
    Number.isFinite(value)
      ? value
      : 0,
  );
}

function formatPercentage(
  value: number,
) {
  if (!Number.isFinite(value)) {
    return "0%";
  }

  return `${value.toFixed(
    value % 1 === 0 ? 0 : 1,
  )}%`;
}

function getDateRange(
  range: DateRange,
) {
  const now =
    new Date();

  const to =
    new Date(now);

  to.setHours(
    23,
    59,
    59,
    999,
  );

  const from =
    new Date(now);

  if (range === "7D") {
    from.setDate(
      from.getDate() - 6,
    );
  }

  if (range === "30D") {
    from.setDate(
      from.getDate() - 29,
    );
  }

  if (range === "90D") {
    from.setDate(
      from.getDate() - 89,
    );
  }

  if (range === "1Y") {
    from.setFullYear(
      from.getFullYear() - 1,
    );

    from.setDate(
      from.getDate() + 1,
    );
  }

  from.setHours(
    0,
    0,
    0,
    0,
  );

  return {
    from:
      from.toISOString(),
    to:
      to.toISOString(),
  };
}

function formatDateLabel(
  value: string,
  range: DateRange,
) {
  const date =
    new Date(value);

  if (
    !Number.isFinite(
      date.getTime(),
    )
  ) {
    return value;
  }

  if (range === "1Y") {
    return date.toLocaleDateString(
      "en-IN",
      {
        month: "short",
        year: "numeric",
      },
    );
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
    },
  );
}

function normalizePaymentStatus(
  value: string,
) {
  const normalized =
    value
      .trim()
      .toLowerCase();

  if (
    normalized.includes("paid")
  ) {
    return "Paid";
  }

  if (
    normalized.includes("pending")
  ) {
    return "Pending";
  }

  if (
    normalized.includes("failed")
  ) {
    return "Failed";
  }

  if (
    normalized.includes("refund")
  ) {
    return "Refunded";
  }

  return value || "Unknown";
}

function normalizeOrderStatus(
  value: string,
) {
  if (!value) {
    return "Unknown";
  }

  return value
    .replaceAll(
      "_",
      " ",
    )
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase(),
    );
}

function MetricCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  tone,
}: MetricCardProps) {
  const toneClass =
    tone === "red"
      ? "bg-red-50 text-red-600"
      : tone === "green"
        ? "bg-green-50 text-green-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${toneClass}`}
        >
          <Icon size={21} />
        </div>

        {change ? (
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
            <ArrowUpRight size={12} />
            {change}
          </span>
        ) : null}
      </div>

      <p className="mt-5 text-xs font-semibold text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-[11px] leading-5 text-slate-400">
        {description}
      </p>
    </article>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
      <div>
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-white text-slate-400 shadow-sm">
          <BarChart3 size={20} />
        </div>

        <h3 className="mt-4 text-sm font-black text-slate-700">
          {title}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function MiniCard({
  icon: Icon,
  title,
  value,
  change,
  tone,
}: {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  title: string;
  value: string;
  change: string;
  tone:
    | "blue"
    | "red"
    | "green"
    | "orange";
}) {
  const iconClass =
    tone === "red"
      ? "text-red-600"
      : tone === "green"
        ? "text-green-600"
        : tone === "orange"
          ? "text-orange-600"
          : "text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Icon
        size={20}
        className={iconClass}
      />

      <p className="mt-4 text-xs font-semibold text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-black text-slate-900">
        {value}
      </h3>

      <span className="mt-2 block text-xs font-bold text-slate-400">
        {change}
      </span>
    </article>
  );
}

function InsightCard({
  icon: Icon,
  title,
  description,
  badge,
  tone,
}: {
  icon: React.ComponentType<{
    size?: number;
  }>;
  title: string;
  description: string;
  badge: string;
  tone:
    | "blue"
    | "red"
    | "green"
    | "orange";
}) {
  const toneClass =
    tone === "red"
      ? "bg-red-500/15 text-red-300"
      : tone === "green"
        ? "bg-green-500/15 text-green-300"
        : tone === "orange"
          ? "bg-orange-500/15 text-orange-300"
          : "bg-blue-500/15 text-blue-300";

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ${toneClass}`}
        >
          <Icon size={19} />
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[9px] font-bold ${toneClass}`}
        >
          {badge}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-slate-400">
        {description}
      </p>
    </article>
  );
}

function DataStatus({
  label,
  status,
  description,
  live = false,
}: {
  label: string;
  status: string;
  description: string;
  live?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div>
        <p className="text-xs font-black text-slate-800">
          {label}
        </p>

        <p className="mt-1 text-[11px] text-slate-400">
          {description}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-1 text-[9px] font-black ${
          live
            ? "bg-green-50 text-green-700"
            : status ===
                "NO DATA"
              ? "bg-orange-50 text-orange-700"
              : "bg-slate-200 text-slate-500"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

export default function BusinessAnalytics() {
  const [
    selectedRange,
    setSelectedRange,
  ] =
    useState<DateRange>("30D");

  const [
    comparePeriod,
    setComparePeriod,
  ] =
    useState(true);

  const [
    isRefreshing,
    setIsRefreshing,
  ] =
    useState(false);

  const [
    analytics,
    setAnalytics,
  ] =
    useState<AnalyticsData | null>(
      null,
    );

  const [
    isLoading,
    setIsLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState("");

  const loadAnalytics =
    useCallback(
      async () => {
        try {
          setError("");

          const {
            from,
            to,
          } =
            getDateRange(
              selectedRange,
            );

          const params =
            new URLSearchParams();

          params.set(
            "from",
            from,
          );

          params.set(
            "to",
            to,
          );

          const response =
            await fetch(
              `/api/business-analytics?${params.toString()}`,
              {
                method:
                  "GET",

                headers: {
                  Accept:
                    "application/json",
                },

                cache:
                  "no-store",
              },
            );

          let result:
            | AnalyticsApiResponse
            | null =
            null;

          try {
            result =
              (await response.json()) as AnalyticsApiResponse;
          } catch {
            result =
              null;
          }

          if (
            !response.ok ||
            !result?.success ||
            !result.data
          ) {
            throw new Error(
              result?.message ||
                `Business Analytics API returned ${response.status}.`,
            );
          }

          setAnalytics(
            result.data,
          );
        } catch (
          requestError,
        ) {
          console.error(
            "BUSINESS_ANALYTICS_LOAD_ERROR",
            requestError,
          );

          setAnalytics(
            null,
          );

          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load live business analytics.",
          );
        } finally {
          setIsLoading(
            false,
          );
        }
      },
      [
        selectedRange,
      ],
    );

  useEffect(() => {
    setIsLoading(
      true,
    );

    void loadAnalytics();
  }, [
    loadAnalytics,
  ]);

  /*
   * Automatic live refresh.
   *
   * Every 30 seconds KEOS asks the Central API again.
   * New orders entered into D1 will therefore appear
   * without manually refreshing the browser.
   */
  useEffect(() => {
    const interval =
      window.setInterval(
        () => {
          void loadAnalytics();
        },
        30_000,
      );

    return () =>
      window.clearInterval(
        interval,
      );
  }, [
    loadAnalytics,
  ]);

  const refreshAnalytics =
    async () => {
      setIsRefreshing(
        true,
      );

      try {
        await loadAnalytics();
      } finally {
        setIsRefreshing(
          false,
        );
      }
    };

  const currentPeriodLabel =
    selectedRange ===
    "7D"
      ? "Last 7 Days"
      : selectedRange ===
          "30D"
        ? "Last 30 Days"
        : selectedRange ===
            "90D"
          ? "Last 90 Days"
          : "Last 12 Months";

  const revenue =
    analytics?.revenue;

  const sales =
    analytics?.sales;

  const customers =
    analytics?.customers;

  const products =
    analytics?.products;

  const inventory =
    analytics?.inventory;

  const finance =
    analytics?.finance;

  const totalRevenue =
    revenue?.netSales ??
    0;

  const totalOrders =
    revenue?.orderCount ??
    0;

  const averageOrderValue =
    revenue?.averageOrderValue ??
    0;

  const uniqueCustomers =
    customers?.activeCustomers ??
    0;

  const returningCustomers =
    customers?.returningCustomers ??
    0;

  const newCustomers =
    customers?.newCustomers ??
    0;

  const growthPercent =
    revenue?.growthPercent ??
    0;

  const paidOrders =
    sales?.paymentStatus
      ?.filter(
        (item) =>
          normalizePaymentStatus(
            item.status,
          ) === "Paid",
      )
      .reduce(
        (
          sum,
          item,
        ) =>
          sum +
          Number(
            item.count ??
              0,
          ),
        0,
      ) ?? 0;

  const pendingPayments =
    sales?.paymentStatus
      ?.filter(
        (item) =>
          normalizePaymentStatus(
            item.status,
          ) === "Pending",
      )
      .reduce(
        (
          sum,
          item,
        ) =>
          sum +
          Number(
            item.count ??
              0,
          ),
        0,
      ) ?? 0;

  const failedPayments =
    sales?.paymentStatus
      ?.filter(
        (item) =>
          normalizePaymentStatus(
            item.status,
          ) === "Failed",
      )
      .reduce(
        (
          sum,
          item,
        ) =>
          sum +
          Number(
            item.count ??
              0,
          ),
        0,
      ) ?? 0;

  const refundedOrders =
    sales?.paymentStatus
      ?.filter(
        (item) =>
          normalizePaymentStatus(
            item.status,
          ) === "Refunded",
      )
      .reduce(
        (
          sum,
          item,
        ) =>
          sum +
          Number(
            item.count ??
              0,
          ),
        0,
      ) ?? 0;

  const paymentIssues =
    pendingPayments +
    failedPayments;

  const openOrders =
    sales?.orderStatus
      ?.filter(
        (item) => {
          const status =
            normalizeOrderStatus(
              item.status,
            );

          return ![
            "Delivered",
            "Cancelled",
            "Returned",
          ].includes(
            status,
          );
        },
      )
      .reduce(
        (
          sum,
          item,
        ) =>
          sum +
          Number(
            item.count ??
              0,
          ),
        0,
      ) ?? 0;

  const revenueTrend =
    useMemo(() => {
      return (
        sales?.daily
          ?.map(
            (
              item,
            ) => ({
              label:
                formatDateLabel(
                  item.date,
                  selectedRange,
                ),
              revenue:
                Number(
                  item.revenue ??
                    0,
                ),
              orders:
                Number(
                  item.orders ??
                    0,
                ),
            }),
          ) ?? []
      );
    }, [
      sales?.daily,
      selectedRange,
    ]);

  const paymentData =
    useMemo(() => {
      return (
        sales?.paymentStatus
          ?.map(
            (
              item,
            ) => ({
              name:
                normalizePaymentStatus(
                  item.status,
                ),
              value:
                Number(
                  item.count ??
                    0,
                ),
            }),
          )
          .filter(
            (item) =>
              item.value > 0,
          ) ?? []
      );
    }, [
      sales?.paymentStatus,
    ]);

  const customerSegments =
    useMemo(() => {
      const data = [
        {
          name: "New Customers",
          value:
            newCustomers,
        },
        {
          name: "Returning Customers",
          value:
            returningCustomers,
        },
      ];

      return data.filter(
        (item) =>
          item.value > 0,
      );
    }, [
      newCustomers,
      returningCustomers,
    ]);

  const orderStatusData =
    useMemo(() => {
      return (
        sales?.orderStatus
          ?.map(
            (
              item,
            ) => ({
              status:
                normalizeOrderStatus(
                  item.status,
                ),
              value:
                Number(
                  item.count ??
                    0,
                ),
            }),
          )
          .sort(
            (
              a,
              b,
            ) =>
              b.value -
              a.value,
          ) ?? []
      );
    }, [
      sales?.orderStatus,
    ]);

  const paymentMethodData =
    useMemo(() => {
      return (
        sales?.paymentMethod
          ?.map(
            (
              item,
            ) => ({
              method:
                item.method ||
                "Unknown",
              orders:
                Number(
                  item.orders ??
                    0,
                ),
              revenue:
                Number(
                  item.revenue ??
                    0,
                ),
            }),
          )
          .filter(
            (item) =>
              item.orders >
                0 ||
              item.revenue >
                0,
          ) ?? []
      );
    }, [
      sales?.paymentMethod,
    ]);

  const categoryData =
    useMemo(() => {
      return (
        products?.categoryPerformance
          ?.map(
            (
              item,
            ) => ({
              category:
                item.category ||
                "Other",
              revenue:
                Number(
                  item.revenue ??
                    0,
                ),
              orders:
                Number(
                  item.orders ??
                    0,
                ),
              units:
                Number(
                  item.units ??
                    item.quantity ??
                    0,
                ),
            }),
          )
          .sort(
            (
              a,
              b,
            ) =>
              b.revenue -
              a.revenue,
          ) ?? []
      );
    }, [
      products?.categoryPerformance,
    ]);

  const topProducts =
    useMemo(() => {
      return (
        products?.topSelling
          ?.map(
            (
              item,
            ) => ({
              name:
                item.name ||
                "Unnamed Product",
              sku:
                item.sku ||
                null,
              units:
                Number(
                  item.units ??
                    item.quantity ??
                    0,
                ),
              revenue:
                Number(
                  item.revenue ??
                    0,
                ),
              orders:
                Number(
                  item.orders ??
                    0,
                ),
            }),
          )
          .slice(
            0,
            10,
          ) ?? []
      );
    }, [
      products?.topSelling,
    ]);

  const inventoryMovement =
    useMemo(() => {
      return (
        inventory?.movement
          ?.map(
            (
              item,
            ) => ({
              type:
                normalizeOrderStatus(
                  item.type,
                ),
              quantity:
                Number(
                  item.quantity ??
                    0,
                ),
              value:
                Number(
                  item.value ??
                    0,
                ),
            }),
          )
          .filter(
            (item) =>
              item.quantity !==
                0 ||
              item.value !==
                0,
          ) ?? []
      );
    }, [
      inventory?.movement,
    ]);

  const regionalSalesAvailable =
    false;

  const exportReport =
    () => {
      const report = [
        [
          "Metric",
          "Value",
        ],
        [
          "Date Range",
          currentPeriodLabel,
        ],
        [
          "Revenue",
          formatFullCurrency(
            totalRevenue,
          ),
        ],
        [
          "Gross Sales",
          formatFullCurrency(
            revenue?.grossSales ??
              0,
          ),
        ],
        [
          "Discounts",
          formatFullCurrency(
            revenue?.discounts ??
              0,
          ),
        ],
        [
          "Shipping",
          formatFullCurrency(
            revenue?.shipping ??
              0,
          ),
        ],
        [
          "Tax",
          formatFullCurrency(
            revenue?.tax ??
              0,
          ),
        ],
        [
          "Orders",
          String(
            totalOrders,
          ),
        ],
        [
          "Paid Orders",
          String(
            paidOrders,
          ),
        ],
        [
          "Pending Payments",
          String(
            pendingPayments,
          ),
        ],
        [
          "Failed Payments",
          String(
            failedPayments,
          ),
        ],
        [
          "Refunded Orders",
          String(
            refundedOrders,
          ),
        ],
        [
          "Active Customers",
          String(
            uniqueCustomers,
          ),
        ],
        [
          "New Customers",
          String(
            newCustomers,
          ),
        ],
        [
          "Returning Customers",
          String(
            returningCustomers,
          ),
        ],
        [
          "Average Order Value",
          formatFullCurrency(
            averageOrderValue,
          ),
        ],
        [
          "Repeat Purchase Rate",
          formatPercentage(
            customers?.repeatPurchaseRate ??
              0,
          ),
        ],
        [
          "Inventory Products",
          String(
            inventory?.totalProducts ??
              0,
          ),
        ],
        [
          "Inventory Units",
          String(
            inventory?.totalUnits ??
              0,
          ),
        ],
        [
          "Inventory Value",
          formatFullCurrency(
            inventory?.inventoryValue ??
              0,
          ),
        ],
      ];

      const csv =
        report
          .map(
            (
              row,
            ) =>
              row
                .map(
                  (
                    value,
                  ) =>
                    `"${String(
                      value,
                    ).replaceAll(
                      '"',
                      '""',
                    )}"`,
                )
                .join(","),
          )
          .join("\n");

      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv;charset=utf-8;",
          },
        );

      const url =
        URL.createObjectURL(
          blob,
        );

      const anchor =
        document.createElement(
          "a",
        );

      anchor.href =
        url;

      anchor.download =
        "keos-business-analytics.csv";

      document.body.appendChild(
        anchor,
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(
        url,
      );
    };

  const openAskAI =
    () => {
      window.dispatchEvent(
        new CustomEvent(
          "keos:open-ask-ai",
          {
            detail: {
              source:
                "business-analytics",
            },
          },
        ),
      );
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 p-7 text-white shadow-xl shadow-blue-900/10 sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              <ChartNoAxesCombined size={16} />
              Enterprise Intelligence Center
            </div>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              Business Analytics
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              Live business analytics calculated directly from
              KRVE Central API and Cloudflare D1. No demo
              revenue or fabricated business figures are used.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={
                refreshAnalytics
              }
              disabled={
                isRefreshing
              }
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCcw
                size={17}
                className={
                  isRefreshing
                    ? "animate-spin"
                    : ""
                }
              />

              {isRefreshing
                ? "Refreshing..."
                : "Refresh Live Data"}
            </button>

            <button
              type="button"
              onClick={
                exportReport
              }
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
            >
              <Download size={17} />
              Export Report
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
        <div className="flex flex-wrap gap-2">
          {(
            [
              "7D",
              "30D",
              "90D",
              "1Y",
            ] as DateRange[]
          ).map(
            (
              range,
            ) => (
              <button
                type="button"
                key={
                  range
                }
                onClick={() =>
                  setSelectedRange(
                    range,
                  )
                }
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  selectedRange ===
                  range
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {range ===
                  "7D" &&
                  "Last 7 Days"}

                {range ===
                  "30D" &&
                  "Last 30 Days"}

                {range ===
                  "90D" &&
                  "Last 90 Days"}

                {range ===
                  "1Y" &&
                  "Last 12 Months"}
              </button>
            ),
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600">
            <input
              type="checkbox"
              checked={
                comparePeriod
              }
              onChange={(
                event,
              ) =>
                setComparePeriod(
                  event.target
                    .checked,
                )
              }
              className="h-4 w-4 accent-blue-600"
            />

            Compare previous period
          </label>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-400"
            disabled
            title="Custom date filtering is not connected yet."
          >
            <CalendarDays size={16} />
            Custom Dates
          </button>
        </div>
      </section>

      {error ? (
        <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <Activity
              size={20}
              className="mt-0.5 text-red-600"
            />

            <div>
              <h2 className="text-sm font-black text-red-800">
                Live Analytics Data Error
              </h2>

              <p className="mt-1 text-xs leading-5 text-red-700">
                {error}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard
          title="Total Revenue"
          value={
            isLoading
              ? "Loading..."
              : formatCurrency(
                  totalRevenue,
                )
          }
          change={
            comparePeriod &&
            analytics
              ? `${growthPercent >= 0 ? "+" : ""}${growthPercent.toFixed(
                  1,
                )}%`
              : undefined
          }
          description={`${currentPeriodLabel} · Central API revenue`}
          icon={
            CircleDollarSign
          }
          tone="blue"
        />

        <MetricCard
          title="Orders"
          value={
            isLoading
              ? "Loading..."
              : formatNumber(
                  totalOrders,
                )
          }
          description={`${currentPeriodLabel} · Actual D1 orders`}
          icon={
            ShoppingBag
          }
          tone="red"
        />

        <MetricCard
          title="Net Profit"
          value="N/A"
          description="Expense / COGS accounting data is not connected"
          icon={
            IndianRupee
          }
          tone="green"
        />

        <MetricCard
          title="Conversion Rate"
          value="N/A"
          description="Website visitor/session data is not connected"
          icon={
            Target
          }
          tone="orange"
        />

        <MetricCard
          title="Total Customers"
          value={
            isLoading
              ? "Loading..."
              : formatNumber(
                  uniqueCustomers,
                )
          }
          description="Active customers from live Central API data"
          icon={Users}
          tone="blue"
        />

        <MetricCard
          title="Average Order Value"
          value={
            isLoading
              ? "Loading..."
              : formatCurrency(
                  averageOrderValue,
                )
          }
          description="Central API AOV for selected period"
          icon={
            BarChart3
          }
          tone="red"
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Revenue Trend
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Live daily revenue from KRVE Central API
            </p>
          </div>

          <div className="mt-7 h-[350px]">
            {revenueTrend.length ===
            0 ? (
              <EmptyState
                title={
                  isLoading
                    ? "Loading revenue..."
                    : "No revenue recorded"
                }
                description="There are no revenue records in the selected period."
              />
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart
                  data={
                    revenueTrend
                  }
                >
                  <defs>
                    <linearGradient
                      id="analyticsRevenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#2563eb"
                        stopOpacity={
                          0.25
                        }
                      />

                      <stop
                        offset="95%"
                        stopColor="#2563eb"
                        stopOpacity={
                          0
                        }
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={
                      false
                    }
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="label"
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <YAxis
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                    tickFormatter={
                      formatCurrency
                    }
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={
                      3
                    }
                    fill="url(#analyticsRevenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">
            Payment Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Actual payment state from D1
          </p>

          {paymentData.length ===
          0 ? (
            <div className="mt-5">
              <EmptyState
                title="No payment data"
                description="Payment status data will appear after orders are recorded."
              />
            </div>
          ) : (
            <>
              <div className="mt-5 h-[235px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={
                        paymentData
                      }
                      dataKey="value"
                      nameKey="name"
                      innerRadius={
                        60
                      }
                      outerRadius={
                        88
                      }
                      paddingAngle={
                        4
                      }
                    >
                      {paymentData.map(
                        (
                          item,
                          index,
                        ) => (
                          <Cell
                            key={
                              item.name
                            }
                            fill={
                              CHART_COLORS[
                                index %
                                  CHART_COLORS.length
                              ]
                            }
                          />
                        ),
                      )}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {paymentData.map(
                  (
                    item,
                    index,
                  ) => (
                    <div
                      key={
                        item.name
                      }
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              CHART_COLORS[
                                index %
                                  CHART_COLORS.length
                              ],
                          }}
                        />

                        <span className="text-xs font-semibold text-slate-600">
                          {
                            item.name
                          }
                        </span>
                      </div>

                      <strong className="text-xs text-slate-900">
                        {formatNumber(
                          item.value,
                        )}
                      </strong>
                    </div>
                  ),
                )}
              </div>
            </>
          )}
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Order Status Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Actual order lifecycle status
              </p>
            </div>

            <ShoppingBag
              size={22}
              className="text-blue-600"
            />
          </div>

          {orderStatusData.length ===
          0 ? (
            <div className="mt-6">
              <EmptyState
                title="No order data"
                description="Order status analytics will appear once live orders are available."
              />
            </div>
          ) : (
            <div className="mt-7 h-[310px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <RechartsBarChart
                  data={
                    orderStatusData
                  }
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={
                      false
                    }
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="status"
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                    angle={-20}
                    textAnchor="end"
                    height={65}
                  />

                  <YAxis
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                    allowDecimals={
                      false
                    }
                  />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                    radius={[
                      8,
                      8,
                      0,
                      0,
                    ]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Customer Segments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Live customer analytics from Central API
              </p>
            </div>

            <Users
              size={22}
              className="text-blue-600"
            />
          </div>

          {customerSegments.length ===
          0 ? (
            <div className="mt-6">
              <EmptyState
                title="No customers yet"
                description="Customer segmentation will appear when live customer records are available."
              />
            </div>
          ) : (
            <>
              <div className="mt-5 h-[235px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={
                        customerSegments
                      }
                      dataKey="value"
                      nameKey="name"
                      innerRadius={
                        60
                      }
                      outerRadius={
                        88
                      }
                      paddingAngle={
                        4
                      }
                    >
                      {customerSegments.map(
                        (
                          item,
                          index,
                        ) => (
                          <Cell
                            key={
                              item.name
                            }
                            fill={
                              CHART_COLORS[
                                index %
                                  CHART_COLORS.length
                              ]
                            }
                          />
                        ),
                      )}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {customerSegments.map(
                  (
                    item,
                    index,
                  ) => (
                    <div
                      key={
                        item.name
                      }
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              CHART_COLORS[
                                index %
                                  CHART_COLORS.length
                              ],
                          }}
                        />

                        <span className="text-xs font-semibold text-slate-600">
                          {
                            item.name
                          }
                        </span>
                      </div>

                      <strong className="text-xs text-slate-900">
                        {formatNumber(
                          item.value,
                        )}
                      </strong>
                    </div>
                  ),
                )}
              </div>
            </>
          )}
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Payment Methods
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Revenue and order count by payment method
              </p>
            </div>

            <CircleDollarSign
              size={22}
              className="text-blue-600"
            />
          </div>

          {paymentMethodData.length ===
          0 ? (
            <div className="mt-6">
              <EmptyState
                title="No payment method data"
                description="Payment method analytics will appear when payment records are available."
              />
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {paymentMethodData.map(
                (
                  item,
                ) => (
                  <div
                    key={
                      item.method
                    }
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-800">
                        {
                          item.method
                        }
                      </span>

                      <span className="text-xs font-bold text-slate-500">
                        {formatNumber(
                          item.orders,
                        )}{" "}
                        orders
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-black text-blue-700">
                      {formatFullCurrency(
                        item.revenue,
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Category Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Actual product-category sales
              </p>
            </div>

            <ShoppingBag
              size={22}
              className="text-red-600"
            />
          </div>

          {categoryData.length ===
          0 ? (
            <div className="mt-6">
              <EmptyState
                title="No category data"
                description="Category performance will appear after product line-item data is recorded."
              />
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {categoryData.map(
                (
                  item,
                ) => {
                  const maxRevenue =
                    Math.max(
                      ...categoryData.map(
                        (
                          category,
                        ) =>
                          category.revenue,
                      ),
                      1,
                    );

                  const percentage =
                    (
                      (item.revenue /
                        maxRevenue) *
                      100
                    );

                  return (
                    <div
                      key={
                        item.category
                      }
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <strong className="text-xs text-slate-800">
                            {
                              item.category
                            }
                          </strong>

                          <span className="ml-2 text-[10px] text-slate-400">
                            {formatNumber(
                              item.units,
                            )}{" "}
                            units
                          </span>
                        </div>

                        <strong className="text-xs text-slate-900">
                          {formatCurrency(
                            item.revenue,
                          )}
                        </strong>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                percentage,
                              ),
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Product Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Live product-level sales from order line items
              </p>
            </div>

            <PackageCheck
              size={22}
              className="text-blue-600"
            />
          </div>

          {topProducts.length ===
          0 ? (
            <div className="mt-6">
              <EmptyState
                title="No product sales data"
                description="Product analytics will appear when order line-item records are available."
              />
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Product
                    </th>

                    <th className="pb-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Units
                    </th>

                    <th className="pb-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Orders
                    </th>

                    <th className="pb-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Revenue
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {topProducts.map(
                    (
                      product,
                      index,
                    ) => (
                      <tr
                        key={`${product.name}-${product.sku ?? index}`}
                        className="border-b border-slate-50"
                      >
                        <td className="py-4">
                          <p className="text-xs font-black text-slate-800">
                            {
                              product.name
                            }
                          </p>

                          {product.sku ? (
                            <p className="mt-1 text-[10px] text-slate-400">
                              SKU:{" "}
                              {
                                product.sku
                              }
                            </p>
                          ) : null}
                        </td>

                        <td className="py-4 text-right text-xs font-bold text-slate-700">
                          {formatNumber(
                            product.units,
                          )}
                        </td>

                        <td className="py-4 text-right text-xs font-bold text-slate-700">
                          {formatNumber(
                            product.orders,
                          )}
                        </td>

                        <td className="py-4 text-right text-xs font-black text-blue-700">
                          {formatCurrency(
                            product.revenue,
                          )}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Inventory Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Live inventory information from Central API
              </p>
            </div>

            <PackageCheck
              size={22}
              className="text-green-600"
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="text-[10px] font-bold uppercase text-blue-600">
                Products
              </p>

              <p className="mt-2 text-2xl font-black text-blue-900">
                {formatNumber(
                  inventory?.totalProducts ??
                    0,
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-4">
              <p className="text-[10px] font-bold uppercase text-green-600">
                In Stock
              </p>

              <p className="mt-2 text-2xl font-black text-green-900">
                {formatNumber(
                  inventory?.inStockProducts ??
                    0,
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-[10px] font-bold uppercase text-orange-600">
                Low Stock
              </p>

              <p className="mt-2 text-2xl font-black text-orange-900">
                {formatNumber(
                  inventory?.lowStockProducts ??
                    0,
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-4">
              <p className="text-[10px] font-bold uppercase text-red-600">
                Out of Stock
              </p>

              <p className="mt-2 text-2xl font-black text-red-900">
                {formatNumber(
                  inventory?.outOfStockProducts ??
                    0,
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Total Units
              </span>

              <strong className="text-sm text-slate-900">
                {formatNumber(
                  inventory?.totalUnits ??
                    0,
                )}
              </strong>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Inventory Value
              </span>

              <strong className="text-sm text-blue-700">
                {formatFullCurrency(
                  inventory?.inventoryValue ??
                    0,
                )}
              </strong>
            </div>
          </div>

          {inventoryMovement.length >
          0 ? (
            <div className="mt-5">
              <p className="mb-3 text-xs font-black text-slate-800">
                Inventory Movement
              </p>

              <div className="space-y-2">
                {inventoryMovement
                  .slice(
                    0,
                    6,
                  )
                  .map(
                    (
                      movement,
                      index,
                    ) => (
                      <div
                        key={`${movement.type}-${index}`}
                        className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                      >
                        <span className="text-xs font-semibold text-slate-600">
                          {
                            movement.type
                          }
                        </span>

                        <span className="text-xs font-black text-slate-900">
                          {formatNumber(
                            movement.quantity,
                          )}
                        </span>
                      </div>
                    ),
                  )}
              </div>
            </div>
          ) : null}
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Regional Sales
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Requires shipping-address analytics
              </p>
            </div>

            <MapPin
              size={22}
              className="text-red-600"
            />
          </div>

          <div className="mt-6">
            {regionalSalesAvailable ? (
              <EmptyState
                title="Regional data available"
                description="Regional sales data is connected."
              />
            ) : (
              <EmptyState
                title="Regional sales not connected"
                description="The Central Business Analytics endpoint currently returns revenue, orders, products, customers and inventory analytics, but does not expose shipping addresses. KEOS will not invent regional revenue."
              />
            )}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Business Data Availability
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Analytics sources currently connected to KEOS
              </p>
            </div>

            <Activity
              size={22}
              className="text-green-600"
            />
          </div>

          <div className="mt-6 space-y-3">
            <DataStatus
              label="Orders"
              status={
                analytics
                  ? "LIVE"
                  : "NO DATA"
              }
              description="KRVE Central API → Cloudflare D1"
              live={
                !!analytics
              }
            />

            <DataStatus
              label="Revenue"
              status={
                revenue
                  ? "LIVE"
                  : "NO DATA"
              }
              description="Central API business analytics"
              live={
                !!revenue
              }
            />

            <DataStatus
              label="Customers"
              status={
                customers
                  ? "LIVE"
                  : "NO DATA"
              }
              description="Central API customer analytics"
              live={
                !!customers
              }
            />

            <DataStatus
              label="Product Revenue"
              status={
                topProducts.length >
                0
                  ? "LIVE"
                  : "NO DATA"
              }
              description="Central API order line-item analytics"
              live={
                topProducts.length >
                0
              }
            />

            <DataStatus
              label="Inventory"
              status={
                inventory
                  ? "LIVE"
                  : "NO DATA"
              }
              description="Central API inventory analytics"
              live={
                !!inventory
              }
            />

            <DataStatus
              label="Regional Sales"
              status="NOT CONNECTED"
              description="Shipping-address analytics not exposed by current endpoint"
            />

            <DataStatus
              label="Expenses / Profit"
              status={
                finance?.expensesAvailable
                  ? "LIVE"
                  : "NOT CONNECTED"
              }
              description="No expense / COGS monetary source available"
              live={
                !!finance?.expensesAvailable
              }
            />

            <DataStatus
              label="Website Funnel"
              status="NOT CONNECTED"
              description="Visitor/session analytics unavailable"
            />

            <DataStatus
              label="Marketing ROI"
              status="NOT CONNECTED"
              description="Marketing spend and attribution unavailable"
            />
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Customer Intelligence
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Live customer metrics from KRVE Central API
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MiniCard
            icon={Users}
            title="Active Customers"
            value={formatNumber(
              customers?.activeCustomers ??
                0,
            )}
            change="Live Central API"
            tone="blue"
          />

          <MiniCard
            icon={UserCheck}
            title="New Customers"
            value={formatNumber(
              customers?.newCustomers ??
                0,
            )}
            change="Selected period"
            tone="green"
          />

          <MiniCard
            icon={UserCheck}
            title="Returning Customers"
            value={formatNumber(
              customers?.returningCustomers ??
                0,
            )}
            change="Live customer history"
            tone="green"
          />

          <MiniCard
            icon={BarChart3}
            title="Repeat Purchase Rate"
            value={formatPercentage(
              customers?.repeatPurchaseRate ??
                0,
            )}
            change="Central API calculation"
            tone="orange"
          />
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Department Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Department performance requires actual KPI sources.
          </p>
        </div>

        <div className="mt-6">
          <EmptyState
            title="Department KPI data is not connected"
            description="Sales, Marketing, Finance, Inventory and HR performance scores are intentionally not fabricated. They will appear after their respective KEOS modules expose measurable KPIs."
          />
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MiniCard
            icon={Eye}
            title="Website Visitors"
            value="N/A"
            change="Analytics source not connected"
            tone="blue"
          />

          <MiniCard
            icon={UserCheck}
            title="Returning Customers"
            value={formatNumber(
              returningCustomers,
            )}
            change="Live Central API"
            tone="green"
          />

          <MiniCard
            icon={BarChart3}
            title="Marketing ROI"
            value="N/A"
            change="Marketing spend data not connected"
            tone="red"
          />

          <MiniCard
            icon={Activity}
            title="Operational Score"
            value="N/A"
            change="Operational KPI source not connected"
            tone="orange"
          />
        </div>
      </section>

      <section className="mt-6 rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600">
              <BrainCircuit size={23} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black">
                  KRVE AI Business Insights
                </h2>

                <span className="rounded-full bg-green-500/15 px-2 py-1 text-[10px] font-bold text-green-300">
                  LIVE
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Ask KRVE AI can analyse the live business data available
                through KEOS. No fabricated revenue or performance figures
                are sent as facts.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={
              openAskAI
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold hover:bg-blue-700"
          >
            <Sparkles size={17} />
            Ask KRVE AI
          </button>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InsightCard
            icon={
              CircleDollarSign
            }
            title="Revenue Status"
            description={
              totalRevenue >
              0
                ? `Revenue recorded in the selected period is ${formatFullCurrency(
                    totalRevenue,
                  )}.`
                : "No revenue has been recorded in the selected period."
            }
            badge={
              totalRevenue >
              0
                ? "LIVE DATA"
                : "₹0 RECORDED"
            }
            tone="blue"
          />

          <InsightCard
            icon={
              ShoppingBag
            }
            title="Order Activity"
            description={`${formatNumber(
              totalOrders,
            )} order(s) are present in the selected period.`}
            badge="LIVE DATA"
            tone="green"
          />

          <InsightCard
            icon={Users}
            title="Customer Activity"
            description={`${formatNumber(
              uniqueCustomers,
            )} active customer record(s) are available in the selected period.`}
            badge="LIVE DATA"
            tone="blue"
          />

          <InsightCard
            icon={
              PackageCheck
            }
            title="Inventory Coverage"
            description={`${formatNumber(
              inventory?.totalUnits ??
                0,
            )} inventory unit(s) are currently tracked by the Central API.`}
            badge="LIVE DATA"
            tone="green"
          />
        </div>
      </section>

      <div className="mt-5 flex flex-col items-center justify-center gap-1 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        <span>
          {isLoading
            ? "Loading live KRVE Central API data..."
            : "Live analytics calculated from KRVE Central API + Cloudflare D1"}
        </span>

        {analytics?.generatedAt ? (
          <span className="normal-case tracking-normal">
            Last updated:{" "}
            {new Date(
              analytics.generatedAt,
            ).toLocaleString(
              "en-IN",
            )}
            {" · "}
            Auto-refresh: 30 seconds
          </span>
        ) : null}
      </div>
    </div>
  );
}
