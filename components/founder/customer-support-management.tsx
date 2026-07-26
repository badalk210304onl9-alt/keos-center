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
  CircleHelp,
  Clock3,
  FileBarChart,
  FileText,
  Headphones,
  Inbox,
  LifeBuoy,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Tags,
  TicketCheck,
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

type ModuleId =
  | "support-dashboard"
  | "ticket-management"
  | "live-chat"
  | "call-support"
  | "email-support"
  | "whatsapp-support"
  | "social-support"
  | "complaint-management"
  | "order-support"
  | "return-refund-support"
  | "payment-support"
  | "delivery-support"
  | "sla-management"
  | "escalation-management"
  | "agent-management"
  | "queue-management"
  | "knowledge-base"
  | "macros-automation"
  | "customer-feedback"
  | "quality-assurance"
  | "workforce-management"
  | "support-analytics"
  | "support-reports"
  | "support-settings"
  | "krve-ai-support";

type SupportModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: SupportModule[] = [
  {
    id: "support-dashboard",
    title: "Support Dashboard",
    description: "View tickets, queues, SLA, response and service quality.",
    icon: BarChart3,
    items: [
      "Open Tickets",
      "High Priority Tickets",
      "First Response Time",
      "Resolution Rate",
      "SLA Compliance",
      "CSAT",
      "Agent Productivity",
      "Channel Performance",
      "AI Insights",
    ],
  },
  {
    id: "ticket-management",
    title: "Ticket Management",
    description: "Create, assign, prioritise and resolve support tickets.",
    icon: TicketCheck,
    items: [
      "Create Ticket",
      "Open Tickets",
      "Pending Tickets",
      "Resolved Tickets",
      "Closed Tickets",
      "Ticket Assignment",
      "Ticket Priority",
      "Ticket Tags",
      "Internal Notes",
      "Ticket History",
      "Bulk Actions",
      "Ticket Export",
    ],
  },
  {
    id: "live-chat",
    title: "Live Chat",
    description: "Manage real-time website and app customer conversations.",
    icon: MessageCircle,
    items: [
      "Live Queue",
      "Active Chats",
      "Waiting Chats",
      "Chat Assignment",
      "Chat Transfer",
      "Canned Responses",
      "Chat Notes",
      "Chat History",
      "Customer Context",
      "Chat Satisfaction",
      "Offline Messages",
      "Chat Reports",
    ],
  },
  {
    id: "call-support",
    title: "Call Support",
    description: "Manage inbound, outbound and callback support operations.",
    icon: Phone,
    items: [
      "Inbound Calls",
      "Outbound Calls",
      "Callback Requests",
      "Call Queue",
      "Call Recording",
      "Call Notes",
      "Call Disposition",
      "Missed Calls",
      "IVR Routing",
      "Agent Availability",
      "Call History",
      "Call Reports",
    ],
  },
  {
    id: "email-support",
    title: "Email Support",
    description: "Handle support emails, templates and shared inboxes.",
    icon: Mail,
    items: [
      "Support Inbox",
      "New Emails",
      "Assigned Emails",
      "Pending Replies",
      "Email Templates",
      "Email Signatures",
      "Auto Replies",
      "Email Routing",
      "Attachments",
      "Email History",
      "Spam Control",
      "Email Reports",
    ],
  },
  {
    id: "whatsapp-support",
    title: "WhatsApp Support",
    description: "Manage WhatsApp service conversations and templates.",
    icon: MessageSquare,
    items: [
      "WhatsApp Inbox",
      "Active Conversations",
      "Template Messages",
      "Order Updates",
      "Return Updates",
      "Payment Updates",
      "Agent Assignment",
      "Conversation Transfer",
      "Opt-in Status",
      "Conversation History",
      "WhatsApp Automation",
      "WhatsApp Reports",
    ],
  },
  {
    id: "social-support",
    title: "Social Media Support",
    description: "Handle customer service from social channels.",
    icon: Users,
    items: [
      "Social Inbox",
      "Comments",
      "Direct Messages",
      "Mentions",
      "Complaint Detection",
      "Agent Assignment",
      "Response Templates",
      "Escalations",
      "Sentiment",
      "Conversation History",
      "Social SLA",
      "Social Reports",
    ],
  },
  {
    id: "complaint-management",
    title: "Complaint Management",
    description: "Track complaints, root causes and corrective actions.",
    icon: AlertTriangle,
    items: [
      "New Complaints",
      "Open Complaints",
      "Complaint Categories",
      "Complaint Priority",
      "Investigation",
      "Root Cause",
      "Corrective Action",
      "Customer Communication",
      "Complaint Escalation",
      "Resolution Approval",
      "Complaint History",
      "Complaint Reports",
    ],
  },
  {
    id: "order-support",
    title: "Order Support",
    description: "Resolve order creation, modification and status issues.",
    icon: Inbox,
    items: [
      "Order Lookup",
      "Order Status",
      "Order Modification",
      "Address Change",
      "Order Cancellation",
      "Duplicate Order",
      "Missing Item",
      "Wrong Item",
      "Order Notes",
      "Customer Updates",
      "Escalation",
      "Order Support Reports",
    ],
  },
  {
    id: "return-refund-support",
    title: "Returns & Refund Support",
    description: "Handle return, exchange and refund customer queries.",
    icon: LifeBuoy,
    items: [
      "Return Request",
      "Exchange Request",
      "Refund Status",
      "Return Eligibility",
      "Pickup Status",
      "Inspection Status",
      "Refund Approval",
      "Wallet Refund",
      "Bank Refund",
      "Return Escalation",
      "Customer Updates",
      "Return Support Reports",
    ],
  },
  {
    id: "payment-support",
    title: "Payment Support",
    description: "Resolve failed, duplicate and pending payment issues.",
    icon: ShieldCheck,
    items: [
      "Payment Lookup",
      "Failed Payment",
      "Pending Payment",
      "Duplicate Payment",
      "Payment Reversal",
      "COD Issues",
      "Gateway Issues",
      "Refund Tracking",
      "Payment Proof",
      "Finance Escalation",
      "Customer Updates",
      "Payment Support Reports",
    ],
  },
  {
    id: "delivery-support",
    title: "Delivery Support",
    description: "Resolve shipment delays, NDR and delivery exceptions.",
    icon: Clock3,
    items: [
      "Shipment Lookup",
      "Delivery Status",
      "Delayed Delivery",
      "NDR Cases",
      "Address Issue",
      "Customer Unavailable",
      "Damaged Shipment",
      "Lost Shipment",
      "Reattempt Request",
      "Courier Escalation",
      "Customer Updates",
      "Delivery Support Reports",
    ],
  },
  {
    id: "sla-management",
    title: "SLA Management",
    description: "Configure and monitor response and resolution commitments.",
    icon: Clock3,
    items: [
      "SLA Dashboard",
      "Response SLA",
      "Resolution SLA",
      "Priority Rules",
      "Business Hours",
      "Holiday Rules",
      "SLA Breaches",
      "SLA Warnings",
      "Escalation Rules",
      "SLA Exceptions",
      "SLA History",
      "SLA Reports",
    ],
  },
  {
    id: "escalation-management",
    title: "Escalation Management",
    description: "Manage service escalations and ownership changes.",
    icon: BellRing,
    items: [
      "Escalation Queue",
      "Priority Escalations",
      "Manager Escalations",
      "Department Escalations",
      "Founder Escalations",
      "Escalation Matrix",
      "Escalation Notes",
      "Ownership Transfer",
      "Resolution Approval",
      "Escalation History",
      "Escalation SLA",
      "Escalation Reports",
    ],
  },
  {
    id: "agent-management",
    title: "Agent Management",
    description: "Manage support employees, skills and performance.",
    icon: UserCheck,
    items: [
      "Agent Directory",
      "Agent Profiles",
      "Skills",
      "Channel Access",
      "Department Access",
      "Shift Assignment",
      "Availability",
      "Workload",
      "Performance",
      "Coaching",
      "Agent Status",
      "Agent Reports",
    ],
  },
  {
    id: "queue-management",
    title: "Queue Management",
    description: "Control routing, workload and service queues.",
    icon: Workflow,
    items: [
      "Queue Dashboard",
      "Ticket Queues",
      "Chat Queues",
      "Call Queues",
      "Email Queues",
      "WhatsApp Queues",
      "Routing Rules",
      "Priority Routing",
      "Skill-Based Routing",
      "Overflow Rules",
      "Queue Capacity",
      "Queue Reports",
    ],
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description: "Create help articles, SOPs and agent guidance.",
    icon: FileText,
    items: [
      "Knowledge Dashboard",
      "Help Articles",
      "FAQs",
      "Agent SOPs",
      "Troubleshooting Guides",
      "Product Guides",
      "Policy Articles",
      "Article Categories",
      "Article Approval",
      "Article Search",
      "Article Feedback",
      "Knowledge Reports",
    ],
  },
  {
    id: "macros-automation",
    title: "Macros & Automation",
    description: "Automate repetitive support actions and responses.",
    icon: Bot,
    items: [
      "Response Macros",
      "Ticket Automation",
      "Auto Assignment",
      "Auto Tagging",
      "Auto Prioritisation",
      "Auto Escalation",
      "Status Automation",
      "Notification Rules",
      "Workflow Builder",
      "Trigger Rules",
      "Automation History",
      "Automation Reports",
    ],
  },
  {
    id: "customer-feedback",
    title: "Customer Feedback",
    description: "Track CSAT, NPS and post-resolution feedback.",
    icon: Star,
    items: [
      "CSAT Dashboard",
      "CSAT Surveys",
      "NPS Surveys",
      "Post-chat Feedback",
      "Post-call Feedback",
      "Post-ticket Feedback",
      "Negative Feedback",
      "Positive Feedback",
      "Feedback Tags",
      "Follow-up Actions",
      "Feedback History",
      "Feedback Reports",
    ],
  },
  {
    id: "quality-assurance",
    title: "Quality Assurance",
    description: "Review service quality, compliance and coaching needs.",
    icon: CheckCircle2,
    items: [
      "QA Dashboard",
      "Ticket Review",
      "Chat Review",
      "Call Review",
      "Email Review",
      "QA Scorecards",
      "Compliance Checks",
      "Calibration Sessions",
      "Coaching Actions",
      "Quality Trends",
      "Agent QA History",
      "QA Reports",
    ],
  },
  {
    id: "workforce-management",
    title: "Support Workforce",
    description: "Plan shifts, capacity and agent utilisation.",
    icon: Users,
    items: [
      "Workforce Dashboard",
      "Demand Forecast",
      "Shift Planning",
      "Roster",
      "Break Planning",
      "Capacity Planning",
      "Occupancy",
      "Utilisation",
      "Absence Management",
      "Overtime",
      "Schedule Adherence",
      "Workforce Reports",
    ],
  },
  {
    id: "support-analytics",
    title: "Support Analytics",
    description: "Analyse demand, productivity, SLA and satisfaction.",
    icon: Activity,
    items: [
      "Ticket Analytics",
      "Channel Analytics",
      "Agent Analytics",
      "Queue Analytics",
      "SLA Analytics",
      "Resolution Analytics",
      "CSAT Analytics",
      "Complaint Analytics",
      "Escalation Analytics",
      "Workforce Analytics",
      "Cost per Contact",
      "AI Predictions",
    ],
  },
  {
    id: "support-reports",
    title: "Support Reports",
    description: "Generate service, SLA, agent and quality reports.",
    icon: FileBarChart,
    items: [
      "Executive Support Report",
      "Ticket Report",
      "Channel Report",
      "SLA Report",
      "Agent Performance Report",
      "Queue Report",
      "Complaint Report",
      "Escalation Report",
      "CSAT Report",
      "QA Report",
      "Workforce Report",
      "Custom Reports",
    ],
  },
  {
    id: "support-settings",
    title: "Support Settings",
    description: "Configure channels, routing, SLA and permissions.",
    icon: Settings2,
    items: [
      "Ticket Status",
      "Ticket Priority",
      "Ticket Categories",
      "Channel Settings",
      "SLA Rules",
      "Routing Rules",
      "Escalation Matrix",
      "Business Hours",
      "Notification Settings",
      "Agent Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-support",
    title: "KRVE AI Support",
    description: "Use AI for summaries, routing, replies and service insights.",
    icon: Sparkles,
    items: [
      "AI Ticket Summary",
      "AI Reply Assistant",
      "AI Intent Detection",
      "AI Sentiment Analysis",
      "AI Priority Detection",
      "AI Auto Routing",
      "AI Suggested Solution",
      "AI Knowledge Search",
      "AI Escalation Prediction",
      "AI Quality Review",
      "AI Workforce Forecast",
      "AI Support Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Open Tickets", "42", "12 high priority", Headphones],
  ["First Response", "6m 18s", "Average response time", Clock3],
  ["Resolution Rate", "92.4%", "Within SLA", CheckCircle2],
  ["CSAT", "4.7/5", "Based on 1,284 ratings", Star],
];

export default function CustomerSupportManagement() {
  const [selectedModule, setSelectedModule] =
    useState<SupportModule | null>(null);
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
            placeholder="Search support modules, channels or workflows..."
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
            Complete Customer Support Operations
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete support workspace.
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
              <Headphones size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Customer Service Center
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Customer Support Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete customer service covering tickets, live chat, calls,
            email, WhatsApp, complaints, SLA, escalations, knowledge, quality,
            workforce, analytics and KRVE AI Support.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Inbox size={17} />
            Open Live Queue
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Create Ticket
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
  module: SupportModule;
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
  module: SupportModule;
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
          Back to Support Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Support Workspace
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
              Tap any feature to open its support workflow.
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
    TicketCheck,
    MessageCircle,
    Phone,
    Mail,
    MessageSquare,
    AlertTriangle,
    Clock3,
    UserCheck,
    FileText,
    Workflow,
    Star,
    Bot,
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