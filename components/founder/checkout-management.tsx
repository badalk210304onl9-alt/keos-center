"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  FileBarChart,
  Filter,
  History,
  IndianRupee,
  Landmark,
  LockKeyhole,
  MapPin,
  Percent,
  Plus,
  ReceiptIndianRupee,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserRoundCheck,
  WalletCards,
  TrendingUp,
  TrendingDown,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type CheckoutTab =
  | "dashboard"
  | "checkout-sessions"
  | "payments"
  | "payment-gateways"
  | "addresses"
  | "taxes"
  | "discount-validation"
  | "fraud-controls"
  | "failed-payments"
  | "history"
  | "analytics"
  | "reports"
  | "settings";

type CheckoutStatus =
  | "Completed"
  | "Payment Pending"
  | "Failed"
  | "Abandoned"
  | "Under Review";

type PaymentStatus =
  | "Success"
  | "Pending"
  | "Failed"
  | "Refunded";

type GatewayStatus = "Active" | "Degraded" | "Inactive";

type CheckoutSession = {
  id: string;
  customer: string;
  channel: string;
  items: number;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
  status: CheckoutStatus;
};

type PaymentRecord = {
  id: string;
  checkoutId: string;
  customer: string;
  gateway: string;
  method: string;
  amount: number;
  createdAt: string;
  status: PaymentStatus;
};

type PaymentGateway = {
  id: string;
  name: string;
  methods: string;
  successRate: number;
  transactions: number;
  settlements: string;
  lastChecked: string;
  status: GatewayStatus;
};

const tabs: Array<{
  id: CheckoutTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "checkout-sessions", label: "Checkout Sessions", icon: ShoppingBag },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "payment-gateways", label: "Payment Gateways", icon: Landmark },
  { id: "addresses", label: "Address Validation", icon: MapPin },
  { id: "taxes", label: "Taxes", icon: ReceiptIndianRupee },
  { id: "discount-validation", label: "Discount Validation", icon: Percent },
  { id: "fraud-controls", label: "Fraud Controls", icon: ShieldCheck },
  { id: "failed-payments", label: "Failed Payments", icon: AlertTriangle },
  { id: "history", label: "History", icon: History },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const sessions: CheckoutSession[] = [
  {
    id: "CHK-2026-1842",
    customer: "Aarav Sharma",
    channel: "KRVE Website",
    items: 3,
    subtotal: 28499,
    discount: 1500,
    tax: 4860,
    shipping: 0,
    total: 31859,
    paymentMethod: "UPI",
    createdAt: "26 Jul 2026, 12:42 AM",
    status: "Completed",
  },
  {
    id: "CHK-2026-1841",
    customer: "Ananya Singh",
    channel: "KRVE Mobile App",
    items: 2,
    subtotal: 18999,
    discount: 1900,
    tax: 3078,
    shipping: 0,
    total: 20177,
    paymentMethod: "Credit Card",
    createdAt: "26 Jul 2026, 12:18 AM",
    status: "Payment Pending",
  },
  {
    id: "CHK-2026-1840",
    customer: "Rohan Verma",
    channel: "KRVE Website",
    items: 1,
    subtotal: 8999,
    discount: 0,
    tax: 1620,
    shipping: 99,
    total: 10718,
    paymentMethod: "UPI",
    createdAt: "25 Jul 2026, 11:56 PM",
    status: "Failed",
  },
  {
    id: "CHK-2026-1839",
    customer: "Priya Mehta",
    channel: "KRVE Mobile App",
    items: 4,
    subtotal: 32999,
    discount: 2500,
    tax: 5490,
    shipping: 0,
    total: 35989,
    paymentMethod: "Net Banking",
    createdAt: "25 Jul 2026, 11:25 PM",
    status: "Under Review",
  },
  {
    id: "CHK-2026-1838",
    customer: "Kabir Malhotra",
    channel: "KRVE Website",
    items: 1,
    subtotal: 3499,
    discount: 0,
    tax: 630,
    shipping: 99,
    total: 4228,
    paymentMethod: "Cash on Delivery",
    createdAt: "25 Jul 2026, 10:48 PM",
    status: "Abandoned",
  },
];

const payments: PaymentRecord[] = [
  {
    id: "PAY-2026-4982",
    checkoutId: "CHK-2026-1842",
    customer: "Aarav Sharma",
    gateway: "Razorpay",
    method: "UPI",
    amount: 31859,
    createdAt: "26 Jul 2026, 12:43 AM",
    status: "Success",
  },
  {
    id: "PAY-2026-4981",
    checkoutId: "CHK-2026-1841",
    customer: "Ananya Singh",
    gateway: "Razorpay",
    method: "Credit Card",
    amount: 20177,
    createdAt: "26 Jul 2026, 12:19 AM",
    status: "Pending",
  },
  {
    id: "PAY-2026-4980",
    checkoutId: "CHK-2026-1840",
    customer: "Rohan Verma",
    gateway: "Cashfree",
    method: "UPI",
    amount: 10718,
    createdAt: "25 Jul 2026, 11:57 PM",
    status: "Failed",
  },
  {
    id: "PAY-2026-4979",
    checkoutId: "CHK-2026-1837",
    customer: "Meera Joshi",
    gateway: "Razorpay",
    method: "Net Banking",
    amount: 18499,
    createdAt: "25 Jul 2026, 09:32 PM",
    status: "Refunded",
  },
];

const gateways: PaymentGateway[] = [
  {
    id: "GW-001",
    name: "Razorpay",
    methods: "UPI, Cards, Net Banking, Wallets",
    successRate: 96.8,
    transactions: 842,
    settlements: "T+1",
    lastChecked: "2 min ago",
    status: "Active",
  },
  {
    id: "GW-002",
    name: "Cashfree",
    methods: "UPI, Cards, Net Banking",
    successRate: 93.4,
    transactions: 286,
    settlements: "T+1",
    lastChecked: "4 min ago",
    status: "Degraded",
  },
  {
    id: "GW-003",
    name: "COD",
    methods: "Cash on Delivery",
    successRate: 88.6,
    transactions: 214,
    settlements: "Courier cycle",
    lastChecked: "Live",
    status: "Active",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CheckoutManagement() {
  const [activeTab, setActiveTab] = useState<CheckoutTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  const filteredSessions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sessions;

    return sessions.filter((session) =>
      `${session.id} ${session.customer} ${session.channel} ${session.paymentMethod} ${session.status}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <CheckoutHeader
        onConfigure={() => setShowConfigPanel(true)}
        onOpenTab={setActiveTab}
      />

      <CheckoutTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "checkout-sessions" && (
        <CheckoutSessionsWorkspace
          sessions={filteredSessions}
          search={search}
          setSearch={setSearch}
        />
      )}

      {activeTab === "payments" && <PaymentsWorkspace />}
      {activeTab === "payment-gateways" && <GatewaysWorkspace />}
      {activeTab === "addresses" && <AddressValidationWorkspace />}
      {activeTab === "taxes" && <TaxesWorkspace />}
      {activeTab === "discount-validation" && <DiscountValidationWorkspace />}
      {activeTab === "fraud-controls" && <FraudControlsWorkspace />}
      {activeTab === "failed-payments" && <FailedPaymentsWorkspace />}
      {activeTab === "history" && <HistoryWorkspace />}
      {activeTab === "analytics" && <AnalyticsWorkspace />}
      {activeTab === "reports" && <ReportsWorkspace />}
      {activeTab === "settings" && <SettingsWorkspace />}

      {showConfigPanel && (
        <ConfigureCheckoutPanel onClose={() => setShowConfigPanel(false)} />
      )}
    </div>
  );
}

function CheckoutHeader({
  onConfigure,
  onOpenTab,
}: {
  onConfigure: () => void;
  onOpenTab: (tab: CheckoutTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <CreditCard size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Conversion Infrastructure
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Checkout Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Configure checkout experience, payment methods, addresses, taxes,
            discount validation, fraud controls and checkout performance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("payments")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <WalletCards size={17} />
            Manage Payments
          </button>

          <button
            type="button"
            onClick={onConfigure}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Settings2 size={17} />
            Configure Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

function CheckoutTabBar({
  activeTab,
  onChange,
}: {
  activeTab: CheckoutTab;
  onChange: (tab: CheckoutTab) => void;
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
  onOpenTab: (tab: CheckoutTab) => void;
}) {
  const successfulPayments = payments.filter(
    (payment) => payment.status === "Success",
  ).length;

  const paymentSuccessRate =
    payments.length > 0
      ? (successfulPayments / payments.length) * 100
      : 0;

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Checkout Conversion"
          value="71.6%"
          note="Current month"
          icon={TrendingUp}
          tone="blue"
        />
        <MetricCard
          title="Payment Success"
          value={`${paymentSuccessRate.toFixed(1)}%`}
          note="Current sample transactions"
          icon={CheckCircle2}
          tone="green"
        />
        <MetricCard
          title="Failed Payments"
          value="23"
          note="Last 24 hours"
          icon={AlertTriangle}
          tone="violet"
        />
        <MetricCard
          title="Average Checkout"
          value="1m 42s"
          note="Completion time"
          icon={Clock3}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Live Checkout Sessions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current sessions, values and payment status
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("checkout-sessions")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View Sessions
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {sessions.map((session) => (
              <CheckoutSessionRow key={session.id} session={session} />
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
            KRVE AI Checkout Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI monitors payment failures, checkout friction, fraud risk,
            address errors and conversion loss.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Payment issue"
              detail="Cashfree UPI success is 3.4% below the approved threshold."
              tone="orange"
            />
            <InsightCard
              title="Conversion opportunity"
              detail="Reducing address fields may improve mobile checkout completion by 6.2%."
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Checkout Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Payment Gateway Health
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Success rate, volume and settlement cycle
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("payment-gateways")}
              className="text-sm font-bold text-blue-600"
            >
              Manage Gateways
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {gateways.map((gateway) => (
              <GatewayMiniCard key={gateway.id} gateway={gateway} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Checkout Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily checkout and payment workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Review Sessions"
              description="Inspect active and failed checkout sessions"
              icon={ShoppingBag}
              onClick={() => onOpenTab("checkout-sessions")}
            />
            <QuickAction
              title="Manage Payments"
              description="Review transactions and payment status"
              icon={CreditCard}
              onClick={() => onOpenTab("payments")}
            />
            <QuickAction
              title="Review Fraud"
              description="Inspect risky checkout attempts"
              icon={ShieldCheck}
              onClick={() => onOpenTab("fraud-controls")}
            />
            <QuickAction
              title="Validate Taxes"
              description="Review GST and checkout tax calculation"
              icon={ReceiptIndianRupee}
              onClick={() => onOpenTab("taxes")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Recent Payments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest payment transactions across checkout
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("payments")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Open Payments
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-4 font-semibold">Payment</th>
                <th className="pb-4 font-semibold">Checkout</th>
                <th className="pb-4 font-semibold">Customer</th>
                <th className="pb-4 font-semibold">Gateway</th>
                <th className="pb-4 font-semibold">Method</th>
                <th className="pb-4 font-semibold">Amount</th>
                <th className="pb-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-slate-100 text-sm">
                  <td className="py-4 font-bold text-blue-600">{payment.id}</td>
                  <td className="py-4 text-slate-700">{payment.checkoutId}</td>
                  <td className="py-4 text-slate-700">{payment.customer}</td>
                  <td className="py-4 text-slate-600">{payment.gateway}</td>
                  <td className="py-4 text-slate-600">{payment.method}</td>
                  <td className="py-4 font-bold text-slate-900">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="py-4">
                    <PaymentStatusBadge status={payment.status} />
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

function CheckoutSessionRow({
  session,
}: {
  session: CheckoutSession;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <ShoppingBag size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {session.customer} · {session.items} items
          </strong>
          <span className="text-xs text-slate-400">{session.createdAt}</span>
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">
          {session.channel} · {session.paymentMethod} · {formatCurrency(session.total)}
        </p>
      </div>

      <CheckoutStatusBadge status={session.status} />
    </div>
  );
}

function GatewayMiniCard({
  gateway,
}: {
  gateway: PaymentGateway;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Landmark size={19} />
        </div>

        <GatewayStatusBadge status={gateway.status} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">
        {gateway.name}
      </h3>

      <p className="mt-1 text-xs text-slate-500">{gateway.methods}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <InfoBox label="Success" value={`${gateway.successRate}%`} />
        <InfoBox label="Transactions" value={String(gateway.transactions)} />
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
        <ChevronRight
          size={14}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}

function CheckoutSessionsWorkspace({
  sessions,
  search,
  setSearch,
}: {
  sessions: CheckoutSession[];
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Checkout Session Register"
        description="Search and review active, completed, failed and abandoned checkout sessions."
        buttonLabel="Export Sessions"
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search session, customer, channel or payment method..."
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
                <th className="px-5 py-4">Session</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Channel</th>
                <th className="px-5 py-4">Items</th>
                <th className="px-5 py-4">Subtotal</th>
                <th className="px-5 py-4">Discount</th>
                <th className="px-5 py-4">Tax</th>
                <th className="px-5 py-4">Shipping</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{session.id}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{session.customer}</td>
                  <td className="px-5 py-4 text-slate-600">{session.channel}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{session.items}</td>
                  <td className="px-5 py-4 text-slate-600">{formatCurrency(session.subtotal)}</td>
                  <td className="px-5 py-4 text-slate-600">{formatCurrency(session.discount)}</td>
                  <td className="px-5 py-4 text-slate-600">{formatCurrency(session.tax)}</td>
                  <td className="px-5 py-4 text-slate-600">{formatCurrency(session.shipping)}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{formatCurrency(session.total)}</td>
                  <td className="px-5 py-4 text-slate-600">{session.paymentMethod}</td>
                  <td className="px-5 py-4">
                    <CheckoutStatusBadge status={session.status} />
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

function PaymentsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Payment Transactions"
        description="Review payment success, pending, failed and refunded transactions."
        buttonLabel="Export Payments"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Successful Payments" value="1,284" note="Current month" icon={CheckCircle2} tone="green" />
        <MetricCard title="Pending Payments" value="18" note="Awaiting confirmation" icon={Clock3} tone="blue" />
        <MetricCard title="Failed Payments" value="23" note="Last 24 hours" icon={AlertTriangle} tone="orange" />
        <MetricCard title="Payment Value" value="₹28.42L" note="Current month" icon={IndianRupee} tone="violet" />
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Checkout</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Gateway</th>
                <th className="px-5 py-4">Method</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{payment.id}</td>
                  <td className="px-5 py-4 text-slate-700">{payment.checkoutId}</td>
                  <td className="px-5 py-4 text-slate-700">{payment.customer}</td>
                  <td className="px-5 py-4 text-slate-600">{payment.gateway}</td>
                  <td className="px-5 py-4 text-slate-600">{payment.method}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{formatCurrency(payment.amount)}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{payment.createdAt}</td>
                  <td className="px-5 py-4"><PaymentStatusBadge status={payment.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function GatewaysWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Payment Gateways"
        description="Manage payment gateway connections, methods, health and settlement cycles."
        buttonLabel="Add Gateway"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {gateways.map((gateway) => (
          <article key={gateway.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Landmark size={22} />
              </div>

              <GatewayStatusBadge status={gateway.status} />
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-950">{gateway.name}</h2>
            <p className="mt-1 text-xs text-slate-500">{gateway.methods}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Success Rate" value={`${gateway.successRate}%`} />
              <InfoRow label="Transactions" value={String(gateway.transactions)} />
              <InfoRow label="Settlement" value={gateway.settlements} />
              <InfoRow label="Health Check" value={gateway.lastChecked} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function AddressValidationWorkspace() {
  const addresses = [
    ["ADR-10482", "Aarav Sharma", "Varanasi, Uttar Pradesh", "221001", "Verified"],
    ["ADR-10481", "Ananya Singh", "New Delhi", "110001", "Verified"],
    ["ADR-10480", "Rohan Verma", "Mumbai, Maharashtra", "400001", "Incomplete"],
    ["ADR-10479", "Priya Mehta", "Lucknow, Uttar Pradesh", "226001", "Under Review"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Address Validation"
        description="Validate customer addresses, PIN codes and delivery serviceability."
        buttonLabel="Validate Address"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Address</th>
                <th className="px-5 py-4">PIN Code</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {addresses.map((address) => (
                <tr key={address[0]} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{address[0]}</td>
                  <td className="px-5 py-4 text-slate-700">{address[1]}</td>
                  <td className="px-5 py-4 text-slate-600">{address[2]}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{address[3]}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      address[4] === "Verified"
                        ? "bg-green-50 text-green-700"
                        : address[4] === "Incomplete"
                          ? "bg-red-50 text-red-700"
                          : "bg-orange-50 text-orange-700"
                    }`}>
                      {address[4]}
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

function TaxesWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Checkout Taxes"
        description="Configure GST calculation, place-of-supply and tax validation."
        buttonLabel="Configure Tax Rule"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Tax Collected" value="₹4.86L" note="Current month" icon={ReceiptIndianRupee} tone="blue" />
        <MetricCard title="GST Validation" value="99.8%" note="Successful calculation" icon={CheckCircle2} tone="green" />
        <MetricCard title="Tax Exceptions" value="4" note="Require review" icon={AlertTriangle} tone="orange" />
        <MetricCard title="States Covered" value="18" note="Active delivery states" icon={MapPin} tone="violet" />
      </section>
    </div>
  );
}

function DiscountValidationWorkspace() {
  const validations = [
    ["VAL-001", "KRVE10", "Eligible", "₹1,899", "Margin protected"],
    ["VAL-002", "NOIR1500", "Eligible", "₹1,500", "Within limit"],
    ["VAL-003", "APPONLY", "Rejected", "₹0", "Wrong channel"],
    ["VAL-004", "FREESHIP", "Eligible", "₹99", "PIN serviceable"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Discount Validation"
        description="Validate coupon eligibility, stacking, usage and margin protection."
        buttonLabel="Create Validation Rule"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {validations.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Percent size={22} />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{item[1]}</h3>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Status" value={item[2]} />
              <InfoRow label="Discount" value={item[3]} />
              <InfoRow label="Validation" value={item[4]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function FraudControlsWorkspace() {
  const cases = [
    ["FRD-2026-042", "Priya Mehta", "High-value order from new device", "High", "Under Review"],
    ["FRD-2026-041", "Rohan Verma", "Repeated failed UPI attempts", "Medium", "Monitoring"],
    ["FRD-2026-040", "Kabir Malhotra", "Billing and shipping mismatch", "Medium", "Cleared"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Checkout Fraud Controls"
        description="Review risky checkout behaviour, velocity and payment anomalies."
        buttonLabel="Create Fraud Rule"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cases.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
              <ShieldCheck size={22} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-red-600">{item[0]}</p>
            <h3 className="mt-2 text-base font-black text-slate-900">{item[1]}</h3>
            <p className="mt-3 text-sm text-slate-600">{item[2]}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Risk" value={item[3]} />
              <InfoRow label="Status" value={item[4]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function FailedPaymentsWorkspace() {
  const failed = payments.filter((payment) => payment.status === "Failed");

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Failed Payments"
        description="Review failure reasons, retry eligibility and customer recovery."
        buttonLabel="Retry Eligible Payments"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Failed Today" value="23" note="All gateways" icon={AlertTriangle} tone="orange" />
        <MetricCard title="Retry Eligible" value="14" note="Customer can retry" icon={RefreshCcw} tone="blue" />
        <MetricCard title="Recovered" value="9" note="After retry" icon={CheckCircle2} tone="green" />
        <MetricCard title="Failed Value" value="₹1.42L" note="Potential revenue loss" icon={IndianRupee} tone="violet" />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          {failed.map((payment) => (
            <div key={payment.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-600">
                <AlertTriangle size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <strong className="block text-sm text-slate-900">
                  {payment.customer} · {payment.method}
                </strong>
                <p className="mt-1 text-xs text-slate-500">
                  {payment.gateway} · {formatCurrency(payment.amount)}
                </p>
              </div>

              <button type="button" className="text-xs font-bold text-blue-600">
                Review Failure
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function HistoryWorkspace() {
  const history = [
    ["26 Jul 2026, 12:43 AM", "Payment successful", "PAY-2026-4982", "Razorpay"],
    ["26 Jul 2026, 12:19 AM", "Payment pending", "PAY-2026-4981", "Razorpay"],
    ["25 Jul 2026, 11:57 PM", "Payment failed", "PAY-2026-4980", "Cashfree"],
    ["25 Jul 2026, 11:26 PM", "Fraud review created", "CHK-2026-1839", "KRVE Risk Engine"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Checkout History"
        description="Review checkout, payment, validation and fraud-control events."
        buttonLabel="Export History"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Action</th>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Source</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={`${item[0]}-${item[1]}`} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 text-xs text-slate-500">{item[0]}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{item[1]}</td>
                  <td className="px-5 py-4 text-slate-600">{item[2]}</td>
                  <td className="px-5 py-4 text-slate-600">{item[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AnalyticsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Checkout Analytics"
        description="Analyse conversion, payment success, completion time and failure causes."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Checkout Conversion" value="71.6%" note="Current month" icon={TrendingUp} tone="blue" />
        <MetricCard title="Payment Success" value="94.8%" note="Across gateways" icon={CheckCircle2} tone="green" />
        <MetricCard title="Average Checkout" value="1m 42s" note="Completion time" icon={Clock3} tone="violet" />
        <MetricCard title="Fraud Review Rate" value="1.8%" note="Of checkout attempts" icon={ShieldCheck} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Checkout Conversion Trend"
          values={[58, 62, 64, 67, 69, 71, 72]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />

        <ChartCard
          title="Payment Success by Method"
          values={[97, 95, 93, 89]}
          labels={["UPI", "Cards", "NetBank", "COD"]}
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
          <div
            key={`${labels[index]}-${value}`}
            className="flex flex-1 flex-col items-center gap-3"
          >
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
    ["Checkout Session Report", "Sessions, values, status and channel"],
    ["Payment Transaction Report", "Gateway, method, amount and status"],
    ["Payment Failure Report", "Failure reason, gateway and recovery"],
    ["Tax Validation Report", "GST calculation and exception details"],
    ["Fraud Review Report", "Risk signals, decisions and outcomes"],
    ["Checkout Analytics Report", "Conversion, timing and payment performance"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Checkout Reports"
        description="Generate and export checkout, payment, tax and fraud reports."
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
    ["Checkout Fields", "Configure customer, address and order fields."],
    ["Payment Methods", "Enable UPI, cards, net banking, wallets and COD."],
    ["Address Rules", "Configure serviceability and address validation."],
    ["Tax Calculation", "Set GST, place-of-supply and tax rounding."],
    ["Fraud Thresholds", "Configure risk scoring and manual review limits."],
    ["Checkout Notifications", "Set payment, failure and confirmation messages."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Checkout Settings"
        description="Configure fields, payments, addresses, taxes, fraud and notifications."
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

function ConfigureCheckoutPanel({
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
              Conversion Infrastructure
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Configure Checkout
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Configure checkout behaviour, payments and validation.
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
          <FormField label="Checkout Name" placeholder="KRVE Standard Checkout" />
          <FormField label="Default Payment Gateway" placeholder="Razorpay" />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Guest Checkout" placeholder="Enabled" />
            <FormField label="COD" placeholder="Enabled / Disabled" />
          </div>

          <FormField label="Address Validation" placeholder="Strict / Standard" />
          <FormField label="Tax Calculation" placeholder="Automatic GST" />
          <FormField label="Fraud Review Threshold" placeholder="Risk score 70+" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Settings2 size={17} />
            Save Checkout Configuration
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

function CheckoutStatusBadge({
  status,
}: {
  status: CheckoutStatus;
}) {
  const className =
    status === "Completed"
      ? "bg-green-50 text-green-700"
      : status === "Failed"
        ? "bg-red-50 text-red-700"
        : status === "Payment Pending"
          ? "bg-blue-50 text-blue-700"
          : status === "Under Review"
            ? "bg-violet-50 text-violet-700"
            : "bg-orange-50 text-orange-700";

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const className =
    status === "Success"
      ? "bg-green-50 text-green-700"
      : status === "Failed"
        ? "bg-red-50 text-red-700"
        : status === "Refunded"
          ? "bg-violet-50 text-violet-700"
          : "bg-orange-50 text-orange-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function GatewayStatusBadge({
  status,
}: {
  status: GatewayStatus;
}) {
  const className =
    status === "Active"
      ? "bg-green-50 text-green-700"
      : status === "Degraded"
        ? "bg-orange-50 text-orange-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}