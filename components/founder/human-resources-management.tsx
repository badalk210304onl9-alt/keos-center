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
      "PAN / [National ID Redacted]",
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
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

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
      <Hero onOpenAdd={() => setIsAddEmployeeOpen(true)} />

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

      {/* RENDER MODAL WITHOUT ALTERING UNDERLYING PAGE DESIGN */}
      {isAddEmployeeOpen && (
        <AddEmployeeModal onClose={() => setIsAddEmployeeOpen(false)} />
      )}
    </div>
  );
}

function Hero({ onOpenAdd }: { onOpenAdd: () => void }) {
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

          {/* EXACT SAME DESIGN & CLASSES WITH CLICK LISTENER ATTACHED */}
          <button
            type="button"
            onClick={onOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 cursor-pointer"
          >
            <Plus size={17} />
            Add Employee
          </button>
        </div>
      </div>
    </section>
  );
}

function AddEmployeeModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("AI Technical Team");
  const [department, setDepartment] = useState("Technology & AI");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Employee ${name} added successfully.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
              <UserPlus size={18} />
            </div>
            <h3 className="text-base font-black text-slate-950">Add New Employee</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="mb-1 block font-semibold text-slate-600">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-600">Corporate Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@krve.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-600">Temporary Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border
