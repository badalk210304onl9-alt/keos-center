"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Database,
  Eye,
  FileBarChart,
  FileSearch,
  Gauge,
  IndianRupee,
  LockKeyhole,
  PackageSearch,
  Plus,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
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

type AnomalyModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: AnomalyModule[] = [
  {
    id: "anomaly-dashboard",
    title: "Anomaly Dashboard",
    description: "View open anomalies, checks, false positives and prevented exposure.",
    icon: BarChart3,
    items: [
      "Open Anomalies",
      "Checked Today",
      "False Positive Rate",
      "Prevented Exposure",
      "High Severity Alerts",
      "Department Exposure",
      "Model Confidence",
      "Pending Reviews",
      "AI Insights",
    ],
  },
  {
    id: "financial-anomalies",
    title: "Financial Anomalies",
    description: "Detect unusual journals, payments, balances and cash movements.",
    icon: CircleDollarSign,
    items: [
      "Journal Anomalies",
      "Payment Anomalies",
      "Receipt Anomalies",
      "Expense Anomalies",
      "Bank Anomalies",
      "Cash Anomalies",
      "Receivable Anomalies",
      "Payable Anomalies",
      "Tax Anomalies",
      "Payroll Anomalies",
      "Financial Review",
      "Financial Reports",
    ],
  },
  {
    id: "transaction-anomalies",
    title: "Transaction Anomalies",
    description: "Monitor unusual transaction values, frequency and patterns.",
    icon: Activity,
    items: [
      "High-Value Transactions",
      "Duplicate Transactions",
      "Rapid Transactions",
      "Round-Value Transactions",
      "Off-Hour Transactions",
      "Location Mismatch",
      "User Mismatch",
      "Pattern Break",
      "Transaction Review",
      "Transaction Hold",
      "Transaction History",
      "Transaction Reports",
    ],
  },
  {
    id: "inventory-anomalies",
    title: "Inventory Anomalies",
    description: "Detect stock mismatches, unusual movements and shrinkage.",
    icon: PackageSearch,
    items: [
      "Stock Variance",
      "Negative Stock",
      "Rapid Stock Movement",
      "Unusual Adjustments",
      "Transfer Mismatch",
      "Warehouse Mismatch",
      "Shrinkage Detection",
      "Dead Stock Pattern",
      "Stockout Pattern",
      "Inventory Review",
      "Inventory History",
      "Inventory Reports",
    ],
  },
  {
    id: "order-anomalies",
    title: "Order Anomalies",
    description: "Identify unusual orders, cancellations, refunds and fulfilment behaviour.",
    icon: FileSearch,
    items: [
      "High-Value Orders",
      "Duplicate Orders",
      "Rapid Cancellations",
      "Refund Anomalies",
      "Address Mismatch",
      "Payment Mismatch",
      "Coupon Abuse",
      "Order Velocity",
      "Fulfilment Pattern",
      "Order Review",
      "Order History",
      "Order Reports",
    ],
  },
  {
    id: "customer-anomalies",
    title: "Customer Anomalies",
    description: "Detect unusual customer activity, abuse and suspicious behaviour.",
    icon: Users,
    items: [
      "Account Behaviour",
      "Login Anomalies",
      "Purchase Pattern",
      "Return Abuse",
      "Refund Abuse",
      "Coupon Abuse",
      "Multiple Accounts",
      "Address Reuse",
      "Payment Reuse",
      "Customer Review",
      "Customer History",
      "Customer Reports",
    ],
  },
  {
    id: "employee-anomalies",
    title: "Employee Anomalies",
    description: "Monitor unusual access, attendance, expenses and approvals.",
    icon: Users,
    items: [
      "Access Anomalies",
      "Attendance Anomalies",
      "Expense Anomalies",
      "Approval Anomalies",
      "Payroll Anomalies",
      "Data Download Anomalies",
      "Privilege Misuse",
      "Off-Hour Activity",
      "Department Mismatch",
      "Employee Review",
      "Employee History",
      "Employee Reports",
    ],
  },
  {
    id: "vendor-anomalies",
    title: "Vendor Anomalies",
    description: "Detect unusual billing, delivery, pricing and payment behaviour.",
    icon: ShieldAlert,
    items: [
      "Invoice Anomalies",
      "Payment Anomalies",
      "Price Anomalies",
      "Delivery Anomalies",
      "Duplicate Billing",
      "Bank Detail Change",
      "Vendor Concentration",
      "Quality Pattern",
      "Contract Deviation",
      "Vendor Review",
      "Vendor History",
      "Vendor Reports",
    ],
  },
  {
    id: "access-anomalies",
    title: "Access Anomalies",
    description: "Monitor unusual login, role, permission and data access patterns.",
    icon: LockKeyhole,
    items: [
      "Login Anomalies",
      "Failed Logins",
      "New Device",
      "New Location",
      "Role Escalation",
      "Permission Change",
      "Restricted Data Access",
      "Bulk Download",
      "Off-Hour Access",
      "Access Review",
      "Access History",
      "Access Reports",
    ],
  },
  {
    id: "cyber-anomalies",
    title: "Cyber Anomalies",
    description: "Detect unusual system, network and application behaviour.",
    icon: ShieldCheck,
    items: [
      "Network Anomalies",
      "Application Anomalies",
      "API Anomalies",
      "Malware Signals",
      "Data Exfiltration",
      "Privilege Abuse",
      "Suspicious Sessions",
      "Configuration Changes",
      "Threat Indicators",
      "Cyber Review",
      "Cyber History",
      "Cyber Reports",
    ],
  },
  {
    id: "marketing-anomalies",
    title: "Marketing Anomalies",
    description: "Detect abnormal campaign spend, traffic and conversion behaviour.",
    icon: Target,
    items: [
      "Spend Anomalies",
      "Traffic Anomalies",
      "Conversion Anomalies",
      "ROAS Anomalies",
      "Lead Anomalies",
      "Click Fraud",
      "Bot Traffic",
      "Campaign Pattern",
      "Channel Deviation",
      "Marketing Review",
      "Marketing History",
      "Marketing Reports",
    ],
  },
  {
    id: "pricing-anomalies",
    title: "Pricing Anomalies",
    description: "Identify unusual discounts, margins and price changes.",
    icon: IndianRupee,
    items: [
      "Price Change Anomalies",
      "Discount Anomalies",
      "Margin Anomalies",
      "Below-Cost Sales",
      "Channel Price Mismatch",
      "Variant Price Mismatch",
      "Coupon Conflict",
      "Approval Bypass",
      "Pricing Pattern",
      "Pricing Review",
      "Pricing History",
      "Pricing Reports",
    ],
  },
  {
    id: "operational-anomalies",
    title: "Operational Anomalies",
    description: "Detect unusual process, delay and service-level behaviour.",
    icon: Workflow,
    items: [
      "Process Deviation",
      "SLA Breach",
      "Delay Pattern",
      "Capacity Anomaly",
      "Quality Anomaly",
      "Service Anomaly",
      "Workflow Failure",
      "Approval Delay",
      "Department Deviation",
      "Operations Review",
      "Operations History",
      "Operations Reports",
    ],
  },
  {
    id: "model-rules",
    title: "Detection Rules",
    description: "Configure thresholds, logic and anomaly detection rules.",
    icon: Settings2,
    items: [
      "Create Rule",
      "Threshold Rules",
      "Pattern Rules",
      "Frequency Rules",
      "Amount Rules",
      "Time Rules",
      "Location Rules",
      "User Rules",
      "Department Rules",
      "Rule Testing",
      "Rule Versions",
      "Rule History",
    ],
  },
  {
    id: "model-management",
    title: "Detection Models",
    description: "Manage anomaly models, versions and confidence levels.",
    icon: Sparkles,
    items: [
      "Model Registry",
      "Active Models",
      "Model Version",
      "Model Threshold",
      "Model Confidence",
      "Model Precision",
      "Model Recall",
      "Model Testing",
      "Model Comparison",
      "Model Deployment",
      "Model History",
      "Model Reports",
    ],
  },
  {
    id: "review-queue",
    title: "Anomaly Review Queue",
    description: "Review, assign, investigate and close anomaly cases.",
    icon: Eye,
    items: [
      "Open Queue",
      "High Severity",
      "Assigned Cases",
      "Unassigned Cases",
      "Investigation Notes",
      "Evidence",
      "Case Owner",
      "Escalation",
      "Mark Confirmed",
      "Mark False Positive",
      "Close Case",
      "Review History",
    ],
  },
  {
    id: "false-positive-management",
    title: "False Positive Management",
    description: "Reduce noise and improve anomaly detection precision.",
    icon: CheckCircle2,
    items: [
      "False Positive Queue",
      "Reason Codes",
      "Rule Adjustment",
      "Threshold Adjustment",
      "Model Feedback",
      "Whitelist",
      "Trusted Users",
      "Trusted Vendors",
      "Trusted Transactions",
      "False Positive Trend",
      "False Positive History",
      "False Positive Reports",
    ],
  },
  {
    id: "case-management",
    title: "Anomaly Case Management",
    description: "Turn confirmed anomalies into tracked investigation cases.",
    icon: AlertTriangle,
    items: [
      "Create Case",
      "Case Severity",
      "Case Owner",
      "Case Timeline",
      "Evidence",
      "Root Cause",
      "Related Records",
      "Corrective Actions",
      "Escalation",
      "Case Closure",
      "Case History",
      "Case Reports",
    ],
  },
  {
    id: "response-actions",
    title: "Automated Response",
    description: "Trigger holds, alerts and corrective actions automatically.",
    icon: Zap,
    items: [
      "Hold Transaction",
      "Block User",
      "Pause Workflow",
      "Freeze Payment",
      "Lock Record",
      "Send Alert",
      "Create Task",
      "Create Approval",
      "Escalate Case",
      "Notify Founder",
      "Response History",
      "Response Reports",
    ],
  },
  {
    id: "anomaly-monitoring",
    title: "Live Monitoring",
    description: "Monitor anomaly signals and detection health in real time.",
    icon: Activity,
    items: [
      "Live Signals",
      "Live Alerts",
      "Model Health",
      "Rule Health",
      "Queue Status",
      "Department Status",
      "Detection Latency",
      "Alert Volume",
      "Critical Events",
      "Monitoring History",
      "Monitoring Reports",
    ],
  },
  {
    id: "anomaly-analytics",
    title: "Anomaly Analytics",
    description: "Analyse patterns, exposure, departments and model performance.",
    icon: Gauge,
    items: [
      "Pattern Analytics",
      "Exposure Analytics",
      "Department Analytics",
      "Severity Analytics",
      "Model Analytics",
      "Rule Analytics",
      "False Positive Analytics",
      "Case Analytics",
      "Response Analytics",
      "Trend Analytics",
      "Savings Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "anomaly-reports",
    title: "Anomaly Reports",
    description: "Generate executive, operational and model reports.",
    icon: FileBarChart,
    items: [
      "Executive Anomaly Report",
      "Open Anomaly Report",
      "Financial Anomaly Report",
      "Inventory Anomaly Report",
      "Access Anomaly Report",
      "Vendor Anomaly Report",
      "Customer Anomaly Report",
      "False Positive Report",
      "Model Performance Report",
      "Response Report",
      "Exposure Report",
      "Custom Reports",
    ],
  },
  {
    id: "anomaly-settings",
    title: "Anomaly Settings",
    description: "Configure severity, alerts, rules and permissions.",
    icon: Settings2,
    items: [
      "Severity Levels",
      "Detection Thresholds",
      "Alert Rules",
      "Escalation Rules",
      "Review SLA",
      "Department Access",
      "Human Review",
      "Data Sources",
      "Notification Settings",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-anomaly",
    title: "KRVE AI Anomaly Detection",
    description: "Use AI to detect, explain and prioritise unusual behaviour.",
    icon: Sparkles,
    items: [
      "AI Pattern Detection",
      "AI Risk Scoring",
      "AI Severity Classification",
      "AI Root Cause Analysis",
      "AI False Positive Reduction",
      "AI Response Recommendation",
      "AI Exposure Estimate",
      "AI Investigation Summary",
      "AI Rule Recommendation",
      "AI Model Tuning",
      "AI Anomaly Brief",
      "AI Anomaly Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Open Anomalies", "17", "4 high severity", AlertTriangle],
  ["Checked Today", "18,642", "Transactions and events", Database],
  ["False Positive Rate", "2.8%", "Current model", Gauge],
  ["Prevented Exposure", "₹2.16L", "Current quarter", IndianRupee],
];

export default function AnomalyDetectionManagement() {
  const [selectedModule, setSelectedModule] =
    useState<AnomalyModule | null>(null);
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
            placeholder="Search anomalies, rules, models or investigations..."
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
          Complete Anomaly Detection Operations
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Tap any card to open its complete anomaly workspace.
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
              <AlertTriangle size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Exception Intelligence
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Anomaly Detection Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Continuously detect unusual financial transactions, inventory
            movements, orders, access patterns, customer behaviour, vendor
            activity and operational exceptions using KRVE AI.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Settings2 size={17} />
            Create Rule
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Eye size={17} />
            Review Anomalies
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
  module: AnomalyModule;
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
  module: AnomalyModule;
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
          Back to Anomaly Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Anomaly Workspace
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
        <WorkspaceMetric title="Active Records" value="17" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Reviews" value="14" note="Require attention" icon={BellRing} />
        <WorkspaceMetric title="Detection Accuracy" value="97.2%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="8" note="Available outputs" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its anomaly workflow.
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
    AlertTriangle,
    Activity,
    CircleDollarSign,
    PackageSearch,
    Users,
    LockKeyhole,
    Target,
    Settings2,
    Eye,
    Zap,
    Gauge,
    ShieldCheck,
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