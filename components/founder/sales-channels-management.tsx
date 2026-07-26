"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Download,
  FileBarChart,
  Filter,
  Globe2,
  History,
  IndianRupee,
  Link2,
  Layers3,
  Package,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Tags,
  TrendingUp,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ChannelTab =
  | "dashboard"
  | "channels"
  | "catalogue-sync"
  | "inventory-sync"
  | "orders"
  | "pricing"
  | "settlements"
  | "integrations"
  | "sync-history"
  | "analytics"
  | "reports"
  | "settings";

type ChannelStatus = "Connected" | "Syncing" | "Issue" | "Disconnected";

type SalesChannel = {
  id: string;
  name: string;
  type: string;
  icon: IconType;
  status: ChannelStatus;
  products: number;
  orders: number;
  revenue: number;
  inventorySync: string;
  lastSync: string;
  issue?: string;
};

type SyncJob = {
  id: string;
  channel: string;
  type: string;
  records: number;
  startedAt: string;
  completedAt: string;
  status: "Completed" | "Running" | "Failed";
};

type ChannelOrder = {
  id: string;
  channel: string;
  customer: string;
  amount: number;
  payment: string;
  fulfilment: string;
  createdAt: string;
};

const tabs: Array<{
  id: ChannelTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "channels", label: "Channels", icon: Link2 },
  { id: "catalogue-sync", label: "Catalogue Sync", icon: Package },
  { id: "inventory-sync", label: "Inventory Sync", icon: RefreshCcw },
  { id: "orders", label: "Channel Orders", icon: ShoppingBag },
  { id: "pricing", label: "Channel Pricing", icon: Tags },
  { id: "settlements", label: "Settlements", icon: IndianRupee },
  { id: "integrations", label: "Integrations", icon: Wifi },
  { id: "sync-history", label: "Sync History", icon: History },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const channels: SalesChannel[] = [
  {
    id: "CH-001",
    name: "KRVE Website",
    type: "Direct Commerce",
    icon: Globe2,
    status: "Connected",
    products: 148,
    orders: 842,
    revenue: 1248600,
    inventorySync: "Real-time",
    lastSync: "2 min ago",
  },
  {
    id: "CH-002",
    name: "KRVE Mobile App",
    type: "Mobile Commerce",
    icon: Smartphone,
    status: "Connected",
    products: 142,
    orders: 486,
    revenue: 684200,
    inventorySync: "Real-time",
    lastSync: "1 min ago",
  },
  {
    id: "CH-003",
    name: "Amazon India",
    type: "Marketplace",
    icon: Store,
    status: "Syncing",
    products: 96,
    orders: 128,
    revenue: 342600,
    inventorySync: "Every 10 min",
    lastSync: "Running now",
  },
  {
    id: "CH-004",
    name: "Flipkart",
    type: "Marketplace",
    icon: Store,
    status: "Issue",
    products: 84,
    orders: 86,
    revenue: 216400,
    inventorySync: "Every 15 min",
    lastSync: "24 min ago",
    issue: "2 inventory records failed to sync",
  },
  {
    id: "CH-005",
    name: "Varanasi Flagship Store",
    type: "Offline Retail",
    icon: Building2,
    status: "Connected",
    products: 112,
    orders: 214,
    revenue: 526800,
    inventorySync: "Every 5 min",
    lastSync: "4 min ago",
  },
];

const syncJobs: SyncJob[] = [
  {
    id: "SYNC-2026-1842",
    channel: "Amazon India",
    type: "Catalogue",
    records: 96,
    startedAt: "26 Jul 2026, 02:26 AM",
    completedAt: "Running",
    status: "Running",
  },
  {
    id: "SYNC-2026-1841",
    channel: "KRVE Website",
    type: "Inventory",
    records: 148,
    startedAt: "26 Jul 2026, 02:24 AM",
    completedAt: "26 Jul 2026, 02:24 AM",
    status: "Completed",
  },
  {
    id: "SYNC-2026-1840",
    channel: "Flipkart",
    type: "Inventory",
    records: 84,
    startedAt: "26 Jul 2026, 02:06 AM",
    completedAt: "26 Jul 2026, 02:07 AM",
    status: "Failed",
  },
  {
    id: "SYNC-2026-1839",
    channel: "KRVE Mobile App",
    type: "Pricing",
    records: 142,
    startedAt: "26 Jul 2026, 02:00 AM",
    completedAt: "26 Jul 2026, 02:01 AM",
    status: "Completed",
  },
];

const channelOrders: ChannelOrder[] = [
  {
    id: "KRVE-10482",
    channel: "KRVE Website",
    customer: "Aarav Sharma",
    amount: 18999,
    payment: "Paid",
    fulfilment: "Processing",
    createdAt: "26 Jul 2026, 02:21 AM",
  },
  {
    id: "APP-08642",
    channel: "KRVE Mobile App",
    customer: "Ananya Singh",
    amount: 8499,
    payment: "Paid",
    fulfilment: "Ready to Ship",
    createdAt: "26 Jul 2026, 02:12 AM",
  },
  {
    id: "AMZ-684211",
    channel: "Amazon India",
    customer: "Rohan Verma",
    amount: 12999,
    payment: "Marketplace",
    fulfilment: "Pending Acceptance",
    createdAt: "26 Jul 2026, 01:58 AM",
  },
  {
    id: "FLP-482192",
    channel: "Flipkart",
    customer: "Priya Mehta",
    amount: 6799,
    payment: "Marketplace",
    fulfilment: "Processing",
    createdAt: "26 Jul 2026, 01:46 AM",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function SalesChannelsManagement() {
  const [activeTab, setActiveTab] = useState<ChannelTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showConnectPanel, setShowConnectPanel] = useState(false);

  const filteredChannels = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return channels;
    }

    return channels.filter((channel) =>
      `${channel.name} ${channel.type} ${channel.status}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <SalesChannelsHeader
        onConnect={() => setShowConnectPanel(true)}
        onOpenTab={setActiveTab}
      />

      <SalesChannelsTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "channels" && (
        <ChannelsWorkspace
          channels={filteredChannels}
          search={search}
          setSearch={setSearch}
          onConnect={() => setShowConnectPanel(true)}
        />
      )}

      {activeTab === "catalogue-sync" && <CatalogueSyncWorkspace />}
      {activeTab === "inventory-sync" && <InventorySyncWorkspace />}
      {activeTab === "orders" && <OrdersWorkspace />}
      {activeTab === "pricing" && <ChannelPricingWorkspace />}
      {activeTab === "settlements" && <SettlementsWorkspace />}
      {activeTab === "integrations" && <IntegrationsWorkspace />}
      {activeTab === "sync-history" && <SyncHistoryWorkspace />}
      {activeTab === "analytics" && <AnalyticsWorkspace />}
      {activeTab === "reports" && <ReportsWorkspace />}
      {activeTab === "settings" && <SettingsWorkspace />}

      {showConnectPanel && (
        <ConnectChannelPanel onClose={() => setShowConnectPanel(false)} />
      )}
    </div>
  );
}

function SalesChannelsHeader({
  onConnect,
  onOpenTab,
}: {
  onConnect: () => void;
  onOpenTab: (tab: ChannelTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <Link2 size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Omnichannel Commerce
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Sales Channels Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Connect and manage the KRVE website, mobile app, marketplaces and
            offline stores with catalogue, pricing, inventory, orders and
            settlement synchronisation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("catalogue-sync")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <RefreshCcw size={17} />
            Sync Catalogue
          </button>

          <button
            type="button"
            onClick={onConnect}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Connect Channel
          </button>
        </div>
      </div>
    </section>
  );
}

function SalesChannelsTabBar({
  activeTab,
  onChange,
}: {
  activeTab: ChannelTab;
  onChange: (tab: ChannelTab) => void;
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
  onOpenTab: (tab: ChannelTab) => void;
}) {
  const totalRevenue = channels.reduce((sum, channel) => sum + channel.revenue, 0);
  const totalOrders = channels.reduce((sum, channel) => sum + channel.orders, 0);
  const issueCount = channels.filter((channel) => channel.status === "Issue").length;

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Connected Channels"
          value={String(channels.filter((channel) => channel.status !== "Disconnected").length)}
          note="Website, app, marketplaces and store"
          icon={Link2}
          tone="blue"
        />
        <MetricCard
          title="Channel Revenue"
          value={formatCurrency(totalRevenue)}
          note="Current month"
          icon={IndianRupee}
          tone="green"
        />
        <MetricCard
          title="Channel Orders"
          value={String(totalOrders)}
          note="Current month"
          icon={ShoppingBag}
          tone="violet"
        />
        <MetricCard
          title="Sync Issues"
          value={String(issueCount)}
          note="Require review"
          icon={AlertTriangle}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Connected Channel Network
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Sales, order and synchronisation status
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("channels")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Manage Channels
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {channels.map((channel) => (
              <ChannelSummaryCard key={channel.id} channel={channel} />
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
            KRVE AI Channel Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI monitors channel profitability, stock allocation, catalogue
            consistency, marketplace performance and synchronisation risk.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Sync issue"
              detail="Flipkart has two failed inventory records requiring correction."
              tone="orange"
            />
            <InsightCard
              title="Growth opportunity"
              detail="Mobile app conversion is outperforming website conversion by 18%."
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Channel Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Recent Sync Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Catalogue, inventory and pricing jobs
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("sync-history")}
              className="text-sm font-bold text-blue-600"
            >
              View History
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {syncJobs.map((job) => (
              <SyncListRow key={job.id} job={job} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Channel Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily omnichannel workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Connect Channel"
              description="Add marketplace, store or digital channel"
              icon={Link2}
              onClick={() => onOpenTab("channels")}
            />
            <QuickAction
              title="Sync Catalogue"
              description="Synchronise products and categories"
              icon={Package}
              onClick={() => onOpenTab("catalogue-sync")}
            />
            <QuickAction
              title="Sync Inventory"
              description="Update channel stock availability"
              icon={RefreshCcw}
              onClick={() => onOpenTab("inventory-sync")}
            />
            <QuickAction
              title="Review Orders"
              description="Manage incoming channel orders"
              icon={ShoppingBag}
              onClick={() => onOpenTab("orders")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Recent Channel Orders
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest orders received from connected channels
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("orders")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Open Channel Orders
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-4 font-semibold">Order</th>
                <th className="pb-4 font-semibold">Channel</th>
                <th className="pb-4 font-semibold">Customer</th>
                <th className="pb-4 font-semibold">Amount</th>
                <th className="pb-4 font-semibold">Payment</th>
                <th className="pb-4 font-semibold">Fulfilment</th>
                <th className="pb-4 font-semibold">Created</th>
              </tr>
            </thead>

            <tbody>
              {channelOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 text-sm">
                  <td className="py-4 font-bold text-blue-600">{order.id}</td>
                  <td className="py-4 text-slate-700">{order.channel}</td>
                  <td className="py-4 text-slate-700">{order.customer}</td>
                  <td className="py-4 font-bold text-slate-900">{formatCurrency(order.amount)}</td>
                  <td className="py-4 text-slate-600">{order.payment}</td>
                  <td className="py-4 text-slate-600">{order.fulfilment}</td>
                  <td className="py-4 text-xs text-slate-500">{order.createdAt}</td>
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

function ChannelSummaryCard({
  channel,
}: {
  channel: SalesChannel;
}) {
  const Icon = channel.icon;

  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>

        <ChannelStatusBadge status={channel.status} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">{channel.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{channel.type}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <InfoBox label="Products" value={String(channel.products)} />
        <InfoBox label="Orders" value={String(channel.orders)} />
        <InfoBox label="Revenue" value={formatCurrency(channel.revenue)} />
      </div>

      {channel.issue && (
        <div className="mt-4 rounded-xl bg-orange-50 p-3 text-xs font-semibold text-orange-700">
          {channel.issue}
        </div>
      )}
    </article>
  );
}

function SyncListRow({
  job,
}: {
  job: SyncJob;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <RefreshCcw size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">
          {job.channel} · {job.type}
        </strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {job.records} records · {job.startedAt}
        </p>
      </div>

      <SyncStatusBadge status={job.status} />
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

function ChannelsWorkspace({
  channels,
  search,
  setSearch,
  onConnect,
}: {
  channels: SalesChannel[];
  search: string;
  setSearch: (value: string) => void;
  onConnect: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Connected Sales Channels"
        description="Manage digital, marketplace and offline commerce connections."
        buttonLabel="Connect Channel"
        onClick={onConnect}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search channel, type or status..."
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

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon;

          return (
            <article
              key={channel.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon size={22} />
                </div>
                <ChannelStatusBadge status={channel.status} />
              </div>

              <h2 className="mt-5 text-lg font-black text-slate-950">
                {channel.name}
              </h2>
              <p className="mt-1 text-xs text-slate-500">{channel.type}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoBox label="Products" value={String(channel.products)} />
                <InfoBox label="Orders" value={String(channel.orders)} />
                <InfoBox label="Revenue" value={formatCurrency(channel.revenue)} />
                <InfoBox label="Last Sync" value={channel.lastSync} />
              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Configure Channel
                <ArrowRight size={16} />
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function CatalogueSyncWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Catalogue Synchronisation"
        description="Synchronise products, variants, categories, descriptions and images."
        buttonLabel="Start Catalogue Sync"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Products Synced" value="148" note="Master catalogue" icon={Package} tone="blue" />
        <MetricCard title="Variants Synced" value="486" note="Across all channels" icon={Layers3} tone="green" />
        <MetricCard title="Pending Updates" value="12" note="Awaiting sync" icon={RefreshCcw} tone="violet" />
        <MetricCard title="Failed Records" value="2" note="Require correction" icon={AlertTriangle} tone="orange" />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Catalogue Sync Jobs</h2>
        <div className="mt-6 space-y-3">
          {syncJobs
            .filter((job) => job.type === "Catalogue" || job.type === "Pricing")
            .map((job) => (
              <SyncListRow key={job.id} job={job} />
            ))}
        </div>
      </section>
    </div>
  );
}

function InventorySyncWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Inventory Synchronisation"
        description="Control stock allocation, availability and overselling protection across channels."
        buttonLabel="Start Inventory Sync"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Available Units" value="1,486" note="Across all warehouses" icon={Package} tone="blue" />
        <MetricCard title="Reserved Units" value="214" note="Channel allocations" icon={ShoppingBag} tone="violet" />
        <MetricCard title="Oversell Protection" value="Active" note="All connected channels" icon={CheckCircle2} tone="green" />
        <MetricCard title="Sync Exceptions" value="2" note="Require review" icon={AlertTriangle} tone="orange" />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {channels.map((channel) => (
          <article key={channel.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <RefreshCcw size={22} />
              </div>
              <ChannelStatusBadge status={channel.status} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{channel.name}</h3>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Inventory Sync" value={channel.inventorySync} />
              <InfoRow label="Products" value={String(channel.products)} />
              <InfoRow label="Last Sync" value={channel.lastSync} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function OrdersWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Channel Orders"
        description="Manage orders received from website, app, marketplaces and offline stores."
        buttonLabel="Import Orders"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Channel</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Fulfilment</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {channelOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{order.id}</td>
                  <td className="px-5 py-4 text-slate-700">{order.channel}</td>
                  <td className="px-5 py-4 text-slate-700">{order.customer}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{formatCurrency(order.amount)}</td>
                  <td className="px-5 py-4 text-slate-600">{order.payment}</td>
                  <td className="px-5 py-4 text-slate-600">{order.fulfilment}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{order.createdAt}</td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-xs font-bold text-blue-600">
                      Open Order
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

function ChannelPricingWorkspace() {
  const pricing = [
    ["KRVE Website", "Website Retail", "INR", "148", "Real-time"],
    ["KRVE Mobile App", "App Exclusive", "INR", "142", "Real-time"],
    ["Amazon India", "Marketplace Standard", "INR", "96", "Every 15 min"],
    ["Flipkart", "Marketplace Standard", "INR", "84", "Every 15 min"],
    ["Varanasi Flagship Store", "Offline Premium", "INR", "112", "Every 5 min"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Channel Pricing"
        description="Map and synchronise channel-specific prices, offers and price lists."
        buttonLabel="Map Price List"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {pricing.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Tags size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Price List" value={item[1]} />
              <InfoRow label="Currency" value={item[2]} />
              <InfoRow label="Products" value={item[3]} />
              <InfoRow label="Sync" value={item[4]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function SettlementsWorkspace() {
  const settlements = [
    ["SET-2026-084", "Amazon India", "₹3,42,600", "₹38,420", "₹3,04,180", "Pending"],
    ["SET-2026-083", "Flipkart", "₹2,16,400", "₹24,860", "₹1,91,540", "Pending"],
    ["SET-2026-082", "Varanasi Flagship Store", "₹5,26,800", "₹0", "₹5,26,800", "Reconciled"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Channel Settlements"
        description="Reconcile marketplace settlements, commissions, fees and net receivables."
        buttonLabel="Import Settlement"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Settlement</th>
                <th className="px-5 py-4">Channel</th>
                <th className="px-5 py-4">Gross</th>
                <th className="px-5 py-4">Fees</th>
                <th className="px-5 py-4">Net Amount</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((item) => (
                <tr key={item[0]} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{item[0]}</td>
                  <td className="px-5 py-4 text-slate-700">{item[1]}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{item[2]}</td>
                  <td className="px-5 py-4 text-slate-600">{item[3]}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{item[4]}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item[5] === "Reconciled"
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }`}>
                      {item[5]}
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

function IntegrationsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Channel Integrations"
        description="Manage APIs, credentials, webhooks and channel connection health."
        buttonLabel="Add Integration"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {channels.map((channel) => (
          <article key={channel.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Wifi size={22} />
              </div>
              <ChannelStatusBadge status={channel.status} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{channel.name}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              API connection, authentication, webhook delivery and sync configuration.
            </p>
            <button type="button" className="mt-6 text-xs font-bold text-blue-600">
              Configure Integration
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function SyncHistoryWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Synchronisation History"
        description="Review catalogue, inventory, pricing and order synchronisation jobs."
        buttonLabel="Export History"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Sync Job</th>
                <th className="px-5 py-4">Channel</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Records</th>
                <th className="px-5 py-4">Started</th>
                <th className="px-5 py-4">Completed</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {syncJobs.map((job) => (
                <tr key={job.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{job.id}</td>
                  <td className="px-5 py-4 text-slate-700">{job.channel}</td>
                  <td className="px-5 py-4 text-slate-600">{job.type}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{job.records}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{job.startedAt}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{job.completedAt}</td>
                  <td className="px-5 py-4"><SyncStatusBadge status={job.status} /></td>
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
        title="Sales Channel Analytics"
        description="Analyse revenue, orders, conversion, margin and channel contribution."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Channel Revenue" value="₹30.18L" note="Current month" icon={IndianRupee} tone="blue" />
        <MetricCard title="Channel Orders" value="1,756" note="Current month" icon={ShoppingBag} tone="green" />
        <MetricCard title="Website Share" value="41.4%" note="Of channel revenue" icon={Globe2} tone="violet" />
        <MetricCard title="Marketplace Fees" value="₹63,280" note="Current settlement cycle" icon={CircleDollarSign} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Revenue by Channel"
          values={[92, 68, 48, 36, 58]}
          labels={["Web", "App", "Amazon", "Flipkart", "Store"]}
        />
        <ChartCard
          title="Orders by Channel"
          values={[84, 66, 42, 32, 54]}
          labels={["Web", "App", "Amazon", "Flipkart", "Store"]}
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
    ["Channel Performance Report", "Revenue, orders, conversion and contribution"],
    ["Catalogue Sync Report", "Products, variants, failures and changes"],
    ["Inventory Sync Report", "Availability, allocations and exceptions"],
    ["Channel Orders Report", "Orders, payment and fulfilment status"],
    ["Settlement Report", "Gross, fees, deductions and net receivable"],
    ["Integration Health Report", "API, webhook and sync reliability"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Sales Channel Reports"
        description="Generate and export channel, catalogue, order, inventory and settlement reports."
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
    ["Master Catalogue", "Configure the primary source for products and variants."],
    ["Inventory Allocation", "Set channel-level stock buffers and reservation rules."],
    ["Order Import", "Configure order frequency, acceptance and duplicate prevention."],
    ["Pricing Mapping", "Map channel price lists and promotional rules."],
    ["Settlement Mapping", "Configure fees, commissions and accounting treatment."],
    ["Sync Alerts", "Configure failures, delays and exception notifications."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Sales Channel Settings"
        description="Configure catalogue, inventory, orders, pricing, settlements and synchronisation."
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

function ConnectChannelPanel({
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
              Omnichannel Commerce
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Connect Sales Channel
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Connect a website, mobile app, marketplace or offline store.
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
          <FormField label="Channel Name" placeholder="Amazon India" />
          <FormField label="Channel Type" placeholder="Marketplace / Website / Store" />
          <FormField label="Store or Account ID" placeholder="Account identifier" />
          <FormField label="API Key / Access Token" placeholder="Secure credential" />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Catalogue Sync" placeholder="Real-time / Scheduled" />
            <FormField label="Inventory Sync" placeholder="Real-time / Scheduled" />
          </div>
          <FormField label="Default Price List" placeholder="Select price list" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Connect Channel
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

function ChannelStatusBadge({
  status,
}: {
  status: ChannelStatus;
}) {
  const className =
    status === "Connected"
      ? "bg-green-50 text-green-700"
      : status === "Syncing"
        ? "bg-blue-50 text-blue-700"
        : status === "Issue"
          ? "bg-orange-50 text-orange-700"
          : "bg-slate-100 text-slate-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function SyncStatusBadge({
  status,
}: {
  status: SyncJob["status"];
}) {
  const className =
    status === "Completed"
      ? "bg-green-50 text-green-700"
      : status === "Running"
        ? "bg-blue-50 text-blue-700"
        : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}