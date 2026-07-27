"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  BellRing,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileBarChart,
  Mail,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Users,
  Workflow,
  X,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type NotificationModule = {
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

const notificationModules: NotificationModule[] = [
  {
    id: "notifications-dashboard",
    title: "Notifications Dashboard",
    description:
      "Monitor notification volume, delivery performance, active rules and failed messages.",
    features: 10,
    icon: BellRing,
    metric: "4,286",
    metricLabel: "Notifications today",
  },
  {
    id: "notification-rules",
    title: "Notification Rules",
    description:
      "Create event, role, department and priority-based notification rules.",
    features: 12,
    icon: Workflow,
    metric: "68",
    metricLabel: "Active rules",
  },
  {
    id: "system-alerts",
    title: "System Alerts",
    description:
      "Manage operational, security, approval and system-generated alerts.",
    features: 11,
    icon: AlertTriangle,
    metric: "24",
    metricLabel: "Alert types",
  },
  {
    id: "email-notifications",
    title: "Email Notifications",
    description:
      "Configure email templates, senders, routing and delivery tracking.",
    features: 12,
    icon: Mail,
    metric: "98.9%",
    metricLabel: "Email delivery",
  },
  {
    id: "sms-notifications",
    title: "SMS Notifications",
    description:
      "Manage SMS providers, templates, sender IDs and delivery reports.",
    features: 10,
    icon: Smartphone,
    metric: "96.8%",
    metricLabel: "SMS delivery",
  },
  {
    id: "whatsapp-notifications",
    title: "WhatsApp Notifications",
    description:
      "Configure WhatsApp templates, provider routing and message status.",
    features: 11,
    icon: MessageCircle,
    metric: "97.6%",
    metricLabel: "WhatsApp delivery",
  },
  {
    id: "in-app-notifications",
    title: "In-App Notifications",
    description:
      "Manage KEOS alerts, badges, inbox messages and user acknowledgement.",
    features: 10,
    icon: Bell,
    metric: "2,184",
    metricLabel: "In-app alerts",
  },
  {
    id: "role-notifications",
    title: "Role-Based Notifications",
    description:
      "Deliver messages based on role, department, designation and authority.",
    features: 12,
    icon: Users,
    metric: "18",
    metricLabel: "Roles configured",
  },
  {
    id: "approval-notifications",
    title: "Approval Notifications",
    description:
      "Configure approval requests, reminders, escalations and decision alerts.",
    features: 11,
    icon: ClipboardCheck,
    metric: "126",
    metricLabel: "Approval alerts",
  },
  {
    id: "template-management",
    title: "Template Management",
    description:
      "Create reusable templates for email, SMS, WhatsApp and in-app messages.",
    features: 12,
    icon: FileBarChart,
    metric: "84",
    metricLabel: "Templates",
  },
  {
    id: "delivery-monitoring",
    title: "Delivery Monitoring",
    description:
      "Track sent, delivered, failed, retried and acknowledged notifications.",
    features: 10,
    icon: RefreshCw,
    metric: "98.6%",
    metricLabel: "Delivery rate",
  },
  {
    id: "failed-messages",
    title: "Failed Messages",
    description:
      "Review delivery failures, provider errors, retries and unresolved messages.",
    features: 9,
    icon: AlertTriangle,
    metric: "18",
    metricLabel: "Require retry",
  },
  {
    id: "notification-reports",
    title: "Notification Reports",
    description:
      "Generate channel, delivery, failure, template and engagement reports.",
    features: 10,
    icon: FileBarChart,
    metric: "12",
    metricLabel: "Report templates",
  },
  {
    id: "notification-settings",
    title: "Notification Settings",
    description:
      "Configure providers, quiet hours, priorities, retries and delivery defaults.",
    features: 9,
    icon: Settings,
    metric: "Active",
    metricLabel: "Configuration status",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "notifications-dashboard": {
    eyebrow: "Enterprise Communications",
    title: "Notifications Dashboard",
    description:
      "Configure system alerts, email, SMS, WhatsApp and role-based notification delivery.",
    primaryAction: "Create Rule",
    secondaryAction: "Send Notification",
    statistics: [
      { label: "Notifications Today", value: "4,286", note: "Across all channels" },
      { label: "Delivery Rate", value: "98.6%", note: "Current month" },
      { label: "Active Rules", value: "68", note: "Role and event based" },
      { label: "Failed Messages", value: "18", note: "Require retry" },
    ],
    workflows: [
      {
        title: "Rule Management",
        description:
          "Create event, role and priority-based notification rules.",
      },
      {
        title: "Multi-Channel Delivery",
        description:
          "Send through email, SMS, WhatsApp and KEOS in-app alerts.",
      },
      {
        title: "Delivery Monitoring",
        description:
          "Track sent, delivered, failed and acknowledged notifications.",
      },
      {
        title: "Failure & Retry",
        description:
          "Review provider errors and retry unsuccessful messages.",
      },
    ],
  },
  "notification-rules": {
    eyebrow: "Communication Automation",
    title: "Notification Rules",
    description:
      "Create and manage automated notification rules based on events, roles and conditions.",
    primaryAction: "Create Rule",
    secondaryAction: "Test Rule",
    statistics: [
      { label: "Active Rules", value: "68", note: "Currently enabled" },
      { label: "Event Rules", value: "36", note: "System triggered" },
      { label: "Role Rules", value: "22", note: "Role and department based" },
      { label: "Escalation Rules", value: "10", note: "Priority workflows" },
    ],
    workflows: [
      {
        title: "Rule Trigger",
        description:
          "Select the event or condition that starts notification delivery.",
      },
      {
        title: "Recipient Logic",
        description:
          "Define users, roles, departments and escalation recipients.",
      },
      {
        title: "Channel Routing",
        description:
          "Choose email, SMS, WhatsApp and in-app delivery.",
      },
      {
        title: "Testing & Activation",
        description:
          "Test, approve and activate the notification rule.",
      },
    ],
  },
  "delivery-monitoring": {
    eyebrow: "Message Delivery Operations",
    title: "Delivery Monitoring",
    description:
      "Track message status, provider responses, retries and recipient acknowledgement.",
    primaryAction: "Review Delivery",
    secondaryAction: "Retry Failed",
    statistics: [
      { label: "Delivery Rate", value: "98.6%", note: "Current month" },
      { label: "Messages Sent", value: "1.28L", note: "Across channels" },
      { label: "Failed Messages", value: "18", note: "Require retry" },
      { label: "Average Latency", value: "1.8s", note: "All providers" },
    ],
    workflows: [
      {
        title: "Delivery Timeline",
        description:
          "Review sent, delivered, opened and acknowledged statuses.",
      },
      {
        title: "Provider Monitoring",
        description:
          "Compare delivery health across messaging providers.",
      },
      {
        title: "Failure Investigation",
        description:
          "Review error codes, invalid recipients and blocked messages.",
      },
      {
        title: "Retry Management",
        description:
          "Retry failed notifications using controlled rules.",
      },
    ],
  },
  "failed-messages": {
    eyebrow: "Communication Exception Management",
    title: "Failed Messages",
    description:
      "Investigate and resolve failed notifications across all communication channels.",
    primaryAction: "Review Failures",
    secondaryAction: "Retry Messages",
    statistics: [
      { label: "Failed Messages", value: "18", note: "Require retry" },
      { label: "Email Failures", value: "6", note: "Provider or recipient issues" },
      { label: "SMS Failures", value: "7", note: "Invalid or unreachable" },
      { label: "WhatsApp Failures", value: "5", note: "Template or provider issues" },
    ],
    workflows: [
      {
        title: "Failure Queue",
        description:
          "Review all failed messages by channel and reason.",
      },
      {
        title: "Recipient Validation",
        description:
          "Correct invalid email addresses and mobile numbers.",
      },
      {
        title: "Provider Error Review",
        description:
          "Analyse gateway and messaging-provider error responses.",
      },
      {
        title: "Controlled Retry",
        description:
          "Retry corrected messages and record final delivery status.",
      },
    ],
  },
};

export default function NotificationsManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return notificationModules;
    }

    return notificationModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    notificationModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <NotificationWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onCreateRule={() => setShowRuleModal(true)}
          onSend={() => setShowSendModal(true)}
        />

        {showRuleModal && (
          <CreateRuleModal onClose={() => setShowRuleModal(false)} />
        )}

        {showSendModal && (
          <SendNotificationModal onClose={() => setShowSendModal(false)} />
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
                  <BellRing size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">
                  Enterprise Communications
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Configure system alerts, email, SMS, WhatsApp and role-based notification delivery.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => setShowRuleModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
              >
                <Plus size={18} />
                Create Rule
              </button>

              <button
                type="button"
                onClick={() => setShowSendModal(true)}
                className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <Send size={18} />
                Send Notification
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Notifications Today"
            value="4,286"
            description="Across all channels"
            icon={Bell}
            iconClassName="bg-violet-50 text-violet-600"
          />

          <SummaryCard
            title="Delivery Rate"
            value="98.6%"
            description="Current month"
            icon={Send}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="Active Rules"
            value="68"
            description="Role and event based"
            icon={Workflow}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Failed Messages"
            value="18"
            description="Require retry"
            icon={AlertTriangle}
            iconClassName="bg-orange-50 text-orange-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Notification Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Communication Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete notification and delivery workflow.
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
                placeholder="Search notification modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <NotificationModuleCard
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
                No notification module found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different term.
              </p>
            </div>
          )}
        </section>
      </div>

      {showRuleModal && (
        <CreateRuleModal onClose={() => setShowRuleModal(false)} />
      )}

      {showSendModal && (
        <SendNotificationModal onClose={() => setShowSendModal(false)} />
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

function NotificationModuleCard({
  module,
  onOpen,
}: {
  module: NotificationModule;
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

function NotificationWorkspace({
  module,
  onBack,
  onCreateRule,
  onSend,
}: {
  module: NotificationModule;
  onBack: () => void;
  onCreateRule: () => void;
  onSend: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Enterprise Communications",
      title: module.title,
      description: module.description,
      primaryAction: "Create Rule",
      secondaryAction: "Send Notification",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current communication status",
        },
        { label: "Messages Sent", value: "4,286", note: "Current day" },
        { label: "Pending Actions", value: "6", note: "Require review" },
        { label: "Delivery Health", value: "98.6%", note: "Within target" },
      ],
      workflows: [
        {
          title: "Configuration",
          description:
            "Manage rules, recipients, templates and channels.",
        },
        {
          title: "Delivery Workflow",
          description:
            "Send messages and monitor delivery status.",
        },
        {
          title: "Failure Handling",
          description:
            "Review errors, invalid recipients and retries.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate delivery reports and retain audit history.",
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
        Back to Notifications
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
              onClick={onCreateRule}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <Plus size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onSend}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <Send size={17} />
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
            KRVE AI Notification Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Delivery performance is healthy. Eighteen failed messages require retry,
            mainly caused by invalid recipients and provider timeouts.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Delivery rate" value="98.6%" />
            <InsightRow label="Notifications today" value="4,286" />
            <InsightRow label="Active rules" value="68" />
            <InsightRow label="Failed messages" value="18" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
          >
            Generate Notification Analysis
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

function CreateRuleModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Create Notification Rule"
      description="Create an automated event and role-based notification rule."
      icon={Workflow}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Rule Name"
            placeholder="Enter rule name"
          />

          <SelectField
            label="Trigger Event"
            options={[
              "New Approval Request",
              "Approval Completed",
              "Payment Failed",
              "Low Inventory",
              "New Employee Created",
              "Security Alert",
              "System Failure",
              "Custom Event",
            ]}
          />

          <SelectField
            label="Recipients"
            options={[
              "Founder",
              "Department Head",
              "Specific Role",
              "Specific Department",
              "Selected Users",
              "Customer",
              "Vendor",
            ]}
          />

          <SelectField
            label="Priority"
            options={[
              "Low",
              "Normal",
              "High",
              "Critical",
            ]}
          />

          <SelectField
            label="Primary Channel"
            options={[
              "In-App",
              "Email",
              "SMS",
              "WhatsApp",
            ]}
          />

          <SelectField
            label="Fallback Channel"
            options={[
              "None",
              "In-App",
              "Email",
              "SMS",
              "WhatsApp",
            ]}
          />
        </div>

        <div className="mt-5">
          <FormField
            label="Message Subject"
            placeholder="Enter notification subject"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-black text-slate-700">
            Message Template
          </label>
          <textarea
            rows={5}
            placeholder="Enter notification message"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />
            <p className="text-sm leading-6 text-blue-700">
              Notification rules should only send business-relevant information
              to authorised recipients.
            </p>
          </div>
        </div>

        {saved && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-bold text-emerald-700">
              Notification rule created successfully.
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
          onClick={() => setSaved(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Plus size={17} />
          Create Rule
        </button>
      </div>
    </ModalShell>
  );
}

function SendNotificationModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <ModalShell
      title="Send Notification"
      description="Send a controlled notification through one or more channels."
      icon={Send}
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Recipient Type"
            options={[
              "All Employees",
              "Department",
              "Role",
              "Selected Users",
              "Customer",
              "Vendor",
            ]}
          />

          <SelectField
            label="Channel"
            options={[
              "In-App",
              "Email",
              "SMS",
              "WhatsApp",
              "All Available Channels",
            ]}
          />

          <SelectField
            label="Priority"
            options={[
              "Low",
              "Normal",
              "High",
              "Critical",
            ]}
          />

          <SelectField
            label="Delivery"
            options={[
              "Send Now",
              "Schedule",
              "Save as Draft",
            ]}
          />
        </div>

        <div className="mt-5">
          <FormField
            label="Subject"
            placeholder="Enter notification subject"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-black text-slate-700">
            Message
          </label>
          <textarea
            rows={5}
            placeholder="Enter notification message"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-orange-600"
            />
            <p className="text-sm leading-6 text-orange-700">
              High-priority and enterprise-wide messages should be reviewed before sending.
            </p>
          </div>
        </div>

        {sent && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-bold text-emerald-700">
              Notification sent successfully.
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
          onClick={() => setSent(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Send size={17} />
          Send Notification
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

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
      />
    </label>
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