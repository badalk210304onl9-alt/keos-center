"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  FileBarChart,
  Filter,
  History,
  MapPin,
  Package,
  PackageCheck,
  Plus,
  Printer,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tags,
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

type ShippingTab =
  | "dashboard"
  | "shipments"
  | "couriers"
  | "tracking"
  | "labels"
  | "manifests"
  | "ndr"
  | "returns"
  | "rates"
  | "zones"
  | "analytics"
  | "reports"
  | "settings";

type ShipmentStatus =
  | "Ready to Ship"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed"
  | "RTO";

type Priority = "High" | "Medium" | "Low";

type Shipment = {
  id: string;
  orderId: string;
  customer: string;
  city: string;
  courier: string;
  trackingId: string;
  amount: number;
  weight: string;
  createdAt: string;
  eta: string;
  status: ShipmentStatus;
  priority: Priority;
};

type Courier = {
  id: string;
  name: string;
  service: string;
  coverage: string;
  activeShipments: number;
  deliveryRate: number;
  averageDays: number;
  codRemittance: string;
  status: "Active" | "Limited" | "Inactive";
};

type Manifest = {
  id: string;
  courier: string;
  warehouse: string;
  shipments: number;
  createdAt: string;
  status: "Open" | "Closed" | "Dispatched";
};

const tabs: Array<{
  id: ShippingTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "shipments", label: "Shipments", icon: Truck },
  { id: "couriers", label: "Courier Partners", icon: PackageCheck },
  { id: "tracking", label: "Tracking", icon: MapPin },
  { id: "labels", label: "Labels", icon: Printer },
  { id: "manifests", label: "Manifests", icon: FileBarChart },
  { id: "ndr", label: "NDR", icon: AlertTriangle },
  { id: "returns", label: "RTO & Returns", icon: RefreshCcw },
  { id: "rates", label: "Rates", icon: CircleDollarSign },
  { id: "zones", label: "Shipping Zones", icon: Warehouse },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: Download },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const shipments: Shipment[] = [
  {
    id: "SHP-2026-1842",
    orderId: "KRVE-10482",
    customer: "Aarav Sharma",
    city: "Varanasi",
    courier: "Delhivery",
    trackingId: "DLV7842216",
    amount: 18999,
    weight: "1.8 kg",
    createdAt: "26 Jul 2026, 12:42 AM",
    eta: "27 Jul 2026",
    status: "In Transit",
    priority: "High",
  },
  {
    id: "SHP-2026-1841",
    orderId: "KRVE-10481",
    customer: "Ananya Singh",
    city: "New Delhi",
    courier: "Blue Dart",
    trackingId: "BD5582041",
    amount: 8499,
    weight: "1.2 kg",
    createdAt: "26 Jul 2026, 12:18 AM",
    eta: "26 Jul 2026",
    status: "Out for Delivery",
    priority: "High",
  },
  {
    id: "SHP-2026-1840",
    orderId: "KRVE-10480",
    customer: "Rohan Verma",
    city: "Mumbai",
    courier: "Ecom Express",
    trackingId: "ECM9921840",
    amount: 12999,
    weight: "2.1 kg",
    createdAt: "25 Jul 2026, 11:56 PM",
    eta: "28 Jul 2026",
    status: "Ready to Ship",
    priority: "Medium",
  },
  {
    id: "SHP-2026-1839",
    orderId: "KRVE-10479",
    customer: "Priya Mehta",
    city: "Lucknow",
    courier: "Xpressbees",
    trackingId: "XPB6148291",
    amount: 6799,
    weight: "0.9 kg",
    createdAt: "25 Jul 2026, 11:25 PM",
    eta: "29 Jul 2026",
    status: "Delayed",
    priority: "High",
  },
  {
    id: "SHP-2026-1838",
    orderId: "KRVE-10478",
    customer: "Kabir Malhotra",
    city: "Jaipur",
    courier: "Delhivery",
    trackingId: "DLV7842162",
    amount: 9999,
    weight: "1.5 kg",
    createdAt: "25 Jul 2026, 10:48 PM",
    eta: "26 Jul 2026",
    status: "Delivered",
    priority: "Low",
  },
];

const couriers: Courier[] = [
  {
    id: "CR-001",
    name: "Delhivery",
    service: "Surface & Express",
    coverage: "18,600+ PIN codes",
    activeShipments: 62,
    deliveryRate: 96.8,
    averageDays: 2.8,
    codRemittance: "T+2",
    status: "Active",
  },
  {
    id: "CR-002",
    name: "Blue Dart",
    service: "Premium Express",
    coverage: "14,300+ PIN codes",
    activeShipments: 31,
    deliveryRate: 98.2,
    averageDays: 1.9,
    codRemittance: "T+1",
    status: "Active",
  },
  {
    id: "CR-003",
    name: "Ecom Express",
    service: "Surface",
    coverage: "27,000+ PIN codes",
    activeShipments: 28,
    deliveryRate: 94.6,
    averageDays: 3.4,
    codRemittance: "T+3",
    status: "Active",
  },
  {
    id: "CR-004",
    name: "Xpressbees",
    service: "Express",
    coverage: "20,000+ PIN codes",
    activeShipments: 21,
    deliveryRate: 93.8,
    averageDays: 3.1,
    codRemittance: "T+2",
    status: "Limited",
  },
];

const manifests: Manifest[] = [
  {
    id: "MNF-2026-0382",
    courier: "Delhivery",
    warehouse: "KRVE Central Warehouse",
    shipments: 48,
    createdAt: "26 Jul 2026, 12:10 AM",
    status: "Open",
  },
  {
    id: "MNF-2026-0381",
    courier: "Blue Dart",
    warehouse: "Delhi Fulfilment Center",
    shipments: 26,
    createdAt: "25 Jul 2026, 11:20 PM",
    status: "Dispatched",
  },
  {
    id: "MNF-2026-0380",
    courier: "Ecom Express",
    warehouse: "Mumbai Distribution Hub",
    shipments: 34,
    createdAt: "25 Jul 2026, 10:50 PM",
    status: "Closed",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ShippingManagement() {
  const [activeTab, setActiveTab] = useState<ShippingTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const filteredShipments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return shipments;
    }

    return shipments.filter((shipment) =>
      `${shipment.id} ${shipment.orderId} ${shipment.customer} ${shipment.city} ${shipment.courier} ${shipment.trackingId}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <ShippingHeader
        onCreate={() => setShowCreatePanel(true)}
        onOpenTab={setActiveTab}
      />

      <ShippingTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "shipments" && (
        <ShipmentsWorkspace
          shipments={filteredShipments}
          search={search}
          setSearch={setSearch}
          onCreate={() => setShowCreatePanel(true)}
        />
      )}

      {activeTab === "couriers" && <CouriersWorkspace />}

      {activeTab === "tracking" && <TrackingWorkspace />}

      {activeTab === "labels" && <LabelsWorkspace />}

      {activeTab === "manifests" && <ManifestsWorkspace />}

      {activeTab === "ndr" && <NdrWorkspace />}

      {activeTab === "returns" && <ReturnsWorkspace />}

      {activeTab === "rates" && <RatesWorkspace />}

      {activeTab === "zones" && <ZonesWorkspace />}

      {activeTab === "analytics" && <AnalyticsWorkspace />}

      {activeTab === "reports" && <ReportsWorkspace />}

      {activeTab === "settings" && <SettingsWorkspace />}

      {showCreatePanel && (
        <CreateShipmentPanel onClose={() => setShowCreatePanel(false)} />
      )}
    </div>
  );
}

function ShippingHeader({
  onCreate,
  onOpenTab,
}: {
  onCreate: () => void;
  onOpenTab: (tab: ShippingTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <Truck size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Delivery Operations
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Shipping Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Manage courier partners, shipments, tracking, labels, manifests,
            delivery exceptions, RTO, rates and shipping performance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("labels")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <Printer size={17} />
            Print Labels
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Create Shipment
          </button>
        </div>
      </div>
    </section>
  );
}

function ShippingTabBar({
  activeTab,
  onChange,
}: {
  activeTab: ShippingTab;
  onChange: (tab: ShippingTab) => void;
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
  onOpenTab: (tab: ShippingTab) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Shipments Today"
          value="86"
          note="Across all couriers"
          icon={Truck}
          tone="blue"
        />
        <MetricCard
          title="In Transit"
          value="142"
          note="Live shipments"
          icon={MapPin}
          tone="green"
        />
        <MetricCard
          title="Delivered"
          value="96.4%"
          note="Successful delivery rate"
          icon={CheckCircle2}
          tone="violet"
        />
        <MetricCard
          title="Delivery Exceptions"
          value="7"
          note="Require attention"
          icon={AlertTriangle}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Live Shipment Pipeline
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current shipments and delivery status
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("shipments")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View Shipments
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {shipments.slice(0, 5).map((shipment) => (
              <ShipmentListRow key={shipment.id} shipment={shipment} />
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
            KRVE AI Shipping Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI monitors courier performance, delivery risks, costs, NDR,
            RTO and service quality.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Delivery risk"
              detail="Seven shipments are likely to miss the promised delivery date."
              tone="orange"
            />
            <InsightCard
              title="Cost opportunity"
              detail="Courier reallocation can reduce weekly shipping cost by ₹18,400."
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Shipping Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Courier Performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Delivery rate, speed and active load
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("couriers")}
              className="text-sm font-bold text-blue-600"
            >
              Manage Couriers
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {couriers.map((courier) => (
              <CourierMiniCard key={courier.id} courier={courier} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Shipping Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily delivery workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Create Shipment"
              description="Generate shipment and assign courier"
              icon={Truck}
              onClick={() => onOpenTab("shipments")}
            />
            <QuickAction
              title="Print Labels"
              description="Generate shipping labels in bulk"
              icon={Printer}
              onClick={() => onOpenTab("labels")}
            />
            <QuickAction
              title="Track Orders"
              description="Monitor live shipment milestones"
              icon={MapPin}
              onClick={() => onOpenTab("tracking")}
            />
            <QuickAction
              title="Manage NDR"
              description="Resolve failed delivery attempts"
              icon={AlertTriangle}
              onClick={() => onOpenTab("ndr")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Open Manifests
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Courier handover and dispatch control
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("manifests")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Open Manifests
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-4 font-semibold">Manifest</th>
                <th className="pb-4 font-semibold">Courier</th>
                <th className="pb-4 font-semibold">Warehouse</th>
                <th className="pb-4 font-semibold">Shipments</th>
                <th className="pb-4 font-semibold">Created</th>
                <th className="pb-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {manifests.map((manifest) => (
                <tr key={manifest.id} className="border-b border-slate-100 text-sm">
                  <td className="py-4 font-bold text-blue-600">{manifest.id}</td>
                  <td className="py-4 text-slate-700">{manifest.courier}</td>
                  <td className="py-4 text-slate-600">{manifest.warehouse}</td>
                  <td className="py-4 font-bold text-slate-900">{manifest.shipments}</td>
                  <td className="py-4 text-xs text-slate-500">{manifest.createdAt}</td>
                  <td className="py-4">
                    <ManifestBadge status={manifest.status} />
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

function ShipmentListRow({
  shipment,
}: {
  shipment: Shipment;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Truck size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {shipment.orderId} · {shipment.customer}
          </strong>
          <span className="text-xs text-slate-400">{shipment.createdAt}</span>
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">
          {shipment.courier} · {shipment.trackingId} · {shipment.city}
        </p>
      </div>

      <ShipmentStatusBadge status={shipment.status} />
    </div>
  );
}

function CourierMiniCard({
  courier,
}: {
  courier: Courier;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <PackageCheck size={19} />
        </div>

        <CourierStatusBadge status={courier.status} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">{courier.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{courier.service}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <InfoBox label="Active" value={String(courier.activeShipments)} />
        <InfoBox label="Delivery" value={`${courier.deliveryRate}%`} />
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

function ShipmentsWorkspace({
  shipments,
  search,
  setSearch,
  onCreate,
}: {
  shipments: Shipment[];
  search: string;
  setSearch: (value: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Shipment Register"
        description="Create, assign, monitor and control all customer shipments."
        buttonLabel="Create Shipment"
        onClick={onCreate}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search shipment, order, customer or tracking ID..."
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
                <th className="px-5 py-4">Shipment</th>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Courier</th>
                <th className="px-5 py-4">Tracking</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Weight</th>
                <th className="px-5 py-4">ETA</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{shipment.id}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{shipment.orderId}</td>
                  <td className="px-5 py-4">
                    <strong className="block text-slate-900">{shipment.customer}</strong>
                    <span className="mt-1 block text-xs text-slate-500">{shipment.city}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{shipment.courier}</td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-600">{shipment.trackingId}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {formatCurrency(shipment.amount)}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{shipment.weight}</td>
                  <td className="px-5 py-4 text-slate-600">{shipment.eta}</td>
                  <td className="px-5 py-4">
                    <PriorityBadge priority={shipment.priority} />
                  </td>
                  <td className="px-5 py-4">
                    <ShipmentStatusBadge status={shipment.status} />
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

function CouriersWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Courier Partners"
        description="Manage courier integrations, performance, coverage and settlement terms."
        buttonLabel="Add Courier"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {couriers.map((courier) => (
          <article
            key={courier.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Truck size={22} />
              </div>
              <CourierStatusBadge status={courier.status} />
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-950">{courier.name}</h2>
            <p className="mt-1 text-xs text-slate-500">{courier.service}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Coverage" value={courier.coverage} />
              <InfoRow label="Active shipments" value={String(courier.activeShipments)} />
              <InfoRow label="Delivery rate" value={`${courier.deliveryRate}%`} />
              <InfoRow label="Average delivery" value={`${courier.averageDays} days`} />
              <InfoRow label="COD remittance" value={courier.codRemittance} />
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Configure Courier
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function TrackingWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Live Shipment Tracking"
        description="Track milestones, delivery delays and customer delivery status."
        buttonLabel="Track Shipment"
      />

      <section className="grid gap-5 xl:grid-cols-2">
        {shipments.slice(0, 4).map((shipment) => (
          <article
            key={shipment.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {shipment.trackingId}
                </p>
                <h3 className="mt-2 text-lg font-black text-slate-950">
                  {shipment.orderId} · {shipment.customer}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {shipment.courier} · ETA {shipment.eta}
                </p>
              </div>

              <ShipmentStatusBadge status={shipment.status} />
            </div>

            <div className="mt-7 space-y-5">
              {(
                [
                  ["Shipment Created", "25 Jul 2026, 10:10 PM", true],
                  ["Picked Up", "25 Jul 2026, 11:45 PM", true],
                  [
                    "In Transit",
                    "26 Jul 2026, 08:30 AM",
                    shipment.status !== "Ready to Ship",
                  ],
                  [
                    "Out for Delivery",
                    "Pending",
                    shipment.status === "Out for Delivery" ||
                      shipment.status === "Delivered",
                  ],
                  ["Delivered", "Pending", shipment.status === "Delivered"],
                ] as Array<[string, string, boolean]>
              ).map((event) => (
                <div key={event[0]} className="flex items-start gap-4">
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                      event[2] ? "bg-green-500" : "bg-slate-200"
                    }`}
                  />
                  <div>
                    <strong className="text-sm text-slate-900">{event[0]}</strong>
                    <p className="mt-1 text-xs text-slate-500">{event[1]}</p>
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

function LabelsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Shipping Labels"
        description="Generate, reprint and manage shipping labels for customer orders."
        buttonLabel="Generate Labels"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shipments.slice(0, 6).map((shipment) => (
          <article
            key={shipment.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Printer size={22} />
              </div>
              <ShipmentStatusBadge status={shipment.status} />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{shipment.orderId}</h3>
            <p className="mt-1 text-xs text-slate-500">{shipment.customer}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Courier" value={shipment.courier} />
              <InfoRow label="Tracking" value={shipment.trackingId} />
              <InfoRow label="Weight" value={shipment.weight} />
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              <Printer size={16} />
              Print Label
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ManifestsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Shipping Manifests"
        description="Create courier manifests, close batches and control shipment handover."
        buttonLabel="Create Manifest"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Manifest</th>
                <th className="px-5 py-4">Courier</th>
                <th className="px-5 py-4">Warehouse</th>
                <th className="px-5 py-4">Shipments</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {manifests.map((manifest) => (
                <tr key={manifest.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{manifest.id}</td>
                  <td className="px-5 py-4 text-slate-700">{manifest.courier}</td>
                  <td className="px-5 py-4 text-slate-600">{manifest.warehouse}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{manifest.shipments}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{manifest.createdAt}</td>
                  <td className="px-5 py-4">
                    <ManifestBadge status={manifest.status} />
                  </td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-xs font-bold text-blue-600">
                      Open Manifest
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

function NdrWorkspace() {
  const cases = [
    ["NDR-2026-092", "KRVE-10479", "Customer Unavailable", "2nd Attempt", "High"],
    ["NDR-2026-091", "KRVE-10466", "Address Incomplete", "Customer Contacted", "High"],
    ["NDR-2026-090", "KRVE-10452", "COD Refused", "Awaiting Decision", "Medium"],
    ["NDR-2026-089", "KRVE-10438", "Premises Closed", "Reattempt Scheduled", "Low"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Non-Delivery Reports"
        description="Resolve failed delivery attempts, contact customers and reduce RTO."
        buttonLabel="Create NDR Action"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cases.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={22} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-red-600">{item[0]}</p>
            <h3 className="mt-2 text-base font-black text-slate-900">{item[1]}</h3>
            <p className="mt-3 text-sm text-slate-600">{item[2]}</p>
            <p className="mt-2 text-xs text-slate-500">{item[3]}</p>
            <button type="button" className="mt-6 text-xs font-bold text-blue-600">
              Resolve Case
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ReturnsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="RTO & Return Shipments"
        description="Track return-to-origin, reverse pickups and returned shipment disposition."
        buttonLabel="Create Return Shipment"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Open RTO" value="9" note="In reverse transit" icon={RefreshCcw} tone="orange" />
        <MetricCard title="Return Pickups" value="14" note="Scheduled today" icon={Truck} tone="blue" />
        <MetricCard title="Received Back" value="22" note="Current month" icon={PackageCheck} tone="green" />
        <MetricCard title="RTO Rate" value="2.8%" note="Current month" icon={Activity} tone="violet" />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Return Shipment Queue</h2>
        <div className="mt-6 space-y-3">
          {shipments.slice(0, 4).map((shipment) => (
            <ShipmentListRow key={shipment.id} shipment={{ ...shipment, status: "RTO" }} />
          ))}
        </div>
      </section>
    </div>
  );
}

function RatesWorkspace() {
  const rates = [
    ["Delhivery", "Surface", "₹62", "₹24/kg", "2–4 days"],
    ["Blue Dart", "Express", "₹118", "₹42/kg", "1–2 days"],
    ["Ecom Express", "Surface", "₹58", "₹22/kg", "3–5 days"],
    ["Xpressbees", "Express", "₹74", "₹28/kg", "2–4 days"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Shipping Rates"
        description="Compare courier pricing, zones, weight slabs and service levels."
        buttonLabel="Add Rate Card"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Courier</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Base Rate</th>
                <th className="px-5 py-4">Additional Weight</th>
                <th className="px-5 py-4">SLA</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={`${rate[0]}-${rate[1]}`} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-slate-900">{rate[0]}</td>
                  <td className="px-5 py-4 text-slate-600">{rate[1]}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{rate[2]}</td>
                  <td className="px-5 py-4 text-slate-600">{rate[3]}</td>
                  <td className="px-5 py-4 text-slate-600">{rate[4]}</td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-xs font-bold text-blue-600">
                      Edit Rate
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

function ZonesWorkspace() {
  const zones = [
    ["Zone A", "Local", "0–200 km", "1–2 days", "₹58"],
    ["Zone B", "Regional", "200–500 km", "2–3 days", "₹72"],
    ["Zone C", "Metro", "Major metros", "2–4 days", "₹84"],
    ["Zone D", "National", "Rest of India", "3–6 days", "₹96"],
    ["Zone E", "Remote", "ODA locations", "5–8 days", "₹142"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Shipping Zones"
        description="Configure geographic coverage, service levels and zone-based charges."
        buttonLabel="Create Zone"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {zones.map((zone) => (
          <article key={zone[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <MapPin size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{zone[0]}</h3>
            <p className="mt-1 text-xs text-slate-500">{zone[1]}</p>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Coverage" value={zone[2]} />
              <InfoRow label="SLA" value={zone[3]} />
              <InfoRow label="Base Rate" value={zone[4]} />
            </div>
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
        title="Shipping Analytics"
        description="Monitor delivery rate, cost, speed, NDR, RTO and courier performance."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Delivery Success" value="96.4%" note="Current month" icon={CheckCircle2} tone="green" />
        <MetricCard title="Average Delivery" value="2.8 days" note="Across all couriers" icon={Clock3} tone="blue" />
        <MetricCard title="RTO Rate" value="2.8%" note="Below 3% target" icon={RefreshCcw} tone="violet" />
        <MetricCard title="Shipping Cost" value="₹1.82L" note="Current month" icon={CircleDollarSign} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Daily Shipment Volume"
          values={[58, 72, 66, 84, 92, 86, 104]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
        <ChartCard
          title="Courier Delivery Rate"
          values={couriers.map((courier) => courier.deliveryRate)}
          labels={couriers.map((courier) => courier.name.split(" ")[0])}
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
    ["Shipment Performance Report", "Volume, delivery, delays and SLA"],
    ["Courier Performance Report", "Success rate, speed, cost and coverage"],
    ["NDR & RTO Report", "Failed attempts, reasons and recovery"],
    ["Shipping Cost Report", "Courier, zone, weight and order cost"],
    ["COD Remittance Report", "Collections, settlements and pending amount"],
    ["Delivery Exception Report", "Delays, losses and unresolved events"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Shipping Reports"
        description="Generate and export delivery, courier, cost and exception reports."
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
    ["Courier Allocation", "Configure automatic courier selection by cost, SLA and coverage."],
    ["Shipping Labels", "Configure label size, fields, branding and print defaults."],
    ["Tracking Notifications", "Set email, SMS and WhatsApp delivery updates."],
    ["NDR Workflow", "Configure attempt rules, customer contact and escalation."],
    ["RTO Controls", "Set approval, reverse shipping and warehouse disposition rules."],
    ["COD Settlement", "Configure remittance cycles, reconciliation and alerts."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Shipping Settings"
        description="Configure courier selection, labels, tracking, NDR, RTO and settlement rules."
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

function CreateShipmentPanel({
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
              Shipping Operations
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Create Shipment
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Create a shipment and assign a courier partner.
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
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="City" placeholder="Delivery city" />
            <FormField label="PIN Code" placeholder="221001" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Weight" placeholder="1.5 kg" />
            <FormField label="Declared Value" placeholder="₹18,999" />
          </div>
          <FormField label="Courier Partner" placeholder="Select courier" />
          <FormField label="Service Type" placeholder="Surface / Express" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Shipment
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

function ShipmentStatusBadge({
  status,
}: {
  status: ShipmentStatus;
}) {
  const className =
    status === "Delivered"
      ? "bg-green-50 text-green-700"
      : status === "Delayed" || status === "RTO"
        ? "bg-red-50 text-red-700"
        : status === "Out for Delivery"
          ? "bg-violet-50 text-violet-700"
          : status === "In Transit"
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

function CourierStatusBadge({
  status,
}: {
  status: Courier["status"];
}) {
  const className =
    status === "Active"
      ? "bg-green-50 text-green-700"
      : status === "Limited"
        ? "bg-orange-50 text-orange-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function ManifestBadge({
  status,
}: {
  status: Manifest["status"];
}) {
  const className =
    status === "Dispatched"
      ? "bg-green-50 text-green-700"
      : status === "Closed"
        ? "bg-blue-50 text-blue-700"
        : "bg-orange-50 text-orange-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}