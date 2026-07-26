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
  ClipboardCheck,
  FileBarChart,
  FileText,
  IndianRupee,
  PackageCheck,
  Plus,
  ReceiptIndianRupee,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Tags,
  Truck,
  UserCheck,
  Users,
  WalletCards,
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
  | "vendor-dashboard"
  | "vendor-directory"
  | "vendor-onboarding"
  | "due-diligence"
  | "vendor-verification"
  | "vendor-documents"
  | "vendor-categories"
  | "vendor-contracts"
  | "vendor-performance"
  | "vendor-risk"
  | "vendor-compliance"
  | "vendor-finance"
  | "vendor-payments"
  | "vendor-purchase-history"
  | "vendor-quality"
  | "vendor-delivery"
  | "vendor-communication"
  | "vendor-issues"
  | "vendor-renewals"
  | "vendor-offboarding"
  | "vendor-analytics"
  | "vendor-reports"
  | "vendor-settings"
  | "krve-ai-vendor";

type VendorModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: VendorModule[] = [
  {
    id: "vendor-dashboard",
    title: "Vendor Dashboard",
    description: "View vendor count, onboarding, contracts and performance.",
    icon: BarChart3,
    items: [
      "Active Vendors",
      "Onboarding Vendors",
      "Contracts Expiring",
      "Average Vendor Score",
      "Open Issues",
      "Pending Verification",
      "Vendor Spend",
      "Compliance Status",
      "AI Insights",
    ],
  },
  {
    id: "vendor-directory",
    title: "Vendor Directory",
    description: "Search and manage complete vendor records.",
    icon: Building2,
    items: [
      "Vendor List",
      "Add Vendor",
      "Vendor Profile",
      "Vendor Contacts",
      "Vendor Status",
      "Vendor Tags",
      "Vendor Categories",
      "Vendor Locations",
      "Vendor Search",
      "Vendor Import",
      "Vendor Export",
      "Archived Vendors",
    ],
  },
  {
    id: "vendor-onboarding",
    title: "Vendor Onboarding",
    description: "Manage registration, approval and activation workflows.",
    icon: UserCheck,
    items: [
      "Vendor Registration",
      "Onboarding Checklist",
      "Business Details",
      "Contact Details",
      "Bank Details",
      "Tax Details",
      "Document Collection",
      "Commercial Evaluation",
      "Approval Workflow",
      "Vendor Activation",
      "Welcome Communication",
      "Onboarding History",
    ],
  },
  {
    id: "due-diligence",
    title: "Due Diligence",
    description: "Review legal, financial and operational suitability.",
    icon: ClipboardCheck,
    items: [
      "Business Verification",
      "Ownership Verification",
      "Financial Review",
      "Credit Check",
      "Litigation Check",
      "Sanctions Check",
      "Reference Check",
      "Site Inspection",
      "Conflict of Interest",
      "Due Diligence Approval",
      "Review History",
    ],
  },
  {
    id: "vendor-verification",
    title: "Vendor Verification",
    description: "Verify tax, bank, identity and statutory details.",
    icon: ShieldCheck,
    items: [
      "PAN Verification",
      "GST Verification",
      "Bank Verification",
      "Udyam Verification",
      "Address Verification",
      "Authorised Signatory",
      "Identity Documents",
      "Duplicate Vendor Check",
      "Verification Exceptions",
      "Verification Approval",
      "Verification History",
    ],
  },
  {
    id: "vendor-documents",
    title: "Vendor Documents",
    description: "Store and monitor vendor records and certificates.",
    icon: FileText,
    items: [
      "Registration Documents",
      "Tax Documents",
      "Bank Documents",
      "Compliance Certificates",
      "Insurance Documents",
      "Quality Certificates",
      "Contracts",
      "NDAs",
      "Document Expiry",
      "Document Approval",
      "Document History",
      "Document Archive",
    ],
  },
  {
    id: "vendor-categories",
    title: "Vendor Categories",
    description: "Organise vendors by supply, service and strategic importance.",
    icon: Tags,
    items: [
      "Category Master",
      "Subcategories",
      "Product Vendors",
      "Service Vendors",
      "Logistics Vendors",
      "Technology Vendors",
      "Strategic Vendors",
      "Preferred Vendors",
      "Approved Vendors",
      "Blocked Vendors",
      "Category Owners",
      "Category Reports",
    ],
  },
  {
    id: "vendor-contracts",
    title: "Vendor Contracts",
    description: "Manage commercial terms, renewals and obligations.",
    icon: FileText,
    items: [
      "Contract Register",
      "Create Contract",
      "Contract Templates",
      "Commercial Terms",
      "Service Levels",
      "Payment Terms",
      "Contract Approval",
      "Contract Amendments",
      "Contract Renewal",
      "Contract Expiry",
      "Obligation Tracking",
      "Contract Reports",
    ],
  },
  {
    id: "vendor-performance",
    title: "Vendor Performance",
    description: "Measure service, delivery, cost and quality performance.",
    icon: Star,
    items: [
      "Vendor Scorecard",
      "Overall Rating",
      "Delivery Rating",
      "Quality Rating",
      "Price Rating",
      "Service Rating",
      "Response Time",
      "Contract Compliance",
      "Performance Review",
      "Improvement Plan",
      "Vendor Ranking",
      "Performance Reports",
    ],
  },
  {
    id: "vendor-risk",
    title: "Vendor Risk",
    description: "Monitor financial, operational and continuity risks.",
    icon: AlertTriangle,
    items: [
      "Risk Dashboard",
      "Financial Risk",
      "Operational Risk",
      "Delivery Risk",
      "Quality Risk",
      "Cyber Risk",
      "Concentration Risk",
      "Business Continuity",
      "Risk Rating",
      "Risk Mitigation",
      "Risk Review",
      "Risk Reports",
    ],
  },
  {
    id: "vendor-compliance",
    title: "Vendor Compliance",
    description: "Track policy, legal, tax and regulatory compliance.",
    icon: ShieldCheck,
    items: [
      "Compliance Dashboard",
      "Tax Compliance",
      "Labour Compliance",
      "Data Protection",
      "Anti-Bribery",
      "Code of Conduct",
      "Policy Acknowledgement",
      "Compliance Exceptions",
      "Corrective Actions",
      "Compliance Approval",
      "Compliance History",
      "Compliance Reports",
    ],
  },
  {
    id: "vendor-finance",
    title: "Vendor Finance",
    description: "Manage balances, advances, credit terms and reconciliation.",
    icon: WalletCards,
    items: [
      "Vendor Balance",
      "Outstanding Payables",
      "Vendor Advances",
      "Credit Terms",
      "Debit Notes",
      "Credit Notes",
      "Vendor Reconciliation",
      "Vendor TDS",
      "Tax Deductions",
      "Finance Holds",
      "Vendor Statements",
      "Finance Reports",
    ],
  },
  {
    id: "vendor-payments",
    title: "Vendor Payments",
    description: "Manage payment requests, approvals and settlement history.",
    icon: IndianRupee,
    items: [
      "Payment Requests",
      "Due Payments",
      "Payment Schedule",
      "Advance Payments",
      "Milestone Payments",
      "Payment Approval",
      "Payment Hold",
      "Payment Release",
      "Bank Confirmation",
      "Payment History",
      "Payment Exceptions",
      "Payment Reports",
    ],
  },
  {
    id: "vendor-purchase-history",
    title: "Purchase History",
    description: "Review vendor orders, bills, spend and commercial history.",
    icon: ReceiptIndianRupee,
    items: [
      "Purchase Orders",
      "Order Value",
      "Order Frequency",
      "Vendor Bills",
      "Goods Receipts",
      "Returns to Vendor",
      "Price History",
      "Spend History",
      "Category Spend",
      "Purchase Trends",
      "Purchase Exceptions",
      "Purchase Reports",
    ],
  },
  {
    id: "vendor-quality",
    title: "Vendor Quality",
    description: "Manage inspections, defects and corrective actions.",
    icon: PackageCheck,
    items: [
      "Quality Dashboard",
      "Inspection Results",
      "Accepted Quantity",
      "Rejected Quantity",
      "Defect Rate",
      "Non-Conformance",
      "Return to Vendor",
      "Corrective Action",
      "Quality Audit",
      "Quality Certification",
      "Quality History",
      "Quality Reports",
    ],
  },
  {
    id: "vendor-delivery",
    title: "Vendor Delivery",
    description: "Track delivery schedules, delays and fulfilment reliability.",
    icon: Truck,
    items: [
      "Delivery Schedule",
      "Expected Deliveries",
      "Delivered Orders",
      "Delayed Deliveries",
      "Partial Deliveries",
      "Short Deliveries",
      "Over Deliveries",
      "On-Time Delivery",
      "Delivery Exceptions",
      "Delivery Escalation",
      "Delivery History",
      "Delivery Reports",
    ],
  },
  {
    id: "vendor-communication",
    title: "Vendor Communication",
    description: "Manage email, meetings and commercial correspondence.",
    icon: Users,
    items: [
      "Vendor Inbox",
      "Email History",
      "Meeting Calendar",
      "Meeting Notes",
      "Commercial Discussions",
      "Contract Communication",
      "Payment Communication",
      "Issue Communication",
      "Message Templates",
      "Contact Preferences",
      "Communication History",
      "Communication Reports",
    ],
  },
  {
    id: "vendor-issues",
    title: "Vendor Issues",
    description: "Track disputes, escalations and resolution actions.",
    icon: AlertTriangle,
    items: [
      "Open Issues",
      "Quality Issues",
      "Delivery Issues",
      "Payment Issues",
      "Contract Issues",
      "Compliance Issues",
      "Issue Priority",
      "Issue Owner",
      "Escalation",
      "Corrective Action",
      "Issue History",
      "Issue Reports",
    ],
  },
  {
    id: "vendor-renewals",
    title: "Renewals & Expiry",
    description: "Monitor contracts, documents and verification renewals.",
    icon: Workflow,
    items: [
      "Contract Renewals",
      "Document Expiry",
      "Certificate Expiry",
      "Insurance Renewal",
      "KYC Renewal",
      "Bank Verification Renewal",
      "Tax Verification Renewal",
      "Renewal Approval",
      "Renewal Reminder",
      "Expired Records",
      "Renewal History",
      "Renewal Reports",
    ],
  },
  {
    id: "vendor-offboarding",
    title: "Vendor Offboarding",
    description: "Manage suspension, closure and final vendor clearance.",
    icon: ArrowRight,
    items: [
      "Offboarding Request",
      "Vendor Suspension",
      "Contract Closure",
      "Open PO Review",
      "Outstanding Payment",
      "Asset Return",
      "Data Access Closure",
      "Final Reconciliation",
      "Vendor Deactivation",
      "Blacklist Vendor",
      "Offboarding Approval",
      "Offboarding History",
    ],
  },
  {
    id: "vendor-analytics",
    title: "Vendor Analytics",
    description: "Analyse vendor spend, risk, quality and performance.",
    icon: Activity,
    items: [
      "Vendor Spend Analytics",
      "Performance Analytics",
      "Risk Analytics",
      "Quality Analytics",
      "Delivery Analytics",
      "Payment Analytics",
      "Contract Analytics",
      "Category Analytics",
      "Vendor Concentration",
      "Savings Analytics",
      "Trend Analysis",
      "AI Predictions",
    ],
  },
  {
    id: "vendor-reports",
    title: "Vendor Reports",
    description: "Generate vendor, compliance and performance reports.",
    icon: FileBarChart,
    items: [
      "Vendor Master Report",
      "Onboarding Report",
      "Verification Report",
      "Contract Report",
      "Performance Report",
      "Risk Report",
      "Compliance Report",
      "Payment Report",
      "Quality Report",
      "Delivery Report",
      "Spend Report",
      "Custom Reports",
    ],
  },
  {
    id: "vendor-settings",
    title: "Vendor Settings",
    description: "Configure categories, approvals, scoring and permissions.",
    icon: Settings2,
    items: [
      "Vendor ID Format",
      "Vendor Categories",
      "Vendor Status",
      "Onboarding Workflow",
      "Verification Rules",
      "Approval Matrix",
      "Scoring Rules",
      "Risk Rules",
      "Compliance Rules",
      "Notification Settings",
      "Roles",
      "Permissions",
    ],
  },
  {
    id: "krve-ai-vendor",
    title: "KRVE AI Vendor",
    description: "Use AI for risk, performance and vendor decisions.",
    icon: Sparkles,
    items: [
      "AI Vendor Recommendation",
      "AI Risk Detection",
      "AI Performance Prediction",
      "AI Contract Summary",
      "AI Document Validation",
      "AI Payment Risk",
      "AI Delivery Prediction",
      "AI Quality Prediction",
      "AI Spend Opportunity",
      "AI Renewal Recommendation",
      "AI Vendor Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Active Vendors", "36", "Across 8 categories", Building2],
  ["Onboarding", "5", "Verification in progress", UserCheck],
  ["Contracts Expiring", "4", "Within 45 days", FileText],
  ["Vendor Score", "4.6/5", "Average performance", Star],
];

export default function VendorManagement() {
  const [selectedModule, setSelectedModule] =
    useState<VendorModule | null>(null);
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
            placeholder="Search vendor modules, records or workflows..."
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
            Complete Vendor Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete vendor workspace.
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
              <Building2 size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Third-Party Governance
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Vendor Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete vendor governance covering onboarding, verification,
            contracts, performance, payments, quality, risk, compliance,
            analytics and KRVE AI Vendor.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <ShieldCheck size={17} />
            Start Verification
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Add Vendor
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
  module: VendorModule;
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
  module: VendorModule;
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
          Back to Vendor Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Vendor Workspace
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
              Tap any feature to open its vendor workflow.
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
    Building2,
    UserCheck,
    ShieldCheck,
    FileText,
    Tags,
    Star,
    WalletCards,
    IndianRupee,
    PackageCheck,
    Truck,
    AlertTriangle,
    Workflow,
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