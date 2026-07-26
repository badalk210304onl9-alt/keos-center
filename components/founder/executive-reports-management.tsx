"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpenCheck,
  BrainCircuit,
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
  IndianRupee,
  Landmark,
  LineChart,
  Mail,
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

type ExecutiveModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: ExecutiveModule[] = [
  {
    id: "executive-dashboard",
    title: "Executive Dashboard",
    description: "View enterprise health, growth, risks, approvals and leadership priorities.",
    icon: BarChart3,
    items: [
      "Enterprise Score",
      "Revenue Growth",
      "Critical Risks",
      "Approvals Pending",
      "Cash Position",
      "Customer Growth",
      "People Health",
      "Operational Health",
      "AI Insights",
    ],
  },
  {
    id: "founder-brief",
    title: "Founder Brief",
    description: "Generate a concise leadership summary of enterprise performance and action items.",
    icon: Sparkles,
    items: [
      "Daily Founder Brief",
      "Weekly Founder Brief",
      "Monthly Founder Brief",
      "Critical Alerts",
      "Priority Actions",
      "Revenue Summary",
      "Cash Summary",
      "People Summary",
      "Risk Summary",
      "Operations Summary",
      "Decision Summary",
      "Board Summary",
    ],
  },
  {
    id: "executive-scorecard",
    title: "Executive Scorecard",
    description: "Track enterprise goals, KPIs, targets and operating health.",
    icon: Gauge,
    items: [
      "Enterprise Score",
      "Financial Score",
      "Customer Score",
      "Operations Score",
      "People Score",
      "Risk Score",
      "Compliance Score",
      "Technology Score",
      "Strategic Score",
      "Scorecard Targets",
      "Scorecard History",
      "Scorecard Reports",
    ],
  },
  {
    id: "strategic-performance",
    title: "Strategic Performance",
    description: "Measure progress against strategic plans and founder priorities.",
    icon: Target,
    items: [
      "Strategic Objectives",
      "Strategic KPIs",
      "Priority Initiatives",
      "Growth Initiatives",
      "Cost Initiatives",
      "Customer Initiatives",
      "People Initiatives",
      "Risk Initiatives",
      "Initiative Progress",
      "Strategic Gaps",
      "Strategic History",
      "Strategic Reports",
    ],
  },
  {
    id: "financial-performance",
    title: "Financial Performance",
    description: "Review revenue, profit, cash, expenses and financial health.",
    icon: CircleDollarSign,
    items: [
      "Revenue Summary",
      "Profitability Summary",
      "Cash Flow Summary",
      "Expense Summary",
      "Receivables Summary",
      "Payables Summary",
      "Budget Variance",
      "Working Capital",
      "Tax Position",
      "Financial Risks",
      "Financial History",
      "Financial Reports",
    ],
  },
  {
    id: "sales-performance",
    title: "Sales Performance",
    description: "Monitor sales, orders, pipeline, conversion and channel performance.",
    icon: TrendingUp,
    items: [
      "Sales Summary",
      "Order Summary",
      "Revenue by Channel",
      "Revenue by Product",
      "Conversion Rate",
      "Average Order Value",
      "Pipeline Value",
      "Win Rate",
      "Sales Forecast",
      "Sales Risks",
      "Sales History",
      "Sales Reports",
    ],
  },
  {
    id: "customer-performance",
    title: "Customer Performance",
    description: "Track customer growth, retention, value, loyalty and satisfaction.",
    icon: Users,
    items: [
      "Customer Growth",
      "Active Customers",
      "Retention Rate",
      "Churn Rate",
      "Customer LTV",
      "Repeat Purchase",
      "Loyalty Members",
      "Customer Satisfaction",
      "Customer Complaints",
      "Customer Risks",
      "Customer History",
      "Customer Reports",
    ],
  },
  {
    id: "marketing-performance",
    title: "Marketing Performance",
    description: "Review campaigns, spend, ROAS, reach and acquisition outcomes.",
    icon: Sparkles,
    items: [
      "Campaign Revenue",
      "Marketing Spend",
      "ROAS",
      "Lead Generation",
      "Audience Reach",
      "Channel Performance",
      "Customer Acquisition Cost",
      "Conversion Performance",
      "Attribution Summary",
      "Marketing Risks",
      "Marketing History",
      "Marketing Reports",
    ],
  },
  {
    id: "people-performance",
    title: "People Performance",
    description: "Review workforce health, hiring, attendance, performance and attrition.",
    icon: Users,
    items: [
      "Headcount Summary",
      "Hiring Status",
      "Attendance",
      "Payroll Cost",
      "Performance Summary",
      "Training Progress",
      "Attrition Rate",
      "Employee Engagement",
      "Open Positions",
      "People Risks",
      "People History",
      "People Reports",
    ],
  },
  {
    id: "operations-performance",
    title: "Operations Performance",
    description: "Monitor fulfilment, service, productivity and operational readiness.",
    icon: Activity,
    items: [
      "Order Fulfilment",
      "Warehouse Performance",
      "Shipping Performance",
      "Returns Performance",
      "Service SLA",
      "Process Efficiency",
      "Capacity Utilisation",
      "Quality Performance",
      "Operational Costs",
      "Operational Risks",
      "Operations History",
      "Operations Reports",
    ],
  },
  {
    id: "inventory-performance",
    title: "Inventory Performance",
    description: "Review stock position, turnover, ageing and replenishment health.",
    icon: Building2,
    items: [
      "Stock Value",
      "Stock Turnover",
      "Low Stock",
      "Out of Stock",
      "Dead Stock",
      "Inventory Ageing",
      "Warehouse Stock",
      "Transfer Status",
      "Reorder Status",
      "Inventory Risks",
      "Inventory History",
      "Inventory Reports",
    ],
  },
  {
    id: "procurement-performance",
    title: "Procurement Performance",
    description: "Review purchasing, vendor, spend and supplier delivery performance.",
    icon: ClipboardCheck,
    items: [
      "Purchase Orders",
      "Procurement Spend",
      "Savings Realised",
      "Vendor Performance",
      "Delivery Performance",
      "Lead Time",
      "Contract Status",
      "Approval Status",
      "Procurement Forecast",
      "Procurement Risks",
      "Procurement History",
      "Procurement Reports",
    ],
  },
  {
    id: "project-performance",
    title: "Project Performance",
    description: "Monitor project health, milestones, budgets and delivery status.",
    icon: Workflow,
    items: [
      "Active Projects",
      "Projects On Track",
      "Projects At Risk",
      "Milestone Status",
      "Budget Status",
      "Task Status",
      "Resource Utilisation",
      "Project Delays",
      "Project Benefits",
      "Project Risks",
      "Project History",
      "Project Reports",
    ],
  },
  {
    id: "risk-performance",
    title: "Risk Overview",
    description: "Review enterprise risks, incidents, controls and mitigation progress.",
    icon: AlertTriangle,
    items: [
      "Open Risks",
      "High Risks",
      "Critical Risks",
      "Open Incidents",
      "Controls Active",
      "Mitigation Progress",
      "Risk Heatmap",
      "Overdue Actions",
      "Emerging Risks",
      "Risk Owners",
      "Risk History",
      "Risk Reports",
    ],
  },
  {
    id: "legal-compliance-performance",
    title: "Legal & Compliance Overview",
    description: "Track legal matters, compliance score, renewals and open actions.",
    icon: ShieldCheck,
    items: [
      "Open Legal Matters",
      "Compliance Score",
      "Contracts Expiring",
      "Licences Due",
      "Regulatory Actions",
      "Statutory Filings",
      "Policy Reviews",
      "Audit Findings",
      "Open Actions",
      "Legal Risks",
      "Legal History",
      "Legal Reports",
    ],
  },
  {
    id: "technology-performance",
    title: "Technology Performance",
    description: "Review system uptime, incidents, security and technology delivery.",
    icon: BrainCircuit,
    items: [
      "System Uptime",
      "Application Health",
      "Open Incidents",
      "Cyber Alerts",
      "Access Risks",
      "Deployment Status",
      "Project Delivery",
      "Support Tickets",
      "Technology Cost",
      "Technology Risks",
      "Technology History",
      "Technology Reports",
    ],
  },
  {
    id: "ai-performance",
    title: "AI Performance",
    description: "Monitor KRVE AI usage, automations, recommendations and value realised.",
    icon: Sparkles,
    items: [
      "AI Usage",
      "Automations Active",
      "AI Decisions",
      "Recommendations Accepted",
      "Forecast Accuracy",
      "Anomalies Detected",
      "Time Saved",
      "Cost Saved",
      "AI Adoption",
      "AI Risks",
      "AI History",
      "AI Reports",
    ],
  },
  {
    id: "decision-center",
    title: "Executive Decision Center",
    description: "Review pending decisions, approvals and recommended actions.",
    icon: CheckCircle2,
    items: [
      "Pending Decisions",
      "Critical Decisions",
      "Finance Decisions",
      "People Decisions",
      "Risk Decisions",
      "Operations Decisions",
      "Strategic Decisions",
      "AI Recommendations",
      "Decision Owners",
      "Decision Deadlines",
      "Decision History",
      "Decision Reports",
    ],
  },
  {
    id: "approval-center",
    title: "Executive Approval Center",
    description: "Manage founder and leadership approvals across KEOS.",
    icon: FileCheck2,
    items: [
      "Founder Approvals",
      "Finance Approvals",
      "HR Approvals",
      "Procurement Approvals",
      "Project Approvals",
      "Legal Approvals",
      "Risk Approvals",
      "Policy Approvals",
      "Report Approvals",
      "Overdue Approvals",
      "Approval History",
      "Approval Reports",
    ],
  },
  {
    id: "board-reports",
    title: "Board Reports",
    description: "Prepare board packs, performance summaries and governance records.",
    icon: Landmark,
    items: [
      "Board Pack",
      "Board Dashboard",
      "Financial Summary",
      "Strategic Summary",
      "Risk Summary",
      "Compliance Summary",
      "People Summary",
      "Project Summary",
      "Decision Log",
      "Board Actions",
      "Board History",
      "Board Reports",
    ],
  },
  {
    id: "monthly-business-review",
    title: "Monthly Business Review",
    description: "Create structured monthly reviews of enterprise performance.",
    icon: CalendarClock,
    items: [
      "Monthly Overview",
      "Financial Review",
      "Sales Review",
      "Customer Review",
      "Marketing Review",
      "People Review",
      "Operations Review",
      "Risk Review",
      "Project Review",
      "Action Review",
      "Monthly History",
      "Monthly Reports",
    ],
  },
  {
    id: "quarterly-business-review",
    title: "Quarterly Business Review",
    description: "Prepare quarterly business performance and strategic reviews.",
    icon: FileClock,
    items: [
      "Quarterly Overview",
      "Financial Performance",
      "Strategic Progress",
      "Customer Performance",
      "People Performance",
      "Operations Performance",
      "Risk Performance",
      "Project Performance",
      "Forecast Review",
      "Quarterly Actions",
      "Quarterly History",
      "Quarterly Reports",
    ],
  },
  {
    id: "annual-business-review",
    title: "Annual Business Review",
    description: "Review yearly performance, strategy and enterprise outcomes.",
    icon: BookOpenCheck,
    items: [
      "Annual Overview",
      "Annual Financials",
      "Annual Growth",
      "Annual Customer Performance",
      "Annual People Performance",
      "Annual Operations",
      "Annual Risks",
      "Annual Projects",
      "Annual Strategy",
      "Annual Actions",
      "Annual History",
      "Annual Reports",
    ],
  },
  {
    id: "executive-forecasting",
    title: "Executive Forecasting",
    description: "View enterprise revenue, cash, demand and risk forecasts.",
    icon: LineChart,
    items: [
      "Revenue Forecast",
      "Cash Forecast",
      "Demand Forecast",
      "Expense Forecast",
      "Workforce Forecast",
      "Customer Forecast",
      "Inventory Forecast",
      "Project Forecast",
      "Risk Forecast",
      "Scenario Forecast",
      "Forecast History",
      "Forecast Reports",
    ],
  },
  {
    id: "executive-analytics",
    title: "Executive Analytics",
    description: "Analyse enterprise trends, drivers, risks and strategic outcomes.",
    icon: Activity,
    items: [
      "Enterprise Trends",
      "Revenue Analytics",
      "Customer Analytics",
      "People Analytics",
      "Operations Analytics",
      "Risk Analytics",
      "Project Analytics",
      "AI Analytics",
      "Variance Analytics",
      "Scenario Analytics",
      "Executive Insights",
      "AI Predictions",
    ],
  },
  {
    id: "executive-report-builder",
    title: "Executive Report Builder",
    description: "Create custom founder, leadership and board reports.",
    icon: FileSpreadsheet,
    items: [
      "Select Data Source",
      "Choose KPIs",
      "Add Charts",
      "Add Tables",
      "Add Commentary",
      "Add Risks",
      "Add Actions",
      "Add Forecasts",
      "Preview Report",
      "Save Template",
      "Publish Report",
      "Report History",
    ],
  },
  {
    id: "executive-distribution",
    title: "Executive Distribution",
    description: "Distribute leadership reports securely to executives and board members.",
    icon: Mail,
    items: [
      "Founder Distribution",
      "Leadership Distribution",
      "Board Distribution",
      "Department Heads",
      "Secure Link",
      "Email Delivery",
      "Scheduled Delivery",
      "Approval Before Send",
      "Recipient Groups",
      "Delivery Status",
      "Distribution History",
      "Distribution Reports",
    ],
  },
  {
    id: "executive-archive",
    title: "Executive Archive",
    description: "Store historical founder, board and leadership reports.",
    icon: FileText,
    items: [
      "Founder Brief Archive",
      "Monthly Review Archive",
      "Quarterly Review Archive",
      "Annual Review Archive",
      "Board Pack Archive",
      "Decision Archive",
      "Approval Archive",
      "Forecast Archive",
      "Risk Archive",
      "Search Archive",
      "Archive History",
      "Archive Reports",
    ],
  },
  {
    id: "executive-settings",
    title: "Executive Report Settings",
    description: "Configure scorecards, thresholds, approvals and report delivery.",
    icon: Settings2,
    items: [
      "Scorecard Settings",
      "KPI Targets",
      "Alert Thresholds",
      "Report Formats",
      "Approval Matrix",
      "Review Schedule",
      "Distribution Settings",
      "Notification Settings",
      "Founder Permissions",
      "Leadership Permissions",
      "Board Permissions",
      "Integrations",
    ],
  },
];

const dashboardMetrics = [
  ["Enterprise Score", "88/100", "Current operating health", Gauge],
  ["Revenue Growth", "18.4%", "Year over year", TrendingUp],
  ["Critical Risks", "4", "Leadership attention", AlertTriangle],
  ["Approvals Pending", "8", "Founder action required", CheckCircle2],
];

export default function ExecutiveReportsManagement() {
  const [selectedModule, setSelectedModule] =
    useState<ExecutiveModule | null>(null);
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
            placeholder="Search executive reports, scorecards or reviews..."
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
            Complete Executive Reporting
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete leadership reporting workspace.
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
              <BarChart3 size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Leadership Reporting
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Executive Reports Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Founder and executive reporting covering enterprise performance,
            strategic priorities, financial health, customers, people,
            operations, projects, risks, decisions and KRVE AI insights.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Gauge size={17} />
            Open Scorecard
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Sparkles size={17} />
            Generate Founder Brief
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
  module: ExecutiveModule;
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
          <ChevronRight size={16} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}

function ModuleWorkspace({
  module,
  onBack,
}: {
  module: ExecutiveModule;
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
          Back to Executive Reports
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Executive Workspace
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
        <WorkspaceMetric title="Enterprise Score" value="88/100" note="Current health" icon={Gauge} />
        <WorkspaceMetric title="Growth" value="18.4%" note="Year over year" icon={TrendingUp} />
        <WorkspaceMetric title="Critical Risks" value="4" note="Need attention" icon={AlertTriangle} />
        <WorkspaceMetric title="Pending Actions" value="8" note="Founder review" icon={BellRing} />
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {["Overview", "Reports", "Scorecard", "Actions", "Distribution"].map((tab) => (
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
          {activeTab === "Actions" && <ActionsPanel />}
          {activeTab === "Distribution" && <DistributionPanel module={module} />}
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

function OverviewPanel({ module }: { module: ExecutiveModule }) {
  const bars = [52, 66, 61, 73, 77, 81, 84, 88];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              {module.title} Trend
            </h3>
            <p className="mt-1 text-sm text-slate-500">Current leadership cycle</p>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            +12.6%
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
        <h3 className="text-lg font-black text-slate-950">Leadership Status</h3>
        <p className="mt-1 text-sm text-slate-500">Current review summary</p>

        <div className="mt-6 space-y-5">
          {[
            ["On Track", "72%", "bg-green-500"],
            ["Needs Attention", "18%", "bg-orange-500"],
            ["Critical", "10%", "bg-red-500"],
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
    ["Financial Health", "91", "Strong"],
    ["Customer Health", "87", "Healthy"],
    ["People Health", "82", "Stable"],
    ["Operations Health", "89", "Strong"],
    ["Risk Health", "76", "Watch"],
    ["Compliance Health", "96", "Excellent"],
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

function ActionsPanel() {
  const actions = [
    ["Approve Q3 Growth Plan", "Strategic", "High"],
    ["Review Cash Forecast", "Finance", "High"],
    ["Close Critical Vendor Risk", "Risk", "Critical"],
    ["Approve Hiring Plan", "HR", "Medium"],
    ["Review Expansion Project", "Projects", "High"],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {actions.map(([title, area, priority], index) => (
        <div
          key={title}
          className={`flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center ${
            index !== actions.length - 1 ? "border-b border-slate-200" : ""
          }`}
        >
          <div>
            <p className="font-bold text-slate-950">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{area}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${
              priority === "Critical"
                ? "bg-red-100 text-red-700"
                : priority === "High"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-blue-100 text-blue-700"
            }`}>
              {priority}
            </span>
            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
              Review
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DistributionPanel({ module }: { module: ExecutiveModule }) {
  const options = [
    ["Founder", "Private founder access", Users],
    ["Leadership Team", "Department leadership distribution", Building2],
    ["Board Members", "Secure board access", Landmark],
    ["Email Delivery", `Send ${module.title.toLowerCase()} by email`, Mail],
  ] as const;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {options.map(([title, note, Icon]) => (
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
            Open
            <ArrowRight size={15} />
          </span>
        </button>
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
    BarChart3,
    Sparkles,
    Gauge,
    Target,
    CircleDollarSign,
    TrendingUp,
    Users,
    Activity,
    AlertTriangle,
    ShieldCheck,
    LineChart,
    FileBarChart,
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