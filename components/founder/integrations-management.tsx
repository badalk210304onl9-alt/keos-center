"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  FileBarChart,
  Globe2,
  Link2,
  LockKeyhole,
  Mail,
  MessageCircle,
  Plug,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TestTube2,
  Truck,
  Webhook,
  Workflow,
  X,
  Zap,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type IntegrationModule = {
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

const integrationModules: IntegrationModule[] = [
  {
    id: "integrations-dashboard",
    title: "Integrations Dashboard",
    description:
      "Monitor all connected systems, API activity, sync health and connection status.",
    features: 10,
    icon: Plug,
    metric: "14",
    metricLabel: "Total integrations",
  },
  {
    id: "website-integration",
    title: "Website Integration",
    description:
      "Connect the KRVE website with products, orders, customers and real-time enterprise data.",
    features: 12,
    icon: Globe2,
    metric: "Live",
    metricLabel: "Website status",
  },
  {
    id: "mobile-app",
    title: "Mobile App Integration",
    description:
      "Connect the future KRVE app with commerce, customer and enterprise services.",
    features: 11,
    icon: Zap,
    metric: "Planned",
    metricLabel: "App connection",
  },
  {
    id: "payment-gateways",
    title: "Payment Gateways",
    description:
      "Manage payment providers, settlements, refunds, webhooks and transaction status.",
    features: 12,
    icon: Banknote,
    metric: "3",
    metricLabel: "Gateways connected",
  },
  {
    id: "courier-partners",
    title: "Courier Partners",
    description:
      "Connect shipping providers for labels, tracking, delivery updates and NDR management.",
    features: 12,
    icon: Truck,
    metric: "4",
    metricLabel: "Courier partners",
  },
  {
    id: "marketplaces",
    title: "Marketplace Integrations",
    description:
      "Synchronise catalogue, orders, inventory, pricing and settlements with marketplaces.",
    features: 12,
    icon: ShoppingBag,
    metric: "2",
    metricLabel: "Marketplaces",
  },
  {
    id: "banking",
    title: "Banking Integrations",
    description:
      "Connect bank feeds, settlements, reconciliation and treasury information.",
    features: 10,
    icon: Building2,
    metric: "3",
    metricLabel: "Bank accounts",
  },
  {
    id: "inventory-sync",
    title: "Inventory Sync",
    description:
      "Synchronise stock across website, app, warehouses and external commerce channels.",
    features: 11,
    icon: Boxes,
    metric: "99.8%",
    metricLabel: "Sync accuracy",
  },
  {
    id: "api-management",
    title: "API Management",
    description:
      "Manage API keys, endpoints, quotas, authentication and integration usage.",
    features: 12,
    icon: Code2,
    metric: "84,628",
    metricLabel: "API calls today",
  },
  {
    id: "webhooks",
    title: "Webhooks",
    description:
      "Configure event delivery for orders, payments, inventory, customers and system events.",
    features: 10,
    icon: Webhook,
    metric: "26",
    metricLabel: "Active webhooks",
  },
  {
    id: "data-connectors",
    title: "Data Connectors",
    description:
      "Connect databases, cloud storage, files and external enterprise data sources.",
    features: 11,
    icon: Database,
    metric: "7",
    metricLabel: "Data connectors",
  },
  {
    id: "email-sms",
    title: "Email, SMS & WhatsApp",
    description:
      "Connect communication providers for transactional and operational notifications.",
    features: 12,
    icon: MessageCircle,
    metric: "4",
    metricLabel: "Messaging services",
  },
  {
    id: "automation-connectors",
    title: "Automation Connectors",
    description:
      "Connect integrations to KRVE workflows, triggers, approvals and automated actions.",
    features: 11,
    icon: Workflow,
    metric: "32",
    metricLabel: "Active automations",
  },
  {
    id: "connection-security",
    title: "Connection Security",
    description:
      "Manage credentials, encryption, IP restrictions, certificates and secrets.",
    features: 10,
    icon: LockKeyhole,
    metric: "100%",
    metricLabel: "Secrets encrypted",
  },
  {
    id: "sync-monitoring",
    title: "Sync Monitoring",
    description:
      "Track sync jobs, delays, failures, retries and data consistency.",
    features: 12,
    icon: RefreshCw,
    metric: "2",
    metricLabel: "Sync delays",
  },
  {
    id: "integration-reports",
    title: "Integration Reports",
    description:
      "Generate API usage, uptime, error, sync and connection-performance reports.",
    features: 10,
    icon: FileBarChart,
    metric: "14",
    metricLabel: "Report templates",
  },
  {
    id: "integration-settings",
    title: "Integration Settings",
    description:
      "Configure environments, retry rules, monitoring thresholds and integration defaults.",
    features: 9,
    icon: Settings,
    metric: "Active",
    metricLabel: "Configuration status",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "integrations-dashboard": {
    eyebrow: "Connected Enterprise",
    title: "Integrations Dashboard",
    description:
      "Monitor external systems, API activity, sync performance, connection health and enterprise data flow.",
    primaryAction: "Connect Integration",
    secondaryAction: "Test Connection",
    statistics: [
      { label: "Integrations", value: "14", note: "12 connected" },
      { label: "API Calls Today", value: "84,628", note: "99.7% successful" },
      { label: "Sync Delays", value: "2", note: "Require review" },
      { label: "Data Updated", value: "2m ago", note: "Latest successful sync" },
    ],
    workflows: [
      {
        title: "Connection Health",
        description:
          "Monitor live, degraded, disconnected and testing integrations.",
      },
      {
        title: "API Performance",
        description:
          "Review request volume, success rate, latency and usage limits.",
      },
      {
        title: "Sync Operations",
        description:
          "Track scheduled and real-time synchronisation across systems.",
      },
      {
        title: "Integration Alerts",
        description:
          "Review failures, delays, expired credentials and connection exceptions.",
      },
    ],
  },
  "payment-gateways": {
    eyebrow: "Payment Infrastructure",
    title: "Payment Gateways",
    description:
      "Connect and control payment providers, settlements, refunds, transaction status and webhook events.",
    primaryAction: "Connect Gateway",
    secondaryAction: "Test Payment",
    statistics: [
      { label: "Connected Gateways", value: "3", note: "All operational" },
      { label: "Payment Success", value: "94.8%", note: "Current month" },
      { label: "Settlements Pending", value: "₹4.82L", note: "Across providers" },
      { label: "Failed Payments", value: "23", note: "Last 24 hours" },
    ],
    workflows: [
      {
        title: "Gateway Configuration",
        description:
          "Manage credentials, environment, supported methods and routing.",
      },
      {
        title: "Settlement Monitoring",
        description:
          "Track gateway settlements and reconciliation status.",
      },
      {
        title: "Refund Integration",
        description:
          "Process and track refunds through connected providers.",
      },
      {
        title: "Webhook Monitoring",
        description:
          "Review payment callbacks, retries and failed events.",
      },
    ],
  },
  "courier-partners": {
    eyebrow: "Delivery Connectivity",
    title: "Courier Partners",
    description:
      "Connect shipping providers for serviceability, rates, labels, tracking and delivery exceptions.",
    primaryAction: "Connect Courier",
    secondaryAction: "Test Tracking",
    statistics: [
      { label: "Courier Partners", value: "4", note: "All enabled" },
      { label: "Shipments Today", value: "86", note: "Across providers" },
      { label: "Tracking Success", value: "98.4%", note: "Live updates" },
      { label: "NDR Cases", value: "7", note: "Require action" },
    ],
    workflows: [
      {
        title: "Courier Authentication",
        description:
          "Manage courier credentials, service codes and account settings.",
      },
      {
        title: "Rate & Serviceability",
        description:
          "Compare service options, delivery times and shipment cost.",
      },
      {
        title: "Label & Manifest",
        description:
          "Generate courier labels and dispatch manifests.",
      },
      {
        title: "Tracking & NDR",
        description:
          "Synchronise tracking events and delivery exceptions.",
      },
    ],
  },
  "api-management": {
    eyebrow: "Enterprise API Control",
    title: "API Management",
    description:
      "Control API access, keys, endpoints, quotas, usage, authentication and developer integrations.",
    primaryAction: "Create API Key",
    secondaryAction: "Open API Logs",
    statistics: [
      { label: "API Calls Today", value: "84,628", note: "99.7% successful" },
      { label: "Active API Keys", value: "18", note: "Across environments" },
      { label: "Average Latency", value: "184ms", note: "Within target" },
      { label: "Rate Limit Events", value: "12", note: "Current day" },
    ],
    workflows: [
      {
        title: "API Key Management",
        description:
          "Create, rotate, revoke and monitor enterprise API credentials.",
      },
      {
        title: "Endpoint Directory",
        description:
          "Review available endpoints, methods and access scopes.",
      },
      {
        title: "Usage & Quotas",
        description:
          "Track request volume, limits and application-level consumption.",
      },
      {
        title: "API Audit Logs",
        description:
          "Review requests, responses, errors and authentication activity.",
      },
    ],
  },
};

export default function IntegrationsManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return integrationModules;
    }

    return integrationModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    integrationModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <IntegrationWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onConnect={() => setShowConnectModal(true)}
          onTest={() => setShowTestModal(true)}
        />

        {showConnectModal && (
          <ConnectIntegrationModal onClose={() => setShowConnectModal(false)} />
        )}

        {showTestModal && (
          <TestConnectionModal onClose={() => setShowTestModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#34137d] to-[#1d4ed8] p-7 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <Link2 size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  Connected Enterprise
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Integrations Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Connect and monitor the KRVE website, app, payments, couriers,
                banks, marketplaces and external enterprise systems.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowConnectModal(true)}
                className="flex min-w-[215px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <Plus size={18} />
                Connect Integration
              </button>

              <button
                type="button"
                onClick={() => setShowTestModal(true)}
                className="flex min-w-[215px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <TestTube2 size={18} />
                Test Connection
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Integrations"
            value="14"
            description="12 connected"
            icon={Link2}
            iconClassName="bg-violet-50 text-violet-600"
          />
          <SummaryCard
            title="API Calls Today"
            value="84,628"
            description="99.7% successful"
            icon={Code2}
            iconClassName="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            title="Sync Delays"
            value="2"
            description="Require review"
            icon={RefreshCw}
            iconClassName="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            title="Data Updated"
            value="2m ago"
            description="Latest successful sync"
            icon={Cloud}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Integration Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Connected Systems Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete connection, sync and
                monitoring workflow.
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
                placeholder="Search integration modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <IntegrationModuleCard
                key={module.id}
                module={module}
                onOpen={() => setActiveModuleId(module.id)}
              />
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="py-16 text-center">
              <Search size={34} className="mx-auto text-slate-300" />
              <h3 className="mt-4 font-black text-slate-900">
                No integration module found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different term.
              </p>
            </div>
          )}
        </section>
      </div>

      {showConnectModal && (
        <ConnectIntegrationModal onClose={() => setShowConnectModal(false)} />
      )}

      {showTestModal && (
        <TestConnectionModal onClose={() => setShowTestModal(false)} />
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

function IntegrationModuleCard({
  module,
  onOpen,
}: {
  module: IntegrationModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <article className="group flex min-h-[255px] flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
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
          className="flex items-center gap-2 text-sm font-black text-violet-600 transition group-hover:gap-3"
        >
          Open
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

function IntegrationWorkspace({
  module,
  onBack,
  onConnect,
  onTest,
}: {
  module: IntegrationModule;
  onBack: () => void;
  onConnect: () => void;
  onTest: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Connected Enterprise",
      title: module.title,
      description: module.description,
      primaryAction: "Connect System",
      secondaryAction: "Test Connection",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current integration status",
        },
        { label: "Successful Syncs", value: "1,248", note: "Current day" },
        { label: "Pending Actions", value: "3", note: "Require review" },
        { label: "Connection Health", value: "99.7%", note: "Within target" },
      ],
      workflows: [
        {
          title: "Connection Configuration",
          description:
            "Manage credentials, environment and integration settings.",
        },
        {
          title: "Data Mapping",
          description:
            "Map fields, identifiers and data transformations.",
        },
        {
          title: "Sync Monitoring",
          description:
            "Track successful jobs, delays, failures and retries.",
        },
        {
          title: "Logs & Reports",
          description:
            "Review connection logs, usage and integration reports.",
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
        Back to Integrations
      </button>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#34137d] to-[#1d4ed8] p-7 text-white shadow-xl sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={23} />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
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
              onClick={onConnect}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <Plus size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onTest}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <TestTube2 size={17} />
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
                  ? "bg-violet-50 text-violet-600"
                  : index === 1
                    ? "bg-blue-50 text-blue-600"
                    : index === 2
                      ? "bg-emerald-50 text-emerald-600"
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
          <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
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
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-sm font-black text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950">{workflow.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {workflow.description}
                    </p>
                    <button
                      type="button"
                      className="mt-4 flex items-center gap-2 text-xs font-black text-violet-600"
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
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-600">
              <Sparkles size={22} />
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
              AI Active
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black">
            KRVE AI Integration Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Overall integration health is stable. Two synchronisation delays
            and one expiring API credential require review.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Connection health" value="99.7%" />
            <InsightRow label="Connected systems" value="12" />
            <InsightRow label="Sync delays" value="2" />
            <InsightRow label="Credential alerts" value="1" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
          >
            Generate Integration Analysis
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

function ConnectIntegrationModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Connect Integration"
      description="Connect an external platform securely with KEOS."
      icon={Plug}
      onClose={onClose}
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Integration Name"
            placeholder="Enter integration name"
          />

          <SelectField
            label="Integration Type"
            options={[
              "Website",
              "Mobile App",
              "Payment Gateway",
              "Courier",
              "Marketplace",
              "Banking",
              "Messaging",
              "Database",
              "Custom API",
            ]}
          />

          <FormField
            label="API Base URL"
            placeholder="https://api.example.com"
          />

          <FormField
            label="API Key"
            placeholder="Enter API key"
            type="password"
          />

          <SelectField
            label="Environment"
            options={[
              "Production",
              "Sandbox",
              "Development",
              "Testing",
            ]}
          />

          <SelectField
            label="Sync Frequency"
            options={[
              "Real Time",
              "Every 5 Minutes",
              "Hourly",
              "Daily",
              "Manual",
            ]}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />
            <p className="text-sm leading-6 text-blue-700">
              Credentials will be encrypted and restricted to authorised
              integration services.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => {
            setSaved(true);
            window.setTimeout(onClose, 700);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          {saved ? (
            <>
              <CheckCircle2 size={17} />
              Integration Connected
            </>
          ) : (
            <>
              <Plus size={17} />
              Connect Integration
            </>
          )}
        </button>
      </div>
    </ModalShell>
  );
}

function TestConnectionModal({ onClose }: { onClose: () => void }) {
  const [testing, setTesting] = useState(false);
  const [success, setSuccess] = useState(false);

  const runTest = () => {
    setTesting(true);
    setSuccess(false);

    window.setTimeout(() => {
      setTesting(false);
      setSuccess(true);
    }, 900);
  };

  return (
    <ModalShell
      title="Test Connection"
      description="Run a secure connectivity and authentication test."
      icon={TestTube2}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="p-6">
        <SelectField
          label="Select Integration"
          options={[
            "KRVE Website",
            "Razorpay",
            "Shiprocket",
            "Bank Feed",
            "WhatsApp Business",
            "Marketplace Connector",
          ]}
        />

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="font-black text-slate-950">
            Connection Test
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            KEOS will verify endpoint availability, authentication, response
            latency and permission scope.
          </p>
        </div>

        {success && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <BadgeCheck
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <div>
              <p className="font-black text-emerald-950">
                Connection Successful
              </p>
              <p className="mt-1 text-sm text-emerald-700">
                Authentication and API response checks passed.
              </p>
            </div>
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
          onClick={runTest}
          disabled={testing}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:opacity-60"
        >
          {testing ? (
            <>
              <RefreshCw size={17} className="animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <TestTube2 size={17} />
              Run Connection Test
            </>
          )}
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
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#111827] via-[#34137d] to-[#1d4ed8] px-6 py-5 text-white">
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
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
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
      <select className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100">
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