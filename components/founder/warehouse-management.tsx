"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  FileBarChart,
  Filter,
  Forklift,
  History,
  Layers3,
  MapPin,
  Package,
  PackageCheck,
  PackageOpen,
  PackagePlus,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Warehouse,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type WarehouseTab =
  | "dashboard"
  | "warehouses"
  | "locations"
  | "receiving"
  | "put-away"
  | "picking"
  | "packing"
  | "dispatch"
  | "transfers"
  | "cycle-count"
  | "quality"
  | "employees"
  | "equipment"
  | "analytics"
  | "reports"
  | "settings";

type WarehouseStatus = "Operational" | "Busy" | "Maintenance";
type TaskStatus = "Pending" | "In Progress" | "Completed" | "Blocked";
type Priority = "High" | "Medium" | "Low";

type WarehouseRecord = {
  id: string;
  name: string;
  code: string;
  city: string;
  manager: string;
  capacity: number;
  used: number;
  zones: number;
  bins: number;
  team: number;
  status: WarehouseStatus;
};

type OperationRecord = {
  id: string;
  type: string;
  reference: string;
  warehouse: string;
  quantity: number;
  owner: string;
  createdAt: string;
  status: TaskStatus;
  priority: Priority;
};

type ZoneRecord = {
  id: string;
  warehouse: string;
  zone: string;
  type: string;
  capacity: number;
  used: number;
  bins: number;
  temperature: string;
  status: "Available" | "Near Capacity" | "Full";
};

const tabs: Array<{
  id: WarehouseTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "warehouses", label: "Warehouses", icon: Warehouse },
  { id: "locations", label: "Zones & Bins", icon: MapPin },
  { id: "receiving", label: "Receiving", icon: PackagePlus },
  { id: "put-away", label: "Put Away", icon: PackageOpen },
  { id: "picking", label: "Picking", icon: ClipboardCheck },
  { id: "packing", label: "Packing", icon: PackageCheck },
  { id: "dispatch", label: "Dispatch", icon: Truck },
  { id: "transfers", label: "Transfers", icon: ArrowRight },
  { id: "cycle-count", label: "Cycle Count", icon: RefreshCcw },
  { id: "quality", label: "Quality", icon: ShieldCheck },
  { id: "employees", label: "Employees", icon: Users },
  { id: "equipment", label: "Equipment", icon: Forklift },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const warehouses: WarehouseRecord[] = [
  {
    id: "WH-001",
    name: "KRVE Central Warehouse",
    code: "KRV-CWH",
    city: "Varanasi",
    manager: "Aman Verma",
    capacity: 12000,
    used: 7840,
    zones: 12,
    bins: 486,
    team: 32,
    status: "Operational",
  },
  {
    id: "WH-002",
    name: "Delhi Fulfilment Center",
    code: "KRV-DFC",
    city: "New Delhi",
    manager: "Rohit Singh",
    capacity: 8500,
    used: 6210,
    zones: 9,
    bins: 364,
    team: 26,
    status: "Busy",
  },
  {
    id: "WH-003",
    name: "Mumbai Distribution Hub",
    code: "KRV-MDH",
    city: "Mumbai",
    manager: "Nikhil Sharma",
    capacity: 10000,
    used: 5890,
    zones: 10,
    bins: 402,
    team: 29,
    status: "Operational",
  },
];

const operations: OperationRecord[] = [
  {
    id: "RCV-2026-0842",
    type: "Receiving",
    reference: "PO-2026-0249",
    warehouse: "KRVE Central Warehouse",
    quantity: 120,
    owner: "Aman Verma",
    createdAt: "26 Jul 2026, 12:42 AM",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "PCK-2026-1984",
    type: "Picking",
    reference: "BATCH-1048",
    warehouse: "Delhi Fulfilment Center",
    quantity: 48,
    owner: "Rohit Singh",
    createdAt: "26 Jul 2026, 12:18 AM",
    status: "Pending",
    priority: "High",
  },
  {
    id: "PAK-2026-1762",
    type: "Packing",
    reference: "BATCH-1046",
    warehouse: "Mumbai Distribution Hub",
    quantity: 36,
    owner: "Nikhil Sharma",
    createdAt: "25 Jul 2026, 11:56 PM",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "DSP-2026-1486",
    type: "Dispatch",
    reference: "MANIFEST-382",
    warehouse: "KRVE Central Warehouse",
    quantity: 64,
    owner: "Aman Verma",
    createdAt: "25 Jul 2026, 11:25 PM",
    status: "Completed",
    priority: "Medium",
  },
  {
    id: "CC-2026-0291",
    type: "Cycle Count",
    reference: "ZONE-C-04",
    warehouse: "Delhi Fulfilment Center",
    quantity: 214,
    owner: "Inventory Audit",
    createdAt: "25 Jul 2026, 10:48 PM",
    status: "Blocked",
    priority: "High",
  },
];

const zones: ZoneRecord[] = [
  {
    id: "ZN-001",
    warehouse: "KRVE Central Warehouse",
    zone: "A - Premium Apparel",
    type: "Apparel",
    capacity: 2200,
    used: 1680,
    bins: 86,
    temperature: "Ambient",
    status: "Available",
  },
  {
    id: "ZN-002",
    warehouse: "KRVE Central Warehouse",
    zone: "B - Footwear",
    type: "Footwear",
    capacity: 1800,
    used: 1662,
    bins: 72,
    temperature: "Ambient",
    status: "Near Capacity",
  },
  {
    id: "ZN-003",
    warehouse: "Delhi Fulfilment Center",
    zone: "C - Fast Moving",
    type: "Fast Moving",
    capacity: 1500,
    used: 1490,
    bins: 64,
    temperature: "Ambient",
    status: "Full",
  },
  {
    id: "ZN-004",
    warehouse: "Mumbai Distribution Hub",
    zone: "D - Accessories",
    type: "Accessories",
    capacity: 1300,
    used: 740,
    bins: 58,
    temperature: "Climate Controlled",
    status: "Available",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatPercent(value: number, total: number) {
  return Math.round((value / total) * 100);
}

export default function WarehouseManagement() {
  const [activeTab, setActiveTab] = useState<WarehouseTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const filteredOperations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return operations;
    }

    return operations.filter((item) =>
      `${item.id} ${item.type} ${item.reference} ${item.warehouse} ${item.owner}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  const totalCapacity = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.capacity,
    0,
  );

  const usedCapacity = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.used,
    0,
  );

  const pendingOperations = operations.filter(
    (operation) =>
      operation.status === "Pending" ||
      operation.status === "In Progress" ||
      operation.status === "Blocked",
  ).length;

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <WarehouseHeader
        activeTab={activeTab}
        onOpenTab={setActiveTab}
        onCreate={() => setShowCreatePanel(true)}
      />

      <WarehouseTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace
          totalCapacity={totalCapacity}
          usedCapacity={usedCapacity}
          pendingOperations={pendingOperations}
          onOpenTab={setActiveTab}
        />
      )}

      {activeTab === "warehouses" && (
        <WarehousesWorkspace onCreate={() => setShowCreatePanel(true)} />
      )}

      {activeTab === "locations" && <LocationsWorkspace />}

      {[
        "receiving",
        "put-away",
        "picking",
        "packing",
        "dispatch",
        "transfers",
        "cycle-count",
        "quality",
      ].includes(activeTab) && (
        <OperationsWorkspace
          activeTab={activeTab}
          search={search}
          setSearch={setSearch}
          operations={filteredOperations}
        />
      )}

      {activeTab === "employees" && <EmployeesWorkspace />}

      {activeTab === "equipment" && <EquipmentWorkspace />}

      {activeTab === "analytics" && (
        <AnalyticsWorkspace
          totalCapacity={totalCapacity}
          usedCapacity={usedCapacity}
        />
      )}

      {activeTab === "reports" && <ReportsWorkspace />}

      {activeTab === "settings" && <SettingsWorkspace />}

      {showCreatePanel && (
        <CreateWarehousePanel onClose={() => setShowCreatePanel(false)} />
      )}
    </div>
  );
}

function WarehouseHeader({
  activeTab,
  onOpenTab,
  onCreate,
}: {
  activeTab: WarehouseTab;
  onOpenTab: (tab: WarehouseTab) => void;
  onCreate: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <Warehouse size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Fulfilment Infrastructure
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Warehouse Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Control receiving, locations, put away, picking, packing,
            dispatch, transfers, cycle counts, quality and warehouse
            performance across KRVE.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("receiving")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <PackagePlus size={17} />
            Receive Stock
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Create Warehouse
          </button>
        </div>
      </div>
    </section>
  );
}

function WarehouseTabBar({
  activeTab,
  onChange,
}: {
  activeTab: WarehouseTab;
  onChange: (tab: WarehouseTab) => void;
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
  totalCapacity,
  usedCapacity,
  pendingOperations,
  onOpenTab,
}: {
  totalCapacity: number;
  usedCapacity: number;
  pendingOperations: number;
  onOpenTab: (tab: WarehouseTab) => void;
}) {
  const utilisation = formatPercent(usedCapacity, totalCapacity);

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Active Warehouses"
          value="3"
          note="All locations connected"
          icon={Warehouse}
          tone="blue"
        />
        <MetricCard
          title="Storage Utilisation"
          value={`${utilisation}%`}
          note={`${formatNumber(usedCapacity)} of ${formatNumber(totalCapacity)} units`}
          icon={Layers3}
          tone="green"
        />
        <MetricCard
          title="Open Operations"
          value={String(pendingOperations)}
          note="Across receiving to dispatch"
          icon={Clock3}
          tone="violet"
        />
        <MetricCard
          title="Pick Accuracy"
          value="98.7%"
          note="Last 30 days"
          icon={CheckCircle2}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Warehouse Network
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Capacity, team and operating status
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("warehouses")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Manage Warehouses
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {warehouses.map((warehouse) => (
              <WarehouseSummaryCard key={warehouse.id} warehouse={warehouse} />
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
            KRVE AI Warehouse Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI monitors capacity, queue pressure, picking accuracy,
            bottlenecks and labour allocation.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Capacity warning"
              detail="Delhi Fast Moving zone is at 99% capacity."
              tone="orange"
            />
            <InsightCard
              title="Picking opportunity"
              detail="Reassigning 2 operators can reduce the current pick queue by 34 minutes."
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Warehouse Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Live Operation Queue
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current tasks across the warehouse network
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("receiving")}
              className="text-sm font-bold text-blue-600"
            >
              Open Queue
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {operations.slice(0, 5).map((operation) => (
              <OperationListRow key={operation.id} operation={operation} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Warehouse Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily operational workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Receiving"
              description="Receive and verify inbound stock"
              icon={PackagePlus}
              onClick={() => onOpenTab("receiving")}
            />
            <QuickAction
              title="Put Away"
              description="Assign stock to storage locations"
              icon={PackageOpen}
              onClick={() => onOpenTab("put-away")}
            />
            <QuickAction
              title="Picking"
              description="Create and manage picking waves"
              icon={ClipboardCheck}
              onClick={() => onOpenTab("picking")}
            />
            <QuickAction
              title="Dispatch"
              description="Prepare manifests and dispatch loads"
              icon={Truck}
              onClick={() => onOpenTab("dispatch")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Zone Capacity & Exceptions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Live capacity status for critical zones
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("locations")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Manage Locations
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-4 font-semibold">Zone</th>
                <th className="pb-4 font-semibold">Warehouse</th>
                <th className="pb-4 font-semibold">Type</th>
                <th className="pb-4 font-semibold">Bins</th>
                <th className="pb-4 font-semibold">Capacity</th>
                <th className="pb-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {zones.map((zone) => (
                <tr key={zone.id} className="border-b border-slate-100 text-sm">
                  <td className="py-4 font-bold text-slate-900">{zone.zone}</td>
                  <td className="py-4 text-slate-600">{zone.warehouse}</td>
                  <td className="py-4 text-slate-600">{zone.type}</td>
                  <td className="py-4 font-bold text-slate-900">{zone.bins}</td>
                  <td className="py-4">
                    <div className="w-40">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-slate-500">
                          {formatNumber(zone.used)} / {formatNumber(zone.capacity)}
                        </span>
                        <strong className="text-slate-800">
                          {formatPercent(zone.used, zone.capacity)}%
                        </strong>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            zone.status === "Full"
                              ? "bg-red-500"
                              : zone.status === "Near Capacity"
                                ? "bg-orange-500"
                                : "bg-green-600"
                          }`}
                          style={{
                            width: `${formatPercent(zone.used, zone.capacity)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <StatusBadge status={zone.status} />
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

function WarehouseSummaryCard({
  warehouse,
}: {
  warehouse: WarehouseRecord;
}) {
  const usage = formatPercent(warehouse.used, warehouse.capacity);

  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Warehouse size={20} />
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
            warehouse.status === "Busy"
              ? "bg-orange-50 text-orange-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {warehouse.status}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">
        {warehouse.name}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {warehouse.city} · {warehouse.code}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-slate-500">Capacity usage</span>
          <strong className="text-slate-900">{usage}%</strong>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${usage}%` }}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <MiniStat label="Zones" value={warehouse.zones} />
        <MiniStat label="Bins" value={warehouse.bins} />
        <MiniStat label="Team" value={warehouse.team} />
      </div>
    </article>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <strong className="block text-sm text-slate-900">{value}</strong>
      <span className="mt-1 block text-[10px] text-slate-500">{label}</span>
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

function OperationListRow({
  operation,
}: {
  operation: OperationRecord;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Package size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {operation.type} · {operation.reference}
          </strong>
          <span className="text-xs text-slate-400">{operation.createdAt}</span>
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">
          {operation.warehouse} · {operation.quantity} units · {operation.owner}
        </p>
      </div>

      <TaskBadge status={operation.status} />
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

function WarehousesWorkspace({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Warehouse Directory"
        description="Manage all warehouse locations, capacity, teams and operating status."
        buttonLabel="Create Warehouse"
        onClick={onCreate}
      />

      <section className="grid gap-5 xl:grid-cols-3">
        {warehouses.map((warehouse) => (
          <WarehouseDetailCard key={warehouse.id} warehouse={warehouse} />
        ))}
      </section>
    </div>
  );
}

function WarehouseDetailCard({
  warehouse,
}: {
  warehouse: WarehouseRecord;
}) {
  const usage = formatPercent(warehouse.used, warehouse.capacity);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Building2 size={22} />
        </div>
        <TaskBadge status={warehouse.status === "Busy" ? "In Progress" : "Completed"} />
      </div>

      <h2 className="mt-5 text-lg font-black text-slate-950">{warehouse.name}</h2>
      <p className="mt-1 text-sm text-slate-500">
        {warehouse.city} · {warehouse.code}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <InfoBox label="Manager" value={warehouse.manager} />
        <InfoBox label="Team" value={`${warehouse.team} employees`} />
        <InfoBox label="Zones" value={String(warehouse.zones)} />
        <InfoBox label="Bins" value={String(warehouse.bins)} />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-slate-500">Storage utilisation</span>
          <strong className="text-slate-900">{usage}%</strong>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${usage}%` }} />
        </div>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        Open Warehouse
        <ArrowRight size={16} />
      </button>
    </article>
  );
}

function LocationsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Zones, Racks & Bin Locations"
        description="Manage physical storage structure, capacity and location status."
        buttonLabel="Create Location"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Warehouse</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Bins</th>
                <th className="px-5 py-4">Temperature</th>
                <th className="px-5 py-4">Usage</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-slate-900">{zone.zone}</td>
                  <td className="px-5 py-4 text-slate-600">{zone.warehouse}</td>
                  <td className="px-5 py-4 text-slate-600">{zone.type}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{zone.bins}</td>
                  <td className="px-5 py-4 text-slate-600">{zone.temperature}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {formatPercent(zone.used, zone.capacity)}%
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={zone.status} />
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

function OperationsWorkspace({
  activeTab,
  search,
  setSearch,
  operations,
}: {
  activeTab: WarehouseTab;
  search: string;
  setSearch: (value: string) => void;
  operations: OperationRecord[];
}) {
  const titleMap: Record<string, string> = {
    receiving: "Receiving Operations",
    "put-away": "Put Away Operations",
    picking: "Picking Operations",
    packing: "Packing Operations",
    dispatch: "Dispatch Operations",
    transfers: "Warehouse Transfers",
    "cycle-count": "Cycle Count",
    quality: "Quality Inspection",
  };

  const filtered = operations.filter((item) => {
    if (activeTab === "receiving") return item.type === "Receiving";
    if (activeTab === "picking") return item.type === "Picking";
    if (activeTab === "packing") return item.type === "Packing";
    if (activeTab === "dispatch") return item.type === "Dispatch";
    if (activeTab === "cycle-count") return item.type === "Cycle Count";
    return true;
  });

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title={titleMap[activeTab] ?? "Warehouse Operations"}
        description="Create, assign, monitor and complete warehouse operational tasks."
        buttonLabel="Create Operation"
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search operation, reference or owner..."
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
          <table className="w-full min-w-[1050px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Operation</th>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Warehouse</th>
                <th className="px-5 py-4">Quantity</th>
                <th className="px-5 py-4">Owner</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Created</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((operation) => (
                <tr key={operation.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">
                    {operation.id}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{operation.reference}</td>
                  <td className="px-5 py-4 text-slate-600">{operation.warehouse}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {operation.quantity}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{operation.owner}</td>
                  <td className="px-5 py-4">
                    <PriorityBadge priority={operation.priority} />
                  </td>
                  <td className="px-5 py-4">
                    <TaskBadge status={operation.status} />
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {operation.createdAt}
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

function EmployeesWorkspace() {
  const employees = [
    ["Aman Verma", "Warehouse Manager", "Central Warehouse", "Present", "98%"],
    ["Rohit Singh", "Fulfilment Manager", "Delhi Center", "Present", "96%"],
    ["Nikhil Sharma", "Distribution Manager", "Mumbai Hub", "Present", "97%"],
    ["Pawan Kumar", "Picker", "Central Warehouse", "On Break", "94%"],
    ["Sahil Khan", "Packer", "Delhi Center", "Present", "95%"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Warehouse Employees"
        description="Manage warehouse teams, shifts, attendance, productivity and assignments."
        buttonLabel="Assign Employee"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Employee</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Productivity</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee[0]} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-slate-900">{employee[0]}</td>
                  <td className="px-5 py-4 text-slate-600">{employee[1]}</td>
                  <td className="px-5 py-4 text-slate-600">{employee[2]}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      {employee[3]}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-900">{employee[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function EquipmentWorkspace() {
  const equipment = [
    ["EQ-001", "Electric Forklift", "Central Warehouse", "Available", "15 Aug 2026"],
    ["EQ-002", "Hand Pallet Truck", "Delhi Center", "In Use", "2 Sep 2026"],
    ["EQ-003", "Barcode Scanner Set", "Mumbai Hub", "Available", "18 Aug 2026"],
    ["EQ-004", "Packing Machine", "Central Warehouse", "Maintenance", "27 Jul 2026"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Warehouse Equipment"
        description="Manage forklifts, scanners, packing machines and maintenance schedules."
        buttonLabel="Add Equipment"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {equipment.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Forklift size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[1]}</h3>
            <p className="mt-1 text-xs text-slate-500">{item[0]}</p>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Location" value={item[2]} />
              <InfoRow label="Status" value={item[3]} />
              <InfoRow label="Maintenance" value={item[4]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function AnalyticsWorkspace({
  totalCapacity,
  usedCapacity,
}: {
  totalCapacity: number;
  usedCapacity: number;
}) {
  const utilisation = formatPercent(usedCapacity, totalCapacity);

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Warehouse Analytics"
        description="Monitor capacity, throughput, accuracy, cycle time and operational performance."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Network Utilisation" value={`${utilisation}%`} note="Across all warehouses" icon={Layers3} tone="blue" />
        <MetricCard title="Receiving Accuracy" value="99.2%" note="Last 30 days" icon={PackagePlus} tone="green" />
        <MetricCard title="Average Pick Time" value="8m 42s" note="Per order batch" icon={ClipboardCheck} tone="violet" />
        <MetricCard title="Dispatch SLA" value="96.8%" note="Within committed time" icon={Truck} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Daily Throughput"
          values={[48, 64, 58, 72, 84, 76, 92]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
        <ChartCard
          title="Warehouse Capacity"
          values={warehouses.map((warehouse) =>
            formatPercent(warehouse.used, warehouse.capacity),
          )}
          labels={warehouses.map((warehouse) => warehouse.code)}
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
    ["Warehouse Performance Report", "Capacity, throughput, accuracy and SLA"],
    ["Receiving & Put Away Report", "Inbound volumes, verification and storage"],
    ["Picking & Packing Report", "Productivity, errors and cycle time"],
    ["Dispatch Report", "Manifests, loads, couriers and delivery handover"],
    ["Cycle Count Report", "Counts, variances and adjustments"],
    ["Quality Inspection Report", "Rejected, damaged and approved stock"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Warehouse Reports"
        description="Generate and export operational, capacity, productivity and audit reports."
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
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Warehouse Settings"
        description="Configure numbering, capacity rules, workflows, approvals and operational defaults."
        buttonLabel="Save Configuration"
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {[
          ["Warehouse Numbering", "Configure warehouse, zone, bin and task numbering series."],
          ["Capacity Rules", "Set capacity thresholds, warning levels and overflow rules."],
          ["Receiving Workflow", "Define verification, quality and put-away requirements."],
          ["Picking Strategy", "Configure FIFO, FEFO, wave and priority picking."],
          ["Dispatch Controls", "Set manifest, loading, approval and handover rules."],
          ["Audit & Cycle Count", "Configure count frequency, tolerances and approval levels."],
        ].map((setting) => (
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

function CreateWarehousePanel({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-slate-950/50 backdrop-blur-sm">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close panel" />

      <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
              Warehouse Setup
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Create Warehouse
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Add a new warehouse or fulfilment location.
            </p>
          </div>

          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200">
            <X size={18} />
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); onClose(); }}>
          <FormField label="Warehouse Name" placeholder="KRVE Regional Warehouse" />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Warehouse Code" placeholder="KRV-RWH" />
            <FormField label="City" placeholder="City" />
          </div>
          <FormField label="Manager" placeholder="Select or enter manager" />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Capacity" placeholder="10000" />
            <FormField label="Initial Zones" placeholder="8" />
          </div>
          <FormField label="Address" placeholder="Complete warehouse address" />

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700">
            <Plus size={17} />
            Create Warehouse
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

function StatusBadge({
  status,
}: {
  status: "Available" | "Near Capacity" | "Full";
}) {
  const className =
    status === "Full"
      ? "bg-red-50 text-red-700"
      : status === "Near Capacity"
        ? "bg-orange-50 text-orange-700"
        : "bg-green-50 text-green-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function TaskBadge({
  status,
}: {
  status: TaskStatus;
}) {
  const className =
    status === "Completed"
      ? "bg-green-50 text-green-700"
      : status === "Blocked"
        ? "bg-red-50 text-red-700"
        : status === "In Progress"
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