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
  Cloud,
  Database,
  Download,
  FileBarChart,
  FileClock,
  FileCog,
  FileText,
  Gauge,
  History,
  KeyRound,
  LockKeyhole,
  Network,
  Plug,
  Plus,
  Search,
  ServerCog,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserCog,
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

type AdministrationModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: AdministrationModule[] = [
  {
    id: "admin-dashboard",
    title: "Administration Dashboard",
    description:
      "View users, roles, integrations, security posture and system administration health.",
    icon: BarChart3,
    items: [
      "System Users",
      "Roles",
      "Integrations",
      "Security Score",
      "Active Sessions",
      "Pending Access Reviews",
      "System Alerts",
      "Configuration Changes",
      "AI Insights",
    ],
  },
  {
    id: "users-management",
    title: "Users Management",
    description:
      "Create, activate, suspend and manage all KEOS users.",
    icon: Users,
    items: [
      "User Directory",
      "Add User",
      "Edit User",
      "Activate User",
      "Suspend User",
      "Reset Password",
      "Unlock Account",
      "User Status",
      "User Sessions",
      "User Devices",
      "User History",
      "User Reports",
    ],
  },
  {
    id: "roles-management",
    title: "Roles Management",
    description:
      "Create enterprise roles and assign controlled access.",
    icon: UserCog,
    items: [
      "Role Directory",
      "Create Role",
      "Edit Role",
      "Clone Role",
      "Role Permissions",
      "Role Members",
      "Role Hierarchy",
      "Department Role",
      "Founder Role",
      "Role Review",
      "Role History",
      "Role Reports",
    ],
  },
  {
    id: "permissions-management",
    title: "Permissions Management",
    description:
      "Control module, action, record and field-level permissions.",
    icon: KeyRound,
    items: [
      "Module Permissions",
      "Action Permissions",
      "Record Permissions",
      "Field Permissions",
      "View Access",
      "Create Access",
      "Edit Access",
      "Delete Access",
      "Export Access",
      "Approval Access",
      "Permission History",
      "Permission Reports",
    ],
  },
  {
    id: "departments-management",
    title: "Departments Management",
    description:
      "Create departments, reporting structures and department access rules.",
    icon: Building2,
    items: [
      "Department Directory",
      "Create Department",
      "Edit Department",
      "Department Head",
      "Department Members",
      "Department Roles",
      "Department Modules",
      "Department KPIs",
      "Department Status",
      "Department Archive",
      "Department History",
      "Department Reports",
    ],
  },
  {
    id: "access-control",
    title: "Access Control",
    description:
      "Manage role-based, department-based and founder-level access.",
    icon: LockKeyhole,
    items: [
      "Role-Based Access",
      "Department Access",
      "Founder Access",
      "Employee Access",
      "Temporary Access",
      "Restricted Access",
      "Emergency Access",
      "Access Requests",
      "Access Approval",
      "Access Review",
      "Access History",
      "Access Reports",
    ],
  },
  {
    id: "user-provisioning",
    title: "User Provisioning",
    description:
      "Automate onboarding, credential creation and access assignment.",
    icon: UserCheck,
    items: [
      "Create Credentials",
      "Assign Department",
      "Assign Role",
      "Assign Manager",
      "Assign Modules",
      "Generate User ID",
      "Temporary Password",
      "Welcome Email",
      "Onboarding Checklist",
      "Provisioning Status",
      "Provisioning History",
      "Provisioning Reports",
    ],
  },
  {
    id: "user-deprovisioning",
    title: "User Deprovisioning",
    description:
      "Remove access safely when employees exit or change roles.",
    icon: UserCog,
    items: [
      "Deactivate User",
      "Revoke Sessions",
      "Remove Roles",
      "Remove Permissions",
      "Transfer Ownership",
      "Disable Email",
      "Archive Records",
      "Exit Checklist",
      "Deprovisioning Approval",
      "Deprovisioning Status",
      "Deprovisioning History",
      "Deprovisioning Reports",
    ],
  },
  {
    id: "session-management",
    title: "Session Management",
    description:
      "Monitor active sessions, devices, locations and forced sign-outs.",
    icon: Activity,
    items: [
      "Active Sessions",
      "Session Details",
      "User Devices",
      "Login Location",
      "Session Duration",
      "Concurrent Sessions",
      "Suspicious Sessions",
      "Force Sign-Out",
      "Session Timeout",
      "Session Policy",
      "Session History",
      "Session Reports",
    ],
  },
  {
    id: "security-management",
    title: "Security Management",
    description:
      "Control authentication, passwords, MFA and enterprise security rules.",
    icon: ShieldCheck,
    items: [
      "Password Policy",
      "MFA Settings",
      "Login Policy",
      "Account Lockout",
      "Session Security",
      "Device Trust",
      "IP Restrictions",
      "Data Protection",
      "Security Alerts",
      "Security Review",
      "Security History",
      "Security Reports",
    ],
  },
  {
    id: "authentication-settings",
    title: "Authentication Settings",
    description:
      "Configure login, password, SSO and identity controls.",
    icon: KeyRound,
    items: [
      "User ID Login",
      "Password Login",
      "SSO Configuration",
      "MFA Configuration",
      "Login Attempt Limit",
      "Password Expiry",
      "Password Complexity",
      "Forgot Password Policy",
      "Trusted Devices",
      "Authentication Logs",
      "Authentication History",
      "Authentication Reports",
    ],
  },
  {
    id: "integration-management",
    title: "Integration Management",
    description:
      "Connect and govern third-party systems and services.",
    icon: Plug,
    items: [
      "Integration Directory",
      "Add Integration",
      "Configure Integration",
      "Enable Integration",
      "Disable Integration",
      "API Credentials",
      "Webhook Settings",
      "Data Mapping",
      "Sync Schedule",
      "Integration Health",
      "Integration Logs",
      "Integration Reports",
    ],
  },
  {
    id: "api-management",
    title: "API Management",
    description:
      "Manage APIs, tokens, keys, scopes and usage limits.",
    icon: Network,
    items: [
      "API Directory",
      "Create API Key",
      "Revoke API Key",
      "API Scopes",
      "API Permissions",
      "Rate Limits",
      "IP Whitelist",
      "API Usage",
      "API Errors",
      "API Health",
      "API History",
      "API Reports",
    ],
  },
  {
    id: "webhook-management",
    title: "Webhook Management",
    description:
      "Configure event webhooks, delivery and retry rules.",
    icon: Workflow,
    items: [
      "Webhook Directory",
      "Create Webhook",
      "Webhook Events",
      "Webhook URL",
      "Webhook Secret",
      "Delivery Status",
      "Failed Deliveries",
      "Retry Rules",
      "Webhook Logs",
      "Webhook Testing",
      "Webhook History",
      "Webhook Reports",
    ],
  },
  {
    id: "system-configuration",
    title: "System Configuration",
    description:
      "Configure global KEOS behaviour and enterprise defaults.",
    icon: ServerCog,
    items: [
      "Company Settings",
      "System Name",
      "Default Language",
      "Default Currency",
      "Date Format",
      "Time Zone",
      "Number Formats",
      "Fiscal Year",
      "Business Hours",
      "Feature Controls",
      "Configuration History",
      "Configuration Reports",
    ],
  },
  {
    id: "master-data",
    title: "Master Data Management",
    description:
      "Control core enterprise master records and reference data.",
    icon: Database,
    items: [
      "Country Master",
      "State Master",
      "City Master",
      "Currency Master",
      "Tax Master",
      "Department Master",
      "Designation Master",
      "Category Master",
      "Unit Master",
      "Status Master",
      "Master Data History",
      "Master Data Reports",
    ],
  },
  {
    id: "workflow-configuration",
    title: "Workflow Configuration",
    description:
      "Configure approvals, escalations and enterprise workflow rules.",
    icon: Workflow,
    items: [
      "Workflow Directory",
      "Create Workflow",
      "Approval Matrix",
      "Escalation Rules",
      "Delegation Rules",
      "SLA Rules",
      "Department Workflow",
      "Founder Approval",
      "Workflow Testing",
      "Workflow Status",
      "Workflow History",
      "Workflow Reports",
    ],
  },
  {
    id: "notification-settings",
    title: "Notification Settings",
    description:
      "Configure system alerts, emails, WhatsApp and push notifications.",
    icon: BellRing,
    items: [
      "In-App Notifications",
      "Email Notifications",
      "WhatsApp Notifications",
      "SMS Notifications",
      "Push Notifications",
      "Approval Alerts",
      "Security Alerts",
      "System Alerts",
      "Notification Templates",
      "Notification Rules",
      "Notification History",
      "Notification Reports",
    ],
  },
  {
    id: "email-configuration",
    title: "Email Configuration",
    description:
      "Configure outgoing mail, templates and delivery settings.",
    icon: FileText,
    items: [
      "SMTP Settings",
      "Sender Address",
      "Sender Name",
      "Email Templates",
      "Welcome Email",
      "Password Email",
      "Approval Email",
      "Alert Email",
      "Email Queue",
      "Failed Emails",
      "Email History",
      "Email Reports",
    ],
  },
  {
    id: "data-management",
    title: "Data Management",
    description:
      "Manage import, export, cleanup, archival and enterprise data controls.",
    icon: Database,
    items: [
      "Data Import",
      "Data Export",
      "Bulk Update",
      "Duplicate Cleanup",
      "Data Validation",
      "Data Mapping",
      "Data Merge",
      "Data Archive",
      "Data Restore",
      "Data Quality",
      "Data History",
      "Data Reports",
    ],
  },
  {
    id: "backup-restore",
    title: "Backup & Restore",
    description:
      "Control backups, retention, restore points and disaster recovery.",
    icon: Cloud,
    items: [
      "Backup Dashboard",
      "Create Backup",
      "Automatic Backup",
      "Backup Schedule",
      "Backup Retention",
      "Restore Point",
      "Restore Data",
      "Restore Testing",
      "Backup Storage",
      "Backup Status",
      "Backup History",
      "Backup Reports",
    ],
  },
  {
    id: "audit-logs",
    title: "Administration Audit Logs",
    description:
      "Review every administrative and configuration change.",
    icon: History,
    items: [
      "User Changes",
      "Role Changes",
      "Permission Changes",
      "Department Changes",
      "Integration Changes",
      "Security Changes",
      "Configuration Changes",
      "Data Changes",
      "System Changes",
      "Admin Actions",
      "Audit History",
      "Audit Reports",
    ],
  },
  {
    id: "system-monitoring",
    title: "System Monitoring",
    description:
      "Monitor system health, performance, errors and uptime.",
    icon: Activity,
    items: [
      "System Health",
      "Application Health",
      "Database Health",
      "Integration Health",
      "API Health",
      "Queue Health",
      "Error Logs",
      "Performance Metrics",
      "Uptime",
      "Incident Status",
      "Monitoring History",
      "Monitoring Reports",
    ],
  },
  {
    id: "feature-management",
    title: "Feature Management",
    description:
      "Enable, disable and release KEOS features safely.",
    icon: Settings2,
    items: [
      "Feature Directory",
      "Enable Feature",
      "Disable Feature",
      "Beta Features",
      "Department Features",
      "Role Features",
      "Feature Flags",
      "Release Schedule",
      "Feature Approval",
      "Feature Usage",
      "Feature History",
      "Feature Reports",
    ],
  },
  {
    id: "licence-management",
    title: "Licence & Subscription Management",
    description:
      "Track licences, usage, renewals and subscription controls.",
    icon: ClipboardCheck,
    items: [
      "Licence Directory",
      "Active Licences",
      "Assigned Licences",
      "Available Licences",
      "Usage Report",
      "Renewal Dates",
      "Subscription Plan",
      "Billing Details",
      "Licence Alerts",
      "Licence Approval",
      "Licence History",
      "Licence Reports",
    ],
  },
  {
    id: "admin-reports",
    title: "Administration Reports",
    description:
      "Generate user, role, security, integration and system reports.",
    icon: FileBarChart,
    items: [
      "User Report",
      "Role Report",
      "Permission Report",
      "Department Report",
      "Access Report",
      "Security Report",
      "Integration Report",
      "API Report",
      "System Health Report",
      "Configuration Report",
      "Audit Report",
      "Custom Reports",
    ],
  },
  {
    id: "admin-settings",
    title: "Administration Settings",
    description:
      "Configure default policies, controls and administrative permissions.",
    icon: Settings2,
    items: [
      "Admin Roles",
      "Admin Permissions",
      "Approval Matrix",
      "Security Defaults",
      "User Defaults",
      "Role Defaults",
      "Department Defaults",
      "Integration Defaults",
      "Notification Defaults",
      "Data Retention",
      "System Limits",
      "Advanced Settings",
    ],
  },
  {
    id: "krve-ai-administration",
    title: "KRVE AI Administration",
    description:
      "Use AI to detect access risks, recommend roles and explain system issues.",
    icon: Sparkles,
    items: [
      "AI Access Review",
      "AI Role Recommendation",
      "AI Permission Review",
      "AI Security Analysis",
      "AI Integration Health",
      "AI System Summary",
      "AI Configuration Review",
      "AI User Risk Detection",
      "AI Admin Recommendations",
      "AI Incident Summary",
      "AI Executive Brief",
      "AI Admin Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["System Users", "148", "132 currently active", Users],
  ["Roles", "18", "Across all departments", UserCog],
  ["Integrations", "14", "12 connected", Plug],
  ["Security Score", "96%", "Enterprise posture", ShieldCheck],
];

export default function AdministrationManagement() {
  const [selectedModule, setSelectedModule] =
    useState<AdministrationModule | null>(null);
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
            placeholder="Search users, roles, permissions or system settings..."
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
            Complete Enterprise Administration
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete administration workspace.
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
              <Settings2 size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Enterprise Administration
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Administration Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Control users, roles, departments, permissions, integrations,
            authentication, security, data, workflows, system configuration and
            complete KEOS administration from one command center.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <UserCog size={17} />
            Create Role
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <Plus size={17} />
            Add User
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
  module: AdministrationModule;
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
  module: AdministrationModule;
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
          Back to Administration
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Administration Workspace
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
              Create New
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric
          title="Active Records"
          value="148"
          note="Current module"
          icon={Activity}
        />
        <WorkspaceMetric
          title="Pending Reviews"
          value="9"
          note="Require attention"
          icon={BellRing}
        />
        <WorkspaceMetric
          title="Security Score"
          value="96%"
          note="Enterprise posture"
          icon={ShieldCheck}
        />
        <WorkspaceMetric
          title="Configuration Changes"
          value="18"
          note="Current month"
          icon={History}
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {["Overview", "Features", "Security", "Activity", "Reports"].map(
              (tab) => (
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
              ),
            )}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "Overview" && <OverviewPanel module={module} />}

          {activeTab === "Features" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {module.items.map((item, index) => (
                <FeatureCard key={item} title={item} index={index} />
              ))}
            </div>
          )}

          {activeTab === "Security" && <SecurityPanel />}

          {activeTab === "Activity" && <ActivityPanel />}

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

function OverviewPanel({ module }: { module: AdministrationModule }) {
  const bars = [52, 61, 68, 64, 75, 81, 88, 96];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              {module.title} Activity
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Current administration cycle
            </p>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            +12.8%
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
        <h3 className="text-lg font-black text-slate-950">System Status</h3>
        <p className="mt-1 text-sm text-slate-500">
          Current enterprise posture
        </p>

        <div className="mt-6 space-y-5">
          {[
            ["Operational", "96%", "bg-green-500"],
            ["Needs Review", "3%", "bg-orange-500"],
            ["Critical", "1%", "bg-red-500"],
          ].map(([label, value, color]) => (
            <div key={label}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">
                  {label}
                </span>
                <span className="text-sm font-black text-slate-950">
                  {value}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: value }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecurityPanel() {
  const controls = [
    ["Password Policy", "Enabled", "Strong"],
    ["Multi-Factor Authentication", "Enabled", "Strong"],
    ["Session Timeout", "30 minutes", "Configured"],
    ["Failed Login Lockout", "5 attempts", "Configured"],
    ["Restricted Admin Access", "Enabled", "Strong"],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {controls.map(([name, value, status], index) => (
        <div
          key={name}
          className={`flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center ${
            index !== controls.length - 1 ? "border-b border-slate-200" : ""
          }`}
        >
          <div>
            <p className="font-bold text-slate-950">{name}</p>
            <p className="mt-1 text-sm text-slate-500">{value}</p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}

function ActivityPanel() {
  const rows = [
    ["BK-001", "Created new Finance Manager role", "2 minutes ago"],
    ["HR-004", "Activated employee account", "18 minutes ago"],
    ["BK-001", "Changed approval permissions", "42 minutes ago"],
    ["IT-002", "Updated integration credentials", "1 hour ago"],
    ["BK-001", "Exported administration report", "2 hours ago"],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {rows.map(([user, action, time], index) => (
        <div
          key={`${user}-${action}`}
          className={`flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center ${
            index !== rows.length - 1 ? "border-b border-slate-200" : ""
          }`}
        >
          <div>
            <p className="font-bold text-slate-950">{action}</p>
            <p className="mt-1 text-sm text-slate-500">{user}</p>
          </div>
          <span className="text-sm font-semibold text-slate-400">{time}</span>
        </div>
      ))}
    </div>
  );
}

function ReportsPanel({ module }: { module: AdministrationModule }) {
  const reports = [
    ["User Access Report", "Complete user and access details", Users],
    ["Security Report", "Security posture and exceptions", ShieldCheck],
    ["Configuration Report", `Configuration summary for ${module.title}`, FileCog],
    ["Administration Audit", "Administrative activity and changes", History],
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
    Users,
    UserCog,
    KeyRound,
    Building2,
    LockKeyhole,
    UserCheck,
    Plug,
    Network,
    ServerCog,
    Database,
    ShieldCheck,
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
        Open and manage the complete {title.toLowerCase()} administration workflow.
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