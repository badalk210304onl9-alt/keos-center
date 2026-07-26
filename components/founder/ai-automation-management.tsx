"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  FileBarChart,
  GitBranch,
  Mail,
  MessageSquare,
  PauseCircle,
  PlayCircle,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Webhook,
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

type AutomationModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: AutomationModule[] = [
  {
    id: "automation-dashboard",
    title: "Automation Dashboard",
    description: "View active workflows, runs, failures, savings and automation health.",
    icon: BarChart3,
    items: [
      "Active Automations",
      "Runs Today",
      "Success Rate",
      "Failed Runs",
      "Manual Hours Saved",
      "Department Usage",
      "Pending Approvals",
      "Automation Alerts",
      "AI Insights",
    ],
  },
  {
    id: "workflow-builder",
    title: "Workflow Builder",
    description: "Create multi-step enterprise workflows with visual actions.",
    icon: Workflow,
    items: [
      "Create Workflow",
      "Workflow Canvas",
      "Add Trigger",
      "Add Condition",
      "Add Action",
      "Add Approval",
      "Add Delay",
      "Add Branch",
      "Test Workflow",
      "Publish Workflow",
      "Workflow Versions",
      "Workflow History",
    ],
  },
  {
    id: "automation-templates",
    title: "Automation Templates",
    description: "Use ready-made workflows for common KEOS operations.",
    icon: Sparkles,
    items: [
      "Finance Templates",
      "HR Templates",
      "Marketing Templates",
      "Support Templates",
      "Procurement Templates",
      "CRM Templates",
      "Inventory Templates",
      "Legal Templates",
      "Risk Templates",
      "Project Templates",
      "Custom Templates",
      "Template History",
    ],
  },
  {
    id: "trigger-management",
    title: "Trigger Management",
    description: "Configure events, schedules and data changes that start workflows.",
    icon: Zap,
    items: [
      "Record Created",
      "Record Updated",
      "Status Changed",
      "Threshold Reached",
      "Scheduled Trigger",
      "Manual Trigger",
      "Email Received",
      "Form Submitted",
      "Payment Received",
      "Stock Changed",
      "Trigger Filters",
      "Trigger History",
    ],
  },
  {
    id: "condition-rules",
    title: "Condition Rules",
    description: "Control workflow logic using enterprise business conditions.",
    icon: GitBranch,
    items: [
      "If/Else Rules",
      "AND Conditions",
      "OR Conditions",
      "Value Comparison",
      "Date Conditions",
      "Amount Conditions",
      "Status Conditions",
      "Department Conditions",
      "Role Conditions",
      "Priority Conditions",
      "Rule Testing",
      "Rule History",
    ],
  },
  {
    id: "action-library",
    title: "Action Library",
    description: "Choose automated actions for records, communication and approvals.",
    icon: PlayCircle,
    items: [
      "Create Record",
      "Update Record",
      "Assign Owner",
      "Change Status",
      "Send Notification",
      "Send Email",
      "Send WhatsApp",
      "Create Task",
      "Create Approval",
      "Generate Report",
      "Call API",
      "Action History",
    ],
  },
  {
    id: "approval-automation",
    title: "Approval Automation",
    description: "Automate approval routing, escalation and delegation.",
    icon: CheckCircle2,
    items: [
      "Approval Workflow",
      "Approval Matrix",
      "Single Approval",
      "Multi-Level Approval",
      "Parallel Approval",
      "Amount-Based Approval",
      "Department Approval",
      "Founder Approval",
      "Delegation",
      "Escalation",
      "Approval History",
      "Approval Reports",
    ],
  },
  {
    id: "scheduled-automation",
    title: "Scheduled Automation",
    description: "Run workflows hourly, daily, weekly or on custom schedules.",
    icon: Clock3,
    items: [
      "Hourly Runs",
      "Daily Runs",
      "Weekly Runs",
      "Monthly Runs",
      "Custom Schedule",
      "Business-Day Schedule",
      "Start Date",
      "End Date",
      "Timezone",
      "Pause Schedule",
      "Schedule History",
      "Schedule Reports",
    ],
  },
  {
    id: "notification-automation",
    title: "Notification Automation",
    description: "Send alerts and reminders across KEOS channels.",
    icon: BellRing,
    items: [
      "In-App Alerts",
      "Email Alerts",
      "WhatsApp Alerts",
      "SMS Alerts",
      "Push Notifications",
      "Escalation Alerts",
      "Reminder Alerts",
      "Approval Alerts",
      "Failure Alerts",
      "Notification Templates",
      "Delivery History",
      "Notification Reports",
    ],
  },
  {
    id: "email-automation",
    title: "Email Automation",
    description: "Automate transactional, operational and follow-up emails.",
    icon: Mail,
    items: [
      "Email Templates",
      "Welcome Emails",
      "Approval Emails",
      "Reminder Emails",
      "Invoice Emails",
      "Payment Emails",
      "Order Emails",
      "Support Emails",
      "Scheduled Emails",
      "Email Personalisation",
      "Email History",
      "Email Reports",
    ],
  },
  {
    id: "whatsapp-automation",
    title: "WhatsApp Automation",
    description: "Automate WhatsApp updates, reminders and service messages.",
    icon: MessageSquare,
    items: [
      "Message Templates",
      "Order Updates",
      "Payment Updates",
      "Delivery Updates",
      "Support Updates",
      "Employee Alerts",
      "Approval Alerts",
      "Scheduled Messages",
      "Customer Follow-Ups",
      "Opt-In Rules",
      "Message History",
      "WhatsApp Reports",
    ],
  },
  {
    id: "data-automation",
    title: "Data Automation",
    description: "Move, validate, clean and synchronise enterprise records.",
    icon: Database,
    items: [
      "Data Sync",
      "Record Matching",
      "Duplicate Detection",
      "Data Validation",
      "Data Enrichment",
      "Data Cleanup",
      "Field Mapping",
      "Bulk Update",
      "Import Automation",
      "Export Automation",
      "Sync History",
      "Data Reports",
    ],
  },
  {
    id: "integration-automation",
    title: "Integration Automation",
    description: "Connect KEOS workflows with external applications and services.",
    icon: Webhook,
    items: [
      "Webhook Triggers",
      "API Actions",
      "Google Workspace",
      "Payment Gateways",
      "Courier Systems",
      "Marketplaces",
      "Accounting Systems",
      "CRM Integrations",
      "HR Integrations",
      "Custom Integration",
      "Integration Logs",
      "Integration Reports",
    ],
  },
  {
    id: "department-automation",
    title: "Department Automations",
    description: "Manage automation separately for every enterprise department.",
    icon: Bot,
    items: [
      "Finance Automation",
      "HR Automation",
      "Marketing Automation",
      "Customer Support Automation",
      "Procurement Automation",
      "CRM Automation",
      "Vendor Automation",
      "Projects Automation",
      "Documents Automation",
      "Legal Automation",
      "Risk Automation",
      "Facilities Automation",
    ],
  },
  {
    id: "ai-powered-automation",
    title: "AI-Powered Automation",
    description: "Use KRVE AI for classification, decisions and next-best actions.",
    icon: Sparkles,
    items: [
      "AI Classification",
      "AI Priority Detection",
      "AI Assignment",
      "AI Approval Recommendation",
      "AI Response Generation",
      "AI Summary",
      "AI Risk Detection",
      "AI Anomaly Detection",
      "AI Forecast Trigger",
      "AI Next Best Action",
      "AI Human Review",
      "AI Automation History",
    ],
  },
  {
    id: "run-monitoring",
    title: "Run Monitoring",
    description: "Monitor each workflow run, status, duration and output.",
    icon: Activity,
    items: [
      "Live Runs",
      "Successful Runs",
      "Failed Runs",
      "Pending Runs",
      "Paused Runs",
      "Run Duration",
      "Run Details",
      "Step Logs",
      "Output Records",
      "Retry Run",
      "Cancel Run",
      "Run History",
    ],
  },
  {
    id: "failure-management",
    title: "Failure Management",
    description: "Investigate failures, retry actions and resolve automation errors.",
    icon: AlertTriangle,
    items: [
      "Failure Queue",
      "Critical Failures",
      "Failure Reason",
      "Failed Step",
      "Retry Workflow",
      "Skip Step",
      "Manual Resolution",
      "Assign Owner",
      "Escalate Failure",
      "Failure Alerts",
      "Failure History",
      "Failure Reports",
    ],
  },
  {
    id: "automation-control",
    title: "Automation Control",
    description: "Start, pause, resume, disable and retire workflows safely.",
    icon: PauseCircle,
    items: [
      "Start Automation",
      "Pause Automation",
      "Resume Automation",
      "Disable Automation",
      "Clone Automation",
      "Archive Automation",
      "Delete Automation",
      "Emergency Stop",
      "Control Approval",
      "Control History",
      "Automation Status",
      "Control Reports",
    ],
  },
  {
    id: "automation-governance",
    title: "Automation Governance",
    description: "Control ownership, approvals, access and audit requirements.",
    icon: ShieldCheck,
    items: [
      "Automation Owners",
      "Department Access",
      "Role Permissions",
      "Approval Requirements",
      "Sensitive Actions",
      "Data Permissions",
      "Change Control",
      "Human Review",
      "Audit Trail",
      "Policy Exceptions",
      "Governance History",
      "Governance Reports",
    ],
  },
  {
    id: "automation-analytics",
    title: "Automation Analytics",
    description: "Analyse usage, savings, reliability and workflow performance.",
    icon: Activity,
    items: [
      "Run Analytics",
      "Success Analytics",
      "Failure Analytics",
      "Time Saved",
      "Cost Saved",
      "Department Analytics",
      "Template Analytics",
      "Trigger Analytics",
      "Action Analytics",
      "SLA Analytics",
      "Trend Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "automation-reports",
    title: "Automation Reports",
    description: "Generate operational, savings, error and governance reports.",
    icon: FileBarChart,
    items: [
      "Executive Automation Report",
      "Automation Register",
      "Run Report",
      "Failure Report",
      "Savings Report",
      "Department Report",
      "Approval Report",
      "Notification Report",
      "Integration Report",
      "Governance Report",
      "Audit Report",
      "Custom Reports",
    ],
  },
  {
    id: "automation-settings",
    title: "Automation Settings",
    description: "Configure workflow defaults, security and execution limits.",
    icon: Settings2,
    items: [
      "Default Owner",
      "Default Timezone",
      "Run Limits",
      "Retry Rules",
      "Timeout Rules",
      "Approval Rules",
      "Notification Settings",
      "Data Retention",
      "Security Rules",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
];

const dashboardMetrics = [
  ["Active Automations", "42", "Across 9 departments", Workflow],
  ["Runs Today", "1,086", "98.9% successful", PlayCircle],
  ["Manual Hours Saved", "126h", "Current month", TimerReset],
  ["Failed Runs", "12", "Require review", AlertTriangle],
];

export default function AIAutomationManagement() {
  const [selectedModule, setSelectedModule] =
    useState<AutomationModule | null>(null);
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
            placeholder="Search automations, triggers or workflows..."
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
          Complete AI Automation Operations
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Tap any card to open its complete automation workspace.
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
              <Workflow size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Intelligent Workflow Automation
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            AI Automation Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Build, approve, run and monitor intelligent workflows for records,
            alerts, communication, data sync, integrations and cross-department
            enterprise operations.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Sparkles size={17} />
            Use Template
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Plus size={17} />
            Create Automation
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
  module: AutomationModule;
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
  module: AutomationModule;
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
          Back to AI Automation Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Automation Workspace
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
        <WorkspaceMetric title="Active Records" value="42" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Actions" value="14" note="Require attention" icon={BellRing} />
        <WorkspaceMetric title="Success Rate" value="98.9%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="8" note="Available exports" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its automation workflow.
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
    Workflow,
    Zap,
    GitBranch,
    PlayCircle,
    CheckCircle2,
    Clock3,
    BellRing,
    Mail,
    MessageSquare,
    Database,
    Webhook,
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