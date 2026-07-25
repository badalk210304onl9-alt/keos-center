"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FileBarChart,
  Filter,
  History,
  IndianRupee,
  Package,
  PackageCheck,
  PackageOpen,
  PackageSearch,
  Plus,
  RefreshCcw,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ReturnTab =
  | "dashboard"
  | "requests"
  | "refunds"
  | "exchanges"
  | "inspection"
  | "reverse-logistics"
  | "received"
  | "disposition"
  | "analytics"
  | "reports"
  | "settings";

type ReturnStatus =
  | "Requested"
  | "Approved"
  | "Pickup Scheduled"
  | "In Transit"
  | "Received"
  | "Inspected"
  | "Refunded"
  | "Rejected";

type RefundStatus =
  | "Pending Approval"
  | "Approved"
  | "Processing"
  | "Completed"
  | "Failed";

type Priority = "High" | "Medium" | "Low";

type ReturnRequest = {
  id: string;
  orderId: string;
  customer: string;
  product: string;
  reason: string;
  amount: number;
  requestedAt: string;
  pickupCity: string;
  courier: string;
  status: ReturnStatus;
  priority: Priority;
};

type RefundRequest = {
  id: string;
  returnId: string;
  customer: string;
  mode: "Original Payment" | "Bank Transfer" | "Store Credit";
  amount: number;
  requestedAt: string;
  approvedBy: string;
  status: RefundStatus;
};

type ExchangeRequest = {
  id: string;
  returnId: string;
  customer: string;
  originalProduct: string;
  replacementProduct: string;
  requestedAt: string;
  status: "Pending" | "Approved" | "Packed" | "Shipped" | "Completed";
};

const tabs: Array<{
  id: ReturnTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "requests", label: "Return Requests", icon: RotateCcw },
  { id: "refunds", label: "Refunds", icon: IndianRupee },
  { id: "exchanges", label: "Exchanges", icon: RefreshCcw },
  { id: "inspection", label: "Inspection", icon: PackageSearch },
  { id: "reverse-logistics", label: "Reverse Logistics", icon: Truck },
  { id: "received", label: "Received Returns", icon: PackageOpen },
  { id: "disposition", label: "Disposition", icon: PackageCheck },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const returnRequests: ReturnRequest[] = [
  {
    id: "RET-2026-0842",
    orderId: "KRVE-10482",
    customer: "Aarav Sharma",
    product: "KRVE Noir Blazer",
    reason: "Size not suitable",
    amount: 18999,
    requestedAt: "26 Jul 2026, 12:42 AM",
    pickupCity: "Varanasi",
    courier: "Delhivery Reverse",
    status: "Pickup Scheduled",
    priority: "High",
  },
  {
    id: "RET-2026-0841",
    orderId: "KRVE-10476",
    customer: "Ananya Singh",
    product: "Signature Cotton Shirt",
    reason: "Colour mismatch",
    amount: 4499,
    requestedAt: "26 Jul 2026, 12:08 AM",
    pickupCity: "New Delhi",
    courier: "Blue Dart Reverse",
    status: "In Transit",
    priority: "Medium",
  },
  {
    id: "RET-2026-0840",
    orderId: "KRVE-10468",
    customer: "Rohan Verma",
    product: "Obsidian Oxford Shoes",
    reason: "Damaged packaging",
    amount: 8999,
    requestedAt: "25 Jul 2026, 11:45 PM",
    pickupCity: "Mumbai",
    courier: "Ecom Express Reverse",
    status: "Received",
    priority: "High",
  },
  {
    id: "RET-2026-0839",
    orderId: "KRVE-10461",
    customer: "Priya Mehta",
    product: "Heritage Leather Belt",
    reason: "Incorrect item",
    amount: 2999,
    requestedAt: "25 Jul 2026, 10:55 PM",
    pickupCity: "Lucknow",
    courier: "Xpressbees Reverse",
    status: "Inspected",
    priority: "High",
  },
  {
    id: "RET-2026-0838",
    orderId: "KRVE-10454",
    customer: "Kabir Malhotra",
    product: "Executive Polo Shirt",
    reason: "Changed mind",
    amount: 3499,
    requestedAt: "25 Jul 2026, 09:40 PM",
    pickupCity: "Jaipur",
    courier: "Delhivery Reverse",
    status: "Requested",
    priority: "Low",
  },
];

const refundRequests: RefundRequest[] = [
  {
    id: "RFD-2026-0292",
    returnId: "RET-2026-0839",
    customer: "Priya Mehta",
    mode: "Original Payment",
    amount: 2999,
    requestedAt: "25 Jul 2026, 11:10 PM",
    approvedBy: "Founder Approval Pending",
    status: "Pending Approval",
  },
  {
    id: "RFD-2026-0291",
    returnId: "RET-2026-0837",
    customer: "Aditya Rao",
    mode: "Store Credit",
    amount: 7999,
    requestedAt: "25 Jul 2026, 08:55 PM",
    approvedBy: "Badal Kumar",
    status: "Approved",
  },
  {
    id: "RFD-2026-0290",
    returnId: "RET-2026-0834",
    customer: "Neha Kapoor",
    mode: "Bank Transfer",
    amount: 12999,
    requestedAt: "25 Jul 2026, 07:20 PM",
    approvedBy: "Badal Kumar",
    status: "Processing",
  },
  {
    id: "RFD-2026-0289",
    returnId: "RET-2026-0828",
    customer: "Vikram Singh",
    mode: "Original Payment",
    amount: 4499,
    requestedAt: "25 Jul 2026, 05:05 PM",
    approvedBy: "Badal Kumar",
    status: "Completed",
  },
];

const exchangeRequests: ExchangeRequest[] = [
  {
    id: "EXC-2026-0182",
    returnId: "RET-2026-0842",
    customer: "Aarav Sharma",
    originalProduct: "KRVE Noir Blazer / M",
    replacementProduct: "KRVE Noir Blazer / L",
    requestedAt: "26 Jul 2026, 12:45 AM",
    status: "Approved",
  },
  {
    id: "EXC-2026-0181",
    returnId: "RET-2026-0836",
    customer: "Meera Joshi",
    originalProduct: "Icon Sneakers / Size 8",
    replacementProduct: "Icon Sneakers / Size 9",
    requestedAt: "25 Jul 2026, 08:15 PM",
    status: "Packed",
  },
  {
    id: "EXC-2026-0180",
    returnId: "RET-2026-0831",
    customer: "Arjun Mehta",
    originalProduct: "Tailored Trousers / 32",
    replacementProduct: "Tailored Trousers / 34",
    requestedAt: "25 Jul 2026, 06:30 PM",
    status: "Shipped",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ReturnsRefundsManagement() {
  const [activeTab, setActiveTab] = useState<ReturnTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const filteredReturns = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return returnRequests;
    }

    return returnRequests.filter((item) =>
      `${item.id} ${item.orderId} ${item.customer} ${item.product} ${item.reason} ${item.pickupCity}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <ReturnsHeader
        onCreate={() => setShowCreatePanel(true)}
        onOpenTab={setActiveTab}
      />

      <ReturnsTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "requests" && (
        <ReturnRequestsWorkspace
          requests={filteredReturns}
          search={search}
          setSearch={setSearch}
          onCreate={() => setShowCreatePanel(true)}
        />
      )}

      {activeTab === "refunds" && <RefundsWorkspace />}

      {activeTab === "exchanges" && <ExchangesWorkspace />}

      {activeTab === "inspection" && <InspectionWorkspace />}

      {activeTab === "reverse-logistics" && <ReverseLogisticsWorkspace />}

      {activeTab === "received" && <ReceivedWorkspace />}

      {activeTab === "disposition" && <DispositionWorkspace />}

      {activeTab === "analytics" && <AnalyticsWorkspace />}

      {activeTab === "reports" && <ReportsWorkspace />}

      {activeTab === "settings" && <SettingsWorkspace />}

      {showCreatePanel && (
        <CreateReturnPanel onClose={() => setShowCreatePanel(false)} />
      )}
    </div>
  );
}

function ReturnsHeader({
  onCreate,
  onOpenTab,
}: {
  onCreate: () => void;
  onOpenTab: (tab: ReturnTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <RotateCcw size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Reverse Commerce
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Returns & Refunds Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Manage return requests, exchanges, inspections, reverse pickups,
            refunds, received items, disposition and return analytics.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("refunds")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <IndianRupee size={17} />
            Review Refunds
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Create Return
          </button>
        </div>
      </div>
    </section>
  );
}

function ReturnsTabBar({
  activeTab,
  onChange,
}: {
  activeTab: ReturnTab;
  onChange: (tab: ReturnTab) => void;
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
  onOpenTab: (tab: ReturnTab) => void;
}) {
  const pendingRefundValue = refundRequests
    .filter((item) => item.status !== "Completed")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Open Returns"
          value="14"
          note="Awaiting action"
          icon={RotateCcw}
          tone="blue"
        />
        <MetricCard
          title="Refund Pending"
          value={formatCurrency(pendingRefundValue)}
          note="Across active requests"
          icon={IndianRupee}
          tone="green"
        />
        <MetricCard
          title="Exchanges"
          value="8"
          note="Currently in progress"
          icon={RefreshCcw}
          tone="violet"
        />
        <MetricCard
          title="Return Rate"
          value="3.2%"
          note="Current month"
          icon={Activity}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Active Return Pipeline
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current return requests and reverse logistics status
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("requests")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View Return Requests
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {returnRequests.slice(0, 5).map((request) => (
              <ReturnListRow key={request.id} request={request} />
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
            KRVE AI Return Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI monitors return reasons, fraud patterns, refund exposure,
            reverse logistics and product quality signals.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Product quality signal"
              detail="Two products show a higher-than-normal return rate for sizing."
              tone="orange"
            />
            <InsightCard
              title="Refund optimisation"
              detail="Store-credit offers could retain ₹28,600 in customer value this week."
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Return Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Refund Approval Queue
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Refunds requiring action or processing
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("refunds")}
              className="text-sm font-bold text-blue-600"
            >
              Open Refunds
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {refundRequests.map((refund) => (
              <RefundListRow key={refund.id} refund={refund} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Return Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily reverse-commerce workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Review Returns"
              description="Review and approve customer return requests"
              icon={ClipboardCheck}
              onClick={() => onOpenTab("requests")}
            />
            <QuickAction
              title="Approve Refund"
              description="Authorise pending refund requests"
              icon={IndianRupee}
              onClick={() => onOpenTab("refunds")}
            />
            <QuickAction
              title="Inspect Item"
              description="Record condition and inspection outcome"
              icon={PackageSearch}
              onClick={() => onOpenTab("inspection")}
            />
            <QuickAction
              title="Create Exchange"
              description="Approve and dispatch replacement products"
              icon={RefreshCcw}
              onClick={() => onOpenTab("exchanges")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Exchange Pipeline
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Replacement item preparation and delivery
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("exchanges")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Manage Exchanges
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-4 font-semibold">Exchange</th>
                <th className="pb-4 font-semibold">Customer</th>
                <th className="pb-4 font-semibold">Original</th>
                <th className="pb-4 font-semibold">Replacement</th>
                <th className="pb-4 font-semibold">Requested</th>
                <th className="pb-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {exchangeRequests.map((exchange) => (
                <tr key={exchange.id} className="border-b border-slate-100 text-sm">
                  <td className="py-4 font-bold text-blue-600">{exchange.id}</td>
                  <td className="py-4 text-slate-700">{exchange.customer}</td>
                  <td className="py-4 text-slate-600">{exchange.originalProduct}</td>
                  <td className="py-4 text-slate-600">{exchange.replacementProduct}</td>
                  <td className="py-4 text-xs text-slate-500">{exchange.requestedAt}</td>
                  <td className="py-4">
                    <ExchangeStatusBadge status={exchange.status} />
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

function ReturnListRow({
  request,
}: {
  request: ReturnRequest;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <RotateCcw size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {request.orderId} · {request.customer}
          </strong>
          <span className="text-xs text-slate-400">{request.requestedAt}</span>
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">
          {request.product} · {request.reason} · {formatCurrency(request.amount)}
        </p>
      </div>

      <ReturnStatusBadge status={request.status} />
    </div>
  );
}

function RefundListRow({
  refund,
}: {
  refund: RefundRequest;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-50 text-green-600">
        <IndianRupee size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">
          {refund.id} · {refund.customer}
        </strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {refund.mode} · {formatCurrency(refund.amount)}
        </p>
      </div>

      <RefundStatusBadge status={refund.status} />
    </div>
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
        <ChevronRight
          size={14}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}

function ReturnRequestsWorkspace({
  requests,
  search,
  setSearch,
  onCreate,
}: {
  requests: ReturnRequest[];
  search: string;
  setSearch: (value: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Return Request Register"
        description="Review, approve, reject and monitor customer return requests."
        buttonLabel="Create Return"
        onClick={onCreate}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search return, order, customer or product..."
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

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600"
          >
            <Download size={17} />
            Export
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1350px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Return</th>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Reason</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Pickup</th>
                <th className="px-5 py-4">Courier</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{request.id}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{request.orderId}</td>
                  <td className="px-5 py-4 text-slate-700">{request.customer}</td>
                  <td className="px-5 py-4 text-slate-600">{request.product}</td>
                  <td className="px-5 py-4 text-slate-600">{request.reason}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {formatCurrency(request.amount)}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{request.pickupCity}</td>
                  <td className="px-5 py-4 text-slate-600">{request.courier}</td>
                  <td className="px-5 py-4">
                    <PriorityBadge priority={request.priority} />
                  </td>
                  <td className="px-5 py-4">
                    <ReturnStatusBadge status={request.status} />
                  </td>
                  <td className="px-5 py-4">
                    <button type="button" className="flex items-center gap-2 text-xs font-bold text-blue-600">
                      <Eye size={15} />
                      Review
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

function RefundsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Refund Management"
        description="Approve, process, monitor and reconcile customer refunds."
        buttonLabel="Create Refund"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Pending Approval" value="6" note="Founder or finance action" icon={Clock3} tone="orange" />
        <MetricCard title="Processing" value="4" note="Payment gateway or bank" icon={Activity} tone="blue" />
        <MetricCard title="Completed" value="28" note="Current month" icon={CheckCircle2} tone="green" />
        <MetricCard title="Refund Value" value="₹1.84L" note="Current month" icon={IndianRupee} tone="violet" />
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Refund</th>
                <th className="px-5 py-4">Return</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Mode</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Approved By</th>
                <th className="px-5 py-4">Requested</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {refundRequests.map((refund) => (
                <tr key={refund.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{refund.id}</td>
                  <td className="px-5 py-4 text-slate-700">{refund.returnId}</td>
                  <td className="px-5 py-4 text-slate-700">{refund.customer}</td>
                  <td className="px-5 py-4 text-slate-600">{refund.mode}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{formatCurrency(refund.amount)}</td>
                  <td className="px-5 py-4 text-slate-600">{refund.approvedBy}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{refund.requestedAt}</td>
                  <td className="px-5 py-4"><RefundStatusBadge status={refund.status} /></td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-xs font-bold text-blue-600">
                      Open Refund
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

function ExchangesWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Exchange Management"
        description="Approve, prepare, ship and complete product exchanges."
        buttonLabel="Create Exchange"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {exchangeRequests.map((exchange) => (
          <article key={exchange.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <RefreshCcw size={22} />
              </div>
              <ExchangeStatusBadge status={exchange.status} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
              {exchange.id}
            </p>
            <h3 className="mt-2 text-lg font-black text-slate-950">{exchange.customer}</h3>
            <div className="mt-5 space-y-4">
              <InfoBox label="Original Product" value={exchange.originalProduct} />
              <InfoBox label="Replacement Product" value={exchange.replacementProduct} />
            </div>
            <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">
              Open Exchange
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function InspectionWorkspace() {
  const inspections = [
    ["INS-2026-052", "RET-2026-0840", "Obsidian Oxford Shoes", "Minor Packaging Damage", "Restock"],
    ["INS-2026-051", "RET-2026-0839", "Heritage Leather Belt", "Incorrect Item Confirmed", "Restock"],
    ["INS-2026-050", "RET-2026-0835", "Signature Cotton Shirt", "Used / Wash Marks", "Reject"],
    ["INS-2026-049", "RET-2026-0832", "Icon Sneakers", "Manufacturing Defect", "Vendor Return"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Return Inspection"
        description="Inspect returned items and decide restock, repair, reject or vendor return."
        buttonLabel="Start Inspection"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {inspections.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <PackageSearch size={22} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">{item[0]}</p>
            <h3 className="mt-2 text-base font-black text-slate-900">{item[2]}</h3>
            <p className="mt-3 text-sm text-slate-600">{item[3]}</p>
            <span className="mt-4 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
              {item[4]}
            </span>
            <button type="button" className="mt-6 block text-xs font-bold text-blue-600">
              Open Inspection
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ReverseLogisticsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Reverse Logistics"
        description="Manage return pickups, reverse tracking, courier handover and warehouse receipt."
        buttonLabel="Schedule Pickup"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Pickup Scheduled" value="12" note="Today" icon={Truck} tone="blue" />
        <MetricCard title="In Reverse Transit" value="9" note="Live shipments" icon={RotateCcw} tone="violet" />
        <MetricCard title="Delayed Pickups" value="3" note="Require action" icon={AlertTriangle} tone="orange" />
        <MetricCard title="Pickup Success" value="94.8%" note="Current month" icon={CheckCircle2} tone="green" />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Reverse Shipment Queue</h2>
        <div className="mt-6 space-y-3">
          {returnRequests.slice(0, 5).map((request) => (
            <ReturnListRow key={request.id} request={request} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ReceivedWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Received Returns"
        description="Record warehouse receipt, verify quantity and assign items for inspection."
        buttonLabel="Receive Return"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {returnRequests
          .filter((item) => item.status === "Received" || item.status === "Inspected")
          .map((request) => (
            <article key={request.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-50 text-green-600">
                <PackageOpen size={22} />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-green-600">
                {request.id}
              </p>
              <h3 className="mt-2 text-base font-black text-slate-900">{request.product}</h3>
              <p className="mt-2 text-sm text-slate-500">{request.customer}</p>
              <div className="mt-5">
                <ReturnStatusBadge status={request.status} />
              </div>
            </article>
          ))}
      </section>
    </div>
  );
}

function DispositionWorkspace() {
  const cards = [
    ["Restock", "18", "Items returned to sellable inventory", "green"],
    ["Repair", "4", "Items awaiting repair or refurbishment", "blue"],
    ["Vendor Return", "3", "Defective items to be returned to supplier", "orange"],
    ["Reject / Scrap", "2", "Items not suitable for resale", "red"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Return Disposition"
        description="Control restock, repair, vendor return and rejected-item decisions."
        buttonLabel="Create Disposition"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <PackageCheck size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{card[0]}</h3>
            <p className="mt-2 text-3xl font-black text-slate-950">{card[1]}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{card[2]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function AnalyticsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Returns Analytics"
        description="Analyse return rate, reasons, refund value, product quality and customer behaviour."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Return Rate" value="3.2%" note="Current month" icon={Activity} tone="blue" />
        <MetricCard title="Refund Value" value="₹1.84L" note="Current month" icon={IndianRupee} tone="green" />
        <MetricCard title="Exchange Rate" value="28%" note="Of approved returns" icon={RefreshCcw} tone="violet" />
        <MetricCard title="Avg Resolution" value="2.4 days" note="Request to closure" icon={Clock3} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Weekly Return Volume"
          values={[18, 24, 16, 29, 21, 32, 26]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
        <ChartCard
          title="Top Return Reasons"
          values={[82, 68, 54, 42, 31]}
          labels={["Size", "Damage", "Colour", "Wrong", "Other"]}
        />
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

function ReportsWorkspace() {
  const reports = [
    ["Return Request Report", "Requests, reasons, products and outcomes"],
    ["Refund Report", "Approvals, processing, failures and completion"],
    ["Exchange Report", "Replacement items, status and delivery"],
    ["Inspection Report", "Condition, defects and disposition"],
    ["Reverse Logistics Report", "Pickup, tracking, delays and costs"],
    ["Return Analytics Report", "Rates, trends, customer and product insights"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Returns & Refunds Reports"
        description="Generate and export return, refund, exchange and reverse-logistics reports."
        buttonLabel="Create Custom Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <article key={report[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <FileBarChart size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{report[0]}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{report[1]}</p>
            <button type="button" className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
              Generate Report
              <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function SettingsWorkspace() {
  const settings = [
    ["Return Window", "Configure eligible return days by category and product."],
    ["Return Reasons", "Manage customer-visible and internal return reasons."],
    ["Approval Rules", "Set automatic, manager and founder approval thresholds."],
    ["Refund Methods", "Configure original payment, bank transfer and store credit."],
    ["Inspection Standards", "Define condition checks and disposition rules."],
    ["Reverse Logistics", "Configure pickup couriers, SLAs and escalation rules."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Returns & Refunds Settings"
        description="Configure eligibility, approvals, refunds, inspections and reverse-logistics rules."
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

function CreateReturnPanel({
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
              Reverse Commerce
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Create Return Request
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Create a return request for an eligible customer order.
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
          <FormField label="Order ID" placeholder="KRVE-10483" />
          <FormField label="Customer Name" placeholder="Customer name" />
          <FormField label="Product" placeholder="Select returned product" />
          <FormField label="Return Reason" placeholder="Select or enter reason" />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Refund Amount" placeholder="₹18,999" />
            <FormField label="Pickup City" placeholder="City" />
          </div>
          <FormField label="Resolution" placeholder="Refund / Exchange / Store Credit" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Return
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
      <span className="block text-[10px] uppercase tracking-wider text-slate-400">{label}</span>
      <strong className="mt-1 block text-xs text-slate-800">{value}</strong>
    </div>
  );
}

function ReturnStatusBadge({
  status,
}: {
  status: ReturnStatus;
}) {
  const className =
    status === "Refunded"
      ? "bg-green-50 text-green-700"
      : status === "Rejected"
        ? "bg-red-50 text-red-700"
        : status === "Received" || status === "Inspected"
          ? "bg-violet-50 text-violet-700"
          : status === "In Transit" || status === "Pickup Scheduled"
            ? "bg-blue-50 text-blue-700"
            : "bg-orange-50 text-orange-700";

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function RefundStatusBadge({
  status,
}: {
  status: RefundStatus;
}) {
  const className =
    status === "Completed"
      ? "bg-green-50 text-green-700"
      : status === "Failed"
        ? "bg-red-50 text-red-700"
        : status === "Approved" || status === "Processing"
          ? "bg-blue-50 text-blue-700"
          : "bg-orange-50 text-orange-700";

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function ExchangeStatusBadge({
  status,
}: {
  status: ExchangeRequest["status"];
}) {
  const className =
    status === "Completed"
      ? "bg-green-50 text-green-700"
      : status === "Shipped"
        ? "bg-violet-50 text-violet-700"
        : status === "Approved" || status === "Packed"
          ? "bg-blue-50 text-blue-700"
          : "bg-orange-50 text-orange-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: Priority;
}) {
  const className =
    priority === "High"
      ? "bg-red-50 text-red-700"
      : priority === "Medium"
        ? "bg-orange-50 text-orange-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {priority}
    </span>
  );
}