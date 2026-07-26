"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileBarChart,
  FileClock,
  FileText,
  Fingerprint,
  History,
  KeyRound,
  LockKeyhole,
  Mail,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserCog,
  UserMinus,
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

type UsersRolesModule = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: UsersRolesModule[] = [
  {
    id: "users-roles-dashboard",
    title: "Users & Roles Dashboard",
    description:
      "View active users, role distribution, invitations, locked accounts and access health.",
    icon: Users,
    items: [
      "Total Users",
      "Active Users",
      "Inactive Users",
      "Roles",
      "Pending Invites",
      "Locked Accounts",
      "Recent Logins",
      "Access Reviews",
      "AI Insights",
    ],
  },
  {
    id: "user-directory",
    title: "User Directory",
    description:
      "Search and manage all founder, employee and administrator accounts.",
    icon: Users,
    items: [
      "All Users",
      "Active Users",
      "Inactive Users",
      "Suspended Users",
      "Locked Users",
      "Pending Users",
      "Founder Accounts",
      "Administrator Accounts",
      "Employee Accounts",
      "Department Users",
      "User History",
      "User Reports",
    ],
  },
  {
    id: "create-user",
    title: "Create User",
    description:
      "Create secure employee credentials and assign department access.",
    icon: UserPlus,
    items: [
      "Employee ID",
      "Full Name",
      "Work Email",
      "Mobile Number",
      "Department",
      "Designation",
      "Reporting Manager",
      "Primary Role",
      "Module Access",
      "Temporary Password",
      "Activation Date",
      "Send Credentials",
    ],
  },
  {
    id: "user-profile",
    title: "User Profiles",
    description:
      "Maintain identity, employment, contact and account information.",
    icon: UserCog,
    items: [
      "Personal Information",
      "Employment Information",
      "Contact Information",
      "Department Information",
      "Designation",
      "Reporting Manager",
      "Account Status",
      "Role Assignment",
      "Access Summary",
      "Device Summary",
      "Profile History",
      "Profile Reports",
    ],
  },
  {
    id: "role-directory",
    title: "Role Directory",
    description:
      "Manage founder, administrator, department and functional roles.",
    icon: BadgeCheck,
    items: [
      "All Roles",
      "Founder Roles",
      "Administrator Roles",
      "Department Roles",
      "Functional Roles",
      "Custom Roles",
      "Active Roles",
      "Inactive Roles",
      "Role Owners",
      "Role Members",
      "Role History",
      "Role Reports",
    ],
  },
  {
    id: "create-role",
    title: "Create Role",
    description:
      "Build new roles with controlled permissions and approval rules.",
    icon: UserCheck,
    items: [
      "Role Name",
      "Role Code",
      "Role Description",
      "Role Type",
      "Department",
      "Module Permissions",
      "Action Permissions",
      "Approval Limits",
      "Data Scope",
      "Role Owner",
      "Role Review",
      "Publish Role",
    ],
  },
  {
    id: "role-permissions",
    title: "Role Permissions",
    description:
      "Control view, create, edit, approve, export and delete access.",
    icon: KeyRound,
    items: [
      "View Permission",
      "Create Permission",
      "Edit Permission",
      "Delete Permission",
      "Approve Permission",
      "Export Permission",
      "Assign Permission",
      "Manage Permission",
      "Field Permission",
      "Record Permission",
      "Permission History",
      "Permission Reports",
    ],
  },
  {
    id: "department-access",
    title: "Department Access",
    description:
      "Restrict each employee to authorised departments and records.",
    icon: Building2,
    items: [
      "Primary Department",
      "Additional Department",
      "Department Modules",
      "Department Records",
      "Cross-Department Access",
      "Temporary Department Access",
      "Department Approval",
      "Department Head Access",
      "Founder Override",
      "Access Expiry",
      "Department History",
      "Department Reports",
    ],
  },
  {
    id: "module-access",
    title: "Module Access",
    description:
      "Assign access to Finance, HR, Marketing, Support and other KEOS modules.",
    icon: Workflow,
    items: [
      "Commerce Access",
      "Finance Access",
      "HR Access",
      "Marketing Access",
      "Support Access",
      "Procurement Access",
      "CRM Access",
      "Project Access",
      "Legal Access",
      "Risk Access",
      "AI Access",
      "Administration Access",
    ],
  },
  {
    id: "account-status",
    title: "Account Status Management",
    description:
      "Activate, suspend, lock, unlock and archive user accounts.",
    icon: LockKeyhole,
    items: [
      "Activate Account",
      "Suspend Account",
      "Lock Account",
      "Unlock Account",
      "Deactivate Account",
      "Archive Account",
      "Restore Account",
      "Account Reason",
      "Effective Date",
      "Approval Required",
      "Status History",
      "Status Reports",
    ],
  },
  {
    id: "password-management",
    title: "Password Management",
    description:
      "Manage temporary passwords, resets, expiry and password rules.",
    icon: Fingerprint,
    items: [
      "Reset Password",
      "Temporary Password",
      "Force Password Change",
      "Password Expiry",
      "Password Complexity",
      "Failed Attempts",
      "Account Lockout",
      "Password History",
      "Password Policy",
      "Password Alerts",
      "Password Audit",
      "Password Reports",
    ],
  },
  {
    id: "invitation-management",
    title: "Invitation Management",
    description:
      "Track pending invitations, activation status and resend actions.",
    icon: Mail,
    items: [
      "Pending Invitations",
      "Accepted Invitations",
      "Expired Invitations",
      "Resend Invitation",
      "Cancel Invitation",
      "Invitation Template",
      "Activation Deadline",
      "Activation Status",
      "Invitation Owner",
      "Invitation Alerts",
      "Invitation History",
      "Invitation Reports",
    ],
  },
  {
    id: "login-security",
    title: "Login Security",
    description:
      "Monitor login attempts, MFA, devices and suspicious account activity.",
    icon: ShieldCheck,
    items: [
      "Login History",
      "Failed Logins",
      "MFA Status",
      "Trusted Devices",
      "New Device Alerts",
      "New Location Alerts",
      "Suspicious Login",
      "Concurrent Sessions",
      "Session Timeout",
      "Force Sign-Out",
      "Security History",
      "Security Reports",
    ],
  },
  {
    id: "active-sessions",
    title: "Active Sessions",
    description:
      "Review active login sessions and revoke access immediately.",
    icon: Activity,
    items: [
      "Current Sessions",
      "Session User",
      "Login Time",
      "Device",
      "Browser",
      "Location",
      "IP Address",
      "Session Duration",
      "Session Risk",
      "Revoke Session",
      "Session History",
      "Session Reports",
    ],
  },
  {
    id: "role-assignment",
    title: "Role Assignment",
    description:
      "Assign, remove, replace and schedule user roles.",
    icon: UserCheck,
    items: [
      "Assign Role",
      "Remove Role",
      "Replace Role",
      "Primary Role",
      "Additional Role",
      "Temporary Role",
      "Role Start Date",
      "Role Expiry Date",
      "Assignment Approval",
      "Role Conflicts",
      "Assignment History",
      "Assignment Reports",
    ],
  },
  {
    id: "bulk-user-actions",
    title: "Bulk User Actions",
    description:
      "Update multiple users, roles and statuses together.",
    icon: Users,
    items: [
      "Bulk Import Users",
      "Bulk Activate",
      "Bulk Suspend",
      "Bulk Role Assignment",
      "Bulk Department Change",
      "Bulk Manager Change",
      "Bulk Password Reset",
      "Bulk Invitation",
      "Bulk Export",
      "Bulk Validation",
      "Bulk History",
      "Bulk Reports",
    ],
  },
  {
    id: "access-requests",
    title: "Access Requests",
    description:
      "Review employee requests for new roles, modules and temporary access.",
    icon: ClipboardCheck,
    items: [
      "Pending Requests",
      "Role Requests",
      "Module Requests",
      "Department Requests",
      "Temporary Access Requests",
      "Emergency Access Requests",
      "Request Justification",
      "Manager Approval",
      "Founder Approval",
      "Request Decision",
      "Request History",
      "Request Reports",
    ],
  },
  {
    id: "access-review",
    title: "Access Review",
    description:
      "Periodically certify user roles, permissions and department access.",
    icon: CheckCircle2,
    items: [
      "Review Campaigns",
      "Users Due Review",
      "Roles Due Review",
      "Permission Review",
      "Department Review",
      "Sensitive Access Review",
      "Reviewer Assignment",
      "Review Decision",
      "Access Removal",
      "Certification Status",
      "Review History",
      "Review Reports",
    ],
  },
  {
    id: "segregation-duties",
    title: "Segregation of Duties",
    description:
      "Detect conflicting roles and risky permission combinations.",
    icon: AlertTriangle,
    items: [
      "Role Conflicts",
      "Permission Conflicts",
      "Finance Conflicts",
      "Procurement Conflicts",
      "Approval Conflicts",
      "Maker-Checker Conflicts",
      "Founder Exceptions",
      "Conflict Owner",
      "Mitigation Control",
      "Conflict Resolution",
      "Conflict History",
      "Conflict Reports",
    ],
  },
  {
    id: "user-lifecycle",
    title: "User Lifecycle",
    description:
      "Manage joining, transfer, promotion, leave and exit access changes.",
    icon: Workflow,
    items: [
      "New Joiner",
      "Department Transfer",
      "Designation Change",
      "Promotion",
      "Manager Change",
      "Long Leave",
      "Return From Leave",
      "Resignation",
      "Termination",
      "Exit Deprovisioning",
      "Lifecycle History",
      "Lifecycle Reports",
    ],
  },
  {
    id: "deprovisioning",
    title: "User Deprovisioning",
    description:
      "Remove access safely and transfer ownership during employee exit.",
    icon: UserMinus,
    items: [
      "Deactivate User",
      "Revoke Sessions",
      "Remove Roles",
      "Remove Permissions",
      "Transfer Records",
      "Transfer Approvals",
      "Transfer Tasks",
      "Disable Credentials",
      "Exit Checklist",
      "Deprovisioning Approval",
      "Deprovisioning History",
      "Deprovisioning Reports",
    ],
  },
  {
    id: "user-audit",
    title: "User & Role Audit",
    description:
      "Review every user, role, permission and account status change.",
    icon: History,
    items: [
      "User Creation Audit",
      "User Update Audit",
      "Role Creation Audit",
      "Role Assignment Audit",
      "Permission Change Audit",
      "Department Change Audit",
      "Status Change Audit",
      "Password Reset Audit",
      "Session Audit",
      "Admin Action Audit",
      "Audit History",
      "Audit Reports",
    ],
  },
  {
    id: "users-roles-analytics",
    title: "Users & Roles Analytics",
    description:
      "Analyse user activity, access patterns, roles and security risks.",
    icon: Activity,
    items: [
      "User Growth",
      "Active User Trend",
      "Role Distribution",
      "Department Distribution",
      "Login Analytics",
      "Access Analytics",
      "Locked Account Analytics",
      "Invitation Analytics",
      "Review Analytics",
      "Risk Analytics",
      "AI Insights",
      "AI Predictions",
    ],
  },
  {
    id: "users-roles-reports",
    title: "Users & Roles Reports",
    description:
      "Generate user, role, access, security and lifecycle reports.",
    icon: FileBarChart,
    items: [
      "User Directory Report",
      "Active User Report",
      "Inactive User Report",
      "Role Report",
      "Permission Report",
      "Department Access Report",
      "Login Security Report",
      "Access Review Report",
      "Conflict Report",
      "Lifecycle Report",
      "Audit Report",
      "Custom Reports",
    ],
  },
  {
    id: "users-roles-settings",
    title: "Users & Roles Settings",
    description:
      "Configure IDs, defaults, approvals, security and access policies.",
    icon: Settings2,
    items: [
      "User ID Format",
      "Default Role",
      "Default Department",
      "Password Policy",
      "MFA Policy",
      "Invitation Expiry",
      "Session Policy",
      "Role Approval Matrix",
      "Access Review Frequency",
      "Notification Settings",
      "Admin Permissions",
      "Advanced Settings",
    ],
  },
  {
    id: "krve-ai-users-roles",
    title: "KRVE AI Identity Intelligence",
    description:
      "Use AI to detect access risks and recommend roles and permissions.",
    icon: Sparkles,
    items: [
      "AI Role Recommendation",
      "AI Permission Recommendation",
      "AI Access Risk Detection",
      "AI Login Risk Detection",
      "AI Role Conflict Detection",
      "AI User Activity Summary",
      "AI Access Review",
      "AI Deprovisioning Check",
      "AI Security Recommendation",
      "AI Account Health",
      "AI Executive Brief",
      "AI Identity Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Total Users", "148", "132 active users", Users],
  ["Roles", "18", "Department and functional", BadgeCheck],
  ["Pending Invites", "6", "Awaiting activation", Mail],
  ["Locked Accounts", "2", "Require administrator review", LockKeyhole],
];

export default function UsersRolesManagement() {
  const [selectedModule, setSelectedModule] =
    useState<UsersRolesModule | null>(null);
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
            placeholder="Search users, roles, permissions or access controls..."
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
          Complete Users & Roles Operations
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Tap any card to open its complete identity and access workspace.
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
              <Users size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              Identity Administration
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Users & Roles Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100">
            Manage user accounts, employee credentials, departments, roles,
            permissions, account status, authentication, sessions and the
            complete identity lifecycle across KEOS.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <UserCheck size={17} />
            Create Role
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50">
            <UserPlus size={17} />
            Create User
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
  module: UsersRolesModule;
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
  module: UsersRolesModule;
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
          Back to Users & Roles
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                Identity Workspace
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
          title="Active Users"
          value="132"
          note="Current module"
          icon={Users}
        />
        <WorkspaceMetric
          title="Pending Reviews"
          value="6"
          note="Require action"
          icon={BellRing}
        />
        <WorkspaceMetric
          title="Access Health"
          value="96%"
          note="Current posture"
          icon={ShieldCheck}
        />
        <WorkspaceMetric
          title="Locked Accounts"
          value="2"
          note="Need administrator review"
          icon={LockKeyhole}
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {["Overview", "Features", "Users", "Security", "Reports"].map(
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

          {activeTab === "Users" && <UsersPanel />}

          {activeTab === "Security" && <SecurityPanel />}

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

function OverviewPanel({ module }: { module: UsersRolesModule }) {
  const bars = [58, 64, 67, 73, 79, 84, 91, 96];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              {module.title} Activity
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Current access cycle
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            +8.4%
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
        <h3 className="text-lg font-black text-slate-950">Account Status</h3>
        <p className="mt-1 text-sm text-slate-500">
          Current identity posture
        </p>

        <div className="mt-6 space-y-5">
          {[
            ["Active", "89%", "bg-green-500"],
            ["Pending", "7%", "bg-blue-500"],
            ["Locked / Suspended", "4%", "bg-red-500"],
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

function UsersPanel() {
  const users = [
    ["Badal Kumar", "Founder", "Founder", "Active"],
    ["Aarav Sharma", "Finance Manager", "Finance", "Active"],
    ["Meera Singh", "HR Manager", "Human Resources", "Active"],
    ["Rohan Verma", "Support Executive", "Customer Support", "Pending"],
    ["Ananya Gupta", "Marketing Executive", "Marketing", "Locked"],
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4">User</th>
            <th className="px-5 py-4">Role</th>
            <th className="px-5 py-4">Department</th>
            <th className="px-5 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(([name, role, department, status]) => (
            <tr key={name} className="border-t border-slate-200">
              <td className="px-5 py-4 font-bold text-slate-950">{name}</td>
              <td className="px-5 py-4 text-slate-600">{role}</td>
              <td className="px-5 py-4 text-slate-600">{department}</td>
              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    status === "Active"
                      ? "bg-green-100 text-green-700"
                      : status === "Locked"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SecurityPanel() {
  const controls = [
    ["MFA Enabled", "126 users", "Strong"],
    ["Password Policy", "Enterprise policy active", "Strong"],
    ["Locked Accounts", "2 accounts", "Review"],
    ["Pending Access Reviews", "6 reviews", "Action Needed"],
    ["Suspicious Sessions", "0 sessions", "Healthy"],
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

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              status === "Healthy" || status === "Strong"
                ? "bg-green-100 text-green-700"
                : status === "Review"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}

function ReportsPanel({ module }: { module: UsersRolesModule }) {
  const reports = [
    ["User Directory Report", "Complete user account register", Users],
    ["Role & Permission Report", "Role and permission structure", KeyRound],
    ["Access Review Report", `Access review summary for ${module.title}`, CheckCircle2],
    ["Identity Audit Report", "User, role and access change history", History],
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
    UserPlus,
    UserCog,
    BadgeCheck,
    KeyRound,
    Building2,
    LockKeyhole,
    Fingerprint,
    Mail,
    ShieldCheck,
    Workflow,
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
        Open and manage the complete {title.toLowerCase()} identity workflow.
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