"use client";

import { useMemo, useState, type ElementType, type FormEvent } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Globe2,
  IndianRupee,
  Link2,
  ListChecks,
  MapPin,
  PackageCheck,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Store,
  Tags,
  Truck,
  Users,
  Warehouse,
  X,
} from "lucide-react";

type SalesChannelModule = {
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

const salesChannelModules: SalesChannelModule[] = [
  {
    id: "channels-dashboard",
    title: "Channels Dashboard",
    description:
      "Monitor connected channels, revenue, orders, catalogue status, inventory sync and operational issues.",
    features: 10,
    metric: "5",
    metricLabel: "Connected channels",
    icon: BarChart3,
  },
  {
    id: "channel-management",
    title: "Channel Management",
    description:
      "Connect, configure, activate and manage website, mobile app, marketplace and retail sales channels.",
    features: 12,
    metric: "5",
    metricLabel: "Channels active",
    icon: Link2,
  },
  {
    id: "catalogue-sync",
    title: "Catalogue Synchronisation",
    description:
      "Synchronise products, variants, images, descriptions, categories and attributes across sales channels.",
    features: 12,
    metric: "286",
    metricLabel: "Products synchronised",
    icon: Boxes,
  },
  {
    id: "inventory-sync",
    title: "Inventory Synchronisation",
    description:
      "Maintain real-time stock availability, reserved quantities and warehouse inventory across every channel.",
    features: 11,
    metric: "98.8%",
    metricLabel: "Inventory sync rate",
    icon: RefreshCcw,
  },
  {
    id: "channel-orders",
    title: "Channel Orders",
    description:
      "View, process and reconcile orders received from the KRVE website, app, stores and marketplaces.",
    features: 12,
    metric: "1,756",
    metricLabel: "Channel orders",
    icon: ShoppingBag,
  },
  {
    id: "channel-pricing",
    title: "Channel Pricing",
    description:
      "Manage channel-specific selling prices, taxes, commissions, discounts and commercial price lists.",
    features: 11,
    metric: "8",
    metricLabel: "Price lists active",
    icon: Tags,
  },
  {
    id: "website-channel",
    title: "KRVE Website",
    description:
      "Control website catalogue, pricing, inventory, orders, customer experience and operational status.",
    features: 10,
    metric: "₹12.8L",
    metricLabel: "Website revenue",
    icon: Globe2,
  },
  {
    id: "mobile-app-channel",
    title: "KRVE Mobile App",
    description:
      "Manage the mobile commerce catalogue, app-exclusive pricing, orders, inventory and campaign controls.",
    features: 10,
    metric: "₹6.4L",
    metricLabel: "App revenue",
    icon: Smartphone,
  },
  {
    id: "marketplace-channels",
    title: "Marketplace Channels",
    description:
      "Connect and manage external marketplaces, product listings, commissions, settlements and fulfilment.",
    features: 12,
    metric: "2",
    metricLabel: "Marketplaces connected",
    icon: ShoppingCart,
  },
  {
    id: "retail-stores",
    title: "Retail Stores",
    description:
      "Manage physical store sales, POS integrations, stock allocation, pricing and store-level performance.",
    features: 11,
    metric: "2",
    metricLabel: "Stores connected",
    icon: Store,
  },
  {
    id: "channel-settlements",
    title: "Channel Settlements",
    description:
      "Track channel payments, commissions, deductions, receivables and settlement reconciliation.",
    features: 10,
    metric: "₹3.2L",
    metricLabel: "Settlement pending",
    icon: CircleDollarSign,
  },
  {
    id: "channel-analytics",
    title: "Channel Analytics",
    description:
      "Compare channel revenue, orders, conversion, profitability, customer acquisition and growth performance.",
    features: 12,
    metric: "24.6%",
    metricLabel: "Revenue growth",
    icon: BarChart3,
  },
];

const kpiCards: KpiCard[] = [
  {
    label: "Connected Channels",
    value: "5",
    helper: "Website, app, stores and marketplaces",
    icon: Link2,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Channel Revenue",
    value: "₹30,18,600",
    helper: "Current month",
    icon: IndianRupee,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Channel Orders",
    value: "1,756",
    helper: "Across all channels",
    icon: ShoppingBag,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Sync Issues",
    value: "1",
    helper: "Requires attention",
    icon: AlertTriangle,
    iconClass: "bg-orange-50 text-orange-600",
  },
];

export default function SalesChannelsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] =
    useState<SalesChannelModule | null>(null);
  const [showConnectChannel, setShowConnectChannel] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return salesChannelModules;
    }

    return salesChannelModules.filter((module) => {
      return (
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.metricLabel.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  function handleConnectChannel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowConnectChannel(false);
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
                  <Link2 className="h-6 w-6" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                  Omnichannel Commerce
                </p>
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-[40px]">
                Sales Channels Management
              </h1>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-blue-100 sm:text-[15px]">
                Connect and manage the KRVE website, mobile app, marketplaces
                and offline stores with catalogue, pricing, inventory, orders
                and settlement synchronisation.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[310px] lg:grid-cols-1">
              <button
                type="button"
                onClick={() => {
                  const catalogueModule = salesChannelModules.find(
                    (module) => module.id === "catalogue-sync",
                  );

                  setSelectedModule(catalogueModule ?? null);
                }}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <RefreshCcw className="h-5 w-5" />
                Sync Catalogue
              </button>

              <button
                type="button"
                onClick={() => setShowConnectChannel(true)}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-semibold text-[#164cff] shadow-sm transition hover:bg-blue-50"
              >
                <Plus className="h-5 w-5" />
                Connect Channel
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
                Omnichannel Operations
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#050b1a]">
                Sales Channel Modules
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#60759a]">
                Open a module to manage its complete channel commerce and
                synchronisation workflow.
              </p>
            </div>

            <div className="relative w-full lg:w-[330px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#91a2bc]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search sales channel modules..."
                className="h-12 w-full rounded-2xl border border-[#dbe3ef] bg-[#f8faff] pl-12 pr-11 text-sm font-medium text-[#17233b] outline-none transition placeholder:text-[#91a2bc] focus:border-[#1765ff] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8495af] hover:bg-[#eaf0fa] hover:text-[#17233b]"
                  aria-label="Clear sales channel search"
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
                No sales channel module found
              </h3>

              <p className="mt-2 text-sm text-[#7184a2]">
                Try searching using another channel or module name.
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

      {/* MODULE MODAL */}
      {selectedModule && (
        <SalesChannelModuleModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}

      {/* CONNECT CHANNEL MODAL */}
      {showConnectChannel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071126]/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e2e8f1] bg-white px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1765ff]">
                  Omnichannel Commerce
                </p>

                <h3 className="mt-1 text-xl font-black text-[#071126]">
                  Connect Sales Channel
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowConnectChannel(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#7184a2] hover:bg-[#f0f4fa] hover:text-[#071126]"
                aria-label="Close channel form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleConnectChannel} className="px-6 py-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Channel Name
                  </span>

                  <input
                    required
                    type="text"
                    placeholder="Example: KRVE Mobile App"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Channel Type
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Website</option>
                    <option>Mobile App</option>
                    <option>Marketplace</option>
                    <option>Retail Store</option>
                    <option>Social Commerce</option>
                    <option>Wholesale Partner</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Channel Code
                  </span>

                  <input
                    required
                    type="text"
                    placeholder="Example: KRVE-WEB"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm uppercase outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Currency
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>INR — Indian Rupee</option>
                    <option>USD — US Dollar</option>
                    <option>EUR — Euro</option>
                    <option>GBP — British Pound</option>
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Channel URL
                  </span>

                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Default Warehouse
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>KRVE Central Warehouse</option>
                    <option>North Fulfilment Centre</option>
                    <option>South Fulfilment Centre</option>
                    <option>Automatic Allocation</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Default Price List
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>KRVE Retail Price List</option>
                    <option>Marketplace Price List</option>
                    <option>Mobile App Price List</option>
                    <option>Wholesale Price List</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Inventory Sync
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Real-time</option>
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                    <option>Manual</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Order Sync
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Automatic</option>
                    <option>Manual Approval</option>
                    <option>Scheduled Import</option>
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Description
                  </span>

                  <textarea
                    rows={4}
                    placeholder="Add channel configuration notes..."
                    className="w-full resize-none rounded-xl border border-[#d8e1ed] px-4 py-3 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConnectChannel(false)}
                  className="rounded-xl border border-[#d7e0ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#536784] hover:bg-[#f2f5fa]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f54e8]"
                >
                  <Link2 className="h-4 w-4" />
                  Connect Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SalesChannelModuleModal({
  module,
  onClose,
}: {
  module: SalesChannelModule;
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
                Sales Channel Module
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
            aria-label="Close sales channel module"
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
                  Sales channel module connected
                </p>

                <p className="mt-1 text-xs leading-5 text-[#5672a7]">
                  This module is ready for detailed channel records,
                  synchronisation controls and backend integration.
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
