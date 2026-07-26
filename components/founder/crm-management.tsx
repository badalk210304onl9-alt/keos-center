"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileBarChart,
  FileText,
  IndianRupee,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  UserPlus,
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
  | "crm-dashboard"
  | "lead-management"
  | "contact-management"
  | "account-management"
  | "opportunity-management"
  | "sales-pipeline"
  | "follow-up-management"
  | "task-management"
  | "meeting-management"
  | "call-management"
  | "email-management"
  | "whatsapp-management"
  | "sales-automation"
  | "lead-scoring"
  | "territory-management"
  | "sales-targets"
  | "quotation-management"
  | "sales-orders"
  | "customer-360"
  | "forecasting"
  | "crm-analytics"
  | "crm-reports"
  | "crm-settings"
  | "krve-ai-crm";

type CRMModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: CRMModule[] = [
  {
    id: "crm-dashboard",
    title: "CRM Dashboard",
    description: "View leads, opportunities, pipeline, win rate and follow-ups.",
    icon: BarChart3,
    items: [
      "Active Leads",
      "Pipeline Value",
      "Win Rate",
      "Follow-Ups Due",
      "New Opportunities",
      "Sales Activities",
      "Revenue Forecast",
      "Top Sales Owners",
      "AI Insights",
    ],
  },
  {
    id: "lead-management",
    title: "Lead Management",
    description: "Capture, qualify, assign and convert leads.",
    icon: UserPlus,
    items: [
      "Add Lead",
      "Lead Inbox",
      "Lead Sources",
      "Lead Assignment",
      "Lead Qualification",
      "Lead Status",
      "Lead Tags",
      "Lead Notes",
      "Lead Conversion",
      "Lead Import",
      "Lead Export",
      "Lead History",
    ],
  },
  {
    id: "contact-management",
    title: "Contact Management",
    description: "Manage people, communication details and relationships.",
    icon: Users,
    items: [
      "Contact Directory",
      "Add Contact",
      "Contact Details",
      "Communication Preferences",
      "Contact Tags",
      "Contact Notes",
      "Related Accounts",
      "Related Opportunities",
      "Contact Activities",
      "Contact Import",
      "Contact Export",
      "Contact History",
    ],
  },
  {
    id: "account-management",
    title: "Account Management",
    description: "Manage companies, organisations and key accounts.",
    icon: BriefcaseBusiness,
    items: [
      "Account Directory",
      "Add Account",
      "Account Profile",
      "Key Accounts",
      "Account Owner",
      "Account Hierarchy",
      "Account Contacts",
      "Account Opportunities",
      "Account Activities",
      "Account Health",
      "Account Notes",
      "Account Reports",
    ],
  },
  {
    id: "opportunity-management",
    title: "Opportunity Management",
    description: "Track deals from discovery to closure.",
    icon: Target,
    items: [
      "Create Opportunity",
      "Open Opportunities",
      "Opportunity Stages",
      "Opportunity Value",
      "Probability",
      "Expected Close Date",
      "Products & Services",
      "Competitors",
      "Opportunity Notes",
      "Opportunity Team",
      "Won Opportunities",
      "Lost Opportunities",
    ],
  },
  {
    id: "sales-pipeline",
    title: "Sales Pipeline",
    description: "Manage stage-wise deal flow and pipeline movement.",
    icon: Workflow,
    items: [
      "Pipeline Dashboard",
      "Kanban Pipeline",
      "Stage Configuration",
      "Pipeline Value",
      "Stage Conversion",
      "Deal Ageing",
      "Stalled Deals",
      "Pipeline Velocity",
      "Pipeline Coverage",
      "Stage History",
      "Pipeline Filters",
      "Pipeline Reports",
    ],
  },
  {
    id: "follow-up-management",
    title: "Follow-Up Management",
    description: "Plan and track lead and opportunity follow-ups.",
    icon: BellRing,
    items: [
      "Follow-Ups Due",
      "Today Follow-Ups",
      "Overdue Follow-Ups",
      "Call Follow-Up",
      "Email Follow-Up",
      "WhatsApp Follow-Up",
      "Meeting Follow-Up",
      "Reminder Rules",
      "Follow-Up Notes",
      "Follow-Up History",
      "Follow-Up Assignment",
      "Follow-Up Reports",
    ],
  },
  {
    id: "task-management",
    title: "Sales Tasks",
    description: "Manage sales activities, ownership and deadlines.",
    icon: CheckCircle2,
    items: [
      "My Tasks",
      "Team Tasks",
      "Create Task",
      "Task Priority",
      "Task Assignment",
      "Task Due Date",
      "Recurring Tasks",
      "Completed Tasks",
      "Overdue Tasks",
      "Task Notes",
      "Task Calendar",
      "Task Reports",
    ],
  },
  {
    id: "meeting-management",
    title: "Meeting Management",
    description: "Schedule customer meetings and record outcomes.",
    icon: CalendarDays,
    items: [
      "Schedule Meeting",
      "Upcoming Meetings",
      "Meeting Calendar",
      "Meeting Agenda",
      "Meeting Attendees",
      "Meeting Notes",
      "Meeting Outcome",
      "Action Items",
      "Online Meeting Link",
      "Meeting Reminder",
      "Meeting History",
      "Meeting Reports",
    ],
  },
  {
    id: "call-management",
    title: "Call Management",
    description: "Track inbound, outbound and sales calls.",
    icon: Phone,
    items: [
      "Call Queue",
      "Log Call",
      "Inbound Calls",
      "Outbound Calls",
      "Call Notes",
      "Call Outcome",
      "Call Recording",
      "Callback Request",
      "Missed Calls",
      "Call Reminder",
      "Call History",
      "Call Reports",
    ],
  },
  {
    id: "email-management",
    title: "Email Management",
    description: "Manage sales emails, templates and sequences.",
    icon: Mail,
    items: [
      "Email Inbox",
      "Compose Email",
      "Email Templates",
      "Email Sequences",
      "Scheduled Emails",
      "Email Tracking",
      "Open Tracking",
      "Click Tracking",
      "Email Replies",
      "Email Automation",
      "Email History",
      "Email Reports",
    ],
  },
  {
    id: "whatsapp-management",
    title: "WhatsApp CRM",
    description: "Manage sales conversations and templates on WhatsApp.",
    icon: MessageSquare,
    items: [
      "WhatsApp Inbox",
      "New Conversation",
      "Message Templates",
      "Lead Conversations",
      "Opportunity Conversations",
      "Broadcast Lists",
      "Scheduled Messages",
      "Conversation Assignment",
      "Conversation Notes",
      "Conversation History",
      "WhatsApp Automation",
      "WhatsApp Reports",
    ],
  },
  {
    id: "sales-automation",
    title: "Sales Automation",
    description: "Automate lead routing, follow-ups and deal workflows.",
    icon: Sparkles,
    items: [
      "Automation Dashboard",
      "Lead Assignment Rules",
      "Lead Nurturing",
      "Follow-Up Automation",
      "Stage Automation",
      "Task Automation",
      "Email Automation",
      "WhatsApp Automation",
      "Notification Rules",
      "Trigger Rules",
      "Workflow Builder",
      "Automation Reports",
    ],
  },
  {
    id: "lead-scoring",
    title: "Lead Scoring",
    description: "Score leads using fit, behaviour and intent.",
    icon: Target,
    items: [
      "Lead Score Dashboard",
      "Scoring Rules",
      "Profile Score",
      "Behaviour Score",
      "Engagement Score",
      "Intent Score",
      "Hot Leads",
      "Warm Leads",
      "Cold Leads",
      "Score History",
      "Score Thresholds",
      "Lead Scoring Reports",
    ],
  },
  {
    id: "territory-management",
    title: "Territory Management",
    description: "Organise sales ownership by region and market.",
    icon: Users,
    items: [
      "Territory Dashboard",
      "Territory Master",
      "Region Mapping",
      "City Mapping",
      "Account Allocation",
      "Lead Allocation",
      "Sales Owner",
      "Territory Targets",
      "Territory Performance",
      "Territory Reassignment",
      "Territory History",
      "Territory Reports",
    ],
  },
  {
    id: "sales-targets",
    title: "Sales Targets",
    description: "Set targets and track sales team performance.",
    icon: TrendingUp,
    items: [
      "Target Dashboard",
      "Revenue Targets",
      "Lead Targets",
      "Opportunity Targets",
      "Conversion Targets",
      "Individual Targets",
      "Team Targets",
      "Monthly Targets",
      "Quarterly Targets",
      "Target Achievement",
      "Target Variance",
      "Target Reports",
    ],
  },
  {
    id: "quotation-management",
    title: "Quotation Management",
    description: "Create and manage customer quotations and approvals.",
    icon: FileText,
    items: [
      "Create Quotation",
      "Draft Quotations",
      "Quotation Templates",
      "Product Pricing",
      "Discount Approval",
      "Tax Calculation",
      "Quotation Approval",
      "Quotation Sharing",
      "Quotation Acceptance",
      "Quotation Revision",
      "Quotation History",
      "Quotation Reports",
    ],
  },
  {
    id: "sales-orders",
    title: "Sales Orders",
    description: "Convert won opportunities into sales orders.",
    icon: CircleDollarSign,
    items: [
      "Create Sales Order",
      "Open Sales Orders",
      "Order from Opportunity",
      "Order Items",
      "Order Pricing",
      "Order Approval",
      "Order Status",
      "Order Fulfilment",
      "Order Amendment",
      "Order Cancellation",
      "Order History",
      "Sales Order Reports",
    ],
  },
  {
    id: "customer-360",
    title: "Customer 360",
    description: "View complete customer relationship and revenue history.",
    icon: UserCheck,
    items: [
      "Customer Overview",
      "Contacts",
      "Accounts",
      "Leads",
      "Opportunities",
      "Activities",
      "Orders",
      "Revenue",
      "Support Tickets",
      "Communication History",
      "Relationship Health",
      "Customer Timeline",
    ],
  },
  {
    id: "forecasting",
    title: "Revenue Forecasting",
    description: "Forecast sales using pipeline, probability and trends.",
    icon: IndianRupee,
    items: [
      "Forecast Dashboard",
      "Monthly Forecast",
      "Quarterly Forecast",
      "Pipeline Forecast",
      "Weighted Forecast",
      "Commit Forecast",
      "Best Case Forecast",
      "Upside Forecast",
      "Forecast by Owner",
      "Forecast by Territory",
      "Forecast Accuracy",
      "Forecast Reports",
    ],
  },
  {
    id: "crm-analytics",
    title: "CRM Analytics",
    description: "Analyse leads, pipeline, conversion and sales performance.",
    icon: Activity,
    items: [
      "Lead Analytics",
      "Source Analytics",
      "Opportunity Analytics",
      "Pipeline Analytics",
      "Conversion Analytics",
      "Activity Analytics",
      "Sales Owner Analytics",
      "Territory Analytics",
      "Forecast Analytics",
      "Win-Loss Analytics",
      "Customer Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "crm-reports",
    title: "CRM Reports",
    description: "Generate lead, pipeline, activity and revenue reports.",
    icon: FileBarChart,
    items: [
      "CRM Executive Report",
      "Lead Report",
      "Contact Report",
      "Account Report",
      "Opportunity Report",
      "Pipeline Report",
      "Follow-Up Report",
      "Activity Report",
      "Sales Target Report",
      "Forecast Report",
      "Win-Loss Report",
      "Custom Reports",
    ],
  },
  {
    id: "crm-settings",
    title: "CRM Settings",
    description: "Configure stages, fields, automation and permissions.",
    icon: Settings2,
    items: [
      "Lead Status",
      "Lead Sources",
      "Opportunity Stages",
      "Pipeline Settings",
      "Custom Fields",
      "Activity Types",
      "Assignment Rules",
      "Automation Rules",
      "Notification Settings",
      "CRM Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-crm",
    title: "KRVE AI CRM",
    description: "Use AI for scoring, forecasting and next-best actions.",
    icon: Sparkles,
    items: [
      "AI Lead Scoring",
      "AI Opportunity Scoring",
      "AI Win Probability",
      "AI Revenue Forecast",
      "AI Next Best Action",
      "AI Follow-Up Recommendation",
      "AI Email Assistant",
      "AI Call Summary",
      "AI Customer Health",
      "AI Churn Risk",
      "AI Sales Coach",
      "AI CRM Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Active Leads", "286", "74 added this month", UserPlus],
  ["Pipeline Value", "₹48.6L", "Across all stages", IndianRupee],
  ["Win Rate", "31.4%", "Rolling 90 days", TrendingUp],
  ["Follow-Ups Due", "38", "Due today", BellRing],
];

export default function CRMManagement() {
  const [selectedModule, setSelectedModule] = useState<CRMModule | null>(null);
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
            placeholder="Search CRM modules, leads or workflows..."
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
            Complete CRM Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete CRM workspace.
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
              <Users size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Revenue Relationship Management
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            CRM Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete CRM covering leads, contacts, accounts, opportunities,
            pipeline, follow-ups, sales automation, forecasting, analytics and
            KRVE AI CRM.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Target size={17} />
            Create Opportunity
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Add Lead
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
  module: CRMModule;
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
  module: CRMModule;
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
          Back to CRM Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                CRM Workspace
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
        <WorkspaceMetric title="Active Records" value="286" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Actions" value="38" note="Require attention" icon={BellRing} />
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
              Tap any feature to open its CRM workflow.
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
    UserPlus,
    Users,
    BriefcaseBusiness,
    Target,
    Workflow,
    BellRing,
    CheckCircle2,
    CalendarDays,
    Phone,
    Mail,
    MessageSquare,
    IndianRupee,
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