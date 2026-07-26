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
  MapPin,
  PackageCheck,
  PackageSearch,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
  Warehouse,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type TrackingTab =
  | "dashboard"
  | "live-orders"
  | "milestones"
  | "delays"
  | "exceptions"
  | "notifications"
  | "couriers"
  | "delivery-proof"
  | "history"
  | "analytics"
  | "reports"
  | "settings";

type TrackingStatus =
  | "Order Confirmed"
  | "Packed"
  | "Dispatched"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed"
  | "Exception";

type Priority = "High" | "Medium" | "Low";

type TrackedOrder = {
  id: string;
  customer: string;
  city: string;
  courier: string;
  trackingId: string;
  warehouse: string;
  promisedDate: string;
  lastUpdate: string;
  status: TrackingStatus;
  priority: Priority;
};

type TrackingEvent = {
  id: string;
  orderId: string;
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
};

type DelayCase = {
  id: string;
  orderId: string;
  customer: string;
  reason: string;
  delayHours: number;
  owner: string;
  action: string;
  priority: Priority;
};

const tabs: Array<{
  id: TrackingTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "live-orders", label: "Live Orders", icon: Truck },
  { id: "milestones", label: "Milestones", icon: MapPin },
  { id: "delays", label: "Delays", icon: Clock3 },
  { id: "exceptions", label: "Exceptions", icon: AlertTriangle },
  { id: "notifications", label: "Notifications", icon: BellRing },
  { id: "couriers", label: "Courier Tracking", icon: PackageSearch },
  { id: "delivery-proof", label: "Delivery Proof", icon: PackageCheck },
  { id: "history", label: "History", icon: History },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const trackedOrders: TrackedOrder[] = [
  {
    id: "KRVE-10482",
    customer: "Aarav Sharma",
    city: "Varanasi",
    courier: "Delhivery",
    trackingId: "DLV7842216",
    warehouse: "KRVE Central Warehouse",
    promisedDate: "27 Jul 2026",
    lastUpdate: "26 Jul 2026, 12:42 PM",
    status: "In Transit",
    priority: "High",
  },
  {
    id: "KRVE-10481",
    customer: "Ananya Singh",
    city: "New Delhi",
    courier: "Blue Dart",
    trackingId: "BD5582041",
    warehouse: "Delhi Fulfilment Center",
    promisedDate: "26 Jul 2026",
    lastUpdate: "26 Jul 2026, 12:18 PM",
    status: "Out for Delivery",
    priority: "High",
  },
  {
    id: "KRVE-10480",
    customer: "Rohan Verma",
    city: "Mumbai",
    courier: "Ecom Express",
    trackingId: "ECM9921840",
    warehouse: "Mumbai Distribution Hub",
    promisedDate: "28 Jul 2026",
    lastUpdate: "26 Jul 2026, 11:56 AM",
    status: "Dispatched",
    priority: "Medium",
  },
  {
    id: "KRVE-10479",
    customer: "Priya Mehta",
    city: "Lucknow",
    courier: "Xpressbees",
    trackingId: "XPB6148291",
    warehouse: "KRVE Central Warehouse",
    promisedDate: "26 Jul 2026",
    lastUpdate: "26 Jul 2026, 11:25 AM",
    status: "Delayed",
    priority: "High",
  },
  {
    id: "KRVE-10478",
    customer: "Kabir Malhotra",
    city: "Jaipur",
    courier: "Delhivery",
    trackingId: "DLV7842162",
    warehouse: "KRVE Central Warehouse",
    promisedDate: "26 Jul 2026",
    lastUpdate: "26 Jul 2026, 10:48 AM",
    status: "Delivered",
    priority: "Low",
  },
];

const delayCases: DelayCase[] = [
  {
    id: "DLY-2026-084",
    orderId: "KRVE-10479",
    customer: "Priya Mehta",
    reason: "Linehaul delay",
    delayHours: 18,
    owner: "Shipping Operations",
    action: "Courier escalation raised",
    priority: "High",
  },
  {
    id: "DLY-2026-083",
    orderId: "KRVE-10466",
    customer: "Aditya Rao",
    reason: "Incorrect routing",
    delayHours: 12,
    owner: "Courier Partner",
    action: "Rerouted to correct hub",
    priority: "High",
  },
  {
    id: "DLY-2026-082",
    orderId: "KRVE-10455",
    customer: "Neha Kapoor",
    reason: "Weather disruption",
    delayHours: 8,
    owner: "Customer Support",
    action: "Customer informed",
    priority: "Medium",
  },
];

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export default function OrderTrackingManagement() {
  const [activeTab, setActiveTab] = useState<TrackingTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showTrackPanel, setShowTrackPanel] = useState(false);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return trackedOrders;
    }

    return trackedOrders.filter((order) =>
      `${order.id} ${order.customer} ${order.city} ${order.courier} ${order.trackingId} ${order.status}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <TrackingHeader
        onTrack={() => setShowTrackPanel(true)}
        onOpenTab={setActiveTab}
      />

      <TrackingTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "live-orders" && (
        <LiveOrdersWorkspace
          orders={filteredOrders}
          search={search}
          setSearch={setSearch}
        />
      )}

      {activeTab === "milestones" && <MilestonesWorkspace />}
      {activeTab === "delays" && <DelaysWorkspace />}
      {activeTab === "exceptions" && <ExceptionsWorkspace />}
      {activeTab === "notifications" && <NotificationsWorkspace />}
      {activeTab === "couriers" && <CourierTrackingWorkspace />}
      {activeTab === "delivery-proof" && <DeliveryProofWorkspace />}
      {activeTab === "history" && <HistoryWorkspace />}
      {activeTab === "analytics" && <AnalyticsWorkspace />}
      {activeTab === "reports" && <ReportsWorkspace />}
      {activeTab === "settings" && <SettingsWorkspace />}

      {showTrackPanel && (
        <TrackOrderPanel onClose={() => setShowTrackPanel(false)} />
      )}
    </div>
  );
}

function TrackingHeader({
  onTrack,
  onOpenTab,
}: {
  onTrack: () => void;
  onOpenTab: (tab: TrackingTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <PackageSearch size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Customer Delivery Visibility
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Order Tracking Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Track every shipment milestone, delivery delay, exception,
            customer notification, courier update and proof of delivery.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("delays")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <Clock3 size={17} />
            View Delays
          </button>

          <button
            type="button"
            onClick={onTrack}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Track Order
          </button>
        </div>
      </div>
    </section>
  );
}

function TrackingTabBar({
  activeTab,
  onChange,
}: {
  activeTab: TrackingTab;
  onChange: (tab: TrackingTab) => void;
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
  onOpenTab: (tab: TrackingTab) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Tracked Orders"
          value="284"
          note="Live orders"
          icon={PackageSearch}
          tone="blue"
        />
        <MetricCard
          title="On Schedule"
          value="91.2%"
          note="Within promised date"
          icon={CheckCircle2}
          tone="green"
        />
        <MetricCard
          title="Delayed"
          value="11"
          note="Require intervention"
          icon={Clock3}
          tone="violet"
        />
        <MetricCard
          title="Delivered Today"
          value="74"
          note="Confirmed deliveries"
          icon={PackageCheck}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Live Delivery Pipeline
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current orders, courier milestones and delivery status
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("live-orders")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View Live Orders
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {trackedOrders.map((order) => (
              <OrderListRow key={order.id} order={order} />
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
            KRVE AI Delivery Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI predicts delivery delays, detects stalled milestones and
            prioritises customer communication.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Delay risk"
              detail="Three shipments have a high probability of missing the promised delivery date."
              tone="orange"
            />
            <InsightCard
              title="Service opportunity"
              detail="Proactive WhatsApp updates may reduce support contacts by 18%."
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Tracking Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Delay Intervention Queue
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Orders requiring operational action
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("delays")}
              className="text-sm font-bold text-blue-600"
            >
              Open Delays
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {delayCases.map((delay) => (
              <DelayRow key={delay.id} delay={delay} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Tracking Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily delivery-visibility workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Track Order"
              description="Search order or courier tracking ID"
              icon={PackageSearch}
              onClick={() => onOpenTab("live-orders")}
            />
            <QuickAction
              title="Review Delays"
              description="Prioritise delayed and at-risk orders"
              icon={Clock3}
              onClick={() => onOpenTab("delays")}
            />
            <QuickAction
              title="Send Update"
              description="Notify customers about shipment progress"
              icon={BellRing}
              onClick={() => onOpenTab("notifications")}
            />
            <QuickAction
              title="Delivery Proof"
              description="Review signature, photo and receiver details"
              icon={PackageCheck}
              onClick={() => onOpenTab("delivery-proof")}
            />
          </div>
        </article>
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

function OrderListRow({
  order,
}: {
  order: TrackedOrder;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Truck size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {order.id} · {order.customer}
          </strong>
          <span className="text-xs text-slate-400">{order.lastUpdate}</span>
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">
          {order.courier} · {order.trackingId} · {order.city}
        </p>
      </div>

      <TrackingStatusBadge status={order.status} />
    </div>
  );
}

function DelayRow({
  delay,
}: {
  delay: DelayCase;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600">
        <AlertTriangle size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">
          {delay.orderId} · {delay.customer}
        </strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {delay.reason} · {delay.delayHours} hours · {delay.action}
        </p>
      </div>

      <PriorityBadge priority={delay.priority} />
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
        <ChevronRight size={14} className="transition group-hover:translate-x-1" />
      </span>
    </button>
  );
}

function LiveOrdersWorkspace({
  orders,
  search,
  setSearch,
}: {
  orders: TrackedOrder[];
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Live Order Tracking"
        description="Search and monitor live customer orders and courier tracking."
        buttonLabel="Export Orders"
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search order, customer, courier or tracking ID..."
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
          <table className="w-full min-w-[1250px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">City</th>
                <th className="px-5 py-4">Courier</th>
                <th className="px-5 py-4">Tracking ID</th>
                <th className="px-5 py-4">Warehouse</th>
                <th className="px-5 py-4">Promised Date</th>
                <th className="px-5 py-4">Last Update</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{order.id}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{order.customer}</td>
                  <td className="px-5 py-4 text-slate-600">{order.city}</td>
                  <td className="px-5 py-4 text-slate-600">{order.courier}</td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-600">{order.trackingId}</td>
                  <td className="px-5 py-4 text-slate-600">{order.warehouse}</td>
                  <td className="px-5 py-4 text-slate-600">{order.promisedDate}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{order.lastUpdate}</td>
                  <td className="px-5 py-4"><PriorityBadge priority={order.priority} /></td>
                  <td className="px-5 py-4"><TrackingStatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function MilestonesWorkspace() {
  const events: TrackingEvent[] = [
    {
      id: "EVT-1",
      orderId: "KRVE-10482",
      title: "Order Confirmed",
      location: "KRVE Website",
      timestamp: "25 Jul 2026, 09:42 PM",
      completed: true,
    },
    {
      id: "EVT-2",
      orderId: "KRVE-10482",
      title: "Packed",
      location: "KRVE Central Warehouse",
      timestamp: "25 Jul 2026, 10:58 PM",
      completed: true,
    },
    {
      id: "EVT-3",
      orderId: "KRVE-10482",
      title: "Dispatched",
      location: "Varanasi Hub",
      timestamp: "25 Jul 2026, 11:48 PM",
      completed: true,
    },
    {
      id: "EVT-4",
      orderId: "KRVE-10482",
      title: "In Transit",
      location: "Lucknow Transit Hub",
      timestamp: "26 Jul 2026, 08:30 AM",
      completed: true,
    },
    {
      id: "EVT-5",
      orderId: "KRVE-10482",
      title: "Out for Delivery",
      location: "Pending",
      timestamp: "Expected 27 Jul 2026",
      completed: false,
    },
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Shipment Milestones"
        description="Review order progression from confirmation to final delivery."
        buttonLabel="Refresh Milestones"
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {trackedOrders.slice(0, 4).map((order) => (
          <article
            key={order.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {order.id}
                </p>
                <h3 className="mt-2 text-lg font-black text-slate-950">
                  {order.customer}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {order.courier} · {order.trackingId}
                </p>
              </div>

              <TrackingStatusBadge status={order.status} />
            </div>

            <div className="mt-7 space-y-5">
              {events.map((event) => (
                <div key={`${order.id}-${event.id}`} className="flex items-start gap-4">
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                      event.completed ? "bg-green-500" : "bg-slate-200"
                    }`}
                  />
                  <div>
                    <strong className="text-sm text-slate-900">{event.title}</strong>
                    <p className="mt-1 text-xs text-slate-500">
                      {event.location} · {event.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function DelaysWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Delivery Delays"
        description="Review delayed orders, owners, reasons and intervention actions."
        buttonLabel="Create Escalation"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Delayed Orders" value="11" note="Current live orders" icon={Clock3} tone="orange" />
        <MetricCard title="High Priority" value="4" note="Founder visibility" icon={AlertTriangle} tone="violet" />
        <MetricCard title="Customer Informed" value="8" note="Notifications sent" icon={BellRing} tone="blue" />
        <MetricCard title="Resolved Today" value="6" note="Delay cases closed" icon={CheckCircle2} tone="green" />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {delayCases.map((delay) => (
          <article
            key={delay.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600">
                <Clock3 size={22} />
              </div>
              <PriorityBadge priority={delay.priority} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-orange-600">
              {delay.id}
            </p>
            <h3 className="mt-2 text-lg font-black text-slate-950">
              {delay.orderId}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{delay.customer}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Reason" value={delay.reason} />
              <InfoRow label="Delay" value={`${delay.delayHours} hours`} />
              <InfoRow label="Owner" value={delay.owner} />
              <InfoRow label="Action" value={delay.action} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ExceptionsWorkspace() {
  const exceptions = [
    ["EXC-2026-051", "KRVE-10471", "Address issue", "Customer contact required", "Open"],
    ["EXC-2026-050", "KRVE-10468", "Shipment damaged", "Replacement review", "Open"],
    ["EXC-2026-049", "KRVE-10462", "Customer unavailable", "Reattempt scheduled", "Monitoring"],
    ["EXC-2026-048", "KRVE-10458", "Incorrect routing", "Courier escalation", "Resolved"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Delivery Exceptions"
        description="Manage address, damage, routing and delivery-attempt exceptions."
        buttonLabel="Create Exception"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {exceptions.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={22} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-red-600">{item[0]}</p>
            <h3 className="mt-2 text-base font-black text-slate-900">{item[1]}</h3>
            <p className="mt-3 text-sm text-slate-600">{item[2]}</p>
            <p className="mt-2 text-xs text-slate-500">{item[3]}</p>
            <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              {item[4]}
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}

function NotificationsWorkspace() {
  const templates = [
    ["Order Confirmed", "Email + WhatsApp", "Sent after order confirmation", "Active"],
    ["Shipment Dispatched", "Email + WhatsApp", "Sent after courier handover", "Active"],
    ["Out for Delivery", "WhatsApp + SMS", "Sent on delivery day", "Active"],
    ["Delivery Delayed", "Email + WhatsApp", "Sent when SLA risk is detected", "Active"],
    ["Delivered", "Email + WhatsApp", "Sent after delivery confirmation", "Active"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Tracking Notifications"
        description="Manage email, WhatsApp and SMS updates for shipment milestones."
        buttonLabel="Create Notification"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {templates.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <BellRing size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <p className="mt-2 text-xs text-slate-500">{item[1]}</p>
            <p className="mt-3 text-xs leading-5 text-slate-500">{item[2]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function CourierTrackingWorkspace() {
  const couriers = [
    ["Delhivery", "96.8%", "62 live", "2.8 days", "Healthy"],
    ["Blue Dart", "98.2%", "31 live", "1.9 days", "Healthy"],
    ["Ecom Express", "94.6%", "28 live", "3.4 days", "Monitor"],
    ["Xpressbees", "93.8%", "21 live", "3.1 days", "Monitor"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Courier Tracking Performance"
        description="Monitor courier SLA, live orders, speed and service quality."
        buttonLabel="Refresh Courier Data"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {couriers.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Truck size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Delivery Rate" value={item[1]} />
              <InfoRow label="Live Orders" value={item[2]} />
              <InfoRow label="Average Time" value={item[3]} />
              <InfoRow label="Health" value={item[4]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function DeliveryProofWorkspace() {
  const proofs = [
    ["POD-10478", "KRVE-10478", "Kabir Malhotra", "Photo + OTP", "26 Jul 2026, 10:42 AM"],
    ["POD-10474", "KRVE-10474", "Meera Joshi", "Signature", "26 Jul 2026, 09:18 AM"],
    ["POD-10469", "KRVE-10469", "Aditya Rao", "Photo + Signature", "26 Jul 2026, 08:56 AM"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Proof of Delivery"
        description="Review delivery photo, OTP, signature and receiver confirmation."
        buttonLabel="Export Proofs"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {proofs.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-50 text-green-600">
              <PackageCheck size={22} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-green-600">{item[0]}</p>
            <h3 className="mt-2 text-base font-black text-slate-900">{item[1]}</h3>
            <p className="mt-2 text-sm text-slate-600">{item[2]}</p>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Proof" value={item[3]} />
              <InfoRow label="Delivered" value={item[4]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function HistoryWorkspace() {
  const history = [
    ["26 Jul 2026, 12:42 PM", "In transit update", "KRVE-10482", "Delhivery"],
    ["26 Jul 2026, 12:18 PM", "Out for delivery", "KRVE-10481", "Blue Dart"],
    ["26 Jul 2026, 11:56 AM", "Shipment dispatched", "KRVE-10480", "Ecom Express"],
    ["26 Jul 2026, 11:25 AM", "Delay detected", "KRVE-10479", "KRVE AI"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Tracking History"
        description="Review shipment status, courier updates and customer notifications."
        buttonLabel="Export History"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Action</th>
                <th className="px-5 py-4">Order</th>
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
        title="Order Tracking Analytics"
        description="Analyse on-time delivery, delays, courier performance and notification effectiveness."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="On-Time Delivery" value="91.2%" note="Current month" icon={CheckCircle2} tone="green" />
        <MetricCard title="Average Transit" value="2.8 days" note="Across couriers" icon={Truck} tone="blue" />
        <MetricCard title="Delay Rate" value="4.6%" note="Current month" icon={Clock3} tone="orange" />
        <MetricCard title="Notification Reach" value="97.4%" note="Successful delivery updates" icon={BellRing} tone="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="On-Time Delivery Trend"
          values={[82, 84, 86, 88, 90, 91, 92]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
        <ChartCard
          title="Courier Delivery Performance"
          values={[97, 98, 95, 94]}
          labels={["Delhivery", "BlueDart", "Ecom", "Xpress"]}
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
    ["Live Order Tracking Report", "Order, courier, status and promised date"],
    ["Delay Report", "Reason, duration, owner and intervention"],
    ["Exception Report", "Address, routing, damage and attempt issues"],
    ["Courier Performance Report", "SLA, speed and success rate"],
    ["Notification Report", "Email, WhatsApp and SMS delivery"],
    ["Proof of Delivery Report", "Photo, OTP, signature and receiver"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Order Tracking Reports"
        description="Generate and export live tracking, delay, exception and courier reports."
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
    ["Tracking Sources", "Configure courier APIs and shipment-status sources."],
    ["Milestone Mapping", "Map courier events to KRVE order milestones."],
    ["Delay Thresholds", "Set SLA risk and escalation thresholds."],
    ["Customer Notifications", "Configure email, WhatsApp and SMS updates."],
    ["Proof of Delivery", "Set required photo, OTP and signature rules."],
    ["Tracking Retention", "Configure event and delivery-proof retention."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Order Tracking Settings"
        description="Configure courier sources, milestones, delays, notifications and delivery proof."
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

function TrackOrderPanel({
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
              Customer Delivery Visibility
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Track Order
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Search by KRVE order ID or courier tracking ID.
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
          <FormField label="Order ID" placeholder="KRVE-10482" />
          <FormField label="Tracking ID" placeholder="DLV7842216" />
          <FormField label="Courier" placeholder="Delhivery / Blue Dart / Ecom Express" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <PackageSearch size={17} />
            Track Order
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

function TrackingStatusBadge({
  status,
}: {
  status: TrackingStatus;
}) {
  const className =
    status === "Delivered"
      ? "bg-green-50 text-green-700"
      : status === "Delayed" || status === "Exception"
        ? "bg-red-50 text-red-700"
        : status === "Out for Delivery"
          ? "bg-violet-50 text-violet-700"
          : status === "In Transit" || status === "Dispatched"
            ? "bg-blue-50 text-blue-700"
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