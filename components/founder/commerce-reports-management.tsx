"use client";

import {
  useMemo,
  useState,
  type ElementType,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileBarChart,
  FileText,
  IndianRupee,
  LineChart,
  PackageCheck,
  Plus,
  RefreshCcw,
  RotateCcw,
  Search,
  ShoppingBag,
  Store,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  X,
} from "lucide-react";

type CommerceReportModule = {
  id: string;
  title: string;
  description: string;
  features: number;
  metric: string;
  metricLabel: string;
  icon: ElementType;
};

type KpiCard = {
  label: string;
  value: string;
  helper: string;
  icon: ElementType;
  iconClass: string;
};

const commerceReportModules: CommerceReportModule[] = [
  {
    id: "commerce-dashboard",
    title: "Commerce Dashboard",
    description:
      "Monitor sales, revenue, orders, customers, products, channels, returns and profitability from one reporting center.",
    features: 12,
    metric: "₹18.24L",
    metricLabel: "Gross sales",
    icon: BarChart3,
  },
  {
    id: "sales-reports",
    title: "Sales Reports",
    description:
      "Analyse gross sales, net sales, discounts, taxes, refunds and sales growth across selected periods.",
    features: 14,
    metric: "₹18.24L",
    metricLabel: "Gross sales",
    icon: TrendingUp,
  },
  {
    id: "revenue-reports",
    title: "Revenue Reports",
    description:
      "Track net revenue, recognised revenue, channel revenue, product revenue and revenue movement.",
    features: 12,
    metric: "₹18,24,000",
    metricLabel: "Net revenue",
    icon: IndianRupee,
  },
  {
    id: "order-reports",
    title: "Order Reports",
    description:
      "Review order volume, order status, cancellation rate, fulfilment time and average order value.",
    features: 12,
    metric: "1,486",
    metricLabel: "Orders analysed",
    icon: ShoppingBag,
  },
  {
    id: "product-reports",
    title: "Product Reports",
    description:
      "Analyse product sales, units sold, revenue contribution, sell-through, margins and product performance.",
    features: 13,
    metric: "286",
    metricLabel: "Products tracked",
    icon: Boxes,
  },
  {
    id: "customer-reports",
    title: "Customer Reports",
    description:
      "Measure customer acquisition, repeat purchases, retention, lifetime value and customer segments.",
    features: 11,
    metric: "1,294",
    metricLabel: "Customers analysed",
    icon: Users,
  },
  {
    id: "channel-reports",
    title: "Channel Reports",
    description:
      "Compare website, mobile app, marketplace, retail store and partner channel performance.",
    features: 12,
    metric: "5",
    metricLabel: "Channels compared",
    icon: Store,
  },
  {
    id: "inventory-reports",
    title: "Inventory Reports",
    description:
      "Track stock value, available inventory, reserved stock, ageing, turnover and stock movement.",
    features: 12,
    metric: "₹42.6L",
    metricLabel: "Inventory value",
    icon: Warehouse,
  },
  {
    id: "fulfilment-reports",
    title: "Fulfilment Reports",
    description:
      "Measure picking, packing, dispatch, warehouse productivity, fulfilment accuracy and processing time.",
    features: 11,
    metric: "98.7%",
    metricLabel: "Fulfilment accuracy",
    icon: PackageCheck,
  },
  {
    id: "shipping-reports",
    title: "Shipping Reports",
    description:
      "Analyse courier performance, delivery time, shipping cost, delays, exceptions and delivery success.",
    features: 11,
    metric: "91.2%",
    metricLabel: "On-time delivery",
    icon: Truck,
  },
  {
    id: "returns-reports",
    title: "Returns Reports",
    description:
      "Analyse return volume, refund value, return reasons, damaged products and recovery performance.",
    features: 10,
    metric: "3.2%",
    metricLabel: "Return rate",
    icon: RotateCcw,
  },
  {
    id: "profitability-reports",
    title: "Profitability Reports",
    description:
      "Review gross profit, contribution margin, product profitability, channel margin and cost impact.",
    features: 13,
    metric: "51.6%",
    metricLabel: "Average margin",
    icon: CircleDollarSign,
  },
];

const kpiCards: KpiCard[] = [
  {
    label: "Gross Sales",
    value: "₹18.24L",
    helper: "Current reporting period",
    icon: TrendingUp,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Net Revenue",
    value: "₹18,24,000",
    helper: "After discounts and refunds",
    icon: IndianRupee,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Orders",
    value: "1,486",
    helper: "Across all sales channels",
    icon: ShoppingBag,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Average Order Value",
    value: "₹10,673",
    helper: "Current reporting period",
    icon: BarChart3,
    iconClass: "bg-orange-50 text-orange-600",
  },
];

export default function CommerceReportsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] =
    useState<CommerceReportModule | null>(null);
  const [showCreateReport, setShowCreateReport] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return commerceReportModules;
    }

    return commerceReportModules.filter((module) => {
      return (
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.metricLabel.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  function handleCreateReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowCreateReport(false);
  }

  return (
    <div className="min-h-full bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-[1500px] space-y-6 px-5 py-8 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="overflow-hidden rounded-[26px] bg-gradient-to-r from-[#1765ff] via-[#2352d5] to-[#192d68] px-7 py-8 text-white shadow-[0_18px_45px_rgba(27,56,137,0.22)] sm:px-9 lg:px-10 lg:py-9">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-4xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/15 backdrop-blur">
                  <FileBarChart className="h-6 w-6" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                  Commerce Intelligence
                </p>
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-[40px]">
                Commerce Reports Management
              </h1>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-blue-100 sm:text-[15px]">
                Analyse sales, revenue, orders, products, customers, channels,
                fulfilment, returns and commerce profitability from one
                reporting center.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[310px] lg:grid-cols-1">
              <button
                type="button"
                onClick={() => {
                  const salesModule = commerceReportModules.find(
                    (module) => module.id === "sales-reports",
                  );

                  setSelectedModule(salesModule ?? null);
                }}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <TrendingUp className="h-5 w-5" />
                Sales Report
              </button>

              <button
                type="button"
                onClick={() => setShowCreateReport(true)}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-semibold text-[#164cff] shadow-sm transition hover:bg-blue-50"
              >
                <Plus className="h-5 w-5" />
                Create Report
              </button>
            </div>
          </div>
        </section>

        {/* KPI CARDS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((kpi) => {
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

        {/* REPORT MODULES */}
        <section className="rounded-[24px] border border-[#dbe3ef] bg-white px-5 py-6 shadow-[0_2px_5px_rgba(15,23,42,0.05)] sm:px-6">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#1765ff]">
                Business Reporting
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#050b1a]">
                Commerce Reporting Modules
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#60759a]">
                Open a module to analyse its complete commerce performance and
                reporting workflow.
              </p>
            </div>

            <div className="relative w-full lg:w-[330px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#91a2bc]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search commerce reports..."
                className="h-12 w-full rounded-2xl border border-[#dbe3ef] bg-[#f8faff] pl-12 pr-11 text-sm font-medium text-[#17233b] outline-none transition placeholder:text-[#91a2bc] focus:border-[#1765ff] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8495af] hover:bg-[#eaf0fa] hover:text-[#17233b]"
                  aria-label="Clear commerce report search"
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

                        <p className="mt-3 max-w-[130px] text-[10px] font-semibold leading-4 text-[#8da0bf]">
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
                No commerce report found
              </h3>

              <p className="mt-2 text-sm text-[#7184a2]">
                Try searching using another report or module name.
              </p>

              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-5 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f54e8]"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>

      {/* REPORT MODULE MODAL */}
      {selectedModule && (
        <CommerceReportModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}

      {/* CREATE REPORT MODAL */}
      {showCreateReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071126]/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e2e8f1] bg-white px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1765ff]">
                  Commerce Intelligence
                </p>

                <h3 className="mt-1 text-xl font-black text-[#071126]">
                  Create Commerce Report
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateReport(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#7184a2] hover:bg-[#f0f4fa] hover:text-[#071126]"
                aria-label="Close report form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="px-6 py-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Report Name
                  </span>

                  <input
                    required
                    type="text"
                    placeholder="Example: Monthly Commerce Performance"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Report Type
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Sales Report</option>
                    <option>Revenue Report</option>
                    <option>Order Report</option>
                    <option>Product Report</option>
                    <option>Customer Report</option>
                    <option>Channel Report</option>
                    <option>Inventory Report</option>
                    <option>Fulfilment Report</option>
                    <option>Returns Report</option>
                    <option>Profitability Report</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Reporting Period
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Current Month</option>
                    <option>Previous Month</option>
                    <option>Current Quarter</option>
                    <option>Current Financial Year</option>
                    <option>Custom Date Range</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Start Date
                  </span>

                  <input
                    type="date"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    End Date
                  </span>

                  <input
                    type="date"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Sales Channel
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>All Channels</option>
                    <option>KRVE Website</option>
                    <option>KRVE Mobile App</option>
                    <option>Retail Stores</option>
                    <option>Marketplaces</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Report Format
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Dashboard View</option>
                    <option>PDF Report</option>
                    <option>Excel Report</option>
                    <option>CSV Export</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Report Frequency
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>One Time</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Data Status
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>All Records</option>
                    <option>Completed Records</option>
                    <option>Pending Records</option>
                    <option>Cancelled Records</option>
                    <option>Returned Records</option>
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Report Description
                  </span>

                  <textarea
                    rows={4}
                    placeholder="Add reporting requirements, filters or internal notes..."
                    className="w-full resize-none rounded-xl border border-[#d8e1ed] px-4 py-3 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateReport(false)}
                  className="rounded-xl border border-[#d7e0ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#536784] hover:bg-[#f2f5fa]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f54e8]"
                >
                  <FileText className="h-4 w-4" />
                  Create Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CommerceReportModal({
  module,
  onClose,
}: {
  module: CommerceReportModule;
  onClose: () => void;
}) {
  const Icon = module.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071126]/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-5 border-b border-[#e2e8f1] px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#1765ff]">
              <Icon className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1765ff]">
                Commerce Report Module
              </p>

              <h3 className="mt-1 text-xl font-black text-[#071126]">
                {module.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#7184a2] hover:bg-[#f0f4fa] hover:text-[#071126]"
            aria-label="Close commerce report module"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm leading-7 text-[#60759a]">
            {module.description}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#dfe7f2] bg-[#f8faff] p-4">
              <p className="text-xs font-semibold text-[#8496b3]">
                Current result
              </p>

              <p className="mt-2 text-xl font-black text-[#071126]">
                {module.metric}
              </p>

              <p className="mt-1 text-xs text-[#7184a2]">
                {module.metricLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe7f2] bg-[#f8faff] p-4">
              <p className="text-xs font-semibold text-[#8496b3]">
                Available controls
              </p>

              <p className="mt-2 text-xl font-black text-[#071126]">
                {module.features}
              </p>

              <p className="mt-1 text-xs text-[#7184a2]">
                Reporting features
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1765ff]" />

              <div>
                <p className="text-sm font-bold text-[#173b87]">
                  Reporting module connected
                </p>

                <p className="mt-1 text-xs leading-5 text-[#5672a7]">
                  This module is ready for live commerce data, report filters,
                  exports, analytics and backend integration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#e2e8f1] bg-[#f8faff] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#d7e0ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#536784] hover:bg-[#f2f5fa]"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f54e8]"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
