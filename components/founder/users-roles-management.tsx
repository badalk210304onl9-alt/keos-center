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

import {
  useMemo,
  useState,
  type ComponentType,
} from "react";

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

type DashboardMetric = {
  title: string;
  value: string;
  note: string;
  icon: IconType;
};

type UserRecord = {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: string;
  department: string;
  status: "Active" | "Pending" | "Locked" | "Suspended";
  lastLogin: string;
};

type RoleRecord = {
  id: string;
  name: string;
  type: string;
  department: string;
  members: number;
  permissions: number;
  status: "Active" | "Inactive";
};

const usersRolesModules: UsersRolesModule[] = [
  {
    id: "users-roles-dashboard",
    title: "Users & Roles Dashboard",
    description:
      "View users, roles, invitations, locked accounts and identity-security health.",
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
      "Identity Alerts",
      "Department Distribution",
      "Role Distribution",
      "KRVE AI Insights",
    ],
  },
  {
    id: "user-directory",
    title: "User Directory",
    description:
      "Search and manage founder, administrator and employee accounts.",
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
      "Create employee credentials and assign controlled department access.",
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
    id: "user-profiles",
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
      "Build roles with permissions, access limits and approval controls.",
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
      "Control view, create, edit, approve, export and delete permissions.",
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
      "Restrict employees to authorised departments, modules and records.",
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
      "Assign controlled access to every KEOS enterprise module.",
    icon: Workflow,
    items: [
      "Commerce Access",
      "Finance Access",
      "Human Resources Access",
      "Marketing Access",
      "Customer Support Access",
      "Procurement Access",
      "CRM Access",
      "Projects Access",
      "Legal Access",
      "Risk Access",
      "KRVE AI Access",
      "Administration Access",
    ],
  },
  {
    id: "account-status",
    title: "Account Status Management",
    description:
      "Activate, suspend, lock, deactivate and restore user accounts.",
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
      "Manage password resets, expiry, complexity and account lockout.",
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
      "Review active sessions, devices, locations and revoke access.",
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
      "Review employee requests for roles, modules and temporary access.",
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
    id: "segregation-of-duties",
    title: "Segregation of Duties",
    description:
      "Detect conflicting roles and dangerous permission combinations.",
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
    id: "user-deprovisioning",
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
    id: "identity-audit",
    title: "User & Role Audit",
    description:
      "Review every user, role, permission and account-status change.",
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
      "Administrator Action Audit",
      "Audit History",
      "Audit Reports",
    ],
  },
  {
    id: "identity-analytics",
    title: "Users & Roles Analytics",
    description:
      "Analyse users, access patterns, roles and identity-security risks.",
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
    id: "identity-reports",
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
    id: "identity-settings",
    title: "Users & Roles Settings",
    description:
      "Configure IDs, defaults, approvals and identity-security policies.",
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
      "Administrator Permissions",
      "Advanced Settings",
    ],
  },
  {
    id: "krve-ai-identity",
    title: "KRVE AI Identity Intelligence",
    description:
      "Use KRVE AI to detect access risks and recommend roles.",
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

const dashboardMetrics: DashboardMetric[] = [
  {
    title: "Total Users",
    value: "148",
    note: "132 active users",
    icon: Users,
  },
  {
    title: "Roles",
    value: "18",
    note: "Department and functional",
    icon: BadgeCheck,
  },
  {
    title: "Pending Invites",
    value: "6",
    note: "Awaiting activation",
    icon: Mail,
  },
  {
    title: "Locked Accounts",
    value: "2",
    note: "Require administrator review",
    icon: LockKeyhole,
  },
];

const usersData: UserRecord[] = [
  {
    id: "USR-001",
    name: "Badal Kumar",
    email: "badal@krve.in",
    employeeId: "KRVE-FOUNDER-001",
    role: "Founder",
    department: "Founder Office",
    status: "Active",
    lastLogin: "Today, 7:42 PM",
  },
  {
    id: "USR-002",
    name: "Aarav Sharma",
    email: "aarav.sharma@krve.in",
    employeeId: "KRVE-FIN-001",
    role: "Finance Manager",
    department: "Finance",
    status: "Active",
    lastLogin: "Today, 6:18 PM",
  },
  {
    id: "USR-003",
    name: "Meera Singh",
    email: "meera.singh@krve.in",
    employeeId: "KRVE-HR-001",
    role: "HR Manager",
    department: "Human Resources",
    status: "Active",
    lastLogin: "Today, 5:46 PM",
  },
  {
    id: "USR-004",
    name: "Rohan Verma",
    email: "rohan.verma@krve.in",
    employeeId: "KRVE-CS-014",
    role: "Support Executive",
    department: "Customer Support",
    status: "Pending",
    lastLogin: "Not activated",
  },
  {
    id: "USR-005",
    name: "Ananya Gupta",
    email: "ananya.gupta@krve.in",
    employeeId: "KRVE-MKT-008",
    role: "Marketing Executive",
    department: "Marketing",
    status: "Locked",
    lastLogin: "Yesterday, 9:24 PM",
  },
  {
    id: "USR-006",
    name: "Kunal Mehta",
    email: "kunal.mehta@krve.in",
    employeeId: "KRVE-PROC-004",
    role: "Procurement Executive",
    department: "Procurement",
    status: "Suspended",
    lastLogin: "22 Jul 2026",
  },
];

const rolesData: RoleRecord[] = [
  {
    id: "ROLE-001",
    name: "Founder",
    type: "Executive",
    department: "All Departments",
    members: 1,
    permissions: 148,
    status: "Active",
  },
  {
    id: "ROLE-002",
    name: "Finance Manager",
    type: "Department",
    department: "Finance",
    members: 4,
    permissions: 42,
    status: "Active",
  },
  {
    id: "ROLE-003",
    name: "HR Manager",
    type: "Department",
    department: "Human Resources",
    members: 3,
    permissions: 38,
    status: "Active",
  },
  {
    id: "ROLE-004",
    name: "Support Executive",
    type: "Functional",
    department: "Customer Support",
    members: 12,
    permissions: 16,
    status: "Active",
  },
  {
    id: "ROLE-005",
    name: "Inventory Executive",
    type: "Functional",
    department: "Inventory",
    members: 8,
    permissions: 21,
    status: "Active",
  },
  {
    id: "ROLE-006",
    name: "Legacy Administrator",
    type: "Administrator",
    department: "Administration",
    members: 0,
    permissions: 56,
    status: "Inactive",
  },
];

export default function UsersRolesManagement() {
  const [selectedModule, setSelectedModule] =
    useState<UsersRolesModule | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return usersRolesModules;
    }

    return usersRolesModules.filter((module) => {
      const searchableText = [
        module.title,
        module.description,
        ...module.items,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery]);

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
      <HeroSection
        onCreateUser={() => setShowCreateUser(true)}
        onCreateRole={() => setShowCreateRole(true)}
      />

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white">
          <Search size={18} className="shrink-0 text-slate-400" />

          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search users, roles, permissions or access controls..."
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              Complete Users & Roles Operations
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tap any card to open its complete identity, role and access
              workspace.
            </p>
          </div>

          <p className="text-sm font-semibold text-slate-400">
            {filteredModules.length} modules available
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

        {filteredModules.length === 0 && (
          <div className="py-16 text-center">
            <Search size={34} className="mx-auto text-slate-300" />

            <h3 className="mt-4 text-lg font-black text-slate-900">
              No module found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Search term change karke dobara try kijiye.
            </p>
          </div>
        )}
      </section>

      {showCreateUser && (
        <CreateUserModal onClose={() => setShowCreateUser(false)} />
      )}

      {showCreateRole && (
        <CreateRoleModal onClose={() => setShowCreateRole(false)} />
      )}
    </div>
  );
}
function HeroSection({
  onCreateUser,
  onCreateRole,
}: {
  onCreateUser: () => void;
  onCreateRole: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-8 xl:flex-row xl:items-center">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 backdrop-blur">
              <Users size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-100">
              Identity Administration
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Users & Roles Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100 sm:text-base">
            Manage employee credentials, departments, roles, permissions,
            account security, access reviews and the complete user lifecycle
            across the KRVE Enterprise Operating System.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCreateRole}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
          >
            <UserCheck size={17} />
            Create Role
          </button>

          <button
            type="button"
            onClick={onCreateUser}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            <UserPlus size={17} />
            Create User
          </button>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ metric }: { metric: DashboardMetric }) {
  const Icon = metric.icon;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {metric.title}
      </p>

      <h2 className="mt-2 text-3xl font-black text-slate-950">
        {metric.value}
      </h2>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {metric.note}
      </p>
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
      className="group flex min-h-[225px] flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-violet-400 hover:shadow-xl"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">
        {module.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
        {module.description}
      </p>

      <div className="mt-5 flex w-full items-center justify-between">
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

  const [activeTab, setActiveTab] = useState<
    "Overview" | "Features" | "Users" | "Roles" | "Security" | "Reports"
  >("Overview");

  const [workspaceSearch, setWorkspaceSearch] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);

  const filteredFeatures = useMemo(() => {
    const query = workspaceSearch.trim().toLowerCase();

    if (!query) {
      return module.items;
    }

    return module.items.filter((item) =>
      item.toLowerCase().includes(query),
    );
  }, [module.items, workspaceSearch]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-violet-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-violet-100 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Users & Roles
        </button>

        <div className="mt-7 flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 backdrop-blur">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-100">
                Identity Workspace
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {module.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-100 sm:text-base">
              {module.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <Download size={17} />
              Export
            </button>

            <button
              type="button"
              onClick={() => setShowCreateRole(true)}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <UserCheck size={17} />
              Create Role
            </button>

            <button
              type="button"
              onClick={() => setShowCreateUser(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <UserPlus size={17} />
              Create User
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric
          title="Active Users"
          value="132"
          note="Across all departments"
          icon={Users}
        />

        <WorkspaceMetric
          title="Assigned Roles"
          value="18"
          note="Founder, department and functional"
          icon={BadgeCheck}
        />

        <WorkspaceMetric
          title="Access Health"
          value="96%"
          note="Current identity-security score"
          icon={ShieldCheck}
        />

        <WorkspaceMetric
          title="Pending Reviews"
          value="6"
          note="Require administrator action"
          icon={BellRing}
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {[
              "Overview",
              "Features",
              "Users",
              "Roles",
              "Security",
              "Reports",
            ].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() =>
                  setActiveTab(
                    tab as
                      | "Overview"
                      | "Features"
                      | "Users"
                      | "Roles"
                      | "Security"
                      | "Reports",
                  )
                }
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

        {(activeTab === "Features" ||
          activeTab === "Users" ||
          activeTab === "Roles") && (
          <div className="border-b border-slate-200 p-5">
            <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white">
              <Search size={17} className="shrink-0 text-slate-400" />

              <input
                value={workspaceSearch}
                onChange={(event) =>
                  setWorkspaceSearch(event.target.value)
                }
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              {workspaceSearch.length > 0 && (
                <button
                  type="button"
                  onClick={() => setWorkspaceSearch("")}
                  className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                  aria-label="Clear workspace search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="p-6">
          {activeTab === "Overview" && (
            <WorkspaceOverview module={module} />
          )}

          {activeTab === "Features" && (
            <div>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-2xl font-black text-slate-950">
                    {module.title} Features
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Open any feature to manage its complete identity workflow.
                  </p>
                </div>

                <p className="text-sm font-semibold text-slate-400">
                  {filteredFeatures.length} features
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredFeatures.map((item, index) => (
                  <FeatureCard
                    key={item}
                    title={item}
                    index={index}
                  />
                ))}
              </div>

              {filteredFeatures.length === 0 && (
                <div className="py-16 text-center">
                  <Search
                    size={34}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 text-lg font-black text-slate-900">
                    No feature found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Search term change karke dobara try kijiye.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "Users" && (
            <UsersTable
              searchQuery={workspaceSearch}
              onCreateUser={() => setShowCreateUser(true)}
            />
          )}

          {activeTab === "Roles" && (
            <RolesTable
              searchQuery={workspaceSearch}
              onCreateRole={() => setShowCreateRole(true)}
            />
          )}

          {activeTab === "Security" && <SecurityOverview />}

          {activeTab === "Reports" && (
            <IdentityReports module={module} />
          )}
        </div>
      </section>

      {showCreateUser && (
        <CreateUserModal onClose={() => setShowCreateUser(false)} />
      )}

      {showCreateRole && (
        <CreateRoleModal onClose={() => setShowCreateRole(false)} />
      )}
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
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>

      <h2 className="mt-2 text-3xl font-black text-slate-950">
        {value}
      </h2>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {note}
      </p>
    </article>
  );
}

function WorkspaceOverview({
  module,
}: {
  module: UsersRolesModule;
}) {
  const activityBars = [48, 57, 64, 61, 72, 78, 84, 91, 88, 96];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
      <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              {module.title} Activity
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current identity and access cycle
            </p>
          </div>

          <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            +12.4%
          </span>
        </div>

        <div className="mt-8 flex h-64 items-end gap-3">
          {activityBars.map((height, index) => (
            <div
              key={`${height}-${index}`}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-t-xl bg-gradient-to-t from-violet-600 to-blue-500"
                style={{ height: `${height}%` }}
              />

              <span className="text-[10px] font-bold text-slate-400">
                P{index + 1}
              </span>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-black text-slate-950">
          Identity Health
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Current users and account status
        </p>

        <div className="mt-6 space-y-5">
          <ProgressRow
            label="Active Accounts"
            value="89%"
            width="89%"
            status="Healthy"
            statusClassName="bg-green-100 text-green-700"
            barClassName="bg-green-500"
          />

          <ProgressRow
            label="MFA Coverage"
            value="85%"
            width="85%"
            status="Good"
            statusClassName="bg-blue-100 text-blue-700"
            barClassName="bg-blue-500"
          />

          <ProgressRow
            label="Access Reviews Complete"
            value="76%"
            width="76%"
            status="In Progress"
            statusClassName="bg-orange-100 text-orange-700"
            barClassName="bg-orange-500"
          />

          <ProgressRow
            label="Locked or Suspended"
            value="4%"
            width="4%"
            status="Review"
            statusClassName="bg-red-100 text-red-700"
            barClassName="bg-red-500"
          />
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              Recent Identity Activity
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Latest user, role and permission changes
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <History size={16} />
            View Audit
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <RecentActivityRow
            icon={UserPlus}
            title="New employee account created"
            description="Rohan Verma · Customer Support"
            time="18 minutes ago"
            status="Created"
            statusClassName="bg-green-100 text-green-700"
            showBorder
          />

          <RecentActivityRow
            icon={KeyRound}
            title="Finance Manager permissions updated"
            description="Updated by Founder"
            time="42 minutes ago"
            status="Updated"
            statusClassName="bg-blue-100 text-blue-700"
            showBorder
          />

          <RecentActivityRow
            icon={LockKeyhole}
            title="Marketing user account locked"
            description="Multiple failed login attempts"
            time="1 hour ago"
            status="Security"
            statusClassName="bg-red-100 text-red-700"
            showBorder
          />

          <RecentActivityRow
            icon={UserCheck}
            title="Temporary procurement role approved"
            description="Valid until 31 July 2026"
            time="2 hours ago"
            status="Approved"
            statusClassName="bg-violet-100 text-violet-700"
          />
        </div>
      </article>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  width,
  status,
  statusClassName,
  barClassName,
}: {
  label: string;
  value: string;
  width: string;
  status: string;
  statusClassName: string;
  barClassName: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-600">
          {label}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-slate-950">
            {value}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusClassName}`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barClassName}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

function RecentActivityRow({
  icon: Icon,
  title,
  description,
  time,
  status,
  statusClassName,
  showBorder = false,
}: {
  icon: IconType;
  title: string;
  description: string;
  time: string;
  status: string;
  statusClassName: string;
  showBorder?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center ${
        showBorder ? "border-b border-slate-200" : ""
      }`}
    >
      <div className="flex min-w-0 items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <p className="font-bold text-slate-950">{title}</p>

          <p className="mt-1 truncate text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
        <span className="text-xs font-semibold text-slate-400">
          {time}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${statusClassName}`}
        >
          {status}
        </span>
      </div>
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
    UserCheck,
    ShieldCheck,
    KeyRound,
    Activity,
    Settings2,
  ];

  const Icon = icons[index % icons.length];

  return (
    <button
      type="button"
      className="group flex min-h-[170px] flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-violet-400 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
          <Icon size={20} />
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
          Feature {index + 1}
        </span>
      </div>

      <h3 className="mt-5 font-black text-slate-950">{title}</h3>

      <div className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-violet-600">
        Open Workspace
        <ArrowRight
          size={16}
          className="transition group-hover:translate-x-1"
        />
      </div>
    </button>
  );
}

function UsersTable({
  searchQuery,
  onCreateUser,
}: {
  searchQuery: string;
  onCreateUser: () => void;
}) {
  const [statusFilter, setStatusFilter] = useState<
    "All" | UserRecord["status"]
  >("All");

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return usersData.filter((user) => {
      const matchesSearch =
        !query ||
        [
          user.id,
          user.name,
          user.email,
          user.employeeId,
          user.role,
          user.department,
          user.status,
          user.lastLogin,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            User Directory
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage employee identities, account status, department access and
            assigned roles.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateUser}
          className="flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <UserPlus size={17} />
          Create User
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", "Active", "Pending", "Locked", "Suspended"] as const).map(
          (status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                statusFilter === status
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ),
        )}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-[1050px] w-full border-collapse">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200 text-left">
              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                User
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Employee ID
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Role
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Department
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Last Login
              </th>

              <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <EmptyTableState
            icon={Users}
            title="No user found"
            description="Search term ya status filter change karke dobara try kijiye."
          />
        )}
      </div>
    </div>
  );
}

function UserTableRow({ user }: { user: UserRecord }) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <tr className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="flex min-w-[220px] items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-sm font-black text-violet-700">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate font-black text-slate-950">
              {user.name}
            </p>

            <p className="mt-1 truncate text-xs text-slate-500">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600">
          {user.employeeId}
        </span>
      </td>

      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
        {user.role}
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {user.department}
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={user.status} />
      </td>

      <td className="px-5 py-4 text-sm text-slate-500">
        {user.lastLogin}
      </td>

      <td className="px-5 py-4 text-right">
        <button
          type="button"
          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
        >
          Manage
        </button>
      </td>
    </tr>
  );
}

function StatusBadge({
  status,
}: {
  status:
    | UserRecord["status"]
    | RoleRecord["status"]
    | "Healthy"
    | "Review";
}) {
  const classes: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-700",
    Locked: "bg-red-100 text-red-700",
    Suspended: "bg-slate-200 text-slate-700",
    Inactive: "bg-slate-200 text-slate-600",
    Healthy: "bg-green-100 text-green-700",
    Review: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        classes[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function RolesTable({
  searchQuery,
  onCreateRole,
}: {
  searchQuery: string;
  onCreateRole: () => void;
}) {
  const [statusFilter, setStatusFilter] = useState<
    "All" | RoleRecord["status"]
  >("All");

  const filteredRoles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return rolesData.filter((role) => {
      const matchesSearch =
        !query ||
        [
          role.id,
          role.name,
          role.type,
          role.department,
          role.members.toString(),
          role.permissions.toString(),
          role.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" || role.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Role Directory
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage role types, departments, assigned users and permission
            coverage.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateRole}
          className="flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Plus size={17} />
          Create Role
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", "Active", "Inactive"] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              statusFilter === status
                ? "bg-violet-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-[900px] w-full border-collapse">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200 text-left">
              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Role
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Type
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Department
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Members
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Permissions
              </th>

              <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRoles.map((role) => (
              <RoleTableRow key={role.id} role={role} />
            ))}
          </tbody>
        </table>

        {filteredRoles.length === 0 && (
          <EmptyTableState
            icon={BadgeCheck}
            title="No role found"
            description="Search term ya status filter change karke dobara try kijiye."
          />
        )}
      </div>
    </div>
  );
}

function RoleTableRow({ role }: { role: RoleRecord }) {
  return (
    <tr className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="flex min-w-[190px] items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
            <BadgeCheck size={19} />
          </div>

          <div>
            <p className="font-black text-slate-950">{role.name}</p>

            <p className="mt-1 text-xs font-semibold text-slate-400">
              {role.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700">
          {role.type}
        </span>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {role.department}
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-slate-400" />

          <span className="text-sm font-black text-slate-800">
            {role.members}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <KeyRound size={16} className="text-slate-400" />

          <span className="text-sm font-black text-slate-800">
            {role.permissions}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={role.status} />
      </td>

      <td className="px-5 py-4 text-right">
        <button
          type="button"
          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
        >
          Configure
        </button>
      </td>
    </tr>
  );
}

function EmptyTableState({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType;
  title: string;
  description: string;
}) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon size={25} />
      </div>

      <h3 className="mt-4 text-lg font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

function SecurityOverview() {
  const securityItems = [
    {
      title: "Multi-Factor Authentication",
      description: "126 of 148 users have MFA enabled.",
      value: "85%",
      icon: Fingerprint,
      status: "Healthy" as const,
    },
    {
      title: "Locked Accounts",
      description: "Two accounts require administrator review.",
      value: "2",
      icon: LockKeyhole,
      status: "Review" as const,
    },
    {
      title: "Suspicious Logins",
      description: "One unusual login was detected in the last 24 hours.",
      value: "1",
      icon: AlertTriangle,
      status: "Review" as const,
    },
    {
      title: "Active Sessions",
      description: "Current sessions across desktop and mobile devices.",
      value: "94",
      icon: Activity,
      status: "Healthy" as const,
    },
  ];

  return (
    <div>
      <div>
        <h2 className="text-2xl font-black text-slate-950">
          Identity Security
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Review authentication health, suspicious activity, active sessions
          and account-security issues.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {securityItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
                  <Icon size={20} />
                </div>

                <StatusBadge status={item.status} />
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              <div className="mt-5 flex items-end justify-between gap-4">
                <span className="text-3xl font-black text-slate-950">
                  {item.value}
                </span>

                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-bold text-violet-600"
                >
                  Review
                  <ChevronRight size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-600 text-white">
            <Sparkles size={20} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-950">
              KRVE AI Security Recommendation
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enable mandatory MFA for the remaining 22 users and review the
              locked marketing account before restoring access.
            </p>

            <button
              type="button"
              className="mt-4 flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              Apply Recommendation
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function IdentityReports({
  module,
}: {
  module: UsersRolesModule;
}) {
  const reports = [
    {
      title: "User Directory Report",
      description:
        "Complete employee account directory with role, department and status.",
      icon: Users,
      format: "Excel / PDF",
    },
    {
      title: "Role Assignment Report",
      description:
        "Users mapped to primary, additional and temporary roles.",
      icon: UserCheck,
      format: "Excel / PDF",
    },
    {
      title: "Permission Audit Report",
      description:
        "Detailed view of role permissions, sensitive actions and changes.",
      icon: KeyRound,
      format: "Excel / PDF",
    },
    {
      title: "Login Security Report",
      description:
        "Successful logins, failed attempts, devices and security alerts.",
      icon: ShieldCheck,
      format: "PDF",
    },
    {
      title: "Access Review Report",
      description:
        "Certification progress, reviewer decisions and removed access.",
      icon: ClipboardCheck,
      format: "Excel / PDF",
    },
    {
      title: "User Lifecycle Report",
      description:
        "Joining, transfer, promotion, leave and exit access history.",
      icon: Workflow,
      format: "Excel / PDF",
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            {module.title} Reports
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Generate operational, security, compliance and executive identity
            reports.
          </p>
        </div>

        <button
          type="button"
          className="flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Plus size={17} />
          Create Custom Report
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <article
              key={report.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
                  <Icon size={20} />
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">
                  {report.format}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-950">
                {report.title}
              </h3>

              <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">
                {report.description}
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <FileBarChart size={16} />
                  Preview
                </button>

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-black text-slate-950">
                Report Activity
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Reports generated during the current period
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              42 exports
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <ReportActivityRow
              title="User Directory Report"
              generatedBy="Founder"
              time="Today, 6:12 PM"
              type="Excel"
              showBorder
            />

            <ReportActivityRow
              title="Permission Audit Report"
              generatedBy="System Administrator"
              time="Today, 2:48 PM"
              type="PDF"
              showBorder
            />

            <ReportActivityRow
              title="Login Security Report"
              generatedBy="KRVE AI"
              time="Yesterday, 8:30 PM"
              type="PDF"
              showBorder
            />

            <ReportActivityRow
              title="Role Assignment Report"
              generatedBy="HR Manager"
              time="Yesterday, 3:16 PM"
              type="Excel"
            />
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-600 text-white">
            <Sparkles size={22} />
          </div>

          <h3 className="mt-5 text-xl font-black text-slate-950">
            KRVE AI Executive Identity Brief
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Identity security remains stable. Two locked accounts and six
            pending invitations require attention. Twenty-two users still need
            multi-factor authentication.
          </p>

          <div className="mt-5 space-y-3">
            <InsightLine
              label="Overall access health"
              value="96%"
              icon={ShieldCheck}
            />

            <InsightLine
              label="Users pending MFA"
              value="22"
              icon={Fingerprint}
            />

            <InsightLine
              label="High-risk conflicts"
              value="1"
              icon={AlertTriangle}
            />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
          >
            Generate Executive Brief
            <ArrowRight size={16} />
          </button>
        </article>
      </div>
    </div>
  );
}

function ReportActivityRow({
  title,
  generatedBy,
  time,
  type,
  showBorder = false,
}: {
  title: string;
  generatedBy: string;
  time: string;
  type: string;
  showBorder?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center ${
        showBorder ? "border-b border-slate-200" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
          <FileBarChart size={18} />
        </div>

        <div>
          <p className="font-black text-slate-950">{title}</p>

          <p className="mt-1 text-xs text-slate-500">
            Generated by {generatedBy}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span className="text-xs font-semibold text-slate-400">
          {time}
        </span>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          {type}
        </span>
      </div>
    </div>
  );
}

function InsightLine({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: IconType;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon size={17} className="text-violet-600" />

        <span className="text-sm font-semibold text-slate-600">
          {label}
        </span>
      </div>

      <span className="font-black text-slate-950">{value}</span>
    </div>
  );
}

function CreateUserModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    workEmail: "",
    mobileNumber: "",
    department: "",
    designation: "",
    reportingManager: "",
    primaryRole: "",
    activationDate: "",
    temporaryPassword: "",
    accountStatus: "Active",
    sendCredentials: true,
    requirePasswordChange: true,
    enableMfa: true,
  });

  const updateField = (
    field: keyof typeof formData,
    value: string | boolean,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const steps = [
    {
      number: 1,
      title: "Identity",
    },
    {
      number: 2,
      title: "Employment",
    },
    {
      number: 3,
      title: "Access",
    },
    {
      number: 4,
      title: "Security",
    },
  ];

  const handleSave = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <ModalShell
      title="Create New User"
      description="Create an employee account and assign controlled KEOS access."
      icon={UserPlus}
      onClose={onClose}
      maxWidth="max-w-5xl"
    >
      <div className="border-b border-slate-200 px-5 py-4 sm:px-7">
        <div className="grid grid-cols-4 gap-2">
          {steps.map((step) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setCurrentStep(step.number)}
              className={`rounded-xl px-2 py-3 text-center transition ${
                currentStep === step.number
                  ? "bg-violet-600 text-white"
                  : currentStep > step.number
                    ? "bg-green-50 text-green-700"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              <span className="block text-xs font-black">
                {currentStep > step.number ? "✓" : step.number}
              </span>

              <span className="mt-1 hidden text-xs font-bold sm:block">
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-7">
        {currentStep === 1 && (
          <div>
            <FormSectionHeading
              title="User Identity"
              description="Enter the employee's official account and contact details."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <FormField
                label="Full Name"
                required
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(value) => updateField("fullName", value)}
              />

              <FormField
                label="Employee ID"
                required
                placeholder="KRVE-HR-001"
                value={formData.employeeId}
                onChange={(value) => updateField("employeeId", value)}
              />

              <FormField
                label="Work Email"
                type="email"
                required
                placeholder="employee@krve.in"
                value={formData.workEmail}
                onChange={(value) => updateField("workEmail", value)}
              />

              <FormField
                label="Mobile Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.mobileNumber}
                onChange={(value) =>
                  updateField("mobileNumber", value)
                }
              />
            </div>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <Mail
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="font-black text-blue-950">
                    Official KRVE Identity
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    Use the employee's official work email. Personal email
                    addresses should not be used for KEOS access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <FormSectionHeading
              title="Employment Information"
              description="Connect the user to the correct department, designation and manager."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <SelectField
                label="Department"
                required
                value={formData.department}
                onChange={(value) => updateField("department", value)}
                options={[
                  "Founder Office",
                  "Finance",
                  "Human Resources",
                  "Marketing",
                  "Customer Support",
                  "Procurement",
                  "Inventory",
                  "Warehouse",
                  "Technology",
                  "Legal & Compliance",
                  "Risk Management",
                  "Administration",
                ]}
              />

              <FormField
                label="Designation"
                required
                placeholder="Enter designation"
                value={formData.designation}
                onChange={(value) => updateField("designation", value)}
              />

              <SelectField
                label="Reporting Manager"
                value={formData.reportingManager}
                onChange={(value) =>
                  updateField("reportingManager", value)
                }
                options={[
                  "Badal Kumar — Founder",
                  "Aarav Sharma — Finance Manager",
                  "Meera Singh — HR Manager",
                  "Department Head",
                  "No Reporting Manager",
                ]}
              />

              <FormField
                label="Activation Date"
                type="date"
                required
                value={formData.activationDate}
                onChange={(value) =>
                  updateField("activationDate", value)
                }
              />
            </div>

            <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
              <div className="flex items-start gap-3">
                <Building2
                  size={20}
                  className="mt-0.5 shrink-0 text-violet-600"
                />

                <div>
                  <p className="font-black text-violet-950">
                    Department Access Policy
                  </p>

                  <p className="mt-1 text-sm leading-6 text-violet-700">
                    Employees should only receive access to their own
                    department unless additional access is explicitly
                    approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <FormSectionHeading
              title="Role & Access"
              description="Assign the user's primary role and account status."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <SelectField
                label="Primary Role"
                required
                value={formData.primaryRole}
                onChange={(value) => updateField("primaryRole", value)}
                options={[
                  "Founder",
                  "System Administrator",
                  "Finance Manager",
                  "HR Manager",
                  "Marketing Manager",
                  "Support Manager",
                  "Support Executive",
                  "Procurement Manager",
                  "Procurement Executive",
                  "Inventory Manager",
                  "Inventory Executive",
                  "Warehouse Executive",
                  "Department Employee",
                ]}
              />

              <SelectField
                label="Account Status"
                required
                value={formData.accountStatus}
                onChange={(value) => updateField("accountStatus", value)}
                options={[
                  "Active",
                  "Pending",
                  "Suspended",
                  "Inactive",
                ]}
              />
            </div>

            <div className="mt-6">
              <p className="text-sm font-black text-slate-950">
                Module Access Preview
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Department Dashboard",
                  "Tasks & Approvals",
                  "Documents",
                  "Reports",
                  "Notifications",
                  "KRVE AI Assistant",
                ].map((moduleName, index) => (
                  <label
                    key={moduleName}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-violet-300"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={index < 4}
                      className="h-4 w-4 accent-violet-600"
                    />

                    <span className="text-sm font-bold text-slate-700">
                      {moduleName}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-orange-600"
                />

                <div>
                  <p className="font-black text-orange-950">
                    Least-Privilege Access
                  </p>

                  <p className="mt-1 text-sm leading-6 text-orange-700">
                    Assign only the permissions required for the employee's
                    current responsibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <FormSectionHeading
              title="Account Security"
              description="Configure temporary credentials and authentication requirements."
            />

            <div className="mt-6">
              <FormField
                label="Temporary Password"
                type="password"
                required
                placeholder="Create a secure temporary password"
                value={formData.temporaryPassword}
                onChange={(value) =>
                  updateField("temporaryPassword", value)
                }
              />
            </div>

            <div className="mt-6 space-y-3">
              <ToggleOption
                title="Send Login Credentials"
                description="Send the employee ID, login URL and activation instructions."
                checked={formData.sendCredentials}
                onChange={(checked) =>
                  updateField("sendCredentials", checked)
                }
                icon={Mail}
              />

              <ToggleOption
                title="Force Password Change"
                description="Require a new password during the employee's first login."
                checked={formData.requirePasswordChange}
                onChange={(checked) =>
                  updateField("requirePasswordChange", checked)
                }
                icon={KeyRound}
              />

              <ToggleOption
                title="Enable Multi-Factor Authentication"
                description="Require an additional verification method for account access."
                checked={formData.enableMfa}
                onChange={(checked) =>
                  updateField("enableMfa", checked)
                }
                icon={Fingerprint}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>
                  <p className="font-black text-green-950">
                    Ready to Create
                  </p>

                  <p className="mt-1 text-sm leading-6 text-green-700">
                    Review the user's identity, employment, access and security
                    details before creating the account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:px-7">
        <button
          type="button"
          onClick={
            currentStep === 1
              ? onClose
              : () => setCurrentStep((step) => step - 1)
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          {currentStep === 1 ? (
            <>
              <X size={17} />
              Cancel
            </>
          ) : (
            <>
              <ArrowLeft size={17} />
              Previous
            </>
          )}
        </button>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((step) => step + 1)}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
          >
            Continue
            <ArrowRight size={17} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            disabled={saved}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saved ? (
              <>
                <CheckCircle2 size={17} />
                User Created
              </>
            ) : (
              <>
                <UserPlus size={17} />
                Create User
              </>
            )}
          </button>
        )}
      </div>
    </ModalShell>
  );
}
function CreateRoleModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);

  const [role, setRole] = useState({
    roleName: "",
    roleCode: "",
    description: "",
    department: "",
    roleType: "",
    approvalLimit: "",
    owner: "",
    active: true,
  });

  const update = (
    field: keyof typeof role,
    value: string | boolean,
  ) => {
    setRole((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveRole = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <ModalShell
      title="Create New Role"
      description="Create department or enterprise role."
      icon={BadgeCheck}
      onClose={onClose}
      maxWidth="max-w-5xl"
    >
      <div className="border-b border-slate-200 px-6 py-4">
        <div className="grid grid-cols-4 gap-3">
          {["Basic", "Permissions", "Limits", "Review"].map(
            (item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setStep(index + 1)}
                className={`rounded-xl py-3 text-sm font-bold transition ${
                  step === index + 1
                    ? "bg-violet-600 text-white"
                    : step > index + 1
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="max-h-[65vh] overflow-y-auto p-6">
                {step === 1 && (
          <>
            <FormSectionHeading
              title="Basic Role Information"
              description="Create the identity of this role."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <FormField
                label="Role Name"
                required
                value={role.roleName}
                onChange={(v) => update("roleName", v)}
              />

              <FormField
                label="Role Code"
                required
                value={role.roleCode}
                onChange={(v) => update("roleCode", v)}
              />

              <SelectField
                label="Department"
                value={role.department}
                onChange={(v) => update("department", v)}
                options={[
                  "Finance",
                  "Human Resources",
                  "Marketing",
                  "Customer Support",
                  "Procurement",
                  "Administration",
                  "Founder Office",
                ]}
              />

              <SelectField
                label="Role Type"
                value={role.roleType}
                onChange={(v) => update("roleType", v)}
                options={[
                  "Executive",
                  "Administrator",
                  "Department",
                  "Functional",
                  "Temporary",
                ]}
              />
            </div>

            <div className="mt-6">
              <label className="text-sm font-bold text-slate-700">
                Description
              </label>

              <textarea
                rows={5}
                value={role.description}
                onChange={(e) =>
                  update("description", e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-violet-500"
              />
            </div>
          </>
        )}
                {step === 2 && (
          <>
            <FormSectionHeading
              title="Permissions"
              description="Choose role permissions."
            />

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[
                "View",
                "Create",
                "Edit",
                "Delete",
                "Approve",
                "Export",
                "Reports",
                "Analytics",
                "AI Access",
                "Finance",
                "HR",
                "Marketing",
                "CRM",
                "Procurement",
                "Inventory",
                "Documents",
                "Administration",
                "System Settings",
              ].map((permission) => (
                <label
                  key={permission}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-violet-600"
                  />

                  <span className="text-sm font-semibold">
                    {permission}
                  </span>
                </label>
              ))}
            </div>
          </>
        )}
                {step === 3 && (
          <>
            <FormSectionHeading
              title="Approval Limits & Access Scope"
              description="Define financial limits, data scope and approval authority."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <FormField
                label="Approval Limit"
                type="number"
                placeholder="Enter amount"
                value={role.approvalLimit}
                onChange={(value) =>
                  update("approvalLimit", value)
                }
              />

              <SelectField
                label="Role Owner"
                required
                value={role.owner}
                onChange={(value) => update("owner", value)}
                options={[
                  "Badal Kumar — Founder",
                  "System Administrator",
                  "Finance Manager",
                  "HR Manager",
                  "Marketing Manager",
                  "Customer Support Manager",
                  "Procurement Manager",
                  "Department Head",
                ]}
              />
            </div>

            <div className="mt-6">
              <p className="text-sm font-black text-slate-950">
                Data Scope
              </p>

              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {[
                  "Own Records Only",
                  "Team Records",
                  "Department Records",
                  "Cross-Department Records",
                  "All Enterprise Records",
                  "Sensitive Records",
                ].map((scope, index) => (
                  <label
                    key={scope}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-violet-300"
                  >
                    <input
                      type="radio"
                      name="data-scope"
                      defaultChecked={index === 2}
                      className="h-4 w-4 accent-violet-600"
                    />

                    <span className="text-sm font-bold text-slate-700">
                      {scope}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-black text-slate-950">
                Approval Controls
              </p>

              <div className="mt-3 space-y-3">
                <ToggleOption
                  title="Require Founder Approval"
                  description="Sensitive role changes will require founder approval."
                  checked
                  onChange={() => {}}
                  icon={ShieldCheck}
                />

                <ToggleOption
                  title="Enable Maker-Checker Control"
                  description="One user creates the action and another user approves it."
                  checked
                  onChange={() => {}}
                  icon={ClipboardCheck}
                />

                <ToggleOption
                  title="Allow Temporary Delegation"
                  description="Permit this role to delegate approval authority for a limited period."
                  checked={false}
                  onChange={() => {}}
                  icon={Workflow}
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-orange-600"
                />

                <div>
                  <p className="font-black text-orange-950">
                    Approval Limit Control
                  </p>

                  <p className="mt-1 text-sm leading-6 text-orange-700">
                    Approval limits should match the employee's position,
                    department responsibility and risk exposure.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <FormSectionHeading
              title="Review Role"
              description="Review the role details before publishing it."
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ReviewItem
                label="Role Name"
                value={role.roleName || "Not entered"}
              />

              <ReviewItem
                label="Role Code"
                value={role.roleCode || "Not entered"}
              />

              <ReviewItem
                label="Department"
                value={role.department || "Not selected"}
              />

              <ReviewItem
                label="Role Type"
                value={role.roleType || "Not selected"}
              />

              <ReviewItem
                label="Role Owner"
                value={role.owner || "Not selected"}
              />

              <ReviewItem
                label="Approval Limit"
                value={
                  role.approvalLimit
                    ? `₹${Number(role.approvalLimit).toLocaleString("en-IN")}`
                    : "No limit entered"
                }
              />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-black text-slate-950">
                Role Description
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {role.description || "No role description entered."}
              </p>
            </div>

            <div className="mt-6">
              <ToggleOption
                title="Activate Role Immediately"
                description="The role will become available for assignment after creation."
                checked={role.active}
                onChange={(checked) => update("active", checked)}
                icon={CheckCircle2}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex items-start gap-3">
                <BadgeCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>
                  <p className="font-black text-green-950">
                    Ready to Publish
                  </p>

                  <p className="mt-1 text-sm leading-6 text-green-700">
                    After publishing, this role can be assigned to authorised
                    KEOS users.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:px-7">
        <button
          type="button"
          onClick={
            step === 1
              ? onClose
              : () => setStep((current) => current - 1)
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          {step === 1 ? (
            <>
              <X size={17} />
              Cancel
            </>
          ) : (
            <>
              <ArrowLeft size={17} />
              Previous
            </>
          )}
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep((current) => current + 1)}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
          >
            Continue
            <ArrowRight size={17} />
          </button>
        ) : (
          <button
            type="button"
            onClick={saveRole}
            disabled={saved}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saved ? (
              <>
                <CheckCircle2 size={17} />
                Role Created
              </>
            ) : (
              <>
                <BadgeCheck size={17} />
                Publish Role
              </>
            )}
          </button>
        )}
      </div>
    </ModalShell>
  );
}

function ReviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-black text-slate-950">
        {value}
      </p>
    </div>
  );
}
function ModalShell({
  title,
  description,
  icon: Icon,
  onClose,
  maxWidth,
  children,
}: {
  title: string;
  description: string;
  icon: IconType;
  onClose: () => void;
  maxWidth: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${maxWidth} overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 bg-gradient-to-r from-slate-950 via-violet-950 to-blue-700 px-5 py-5 text-white sm:px-7">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 backdrop-blur">
              <Icon size={23} />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-black sm:text-2xl">
                {title}
              </h2>

              <p className="mt-1 text-sm leading-6 text-violet-100">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
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

function FormSectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-xl font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </span>

      <select
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
      >
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

function ToggleOption({
  title,
  description,
  checked,
  onChange,
  icon: Icon,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon: IconType;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300">
      <div className="flex min-w-0 items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <p className="font-black text-slate-950">
            {title}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="relative mt-1 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />

        <div className="h-7 w-12 rounded-full bg-slate-200 transition peer-checked:bg-violet-600" />

        <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </div>
    </label>
  );
}