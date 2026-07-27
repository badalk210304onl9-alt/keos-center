"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Box,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileBarChart,
  PackageCheck,
  PackageOpen,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  WalletCards,
  X,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type OrderModule = {
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

const orderModules: OrderModule[] = [
  {
    id: "orders-dashboard",
    title: "Orders Dashboard",
    description:
      "Monitor order volume, revenue, fulfilment, payment issues and delivery performance.",
    features: 10,
    icon: ShoppingBag,
    metric: "8",
    metricLabel: "Total orders",
  },
  {
    id: "all-orders",
    title: "All Orders",
    description:
      "View, search, filter and manage orders across all commerce channels.",
    features: 12,
    icon: PackageOpen,
    metric: "8",
    metricLabel: "Current orders",
  },
  {
    id: "order-processing",
    title: "Order Processing",
    description:
      "Manage order confirmation, verification, allocation and processing queues.",
    features: 11,
    icon: ClipboardCheck,
    metric: "6",
    metricLabel: "Open orders",
  },
  {
    id: "payments",
    title: "Payments",
    description:
      "Track paid, pending, failed, refunded and partially paid orders.",
    features: 12,
    icon: WalletCards,
    metric: "₹1,03,993",
    metricLabel: "Order revenue",
  },
  {
    id: "fulfilment",
    title: "Fulfilment",
    description:
      "Manage picking, packing, warehouse allocation and fulfilment status.",
    features: 12,
    icon: Box,
    metric: "6",
    metricLabel: "Awaiting fulfilment",
  },
  {
    id: "shipping",
    title: "Shipping",
    description:
      "Create shipments, assign couriers, generate labels and track dispatch.",
    features: 11,
    icon: Truck,
    metric: "4",
    metricLabel: "Ready to ship",
  },
  {
    id: "delivery",
    title: "Delivery Tracking",
    description:
      "Monitor in-transit, out-for-delivery, delivered and delayed shipments.",
    features: 10,
    icon: PackageCheck,
    metric: "1",
    metricLabel: "Fulfilled",
  },
  {
    id: "returns-refunds",
    title: "Returns & Refunds",
    description:
      "Manage return requests, reverse pickup, inspection and refund processing.",
    features: 12,
    icon: RotateCcw,
    metric: "2",
    metricLabel: "Open returns",
  },
  {
    id: "order-invoices",
    title: "Order Invoices",
    description:
      "Generate tax invoices, credit notes, receipts and order documents.",
    features: 10,
    icon: FileBarChart,
    metric: "7",
    metricLabel: "Invoices generated",
  },
  {
    id: "customer-communication",
    title: "Customer Communication",
    description:
      "Send order confirmations, shipping updates, delays and refund notifications.",
    features: 10,
    icon: Send,
    metric: "26",
    metricLabel: "Messages sent",
  },
  {
    id: "payment-issues",
    title: "Payment Issues",
    description:
      "Review failed payments, gateway errors, duplicate charges and reconciliation issues.",
    features: 9,
    icon: AlertTriangle,
    metric: "2",
    metricLabel: "Require attention",
  },
  {
    id: "order-analytics",
    title: "Order Analytics",
    description:
      "Analyse order value, channel performance, fulfilment time and return rate.",
    features: 12,
    icon: FileBarChart,
    metric: "₹12,999",
    metricLabel: "Average order value",
  },
  {
    id: "order-reports",
    title: "Order Reports",
    description:
      "Generate sales, fulfilment, shipping, payment and returns reports.",
    features: 10,
    icon: Download,
    metric: "14",
    metricLabel: "Report templates",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "orders-dashboard": {
    eyebrow: "Commerce Operations",
    title: "Orders Dashboard",
    description:
      "Manage orders, payments, fulfilment, shipment, delivery, invoices, returns, refunds and customer communication.",
    primaryAction: "Sync Orders",
    secondaryAction: "Export Orders",
    statistics: [
      { label: "Total Orders", value: "8", note: "All commerce channels" },
      { label: "Order Revenue", value: "₹1,03,993", note: "+18.4% this period" },
      { label: "Open Orders", value: "06", note: "Awaiting fulfilment" },
      { label: "Payment Issues", value: "02", note: "Require attention" },
    ],
    workflows: [
      {
        title: "Order Intake",
        description:
          "Capture and verify orders from website, app and marketplace channels.",
      },
      {
        title: "Payment & Confirmation",
        description:
          "Validate payment status and confirm eligible orders.",
      },
      {
        title: "Fulfilment & Shipping",
        description:
          "Allocate stock, pack orders and create shipments.",
      },
      {
        title: "Returns & Refunds",
        description:
          "Manage reverse logistics, inspection and refund completion.",
      },
    ],
  },
  "all-orders": {
    eyebrow: "Order Operations",
    title: "All Orders",
    description:
      "Review and manage complete order records across channels and fulfilment stages.",
    primaryAction: "Create Order",
    secondaryAction: "Export Orders",
    statistics: [
      { label: "Total Orders", value: "8", note: "Current period" },
      { label: "Confirmed", value: "6", note: "Ready for processing" },
      { label: "Fulfilled", value: "1", note: "Delivered successfully" },
      { label: "On Hold", value: "1", note: "Requires attention" },
    ],
    workflows: [
      {
        title: "Order Directory",
        description:
          "View customer, amount, channel, payment and order status.",
      },
      {
        title: "Order Verification",
        description:
          "Validate customer, payment and inventory availability.",
      },
      {
        title: "Status Management",
        description:
          "Update processing, fulfilment, shipping and delivery stages.",
      },
      {
        title: "Order History",
        description:
          "Review notes, changes, payments and communication timeline.",
      },
    ],
  },
  fulfilment: {
    eyebrow: "Warehouse Operations",
    title: "Fulfilment",
    description:
      "Manage stock allocation, picking, packing and warehouse completion.",
    primaryAction: "Create Fulfilment",
    secondaryAction: "Print Pick List",
    statistics: [
      { label: "Awaiting Fulfilment", value: "6", note: "Open order queue" },
      { label: "Ready to Pick", value: "4", note: "Stock allocated" },
      { label: "Packing", value: "2", note: "In progress" },
      { label: "Fulfilled Today", value: "1", note: "Completed successfully" },
    ],
    workflows: [
      {
        title: "Stock Allocation",
        description:
          "Reserve inventory against confirmed orders.",
      },
      {
        title: "Picking",
        description:
          "Generate pick lists and confirm picked quantities.",
      },
      {
        title: "Packing",
        description:
          "Pack products, verify contents and record package details.",
      },
      {
        title: "Dispatch Handover",
        description:
          "Move completed packages to courier shipment processing.",
      },
    ],
  },
  "returns-refunds": {
    eyebrow: "Post-Purchase Operations",
    title: "Returns & Refunds",
    description:
      "Manage return requests, reverse pickup, inspection and customer refunds.",
    primaryAction: "Create Return",
    secondaryAction: "Review Refunds",
    statistics: [
      { label: "Open Returns", value: "2", note: "Awaiting processing" },
      { label: "Reverse Pickups", value: "1", note: "Scheduled" },
      { label: "Refunds Pending", value: "₹8,999", note: "Awaiting approval" },
      { label: "Resolved", value: "6", note: "Current period" },
    ],
    workflows: [
      {
        title: "Return Request",
        description:
          "Review reason, eligibility and return-window compliance.",
      },
      {
        title: "Reverse Pickup",
        description:
          "Schedule courier pickup and track returned shipment.",
      },
      {
        title: "Inspection",
        description:
          "Inspect condition, quantity and return eligibility.",
      },
      {
        title: "Refund Completion",
        description:
          "Approve refund, update payment status and notify customer.",
      },
    ],
  },
};

export default function OrdersManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return orderModules;
    }

    return orderModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    orderModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <OrderWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onSync={() => setShowSyncModal(true)}
          onExport={() => setShowExportModal(true)}
        />

        {showSyncModal && (
          <SyncOrdersModal onClose={() => setShowSyncModal(false)} />
        )}

        {showExportModal && (
          <ExportOrdersModal onClose={() => setShowExportModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <ShoppingBag size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                  Commerce Operations
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Orders Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Manage orders, payments, fulfilment, shipment, delivery, invoices,
                returns, refunds and customer communication from one workspace.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowSyncModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <RefreshCw size={18} />
                Sync Orders
              </button>

              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                <Download size={18} />
                Export Orders
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            title="Total Orders"
            value="8"
            description="All commerce channels"
            icon={ShoppingBag}
            iconClassName="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            title="Order Revenue"
            value="₹1,03,993"
            description="+18.4% this period"
            icon={Banknote}
            iconClassName="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            title="Open Orders"
            value="06"
            description="Awaiting fulfilment"
            icon={CalendarDays}
            iconClassName="bg-orange-50 text-orange-600"
          />
          <SummaryCard
            title="Payment Issues"
            value="02"
            description="Require attention"
            icon={AlertTriangle}
            iconClassName="bg-red-50 text-red-600"
          />
          <SummaryCard
            title="Fulfilled"
            value="01"
            description="Delivered successfully"
            icon={BadgeCheck}
            iconClassName="bg-violet-50 text-violet-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                Orders Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Commerce Operations Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete order and fulfilment workflow.
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
                placeholder="Search order modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <OrderModuleCard
                key={module.id}
                module={module}
                onOpen={() => setActiveModuleId(module.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {showSyncModal && (
        <SyncOrdersModal onClose={() => setShowSyncModal(false)} />
      )}

      {showExportModal && (
        <ExportOrdersModal onClose={() => setShowExportModal(false)} />
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
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${iconClassName}`}>
        <Icon size={20} />
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-3 text-xs text-slate-400">{description}</p>
    </article>
  );
}

function OrderModuleCard({
  module,
  onOpen,
}: {
  module: OrderModule;
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

function OrderWorkspace({
  module,
  onBack,
  onSync,
  onExport,
}: {
  module: OrderModule;
  onBack: () => void;
  onSync: () => void;
  onExport: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Commerce Operations",
      title: module.title,
      description: module.description,
      primaryAction: "Sync Orders",
      secondaryAction: "Export Orders",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current order status",
        },
        { label: "Open Records", value: "6", note: "Require processing" },
        { label: "Completed", value: "1", note: "Current period" },
        { label: "Operational Health", value: "96%", note: "Within target" },
      ],
      workflows: [
        {
          title: "Order Configuration",
          description:
            "Manage order records, status and processing requirements.",
        },
        {
          title: "Operational Workflow",
          description:
            "Move orders through payment, fulfilment and shipment.",
        },
        {
          title: "Exception Handling",
          description:
            "Resolve payment, inventory, delivery and customer issues.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate reports and retain complete order history.",
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
        Back to Orders
      </button>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white shadow-xl sm:p-9">
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
              onClick={onSync}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <RefreshCw size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onExport}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              <Download size={17} />
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
                      ? "bg-orange-50 text-orange-600"
                      : "bg-violet-50 text-violet-600"
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
            KRVE AI Order Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Order revenue is growing. Two payment issues and six open fulfilment
            orders require operational attention.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Order revenue" value="₹1,03,993" />
            <InsightRow label="Open orders" value="06" />
            <InsightRow label="Payment issues" value="02" />
            <InsightRow label="Fulfilled" value="01" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Generate Order Analysis
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

function SyncOrdersModal({ onClose }: { onClose: () => void }) {
  const [synced, setSynced] = useState(false);

  return (
    <ModalShell
      title="Sync Orders"
      description="Synchronise orders from connected commerce channels."
      icon={RefreshCw}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="p-6">
        <SelectField
          label="Commerce Channel"
          options={[
            "All Connected Channels",
            "KRVE Website",
            "KRVE App",
            "Marketplace",
            "Manual Orders",
          ]}
        />

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />
            <p className="text-sm leading-6 text-blue-700">
              KEOS will fetch new orders and update payment, fulfilment and
              shipment status for existing orders.
            </p>
          </div>
        </div>

        {synced && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-bold text-emerald-700">
              Order synchronisation completed successfully.
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
          onClick={() => setSynced(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <RefreshCw size={17} />
          Start Sync
        </button>
      </div>
    </ModalShell>
  );
}

function ExportOrdersModal({ onClose }: { onClose: () => void }) {
  const [exported, setExported] = useState(false);

  return (
    <ModalShell
      title="Export Orders"
      description="Generate a controlled order export."
      icon={Download}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="p-6">
        <div className="grid gap-5">
          <SelectField
            label="Order Scope"
            options={[
              "All Orders",
              "Open Orders",
              "Fulfilled Orders",
              "Payment Issues",
              "Returns & Refunds",
              "Selected Date Range",
            ]}
          />

          <SelectField
            label="Export Format"
            options={[
              "Excel",
              "CSV",
              "PDF Summary",
            ]}
          />

          <SelectField
            label="Include"
            options={[
              "Order Summary",
              "Order + Customer Details",
              "Order + Payment Details",
              "Complete Order Data",
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
              Order exports may contain customer and payment information and
              will be recorded in audit logs.
            </p>
          </div>
        </div>

        {exported && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-bold text-emerald-700">
              Order export generated successfully.
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
          onClick={() => setExported(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Download size={17} />
          Generate Export
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
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] px-6 py-5 text-white">
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