"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Eye,
  FileBarChart,
  FileClock,
  Fingerprint,
  KeyRound,
  Layers3,
  Plus,
  Search,
  Settings,
  Shield,
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

type PermissionModule = {
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

const permissionModules: PermissionModule[] = [
  {
    id: "permissions-dashboard",
    title: "Permissions Dashboard",
    description:
      "Monitor access health, permission rules, privileged users and denied actions.",
    features: 10,
    icon: BarChart3,
    metric: "96%",
    metricLabel: "Access health",
  },
  {
    id: "permission-rules",
    title: "Permission Rules",
    description:
      "Create module, action, record and field-level permission rules.",
    features: 12,
    icon: ShieldCheck,
    metric: "286",
    metricLabel: "Permission rules",
  },
  {
    id: "role-access",
    title: "Role Access",
    description:
      "Configure module access and authority for enterprise roles.",
    features: 12,
    icon: Users,
    metric: "18",
    metricLabel: "Enterprise roles",
  },
  {
    id: "user-permissions",
    title: "User Permissions",
    description:
      "Review direct, inherited, additional and temporary user permissions.",
    features: 11,
    icon: UserCheck,
    metric: "128",
    metricLabel: "Active users",
  },
  {
    id: "module-access",
    title: "Module Access",
    description:
      "Control access to finance, HR, commerce, AI and administration modules.",
    features: 12,
    icon: Layers3,
    metric: "42",
    metricLabel: "Protected modules",
  },
  {
    id: "action-rights",
    title: "Action Rights",
    description:
      "Control view, create, edit, delete, approve, export and administrative rights.",
    features: 10,
    icon: KeyRound,
    metric: "8",
    metricLabel: "Action categories",
  },
  {
    id: "record-visibility",
    title: "Record Visibility",
    description:
      "Configure own, team, department, cross-department and enterprise data scope.",
    features: 9,
    icon: Eye,
    metric: "5",
    metricLabel: "Visibility levels",
  },
  {
    id: "field-security",
    title: "Field-Level Security",
    description:
      "Protect sensitive fields such as salary, bank, tax and personal information.",
    features: 11,
    icon: Database,
    metric: "64",
    metricLabel: "Protected fields",
  },
  {
    id: "approval-authority",
    title: "Approval Authority",
    description:
      "Define approval rights, limits, escalation rules and maker-checker controls.",
    features: 12,
    icon: ClipboardCheck,
    metric: "34",
    metricLabel: "Approval rules",
  },
  {
    id: "privileged-access",
    title: "Privileged Access",
    description:
      "Manage founder, administrator and high-risk elevated access.",
    features: 10,
    icon: Fingerprint,
    metric: "14",
    metricLabel: "Privileged users",
  },
  {
    id: "temporary-access",
    title: "Temporary Access",
    description:
      "Grant time-bound access for projects, delegation and emergency requirements.",
    features: 9,
    icon: FileClock,
    metric: "6",
    metricLabel: "Active grants",
  },
  {
    id: "access-reviews",
    title: "Access Reviews",
    description:
      "Certify role and user access through scheduled governance reviews.",
    features: 10,
    icon: BadgeCheck,
    metric: "9",
    metricLabel: "Reviews due",
  },
  {
    id: "segregation-duties",
    title: "Segregation of Duties",
    description:
      "Detect conflicting responsibilities and prevent high-risk access combinations.",
    features: 12,
    icon: ShieldAlert,
    metric: "3",
    metricLabel: "Conflicts detected",
  },
  {
    id: "denied-actions",
    title: "Denied Actions",
    description:
      "Review blocked access attempts, denied operations and policy violations.",
    features: 8,
    icon: AlertTriangle,
    metric: "42",
    metricLabel: "Current month",
  },
  {
    id: "permission-reports",
    title: "Permission Reports",
    description:
      "Generate access matrix, privileged user, review and conflict reports.",
    features: 10,
    icon: FileBarChart,
    metric: "16",
    metricLabel: "Report templates",
  },
  {
    id: "permission-settings",
    title: "Permission Settings",
    description:
      "Configure default access, review frequency and permission governance policies.",
    features: 9,
    icon: Settings,
    metric: "Active",
    metricLabel: "Governance status",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "permissions-dashboard": {
    eyebrow: "Access Governance",
    title: "Permissions Dashboard",
    description:
      "Monitor enterprise access health, privileged permissions, denied operations and review requirements.",
    primaryAction: "Create Permission",
    secondaryAction: "Review Role Access",
    statistics: [
      { label: "Permission Rules", value: "286", note: "Across 18 roles" },
      { label: "Privileged Users", value: "14", note: "Enhanced access" },
      { label: "Access Reviews Due", value: "9", note: "Within 7 days" },
      { label: "Denied Actions", value: "42", note: "Current month" },
    ],
    workflows: [
      {
        title: "Access Health Monitoring",
        description:
          "Monitor overall permission coverage, exceptions and access risk.",
      },
      {
        title: "Privilege Oversight",
        description:
          "Review users with founder, administrator and sensitive access.",
      },
      {
        title: "Review Management",
        description:
          "Track scheduled access reviews and pending certifications.",
      },
      {
        title: "Violation Monitoring",
        description:
          "Review blocked operations and access policy violations.",
      },
    ],
  },
  "permission-rules": {
    eyebrow: "Permission Administration",
    title: "Permission Rules",
    description:
      "Create and manage enterprise permission rules across modules, records, fields and actions.",
    primaryAction: "Create Rule",
    secondaryAction: "Export Rules",
    statistics: [
      { label: "Active Rules", value: "286", note: "Currently enforced" },
      { label: "Module Rules", value: "92", note: "Module-level controls" },
      { label: "Record Rules", value: "116", note: "Data visibility controls" },
      { label: "Field Rules", value: "78", note: "Sensitive information" },
    ],
    workflows: [
      {
        title: "Create Permission Rule",
        description:
          "Define role, module, action, scope and access conditions.",
      },
      {
        title: "Permission Inheritance",
        description:
          "Control permissions inherited from role and department.",
      },
      {
        title: "Conditional Access",
        description:
          "Apply location, device, amount and workflow conditions.",
      },
      {
        title: "Rule Audit History",
        description:
          "Review permission changes, approvals and publishing history.",
      },
    ],
  },
  "role-access": {
    eyebrow: "Role Governance",
    title: "Role Access",
    description:
      "Configure and review enterprise access assigned to each KEOS role.",
    primaryAction: "Create Role Access",
    secondaryAction: "Compare Roles",
    statistics: [
      { label: "Enterprise Roles", value: "18", note: "Active roles" },
      { label: "Custom Roles", value: "11", note: "Organisation-defined" },
      { label: "System Roles", value: "7", note: "Protected roles" },
      { label: "Review Required", value: "4", note: "Role access changes" },
    ],
    workflows: [
      {
        title: "Role Access Matrix",
        description:
          "Review modules and actions available to every role.",
      },
      {
        title: "Clone Role Permissions",
        description:
          "Create a new access profile from an existing role.",
      },
      {
        title: "Role Comparison",
        description:
          "Compare permissions and identify excessive access.",
      },
      {
        title: "Role Certification",
        description:
          "Approve and certify role access through governance review.",
      },
    ],
  },
  "privileged-access": {
    eyebrow: "Sensitive Access Governance",
    title: "Privileged Access",
    description:
      "Monitor founder, administrator and high-risk access across the KRVE enterprise.",
    primaryAction: "Grant Privileged Access",
    secondaryAction: "Review Privileges",
    statistics: [
      { label: "Privileged Users", value: "14", note: "Enhanced access" },
      { label: "Founder Access", value: "1", note: "Full enterprise control" },
      { label: "Administrator Access", value: "4", note: "System operations" },
      { label: "Reviews Due", value: "3", note: "This month" },
    ],
    workflows: [
      {
        title: "Privilege Request",
        description:
          "Request and approve elevated enterprise access.",
      },
      {
        title: "Time-Bound Privilege",
        description:
          "Grant elevated access for a controlled period.",
      },
      {
        title: "Privileged Session Review",
        description:
          "Review sensitive user activity and system changes.",
      },
      {
        title: "Emergency Access",
        description:
          "Manage emergency elevation with complete audit tracking.",
      },
    ],
  },
};

export default function PermissionsManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return permissionModules;
    }

    return permissionModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    permissionModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <PermissionWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onCreate={() => setShowCreateModal(true)}
          onReview={() => setShowReviewModal(true)}
        />

        {showCreateModal && (
          <CreatePermissionModal onClose={() => setShowCreateModal(false)} />
        )}

        {showReviewModal && (
          <ReviewAccessModal onClose={() => setShowReviewModal(false)} />
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
                  Access Governance
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Permissions Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Control module permissions, record visibility, approval authority,
                privileged access and sensitive action rights across KEOS.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="flex min-w-[215px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <Plus size={18} />
                Create Permission
              </button>

              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                className="flex min-w-[215px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <ArrowRight size={18} />
                Review Role Access
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Permission Rules"
            value="286"
            description="Across 18 roles"
            icon={ShieldCheck}
            iconClassName="bg-violet-50 text-violet-600"
          />
          <SummaryCard
            title="Privileged Users"
            value="14"
            description="Enhanced access"
            icon={Fingerprint}
            iconClassName="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            title="Access Reviews Due"
            value="9"
            description="Within 7 days"
            icon={BadgeCheck}
            iconClassName="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            title="Denied Actions"
            value="42"
            description="Current month"
            icon={ShieldAlert}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Permission Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Access Governance Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete permission and
                access-control workflow.
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
                placeholder="Search permission modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <PermissionModuleCard
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
                No permission module found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different term.
              </p>
            </div>
          )}
        </section>
      </div>

      {showCreateModal && (
        <CreatePermissionModal onClose={() => setShowCreateModal(false)} />
      )}

      {showReviewModal && (
        <ReviewAccessModal onClose={() => setShowReviewModal(false)} />
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

function PermissionModuleCard({
  module,
  onOpen,
}: {
  module: PermissionModule;
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

function PermissionWorkspace({
  module,
  onBack,
  onCreate,
  onReview,
}: {
  module: PermissionModule;
  onBack: () => void;
  onCreate: () => void;
  onReview: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Access Governance",
      title: module.title,
      description: module.description,
      primaryAction: "Create Record",
      secondaryAction: "Generate Report",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current enterprise status",
        },
        { label: "Active Records", value: "24", note: "Currently enforced" },
        { label: "Pending Reviews", value: "6", note: "Require attention" },
        { label: "Governance Health", value: "96%", note: "Within policy range" },
      ],
      workflows: [
        {
          title: "Access Configuration",
          description:
            "Create and manage permission and access records.",
        },
        {
          title: "Approval Workflow",
          description:
            "Review controlled access and permission changes.",
        },
        {
          title: "Access Monitoring",
          description:
            "Track usage, exceptions and policy violations.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate access reports and complete audit history.",
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
        Back to Permissions
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
              onClick={onCreate}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <Plus size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onReview}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <ClipboardCheck size={17} />
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

          <h2 className="mt-6 text-xl font-black">KRVE AI Access Insight</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Enterprise access health is stable. Nine reviews are due and three
            segregation-of-duty conflicts require administrative attention.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Access health" value="96%" />
            <InsightRow label="Privileged users" value="14" />
            <InsightRow label="Reviews due" value="9" />
            <InsightRow label="Risk conflicts" value="3" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
          >
            Generate Access Analysis
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

function CreatePermissionModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Create Permission"
      description="Create a controlled module, action and record-level permission rule."
      icon={ShieldCheck}
      onClose={onClose}
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Permission Name"
            placeholder="Enter permission name"
          />
          <FormField
            label="Permission Code"
            placeholder="Example: FIN_APPROVE_PAYMENT"
          />
          <SelectField
            label="Role"
            options={[
              "Founder",
              "System Administrator",
              "Finance Manager",
              "HR Manager",
              "Marketing Manager",
              "Customer Support Manager",
              "Department Employee",
            ]}
          />
          <SelectField
            label="Module"
            options={[
              "Finance",
              "Human Resources",
              "Marketing",
              "Customer Support",
              "Procurement",
              "Inventory",
              "Administration",
              "KRVE AI",
            ]}
          />
          <SelectField
            label="Action"
            options={[
              "View",
              "Create",
              "Edit",
              "Delete",
              "Approve",
              "Export",
              "Manage",
            ]}
          />
          <SelectField
            label="Record Scope"
            options={[
              "Own Records",
              "Team Records",
              "Department Records",
              "Cross-Department Records",
              "All Enterprise Records",
            ]}
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-black text-slate-700">
            Permission Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe the purpose and restrictions of this permission"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-orange-600"
            />
            <p className="text-sm leading-6 text-orange-700">
              Sensitive permissions should follow least-privilege and
              maker-checker controls before activation.
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
              Permission Created
            </>
          ) : (
            <>
              <Plus size={17} />
              Create Permission
            </>
          )}
        </button>
      </div>
    </ModalShell>
  );
}

function ReviewAccessModal({ onClose }: { onClose: () => void }) {
  const roles = [
    {
      role: "Founder",
      users: 1,
      modules: "All Modules",
      status: "Protected",
    },
    {
      role: "System Administrator",
      users: 4,
      modules: "Administration & Security",
      status: "Review Due",
    },
    {
      role: "Finance Manager",
      users: 3,
      modules: "Finance",
      status: "Certified",
    },
    {
      role: "HR Manager",
      users: 2,
      modules: "Human Resources",
      status: "Certified",
    },
  ];

  return (
    <ModalShell
      title="Review Role Access"
      description="Review role permission coverage and certify controlled access."
      icon={ClipboardCheck}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[650px]">
            <thead className="bg-slate-50">
              <tr>
                {["Role", "Users", "Access Scope", "Status", "Action"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {roles.map((role) => (
                <tr key={role.role}>
                  <td className="px-5 py-4 font-black text-slate-950">
                    {role.role}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {role.users}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {role.modules}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        role.status === "Review Due"
                          ? "bg-orange-50 text-orange-700"
                          : role.status === "Protected"
                            ? "bg-violet-50 text-violet-700"
                            : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {role.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm font-black text-violet-600"
                    >
                      Review
                      <ArrowRight size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <Shield size={20} className="mt-0.5 shrink-0 text-blue-600" />
            <p className="text-sm leading-6 text-blue-700">
              Access certification confirms that each role only retains
              permissions required for current business responsibilities.
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