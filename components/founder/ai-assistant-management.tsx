"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileBarChart,
  FileSearch,
  FileText,
  Gauge,
  Lightbulb,
  LineChart,
  MessageSquare,
  Network,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
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

type AssistantModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: AssistantModule[] = [
  {
    id: "assistant-dashboard",
    title: "Assistant Dashboard",
    description: "View questions, answer quality, reports and response performance.",
    icon: BarChart3,
    items: [
      "Questions Today",
      "Answer Accuracy",
      "Reports Generated",
      "Average Response",
      "Active Users",
      "Department Usage",
      "Saved Conversations",
      "Pending Reviews",
      "AI Insights",
    ],
  },
  {
    id: "enterprise-conversation",
    title: "Enterprise Conversation",
    description: "Ask natural-language questions across the complete KRVE operating system.",
    icon: MessageSquare,
    items: [
      "Start Conversation",
      "Founder Questions",
      "Department Questions",
      "Follow-Up Questions",
      "Suggested Prompts",
      "Pinned Answers",
      "Saved Conversations",
      "Conversation History",
      "Export Conversation",
      "Share Conversation",
      "Delete Conversation",
      "Conversation Settings",
    ],
  },
  {
    id: "department-analysis",
    title: "Department Analysis",
    description: "Analyse any department using enterprise data and records.",
    icon: BrainCircuit,
    items: [
      "Finance Analysis",
      "HR Analysis",
      "Marketing Analysis",
      "Customer Support Analysis",
      "Procurement Analysis",
      "CRM Analysis",
      "Vendor Analysis",
      "Projects Analysis",
      "Legal Analysis",
      "Risk Analysis",
      "Facilities Analysis",
      "Operations Analysis",
    ],
  },
  {
    id: "founder-brief",
    title: "Founder Brief",
    description: "Receive executive summaries, priorities and critical actions.",
    icon: Lightbulb,
    items: [
      "Daily Brief",
      "Weekly Brief",
      "Monthly Brief",
      "Critical Alerts",
      "Priority Actions",
      "Revenue Summary",
      "Cash Summary",
      "People Summary",
      "Risk Summary",
      "Operations Summary",
      "Decision Summary",
      "Board Summary",
    ],
  },
  {
    id: "data-query",
    title: "Enterprise Data Query",
    description: "Ask questions directly from KEOS operational data.",
    icon: Search,
    items: [
      "Revenue Query",
      "Expense Query",
      "Customer Query",
      "Employee Query",
      "Inventory Query",
      "Order Query",
      "Vendor Query",
      "Project Query",
      "Risk Query",
      "Document Query",
      "Custom Query",
      "Query History",
    ],
  },
  {
    id: "report-generator",
    title: "AI Report Generator",
    description: "Create structured reports from enterprise information.",
    icon: FileBarChart,
    items: [
      "Executive Report",
      "Finance Report",
      "HR Report",
      "Marketing Report",
      "Sales Report",
      "Customer Report",
      "Operations Report",
      "Risk Report",
      "Legal Report",
      "Project Report",
      "Custom Report",
      "Report History",
    ],
  },
  {
    id: "document-assistant",
    title: "Document Assistant",
    description: "Ask questions, summarise and extract information from documents.",
    icon: FileSearch,
    items: [
      "Upload Document",
      "Document Summary",
      "Document Q&A",
      "Contract Review",
      "Policy Review",
      "Invoice Extraction",
      "Resume Review",
      "Metadata Extraction",
      "Document Comparison",
      "Duplicate Detection",
      "Saved Document Chats",
      "Document History",
    ],
  },
  {
    id: "decision-assistant",
    title: "Decision Assistant",
    description: "Compare options and receive data-backed recommendations.",
    icon: Target,
    items: [
      "Create Decision",
      "Decision Options",
      "Pros & Cons",
      "Financial Impact",
      "Operational Impact",
      "Risk Impact",
      "People Impact",
      "Scenario Comparison",
      "Recommended Option",
      "Decision Confidence",
      "Decision Approval",
      "Decision History",
    ],
  },
  {
    id: "forecast-assistant",
    title: "Forecast Assistant",
    description: "Generate forecasts for revenue, demand, cash and workforce.",
    icon: LineChart,
    items: [
      "Revenue Forecast",
      "Sales Forecast",
      "Cash Flow Forecast",
      "Demand Forecast",
      "Inventory Forecast",
      "Workforce Forecast",
      "Expense Forecast",
      "Customer Forecast",
      "Risk Forecast",
      "Scenario Forecast",
      "Forecast Accuracy",
      "Forecast History",
    ],
  },
  {
    id: "insight-assistant",
    title: "Insight Assistant",
    description: "Discover trends, anomalies and hidden business patterns.",
    icon: Sparkles,
    items: [
      "Executive Insights",
      "Financial Insights",
      "People Insights",
      "Customer Insights",
      "Sales Insights",
      "Marketing Insights",
      "Operations Insights",
      "Risk Insights",
      "Anomaly Insights",
      "Trend Insights",
      "Recommended Actions",
      "Insight History",
    ],
  },
  {
    id: "task-assistant",
    title: "Task Assistant",
    description: "Turn conversations and decisions into structured action items.",
    icon: Workflow,
    items: [
      "Create Task",
      "Assign Task",
      "Set Priority",
      "Set Due Date",
      "Create Checklist",
      "Create Follow-Up",
      "Create Reminder",
      "Create Approval",
      "Create Project Task",
      "Task Summary",
      "Task Status",
      "Task History",
    ],
  },
  {
    id: "meeting-assistant",
    title: "Meeting Assistant",
    description: "Prepare agendas, notes, summaries and action items.",
    icon: Bot,
    items: [
      "Create Agenda",
      "Meeting Preparation",
      "Meeting Notes",
      "Meeting Summary",
      "Decision Log",
      "Action Items",
      "Follow-Up Draft",
      "Attendee Summary",
      "Department Meeting",
      "Founder Meeting",
      "Meeting Archive",
      "Meeting Reports",
    ],
  },
  {
    id: "communication-assistant",
    title: "Communication Assistant",
    description: "Draft enterprise emails, notices and internal communication.",
    icon: MessageSquare,
    items: [
      "Draft Email",
      "Draft WhatsApp Message",
      "Draft Notice",
      "Draft Memo",
      "Draft Announcement",
      "Draft Escalation",
      "Draft Reminder",
      "Draft Approval Note",
      "Rewrite Message",
      "Translate Message",
      "Communication Templates",
      "Communication History",
    ],
  },
  {
    id: "knowledge-assistant",
    title: "Knowledge Assistant",
    description: "Search policies, SOPs, reports and enterprise knowledge.",
    icon: Network,
    items: [
      "Knowledge Search",
      "Policy Search",
      "SOP Search",
      "Department Knowledge",
      "Product Knowledge",
      "Customer Knowledge",
      "Vendor Knowledge",
      "Legal Knowledge",
      "Training Knowledge",
      "Saved Knowledge",
      "Knowledge Gaps",
      "Knowledge History",
    ],
  },
  {
    id: "prompt-library",
    title: "Prompt Library",
    description: "Use approved prompts for common enterprise tasks.",
    icon: FileText,
    items: [
      "Founder Prompts",
      "Finance Prompts",
      "HR Prompts",
      "Marketing Prompts",
      "Support Prompts",
      "Procurement Prompts",
      "CRM Prompts",
      "Legal Prompts",
      "Risk Prompts",
      "Document Prompts",
      "Saved Prompts",
      "Prompt History",
    ],
  },
  {
    id: "assistant-accuracy",
    title: "Accuracy & Review",
    description: "Review answers, corrections and confidence levels.",
    icon: CheckCircle2,
    items: [
      "Answer Accuracy",
      "Confidence Score",
      "Human Review",
      "Incorrect Answers",
      "Correction Queue",
      "Verified Answers",
      "Source Review",
      "Feedback",
      "Quality Trends",
      "Review History",
      "Accuracy Reports",
      "Improvement Actions",
    ],
  },
  {
    id: "assistant-security",
    title: "Assistant Security",
    description: "Protect enterprise data and control access to AI answers.",
    icon: ShieldCheck,
    items: [
      "Role-Based Access",
      "Department Isolation",
      "Sensitive Data Rules",
      "Conversation Privacy",
      "Export Permission",
      "Document Access",
      "Prompt Security",
      "Output Filtering",
      "Security Alerts",
      "Access History",
      "Security Audit",
      "Security Reports",
    ],
  },
  {
    id: "assistant-analytics",
    title: "Assistant Analytics",
    description: "Analyse usage, quality, departments and business impact.",
    icon: Activity,
    items: [
      "Usage Analytics",
      "User Analytics",
      "Department Analytics",
      "Question Analytics",
      "Response Analytics",
      "Accuracy Analytics",
      "Report Analytics",
      "Time Saved",
      "Cost Saved",
      "Adoption Analytics",
      "Trend Analytics",
      "Analytics History",
    ],
  },
  {
    id: "assistant-reports",
    title: "Assistant Reports",
    description: "Generate usage, accuracy and business-impact reports.",
    icon: FileBarChart,
    items: [
      "Executive Assistant Report",
      "Usage Report",
      "Accuracy Report",
      "Department Report",
      "User Report",
      "Conversation Report",
      "Report Generation Report",
      "Time Savings Report",
      "Cost Savings Report",
      "Security Report",
      "Review Report",
      "Custom Reports",
    ],
  },
  {
    id: "assistant-settings",
    title: "Assistant Settings",
    description: "Configure model, tone, access, review and conversation rules.",
    icon: Settings2,
    items: [
      "Default Model",
      "Response Tone",
      "Response Length",
      "Department Access",
      "User Permissions",
      "Source Settings",
      "Conversation Retention",
      "Human Review Rules",
      "Export Settings",
      "Notification Settings",
      "Roles",
      "Integrations",
    ],
  },
];

const dashboardMetrics = [
  ["Questions Today", "328", "Across 14 users", MessageSquare],
  ["Answer Accuracy", "96.8%", "Based on feedback", CheckCircle2],
  ["Reports Generated", "47", "During this week", FileBarChart],
  ["Average Response", "3.2s", "Enterprise queries", Zap],
];

export default function AIAssistantManagement() {
  const [selectedModule, setSelectedModule] =
    useState<AssistantModule | null>(null);
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
            placeholder="Search AI Assistant modules, reports or workflows..."
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
            Complete AI Assistant Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete AI Assistant workspace.
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
              <Sparkles size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Conversational Intelligence
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            AI Assistant
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Complete conversational intelligence for enterprise questions,
            department analysis, reports, decisions, forecasting, documents,
            meetings, communication and secure knowledge access.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <BrainCircuit size={17} />
            Analyse Department
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Sparkles size={17} />
            Start Conversation
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
  module: AssistantModule;
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
  module: AssistantModule;
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
          Back to AI Assistant Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Assistant Workspace
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
        <WorkspaceMetric title="Active Records" value="328" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Actions" value="14" note="Require attention" icon={BellRing} />
        <WorkspaceMetric title="Accuracy" value="96.8%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="47" note="Available outputs" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its AI Assistant workflow.
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
    MessageSquare,
    BrainCircuit,
    Search,
    FileBarChart,
    FileSearch,
    Target,
    LineChart,
    Sparkles,
    Workflow,
    Bot,
    Network,
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