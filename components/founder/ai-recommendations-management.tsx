"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileBarChart,
  FileText,
  Gauge,
  Gift,
  IndianRupee,
  Lightbulb,
  PackageSearch,
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
  Zap,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type RecommendationModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: RecommendationModule[] = [
  {
    id: "recommendations-dashboard",
    title: "Recommendations Dashboard",
    description: "View open recommendations, acceptance, value realised and review status.",
    icon: BarChart3,
    items: [
      "Open Recommendations",
      "High Priority",
      "Accepted Recommendations",
      "Under Review",
      "Value Realised",
      "Department Recommendations",
      "Overdue Decisions",
      "Recommendation Confidence",
      "AI Insights",
    ],
  },
  {
    id: "executive-recommendations",
    title: "Executive Recommendations",
    description: "Receive founder-level actions for growth, savings and enterprise control.",
    icon: Lightbulb,
    items: [
      "Founder Priorities",
      "Executive Actions",
      "Revenue Opportunities",
      "Cost Savings",
      "Risk Actions",
      "People Actions",
      "Operations Actions",
      "Strategic Initiatives",
      "Decision Summary",
      "Board Recommendations",
      "Executive History",
      "Executive Reports",
    ],
  },
  {
    id: "growth-recommendations",
    title: "Growth Recommendations",
    description: "Identify revenue, channel, market and customer growth opportunities.",
    icon: TrendingUp,
    items: [
      "Revenue Growth",
      "Market Expansion",
      "Channel Expansion",
      "Customer Growth",
      "Product Growth",
      "Cross-Sell Opportunities",
      "Upsell Opportunities",
      "Partnership Opportunities",
      "Regional Growth",
      "Growth Priority",
      "Growth History",
      "Growth Reports",
    ],
  },
  {
    id: "financial-recommendations",
    title: "Financial Recommendations",
    description: "Improve cash flow, margins, expenses and working capital.",
    icon: CircleDollarSign,
    items: [
      "Cash Flow Actions",
      "Expense Reduction",
      "Margin Improvement",
      "Receivable Actions",
      "Payable Actions",
      "Working Capital",
      "Treasury Actions",
      "Tax Actions",
      "Budget Reallocation",
      "Finance Priority",
      "Finance History",
      "Finance Reports",
    ],
  },
  {
    id: "sales-recommendations",
    title: "Sales Recommendations",
    description: "Improve conversion, pipeline, pricing and sales productivity.",
    icon: Target,
    items: [
      "Pipeline Actions",
      "Lead Prioritisation",
      "Opportunity Actions",
      "Conversion Improvement",
      "Pricing Actions",
      "Sales Follow-Ups",
      "Territory Actions",
      "Sales Target Actions",
      "Win Rate Improvement",
      "Sales Priority",
      "Sales History",
      "Sales Reports",
    ],
  },
  {
    id: "marketing-recommendations",
    title: "Marketing Recommendations",
    description: "Optimise campaigns, audience, channels and marketing spend.",
    icon: Sparkles,
    items: [
      "Campaign Optimisation",
      "Budget Reallocation",
      "Audience Recommendations",
      "Channel Recommendations",
      "Content Recommendations",
      "SEO Recommendations",
      "Email Recommendations",
      "WhatsApp Recommendations",
      "ROAS Improvement",
      "Marketing Priority",
      "Marketing History",
      "Marketing Reports",
    ],
  },
  {
    id: "customer-recommendations",
    title: "Customer Recommendations",
    description: "Improve retention, loyalty, satisfaction and customer value.",
    icon: Users,
    items: [
      "Retention Actions",
      "Churn Prevention",
      "Loyalty Actions",
      "Customer Recovery",
      "Customer Segments",
      "Service Improvement",
      "Customer Experience",
      "Customer LTV Actions",
      "Personalised Offers",
      "Customer Priority",
      "Customer History",
      "Customer Reports",
    ],
  },
  {
    id: "product-recommendations",
    title: "Product Recommendations",
    description: "Improve assortment, pricing, quality and product performance.",
    icon: PackageSearch,
    items: [
      "Product Opportunity",
      "Assortment Actions",
      "Pricing Actions",
      "Bundling Actions",
      "Variant Actions",
      "Low Performer Actions",
      "High Performer Actions",
      "Quality Actions",
      "Product Launch Actions",
      "Product Priority",
      "Product History",
      "Product Reports",
    ],
  },
  {
    id: "inventory-recommendations",
    title: "Inventory Recommendations",
    description: "Optimise stock, reorder, transfers and warehouse allocation.",
    icon: PackageSearch,
    items: [
      "Reorder Recommendations",
      "Safety Stock Actions",
      "Stock Transfer Actions",
      "Overstock Reduction",
      "Stockout Prevention",
      "Warehouse Allocation",
      "Dead Stock Actions",
      "Seasonal Stock Actions",
      "Supplier Replenishment",
      "Inventory Priority",
      "Inventory History",
      "Inventory Reports",
    ],
  },
  {
    id: "procurement-recommendations",
    title: "Procurement Recommendations",
    description: "Improve sourcing, vendor selection and purchasing decisions.",
    icon: Workflow,
    items: [
      "Vendor Selection",
      "Supplier Consolidation",
      "Price Negotiation",
      "Purchase Timing",
      "Contract Renewal",
      "Lead-Time Reduction",
      "Quality Improvement",
      "Vendor Risk Action",
      "Savings Opportunity",
      "Procurement Priority",
      "Procurement History",
      "Procurement Reports",
    ],
  },
  {
    id: "hr-recommendations",
    title: "HR Recommendations",
    description: "Improve hiring, retention, performance and workforce planning.",
    icon: Users,
    items: [
      "Hiring Recommendations",
      "Retention Actions",
      "Attrition Prevention",
      "Performance Actions",
      "Training Recommendations",
      "Promotion Recommendations",
      "Compensation Actions",
      "Attendance Actions",
      "Workforce Planning",
      "HR Priority",
      "HR History",
      "HR Reports",
    ],
  },
  {
    id: "project-recommendations",
    title: "Project Recommendations",
    description: "Improve delivery, resource allocation and project health.",
    icon: Workflow,
    items: [
      "Project Priority",
      "Schedule Actions",
      "Resource Reallocation",
      "Budget Actions",
      "Risk Mitigation",
      "Milestone Actions",
      "Task Prioritisation",
      "Delay Prevention",
      "Project Recovery",
      "Project Priority",
      "Project History",
      "Project Reports",
    ],
  },
  {
    id: "risk-recommendations",
    title: "Risk Recommendations",
    description: "Prioritise risk treatment, controls and incident response.",
    icon: AlertTriangle,
    items: [
      "Risk Treatment",
      "Control Improvement",
      "Incident Response",
      "Fraud Prevention",
      "Cyber Actions",
      "Vendor Risk Actions",
      "Operational Risk Actions",
      "Legal Risk Actions",
      "Business Continuity",
      "Risk Priority",
      "Risk History",
      "Risk Reports",
    ],
  },
  {
    id: "legal-recommendations",
    title: "Legal & Compliance Recommendations",
    description: "Improve legal readiness, compliance and obligation management.",
    icon: ShieldCheck,
    items: [
      "Contract Actions",
      "Compliance Actions",
      "Licence Renewal",
      "Policy Actions",
      "Legal Matter Actions",
      "Litigation Actions",
      "Regulatory Actions",
      "Privacy Actions",
      "Audit Actions",
      "Legal Priority",
      "Legal History",
      "Legal Reports",
    ],
  },
  {
    id: "operations-recommendations",
    title: "Operations Recommendations",
    description: "Improve service levels, process efficiency and execution.",
    icon: Activity,
    items: [
      "Process Improvement",
      "SLA Improvement",
      "Capacity Actions",
      "Quality Improvement",
      "Delay Reduction",
      "Workflow Improvement",
      "Cost Efficiency",
      "Service Recovery",
      "Automation Opportunity",
      "Operations Priority",
      "Operations History",
      "Operations Reports",
    ],
  },
  {
    id: "pricing-recommendations",
    title: "Pricing Recommendations",
    description: "Optimise price, discounts and contribution margins.",
    icon: IndianRupee,
    items: [
      "Price Increase",
      "Price Decrease",
      "Margin Improvement",
      "Discount Reduction",
      "Promotion Pricing",
      "Channel Pricing",
      "Product Pricing",
      "Bundle Pricing",
      "Dynamic Pricing",
      "Pricing Priority",
      "Pricing History",
      "Pricing Reports",
    ],
  },
  {
    id: "offer-recommendations",
    title: "Offer Recommendations",
    description: "Generate customer offers, bundles and campaign actions.",
    icon: Gift,
    items: [
      "Coupon Recommendations",
      "Bundle Recommendations",
      "Loyalty Offers",
      "Retention Offers",
      "Win-Back Offers",
      "Cross-Sell Offers",
      "Upsell Offers",
      "Seasonal Offers",
      "Segment Offers",
      "Offer Priority",
      "Offer History",
      "Offer Reports",
    ],
  },
  {
    id: "recommendation-prioritisation",
    title: "Priority Management",
    description: "Rank recommendations by impact, urgency and confidence.",
    icon: Gauge,
    items: [
      "Impact Score",
      "Urgency Score",
      "Confidence Score",
      "Effort Score",
      "Risk Score",
      "Financial Value",
      "Customer Impact",
      "Strategic Fit",
      "Priority Queue",
      "Priority Rules",
      "Priority History",
      "Priority Reports",
    ],
  },
  {
    id: "recommendation-review",
    title: "Review & Approval",
    description: "Review, approve, reject and assign recommendation actions.",
    icon: CheckCircle2,
    items: [
      "Review Queue",
      "Founder Review",
      "Department Review",
      "Finance Review",
      "Risk Review",
      "Approve Recommendation",
      "Reject Recommendation",
      "Request Changes",
      "Assign Owner",
      "Set Due Date",
      "Review History",
      "Review Reports",
    ],
  },
  {
    id: "recommendation-execution",
    title: "Recommendation Execution",
    description: "Convert approved recommendations into tasks and workflows.",
    icon: Zap,
    items: [
      "Create Task",
      "Create Project",
      "Create Approval",
      "Create Automation",
      "Assign Owner",
      "Set Priority",
      "Set Due Date",
      "Set Milestone",
      "Track Progress",
      "Execution Status",
      "Execution History",
      "Execution Reports",
    ],
  },
  {
    id: "value-realisation",
    title: "Value Realisation",
    description: "Measure revenue, savings and business impact from recommendations.",
    icon: IndianRupee,
    items: [
      "Revenue Realised",
      "Savings Realised",
      "Margin Improvement",
      "Time Saved",
      "Risk Reduced",
      "Customer Impact",
      "Employee Impact",
      "Operational Impact",
      "Expected vs Actual",
      "Value Validation",
      "Value History",
      "Value Reports",
    ],
  },
  {
    id: "recommendation-feedback",
    title: "Feedback & Learning",
    description: "Improve recommendation quality using outcomes and user feedback.",
    icon: BrainCircuit,
    items: [
      "Helpful Recommendations",
      "Rejected Recommendations",
      "Incorrect Recommendations",
      "Outcome Feedback",
      "Owner Feedback",
      "Founder Feedback",
      "Model Feedback",
      "Priority Feedback",
      "Learning Queue",
      "Quality Improvement",
      "Feedback History",
      "Feedback Reports",
    ],
  },
  {
    id: "recommendation-analytics",
    title: "Recommendation Analytics",
    description: "Analyse recommendation quality, adoption and business impact.",
    icon: Activity,
    items: [
      "Recommendation Volume",
      "Acceptance Rate",
      "Rejection Rate",
      "Execution Rate",
      "Value Realised",
      "Department Analytics",
      "Priority Analytics",
      "Confidence Analytics",
      "Owner Analytics",
      "Trend Analytics",
      "Impact Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "recommendation-reports",
    title: "Recommendation Reports",
    description: "Generate executive, department and value reports.",
    icon: FileBarChart,
    items: [
      "Executive Recommendations Report",
      "Open Recommendations Report",
      "Accepted Recommendations Report",
      "Rejected Recommendations Report",
      "Execution Report",
      "Value Realisation Report",
      "Department Report",
      "Priority Report",
      "Confidence Report",
      "Owner Report",
      "Impact Report",
      "Custom Reports",
    ],
  },
  {
    id: "recommendation-settings",
    title: "Recommendation Settings",
    description: "Configure models, priorities, approvals and permissions.",
    icon: Settings2,
    items: [
      "Recommendation Categories",
      "Priority Rules",
      "Impact Rules",
      "Confidence Threshold",
      "Approval Matrix",
      "Review SLA",
      "Value Tracking",
      "Department Access",
      "Notification Settings",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-recommendation-engine",
    title: "KRVE AI Recommendation Engine",
    description: "Use AI to generate, rank, explain and improve enterprise recommendations.",
    icon: Sparkles,
    items: [
      "AI Recommendation Generation",
      "AI Priority Ranking",
      "AI Impact Estimation",
      "AI Confidence Scoring",
      "AI Action Plan",
      "AI Recommendation Summary",
      "AI Recommendation Explanation",
      "AI Owner Suggestion",
      "AI Value Forecast",
      "AI Feedback Learning",
      "AI Executive Brief",
      "AI Recommendation Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Open Recommendations", "24", "8 high priority", Sparkles],
  ["Accepted", "68%", "Current quarter", CheckCircle2],
  ["Value Realised", "₹7.84L", "Measured impact", IndianRupee],
  ["Under Review", "11", "Assigned to owners", BellRing],
];

export default function AIRecommendationsManagement() {
  const [selectedModule, setSelectedModule] =
    useState<RecommendationModule | null>(null);
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
            placeholder="Search recommendations, priorities or actions..."
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
          Complete AI Recommendation Operations
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Tap any card to open its complete recommendation workspace.
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
              <Sparkles size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              AI Decision Recommendations
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            AI Recommendations Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Receive prioritised recommendations based on growth potential,
            savings, customer experience, operational performance and
            enterprise risk, then review, approve and execute them.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Gauge size={17} />
            Review Priorities
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <CheckCircle2 size={17} />
            Accept Recommendation
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
  module: RecommendationModule;
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
  module: RecommendationModule;
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
          Back to Recommendation Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Recommendation Workspace
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
            Create New
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric title="Active Recommendations" value="24" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Reviews" value="11" note="Require attention" icon={BellRing} />
        <WorkspaceMetric title="Acceptance Rate" value="68%" note="Current quarter" icon={CheckCircle2} />
        <WorkspaceMetric title="Value Realised" value="₹7.84L" note="Measured impact" icon={IndianRupee} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its recommendation workflow.
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
    Sparkles,
    Lightbulb,
    TrendingUp,
    CircleDollarSign,
    Target,
    Users,
    PackageSearch,
    Workflow,
    AlertTriangle,
    ShieldCheck,
    Gauge,
    CheckCircle2,
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