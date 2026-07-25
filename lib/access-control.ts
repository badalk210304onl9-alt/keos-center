export type KeosRole =
  | "Founder"
  | "Finance Employee"
  | "Marketing Employee"
  | "HR Employee"
  | "Sales Employee"
  | "Inventory Employee"
  | "Customer Support Employee";

export type KeosDepartment =
  | "Founder Office"
  | "Finance"
  | "Marketing"
  | "Human Resources"
  | "Sales"
  | "Inventory & Warehouse"
  | "Customer Support";

export type KeosUser = {
  userId: string;
  password: string;
  name: string;
  role: KeosRole;
  department: KeosDepartment;
  allowedModules: string[];
};

export type KeosSession = Omit<KeosUser, "password"> & {
  loginTime: string;
};

export const keosUsers: KeosUser[] = [
  {
    userId: "FOUNDER001",
    password: "KEOS@2026",
    name: "Badal Kumar",
    role: "Founder",
    department: "Founder Office",
    allowedModules: ["*"],
  },

  {
    userId: "FIN001",
    password: "FIN@2026",
    name: "Finance Employee",
    role: "Finance Employee",
    department: "Finance",
    allowedModules: [
      "finance-dashboard",
      "general-ledger",
      "journal-entries",
      "accounts-payable",
      "accounts-receivable",
      "banking",
      "expenses",
      "budgets",
      "gst",
      "tds",
      "payroll",
      "finance-reports",
    ],
  },

  {
    userId: "MKT001",
    password: "MKT@2026",
    name: "Marketing Employee",
    role: "Marketing Employee",
    department: "Marketing",
    allowedModules: [
      "marketing-dashboard",
      "campaigns",
      "social-media",
      "email-marketing",
      "sms-whatsapp",
      "seo",
      "influencers",
      "marketing-reports",
    ],
  },

  {
    userId: "HR001",
    password: "HR@2026",
    name: "HR Employee",
    role: "HR Employee",
    department: "Human Resources",
    allowedModules: [
      "hr-dashboard",
      "employees",
      "attendance",
      "leave",
      "recruitment",
      "performance",
      "training",
      "hr-reports",
    ],
  },

  {
    userId: "SALES001",
    password: "SALES@2026",
    name: "Sales Employee",
    role: "Sales Employee",
    department: "Sales",
    allowedModules: [
      "sales-dashboard",
      "orders",
      "customers",
      "crm",
      "sales-invoices",
      "returns",
      "discounts",
      "sales-reports",
    ],
  },

  {
    userId: "INV001",
    password: "INV@2026",
    name: "Inventory Employee",
    role: "Inventory Employee",
    department: "Inventory & Warehouse",
    allowedModules: [
      "inventory-dashboard",
      "products",
      "inventory",
      "warehouse",
      "vendors",
      "purchase-orders",
      "stock-transfers",
      "shipping",
      "inventory-reports",
    ],
  },

  {
    userId: "SUPPORT001",
    password: "SUPPORT@2026",
    name: "Support Employee",
    role: "Customer Support Employee",
    department: "Customer Support",
    allowedModules: [
      "support-dashboard",
      "support-tickets",
      "orders",
      "customers",
      "returns",
      "reviews",
      "support-reports",
    ],
  },
];

export function authenticateUser(
  userId: string,
  password: string,
): KeosUser | null {
  const normalizedUserId = userId.trim().toUpperCase();

  return (
    keosUsers.find(
      (user) =>
        user.userId === normalizedUserId && user.password === password,
    ) ?? null
  );
}

export function canAccessModule(
  session: KeosSession,
  moduleId: string,
): boolean {
  return (
    session.allowedModules.includes("*") ||
    session.allowedModules.includes(moduleId)
  );
}

export function getStoredSession(): KeosSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedSession =
    window.localStorage.getItem("keos_session") ??
    window.sessionStorage.getItem("keos_session");

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession) as KeosSession;
  } catch {
    window.localStorage.removeItem("keos_session");
    window.sessionStorage.removeItem("keos_session");
    return null;
  }
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem("keos_session");
  window.sessionStorage.removeItem("keos_session");
}