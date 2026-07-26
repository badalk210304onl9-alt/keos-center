"use client";

import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  BookOpenCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileBarChart,
  FileCheck2,
  FileSearch,
  FileSignature,
  FileText,
  Gavel,
  Globe2,
  Landmark,
  ListChecks,
  Plus,
  Scale,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tags,
  TimerReset,
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
  | "legal-dashboard"
  | "legal-matters"
  | "contract-management"
  | "compliance-management"
  | "statutory-compliance"
  | "regulatory-compliance"
  | "licence-management"
  | "litigation-management"
  | "legal-notices"
  | "case-management"
  | "legal-documentation"
  | "policy-management"
  | "corporate-governance"
  | "board-compliance"
  | "intellectual-property"
  | "data-privacy"
  | "labour-compliance"
  | "tax-compliance"
  | "vendor-compliance"
  | "customer-compliance"
  | "internal-audit"
  | "compliance-calendar"
  | "legal-risk"
  | "investigations"
  | "whistleblower"
  | "legal-analytics"
  | "legal-reports"
  | "legal-settings"
  | "krve-ai-legal";

type LegalModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: LegalModule[] = [
  {
    id: "legal-dashboard",
    title: "Legal Dashboard",
    description: "View legal matters, compliance score, renewals and open actions.",
    icon: BarChart3,
    items: [
      "Open Legal Matters",
      "Compliance Score",
      "Renewals Due",
      "Open Actions",
      "Critical Cases",
      "Contracts Expiring",
      "Licence Status",
      "Regulatory Alerts",
      "AI Insights",
    ],
  },
  {
    id: "legal-matters",
    title: "Legal Matters",
    description: "Manage complete legal matters, ownership and status.",
    icon: Scale,
    items: [
      "Add Legal Matter",
      "Open Matters",
      "Closed Matters",
      "Matter Categories",
      "Matter Priority",
      "Matter Owner",
      "External Counsel",
      "Matter Notes",
      "Matter Documents",
      "Matter Timeline",
      "Matter Costs",
      "Matter Reports",
    ],
  },
  {
    id: "contract-management",
    title: "Contract Management",
    description: "Create, review, approve and renew legal agreements.",
    icon: FileSignature,
    items: [
      "Contract Register",
      "Create Contract",
      "Contract Templates",
      "Contract Drafting",
      "Legal Review",
      "Commercial Review",
      "Contract Approval",
      "Digital Signature",
      "Contract Obligations",
      "Contract Renewal",
      "Contract Expiry",
      "Contract Reports",
    ],
  },
  {
    id: "compliance-management",
    title: "Compliance Management",
    description: "Track enterprise obligations, evidence and corrective actions.",
    icon: ShieldCheck,
    items: [
      "Compliance Dashboard",
      "Compliance Register",
      "Compliance Tasks",
      "Control Owners",
      "Evidence Collection",
      "Compliance Review",
      "Compliance Approval",
      "Exceptions",
      "Corrective Actions",
      "Compliance Score",
      "Compliance History",
      "Compliance Reports",
    ],
  },
  {
    id: "statutory-compliance",
    title: "Statutory Compliance",
    description: "Manage statutory filings, registers and legal obligations.",
    icon: Landmark,
    items: [
      "Statutory Register",
      "Company Law",
      "Labour Laws",
      "Tax Laws",
      "Environmental Laws",
      "Consumer Laws",
      "Industry Requirements",
      "Statutory Filings",
      "Statutory Evidence",
      "Statutory Calendar",
      "Statutory Exceptions",
      "Statutory Reports",
    ],
  },
  {
    id: "regulatory-compliance",
    title: "Regulatory Compliance",
    description: "Monitor regulator requirements, circulars and submissions.",
    icon: Building2,
    items: [
      "Regulatory Register",
      "Regulatory Updates",
      "Regulatory Circulars",
      "Regulatory Filings",
      "Regulator Communication",
      "Inspection Requests",
      "Regulatory Evidence",
      "Regulatory Actions",
      "Regulatory Deadlines",
      "Regulatory Exceptions",
      "Regulatory History",
      "Regulatory Reports",
    ],
  },
  {
    id: "licence-management",
    title: "Licence Management",
    description: "Track licences, registrations, permits and renewals.",
    icon: BadgeCheck,
    items: [
      "Licence Register",
      "Business Licences",
      "Trade Licences",
      "Factory Licences",
      "Fire Licences",
      "Environmental Permits",
      "Professional Registrations",
      "Licence Renewal",
      "Licence Expiry",
      "Licence Documents",
      "Licence History",
      "Licence Reports",
    ],
  },
  {
    id: "litigation-management",
    title: "Litigation Management",
    description: "Manage disputes, court matters and external counsel.",
    icon: Gavel,
    items: [
      "Litigation Register",
      "Court Cases",
      "Tribunal Cases",
      "Arbitration",
      "Mediation",
      "Case Status",
      "Hearing Calendar",
      "External Counsel",
      "Legal Strategy",
      "Case Expenses",
      "Case Documents",
      "Litigation Reports",
    ],
  },
  {
    id: "legal-notices",
    title: "Legal Notices",
    description: "Manage incoming and outgoing notices and responses.",
    icon: FileText,
    items: [
      "Incoming Notices",
      "Outgoing Notices",
      "Notice Drafting",
      "Notice Review",
      "Notice Approval",
      "Response Preparation",
      "Response Deadline",
      "Notice Documents",
      "Notice Escalation",
      "Notice Closure",
      "Notice History",
      "Notice Reports",
    ],
  },
  {
    id: "case-management",
    title: "Case Management",
    description: "Track investigations, disputes and legal case workflows.",
    icon: ClipboardCheck,
    items: [
      "Case Register",
      "Create Case",
      "Case Category",
      "Case Owner",
      "Case Priority",
      "Case Timeline",
      "Case Evidence",
      "Case Actions",
      "Case Review",
      "Case Closure",
      "Case History",
      "Case Reports",
    ],
  },
  {
    id: "legal-documentation",
    title: "Legal Documentation",
    description: "Store legal records, agreements and case documents.",
    icon: FileText,
    items: [
      "Legal Document Library",
      "Agreements",
      "Legal Opinions",
      "Court Documents",
      "Evidence Files",
      "Regulatory Documents",
      "Compliance Evidence",
      "Notices",
      "Licences",
      "Registrations",
      "Legal Archive",
      "Document Reports",
    ],
  },
  {
    id: "policy-management",
    title: "Policy Management",
    description: "Create, approve, publish and review enterprise policies.",
    icon: BookOpenCheck,
    items: [
      "Policy Register",
      "Create Policy",
      "Draft Policies",
      "Policy Review",
      "Policy Approval",
      "Policy Publication",
      "Policy Acknowledgement",
      "Policy Training",
      "Policy Renewal",
      "Policy Expiry",
      "Policy Versions",
      "Policy Reports",
    ],
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance",
    description: "Manage governance structure, delegations and ethics.",
    icon: Users,
    items: [
      "Governance Framework",
      "Delegation of Authority",
      "Code of Conduct",
      "Ethics Policy",
      "Conflict of Interest",
      "Related Party Transactions",
      "Governance Committees",
      "Governance Meetings",
      "Governance Actions",
      "Governance Review",
      "Governance History",
      "Governance Reports",
    ],
  },
  {
    id: "board-compliance",
    title: "Board Compliance",
    description: "Manage board meetings, resolutions and statutory records.",
    icon: Users,
    items: [
      "Board Calendar",
      "Board Meetings",
      "Board Agenda",
      "Board Papers",
      "Board Minutes",
      "Board Resolutions",
      "Director Disclosures",
      "Committee Meetings",
      "Action Items",
      "Board Approvals",
      "Board Records",
      "Board Reports",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    description: "Manage trademarks, copyrights, patents and brand assets.",
    icon: Tags,
    items: [
      "IP Register",
      "Trademarks",
      "Copyrights",
      "Patents",
      "Design Registrations",
      "Domain Names",
      "Brand Assets",
      "IP Applications",
      "IP Renewals",
      "IP Infringement",
      "IP Documents",
      "IP Reports",
    ],
  },
  {
    id: "data-privacy",
    title: "Data Privacy",
    description: "Manage privacy obligations, consent and data requests.",
    icon: ShieldCheck,
    items: [
      "Privacy Register",
      "Privacy Policies",
      "Consent Management",
      "Data Processing Register",
      "Data Access Requests",
      "Data Correction Requests",
      "Data Deletion Requests",
      "Data Breach Register",
      "Privacy Impact Assessment",
      "Vendor Privacy Review",
      "Privacy Training",
      "Privacy Reports",
    ],
  },
  {
    id: "labour-compliance",
    title: "Labour Compliance",
    description: "Track employment law and workforce compliance.",
    icon: Users,
    items: [
      "Labour Law Register",
      "Shops & Establishment",
      "Minimum Wages",
      "Working Hours",
      "Leave Compliance",
      "PF Compliance",
      "ESI Compliance",
      "Gratuity Compliance",
      "Bonus Compliance",
      "Contract Labour",
      "Labour Inspections",
      "Labour Reports",
    ],
  },
  {
    id: "tax-compliance",
    title: "Tax Compliance",
    description: "Monitor tax filings, notices and statutory deadlines.",
    icon: Landmark,
    items: [
      "Tax Compliance Register",
      "Income Tax",
      "GST",
      "TDS",
      "Professional Tax",
      "Tax Filings",
      "Tax Payments",
      "Tax Notices",
      "Tax Assessments",
      "Tax Calendar",
      "Tax Exceptions",
      "Tax Reports",
    ],
  },
  {
    id: "vendor-compliance",
    title: "Vendor Compliance",
    description: "Manage third-party legal and compliance obligations.",
    icon: Building2,
    items: [
      "Vendor Compliance Register",
      "Vendor KYC",
      "Vendor Tax Compliance",
      "Vendor Labour Compliance",
      "Vendor Data Protection",
      "Vendor Contracts",
      "Vendor Certifications",
      "Vendor Exceptions",
      "Vendor Corrective Actions",
      "Vendor Risk",
      "Vendor Compliance History",
      "Vendor Compliance Reports",
    ],
  },
  {
    id: "customer-compliance",
    title: "Customer Compliance",
    description: "Manage consumer protection and customer legal obligations.",
    icon: Users,
    items: [
      "Consumer Protection",
      "Terms & Conditions",
      "Privacy Notice",
      "Refund Policy",
      "Return Policy",
      "Warranty Terms",
      "Customer Consent",
      "Customer Complaints",
      "Legal Escalations",
      "Regulatory Complaints",
      "Customer Legal History",
      "Customer Compliance Reports",
    ],
  },
  {
    id: "internal-audit",
    title: "Internal Audit",
    description: "Plan audits, test controls and track findings.",
    icon: FileCheck2,
    items: [
      "Audit Plan",
      "Audit Calendar",
      "Audit Scope",
      "Audit Checklist",
      "Control Testing",
      "Evidence Review",
      "Audit Findings",
      "Management Response",
      "Corrective Actions",
      "Audit Closure",
      "Audit History",
      "Audit Reports",
    ],
  },
  {
    id: "compliance-calendar",
    title: "Compliance Calendar",
    description: "Track filings, renewals, inspections and deadlines.",
    icon: CalendarClock,
    items: [
      "Compliance Calendar",
      "Filing Deadlines",
      "Licence Renewals",
      "Contract Renewals",
      "Policy Reviews",
      "Board Meetings",
      "Tax Deadlines",
      "Labour Deadlines",
      "Regulatory Inspections",
      "Reminder Rules",
      "Escalations",
      "Calendar Reports",
    ],
  },
  {
    id: "legal-risk",
    title: "Legal Risk",
    description: "Identify, assess and mitigate legal and compliance risks.",
    icon: AlertTriangle,
    items: [
      "Legal Risk Register",
      "Contract Risk",
      "Regulatory Risk",
      "Litigation Risk",
      "Compliance Risk",
      "Data Privacy Risk",
      "Employment Risk",
      "Third-Party Risk",
      "Risk Rating",
      "Risk Mitigation",
      "Risk Review",
      "Risk Reports",
    ],
  },
  {
    id: "investigations",
    title: "Internal Investigations",
    description: "Manage allegations, evidence and investigation outcomes.",
    icon: FileSearch,
    items: [
      "Investigation Register",
      "New Investigation",
      "Allegation Details",
      "Investigation Team",
      "Evidence Collection",
      "Interviews",
      "Investigation Notes",
      "Findings",
      "Corrective Actions",
      "Disciplinary Referral",
      "Investigation Closure",
      "Investigation Reports",
    ],
  },
  {
    id: "whistleblower",
    title: "Whistleblower",
    description: "Manage confidential reports and protected investigations.",
    icon: BellRing,
    items: [
      "Whistleblower Inbox",
      "Anonymous Reports",
      "Named Reports",
      "Case Assignment",
      "Confidentiality Controls",
      "Investigation",
      "Evidence",
      "Reporter Communication",
      "Protection Measures",
      "Case Closure",
      "Whistleblower History",
      "Whistleblower Reports",
    ],
  },
  {
    id: "legal-analytics",
    title: "Legal Analytics",
    description: "Analyse matters, compliance, contracts and legal exposure.",
    icon: Activity,
    items: [
      "Matter Analytics",
      "Contract Analytics",
      "Compliance Analytics",
      "Litigation Analytics",
      "Licence Analytics",
      "Policy Analytics",
      "Audit Analytics",
      "Legal Cost Analytics",
      "Risk Analytics",
      "Renewal Analytics",
      "Action Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "legal-reports",
    title: "Legal Reports",
    description: "Generate legal, compliance and governance reports.",
    icon: FileBarChart,
    items: [
      "Executive Legal Report",
      "Legal Matter Report",
      "Contract Report",
      "Compliance Report",
      "Litigation Report",
      "Licence Report",
      "Policy Report",
      "Board Report",
      "Audit Report",
      "Risk Report",
      "Renewal Report",
      "Custom Reports",
    ],
  },
  {
    id: "legal-settings",
    title: "Legal Settings",
    description: "Configure matter types, workflows and permissions.",
    icon: Settings2,
    items: [
      "Matter ID Format",
      "Matter Categories",
      "Case Status",
      "Contract Types",
      "Compliance Categories",
      "Approval Matrix",
      "Reminder Rules",
      "Escalation Matrix",
      "Notification Settings",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-legal",
    title: "KRVE AI Legal",
    description: "Use AI for contract review, risk and compliance decisions.",
    icon: Sparkles,
    items: [
      "AI Contract Review",
      "AI Clause Detection",
      "AI Legal Summary",
      "AI Compliance Check",
      "AI Risk Detection",
      "AI Notice Drafting",
      "AI Policy Review",
      "AI Regulatory Update",
      "AI Litigation Summary",
      "AI Renewal Prediction",
      "AI Legal Research",
      "AI Legal Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Open Legal Matters", "7", "2 high priority", Scale],
  ["Compliance Score", "96%", "Enterprise-wide", ShieldCheck],
  ["Renewals Due", "5", "Within 60 days", TimerReset],
  ["Open Actions", "11", "Assigned to owners", ListChecks],
];

export default function LegalComplianceManagement() {
  const [selectedModule, setSelectedModule] =
    useState<LegalModule | null>(null);
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
            placeholder="Search legal matters, compliance or workflows..."
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
            Complete Legal & Compliance Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete legal workspace.
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
              <ShieldCheck size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Governance & Compliance
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Legal & Compliance Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete legal governance covering matters, contracts, litigation,
            licences, statutory obligations, audits, risk, investigations,
            analytics and KRVE AI Legal.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <CheckCircle2 size={17} />
            Create Compliance Task
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Add Legal Matter
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
  module: LegalModule;
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
  module: LegalModule;
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
          Back to Legal Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Legal Workspace
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
        <WorkspaceMetric title="Pending Actions" value="11" note="Require attention" icon={BellRing} />
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
              Tap any feature to open its legal workflow.
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
    Scale,
    FileSignature,
    ShieldCheck,
    Landmark,
    Gavel,
    FileText,
    BookOpenCheck,
    Users,
    CalendarClock,
    AlertTriangle,
    FileSearch,
    ClipboardCheck,
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