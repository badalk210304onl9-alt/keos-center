"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FileBarChart,
  Filter,
  History,
  IndianRupee,
  Mail,
  MessageCircle,
  Percent,
  Plus,
  Search,
  Settings2,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type AbandonedCartTab =
  | "dashboard"
  | "carts"
  | "recovery-rules"
  | "campaigns"
  | "customers"
  | "messages"
  | "discounts"
  | "recovered"
  | "history"
  | "analytics"
  | "reports"
  | "settings";

type CartStatus =
  | "Open"
  | "Contacted"
  | "Recovered"
  | "Expired"
  | "Suppressed";

type CartPriority = "High" | "Medium" | "Low";

type AbandonedCart = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: number;
  value: number;
  channel: string;
  abandonedAt: string;
  lastContact: string;
  status: CartStatus;
  priority: CartPriority;
};

type RecoveryRule = {
  id: string;
  name: string;
  trigger: string;
  audience: string;
  channel: string;
  incentive: string;
  recoveredRevenue: number;
  status: "Active" | "Paused";
};

type RecoveryCampaign = {
  id: string;
  name: string;
  channel: string;
  sent: number;
  opened: number;
  clicked: number;
  recovered: number;
  revenue: number;
  status: "Active" | "Completed" | "Scheduled";
};

const tabs: Array<{
  id: AbandonedCartTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "carts", label: "Abandoned Carts", icon: ShoppingCart },
  { id: "recovery-rules", label: "Recovery Rules", icon: Target },
  { id: "campaigns", label: "Campaigns", icon: BellRing },
  { id: "customers", label: "Customers", icon: Users },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "discounts", label: "Incentives", icon: Percent },
  { id: "recovered", label: "Recovered Orders", icon: CheckCircle2 },
  { id: "history", label: "History", icon: History },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const abandonedCarts: AbandonedCart[] = [
  {
    id: "CART-2026-1482",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    items: 3,
    value: 28499,
    channel: "KRVE Website",
    abandonedAt: "26 Jul 2026, 12:42 AM",
    lastContact: "Email sent 18 min ago",
    status: "Contacted",
    priority: "High",
  },
  {
    id: "CART-2026-1481",
    customer: "Ananya Singh",
    email: "ananya@example.com",
    phone: "+91 98111 22334",
    items: 2,
    value: 18999,
    channel: "KRVE Mobile App",
    abandonedAt: "26 Jul 2026, 12:18 AM",
    lastContact: "WhatsApp sent 12 min ago",
    status: "Contacted",
    priority: "High",
  },
  {
    id: "CART-2026-1480",
    customer: "Rohan Verma",
    email: "rohan@example.com",
    phone: "+91 98989 11882",
    items: 1,
    value: 8999,
    channel: "KRVE Website",
    abandonedAt: "25 Jul 2026, 11:56 PM",
    lastContact: "Not contacted",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "CART-2026-1479",
    customer: "Priya Mehta",
    email: "priya@example.com",
    phone: "+91 98222 77119",
    items: 4,
    value: 32999,
    channel: "KRVE Mobile App",
    abandonedAt: "25 Jul 2026, 11:25 PM",
    lastContact: "Recovered at 11:48 PM",
    status: "Recovered",
    priority: "High",
  },
  {
    id: "CART-2026-1478",
    customer: "Kabir Malhotra",
    email: "kabir@example.com",
    phone: "+91 97979 66554",
    items: 1,
    value: 3499,
    channel: "KRVE Website",
    abandonedAt: "25 Jul 2026, 10:48 PM",
    lastContact: "Email sent 34 min ago",
    status: "Open",
    priority: "Low",
  },
];

const recoveryRules: RecoveryRule[] = [
  {
    id: "RULE-001",
    name: "High-Value Cart Recovery",
    trigger: "Cart value above ₹15,000 after 30 minutes",
    audience: "All identified customers",
    channel: "Email + WhatsApp",
    incentive: "5% coupon after 2 hours",
    recoveredRevenue: 486000,
    status: "Active",
  },
  {
    id: "RULE-002",
    name: "Mobile App Reminder",
    trigger: "App cart inactive for 20 minutes",
    audience: "Logged-in app users",
    channel: "Push Notification",
    incentive: "No discount",
    recoveredRevenue: 242000,
    status: "Active",
  },
  {
    id: "RULE-003",
    name: "VIP Personal Recovery",
    trigger: "VIP cart inactive for 15 minutes",
    audience: "Gold and Platinum members",
    channel: "WhatsApp + Support Task",
    incentive: "Priority support",
    recoveredRevenue: 318000,
    status: "Active",
  },
  {
    id: "RULE-004",
    name: "Low-Value Cart Reminder",
    trigger: "Cart below ₹5,000 after 4 hours",
    audience: "All identified customers",
    channel: "Email",
    incentive: "Free shipping",
    recoveredRevenue: 86000,
    status: "Paused",
  },
];

const campaigns: RecoveryCampaign[] = [
  {
    id: "CMP-001",
    name: "30-Minute Cart Reminder",
    channel: "Email",
    sent: 842,
    opened: 486,
    clicked: 214,
    recovered: 82,
    revenue: 684000,
    status: "Active",
  },
  {
    id: "CMP-002",
    name: "WhatsApp High-Value Recovery",
    channel: "WhatsApp",
    sent: 214,
    opened: 196,
    clicked: 126,
    recovered: 48,
    revenue: 526000,
    status: "Active",
  },
  {
    id: "CMP-003",
    name: "App Push Recovery",
    channel: "Push Notification",
    sent: 628,
    opened: 342,
    clicked: 146,
    recovered: 34,
    revenue: 284000,
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

export default function AbandonedCartsManagement() {
  const [activeTab, setActiveTab] = useState<AbandonedCartTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showRulePanel, setShowRulePanel] = useState(false);

  const filteredCarts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return abandonedCarts;
    }

    return abandonedCarts.filter((cart) =>
      `${cart.id} ${cart.customer} ${cart.email} ${cart.phone} ${cart.channel} ${cart.status}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <AbandonedCartsHeader
        onCreateRule={() => setShowRulePanel(true)}
        onOpenTab={setActiveTab}
      />

      <AbandonedCartsTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "carts" && (
        <CartsWorkspace
          carts={filteredCarts}
          search={search}
          setSearch={setSearch}
        />
      )}

      {activeTab === "recovery-rules" && (
        <RecoveryRulesWorkspace onCreate={() => setShowRulePanel(true)} />
      )}

      {activeTab === "campaigns" && <CampaignsWorkspace />}
      {activeTab === "customers" && <CustomersWorkspace />}
      {activeTab === "messages" && <MessagesWorkspace />}
      {activeTab === "discounts" && <IncentivesWorkspace />}
      {activeTab === "recovered" && <RecoveredOrdersWorkspace />}
      {activeTab === "history" && <HistoryWorkspace />}
      {activeTab === "analytics" && <AnalyticsWorkspace />}
      {activeTab === "reports" && <ReportsWorkspace />}
      {activeTab === "settings" && <SettingsWorkspace />}

      {showRulePanel && (
        <CreateRecoveryRulePanel onClose={() => setShowRulePanel(false)} />
      )}
    </div>
  );
}

function AbandonedCartsHeader({
  onCreateRule,
  onOpenTab,
}: {
  onCreateRule: () => void;
  onOpenTab: (tab: AbandonedCartTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <ShoppingCart size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Conversion Recovery
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Abandoned Carts Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Monitor abandoned carts, recover high-intent customers, automate
            email, WhatsApp and push reminders, control incentives and measure
            recovered revenue.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("carts")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <ShoppingCart size={17} />
            View Carts
          </button>

          <button
            type="button"
            onClick={onCreateRule}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Create Recovery Rule
          </button>
        </div>
      </div>
    </section>
  );
}

function AbandonedCartsTabBar({
  activeTab,
  onChange,
}: {
  activeTab: AbandonedCartTab;
  onChange: (tab: AbandonedCartTab) => void;
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
  onOpenTab: (tab: AbandonedCartTab) => void;
}) {
  const openCartValue = abandonedCarts
    .filter((cart) => cart.status !== "Recovered")
    .reduce((sum, cart) => sum + cart.value, 0);

  const recoveredValue = abandonedCarts
    .filter((cart) => cart.status === "Recovered")
    .reduce((sum, cart) => sum + cart.value, 0);

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Open Carts"
          value="126"
          note="Last 7 days"
          icon={ShoppingCart}
          tone="blue"
        />
        <MetricCard
          title="Cart Value"
          value={formatCurrency(openCartValue)}
          note="Potential revenue"
          icon={IndianRupee}
          tone="green"
        />
        <MetricCard
          title="Recovered"
          value={formatCurrency(recoveredValue)}
          note="Current sample pipeline"
          icon={CheckCircle2}
          tone="violet"
        />
        <MetricCard
          title="Recovery Rate"
          value="19.7%"
          note="Automated campaigns"
          icon={TrendingUp}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                High-Intent Carts
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current carts requiring recovery action
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("carts")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View All Carts
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {abandonedCarts.map((cart) => (
              <CartListRow key={cart.id} cart={cart} />
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
            KRVE AI Recovery Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI prioritises carts by value, purchase intent, customer
            history and probability of recovery.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Best recovery window"
              detail="High-value carts recover 31% better when WhatsApp is sent within 25 minutes."
              tone="green"
            />
            <InsightCard
              title="Incentive warning"
              detail="Two active rules may apply overlapping discounts to the same customer."
              tone="orange"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Recovery Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Recovery Rules
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Active automated recovery workflows
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("recovery-rules")}
              className="text-sm font-bold text-blue-600"
            >
              Manage Rules
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {recoveryRules.map((rule) => (
              <RecoveryRuleRow key={rule.id} rule={rule} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Recovery Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily conversion-recovery workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Review Carts"
              description="Prioritise high-value and high-intent carts"
              icon={ShoppingCart}
              onClick={() => onOpenTab("carts")}
            />
            <QuickAction
              title="Create Rule"
              description="Automate reminders and recovery sequences"
              icon={Target}
              onClick={() => onOpenTab("recovery-rules")}
            />
            <QuickAction
              title="Send Message"
              description="Send email, WhatsApp or push reminder"
              icon={MessageCircle}
              onClick={() => onOpenTab("messages")}
            />
            <QuickAction
              title="Review Incentives"
              description="Control recovery coupons and free shipping"
              icon={Percent}
              onClick={() => onOpenTab("discounts")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Campaign Performance
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Messages, clicks, recoveries and revenue
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("campaigns")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Manage Campaigns
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
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

function CartListRow({
  cart,
}: {
  cart: AbandonedCart;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <ShoppingCart size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {cart.customer} · {cart.items} items
          </strong>
          <span className="text-xs text-slate-400">{cart.abandonedAt}</span>
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">
          {cart.channel} · {formatCurrency(cart.value)} · {cart.lastContact}
        </p>
      </div>

      <CartStatusBadge status={cart.status} />
    </div>
  );
}

function RecoveryRuleRow({
  rule,
}: {
  rule: RecoveryRule;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Target size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">
          {rule.name}
        </strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {rule.channel} · {rule.trigger}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-bold ${
          rule.status === "Active"
            ? "bg-green-50 text-green-700"
            : "bg-slate-100 text-slate-700"
        }`}
      >
        {rule.status}
      </span>
    </div>
  );
}

function CampaignCard({
  campaign,
}: {
  campaign: RecoveryCampaign;
}) {
  const recoveryRate =
    campaign.sent > 0 ? (campaign.recovered / campaign.sent) * 100 : 0;

  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <BellRing size={19} />
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          {campaign.status}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">
        {campaign.name}
      </h3>

      <p className="mt-1 text-xs text-slate-500">{campaign.channel}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <InfoBox label="Sent" value={String(campaign.sent)} />
        <InfoBox label="Recovered" value={String(campaign.recovered)} />
        <InfoBox label="Rate" value={`${recoveryRate.toFixed(1)}%`} />
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

function CartsWorkspace({
  carts,
  search,
  setSearch,
}: {
  carts: AbandonedCart[];
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Abandoned Cart Register"
        description="Search, prioritise and recover customer carts."
        buttonLabel="Send Recovery Message"
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search cart, customer, email, phone or channel..."
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
          <table className="w-full min-w-[1300px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Cart</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Items</th>
                <th className="px-5 py-4">Value</th>
                <th className="px-5 py-4">Channel</th>
                <th className="px-5 py-4">Abandoned</th>
                <th className="px-5 py-4">Last Contact</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {carts.map((cart) => (
                <tr key={cart.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{cart.id}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{cart.customer}</td>
                  <td className="px-5 py-4">
                    <span className="block text-slate-700">{cart.email}</span>
                    <span className="mt-1 block text-xs text-slate-500">{cart.phone}</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-900">{cart.items}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {formatCurrency(cart.value)}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{cart.channel}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{cart.abandonedAt}</td>
                  <td className="px-5 py-4 text-slate-600">{cart.lastContact}</td>
                  <td className="px-5 py-4">
                    <PriorityBadge priority={cart.priority} />
                  </td>
                  <td className="px-5 py-4">
                    <CartStatusBadge status={cart.status} />
                  </td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-xs font-bold text-blue-600">
                      Recover Cart
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

function RecoveryRulesWorkspace({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Recovery Rules"
        description="Create automated cart-recovery triggers, messages and incentives."
        buttonLabel="Create Recovery Rule"
        onClick={onCreate}
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {recoveryRules.map((rule) => (
          <article
            key={rule.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600">
                <Target size={22} />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  rule.status === "Active"
                    ? "bg-green-50 text-green-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {rule.status}
              </span>
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{rule.name}</h3>

            <div className="mt-5 space-y-3">
              <InfoBox label="Trigger" value={rule.trigger} />
              <InfoBox label="Audience" value={rule.audience} />
              <InfoBox label="Channel" value={rule.channel} />
              <InfoBox label="Incentive" value={rule.incentive} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function CampaignsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Recovery Campaigns"
        description="Monitor message performance, clicks, recovered orders and revenue."
        buttonLabel="Create Campaign"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </section>
    </div>
  );
}

function CustomersWorkspace() {
  const customers = [
    ["Aarav Sharma", "VIP", "₹28,499", "3 previous orders", "High"],
    ["Ananya Singh", "Repeat", "₹18,999", "5 previous orders", "High"],
    ["Rohan Verma", "New", "₹8,999", "No previous order", "Medium"],
    ["Priya Mehta", "VIP", "₹32,999", "8 previous orders", "Recovered"],
    ["Kabir Malhotra", "New", "₹3,499", "No previous order", "Low"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Cart Recovery Customers"
        description="Review customer value, purchase history and recovery priority."
        buttonLabel="Create Customer Segment"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {customers.map((customer) => (
          <article
            key={customer[0]}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <UserRound size={22} />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{customer[0]}</h3>
            <p className="mt-1 text-xs text-slate-500">{customer[1]}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Cart Value" value={customer[2]} />
              <InfoRow label="History" value={customer[3]} />
              <InfoRow label="Priority" value={customer[4]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function MessagesWorkspace() {
  const templates = [
    ["Email Reminder", "You left something exceptional behind", "Email", "Active"],
    ["WhatsApp Reminder", "Your KRVE cart is waiting", "WhatsApp", "Active"],
    ["Push Notification", "Complete your KRVE purchase", "Mobile App", "Active"],
    ["Final Reminder", "Last chance to recover your selection", "Email", "Active"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Recovery Messages"
        description="Manage email, WhatsApp, SMS and push-notification templates."
        buttonLabel="Create Message Template"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => (
          <article
            key={template[0]}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              {template[2] === "Email" ? <Mail size={22} /> : <MessageCircle size={22} />}
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{template[0]}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{template[1]}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Channel" value={template[2]} />
              <InfoRow label="Status" value={template[3]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function IncentivesWorkspace() {
  const incentives = [
    ["No Incentive", "Reminder only", "0%", "Healthy margin"],
    ["Recovery 5", "5% discount", "5%", "High-value carts"],
    ["Free Shipping", "Shipping fee waived", "Variable", "Carts below ₹5,000"],
    ["VIP Recovery", "Priority assistance", "0%", "Gold and Platinum customers"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Recovery Incentives"
        description="Control coupons, free shipping and margin-safe recovery incentives."
        buttonLabel="Create Incentive"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {incentives.map((incentive) => (
          <article
            key={incentive[0]}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-50 text-green-600">
              <Percent size={22} />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{incentive[0]}</h3>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Offer" value={incentive[1]} />
              <InfoRow label="Discount" value={incentive[2]} />
              <InfoRow label="Use Case" value={incentive[3]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function RecoveredOrdersWorkspace() {
  const recoveredOrders = [
    ["KRVE-10479", "Priya Mehta", "KRVE Mobile App", "₹32,999", "WhatsApp", "25 Jul 2026, 11:48 PM"],
    ["KRVE-10462", "Meera Joshi", "KRVE Website", "₹18,499", "Email", "25 Jul 2026, 09:26 PM"],
    ["KRVE-10451", "Aditya Rao", "KRVE Website", "₹12,999", "Push", "25 Jul 2026, 07:52 PM"],
    ["KRVE-10444", "Neha Kapoor", "KRVE Mobile App", "₹8,999", "WhatsApp", "25 Jul 2026, 06:38 PM"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Recovered Orders"
        description="Review orders recovered through automated and manual cart-recovery actions."
        buttonLabel="Export Recovered Orders"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Channel</th>
                <th className="px-5 py-4">Value</th>
                <th className="px-5 py-4">Recovery Source</th>
                <th className="px-5 py-4">Recovered At</th>
              </tr>
            </thead>

            <tbody>
              {recoveredOrders.map((order) => (
                <tr key={order[0]} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{order[0]}</td>
                  <td className="px-5 py-4 text-slate-700">{order[1]}</td>
                  <td className="px-5 py-4 text-slate-600">{order[2]}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{order[3]}</td>
                  <td className="px-5 py-4 text-slate-600">{order[4]}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{order[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function HistoryWorkspace() {
  const history = [
    ["26 Jul 2026, 12:42 AM", "Cart detected", "CART-2026-1482", "System"],
    ["26 Jul 2026, 12:24 AM", "WhatsApp sent", "CART-2026-1481", "Recovery Rule"],
    ["25 Jul 2026, 11:48 PM", "Cart recovered", "CART-2026-1479", "Customer"],
    ["25 Jul 2026, 10:52 PM", "Email sent", "CART-2026-1478", "Recovery Rule"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Recovery History"
        description="Review cart detection, messaging, incentive and recovery events."
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
        title="Abandoned Cart Analytics"
        description="Analyse abandonment, recovery rate, message performance and recovered revenue."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Abandonment Rate" value="31.4%" note="Current month" icon={ShoppingCart} tone="blue" />
        <MetricCard title="Recovery Rate" value="19.7%" note="Current month" icon={TrendingUp} tone="green" />
        <MetricCard title="Recovered Revenue" value="₹1.86L" note="Current month" icon={IndianRupee} tone="violet" />
        <MetricCard title="Avg Recovery Time" value="2h 18m" note="Cart to order" icon={Clock3} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Daily Abandoned Carts"
          values={[58, 72, 66, 84, 92, 86, 104]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
        <ChartCard
          title="Recovery by Channel"
          values={[82, 68, 54]}
          labels={["Email", "WhatsApp", "Push"]}
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
    ["Abandoned Cart Report", "Cart value, customer, channel and age"],
    ["Recovery Campaign Report", "Messages, clicks, recoveries and revenue"],
    ["Recovery Rule Report", "Triggers, channels, incentives and performance"],
    ["Customer Recovery Report", "Customer segment, history and conversion"],
    ["Recovered Revenue Report", "Orders, source and attributed value"],
    ["Incentive Report", "Coupons, free shipping and margin impact"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Abandoned Cart Reports"
        description="Generate and export cart, recovery, campaign and revenue reports."
        buttonLabel="Create Custom Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <article
            key={report[0]}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <FileBarChart size={22} />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{report[0]}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{report[1]}</p>

            <button
              type="button"
              className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600"
            >
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
    ["Abandonment Timing", "Set the inactivity period before a cart is marked abandoned."],
    ["Recovery Sequence", "Configure message timing, order and maximum attempts."],
    ["Channel Preferences", "Set email, WhatsApp, SMS and push-notification rules."],
    ["Incentive Limits", "Configure discount, free-shipping and margin safeguards."],
    ["Customer Suppression", "Exclude unsubscribed, sensitive or high-risk customers."],
    ["Attribution Window", "Set the period for recovered-order revenue attribution."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Abandoned Cart Settings"
        description="Configure cart detection, messages, incentives, suppression and attribution."
        buttonLabel="Save Configuration"
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {settings.map((setting) => (
          <article
            key={setting[0]}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Settings2 size={20} />
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900">{setting[0]}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{setting[1]}</p>

                <button
                  type="button"
                  className="mt-4 text-xs font-bold text-blue-600"
                >
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

function CreateRecoveryRulePanel({
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
              Conversion Recovery
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Create Recovery Rule
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create a new automated cart-recovery workflow.
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
          <FormField label="Rule Name" placeholder="High-Value Cart Recovery" />
          <FormField label="Trigger" placeholder="Cart inactive for 30 minutes" />
          <FormField label="Audience" placeholder="All Customers / VIP / App Users" />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Primary Channel" placeholder="Email / WhatsApp / Push" />
            <FormField label="Delay" placeholder="30 minutes" />
          </div>

          <FormField label="Message Template" placeholder="Select message template" />
          <FormField label="Incentive" placeholder="None / 5% / Free Shipping" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Recovery Rule
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

function CartStatusBadge({
  status,
}: {
  status: CartStatus;
}) {
  const className =
    status === "Recovered"
      ? "bg-green-50 text-green-700"
      : status === "Contacted"
        ? "bg-blue-50 text-blue-700"
        : status === "Expired"
          ? "bg-red-50 text-red-700"
          : status === "Suppressed"
            ? "bg-slate-100 text-slate-700"
            : "bg-orange-50 text-orange-700";

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: CartPriority;
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