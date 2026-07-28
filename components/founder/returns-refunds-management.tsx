"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Box,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  History,
  IndianRupee,
  PackageCheck,
  PackageOpen,
  Plus,
  RefreshCcw,
  RotateCcw,
  Search,
  ShieldAlert,
  Truck,
  Undo2,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type ReturnModule = {
  id: string;
  title: string;
  description: string;
  features: number;
  metric: string;
  metricLabel: string;
  icon: React.ElementType;
};

const returnModules: ReturnModule[] = [
  {
    id: "returns-dashboard",
    title: "Returns Dashboard",
    description:
      "Monitor return volume, refund exposure, exchanges, operational queues and reverse commerce performance.",
    features: 10,
    metric: "14",
    metricLabel: "Open returns",
    icon: BarChart3,
  },
  {
    id: "return-requests",
    title: "Return Requests",
    description:
      "Review customer return requests, validate eligibility, assign priorities and approve or reject cases.",
    features: 12,
    metric: "14",
    metricLabel: "Requests pending",
    icon: Undo2,
  },
  {
    id: "refund-management",
    title: "Refund Management",
    description:
      "Control refund approvals, payment reversals, store credits, refund status and financial reconciliation.",
    features: 12,
    metric: "₹23,997",
    metricLabel: "Refund pending",
    icon: IndianRupee,
  },
  {
    id: "exchange-center",
    title: "Exchange Center",
    description:
      "Manage replacement products, size exchanges, price differences, inventory allocation and fulfilment.",
    features: 11,
    metric: "8",
    metricLabel: "Active exchanges",
    icon: RefreshCcw,
  },
  {
    id: "return-inspection",
    title: "Return Inspection",
    description:
      "Inspect returned products, record condition, verify authenticity, capture evidence and assign disposition.",
    features: 12,
    metric: "9",
    metricLabel: "Awaiting inspection",
    icon: ClipboardCheck,
  },
  {
    id: "reverse-pickup",
    title: "Reverse Pickup",
    description:
      "Schedule customer pickups, assign logistics partners, track attempts, ETAs and reverse shipments.",
    features: 10,
    metric: "11",
    metricLabel: "Pickups scheduled",
    icon: Truck,
  },
  {
    id: "received-returns",
    title: "Received Returns",
    description:
      "Record returned items received at warehouses and reconcile parcels, quantities and product condition.",
    features: 10,
    metric: "26",
    metricLabel: "Items received",
    icon: PackageOpen,
  },
  {
    id: "warehouse-restocking",
    title: "Warehouse Restocking",
    description:
      "Move approved returned products back to available inventory and assign warehouse locations and bins.",
    features: 9,
    metric: "18",
    metricLabel: "Awaiting restock",
    icon: Boxes,
  },
  {
    id: "damaged-items",
    title: "Damaged Items",
    description:
      "Manage damaged, defective and non-sellable returns with repair, liquidation, vendor claim or disposal.",
    features: 10,
    metric: "6",
    metricLabel: "Damaged items",
    icon: AlertTriangle,
  },
  {
    id: "return-fraud",
    title: "Return Fraud Detection",
    description:
      "Identify suspicious returns, serial returners, duplicate refunds, product swaps and policy abuse.",
    features: 11,
    metric: "3",
    metricLabel: "Risk alerts",
    icon: ShieldAlert,
  },
  {
    id: "customer-history",
    title: "Customer Return History",
    description:
      "Review customer-level return frequency, refund value, exchange behaviour, reasons and risk profile.",
    features: 9,
    metric: "42",
    metricLabel: "Profiles reviewed",
    icon: Users,
  },
  {
    id: "returns-analytics",
    title: "Returns Analytics",
    description:
      "Analyse return rates, reasons, products, categories, warehouses, recovery value and operational trends.",
    features: 12,
    metric: "3.2%",
    metricLabel: "Return rate",
    icon: BarChart3,
  },
];

const kpis = [
  {
    label: "Open Returns",
    value: "14",
    helper: "Require processing",
    icon: RotateCcw,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Refund Pending",
    value: "₹23,997",
    helper: "Awaiting settlement",
    icon: WalletCards,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Active Exchanges",
    value: "8",
    helper: "In fulfilment flow",
    icon: RefreshCcw,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Return Rate",
    value: "3.2%",
    helper: "Current month",
    icon: BarChart3,
    iconClass: "bg-orange-50 text-orange-600",
  },
];

export default function ReturnsRefundsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] =
    useState<ReturnModule | null>(null);
  const [showCreateReturn, setShowCreateReturn] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return returnModules;
    }

    return returnModules.filter((module) => {
      return (
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.metricLabel.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <div className="min-h-full bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-[1500px] space-y-6 px-5 py-8 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="overflow-hidden rounded-[26px] bg-gradient-to-r from-[#1765ff] via-[#2352d5] to-[#192d68] px-7 py-8 text-white shadow-[0_18px_45px_rgba(27,56,137,0.22)] sm:px-9 lg:px-10 lg:py-9">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-4xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/15 backdrop-blur">
                  <RotateCcw className="h-6 w-6" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                  Reverse Commerce
                </p>
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-[40px]">
                Returns &amp; Refunds Management
              </h1>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-blue-100 sm:text-[15px]">
                Control return requests, refunds, exchanges, inspections,
                reverse pickups, received items, restocking, fraud detection
                and return performance across KRVE.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[310px] lg:grid-cols-1">
              <button
                type="button"
                onClick={() =>
                  setSelectedModule(
                    returnModules.find(
                      (module) => module.id === "refund-management",
                    ) ?? null,
                  )
                }
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <IndianRupee className="h-5 w-5" />
                Review Refunds
              </button>

              <button
                type="button"
                onClick={() => setShowCreateReturn(true)}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-semibold text-[#164cff] shadow-sm transition hover:bg-blue-50"
              >
                <Plus className="h-5 w-5" />
                Create Return
              </button>
            </div>
          </div>
        </section>

        {/* KPI CARDS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;

            return (
              <article
                key={kpi.label}
                className="rounded-[20px] border border-[#dbe3ef] bg-white p-6 shadow-[0_2px_5px_rgba(15,23,42,0.08)]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${kpi.iconClass}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-5 text-sm font-medium text-[#5c7296]">
                  {kpi.label}
                </p>

                <p className="mt-1 text-[30px] font-black tracking-[-0.04em] text-[#050b1a]">
                  {kpi.value}
                </p>

                <p className="mt-2 text-xs font-medium text-[#93a3bd]">
                  {kpi.helper}
                </p>
              </article>
            );
          })}
        </section>

        {/* MODULE SECTION */}
        <section className="rounded-[24px] border border-[#dbe3ef] bg-white px-5 py-6 shadow-[0_2px_5px_rgba(15,23,42,0.05)] sm:px-6">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#1765ff]">
                Reverse Commerce Operations
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#050b1a]">
                Returns &amp; Refunds Modules
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#60759a]">
                Open a module to manage its complete returns and reverse
                commerce workflow.
              </p>
            </div>

            <div className="relative w-full lg:w-[330px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#91a2bc]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search returns modules..."
                className="h-12 w-full rounded-2xl border border-[#dbe3ef] bg-[#f8faff] pl-12 pr-11 text-sm font-medium text-[#17233b] outline-none transition placeholder:text-[#91a2bc] focus:border-[#1765ff] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8495af] hover:bg-[#eaf0fa] hover:text-[#17233b]"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {filteredModules.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredModules.map((module, index) => {
                const Icon = module.icon;
                const isPrimary = index === 0 && searchQuery.length === 0;

                return (
                  <article
                    key={module.id}
                    className={`group flex min-h-[266px] flex-col rounded-[18px] border bg-white p-5 transition duration-200 ${
                      isPrimary
                        ? "border-[#1765ff] shadow-[0_8px_24px_rgba(23,101,255,0.10)]"
                        : "border-[#dbe3ef] hover:-translate-y-0.5 hover:border-[#94b7ff] hover:shadow-[0_10px_30px_rgba(23,49,99,0.08)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                          isPrimary
                            ? "bg-[#1765ff] text-white"
                            : "bg-[#eef5ff] text-[#1765ff]"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-black leading-none text-[#050b1a]">
                          {module.metric}
                        </p>

                        <p className="mt-3 max-w-[120px] text-[10px] font-semibold leading-4 text-[#8da0bf]">
                          {module.metricLabel}
                        </p>
                      </div>
                    </div>

                    <h3 className="mt-5 text-[17px] font-extrabold tracking-[-0.025em] text-[#050b1a]">
                      {module.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-[#617697]">
                      {module.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold text-[#91a2bd]">
                        {module.features} features
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedModule(module)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#115cff] transition hover:gap-3"
                      >
                        Open
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-[#cad6e8] bg-[#f8faff] px-5 text-center">
              <Search className="h-10 w-10 text-[#99aac2]" />

              <h3 className="mt-4 text-lg font-bold text-[#17233b]">
                No module found
              </h3>

              <p className="mt-2 text-sm text-[#7184a2]">
                Try searching with another module name.
              </p>

              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-5 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>

      {/* MODULE MODAL */}
      {selectedModule && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071126]/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-5 border-b border-[#e2e8f1] px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#1765ff]">
                  <selectedModule.icon className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1765ff]">
                    Returns Module
                  </p>

                  <h3 className="mt-1 text-xl font-black text-[#071126]">
                    {selectedModule.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedModule(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#7184a2] hover:bg-[#f0f4fa] hover:text-[#071126]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm leading-7 text-[#60759a]">
                {selectedModule.description}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dfe7f2] bg-[#f8faff] p-4">
                  <p className="text-xs font-semibold text-[#8496b3]">
                    Current status
                  </p>

                  <p className="mt-2 text-xl font-black text-[#071126]">
                    {selectedModule.metric}
                  </p>

                  <p className="mt-1 text-xs text-[#7184a2]">
                    {selectedModule.metricLabel}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe7f2] bg-[#f8faff] p-4">
                  <p className="text-xs font-semibold text-[#8496b3]">
                    Available controls
                  </p>

                  <p className="mt-2 text-xl font-black text-[#071126]">
                    {selectedModule.features}
                  </p>

                  <p className="mt-1 text-xs text-[#7184a2]">
                    Operational features
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1765ff]" />

                  <div>
                    <p className="text-sm font-bold text-[#173b87]">
                      Module connected
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#5672a7]">
                      The module interface is ready. Detailed records and
                      backend actions can be connected to this workspace next.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#e2e8f1] bg-[#f8faff] px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedModule(null)}
                className="rounded-xl border border-[#d7e0ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#536784] hover:bg-[#f2f5fa]"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => setSelectedModule(null)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f54e8]"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE RETURN MODAL */}
      {showCreateReturn && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071126]/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e2e8f1] px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1765ff]">
                  New Return
                </p>

                <h3 className="mt-1 text-xl font-black text-[#071126]">
                  Create Return Request
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateReturn(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#7184a2] hover:bg-[#f0f4fa] hover:text-[#071126]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setShowCreateReturn(false);
              }}
              className="px-6 py-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Order ID
                  </span>

                  <input
                    required
                    type="text"
                    placeholder="Example: KRVE-10248"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Customer
                  </span>

                  <input
                    required
                    type="text"
                    placeholder="Customer name"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Return Type
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Refund</option>
                    <option>Exchange</option>
                    <option>Replacement</option>
                    <option>Store Credit</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Return Reason
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Size or fit issue</option>
                    <option>Damaged product</option>
                    <option>Wrong item received</option>
                    <option>Product quality issue</option>
                    <option>Changed mind</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Notes
                  </span>

                  <textarea
                    rows={4}
                    placeholder="Add return details..."
                    className="w-full resize-none rounded-xl border border-[#d8e1ed] px-4 py-3 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateReturn(false)}
                  className="rounded-xl border border-[#d7e0ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#536784] hover:bg-[#f2f5fa]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f54e8]"
                >
                  <PackageCheck className="h-4 w-4" />
                  Create Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
