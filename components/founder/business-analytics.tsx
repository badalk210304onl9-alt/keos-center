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
  MonitorSmartphone,
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

type DateRange = "7D" | "30D" | "90D" | "1Y";

type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Failed"
  | "Refunded";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned";

type ShippingAddress = {
  recipientName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

type RawApiOrder = {
  id: string;
  orderNumber: string;
  customerId: string | null;

  customer: {
    name: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    phone: string;
  };

  status: string;
  paymentStatus: string;

  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;

  couponCode?: string | null;

  shippingAddress?: ShippingAddress;
  billingAddress?: ShippingAddress;

  notes?: string | null;
  itemCount?: number;

  createdAt: string;
  updatedAt: string;
};

type OrdersApiResponse = {
  success: boolean;
  message?: string;

  orders?: RawApiOrder[];

  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
};

type Order = RawApiOrder & {
  paymentStatusNormalized: PaymentStatus;
  orderStatusNormalized: OrderStatus;
};

type MetricCardProps = {
  title: string;
  value: string;
  change?: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  tone: "blue" | "red" | "green" | "orange";
};

const CHART_COLORS = [
  "#2563eb",
  "#ef4444",
  "#16a34a",
  "#f59e0b",
];

function normalizePaymentStatus(
  value: string,
): PaymentStatus {
  const normalized = value
    .trim()
    .toLowerCase();

  if (normalized === "paid") {
    return "Paid";
  }

  if (normalized === "pending") {
    return "Pending";
  }

  if (normalized === "failed") {
    return "Failed";
  }

  if (normalized === "refunded") {
    return "Refunded";
  }

  return "Pending";
}

function normalizeOrderStatus(
  value: string,
): OrderStatus {
  const statuses: OrderStatus[] = [
    "Pending",
    "Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  const match = statuses.find(
    (status) =>
      status.toLowerCase() ===
      value.trim().toLowerCase(),
  );

  return match ?? "Pending";
}

function mapOrder(
  order: RawApiOrder,
): Order {
  return {
    ...order,
    paymentStatusNormalized:
      normalizePaymentStatus(
        order.paymentStatus,
      ),
    orderStatusNormalized:
      normalizeOrderStatus(
        order.status,
      ),
  };
}

function formatCurrency(
  value: number,
) {
  if (!Number.isFinite(value)) {
    return "₹0";
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

function getDateRangeStart(
  range: DateRange,
) {
  const date = new Date();

  if (range === "7D") {
    date.setDate(
      date.getDate() - 6,
    );
  }

  if (range === "30D") {
    date.setDate(
      date.getDate() - 29,
    );
  }

  if (range === "90D") {
    date.setDate(
      date.getDate() - 89,
    );
  }

  if (range === "1Y") {
    date.setFullYear(
      date.getFullYear() - 1,
    );
    date.setDate(
      date.getDate() + 1,
    );
  }

  date.setHours(
    0,
    0,
    0,
    0,
  );

  return date;
}

function isRevenueOrder(
  order: Order,
) {
  return (
    order.paymentStatusNormalized ===
      "Paid" &&
    order.orderStatusNormalized !==
      "Cancelled" &&
    order.orderStatusNormalized !==
      "Returned"
  );
}

function getCustomerKey(
  order: Order,
) {
  if (order.customerId) {
    return `id:${order.customerId}`;
  }

  if (
    order.customer?.email?.trim()
  ) {
    return `email:${order.customer.email
      .trim()
      .toLowerCase()}`;
  }

  if (
    order.customer?.phone?.trim()
  ) {
    return `phone:${order.customer.phone
      .trim()
      .toLowerCase()}`;
  }

  return `order:${order.id}`;
}

function getRegion(
  address?: ShippingAddress,
) {
  const state =
    address?.state
      ?.trim()
      .toLowerCase();

  if (!state) {
    return "Unknown Region";
  }

  const north = [
    "uttar pradesh",
    "uttarakhand",
    "delhi",
    "haryana",
    "punjab",
    "himachal pradesh",
    "jammu and kashmir",
    "ladakh",
    "rajasthan",
    "chandigarh",
  ];

  const west = [
    "maharashtra",
    "gujarat",
    "goa",
    "madhya pradesh",
    "chhattisgarh",
    "dadra and nagar haveli",
    "daman and diu",
  ];

  const south = [
    "karnataka",
    "tamil nadu",
    "kerala",
    "andhra pradesh",
    "telangana",
    "puducherry",
    "andaman and nicobar islands",
    "lakshadweep",
  ];

  const east = [
    "bihar",
    "jharkhand",
    "odisha",
    "west bengal",
    "sikkim",
    "assam",
    "arunachal pradesh",
    "manipur",
    "meghalaya",
    "mizoram",
    "nagaland",
    "tripura",
  ];

  if (north.includes(state)) {
    return "North India";
  }

  if (west.includes(state)) {
    return "West India";
  }

  if (south.includes(state)) {
    return "South India";
  }

  if (east.includes(state)) {
    return "East India";
  }

  return "Other India";
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
  tone: "blue" | "red" | "green" | "orange";
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

export default function BusinessAnalytics() {
  const [selectedRange, setSelectedRange] =
    useState<DateRange>("30D");

  const [comparePeriod, setComparePeriod] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadAnalytics = useCallback(
    async () => {
      setIsLoading(true);
      setError("");

      try {
        const response =
          await fetch(
            "/api/orders?limit=100",
            {
              method: "GET",
              headers: {
                Accept:
                  "application/json",
              },
              cache:
                "no-store",
            },
          );

        let result:
          | OrdersApiResponse
          | null = null;

        try {
          result =
            (await response.json()) as OrdersApiResponse;
        } catch {
          result = null;
        }

        if (
          !response.ok ||
          !result?.success
        ) {
          throw new Error(
            result?.message ||
              `Orders API returned ${response.status}.`,
          );
        }

        const liveOrders =
          Array.isArray(
            result.orders,
          )
            ? result.orders.map(
                mapOrder,
              )
            : [];

        setOrders(
          liveOrders,
        );
      } catch (requestError) {
        console.error(
          "BUSINESS_ANALYTICS_LOAD_ERROR",
          requestError,
        );

        setOrders([]);

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load live analytics data.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  const refreshAnalytics =
    async () => {
      setIsRefreshing(true);

      try {
        await loadAnalytics();
      } finally {
        setIsRefreshing(false);
      }
    };

  const filteredOrders =
    useMemo(() => {
      const start =
        getDateRangeStart(
          selectedRange,
        );

      return orders.filter(
        (order) => {
          const created =
            new Date(
              order.createdAt,
            );

          return (
            Number.isFinite(
              created.getTime(),
            ) &&
            created >= start
          );
        },
      );
    }, [
      orders,
      selectedRange,
    ]);

  const revenueOrders =
    useMemo(
      () =>
        filteredOrders.filter(
          isRevenueOrder,
        ),
      [filteredOrders],
    );

  const totalRevenue =
    useMemo(
      () =>
        revenueOrders.reduce(
          (sum, order) =>
            sum +
            Number(order.total || 0),
          0,
        ),
      [revenueOrders],
    );

  const totalOrders =
    filteredOrders.length;

  const averageOrderValue =
    revenueOrders.length > 0
      ? totalRevenue /
        revenueOrders.length
      : 0;

  const uniqueCustomers =
    useMemo(() => {
      const customers =
        new Set<string>();

      filteredOrders.forEach(
        (order) => {
          customers.add(
            getCustomerKey(order),
          );
        },
      );

      return customers.size;
    }, [filteredOrders]);

  const paidOrders =
    filteredOrders.filter(
      (order) =>
        order.paymentStatusNormalized ===
        "Paid",
    ).length;

  const pendingPayments =
    filteredOrders.filter(
      (order) =>
        order.paymentStatusNormalized ===
        "Pending",
    ).length;

  const failedPayments =
    filteredOrders.filter(
      (order) =>
        order.paymentStatusNormalized ===
        "Failed",
    ).length;

  const refundedOrders =
    filteredOrders.filter(
      (order) =>
        order.paymentStatusNormalized ===
        "Refunded",
    ).length;

  const openOrders =
    filteredOrders.filter(
      (order) =>
        ![
          "Delivered",
          "Cancelled",
          "Returned",
        ].includes(
          order.orderStatusNormalized,
        ),
    ).length;

  const paymentIssues =
    pendingPayments +
    failedPayments;

  const revenueTrend =
    useMemo(() => {
      const buckets =
        new Map<
          string,
          {
            label: string;
            revenue: number;
            orders: number;
          }
        >();

      filteredOrders.forEach(
        (order) => {
          if (!isRevenueOrder(order)) {
            return;
          }

          const date =
            new Date(
              order.createdAt,
            );

          if (
            !Number.isFinite(
              date.getTime(),
            )
          ) {
            return;
          }

          const key =
            selectedRange === "1Y"
              ? `${date.getFullYear()}-${String(
                  date.getMonth() + 1,
                ).padStart(2, "0")}`
              : `${date.getFullYear()}-${String(
                  date.getMonth() + 1,
                ).padStart(2, "0")}-${String(
                  date.getDate(),
                ).padStart(2, "0")}`;

          const label =
            selectedRange === "1Y"
              ? date.toLocaleDateString(
                  "en-IN",
                  {
                    month: "short",
                    year: "numeric",
                  },
                )
              : date.toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                  },
                );

          const existing =
            buckets.get(key);

          if (existing) {
            existing.revenue +=
              Number(
                order.total || 0,
              );

            existing.orders += 1;
          } else {
            buckets.set(
              key,
              {
                label,
                revenue:
                  Number(
                    order.total || 0,
                  ),
                orders: 1,
              },
            );
          }
        },
      );

      return Array.from(
        buckets.entries(),
      )
        .sort(([a], [b]) =>
          a.localeCompare(b),
        )
        .map(
          ([, value]) =>
            value,
        );
    }, [
      filteredOrders,
      selectedRange,
    ]);

  const paymentData =
    useMemo(
      () => [
        {
          name: "Paid",
          value: paidOrders,
        },
        {
          name: "Pending",
          value: pendingPayments,
        },
        {
          name: "Failed",
          value: failedPayments,
        },
        {
          name: "Refunded",
          value: refundedOrders,
        },
      ].filter(
        (item) =>
          item.value > 0,
      ),
      [
        paidOrders,
        pendingPayments,
        failedPayments,
        refundedOrders,
      ],
    );

  const customerSegments =
    useMemo(() => {
      const customerOrders =
        new Map<
          string,
          number
        >();

      filteredOrders.forEach(
        (order) => {
          const key =
            getCustomerKey(order);

          customerOrders.set(
            key,
            (customerOrders.get(
              key,
            ) ?? 0) + 1,
          );
        },
      );

      let newCustomers = 0;
      let returningCustomers = 0;

      customerOrders.forEach(
        (count) => {
          if (count > 1) {
            returningCustomers += 1;
          } else {
            newCustomers += 1;
          }
        },
      );

      return [
        {
          name: "New Customers",
          value: newCustomers,
        },
        {
          name: "Returning Customers",
          value: returningCustomers,
        },
      ].filter(
        (item) =>
          item.value > 0,
      );
    }, [filteredOrders]);

  const regionalSales =
    useMemo(() => {
      const regions =
        new Map<
          string,
          {
            revenue: number;
            orders: number;
          }
        >();

      revenueOrders.forEach(
        (order) => {
          const region =
            getRegion(
              order.shippingAddress,
            );

          const current =
            regions.get(
              region,
            ) ?? {
              revenue: 0,
              orders: 0,
            };

          current.revenue +=
            Number(
              order.total || 0,
            );

          current.orders += 1;

          regions.set(
            region,
            current,
          );
        },
      );

      const total =
        Array.from(
          regions.values(),
        ).reduce(
          (sum, item) =>
            sum +
            item.revenue,
          0,
        );

      return Array.from(
        regions.entries(),
      )
        .sort(
          ([, a], [, b]) =>
            b.revenue -
            a.revenue,
        )
        .map(
          ([region, value]) => ({
            region,
            revenue:
              value.revenue,
            orders:
              value.orders,
            percentage:
              total > 0
                ? Number(
                    (
                      (value.revenue /
                        total) *
                      100
                    ).toFixed(1),
                  )
                : 0,
          }),
        );
    }, [revenueOrders]);

  const orderStatusData =
    useMemo(() => {
      const statuses =
        new Map<
          string,
          number
        >();

      filteredOrders.forEach(
        (order) => {
          statuses.set(
            order.orderStatusNormalized,
            (statuses.get(
              order.orderStatusNormalized,
            ) ?? 0) + 1,
          );
        },
      );

      return Array.from(
        statuses.entries(),
      )
        .sort(
          ([, a], [, b]) =>
            b - a,
        )
        .map(
          ([status, value]) => ({
            status,
            value,
          }),
        );
    }, [filteredOrders]);

  const exportReport =
    () => {
      const report = [
        [
          "Metric",
          "Value",
        ],
        [
          "Date Range",
          selectedRange,
        ],
        [
          "Total Revenue",
          formatFullCurrency(
            totalRevenue,
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
          "Unique Customers",
          String(
            uniqueCustomers,
          ),
        ],
        [
          "Average Order Value",
          formatFullCurrency(
            averageOrderValue,
          ),
        ],
        [
          "Open Orders",
          String(
            openOrders,
          ),
        ],
      ];

      const csv =
        report
          .map(
            (row) =>
              row
                .map(
                  (value) =>
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

      anchor.href = url;

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
      /*
        Existing KEOS AI Center can listen for this event
        and open the same Ask KRVE AI workspace.

        No duplicate AI implementation is created here.
      */
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

  const currentPeriodLabel =
    selectedRange === "7D"
      ? "Last 7 Days"
      : selectedRange === "30D"
        ? "Last 30 Days"
        : selectedRange === "90D"
          ? "Last 90 Days"
          : "Last 12 Months";

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
              Live business analytics calculated from
              KRVE order data. No demo revenue or
              fabricated business figures are used.
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
            (range) => (
              <button
                type="button"
                key={range}
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
            title="Custom date filtering will be connected to the analytics API when required."
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
          description={`${currentPeriodLabel} · Paid orders only`}
          icon={CircleDollarSign}
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
          description={`${currentPeriodLabel} · Actual orders`}
          icon={ShoppingBag}
          tone="red"
        />

        <MetricCard
          title="Net Profit"
          value="N/A"
          description="Expense/accounting data is not connected yet"
          icon={IndianRupee}
          tone="green"
        />

        <MetricCard
          title="Conversion Rate"
          value="N/A"
          description="Website visitor/session data is not connected"
          icon={Target}
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
          description="Unique customers identified from live orders"
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
          description="Paid revenue divided by paid orders"
          icon={BarChart3}
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
              Actual paid-order revenue for{" "}
              {currentPeriodLabel.toLowerCase()}
            </p>
          </div>

          <div className="mt-7 h-[350px]">
            {revenueTrend.length ===
            0 ? (
              <EmptyState
                title="No revenue recorded"
                description="There are no paid orders in the selected period. Revenue is therefore ₹0."
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
                    vertical={false}
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

                  <Tooltip
                    formatter={(
                      value,
                    ) =>
                      formatFullCurrency(
                        Number(
                          value,
                        ),
                      )
                    }
                  />

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
            Actual payment state of orders
          </p>

          {paymentData.length ===
          0 ? (
            <div className="mt-5">
              <EmptyState
                title="No orders"
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
                    vertical={false}
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
                Derived from actual order frequency
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
                description="Customer segmentation will appear when live orders contain customer records."
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
                Regional Sales
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Revenue calculated from shipping state
              </p>
            </div>

            <MapPin
              size={22}
              className="text-red-600"
            />
          </div>

          {regionalSales.length ===
          0 ? (
            <div className="mt-6">
              <EmptyState
                title="No regional sales"
                description="Regional analytics will appear when paid orders contain shipping location data."
              />
            </div>
          ) : (
            <div className="mt-7 space-y-6">
              {regionalSales.map(
                (region) => (
                  <div
                    key={
                      region.region
                    }
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <strong className="text-xs">
                          {
                            region.region
                          }
                        </strong>

                        <span className="ml-2 text-[10px] text-slate-400">
                          {formatCurrency(
                            region.revenue,
                          )}
                        </span>
                      </div>

                      <strong className="text-xs">
                        {
                          region.percentage
                        }
                        %
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
                              region.percentage,
                            ),
                          )}%`,
                        }}
                      />
                    </div>
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
              status="LIVE"
              description="KRVE Orders API"
              live
            />

            <DataStatus
              label="Revenue"
              status="LIVE"
              description="Calculated from paid orders"
              live
            />

            <DataStatus
              label="Customers"
              status="LIVE"
              description="Derived from order customer records"
              live
            />

            <DataStatus
              label="Regional Sales"
              status={
                regionalSales.length >
                0
                  ? "LIVE"
                  : "NO DATA"
              }
              description="Derived from shipping address"
              live={
                regionalSales.length >
                0
              }
            />

            <DataStatus
              label="Expenses / Profit"
              status="NOT CONNECTED"
              description="No expense/accounting source available"
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

            <DataStatus
              label="Product Revenue"
              status="NOT CONNECTED"
              description="Orders API currently does not expose order line items"
            />
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Product Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Product-level revenue requires order line-item data from the
            Orders API.
          </p>
        </div>

        <div className="mt-6">
          <EmptyState
            title="Product-level sales data is not available yet"
            description="The current live Orders API returns itemCount but does not return individual product IDs, SKUs, quantities or line-item prices. KEOS will not invent product sales figures."
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
            value={
              customerSegments.find(
                (item) =>
                  item.name ===
                  "Returning Customers",
              )?.value
                ? formatNumber(
                    customerSegments.find(
                      (item) =>
                        item.name ===
                        "Returning Customers",
                    )?.value ??
                      0,
                  )
                : "0"
            }
            change="Derived from order history"
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
            icon={CircleDollarSign}
            title="Revenue Status"
            description={
              totalRevenue > 0
                ? `Paid revenue recorded in the selected period is ${formatFullCurrency(
                    totalRevenue,
                  )}.`
                : "No paid revenue has been recorded in the selected period."
            }
            badge={
              totalRevenue > 0
                ? "LIVE DATA"
                : "₹0 RECORDED"
            }
            tone="blue"
          />

          <InsightCard
            icon={ShoppingBag}
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
            )} unique customer record(s) are identifiable from the current order data.`}
            badge="LIVE DATA"
            tone="blue"
          />

          <InsightCard
            icon={PackageCheck}
            title="Data Coverage"
            description="Expenses, product line-items, website funnel and marketing attribution are not connected yet."
            badge="DATA GAP"
            tone="orange"
          />
        </div>
      </section>

      <div className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {isLoading
          ? "Loading live KRVE Central API data..."
          : "Live analytics calculated from KRVE order data"}
      </div>
    </div>
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
