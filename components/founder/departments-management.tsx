"use client";

import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  FileBarChart,
  FileText,
  GitBranch,
  LayoutDashboard,
  MapPin,
  Network,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserCog,
  Users,
  X,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type DepartmentModule = {
  id: string;
  title: string;
  description: string;
  features: number;
  icon: IconType;
  metric: string;
  metricLabel: string;
};

const departmentModules: DepartmentModule[] = [
  {
    id: "dashboard",
    title: "Department Dashboard",
    description:
      "Monitor department structure, workforce, performance, budgets and organisational health.",
    features: 10,
    icon: LayoutDashboard,
    metric: "12",
    metricLabel: "Active departments",
  },
  {
    id: "all-departments",
    title: "All Departments",
    description:
      "Create, edit, activate and manage all departments across the KRVE enterprise.",
    features: 12,
    icon: Building2,
    metric: "12",
    metricLabel: "Departments",
  },
  {
    id: "department-heads",
    title: "Department Heads",
    description:
      "Assign department leadership, responsibilities, authority and reporting ownership.",
    features: 9,
    icon: UserCheck,
    metric: "12",
    metricLabel: "Heads assigned",
  },
  {
    id: "organisation-structure",
    title: "Organisation Structure",
    description:
      "Design parent departments, sub-departments and complete organisation structures.",
    features: 11,
    icon: Network,
    metric: "4",
    metricLabel: "Structure levels",
  },
  {
    id: "teams",
    title: "Teams Management",
    description:
      "Create departmental teams, assign team leaders and manage employee membership.",
    features: 10,
    icon: Users,
    metric: "28",
    metricLabel: "Active teams",
  },
  {
    id: "designations",
    title: "Designations",
    description:
      "Manage job titles, levels, grades, responsibilities and department positions.",
    features: 8,
    icon: UserCog,
    metric: "46",
    metricLabel: "Designations",
  },
  {
    id: "employee-mapping",
    title: "Employee Mapping",
    description:
      "Map employees to departments, teams, managers, locations and reporting lines.",
    features: 12,
    icon: GitBranch,
    metric: "128",
    metricLabel: "Employees mapped",
  },
  {
    id: "reporting-hierarchy",
    title: "Reporting Hierarchy",
    description:
      "Create manager relationships, escalation paths and approval reporting chains.",
    features: 9,
    icon: Network,
    metric: "100%",
    metricLabel: "Hierarchy mapped",
  },
  {
    id: "open-positions",
    title: "Open Positions",
    description:
      "Monitor approved vacancies, workforce requirements and department hiring needs.",
    features: 10,
    icon: BriefcaseBusiness,
    metric: "14",
    metricLabel: "Open positions",
  },
  {
    id: "department-budgets",
    title: "Department Budgets",
    description:
      "Allocate annual budgets, track utilisation and monitor department expenditure.",
    features: 11,
    icon: CircleDollarSign,
    metric: "₹8.4Cr",
    metricLabel: "Annual allocation",
  },
  {
    id: "department-assets",
    title: "Department Assets",
    description:
      "Track devices, equipment, facilities and assets allocated to each department.",
    features: 9,
    icon: ClipboardList,
    metric: "386",
    metricLabel: "Assets assigned",
  },
  {
    id: "department-policies",
    title: "Department Policies",
    description:
      "Manage operating policies, SOPs, guidelines, approvals and policy versions.",
    features: 8,
    icon: FileText,
    metric: "42",
    metricLabel: "Active policies",
  },
  {
    id: "department-reports",
    title: "Department Reports",
    description:
      "Generate workforce, budget, vacancy, productivity and leadership reports.",
    features: 12,
    icon: FileBarChart,
    metric: "18",
    metricLabel: "Report templates",
  },
  {
    id: "department-analytics",
    title: "Department Analytics",
    description:
      "Analyse workforce growth, budget usage, performance, hiring and productivity.",
    features: 12,
    icon: BarChart3,
    metric: "92%",
    metricLabel: "Overall health",
  },
  {
    id: "department-settings",
    title: "Department Settings",
    description:
      "Configure numbering, approval rules, ownership, visibility and department controls.",
    features: 10,
    icon: Settings,
    metric: "Active",
    metricLabel: "Configuration status",
  },
];

const workspaceData: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    actions: string[];
    statistics: Array<{
      label: string;
      value: string;
      note: string;
    }>;
    workflows: Array<{
      title: string;
      description: string;
    }>;
  }
> = {
  dashboard: {
    eyebrow: "Department Control Center",
    title: "Department Dashboard",
    description:
      "Monitor the complete KRVE organisational structure, workforce distribution, leadership and department performance.",
    actions: ["Create Department", "Generate Report"],
    statistics: [
      {
        label: "Active Departments",
        value: "12",
        note: "All enterprise departments",
      },
      {
        label: "Employees Mapped",
        value: "128",
        note: "100% workforce mapping",
      },
      {
        label: "Department Heads",
        value: "12",
        note: "All departments assigned",
      },
      {
        label: "Open Positions",
        value: "14",
        note: "Across 6 departments",
      },
    ],
    workflows: [
      {
        title: "Organisation Health",
        description:
          "Monitor department performance, staffing and operational readiness.",
      },
      {
        title: "Leadership Coverage",
        description:
          "Review department heads, reporting ownership and leadership gaps.",
      },
      {
        title: "Workforce Distribution",
        description:
          "Analyse employee allocation across departments and teams.",
      },
      {
        title: "Budget Overview",
        description:
          "Review allocated budgets, utilisation and department expenditure.",
      },
    ],
  },

  "all-departments": {
    eyebrow: "Organisation Administration",
    title: "All Departments",
    description:
      "Create, update and manage enterprise departments, codes, locations, ownership and operating status.",
    actions: ["Create Department", "Export Directory"],
    statistics: [
      {
        label: "Total Departments",
        value: "12",
        note: "All currently active",
      },
      {
        label: "Corporate Functions",
        value: "7",
        note: "Core business departments",
      },
      {
        label: "Operational Functions",
        value: "5",
        note: "Commerce and fulfilment",
      },
      {
        label: "Under Review",
        value: "1",
        note: "Structure review pending",
      },
    ],
    workflows: [
      {
        title: "Department Directory",
        description:
          "View department name, code, head, location and employee strength.",
      },
      {
        title: "Create Department",
        description:
          "Add new departments with ownership, budget and operating information.",
      },
      {
        title: "Edit Structure",
        description:
          "Update department status, parent structure and leadership.",
      },
      {
        title: "Department Lifecycle",
        description:
          "Activate, merge, restructure or close departments with audit history.",
      },
    ],
  },

  "department-heads": {
    eyebrow: "Leadership Management",
    title: "Department Heads",
    description:
      "Assign department heads, manage leadership authority and monitor management coverage.",
    actions: ["Assign Head", "Leadership Report"],
    statistics: [
      {
        label: "Heads Assigned",
        value: "12",
        note: "Full leadership coverage",
      },
      {
        label: "Interim Heads",
        value: "1",
        note: "Temporary assignment",
      },
      {
        label: "Leadership Reviews",
        value: "3",
        note: "Due this quarter",
      },
      {
        label: "Approval Coverage",
        value: "100%",
        note: "All workflows assigned",
      },
    ],
    workflows: [
      {
        title: "Assign Department Head",
        description:
          "Select an authorised employee and assign department ownership.",
      },
      {
        title: "Delegation Management",
        description:
          "Manage temporary delegation during leave or transition periods.",
      },
      {
        title: "Leadership Authority",
        description:
          "Define approval authority, budget limits and access permissions.",
      },
      {
        title: "Leadership History",
        description:
          "Review previous department heads and assignment history.",
      },
    ],
  },
};

export default function DepartmentsManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignHeadModal, setShowAssignHeadModal] =
    useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return departmentModules;
    }

    return departmentModules.filter((module) =>
      `${module.title} ${module.description}`
        .toLowerCase()
        .includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    departmentModules.find(
      (module) => module.id === activeModuleId,
    ) ?? null;

  if (activeModule) {
    return (
      <>
        <DepartmentWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onCreateDepartment={() => setShowCreateModal(true)}
          onAssignHead={() => setShowAssignHeadModal(true)}
        />

        {showCreateModal && (
          <CreateDepartmentModal
            onClose={() => setShowCreateModal(false)}
          />
        )}

        {showAssignHeadModal && (
          <AssignHeadModal
            onClose={() => setShowAssignHeadModal(false)}
          />
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
                  <Building2 size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  Organisation Administration
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Departments Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Manage organisational structure, leadership,
                workforce mapping, reporting hierarchy, budgets,
                assets, policies and department performance.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <Plus size={18} />
                Create Department
              </button>

              <button
                type="button"
                onClick={() => setShowAssignHeadModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <UserCheck size={18} />
                Assign Head
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Departments"
            value="12"
            description="All departments active"
            icon={Building2}
            iconClassName="bg-violet-50 text-violet-600"
          />

          <SummaryCard
            title="Department Heads"
            value="12"
            description="Fully assigned"
            icon={UserCheck}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="Employees Mapped"
            value="128"
            description="100% organisational mapping"
            icon={Users}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Open Positions"
            value="14"
            description="Across 6 departments"
            icon={BriefcaseBusiness}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Department Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Organisation Management Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete department
                workflow.
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
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search department modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <DepartmentModuleCard
                key={module.id}
                module={module}
                onOpen={() => setActiveModuleId(module.id)}
              />
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="py-16 text-center">
              <Search
                size={34}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-black text-slate-900">
                No module found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different term.
              </p>
            </div>
          )}
        </section>
      </div>

      {showCreateModal && (
        <CreateDepartmentModal
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {showAssignHeadModal && (
        <AssignHeadModal
          onClose={() => setShowAssignHeadModal(false)}
        />
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
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${iconClassName}`}
      >
        <Icon size={20} />
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-3 text-xs text-slate-400">
        {description}
      </p>
    </article>
  );
}

function DepartmentModuleCard({
  module,
  onOpen,
}: {
  module: DepartmentModule;
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
          <p className="text-lg font-black text-slate-950">
            {module.metric}
          </p>

          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            {module.metricLabel}
          </p>
        </div>
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">
        {module.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {module.description}
      </p>

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

function DepartmentWorkspace({
  module,
  onBack,
  onCreateDepartment,
  onAssignHead,
}: {
  module: DepartmentModule;
  onBack: () => void;
  onCreateDepartment: () => void;
  onAssignHead: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceData[module.id] ?? {
      eyebrow: "Department Management",
      title: module.title,
      description: module.description,
      actions: ["Create Record", "Generate Report"],
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current enterprise status",
        },
        {
          label: "Active Records",
          value: "24",
          note: "Currently operational",
        },
        {
          label: "Pending Actions",
          value: "6",
          note: "Require review",
        },
        {
          label: "Operating Health",
          value: "94%",
          note: "Within target range",
        },
      ],
      workflows: [
        {
          title: "Records Management",
          description:
            "Create, edit and manage department records.",
        },
        {
          title: "Approval Workflow",
          description:
            "Review pending requests and controlled approvals.",
        },
        {
          title: "Department Monitoring",
          description:
            "Track ownership, status and operational performance.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate reports and maintain complete audit history.",
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
        Back to Departments
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
              onClick={
                module.id === "department-heads"
                  ? onAssignHead
                  : onCreateDepartment
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <Plus size={17} />
              {content.actions[0]}
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <FileBarChart size={17} />
              {content.actions[1]}
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
                      ? "bg-orange-50 text-orange-600"
                      : "bg-emerald-50 text-emerald-600"
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

            <p className="mt-3 text-xs text-slate-400">
              {statistic.note}
            </p>
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
                    <h3 className="font-black text-slate-950">
                      {workflow.title}
                    </h3>

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
            KRVE AI Department Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Department structure and workforce distribution are
            healthy. Human Resources and Customer Support currently
            have the highest hiring requirements.
          </p>

          <div className="mt-6 space-y-3">
            <AIInsightRow
              label="Organisation health"
              value="92%"
            />

            <AIInsightRow
              label="Leadership coverage"
              value="100%"
            />

            <AIInsightRow
              label="Hiring priority"
              value="HR"
            />

            <AIInsightRow
              label="Budget utilisation"
              value="64%"
            />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
          >
            Generate AI Analysis
            <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
  );
}

function AIInsightRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-sm font-black text-white">
        {value}
      </span>
    </div>
  );
}

function CreateDepartmentModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Create Department"
      description="Create a new enterprise department and define its operating ownership."
      icon={Building2}
      onClose={onClose}
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Department Name"
            placeholder="Enter department name"
          />

          <FormField
            label="Department Code"
            placeholder="Example: FIN"
          />

          <FormField
            label="Department Head"
            placeholder="Enter employee name"
          />

          <FormField
            label="Department Email"
            placeholder="department@krve.in"
            type="email"
          />

          <FormField
            label="Office Location"
            placeholder="Enter office location"
          />

          <FormField
            label="Annual Budget"
            placeholder="Enter annual budget"
            type="number"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-black text-slate-700">
            Department Description
          </label>

          <textarea
            rows={4}
            placeholder="Enter department responsibilities and purpose"
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
              Department access will remain restricted until the
              department head and employee access rules are assigned.
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

            window.setTimeout(() => {
              onClose();
            }, 700);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          {saved ? (
            <>
              <CheckCircle2 size={17} />
              Department Created
            </>
          ) : (
            <>
              <Plus size={17} />
              Create Department
            </>
          )}
        </button>
      </div>
    </ModalShell>
  );
}

function AssignHeadModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <ModalShell
      title="Assign Department Head"
      description="Assign leadership responsibility to an authorised employee."
      icon={UserCheck}
      onClose={onClose}
    >
      <div className="p-6">
        <div className="grid gap-5">
          <SelectField
            label="Department"
            options={[
              "Finance",
              "Human Resources",
              "Marketing",
              "Technology",
              "Customer Support",
              "Procurement",
              "Inventory",
              "Warehouse",
            ]}
          />

          <FormField
            label="Employee Name"
            placeholder="Search employee name"
          />

          <FormField
            label="Effective Date"
            placeholder=""
            type="date"
          />

          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
            <div className="flex items-start gap-3">
              <UserCheck
                size={20}
                className="mt-0.5 shrink-0 text-violet-600"
              />

              <p className="text-sm leading-6 text-violet-700">
                The assigned head will receive department
                management, employee supervision and approval
                responsibilities.
              </p>
            </div>
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
          <UserCheck size={17} />
          Assign Department Head
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
}: {
  title: string;
  description: string;
  icon: IconType;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#111827] via-[#34137d] to-[#1d4ed8] px-6 py-5 text-white">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <Icon size={21} />
            </div>

            <div>
              <h2 className="text-xl font-black">
                {title}
              </h2>

              <p className="mt-1 text-sm leading-6 text-blue-100">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
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
      <span className="text-sm font-black text-slate-700">
        {label}
      </span>

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
      <span className="text-sm font-black text-slate-700">
        {label}
      </span>

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