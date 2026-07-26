"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileBarChart,
  FileText,
  Flag,
  GitBranch,
  IndianRupee,
  KanbanSquare,
  Layers3,
  ListChecks,
  Milestone,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  Timer,
  UserCheck,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ModuleId =
  | "projects-dashboard"
  | "project-portfolio"
  | "project-planning"
  | "task-management"
  | "kanban-boards"
  | "milestones"
  | "dependencies"
  | "resource-allocation"
  | "team-collaboration"
  | "time-tracking"
  | "project-budget"
  | "risk-management"
  | "issue-management"
  | "change-management"
  | "approvals"
  | "documents"
  | "meetings"
  | "client-projects"
  | "internal-projects"
  | "project-performance"
  | "project-analytics"
  | "project-reports"
  | "project-settings"
  | "krve-ai-projects";

type ProjectModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: ProjectModule[] = [
  {
    id: "projects-dashboard",
    title: "Projects Dashboard",
    description: "View project health, tasks, milestones, deadlines and risks.",
    icon: BarChart3,
    items: [
      "Active Projects",
      "Open Tasks",
      "On-Track Projects",
      "At-Risk Projects",
      "Milestones Due",
      "Overdue Tasks",
      "Project Budget",
      "Team Capacity",
      "AI Insights",
    ],
  },
  {
    id: "project-portfolio",
    title: "Project Portfolio",
    description: "Manage all projects, programmes and strategic initiatives.",
    icon: BriefcaseBusiness,
    items: [
      "All Projects",
      "Active Projects",
      "Planned Projects",
      "Completed Projects",
      "On-Hold Projects",
      "Cancelled Projects",
      "Project Categories",
      "Project Owners",
      "Project Priority",
      "Portfolio Health",
      "Portfolio Timeline",
      "Portfolio Reports",
    ],
  },
  {
    id: "project-planning",
    title: "Project Planning",
    description: "Create project scope, schedule, deliverables and execution plans.",
    icon: CalendarDays,
    items: [
      "Create Project",
      "Project Charter",
      "Project Scope",
      "Objectives",
      "Deliverables",
      "Work Breakdown Structure",
      "Project Schedule",
      "Project Phases",
      "Project Calendar",
      "Baseline Plan",
      "Project Templates",
      "Planning History",
    ],
  },
  {
    id: "task-management",
    title: "Task Management",
    description: "Create, assign, prioritise and monitor tasks.",
    icon: ListChecks,
    items: [
      "Create Task",
      "My Tasks",
      "Team Tasks",
      "Open Tasks",
      "Completed Tasks",
      "Overdue Tasks",
      "Task Priority",
      "Task Assignment",
      "Task Due Date",
      "Recurring Tasks",
      "Task Notes",
      "Task History",
    ],
  },
  {
    id: "kanban-boards",
    title: "Kanban Boards",
    description: "Visualise task progress across workflow stages.",
    icon: KanbanSquare,
    items: [
      "Project Boards",
      "Task Columns",
      "Backlog",
      "To Do",
      "In Progress",
      "Review",
      "Blocked",
      "Completed",
      "Custom Columns",
      "Card Labels",
      "Swimlanes",
      "Board Settings",
    ],
  },
  {
    id: "milestones",
    title: "Milestones",
    description: "Track critical dates, deliverables and completion status.",
    icon: Milestone,
    items: [
      "Create Milestone",
      "Upcoming Milestones",
      "Completed Milestones",
      "Delayed Milestones",
      "Milestone Owner",
      "Milestone Due Date",
      "Milestone Dependencies",
      "Milestone Approval",
      "Milestone Notes",
      "Milestone History",
      "Milestone Reports",
    ],
  },
  {
    id: "dependencies",
    title: "Dependencies",
    description: "Manage task, milestone and project dependencies.",
    icon: GitBranch,
    items: [
      "Dependency Map",
      "Task Dependencies",
      "Milestone Dependencies",
      "Project Dependencies",
      "Finish-to-Start",
      "Start-to-Start",
      "Finish-to-Finish",
      "Dependency Risk",
      "Dependency Alerts",
      "Critical Path",
      "Dependency History",
      "Dependency Reports",
    ],
  },
  {
    id: "resource-allocation",
    title: "Resource Allocation",
    description: "Plan employee, contractor and asset capacity.",
    icon: Users,
    items: [
      "Resource Dashboard",
      "Team Allocation",
      "Employee Capacity",
      "Skill Availability",
      "Resource Requests",
      "Resource Assignment",
      "Overallocated Resources",
      "Underutilised Resources",
      "Contractor Allocation",
      "Equipment Allocation",
      "Capacity Forecast",
      "Resource Reports",
    ],
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    description: "Coordinate discussions, updates and shared work.",
    icon: UserCheck,
    items: [
      "Project Conversations",
      "Task Comments",
      "Mentions",
      "Announcements",
      "Team Updates",
      "Shared Notes",
      "Decision Log",
      "Activity Feed",
      "Team Directory",
      "Notifications",
      "Collaboration History",
    ],
  },
  {
    id: "time-tracking",
    title: "Time Tracking",
    description: "Track hours, timesheets and task effort.",
    icon: Timer,
    items: [
      "Time Dashboard",
      "Start Timer",
      "Manual Time Entry",
      "Daily Timesheet",
      "Weekly Timesheet",
      "Task Hours",
      "Project Hours",
      "Billable Hours",
      "Non-Billable Hours",
      "Timesheet Approval",
      "Time Variance",
      "Time Reports",
    ],
  },
  {
    id: "project-budget",
    title: "Project Budget",
    description: "Control project cost, commitments and budget variance.",
    icon: CircleDollarSign,
    items: [
      "Budget Dashboard",
      "Project Budget",
      "Cost Categories",
      "Planned Cost",
      "Actual Cost",
      "Committed Cost",
      "Available Budget",
      "Budget Approval",
      "Budget Revision",
      "Cost Forecast",
      "Budget Variance",
      "Budget Reports",
    ],
  },
  {
    id: "risk-management",
    title: "Project Risk",
    description: "Identify, assess and mitigate project risks.",
    icon: AlertTriangle,
    items: [
      "Risk Register",
      "Create Risk",
      "Risk Category",
      "Probability",
      "Impact",
      "Risk Rating",
      "Risk Owner",
      "Mitigation Plan",
      "Contingency Plan",
      "Risk Review",
      "Risk History",
      "Risk Reports",
    ],
  },
  {
    id: "issue-management",
    title: "Issue Management",
    description: "Track blockers, defects and execution issues.",
    icon: Flag,
    items: [
      "Issue Register",
      "Create Issue",
      "Open Issues",
      "Critical Issues",
      "Issue Priority",
      "Issue Owner",
      "Root Cause",
      "Corrective Action",
      "Escalation",
      "Issue Resolution",
      "Issue History",
      "Issue Reports",
    ],
  },
  {
    id: "change-management",
    title: "Change Management",
    description: "Manage project scope, schedule and budget changes.",
    icon: Workflow,
    items: [
      "Change Requests",
      "Scope Changes",
      "Schedule Changes",
      "Budget Changes",
      "Resource Changes",
      "Impact Assessment",
      "Change Approval",
      "Change Implementation",
      "Change Communication",
      "Change History",
      "Change Reports",
    ],
  },
  {
    id: "approvals",
    title: "Project Approvals",
    description: "Control project, budget, milestone and change approvals.",
    icon: CheckCircle2,
    items: [
      "Project Approval",
      "Budget Approval",
      "Milestone Approval",
      "Task Approval",
      "Timesheet Approval",
      "Change Approval",
      "Expense Approval",
      "Document Approval",
      "Closure Approval",
      "Approval Matrix",
      "Delegation",
      "Approval History",
    ],
  },
  {
    id: "documents",
    title: "Project Documents",
    description: "Store project plans, files, records and deliverables.",
    icon: FileText,
    items: [
      "Document Library",
      "Project Charter",
      "Project Plan",
      "Scope Document",
      "Technical Documents",
      "Design Files",
      "Meeting Minutes",
      "Contracts",
      "Deliverables",
      "Version Control",
      "Document Approval",
      "Document Archive",
    ],
  },
  {
    id: "meetings",
    title: "Project Meetings",
    description: "Schedule meetings, record decisions and actions.",
    icon: CalendarDays,
    items: [
      "Meeting Calendar",
      "Schedule Meeting",
      "Meeting Agenda",
      "Attendees",
      "Meeting Notes",
      "Minutes of Meeting",
      "Decision Log",
      "Action Items",
      "Follow-Ups",
      "Meeting Recording",
      "Meeting History",
      "Meeting Reports",
    ],
  },
  {
    id: "client-projects",
    title: "Client Projects",
    description: "Manage customer-facing projects, delivery and billing.",
    icon: BriefcaseBusiness,
    items: [
      "Client Project Register",
      "Client Details",
      "Statement of Work",
      "Client Deliverables",
      "Client Milestones",
      "Client Approvals",
      "Client Communication",
      "Billing Milestones",
      "Client Feedback",
      "Client Issues",
      "Project Closure",
      "Client Project Reports",
    ],
  },
  {
    id: "internal-projects",
    title: "Internal Projects",
    description: "Manage enterprise, technology and departmental initiatives.",
    icon: Layers3,
    items: [
      "Internal Project Register",
      "Department Projects",
      "Technology Projects",
      "Process Improvement",
      "Compliance Projects",
      "Cost Saving Projects",
      "Innovation Projects",
      "Transformation Projects",
      "Internal Approvals",
      "Internal Benefits",
      "Project Closure",
      "Internal Project Reports",
    ],
  },
  {
    id: "project-performance",
    title: "Project Performance",
    description: "Measure schedule, cost, quality and delivery health.",
    icon: Target,
    items: [
      "Project Health",
      "Schedule Performance",
      "Cost Performance",
      "Milestone Performance",
      "Task Completion",
      "Resource Performance",
      "Quality Performance",
      "Risk Trend",
      "Issue Trend",
      "Delivery Score",
      "Project Scorecard",
      "Performance Reports",
    ],
  },
  {
    id: "project-analytics",
    title: "Project Analytics",
    description: "Analyse portfolio, workload, delays and outcomes.",
    icon: Activity,
    items: [
      "Portfolio Analytics",
      "Task Analytics",
      "Milestone Analytics",
      "Resource Analytics",
      "Time Analytics",
      "Budget Analytics",
      "Risk Analytics",
      "Issue Analytics",
      "Team Analytics",
      "Delivery Analytics",
      "Benefit Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "project-reports",
    title: "Project Reports",
    description: "Generate project, task, resource and delivery reports.",
    icon: FileBarChart,
    items: [
      "Executive Project Report",
      "Project Status Report",
      "Task Report",
      "Milestone Report",
      "Resource Report",
      "Timesheet Report",
      "Budget Report",
      "Risk Report",
      "Issue Report",
      "Change Report",
      "Closure Report",
      "Custom Reports",
    ],
  },
  {
    id: "project-settings",
    title: "Project Settings",
    description: "Configure project types, workflows and permissions.",
    icon: Settings2,
    items: [
      "Project ID Format",
      "Project Types",
      "Project Status",
      "Task Status",
      "Priority Levels",
      "Milestone Rules",
      "Approval Matrix",
      "Notification Settings",
      "Project Templates",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-projects",
    title: "KRVE AI Projects",
    description: "Use AI for planning, risk, workload and delivery decisions.",
    icon: Sparkles,
    items: [
      "AI Project Planner",
      "AI Task Breakdown",
      "AI Schedule Forecast",
      "AI Delay Prediction",
      "AI Risk Detection",
      "AI Resource Recommendation",
      "AI Budget Forecast",
      "AI Priority Recommendation",
      "AI Meeting Summary",
      "AI Status Report",
      "AI Project Health",
      "AI Project Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Active Projects", "17", "Across 7 departments", BriefcaseBusiness],
  ["Open Tasks", "184", "26 due this week", ListChecks],
  ["On Track", "82%", "Project health", CheckCircle2],
  ["At Risk", "3", "Need intervention", AlertTriangle],
];

export default function ProjectsTasksManagement() {
  const [selectedModule, setSelectedModule] =
    useState<ProjectModule | null>(null);
  const [search, setSearch] = useState("");

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return modules;

    return modules.filter((module) =>
      `${module.title} ${module.description} ${module.items.join(" ")}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  if (selectedModule) {
    return (
      <ModuleWorkspace
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <Hero />

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map(([title, value, note, Icon]) => (
          <MetricCard
            key={String(title)}
            title={String(title)}
            value={String(value)}
            note={String(note)}
            icon={Icon as IconType}
          />
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
          <Search size={18} className="text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects, tasks or workflows..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <X size={16} className="text-slate-400" />
            </button>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Complete Projects & Tasks Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete project workspace.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onOpen={() => setSelectedModule(module)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <FileBarChart size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Execution Management
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Projects & Tasks Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete execution management covering portfolios, plans, tasks,
            milestones, dependencies, resources, budgets, risks, analytics and
            KRVE AI Projects.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <ListChecks size={17} />
            Add Task
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Create Project
          </button>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  note,
  icon: Icon,
}: {
  title: string;
  value: string;
  note: string;
  icon: IconType;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function ModuleCard({
  module,
  onOpen,
}: {
  module: ProjectModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group min-h-[220px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">
        {module.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {module.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">
          {module.items.length} features
        </span>

        <span className="flex items-center gap-2 text-sm font-bold text-blue-600">
          Open
          <ChevronRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </span>
      </div>
    </button>
  );
}

function ModuleWorkspace({
  module,
  onBack,
}: {
  module: ProjectModule;
  onBack: () => void;
}) {
  const Icon = module.icon;

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-blue-100 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Project Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Project Workspace
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {module.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              {module.description}
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700">
            <Plus size={17} />
            Create New
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric title="Active Records" value="184" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Actions" value="26" note="Require attention" icon={BellRing} />
        <WorkspaceMetric title="Completed" value="82%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="8" note="Available exports" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its project workflow.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600">
            <FileBarChart size={17} />
            View Reports
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {module.items.map((item, index) => (
            <FeatureCard key={item} title={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

function WorkspaceMetric({
  title,
  value,
  note,
  icon: Icon,
}: {
  title: string;
  value: string;
  note: string;
  icon: IconType;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function FeatureCard({
  title,
  index,
}: {
  title: string;
  index: number;
}) {
  const icons: IconType[] = [
    BriefcaseBusiness,
    ListChecks,
    CalendarDays,
    Milestone,
    GitBranch,
    Users,
    Timer,
    IndianRupee,
    AlertTriangle,
    Flag,
    Workflow,
    FileText,
  ];

  const Icon = icons[index % icons.length];

  return (
    <button
      type="button"
      className="group min-h-[175px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-950">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Open and manage the complete {title.toLowerCase()} workflow.
      </p>

      <span className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
        Open
        <ArrowRight
          size={15}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}