"use client";

import {
  useMemo,
  useState,
  type ElementType,
  type FormEvent,
} from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BellRing,
  Box,
  CheckCircle2,
  Clock3,
  History,
  MapPin,
  PackageCheck,
  PackageSearch,
  Plus,
  RefreshCcw,
  Route,
  Search,
  ShieldCheck,
  Timer,
  Truck,
  UserCheck,
  Warehouse,
  X,
} from "lucide-react";

type TrackingModule = {
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

const trackingModules: TrackingModule[] = [
  {
    id: "tracking-dashboard",
    title: "Tracking Dashboard",
    description:
      "Monitor active shipments, delivery performance, delays, exceptions, courier status and customer visibility.",
    features: 10,
    metric: "284",
    metricLabel: "Tracked orders",
    icon: BarChart3,
  },
  {
    id: "live-orders",
    title: "Live Order Tracking",
    description:
      "Track every active order from warehouse processing through dispatch, transit and final delivery.",
    features: 12,
    metric: "284",
    metricLabel: "Live shipments",
    icon: PackageSearch,
  },
  {
    id: "shipment-milestones",
    title: "Shipment Milestones",
    description:
      "Monitor packed, dispatched, in-transit, out-for-delivery and delivered shipment milestones.",
    features: 11,
    metric: "1,264",
    metricLabel: "Milestones recorded",
    icon: Route,
  },
  {
    id: "delivery-delays",
    title: "Delivery Delays",
    description:
      "Identify delayed shipments, expected delivery breaches, courier delays and unresolved delivery risks.",
    features: 10,
    metric: "11",
    metricLabel: "Delayed orders",
    icon: Clock3,
  },
  {
    id: "tracking-exceptions",
    title: "Delivery Exceptions",
    description:
      "Manage failed attempts, incorrect addresses, damaged parcels, lost shipments and customer unavailability.",
    features: 12,
    metric: "6",
    metricLabel: "Open exceptions",
    icon: AlertTriangle,
  },
  {
    id: "customer-notifications",
    title: "Customer Notifications",
    description:
      "Send automated SMS, email, WhatsApp and push updates for every important delivery milestone.",
    features: 11,
    metric: "2,846",
    metricLabel: "Updates sent",
    icon: BellRing,
  },
  {
    id: "courier-tracking",
    title: "Courier Tracking",
    description:
      "Monitor courier partners, tracking numbers, pickup scans, transit events and delivery performance.",
    features: 12,
    metric: "8",
    metricLabel: "Courier partners",
    icon: Truck,
  },
  {
    id: "warehouse-dispatch",
    title: "Warehouse Dispatch",
    description:
      "Track order handover, dispatch readiness, courier pickup, manifest status and warehouse processing.",
    features: 10,
    metric: "38",
    metricLabel: "Ready for dispatch",
    icon: Warehouse,
  },
  {
    id: "delivery-eta",
    title: "Delivery ETA Management",
    description:
      "Calculate estimated delivery dates using warehouse, courier, destination and shipment movement data.",
    features: 9,
    metric: "96.4%",
    metricLabel: "ETA accuracy",
    icon: Timer,
  },
  {
    id: "proof-of-delivery",
    title: "Proof of Delivery",
    description:
      "Store delivery signatures, OTP confirmation, customer photographs, timestamps and courier evidence.",
    features: 10,
    metric: "74",
    metricLabel: "Delivered today",
    icon: PackageCheck,
  },
  {
    id: "delivery-history",
    title: "Tracking History",
    description:
      "Review complete order movement, courier scans, status changes, notifications and delivery events.",
    features: 9,
    metric: "18,462",
    metricLabel: "Tracking events",
    icon: History,
  },
  {
    id: "tracking-analytics",
    title: "Tracking Analytics",
    description:
      "Analyse delivery speed, on-time rate, courier performance, delays, exceptions and customer experience.",
    features: 12,
    metric: "91.2%",
    metricLabel: "On-time delivery",
    icon: BarChart3,
  },
];

const kpiCards: KpiCard[] = [
  {
    label: "Tracked Orders",
    value: "284",
    helper: "Currently in delivery flow",
    icon: PackageSearch,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "On Schedule",
    value: "91.2%",
    helper: "Within promised timeline",
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Delayed",
    value: "11",
    helper: "Require attention",
    icon: Clock3,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Delivered Today",
    value: "74",
    helper: "Successfully completed",
    icon: PackageCheck,
    iconClass: "bg-orange-50 text-orange-600",
  },
];

export default function OrderTrackingManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] =
    useState<TrackingModule | null>(null);
  const [showTrackOrder, setShowTrackOrder] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return trackingModules;
    }

    return trackingModules.filter((module) => {
      return (
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.metricLabel.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  function handleTrackOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowTrackOrder(false);
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
                  <PackageSearch className="h-6 w-6" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                  Customer Delivery Visibility
                </p>
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-[40px]">
                Order Tracking Management
              </h1>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-blue-100 sm:text-[15px]">
                Track every shipment milestone, delivery delay, exception,
                customer notification, courier update and proof of delivery
                across KRVE.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[310px] lg:grid-cols-1">
              <button
                type="button"
                onClick={() => {
                  const delayModule = trackingModules.find(
                    (module) => module.id === "delivery-delays",
                  );

                  setSelectedModule(delayModule ?? null);
                }}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <Clock3 className="h-5 w-5" />
                View Delays
              </button>

              <button
                type="button"
                onClick={() => setShowTrackOrder(true)}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-semibold text-[#164cff] shadow-sm transition hover:bg-blue-50"
              >
                <Plus className="h-5 w-5" />
                Track Order
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

        {/* MODULES */}
        <section className="rounded-[24px] border border-[#dbe3ef] bg-white px-5 py-6 shadow-[0_2px_5px_rgba(15,23,42,0.05)] sm:px-6">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#1765ff]">
                Delivery Operations
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#050b1a]">
                Order Tracking Modules
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#60759a]">
                Open a module to manage its complete shipment visibility and
                delivery workflow.
              </p>
            </div>

            <div className="relative w-full lg:w-[330px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#91a2bc]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search tracking modules..."
                className="h-12 w-full rounded-2xl border border-[#dbe3ef] bg-[#f8faff] pl-12 pr-11 text-sm font-medium text-[#17233b] outline-none transition placeholder:text-[#91a2bc] focus:border-[#1765ff] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8495af] hover:bg-[#eaf0fa] hover:text-[#17233b]"
                  aria-label="Clear tracking search"
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
                No tracking module found
              </h3>

              <p className="mt-2 text-sm text-[#7184a2]">
                Try searching using another tracking module name.
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

      {/* MODULE DETAILS MODAL */}
      {selectedModule && (
        <TrackingModuleModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}

      {/* TRACK ORDER MODAL */}
      {showTrackOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071126]/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e2e8f1] bg-white px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1765ff]">
                  Delivery Visibility
                </p>

                <h3 className="mt-1 text-xl font-black text-[#071126]">
                  Track Order
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowTrackOrder(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#7184a2] hover:bg-[#f0f4fa] hover:text-[#071126]"
                aria-label="Close track order form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleTrackOrder} className="px-6 py-6">
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
                    Tracking Number
                  </span>

                  <input
                    required
                    type="text"
                    placeholder="Courier tracking number"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Courier Partner
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Delhivery</option>
                    <option>Blue Dart</option>
                    <option>DTDC</option>
                    <option>Ekart Logistics</option>
                    <option>Xpressbees</option>
                    <option>India Post</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Shipment Status
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Order Confirmed</option>
                    <option>Packed</option>
                    <option>Ready for Dispatch</option>
                    <option>Dispatched</option>
                    <option>In Transit</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Delivery Exception</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Dispatch Date
                  </span>

                  <input
                    type="date"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Expected Delivery
                  </span>

                  <input
                    type="date"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Delivery Destination
                  </span>

                  <input
                    type="text"
                    placeholder="City, state or delivery location"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Tracking Notes
                  </span>

                  <textarea
                    rows={4}
                    placeholder="Add shipment notes or delivery instructions..."
                    className="w-full resize-none rounded-xl border border-[#d8e1ed] px-4 py-3 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTrackOrder(false)}
                  className="rounded-xl border border-[#d7e0ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#536784] hover:bg-[#f2f5fa]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f54e8]"
                >
                  <PackageSearch className="h-4 w-4" />
                  Track Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TrackingModuleModal({
  module,
  onClose,
}: {
  module: TrackingModule;
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
                Order Tracking Module
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
            aria-label="Close order tracking module"
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
                Current status
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
                Operational features
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1765ff]" />

              <div>
                <p className="text-sm font-bold text-[#173b87]">
                  Tracking module connected
                </p>

                <p className="mt-1 text-xs leading-5 text-[#5672a7]">
                  This module is ready for detailed shipment records, courier
                  updates, customer notifications and backend integration.
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
