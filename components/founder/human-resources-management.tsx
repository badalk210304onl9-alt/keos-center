"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  FileBarChart,
  FileText,
  Gift,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  IdCard,
  IndianRupee,
  Laptop,
  Layers3,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  PackageCheck,
  Plane,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ModuleId =
  | "hr-dashboard"
  | "workforce-planning"
  | "recruitment"
  | "onboarding"
  | "employee-management"
  | "attendance"
  | "leave-management"
  | "payroll"
  | "statutory-compliance"
  | "performance-management"
  | "learning-development"
  | "employee-engagement"
  | "helpdesk"
  | "employee-relations"
  | "travel-expense"
  | "asset-management"
  | "exit-management"
  | "hr-analytics"
  | "documents"
  | "organization"
  | "settings"
  | "krve-ai-hr";

type HRModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: HRModule[] = [
  {
    id: "hr-dashboard",
    title: "HR Dashboard",
    description: "View complete people KPIs and workforce status.",
    icon: BarChart3,
    items: [
      "HR KPIs",
      "Total Employees",
      "Active Employees",
      "New Joiners",
      "Attrition Rate",
      "Attendance",
      "Payroll Status",
      "Leave Summary",
      "AI Insights",
    ],
  },
  {
    id: "workforce-planning",
    title: "Workforce Planning",
    description: "Plan manpower, headcount and future organisation needs.",
    icon: Network,
    items: [
      "Manpower Planning",
      "Headcount Planning",
      "Department Wise Strength",
      "Position Budget",
      "Hiring Forecast",
      "Succession Planning",
      "Organization Planning",
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment",
    description: "Manage the complete hiring pipeline and candidate journey.",
    icon: BriefcaseBusiness,
    items: [
      "Job Requisitions",
      "Vacancy Approval",
      "Careers Portal",
      "Applicant Tracking (ATS)",
      "Resume Database",
      "AI Resume Screening",
      "Interview Scheduling",
      "Interview Feedback",
      "Offer Approval",
      "Offer Letter",
      "Candidate Pipeline",
      "Campus Hiring",
      "Referral Hiring",
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding",
    description: "Handle joining, documents, access and induction workflows.",
    icon: UserPlus,
    items: [
      "Employee Registration",
      "Document Collection",
      "Background Verification",
      "Joining Kit",
      "Welcome Workflow",
      "Asset Allocation",
      "Department Allocation",
      "Reporting Manager",
      "Induction Program",
      "Employee ID Generation",
    ],
  },
  {
    id: "employee-management",
    title: "Employee Management",
    description: "Maintain complete employee master and employment history.",
    icon: Users,
    items: [
      "Employee Directory",
      "Employee Master",
      "Personal Details",
      "Contact Details",
      "Emergency Contacts",
      "Family Details",
      "Bank Details",
      "PAN / Aadhaar",
      "Passport",
      "Visa",
      "Education",
      "Experience",
      "Skills",
      "Certifications",
      "Transfer History",
      "Promotion History",
    ],
  },
  {
    id: "attendance",
    title: "Attendance",
    description: "Manage shifts, check-ins, overtime and corrections.",
    icon: CalendarCheck,
    items: [
      "Daily Attendance",
      "Biometric Sync",
      "GPS Attendance",
      "Web Check-in",
      "Shift Management",
      "Roster Management",
      "Overtime",
      "Attendance Correction",
      "Late Coming",
      "Early Leaving",
      "Attendance Reports",
    ],
  },
  {
    id: "leave-management",
    title: "Leave Management",
    description: "Control leave balances, requests, approvals and holidays.",
    icon: CalendarDays,
    items: [
      "Leave Types",
      "Leave Balance",
      "Leave Request",
      "Leave Approval",
      "Holiday Calendar",
      "Comp Off",
      "Maternity Leave",
      "Paternity Leave",
      "Sick Leave",
      "Leave Encashment",
    ],
  },
  {
    id: "payroll",
    title: "Payroll",
    description: "Process salaries, incentives, deductions and payroll reports.",
    icon: IndianRupee,
    items: [
      "Payroll Dashboard",
      "Salary Structure",
      "Payroll Processing",
      "Payroll Approval",
      "Payslips",
      "Bonuses",
      "Incentives",
      "Arrears",
      "Reimbursements",
      "Loans & Advances",
      "Salary Revision",
      "Payroll Reports",
    ],
  },
  {
    id: "statutory-compliance",
    title: "Statutory Compliance",
    description: "Manage employee-related statutory obligations and filings.",
    icon: ShieldCheck,
    items: [
      "PF",
      "ESI",
      "Professional Tax",
      "TDS",
      "Labour Welfare Fund",
      "Gratuity",
      "Bonus",
      "Full & Final Settlement",
      "Compliance Reports",
    ],
  },
  {
    id: "performance-management",
    title: "Performance Management",
    description: "Manage goals, reviews, appraisals and development decisions.",
    icon: Target,
    items: [
      "Goal Setting",
      "KPI",
      "KRA",
      "OKR",
      "Self Assessment",
      "Manager Review",
      "360 Feedback",
      "Promotion Recommendation",
      "Increment Recommendation",
      "Appraisal Cycle",
    ],
  },
  {
    id: "learning-development",
    title: "Learning & Development",
    description: "Manage learning, courses, skills and certifications.",
    icon: GraduationCap,
    items: [
      "LMS",
      "Courses",
      "Training Calendar",
      "Skill Matrix",
      "Certifications",
      "Assessments",
      "Training Reports",
      "AI Learning Recommendations",
    ],
  },
  {
    id: "employee-engagement",
    title: "Employee Engagement",
    description: "Manage surveys, recognition, events and internal communication.",
    icon: HeartHandshake,
    items: [
      "Surveys",
      "Polls",
      "Recognition",
      "Rewards",
      "Birthday Calendar",
      "Anniversary",
      "Events",
      "Suggestions",
      "Internal News",
    ],
  },
  {
    id: "helpdesk",
    title: "HR Helpdesk",
    description: "Handle employee questions, requests and escalations.",
    icon: HelpCircle,
    items: [
      "HR Tickets",
      "Policy Questions",
      "Salary Queries",
      "Attendance Queries",
      "Leave Queries",
      "Complaint Box",
      "Escalations",
    ],
  },
  {
    id: "employee-relations",
    title: "Employee Relations",
    description: "Manage grievances, disciplinary actions and investigations.",
    icon: MessageSquare,
    items: [
      "Grievances",
      "Disciplinary Actions",
      "Warning Letters",
      "Suspension",
      "Legal Cases",
      "Internal Investigations",
    ],
  },
  {
    id: "travel-expense",
    title: "Travel & Expense",
    description: "Manage travel approval and employee expense claims.",
    icon: Plane,
    items: [
      "Travel Requests",
      "Travel Approval",
      "Expense Claims",
      "Expense Approval",
      "Reimbursements",
    ],
  },
  {
    id: "asset-management",
    title: "Asset Management",
    description: "Track assets issued to employees and their return.",
    icon: Laptop,
    items: [
      "Laptop",
      "Mobile",
      "SIM",
      "ID Card",
      "Access Card",
      "Vehicle",
      "Uniform",
      "Asset Return",
    ],
  },
  {
    id: "exit-management",
    title: "Exit Management",
    description: "Manage resignation, notice period, clearance and final settlement.",
    icon: ArrowRight,
    items: [
      "Resignation",
      "Notice Period",
      "Exit Interview",
      "Asset Return",
      "Clearance Workflow",
      "Full & Final Settlement",
      "Experience Letter",
      "Relieving Letter",
      "Alumni Database",
    ],
  },
  {
    id: "hr-analytics",
    title: "HR Analytics",
    description: "Analyse workforce, hiring, payroll and performance data.",
    icon: ChartNoAxesCombined,
    items: [
      "Attrition Dashboard",
      "Diversity Dashboard",
      "Salary Analytics",
      "Attendance Analytics",
      "Leave Analytics",
      "Hiring Analytics",
      "Performance Analytics",
      "Payroll Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "documents",
    title: "Documents",
    description: "Create and manage official HR letters, policies and templates.",
    icon: FileText,
    items: [
      "Offer Letters",
      "Appointment Letters",
      "Confirmation Letters",
      "Promotion Letters",
      "Salary Revision Letters",
      "Experience Letters",
      "Relieving Letters",
      "Policies",
      "Templates",
    ],
  },
  {
    id: "organization",
    title: "Organization",
    description: "Manage company structure, locations and reporting hierarchy.",
    icon: Building2,
    items: [
      "Company Structure",
      "Departments",
      "Teams",
      "Branches",
      "Locations",
      "Cost Centers",
      "Reporting Hierarchy",
      "Organization Chart",
    ],
  },
  {
    id: "settings",
    title: "HR Settings",
    description: "Configure policies, rules, roles and permissions.",
    icon: Settings2,
    items: [
      "HR Policies",
      "Leave Rules",
      "Payroll Rules",
      "Attendance Rules",
      "Shift Rules",
      "Holidays",
      "Designations",
      "Departments",
      "Roles",
      "Permissions",
    ],
  },
  {
    id: "krve-ai-hr",
    title: "KRVE AI HR",
    description: "Use AI for hiring, performance, salary and workforce decisions.",
    icon: Sparkles,
    items: [
      "AI Resume Screening",
      "AI Candidate Ranking",
      "AI Interview Assistant",
      "AI Performance Analysis",
      "AI Attrition Prediction",
      "AI Salary Recommendation",
      "AI Learning Recommendation",
      "AI Workforce Forecasting",
      "AI HR Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Total Employees", "128", "124 currently active", Users],
  ["Open Positions", "14", "Across 6 departments", BriefcaseBusiness],
  ["Attendance", "94.6%", "Current month", CalendarCheck],
  ["Payroll", "₹18.42L", "Next cycle estimate", IndianRupee],
];

export default function HumanResourcesManagement() {
  const [selectedModule, setSelectedModule] = useState<HRModule | null>(null);
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
            placeholder="Search HR modules, features or workflows..."
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
            Complete HR Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete HR workspace.
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
              <UserCheck size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              People Operations
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Human Resources Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete enterprise HR covering planning, recruitment, employees,
            attendance, payroll, performance, compliance, engagement, exits,
            analytics and KRVE AI HR.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <BriefcaseBusiness size={17} />
            Open Recruitment
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Add Employee
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
  module: HRModule;
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
  module: HRModule;
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
          Back to HR Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                HR Workspace
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
        <WorkspaceMetric title="Active Records" value="128" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Actions" value="14" note="Require attention" icon={Clock3} />
        <WorkspaceMetric title="Completed" value="96%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="8" note="Available exports" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its workflow.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600">
            <FileBarChart size={17} />
            View Reports
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {module.items.map((item, index) => (
            <FeatureCard
              key={item}
              title={item}
              index={index}
            />
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
    ClipboardCheck,
    UserCog,
    BadgeCheck,
    Mail,
    IdCard,
    PackageCheck,
    WalletCards,
    MapPin,
    BookOpen,
    CircleDollarSign,
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

      <h3 className="mt-4 text-sm font-black text-slate-950">
        {title}
      </h3>

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