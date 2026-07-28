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
  CheckCircle2,
  Clock3,
  IndianRupee,
  Mail,
  MessageCircle,
  Percent,
  Plus,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type AbandonedCartModule = {
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

const abandonedCartModules: AbandonedCartModule[] = [
  {
    id: "abandoned-carts-dashboard",
    title: "Abandoned Carts Dashboard",
    description:
      "Monitor open carts, abandoned value, customer intent, campaign performance and recovered revenue.",
    features: 10,
    metric: "126",
    metricLabel: "Open carts",
    icon: BarChart3,
  },
  {
    id: "abandoned-cart-list",
    title: "Abandoned Cart List",
    description:
      "Review incomplete carts, customer details, cart value, products, abandonment time and recovery status.",
    features: 12,
    metric: "126",
    metricLabel: "Carts awaiting action",
    icon: ShoppingCart,
  },
  {
    id: "recovery-rules",
    title: "Recovery Rules",
    description:
      "Create automated recovery workflows based on cart value, customer segment, inactivity and product type.",
    features: 12,
    metric: "8",
    metricLabel: "Rules active",
    icon: Target,
  },
  {
    id: "email-recovery",
    title: "Email Recovery",
    description:
      "Create and automate personalised cart reminder emails, product summaries, offers and follow-up sequences.",
    features: 11,
    metric: "4",
    metricLabel: "Email sequences",
    icon: Mail,
  },
  {
    id: "whatsapp-recovery",
    title: "WhatsApp Recovery",
    description:
      "Send automated WhatsApp reminders with cart links, product information, assistance and recovery offers.",
    features: 10,
    metric: "586",
    metricLabel: "Messages sent",
    icon: MessageCircle,
  },
  {
    id: "push-notifications",
    title: "Push Notifications",
    description:
      "Recover mobile and web customers through timed push alerts, product reminders and urgency messages.",
    features: 9,
    metric: "3",
    metricLabel: "Campaigns active",
    icon: BellRing,
  },
  {
    id: "recovery-campaigns",
    title: "Recovery Campaigns",
    description:
      "Launch multi-channel cart recovery campaigns using email, WhatsApp, push messages and incentives.",
    features: 12,
    metric: "5",
    metricLabel: "Campaigns running",
    icon: Send,
  },
  {
    id: "customer-segments",
    title: "Customer Segments",
    description:
      "Group abandoned carts by new visitors, repeat customers, high-value buyers and membership status.",
    features: 10,
    metric: "7",
    metricLabel: "Segments available",
    icon: Users,
  },
  {
    id: "recovery-incentives",
    title: "Recovery Incentives",
    description:
      "Create controlled discounts, free shipping, store credit and limited-time recovery incentives.",
    features: 11,
    metric: "6",
    metricLabel: "Incentives active",
    icon: Percent,
  },
  {
    id: "high-value-carts",
    title: "High-Value Carts",
    description:
      "Prioritise premium abandoned carts and assign manual follow-up for high-intent, high-value customers.",
    features: 9,
    metric: "18",
    metricLabel: "Priority carts",
    icon: IndianRupee,
  },
  {
    id: "recovery-automation",
    title: "Recovery Automation",
    description:
      "Automate message timing, escalation, channel selection, incentive limits and recovery completion.",
    features: 11,
    metric: "92.4%",
    metricLabel: "Automation success",
    icon: Zap,
  },
  {
    id: "recovery-analytics",
    title: "Recovery Analytics",
    description:
      "Analyse recovery rate, recovered revenue, campaign conversion, channel performance and customer behaviour.",
    features: 12,
    metric: "19.7%",
    metricLabel: "Recovery rate",
    icon: TrendingUp,
  },
];

const kpiCards: KpiCard[] = [
  {
    label: "Open Carts",
    value: "126",
    helper: "Awaiting recovery action",
    icon: ShoppingCart,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Cart Value",
    value: "₹59,996",
    helper: "Potential recoverable value",
    icon: IndianRupee,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Recovered",
    value: "₹32,999",
    helper: "Current month",
    icon: CheckCircle2,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Recovery Rate",
    value: "19.7%",
    helper: "Across all campaigns",
    icon: TrendingUp,
    iconClass: "bg-orange-50 text-orange-600",
  },
];

export default function AbandonedCartsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] =
    useState<AbandonedCartModule | null>(null);
  const [showCreateRule, setShowCreateRule] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return abandonedCartModules;
    }

    return abandonedCartModules.filter((module) => {
      return (
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.metricLabel.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  function handleCreateRule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowCreateRule(false);
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
                  <ShoppingCart className="h-6 w-6" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                  Conversion Recovery
                </p>
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-[40px]">
                Abandoned Carts Management
              </h1>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-blue-100 sm:text-[15px]">
                Monitor abandoned carts, recover high-intent customers,
                automate email, WhatsApp and push reminders, control incentives
                and measure recovered revenue.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[310px] lg:grid-cols-1">
              <button
                type="button"
                onClick={() => {
                  const cartModule = abandonedCartModules.find(
                    (module) => module.id === "abandoned-cart-list",
                  );

                  setSelectedModule(cartModule ?? null);
                }}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <ShoppingCart className="h-5 w-5" />
                View Carts
              </button>

              <button
                type="button"
                onClick={() => setShowCreateRule(true)}
                className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-semibold text-[#164cff] shadow-sm transition hover:bg-blue-50"
              >
                <Plus className="h-5 w-5" />
                Create Recovery Rule
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
                Recovery Operations
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#050b1a]">
                Abandoned Cart Recovery Modules
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#60759a]">
                Open a module to manage its complete cart recovery and customer
                conversion workflow.
              </p>
            </div>

            <div className="relative w-full lg:w-[330px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#91a2bc]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search recovery modules..."
                className="h-12 w-full rounded-2xl border border-[#dbe3ef] bg-[#f8faff] pl-12 pr-11 text-sm font-medium text-[#17233b] outline-none transition placeholder:text-[#91a2bc] focus:border-[#1765ff] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8495af] hover:bg-[#eaf0fa] hover:text-[#17233b]"
                  aria-label="Clear abandoned cart search"
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
                No recovery module found
              </h3>

              <p className="mt-2 text-sm text-[#7184a2]">
                Try searching using another cart recovery module name.
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

      {/* MODULE DETAILS */}
      {selectedModule && (
        <AbandonedCartModuleModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}

      {/* CREATE RECOVERY RULE */}
      {showCreateRule && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071126]/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e2e8f1] bg-white px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1765ff]">
                  Conversion Recovery
                </p>

                <h3 className="mt-1 text-xl font-black text-[#071126]">
                  Create Recovery Rule
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateRule(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#7184a2] hover:bg-[#f0f4fa] hover:text-[#071126]"
                aria-label="Close recovery rule form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="px-6 py-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Rule Name
                  </span>

                  <input
                    required
                    type="text"
                    placeholder="Example: High-Value Cart Recovery"
                    className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Cart Status
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>All Abandoned Carts</option>
                    <option>High-Value Carts</option>
                    <option>Logged-in Customers</option>
                    <option>Guest Customers</option>
                    <option>Repeat Customers</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Minimum Cart Value
                  </span>

                  <div className="relative">
                    <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8496b3]" />

                    <input
                      type="number"
                      min="0"
                      placeholder="1999"
                      className="h-12 w-full rounded-xl border border-[#d8e1ed] pl-10 pr-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    First Reminder
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>After 30 minutes</option>
                    <option>After 1 hour</option>
                    <option>After 3 hours</option>
                    <option>After 6 hours</option>
                    <option>After 24 hours</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Recovery Channel
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Email</option>
                    <option>WhatsApp</option>
                    <option>Push Notification</option>
                    <option>Email + WhatsApp</option>
                    <option>All Channels</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Incentive Type
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>No Incentive</option>
                    <option>Percentage Discount</option>
                    <option>Flat Discount</option>
                    <option>Free Shipping</option>
                    <option>Store Credit</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Incentive Value
                  </span>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="10"
                      className="h-12 w-full rounded-xl border border-[#d8e1ed] px-4 pr-11 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                    />

                    <Percent className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8496b3]" />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Maximum Attempts
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>1 Attempt</option>
                    <option>2 Attempts</option>
                    <option>3 Attempts</option>
                    <option>4 Attempts</option>
                    <option>5 Attempts</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Rule Priority
                  </span>

                  <select className="h-12 w-full rounded-xl border border-[#d8e1ed] bg-white px-4 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-[#263752]">
                    Internal Notes
                  </span>

                  <textarea
                    rows={4}
                    placeholder="Add recovery rule details and instructions..."
                    className="w-full resize-none rounded-xl border border-[#d8e1ed] px-4 py-3 text-sm outline-none focus:border-[#1765ff] focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateRule(false)}
                  className="rounded-xl border border-[#d7e0ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#536784] hover:bg-[#f2f5fa]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1765ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f54e8]"
                >
                  <Sparkles className="h-4 w-4" />
                  Create Recovery Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AbandonedCartModuleModal({
  module,
  onClose,
}: {
  module: AbandonedCartModule;
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
                Cart Recovery Module
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
            aria-label="Close abandoned cart module"
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
                  Recovery module connected
                </p>

                <p className="mt-1 text-xs leading-5 text-[#5672a7]">
                  This module is ready for detailed cart records, customer
                  communication workflows and backend integration.
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
