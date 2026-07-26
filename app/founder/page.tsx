"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Activity,
  AlertTriangle,
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
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tags,
  TrendingUp,
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
import WarehouseManagement from "@/components/founder/warehouse-management";
import ShippingManagement from "@/components/founder/shipping-management";
import ReturnsRefundsManagement from "@/components/founder/returns-refunds-management";
import PricingManagement from "@/components/founder/pricing-management";
import DiscountsPromotionsManagement from "@/components/founder/discounts-promotions-management";
import SalesChannelsManagement from "@/components/founder/sales-channels-management";
import AbandonedCartsManagement from "@/components/founder/abandoned-carts-management";
import CheckoutManagement from "@/components/founder/checkout-management";
import OrderTrackingManagement from "@/components/founder/order-tracking-management";
import CommerceReportsManagement from "@/components/founder/commerce-reports-management";
import CustomersManagement from "@/components/founder/customers-management";
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
          "Customer profiles, groups, loyalty, wallets, purchase history and analytics",
        icon: Users,
      },
      {
        id: "finance",
        name: "Finance",
        description:
          "Accounting, banking, taxation, budgeting, treasury and financial reporting",
        icon: CircleDollarSign,
      },
      {
        id: "employees",
        name: "Human Resources",
        description:
          "Employees, recruitment, attendance, leave, payroll and performance",
        icon: UserRound,
      },
      {
        id: "marketing",
        name: "Marketing",
        description:
          "Campaigns, audiences, social media, SEO, advertising and performance",
        icon: Megaphone,
      },
      {
        id: "support",
        name: "Customer Support",
        description:
          "Tickets, chat, calls, complaints, SLA, knowledge base and resolutions",
        icon: Headphones,
        badge: "12",
      },
      {
        id: "procurement",
        name: "Procurement",
        description:
          "Suppliers, RFQs, purchase orders, vendor bills, contracts and procurement",
        icon: ClipboardCheck,
      },
      {
        id: "crm",
        name: "CRM",
        description:
          "Leads, opportunities, contacts, accounts, follow-ups and sales pipeline",
        icon: Users,
      },
      {
        id: "vendor-management",
        name: "Vendor Management",
        description:
          "Vendor onboarding, compliance, performance, contracts and payments",
        icon: Building2,
      },
      {
        id: "projects",
        name: "Projects & Tasks",
        description:
          "Projects, milestones, task allocation, deadlines and execution tracking",
        icon: FileChartColumn,
      },
      {
        id: "documents",
        name: "Documents",
        description:
          "Enterprise documents, policies, records, approvals and version control",
        icon: FileChartColumn,
      },
      {
        id: "legal-compliance",
        name: "Legal & Compliance",
        description:
          "Legal matters, contracts, statutory compliance and regulatory controls",
        icon: ShieldCheck,
      },
      {
        id: "risk-management",
        name: "Risk Management",
        description:
          "Enterprise risks, controls, incidents, mitigation and monitoring",
        icon: Activity,
      },
      {
        id: "facilities",
        name: "Facilities & Assets",
        description:
          "Offices, facilities, company assets, maintenance and allocations",
        icon: Building2,
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
          "Enterprise AI assistant, intelligence, recommendations and workflow automation",
        icon: Sparkles,
      },
      {
        id: "ai-assistant",
        name: "AI Assistant",
        description:
          "Ask questions, analyse records and receive enterprise-wide operational answers",
        icon: Sparkles,
      },
      {
        id: "ai-automation",
        name: "AI Automation",
        description:
          "Automate repetitive workflows, approvals, alerts and departmental actions",
        icon: Activity,
      },
      {
        id: "forecasting",
        name: "Forecasting",
        description:
          "Revenue, demand, inventory, cash flow and workforce forecasting",
        icon: TrendingUp,
      },
      {
        id: "anomaly-detection",
        name: "Anomaly Detection",
        description:
          "Detect unusual transactions, stock movements, costs and operational exceptions",
        icon: AlertTriangle,
      },
      {
        id: "recommendations",
        name: "AI Recommendations",
        description:
          "Prioritised business recommendations for growth, savings and operational improvement",
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
        id: "executive-reports",
        name: "Executive Reports",
        description:
          "Founder and leadership summaries, scorecards, trends and decision briefs",
        icon: BarChart3,
      },
      {
        id: "department-reports",
        name: "Department Reports",
        description:
          "Commerce, finance, HR, marketing, support and operational reports",
        icon: FileChartColumn,
      },
      {
        id: "audit-reports",
        name: "Audit Reports",
        description:
          "Control, compliance, access, transaction and exception audit reporting",
        icon: ClipboardCheck,
      },
      {
        id: "administration",
        name: "Administration",
        description:
          "Users, roles, permissions, departments and system configuration",
        icon: Settings,
      },
      {
        id: "users-roles",
        name: "Users & Roles",
        description:
          "User accounts, role assignments, access levels and account lifecycle",
        icon: Users,
      },
      {
        id: "departments",
        name: "Departments",
        description:
          "Department structure, leadership, reporting lines and operational ownership",
        icon: Building2,
      },
      {
        id: "permissions",
        name: "Permissions",
        description:
          "Role-based permissions, module access, approval rights and data visibility",
        icon: ShieldCheck,
      },
      {
        id: "integrations",
        name: "Integrations",
        description:
          "Website, app, payment, courier, banking, marketplace and external system connections",
        icon: Link2,
      },
      {
        id: "security",
        name: "Security Center",
        description:
          "Authentication, sessions, access monitoring, threats and security policies",
        icon: ShieldCheck,
      },
      {
        id: "audit-logs",
        name: "Audit Logs",
        description:
          "Complete user activity, changes, approvals, exports and system event history",
        icon: Activity,
      },
      {
        id: "data-management",
        name: "Data Management",
        description:
          "Data imports, exports, backups, retention, validation and master data controls",
        icon: FileChartColumn,
      },
      {
        id: "notifications",
        name: "Notifications",
        description:
          "System alerts, email, SMS, WhatsApp and role-based notification rules",
        icon: Bell,
      },
      {
        id: "system-settings",
        name: "System Settings",
        description:
          "Company profile, numbering, preferences, localisation and enterprise configuration",
        icon: Settings,
      },
    ],
  },
];

const commerceWorkspaceIds = new Set<string>([
]);

const businessWorkspaceIds = new Set<string>([
  "finance",
  "employees",
  "marketing",
  "support",
  "procurement",
  "crm",
  "vendor-management",
  "projects",
  "documents",
  "legal-compliance",
  "risk-management",
  "facilities",
]);

const intelligenceWorkspaceIds = new Set<string>([
  "ai-center",
  "ai-assistant",
  "ai-automation",
  "forecasting",
  "anomaly-detection",
  "recommendations",
  "reports",
  "executive-reports",
  "department-reports",
  "audit-reports",
  "administration",
  "users-roles",
  "departments",
  "permissions",
  "integrations",
  "security",
  "audit-logs",
  "data-management",
  "notifications",
  "system-settings",
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
  const [aiCommandOpen, setAiCommandOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

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

          <div className="max-w-3xl flex-1">
            <button
              type="button"
              onClick={() => setAiCommandOpen(true)}
              className="group flex h-14 w-full items-center gap-4 rounded-2xl border border-violet-200 bg-white px-4 text-left shadow-sm transition-all hover:border-violet-400 hover:shadow-lg sm:px-5"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-600/20">
                <Sparkles size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <strong className="block text-sm font-black text-slate-900">
                  KRVE AI
                </strong>

                <span className="mt-0.5 block truncate text-xs text-slate-500">
                  Ask anything about your business...
                </span>
              </div>

              <div className="hidden items-center gap-1.5 sm:flex">
                <kbd className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500">
                  Ctrl
                </kbd>

                <span className="text-xs text-slate-300">+</span>

                <kbd className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500">
                  K
                </kbd>
              </div>
            </button>
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


        {aiCommandOpen && (
          <div className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-950/55 p-4 pt-24 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setAiCommandOpen(false)}
              className="absolute inset-0"
              aria-label="Close KRVE AI"
            />

            <section className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
              <div className="bg-gradient-to-r from-violet-700 via-blue-700 to-blue-950 p-6 text-white sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
                      <Sparkles size={24} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-200">
                        Enterprise AI Command
                      </p>

                      <h2 className="mt-1 text-2xl font-black">
                        KRVE AI
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAiCommandOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
                    aria-label="Close KRVE AI"
                  >
                    <X size={19} />
                  </button>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100">
                  Ask about revenue, orders, inventory, finance, employees,
                  approvals, risks or any KRVE operation.
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                  <textarea
                    value={aiPrompt}
                    onChange={(event) => setAiPrompt(event.target.value)}
                    placeholder="Example: Show today's revenue, low-stock products and pending founder approvals..."
                    rows={4}
                    className="w-full resize-none bg-transparent text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400"
                  />

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">
                      KRVE AI uses authorised enterprise data only.
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveModuleId("ai-center");
                        setAiCommandOpen(false);
                        setAiPrompt("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={!aiPrompt.trim()}
                      className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Ask KRVE AI
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Quick questions
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[
                      "Show today's revenue and orders",
                      "Which products need stock replenishment?",
                      "Show pending founder approvals",
                      "Summarise employee attendance",
                      "What risks need immediate attention?",
                      "Generate an executive business brief",
                    ].map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => setAiPrompt(question)}
                        className="rounded-xl border border-slate-200 bg-white p-3 text-left text-xs font-semibold leading-5 text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

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

        {activeModuleId === "warehouse" && (
          <WarehouseManagement />
        )}

        {activeModuleId === "shipping" && (
          <ShippingManagement />
        )}

        {activeModuleId === "returns-refunds" && (
          <ReturnsRefundsManagement />
        )}

        {activeModuleId === "pricing" && (
          <PricingManagement />
        )}

        {activeModuleId === "discounts-promotions" && (
          <DiscountsPromotionsManagement />
        )}

        {activeModuleId === "sales-channels" && (
          <SalesChannelsManagement />
        )}

        {activeModuleId === "abandoned-carts" && (
          <AbandonedCartsManagement />
        )}

        {activeModuleId === "checkout" && (
          <CheckoutManagement />
        )}

        {activeModuleId === "order-tracking" && (
          <OrderTrackingManagement />
        )}

        {activeModuleId === "commerce-reports" && (
          <CommerceReportsManagement />
        )}

        {commerceWorkspaceIds.has(activeModuleId) && (
          <CommerceModuleWorkspace item={activeNavigationItem} />
        )}

        {activeModuleId === "customers" && (
          <CustomersManagement />
        )}

        {activeModuleId !== "customers" &&
          businessWorkspaceIds.has(activeModuleId) && (
            <BusinessOperationsWorkspace item={activeNavigationItem} />
          )}

        {intelligenceWorkspaceIds.has(activeModuleId) && (
          <IntelligenceWorkspace item={activeNavigationItem} />
        )}

        {activeModuleId !== "dashboard" &&
          activeModuleId !== "analytics" &&
          activeModuleId !== "approvals" &&
          activeModuleId !== "orders" &&
          activeModuleId !== "products" &&
          activeModuleId !== "inventory" &&
          activeModuleId !== "warehouse" &&
          activeModuleId !== "shipping" &&
          activeModuleId !== "returns-refunds" &&
          activeModuleId !== "pricing" &&
          activeModuleId !== "discounts-promotions" &&
          activeModuleId !== "sales-channels" &&
          activeModuleId !== "abandoned-carts" &&
          activeModuleId !== "checkout" &&
          activeModuleId !== "order-tracking" &&
          activeModuleId !== "commerce-reports" &&
          !commerceWorkspaceIds.has(activeModuleId) &&
          !businessWorkspaceIds.has(activeModuleId) &&
          !intelligenceWorkspaceIds.has(activeModuleId) && (
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

function BusinessOperationsWorkspace({
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
      sections: Array<{ title: string; description: string }>;
      alerts: Array<{ title: string; detail: string; tone: "blue" | "green" | "orange" | "red" }>;
    }
  > = {
    customers: {
      eyebrow: "Customer Operations",
      summary:
        "Manage customer records, segmentation, loyalty, wallets, addresses, purchase history and relationship intelligence.",
      stats: [
        { label: "Total Customers", value: "4,294", note: "1,028 added this year" },
        { label: "Active Customers", value: "3,516", note: "Purchased in 90 days" },
        { label: "Loyalty Members", value: "1,842", note: "43% of customer base" },
        { label: "Customer LTV", value: "₹28,640", note: "Average lifetime value" },
      ],
      actions: ["Add Customer", "Create Segment", "Launch Loyalty Rule", "Export Customers"],
      sections: [
        { title: "Customer Directory", description: "Profiles, contacts, addresses and verification." },
        { title: "Segments & Groups", description: "VIP, repeat, inactive and custom audiences." },
        { title: "Loyalty & Wallet", description: "Points, tiers, credits and redemption controls." },
        { title: "Customer Analytics", description: "Retention, frequency, value and behaviour." },
      ],
      alerts: [
        { title: "VIP retention opportunity", detail: "86 high-value customers have not purchased in 45 days.", tone: "orange" },
        { title: "Loyalty growth", detail: "Membership conversion increased by 12.4% this month.", tone: "green" },
      ],
    },
    finance: {
      eyebrow: "Financial Control Center",
      summary:
        "Control accounting, receivables, payables, banking, taxation, budgeting, treasury, assets and enterprise reporting.",
      stats: [
        { label: "Net Revenue", value: "₹15.86L", note: "Current month" },
        { label: "Cash Position", value: "₹42.18L", note: "Across bank accounts" },
        { label: "Receivables", value: "₹6.42L", note: "₹1.18L overdue" },
        { label: "Payables", value: "₹8.74L", note: "Due within 30 days" },
      ],
      actions: ["Create Journal", "Record Receipt", "Approve Payment", "Open Finance Reports"],
      sections: [
        { title: "General Ledger", description: "Chart of accounts, journals and trial balance." },
        { title: "AP & AR", description: "Vendor bills, customer invoices and ageing." },
        { title: "Banking & Treasury", description: "Bank reconciliation, cash and liquidity." },
        { title: "Tax & Compliance", description: "GST, TDS, returns and statutory reporting." },
      ],
      alerts: [
        { title: "Overdue receivables", detail: "₹1.18L is overdue across 9 customer accounts.", tone: "red" },
        { title: "Cash coverage healthy", detail: "Current liquidity covers 4.8 months of operating expenses.", tone: "green" },
      ],
    },
    employees: {
      eyebrow: "People Operations",
      summary:
        "Manage employees, recruitment, attendance, leave, payroll, performance, learning and organisation structure.",
      stats: [
        { label: "Employees", value: "128", note: "124 currently active" },
        { label: "Open Positions", value: "14", note: "Across 6 departments" },
        { label: "Attendance", value: "94.6%", note: "Current month" },
        { label: "Payroll", value: "₹18.42L", note: "Next cycle estimate" },
      ],
      actions: ["Add Employee", "Open Recruitment", "Run Attendance", "Review Payroll"],
      sections: [
        { title: "Employee Directory", description: "Profiles, roles, documents and access." },
        { title: "Recruitment", description: "Jobs, candidates, interviews and offers." },
        { title: "Attendance & Leave", description: "Shifts, time records, leave and holidays." },
        { title: "Performance & Learning", description: "Goals, reviews, training and growth." },
      ],
      alerts: [
        { title: "Probation reviews due", detail: "7 employee reviews are due within the next 10 days.", tone: "orange" },
        { title: "Attendance improvement", detail: "Overall attendance improved by 2.8% this month.", tone: "green" },
      ],
    },
    marketing: {
      eyebrow: "Growth Operations",
      summary:
        "Plan and monitor campaigns, email, SMS, WhatsApp, social media, SEO, advertising, influencers and attribution.",
      stats: [
        { label: "Campaign Revenue", value: "₹7.26L", note: "Current month" },
        { label: "ROAS", value: "4.8x", note: "Across paid channels" },
        { label: "Active Campaigns", value: "11", note: "4 ending this week" },
        { label: "Audience Reach", value: "8.4L", note: "Last 30 days" },
      ],
      actions: ["Create Campaign", "Build Audience", "Launch Promotion", "Open Analytics"],
      sections: [
        { title: "Campaign Management", description: "Briefs, calendars, budgets and execution." },
        { title: "Direct Messaging", description: "Email, SMS and WhatsApp journeys." },
        { title: "Social & Influencers", description: "Content, creators and performance." },
        { title: "SEO & Paid Media", description: "Search, ads, keywords and attribution." },
      ],
      alerts: [
        { title: "Campaign budget alert", detail: "Two campaigns have consumed more than 85% of budget.", tone: "orange" },
        { title: "Strong creative signal", detail: "The Noir campaign is delivering 6.2x ROAS.", tone: "green" },
      ],
    },
    support: {
      eyebrow: "Customer Service Center",
      summary:
        "Manage tickets, live chat, calls, email, WhatsApp, complaints, SLA, knowledge base and service quality.",
      stats: [
        { label: "Open Tickets", value: "42", note: "12 high priority" },
        { label: "First Response", value: "6m 18s", note: "Average response time" },
        { label: "Resolution Rate", value: "92.4%", note: "Within SLA" },
        { label: "CSAT", value: "4.7/5", note: "Based on 1,284 ratings" },
      ],
      actions: ["Create Ticket", "Open Live Queue", "Assign Cases", "Review SLA"],
      sections: [
        { title: "Ticket Management", description: "Queues, priorities, owners and escalation." },
        { title: "Omnichannel Support", description: "Chat, calls, email and WhatsApp." },
        { title: "Knowledge Base", description: "Help articles, scripts and internal guidance." },
        { title: "Service Analytics", description: "SLA, CSAT, resolution and agent performance." },
      ],
      alerts: [
        { title: "SLA risk", detail: "5 priority tickets may breach SLA within 30 minutes.", tone: "red" },
        { title: "Customer satisfaction", detail: "CSAT improved from 4.5 to 4.7 this month.", tone: "green" },
      ],
    },
    procurement: {
      eyebrow: "Procurement Operations",
      summary:
        "Control suppliers, RFQs, purchase orders, receipts, vendor bills, contracts and procurement performance.",
      stats: [
        { label: "Open Purchase Orders", value: "18", note: "₹14.82L committed" },
        { label: "Pending Approvals", value: "6", note: "Founder or finance review" },
        { label: "Active Suppliers", value: "24", note: "5 strategic vendors" },
        { label: "On-Time Delivery", value: "91.8%", note: "Current quarter" },
      ],
      actions: ["Create RFQ", "Create Purchase Order", "Approve Request", "Review Suppliers"],
      sections: [
        { title: "Supplier Directory", description: "Supplier records, terms and performance." },
        { title: "RFQ & Quotations", description: "Requests, comparisons and selection." },
        { title: "Purchase Orders", description: "Approvals, receipts and closures." },
        { title: "Contracts & Spend", description: "Agreements, commitments and analytics." },
      ],
      alerts: [
        { title: "Approval queue", detail: "₹3.62L of purchase requests await approval.", tone: "orange" },
        { title: "Supplier performance", detail: "Three strategic suppliers maintain above 97% fulfilment.", tone: "green" },
      ],
    },
    crm: {
      eyebrow: "Revenue Relationship Management",
      summary:
        "Manage leads, opportunities, contacts, accounts, follow-ups, meetings, pipeline and revenue forecasting.",
      stats: [
        { label: "Active Leads", value: "286", note: "74 added this month" },
        { label: "Pipeline Value", value: "₹48.6L", note: "Across all stages" },
        { label: "Win Rate", value: "31.4%", note: "Rolling 90 days" },
        { label: "Follow-Ups Due", value: "38", note: "Due today" },
      ],
      actions: ["Add Lead", "Create Opportunity", "Schedule Follow-Up", "Open Pipeline"],
      sections: [
        { title: "Leads", description: "Capture, score, assign and qualify prospects." },
        { title: "Opportunities", description: "Stages, values, probability and closure." },
        { title: "Accounts & Contacts", description: "Organisations, people and relationships." },
        { title: "Activities & Forecast", description: "Calls, meetings, follow-ups and revenue." },
      ],
      alerts: [
        { title: "High-value opportunity", detail: "A ₹9.8L opportunity has moved to final negotiation.", tone: "blue" },
        { title: "Follow-up backlog", detail: "14 high-priority leads have overdue follow-ups.", tone: "orange" },
      ],
    },
    "vendor-management": {
      eyebrow: "Third-Party Governance",
      summary:
        "Manage vendor onboarding, due diligence, documents, contracts, performance, payments and compliance.",
      stats: [
        { label: "Active Vendors", value: "36", note: "Across 8 categories" },
        { label: "Onboarding", value: "5", note: "Verification in progress" },
        { label: "Contracts Expiring", value: "4", note: "Within 45 days" },
        { label: "Vendor Score", value: "4.6/5", note: "Average performance" },
      ],
      actions: ["Add Vendor", "Start Verification", "Review Contract", "Score Vendor"],
      sections: [
        { title: "Vendor Directory", description: "Profiles, categories and contacts." },
        { title: "Onboarding & KYC", description: "Documents, tax and bank verification." },
        { title: "Contracts", description: "Terms, renewals and obligations." },
        { title: "Performance", description: "Quality, service, delivery and risk." },
      ],
      alerts: [
        { title: "Contract renewal", detail: "Four vendor agreements expire within 45 days.", tone: "orange" },
        { title: "Compliance complete", detail: "92% of active vendors have complete documentation.", tone: "green" },
      ],
    },
    projects: {
      eyebrow: "Execution Management",
      summary:
        "Plan projects, allocate tasks, monitor milestones, dependencies, deadlines, budgets and delivery performance.",
      stats: [
        { label: "Active Projects", value: "17", note: "Across 7 departments" },
        { label: "Open Tasks", value: "184", note: "26 due this week" },
        { label: "On Track", value: "82%", note: "Project health" },
        { label: "At Risk", value: "3", note: "Need intervention" },
      ],
      actions: ["Create Project", "Add Task", "Assign Owner", "Review Timeline"],
      sections: [
        { title: "Project Portfolio", description: "Status, owners, budgets and priorities." },
        { title: "Tasks & Milestones", description: "Assignments, deadlines and dependencies." },
        { title: "Resource Planning", description: "Capacity, workload and allocation." },
        { title: "Project Reports", description: "Progress, risk, cost and closure." },
      ],
      alerts: [
        { title: "Deadline risk", detail: "Three milestones are forecast to miss target dates.", tone: "red" },
        { title: "Delivery momentum", detail: "42 tasks were completed during the last seven days.", tone: "green" },
      ],
    },
    documents: {
      eyebrow: "Enterprise Records",
      summary:
        "Store, classify, review, approve and control company documents, policies, records and versions.",
      stats: [
        { label: "Documents", value: "2,486", note: "Across all departments" },
        { label: "Pending Approval", value: "18", note: "Awaiting reviewers" },
        { label: "Expiring Records", value: "9", note: "Within 30 days" },
        { label: "Storage Used", value: "68%", note: "Secure document storage" },
      ],
      actions: ["Upload Document", "Create Policy", "Request Approval", "Open Archive"],
      sections: [
        { title: "Document Library", description: "Folders, tags, search and permissions." },
        { title: "Policies & SOPs", description: "Controlled procedures and acknowledgement." },
        { title: "Approvals", description: "Review workflows and signatures." },
        { title: "Versions & Audit", description: "Revision history and access logs." },
      ],
      alerts: [
        { title: "Policy acknowledgements", detail: "23 employees have pending policy acknowledgements.", tone: "orange" },
        { title: "Document security", detail: "No unauthorised access events detected this month.", tone: "green" },
      ],
    },
    "legal-compliance": {
      eyebrow: "Governance & Compliance",
      summary:
        "Track legal matters, contracts, licences, statutory requirements, regulatory obligations and compliance evidence.",
      stats: [
        { label: "Open Legal Matters", value: "7", note: "2 high priority" },
        { label: "Compliance Score", value: "96%", note: "Enterprise-wide" },
        { label: "Renewals Due", value: "5", note: "Within 60 days" },
        { label: "Open Actions", value: "11", note: "Assigned to owners" },
      ],
      actions: ["Add Legal Matter", "Create Compliance Task", "Review Contract", "Open Register"],
      sections: [
        { title: "Legal Matters", description: "Cases, notices, counsel and actions." },
        { title: "Contracts", description: "Drafts, reviews, obligations and renewals." },
        { title: "Statutory Compliance", description: "Registrations, filings and licences." },
        { title: "Evidence & Audit", description: "Controls, proofs and compliance reports." },
      ],
      alerts: [
        { title: "Licence renewal", detail: "Two statutory registrations require renewal this month.", tone: "orange" },
        { title: "Compliance health", detail: "All critical filings are currently up to date.", tone: "green" },
      ],
    },
    "risk-management": {
      eyebrow: "Enterprise Risk Center",
      summary:
        "Identify, assess, assign, monitor and mitigate operational, financial, legal, cyber and strategic risks.",
      stats: [
        { label: "Open Risks", value: "24", note: "4 rated high" },
        { label: "Controls Active", value: "86", note: "Across 9 functions" },
        { label: "Incidents", value: "3", note: "Current month" },
        { label: "Mitigation Complete", value: "78%", note: "Current quarter" },
      ],
      actions: ["Register Risk", "Report Incident", "Assign Control", "Review Heatmap"],
      sections: [
        { title: "Risk Register", description: "Categories, ratings, owners and treatment." },
        { title: "Controls", description: "Preventive, detective and corrective controls." },
        { title: "Incidents", description: "Events, impact, response and closure." },
        { title: "Risk Analytics", description: "Heatmaps, trends and residual exposure." },
      ],
      alerts: [
        { title: "High-risk exposure", detail: "Four risks remain above approved tolerance.", tone: "red" },
        { title: "Control improvement", detail: "Eight mitigation actions were closed this month.", tone: "green" },
      ],
    },
    facilities: {
      eyebrow: "Workplace & Asset Operations",
      summary:
        "Manage offices, facilities, company assets, maintenance, allocations, vendors and workplace readiness.",
      stats: [
        { label: "Company Assets", value: "486", note: "₹1.84Cr book value" },
        { label: "Assigned Assets", value: "412", note: "Across employees" },
        { label: "Maintenance Due", value: "16", note: "Within 30 days" },
        { label: "Active Locations", value: "4", note: "All operational" },
      ],
      actions: ["Add Asset", "Assign Asset", "Create Maintenance", "Open Facilities"],
      sections: [
        { title: "Asset Register", description: "Equipment, ownership, value and status." },
        { title: "Assignments", description: "Employee, department and location allocation." },
        { title: "Maintenance", description: "Schedules, requests, vendors and costs." },
        { title: "Facilities", description: "Locations, services, access and inspections." },
      ],
      alerts: [
        { title: "Maintenance schedule", detail: "16 assets are due for preventive maintenance.", tone: "orange" },
        { title: "Asset verification", detail: "96% of assigned assets were verified this quarter.", tone: "green" },
      ],
    },
  };

  const content = moduleContent[item.id];

  if (!content) {
    return <ModuleWorkspace item={item} />;
  }

  const toneClass = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-blue-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <ModuleIcon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
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
                    ? "flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-800 transition hover:bg-blue-50"
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
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Operational Modules
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Complete workflows available inside {item.name}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.sections.map((section, index) => (
              <button
                key={section.title}
                type="button"
                className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50/60"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-xs font-black text-white">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <strong className="block text-sm text-slate-900">
                      {section.title}
                    </strong>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {section.description}
                    </p>
                    <span className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
                      Open module
                      <ArrowRight
                        size={14}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
                <Sparkles size={22} />
              </div>
              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-300">
                KRVE AI Active
              </span>
            </div>

            <h2 className="mt-6 text-xl font-black">
              AI Operational Intelligence
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              KRVE AI monitors performance, exceptions, deadlines and risks
              inside {item.name}.
            </p>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
            >
              Open AI Intelligence
              <ArrowRight size={16} />
            </button>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">
              Attention & Insights
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Current operational signals
            </p>

            <div className="mt-5 space-y-3">
              {content.alerts.map((alert) => (
                <div
                  key={alert.title}
                  className={`rounded-2xl border p-4 ${toneClass[alert.tone]}`}
                >
                  <strong className="text-sm">{alert.title}</strong>
                  <p className="mt-2 text-xs leading-5 opacity-80">
                    {alert.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

function IntelligenceWorkspace({
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
      sections: Array<{ title: string; description: string }>;
      insights: Array<{
        title: string;
        detail: string;
        tone: "blue" | "green" | "orange" | "red";
      }>;
    }
  > = {
    "ai-center": {
      eyebrow: "Enterprise Intelligence",
      summary:
        "A unified AI command center for enterprise questions, insights, recommendations, forecasting and workflow automation.",
      stats: [
        { label: "AI Analyses Today", value: "1,284", note: "Across all departments" },
        { label: "Automations Active", value: "42", note: "31 completed today" },
        { label: "Decisions Assisted", value: "186", note: "Current month" },
        { label: "Estimated Savings", value: "₹4.82L", note: "Through AI actions" },
      ],
      actions: ["Ask KRVE AI", "Create Automation", "Generate Brief", "Open AI History"],
      sections: [
        { title: "Enterprise Assistant", description: "Ask questions across commerce, finance, HR and operations." },
        { title: "AI Workflows", description: "Create intelligent triggers, approvals and automated actions." },
        { title: "Forecasting", description: "Predict demand, revenue, cash flow and workforce needs." },
        { title: "Recommendations", description: "Prioritised actions for growth, savings and risk reduction." },
      ],
      insights: [
        { title: "Inventory opportunity", detail: "Redistributing two overstocked SKUs could release ₹1.26L in working capital.", tone: "green" },
        { title: "Cash flow watch", detail: "Vendor payments and receivables may create a ₹2.4L liquidity gap next week.", tone: "orange" },
      ],
    },
    "ai-assistant": {
      eyebrow: "Conversational Intelligence",
      summary:
        "Ask natural-language questions and receive data-backed answers from the complete KRVE operating system.",
      stats: [
        { label: "Questions Today", value: "328", note: "Across 14 users" },
        { label: "Answer Accuracy", value: "96.8%", note: "Based on feedback" },
        { label: "Reports Generated", value: "47", note: "During this week" },
        { label: "Average Response", value: "3.2s", note: "Enterprise queries" },
      ],
      actions: ["Start Conversation", "Analyse Department", "Generate Report", "View History"],
      sections: [
        { title: "Ask About Business", description: "Revenue, orders, inventory, finance and employee questions." },
        { title: "Document Analysis", description: "Summarise policies, contracts, reports and uploaded records." },
        { title: "Decision Support", description: "Compare options, risks, costs and expected outcomes." },
        { title: "Conversation History", description: "Secure searchable record of previous AI sessions." },
      ],
      insights: [
        { title: "Frequently asked", detail: "Revenue, stock health and pending approvals are the top query categories.", tone: "blue" },
        { title: "Time saved", detail: "AI-assisted reporting saved an estimated 38 staff hours this week.", tone: "green" },
      ],
    },
    "ai-automation": {
      eyebrow: "Intelligent Workflow Automation",
      summary:
        "Build and monitor automated actions for alerts, approvals, record updates and cross-department workflows.",
      stats: [
        { label: "Active Automations", value: "42", note: "Across 9 departments" },
        { label: "Runs Today", value: "1,086", note: "98.9% successful" },
        { label: "Manual Hours Saved", value: "126h", note: "Current month" },
        { label: "Failed Runs", value: "12", note: "Require review" },
      ],
      actions: ["Create Automation", "Use Template", "Review Failures", "Open Run History"],
      sections: [
        { title: "Workflow Builder", description: "Create triggers, conditions, approvals and actions." },
        { title: "Automation Templates", description: "Ready workflows for commerce, finance, HR and support." },
        { title: "Run History", description: "Execution status, logs, errors and performance." },
        { title: "Governance", description: "Permissions, limits, approvals and audit controls." },
      ],
      insights: [
        { title: "Optimisation available", detail: "Combining three inventory alerts could reduce duplicate notifications by 46%.", tone: "blue" },
        { title: "Failure attention", detail: "Twelve failed runs are linked to one disconnected courier integration.", tone: "red" },
      ],
    },
    forecasting: {
      eyebrow: "Predictive Intelligence",
      summary:
        "Forecast business demand, revenue, inventory, cash flow and workforce requirements using historical trends.",
      stats: [
        { label: "Revenue Forecast", value: "₹22.6L", note: "Next 30 days" },
        { label: "Demand Accuracy", value: "91.4%", note: "Rolling 90 days" },
        { label: "Cash Forecast", value: "₹38.2L", note: "Month-end estimate" },
        { label: "Hiring Need", value: "8", note: "Next quarter" },
      ],
      actions: ["Run Forecast", "Change Assumptions", "Compare Scenarios", "Export Forecast"],
      sections: [
        { title: "Revenue Forecast", description: "Sales, channel and category outlook." },
        { title: "Demand Forecast", description: "SKU-level stock and replenishment requirements." },
        { title: "Cash Flow Forecast", description: "Collections, payments and liquidity projections." },
        { title: "Workforce Forecast", description: "Hiring, capacity and payroll projections." },
      ],
      insights: [
        { title: "Demand peak expected", detail: "Formalwear demand is projected to rise 28% over the next six weeks.", tone: "green" },
        { title: "Scenario risk", detail: "A 10% increase in fulfilment cost would reduce forecast contribution by ₹1.7L.", tone: "orange" },
      ],
    },
    "anomaly-detection": {
      eyebrow: "Exception Intelligence",
      summary:
        "Continuously detect unusual transactions, stock movements, costs, access patterns and operational behaviour.",
      stats: [
        { label: "Open Anomalies", value: "17", note: "4 high severity" },
        { label: "Checked Today", value: "18,642", note: "Transactions and events" },
        { label: "False Positive Rate", value: "2.8%", note: "Current model" },
        { label: "Prevented Exposure", value: "₹2.16L", note: "Current quarter" },
      ],
      actions: ["Review Anomalies", "Create Rule", "Assign Investigation", "Tune Detection"],
      sections: [
        { title: "Financial Anomalies", description: "Payments, journals, refunds and duplicate entries." },
        { title: "Inventory Anomalies", description: "Unusual movements, shrinkage and adjustments." },
        { title: "Access Anomalies", description: "Login, permission and export behaviour." },
        { title: "Operational Anomalies", description: "Delays, costs and unusual performance changes." },
      ],
      insights: [
        { title: "High-priority anomaly", detail: "Three refunds from one account exceed the normal customer pattern.", tone: "red" },
        { title: "Stock variance", detail: "One warehouse adjustment differs materially from the previous cycle count.", tone: "orange" },
      ],
    },
    recommendations: {
      eyebrow: "AI Decision Recommendations",
      summary:
        "Receive prioritised recommendations based on growth potential, savings, customer experience and enterprise risk.",
      stats: [
        { label: "Open Recommendations", value: "24", note: "8 high priority" },
        { label: "Accepted", value: "68%", note: "Current quarter" },
        { label: "Value Realised", value: "₹7.84L", note: "Measured impact" },
        { label: "Under Review", value: "11", note: "Assigned to owners" },
      ],
      actions: ["Review Priorities", "Accept Recommendation", "Assign Owner", "View Impact"],
      sections: [
        { title: "Growth Recommendations", description: "Pricing, campaigns, conversion and retention." },
        { title: "Cost Recommendations", description: "Procurement, inventory and operational savings." },
        { title: "Risk Recommendations", description: "Controls, compliance and security improvements." },
        { title: "People Recommendations", description: "Hiring, workload, performance and learning." },
      ],
      insights: [
        { title: "Highest value action", detail: "A category price correction may improve monthly margin by ₹1.42L.", tone: "green" },
        { title: "Customer action", detail: "Re-engaging 86 high-value customers could generate ₹3.8L in sales.", tone: "blue" },
      ],
    },
    reports: {
      eyebrow: "Enterprise Reporting",
      summary:
        "Generate, schedule and distribute complete company, department, operational and management reports.",
      stats: [
        { label: "Reports Available", value: "86", note: "Across all functions" },
        { label: "Scheduled Reports", value: "24", note: "Automatic delivery" },
        { label: "Generated Today", value: "38", note: "PDF, Excel and dashboard" },
        { label: "Pending Reviews", value: "7", note: "Management approval" },
      ],
      actions: ["Generate Report", "Schedule Report", "Create Template", "Export Report"],
      sections: [
        { title: "Executive Reports", description: "Founder scorecards and leadership summaries." },
        { title: "Department Reports", description: "Commerce, finance, HR, marketing and operations." },
        { title: "Statutory Reports", description: "Tax, compliance and regulatory reporting." },
        { title: "Custom Report Builder", description: "Fields, filters, charts and delivery schedules." },
      ],
      insights: [
        { title: "Reporting efficiency", detail: "Scheduled reports replaced 46 manual report preparation tasks.", tone: "green" },
        { title: "Review pending", detail: "Seven management reports remain unsigned for the current period.", tone: "orange" },
      ],
    },
    "executive-reports": {
      eyebrow: "Leadership Reporting",
      summary:
        "Founder and executive reports covering enterprise performance, risks, decisions and strategic priorities.",
      stats: [
        { label: "Enterprise Score", value: "88/100", note: "Current operating health" },
        { label: "Revenue Growth", value: "18.4%", note: "Year over year" },
        { label: "Critical Risks", value: "4", note: "Leadership attention" },
        { label: "Approvals Pending", value: "8", note: "Founder action required" },
      ],
      actions: ["Generate Founder Brief", "Open Scorecard", "Review Risks", "Export Board Pack"],
      sections: [
        { title: "Founder Dashboard", description: "Enterprise KPIs, alerts and priorities." },
        { title: "Board Reporting", description: "Financial, strategic and governance packs." },
        { title: "Performance Scorecards", description: "Department and leadership scorecards." },
        { title: "Decision Briefs", description: "AI-generated context, options and recommendations." },
      ],
      insights: [
        { title: "Enterprise strength", detail: "Commerce growth and customer retention are above plan.", tone: "green" },
        { title: "Leadership attention", detail: "Inventory working capital and overdue receivables need action.", tone: "orange" },
      ],
    },
    "department-reports": {
      eyebrow: "Department Intelligence",
      summary:
        "Access consistent operational and performance reporting for every KRVE department.",
      stats: [
        { label: "Departments", value: "12", note: "All reporting enabled" },
        { label: "Reports This Month", value: "148", note: "Across departments" },
        { label: "On-Time Submission", value: "94%", note: "Current cycle" },
        { label: "Open Variances", value: "16", note: "Need explanation" },
      ],
      actions: ["Select Department", "Generate Monthly Report", "Compare Departments", "Schedule Delivery"],
      sections: [
        { title: "Commerce Reports", description: "Sales, orders, stock, fulfilment and returns." },
        { title: "Finance Reports", description: "Revenue, expenses, cash, tax and profitability." },
        { title: "People Reports", description: "Headcount, attendance, payroll and performance." },
        { title: "Growth & Service Reports", description: "Marketing, CRM and support performance." },
      ],
      insights: [
        { title: "Best-performing department", detail: "Sales & Commerce currently holds the highest operating score.", tone: "green" },
        { title: "Variance attention", detail: "Finance and inventory reports contain 16 unresolved variances.", tone: "orange" },
      ],
    },
    "audit-reports": {
      eyebrow: "Audit & Control Reporting",
      summary:
        "Review user actions, approvals, transactions, changes, exceptions and compliance evidence.",
      stats: [
        { label: "Audit Events", value: "28,486", note: "Current month" },
        { label: "Control Exceptions", value: "11", note: "3 high priority" },
        { label: "Completed Reviews", value: "96%", note: "Current audit plan" },
        { label: "Open Findings", value: "8", note: "Assigned for closure" },
      ],
      actions: ["Generate Audit Report", "Review Findings", "Export Logs", "Create Audit Plan"],
      sections: [
        { title: "Access Audit", description: "Logins, permissions and user activity." },
        { title: "Transaction Audit", description: "Financial, inventory and commerce changes." },
        { title: "Approval Audit", description: "Requests, reviewers, decisions and timestamps." },
        { title: "Compliance Audit", description: "Controls, evidence, findings and remediation." },
      ],
      insights: [
        { title: "Control health", detail: "No critical access violations were identified this month.", tone: "green" },
        { title: "Open finding", detail: "One procurement approval control requires evidence update.", tone: "orange" },
      ],
    },
    administration: {
      eyebrow: "Enterprise Administration",
      summary:
        "Control users, roles, departments, permissions, integrations, security, data and system configuration.",
      stats: [
        { label: "System Users", value: "148", note: "132 currently active" },
        { label: "Roles", value: "18", note: "Across all departments" },
        { label: "Integrations", value: "14", note: "12 connected" },
        { label: "Security Score", value: "96%", note: "Enterprise posture" },
      ],
      actions: ["Add User", "Create Role", "Configure System", "Review Security"],
      sections: [
        { title: "Users & Roles", description: "Accounts, roles, access and lifecycle." },
        { title: "Departments", description: "Structure, owners and reporting relationships." },
        { title: "System Configuration", description: "Company, numbering and preferences." },
        { title: "Security & Audit", description: "Policies, sessions, logs and controls." },
      ],
      insights: [
        { title: "Access review due", detail: "Nine user access reviews are due within seven days.", tone: "orange" },
        { title: "System health", detail: "All critical enterprise services are operational.", tone: "green" },
      ],
    },
    "users-roles": {
      eyebrow: "Identity Administration",
      summary:
        "Manage user accounts, employee access, roles, account status and authentication lifecycle.",
      stats: [
        { label: "Total Users", value: "148", note: "132 active users" },
        { label: "Roles", value: "18", note: "Department and functional" },
        { label: "Pending Invites", value: "6", note: "Awaiting activation" },
        { label: "Locked Accounts", value: "2", note: "Require administrator review" },
      ],
      actions: ["Create User", "Create Role", "Send Invitation", "Review Access"],
      sections: [
        { title: "User Directory", description: "Accounts, employees, status and authentication." },
        { title: "Role Management", description: "Role definitions and module assignments." },
        { title: "Access Reviews", description: "Periodic certification and revocation." },
        { title: "Account Security", description: "Sessions, resets, locks and activity." },
      ],
      insights: [
        { title: "Access review", detail: "Nine privileged accounts require quarterly certification.", tone: "orange" },
        { title: "Account security", detail: "No suspicious login pattern is currently active.", tone: "green" },
      ],
    },
    departments: {
      eyebrow: "Organisation Administration",
      summary:
        "Define departments, leadership, reporting structures, responsibilities and operating ownership.",
      stats: [
        { label: "Departments", value: "12", note: "All active" },
        { label: "Department Heads", value: "12", note: "Fully assigned" },
        { label: "Employees Mapped", value: "128", note: "100% organisational mapping" },
        { label: "Open Positions", value: "14", note: "Across 6 departments" },
      ],
      actions: ["Create Department", "Assign Head", "Edit Structure", "View Org Chart"],
      sections: [
        { title: "Department Directory", description: "Names, codes, heads and responsibilities." },
        { title: "Organisation Chart", description: "Reporting lines and hierarchy." },
        { title: "Cost Centres", description: "Financial and budget ownership." },
        { title: "Department Access", description: "Modules, records and approval authority." },
      ],
      insights: [
        { title: "Structure complete", detail: "All active employees are mapped to a department and manager.", tone: "green" },
        { title: "Capacity gap", detail: "Commerce and customer support have the highest open-position demand.", tone: "orange" },
      ],
    },
    permissions: {
      eyebrow: "Access Governance",
      summary:
        "Control module permissions, record visibility, approval authority and sensitive action rights.",
      stats: [
        { label: "Permission Rules", value: "286", note: "Across 18 roles" },
        { label: "Privileged Users", value: "14", note: "Enhanced access" },
        { label: "Access Reviews Due", value: "9", note: "Within 7 days" },
        { label: "Denied Actions", value: "42", note: "Current month" },
      ],
      actions: ["Create Permission", "Review Role Access", "Approve Exception", "Run Access Audit"],
      sections: [
        { title: "Module Access", description: "Department and role module visibility." },
        { title: "Record Permissions", description: "Own, team, department and enterprise data scope." },
        { title: "Action Rights", description: "Create, edit, delete, approve and export rights." },
        { title: "Permission Audit", description: "Changes, exceptions and certification." },
      ],
      insights: [
        { title: "Least privilege improvement", detail: "Four roles contain permissions not used during the last 90 days.", tone: "blue" },
        { title: "Review required", detail: "Nine privileged access assignments await certification.", tone: "orange" },
      ],
    },
    integrations: {
      eyebrow: "Connected Enterprise",
      summary:
        "Connect and monitor the KRVE website, app, payments, couriers, banks, marketplaces and external systems.",
      stats: [
        { label: "Integrations", value: "14", note: "12 connected" },
        { label: "API Calls Today", value: "84,628", note: "99.7% successful" },
        { label: "Sync Delays", value: "2", note: "Require review" },
        { label: "Data Updated", value: "2m ago", note: "Latest successful sync" },
      ],
      actions: ["Connect Integration", "Test Connection", "View API Logs", "Configure Sync"],
      sections: [
        { title: "Commerce Connections", description: "Website, mobile app and marketplaces." },
        { title: "Payment & Banking", description: "Gateways, settlements and bank feeds." },
        { title: "Shipping & Communication", description: "Couriers, email, SMS and WhatsApp." },
        { title: "API & Webhooks", description: "Keys, endpoints, logs and event delivery." },
      ],
      insights: [
        { title: "Connection issue", detail: "One courier integration is producing delayed tracking updates.", tone: "orange" },
        { title: "System reliability", detail: "API success rate remained above 99.7% this week.", tone: "green" },
      ],
    },
    security: {
      eyebrow: "Enterprise Security",
      summary:
        "Monitor authentication, active sessions, suspicious activity, security policies and access posture.",
      stats: [
        { label: "Security Score", value: "96%", note: "Enterprise posture" },
        { label: "Active Sessions", value: "74", note: "Across 48 users" },
        { label: "Blocked Attempts", value: "28", note: "Current month" },
        { label: "Open Alerts", value: "3", note: "No critical alerts" },
      ],
      actions: ["Review Security", "Revoke Session", "Create Policy", "Run Security Audit"],
      sections: [
        { title: "Authentication", description: "Login methods, password and MFA policies." },
        { title: "Session Management", description: "Active devices, expiry and revocation." },
        { title: "Threat Monitoring", description: "Suspicious access and behavioural alerts." },
        { title: "Security Policies", description: "Controls, exceptions and evidence." },
      ],
      insights: [
        { title: "Security posture strong", detail: "No critical security event is currently open.", tone: "green" },
        { title: "Policy action", detail: "Six users have not completed the latest security acknowledgement.", tone: "orange" },
      ],
    },
    "audit-logs": {
      eyebrow: "System Activity History",
      summary:
        "Review complete user activity, record changes, approvals, exports and system-generated events.",
      stats: [
        { label: "Events Today", value: "18,642", note: "User and system actions" },
        { label: "Changes Logged", value: "4,286", note: "Record-level changes" },
        { label: "Exports", value: "84", note: "Tracked downloads" },
        { label: "Flagged Events", value: "7", note: "Under review" },
      ],
      actions: ["Search Logs", "Export Audit Trail", "Create Alert Rule", "Review Flagged Events"],
      sections: [
        { title: "User Activity", description: "Logins, views, edits and actions." },
        { title: "Record Changes", description: "Before and after values with timestamps." },
        { title: "Approval History", description: "Requests, reviewers and decisions." },
        { title: "System Events", description: "Automations, integrations and background tasks." },
      ],
      insights: [
        { title: "Audit coverage", detail: "All sensitive modules have complete event logging enabled.", tone: "green" },
        { title: "Flagged export", detail: "One unusually large customer export requires administrator review.", tone: "orange" },
      ],
    },
    "data-management": {
      eyebrow: "Enterprise Data Control",
      summary:
        "Manage imports, exports, backups, retention, validation, cleansing and master data standards.",
      stats: [
        { label: "Master Records", value: "42,684", note: "Across enterprise datasets" },
        { label: "Data Quality", value: "97.2%", note: "Validation score" },
        { label: "Last Backup", value: "2h ago", note: "Completed successfully" },
        { label: "Import Jobs", value: "6", note: "2 currently running" },
      ],
      actions: ["Import Data", "Export Data", "Run Validation", "Create Backup"],
      sections: [
        { title: "Imports & Exports", description: "CSV, spreadsheet and system data movement." },
        { title: "Master Data", description: "Products, customers, vendors and accounting standards." },
        { title: "Data Quality", description: "Duplicates, missing values and validation rules." },
        { title: "Backup & Retention", description: "Schedules, recovery and data lifecycle." },
      ],
      insights: [
        { title: "Data quality strong", detail: "Enterprise validation score improved to 97.2%.", tone: "green" },
        { title: "Duplicate review", detail: "Thirty-two possible duplicate customer records need confirmation.", tone: "orange" },
      ],
    },
    notifications: {
      eyebrow: "Enterprise Communications",
      summary:
        "Configure system alerts, email, SMS, WhatsApp and role-based notification delivery.",
      stats: [
        { label: "Notifications Today", value: "4,286", note: "Across all channels" },
        { label: "Delivery Rate", value: "98.6%", note: "Current month" },
        { label: "Active Rules", value: "68", note: "Role and event based" },
        { label: "Failed Messages", value: "18", note: "Require retry" },
      ],
      actions: ["Create Rule", "Send Notification", "Manage Templates", "Review Delivery"],
      sections: [
        { title: "Notification Rules", description: "Events, audiences, channels and timing." },
        { title: "Templates", description: "Email, SMS, WhatsApp and in-app messages." },
        { title: "Delivery Logs", description: "Status, failures, retries and engagement." },
        { title: "User Preferences", description: "Role and individual notification choices." },
      ],
      insights: [
        { title: "Delivery performance", detail: "Notification delivery remained above 98% this month.", tone: "green" },
        { title: "Retry required", detail: "Eighteen messages failed because of invalid phone numbers.", tone: "orange" },
      ],
    },
    "system-settings": {
      eyebrow: "Enterprise Configuration",
      summary:
        "Configure company information, numbering, localisation, workflow defaults and system-wide preferences.",
      stats: [
        { label: "Configuration Areas", value: "24", note: "Enterprise settings" },
        { label: "Numbering Series", value: "18", note: "Orders, invoices and records" },
        { label: "Active Currencies", value: "1", note: "Indian Rupee" },
        { label: "Pending Changes", value: "3", note: "Awaiting approval" },
      ],
      actions: ["Edit Company Profile", "Configure Numbering", "Manage Preferences", "Review Changes"],
      sections: [
        { title: "Company Profile", description: "Legal, contact and branding information." },
        { title: "Numbering & Formats", description: "Document series, dates and identifiers." },
        { title: "Localisation", description: "Currency, timezone, tax and regional preferences." },
        { title: "Workflow Defaults", description: "Approvals, notifications and operating rules." },
      ],
      insights: [
        { title: "Configuration stable", detail: "No critical system configuration issue is active.", tone: "green" },
        { title: "Pending change", detail: "Three numbering configuration changes await approval.", tone: "orange" },
      ],
    },
  };

  const content = moduleContent[item.id];

  if (!content) {
    return <ModuleWorkspace item={item} />;
  }

  const toneClass = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-violet-950 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <ModuleIcon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-200">
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
                    ? "flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-800 transition hover:bg-violet-50"
                    : "flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
                }
              >
                {index === 0 ? <Sparkles size={17} /> : <ArrowRight size={17} />}
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
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`grid h-11 w-11 place-items-center rounded-xl ${
                index === 0
                  ? "bg-violet-50 text-violet-600"
                  : index === 1
                    ? "bg-blue-50 text-blue-600"
                    : index === 2
                      ? "bg-green-50 text-green-600"
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

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Intelligence Modules
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete capabilities available inside {item.name}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.sections.map((section, index) => (
              <button
                key={section.title}
                type="button"
                className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-left transition hover:border-violet-300 hover:bg-violet-50/60"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-xs font-black text-white">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <strong className="block text-sm text-slate-900">
                      {section.title}
                    </strong>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {section.description}
                    </p>

                    <span className="mt-4 flex items-center gap-2 text-xs font-bold text-violet-600">
                      Open module
                      <ArrowRight
                        size={14}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-600">
                <Sparkles size={22} />
              </div>

              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-300">
                Live Intelligence
              </span>
            </div>

            <h2 className="mt-6 text-xl font-black">
              KRVE AI Executive Brief
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Intelligence is continuously generated from current enterprise
              operations, records and approved data.
            </p>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold transition hover:bg-violet-700"
            >
              Generate Detailed Brief
              <ArrowRight size={16} />
            </button>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">
              Signals & Recommendations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current intelligence requiring attention
            </p>

            <div className="mt-5 space-y-3">
              {content.insights.map((insight) => (
                <div
                  key={insight.title}
                  className={`rounded-2xl border p-4 ${toneClass[insight.tone]}`}
                >
                  <strong className="text-sm">{insight.title}</strong>

                  <p className="mt-2 text-xs leading-5 opacity-80">
                    {insight.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
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