"use client";

import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileArchive,
  FileBarChart,
  FileCheck2,
  FileClock,
  FileCog,
  FileLock2,
  FileSearch,
  FileSignature,
  FileText,
  FolderKanban,
  History,
  Library,
  ListChecks,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tags,
  Upload,
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
  | "documents-dashboard"
  | "document-library"
  | "document-upload"
  | "document-classification"
  | "document-review"
  | "document-approval"
  | "version-control"
  | "document-workflows"
  | "policies"
  | "sops"
  | "templates"
  | "contracts"
  | "employee-documents"
  | "finance-documents"
  | "procurement-documents"
  | "project-documents"
  | "legal-records"
  | "compliance-records"
  | "access-control"
  | "document-retention"
  | "document-expiry"
  | "archive-management"
  | "document-audit"
  | "document-search"
  | "document-analytics"
  | "document-reports"
  | "document-settings"
  | "krve-ai-documents";

type DocumentModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: DocumentModule[] = [
  {
    id: "documents-dashboard",
    title: "Documents Dashboard",
    description: "View records, approvals, expiry, storage and document activity.",
    icon: BarChart3,
    items: [
      "Total Documents",
      "Pending Approval",
      "Expiring Records",
      "Storage Used",
      "Recently Uploaded",
      "Recently Viewed",
      "Restricted Documents",
      "Archived Records",
      "AI Insights",
    ],
  },
  {
    id: "document-library",
    title: "Document Library",
    description: "Browse and manage all enterprise files and records.",
    icon: Library,
    items: [
      "All Documents",
      "Recent Documents",
      "Shared With Me",
      "My Documents",
      "Department Documents",
      "Company Documents",
      "Starred Documents",
      "Restricted Documents",
      "Archived Documents",
      "Document Folders",
      "Document Tags",
      "Document Views",
    ],
  },
  {
    id: "document-upload",
    title: "Document Upload",
    description: "Upload files, capture metadata and organise records.",
    icon: Upload,
    items: [
      "Upload Document",
      "Bulk Upload",
      "Drag & Drop",
      "Scan Document",
      "Upload from Email",
      "Upload from Drive",
      "Metadata Entry",
      "Department Selection",
      "Document Owner",
      "Access Level",
      "Expiry Date",
      "Upload History",
    ],
  },
  {
    id: "document-classification",
    title: "Document Classification",
    description: "Classify records by type, department and sensitivity.",
    icon: Tags,
    items: [
      "Document Types",
      "Department Classification",
      "Confidentiality Level",
      "Record Category",
      "Business Function",
      "Legal Classification",
      "Financial Classification",
      "HR Classification",
      "Project Classification",
      "Auto Classification",
      "Classification Rules",
      "Classification History",
    ],
  },
  {
    id: "document-review",
    title: "Document Review",
    description: "Review content, metadata and document quality.",
    icon: FileSearch,
    items: [
      "Review Queue",
      "Content Review",
      "Metadata Review",
      "Quality Check",
      "Completeness Check",
      "Duplicate Check",
      "Reviewer Assignment",
      "Review Notes",
      "Review Status",
      "Return for Correction",
      "Review History",
      "Review Reports",
    ],
  },
  {
    id: "document-approval",
    title: "Document Approval",
    description: "Approve policies, records, contracts and controlled files.",
    icon: FileCheck2,
    items: [
      "Approval Queue",
      "Policy Approval",
      "Contract Approval",
      "Finance Approval",
      "HR Approval",
      "Project Approval",
      "Legal Approval",
      "Compliance Approval",
      "Approval Matrix",
      "Delegated Approval",
      "Approval History",
      "Approval Reports",
    ],
  },
  {
    id: "version-control",
    title: "Version Control",
    description: "Track revisions, compare versions and restore records.",
    icon: History,
    items: [
      "Version History",
      "Create New Version",
      "Compare Versions",
      "Restore Version",
      "Draft Version",
      "Published Version",
      "Version Notes",
      "Version Owner",
      "Version Approval",
      "Change Summary",
      "Locked Version",
      "Version Reports",
    ],
  },
  {
    id: "document-workflows",
    title: "Document Workflows",
    description: "Automate review, approval, publishing and archival.",
    icon: Workflow,
    items: [
      "Workflow Builder",
      "Review Workflow",
      "Approval Workflow",
      "Publishing Workflow",
      "Renewal Workflow",
      "Expiry Workflow",
      "Archive Workflow",
      "Notification Workflow",
      "Department Workflow",
      "Escalation Workflow",
      "Workflow History",
      "Workflow Reports",
    ],
  },
  {
    id: "policies",
    title: "Policies",
    description: "Create, publish and control company policies.",
    icon: BookOpenCheck,
    items: [
      "Policy Library",
      "Create Policy",
      "Draft Policies",
      "Policy Review",
      "Policy Approval",
      "Policy Publishing",
      "Policy Acknowledgement",
      "Policy Renewal",
      "Policy Expiry",
      "Policy Versions",
      "Policy History",
      "Policy Reports",
    ],
  },
  {
    id: "sops",
    title: "SOP Management",
    description: "Manage standard operating procedures and instructions.",
    icon: ListChecks,
    items: [
      "SOP Library",
      "Create SOP",
      "Draft SOPs",
      "SOP Review",
      "SOP Approval",
      "SOP Publishing",
      "SOP Acknowledgement",
      "SOP Training",
      "SOP Renewal",
      "SOP Versions",
      "SOP History",
      "SOP Reports",
    ],
  },
  {
    id: "templates",
    title: "Document Templates",
    description: "Manage reusable templates for enterprise records.",
    icon: FileCog,
    items: [
      "Template Library",
      "Create Template",
      "HR Templates",
      "Finance Templates",
      "Procurement Templates",
      "Legal Templates",
      "Project Templates",
      "Communication Templates",
      "Approval Templates",
      "Template Versions",
      "Template Access",
      "Template Reports",
    ],
  },
  {
    id: "contracts",
    title: "Contract Documents",
    description: "Store and control commercial and legal agreements.",
    icon: FileSignature,
    items: [
      "Contract Library",
      "Vendor Contracts",
      "Customer Contracts",
      "Employment Contracts",
      "Service Agreements",
      "NDAs",
      "Lease Agreements",
      "Contract Amendments",
      "Contract Renewal",
      "Contract Expiry",
      "Contract Versions",
      "Contract Reports",
    ],
  },
  {
    id: "employee-documents",
    title: "Employee Documents",
    description: "Manage employee records, letters and identity documents.",
    icon: Users,
    items: [
      "Employee Files",
      "Offer Letters",
      "Appointment Letters",
      "Identity Documents",
      "Education Documents",
      "Experience Documents",
      "Salary Letters",
      "Promotion Letters",
      "Warning Letters",
      "Exit Documents",
      "Employee Document Expiry",
      "Employee Document Reports",
    ],
  },
  {
    id: "finance-documents",
    title: "Finance Documents",
    description: "Manage invoices, journals, statements and tax records.",
    icon: FileArchive,
    items: [
      "Invoices",
      "Receipts",
      "Journal Vouchers",
      "Bank Statements",
      "Payment Records",
      "Tax Returns",
      "GST Documents",
      "TDS Documents",
      "Audit Records",
      "Financial Statements",
      "Finance Archive",
      "Finance Document Reports",
    ],
  },
  {
    id: "procurement-documents",
    title: "Procurement Documents",
    description: "Manage requisitions, RFQs, POs, GRNs and supplier records.",
    icon: ClipboardCheck,
    items: [
      "Purchase Requisitions",
      "RFQs",
      "Quotations",
      "Purchase Orders",
      "Goods Receipt Notes",
      "Inspection Reports",
      "Vendor Bills",
      "Supplier Documents",
      "Procurement Contracts",
      "Procurement Approvals",
      "Procurement Archive",
      "Procurement Document Reports",
    ],
  },
  {
    id: "project-documents",
    title: "Project Documents",
    description: "Manage project plans, deliverables and execution records.",
    icon: FolderKanban,
    items: [
      "Project Charter",
      "Project Plan",
      "Scope Documents",
      "Design Documents",
      "Technical Documents",
      "Meeting Minutes",
      "Risk Register",
      "Issue Register",
      "Change Requests",
      "Deliverables",
      "Project Archive",
      "Project Document Reports",
    ],
  },
  {
    id: "legal-records",
    title: "Legal Records",
    description: "Store legal notices, cases, agreements and evidence.",
    icon: ShieldCheck,
    items: [
      "Legal Notices",
      "Court Documents",
      "Case Files",
      "Legal Opinions",
      "Agreements",
      "Licences",
      "Registrations",
      "Intellectual Property",
      "Litigation Records",
      "Evidence Files",
      "Legal Archive",
      "Legal Reports",
    ],
  },
  {
    id: "compliance-records",
    title: "Compliance Records",
    description: "Manage statutory, regulatory and audit documentation.",
    icon: CheckCircle2,
    items: [
      "Statutory Records",
      "Regulatory Filings",
      "Compliance Certificates",
      "Audit Evidence",
      "Inspection Records",
      "Policy Acknowledgements",
      "Training Records",
      "Corrective Actions",
      "Compliance Exceptions",
      "Compliance Calendar",
      "Compliance Archive",
      "Compliance Reports",
    ],
  },
  {
    id: "access-control",
    title: "Document Access Control",
    description: "Control document visibility, sharing and permissions.",
    icon: FileLock2,
    items: [
      "Access Levels",
      "Role-Based Access",
      "Department Access",
      "User Access",
      "Restricted Access",
      "View Permission",
      "Edit Permission",
      "Download Permission",
      "Share Permission",
      "Access Requests",
      "Access History",
      "Access Reports",
    ],
  },
  {
    id: "document-retention",
    title: "Retention Management",
    description: "Define retention periods and disposal rules.",
    icon: FileClock,
    items: [
      "Retention Schedule",
      "Retention Categories",
      "Legal Hold",
      "Department Retention",
      "Financial Retention",
      "HR Retention",
      "Contract Retention",
      "Retention Review",
      "Retention Extension",
      "Disposal Approval",
      "Retention History",
      "Retention Reports",
    ],
  },
  {
    id: "document-expiry",
    title: "Expiry & Renewal",
    description: "Monitor expiring documents, certificates and policies.",
    icon: AlertTriangle,
    items: [
      "Expiring Documents",
      "Expired Documents",
      "Renewal Queue",
      "Policy Expiry",
      "Contract Expiry",
      "Certificate Expiry",
      "Licence Expiry",
      "Document Renewal",
      "Expiry Alerts",
      "Escalation Rules",
      "Renewal History",
      "Expiry Reports",
    ],
  },
  {
    id: "archive-management",
    title: "Archive Management",
    description: "Archive inactive records and manage long-term storage.",
    icon: Archive,
    items: [
      "Archive Dashboard",
      "Archive Document",
      "Archive Folders",
      "Department Archive",
      "Legal Archive",
      "Finance Archive",
      "HR Archive",
      "Project Archive",
      "Restore Document",
      "Archive Search",
      "Archive History",
      "Archive Reports",
    ],
  },
  {
    id: "document-audit",
    title: "Document Audit",
    description: "Track document access, changes and control compliance.",
    icon: ClipboardCheck,
    items: [
      "Audit Trail",
      "View History",
      "Download History",
      "Edit History",
      "Approval History",
      "Sharing History",
      "Access Exceptions",
      "Unauthorised Access",
      "Document Control Audit",
      "Audit Findings",
      "Corrective Actions",
      "Audit Reports",
    ],
  },
  {
    id: "document-search",
    title: "Enterprise Search",
    description: "Search documents, metadata, content and records.",
    icon: Search,
    items: [
      "Global Search",
      "Full-Text Search",
      "Metadata Search",
      "Department Search",
      "Tag Search",
      "Owner Search",
      "Date Search",
      "Document Type Search",
      "Saved Searches",
      "Recent Searches",
      "Advanced Filters",
      "Search Reports",
    ],
  },
  {
    id: "document-analytics",
    title: "Document Analytics",
    description: "Analyse usage, approvals, expiry and storage.",
    icon: Activity,
    items: [
      "Document Growth",
      "Storage Analytics",
      "Approval Analytics",
      "Access Analytics",
      "Department Analytics",
      "Document Type Analytics",
      "Expiry Analytics",
      "Retention Analytics",
      "Search Analytics",
      "User Activity",
      "Document Risk",
      "AI Predictions",
    ],
  },
  {
    id: "document-reports",
    title: "Document Reports",
    description: "Generate document, policy, access and audit reports.",
    icon: FileBarChart,
    items: [
      "Document Master Report",
      "Upload Report",
      "Approval Report",
      "Version Report",
      "Policy Report",
      "Expiry Report",
      "Access Report",
      "Retention Report",
      "Archive Report",
      "Audit Report",
      "Storage Report",
      "Custom Reports",
    ],
  },
  {
    id: "document-settings",
    title: "Document Settings",
    description: "Configure document types, workflows and permissions.",
    icon: Settings2,
    items: [
      "Document ID Format",
      "Document Types",
      "Document Categories",
      "Folder Structure",
      "Metadata Fields",
      "Approval Matrix",
      "Retention Rules",
      "Expiry Rules",
      "Notification Settings",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-documents",
    title: "KRVE AI Documents",
    description: "Use AI for classification, summaries and document control.",
    icon: Sparkles,
    items: [
      "AI Document Classification",
      "AI Document Summary",
      "AI Metadata Extraction",
      "AI Duplicate Detection",
      "AI Contract Review",
      "AI Policy Review",
      "AI Compliance Check",
      "AI Expiry Detection",
      "AI Search Assistant",
      "AI Risk Detection",
      "AI Document Recommendation",
      "AI Documents Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Documents", "2,486", "Across all departments", FileText],
  ["Pending Approval", "18", "Awaiting reviewers", FileCheck2],
  ["Expiring Records", "9", "Within 30 days", AlertTriangle],
  ["Storage Used", "68%", "Secure document storage", FileArchive],
];

export default function DocumentsManagement() {
  const [selectedModule, setSelectedModule] =
    useState<DocumentModule | null>(null);
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
            placeholder="Search documents, policies or workflows..."
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
            Complete Document Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete document workspace.
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
              <FileText size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Enterprise Records
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Documents Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete enterprise records management covering upload,
            classification, review, approval, versioning, policies, retention,
            access, audit, analytics and KRVE AI Documents.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <BookOpenCheck size={17} />
            Create Policy
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Upload size={17} />
            Upload Document
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
  module: DocumentModule;
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
  module: DocumentModule;
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
          Back to Document Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Document Workspace
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
        <WorkspaceMetric title="Active Records" value="2,486" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Actions" value="18" note="Require attention" icon={BellRing} />
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
              Tap any feature to open its document workflow.
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
    FileText,
    Upload,
    Tags,
    FileSearch,
    FileCheck2,
    History,
    Workflow,
    BookOpenCheck,
    FileSignature,
    FileLock2,
    Archive,
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