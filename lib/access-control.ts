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
  isAuthenticated?: boolean;
};

const PRIMARY_SESSION_KEY = "keos-founder-session";

const LEGACY_SESSION_KEYS = [
  "keos_session",
  "keos-auth-session",
  "keos-user",
];

export const keosUsers: KeosUser[] = [
  {
    userId: "FOUNDER001",
    password: "KRVE@2026",
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
  const normalizedPassword = password.trim();

  return (
    keosUsers.find(
      (user) =>
        user.userId === normalizedUserId &&
        user.password === normalizedPassword,
    ) ?? null
  );
}

export function createSession(user: KeosUser): KeosSession {
  return {
    userId: user.userId,
    name: user.name,
    role: user.role,
    department: user.department,
    allowedModules: user.allowedModules,
    loginTime: new Date().toISOString(),
    isAuthenticated: true,
  };
}

export function storeSession(
  session: KeosSession,
  keepSignedIn = true,
): void {
  if (typeof window === "undefined") {
    return;
  }

  clearStoredSession();

  const serializedSession = JSON.stringify(session);

  if (keepSignedIn) {
    window.localStorage.setItem(
      PRIMARY_SESSION_KEY,
      serializedSession,
    );
  } else {
    window.sessionStorage.setItem(
      PRIMARY_SESSION_KEY,
      serializedSession,
    );
  }
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

function normalizeSession(
  parsedValue: unknown,
): KeosSession | null {
  if (
    typeof parsedValue !== "object" ||
    parsedValue === null
  ) {
    return null;
  }

  const value = parsedValue as Partial<KeosSession>;

  if (
    typeof value.userId !== "string" ||
    typeof value.name !== "string" ||
    typeof value.role !== "string" ||
    typeof value.department !== "string"
  ) {
    return null;
  }

  const matchingUser = keosUsers.find(
    (user) => user.userId === value.userId,
  );

  const allowedModules =
    Array.isArray(value.allowedModules) &&
    value.allowedModules.every(
      (moduleId) => typeof moduleId === "string",
    )
      ? value.allowedModules
      : matchingUser?.allowedModules ?? [];

  return {
    userId: value.userId,
    name: value.name,
    role: value.role as KeosRole,
    department: value.department as KeosDepartment,
    allowedModules,
    loginTime:
      typeof value.loginTime === "string"
        ? value.loginTime
        : new Date().toISOString(),
    isAuthenticated: true,
  };
}

export function getStoredSession(): KeosSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const sessionKeys = [
    PRIMARY_SESSION_KEY,
    ...LEGACY_SESSION_KEYS,
  ];

  for (const key of sessionKeys) {
    const storedSession =
      window.localStorage.getItem(key) ??
      window.sessionStorage.getItem(key);

    if (!storedSession) {
      continue;
    }

    try {
      const parsedSession = JSON.parse(storedSession);
      const normalizedSession =
        normalizeSession(parsedSession);

      if (!normalizedSession) {
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
        continue;
      }

      /*
       * Purani session ko automatically primary key
       * me migrate kar diya jayega.
       */
      if (key !== PRIMARY_SESSION_KEY) {
        window.localStorage.setItem(
          PRIMARY_SESSION_KEY,
          JSON.stringify(normalizedSession),
        );

        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
      }

      return normalizedSession;
    } catch {
      window.localStorage.removeItem(key);
      window.sessionStorage.removeItem(key);
    }
  }

  return null;
}

export function clearStoredSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  const sessionKeys = [
    PRIMARY_SESSION_KEY,
    ...LEGACY_SESSION_KEYS,
  ];

  sessionKeys.forEach((key) => {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  });

  document.cookie =
    "keos-authenticated=; Path=/; Max-Age=0; SameSite=Lax";
}