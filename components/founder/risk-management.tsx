"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CloudCog,
  FileBarChart,
  FileCheck2,
  FileSearch,
  FileText,
  Flame,
  Gauge,
  Globe2,
  HeartPulse,
  Landmark,
  LockKeyhole,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
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
  | "risk-dashboard"
  | "enterprise-risk-register"
  | "risk-identification"
  | "risk-assessment"
  | "risk-scoring"
  | "risk-ownership"
  | "risk-treatment"
  | "control-management"
  | "incident-management"
  | "operational-risk"
  | "financial-risk"
  | "strategic-risk"
  | "legal-compliance-risk"
  | "cyber-risk"
  | "data-privacy-risk"
  | "vendor-risk"
  | "project-risk"
  | "business-continuity"
  | "crisis-management"
  | "insurance-risk"
  | "fraud-risk"
  | "health-safety-risk"
  | "environmental-risk"
  | "risk-monitoring"
  | "risk-appetite"
  | "risk-audit"
  | "risk-analytics"
  | "risk-reports"
  | "risk-settings"
  | "krve-ai-risk";

type RiskModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: RiskModule[] = [
  {
    id: "risk-dashboard",
    title: "Risk Dashboard",
    description: "View enterprise risk exposure, incidents, controls and mitigation status.",
    icon: BarChart3,
    items: [
      "Open Risks",
      "High Risks",
      "Controls Active",
      "Open Incidents",
      "Mitigation Progress",
      "Risk Heatmap",
      "Top Risk Owners",
      "Overdue Actions",
      "AI Insights",
    ],
  },
  {
    id: "enterprise-risk-register",
    title: "Enterprise Risk Register",
    description: "Maintain the complete register of enterprise risks.",
    icon: FileText,
    items: [
      "Create Risk",
      "All Risks",
      "Open Risks",
      "Closed Risks",
      "Risk Categories",
      "Risk Owners",
      "Risk Status",
      "Risk Priority",
      "Risk Tags",
      "Risk Timeline",
      "Risk History",
      "Risk Register Report",
    ],
  },
  {
    id: "risk-identification",
    title: "Risk Identification",
    description: "Capture potential threats, vulnerabilities and business exposures.",
    icon: FileSearch,
    items: [
      "Risk Workshops",
      "Risk Interviews",
      "Process Risk Review",
      "Department Risk Review",
      "Project Risk Review",
      "Vendor Risk Review",
      "Incident-Based Risks",
      "Audit-Based Risks",
      "Emerging Risks",
      "External Threats",
      "Risk Sources",
      "Identification History",
    ],
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    description: "Assess likelihood, impact, velocity and exposure.",
    icon: Gauge,
    items: [
      "Likelihood Assessment",
      "Impact Assessment",
      "Risk Velocity",
      "Risk Duration",
      "Financial Impact",
      "Operational Impact",
      "Legal Impact",
      "Reputational Impact",
      "People Impact",
      "Technology Impact",
      "Assessment Review",
      "Assessment History",
    ],
  },
  {
    id: "risk-scoring",
    title: "Risk Scoring",
    description: "Calculate inherent, residual and target risk scores.",
    icon: Target,
    items: [
      "Inherent Risk Score",
      "Control Effectiveness",
      "Residual Risk Score",
      "Target Risk Score",
      "Risk Matrix",
      "Risk Rating",
      "Criticality",
      "Scoring Rules",
      "Thresholds",
      "Score Approval",
      "Score History",
      "Scoring Reports",
    ],
  },
  {
    id: "risk-ownership",
    title: "Risk Ownership",
    description: "Assign accountability, action owners and escalation paths.",
    icon: Users,
    items: [
      "Risk Owners",
      "Action Owners",
      "Control Owners",
      "Department Owners",
      "Executive Sponsors",
      "Backup Owners",
      "Ownership Transfer",
      "Ownership Review",
      "Escalation Matrix",
      "Owner Notifications",
      "Ownership History",
      "Ownership Reports",
    ],
  },
  {
    id: "risk-treatment",
    title: "Risk Treatment",
    description: "Plan mitigation, transfer, avoidance and acceptance actions.",
    icon: Workflow,
    items: [
      "Mitigation Plans",
      "Avoidance Plans",
      "Transfer Plans",
      "Acceptance Plans",
      "Contingency Plans",
      "Action Items",
      "Target Dates",
      "Action Owners",
      "Action Approval",
      "Progress Tracking",
      "Treatment History",
      "Treatment Reports",
    ],
  },
  {
    id: "control-management",
    title: "Control Management",
    description: "Design, operate and test preventive and detective controls.",
    icon: ShieldCheck,
    items: [
      "Control Register",
      "Preventive Controls",
      "Detective Controls",
      "Corrective Controls",
      "Manual Controls",
      "Automated Controls",
      "Control Owners",
      "Control Frequency",
      "Control Testing",
      "Control Effectiveness",
      "Control Exceptions",
      "Control Reports",
    ],
  },
  {
    id: "incident-management",
    title: "Incident Management",
    description: "Register, investigate and resolve enterprise incidents.",
    icon: AlertTriangle,
    items: [
      "Report Incident",
      "Open Incidents",
      "Critical Incidents",
      "Incident Categories",
      "Incident Severity",
      "Incident Owner",
      "Root Cause Analysis",
      "Corrective Actions",
      "Incident Escalation",
      "Incident Closure",
      "Incident History",
      "Incident Reports",
    ],
  },
  {
    id: "operational-risk",
    title: "Operational Risk",
    description: "Manage process, people, system and execution risks.",
    icon: Activity,
    items: [
      "Process Risks",
      "People Risks",
      "System Risks",
      "Execution Risks",
      "Service Disruption",
      "Capacity Risks",
      "Quality Risks",
      "Operational Incidents",
      "Operational Controls",
      "Operational KRIs",
      "Operational Reviews",
      "Operational Risk Reports",
    ],
  },
  {
    id: "financial-risk",
    title: "Financial Risk",
    description: "Monitor liquidity, credit, market and treasury exposures.",
    icon: CircleDollarSign,
    items: [
      "Liquidity Risk",
      "Credit Risk",
      "Market Risk",
      "Interest Rate Risk",
      "Foreign Exchange Risk",
      "Cash Flow Risk",
      "Investment Risk",
      "Counterparty Risk",
      "Financial Controls",
      "Financial KRIs",
      "Financial Reviews",
      "Financial Risk Reports",
    ],
  },
  {
    id: "strategic-risk",
    title: "Strategic Risk",
    description: "Track risks to growth, competition and enterprise objectives.",
    icon: Target,
    items: [
      "Business Model Risk",
      "Market Risk",
      "Competition Risk",
      "Growth Risk",
      "Brand Risk",
      "Reputation Risk",
      "Innovation Risk",
      "Expansion Risk",
      "Strategic Assumptions",
      "Strategic KRIs",
      "Strategic Reviews",
      "Strategic Risk Reports",
    ],
  },
  {
    id: "legal-compliance-risk",
    title: "Legal & Compliance Risk",
    description: "Monitor legal obligations, regulatory exposure and policy breaches.",
    icon: Landmark,
    items: [
      "Legal Risk",
      "Regulatory Risk",
      "Contract Risk",
      "Compliance Risk",
      "Policy Breaches",
      "Licence Risk",
      "Litigation Risk",
      "Statutory Risk",
      "Compliance Controls",
      "Compliance KRIs",
      "Legal Reviews",
      "Legal Risk Reports",
    ],
  },
  {
    id: "cyber-risk",
    title: "Cyber Risk",
    description: "Manage threats to systems, applications and infrastructure.",
    icon: LockKeyhole,
    items: [
      "Cyber Risk Register",
      "Threat Assessment",
      "Vulnerability Assessment",
      "Access Risk",
      "Malware Risk",
      "Phishing Risk",
      "Cloud Risk",
      "Application Risk",
      "Cyber Controls",
      "Cyber Incidents",
      "Cyber KRIs",
      "Cyber Risk Reports",
    ],
  },
  {
    id: "data-privacy-risk",
    title: "Data Privacy Risk",
    description: "Track privacy, consent, retention and breach exposure.",
    icon: ShieldAlert,
    items: [
      "Privacy Risk Register",
      "Personal Data Risk",
      "Consent Risk",
      "Data Sharing Risk",
      "Retention Risk",
      "Third-Party Data Risk",
      "Access Risk",
      "Data Breach Risk",
      "Privacy Controls",
      "Privacy Incidents",
      "Privacy KRIs",
      "Privacy Risk Reports",
    ],
  },
  {
    id: "vendor-risk",
    title: "Vendor Risk",
    description: "Assess supplier, partner and third-party risk.",
    icon: Building2,
    items: [
      "Vendor Risk Register",
      "Financial Stability",
      "Delivery Risk",
      "Quality Risk",
      "Compliance Risk",
      "Cyber Risk",
      "Concentration Risk",
      "Business Continuity",
      "Vendor Controls",
      "Vendor Incidents",
      "Vendor KRIs",
      "Vendor Risk Reports",
    ],
  },
  {
    id: "project-risk",
    title: "Project Risk",
    description: "Track scope, schedule, cost and delivery risk.",
    icon: Workflow,
    items: [
      "Project Risk Register",
      "Scope Risk",
      "Schedule Risk",
      "Budget Risk",
      "Resource Risk",
      "Dependency Risk",
      "Technology Risk",
      "Quality Risk",
      "Project Controls",
      "Project Incidents",
      "Project KRIs",
      "Project Risk Reports",
    ],
  },
  {
    id: "business-continuity",
    title: "Business Continuity",
    description: "Prepare recovery plans for critical business operations.",
    icon: RefreshCcw,
    items: [
      "Business Impact Analysis",
      "Critical Processes",
      "Recovery Time Objective",
      "Recovery Point Objective",
      "Continuity Plans",
      "Alternate Worksites",
      "Critical Vendors",
      "Emergency Contacts",
      "Continuity Testing",
      "Recovery Exercises",
      "Continuity Incidents",
      "Continuity Reports",
    ],
  },
  {
    id: "crisis-management",
    title: "Crisis Management",
    description: "Coordinate response to critical enterprise events.",
    icon: Flame,
    items: [
      "Crisis Register",
      "Crisis Team",
      "Crisis Levels",
      "Crisis Activation",
      "Situation Reports",
      "Emergency Communication",
      "Stakeholder Updates",
      "Executive Decisions",
      "Crisis Actions",
      "Crisis Closure",
      "Lessons Learned",
      "Crisis Reports",
    ],
  },
  {
    id: "insurance-risk",
    title: "Insurance Risk",
    description: "Manage insurance coverage, claims and uninsured exposures.",
    icon: ShieldCheck,
    items: [
      "Insurance Register",
      "Policy Coverage",
      "Property Insurance",
      "Liability Insurance",
      "Cyber Insurance",
      "Employee Insurance",
      "Business Interruption",
      "Claims",
      "Policy Renewal",
      "Coverage Gaps",
      "Insurance History",
      "Insurance Reports",
    ],
  },
  {
    id: "fraud-risk",
    title: "Fraud Risk",
    description: "Detect, investigate and mitigate fraud exposure.",
    icon: TriangleAlert,
    items: [
      "Fraud Risk Register",
      "Payment Fraud",
      "Vendor Fraud",
      "Employee Fraud",
      "Customer Fraud",
      "Inventory Fraud",
      "Expense Fraud",
      "Fraud Indicators",
      "Fraud Controls",
      "Fraud Investigations",
      "Fraud Incidents",
      "Fraud Risk Reports",
    ],
  },
  {
    id: "health-safety-risk",
    title: "Health & Safety Risk",
    description: "Manage workplace safety, incidents and preventive controls.",
    icon: HeartPulse,
    items: [
      "Safety Risk Register",
      "Workplace Hazards",
      "Safety Inspections",
      "Near Misses",
      "Safety Incidents",
      "Emergency Response",
      "Safety Training",
      "PPE Controls",
      "Corrective Actions",
      "Safety KRIs",
      "Safety Reviews",
      "Safety Reports",
    ],
  },
  {
    id: "environmental-risk",
    title: "Environmental Risk",
    description: "Track environmental impact, permits and sustainability risks.",
    icon: Globe2,
    items: [
      "Environmental Risk Register",
      "Waste Risk",
      "Energy Risk",
      "Water Risk",
      "Emission Risk",
      "Environmental Permits",
      "Environmental Incidents",
      "Sustainability Risk",
      "Environmental Controls",
      "Environmental KRIs",
      "Environmental Reviews",
      "Environmental Reports",
    ],
  },
  {
    id: "risk-monitoring",
    title: "Risk Monitoring",
    description: "Monitor KRIs, thresholds, actions and risk movement.",
    icon: Activity,
    items: [
      "KRI Dashboard",
      "Key Risk Indicators",
      "Risk Thresholds",
      "Risk Alerts",
      "Risk Trend",
      "Control Failures",
      "Overdue Actions",
      "Risk Reviews",
      "Risk Reassessment",
      "Risk Escalation",
      "Monitoring History",
      "Monitoring Reports",
    ],
  },
  {
    id: "risk-appetite",
    title: "Risk Appetite",
    description: "Define risk tolerance, limits and escalation thresholds.",
    icon: Gauge,
    items: [
      "Risk Appetite Statement",
      "Risk Tolerance",
      "Risk Limits",
      "Department Limits",
      "Financial Limits",
      "Operational Limits",
      "Compliance Limits",
      "Cyber Limits",
      "Appetite Breaches",
      "Appetite Review",
      "Appetite Approval",
      "Appetite Reports",
    ],
  },
  {
    id: "risk-audit",
    title: "Risk Audit",
    description: "Test risk controls, governance and management effectiveness.",
    icon: FileCheck2,
    items: [
      "Risk Audit Plan",
      "Risk Audit Calendar",
      "Control Audit",
      "Risk Register Review",
      "Treatment Review",
      "KRI Review",
      "Evidence Review",
      "Audit Findings",
      "Corrective Actions",
      "Audit Closure",
      "Audit History",
      "Risk Audit Reports",
    ],
  },
  {
    id: "risk-analytics",
    title: "Risk Analytics",
    description: "Analyse exposure, incidents, controls and mitigation performance.",
    icon: Activity,
    items: [
      "Risk Exposure Analytics",
      "Heatmap Analytics",
      "Incident Analytics",
      "Control Analytics",
      "Mitigation Analytics",
      "Department Analytics",
      "Category Analytics",
      "Owner Analytics",
      "KRI Analytics",
      "Trend Analytics",
      "Loss Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "risk-reports",
    title: "Risk Reports",
    description: "Generate enterprise, category and executive risk reports.",
    icon: FileBarChart,
    items: [
      "Executive Risk Report",
      "Enterprise Risk Report",
      "Risk Register Report",
      "Incident Report",
      "Control Report",
      "Mitigation Report",
      "KRI Report",
      "Business Continuity Report",
      "Crisis Report",
      "Audit Report",
      "Loss Event Report",
      "Custom Reports",
    ],
  },
  {
    id: "risk-settings",
    title: "Risk Settings",
    description: "Configure categories, matrices, workflows and permissions.",
    icon: Settings2,
    items: [
      "Risk ID Format",
      "Risk Categories",
      "Risk Matrix",
      "Likelihood Scale",
      "Impact Scale",
      "Risk Thresholds",
      "Control Types",
      "Approval Matrix",
      "Escalation Rules",
      "Notification Settings",
      "Roles",
      "Permissions",
    ],
  },
  {
    id: "krve-ai-risk",
    title: "KRVE AI Risk",
    description: "Use AI for risk detection, prediction and mitigation planning.",
    icon: Sparkles,
    items: [
      "AI Risk Identification",
      "AI Risk Scoring",
      "AI Incident Classification",
      "AI Root Cause Analysis",
      "AI Control Recommendation",
      "AI Mitigation Plan",
      "AI KRI Prediction",
      "AI Emerging Risk Detection",
      "AI Fraud Detection",
      "AI Crisis Summary",
      "AI Risk Forecast",
      "AI Risk Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Open Risks", "24", "4 rated high", AlertTriangle],
  ["Controls Active", "86", "Across 9 functions", ShieldCheck],
  ["Incidents", "3", "Current month", BellRing],
  ["Mitigation Complete", "78%", "Current quarter", CheckCircle2],
];

export default function RiskManagement() {
  const [selectedModule, setSelectedModule] = useState<RiskModule | null>(null);
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
            placeholder="Search risks, controls, incidents or workflows..."
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
            Complete Risk Management Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete risk workspace.
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
              <Activity size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Enterprise Risk Center
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Risk Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete enterprise risk management covering identification,
            assessment, controls, incidents, operational, financial, legal,
            cyber, continuity, analytics and KRVE AI Risk.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <AlertTriangle size={17} />
            Report Incident
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Register Risk
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
  module: RiskModule;
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
  module: RiskModule;
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
          Back to Risk Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Risk Workspace
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
        <WorkspaceMetric title="Pending Actions" value="14" note="Require attention" icon={BellRing} />
        <WorkspaceMetric title="Completed" value="78%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="8" note="Available exports" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its risk workflow.
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
    AlertTriangle,
    Gauge,
    Target,
    Users,
    Workflow,
    ShieldCheck,
    Activity,
    CircleDollarSign,
    Landmark,
    LockKeyhole,
    RefreshCcw,
    Flame,
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