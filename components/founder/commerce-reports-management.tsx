"use client";

import {
  Activity,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileBarChart,
  FileText,
  Filter,
  IndianRupee,
  Layers3,
  LineChart,
  Package,
  Percent,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ReportTab =
  | "dashboard"
  | "sales"
  | "revenue"
  | "orders"
  | "products"
  | "customers"
  | "channels"
  | "fulfilment"
  | "returns"
  | "profitability"
  | "scheduled"
  | "exports"
  | "settings";

type ReportStatus = "Ready" | "Generating" | "Scheduled" | "Failed";

type SavedReport = {
  id: string;
  name: string;
  category: string;
  period: string;
  owner: string;
  generatedAt: string;
  format: string;
  status: ReportStatus;
};

type ChannelMetric = {
  channel: string;
  revenue: number;
  orders: number;
  conversion: number;
  share: number;
};

type ProductMetric = {
  product: string;
  category: string;
  units: number;
  revenue: number;
  returns: number;
  margin: number;
};

const tabs: Array<{
  id: ReportTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "sales", label: "Sales Reports", icon: TrendingUp },
  { id: "revenue", label: "Revenue Reports", icon: IndianRupee },
  { id: "orders", label: "Order Reports", icon: ShoppingBag },
  { id: "products", label: "Product Reports", icon: Package },
  { id: "customers", label: "Customer Reports", icon: Users },
  { id: "channels", label: "Channel Reports", icon: Store },
  { id: "fulfilment", label: "Fulfilment Reports", icon: Truck },
  { id: "returns", label: "Returns Reports", icon: RefreshCcw },
  { id: "profitability", label: "Profitability", icon: Percent },
  { id: "scheduled", label: "Scheduled Reports", icon: CalendarDays },
  { id: "exports", label: "Exports", icon: Download },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const savedReports: SavedReport[] = [
  {
    id: "RPT-2026-184",
    name: "Daily Commerce Executive Summary",
    category: "Executive",
    period: "25 Jul 2026",
    owner: "Founder Office",
    generatedAt: "26 Jul 2026, 08:00 AM",
    format: "PDF",
    status: "Ready",
  },
  {
    id: "RPT-2026-183",
    name: "Channel Revenue Performance",
    category: "Sales Channels",
    period: "Jul 2026",
    owner: "Commerce Team",
    generatedAt: "26 Jul 2026, 07:45 AM",
    format: "XLSX",
    status: "Ready",
  },
  {
    id: "RPT-2026-182",
    name: "Product Margin Analysis",
    category: "Profitability",
    period: "Jul 2026",
    owner: "Finance Team",
    generatedAt: "26 Jul 2026, 07:20 AM",
    format: "PDF",
    status: "Generating",
  },
  {
    id: "RPT-2026-181",
    name: "Returns and Refunds Review",
    category: "Returns",
    period: "Week 30",
    owner: "Operations Team",
    generatedAt: "Scheduled 06:00 PM",
    format: "XLSX",
    status: "Scheduled",
  },
];

const channelMetrics: ChannelMetric[] = [
  {
    channel: "KRVE Website",
    revenue: 824000,
    orders: 642,
    conversion: 7.8,
    share: 45.2,
  },
  {
    channel: "KRVE Mobile App",
    revenue: 468000,
    orders: 386,
    conversion: 9.1,
    share: 25.7,
  },
  {
    channel: "Amazon India",
    revenue: 286000,
    orders: 214,
    conversion: 6.4,
    share: 15.7,
  },
  {
    channel: "Offline Store",
    revenue: 246000,
    orders: 244,
    conversion: 12.6,
    share: 13.4,
  },
];

const productMetrics: ProductMetric[] = [
  {
    product: "KRVE Noir Blazer",
    category: "Blazers",
    units: 186,
    revenue: 353400,
    returns: 8,
    margin: 58.4,
  },
  {
    product: "Obsidian Oxford Shoes",
    category: "Footwear",
    units: 142,
    revenue: 127800,
    returns: 6,
    margin: 56.1,
  },
  {
    product: "Double-Breasted Navy Suit",
    category: "Suits",
    units: 96,
    revenue: 316800,
    returns: 4,
    margin: 54.8,
  },
  {
    product: "KRVE Icon Sneakers",
    category: "Footwear",
    units: 128,
    revenue: 83200,
    returns: 12,
    margin: 49.6,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CommerceReportsManagement() {
  const [activeTab, setActiveTab] = useState<ReportTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return savedReports;
    }

    return savedReports.filter((report) =>
      `${report.id} ${report.name} ${report.category} ${report.owner} ${report.status}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <CommerceReportsHeader
        onCreate={() => setShowCreatePanel(true)}
        onOpenTab={setActiveTab}
      />

      <CommerceReportsTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "sales" && <SalesReportsWorkspace />}
      {activeTab === "revenue" && <RevenueReportsWorkspace />}
      {activeTab === "orders" && <OrderReportsWorkspace />}
      {activeTab === "products" && <ProductReportsWorkspace />}
      {activeTab === "customers" && <CustomerReportsWorkspace />}
      {activeTab === "channels" && <ChannelReportsWorkspace />}
      {activeTab === "fulfilment" && <FulfilmentReportsWorkspace />}
      {activeTab === "returns" && <ReturnsReportsWorkspace />}
      {activeTab === "profitability" && <ProfitabilityWorkspace />}
      {activeTab === "scheduled" && (
        <ScheduledReportsWorkspace onCreate={() => setShowCreatePanel(true)} />
      )}
      {activeTab === "exports" && (
        <ExportsWorkspace
          reports={filteredReports}
          search={search}
          setSearch={setSearch}
        />
      )}
      {activeTab === "settings" && <SettingsWorkspace />}

      {showCreatePanel && (
        <CreateReportPanel onClose={() => setShowCreatePanel(false)} />
      )}
    </div>
  );
}

function CommerceReportsHeader({
  onCreate,
  onOpenTab,
}: {
  onCreate: () => void;
  onOpenTab: (tab: ReportTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <FileBarChart size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Commerce Intelligence
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Commerce Reports Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Analyse sales, revenue, orders, products, customers, channels,
            fulfilment, returns and commerce profitability from one reporting
            center.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("sales")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <TrendingUp size={17} />
            Sales Report
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Create Report
          </button>
        </div>
      </div>
    </section>
  );
}

function CommerceReportsTabBar({
  activeTab,
  onChange,
}: {
  activeTab: ReportTab;
  onChange: (tab: ReportTab) => void;
}) {
  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="keos-scrollbar flex overflow-x-auto p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DashboardWorkspace({
  onOpenTab,
}: {
  onOpenTab: (tab: ReportTab) => void;
}) {
  const totalChannelRevenue = channelMetrics.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );
  const totalOrders = channelMetrics.reduce((sum, item) => sum + item.orders, 0);

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Gross Sales"
          value="₹18.24L"
          note="Current month"
          icon={TrendingUp}
          tone="blue"
        />
        <MetricCard
          title="Net Revenue"
          value={formatCurrency(totalChannelRevenue)}
          note="After returns and discounts"
          icon={IndianRupee}
          tone="green"
        />
        <MetricCard
          title="Orders"
          value={String(totalOrders)}
          note="All channels"
          icon={ShoppingBag}
          tone="violet"
        />
        <MetricCard
          title="AOV"
          value="₹10,673"
          note="Average order value"
          icon={BarChart3}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Commerce Performance Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Revenue, orders, conversion and channel share
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("channels")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View Channel Reports
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {channelMetrics.map((channel) => (
              <ChannelRow key={channel.channel} channel={channel} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
              <Sparkles size={22} />
            </div>

            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-300">
              AI Active
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black">
            KRVE AI Commerce Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI identifies growth, margin, conversion, return and
            fulfilment patterns across the complete commerce system.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Growth signal"
              detail="Mobile app conversion is 1.3 percentage points above the website."
              tone="green"
            />
            <InsightCard
              title="Margin warning"
              detail="One footwear product is below the approved 50% gross-margin threshold."
              tone="orange"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("profitability")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Commerce Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Top Product Performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Revenue, returns and margin by product
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("products")}
              className="text-sm font-bold text-blue-600"
            >
              Open Product Reports
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {productMetrics.map((product) => (
              <ProductRow key={product.product} product={product} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Reporting Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Open daily commerce reporting workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Sales Report"
              description="Analyse gross sales and net sales"
              icon={TrendingUp}
              onClick={() => onOpenTab("sales")}
            />
            <QuickAction
              title="Product Report"
              description="Review units, revenue and returns"
              icon={Package}
              onClick={() => onOpenTab("products")}
            />
            <QuickAction
              title="Profitability"
              description="Analyse margin and contribution"
              icon={Percent}
              onClick={() => onOpenTab("profitability")}
            />
            <QuickAction
              title="Schedule Report"
              description="Automate recurring report delivery"
              icon={CalendarDays}
              onClick={() => onOpenTab("scheduled")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Recent Reports
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Generated and scheduled commerce reports
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("exports")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Open Report Exports
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {savedReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  title,
  value,
  note,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  note: string;
  icon: IconType;
  tone: "blue" | "green" | "violet" | "orange";
}) {
  const classes =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "violet"
        ? "bg-violet-50 text-violet-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${classes}`}>
        <Icon size={21} />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function ChannelRow({
  channel,
}: {
  channel: ChannelMetric;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Store size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">
          {channel.channel}
        </strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {channel.orders} orders · {formatPercent(channel.conversion)} conversion
        </p>
      </div>

      <div className="text-right">
        <strong className="block text-sm text-slate-900">
          {formatCurrency(channel.revenue)}
        </strong>
        <span className="text-xs font-bold text-blue-600">
          {formatPercent(channel.share)}
        </span>
      </div>
    </div>
  );
}

function ProductRow({
  product,
}: {
  product: ProductMetric;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Package size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">
          {product.product}
        </strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {product.units} units · {product.returns} returns
        </p>
      </div>

      <div className="text-right">
        <strong className="block text-sm text-slate-900">
          {formatCurrency(product.revenue)}
        </strong>
        <span className="text-xs font-bold text-green-600">
          {formatPercent(product.margin)}
        </span>
      </div>
    </div>
  );
}

function ReportCard({
  report,
}: {
  report: SavedReport;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <FileText size={19} />
        </div>
        <ReportStatusBadge status={report.status} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">{report.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{report.period}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <InfoBox label="Owner" value={report.owner} />
        <InfoBox label="Format" value={report.format} />
      </div>
    </article>
  );
}

function InsightCard({
  title,
  detail,
  tone,
}: {
  title: string;
  detail: string;
  tone: "green" | "orange";
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <strong
        className={`text-xs ${
          tone === "green" ? "text-green-300" : "text-orange-300"
        }`}
      >
        {title}
      </strong>
      <p className="mt-2 text-xs leading-5 text-slate-400">{detail}</p>
    </div>
  );
}

function QuickAction({
  title,
  description,
  icon: Icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: IconType;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <strong className="mt-4 block text-sm text-slate-900">{title}</strong>
      <span className="mt-2 block text-xs leading-5 text-slate-500">
        {description}
      </span>
      <span className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
        Open
        <ChevronRight size={14} className="transition group-hover:translate-x-1" />
      </span>
    </button>
  );
}

function SalesReportsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Sales Reports"
        description="Analyse gross sales, net sales, order value and sales growth."
        buttonLabel="Generate Sales Report"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Gross Sales" value="₹18.24L" note="Current month" icon={TrendingUp} tone="blue" />
        <MetricCard title="Net Sales" value="₹15.86L" note="After discounts and returns" icon={IndianRupee} tone="green" />
        <MetricCard title="Sales Growth" value="+18.4%" note="Versus previous month" icon={Activity} tone="violet" />
        <MetricCard title="Average Order Value" value="₹10,673" note="All channels" icon={BarChart3} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Daily Sales Trend"
          values={[58, 64, 72, 68, 82, 88, 94]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
        <ChartCard
          title="Sales by Channel"
          values={[92, 68, 48, 36]}
          labels={["Website", "App", "Amazon", "Store"]}
        />
      </section>
    </div>
  );
}

function RevenueReportsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Revenue Reports"
        description="Review gross revenue, net revenue, discounts, returns and tax."
        buttonLabel="Generate Revenue Report"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Gross Revenue" value="₹18.24L" note="Before deductions" icon={IndianRupee} tone="blue" />
        <MetricCard title="Discounts" value="₹1.42L" note="Current month" icon={Percent} tone="orange" />
        <MetricCard title="Returns" value="₹96,000" note="Refunded value" icon={RefreshCcw} tone="violet" />
        <MetricCard title="Net Revenue" value="₹15.86L" note="Recognised revenue" icon={CheckCircle2} tone="green" />
      </section>
    </div>
  );
}

function OrderReportsWorkspace() {
  const orderRows = [
    ["Completed Orders", "1,284", "₹14.82L", "86.4%"],
    ["Processing Orders", "126", "₹1.48L", "8.5%"],
    ["Cancelled Orders", "42", "₹46,800", "2.8%"],
    ["Returned Orders", "34", "₹96,000", "2.3%"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Order Reports"
        description="Analyse order volume, value, status and cancellation."
        buttonLabel="Generate Order Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {orderRows.map((row) => (
          <article key={row[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <ShoppingBag size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{row[0]}</h3>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Orders" value={row[1]} />
              <InfoRow label="Value" value={row[2]} />
              <InfoRow label="Share" value={row[3]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProductReportsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Product Reports"
        description="Analyse units sold, revenue, returns and margin by product."
        buttonLabel="Generate Product Report"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Units</th>
                <th className="px-5 py-4">Revenue</th>
                <th className="px-5 py-4">Returns</th>
                <th className="px-5 py-4">Margin</th>
              </tr>
            </thead>

            <tbody>
              {productMetrics.map((product) => (
                <tr key={product.product} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-slate-900">{product.product}</td>
                  <td className="px-5 py-4 text-slate-600">{product.category}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{product.units}</td>
                  <td className="px-5 py-4 font-bold text-blue-600">{formatCurrency(product.revenue)}</td>
                  <td className="px-5 py-4 text-slate-600">{product.returns}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      {formatPercent(product.margin)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function CustomerReportsWorkspace() {
  const customers = [
    ["Active Customers", "4,294", "Current customer base", "+12.8%"],
    ["New Customers", "486", "Current month", "+18.4%"],
    ["Repeat Customers", "1,842", "42.9% repeat rate", "+7.6%"],
    ["VIP Customers", "286", "Gold and Platinum", "+5.2%"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Customer Reports"
        description="Analyse acquisition, repeat rate, customer value and loyalty."
        buttonLabel="Generate Customer Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {customers.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Users size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <p className="mt-2 text-3xl font-black text-slate-950">{item[1]}</p>
            <p className="mt-2 text-xs text-slate-500">{item[2]}</p>
            <span className="mt-4 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
              {item[3]}
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}

function ChannelReportsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Sales Channel Reports"
        description="Compare revenue, orders, conversion and share by channel."
        buttonLabel="Generate Channel Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {channelMetrics.map((channel) => (
          <article key={channel.channel} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Store size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{channel.channel}</h3>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Revenue" value={formatCurrency(channel.revenue)} />
              <InfoRow label="Orders" value={String(channel.orders)} />
              <InfoRow label="Conversion" value={formatPercent(channel.conversion)} />
              <InfoRow label="Share" value={formatPercent(channel.share)} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function FulfilmentReportsWorkspace() {
  const fulfilment = [
    ["Orders Fulfilled", "1,326", "Current month"],
    ["On-Time Dispatch", "96.8%", "Within warehouse SLA"],
    ["On-Time Delivery", "91.2%", "Within promised date"],
    ["Average Fulfilment", "18h 42m", "Order to dispatch"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Fulfilment Reports"
        description="Analyse warehouse, dispatch, delivery and courier performance."
        buttonLabel="Generate Fulfilment Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {fulfilment.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-50 text-green-600">
              <Truck size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <p className="mt-2 text-3xl font-black text-slate-950">{item[1]}</p>
            <p className="mt-2 text-xs text-slate-500">{item[2]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function ReturnsReportsWorkspace() {
  const returns = [
    ["Return Rate", "3.2%", "Current month"],
    ["Open Returns", "14", "Awaiting action"],
    ["Refund Value", "₹96,000", "Current month"],
    ["Exchange Rate", "28%", "Of approved returns"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Returns Reports"
        description="Analyse returns, refunds, exchanges and reverse logistics."
        buttonLabel="Generate Returns Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {returns.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600">
              <RefreshCcw size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <p className="mt-2 text-3xl font-black text-slate-950">{item[1]}</p>
            <p className="mt-2 text-xs text-slate-500">{item[2]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProfitabilityWorkspace() {
  const profitability = [
    ["Gross Margin", "57.8%", "After product cost"],
    ["Contribution Margin", "42.6%", "After fulfilment and marketing"],
    ["Net Commerce Profit", "₹4.82L", "Current month"],
    ["Return Cost Impact", "₹68,400", "Current month"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Commerce Profitability"
        description="Analyse gross margin, contribution and net commerce profit."
        buttonLabel="Generate Profitability Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {profitability.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Percent size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <p className="mt-2 text-3xl font-black text-slate-950">{item[1]}</p>
            <p className="mt-2 text-xs text-slate-500">{item[2]}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Monthly Margin Trend"
          values={[48, 51, 53, 55, 56, 57, 58]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
        />
        <ChartCard
          title="Profit Contribution"
          values={[92, 68, 54, 42]}
          labels={["Website", "App", "Amazon", "Store"]}
        />
      </section>
    </div>
  );
}

function ScheduledReportsWorkspace({
  onCreate,
}: {
  onCreate: () => void;
}) {
  const schedules = [
    ["Daily Commerce Summary", "Daily at 8:00 AM", "Founder Office", "PDF + Email"],
    ["Weekly Channel Performance", "Every Monday", "Commerce Team", "XLSX + Email"],
    ["Monthly Profitability Review", "1st of every month", "Finance Team", "PDF"],
    ["Returns Operations Report", "Every Friday", "Operations Team", "XLSX"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Scheduled Commerce Reports"
        description="Automate recurring report generation and delivery."
        buttonLabel="Schedule Report"
        onClick={onCreate}
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {schedules.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <CalendarDays size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Schedule" value={item[1]} />
              <InfoRow label="Owner" value={item[2]} />
              <InfoRow label="Delivery" value={item[3]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ExportsWorkspace({
  reports,
  search,
  setSearch,
}: {
  reports: SavedReport[];
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Report Exports"
        description="Search and download generated commerce reports."
        buttonLabel="Export Selected"
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search report, category, owner or status..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")}>
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600"
          >
            <Filter size={17} />
            Filters
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Report</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Period</th>
                <th className="px-5 py-4">Owner</th>
                <th className="px-5 py-4">Generated</th>
                <th className="px-5 py-4">Format</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-slate-900">{report.name}</td>
                  <td className="px-5 py-4 text-slate-600">{report.category}</td>
                  <td className="px-5 py-4 text-slate-600">{report.period}</td>
                  <td className="px-5 py-4 text-slate-600">{report.owner}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{report.generatedAt}</td>
                  <td className="px-5 py-4 font-bold text-blue-600">{report.format}</td>
                  <td className="px-5 py-4"><ReportStatusBadge status={report.status} /></td>
                  <td className="px-5 py-4">
                    <button type="button" className="flex items-center gap-2 text-xs font-bold text-blue-600">
                      <Download size={15} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SettingsWorkspace() {
  const settings = [
    ["Reporting Periods", "Configure daily, weekly, monthly and custom report periods."],
    ["Data Sources", "Control commerce modules included in reporting."],
    ["Metric Definitions", "Configure revenue, margin and conversion calculations."],
    ["Report Access", "Set role-based access to sensitive commerce reports."],
    ["Export Formats", "Configure PDF, XLSX and CSV export defaults."],
    ["Scheduled Delivery", "Configure report recipients and delivery timing."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Commerce Reports Settings"
        description="Configure periods, metrics, access, exports and scheduled delivery."
        buttonLabel="Save Configuration"
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {settings.map((setting) => (
          <article key={setting[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Settings2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">{setting[0]}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{setting[1]}</p>
                <button type="button" className="mt-4 text-xs font-bold text-blue-600">
                  Configure
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ChartCard({
  title,
  values,
  labels,
}: {
  title: string;
  values: number[];
  labels: string[];
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">{title}</h2>

      <div className="mt-8 flex h-64 items-end gap-4">
        {values.map((value, index) => (
          <div key={`${labels[index]}-${value}`} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-52 w-full items-end rounded-xl bg-slate-50 p-1">
              <div
                className="w-full rounded-lg bg-blue-600"
                style={{ height: `${Math.max(8, value)}%` }}
              />
            </div>
            <span className="text-xs text-slate-500">{labels[index]}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function CreateReportPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-slate-950/50 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close panel"
      />

      <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
              Commerce Intelligence
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Create Commerce Report
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Generate or schedule a new commerce report.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <FormField label="Report Name" placeholder="Monthly Commerce Summary" />
          <FormField label="Report Type" placeholder="Sales / Revenue / Product / Profitability" />
          <FormField label="Reporting Period" placeholder="1 Jul 2026 - 31 Jul 2026" />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Format" placeholder="PDF / XLSX / CSV" />
            <FormField label="Delivery" placeholder="Download / Email" />
          </div>
          <FormField label="Recipients" placeholder="Founder Office, Finance Team" />
          <FormField label="Schedule" placeholder="Run now / Daily / Weekly / Monthly" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Report
          </button>
        </form>
      </aside>
    </div>
  );
}

function FormField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <input
        required
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function WorkspaceHeader({
  title,
  description,
  buttonLabel,
  onClick,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  onClick?: () => void;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={onClick}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <span className="block text-[10px] uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <strong className="mt-1 block text-xs text-slate-800">{value}</strong>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <strong className="text-right text-slate-800">{value}</strong>
    </div>
  );
}

function ReportStatusBadge({
  status,
}: {
  status: ReportStatus;
}) {
  const className =
    status === "Ready"
      ? "bg-green-50 text-green-700"
      : status === "Generating"
        ? "bg-blue-50 text-blue-700"
        : status === "Scheduled"
          ? "bg-violet-50 text-violet-700"
          : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}