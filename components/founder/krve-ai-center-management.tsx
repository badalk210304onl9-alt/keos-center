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
  Copy,
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
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  WandSparkles,
  X,
  Zap,
  RefreshCw,
} from "lucide-react";
import {
  useMemo,
  useState,
  type ComponentType,
  type FormEvent,
} from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type AIModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const modules: AIModule[] = [
  {
    id: "ai-command-dashboard",
    title: "AI Command Dashboard",
    description:
      "View AI usage, automations, decisions, savings and performance.",
    icon: BarChart3,
    items: [
      "AI Analyses Today",
      "Automations Active",
      "Decisions Assisted",
      "Estimated Savings",
      "Department Usage",
      "AI Success Rate",
      "Pending Reviews",
      "Model Health",
      "AI Insights",
    ],
  },
  {
    id: "enterprise-ai-chat",
    title: "Enterprise AI Chat",
    description:
      "Ask KRVE AI questions across enterprise departments and records.",
    icon: MessageSquare,
    items: [
      "New Conversation",
      "Department Questions",
      "Founder Questions",
      "Finance Questions",
      "HR Questions",
      "Marketing Questions",
      "Operations Questions",
      "Document Questions",
      "Saved Conversations",
      "Conversation History",
      "Pinned Answers",
      "Export Conversation",
    ],
  },
  {
    id: "ai-copilot",
    title: "Founder AI Copilot",
    description:
      "Get executive summaries, priorities and next-best actions.",
    icon: BrainCircuit,
    items: [
      "Daily Executive Brief",
      "Priority Actions",
      "Critical Alerts",
      "Department Summary",
      "Revenue Summary",
      "Cash Summary",
      "Risk Summary",
      "People Summary",
      "Operations Summary",
      "Founder Recommendations",
      "Decision Memo",
      "Board Brief",
    ],
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Create intelligent workflows, triggers and action rules.",
    icon: Workflow,
    items: [
      "Create Automation",
      "Automation Library",
      "Active Automations",
      "Paused Automations",
      "Trigger Rules",
      "Conditions",
      "Actions",
      "Approval Steps",
      "Notifications",
      "Automation Runs",
      "Failed Runs",
      "Automation Reports",
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description:
      "Deploy specialist AI agents for departments and workflows.",
    icon: Bot,
    items: [
      "Founder Agent",
      "Finance Agent",
      "HR Agent",
      "Marketing Agent",
      "Customer Support Agent",
      "Procurement Agent",
      "Risk Agent",
      "Legal Agent",
      "Document Agent",
      "Agent Permissions",
      "Agent Activity",
      "Agent Reports",
    ],
  },
  {
    id: "decision-intelligence",
    title: "Decision Intelligence",
    description:
      "Compare scenarios and receive data-backed recommendations.",
    icon: Lightbulb,
    items: [
      "Decision Register",
      "Create Decision",
      "Decision Options",
      "Pros & Cons",
      "Financial Impact",
      "Operational Impact",
      "Risk Impact",
      "Scenario Comparison",
      "Recommended Option",
      "Decision Approval",
      "Decision Outcome",
      "Decision History",
    ],
  },
  {
    id: "forecasting",
    title: "AI Forecasting",
    description:
      "Forecast revenue, demand, cash, workforce and operational needs.",
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
      "Forecast Accuracy",
      "Scenario Forecast",
      "Forecast Reports",
    ],
  },
  {
    id: "anomaly-detection",
    title: "Anomaly Detection",
    description:
      "Detect unusual transactions, stock movements and behaviour.",
    icon: AlertTriangle,
    items: [
      "Financial Anomalies",
      "Payment Anomalies",
      "Expense Anomalies",
      "Inventory Anomalies",
      "Order Anomalies",
      "Customer Anomalies",
      "Employee Anomalies",
      "Vendor Anomalies",
      "Risk Alerts",
      "Anomaly Review",
      "False Positives",
      "Anomaly Reports",
    ],
  },
  {
    id: "recommendation-engine",
    title: "Recommendation Engine",
    description:
      "Generate recommendations for products, customers and operations.",
    icon: WandSparkles,
    items: [
      "Product Recommendations",
      "Customer Recommendations",
      "Offer Recommendations",
      "Pricing Recommendations",
      "Inventory Recommendations",
      "Vendor Recommendations",
      "Hiring Recommendations",
      "Marketing Recommendations",
      "Risk Recommendations",
      "Recommendation Rules",
      "Recommendation History",
      "Recommendation Reports",
    ],
  },
  {
    id: "document-intelligence",
    title: "Document Intelligence",
    description:
      "Summarise, classify and extract information from enterprise documents.",
    icon: FileSearch,
    items: [
      "Document Summary",
      "Contract Summary",
      "Policy Summary",
      "Invoice Extraction",
      "Receipt Extraction",
      "Resume Extraction",
      "Metadata Extraction",
      "Document Classification",
      "Duplicate Detection",
      "Compliance Review",
      "Document Q&A",
      "Document Reports",
    ],
  },
  {
    id: "knowledge-center",
    title: "Enterprise Knowledge Center",
    description:
      "Build a searchable AI knowledge base for KRVE.",
    icon: Network,
    items: [
      "Knowledge Sources",
      "Department Knowledge",
      "Policies",
      "SOPs",
      "Training Content",
      "Product Knowledge",
      "Customer Knowledge",
      "Vendor Knowledge",
      "Legal Knowledge",
      "Knowledge Search",
      "Knowledge Gaps",
      "Knowledge Reports",
    ],
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    description:
      "Predict customer, employee, financial and operational outcomes.",
    icon: Gauge,
    items: [
      "Customer Churn",
      "Customer LTV",
      "Employee Attrition",
      "Payment Delay",
      "Vendor Delay",
      "Stockout Risk",
      "Fraud Risk",
      "Project Delay",
      "Revenue Risk",
      "Prediction Confidence",
      "Prediction Review",
      "Prediction Reports",
    ],
  },
  {
    id: "ai-insights",
    title: "AI Insights Center",
    description:
      "View generated insights, trends and recommended actions.",
    icon: Sparkles,
    items: [
      "Executive Insights",
      "Finance Insights",
      "HR Insights",
      "Marketing Insights",
      "Customer Insights",
      "Procurement Insights",
      "Risk Insights",
      "Legal Insights",
      "Operations Insights",
      "Insight Priority",
      "Insight Actions",
      "Insight History",
    ],
  },
  {
    id: "prompt-library",
    title: "Prompt Library",
    description:
      "Manage approved prompts and reusable AI instructions.",
    icon: FileText,
    items: [
      "Founder Prompts",
      "Finance Prompts",
      "HR Prompts",
      "Marketing Prompts",
      "Support Prompts",
      "Procurement Prompts",
      "Legal Prompts",
      "Risk Prompts",
      "Document Prompts",
      "Prompt Templates",
      "Prompt Versions",
      "Prompt Reports",
    ],
  },
  {
    id: "model-management",
    title: "AI Model Management",
    description:
      "Control model selection, configuration and performance.",
    icon: BrainCircuit,
    items: [
      "Model Registry",
      "Active Models",
      "Model Configuration",
      "Model Routing",
      "Model Version",
      "Model Cost",
      "Model Latency",
      "Model Accuracy",
      "Fallback Models",
      "Model Testing",
      "Model History",
      "Model Reports",
    ],
  },
  {
    id: "ai-governance",
    title: "AI Governance",
    description:
      "Manage responsible AI, approvals, access and accountability.",
    icon: ShieldCheck,
    items: [
      "AI Policy",
      "AI Use Cases",
      "Risk Classification",
      "Human Review",
      "Approval Matrix",
      "Department Access",
      "Data Permissions",
      "Decision Accountability",
      "Bias Review",
      "Governance Actions",
      "Governance History",
      "Governance Reports",
    ],
  },
  {
    id: "ai-security",
    title: "AI Security & Privacy",
    description:
      "Protect enterprise data, prompts and AI interactions.",
    icon: ShieldCheck,
    items: [
      "Data Access Rules",
      "Sensitive Data Controls",
      "Prompt Security",
      "Output Filtering",
      "User Permissions",
      "Department Isolation",
      "Conversation Privacy",
      "Data Retention",
      "Security Alerts",
      "Incident Review",
      "Security Audit",
      "Security Reports",
    ],
  },
  {
    id: "ai-monitoring",
    title: "AI Monitoring",
    description:
      "Monitor AI usage, cost, quality and service health.",
    icon: Activity,
    items: [
      "Usage Dashboard",
      "Token Usage",
      "Cost Monitoring",
      "Response Time",
      "Success Rate",
      "Error Rate",
      "Automation Health",
      "Agent Health",
      "Department Usage",
      "Usage Alerts",
      "Monitoring History",
      "Monitoring Reports",
    ],
  },
  {
    id: "ai-training-feedback",
    title: "AI Feedback & Improvement",
    description:
      "Review answers, collect feedback and improve AI performance.",
    icon: CheckCircle2,
    items: [
      "Answer Feedback",
      "Helpful Answers",
      "Incorrect Answers",
      "Correction Queue",
      "Human Review",
      "Training Examples",
      "Knowledge Updates",
      "Prompt Improvement",
      "Agent Improvement",
      "Quality Score",
      "Improvement History",
      "Improvement Reports",
    ],
  },
  {
    id: "ai-reports",
    title: "AI Reports",
    description:
      "Generate usage, savings, quality and governance reports.",
    icon: FileBarChart,
    items: [
      "Executive AI Report",
      "Usage Report",
      "Cost Report",
      "Savings Report",
      "Automation Report",
      "Agent Report",
      "Quality Report",
      "Forecast Report",
      "Risk Report",
      "Governance Report",
      "Security Report",
      "Custom Reports",
    ],
  },
  {
    id: "ai-settings",
    title: "AI Settings",
    description:
      "Configure models, permissions, automations and notifications.",
    icon: Settings2,
    items: [
      "Default Model",
      "Department Models",
      "AI Permissions",
      "Agent Permissions",
      "Automation Rules",
      "Data Sources",
      "Knowledge Sources",
      "Notification Settings",
      "Cost Limits",
      "Review Rules",
      "Roles",
      "Integrations",
    ],
  },
];

const dashboardMetrics = [
  ["AI Analyses Today", "Live", "Connected to KEOS", Sparkles],
  ["Automations Active", "—", "Live KEOS data", Workflow],
  ["Decisions Assisted", "—", "Live KEOS data", Lightbulb],
  ["AI Status", "ONLINE", "KRVE AI ready", Zap],
];

export default function KrveAICenterManagement() {
  const [selectedModule, setSelectedModule] = useState<AIModule | null>(null);
  const [showAI, setShowAI] = useState(false);
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

  if (showAI) {
    return <AskKRVEAIWorkspace onBack={() => setShowAI(false)} />;
  }

  if (selectedModule) {
    if (selectedModule.id === "enterprise-ai-chat") {
      return <AskKRVEAIWorkspace onBack={() => setSelectedModule(null)} />;
    }

    return (
      <ModuleWorkspace
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <Hero onAskAI={() => setShowAI(true)} />

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
            placeholder="Search AI modules, agents or automations..."
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
            Complete KRVE AI Operations
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Ask KRVE AI anything or open an AI workspace.
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

function Hero({ onAskAI }: { onAskAI: () => void }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <Sparkles size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Enterprise Intelligence
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            KRVE AI Center
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Your intelligent KRVE + KEOS assistant. Ask questions about
            business data, sales, finance, HR, inventory, candidates,
            customers, products, orders and operations.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onAskAI}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-violet-700 shadow-lg transition hover:bg-violet-50"
          >
            <Sparkles size={17} />
            Ask KRVE AI
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20"
          >
            <Workflow size={17} />
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
  module: AIModule;
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

function AskKRVEAIWorkspace({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    "KRVE ka founder kaun hai?",
    "August 2026 me kitni sales hui?",
    "Inventory me black T-shirts kitni hain?",
    "Kitne candidates select hue?",
    "KRVE ke current orders ka summary do.",
    "KRVE ka business status batao.",
  ];

  async function askAI(question: string) {
    const trimmed = question.trim();

    if (!trimmed || loading) return;

    setInput("");
    setError("");

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
    };

    setMessages((previous) => [...previous, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/keos-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          role: "founder",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "KRVE AI could not process the request.",
        );
      }

      const answer =
        typeof data?.answer === "string"
          ? data.answer
          : "I could not generate an answer.";

      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: answer,
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while contacting KRVE AI.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askAI(input);
  }

  function newConversation() {
    setMessages([]);
    setInput("");
    setError("");
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md">
                <Sparkles size={22} />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-black text-slate-950">
                  Ask KRVE AI
                </h1>

                <div className="mt-0.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-slate-500">
                    Connected to KEOS intelligence
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={newConversation}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">
            {messages.length === 0 ? (
              <EmptyAIState
                suggestions={suggestions}
                onSuggestion={(value) => void askAI(value)}
              />
            ) : (
              <div className="mx-auto max-w-4xl space-y-6">
                {messages.map((message) => (
                  <ChatBubble key={message.id} message={message} />
                ))}

                {loading && (
                  <div className="flex items-start gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-600">
                      <Sparkles size={18} />
                    </div>

                    <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500" />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-violet-500"
                          style={{ animationDelay: "120ms" }}
                        />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-violet-500"
                          style={{ animationDelay: "240ms" }}
                        />
                        <span className="ml-2 text-xs font-medium text-slate-500">
                          KRVE AI is checking KEOS data...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold">KRVE AI Error</p>
                        <p className="mt-1">{error}</p>

                        <button
                          type="button"
                          onClick={() => setError("")}
                          className="mt-3 text-xs font-bold underline"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white p-4 sm:p-6">
            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-4xl"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-slate-300 bg-slate-50 p-2 transition focus-within:border-violet-500 focus-within:bg-white focus-within:shadow-md">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void askAI(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask anything about KRVE or KEOS..."
                  className="max-h-40 min-h-[48px] flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  disabled={loading}
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <RefreshCw size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-slate-400">
                KRVE AI uses available KEOS business data for KRVE-specific
                questions. It will not invent unavailable figures.
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

function EmptyAIState({
  suggestions,
  onSuggestion,
}: {
  suggestions: string[];
  onSuggestion: (value: string) => void;
}) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-10 text-center sm:py-16">
      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-violet-100 to-blue-100 text-violet-600">
        <Sparkles size={38} />
      </div>

      <h2 className="mt-7 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        What can I help you with?
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
        Ask KRVE AI about your business. It can analyse connected KEOS data
        across sales, orders, products, inventory, customers, candidates,
        projects and other available enterprise records.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestion(suggestion)}
            className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-violet-300 hover:bg-violet-50/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-700">
                {suggestion}
              </span>

              <ArrowRight
                size={16}
                className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-600"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const [copied, setCopied] = useState(false);

  async function copyAnswer() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Clipboard permission can be unavailable in some environments.
    }
  }

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-violet-600 px-5 py-3.5 text-sm leading-7 text-white shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-600">
        <Sparkles size={18} />
      </div>

      <div className="min-w-0 max-w-[90%]">
        <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-700 shadow-sm">
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>

        <button
          type="button"
          onClick={() => void copyAnswer()}
          className="mt-2 flex items-center gap-1.5 px-2 text-xs font-semibold text-slate-400 transition hover:text-slate-700"
        >
          <Copy size={13} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function ModuleWorkspace({
  module,
  onBack,
}: {
  module: AIModule;
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
          Back to KRVE AI Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                AI Workspace
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {module.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
              {module.description}
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700"
          >
            <Plus size={17} />
            Create New
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric
          title="Active Records"
          value="—"
          note="Live module data"
          icon={Activity}
        />

        <WorkspaceMetric
          title="Pending Actions"
          value="—"
          note="Current module"
          icon={BellRing}
        />

        <WorkspaceMetric
          title="Success Rate"
          value="—"
          note="Live AI data"
          icon={CheckCircle2}
        />

        <WorkspaceMetric
          title="Reports"
          value="—"
          note="Available exports"
          icon={FileBarChart}
        />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its AI workflow.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600"
          >
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
    MessageSquare,
    BrainCircuit,
    Workflow,
    Bot,
    Lightbulb,
    LineChart,
    AlertTriangle,
    FileSearch,
    Network,
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
