"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BarChart3,
  Bell,
  Boxes,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Contact,
  CreditCard,
  FileChartColumn,
  FileText,
  Headphones,
  Landmark,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Package,
  PackageCheck,
  ReceiptText,
  Search,
  Settings,
  ShoppingBag,
  Tags,
  Truck,
  UserCog,
  UserRound,
  Users,
  WalletCards,
  Warehouse,
  X,
} from "lucide-react";

import {
  canAccessModule,
  clearStoredSession,
  getStoredSession,
  type KeosSession,
} from "@/lib/access-control";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ModuleItem = {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  badge?: string;
};

type ModuleGroup = {
  title: string;
  items: ModuleItem[];
};

const moduleGroups: ModuleGroup[] = [
  {
    title: "Finance",
    items: [
      {
        id: "finance-dashboard",
        name: "Finance Dashboard",
        description: "Financial performance overview",
        icon: CircleDollarSign,
      },
      {
        id: "general-ledger",
        name: "General Ledger",
        description: "Company ledger accounts",
        icon: FileText,
      },
      {
        id: "journal-entries",
        name: "Journal Entries",
        description: "Manage accounting entries",
        icon: ReceiptText,
      },
      {
        id: "accounts-payable",
        name: "Accounts Payable",
        description: "Vendor bills and payments",
        icon: CreditCard,
      },
      {
        id: "accounts-receivable",
        name: "Accounts Receivable",
        description: "Customer dues and receipts",
        icon: WalletCards,
      },
      {
        id: "banking",
        name: "Banking",
        description: "Bank accounts and reconciliation",
        icon: Landmark,
      },
      {
        id: "expenses",
        name: "Expenses",
        description: "Business expense management",
        icon: ReceiptText,
      },
      {
        id: "budgets",
        name: "Budgets",
        description: "Financial planning and budgets",
        icon: BarChart3,
      },
      {
        id: "gst",
        name: "GST Center",
        description: "GST records and returns",
        icon: FileText,
      },
      {
        id: "tds",
        name: "TDS",
        description: "TDS deductions and returns",
        icon: FileChartColumn,
      },
      {
        id: "payroll",
        name: "Payroll",
        description: "Salary processing",
        icon: CreditCard,
      },
      {
        id: "finance-reports",
        name: "Finance Reports",
        description: "Financial statements and reports",
        icon: FileChartColumn,
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        id: "marketing-dashboard",
        name: "Marketing Dashboard",
        description: "Marketing performance overview",
        icon: Megaphone,
      },
      {
        id: "campaigns",
        name: "Campaigns",
        description: "Marketing campaign management",
        icon: BarChart3,
      },
      {
        id: "social-media",
        name: "Social Media",
        description: "Social media activities",
        icon: MessageCircle,
      },
      {
        id: "email-marketing",
        name: "Email Marketing",
        description: "Email campaigns",
        icon: Mail,
      },
      {
        id: "sms-whatsapp",
        name: "SMS & WhatsApp",
        description: "Customer messaging",
        icon: MessageCircle,
      },
      {
        id: "seo",
        name: "SEO",
        description: "Search visibility performance",
        icon: BarChart3,
      },
      {
        id: "influencers",
        name: "Influencers",
        description: "Influencer collaborations",
        icon: Users,
      },
      {
        id: "marketing-reports",
        name: "Marketing Reports",
        description: "Campaign analytics and reports",
        icon: FileChartColumn,
      },
    ],
  },
  {
    title: "Human Resources",
    items: [
      {
        id: "hr-dashboard",
        name: "HR Dashboard",
        description: "Workforce overview",
        icon: BriefcaseBusiness,
      },
      {
        id: "employees",
        name: "Employees",
        description: "Employee records",
        icon: Users,
      },
      {
        id: "attendance",
        name: "Attendance",
        description: "Attendance management",
        icon: Clock3,
      },
      {
        id: "leave",
        name: "Leave Management",
        description: "Employee leave requests",
        icon: ClipboardCheck,
      },
      {
        id: "recruitment",
        name: "Recruitment",
        description: "Vacancies and candidates",
        icon: UserCog,
      },
      {
        id: "performance",
        name: "Performance",
        description: "Employee performance reviews",
        icon: BarChart3,
      },
      {
        id: "training",
        name: "Training",
        description: "Employee training programs",
        icon: BriefcaseBusiness,
      },
      {
        id: "hr-reports",
        name: "HR Reports",
        description: "Workforce reports",
        icon: FileChartColumn,
      },
    ],
  },
  {
    title: "Sales",
    items: [
      {
        id: "sales-dashboard",
        name: "Sales Dashboard",
        description: "Sales performance overview",
        icon: LayoutDashboard,
      },
      {
        id: "orders",
        name: "Orders",
        description: "Customer order management",
        icon: ShoppingBag,
        badge: "19",
      },
      {
        id: "customers",
        name: "Customers",
        description: "Customer records",
        icon: Users,
      },
      {
        id: "crm",
        name: "CRM",
        description: "Customer relationship management",
        icon: Contact,
      },
      {
        id: "sales-invoices",
        name: "Sales Invoices",
        description: "Invoice management",
        icon: ReceiptText,
      },
      {
        id: "returns",
        name: "Returns & Refunds",
        description: "Customer returns",
        icon: PackageCheck,
      },
      {
        id: "discounts",
        name: "Discounts",
        description: "Offers and coupon codes",
        icon: Tags,
      },
      {
        id: "sales-reports",
        name: "Sales Reports",
        description: "Sales analytics",
        icon: FileChartColumn,
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      {
        id: "inventory-dashboard",
        name: "Inventory Dashboard",
        description: "Inventory overview",
        icon: LayoutDashboard,
      },
      {
        id: "products",
        name: "Products",
        description: "Product catalogue",
        icon: Package,
      },
      {
        id: "inventory",
        name: "Inventory",
        description: "Live stock management",
        icon: Boxes,
      },
      {
        id: "warehouse",
        name: "Warehouse",
        description: "Warehouse operations",
        icon: Warehouse,
      },
      {
        id: "vendors",
        name: "Vendors",
        description: "Vendor records",
        icon: Building2,
      },
      {
        id: "purchase-orders",
        name: "Purchase Orders",
        description: "Procurement orders",
        icon: FileText,
      },
      {
        id: "stock-transfers",
        name: "Stock Transfers",
        description: "Move stock between locations",
        icon: PackageCheck,
      },
      {
        id: "shipping",
        name: "Shipping",
        description: "Shipping operations",
        icon: Truck,
      },
      {
        id: "inventory-reports",
        name: "Inventory Reports",
        description: "Stock and warehouse reports",
        icon: FileChartColumn,
      },
    ],
  },
  {
    title: "Customer Support",
    items: [
      {
        id: "support-dashboard",
        name: "Support Dashboard",
        description: "Support activity overview",
        icon: Headphones,
      },
      {
        id: "support-tickets",
        name: "Support Tickets",
        description: "Customer complaints and queries",
        icon: MessageCircle,
        badge: "12",
      },
      {
        id: "orders",
        name: "Customer Orders",
        description: "View customer orders",
        icon: ShoppingBag,
      },
      {
        id: "customers",
        name: "Customers",
        description: "Customer profiles",
        icon: Users,
      },
      {
        id: "returns",
        name: "Returns",
        description: "Assist with customer returns",
        icon: PackageCheck,
      },
      {
        id: "reviews",
        name: "Reviews",
        description: "Customer reviews",
        icon: MessageCircle,
      },
      {
        id: "support-reports",
        name: "Support Reports",
        description: "Support performance reports",
        icon: FileChartColumn,
      },
    ],
  },
];

export default function EmployeePage() {
  const router = useRouter();

  const [session, setSession] = useState<KeosSession | null>(null);
  const [activeModuleId, setActiveModuleId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const currentSession = getStoredSession();

    if (!currentSession) {
      router.replace("/");
      return;
    }

    if (currentSession.role === "Founder") {
      router.replace("/founder");
      return;
    }

    setSession(currentSession);
  }, [router]);

  const visibleGroups = useMemo(() => {
    if (!session) {
      return [];
    }

    return moduleGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          canAccessModule(session, item.id),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [session]);

  const visibleModules = useMemo(
    () => visibleGroups.flatMap((group) => group.items),
    [visibleGroups],
  );

  useEffect(() => {
    if (visibleModules.length > 0 && !activeModuleId) {
      setActiveModuleId(visibleModules[0].id);
    }
  }, [visibleModules, activeModuleId]);

  const activeModule =
    visibleModules.find((item) => item.id === activeModuleId) ??
    visibleModules[0];

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return visibleModules.filter((item) =>
      `${item.name} ${item.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery, visibleModules]);

  function handleLogout() {
    clearStoredSession();
    router.replace("/");
  }

  if (!session || !activeModule) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-xl font-black text-white">
            K
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Loading workspace...
          </p>
        </div>
      </main>
    );
  }

  const ActiveIcon = activeModule.icon;

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#0f172a] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 font-black">
            K
          </div>

          <div>
            <p className="font-black tracking-[0.18em]">KEOS</p>
            <p className="mt-1 text-[10px] text-slate-400">
              Employee Workspace
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mx-4 mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
            Authorized Department
          </p>

          <strong className="mt-2 block text-sm">
            {session.department}
          </strong>

          <span className="mt-1 block text-xs text-slate-400">
            Restricted employee access
          </span>
        </div>

        <nav className="keos-scrollbar flex-1 overflow-y-auto px-3 py-5">
          {visibleGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === activeModule.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        setActiveModuleId(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                        isActive
                          ? "bg-blue-600 font-semibold text-white shadow-lg shadow-blue-950/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />

                      <span className="min-w-0 flex-1 truncate">
                        {item.name}
                      </span>

                      {item.badge && (
                        <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Secure session active
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
        />
      )}

      <section className="min-h-screen lg:ml-[280px]">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="relative hidden max-w-xl flex-1 sm:block">
            <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Search size={18} className="text-slate-400" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={`Search ${session.department} modules`}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>

            {searchQuery && (
              <div className="absolute left-0 right-0 top-14 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                {filteredModules.length > 0 ? (
                  filteredModules.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => {
                          setActiveModuleId(item.id);
                          setSearchQuery("");
                        }}
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-blue-50"
                      >
                        <Icon size={18} className="text-blue-600" />

                        <div>
                          <strong className="block text-sm">
                            {item.name}
                          </strong>
                          <span className="text-xs text-slate-500">
                            {item.description}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <p className="p-5 text-center text-sm text-slate-500">
                    No authorized module found
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-2"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-100 text-xs font-black text-blue-700">
                  {session.name
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="hidden text-left sm:block">
                  <strong className="block text-xs text-slate-900">
                    {session.name}
                  </strong>
                  <span className="text-[10px] text-slate-500">
                    {session.department}
                  </span>
                </div>

                <ChevronDown size={15} className="text-slate-500" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-slate-100 p-3">
                    <strong className="block text-sm">
                      {session.name}
                    </strong>
                    <span className="mt-1 block text-xs text-slate-500">
                      {session.userId}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-blue-600">
                      {session.role}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="mt-2 flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <UserRound size={17} />
                    My Profile
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <Settings size={17} />
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-7 text-white shadow-xl shadow-blue-900/10 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              {session.department} Workspace
            </p>

            <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-black sm:text-4xl">
                  {activeModule.name}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
                  {activeModule.description}
                </p>
              </div>

              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15">
                <ActiveIcon size={30} />
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Department
              </p>
              <h2 className="mt-3 text-xl font-black text-slate-900">
                {session.department}
              </h2>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Access Level
              </p>
              <h2 className="mt-3 text-xl font-black text-blue-600">
                Department Only
              </h2>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Available Modules
              </p>
              <h2 className="mt-3 text-3xl font-black text-red-600">
                {visibleModules.length}
              </h2>
            </article>
          </section>

          <section className="mt-6 min-h-[380px] rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid min-h-[310px] place-items-center text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <ActiveIcon size={30} />
                </div>

                <h2 className="mt-5 text-2xl font-black text-slate-900">
                  {activeModule.name}
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                  Ye workspace {session.department} department ke liye
                  authorized hai. Doosre departments ke confidential modules
                  is employee account mein hide rahenge.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}