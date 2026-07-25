"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  FileChartColumn,
  Headphones,
  LayoutDashboard,
  Link2,
  LogOut,
  Megaphone,
  Menu,
  Package,
  Plus,
  ReceiptIndianRupee,
  RotateCcw,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tags,
  Truck,
  UserRound,
  Users,
  Warehouse,
  X,
} from "lucide-react";

import BusinessAnalytics from "@/components/founder/business-analytics";
import OrdersManagement from "@/components/founder/orders-management";
import ProductsManagement from "@/components/founder/products-management";
import InventoryManagement from "@/components/founder/inventory-management";
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
          "Customer orders, payments, fulfilment, cancellations and order lifecycle",
        icon: ShoppingBag,
        badge: "19",
      },
      {
        id: "products",
        name: "Products",
        description:
          "Product catalogue, variants, collections, categories and publishing",
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
          "Warehouse locations, receiving, picking, packing and transfers",
        icon: Warehouse,
      },
      {
        id: "shipping",
        name: "Shipping",
        description:
          "Courier partners, shipments, tracking, labels and delivery operations",
        icon: Truck,
      },
      {
        id: "returns-refunds",
        name: "Returns & Refunds",
        description:
          "Return requests, exchanges, inspections, refunds and reverse logistics",
        icon: RotateCcw,
        badge: "04",
      },
      {
        id: "pricing",
        name: "Pricing",
        description:
          "Price lists, margins, cost controls, dynamic pricing and price history",
        icon: Tags,
      },
      {
        id: "discounts-promotions",
        name: "Discounts & Promotions",
        description:
          "Coupons, offers, bundles, campaigns and promotional rules",
        icon: BadgePercent,
      },
      {
        id: "sales-channels",
        name: "Sales Channels",
        description:
          "Website, mobile app, marketplaces, stores and channel integrations",
        icon: Link2,
      },
      {
        id: "abandoned-carts",
        name: "Abandoned Carts",
        description:
          "Recover incomplete carts, automate follow-ups and monitor recovery value",
        icon: ShoppingCart,
      },
      {
        id: "checkout",
        name: "Checkout Management",
        description:
          "Checkout configuration, payment methods, addresses and conversion controls",
        icon: CreditCard,
      },
      {
        id: "order-tracking",
        name: "Order Tracking",
        description:
          "Track shipments, delivery milestones, exceptions and customer updates",
        icon: ReceiptIndianRupee,
      },
      {
        id: "commerce-reports",
        name: "Commerce Reports",
        description:
          "Sales, revenue, returns, fulfilment and channel performance reports",
        icon: FileChartColumn,
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

const commerceWorkspaceIds = new Set([
  "warehouse",
  "shipping",
  "returns-refunds",
  "pricing",
  "discounts-promotions",
  "sales-channels",
  "abandoned-carts",
  "checkout",
  "order-tracking",
  "commerce-reports",
]);

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

        {activeModuleId === "inventory" && (
          <InventoryManagement />
        )}

        {commerceWorkspaceIds.has(activeModuleId) && (
          <CommerceModuleWorkspace item={activeNavigationItem} />
        )}

        {activeModuleId !== "dashboard" &&
          activeModuleId !== "analytics" &&
          activeModuleId !== "approvals" &&
          activeModuleId !== "orders" &&
          activeModuleId !== "products" &&
          activeModuleId !== "inventory" &&
          !commerceWorkspaceIds.has(activeModuleId) && (
            <ModuleWorkspace item={activeNavigationItem} />
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

function CommerceModuleWorkspace({
  item,
}: {
  item: NavigationItem;
}) {
  const ModuleIcon = item.icon;

  const moduleContent: Record<
    string,
    {
      eyebrow: string;
      summary: string;
      stats: Array<{ label: string; value: string; note: string }>;
      actions: string[];
      workflow: string[];
    }
  > = {
    warehouse: {
      eyebrow: "Fulfilment Infrastructure",
      summary:
        "Control receiving, storage locations, picking, packing, cycle counts and warehouse transfers.",
      stats: [
        { label: "Active Warehouses", value: "3", note: "All operational" },
        { label: "Storage Usage", value: "64%", note: "Across all locations" },
        { label: "Pending Receipts", value: "12", note: "Awaiting verification" },
        { label: "Pick Accuracy", value: "98.7%", note: "Last 30 days" },
      ],
      actions: ["Create Warehouse", "Receive Stock", "Start Picking", "Create Transfer"],
      workflow: [
        "Receiving & quality verification",
        "Bin and rack location management",
        "Picking, packing and dispatch",
        "Cycle count and warehouse audit",
      ],
    },
    shipping: {
      eyebrow: "Delivery Operations",
      summary:
        "Manage courier partners, shipment creation, tracking, labels, delivery exceptions and service performance.",
      stats: [
        { label: "Shipments Today", value: "86", note: "Across all couriers" },
        { label: "In Transit", value: "142", note: "Live shipments" },
        { label: "Delivered", value: "96.4%", note: "Successful delivery rate" },
        { label: "Delivery Exceptions", value: "7", note: "Require attention" },
      ],
      actions: ["Create Shipment", "Print Labels", "Track Orders", "Manage Couriers"],
      workflow: [
        "Courier allocation and rate selection",
        "Shipping label and manifest generation",
        "Live tracking and customer updates",
        "NDR and delivery exception handling",
      ],
    },
    "returns-refunds": {
      eyebrow: "Reverse Commerce",
      summary:
        "Manage return requests, exchanges, inspections, approvals, refunds and reverse logistics.",
      stats: [
        { label: "Open Returns", value: "14", note: "Awaiting action" },
        { label: "Refund Pending", value: "₹42,800", note: "Across 6 requests" },
        { label: "Exchanges", value: "8", note: "In progress" },
        { label: "Return Rate", value: "3.2%", note: "Current month" },
      ],
      actions: ["Review Returns", "Approve Refund", "Create Exchange", "Inspect Item"],
      workflow: [
        "Customer return request review",
        "Pickup and reverse shipment",
        "Inspection and disposition",
        "Refund or exchange completion",
      ],
    },
    pricing: {
      eyebrow: "Commercial Controls",
      summary:
        "Control product prices, cost structures, margins, dynamic rules and historical price changes.",
      stats: [
        { label: "Active Price Lists", value: "4", note: "Retail and channel based" },
        { label: "Average Margin", value: "57.8%", note: "Across catalogue" },
        { label: "Price Reviews", value: "11", note: "Pending approval" },
        { label: "Margin Alerts", value: "3", note: "Below threshold" },
      ],
      actions: ["Create Price List", "Review Margins", "Bulk Price Update", "View Price History"],
      workflow: [
        "Base price and selling price control",
        "Channel-specific pricing",
        "Margin and profitability monitoring",
        "Price approval and audit history",
      ],
    },
    "discounts-promotions": {
      eyebrow: "Growth & Promotions",
      summary:
        "Create coupons, offers, bundles and campaign rules while protecting contribution margin.",
      stats: [
        { label: "Active Offers", value: "9", note: "Currently live" },
        { label: "Coupon Uses", value: "486", note: "Current month" },
        { label: "Discount Revenue", value: "₹3.84L", note: "Attributed sales" },
        { label: "Expiring Soon", value: "3", note: "Within 7 days" },
      ],
      actions: ["Create Coupon", "Launch Offer", "Create Bundle", "Review Campaigns"],
      workflow: [
        "Coupon and promotion rule setup",
        "Audience and channel targeting",
        "Budget and margin safeguards",
        "Campaign performance reporting",
      ],
    },
    "sales-channels": {
      eyebrow: "Omnichannel Commerce",
      summary:
        "Connect and manage the KRVE website, mobile app, marketplaces and offline commerce channels.",
      stats: [
        { label: "Connected Channels", value: "4", note: "All synchronised" },
        { label: "Website Share", value: "68%", note: "Of total sales" },
        { label: "Marketplace Orders", value: "214", note: "Current month" },
        { label: "Sync Issues", value: "2", note: "Require review" },
      ],
      actions: ["Connect Channel", "Sync Catalogue", "Map Inventory", "Review Channel Sales"],
      workflow: [
        "Channel connection and authentication",
        "Catalogue and pricing synchronisation",
        "Inventory allocation by channel",
        "Order and settlement reconciliation",
      ],
    },
    "abandoned-carts": {
      eyebrow: "Conversion Recovery",
      summary:
        "Monitor abandoned carts and recover potential revenue through automated customer follow-ups.",
      stats: [
        { label: "Open Carts", value: "126", note: "Last 7 days" },
        { label: "Cart Value", value: "₹9.42L", note: "Potential revenue" },
        { label: "Recovered", value: "₹1.86L", note: "Current month" },
        { label: "Recovery Rate", value: "19.7%", note: "Automated campaigns" },
      ],
      actions: ["View Carts", "Create Recovery Rule", "Send Reminder", "Review Recovery Analytics"],
      workflow: [
        "Cart abandonment detection",
        "Customer segmentation",
        "Email, SMS and WhatsApp recovery",
        "Recovered revenue attribution",
      ],
    },
    checkout: {
      eyebrow: "Conversion Infrastructure",
      summary:
        "Configure checkout experience, payments, addresses, taxes, validation and fraud controls.",
      stats: [
        { label: "Checkout Conversion", value: "71.6%", note: "Current month" },
        { label: "Payment Success", value: "94.8%", note: "Across gateways" },
        { label: "Failed Payments", value: "23", note: "Last 24 hours" },
        { label: "Average Checkout", value: "1m 42s", note: "Completion time" },
      ],
      actions: ["Configure Checkout", "Manage Payments", "Review Failures", "Set Validation Rules"],
      workflow: [
        "Address and contact collection",
        "Shipping and payment selection",
        "Tax, discount and validation checks",
        "Payment completion and order creation",
      ],
    },
    "order-tracking": {
      eyebrow: "Customer Delivery Visibility",
      summary:
        "Track every shipment milestone, delivery exception and customer notification from dispatch to delivery.",
      stats: [
        { label: "Tracked Orders", value: "284", note: "Live orders" },
        { label: "On Schedule", value: "91.2%", note: "Within promised date" },
        { label: "Delayed", value: "11", note: "Require intervention" },
        { label: "Delivered Today", value: "74", note: "Confirmed deliveries" },
      ],
      actions: ["Track Order", "View Delays", "Send Update", "Manage Exceptions"],
      workflow: [
        "Shipment milestone synchronisation",
        "Customer tracking page",
        "Delay and exception alerts",
        "Proof of delivery and closure",
      ],
    },
    "commerce-reports": {
      eyebrow: "Commerce Intelligence",
      summary:
        "Analyse sales, revenue, fulfilment, returns, products, channels and commerce profitability.",
      stats: [
        { label: "Gross Sales", value: "₹18.24L", note: "Current month" },
        { label: "Net Revenue", value: "₹15.86L", note: "After returns and discounts" },
        { label: "Orders", value: "1,486", note: "All channels" },
        { label: "AOV", value: "₹10,673", note: "Average order value" },
      ],
      actions: ["Sales Report", "Product Report", "Channel Report", "Export Commerce Data"],
      workflow: [
        "Sales and revenue reporting",
        "Product and category performance",
        "Returns and fulfilment analysis",
        "Channel and profitability insights",
      ],
    },
  };

  const content = moduleContent[item.id];

  if (!content) {
    return <ModuleWorkspace item={item} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
                <ModuleIcon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                {content.eyebrow}
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {item.name}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              {content.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {content.actions.slice(0, 2).map((action, index) => (
              <button
                key={action}
                type="button"
                className={
                  index === 1
                    ? "flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                    : "flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
                }
              >
                {index === 0 ? <Plus size={17} /> : <ArrowRight size={17} />}
                {action}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {content.stats.map((stat, index) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div
              className={`grid h-11 w-11 place-items-center rounded-xl ${
                index === 0
                  ? "bg-blue-50 text-blue-600"
                  : index === 1
                    ? "bg-green-50 text-green-600"
                    : index === 2
                      ? "bg-violet-50 text-violet-600"
                      : "bg-orange-50 text-orange-600"
              }`}
            >
              <ModuleIcon size={20} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              {stat.label}
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">
              {stat.value}
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              {stat.note}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Operational Workspace
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Core workflows available inside {item.name}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.workflow.map((workflow, index) => (
              <div
                key={workflow}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-600 text-xs font-black text-white">
                    {index + 1}
                  </span>

                  <div>
                    <strong className="text-sm text-slate-900">
                      {workflow}
                    </strong>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Manage records, approvals, actions and audit history from
                      one controlled workflow.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
              <Sparkles size={22} />
            </div>
            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-300">
              Intelligence Active
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black">
            KRVE AI Commerce Insight
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI reviews operational performance, exceptions and commercial
            opportunities across this module.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold text-blue-300">
                Recommended action
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Review pending exceptions and complete high-priority actions
                before the next operating cycle.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold text-green-300">
                Performance signal
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Current module performance remains within the operational
                target range.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Detailed Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
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