"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileBarChart,
  Gauge,
  IndianRupee,
  LineChart,
  PackageSearch,
  Plus,
  Search,
  Settings2,
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

type ForecastModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: ForecastModule[] = [
  {
    id: "forecast-dashboard",
    title: "Forecast Dashboard",
    description: "View revenue, demand, cash, workforce and forecast accuracy.",
    icon: BarChart3,
    items: [
      "Revenue Forecast",
      "Demand Accuracy",
      "Cash Forecast",
      "Hiring Need",
      "Forecast Confidence",
      "Forecast Variance",
      "Critical Alerts",
      "Department Forecasts",
      "AI Insights",
    ],
  },
  {
    id: "revenue-forecast",
    title: "Revenue Forecasting",
    description: "Forecast revenue by channel, product, region and period.",
    icon: IndianRupee,
    items: [
      "Monthly Revenue Forecast",
      "Quarterly Revenue Forecast",
      "Annual Revenue Forecast",
      "Channel Revenue Forecast",
      "Product Revenue Forecast",
      "Region Revenue Forecast",
      "Customer Revenue Forecast",
      "Scenario Revenue Forecast",
      "Revenue Variance",
      "Revenue Confidence",
      "Revenue History",
      "Revenue Reports",
    ],
  },
  {
    id: "sales-forecast",
    title: "Sales Forecasting",
    description: "Predict orders, conversion, pipeline and sales outcomes.",
    icon: TrendingUp,
    items: [
      "Sales Forecast",
      "Order Forecast",
      "Conversion Forecast",
      "Pipeline Forecast",
      "Win Rate Forecast",
      "Average Order Value Forecast",
      "Sales Owner Forecast",
      "Territory Forecast",
      "Sales Variance",
      "Sales Confidence",
      "Sales History",
      "Sales Reports",
    ],
  },
  {
    id: "demand-forecast",
    title: "Demand Forecasting",
    description: "Predict product and category demand using historical trends.",
    icon: PackageSearch,
    items: [
      "Product Demand",
      "Category Demand",
      "Collection Demand",
      "Seasonal Demand",
      "Campaign Demand",
      "Channel Demand",
      "Regional Demand",
      "New Product Demand",
      "Demand Variance",
      "Demand Confidence",
      "Demand History",
      "Demand Reports",
    ],
  },
  {
    id: "inventory-forecast",
    title: "Inventory Forecasting",
    description: "Predict stock requirements, reorder points and stockout risk.",
    icon: PackageSearch,
    items: [
      "Stock Requirement",
      "Reorder Forecast",
      "Safety Stock Forecast",
      "Stockout Prediction",
      "Overstock Prediction",
      "Warehouse Requirement",
      "Transfer Requirement",
      "Seasonal Stock Plan",
      "Inventory Variance",
      "Inventory Confidence",
      "Inventory History",
      "Inventory Reports",
    ],
  },
  {
    id: "cash-flow-forecast",
    title: "Cash Flow Forecasting",
    description: "Forecast inflows, outflows and liquidity position.",
    icon: CircleDollarSign,
    items: [
      "Cash Inflow Forecast",
      "Cash Outflow Forecast",
      "Closing Cash Forecast",
      "Receivable Forecast",
      "Payable Forecast",
      "Payroll Forecast",
      "Tax Forecast",
      "Loan Repayment Forecast",
      "Liquidity Gap",
      "Cash Variance",
      "Cash History",
      "Cash Reports",
    ],
  },
  {
    id: "expense-forecast",
    title: "Expense Forecasting",
    description: "Predict operating, marketing, payroll and project expenses.",
    icon: CircleDollarSign,
    items: [
      "Operating Expense Forecast",
      "Marketing Expense Forecast",
      "Payroll Expense Forecast",
      "Procurement Expense Forecast",
      "Project Expense Forecast",
      "Logistics Expense Forecast",
      "Facility Expense Forecast",
      "Tax Expense Forecast",
      "Expense Variance",
      "Expense Confidence",
      "Expense History",
      "Expense Reports",
    ],
  },
  {
    id: "workforce-forecast",
    title: "Workforce Forecasting",
    description: "Predict hiring, capacity, attrition and workforce cost.",
    icon: Users,
    items: [
      "Headcount Forecast",
      "Hiring Need Forecast",
      "Attrition Forecast",
      "Department Capacity",
      "Skill Demand",
      "Workforce Cost",
      "Overtime Forecast",
      "Contractor Requirement",
      "Workforce Variance",
      "Workforce Confidence",
      "Workforce History",
      "Workforce Reports",
    ],
  },
  {
    id: "customer-forecast",
    title: "Customer Forecasting",
    description: "Predict acquisition, retention, churn and lifetime value.",
    icon: Users,
    items: [
      "Customer Growth Forecast",
      "Acquisition Forecast",
      "Retention Forecast",
      "Churn Forecast",
      "Repeat Purchase Forecast",
      "Customer LTV Forecast",
      "Segment Forecast",
      "Loyalty Forecast",
      "Customer Variance",
      "Customer Confidence",
      "Customer History",
      "Customer Reports",
    ],
  },
  {
    id: "marketing-forecast",
    title: "Marketing Forecasting",
    description: "Predict campaign performance, reach, ROAS and lead generation.",
    icon: Target,
    items: [
      "Campaign Revenue Forecast",
      "Lead Forecast",
      "ROAS Forecast",
      "Reach Forecast",
      "Conversion Forecast",
      "CAC Forecast",
      "Channel Performance Forecast",
      "Budget Requirement",
      "Marketing Variance",
      "Marketing Confidence",
      "Marketing History",
      "Marketing Reports",
    ],
  },
  {
    id: "procurement-forecast",
    title: "Procurement Forecasting",
    description: "Predict purchase requirements, supplier lead times and spend.",
    icon: Workflow,
    items: [
      "Purchase Requirement",
      "Supplier Lead Time Forecast",
      "Category Spend Forecast",
      "Vendor Capacity Forecast",
      "Purchase Price Forecast",
      "Contract Renewal Forecast",
      "Delivery Delay Forecast",
      "Procurement Budget Forecast",
      "Procurement Variance",
      "Procurement Confidence",
      "Procurement History",
      "Procurement Reports",
    ],
  },
  {
    id: "project-forecast",
    title: "Project Forecasting",
    description: "Predict project completion, cost, resource and delay risk.",
    icon: CalendarDays,
    items: [
      "Completion Date Forecast",
      "Project Cost Forecast",
      "Resource Forecast",
      "Milestone Forecast",
      "Delay Prediction",
      "Risk Forecast",
      "Benefit Forecast",
      "Project Capacity",
      "Project Variance",
      "Project Confidence",
      "Project History",
      "Project Reports",
    ],
  },
  {
    id: "risk-forecast",
    title: "Risk Forecasting",
    description: "Predict emerging risks, incidents and control failures.",
    icon: AlertTriangle,
    items: [
      "Emerging Risk Forecast",
      "Incident Forecast",
      "Control Failure Forecast",
      "Fraud Risk Forecast",
      "Cyber Risk Forecast",
      "Vendor Risk Forecast",
      "Operational Risk Forecast",
      "Legal Risk Forecast",
      "Risk Variance",
      "Risk Confidence",
      "Risk History",
      "Risk Reports",
    ],
  },
  {
    id: "scenario-planning",
    title: "Scenario Planning",
    description: "Compare best-case, base-case and worst-case outcomes.",
    icon: BrainCircuit,
    items: [
      "Create Scenario",
      "Base Case",
      "Best Case",
      "Worst Case",
      "Custom Scenario",
      "Assumption Sets",
      "Financial Impact",
      "Operational Impact",
      "People Impact",
      "Risk Impact",
      "Scenario Comparison",
      "Scenario Reports",
    ],
  },
  {
    id: "assumption-management",
    title: "Assumption Management",
    description: "Control the assumptions used across enterprise forecasts.",
    icon: Settings2,
    items: [
      "Revenue Assumptions",
      "Demand Assumptions",
      "Pricing Assumptions",
      "Cost Assumptions",
      "Hiring Assumptions",
      "Market Assumptions",
      "Seasonality Assumptions",
      "Risk Assumptions",
      "Assumption Approval",
      "Assumption Versions",
      "Assumption History",
      "Assumption Reports",
    ],
  },
  {
    id: "forecast-accuracy",
    title: "Forecast Accuracy",
    description: "Measure actual-versus-forecast performance and reliability.",
    icon: Gauge,
    items: [
      "Forecast Accuracy",
      "Actual vs Forecast",
      "Absolute Error",
      "Percentage Error",
      "Bias Analysis",
      "Confidence Score",
      "Department Accuracy",
      "Model Accuracy",
      "Accuracy Trend",
      "Accuracy Alerts",
      "Accuracy History",
      "Accuracy Reports",
    ],
  },
  {
    id: "forecast-variance",
    title: "Forecast Variance",
    description: "Analyse deviations and identify causes behind forecast gaps.",
    icon: Activity,
    items: [
      "Revenue Variance",
      "Demand Variance",
      "Cash Variance",
      "Expense Variance",
      "Workforce Variance",
      "Inventory Variance",
      "Project Variance",
      "Root Cause Analysis",
      "Corrective Actions",
      "Variance Alerts",
      "Variance History",
      "Variance Reports",
    ],
  },
  {
    id: "forecast-models",
    title: "Forecast Models",
    description: "Manage statistical, machine-learning and AI forecast models.",
    icon: BrainCircuit,
    items: [
      "Model Registry",
      "Time Series Model",
      "Regression Model",
      "Seasonal Model",
      "Machine Learning Model",
      "AI Forecast Model",
      "Model Parameters",
      "Model Version",
      "Model Testing",
      "Model Comparison",
      "Model History",
      "Model Reports",
    ],
  },
  {
    id: "forecast-approvals",
    title: "Forecast Approvals",
    description: "Review, approve and publish enterprise forecasts.",
    icon: CheckCircle2,
    items: [
      "Approval Queue",
      "Department Approval",
      "Finance Approval",
      "Founder Approval",
      "Scenario Approval",
      "Assumption Approval",
      "Forecast Lock",
      "Forecast Publish",
      "Approval Comments",
      "Approval History",
      "Approval Reports",
    ],
  },
  {
    id: "forecast-alerts",
    title: "Forecast Alerts",
    description: "Receive alerts for variance, risk and confidence thresholds.",
    icon: BellRing,
    items: [
      "Variance Alerts",
      "Low Confidence Alerts",
      "Revenue Risk Alerts",
      "Cash Shortfall Alerts",
      "Stockout Alerts",
      "Hiring Gap Alerts",
      "Expense Overrun Alerts",
      "Project Delay Alerts",
      "Risk Alerts",
      "Alert Rules",
      "Alert History",
      "Alert Reports",
    ],
  },
  {
    id: "forecast-analytics",
    title: "Forecast Analytics",
    description: "Analyse trends, drivers, confidence and business outcomes.",
    icon: Activity,
    items: [
      "Trend Analytics",
      "Driver Analytics",
      "Confidence Analytics",
      "Scenario Analytics",
      "Accuracy Analytics",
      "Variance Analytics",
      "Department Analytics",
      "Model Analytics",
      "Seasonality Analytics",
      "Impact Analytics",
      "Forecast Insights",
      "AI Predictions",
    ],
  },
  {
    id: "forecast-reports",
    title: "Forecast Reports",
    description: "Generate executive, department and scenario forecast reports.",
    icon: FileBarChart,
    items: [
      "Executive Forecast Report",
      "Revenue Forecast Report",
      "Demand Forecast Report",
      "Cash Forecast Report",
      "Expense Forecast Report",
      "Workforce Forecast Report",
      "Inventory Forecast Report",
      "Project Forecast Report",
      "Risk Forecast Report",
      "Accuracy Report",
      "Variance Report",
      "Custom Reports",
    ],
  },
  {
    id: "forecast-settings",
    title: "Forecast Settings",
    description: "Configure periods, models, thresholds and permissions.",
    icon: Settings2,
    items: [
      "Forecast Periods",
      "Default Horizon",
      "Model Selection",
      "Confidence Threshold",
      "Variance Threshold",
      "Scenario Settings",
      "Approval Matrix",
      "Notification Settings",
      "Data Sources",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-forecasting",
    title: "KRVE AI Forecasting",
    description: "Use AI to generate, explain and improve enterprise forecasts.",
    icon: Sparkles,
    items: [
      "AI Revenue Forecast",
      "AI Demand Forecast",
      "AI Cash Forecast",
      "AI Workforce Forecast",
      "AI Inventory Forecast",
      "AI Risk Forecast",
      "AI Scenario Generator",
      "AI Assumption Recommendation",
      "AI Variance Explanation",
      "AI Accuracy Improvement",
      "AI Forecast Summary",
      "AI Forecast Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Revenue Forecast", "₹22.6L", "Next 30 days", IndianRupee],
  ["Demand Accuracy", "91.4%", "Rolling 90 days", Gauge],
  ["Cash Forecast", "₹38.2L", "Month-end estimate", CircleDollarSign],
  ["Hiring Need", "8", "Next quarter", Users],
];

export default function ForecastingManagement() {
  const [selectedModule, setSelectedModule] =
    useState<ForecastModule | null>(null);
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
            placeholder="Search forecasts, scenarios or models..."
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
        <h2 className="text-2xl font-black text-slate-950">
          Complete Forecasting Operations
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Tap any card to open its complete forecasting workspace.
        </p>

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
              <TrendingUp size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Predictive Intelligence
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Forecasting Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Forecast revenue, demand, inventory, cash flow, workforce,
            customers, marketing, projects and enterprise risks using historical
            trends, scenarios and KRVE AI.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Settings2 size={17} />
            Change Assumptions
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Sparkles size={17} />
            Run Forecast
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
  module: ForecastModule;
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
  module: ForecastModule;
  onBack: () => void;
}) {
  const Icon = module.icon;

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-violet-100 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Forecasting Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Forecasting Workspace
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {module.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
              {module.description}
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700">
            <Plus size={17} />
            Run New Forecast
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric title="Forecast Records" value="128" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Reviews" value="14" note="Require attention" icon={BellRing} />
        <WorkspaceMetric title="Accuracy" value="91.4%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="8" note="Available outputs" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its forecasting workflow.
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
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
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
    TrendingUp,
    IndianRupee,
    PackageSearch,
    CircleDollarSign,
    Users,
    Target,
    CalendarDays,
    AlertTriangle,
    BrainCircuit,
    Gauge,
    Activity,
    Settings2,
  ];

  const Icon = icons[index % icons.length];

  return (
    <button
      type="button"
      className="group min-h-[175px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-violet-400 hover:bg-violet-50/30 hover:shadow-lg"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Icon size={20} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-950">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Open and manage the complete {title.toLowerCase()} workflow.
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