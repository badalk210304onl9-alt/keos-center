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
  ClipboardCheck,
  Database,
  Download,
  Eye,
  FileBarChart,
  FileCheck2,
  FileClock,
  FileSearch,
  FileText,
  Filter,
  Gauge,
  History,
  KeyRound,
  LockKeyhole,
  Plus,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
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

type AuditModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: AuditModule[] = [
  {
    id: "audit-dashboard",
    title: "Audit Dashboard",
    description: "View audit events, control exceptions, findings, reviews and closure status.",
    icon: BarChart3,
    items: [
      "Audit Events",
      "Control Exceptions",
      "Completed Reviews",
      "Open Findings",
      "High-Risk Findings",
      "Overdue Actions",
      "Audit Coverage",
      "Department Status",
      "AI Insights",
    ],
  },
  {
    id: "audit-trail",
    title: "Enterprise Audit Trail",
    description: "Review complete user, system and record activity across KEOS.",
    icon: History,
    items: [
      "User Activity",
      "Record Creation",
      "Record Updates",
      "Record Deletions",
      "Status Changes",
      "Approval Actions",
      "Login Activity",
      "Export Activity",
      "System Events",
      "IP & Device History",
      "Audit Timeline",
      "Audit Export",
    ],
  },
  {
    id: "user-access-audit",
    title: "User Access Audit",
    description: "Audit logins, roles, permissions and restricted access.",
    icon: KeyRound,
    items: [
      "Login Audit",
      "Failed Login Audit",
      "Role Assignment Audit",
      "Permission Change Audit",
      "Privilege Escalation",
      "Restricted Data Access",
      "Inactive Users",
      "Shared Account Review",
      "Device Access Review",
      "Location Access Review",
      "Access History",
      "Access Reports",
    ],
  },
  {
    id: "approval-audit",
    title: "Approval Audit",
    description: "Review approvals, rejections, overrides and bypass events.",
    icon: UserCheck,
    items: [
      "Approval History",
      "Rejected Requests",
      "Approval Overrides",
      "Bypassed Approvals",
      "Late Approvals",
      "Delegated Approvals",
      "Founder Approvals",
      "Finance Approvals",
      "HR Approvals",
      "Procurement Approvals",
      "Approval Exceptions",
      "Approval Reports",
    ],
  },
  {
    id: "transaction-audit",
    title: "Transaction Audit",
    description: "Audit financial transactions, journals, payments and receipts.",
    icon: FileSearch,
    items: [
      "Journal Audit",
      "Payment Audit",
      "Receipt Audit",
      "Expense Audit",
      "Bank Audit",
      "Cash Audit",
      "Receivable Audit",
      "Payable Audit",
      "Tax Audit",
      "Payroll Audit",
      "Transaction Exceptions",
      "Transaction Reports",
    ],
  },
  {
    id: "data-change-audit",
    title: "Data Change Audit",
    description: "Track field-level changes, before-and-after values and ownership.",
    icon: Database,
    items: [
      "Field Change History",
      "Before & After Values",
      "Bulk Update Audit",
      "Import Audit",
      "Export Audit",
      "Master Data Changes",
      "Customer Data Changes",
      "Employee Data Changes",
      "Vendor Data Changes",
      "Financial Data Changes",
      "Change Exceptions",
      "Change Reports",
    ],
  },
  {
    id: "document-audit",
    title: "Document Audit",
    description: "Review document uploads, edits, approvals, downloads and deletions.",
    icon: FileText,
    items: [
      "Upload Audit",
      "Edit Audit",
      "Download Audit",
      "Approval Audit",
      "Version Audit",
      "Deletion Audit",
      "Sharing Audit",
      "Retention Audit",
      "Confidential Document Access",
      "Policy Document Audit",
      "Document Exceptions",
      "Document Reports",
    ],
  },
  {
    id: "inventory-audit",
    title: "Inventory Audit",
    description: "Audit stock counts, adjustments, transfers and shrinkage.",
    icon: ClipboardCheck,
    items: [
      "Stock Count Audit",
      "Adjustment Audit",
      "Transfer Audit",
      "Warehouse Audit",
      "Shrinkage Audit",
      "Damage Audit",
      "Dead Stock Audit",
      "Negative Stock Audit",
      "Reorder Audit",
      "Valuation Audit",
      "Inventory Exceptions",
      "Inventory Reports",
    ],
  },
  {
    id: "procurement-audit",
    title: "Procurement Audit",
    description: "Audit requisitions, RFQs, purchase orders, vendors and contracts.",
    icon: ClipboardCheck,
    items: [
      "Purchase Requisition Audit",
      "RFQ Audit",
      "Purchase Order Audit",
      "Supplier Selection Audit",
      "Vendor Onboarding Audit",
      "Contract Audit",
      "Price Comparison Audit",
      "Approval Audit",
      "Receipt Audit",
      "Vendor Payment Audit",
      "Procurement Exceptions",
      "Procurement Reports",
    ],
  },
  {
    id: "hr-audit",
    title: "Human Resources Audit",
    description: "Audit employee records, attendance, payroll and access.",
    icon: Users,
    items: [
      "Employee Record Audit",
      "Recruitment Audit",
      "Onboarding Audit",
      "Attendance Audit",
      "Leave Audit",
      "Payroll Audit",
      "Performance Audit",
      "Promotion Audit",
      "Termination Audit",
      "Access Revocation Audit",
      "HR Exceptions",
      "HR Reports",
    ],
  },
  {
    id: "security-audit",
    title: "Security Audit",
    description: "Review security controls, access incidents and system protection.",
    icon: ShieldCheck,
    items: [
      "Security Event Audit",
      "Access Control Audit",
      "Password Policy Audit",
      "Session Audit",
      "Device Audit",
      "API Audit",
      "Data Export Audit",
      "Sensitive Data Audit",
      "Incident Audit",
      "Privilege Audit",
      "Security Exceptions",
      "Security Reports",
    ],
  },
  {
    id: "compliance-audit",
    title: "Compliance Audit",
    description: "Audit statutory, regulatory, policy and licence compliance.",
    icon: ShieldAlert,
    items: [
      "Statutory Audit",
      "Regulatory Audit",
      "Policy Audit",
      "Licence Audit",
      "Contract Compliance Audit",
      "Tax Compliance Audit",
      "Data Privacy Audit",
      "Employment Compliance Audit",
      "Vendor Compliance Audit",
      "Renewal Audit",
      "Compliance Exceptions",
      "Compliance Reports",
    ],
  },
  {
    id: "control-testing",
    title: "Control Testing",
    description: "Test controls, record evidence and assess control effectiveness.",
    icon: CheckCircle2,
    items: [
      "Control Register",
      "Test Plan",
      "Test Procedure",
      "Sample Selection",
      "Evidence Collection",
      "Test Result",
      "Control Failure",
      "Compensating Control",
      "Control Owner",
      "Retest",
      "Testing History",
      "Testing Reports",
    ],
  },
  {
    id: "audit-findings",
    title: "Audit Findings",
    description: "Record, classify, assign and close audit findings.",
    icon: AlertTriangle,
    items: [
      "Open Findings",
      "Critical Findings",
      "High-Risk Findings",
      "Medium Findings",
      "Low Findings",
      "Finding Owner",
      "Root Cause",
      "Management Response",
      "Corrective Action",
      "Due Date",
      "Finding History",
      "Finding Reports",
    ],
  },
  {
    id: "corrective-actions",
    title: "Corrective Actions",
    description: "Track remediation plans, owners, deadlines and evidence.",
    icon: Workflow,
    items: [
      "Open Actions",
      "Overdue Actions",
      "Action Owner",
      "Action Plan",
      "Target Date",
      "Evidence",
      "Progress Update",
      "Escalation",
      "Closure Review",
      "Action Closure",
      "Action History",
      "Action Reports",
    ],
  },
  {
    id: "audit-plan",
    title: "Audit Planning",
    description: "Create annual plans, scope, schedules and audit assignments.",
    icon: FileClock,
    items: [
      "Annual Audit Plan",
      "Quarterly Audit Plan",
      "Audit Universe",
      "Risk-Based Planning",
      "Audit Scope",
      "Audit Objectives",
      "Audit Team",
      "Audit Schedule",
      "Resource Plan",
      "Plan Approval",
      "Plan History",
      "Plan Reports",
    ],
  },
  {
    id: "audit-workpapers",
    title: "Audit Workpapers",
    description: "Manage audit evidence, notes, samples and review records.",
    icon: FileCheck2,
    items: [
      "Workpaper Index",
      "Audit Notes",
      "Evidence Files",
      "Sample Records",
      "Testing Sheets",
      "Review Notes",
      "Reviewer Sign-Off",
      "Manager Sign-Off",
      "Version History",
      "Workpaper Lock",
      "Workpaper Archive",
      "Workpaper Reports",
    ],
  },
  {
    id: "audit-sampling",
    title: "Audit Sampling",
    description: "Select and test samples from enterprise records.",
    icon: Filter,
    items: [
      "Sample Population",
      "Random Sampling",
      "Risk-Based Sampling",
      "Value-Based Sampling",
      "Date-Based Sampling",
      "User-Based Sampling",
      "Department Sampling",
      "Sample Size",
      "Sample Results",
      "Sample Exceptions",
      "Sampling History",
      "Sampling Reports",
    ],
  },
  {
    id: "audit-review",
    title: "Audit Review & Sign-Off",
    description: "Manage reviewer comments, sign-offs and final audit closure.",
    icon: Eye,
    items: [
      "Review Queue",
      "Reviewer Notes",
      "Manager Review",
      "Risk Review",
      "Legal Review",
      "Founder Review",
      "Open Review Points",
      "Cleared Review Points",
      "Final Sign-Off",
      "Audit Closure",
      "Review History",
      "Review Reports",
    ],
  },
  {
    id: "audit-analytics",
    title: "Audit Analytics",
    description: "Analyse events, findings, controls, actions and audit coverage.",
    icon: Activity,
    items: [
      "Audit Event Analytics",
      "Finding Analytics",
      "Control Analytics",
      "Access Analytics",
      "Transaction Analytics",
      "Department Analytics",
      "Exception Analytics",
      "Closure Analytics",
      "Overdue Analytics",
      "Trend Analytics",
      "Audit Insights",
      "AI Predictions",
    ],
  },
  {
    id: "audit-reports",
    title: "Audit Report Center",
    description: "Generate audit, finding, control and compliance reports.",
    icon: FileBarChart,
    items: [
      "Executive Audit Report",
      "Audit Trail Report",
      "Access Audit Report",
      "Transaction Audit Report",
      "Control Testing Report",
      "Findings Report",
      "Corrective Actions Report",
      "Compliance Audit Report",
      "Security Audit Report",
      "Department Audit Report",
      "Audit Summary",
      "Custom Reports",
    ],
  },
  {
    id: "audit-archive",
    title: "Audit Archive",
    description: "Store historical audits, evidence, findings and reports.",
    icon: FileText,
    items: [
      "Completed Audits",
      "Closed Findings",
      "Closed Actions",
      "Historical Workpapers",
      "Historical Evidence",
      "Annual Archive",
      "Department Archive",
      "Security Archive",
      "Compliance Archive",
      "Search Archive",
      "Archive History",
      "Archive Reports",
    ],
  },
  {
    id: "audit-settings",
    title: "Audit Settings",
    description: "Configure numbering, severity, review, retention and permissions.",
    icon: Settings2,
    items: [
      "Audit ID Format",
      "Finding Severity",
      "Risk Ratings",
      "Review Workflow",
      "Sign-Off Rules",
      "Evidence Rules",
      "Retention Policy",
      "Notification Settings",
      "Department Access",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-audit",
    title: "KRVE AI Audit Intelligence",
    description: "Use AI to detect exceptions, summarise evidence and prioritise findings.",
    icon: Sparkles,
    items: [
      "AI Exception Detection",
      "AI Risk Scoring",
      "AI Finding Classification",
      "AI Root Cause Analysis",
      "AI Evidence Summary",
      "AI Control Recommendation",
      "AI Sample Selection",
      "AI Audit Summary",
      "AI Closure Recommendation",
      "AI Trend Detection",
      "AI Executive Brief",
      "AI Audit Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Audit Events", "28,486", "Current month", History],
  ["Control Exceptions", "11", "3 high priority", ShieldAlert],
  ["Completed Reviews", "96%", "Current audit plan", CheckCircle2],
  ["Open Findings", "8", "Assigned for closure", AlertTriangle],
];

export default function AuditReportsManagement() {
  const [selectedModule, setSelectedModule] = useState<AuditModule | null>(null);
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
            placeholder="Search audit trails, findings, controls or reports..."
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
            Complete Audit & Control Reporting
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete audit workspace.
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
              <FileCheck2 size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Audit & Control Reporting
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Audit Reports Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Review user actions, approvals, transactions, data changes,
            exceptions, control testing, findings, corrective actions and
            compliance evidence across the complete KRVE operating system.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Eye size={17} />
            Review Findings
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Sparkles size={17} />
            Generate Audit Report
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
  module: AuditModule;
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
  module: AuditModule;
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
          Back to Audit Reports
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Audit Workspace
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
              Create Audit
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric title="Audit Records" value="28,486" note="Current module" icon={History} />
        <WorkspaceMetric title="Open Findings" value="8" note="Require closure" icon={AlertTriangle} />
        <WorkspaceMetric title="Review Completion" value="96%" note="Current plan" icon={CheckCircle2} />
        <WorkspaceMetric title="Control Exceptions" value="11" note="3 high priority" icon={ShieldAlert} />
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {["Overview", "Audit Records", "Findings", "Controls", "Reports"].map((tab) => (
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

          {activeTab === "Audit Records" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {module.items.map((item, index) => (
                <FeatureCard key={item} title={item} index={index} />
              ))}
            </div>
          )}

          {activeTab === "Findings" && <FindingsPanel />}

          {activeTab === "Controls" && <ControlsPanel />}

          {activeTab === "Reports" && <ReportsPanel module={module} />}
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

function OverviewPanel({ module }: { module: AuditModule }) {
  const bars = [48, 62, 58, 74, 69, 83, 91, 96];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              {module.title} Activity
            </h3>
            <p className="mt-1 text-sm text-slate-500">Current audit cycle</p>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            +14.2%
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
        <h3 className="text-lg font-black text-slate-950">Audit Status</h3>
        <p className="mt-1 text-sm text-slate-500">Current plan</p>

        <div className="mt-6 space-y-5">
          {[
            ["Completed", "96%", "bg-green-500"],
            ["Under Review", "3%", "bg-blue-500"],
            ["Overdue", "1%", "bg-red-500"],
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

function FindingsPanel() {
  const rows = [
    ["Duplicate vendor payment control", "High", "Finance", "Open"],
    ["Inactive user access not removed", "Critical", "IT", "In Progress"],
    ["Inventory adjustment approval gap", "Medium", "Inventory", "Open"],
    ["Contract renewal evidence missing", "Medium", "Legal", "Review"],
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4">Finding</th>
            <th className="px-5 py-4">Severity</th>
            <th className="px-5 py-4">Department</th>
            <th className="px-5 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([finding, severity, department, status]) => (
            <tr key={finding} className="border-t border-slate-200">
              <td className="px-5 py-4 font-bold text-slate-950">{finding}</td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                  severity === "Critical"
                    ? "bg-red-100 text-red-700"
                    : severity === "High"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                }`}>
                  {severity}
                </span>
              </td>
              <td className="px-5 py-4 text-slate-600">{department}</td>
              <td className="px-5 py-4 text-slate-600">{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ControlsPanel() {
  const controls = [
    ["Maker-checker payment approval", "Effective", "Finance"],
    ["Role-based department access", "Needs Improvement", "IT"],
    ["Vendor onboarding verification", "Effective", "Procurement"],
    ["Monthly stock reconciliation", "Effective", "Inventory"],
    ["Employee exit access revocation", "Failed", "HR"],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {controls.map(([name, result, owner], index) => (
        <div
          key={name}
          className={`flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center ${
            index !== controls.length - 1 ? "border-b border-slate-200" : ""
          }`}
        >
          <div>
            <p className="font-bold text-slate-950">{name}</p>
            <p className="mt-1 text-sm text-slate-500">{owner}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${
            result === "Effective"
              ? "bg-green-100 text-green-700"
              : result === "Failed"
                ? "bg-red-100 text-red-700"
                : "bg-orange-100 text-orange-700"
          }`}>
            {result}
          </span>
        </div>
      ))}
    </div>
  );
}

function ReportsPanel({ module }: { module: AuditModule }) {
  const reports = [
    ["PDF Audit Report", "Formal printable audit report", FileText],
    ["Excel Audit Register", "Detailed audit and findings data", FileBarChart],
    ["Control Testing Pack", "Control evidence and test results", FileCheck2],
    ["Executive Audit Summary", `Leadership summary for ${module.title}`, Sparkles],
  ] as const;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {reports.map(([title, note, Icon]) => (
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
            Generate
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
    History,
    KeyRound,
    UserCheck,
    FileSearch,
    Database,
    FileText,
    ClipboardCheck,
    ShieldCheck,
    AlertTriangle,
    Workflow,
    Eye,
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
        Open and manage the complete {title.toLowerCase()} audit workflow.
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