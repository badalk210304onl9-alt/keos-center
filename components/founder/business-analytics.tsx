"use client";

import { useState } from "react";

import {
  Activity,
  ArrowDownRight,
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
  MousePointerClick,
  PackageCheck,
  RefreshCcw,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
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
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DateRange = "7D" | "30D" | "90D" | "1Y";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  tone: "blue" | "red" | "green" | "orange";
};

const revenueData = [
  {
    month: "Feb",
    revenue: 680000,
    expenses: 420000,
    profit: 260000,
  },
  {
    month: "Mar",
    revenue: 760000,
    expenses: 448000,
    profit: 312000,
  },
  {
    month: "Apr",
    revenue: 710000,
    expenses: 431000,
    profit: 279000,
  },
  {
    month: "May",
    revenue: 890000,
    expenses: 518000,
    profit: 372000,
  },
  {
    month: "Jun",
    revenue: 1040000,
    expenses: 593000,
    profit: 447000,
  },
  {
    month: "Jul",
    revenue: 1284000,
    expenses: 726000,
    profit: 558000,
  },
];

const channelData = [
  {
    channel: "Website",
    revenue: 584000,
    orders: 642,
    conversion: 7.8,
  },
  {
    channel: "Mobile App",
    revenue: 328000,
    orders: 371,
    conversion: 8.4,
  },
  {
    channel: "Marketplace",
    revenue: 242000,
    orders: 286,
    conversion: 6.9,
  },
  {
    channel: "Social",
    revenue: 130000,
    orders: 187,
    conversion: 5.7,
  },
];

const customerSegments = [
  {
    name: "New Customers",
    value: 42,
  },
  {
    name: "Returning Customers",
    value: 34,
  },
  {
    name: "VIP Customers",
    value: 16,
  },
  {
    name: "At Risk",
    value: 8,
  },
];

const funnelData = [
  {
    stage: "Website Visitors",
    value: "48,520",
    conversion: "100%",
    width: "100%",
  },
  {
    stage: "Product Views",
    value: "31,280",
    conversion: "64.5%",
    width: "84%",
  },
  {
    stage: "Added to Cart",
    value: "8,940",
    conversion: "28.6%",
    width: "65%",
  },
  {
    stage: "Checkout Started",
    value: "4,320",
    conversion: "48.3%",
    width: "47%",
  },
  {
    stage: "Orders Completed",
    value: "1,486",
    conversion: "34.4%",
    width: "31%",
  },
];

const departmentPerformance = [
  {
    department: "Sales",
    score: 92,
    target: 88,
    trend: "+12.8%",
    status: "Above Target",
  },
  {
    department: "Marketing",
    score: 86,
    target: 82,
    trend: "+9.6%",
    status: "Above Target",
  },
  {
    department: "Finance",
    score: 89,
    target: 90,
    trend: "+7.2%",
    status: "Near Target",
  },
  {
    department: "Inventory",
    score: 78,
    target: 85,
    trend: "-2.4%",
    status: "Needs Attention",
  },
  {
    department: "Customer Support",
    score: 91,
    target: 88,
    trend: "+11.1%",
    status: "Above Target",
  },
  {
    department: "Human Resources",
    score: 84,
    target: 80,
    trend: "+5.7%",
    status: "Above Target",
  },
];

const topProducts = [
  {
    rank: 1,
    name: "KRVE Noir Blazer",
    sku: "KRV-NB-001",
    units: 248,
    revenue: "₹4,71,752",
    growth: "+24.8%",
    stock: "Healthy",
  },
  {
    rank: 2,
    name: "Obsidian Double-Breasted Suit",
    sku: "KRV-OBS-014",
    units: 184,
    revenue: "₹3,49,416",
    growth: "+19.4%",
    stock: "Low",
  },
  {
    rank: 3,
    name: "KRVE Signature Blazer",
    sku: "KRV-SB-008",
    units: 167,
    revenue: "₹2,83,733",
    growth: "+15.7%",
    stock: "Healthy",
  },
  {
    rank: 4,
    name: "KRVE Icon Sneakers",
    sku: "KRV-IS-021",
    units: 142,
    revenue: "₹1,20,558",
    growth: "+12.2%",
    stock: "Healthy",
  },
];

const regionalSales = [
  {
    region: "North India",
    revenue: "₹3.84L",
    percentage: 30,
  },
  {
    region: "West India",
    revenue: "₹3.21L",
    percentage: 25,
  },
  {
    region: "South India",
    revenue: "₹2.82L",
    percentage: 22,
  },
  {
    region: "East India",
    revenue: "₹1.93L",
    percentage: 15,
  },
  {
    region: "Central India",
    revenue: "₹1.04L",
    percentage: 8,
  },
];

function formatCurrency(value: number) {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${Math.round(value / 1000)}K`;
  }

  return `₹${value}`;
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

        <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700">
          <ArrowUpRight size={12} />
          {change}
        </span>
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

export default function BusinessAnalytics() {
  const [selectedRange, setSelectedRange] =
    useState<DateRange>("30D");

  const [comparePeriod, setComparePeriod] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  function refreshAnalytics() {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  }

  function exportReport() {
    const report = [
      ["Metric", "Value"],
      ["Total Revenue", "₹12.84L"],
      ["Orders", "1,486"],
      ["Net Profit", "₹5.58L"],
      ["Conversion Rate", "8.6%"],
      ["Customers", "4,294"],
      ["Average Order Value", "₹8,641"],
    ];

    const csv = report
      .map((row) =>
        row
          .map((value) => `"${value.replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "keos-business-analytics.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

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
              Monitor enterprise revenue, profit, customers, products,
              departments and operational performance from one centralized
              analytics workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={refreshAnalytics}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <RefreshCcw
                size={17}
                className={isRefreshing ? "animate-spin" : ""}
              />

              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </button>

            <button
              type="button"
              onClick={exportReport}
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
          {(["7D", "30D", "90D", "1Y"] as DateRange[]).map(
            (range) => (
              <button
                type="button"
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  selectedRange === range
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {range === "7D" && "Last 7 Days"}
                {range === "30D" && "Last 30 Days"}
                {range === "90D" && "Last 90 Days"}
                {range === "1Y" && "Last 12 Months"}
              </button>
            ),
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600">
            <input
              type="checkbox"
              checked={comparePeriod}
              onChange={(event) =>
                setComparePeriod(event.target.checked)
              }
              className="h-4 w-4 accent-blue-600"
            />

            Compare previous period
          </label>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600"
          >
            <CalendarDays size={16} />
            Custom Dates
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard
          title="Total Revenue"
          value="₹12.84L"
          change={selectedRange === "7D" ? "8.2%" : "18.4%"}
          description="Compared with previous period"
          icon={CircleDollarSign}
          tone="blue"
        />

        <MetricCard
          title="Orders"
          value="1,486"
          change="12.7%"
          description="Completed customer orders"
          icon={ShoppingBag}
          tone="red"
        />

        <MetricCard
          title="Net Profit"
          value="₹5.58L"
          change="24.8%"
          description="43.5% operating profit margin"
          icon={IndianRupee}
          tone="green"
        />

        <MetricCard
          title="Conversion Rate"
          value="8.6%"
          change="1.3%"
          description="Across all sales channels"
          icon={Target}
          tone="orange"
        />

        <MetricCard
          title="Total Customers"
          value="4,294"
          change="24.1%"
          description="1,028 new customers"
          icon={Users}
          tone="blue"
        />

        <MetricCard
          title="Average Order Value"
          value="₹8,641"
          change="4.8%"
          description="Average revenue per order"
          icon={BarChart3}
          tone="red"
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Revenue and Profit Trend
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monthly revenue, expenses and net profit
            </p>
          </div>

          <div className="mt-7 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
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
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="95%"
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
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatCurrency}
                />

                <Tooltip
                  formatter={(value) =>
                    new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(Number(value))
                  }
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#analyticsRevenueGradient)"
                />

                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">
            Customer Segments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customer base distribution
          </p>

          <div className="mt-5 h-[235px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegments}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={4}
                >
                  {customerSegments.map((segment, index) => (
                    <Cell
                      key={segment.name}
                      fill={
                        ["#2563eb", "#ef4444", "#16a34a", "#f59e0b"][
                          index
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {customerSegments.map((segment, index) => (
              <div
                key={segment.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: [
                        "#2563eb",
                        "#ef4444",
                        "#16a34a",
                        "#f59e0b",
                      ][index],
                    }}
                  />

                  <span className="text-xs font-semibold text-slate-600">
                    {segment.name}
                  </span>
                </div>

                <strong className="text-xs text-slate-900">
                  {segment.value}%
                </strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Sales Channel Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Revenue generated by each sales channel
              </p>
            </div>

            <MonitorSmartphone size={22} className="text-blue-600" />
          </div>

          <div className="mt-7 h-[310px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={channelData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="channel"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatCurrency}
                />

                <Tooltip
                  formatter={(value) =>
                    new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(Number(value))
                  }
                />

                <Bar
                  dataKey="revenue"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-500">
                  <th className="pb-3">Channel</th>
                  <th className="pb-3">Orders</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Conversion</th>
                </tr>
              </thead>

              <tbody>
                {channelData.map((channel) => (
                  <tr
                    key={channel.channel}
                    className="border-b border-slate-100 text-xs"
                  >
                    <td className="py-3 font-bold">
                      {channel.channel}
                    </td>

                    <td className="py-3 text-slate-500">
                      {channel.orders}
                    </td>

                    <td className="py-3 font-bold">
                      {formatCurrency(channel.revenue)}
                    </td>

                    <td className="py-3 font-bold text-green-600">
                      {channel.conversion}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Customer Conversion Funnel
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Journey from website visit to completed order
              </p>
            </div>

            <Target size={22} className="text-red-600" />
          </div>

          <div className="mt-8 space-y-4">
            {funnelData.map((stage, index) => (
              <div key={stage.stage}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <strong className="text-xs text-slate-800">
                      {stage.stage}
                    </strong>

                    <span className="ml-2 text-[10px] text-slate-400">
                      {stage.value}
                    </span>
                  </div>

                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
                    {stage.conversion}
                  </span>
                </div>

                <div className="h-9 overflow-hidden rounded-xl bg-slate-100">
                  <div
                    className={`flex h-full items-center rounded-xl px-3 text-[10px] font-bold text-white ${
                      index === funnelData.length - 1
                        ? "bg-green-600"
                        : index === 3
                          ? "bg-red-500"
                          : "bg-blue-600"
                    }`}
                    style={{
                      width: stage.width,
                    }}
                  >
                    {stage.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-start gap-3">
              <MousePointerClick
                size={19}
                className="mt-0.5 text-orange-600"
              />

              <p className="text-xs leading-5 text-orange-700">
                Improving checkout completion by 5% could create approximately
                216 additional monthly orders.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Department Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Performance against departmental targets
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
                <th className="pb-4">Department</th>
                <th className="pb-4">Performance</th>
                <th className="pb-4">Target</th>
                <th className="pb-4">Trend</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {departmentPerformance.map((department) => (
                <tr
                  key={department.department}
                  className="border-b border-slate-100 text-sm"
                >
                  <td className="py-4 font-bold">
                    {department.department}
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            department.score >= department.target
                              ? "bg-blue-600"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${department.score}%`,
                          }}
                        />
                      </div>

                      <strong className="text-xs">
                        {department.score}%
                      </strong>
                    </div>
                  </td>

                  <td className="py-4 text-slate-500">
                    {department.target}%
                  </td>

                  <td
                    className={`py-4 font-bold ${
                      department.trend.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {department.trend}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        department.status === "Above Target"
                          ? "bg-green-50 text-green-700"
                          : department.status === "Near Target"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {department.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">
            Top-Selling Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Best-performing products by revenue
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-500">
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Units</th>
                  <th className="pb-4">Revenue</th>
                  <th className="pb-4">Growth</th>
                  <th className="pb-4">Stock</th>
                </tr>
              </thead>

              <tbody>
                {topProducts.map((product) => (
                  <tr
                    key={product.sku}
                    className="border-b border-slate-100 text-xs"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 font-black text-blue-700">
                          {product.rank}
                        </div>

                        <div>
                          <strong className="block">
                            {product.name}
                          </strong>

                          <span className="mt-1 block text-[10px] text-slate-400">
                            {product.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 font-bold">{product.units}</td>

                    <td className="py-4 font-black">
                      {product.revenue}
                    </td>

                    <td className="py-4 font-bold text-green-600">
                      {product.growth}
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                          product.stock === "Healthy"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Regional Sales
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Revenue distribution across India
              </p>
            </div>

            <MapPin size={22} className="text-red-600" />
          </div>

          <div className="mt-7 space-y-6">
            {regionalSales.map((region) => (
              <div key={region.region}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <strong className="text-xs">
                      {region.region}
                    </strong>

                    <span className="ml-2 text-[10px] text-slate-400">
                      {region.revenue}
                    </span>
                  </div>

                  <strong className="text-xs">
                    {region.percentage}%
                  </strong>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${region.percentage * 3}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
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
                AI-generated observations based on company performance,
                customers and operational activity.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold hover:bg-blue-700"
          >
            <Sparkles size={17} />
            Ask KRVE AI
          </button>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InsightCard
            icon={TrendingUp}
            title="Revenue acceleration detected"
            description="Revenue has increased consistently for three months."
            badge="High Impact"
            tone="green"
          />

          <InsightCard
            icon={PackageCheck}
            title="Inventory risk detected"
            description="Two leading products may run out of stock within 10 days."
            badge="Action Required"
            tone="red"
          />

          <InsightCard
            icon={MonitorSmartphone}
            title="Mobile conversion improving"
            description="Mobile App conversion is now higher than website conversion."
            badge="Opportunity"
            tone="blue"
          />

          <InsightCard
            icon={MousePointerClick}
            title="Checkout abandonment"
            description="Checkout abandonment remains a major conversion opportunity."
            badge="Needs Review"
            tone="orange"
          />
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-4">
        <MiniCard
          icon={Eye}
          title="Website Visitors"
          value="48,520"
          change="+21.4%"
          tone="blue"
        />

        <MiniCard
          icon={UserCheck}
          title="Returning Customers"
          value="34.2%"
          change="+4.8%"
          tone="green"
        />

        <MiniCard
          icon={BarChart3}
          title="Marketing ROI"
          value="4.8x"
          change="+0.7x"
          tone="red"
        />

        <MiniCard
          icon={Activity}
          title="Operational Score"
          value="87.4"
          change="Excellent"
          tone="orange"
        />
      </section>
    </div>
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
  tone: "blue" | "red" | "green" | "orange";
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
      <Icon size={20} className={iconClass} />

      <p className="mt-4 text-xs font-semibold text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-black text-slate-900">
        {value}
      </h3>

      <span className="mt-2 block text-xs font-bold text-green-600">
        {change}
      </span>
    </article>
  );
}