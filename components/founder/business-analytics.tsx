"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
} from "react";

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  FileSpreadsheet,
  Package,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type DateRange =
  | "today"
  | "7d"
  | "30d"
  | "90d"
  | "year";

type MetricCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: ComponentType<{ className?: string }>;
  trend?: number | null;
};

type MiniCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: ComponentType<{ className?: string }>;
};

type InsightCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
  tone?: "blue" | "green" | "red" | "amber";
};

type DailySales = {
  date: string;
  orders: number;
  revenue: number;
};

type StatusItem = {
  status: string;
  count: number;
};

type PaymentMethodItem = {
  method: string;
  orders: number;
  revenue: number;
};

type ProductPerformance = {
  productId?: string;
  productName?: string;
  name?: string;
  sku?: string;
  category?: string;
  unitsSold?: number;
  quantity?: number;
  revenue?: number;
};

type CategoryPerformance = {
  category?: string;
  name?: string;
  unitsSold?: number;
  quantity?: number;
  revenue?: number;
};

type InventoryMovement = {
  date?: string;
  units?: number;
  quantity?: number;
};

type AnalyticsData = {
  live?: boolean;
  generatedAt?: string;

  period?: {
    from?: string;
    to?: string;
  };

  revenue?: {
    grossSales?: number;
    netSales?: number;
    discounts?: number;
    shipping?: number;
    tax?: number;
    orderCount?: number;
    averageOrderValue?: number;
    growthPercent?: number;
  };

  sales?: {
    daily?: DailySales[];
    orderStatus?: StatusItem[];
    paymentStatus?: StatusItem[];
    paymentMethod?: PaymentMethodItem[];
  };

  products?: {
    topSelling?: ProductPerformance[];
    slowMoving?: ProductPerformance[];
    categoryPerformance?: CategoryPerformance[];
  };

  customers?: {
    newCustomers?: number;
    returningCustomers?: number;
    activeCustomers?: number;
    repeatPurchaseRate?: number;
    customerRevenue?: number;
    averageCustomerValue?: number;
  };

  inventory?: {
    totalProducts?: number;
    inStockProducts?: number;
    lowStockProducts?: number;
    outOfStockProducts?: number;
    totalUnits?: number;
    inventoryValue?: number;
    movement?: InventoryMovement[];
  };

  finance?: {
    revenue?: number;
    expensesAvailable?: boolean;
    grossProfitAvailable?: boolean;
    netCashFlowAvailable?: boolean;
    note?: string;
  };
};

type AnalyticsResponse = {
  success?: boolean;
  data?: AnalyticsData | null;
  message?: string;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const numberValue = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const textValue = (value: unknown, fallback = "—"): string => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
};

const formatCurrency = (value: unknown): string => {
  const amount = numberValue(value);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (value: unknown): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(numberValue(value));
};

const formatPercent = (value: unknown): string => {
  return `${numberValue(value).toFixed(1)}%`;
};

const formatDateLabel = (dateValue: string): string => {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const formatDateTime = (dateValue?: string): string => {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateForApi = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDateRange = (range: DateRange) => {
  const to = new Date();
  const from = new Date(to);

  if (range === "today") {
    from.setHours(0, 0, 0, 0);
  }

  if (range === "7d") {
    from.setDate(from.getDate() - 6);
  }

  if (range === "30d") {
    from.setDate(from.getDate() - 29);
  }

  if (range === "90d") {
    from.setDate(from.getDate() - 89);
  }

  if (range === "year") {
    from.setMonth(0, 1);
    from.setHours(0, 0, 0, 0);
  }

  return {
    from: formatDateForApi(from),
    to: formatDateForApi(to),
  };
};

const normalizeLabel = (value: unknown): string => {
  return textValue(value, "Unknown")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const downloadCsv = (
  filename: string,
  rows: Array<Record<string, unknown>>,
) => {
  if (!rows.length) {
    return;
  }

  const headers = Object.keys(rows[0]);

  const csvRows = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = row[header];

          if (value === null || value === undefined) {
            return "";
          }

          const stringValue = String(value).replace(/"/g, '""');

          return `"${stringValue}"`;
        })
        .join(","),
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
};

/* -------------------------------------------------------------------------- */
/* Small UI components                                                        */
/* -------------------------------------------------------------------------- */

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: MetricCardProps) {
  const hasTrend = trend !== null && trend !== undefined;
  const positive = numberValue(trend) >= 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          {subtitle ? (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {hasTrend ? (
        <div
          className={`mt-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            positive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}

          {Math.abs(numberValue(trend)).toFixed(1)}%
        </div>
      ) : null}
    </div>
  );
}

function MiniCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: MiniCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {value}
          </p>

          {subtitle ? (
            <p className="truncate text-[11px] text-slate-500">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function InsightCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = "blue",
}: InsightCardProps) {
  const toneClass = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
  }[tone];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  message = "No data available for this period.",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-6 text-center">
      <div>
        <BarChart3 className="mx-auto h-8 w-8 text-slate-300" />

        <p className="mt-3 text-sm font-medium text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function BusinessAnalytics() {
  const [range, setRange] = useState<DateRange>("30d");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [showRangeMenu, setShowRangeMenu] = useState(false);

  const loadAnalytics = useCallback(
    async (silent = false) => {
      try {
        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const dates = getDateRange(range);

        const params = new URLSearchParams({
          from: dates.from,
          to: dates.to,
        });

        const response = await fetch(
          `/api/business-analytics?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          },
        );

        let result: AnalyticsResponse | null = null;

        try {
          result = (await response.json()) as AnalyticsResponse;
        } catch {
          result = null;
        }

        if (!response.ok) {
          throw new Error(
            result?.message ||
              `Business analytics request failed with status ${response.status}.`,
          );
        }

        if (!result?.success || !result.data) {
          throw new Error(
            result?.message ||
              "Business analytics data could not be loaded.",
          );
        }

        setAnalytics(result.data);
        setLastUpdated(new Date());
      } catch (requestError) {
        console.error(
          "BUSINESS_ANALYTICS_LOAD_ERROR",
          requestError,
        );

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load business analytics.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [range],
  );

  useEffect(() => {
    void loadAnalytics(false);
  }, [loadAnalytics]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void loadAnalytics(true);
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [loadAnalytics]);

  /* ------------------------------------------------------------------------ */
  /* Derived data                                                             */
  /* ------------------------------------------------------------------------ */

  const revenue = analytics?.revenue;
  const sales = analytics?.sales;
  const customers = analytics?.customers;
  const inventory = analytics?.inventory;
  const products = analytics?.products;
  const finance = analytics?.finance;

  const dailySales = useMemo(() => {
    return Array.isArray(sales?.daily) ? sales.daily : [];
  }, [sales?.daily]);

  const orderStatus = useMemo(() => {
    return Array.isArray(sales?.orderStatus)
      ? sales.orderStatus
      : [];
  }, [sales?.orderStatus]);

  const paymentStatus = useMemo(() => {
    return Array.isArray(sales?.paymentStatus)
      ? sales.paymentStatus
      : [];
  }, [sales?.paymentStatus]);

  const paymentMethods = useMemo(() => {
    return Array.isArray(sales?.paymentMethod)
      ? sales.paymentMethod
      : [];
  }, [sales?.paymentMethod]);

  const topSelling = useMemo(() => {
    return Array.isArray(products?.topSelling)
      ? products.topSelling
      : [];
  }, [products?.topSelling]);

  const slowMoving = useMemo(() => {
    return Array.isArray(products?.slowMoving)
      ? products.slowMoving
      : [];
  }, [products?.slowMoving]);

  const categoryPerformance = useMemo(() => {
    return Array.isArray(products?.categoryPerformance)
      ? products.categoryPerformance
      : [];
  }, [products?.categoryPerformance]);

  const inventoryMovement = useMemo(() => {
    return Array.isArray(inventory?.movement)
      ? inventory.movement
      : [];
  }, [inventory?.movement]);

  const openOrders = useMemo(() => {
    return orderStatus
      .filter((item) => {
        const status = String(item.status || "").toLowerCase();

        return ![
          "delivered",
          "cancelled",
          "canceled",
          "refunded",
          "failed",
        ].includes(status);
      })
      .reduce(
        (total, item) => total + numberValue(item.count),
        0,
      );
  }, [orderStatus]);

  const totalOrders = numberValue(revenue?.orderCount);

  const totalRevenue = numberValue(revenue?.netSales);

  const averageOrderValue =
    numberValue(revenue?.averageOrderValue) ||
    (totalOrders > 0 ? totalRevenue / totalOrders : 0);

  const customerCount = numberValue(
    customers?.activeCustomers,
  );

  const repeatPurchaseRate = numberValue(
    customers?.repeatPurchaseRate,
  );

  const totalInventoryUnits = numberValue(
    inventory?.totalUnits,
  );

  const inventoryValue = numberValue(
    inventory?.inventoryValue,
  );

  const lowStockProducts = numberValue(
    inventory?.lowStockProducts,
  );

  const outOfStockProducts = numberValue(
    inventory?.outOfStockProducts,
  );

  const regionalSalesAvailable = false;

  const rangeLabel: Record<DateRange, string> = {
    today: "Today",
    "7d": "Last 7 Days",
    "30d": "Last 30 Days",
    "90d": "Last 90 Days",
    year: "This Year",
  };

  const statusChartData = orderStatus.map((item) => ({
    name: normalizeLabel(item.status),
    value: numberValue(item.count),
  }));

  const paymentChartData = paymentStatus.map((item) => ({
    name: normalizeLabel(item.status),
    value: numberValue(item.count),
  }));

  const categoryChartData = categoryPerformance.map(
    (item) => ({
      name: textValue(
        item.category ?? item.name,
        "Unknown",
      ),
      revenue: numberValue(item.revenue),
      units: numberValue(
        item.unitsSold ?? item.quantity,
      ),
    }),
  );

  const exportAnalytics = () => {
    if (!analytics) {
      return;
    }

    const rows = dailySales.map((item) => ({
      date: item.date,
      orders: item.orders,
      revenue: item.revenue,
    }));

    downloadCsv(
      `krve-business-analytics-${range}.csv`,
      rows,
    );
  };

  const openAskAI = () => {
    window.dispatchEvent(
      new CustomEvent("keos:open-ask-ai", {
        detail: {
          context: "business-analytics",
          analytics,
        },
      }),
    );
  };

  /* ------------------------------------------------------------------------ */
  /* Loading state                                                            */
  /* ------------------------------------------------------------------------ */

  if (loading && !analytics) {
    return (
      <div className="min-h-full bg-slate-50 p-4 md:p-6">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="h-7 w-64 animate-pulse rounded-lg bg-slate-200" />
              <div className="mt-2 h-4 w-96 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            <div className="h-80 animate-pulse rounded-2xl bg-white xl:col-span-2" />
            <div className="h-80 animate-pulse rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Main UI                                                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-full bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <BarChart3 className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Business Analytics
                </h1>

                <p className="mt-0.5 text-sm text-slate-500">
                  Live business intelligence powered by KRVE Central API
                  and D1.
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ${
                  analytics?.live
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    analytics?.live
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />

                {analytics?.live ? "LIVE DATA" : "DATA"}
              </span>

              <span className="text-slate-400">
                {lastUpdated
                  ? `Updated ${formatDateTime(
                      lastUpdated.toISOString(),
                    )}`
                  : "Updating..."}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Date range */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowRangeMenu((current) => !current)
                }
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300"
              >
                <CalendarDays className="h-4 w-4 text-slate-500" />

                {rangeLabel[range]}

                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {showRangeMenu ? (
                <div className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                  {(
                    Object.entries(rangeLabel) as [
                      DateRange,
                      string,
                    ][]
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setRange(value);
                        setShowRangeMenu(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                        range === value
                          ? "bg-blue-50 font-semibold text-blue-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => void loadAnalytics(true)}
              disabled={refreshing}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />

              Refresh
            </button>

            <button
              type="button"
              onClick={exportAnalytics}
              disabled={!analytics || !dailySales.length}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <button
              type="button"
              onClick={openAskAI}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Sparkles className="h-4 w-4" />
              Ask AI
            </button>
          </div>
        </div>

        {/* Error */}
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

              <div className="min-w-0">
                <p className="font-semibold text-red-800">
                  Business analytics could not be loaded
                </p>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => void loadAnalytics(false)}
                  className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Revenue metrics */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Net Sales"
            value={formatCurrency(
              revenue?.netSales,
            )}
            subtitle={`${formatNumber(
              revenue?.orderCount,
            )} orders`}
            icon={CircleDollarSign}
            trend={revenue?.growthPercent}
          />

          <MetricCard
            title="Average Order Value"
            value={formatCurrency(
              averageOrderValue,
            )}
            subtitle="Average revenue per order"
            icon={ShoppingCart}
          />

          <MetricCard
            title="Gross Sales"
            value={formatCurrency(
              revenue?.grossSales,
            )}
            subtitle={`Discounts ${formatCurrency(
              revenue?.discounts,
            )}`}
            icon={Wallet}
          />

          <MetricCard
            title="Customers"
            value={formatNumber(customerCount)}
            subtitle={`${formatNumber(
              customers?.newCustomers,
            )} new customers`}
            icon={Users}
          />
        </div>

        {/* Quick business cards */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniCard
            title="Open Orders"
            value={formatNumber(openOrders)}
            subtitle="Orders still in progress"
            icon={Clock3}
          />

          <MiniCard
            title="Repeat Purchase"
            value={formatPercent(
              repeatPurchaseRate,
            )}
            subtitle="Customer repeat rate"
            icon={Users}
          />

          <MiniCard
            title="Inventory Units"
            value={formatNumber(
              totalInventoryUnits,
            )}
            subtitle={`${formatNumber(
              inventory?.totalProducts,
            )} products`}
            icon={Boxes}
          />

          <MiniCard
            title="Inventory Value"
            value={formatCurrency(
              inventoryValue,
            )}
            subtitle="Current inventory value"
            icon={Package}
          />
        </div>

        {/* Sales trend + order status */}
        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Sales Trend
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Daily orders and revenue for the selected period.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Revenue
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Orders
                </span>
              </div>
            </div>

            {dailySales.length ? (
              <div className="h-[320px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart data={dailySales}>
                    <defs>
                      <linearGradient
                        id="krveRevenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#2563eb"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="100%"
                          stopColor="#2563eb"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDateLabel}
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                      stroke="#94a3b8"
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                      stroke="#94a3b8"
                      tickFormatter={(value) =>
                        `₹${numberValue(
                          value,
                        ).toLocaleString("en-IN")}`
                      }
                    />

                    <Tooltip
                      formatter={(value, name) => [
                        name === "revenue"
                          ? formatCurrency(value)
                          : formatNumber(value),
                        name === "revenue"
                          ? "Revenue"
                          : "Orders",
                      ]}
                      labelFormatter={(label) =>
                        formatDateLabel(String(label))
                      }
                    />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#krveRevenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState message="No daily sales data available." />
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-bold text-slate-900">
                Order Status
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current order distribution.
              </p>
            </div>

            {statusChartData.length ? (
              <>
                <div className="h-[230px] w-full">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={62}
                        outerRadius={88}
                        paddingAngle={3}
                      >
                        {statusChartData.map(
                          (entry, index) => (
                            <Cell
                              key={`${entry.name}-${index}`}
                              fill={
                                [
                                  "#2563eb",
                                  "#10b981",
                                  "#f59e0b",
                                  "#ef4444",
                                  "#8b5cf6",
                                  "#64748b",
                                ][
                                  index %
                                    6
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

                <div className="space-y-2">
                  {statusChartData.map(
                    (item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              background:
                                [
                                  "#2563eb",
                                  "#10b981",
                                  "#f59e0b",
                                  "#ef4444",
                                  "#8b5cf6",
                                  "#64748b",
                                ][
                                  index %
                                    6
                                ],
                            }}
                          />

                          <span className="text-slate-600">
                            {item.name}
                          </span>
                        </div>

                        <span className="font-semibold text-slate-900">
                          {formatNumber(item.value)}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </>
            ) : (
              <EmptyState message="No order status data available." />
            )}
          </section>
        </div>

        {/* Payment + categories */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-bold text-slate-900">
                Payment Status
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Payment success and failure distribution.
              </p>
            </div>

            {paymentChartData.length ? (
              <div className="h-[280px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={paymentChartData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#2563eb"
                      radius={[
                        6,
                        6,
                        0,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState message="No payment status data available." />
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-bold text-slate-900">
                Category Performance
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Revenue generated by product category.
              </p>
            </div>

            {categoryChartData.length ? (
              <div className="h-[280px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={categoryChartData}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 15,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                      tickFormatter={(value) =>
                        `₹${numberValue(
                          value,
                        ).toLocaleString("en-IN")}`
                      }
                    />

                    <YAxis
                      type="category"
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                      width={100}
                    />

                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(value),
                        "Revenue",
                      ]}
                    />

                    <Bar
                      dataKey="revenue"
                      fill="#0f172a"
                      radius={[
                        0,
                        6,
                        6,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState message="No category performance data available." />
            )}
          </section>
        </div>

        {/* Products */}
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Top Selling Products
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Products generating the most sales.
                </p>
              </div>

              <Package className="h-5 w-5 text-blue-600" />
            </div>

            {topSelling.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Product
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Units
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Revenue
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {topSelling
                      .slice(0, 10)
                      .map((item, index) => (
                        <tr
                          key={
                            item.productId ||
                            item.sku ||
                            `${item.productName}-${index}`
                          }
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">
                                {index + 1}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {textValue(
                                    item.productName ??
                                      item.name,
                                    "Unknown Product",
                                  )}
                                </p>

                                <p className="truncate text-xs text-slate-500">
                                  {textValue(
                                    item.sku,
                                    textValue(
                                      item.category,
                                      "Product",
                                    ),
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-3.5 text-right text-sm font-semibold text-slate-900">
                            {formatNumber(
                              item.unitsSold ??
                                item.quantity,
                            )}
                          </td>

                          <td className="px-5 py-3.5 text-right text-sm font-semibold text-slate-900">
                            {formatCurrency(
                              item.revenue,
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5">
                <EmptyState message="No top-selling product data available." />
              </div>
            )}
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Slow Moving Products
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Products with lower sales movement.
                </p>
              </div>

              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>

            {slowMoving.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Product
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Units
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Revenue
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {slowMoving
                      .slice(0, 10)
                      .map((item, index) => (
                        <tr
                          key={
                            item.productId ||
                            item.sku ||
                            `${item.productName}-${index}`
                          }
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-xs font-bold text-amber-700">
                                {index + 1}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {textValue(
                                    item.productName ??
                                      item.name,
                                    "Unknown Product",
                                  )}
                                </p>

                                <p className="truncate text-xs text-slate-500">
                                  {textValue(
                                    item.sku,
                                    textValue(
                                      item.category,
                                      "Product",
                                    ),
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-3.5 text-right text-sm font-semibold text-slate-900">
                            {formatNumber(
                              item.unitsSold ??
                                item.quantity,
                            )}
                          </td>

                          <td className="px-5 py-3.5 text-right text-sm font-semibold text-slate-900">
                            {formatCurrency(
                              item.revenue,
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5">
                <EmptyState message="No slow-moving product data available." />
              </div>
            )}
          </section>
        </div>

        {/* Customers + Inventory */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Customer Insights
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Customer activity for the selected period.
                </p>
              </div>

              <Users className="h-5 w-5 text-blue-600" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InsightCard
                title="New Customers"
                value={formatNumber(
                  customers?.newCustomers,
                )}
                subtitle="Customers appearing in the selected period."
                icon={Users}
                tone="blue"
              />

              <InsightCard
                title="Returning Customers"
                value={formatNumber(
                  customers?.returningCustomers,
                )}
                subtitle="Customers with previous purchase history."
                icon={Users}
                tone="green"
              />

              <InsightCard
                title="Repeat Purchase Rate"
                value={formatPercent(
                  customers?.repeatPurchaseRate,
                )}
                subtitle="Share of customers making repeat purchases."
                icon={Activity}
                tone="amber"
              />

              <InsightCard
                title="Customer Revenue"
                value={formatCurrency(
                  customers?.customerRevenue,
                )}
                subtitle="Revenue attributed to customers in the selected period."
                icon={CircleDollarSign}
                tone="green"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Inventory Health
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current inventory availability.
                </p>
              </div>

              <Boxes className="h-5 w-5 text-blue-600" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InsightCard
                title="Total Products"
                value={formatNumber(
                  inventory?.totalProducts,
                )}
                subtitle="Products currently tracked in inventory."
                icon={Package}
                tone="blue"
              />

              <InsightCard
                title="In Stock"
                value={formatNumber(
                  inventory?.inStockProducts,
                )}
                subtitle="Products currently available."
                icon={Boxes}
                tone="green"
              />

              <InsightCard
                title="Low Stock"
                value={formatNumber(
                  lowStockProducts,
                )}
                subtitle="Products approaching low-stock threshold."
                icon={AlertTriangle}
                tone="amber"
              />

              <InsightCard
                title="Out of Stock"
                value={formatNumber(
                  outOfStockProducts,
                )}
                subtitle="Products currently unavailable."
                icon={Package}
                tone="red"
              />
            </div>
          </section>
        </div>

        {/* Payment methods */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Payment Methods
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Revenue and order volume by payment method.
              </p>
            </div>

            <Wallet className="h-5 w-5 text-blue-600" />
          </div>

          {paymentMethods.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Method
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Orders
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Revenue
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Share
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paymentMethods.map(
                    (item, index) => {
                      const revenueValue =
                        numberValue(
                          item.revenue,
                        );

                      const share =
                        totalRevenue > 0
                          ? (revenueValue /
                              totalRevenue) *
                            100
                          : 0;

                      return (
                        <tr
                          key={`${item.method}-${index}`}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-5 py-3.5 text-sm font-semibold text-slate-900">
                            {normalizeLabel(
                              item.method,
                            )}
                          </td>

                          <td className="px-5 py-3.5 text-right text-sm text-slate-700">
                            {formatNumber(
                              item.orders,
                            )}
                          </td>

                          <td className="px-5 py-3.5 text-right text-sm font-semibold text-slate-900">
                            {formatCurrency(
                              item.revenue,
                            )}
                          </td>

                          <td className="px-5 py-3.5 text-right text-sm text-slate-700">
                            {share.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5">
              <EmptyState message="No payment method data available." />
            </div>
          )}
        </section>

        {/* Inventory movement */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Inventory Movement
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Inventory movement recorded by the Central API.
              </p>
            </div>

            <FileSpreadsheet className="h-5 w-5 text-blue-600" />
          </div>

          {inventoryMovement.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {inventoryMovement
                .slice(-8)
                .map((item, index) => (
                  <div
                    key={`${item.date}-${index}`}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-medium text-slate-500">
                      {formatDateLabel(
                        textValue(
                          item.date,
                          "",
                        ),
                      )}
                    </p>

                    <p className="mt-2 text-xl font-bold text-slate-900">
                      {formatNumber(
                        item.units ??
                          item.quantity,
                      )}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Units moved
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <EmptyState message="No inventory movement data available." />
          )}
        </section>

        {/* Finance availability */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Wallet className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Finance Snapshot
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Revenue is available from the live Central API.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">
                  Revenue
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatCurrency(
                    finance?.revenue ??
                      revenue?.netSales,
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 px-4 py-3">
                <p className="text-xs text-amber-700">
                  Expenses
                </p>

                <p className="mt-1 text-sm font-semibold text-amber-800">
                  {finance?.expensesAvailable
                    ? "Available"
                    : "Not available"}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 px-4 py-3">
                <p className="text-xs text-amber-700">
                  Gross Profit
                </p>

                <p className="mt-1 text-sm font-semibold text-amber-800">
                  {finance?.grossProfitAvailable
                    ? "Available"
                    : "Not available"}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 px-4 py-3">
                <p className="text-xs text-amber-700">
                  Cash Flow
                </p>

                <p className="mt-1 text-sm font-semibold text-amber-800">
                  {finance?.netCashFlowAvailable
                    ? "Available"
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>

          {finance?.note ? (
            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
              {finance.note}
            </div>
          ) : null}
        </section>

        {/* Regional sales */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <BarChart3 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Regional Sales
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Regional or city-level sales are not currently exposed by
                the Central API analytics response.
              </p>
            </div>
          </div>

          {!regionalSalesAvailable ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
              Regional analytics will appear here once location-level
              order data is available in the Central API schema.
            </div>
          ) : null}
        </section>

        {/* Footer information */}
        <div className="mt-6 flex flex-col gap-2 pb-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            KRVE Enterprise Operating System · Business Analytics
          </p>

          <p>
            Source: KRVE Central API / D1
            {analytics?.generatedAt
              ? ` · Generated ${formatDateTime(
                  analytics.generatedAt,
                )}`
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
