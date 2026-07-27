"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Eye,
  FileBarChart,
  FileClock,
  FileSearch,
  Filter,
  Fingerprint,
  History,
  MonitorSmartphone,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  X,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type AuditModule = {
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

const auditModules: AuditModule[] = [
  {
    id: "audit-dashboard",
    title: "Audit Dashboard",
    description:
      "Monitor system activity, user actions, record changes, exports and flagged events.",
    features: 10,
    icon: Activity,
    metric: "18,642",
    metricLabel: "Events today",
  },
  {
    id: "user-activity",
    title: "User Activity",
    description:
      "Review user sign-ins, navigation, actions, approvals and sensitive operations.",
    features: 12,
    icon: Users,
    metric: "8,426",
    metricLabel: "User actions",
  },
  {
    id: "record-changes",
    title: "Record Changes",
    description:
      "Track create, update and delete activity with before-and-after values.",
    features: 12,
    icon: History,
    metric: "4,286",
    metricLabel: "Changes logged",
  },
  {
    id: "approval-history",
    title: "Approval History",
    description:
      "Review requests, approvers, decisions, comments and escalation history.",
    features: 10,
    icon: ClipboardCheck,
    metric: "1,284",
    metricLabel: "Approvals logged",
  },
  {
    id: "login-history",
    title: "Login History",
    description:
      "Review successful logins, failed attempts, devices, browsers and locations.",
    features: 11,
    icon: Fingerprint,
    metric: "1,842",
    metricLabel: "Login events",
  },
  {
    id: "session-history",
    title: "Session History",
    description:
      "Track session creation, duration, device details and revocation activity.",
    features: 10,
    icon: MonitorSmartphone,
    metric: "428",
    metricLabel: "Sessions tracked",
  },
  {
    id: "export-history",
    title: "Export History",
    description:
      "Track report, document and data exports with user and timestamp details.",
    features: 9,
    icon: Download,
    metric: "84",
    metricLabel: "Tracked downloads",
  },
  {
    id: "security-events",
    title: "Security Events",
    description:
      "Review blocked attempts, suspicious actions and security policy violations.",
    features: 12,
    icon: ShieldAlert,
    metric: "35",
    metricLabel: "Security events",
  },
  {
    id: "flagged-events",
    title: "Flagged Events",
    description:
      "Investigate high-risk, unusual and manually flagged enterprise activity.",
    features: 10,
    icon: AlertTriangle,
    metric: "7",
    metricLabel: "Under review",
  },
  {
    id: "system-events",
    title: "System Events",
    description:
      "Review automated jobs, integrations, background processes and system changes.",
    features: 11,
    icon: Settings,
    metric: "6,192",
    metricLabel: "System events",
  },
  {
    id: "audit-search",
    title: "Advanced Audit Search",
    description:
      "Search logs by user, module, action, date, record, device and risk level.",
    features: 12,
    icon: FileSearch,
    metric: "12",
    metricLabel: "Search filters",
  },
  {
    id: "audit-retention",
    title: "Audit Retention",
    description:
      "Configure log retention, archival, legal hold and deletion protection.",
    features: 9,
    icon: FileClock,
    metric: "7 years",
    metricLabel: "Retention policy",
  },
  {
    id: "audit-reports",
    title: "Audit Reports",
    description:
      "Generate user, change, approval, export, security and compliance reports.",
    features: 10,
    icon: FileBarChart,
    metric: "18",
    metricLabel: "Report templates",
  },
  {
    id: "audit-settings",
    title: "Audit Settings",
    description:
      "Configure event capture, risk rules, alerts and audit governance defaults.",
    features: 9,
    icon: Settings,
    metric: "Active",
    metricLabel: "Audit status",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "audit-dashboard": {
    eyebrow: "System Activity History",
    title: "Audit Dashboard",
    description:
      "Review complete user activity, record changes, approvals, exports and system-generated events.",
    primaryAction: "Search Logs",
    secondaryAction: "Export Audit Trail",
    statistics: [
      { label: "Events Today", value: "18,642", note: "User and system actions" },
      { label: "Changes Logged", value: "4,286", note: "Record-level changes" },
      { label: "Exports", value: "84", note: "Tracked downloads" },
      { label: "Flagged Events", value: "7", note: "Under review" },
    ],
    workflows: [
      {
        title: "Activity Monitoring",
        description:
          "Monitor user and system events across all KEOS modules.",
      },
      {
        title: "Change Tracking",
        description:
          "Review before-and-after values for enterprise records.",
      },
      {
        title: "Risk Review",
        description:
          "Investigate flagged, suspicious and high-risk events.",
      },
      {
        title: "Audit Reporting",
        description:
          "Generate exportable audit trails for compliance and review.",
      },
    ],
  },
  "user-activity": {
    eyebrow: "User Accountability",
    title: "User Activity",
    description:
      "Review actions performed by users across modules, records, approvals and exports.",
    primaryAction: "Search User Activity",
    secondaryAction: "Export Activity",
    statistics: [
      { label: "User Actions", value: "8,426", note: "Current day" },
      { label: "Active Users", value: "48", note: "Users with activity" },
      { label: "Sensitive Actions", value: "126", note: "Require monitoring" },
      { label: "Flagged Users", value: "3", note: "Under review" },
    ],
    workflows: [
      {
        title: "User Timeline",
        description:
          "Review chronological activity for any KEOS user.",
      },
      {
        title: "Module Activity",
        description:
          "Filter actions by department and enterprise module.",
      },
      {
        title: "Sensitive Operations",
        description:
          "Monitor approvals, exports, deletions and administrative changes.",
      },
      {
        title: "User Audit Report",
        description:
          "Generate a complete user activity and accountability report.",
      },
    ],
  },
  "record-changes": {
    eyebrow: "Data Change History",
    title: "Record Changes",
    description:
      "Track all create, update and delete operations with before-and-after values.",
    primaryAction: "Search Changes",
    secondaryAction: "Export Change Log",
    statistics: [
      { label: "Changes Logged", value: "4,286", note: "Current day" },
      { label: "Records Updated", value: "3,742", note: "Across modules" },
      { label: "Records Created", value: "486", note: "New records" },
      { label: "Records Deleted", value: "58", note: "Controlled deletions" },
    ],
    workflows: [
      {
        title: "Change Directory",
        description:
          "Review every record change by module, user and timestamp.",
      },
      {
        title: "Before & After Values",
        description:
          "Compare original and updated field values.",
      },
      {
        title: "Deletion Review",
        description:
          "Investigate deleted records and authorisation history.",
      },
      {
        title: "Change Audit Export",
        description:
          "Export detailed change history for compliance review.",
      },
    ],
  },
  "flagged-events": {
    eyebrow: "Audit Risk Review",
    title: "Flagged Events",
    description:
      "Investigate suspicious, unusual and high-risk actions requiring audit attention.",
    primaryAction: "Review Flagged Events",
    secondaryAction: "Export Findings",
    statistics: [
      { label: "Flagged Events", value: "7", note: "Currently open" },
      { label: "High Risk", value: "1", note: "Immediate review" },
      { label: "Medium Risk", value: "3", note: "Under investigation" },
      { label: "Resolved", value: "26", note: "Current month" },
    ],
    workflows: [
      {
        title: "Event Triage",
        description:
          "Review event severity, user, module and affected records.",
      },
      {
        title: "Investigation Timeline",
        description:
          "Analyse related actions, logins and record changes.",
      },
      {
        title: "Reviewer Decision",
        description:
          "Document findings, risk level and corrective actions.",
      },
      {
        title: "Closure & Evidence",
        description:
          "Close the event with supporting notes and audit evidence.",
      },
    ],
  },
};

export default function AuditLogsManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return auditModules;
    }

    return auditModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    auditModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <AuditWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onSearch={() => setShowSearchModal(true)}
          onExport={() => setShowExportModal(true)}
        />

        {showSearchModal && (
          <AuditSearchModal onClose={() => setShowSearchModal(false)} />
        )}

        {showExportModal && (
          <AuditExportModal onClose={() => setShowExportModal(false)} />
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
                  <Activity size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  System Activity History
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Audit Logs
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Review complete user activity, record changes, approvals,
                exports and system-generated events.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowSearchModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <Search size={18} />
                Search Logs
              </button>

              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <Download size={18} />
                Export Audit Trail
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Events Today"
            value="18,642"
            description="User and system actions"
            icon={Activity}
            iconClassName="bg-violet-50 text-violet-600"
          />

          <SummaryCard
            title="Changes Logged"
            value="4,286"
            description="Record-level changes"
            icon={History}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="Exports"
            value="84"
            description="Tracked downloads"
            icon={Download}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Flagged Events"
            value="7"
            description="Under review"
            icon={AlertTriangle}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Audit Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Audit & Activity Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete activity, investigation and reporting workflow.
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
                placeholder="Search audit modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <AuditModuleCard
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
                No audit module found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different term.
              </p>
            </div>
          )}
        </section>
      </div>

      {showSearchModal && (
        <AuditSearchModal onClose={() => setShowSearchModal(false)} />
      )}

      {showExportModal && (
        <AuditExportModal onClose={() => setShowExportModal(false)} />
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

function AuditModuleCard({
  module,
  onOpen,
}: {
  module: AuditModule;
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

function AuditWorkspace({
  module,
  onBack,
  onSearch,
  onExport,
}: {
  module: AuditModule;
  onBack: () => void;
  onSearch: () => void;
  onExport: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "System Activity History",
      title: module.title,
      description: module.description,
      primaryAction: "Search Logs",
      secondaryAction: "Export Audit Trail",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current audit status",
        },
        { label: "Open Reviews", value: "7", note: "Require attention" },
        { label: "Resolved Events", value: "26", note: "Current month" },
        { label: "Audit Health", value: "98%", note: "Within policy range" },
      ],
      workflows: [
        {
          title: "Event Directory",
          description:
            "Review relevant user and system audit events.",
        },
        {
          title: "Advanced Filtering",
          description:
            "Filter by user, action, module, record and date.",
        },
        {
          title: "Investigation Workflow",
          description:
            "Review event context, risk and supporting history.",
        },
        {
          title: "Reporting & Evidence",
          description:
            "Generate audit reports and retain supporting evidence.",
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
        Back to Audit Logs
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
              onClick={onSearch}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <Search size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onExport}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
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
            KRVE AI Audit Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Audit activity is stable. Seven flagged events remain under review,
            including one high-risk record deletion.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Audit health" value="98%" />
            <InsightRow label="Events today" value="18,642" />
            <InsightRow label="Flagged events" value="7" />
            <InsightRow label="High-risk events" value="1" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
          >
            Generate Audit Analysis
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

function AuditSearchModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      title="Search Audit Logs"
      description="Search system activity using advanced audit filters."
      icon={FileSearch}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Search Term"
            placeholder="User, record ID, action or event"
          />
          <SelectField
            label="Module"
            options={[
              "All Modules",
              "Finance",
              "Human Resources",
              "Commerce",
              "Administration",
              "Security",
              "Integrations",
            ]}
          />
          <SelectField
            label="Action"
            options={[
              "All Actions",
              "View",
              "Create",
              "Update",
              "Delete",
              "Approve",
              "Export",
              "Login",
              "Logout",
            ]}
          />
          <SelectField
            label="Risk Level"
            options={[
              "All Risk Levels",
              "Low",
              "Medium",
              "High",
              "Critical",
            ]}
          />
          <FormField
            label="Start Date"
            placeholder=""
            type="date"
          />
          <FormField
            label="End Date"
            placeholder=""
            type="date"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <Filter
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />
            <p className="text-sm leading-6 text-blue-700">
              Search results will include event timestamp, user, module,
              action, record, device, IP address and risk classification.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Search size={17} />
          Search Audit Logs
        </button>
      </div>
    </ModalShell>
  );
}

function AuditExportModal({ onClose }: { onClose: () => void }) {
  const [exported, setExported] = useState(false);

  return (
    <ModalShell
      title="Export Audit Trail"
      description="Generate a controlled audit export for review or compliance."
      icon={Download}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="p-6">
        <div className="grid gap-5">
          <SelectField
            label="Audit Report"
            options={[
              "Complete Audit Trail",
              "User Activity",
              "Record Changes",
              "Approval History",
              "Login History",
              "Security Events",
              "Flagged Events",
            ]}
          />

          <SelectField
            label="Export Format"
            options={[
              "Excel",
              "PDF",
              "CSV",
            ]}
          />

          <SelectField
            label="Date Range"
            options={[
              "Today",
              "Last 7 Days",
              "Last 30 Days",
              "Current Quarter",
              "Current Financial Year",
              "Custom Range",
            ]}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-orange-600"
            />
            <p className="text-sm leading-6 text-orange-700">
              Audit exports are tracked and will be recorded as a new audit event.
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
              Audit export generated successfully.
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
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
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