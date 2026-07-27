"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Download,
  FileBarChart,
  Layers3,
  MapPin,
  PackageCheck,
  PackageOpen,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Warehouse,
  X,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type WarehouseModule = {
  id: string;
  title: string;
  description: string;
  features: number;
  icon: IconType;
  metric: string;
  metricLabel: string;
};

type WorkspaceContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  statistics: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  workflows: Array<{
    title: string;
    description: string;
  }>;
};

const warehouseModules: WarehouseModule[] = [
  {
    id: "warehouse-dashboard",
    title: "Warehouse Dashboard",
    description:
      "Monitor warehouse capacity, operations, receiving, picking accuracy and dispatch performance.",
    features: 10,
    icon: BarChart3,
    metric: "3",
    metricLabel: "Active warehouses",
  },
  {
    id: "warehouses",
    title: "Warehouses",
    description:
      "Create and manage warehouse locations, codes, addresses and operating status.",
    features: 12,
    icon: Warehouse,
    metric: "3",
    metricLabel: "Active warehouses",
  },
  {
    id: "zones-bins",
    title: "Zones & Bins",
    description:
      "Configure warehouse zones, aisles, racks, shelves and storage bins.",
    features: 12,
    icon: MapPin,
    metric: "186",
    metricLabel: "Storage bins",
  },
  {
    id: "receiving",
    title: "Receiving",
    description:
      "Manage inbound deliveries, goods receipt, quantity checks and stock acceptance.",
    features: 11,
    icon: PackageOpen,
    metric: "12",
    metricLabel: "Receipts today",
  },
  {
    id: "put-away",
    title: "Put Away",
    description:
      "Assign received stock to optimised warehouse locations and bins.",
    features: 10,
    icon: Layers3,
    metric: "18",
    metricLabel: "Tasks pending",
  },
  {
    id: "picking",
    title: "Picking",
    description:
      "Manage pick lists, order allocation, picker assignment and quantity confirmation.",
    features: 12,
    icon: ClipboardCheck,
    metric: "42",
    metricLabel: "Pick tasks",
  },
  {
    id: "packing",
    title: "Packing",
    description:
      "Control package verification, dimensions, materials and shipment readiness.",
    features: 11,
    icon: Boxes,
    metric: "28",
    metricLabel: "Packing tasks",
  },
  {
    id: "dispatch",
    title: "Dispatch",
    description:
      "Manage shipment handover, manifests, courier assignment and dispatch completion.",
    features: 11,
    icon: Truck,
    metric: "16",
    metricLabel: "Ready to dispatch",
  },
  {
    id: "stock-transfers",
    title: "Stock Transfers",
    description:
      "Transfer stock between warehouses, zones and storage locations.",
    features: 12,
    icon: RefreshCw,
    metric: "7",
    metricLabel: "Open transfers",
  },
  {
    id: "cycle-counts",
    title: "Cycle Counts",
    description:
      "Schedule and perform warehouse stock counts and discrepancy review.",
    features: 10,
    icon: PackageCheck,
    metric: "9",
    metricLabel: "Counts scheduled",
  },
  {
    id: "quality-control",
    title: "Quality Control",
    description:
      "Inspect received, returned and damaged stock before warehouse acceptance.",
    features: 10,
    icon: ShieldCheck,
    metric: "6",
    metricLabel: "Checks pending",
  },
  {
    id: "warehouse-performance",
    title: "Warehouse Performance",
    description:
      "Analyse throughput, utilisation, productivity, accuracy and fulfilment speed.",
    features: 12,
    icon: BarChart3,
    metric: "98.7%",
    metricLabel: "Pick accuracy",
  },
  {
    id: "warehouse-reports",
    title: "Warehouse Reports",
    description:
      "Generate receiving, movement, stock, picking, packing and performance reports.",
    features: 10,
    icon: FileBarChart,
    metric: "14",
    metricLabel: "Report templates",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "warehouse-dashboard": {
    eyebrow: "Fulfilment Infrastructure",
    title: "Warehouse Dashboard",
    description:
      "Control receiving, locations, put away, picking, packing, dispatch, transfers, cycle counts, quality and warehouse performance.",
    primaryAction: "Receive Stock",
    secondaryAction: "Create Warehouse",
    statistics: [
      { label: "Active Warehouses", value: "3", note: "Across KRVE operations" },
      { label: "Storage Utilisation", value: "65%", note: "Across all locations" },
      { label: "Open Operations", value: "4", note: "Require processing" },
      { label: "Pick Accuracy", value: "98.7%", note: "Current month" },
    ],
    workflows: [
      {
        title: "Inbound Receiving",
        description:
          "Receive purchase orders, verify quantity and create goods receipts.",
      },
      {
        title: "Storage & Put Away",
        description:
          "Assign stock to warehouse zones, racks and bins.",
      },
      {
        title: "Picking & Packing",
        description:
          "Process order fulfilment with controlled picking and packing.",
      },
      {
        title: "Dispatch & Transfers",
        description:
          "Manage courier handover and inter-warehouse stock movement.",
      },
    ],
  },
  warehouses: {
    eyebrow: "Warehouse Administration",
    title: "Warehouses",
    description:
      "Create and manage KRVE warehouse locations, capacities, addresses and operational status.",
    primaryAction: "Create Warehouse",
    secondaryAction: "Export Directory",
    statistics: [
      { label: "Active Warehouses", value: "3", note: "All operational" },
      { label: "Total Capacity", value: "18,000", note: "Unit storage capacity" },
      { label: "Storage Used", value: "65%", note: "Across all warehouses" },
      { label: "Warehouse Managers", value: "3", note: "Fully assigned" },
    ],
    workflows: [
      {
        title: "Warehouse Profile",
        description:
          "Manage code, address, contact, capacity and status.",
      },
      {
        title: "Location Structure",
        description:
          "Configure zones, aisles, racks, shelves and bins.",
      },
      {
        title: "Operational Ownership",
        description:
          "Assign managers, teams and warehouse responsibilities.",
      },
      {
        title: "Warehouse Lifecycle",
        description:
          "Activate, suspend or close warehouse locations with audit history.",
      },
    ],
  },
  receiving: {
    eyebrow: "Inbound Operations",
    title: "Receiving",
    description:
      "Manage inbound stock, goods receipt, quantity verification and warehouse acceptance.",
    primaryAction: "Receive Stock",
    secondaryAction: "View Purchase Orders",
    statistics: [
      { label: "Receipts Today", value: "12", note: "Across all warehouses" },
      { label: "Units Received", value: "142", note: "Current day" },
      { label: "Pending Inspection", value: "6", note: "Quality checks" },
      { label: "Receiving Accuracy", value: "99.2%", note: "Current month" },
    ],
    workflows: [
      {
        title: "Purchase Order Matching",
        description:
          "Match incoming deliveries with approved purchase orders.",
      },
      {
        title: "Quantity Verification",
        description:
          "Confirm received quantity, shortages and excess units.",
      },
      {
        title: "Quality Inspection",
        description:
          "Inspect condition and accept or reject stock.",
      },
      {
        title: "Goods Receipt",
        description:
          "Create receipt records and move accepted stock to put away.",
      },
    ],
  },
  picking: {
    eyebrow: "Order Fulfilment",
    title: "Picking",
    description:
      "Manage order pick lists, picker assignment, stock confirmation and fulfilment accuracy.",
    primaryAction: "Create Pick List",
    secondaryAction: "Assign Picker",
    statistics: [
      { label: "Pick Tasks", value: "42", note: "Current queue" },
      { label: "In Progress", value: "18", note: "Assigned to pickers" },
      { label: "Completed Today", value: "86", note: "Across warehouses" },
      { label: "Pick Accuracy", value: "98.7%", note: "Current month" },
    ],
    workflows: [
      {
        title: "Wave Planning",
        description:
          "Group orders and create efficient picking waves.",
      },
      {
        title: "Picker Assignment",
        description:
          "Assign tasks based on warehouse and zone.",
      },
      {
        title: "Quantity Confirmation",
        description:
          "Confirm picked SKU and quantity against the order.",
      },
      {
        title: "Packing Handover",
        description:
          "Move completed picks to controlled packing operations.",
      },
    ],
  },
};

export default function WarehouseManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return warehouseModules;
    }

    return warehouseModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    warehouseModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <WarehouseWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onReceive={() => setShowReceiveModal(true)}
          onCreate={() => setShowCreateModal(true)}
        />

        {showReceiveModal && (
          <ReceiveStockModal onClose={() => setShowReceiveModal(false)} />
        )}

        {showCreateModal && (
          <CreateWarehouseModal onClose={() => setShowCreateModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#172554] p-7 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <Warehouse size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                  Fulfilment Infrastructure
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Warehouse Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Control receiving, locations, put away, picking, packing, dispatch,
                transfers, cycle counts, quality and warehouse performance across KRVE.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowReceiveModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <PackageOpen size={18} />
                Receive Stock
              </button>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                <Plus size={18} />
                Create Warehouse
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Active Warehouses"
            value="3"
            description="Across KRVE operations"
            icon={Warehouse}
            iconClassName="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            title="Storage Utilisation"
            value="65%"
            description="Across all locations"
            icon={Layers3}
            iconClassName="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            title="Open Operations"
            value="4"
            description="Require processing"
            icon={Clock3}
            iconClassName="bg-violet-50 text-violet-600"
          />
          <SummaryCard
            title="Pick Accuracy"
            value="98.7%"
            description="Current month"
            icon={BadgeCheck}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                Warehouse Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Fulfilment Operations Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete warehouse and fulfilment workflow.
              </p>
            </div>

            <div className="relative w-full xl:w-[330px]">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search warehouse modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <WarehouseModuleCard
                key={module.id}
                module={module}
                onOpen={() => setActiveModuleId(module.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {showReceiveModal && (
        <ReceiveStockModal onClose={() => setShowReceiveModal(false)} />
      )}

      {showCreateModal && (
        <CreateWarehouseModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: string;
  description: string;
  icon: IconType;
  iconClassName: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${iconClassName}`}>
        <Icon size={20} />
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-3 text-xs text-slate-400">{description}</p>
    </article>
  );
}

function WarehouseModuleCard({
  module,
  onOpen,
}: {
  module: WarehouseModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <article className="group flex min-h-[255px] flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          <Icon size={21} />
        </div>

        <div className="text-right">
          <p className="text-lg font-black text-slate-950">{module.metric}</p>
          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            {module.metricLabel}
          </p>
        </div>
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">{module.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">{module.description}</p>

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-xs font-bold text-slate-400">
          {module.features} features
        </span>

        <button
          type="button"
          onClick={onOpen}
          className="flex items-center gap-2 text-sm font-black text-blue-600 transition group-hover:gap-3"
        >
          Open
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

function WarehouseWorkspace({
  module,
  onBack,
  onReceive,
  onCreate,
}: {
  module: WarehouseModule;
  onBack: () => void;
  onReceive: () => void;
  onCreate: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Fulfilment Infrastructure",
      title: module.title,
      description: module.description,
      primaryAction: "Receive Stock",
      secondaryAction: "Create Warehouse",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current warehouse status",
        },
        { label: "Open Tasks", value: "4", note: "Require processing" },
        { label: "Completed Today", value: "86", note: "Across warehouses" },
        { label: "Operational Health", value: "98%", note: "Within target" },
      ],
      workflows: [
        {
          title: "Warehouse Configuration",
          description:
            "Manage locations, zones, bins and operating controls.",
        },
        {
          title: "Operational Workflow",
          description:
            "Process receiving, put away, picking, packing and dispatch.",
        },
        {
          title: "Quality & Accuracy",
          description:
            "Review stock, cycle counts and warehouse discrepancies.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate reports and retain complete warehouse history.",
        },
      ],
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeft size={17} />
        Back to Warehouse
      </button>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#172554] p-7 text-white shadow-xl sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={23} />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                {content.eyebrow}
              </p>
            </div>

            <h1 className="mt-6 text-3xl font-black sm:text-4xl">
              {content.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              {content.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onReceive}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <PackageOpen size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onCreate}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              <Plus size={17} />
              {content.secondaryAction}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {content.statistics.map((statistic, index) => (
          <article
            key={statistic.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div
              className={`grid h-11 w-11 place-items-center rounded-xl ${
                index === 0
                  ? "bg-blue-50 text-blue-600"
                  : index === 1
                    ? "bg-emerald-50 text-emerald-600"
                    : index === 2
                      ? "bg-violet-50 text-violet-600"
                      : "bg-orange-50 text-orange-600"
              }`}
            >
              <Icon size={20} />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              {statistic.label}
            </p>
            <p className="mt-1 text-3xl font-black text-slate-950">
              {statistic.value}
            </p>
            <p className="mt-3 text-xs text-slate-400">{statistic.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
            Operational Workspace
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {module.title} Workflows
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.workflows.map((workflow, index) => (
              <div
                key={workflow.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950">{workflow.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {workflow.description}
                    </p>

                    <button
                      type="button"
                      className="mt-4 flex items-center gap-2 text-xs font-black text-blue-600"
                    >
                      Open Workflow
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600">
              <Sparkles size={22} />
            </div>

            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
              AI Active
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black">
            KRVE AI Warehouse Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Warehouse operations are healthy. Put-away and receiving queues
            require attention while pick accuracy remains strong.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Storage utilisation" value="65%" />
            <InsightRow label="Open operations" value="4" />
            <InsightRow label="Pick accuracy" value="98.7%" />
            <InsightRow label="Active warehouses" value="3" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Generate Warehouse Analysis
            <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
  );
}

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

function ReceiveStockModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Receive Stock"
      description="Create a controlled warehouse goods receipt."
      icon={PackageOpen}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Warehouse"
            options={[
              "Central Warehouse",
              "North Warehouse",
              "Returns Warehouse",
            ]}
          />

          <SelectField
            label="Purchase Order"
            options={[
              "PO-2026-0018",
              "PO-2026-0019",
              "PO-2026-0020",
            ]}
          />

          <FormField
            label="Supplier"
            placeholder="Enter supplier name"
          />

          <FormField
            label="Delivery Reference"
            placeholder="Invoice or challan number"
          />

          <FormField
            label="Received Date"
            placeholder=""
            type="date"
          />

          <SelectField
            label="Receiving Status"
            options={[
              "Pending Inspection",
              "Accepted",
              "Partially Accepted",
              "Rejected",
            ]}
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-black text-slate-700">
            Receiving Notes
          </label>

          <textarea
            rows={4}
            placeholder="Enter quantity, condition or discrepancy notes"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <p className="text-sm leading-6 text-blue-700">
              Received stock should be matched with the purchase order and inspected before put away.
            </p>
          </div>
        </div>

        {saved && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <p className="text-sm font-bold text-emerald-700">
              Stock receipt created successfully.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => setSaved(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <PackageOpen size={17} />
          Save Receipt
        </button>
      </div>
    </ModalShell>
  );
}

function CreateWarehouseModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Create Warehouse"
      description="Create a new KRVE warehouse location."
      icon={Warehouse}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Warehouse Name"
            placeholder="Enter warehouse name"
          />

          <FormField
            label="Warehouse Code"
            placeholder="Example: WH-DEL-01"
          />

          <FormField
            label="Address"
            placeholder="Enter warehouse address"
          />

          <FormField
            label="City & State"
            placeholder="Enter city and state"
          />

          <FormField
            label="Storage Capacity"
            placeholder="Enter unit capacity"
            type="number"
          />

          <SelectField
            label="Warehouse Type"
            options={[
              "Primary Fulfilment",
              "Regional Warehouse",
              "Returns Warehouse",
              "Transit Warehouse",
            ]}
          />

          <FormField
            label="Warehouse Manager"
            placeholder="Enter manager name"
          />

          <SelectField
            label="Status"
            options={[
              "Active",
              "Draft",
              "Inactive",
            ]}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-orange-600"
            />

            <p className="text-sm leading-6 text-orange-700">
              Create zones and bins after the warehouse profile is saved.
            </p>
          </div>
        </div>

        {saved && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <p className="text-sm font-bold text-emerald-700">
              Warehouse created successfully.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => setSaved(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          Create Warehouse
        </button>
      </div>
    </ModalShell>
  );
}

function ModalShell({
  title,
  description,
  icon: Icon,
  onClose,
  children,
  maxWidth = "max-w-3xl",
}: {
  title: string;
  description: string;
  icon: IconType;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${maxWidth} overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#172554] px-6 py-5 text-white">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <Icon size={21} />
            </div>

            <div>
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-blue-100">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>

      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>

      <select className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}