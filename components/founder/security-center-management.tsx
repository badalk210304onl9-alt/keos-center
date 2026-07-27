"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileBarChart,
  Fingerprint,
  KeyRound,
  Laptop,
  LockKeyhole,
  LogOut,
  MonitorSmartphone,
  Plus,
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

type SecurityModule = {
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

const securityModules: SecurityModule[] = [
  {
    id: "security-dashboard",
    title: "Security Dashboard",
    description:
      "Monitor security posture, active sessions, blocked attempts and open alerts.",
    features: 10,
    icon: ShieldCheck,
    metric: "96%",
    metricLabel: "Security score",
  },
  {
    id: "authentication",
    title: "Authentication",
    description:
      "Manage login policies, password standards and authentication methods.",
    features: 12,
    icon: KeyRound,
    metric: "7",
    metricLabel: "Security policies",
  },
  {
    id: "mfa",
    title: "Multi-Factor Authentication",
    description:
      "Configure MFA methods, enforcement rules and user enrolment.",
    features: 10,
    icon: Fingerprint,
    metric: "82%",
    metricLabel: "MFA coverage",
  },
  {
    id: "active-sessions",
    title: "Active Sessions",
    description:
      "Review current sessions, devices, locations and revoke suspicious access.",
    features: 11,
    icon: MonitorSmartphone,
    metric: "74",
    metricLabel: "Active sessions",
  },
  {
    id: "device-security",
    title: "Device Security",
    description:
      "Monitor trusted devices, device posture and browser access.",
    features: 10,
    icon: Laptop,
    metric: "48",
    metricLabel: "Trusted devices",
  },
  {
    id: "login-activity",
    title: "Login Activity",
    description:
      "Review successful logins, failed attempts and unusual authentication activity.",
    features: 12,
    icon: Activity,
    metric: "1,842",
    metricLabel: "Login events",
  },
  {
    id: "blocked-attempts",
    title: "Blocked Attempts",
    description:
      "Investigate blocked logins, brute-force attempts and policy violations.",
    features: 9,
    icon: ShieldAlert,
    metric: "28",
    metricLabel: "Current month",
  },
  {
    id: "security-alerts",
    title: "Security Alerts",
    description:
      "Review security warnings, suspicious behaviour and incident notifications.",
    features: 10,
    icon: BellRing,
    metric: "3",
    metricLabel: "Open alerts",
  },
  {
    id: "access-policies",
    title: "Access Policies",
    description:
      "Create device, network, location and risk-based access policies.",
    features: 11,
    icon: ClipboardCheck,
    metric: "14",
    metricLabel: "Active policies",
  },
  {
    id: "privileged-monitoring",
    title: "Privileged Monitoring",
    description:
      "Monitor founder, administrator and sensitive elevated access activity.",
    features: 10,
    icon: UserCheck,
    metric: "14",
    metricLabel: "Privileged users",
  },
  {
    id: "session-controls",
    title: "Session Controls",
    description:
      "Configure session duration, idle timeout and concurrent login rules.",
    features: 9,
    icon: LogOut,
    metric: "30m",
    metricLabel: "Idle timeout",
  },
  {
    id: "security-reviews",
    title: "Security Reviews",
    description:
      "Run periodic security reviews and certify user and system controls.",
    features: 10,
    icon: BadgeCheck,
    metric: "6",
    metricLabel: "Reviews due",
  },
  {
    id: "security-reports",
    title: "Security Reports",
    description:
      "Generate login, session, alert, access and security posture reports.",
    features: 10,
    icon: FileBarChart,
    metric: "12",
    metricLabel: "Report templates",
  },
  {
    id: "security-settings",
    title: "Security Settings",
    description:
      "Configure enterprise security defaults, retention and alert thresholds.",
    features: 9,
    icon: Settings,
    metric: "Active",
    metricLabel: "Configuration status",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "security-dashboard": {
    eyebrow: "Enterprise Security",
    title: "Security Dashboard",
    description:
      "Monitor authentication, active sessions, suspicious activity, security policies and access posture.",
    primaryAction: "Review Security",
    secondaryAction: "Revoke Session",
    statistics: [
      { label: "Security Score", value: "96%", note: "Enterprise posture" },
      { label: "Active Sessions", value: "74", note: "Across 48 users" },
      { label: "Blocked Attempts", value: "28", note: "Current month" },
      { label: "Open Alerts", value: "3", note: "No critical alerts" },
    ],
    workflows: [
      {
        title: "Security Posture",
        description:
          "Review enterprise controls, policy health and security score.",
      },
      {
        title: "Session Oversight",
        description:
          "Monitor users, devices, locations and active sessions.",
      },
      {
        title: "Threat Monitoring",
        description:
          "Review blocked attempts, alerts and suspicious behaviour.",
      },
      {
        title: "Control Reviews",
        description:
          "Run periodic security certification and compliance checks.",
      },
    ],
  },
  authentication: {
    eyebrow: "Identity Protection",
    title: "Authentication",
    description:
      "Manage enterprise login controls, password rules and authentication methods.",
    primaryAction: "Create Policy",
    secondaryAction: "Review Logins",
    statistics: [
      { label: "Authentication Policies", value: "7", note: "Currently enforced" },
      { label: "Successful Logins", value: "1,814", note: "Current month" },
      { label: "Failed Logins", value: "28", note: "Blocked attempts" },
      { label: "Password Compliance", value: "98%", note: "Across active users" },
    ],
    workflows: [
      {
        title: "Password Policy",
        description:
          "Configure complexity, expiry and password history.",
      },
      {
        title: "Login Restrictions",
        description:
          "Control attempts, lockouts and approved access windows.",
      },
      {
        title: "Authentication Methods",
        description:
          "Manage password, OTP and multi-factor options.",
      },
      {
        title: "Login Audit",
        description:
          "Review successful and failed authentication events.",
      },
    ],
  },
  "active-sessions": {
    eyebrow: "Session Governance",
    title: "Active Sessions",
    description:
      "Review and control active user sessions, devices, browsers and locations.",
    primaryAction: "Review Sessions",
    secondaryAction: "Revoke Session",
    statistics: [
      { label: "Active Sessions", value: "74", note: "Across 48 users" },
      { label: "Trusted Devices", value: "48", note: "Approved devices" },
      { label: "Unknown Devices", value: "2", note: "Require review" },
      { label: "Long Sessions", value: "5", note: "Over 8 hours" },
    ],
    workflows: [
      {
        title: "Session Directory",
        description:
          "View active users, devices, IP addresses and login times.",
      },
      {
        title: "Session Revocation",
        description:
          "Terminate suspicious or unauthorised sessions immediately.",
      },
      {
        title: "Concurrent Login Control",
        description:
          "Limit simultaneous sessions by user or role.",
      },
      {
        title: "Session History",
        description:
          "Review prior sessions and termination activity.",
      },
    ],
  },
  "security-alerts": {
    eyebrow: "Threat Detection",
    title: "Security Alerts",
    description:
      "Review security warnings, suspicious activity and enterprise access incidents.",
    primaryAction: "Create Alert Rule",
    secondaryAction: "Review Incidents",
    statistics: [
      { label: "Open Alerts", value: "3", note: "No critical alerts" },
      { label: "High Severity", value: "0", note: "Current status" },
      { label: "Medium Severity", value: "1", note: "Under investigation" },
      { label: "Resolved Alerts", value: "34", note: "Current month" },
    ],
    workflows: [
      {
        title: "Alert Triage",
        description:
          "Review severity, source and affected users or systems.",
      },
      {
        title: "Incident Investigation",
        description:
          "Analyse activity, sessions and access history.",
      },
      {
        title: "Containment Actions",
        description:
          "Revoke sessions and block suspicious access.",
      },
      {
        title: "Resolution & Reporting",
        description:
          "Document findings, actions and final resolution.",
      },
    ],
  },
};

export default function SecurityCenterManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return securityModules;
    }

    return securityModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    securityModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <SecurityWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onReview={() => setShowReviewModal(true)}
          onRevoke={() => setShowRevokeModal(true)}
        />

        {showReviewModal && (
          <SecurityReviewModal onClose={() => setShowReviewModal(false)} />
        )}

        {showRevokeModal && (
          <RevokeSessionModal onClose={() => setShowRevokeModal(false)} />
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
                  <ShieldCheck size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  Enterprise Security
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Security Center
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Monitor authentication, active sessions, suspicious activity,
                security policies and enterprise access posture.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <ClipboardCheck size={18} />
                Review Security
              </button>

              <button
                type="button"
                onClick={() => setShowRevokeModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <LogOut size={18} />
                Revoke Session
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Security Score"
            value="96%"
            description="Enterprise posture"
            icon={ShieldCheck}
            iconClassName="bg-violet-50 text-violet-600"
          />

          <SummaryCard
            title="Active Sessions"
            value="74"
            description="Across 48 users"
            icon={MonitorSmartphone}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="Blocked Attempts"
            value="28"
            description="Current month"
            icon={ShieldAlert}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Open Alerts"
            value="3"
            description="No critical alerts"
            icon={BellRing}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Security Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Enterprise Security Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete security and monitoring workflow.
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
                placeholder="Search security modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <SecurityModuleCard
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
                No security module found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different term.
              </p>
            </div>
          )}
        </section>
      </div>

      {showReviewModal && (
        <SecurityReviewModal onClose={() => setShowReviewModal(false)} />
      )}

      {showRevokeModal && (
        <RevokeSessionModal onClose={() => setShowRevokeModal(false)} />
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

function SecurityModuleCard({
  module,
  onOpen,
}: {
  module: SecurityModule;
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

function SecurityWorkspace({
  module,
  onBack,
  onReview,
  onRevoke,
}: {
  module: SecurityModule;
  onBack: () => void;
  onReview: () => void;
  onRevoke: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Enterprise Security",
      title: module.title,
      description: module.description,
      primaryAction: "Review Security",
      secondaryAction: "Revoke Session",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current security status",
        },
        { label: "Active Records", value: "24", note: "Currently monitored" },
        { label: "Pending Actions", value: "3", note: "Require review" },
        { label: "Security Health", value: "96%", note: "Within policy range" },
      ],
      workflows: [
        {
          title: "Security Configuration",
          description:
            "Manage enterprise security settings and controls.",
        },
        {
          title: "Monitoring & Detection",
          description:
            "Track suspicious activity, alerts and access exceptions.",
        },
        {
          title: "Response Actions",
          description:
            "Revoke sessions and contain unauthorised access.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate security reports and review complete audit history.",
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
        Back to Security Center
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
              onClick={onReview}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <ClipboardCheck size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onRevoke}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <LogOut size={17} />
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
            KRVE AI Security Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Security posture is healthy. Two unknown devices and three open
            alerts require administrative review.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Security score" value="96%" />
            <InsightRow label="MFA coverage" value="82%" />
            <InsightRow label="Unknown devices" value="2" />
            <InsightRow label="Open alerts" value="3" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
          >
            Generate Security Analysis
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

function SecurityReviewModal({ onClose }: { onClose: () => void }) {
  const checks = [
    {
      title: "Password policy",
      status: "Compliant",
      detail: "Strong password requirements are active.",
    },
    {
      title: "MFA coverage",
      status: "Attention",
      detail: "22 users still require MFA enrolment.",
    },
    {
      title: "Suspicious devices",
      status: "Attention",
      detail: "Two unknown devices require review.",
    },
    {
      title: "Critical alerts",
      status: "Compliant",
      detail: "No critical security alerts are open.",
    },
  ];

  return (
    <ModalShell
      title="Review Security"
      description="Review the current KEOS enterprise security posture."
      icon={ClipboardCheck}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {checks.map((check) => (
            <div
              key={check.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-black text-slate-950">
                    {check.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {check.detail}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    check.status === "Compliant"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {check.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />
            <p className="text-sm leading-6 text-blue-700">
              The current enterprise security score is 96%. Complete pending
              MFA enrolment and review unknown devices to improve coverage.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-200 px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Check size={17} />
          Complete Review
        </button>
      </div>
    </ModalShell>
  );
}

function RevokeSessionModal({ onClose }: { onClose: () => void }) {
  const [revoked, setRevoked] = useState(false);

  return (
    <ModalShell
      title="Revoke Session"
      description="Terminate a selected active user session."
      icon={LogOut}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="p-6">
        <SelectField
          label="Active Session"
          options={[
            "Badal Kumar — Chrome / Windows",
            "Finance Employee — Edge / Windows",
            "HR Employee — Chrome / Android",
            "Marketing Employee — Safari / iPhone",
          ]}
        />

        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-orange-600"
            />
            <p className="text-sm leading-6 text-orange-700">
              Revoking a session immediately signs the user out from the
              selected device. This action will be recorded in audit logs.
            </p>
          </div>
        </div>

        {revoked && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-bold text-emerald-700">
              Session revoked successfully.
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
          onClick={() => setRevoked(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
        >
          <LogOut size={17} />
          Revoke Selected Session
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