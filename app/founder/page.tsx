"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  FileChartColumn,
  Headphones,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Truck,
  UserRound,
  Users,
  Warehouse,
  X,
} from "lucide-react";

import BusinessAnalytics from "@/components/founder/business-analytics";
import OrdersManagement from "@/components/founder/orders-management";
import ProductsManagement from "@/components/founder/products-management";
import TasksApprovals from "@/components/founder/tasks-approvals";

import {
  clearStoredSession,
  getStoredSession,
  type KeosSession,
} from "@/lib/access-control";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type NavigationItem = {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  badge?: string;
};

type NavigationGroup = {
  title: string;
  items: NavigationItem[];
};

type DashboardStatistic = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: IconType;
  tone: "blue" | "red" | "green" | "orange";
};

const navigationGroups: NavigationGroup[] = [
  {
    title: "Command Center",
    items: [
      {
        id: "dashboard",
        name: "Founder Dashboard",
        description:
          "Complete enterprise overview and Founder-level operational control",
        icon: LayoutDashboard,
      },
      {
        id: "analytics",
        name: "Business Analytics",
        description:
          "Enterprise analytics, performance metrics and business intelligence",
        icon: BarChart3,
      },
      {
        id: "approvals",
        name: "Tasks & Approvals",
        description:
          "Review departmental requests, tasks and Founder approvals",
        icon: ClipboardCheck,
        badge: "08",
      },
    ],
  },
  {
    title: "Commerce",
    items: [
      {
        id: "orders",
        name: "Orders",
        description:
          "Customer orders, payments, fulfilment, returns and refunds",
        icon: ShoppingBag,
        badge: "19",
      },
      {
        id: "products",
        name: "Products",
        description:
          "Product catalogue, variants, pricing, collections and publishing",
        icon: Package,
      },
      {
        id: "inventory",
        name: "Inventory",
        description:
          "Stock levels, movements, replenishment and inventory controls",
        icon: Boxes,
      },
      {
        id: "warehouse",
        name: "Warehouse",
        description:
          "Warehouse locations, receipts, picking, packing and transfers",
        icon: Warehouse,
      },
      {
        id: "shipping",
        name: "Shipping",
        description:
          "Courier management, shipments, tracking and delivery operations",
        icon: Truck,
      },
    ],
  },
  {
    title: "Business Operations",
    items: [
      {
        id: "customers",
        name: "Customers",
        description:
          "Customer profiles, segmentation, loyalty and relationship management",
        icon: Users,
      },
      {
        id: "finance",
        name: "Finance",
        description:
          "Finance, accounting, banking, taxation and financial reporting",
        icon: CircleDollarSign,
      },
      {
        id: "employees",
        name: "Human Resources",
        description:
          "Employees, recruitment, attendance, payroll and performance",
        icon: UserRound,
      },
      {
        id: "marketing",
        name: "Marketing",
        description:
          "Campaigns, audiences, promotions and marketing performance",
        icon: Megaphone,
      },
      {
        id: "support",
        name: "Customer Support",
        description:
          "Customer tickets, complaints, service requests and resolutions",
        icon: Headphones,
      },
    ],
  },
  {
    title: "Intelligence",
    items: [
      {
        id: "ai-center",
        name: "KRVE AI Center",
        description:
          "Enterprise AI assistant, intelligence and workflow automation",
        icon: Sparkles,
      },
      {
        id: "reports",
        name: "Enterprise Reports",
        description:
          "Company reports, departmental reports and management summaries",
        icon: FileChartColumn,
      },
      {
        id: "administration",
        name: "Administration",
        description:
          "Users, roles, permissions, departments and system configuration",
        icon: Settings,
      },
    ],
  },
];

const dashboardStatistics: DashboardStatistic[] = [
  {
    title: "Total Revenue",
    value: "₹12.84L",
    change: "+18.4%",
    description: "Compared with previous period",
    icon: CircleDollarSign,
    tone: "blue",
  },
  {
    title: "Total Orders",
    value: "1,486",
    change: "+12.7%",
    description: "Across all commerce channels",
    icon: ShoppingBag,
    tone: "red",
  },
  {
    title: "Total Customers",
    value: "4,294",
    change: "+24.1%",
    description: "1,028 new customers",
    icon: Users,
    tone: "green",
  },
  {
    title: "Employees",
    value: "128",
    change: "+8",
    description: "Active workforce",
    icon: Building2,
    tone: "orange",
  },
];

const recentOrders = [
  {
    id: "KRVE-10482",
    customer: "Aarav Sharma",
    amount: "₹18,999",
    status: "Paid",
  },
  {
    id: "KRVE-10481",
    customer: "Ananya Singh",
    amount: "₹8,499",
    status: "Processing",
  },
  {
    id: "KRVE-10480",
    customer: "Rohan Verma",
    amount: "₹12,999",
    status: "Shipped",
  },
  {
    id: "KRVE-10479",
    customer: "Priya Mehta",
    amount: "₹6,799",
    status: "Pending",
  },
];

const departmentStatus = [
  {
    name: "Finance",
    score: 89,
    status: "Operational",
  },
  {
    name: "Sales & Commerce",
    score: 93,
    status: "Excellent",
  },
  {
    name: "Inventory",
    score: 78,
    status: "Attention",
  },
  {
    name: "Human Resources",
    score: 84,
    status: "Operational",
  },
];

export default function FounderPage() {
  const router = useRouter();

  const [session, setSession] = useState<KeosSession | null>(
    null,
  );

  const [activeModuleId, setActiveModuleId] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const currentSession = getStoredSession();

    if (!currentSession) {
      router.replace("/");
      return;
    }

    if (currentSession.role !== "Founder") {
      router.replace("/employee");
      return;
    }

    setSession(currentSession);
  }, [router]);

  const allNavigationItems = useMemo(
    () =>
      navigationGroups.flatMap((group) => group.items),
    [],
  );

  const activeNavigationItem = useMemo(
    () =>
      allNavigationItems.find(
        (item) => item.id === activeModuleId,
      ) ?? allNavigationItems[0],
    [activeModuleId, allNavigationItems],
  );

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return allNavigationItems.filter((item) =>
      `${item.name} ${item.description}`
        .toLowerCase()
        .includes(query),
    );
  }, [allNavigationItems, searchQuery]);

  function openModule(moduleId: string) {
    setActiveModuleId(moduleId);
    setSidebarOpen(false);
    setProfileOpen(false);
    setSearchQuery("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleLogout() {
    clearStoredSession();
    router.replace("/");
  }

  if (!session) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-xl font-black text-white">
            K
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Loading Founder Command Center...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[285px] flex-col bg-[#0f172a] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-20 items-center gap-3 border-b border-white/10 px-5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 font-black">
            K
          </div>

          <div className="min-w-0">
            <p className="font-black tracking-[0.18em]">
              KEOS
            </p>

            <p className="mt-1 truncate text-[10px] text-slate-400">
              Founder Command Center
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden"
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mx-4 mt-5 rounded-xl border border-blue-400/20 bg-blue-500/10 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
            Founder Access
          </p>

          <strong className="mt-2 block text-sm">
            Full Enterprise Control
          </strong>

          <span className="mt-1 block text-xs text-slate-400">
            All departments authorized
          </span>
        </div>

        <nav className="keos-scrollbar flex-1 overflow-y-auto px-3 py-5">
          {navigationGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    activeModuleId === item.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => openModule(item.id)}
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
            Enterprise systems operational
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
          aria-label="Close navigation"
        />
      )}

      <section className="min-h-screen lg:ml-[285px]">
        <header className="sticky top-0 z-30 flex min-h-20 items-center gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          <div className="relative hidden max-w-xl flex-1 sm:block">
            <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search across KEOS..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X
                    size={16}
                    className="text-slate-400"
                  />
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="absolute left-0 right-0 top-14 max-h-[430px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => {
                    const ResultIcon = item.icon;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() =>
                          openModule(item.id)
                        }
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition hover:bg-blue-50"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                          <ResultIcon size={18} />
                        </div>

                        <div className="min-w-0">
                          <strong className="block truncate text-sm text-slate-900">
                            {item.name}
                          </strong>

                          <span className="mt-1 block truncate text-xs text-slate-500">
                            {item.description}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-7 text-center">
                    <Search
                      size={25}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-semibold text-slate-600">
                      No module found
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell size={18} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((current) => !current)
                }
                className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 transition hover:bg-slate-50"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-100 text-xs font-black text-blue-700">
                  BK
                </div>

                <div className="hidden text-left sm:block">
                  <strong className="block text-xs text-slate-900">
                    {session.name}
                  </strong>

                  <span className="text-[10px] text-red-600">
                    Founder
                  </span>
                </div>

                <ChevronDown
                  size={15}
                  className={`text-slate-500 transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-slate-100 p-3">
                    <strong className="block text-sm text-slate-900">
                      {session.name}
                    </strong>

                    <span className="mt-1 block text-xs text-slate-500">
                      {session.userId}
                    </span>

                    <span className="mt-1 block text-xs font-semibold text-red-600">
                      Founder
                    </span>
                  </div>

                  <button
                    type="button"
                    className="mt-2 flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                  >
                    <UserRound size={17} />
                    Founder Profile
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                  >
                    <Settings size={17} />
                    System Settings
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {activeModuleId === "dashboard" && (
          <FounderDashboard
            founderName={session.name}
            onOpenAnalytics={() =>
              openModule("analytics")
            }
            onOpenApprovals={() =>
              openModule("approvals")
            }
            onOpenOrders={() =>
              openModule("orders")
            }
            onOpenProducts={() =>
              openModule("products")
            }
          />
        )}

        {activeModuleId === "analytics" && (
          <BusinessAnalytics />
        )}

        {activeModuleId === "approvals" && (
          <TasksApprovals />
        )}

        {activeModuleId === "orders" && (
          <OrdersManagement />
        )}

        {activeModuleId === "products" && (
          <ProductsManagement />
        )}

        {activeModuleId !== "dashboard" &&
          activeModuleId !== "analytics" &&
          activeModuleId !== "approvals" &&
          activeModuleId !== "orders" &&
          activeModuleId !== "products" && (
            <ModuleWorkspace
              item={activeNavigationItem}
            />
          )}
      </section>
    </main>
  );
}

function FounderDashboard({
  founderName,
  onOpenAnalytics,
  onOpenApprovals,
  onOpenOrders,
  onOpenProducts,
}: {
  founderName: string;
  onOpenAnalytics: () => void;
  onOpenApprovals: () => void;
  onOpenOrders: () => void;
  onOpenProducts: () => void;
}) {
  const founderFirstName =
    founderName.trim().split(" ")[0] || "Founder";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 p-7 text-white shadow-xl shadow-blue-900/10 sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Founder Command Center
            </p>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              Welcome back, {founderFirstName}.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
              Monitor KRVE commerce, products, customers,
              financial performance, employees and enterprise
              operations from one secure workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenAnalytics}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <BarChart3 size={18} />
              Analytics
            </button>

            <button
              type="button"
              onClick={onOpenApprovals}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <ClipboardCheck size={18} />
              Approvals
            </button>

            <button
              type="button"
              onClick={onOpenOrders}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <ShoppingBag size={18} />
              Orders
            </button>

            <button
              type="button"
              onClick={onOpenProducts}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              <Package size={18} />
              Products
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStatistics.map((statistic) => {
          const StatisticIcon = statistic.icon;

          const iconClass =
            statistic.tone === "red"
              ? "bg-red-50 text-red-600"
              : statistic.tone === "green"
                ? "bg-green-50 text-green-600"
                : statistic.tone === "orange"
                  ? "bg-orange-50 text-orange-600"
                  : "bg-blue-50 text-blue-600";

          return (
            <article
              key={statistic.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`grid h-11 w-11 place-items-center rounded-xl ${iconClass}`}
                >
                  <StatisticIcon size={21} />
                </div>

                <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
                  <ArrowUpRight size={13} />
                  {statistic.change}
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {statistic.title}
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                {statistic.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {statistic.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Revenue Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monthly enterprise revenue trend
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenAnalytics}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Detailed Analytics
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-8 flex h-64 items-end gap-4">
            {[42, 56, 49, 68, 76, 88].map(
              (height, index) => (
                <div
                  key={`${height}-${index}`}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <div className="flex h-52 w-full items-end rounded-xl bg-slate-50 p-1">
                    <div
                      className={`w-full rounded-lg transition-all ${
                        index === 5
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs text-slate-500">
                    {
                      [
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                      ][index]
                    }
                  </span>
                </div>
              ),
            )}
          </div>
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
                <Sparkles size={22} />
              </div>

              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-300">
                AI Online
              </span>
            </div>

            <h2 className="mt-6 text-xl font-black">
              KRVE AI Assistant
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Analyse orders, products, customers, finance,
              inventory and company performance using KRVE AI.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold text-blue-300">
                  Current insight
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Two products require stock replenishment
                  within the next ten days.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold text-green-300">
                  Growth opportunity
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Mobile commerce conversion is currently
                  outperforming website conversion.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
            >
              Open KRVE AI
              <ArrowRight size={17} />
            </button>
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest customer commerce activity
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenOrders}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View All Orders
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="pb-4 font-semibold">
                    Order
                  </th>

                  <th className="pb-4 font-semibold">
                    Customer
                  </th>

                  <th className="pb-4 font-semibold">
                    Amount
                  </th>

                  <th className="pb-4 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 text-sm"
                  >
                    <td className="py-4 font-bold text-blue-600">
                      {order.id}
                    </td>

                    <td className="py-4 text-slate-700">
                      {order.customer}
                    </td>

                    <td className="py-4 font-bold text-slate-900">
                      {order.amount}
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          order.status === "Pending"
                            ? "bg-red-50 text-red-700"
                            : order.status === "Paid"
                              ? "bg-green-50 text-green-700"
                              : order.status === "Shipped"
                                ? "bg-violet-50 text-violet-700"
                                : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Department Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current operational performance
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {departmentStatus.map((department) => (
              <div key={department.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <strong className="text-xs text-slate-800">
                      {department.name}
                    </strong>

                    <span
                      className={`ml-2 text-[10px] font-bold ${
                        department.status === "Attention"
                          ? "text-red-600"
                          : department.status === "Excellent"
                            ? "text-green-600"
                            : "text-blue-600"
                      }`}
                    >
                      {department.status}
                    </span>
                  </div>

                  <strong className="text-xs text-slate-800">
                    {department.score}%
                  </strong>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      department.status === "Attention"
                        ? "bg-red-500"
                        : department.status === "Excellent"
                          ? "bg-green-600"
                          : "bg-blue-600"
                    }`}
                    style={{
                      width: `${department.score}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <QuickModuleCard
          title="Orders Management"
          description="Manage fulfilment, payments, returns and delivery."
          icon={ShoppingBag}
          buttonLabel="Manage Orders"
          onClick={onOpenOrders}
          tone="blue"
        />

        <QuickModuleCard
          title="Product Management"
          description="Manage catalogue, variants, pricing and publishing."
          icon={Package}
          buttonLabel="Manage Products"
          onClick={onOpenProducts}
          tone="red"
        />

        <QuickModuleCard
          title="Business Analytics"
          description="Review company growth and operational performance."
          icon={BarChart3}
          buttonLabel="View Analytics"
          onClick={onOpenAnalytics}
          tone="green"
        />

        <QuickModuleCard
          title="Tasks & Approvals"
          description="Review requests requiring Founder authorization."
          icon={ClipboardCheck}
          buttonLabel="Review Approvals"
          onClick={onOpenApprovals}
          tone="orange"
        />
      </section>
    </div>
  );
}

function QuickModuleCard({
  title,
  description,
  icon: Icon,
  buttonLabel,
  onClick,
  tone,
}: {
  title: string;
  description: string;
  icon: IconType;
  buttonLabel: string;
  onClick: () => void;
  tone: "blue" | "red" | "green" | "orange";
}) {
  const iconClass =
    tone === "red"
      ? "bg-red-50 text-red-600"
      : tone === "green"
        ? "bg-green-50 text-green-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <article className="flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${iconClass}`}
      >
        <Icon size={21} />
      </div>

      <h3 className="mt-5 text-base font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-auto flex items-center gap-2 pt-5 text-xs font-bold text-blue-600"
      >
        {buttonLabel}
        <ArrowRight size={15} />
      </button>
    </article>
  );
}

function ModuleWorkspace({
  item,
}: {
  item: NavigationItem;
}) {
  const ModuleIcon = item.icon;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid min-h-[520px] place-items-center text-center">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <ModuleIcon size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-black text-slate-900">
              {item.name}
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              {item.description}. This Founder-level module
              will contain the related operations, records,
              reports, workflows and enterprise controls.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
              <Activity size={15} />
              Module development ready
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}