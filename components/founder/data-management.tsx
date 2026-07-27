"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  CloudDownload,
  CloudUpload,
  Database,
  FileArchive,
  FileBarChart,
  FileCheck2,
  FileCog,
  FileSearch,
  HardDriveDownload,
  ListChecks,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Table2,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type DataModule = {
  id: string;
  title: string;
  description: string;
  features: number;
  icon: IconType;
  metric: string;
  metricLabel: string;
};

type WorkspaceContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  statistics: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  workflows: Array<{
    title: string;
    description: string;
  }>;
};

const dataModules: DataModule[] = [
  {
    id: "data-dashboard",
    title: "Data Dashboard",
    description:
      "Monitor master records, quality, backups, imports and enterprise data health.",
    features: 10,
    icon: Database,
    metric: "42,684",
    metricLabel: "Master records",
  },
  {
    id: "master-data",
    title: "Master Data",
    description:
      "Manage products, customers, vendors, employees, accounts and reference records.",
    features: 12,
    icon: Table2,
    metric: "42,684",
    metricLabel: "Enterprise records",
  },
  {
    id: "data-imports",
    title: "Data Imports",
    description:
      "Import structured enterprise data through validated templates and controlled workflows.",
    features: 12,
    icon: CloudUpload,
    metric: "6",
    metricLabel: "Import jobs",
  },
  {
    id: "data-exports",
    title: "Data Exports",
    description:
      "Create controlled exports with permissions, formats, filters and audit tracking.",
    features: 10,
    icon: CloudDownload,
    metric: "84",
    metricLabel: "Exports this month",
  },
  {
    id: "data-quality",
    title: "Data Quality",
    description:
      "Monitor completeness, accuracy, consistency, duplication and validation issues.",
    features: 12,
    icon: FileCheck2,
    metric: "97.2%",
    metricLabel: "Validation score",
  },
  {
    id: "data-validation",
    title: "Validation Rules",
    description:
      "Create field, record and cross-system validation rules for enterprise data.",
    features: 11,
    icon: ListChecks,
    metric: "126",
    metricLabel: "Active rules",
  },
  {
    id: "data-cleansing",
    title: "Data Cleansing",
    description:
      "Correct duplicates, invalid formats, missing values and inconsistent records.",
    features: 10,
    icon: RefreshCw,
    metric: "1,284",
    metricLabel: "Records improved",
  },
  {
    id: "duplicate-management",
    title: "Duplicate Management",
    description:
      "Detect, compare, merge and resolve duplicate enterprise records.",
    features: 9,
    icon: FileSearch,
    metric: "82",
    metricLabel: "Potential duplicates",
  },
  {
    id: "backup-management",
    title: "Backup Management",
    description:
      "Manage scheduled backups, restore points, backup health and recovery readiness.",
    features: 12,
    icon: HardDriveDownload,
    metric: "2h ago",
    metricLabel: "Last backup",
  },
  {
    id: "data-retention",
    title: "Data Retention",
    description:
      "Configure retention periods, archival rules, legal holds and deletion controls.",
    features: 10,
    icon: FileArchive,
    metric: "18",
    metricLabel: "Retention policies",
  },
  {
    id: "data-archival",
    title: "Data Archival",
    description:
      "Archive historical records securely while preserving search and retrieval.",
    features: 9,
    icon: FileArchive,
    metric: "2.8Cr",
    metricLabel: "Archived records",
  },
  {
    id: "data-deletion",
    title: "Data Deletion",
    description:
      "Manage approved deletion, anonymisation and irreversible disposal workflows.",
    features: 10,
    icon: Trash2,
    metric: "14",
    metricLabel: "Requests pending",
  },
  {
    id: "data-governance",
    title: "Data Governance",
    description:
      "Define ownership, classification, standards, stewardship and accountability.",
    features: 12,
    icon: ShieldCheck,
    metric: "96%",
    metricLabel: "Governance health",
  },
  {
    id: "data-audit",
    title: "Data Audit",
    description:
      "Review imports, exports, corrections, deletions and master-data changes.",
    features: 10,
    icon: FileBarChart,
    metric: "18,642",
    metricLabel: "Events logged",
  },
  {
    id: "data-reports",
    title: "Data Reports",
    description:
      "Generate quality, validation, import, export, backup and governance reports.",
    features: 10,
    icon: FileBarChart,
    metric: "16",
    metricLabel: "Report templates",
  },
  {
    id: "data-settings",
    title: "Data Settings",
    description:
      "Configure formats, defaults, validation behaviour and enterprise data standards.",
    features: 9,
    icon: Settings,
    metric: "Active",
    metricLabel: "Configuration status",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "data-dashboard": {
    eyebrow: "Enterprise Data Control",
    title: "Data Dashboard",
    description:
      "Manage imports, exports, backups, retention, validation, cleansing and master data standards.",
    primaryAction: "Import Data",
    secondaryAction: "Export Data",
    statistics: [
      { label: "Master Records", value: "42,684", note: "Across enterprise datasets" },
      { label: "Data Quality", value: "97.2%", note: "Validation score" },
      { label: "Last Backup", value: "2h ago", note: "Completed successfully" },
      { label: "Import Jobs", value: "6", note: "2 currently running" },
    ],
    workflows: [
      {
        title: "Master Data Oversight",
        description:
          "Monitor core enterprise records, ownership and data consistency.",
      },
      {
        title: "Import & Export Control",
        description:
          "Manage structured data movement with permissions and audit trails.",
      },
      {
        title: "Quality & Validation",
        description:
          "Review completeness, duplicates, formats and validation failures.",
      },
      {
        title: "Backup & Retention",
        description:
          "Monitor recovery readiness, archival and retention compliance.",
      },
    ],
  },
  "data-imports": {
    eyebrow: "Controlled Data Ingestion",
    title: "Data Imports",
    description:
      "Import enterprise records using validated templates, mappings and controlled approval workflows.",
    primaryAction: "New Import",
    secondaryAction: "Download Template",
    statistics: [
      { label: "Import Jobs", value: "6", note: "2 currently running" },
      { label: "Records Imported", value: "12,486", note: "Current month" },
      { label: "Validation Success", value: "98.4%", note: "Across imports" },
      { label: "Failed Records", value: "42", note: "Require correction" },
    ],
    workflows: [
      {
        title: "Template Selection",
        description:
          "Choose the appropriate enterprise import template.",
      },
      {
        title: "Field Mapping",
        description:
          "Map source columns to KEOS data fields.",
      },
      {
        title: "Validation & Preview",
        description:
          "Check errors, duplicates and data quality before import.",
      },
      {
        title: "Approval & Execution",
        description:
          "Approve and run the import with complete audit tracking.",
      },
    ],
  },
  "data-quality": {
    eyebrow: "Enterprise Data Assurance",
    title: "Data Quality",
    description:
      "Monitor and improve completeness, validity, consistency, accuracy and uniqueness.",
    primaryAction: "Run Quality Scan",
    secondaryAction: "Export Findings",
    statistics: [
      { label: "Quality Score", value: "97.2%", note: "Enterprise average" },
      { label: "Invalid Records", value: "126", note: "Require correction" },
      { label: "Duplicates", value: "82", note: "Potential matches" },
      { label: "Missing Fields", value: "214", note: "Across datasets" },
    ],
    workflows: [
      {
        title: "Quality Assessment",
        description:
          "Scan enterprise datasets using data-quality rules.",
      },
      {
        title: "Issue Classification",
        description:
          "Group invalid, incomplete and duplicate records.",
      },
      {
        title: "Correction Workflow",
        description:
          "Assign, correct and approve data-quality fixes.",
      },
      {
        title: "Quality Reporting",
        description:
          "Track trends, departments and recurring quality issues.",
      },
    ],
  },
  "backup-management": {
    eyebrow: "Data Resilience",
    title: "Backup Management",
    description:
      "Monitor backup schedules, restore points, storage, failures and recovery readiness.",
    primaryAction: "Create Backup",
    secondaryAction: "Test Restore",
    statistics: [
      { label: "Last Backup", value: "2h ago", note: "Completed successfully" },
      { label: "Restore Points", value: "32", note: "Available recovery points" },
      { label: "Backup Health", value: "100%", note: "No failed jobs" },
      { label: "Storage Used", value: "68%", note: "Backup repository" },
    ],
    workflows: [
      {
        title: "Backup Scheduling",
        description:
          "Configure frequency, datasets and retention.",
      },
      {
        title: "Backup Monitoring",
        description:
          "Review job duration, size, status and failures.",
      },
      {
        title: "Restore Testing",
        description:
          "Validate recovery points and data restoration readiness.",
      },
      {
        title: "Disaster Recovery",
        description:
          "Maintain enterprise recovery procedures and evidence.",
      },
    ],
  },
};

export default function DataManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return dataModules;
    }

    return dataModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    dataModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <DataWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onImport={() => setShowImportModal(true)}
          onExport={() => setShowExportModal(true)}
        />

        {showImportModal && (
          <ImportDataModal onClose={() => setShowImportModal(false)} />
        )}

        {showExportModal && (
          <ExportDataModal onClose={() => setShowExportModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#34137d] to-[#1d4ed8] p-7 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <Database size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  Enterprise Data Control
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Data Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Manage imports, exports, backups, retention, validation,
                cleansing and master data standards.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowImportModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <UploadCloud size={18} />
                Import Data
              </button>

              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <CloudDownload size={18} />
                Export Data
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Master Records"
            value="42,684"
            description="Across enterprise datasets"
            icon={Database}
            iconClassName="bg-violet-50 text-violet-600"
          />

          <SummaryCard
            title="Data Quality"
            value="97.2%"
            description="Validation score"
            icon={FileCheck2}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="Last Backup"
            value="2h ago"
            description="Completed successfully"
            icon={HardDriveDownload}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Import Jobs"
            value="6"
            description="2 currently running"
            icon={CloudUpload}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Data Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Enterprise Data Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete data, quality and governance workflow.
              </p>
            </div>

            <div className="relative w-full xl:w-[330px]">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search data modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <DataModuleCard
                key={module.id}
                module={module}
                onOpen={() => setActiveModuleId(module.id)}
              />
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="py-16 text-center">
              <Search size={34} className="mx-auto text-slate-300" />
              <h3 className="mt-4 font-black text-slate-900">
                No data module found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different term.
              </p>
            </div>
          )}
        </section>
      </div>

      {showImportModal && (
        <ImportDataModal onClose={() => setShowImportModal(false)} />
      )}

      {showExportModal && (
        <ExportDataModal onClose={() => setShowExportModal(false)} />
      )}
    </>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: string;
  description: string;
  icon: IconType;
  iconClassName: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${iconClassName}`}>
        <Icon size={20} />
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-3 text-xs text-slate-400">{description}</p>
    </article>
  );
}

function DataModuleCard({
  module,
  onOpen,
}: {
  module: DataModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <article className="group flex min-h-[255px] flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
          <Icon size={21} />
        </div>

        <div className="text-right">
          <p className="text-lg font-black text-slate-950">{module.metric}</p>
          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            {module.metricLabel}
          </p>
        </div>
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">{module.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">{module.description}</p>

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-xs font-bold text-slate-400">
          {module.features} features
        </span>

        <button
          type="button"
          onClick={onOpen}
          className="flex items-center gap-2 text-sm font-black text-violet-600 transition group-hover:gap-3"
        >
          Open
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

function DataWorkspace({
  module,
  onBack,
  onImport,
  onExport,
}: {
  module: DataModule;
  onBack: () => void;
  onImport: () => void;
  onExport: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Enterprise Data Control",
      title: module.title,
      description: module.description,
      primaryAction: "Create Record",
      secondaryAction: "Generate Report",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current data status",
        },
        { label: "Active Records", value: "24", note: "Currently managed" },
        { label: "Pending Actions", value: "6", note: "Require review" },
        { label: "Data Health", value: "97.2%", note: "Within target" },
      ],
      workflows: [
        {
          title: "Data Configuration",
          description:
            "Manage records, standards and module settings.",
        },
        {
          title: "Validation & Quality",
          description:
            "Review errors, duplicates and completeness.",
        },
        {
          title: "Approval Workflow",
          description:
            "Control imports, exports and sensitive changes.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate reports and retain complete audit history.",
        },
      ],
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeft size={17} />
        Back to Data Management
      </button>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#34137d] to-[#1d4ed8] p-7 text-white shadow-xl sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={23} />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                {content.eyebrow}
              </p>
            </div>

            <h1 className="mt-6 text-3xl font-black sm:text-4xl">
              {content.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              {content.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onImport}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <UploadCloud size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onExport}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <CloudDownload size={17} />
              {content.secondaryAction}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {content.statistics.map((statistic, index) => (
          <article
            key={statistic.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div
              className={`grid h-11 w-11 place-items-center rounded-xl ${
                index === 0
                  ? "bg-violet-50 text-violet-600"
                  : index === 1
                    ? "bg-blue-50 text-blue-600"
                    : index === 2
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-orange-50 text-orange-600"
              }`}
            >
              <Icon size={20} />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              {statistic.label}
            </p>
            <p className="mt-1 text-3xl font-black text-slate-950">
              {statistic.value}
            </p>
            <p className="mt-3 text-xs text-slate-400">{statistic.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
            Operational Workspace
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {module.title} Workflows
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.workflows.map((workflow, index) => (
              <div
                key={workflow.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-sm font-black text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950">{workflow.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {workflow.description}
                    </p>
                    <button
                      type="button"
                      className="mt-4 flex items-center gap-2 text-xs font-black text-violet-600"
                    >
                      Open Workflow
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-600">
              <Sparkles size={22} />
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
              AI Active
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black">
            KRVE AI Data Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Enterprise data quality is strong. Duplicate customer records and
            two running imports require attention.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Data quality" value="97.2%" />
            <InsightRow label="Potential duplicates" value="82" />
            <InsightRow label="Running imports" value="2" />
            <InsightRow label="Backup health" value="100%" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
          >
            Generate Data Analysis
            <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
  );
}

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

function ImportDataModal({ onClose }: { onClose: () => void }) {
  const [imported, setImported] = useState(false);

  return (
    <ModalShell
      title="Import Data"
      description="Upload and validate enterprise data before controlled import."
      icon={CloudUpload}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Data Type"
            options={[
              "Products",
              "Customers",
              "Employees",
              "Vendors",
              "Inventory",
              "Finance Records",
              "Departments",
              "Custom Dataset",
            ]}
          />

          <SelectField
            label="Import Mode"
            options={[
              "Create New Records",
              "Update Existing Records",
              "Create and Update",
              "Validation Only",
            ]}
          />

          <SelectField
            label="File Format"
            options={[
              "Excel",
              "CSV",
              "JSON",
            ]}
          />

          <SelectField
            label="Duplicate Handling"
            options={[
              "Reject Duplicates",
              "Skip Duplicates",
              "Update Matching Records",
              "Send for Review",
            ]}
          />
        </div>

        <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <UploadCloud size={34} className="mx-auto text-violet-600" />
          <h3 className="mt-4 font-black text-slate-950">
            Upload Import File
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Select a validated Excel, CSV or JSON file.
          </p>
          <button
            type="button"
            className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white"
          >
            Choose File
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />
            <p className="text-sm leading-6 text-blue-700">
              KEOS will validate fields, formats, duplicates and required values
              before any records are committed.
            </p>
          </div>
        </div>

        {imported && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-bold text-emerald-700">
              Import job created successfully.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => setImported(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <UploadCloud size={17} />
          Start Import
        </button>
      </div>
    </ModalShell>
  );
}

function ExportDataModal({ onClose }: { onClose: () => void }) {
  const [exported, setExported] = useState(false);

  return (
    <ModalShell
      title="Export Data"
      description="Create a controlled enterprise data export."
      icon={CloudDownload}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="p-6">
        <div className="grid gap-5">
          <SelectField
            label="Dataset"
            options={[
              "Products",
              "Customers",
              "Employees",
              "Vendors",
              "Inventory",
              "Finance Records",
              "Departments",
              "Complete Master Data",
            ]}
          />

          <SelectField
            label="Export Format"
            options={[
              "Excel",
              "CSV",
              "JSON",
              "PDF Summary",
            ]}
          />

          <SelectField
            label="Record Scope"
            options={[
              "All Records",
              "Active Records",
              "Current Department",
              "Filtered Records",
              "Custom Selection",
            ]}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-orange-600"
            />
            <p className="text-sm leading-6 text-orange-700">
              Data exports are permission-controlled and recorded in audit logs.
            </p>
          </div>
        </div>

        {exported && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <BadgeCheck
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-bold text-emerald-700">
              Data export generated successfully.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => setExported(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <CloudDownload size={17} />
          Generate Export
        </button>
      </div>
    </ModalShell>
  );
}

function ModalShell({
  title,
  description,
  icon: Icon,
  onClose,
  children,
  maxWidth = "max-w-3xl",
}: {
  title: string;
  description: string;
  icon: IconType;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${maxWidth} overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#111827] via-[#34137d] to-[#1d4ed8] px-6 py-5 text-white">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <Icon size={21} />
            </div>
            <div>
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-blue-100">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <select className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100">
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}