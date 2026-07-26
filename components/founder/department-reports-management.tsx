"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Download,
  FileBarChart,
  FileCheck2,
  FileClock,
  FileSpreadsheet,
  FileText,
  Gauge,
  Headphones,
  IndianRupee,
  Landmark,
  LineChart,
  Mail,
  Megaphone,
  PackageSearch,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Truck,
  Users,
  Warehouse,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type DepartmentModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: DepartmentModule[] = [
  {
    id: "department-dashboard",
    title: "Department Reporting Dashboard",
    description: "View submission status, report volume, variances and reporting health across departments.",
    icon: BarChart3,
    items: [
      "Departments Enabled",
      "Reports This Month",
      "On-Time Submission",
      "Open Variances",
      "Pending Reviews",
      "Missing Reports",
      "Department Scores",
      "Submission Calendar",
      "AI Insights",
    ],
  },
  {
    id: "finance-department",
    title: "Finance Department Reports",
    description: "Complete finance reporting for accounting, cash, tax and profitability.",
    icon: CircleDollarSign,
    items: [
      "Profit & Loss",
      "Balance Sheet",
      "Cash Flow",
      "Trial Balance",
      "General Ledger",
      "Receivables Ageing",
      "Payables Ageing",
      "Budget Variance",
      "Expense Report",
      "Tax Report",
      "Treasury Report",
      "Finance MIS",
    ],
  },
  {
    id: "human-resources-department",
    title: "Human Resources Reports",
    description: "Workforce, recruitment, attendance, payroll and performance reporting.",
    icon: Users,
    items: [
      "Employee Summary",
      "Headcount Report",
      "Recruitment Report",
      "Attendance Report",
      "Leave Report",
      "Payroll Report",
      "Performance Report",
      "Training Report",
      "Attrition Report",
      "Engagement Report",
      "Workforce Cost",
      "HR MIS",
    ],
  },
  {
    id: "marketing-department",
    title: "Marketing Department Reports",
    description: "Campaign, audience, channel, attribution and growth reporting.",
    icon: Megaphone,
    items: [
      "Campaign Performance",
      "Marketing Spend",
      "ROAS Report",
      "Lead Report",
      "Audience Report",
      "Channel Report",
      "SEO Report",
      "Email Report",
      "WhatsApp Report",
      "Social Media Report",
      "Attribution Report",
      "Marketing MIS",
    ],
  },
  {
    id: "customer-support-department",
    title: "Customer Support Reports",
    description: "Ticket, SLA, response, resolution and customer satisfaction reporting.",
    icon: Headphones,
    items: [
      "Ticket Summary",
      "Open Tickets",
      "Closed Tickets",
      "SLA Report",
      "Response Time",
      "Resolution Time",
      "Agent Performance",
      "Channel Report",
      "Escalation Report",
      "Complaint Report",
      "CSAT Report",
      "Support MIS",
    ],
  },
  {
    id: "sales-department",
    title: "Sales Department Reports",
    description: "Sales, orders, pipeline, conversion and channel performance reporting.",
    icon: Target,
    items: [
      "Sales Summary",
      "Order Report",
      "Revenue Report",
      "Channel Sales",
      "Product Sales",
      "Regional Sales",
      "Conversion Report",
      "Average Order Value",
      "Sales Pipeline",
      "Win Rate",
      "Sales Forecast",
      "Sales MIS",
    ],
  },
  {
    id: "inventory-department",
    title: "Inventory Department Reports",
    description: "Stock, movement, valuation, ageing and replenishment reporting.",
    icon: PackageSearch,
    items: [
      "Stock Summary",
      "Stock Movement",
      "Stock Valuation",
      "Low Stock",
      "Out of Stock",
      "Dead Stock",
      "Ageing Report",
      "Transfer Report",
      "Adjustment Report",
      "Warehouse Stock",
      "Reorder Report",
      "Inventory MIS",
    ],
  },
  {
    id: "warehouse-department",
    title: "Warehouse Department Reports",
    description: "Receiving, storage, picking, packing and utilisation reporting.",
    icon: Warehouse,
    items: [
      "Warehouse Summary",
      "Receiving Report",
      "Putaway Report",
      "Storage Utilisation",
      "Picking Performance",
      "Packing Performance",
      "Cycle Count Report",
      "Damage Report",
      "Transfer Report",
      "Labour Productivity",
      "Warehouse SLA",
      "Warehouse MIS",
    ],
  },
  {
    id: "shipping-department",
    title: "Shipping Department Reports",
    description: "Shipment, courier, delivery, NDR and logistics performance reporting.",
    icon: Truck,
    items: [
      "Shipment Summary",
      "Courier Performance",
      "In-Transit Report",
      "Delivered Report",
      "Delay Report",
      "NDR Report",
      "RTO Report",
      "Freight Cost",
      "Delivery SLA",
      "Label Report",
      "Shipping Exceptions",
      "Shipping MIS",
    ],
  },
  {
    id: "procurement-department",
    title: "Procurement Department Reports",
    description: "Purchase order, supplier, spend, savings and delivery reporting.",
    icon: ClipboardCheck,
    items: [
      "Purchase Order Report",
      "Purchase Requisition Report",
      "RFQ Report",
      "Supplier Report",
      "Procurement Spend",
      "Category Spend",
      "Savings Report",
      "Lead Time Report",
      "Delivery Performance",
      "Contract Report",
      "Approval Report",
      "Procurement MIS",
    ],
  },
  {
    id: "crm-department",
    title: "CRM Department Reports",
    description: "Lead, opportunity, pipeline, follow-up and conversion reporting.",
    icon: Users,
    items: [
      "Lead Report",
      "Opportunity Report",
      "Pipeline Report",
      "Win Rate Report",
      "Follow-Up Report",
      "Sales Activity",
      "Account Report",
      "Contact Report",
      "Stage Conversion",
      "Pipeline Ageing",
      "Revenue Forecast",
      "CRM MIS",
    ],
  },
  {
    id: "vendor-management-department",
    title: "Vendor Management Reports",
    description: "Vendor onboarding, compliance, contracts and performance reporting.",
    icon: Building2,
    items: [
      "Vendor Summary",
      "Onboarding Report",
      "Verification Report",
      "Contract Report",
      "Performance Report",
      "Payment Report",
      "Compliance Report",
      "Risk Report",
      "Renewal Report",
      "Category Report",
      "Vendor Scorecard",
      "Vendor MIS",
    ],
  },
  {
    id: "projects-department",
    title: "Projects & Tasks Reports",
    description: "Project status, task, milestone, budget and resource reporting.",
    icon: Workflow,
    items: [
      "Project Status",
      "Task Report",
      "Milestone Report",
      "Resource Report",
      "Timesheet Report",
      "Budget Report",
      "Risk Report",
      "Issue Report",
      "Change Report",
      "Delivery Report",
      "Project Health",
      "Project MIS",
    ],
  },
  {
    id: "legal-department",
    title: "Legal & Compliance Reports",
    description: "Legal matters, contracts, licences, compliance and statutory reporting.",
    icon: ShieldCheck,
    items: [
      "Legal Matter Report",
      "Contract Report",
      "Compliance Report",
      "Licence Report",
      "Litigation Report",
      "Policy Report",
      "Regulatory Report",
      "Statutory Report",
      "Renewal Report",
      "Open Actions",
      "Legal Risk Report",
      "Legal MIS",
    ],
  },
  {
    id: "risk-department",
    title: "Risk Management Reports",
    description: "Enterprise risk, incident, control and mitigation reporting.",
    icon: AlertTriangle,
    items: [
      "Risk Register",
      "Risk Heatmap",
      "Incident Report",
      "Control Report",
      "Mitigation Report",
      "KRI Report",
      "Operational Risk",
      "Financial Risk",
      "Cyber Risk",
      "Vendor Risk",
      "Executive Risk Summary",
      "Risk MIS",
    ],
  },
  {
    id: "facilities-department",
    title: "Facilities & Assets Reports",
    description: "Asset, maintenance, utility, space and workplace reporting.",
    icon: Building2,
    items: [
      "Asset Register",
      "Asset Allocation",
      "Maintenance Report",
      "Depreciation Report",
      "Disposal Report",
      "Facility Report",
      "Utility Report",
      "Vendor Report",
      "Safety Report",
      "Compliance Report",
      "Space Report",
      "Facilities MIS",
    ],
  },
  {
    id: "commerce-department",
    title: "Commerce Department Reports",
    description: "Commerce operations, channels, pricing and checkout reporting.",
    icon: Store,
    items: [
      "Commerce Summary",
      "Orders Report",
      "Products Report",
      "Pricing Report",
      "Discount Report",
      "Sales Channel Report",
      "Abandoned Cart Report",
      "Checkout Report",
      "Returns Report",
      "Tracking Report",
      "Commerce Profitability",
      "Commerce MIS",
    ],
  },
  {
    id: "ai-department",
    title: "KRVE AI Department Reports",
    description: "AI usage, automation, forecasting and recommendation reporting.",
    icon: Sparkles,
    items: [
      "AI Usage Report",
      "AI Assistant Report",
      "Automation Report",
      "Forecast Report",
      "Anomaly Report",
      "Recommendation Report",
      "AI Savings Report",
      "AI Accuracy Report",
      "AI Governance Report",
      "AI Security Report",
      "AI Adoption Report",
      "AI MIS",
    ],
  },
  {
    id: "department-scorecards",
    title: "Department Scorecards",
    description: "Compare department KPIs, targets, performance and operating health.",
    icon: Gauge,
    items: [
      "Finance Scorecard",
      "HR Scorecard",
      "Marketing Scorecard",
      "Support Scorecard",
      "Sales Scorecard",
      "Inventory Scorecard",
      "Procurement Scorecard",
      "CRM Scorecard",
      "Project Scorecard",
      "Legal Scorecard",
      "Risk Scorecard",
      "Facilities Scorecard",
    ],
  },
  {
    id: "monthly-department-reports",
    title: "Monthly Department Reports",
    description: "Manage monthly reporting cycles, submissions and reviews.",
    icon: CalendarClock,
    items: [
      "Monthly Calendar",
      "Report Templates",
      "Submission Queue",
      "Pending Submissions",
      "Submitted Reports",
      "Late Submissions",
      "Review Queue",
      "Variance Comments",
      "Approval Status",
      "Monthly Pack",
      "Monthly History",
      "Monthly MIS",
    ],
  },
  {
    id: "department-variance",
    title: "Department Variance Analysis",
    description: "Analyse actual-versus-target performance and department explanations.",
    icon: Activity,
    items: [
      "Revenue Variance",
      "Expense Variance",
      "Headcount Variance",
      "Target Variance",
      "SLA Variance",
      "Project Variance",
      "Risk Variance",
      "Root Cause",
      "Department Comments",
      "Corrective Actions",
      "Variance History",
      "Variance Reports",
    ],
  },
  {
    id: "department-approvals",
    title: "Department Report Approvals",
    description: "Review and approve departmental reports before executive submission.",
    icon: CheckCircle2,
    items: [
      "Approval Queue",
      "Department Head Review",
      "Finance Review",
      "Risk Review",
      "Legal Review",
      "Founder Review",
      "Approve Report",
      "Reject Report",
      "Request Changes",
      "Publish Report",
      "Approval History",
      "Approval MIS",
    ],
  },
  {
    id: "department-schedules",
    title: "Department Report Schedules",
    description: "Schedule recurring report generation and submission reminders.",
    icon: FileClock,
    items: [
      "Daily Schedule",
      "Weekly Schedule",
      "Monthly Schedule",
      "Quarterly Schedule",
      "Annual Schedule",
      "Custom Schedule",
      "Submission Deadline",
      "Reminder Rules",
      "Escalation Rules",
      "Schedule Status",
      "Schedule History",
      "Schedule Reports",
    ],
  },
  {
    id: "department-distribution",
    title: "Department Report Distribution",
    description: "Distribute department reports to leadership and stakeholders.",
    icon: Mail,
    items: [
      "Department Heads",
      "Founder Distribution",
      "Leadership Distribution",
      "Finance Distribution",
      "Risk Distribution",
      "Secure Link",
      "Email Delivery",
      "Scheduled Delivery",
      "Recipient Groups",
      "Delivery Status",
      "Distribution History",
      "Distribution Reports",
    ],
  },
  {
    id: "department-report-builder",
    title: "Department Report Builder",
    description: "Create custom department reports with fields, filters and KPIs.",
    icon: FileSpreadsheet,
    items: [
      "Select Department",
      "Select Data Source",
      "Choose Fields",
      "Add Filters",
      "Add KPIs",
      "Add Charts",
      "Add Tables",
      "Add Commentary",
      "Preview Report",
      "Save Template",
      "Publish Report",
      "Report History",
    ],
  },
  {
    id: "department-analytics",
    title: "Department Report Analytics",
    description: "Analyse department reporting usage, quality and submission performance.",
    icon: LineChart,
    items: [
      "Submission Analytics",
      "On-Time Analytics",
      "Variance Analytics",
      "Department Usage",
      "Report Quality",
      "Approval Analytics",
      "Distribution Analytics",
      "Export Analytics",
      "Department Comparison",
      "Trend Analytics",
      "Executive Insights",
      "AI Predictions",
    ],
  },
  {
    id: "department-archive",
    title: "Department Report Archive",
    description: "Store and retrieve historical department reports securely.",
    icon: FileText,
    items: [
      "Finance Archive",
      "HR Archive",
      "Marketing Archive",
      "Support Archive",
      "Procurement Archive",
      "CRM Archive",
      "Project Archive",
      "Legal Archive",
      "Risk Archive",
      "Facilities Archive",
      "Search Archive",
      "Archive Reports",
    ],
  },
  {
    id: "department-settings",
    title: "Department Report Settings",
    description: "Configure templates, deadlines, approvals and permissions.",
    icon: Settings2,
    items: [
      "Department List",
      "Report Templates",
      "Submission Deadlines",
      "Approval Matrix",
      "Variance Thresholds",
      "Reminder Rules",
      "Escalation Rules",
      "Distribution Settings",
      "Notification Settings",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
];

const dashboardMetrics = [
  ["Departments", "12", "All reporting enabled", Building2],
  ["Reports This Month", "148", "Across departments", FileBarChart],
  ["On-Time Submission", "94%", "Current cycle", CheckCircle2],
  ["Open Variances", "16", "Need explanation", AlertTriangle],
];

export default function DepartmentReportsManagement() {
  const [selectedModule, setSelectedModule] =
    useState<DepartmentModule | null>(null);
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
        <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white">
          <Search size={18} className="text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search department reports, scorecards or MIS..."
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
            Complete Department Reporting
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete departmental reporting workspace.
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
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <Building2 size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Department Intelligence
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Department Reports Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Access consistent operational, financial and performance reporting
            for every KRVE department, including scorecards, submissions,
            variances, approvals, schedules and monthly MIS.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Building2 size={17} />
            Select Department
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Sparkles size={17} />
            Generate Monthly Report
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
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
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
  module: DepartmentModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group min-h-[220px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-violet-400 hover:shadow-xl"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600">
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

        <span className="flex items-center gap-2 text-sm font-bold text-violet-600">
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
  module: DepartmentModule;
  onBack: () => void;
}) {
  const Icon = module.icon;
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-violet-100 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Department Reports
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Department Reporting Workspace
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {module.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
              {module.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold">
              <Download size={17} />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700">
              <Plus size={17} />
              Generate Report
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric title="Reports This Month" value="18" note="Current department" icon={FileBarChart} />
        <WorkspaceMetric title="On-Time Submission" value="94%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Open Variances" value="3" note="Need explanation" icon={AlertTriangle} />
        <WorkspaceMetric title="Pending Reviews" value="2" note="Leadership review" icon={BellRing} />
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {["Overview", "Reports", "Scorecard", "Variances", "Submissions"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                  activeTab === tab
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "Overview" && <OverviewPanel module={module} />}

          {activeTab === "Reports" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {module.items.map((item, index) => (
                <FeatureCard key={item} title={item} index={index} />
              ))}
            </div>
          )}

          {activeTab === "Scorecard" && <ScorecardPanel />}

          {activeTab === "Variances" && <VariancePanel />}

          {activeTab === "Submissions" && <SubmissionPanel module={module} />}
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
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Icon size={21} />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function OverviewPanel({ module }: { module: DepartmentModule }) {
  const bars = [58, 65, 61, 74, 79, 83, 88, 94];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              {module.title} Performance
            </h3>
            <p className="mt-1 text-sm text-slate-500">Current reporting cycle</p>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            +9.8%
          </span>
        </div>

        <div className="mt-7 flex h-64 items-end gap-4">
          {bars.map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-xl bg-gradient-to-t from-violet-600 to-blue-500"
                style={{ height: `${height}%` }}
              />
              <span className="text-[10px] font-semibold text-slate-400">
                P{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-black text-slate-950">Submission Status</h3>
        <p className="mt-1 text-sm text-slate-500">Current month</p>

        <div className="mt-6 space-y-5">
          {[
            ["Submitted", "82%", "bg-green-500"],
            ["Under Review", "12%", "bg-blue-500"],
            ["Overdue", "6%", "bg-red-500"],
          ].map(([label, value, color]) => (
            <div key={label}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">{label}</span>
                <span className="text-sm font-black text-slate-950">{value}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${color}`} style={{ width: value }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScorecardPanel() {
  const scorecards = [
    ["Reporting Quality", "92", "Strong"],
    ["On-Time Submission", "94", "Excellent"],
    ["Variance Control", "84", "Stable"],
    ["Approval Speed", "88", "Healthy"],
    ["Data Accuracy", "96", "Excellent"],
    ["Action Closure", "81", "Watch"],
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {scorecards.map(([title, score, status]) => (
        <article key={title} className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <div className="mt-3 flex items-end justify-between">
            <h3 className="text-3xl font-black text-slate-950">{score}/100</h3>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
              {status}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

function VariancePanel() {
  const rows = [
    ["Revenue", "₹18.40L", "₹17.80L", "+3.4%", "Positive"],
    ["Operating Cost", "₹6.20L", "₹5.80L", "+6.9%", "Review"],
    ["Headcount", "128", "132", "-3.0%", "Watch"],
    ["SLA", "94%", "96%", "-2.0%", "Watch"],
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4">Metric</th>
            <th className="px-5 py-4">Actual</th>
            <th className="px-5 py-4">Target</th>
            <th className="px-5 py-4">Variance</th>
            <th className="px-5 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([metric, actual, target, variance, status]) => (
            <tr key={metric} className="border-t border-slate-200">
              <td className="px-5 py-4 font-bold text-slate-950">{metric}</td>
              <td className="px-5 py-4 text-slate-600">{actual}</td>
              <td className="px-5 py-4 text-slate-600">{target}</td>
              <td className="px-5 py-4 font-semibold text-slate-700">{variance}</td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                  status === "Positive"
                    ? "bg-green-100 text-green-700"
                    : status === "Review"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                }`}>
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SubmissionPanel({ module }: { module: DepartmentModule }) {
  const submissions = [
    [`Monthly ${module.title}`, "Submitted", "26 Jul 2026"],
    ["KPI Scorecard", "Under Review", "25 Jul 2026"],
    ["Variance Explanation", "Pending", "Due 28 Jul 2026"],
    ["Management Commentary", "Draft", "Due 29 Jul 2026"],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {submissions.map(([name, status, date], index) => (
        <div
          key={name}
          className={`flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center ${
            index !== submissions.length - 1 ? "border-b border-slate-200" : ""
          }`}
        >
          <div>
            <p className="font-bold text-slate-950">{name}</p>
            <p className="mt-1 text-sm text-slate-500">{date}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${
              status === "Submitted"
                ? "bg-green-100 text-green-700"
                : status === "Under Review"
                  ? "bg-blue-100 text-blue-700"
                  : status === "Pending"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-slate-100 text-slate-600"
            }`}>
              {status}
            </span>
            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
              Open
            </button>
          </div>
        </div>
      ))}
    </div>
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
    Building2,
    CircleDollarSign,
    Users,
    Megaphone,
    Headphones,
    Target,
    PackageSearch,
    Warehouse,
    Truck,
    ClipboardCheck,
    ShieldCheck,
    Sparkles,
  ];

  const Icon = icons[index % icons.length];

  return (
    <button
      type="button"
      className="group min-h-[180px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-violet-400 hover:bg-violet-50/30 hover:shadow-lg"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Icon size={20} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-950">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Open and manage the complete {title.toLowerCase()} reporting workflow.
      </p>

      <span className="mt-4 flex items-center gap-2 text-xs font-bold text-violet-600">
        Open
        <ArrowRight size={15} className="transition group-hover:translate-x-1" />
      </span>
    </button>
  );
}