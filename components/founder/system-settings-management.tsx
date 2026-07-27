"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileBarChart,
  FileCog,
  Globe2,
  Hash,
  Languages,
  MapPin,
  Palette,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  X,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type SettingsModule = {
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

const settingsModules: SettingsModule[] = [
  {
    id: "settings-dashboard",
    title: "Settings Dashboard",
    description:
      "Monitor enterprise configuration, numbering, currency, localisation and pending changes.",
    features: 10,
    icon: Settings,
    metric: "24",
    metricLabel: "Configuration areas",
  },
  {
    id: "company-profile",
    title: "Company Profile",
    description:
      "Manage KRVE legal name, branding, addresses, contact details and registration information.",
    features: 12,
    icon: Building2,
    metric: "1",
    metricLabel: "Active company",
  },
  {
    id: "numbering-series",
    title: "Numbering Series",
    description:
      "Configure prefixes and sequences for orders, invoices, receipts and enterprise records.",
    features: 12,
    icon: Hash,
    metric: "18",
    metricLabel: "Numbering series",
  },
  {
    id: "localisation",
    title: "Localisation",
    description:
      "Configure country, language, date, time, address and regional preferences.",
    features: 11,
    icon: Globe2,
    metric: "India",
    metricLabel: "Primary region",
  },
  {
    id: "currency-settings",
    title: "Currency Settings",
    description:
      "Manage base currency, display format, decimal precision and exchange-rate behaviour.",
    features: 10,
    icon: BadgeIndianRupee,
    metric: "INR",
    metricLabel: "Base currency",
  },
  {
    id: "date-time",
    title: "Date & Time",
    description:
      "Configure timezone, financial year, date format and operational calendars.",
    features: 10,
    icon: CalendarDays,
    metric: "IST",
    metricLabel: "Primary timezone",
  },
  {
    id: "language-settings",
    title: "Language Settings",
    description:
      "Manage system language, content language and user language preferences.",
    features: 9,
    icon: Languages,
    metric: "English",
    metricLabel: "Default language",
  },
  {
    id: "workflow-defaults",
    title: "Workflow Defaults",
    description:
      "Configure default approvals, ownership, escalation and maker-checker behaviour.",
    features: 12,
    icon: Workflow,
    metric: "32",
    metricLabel: "Workflow defaults",
  },
  {
    id: "approval-settings",
    title: "Approval Settings",
    description:
      "Set approval thresholds, escalation rules and founder-review requirements.",
    features: 11,
    icon: ClipboardCheck,
    metric: "14",
    metricLabel: "Approval policies",
  },
  {
    id: "user-preferences",
    title: "User Preferences",
    description:
      "Configure default landing pages, display options and personal workspace preferences.",
    features: 9,
    icon: UserCheck,
    metric: "48",
    metricLabel: "Configured users",
  },
  {
    id: "branding",
    title: "Branding & Appearance",
    description:
      "Manage KEOS logo, colours, typography, email branding and interface identity.",
    features: 10,
    icon: Palette,
    metric: "KEOS",
    metricLabel: "Active theme",
  },
  {
    id: "location-settings",
    title: "Locations",
    description:
      "Manage offices, warehouses, stores, operational sites and location codes.",
    features: 11,
    icon: MapPin,
    metric: "6",
    metricLabel: "Active locations",
  },
  {
    id: "operational-calendar",
    title: "Operational Calendar",
    description:
      "Configure business days, holidays, cut-off times and operational schedules.",
    features: 10,
    icon: Clock3,
    metric: "24",
    metricLabel: "Holiday rules",
  },
  {
    id: "change-management",
    title: "Configuration Changes",
    description:
      "Review, approve and publish sensitive system-wide configuration changes.",
    features: 10,
    icon: FileCog,
    metric: "3",
    metricLabel: "Pending changes",
  },
  {
    id: "settings-reports",
    title: "Settings Reports",
    description:
      "Generate configuration, numbering, approval and change-history reports.",
    features: 9,
    icon: FileBarChart,
    metric: "12",
    metricLabel: "Report templates",
  },
  {
    id: "advanced-settings",
    title: "Advanced Settings",
    description:
      "Manage system-wide defaults, technical controls and protected configuration.",
    features: 12,
    icon: ShieldCheck,
    metric: "Protected",
    metricLabel: "Access level",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "settings-dashboard": {
    eyebrow: "Enterprise Configuration",
    title: "Settings Dashboard",
    description:
      "Configure company information, numbering, localisation, workflow defaults and system-wide preferences.",
    primaryAction: "Edit Company Profile",
    secondaryAction: "Configure Numbering",
    statistics: [
      { label: "Configuration Areas", value: "24", note: "Enterprise settings" },
      { label: "Numbering Series", value: "18", note: "Orders, invoices and records" },
      { label: "Active Currencies", value: "1", note: "Indian Rupee" },
      { label: "Pending Changes", value: "3", note: "Awaiting approval" },
    ],
    workflows: [
      {
        title: "Company Configuration",
        description:
          "Manage legal identity, addresses, branding and contact information.",
      },
      {
        title: "Numbering & Localisation",
        description:
          "Configure document series, formats, language and regional settings.",
      },
      {
        title: "Workflow Defaults",
        description:
          "Set approval, escalation and ownership defaults across KEOS.",
      },
      {
        title: "Change Governance",
        description:
          "Review and approve sensitive configuration changes.",
      },
    ],
  },
  "company-profile": {
    eyebrow: "Company Identity",
    title: "Company Profile",
    description:
      "Manage KRVE legal, operating, contact, tax and branding information.",
    primaryAction: "Edit Company Profile",
    secondaryAction: "View Profile Audit",
    statistics: [
      { label: "Legal Entities", value: "1", note: "KRVE Enterprise" },
      { label: "Registered Offices", value: "1", note: "Primary registration" },
      { label: "Operating Locations", value: "6", note: "Across business functions" },
      { label: "Profile Completeness", value: "96%", note: "Required fields" },
    ],
    workflows: [
      {
        title: "Legal Information",
        description:
          "Manage legal name, registration and tax identifiers.",
      },
      {
        title: "Contact Information",
        description:
          "Update business email, phone and website information.",
      },
      {
        title: "Address Management",
        description:
          "Maintain registered, billing and operational addresses.",
      },
      {
        title: "Brand Identity",
        description:
          "Configure logos, enterprise name and official presentation.",
      },
    ],
  },
  "numbering-series": {
    eyebrow: "Document Number Control",
    title: "Numbering Series",
    description:
      "Configure controlled numbering for orders, invoices, receipts, journals and enterprise records.",
    primaryAction: "Create Series",
    secondaryAction: "Preview Numbering",
    statistics: [
      { label: "Numbering Series", value: "18", note: "Currently active" },
      { label: "Financial Series", value: "8", note: "Invoices and accounting" },
      { label: "Operational Series", value: "7", note: "Orders and inventory" },
      { label: "Administrative Series", value: "3", note: "Users and documents" },
    ],
    workflows: [
      {
        title: "Series Definition",
        description:
          "Set document type, prefix, sequence and padding.",
      },
      {
        title: "Financial Year Reset",
        description:
          "Configure annual or continuous numbering behaviour.",
      },
      {
        title: "Duplicate Prevention",
        description:
          "Protect uniqueness and prevent numbering conflicts.",
      },
      {
        title: "Numbering Audit",
        description:
          "Review gaps, changes and sequence history.",
      },
    ],
  },
  "currency-settings": {
    eyebrow: "Financial Localisation",
    title: "Currency Settings",
    description:
      "Manage base currency, formatting, decimal precision and exchange-rate configuration.",
    primaryAction: "Edit Currency",
    secondaryAction: "Review Formats",
    statistics: [
      { label: "Base Currency", value: "INR", note: "Indian Rupee" },
      { label: "Active Currencies", value: "1", note: "Currently enabled" },
      { label: "Decimal Precision", value: "2", note: "Financial records" },
      { label: "Currency Format", value: "₹1,00,000", note: "Indian numbering" },
    ],
    workflows: [
      {
        title: "Base Currency",
        description:
          "Configure the primary enterprise accounting currency.",
      },
      {
        title: "Display Formatting",
        description:
          "Set symbol, separators and negative-value format.",
      },
      {
        title: "Decimal Precision",
        description:
          "Define precision for accounting and reporting.",
      },
      {
        title: "Exchange Rates",
        description:
          "Configure future multi-currency rate behaviour.",
      },
    ],
  },
};

export default function SystemSettingsManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNumberingModal, setShowNumberingModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return settingsModules;
    }

    return settingsModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    settingsModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <SettingsWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onEditProfile={() => setShowProfileModal(true)}
          onConfigureNumbering={() => setShowNumberingModal(true)}
        />

        {showProfileModal && (
          <CompanyProfileModal onClose={() => setShowProfileModal(false)} />
        )}

        {showNumberingModal && (
          <NumberingSeriesModal onClose={() => setShowNumberingModal(false)} />
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
                  <Settings size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  Enterprise Configuration
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                System Settings
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Configure company information, numbering, localisation,
                workflow defaults and system-wide preferences.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowProfileModal(true)}
                className="flex min-w-[220px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <Building2 size={18} />
                Edit Company Profile
              </button>

              <button
                type="button"
                onClick={() => setShowNumberingModal(true)}
                className="flex min-w-[220px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <Hash size={18} />
                Configure Numbering
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Configuration Areas"
            value="24"
            description="Enterprise settings"
            icon={Settings}
            iconClassName="bg-violet-50 text-violet-600"
          />

          <SummaryCard
            title="Numbering Series"
            value="18"
            description="Orders, invoices and records"
            icon={Hash}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="Active Currencies"
            value="1"
            description="Indian Rupee"
            icon={BadgeIndianRupee}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Pending Changes"
            value="3"
            description="Awaiting approval"
            icon={FileCog}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Configuration Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Enterprise Settings Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete enterprise configuration workflow.
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
                placeholder="Search settings modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <SettingsModuleCard
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
                No settings module found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different term.
              </p>
            </div>
          )}
        </section>
      </div>

      {showProfileModal && (
        <CompanyProfileModal onClose={() => setShowProfileModal(false)} />
      )}

      {showNumberingModal && (
        <NumberingSeriesModal onClose={() => setShowNumberingModal(false)} />
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

function SettingsModuleCard({
  module,
  onOpen,
}: {
  module: SettingsModule;
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

function SettingsWorkspace({
  module,
  onBack,
  onEditProfile,
  onConfigureNumbering,
}: {
  module: SettingsModule;
  onBack: () => void;
  onEditProfile: () => void;
  onConfigureNumbering: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Enterprise Configuration",
      title: module.title,
      description: module.description,
      primaryAction: "Edit Configuration",
      secondaryAction: "Review Settings",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current configuration status",
        },
        { label: "Active Settings", value: "24", note: "Currently applied" },
        { label: "Pending Changes", value: "3", note: "Awaiting approval" },
        { label: "Configuration Health", value: "98%", note: "Within target" },
      ],
      workflows: [
        {
          title: "Configuration",
          description:
            "Manage enterprise defaults and system-wide preferences.",
        },
        {
          title: "Validation",
          description:
            "Review formats, dependencies and required settings.",
        },
        {
          title: "Approval Workflow",
          description:
            "Approve sensitive configuration changes before publishing.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate settings reports and retain change history.",
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
        Back to System Settings
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
              onClick={onEditProfile}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <Building2 size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onConfigureNumbering}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <Hash size={17} />
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
            KRVE AI Configuration Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            System configuration is healthy. Three pending changes require
            founder approval before publishing.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Configuration health" value="98%" />
            <InsightRow label="Numbering series" value="18" />
            <InsightRow label="Pending changes" value="3" />
            <InsightRow label="Base currency" value="INR" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
          >
            Generate Settings Analysis
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

function CompanyProfileModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Edit Company Profile"
      description="Update KRVE legal, contact and operating information."
      icon={Building2}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Legal Company Name"
            placeholder="KRVE Enterprise"
          />

          <FormField
            label="Trading Name"
            placeholder="KRVE"
          />

          <FormField
            label="Business Email"
            placeholder="admin@krve.in"
            type="email"
          />

          <FormField
            label="Business Phone"
            placeholder="+91"
          />

          <FormField
            label="Website"
            placeholder="https://krvefashionstudio.in"
          />

          <FormField
            label="GSTIN"
            placeholder="Enter GST registration number"
          />

          <FormField
            label="Registered Address"
            placeholder="Enter registered address"
          />

          <FormField
            label="City & State"
            placeholder="Enter city and state"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-black text-slate-700">
            Company Description
          </label>

          <textarea
            rows={4}
            placeholder="Enter company description"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <p className="text-sm leading-6 text-blue-700">
              Legal and tax information changes should be reviewed before publishing.
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
              Company profile updated successfully.
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
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Check size={17} />
          Save Company Profile
        </button>
      </div>
    </ModalShell>
  );
}

function NumberingSeriesModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Configure Numbering"
      description="Create or update an enterprise document numbering series."
      icon={Hash}
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Document Type"
            options={[
              "Sales Order",
              "Purchase Order",
              "Sales Invoice",
              "Receipt",
              "Payment",
              "Journal Entry",
              "Employee",
              "Vendor",
              "Customer",
            ]}
          />

          <FormField
            label="Series Name"
            placeholder="Example: Sales Invoice 2026"
          />

          <FormField
            label="Prefix"
            placeholder="Example: INV-"
          />

          <FormField
            label="Starting Number"
            placeholder="1"
            type="number"
          />

          <SelectField
            label="Number Padding"
            options={[
              "3 digits — 001",
              "4 digits — 0001",
              "5 digits — 00001",
              "6 digits — 000001",
            ]}
          />

          <SelectField
            label="Reset Frequency"
            options={[
              "Never",
              "Financial Year",
              "Calendar Year",
              "Monthly",
            ]}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-5">
          <p className="text-xs font-black uppercase tracking-wider text-violet-600">
            Number Preview
          </p>

          <p className="mt-3 text-2xl font-black text-violet-950">
            INV-2026-0001
          </p>

          <p className="mt-2 text-sm text-violet-700">
            Preview based on the selected series configuration.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-orange-600"
            />

            <p className="text-sm leading-6 text-orange-700">
              Changing an active numbering series may affect future documents.
              Existing document numbers will remain unchanged.
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
              Numbering series configured successfully.
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
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Plus size={17} />
          Save Numbering Series
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