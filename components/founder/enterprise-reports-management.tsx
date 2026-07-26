"use client";

import {
  Activity,
  AlertTriangle,
  Archive,
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
  FileArchive,
  FileBarChart,
  FileCheck2,
  FileClock,
  FileCog,
  FileSpreadsheet,
  FileText,
  Filter,
  Gauge,
  IndianRupee,
  LineChart,
  Mail,
  PackageSearch,
  PieChart,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
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

type ReportModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const reportModules: ReportModule[] = [
  {
    id: "reports-dashboard",
    title: "Reports Dashboard",
    description: "View report volume, schedules, reviews, exports and enterprise reporting health.",
    icon: BarChart3,
    items: [
      "Reports Available",
      "Scheduled Reports",
      "Generated Today",
      "Pending Reviews",
      "Failed Reports",
      "Department Usage",
      "Popular Reports",
      "Export Volume",
      "AI Insights",
    ],
  },
  {
    id: "executive-reports",
    title: "Executive Reports",
    description: "Generate founder-level summaries for company performance and strategic review.",
    icon: TrendingUp,
    items: [
      "Executive Summary",
      "Founder Dashboard",
      "Monthly Business Review",
      "Quarterly Business Review",
      "Annual Business Review",
      "Revenue Overview",
      "Cash Overview",
      "Customer Overview",
      "People Overview",
      "Risk Overview",
      "Strategic KPI Report",
      "Board Pack",
    ],
  },
  {
    id: "department-reports",
    title: "Department Reports",
    description: "Access consolidated and detailed reports for every KEOS department.",
    icon: Building2,
    items: [
      "Finance Reports",
      "HR Reports",
      "Marketing Reports",
      "Customer Support Reports",
      "Procurement Reports",
      "CRM Reports",
      "Vendor Reports",
      "Project Reports",
      "Document Reports",
      "Legal Reports",
      "Risk Reports",
      "Facilities Reports",
    ],
  },
  {
    id: "finance-reports",
    title: "Financial Reports",
    description: "Generate accounting, cash, tax, receivable, payable and profitability reports.",
    icon: CircleDollarSign,
    items: [
      "Profit & Loss",
      "Balance Sheet",
      "Cash Flow Statement",
      "Trial Balance",
      "General Ledger",
      "Receivables Ageing",
      "Payables Ageing",
      "Bank Reconciliation",
      "Expense Report",
      "Budget Variance",
      "Tax Report",
      "Financial MIS",
    ],
  },
  {
    id: "sales-reports",
    title: "Sales Reports",
    description: "Analyse revenue, orders, conversion, channels and sales performance.",
    icon: Target,
    items: [
      "Sales Summary",
      "Order Report",
      "Revenue Report",
      "Channel Sales",
      "Product Sales",
      "Category Sales",
      "Regional Sales",
      "Conversion Report",
      "Average Order Value",
      "Sales Trend",
      "Sales Variance",
      "Sales Forecast",
    ],
  },
  {
    id: "marketing-reports",
    title: "Marketing Reports",
    description: "Track campaign performance, ROAS, leads, channels and attribution.",
    icon: Sparkles,
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
      "Marketing Forecast",
    ],
  },
  {
    id: "customer-reports",
    title: "Customer Reports",
    description: "Analyse customer growth, retention, value, behaviour and satisfaction.",
    icon: Users,
    items: [
      "Customer Summary",
      "Customer Growth",
      "Active Customers",
      "Customer Segments",
      "Retention Report",
      "Churn Report",
      "Customer LTV",
      "Repeat Purchase",
      "Loyalty Report",
      "Customer Satisfaction",
      "Customer Behaviour",
      "Customer Forecast",
    ],
  },
  {
    id: "hr-reports",
    title: "Human Resources Reports",
    description: "Generate workforce, hiring, attendance, payroll and performance reports.",
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
      "Diversity Report",
      "Manpower Cost",
      "Workforce Forecast",
    ],
  },
  {
    id: "inventory-reports",
    title: "Inventory Reports",
    description: "Monitor stock levels, movement, valuation, ageing and replenishment.",
    icon: PackageSearch,
    items: [
      "Stock Summary",
      "Stock Movement",
      "Stock Valuation",
      "Low Stock Report",
      "Out of Stock Report",
      "Dead Stock Report",
      "Ageing Report",
      "Transfer Report",
      "Adjustment Report",
      "Warehouse Stock",
      "Reorder Report",
      "Inventory Forecast",
    ],
  },
  {
    id: "procurement-reports",
    title: "Procurement Reports",
    description: "Analyse purchase orders, vendors, spend, savings and supplier performance.",
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
      "Procurement Forecast",
    ],
  },
  {
    id: "crm-reports",
    title: "CRM Reports",
    description: "Track leads, opportunities, pipeline, follow-ups and sales conversion.",
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
      "CRM Performance",
    ],
  },
  {
    id: "support-reports",
    title: "Customer Support Reports",
    description: "Measure tickets, response time, resolution, SLA and customer satisfaction.",
    icon: BellRing,
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
      "Support Trends",
    ],
  },
  {
    id: "project-reports",
    title: "Project Reports",
    description: "Track project status, tasks, milestones, cost, resources and delivery.",
    icon: Workflow,
    items: [
      "Project Status Report",
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
      "Portfolio Report",
    ],
  },
  {
    id: "legal-reports",
    title: "Legal & Compliance Reports",
    description: "Generate legal matters, contracts, licences, audit and compliance reports.",
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
      "Audit Report",
      "Renewal Report",
      "Open Actions Report",
      "Legal Risk Report",
    ],
  },
  {
    id: "risk-reports",
    title: "Risk Reports",
    description: "Analyse enterprise risks, controls, incidents and mitigation progress.",
    icon: AlertTriangle,
    items: [
      "Enterprise Risk Report",
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
    ],
  },
  {
    id: "audit-reports",
    title: "Audit Reports",
    description: "Generate internal audit, control, access and exception reports.",
    icon: FileCheck2,
    items: [
      "Audit Plan",
      "Audit Findings",
      "Control Testing",
      "Access Audit",
      "Approval Audit",
      "Transaction Audit",
      "Document Audit",
      "Security Audit",
      "Compliance Audit",
      "Corrective Actions",
      "Audit Closure",
      "Audit Summary",
    ],
  },
  {
    id: "ai-reports",
    title: "AI Reports",
    description: "Generate AI usage, automation, recommendation and forecasting reports.",
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
      "AI Executive Summary",
    ],
  },
  {
    id: "scheduled-reports",
    title: "Scheduled Reports",
    description: "Schedule automatic generation and delivery of recurring reports.",
    icon: CalendarClock,
    items: [
      "Daily Reports",
      "Weekly Reports",
      "Monthly Reports",
      "Quarterly Reports",
      "Annual Reports",
      "Custom Schedule",
      "Recipient List",
      "Email Delivery",
      "Approval Before Send",
      "Schedule Status",
      "Schedule History",
      "Schedule Reports",
    ],
  },
  {
    id: "custom-report-builder",
    title: "Custom Report Builder",
    description: "Create reports using custom fields, filters, grouping and calculations.",
    icon: FileCog,
    items: [
      "Select Data Source",
      "Choose Fields",
      "Add Filters",
      "Add Grouping",
      "Add Sorting",
      "Add Calculations",
      "Add Charts",
      "Add KPI Cards",
      "Report Preview",
      "Save Template",
      "Publish Report",
      "Report History",
    ],
  },
  {
    id: "kpi-dashboard",
    title: "KPI Dashboard",
    description: "Build and monitor enterprise and departmental KPI dashboards.",
    icon: Gauge,
    items: [
      "Executive KPIs",
      "Finance KPIs",
      "Sales KPIs",
      "Marketing KPIs",
      "Customer KPIs",
      "HR KPIs",
      "Operations KPIs",
      "Risk KPIs",
      "Custom KPIs",
      "KPI Targets",
      "KPI Alerts",
      "KPI History",
    ],
  },
  {
    id: "report-analytics",
    title: "Report Analytics",
    description: "Analyse report usage, performance, access and business impact.",
    icon: Activity,
    items: [
      "Most Viewed Reports",
      "Most Downloaded Reports",
      "Department Usage",
      "User Usage",
      "Schedule Performance",
      "Export Analytics",
      "Delivery Analytics",
      "Approval Analytics",
      "Report Ageing",
      "Report Accuracy",
      "Report Trends",
      "AI Insights",
    ],
  },
  {
    id: "export-center",
    title: "Export Center",
    description: "Export reports to PDF, Excel, CSV and dashboard formats.",
    icon: Download,
    items: [
      "Export PDF",
      "Export Excel",
      "Export CSV",
      "Export Dashboard",
      "Bulk Export",
      "Custom Layout",
      "Include Charts",
      "Include Attachments",
      "Password Protection",
      "Export Queue",
      "Export History",
      "Export Reports",
    ],
  },
  {
    id: "report-distribution",
    title: "Report Distribution",
    description: "Distribute reports through email, secure links and internal access.",
    icon: Mail,
    items: [
      "Email Distribution",
      "Internal Sharing",
      "Secure Link",
      "Department Distribution",
      "Role-Based Distribution",
      "Scheduled Distribution",
      "Approval Distribution",
      "Recipient Groups",
      "Delivery Status",
      "Failed Delivery",
      "Distribution History",
      "Distribution Reports",
    ],
  },
  {
    id: "report-approval",
    title: "Report Approval",
    description: "Review, approve, reject and publish controlled reports.",
    icon: CheckCircle2,
    items: [
      "Approval Queue",
      "Department Approval",
      "Finance Approval",
      "Founder Approval",
      "Legal Approval",
      "Risk Approval",
      "Approve Report",
      "Reject Report",
      "Request Changes",
      "Publish Report",
      "Approval History",
      "Approval Reports",
    ],
  },
  {
    id: "report-versions",
    title: "Report Version History",
    description: "Track revisions, compare versions and restore earlier reports.",
    icon: FileClock,
    items: [
      "Version History",
      "Create Version",
      "Compare Versions",
      "Restore Version",
      "Draft Version",
      "Approved Version",
      "Published Version",
      "Version Notes",
      "Version Owner",
      "Version Lock",
      "Version History",
      "Version Reports",
    ],
  },
  {
    id: "report-templates",
    title: "Report Templates",
    description: "Manage reusable enterprise, department and executive templates.",
    icon: FileSpreadsheet,
    items: [
      "Executive Templates",
      "Finance Templates",
      "Sales Templates",
      "Marketing Templates",
      "HR Templates",
      "Operations Templates",
      "Risk Templates",
      "Audit Templates",
      "Custom Templates",
      "Template Approval",
      "Template Versions",
      "Template Reports",
    ],
  },
  {
    id: "report-archive",
    title: "Report Archive",
    description: "Archive historical reports and manage long-term records.",
    icon: Archive,
    items: [
      "Archive Dashboard",
      "Archived Reports",
      "Yearly Archive",
      "Department Archive",
      "Executive Archive",
      "Financial Archive",
      "Audit Archive",
      "Search Archive",
      "Restore Report",
      "Retention Rules",
      "Archive History",
      "Archive Reports",
    ],
  },
  {
    id: "report-settings",
    title: "Report Settings",
    description: "Configure numbering, formats, schedules, approvals and permissions.",
    icon: Settings2,
    items: [
      "Report ID Format",
      "Default Format",
      "Default Currency",
      "Date Format",
      "Approval Matrix",
      "Schedule Defaults",
      "Export Settings",
      "Distribution Settings",
      "Notification Settings",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
];

const dashboardMetrics = [
  ["Reports Available", "86", "Across all functions", FileBarChart],
  ["Scheduled Reports", "24", "Automatic delivery", CalendarClock],
  ["Generated Today", "38", "PDF, Excel and dashboard", FileText],
  ["Pending Reviews", "7", "Management approval", CheckCircle2],
];

export default function EnterpriseReportsManagement() {
  const [selectedModule, setSelectedModule] =
    useState<ReportModule | null>(null);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reportModules.filter((module) => {
      const matchesSearch =
        !query ||
        `${module.title} ${module.description} ${module.items.join(" ")}`
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        module.title.toLowerCase().includes(departmentFilter.toLowerCase()) ||
        module.items.some((item) =>
          item.toLowerCase().includes(departmentFilter.toLowerCase()),
        );

      return matchesSearch && matchesDepartment;
    });
  }, [search, departmentFilter]);

  if (selectedModule) {
    return (
      <ReportWorkspace
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
        <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
          <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white">
            <Search size={18} className="text-slate-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reports, departments or formats..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />

            {search && (
              <button type="button" onClick={() => setSearch("")}>
                <X size={16} className="text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
            <Filter size={17} className="text-slate-400" />
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-700 outline-none"
            >
              <option>All Departments</option>
              <option>Finance</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Customer</option>
              <option>HR</option>
              <option>Inventory</option>
              <option>Procurement</option>
              <option>CRM</option>
              <option>Project</option>
              <option>Legal</option>
              <option>Risk</option>
              <option>Audit</option>
              <option>AI</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              Complete Enterprise Reporting
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tap any card to open its full report workspace, filters, exports
              and report controls.
            </p>
          </div>

          <p className="text-sm font-semibold text-slate-400">
            {filteredModules.length} reporting modules
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
              <FileBarChart size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Enterprise Reporting
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Enterprise Reports Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Generate, schedule, approve, export and distribute company,
            departmental, operational, financial, audit and AI-powered reports
            from one enterprise reporting center.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <CalendarClock size={17} />
            Schedule Report
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Sparkles size={17} />
            Generate Report
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
  module: ReportModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group min-h-[225px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-violet-400 hover:shadow-xl"
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

function ReportWorkspace({
  module,
  onBack,
}: {
  module: ReportModule;
  onBack: () => void;
}) {
  const Icon = module.icon;
  const [activeView, setActiveView] = useState("Overview");
  const [dateRange, setDateRange] = useState("This Month");

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-violet-100 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Enterprise Reports
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Reporting Workspace
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
            <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
              <CalendarClock size={17} />
              Schedule
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700">
              <Plus size={17} />
              Generate Report
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric
          title="Reports Available"
          value="24"
          note="Current module"
          icon={FileBarChart}
        />
        <WorkspaceMetric
          title="Generated Today"
          value="12"
          note="Successful outputs"
          icon={FileText}
        />
        <WorkspaceMetric
          title="Pending Reviews"
          value="4"
          note="Require approval"
          icon={CheckCircle2}
        />
        <WorkspaceMetric
          title="Scheduled"
          value="8"
          note="Automatic delivery"
          icon={CalendarClock}
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {["Overview", "Reports", "Schedules", "Exports", "Approvals"].map(
              (view) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setActiveView(view)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                    activeView === view
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {view}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-200 p-5 lg:grid-cols-[1fr_220px_180px]">
          <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
            <Search size={17} className="text-slate-400" />
            <input
              placeholder={`Search ${module.title.toLowerCase()}...`}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>

          <select
            value={dateRange}
            onChange={(event) => setDateRange(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700">
            <Download size={17} />
            Export
          </button>
        </div>

        <div className="p-6">
          {activeView === "Overview" && (
            <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
              <ReportSummaryPanel module={module} dateRange={dateRange} />
              <ReportStatusPanel />
            </div>
          )}

          {activeView === "Reports" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {module.items.map((item, index) => (
                <FeatureCard key={item} title={item} index={index} />
              ))}
            </div>
          )}

          {activeView === "Schedules" && <SchedulePanel module={module} />}

          {activeView === "Exports" && <ExportPanel module={module} />}

          {activeView === "Approvals" && <ApprovalPanel module={module} />}
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

function ReportSummaryPanel({
  module,
  dateRange,
}: {
  module: ReportModule;
  dateRange: string;
}) {
  const bars = [45, 68, 56, 82, 74, 91, 79, 88, 95, 84, 90, 97];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-black text-slate-950">
            {module.title} Activity
          </h3>
          <p className="mt-1 text-sm text-slate-500">{dateRange}</p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
          +18.4%
        </span>
      </div>

      <div className="mt-7 flex h-64 items-end gap-3">
        {bars.map((height, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-xl bg-gradient-to-t from-violet-600 to-blue-500"
              style={{ height: `${height}%` }}
            />
            <span className="text-[10px] font-semibold text-slate-400">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportStatusPanel() {
  const statuses = [
    ["Generated", "38", "bg-green-500"],
    ["Scheduled", "24", "bg-blue-500"],
    ["Pending Review", "7", "bg-orange-500"],
    ["Failed", "2", "bg-red-500"],
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-black text-slate-950">Report Status</h3>
      <p className="mt-1 text-sm text-slate-500">
        Current reporting cycle
      </p>

      <div className="mt-6 space-y-5">
        {statuses.map(([label, value, color]) => (
          <div key={label}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">
                {label}
              </span>
              <span className="text-sm font-black text-slate-950">{value}</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${Math.min(Number(value) * 2.2, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchedulePanel({ module }: { module: ReportModule }) {
  const schedules = [
    ["Daily Executive Summary", "Daily at 8:00 AM", "Active"],
    [`Weekly ${module.title}`, "Every Monday", "Active"],
    ["Monthly Management Pack", "1st day of month", "Active"],
    ["Quarterly Review", "Quarter end", "Paused"],
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Report Schedules
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Automatic generation and delivery settings
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white">
          <Plus size={17} />
          New Schedule
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        {schedules.map(([name, timing, status], index) => (
          <div
            key={name}
            className={`flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center ${
              index !== schedules.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            <div>
              <p className="font-bold text-slate-950">{name}</p>
              <p className="mt-1 text-sm text-slate-500">{timing}</p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExportPanel({ module }: { module: ReportModule }) {
  const formats = [
    ["PDF", "Premium printable report", FileText],
    ["Excel", "Detailed spreadsheet export", FileSpreadsheet],
    ["CSV", "Raw structured data", FileArchive],
    ["Dashboard", "Interactive dashboard view", PieChart],
  ] as const;

  return (
    <div>
      <h3 className="text-xl font-black text-slate-950">Export Center</h3>
      <p className="mt-1 text-sm text-slate-500">
        Export {module.title.toLowerCase()} in your preferred format
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {formats.map(([title, note, Icon]) => (
          <button
            key={title}
            className="rounded-2xl border border-slate-200 p-5 text-left transition hover:border-violet-400 hover:shadow-lg"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
              <Icon size={20} />
            </div>

            <h4 className="mt-4 font-black text-slate-950">{title}</h4>
            <p className="mt-2 text-sm text-slate-500">{note}</p>

            <span className="mt-4 flex items-center gap-2 text-xs font-bold text-violet-600">
              Export
              <ArrowRight size={15} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ApprovalPanel({ module }: { module: ReportModule }) {
  const approvals = [
    [`Monthly ${module.title}`, "Finance Review", "Pending"],
    ["Executive KPI Pack", "Founder Approval", "Pending"],
    ["Quarterly Business Review", "Management Review", "Approved"],
    ["Annual Audit Summary", "Audit Review", "Changes Requested"],
  ];

  return (
    <div>
      <h3 className="text-xl font-black text-slate-950">Approval Queue</h3>
      <p className="mt-1 text-sm text-slate-500">
        Review and publish controlled reports
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        {approvals.map(([name, stage, status], index) => (
          <div
            key={name}
            className={`flex flex-col justify-between gap-4 p-5 lg:flex-row lg:items-center ${
              index !== approvals.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            <div>
              <p className="font-bold text-slate-950">{name}</p>
              <p className="mt-1 text-sm text-slate-500">{stage}</p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : status === "Changes Requested"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {status}
              </span>

              <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
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
    FileBarChart,
    TrendingUp,
    Building2,
    CircleDollarSign,
    Target,
    Users,
    PackageSearch,
    ClipboardCheck,
    ShieldCheck,
    AlertTriangle,
    CalendarClock,
    Download,
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
        <ArrowRight
          size={15}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}