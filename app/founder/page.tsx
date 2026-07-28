"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useKeosFounderData } from "@/hooks/use-keos-founder-data";

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
  CalendarDays,
  Camera,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  Edit3,
  FileChartColumn,
  Headphones,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Package,
  Phone,
  Plus,
  ReceiptIndianRupee,
  RotateCcw,
  Save,
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
import FinanceManagement from "@/components/founder/finance-management";
import HumanResourcesManagement from "@/components/founder/human-resources-management";
import MarketingManagement from "@/components/founder/marketing-management";
import CustomerSupportManagement from "@/components/founder/customer-support-management";
import ProcurementManagement from "@/components/founder/procurement-management";
import CRMManagement from "@/components/founder/crm-management";
import VendorManagement from "@/components/founder/vendor-management";
import ProjectsTasksManagement from "@/components/founder/projects-tasks-management";
import DocumentsManagement from "@/components/founder/documents-management";
import LegalComplianceManagement from "@/components/founder/legal-compliance-management";
import RiskManagement from "@/components/founder/risk-management";
import FacilitiesAssetsManagement from "@/components/founder/facilities-assets-management";
import KrveAICenterManagement from "@/components/founder/krve-ai-center-management";
import AIAssistantManagement from "@/components/founder/ai-assistant-management";
import AIAutomationManagement from "@/components/founder/ai-automation-management";
import ForecastingManagement from "@/components/founder/forecasting-management";
import AnomalyDetectionManagement from "@/components/founder/anomaly-detection-management";
import AIRecommendationsManagement from "@/components/founder/ai-recommendations-management";
import EnterpriseReportsManagement from "@/components/founder/enterprise-reports-management";
import ExecutiveReportsManagement from "@/components/founder/executive-reports-management";
import DepartmentReportsManagement from "@/components/founder/department-reports-management";
import AuditReportsManagement from "@/components/founder/audit-reports-management";
import AdministrationManagement from "@/components/founder/administration-management";
import UsersRolesManagement from "@/components/founder/users-roles-management";
import DepartmentsManagement from "@/components/founder/departments-management";
import PermissionsManagement from "@/components/founder/permissions-management";
import IntegrationsManagement from "@/components/founder/integrations-management";
import SecurityCenterManagement from "@/components/founder/security-center-management";
import AuditLogsManagement from "@/components/founder/audit-logs-management";
import DataManagement from "@/components/founder/data-management";
import NotificationsManagement from "@/components/founder/notifications-management";
import SystemSettingsManagement from "@/components/founder/system-settings-management";
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

type FounderProfile = {
  name: string;
  userId: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  location: string;
  joiningDate: string;
  bio: string;
  avatar: string;
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
          "Track live fulfilment, courier movement and customer delivery status",
        icon: MapPin,
      },
      {
        id: "commerce-reports",
        name: "Commerce Reports",
        description:
          "Sales, product, customer, inventory and fulfilment reports",
        icon: FileChartColumn,
      },
    ],
  },
    {
    title: "Enterprise",
    items: [
      {
        id: "customers",
        name: "Customers",
        description:
          "Customer profiles, loyalty, segmentation and lifetime value",
        icon: Users,
      },
      {
        id: "finance",
        name: "Finance",
        description:
          "Revenue, accounting, GST, invoices, expenses and financial reporting",
        icon: ReceiptIndianRupee,
      },
      {
        id: "hr",
        name: "Human Resources",
        description:
          "Employees, attendance, payroll, recruitment and HR operations",
        icon: Building2,
      },
      {
        id: "marketing",
        name: "Marketing",
        description:
          "Campaigns, email, social media and performance marketing",
        icon: Megaphone,
      },
      {
        id: "support",
        name: "Customer Support",
        description:
          "Support tickets, chat, complaints and customer satisfaction",
        icon: Headphones,
      },
      {
        id: "procurement",
        name: "Procurement",
        description:
          "Purchase orders, vendors and sourcing operations",
        icon: ShoppingCart,
      },
      {
        id: "crm",
        name: "CRM",
        description:
          "Customer relationship management and sales pipeline",
        icon: Users,
      },
      {
        id: "vendors",
        name: "Vendor Management",
        description:
          "Vendor onboarding, contracts and supplier performance",
        icon: Truck,
      },
      {
        id: "projects",
        name: "Projects & Tasks",
        description:
          "Internal projects, milestones and departmental tasks",
        icon: CalendarDays,
      },
      {
        id: "documents",
        name: "Documents",
        description:
          "Enterprise document management and digital records",
        icon: FileChartColumn,
      },
      {
        id: "legal",
        name: "Legal & Compliance",
        description:
          "Policies, legal documents, audits and compliance tracking",
        icon: ShieldCheck,
      },
      {
        id: "risk",
        name: "Risk Management",
        description:
          "Business risk monitoring and mitigation planning",
        icon: AlertTriangle,
      },
      {
        id: "assets",
        name: "Facilities & Assets",
        description:
          "Office assets, infrastructure and maintenance",
        icon: Building2,
      },
    ],
  },

  {
    title: "KRVE AI",
    items: [
      {
        id: "krve-ai",
        name: "KRVE AI Center",
        description:
          "Central AI operating system and enterprise intelligence",
        icon: Sparkles,
      },
      {
        id: "ai-assistant",
        name: "AI Assistant",
        description:
          "Enterprise AI assistant for Founder and departments",
        icon: Sparkles,
      },
      {
        id: "automation",
        name: "Automation",
        description:
          "Workflow automation and intelligent business processes",
        icon: Activity,
      },
      {
        id: "forecasting",
        name: "Forecasting",
        description:
          "Demand forecasting, revenue prediction and AI planning",
        icon: TrendingUp,
      },
      {
        id: "anomaly",
        name: "Anomaly Detection",
        description:
          "Detect unusual activities and business anomalies",
        icon: AlertTriangle,
      },
      {
        id: "recommendations",
        name: "AI Recommendations",
        description:
          "AI-generated business insights and recommendations",
        icon: ArrowUpRight,
      },
    ],
  },

  {
    title: "Reports",
    items: [
      {
        id: "enterprise-reports",
        name: "Enterprise Reports",
        description:
          "Complete enterprise reporting dashboard",
        icon: FileChartColumn,
      },
      {
        id: "executive-reports",
        name: "Executive Reports",
        description:
          "Founder and executive level reports",
        icon: BarChart3,
      },
      {
        id: "department-reports",
        name: "Department Reports",
        description:
          "Department wise reports and KPIs",
        icon: ClipboardCheck,
      },
      {
        id: "audit-reports",
        name: "Audit Reports",
        description:
          "Audit history and compliance reports",
        icon: ShieldCheck,
      },
    ],
  },
    {
    title: "Administration",
    items: [
      {
        id: "administration",
        name: "Administration",
        description:
          "Central administration and enterprise configuration",
        icon: Settings,
      },
      {
        id: "users-roles",
        name: "Users & Roles",
        description:
          "Create users, assign roles and manage employee access",
        icon: Users,
      },
      {
        id: "departments",
        name: "Departments",
        description:
          "Manage departments, reporting structures and department heads",
        icon: Building2,
      },
      {
        id: "permissions",
        name: "Permissions",
        description:
          "Configure role-based access and module-level permissions",
        icon: ShieldCheck,
      },
      {
        id: "integrations",
        name: "Integrations",
        description:
          "Connect website, applications, payment systems and business tools",
        icon: Link2,
      },
      {
        id: "security-center",
        name: "Security Center",
        description:
          "Monitor access, threats, sessions and enterprise security",
        icon: ShieldCheck,
      },
      {
        id: "audit-logs",
        name: "Audit Logs",
        description:
          "Review system actions, login activity and administrative changes",
        icon: ClipboardCheck,
      },
      {
        id: "data-management",
        name: "Data Management",
        description:
          "Control data imports, exports, backups and retention",
        icon: Boxes,
      },
      {
        id: "notifications",
        name: "Notifications",
        description:
          "Manage alerts, email notifications and communication preferences",
        icon: Bell,
      },
      {
        id: "system-settings",
        name: "System Settings",
        description:
          "Configure KEOS identity, behaviour and enterprise preferences",
        icon: Settings,
      },
    ],
  },
];

const defaultFounderProfile: FounderProfile = {
  name: "Badal Kumar",
  userId: "KRVE-FOUNDER-001",
  email: "founder@krvefashionstudio.in",
  phone: "+91 98765 43210",
  designation: "Founder & Chief Executive Officer",
  department: "Founder Office",
  location: "Varanasi, Uttar Pradesh, India",
  joiningDate: "01 July 2026",
  bio: "Founder of KRVE and executive administrator of the KRVE Enterprise Operating System.",
  avatar: "",
};

const fallbackDashboardStatistics: DashboardStatistic[] = [
  {
    title: "Total Revenue",
    value: "₹12.84L",
    change: "+18.4%",
    description: "Compared with the previous period",
    icon: CircleDollarSign,
    tone: "blue",
  },
  {
    title: "Total Orders",
    value: "1,486",
    change: "+12.8%",
    description: "Across all active sales channels",
    icon: ShoppingBag,
    tone: "red",
  },
  {
    title: "Total Customers",
    value: "4,294",
    change: "+24.1%",
    description: "Registered and verified customers",
    icon: Users,
    tone: "green",
  },
  {
    title: "Total Employees",
    value: "128",
    change: "+6.2%",
    description: "Active employees across departments",
    icon: Building2,
    tone: "orange",
  },
];

const fallbackRecentOrders = [
  {
    id: "KRVE-1048",
    customer: "Aarav Sharma",
    product: "KRVE Noir Blazer",
    amount: "₹18,999",
    status: "Processing",
    date: "28 Jul 2026",
  },
  {
    id: "KRVE-1047",
    customer: "Ananya Singh",
    product: "Signature Evening Dress",
    amount: "₹14,499",
    status: "Shipped",
    date: "28 Jul 2026",
  },
  {
    id: "KRVE-1046",
    customer: "Rohan Verma",
    product: "Obsidian Double-Breasted Suit",
    amount: "₹24,999",
    status: "Delivered",
    date: "27 Jul 2026",
  },
  {
    id: "KRVE-1045",
    customer: "Ishita Mehra",
    product: "KRVE Icon Sneakers",
    amount: "₹8,999",
    status: "Pending",
    date: "27 Jul 2026",
  },
];

const notificationItems = [
  {
    id: 1,
    title: "Founder approval required",
    message: "Finance submitted a vendor payment request of ₹2,40,000.",
    time: "8 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Inventory warning",
    message: "Four products have reached their minimum stock level.",
    time: "24 minutes ago",
    unread: true,
  },
  {
    id: 3,
    title: "New employee onboarding",
    message: "HR created credentials for three new employees.",
    time: "1 hour ago",
    unread: false,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function getStatusClasses(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes("delivered")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (normalizedStatus.includes("shipped")) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (normalizedStatus.includes("processing")) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (
    normalizedStatus.includes("cancelled") ||
    normalizedStatus.includes("failed")
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-zinc-200 bg-zinc-50 text-zinc-700";
}

function getStatisticToneClasses(tone: DashboardStatistic["tone"]) {
  const toneClasses = {
    blue: {
      icon: "bg-blue-50 text-blue-700",
      change: "text-blue-700",
    },
    red: {
      icon: "bg-rose-50 text-rose-700",
      change: "text-rose-700",
    },
    green: {
      icon: "bg-emerald-50 text-emerald-700",
      change: "text-emerald-700",
    },
    orange: {
      icon: "bg-amber-50 text-amber-700",
      change: "text-amber-700",
    },
  };

  return toneClasses[tone];
}

export default function FounderPage() {
  const router = useRouter();

  const {
    data: liveFounderData,
    loading: liveDataLoading,
    source: liveDataSource,
  } = useKeosFounderData();

  const [session, setSession] = useState<KeosSession | null>(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [founderProfile, setFounderProfile] =
    useState<FounderProfile>(defaultFounderProfile);
  const [profileDraft, setProfileDraft] =
    useState<FounderProfile>(defaultFounderProfile);
  const [profileSaved, setProfileSaved] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<
    (typeof notificationItems)[number] | null
  >(null);

  useEffect(() => {
    const storedSession = getStoredSession();

    if (!storedSession) {
      router.replace("/");
      return;
    }

    setSession(storedSession);
  }, [router]);

  useEffect(() => {
    const storedProfile = window.localStorage.getItem(
      "keos-founder-profile"
    );

    if (!storedProfile) {
      return;
    }

    try {
      const parsedProfile = JSON.parse(storedProfile) as FounderProfile;
      setFounderProfile(parsedProfile);
      setProfileDraft(parsedProfile);
    } catch {
      window.localStorage.removeItem("keos-founder-profile");
    }
  }, []);

  const activeNavigationItem = useMemo(() => {
    return navigationGroups
      .flatMap((group) => group.items)
      .find((item) => item.id === activeSection);
  }, [activeSection]);

  const filteredNavigationGroups = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return navigationGroups;
    }

    return navigationGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          return (
            item.name.toLowerCase().includes(normalizedQuery) ||
            item.description.toLowerCase().includes(normalizedQuery)
          );
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery]);

  const resolvedDashboardStatistics = useMemo<DashboardStatistic[]>(() => {
    const statistics = liveFounderData?.statistics;

    if (!statistics) {
      return fallbackDashboardStatistics;
    }

    return [
      {
        ...fallbackDashboardStatistics[0],
        value:
          statistics.totalRevenue ??
          fallbackDashboardStatistics[0].value,
      },
      {
        ...fallbackDashboardStatistics[1],
        value:
          statistics.totalOrders ??
          fallbackDashboardStatistics[1].value,
      },
      {
        ...fallbackDashboardStatistics[2],
        value:
          statistics.totalCustomers ??
          fallbackDashboardStatistics[2].value,
      },
      {
        ...fallbackDashboardStatistics[3],
        value:
          statistics.totalEmployees ??
          fallbackDashboardStatistics[3].value,
      },
    ];
  }, [liveFounderData]);

  const resolvedRecentOrders = useMemo(() => {
    if (
      liveFounderData?.recentOrders &&
      liveFounderData.recentOrders.length > 0
    ) {
      return liveFounderData.recentOrders;
    }

    return fallbackRecentOrders;
  }, [liveFounderData]);

  function handleNavigation(sectionId: string) {
    setActiveSection(sectionId);
    setMobileSidebarOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
  }

  function handleLogout() {
    clearStoredSession();
    router.replace("/");
  }

  function handleProfileEdit() {
    setProfileDraft(founderProfile);
    setProfileSaved(false);
    setProfileEditorOpen(true);
    setProfileOpen(false);
  }

  function handleProfileSave() {
    setFounderProfile(profileDraft);
    window.localStorage.setItem(
      "keos-founder-profile",
      JSON.stringify(profileDraft)
    );
    setProfileSaved(true);

    window.setTimeout(() => {
      setProfileEditorOpen(false);
      setProfileSaved(false);
    }, 700);
  }

  function handleProfileReset() {
    setProfileDraft(defaultFounderProfile);
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f6f3]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-300 border-t-[#b89b5e]" />
          <p className="text-sm font-medium text-zinc-500">
            Loading Founder Center...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f3] text-zinc-950">
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden border-r border-white/10 bg-[#10100f] text-white transition-all duration-300 lg:flex lg:flex-col ${
          sidebarOpen ? "w-[292px]" : "w-[88px]"
        }`}
      >
        <div className="flex h-[82px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <button
            type="button"
            onClick={() => handleNavigation("dashboard")}
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#c7a96b]/30 bg-[#c7a96b]/10">
              <span className="font-serif text-lg font-semibold tracking-[0.12em] text-[#d7ba7d]">
                K
              </span>
            </div>

            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate font-serif text-lg font-semibold tracking-[0.12em]">
                  KEOS
                </p>
                <p className="truncate text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  Founder Command
                </p>
              </div>
            )}
          </button>

          {sidebarOpen && (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white"
              aria-label="Collapse sidebar"
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        {!sidebarOpen && (
          <div className="flex justify-center border-b border-white/10 py-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white"
              aria-label="Expand sidebar"
            >
              <Menu size={19} />
            </button>
          </div>
        )}

        {sidebarOpen && (
          <div className="shrink-0 px-4 pb-3 pt-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
              <Search size={16} className="shrink-0 text-zinc-500" />

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search modules..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-zinc-500 transition hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        )}

        <nav className="keos-sidebar-scroll flex-1 overflow-y-auto px-3 pb-5">
          <div className="space-y-7">
            {filteredNavigationGroups.map((group) => (
              <div key={group.title}>
                {sidebarOpen && (
                  <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                    {group.title}
                  </p>
                )}

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigation(item.id)}
                        title={!sidebarOpen ? item.name : undefined}
                        className={`group relative flex w-full items-center rounded-2xl text-left transition ${
                          sidebarOpen
                            ? "gap-3 px-3 py-3"
                            : "justify-center px-2 py-3"
                        } ${
                          isActive
                            ? "bg-[#c7a96b] text-[#15130f] shadow-[0_10px_25px_rgba(199,169,107,0.18)]"
                            : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.2 : 1.8}
                          className="shrink-0"
                        />

                        {sidebarOpen && (
                          <>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13px] font-medium">
                                {item.name}
                              </p>
                            </div>

                            {item.badge && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                  isActive
                                    ? "bg-black/10 text-[#15130f]"
                                    : "bg-white/10 text-zinc-400"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredNavigationGroups.length === 0 && sidebarOpen && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <Search size={20} className="mx-auto mb-2 text-zinc-600" />
                <p className="text-xs text-zinc-500">No module found</p>
              </div>
            )}
          </div>
        </nav>

        <div className="shrink-0 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((current) => !current);
              setNotificationOpen(false);
            }}
            className={`flex w-full items-center rounded-2xl transition hover:bg-white/[0.06] ${
              sidebarOpen ? "gap-3 px-3 py-3" : "justify-center p-2"
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c7a96b]/40 bg-[#c7a96b]/10">
              {founderProfile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={founderProfile.avatar}
                  alt={founderProfile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-[#d7ba7d]">
                  {getInitials(founderProfile.name)}
                </span>
              )}
            </div>

            {sidebarOpen && (
              <>
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-medium text-white">
                    {founderProfile.name}
                  </p>
                  <p className="truncate text-[11px] text-zinc-500">
                    Founder & CEO
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className={`text-zinc-600 transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {profileOpen && (
            <div
              className={`absolute bottom-20 rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-950 shadow-2xl ${
                sidebarOpen ? "left-4 w-[260px]" : "left-20 w-[240px]"
              }`}
            >
              <div className="border-b border-zinc-100 px-3 py-3">
                <p className="truncate text-sm font-semibold">
                  {founderProfile.name}
                </p>
                <p className="mt-1 truncate text-xs text-zinc-500">
                  {founderProfile.email}
                </p>
              </div>

              <button
                type="button"
                onClick={handleProfileEdit}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                <UserRound size={16} />
                View Founder Profile
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("system-settings")}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                <Settings size={16} />
                Account Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                Secure Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close mobile sidebar"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col bg-[#10100f] text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <button
            type="button"
            onClick={() => handleNavigation("dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c7a96b]/30 bg-[#c7a96b]/10">
              <span className="font-serif text-lg font-semibold tracking-[0.12em] text-[#d7ba7d]">
                K
              </span>
            </div>

            <div className="text-left">
              <p className="font-serif text-lg font-semibold tracking-[0.12em]">
                KEOS
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Founder Command
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="shrink-0 px-4 py-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
            <Search size={16} className="text-zinc-500" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search modules..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
            />
          </div>
        </div>

        <nav className="keos-sidebar-scroll flex-1 overflow-y-auto px-3 pb-5">
          <div className="space-y-7">
            {filteredNavigationGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                  {group.title}
                </p>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigation(item.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                          isActive
                            ? "bg-[#c7a96b] text-[#15130f]"
                            : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <Icon size={18} />

                        <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                          {item.name}
                        </span>

                        {item.badge && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              isActive
                                ? "bg-black/10"
                                : "bg-white/10 text-zinc-400"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={17} />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main workspace */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:pl-[292px]" : "lg:pl-[88px]"
        }`}
      >
        <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-[#f6f6f3]/90 backdrop-blur-xl">
          <div className="flex min-h-[82px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-700 shadow-sm lg:hidden"
              >
                <Menu size={19} />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b3f]">
                    Founder Office
                  </p>

                  <span className="hidden h-1 w-1 rounded-full bg-zinc-300 sm:block" />

                  <p className="hidden text-xs text-zinc-400 sm:block">
                    KRVE Enterprise Operating System
                  </p>
                </div>

                <h1 className="mt-1 truncate font-serif text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                  {activeNavigationItem?.name ?? "Founder Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div
                className={`hidden items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium xl:flex ${
                  liveDataLoading
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : liveDataSource === "api"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-zinc-200 bg-white text-zinc-600"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    liveDataLoading
                      ? "animate-pulse bg-amber-500"
                      : liveDataSource === "api"
                        ? "bg-emerald-500"
                        : "bg-zinc-400"
                  }`}
                />

                {liveDataLoading
                  ? "Connecting data"
                  : liveDataSource === "api"
                    ? "Live website data"
                    : "Demo data mode"}
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveSection("krve-ai");
                  setProfileOpen(false);
                  setNotificationOpen(false);
                }}
                className="hidden items-center gap-2 rounded-xl border border-[#c7a96b]/40 bg-[#c7a96b]/10 px-3.5 py-2.5 text-sm font-medium text-[#7c612f] transition hover:bg-[#c7a96b]/20 md:flex"
              >
                <Sparkles size={16} />
                KRVE AI
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen((current) => !current);
                    setProfileOpen(false);
                  }}
                  className="relative rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                  aria-label="Notifications"
                >
                  <Bell size={19} />

                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 top-[52px] w-[330px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl sm:w-[380px]">
                    <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-950">
                          Notifications
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-500">
                          Latest Founder alerts
                        </p>
                      </div>

                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">
                        2 new
                      </span>
                    </div>

                    <div className="max-h-[390px] overflow-y-auto">
                      {notificationItems.map((notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => {
                            setSelectedNotification(notification);
                            setNotificationOpen(false);
                          }}
                          className="flex w-full gap-3 border-b border-zinc-100 px-5 py-4 text-left transition last:border-0 hover:bg-zinc-50"
                        >
                          <div
                            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                              notification.unread
                                ? "bg-[#b89047]"
                                : "bg-zinc-300"
                            }`}
                          />

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-zinc-900">
                              {notification.title}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-zinc-500">
                              {notification.message}
                            </p>
                            <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                              {notification.time}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setNotificationOpen(false);
                        handleNavigation("notifications");
                      }}
                      className="flex w-full items-center justify-center gap-2 border-t border-zinc-100 px-5 py-3.5 text-xs font-semibold text-[#8b6b32] transition hover:bg-[#c7a96b]/10"
                    >
                      View all notifications
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen((current) => !current);
                  setNotificationOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-1.5 pr-2.5 shadow-sm transition hover:border-zinc-300"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#171714] text-[11px] font-semibold text-[#d7ba7d]">
                  {founderProfile.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founderProfile.avatar}
                      alt={founderProfile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(founderProfile.name)
                  )}
                </div>

                <div className="hidden max-w-[130px] text-left sm:block">
                  <p className="truncate text-xs font-semibold text-zinc-900">
                    {founderProfile.name}
                  </p>
                  <p className="truncate text-[10px] text-zinc-500">
                    Founder & CEO
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className={`hidden text-zinc-400 transition sm:block ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 xl:px-8 xl:py-8">
                    {activeSection === "dashboard" && (
            <div className="space-y-6">
              <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-[#151512] text-white shadow-sm">
                <div className="grid gap-8 px-6 py-8 sm:px-8 xl:grid-cols-[1fr_auto] xl:items-center xl:px-10 xl:py-10">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[#c7a96b]/30 bg-[#c7a96b]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7ba7d]">
                        Founder Control Center
                      </span>

                      <span className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Enterprise systems operational
                      </span>
                    </div>

                    <h2 className="mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                      Welcome back, {founderProfile.name.split(" ")[0]}.
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                      Monitor KRVE operations, revenue, customers, employees,
                      orders and departmental performance from one unified
                      enterprise command center.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleNavigation("analytics")}
                        className="flex items-center gap-2 rounded-xl bg-[#c7a96b] px-4 py-3 text-sm font-semibold text-[#17140f] transition hover:bg-[#d4b878]"
                      >
                        View Business Analytics
                        <ArrowUpRight size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavigation("approvals")}
                        className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
                      >
                        Review Approvals
                        <ClipboardCheck size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="hidden min-w-[240px] rounded-[24px] border border-white/10 bg-white/[0.04] p-5 xl:block">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                          Today
                        </p>
                        <p className="mt-2 font-serif text-2xl font-semibold">
                          28 July 2026
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c7a96b]/10 text-[#d7ba7d]">
                        <CalendarDays size={21} />
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">Pending approvals</span>
                        <span className="font-semibold text-white">08</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">Open alerts</span>
                        <span className="font-semibold text-amber-400">04</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">System health</span>
                        <span className="font-semibold text-emerald-400">
                          99.9%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {resolvedDashboardStatistics.map((statistic) => {
                  const Icon = statistic.icon;
                  const toneClasses = getStatisticToneClasses(statistic.tone);

                  return (
                    <article
                      key={statistic.title}
                      className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                            {statistic.title}
                          </p>

                          <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
                            {statistic.value}
                          </p>
                        </div>

                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${toneClasses.icon}`}
                        >
                          <Icon size={20} />
                        </div>
                      </div>

                      <div className="mt-5 border-t border-zinc-100 pt-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp
                            size={14}
                            className={toneClasses.change}
                          />

                          <span
                            className={`text-xs font-semibold ${toneClasses.change}`}
                          >
                            {statistic.change}
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-zinc-500">
                          {statistic.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
                <article className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-4 border-b border-zinc-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9a7b3f]">
                        Enterprise Performance
                      </p>

                      <h3 className="mt-2 font-serif text-xl font-semibold text-zinc-950">
                        Business Overview
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        Revenue and order performance across KRVE channels.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleNavigation("analytics")}
                      className="flex items-center gap-2 self-start rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50"
                    >
                      Full analytics
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-zinc-50 p-4">
                      <p className="text-xs text-zinc-500">Revenue Target</p>
                      <p className="mt-2 text-xl font-semibold text-zinc-950">
                        ₹18.00L
                      </p>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200">
                        <div className="h-full w-[71%] rounded-full bg-zinc-900" />
                      </div>

                      <p className="mt-2 text-[11px] text-zinc-500">
                        71.3% target achieved
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-50 p-4">
                      <p className="text-xs text-zinc-500">Average Order Value</p>
                      <p className="mt-2 text-xl font-semibold text-zinc-950">
                        ₹8,642
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700">
                        <TrendingUp size={14} />
                        9.8% increase
                      </div>

                      <p className="mt-2 text-[11px] text-zinc-500">
                        Compared with last month
                      </p>
                    </div>

                    <div className="rounded-2xl bg-zinc-50 p-4">
                      <p className="text-xs text-zinc-500">Conversion Rate</p>
                      <p className="mt-2 text-xl font-semibold text-zinc-950">
                        8.6%
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-700">
                        <Activity size={14} />
                        3.1% improvement
                      </div>

                      <p className="mt-2 text-[11px] text-zinc-500">
                        Website and mobile traffic
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[22px] border border-zinc-100 bg-[#fafaf8] p-5">
                    <div className="flex h-[220px] items-end gap-2 sm:gap-3">
                      {[42, 56, 49, 68, 61, 75, 72, 86, 79, 91, 84, 96].map(
                        (height, index) => (
                          <div
                            key={`${height}-${index}`}
                            className="flex h-full flex-1 items-end"
                          >
                            <div
                              className="w-full rounded-t-lg bg-[#181815] transition hover:bg-[#b89655]"
                              style={{ height: `${height}%` }}
                              title={`Month ${index + 1}`}
                            />
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-4 flex justify-between text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul</span>
                      <span>Sep</span>
                      <span>Nov</span>
                    </div>
                  </div>
                </article>

                <article className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="border-b border-zinc-100 pb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9a7b3f]">
                      Founder Attention
                    </p>

                    <h3 className="mt-2 font-serif text-xl font-semibold text-zinc-950">
                      Priority Actions
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      Important matters requiring review.
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      onClick={() => handleNavigation("approvals")}
                      className="flex w-full items-center gap-4 rounded-2xl border border-zinc-100 p-4 text-left transition hover:border-amber-200 hover:bg-amber-50/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                        <ClipboardCheck size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          8 approvals pending
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Finance, HR and procurement
                        </p>
                      </div>

                      <ArrowRight size={16} className="text-zinc-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigation("inventory")}
                      className="flex w-full items-center gap-4 rounded-2xl border border-zinc-100 p-4 text-left transition hover:border-red-200 hover:bg-red-50/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
                        <AlertTriangle size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          4 low-stock products
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Replenishment required
                        </p>
                      </div>

                      <ArrowRight size={16} className="text-zinc-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigation("support")}
                      className="flex w-full items-center gap-4 rounded-2xl border border-zinc-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                        <Headphones size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          12 support tickets
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          3 marked as urgent
                        </p>
                      </div>

                      <ArrowRight size={16} className="text-zinc-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigation("security-center")}
                      className="flex w-full items-center gap-4 rounded-2xl border border-zinc-100 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <ShieldCheck size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          Security status normal
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          No critical threat detected
                        </p>
                      </div>

                      <ArrowRight size={16} className="text-zinc-400" />
                    </button>
                  </div>
                </article>
              </section>

              <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 border-b border-zinc-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9a7b3f]">
                      Commerce Operations
                    </p>

                    <h3 className="mt-2 font-serif text-xl font-semibold text-zinc-950">
                      Recent Orders
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      Latest customer orders received across active channels.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavigation("orders")}
                    className="flex items-center gap-2 self-start rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50"
                  >
                    View all orders
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-[850px] w-full">
                    <thead>
                      <tr className="border-b border-zinc-100 text-left">
                        <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                          Order ID
                        </th>
                        <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                          Customer
                        </th>
                        <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                          Product
                        </th>
                        <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                          Amount
                        </th>
                        <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                          Status
                        </th>
                        <th className="pb-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {resolvedRecentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-zinc-100 last:border-0"
                        >
                          <td className="py-4 text-sm font-semibold text-zinc-950">
                            {order.id}
                          </td>

                          <td className="py-4 text-sm text-zinc-700">
                            {order.customer}
                          </td>

                          <td className="py-4 text-sm text-zinc-600">
                            {order.product}
                          </td>

                          <td className="py-4 text-sm font-semibold text-zinc-900">
                            {order.amount}
                          </td>

                          <td className="py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>

                          <td className="py-4 text-right text-sm text-zinc-500">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
                    {activeSection === "analytics" && <BusinessAnalytics />}

          {activeSection === "approvals" && <TasksApprovals />}

          {activeSection === "orders" && <OrdersManagement />}

          {activeSection === "products" && <ProductsManagement />}

          {activeSection === "inventory" && <InventoryManagement />}

          {activeSection === "warehouse" && <WarehouseManagement />}

          {activeSection === "shipping" && <ShippingManagement />}

          {activeSection === "returns-refunds" && (
            <ReturnsRefundsManagement />
          )}

          {activeSection === "pricing" && <PricingManagement />}

          {activeSection === "discounts-promotions" && (
            <DiscountsPromotionsManagement />
          )}

          {activeSection === "sales-channels" && (
            <SalesChannelsManagement />
          )}

          {activeSection === "abandoned-carts" && (
            <AbandonedCartsManagement />
          )}

          {activeSection === "checkout" && <CheckoutManagement />}

          {activeSection === "order-tracking" && (
            <OrderTrackingManagement />
          )}

          {activeSection === "commerce-reports" && (
            <CommerceReportsManagement />
          )}

          {activeSection === "customers" && <CustomersManagement />}

          {activeSection === "finance" && <FinanceManagement />}

          {activeSection === "hr" && <HumanResourcesManagement />}

          {activeSection === "marketing" && <MarketingManagement />}

          {activeSection === "support" && (
            <CustomerSupportManagement />
          )}

          {activeSection === "procurement" && (
            <ProcurementManagement />
          )}

          {activeSection === "crm" && <CRMManagement />}

          {activeSection === "vendors" && <VendorManagement />}

          {activeSection === "projects" && (
            <ProjectsTasksManagement />
          )}

          {activeSection === "documents" && <DocumentsManagement />}

          {activeSection === "legal" && (
            <LegalComplianceManagement />
          )}

          {activeSection === "risk" && <RiskManagement />}

          {activeSection === "assets" && (
            <FacilitiesAssetsManagement />
          )}

          {activeSection === "krve-ai" && <KrveAICenterManagement />}

          {activeSection === "ai-assistant" && (
            <AIAssistantManagement />
          )}

          {activeSection === "automation" && (
            <AIAutomationManagement />
          )}

          {activeSection === "forecasting" && (
            <ForecastingManagement />
          )}

          {activeSection === "anomaly" && (
            <AnomalyDetectionManagement />
          )}

          {activeSection === "recommendations" && (
            <AIRecommendationsManagement />
          )}

          {activeSection === "enterprise-reports" && (
            <EnterpriseReportsManagement />
          )}

          {activeSection === "executive-reports" && (
            <ExecutiveReportsManagement />
          )}

          {activeSection === "department-reports" && (
            <DepartmentReportsManagement />
          )}

          {activeSection === "audit-reports" && (
            <AuditReportsManagement />
          )}

          {activeSection === "administration" && (
            <AdministrationManagement />
          )}

          {activeSection === "users-roles" && (
            <UsersRolesManagement />
          )}

          {activeSection === "departments" && (
            <DepartmentsManagement />
          )}

          {activeSection === "permissions" && (
            <PermissionsManagement />
          )}

          {activeSection === "integrations" && (
            <IntegrationsManagement />
          )}

          {activeSection === "security-center" && (
            <SecurityCenterManagement />
          )}

          {activeSection === "audit-logs" && (
            <AuditLogsManagement />
          )}

          {activeSection === "data-management" && (
            <DataManagement />
          )}

          {activeSection === "notifications" && (
            <NotificationsManagement />
          )}

          {activeSection === "system-settings" && (
            <SystemSettingsManagement />
          )}
        </main>
        </div>

         {selectedNotification && (
  <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
    <button
      type="button"
      aria-label="Close notification detail"
      onClick={() => setSelectedNotification(null)}
      className="absolute inset-0 cursor-default"
    />

    <section className="relative z-10 w-full max-w-xl overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl">
      <div className="flex items-start justify-between border-b border-zinc-100 px-6 py-5">
        <div className="flex items-start gap-3">
          <div
            className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
              selectedNotification.unread
                ? "bg-[#b89047]"
                : "bg-zinc-300"
            }`}
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#94743a]">
              Founder Notification
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-zinc-950">
              {selectedNotification.title}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSelectedNotification(null)}
          className="rounded-xl border border-zinc-200 p-2.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>

      <div className="px-6 py-6">
        <p className="text-sm leading-7 text-zinc-600">
          {selectedNotification.message}
        </p>

        <div className="mt-6 rounded-2xl border border-zinc-100 bg-[#fafaf8] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Received
          </p>

          <p className="mt-2 text-sm font-medium text-zinc-800">
            {selectedNotification.time}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-zinc-100 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => setSelectedNotification(null)}
          className="rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => {
            if (selectedNotification.id === 1) {
              handleNavigation("approvals");
            } else if (selectedNotification.id === 2) {
              handleNavigation("inventory");
            } else if (selectedNotification.id === 3) {
              handleNavigation("hr");
            }

            setSelectedNotification(null);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#171714] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2b2923]"
        >
          Open Related Module
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  </div>
)}
      
            {/* Founder profile editor */}
      {profileEditorOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close profile editor"
            onClick={() => setProfileEditorOpen(false)}
            className="absolute inset-0 cursor-default"
          />

          <section className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-zinc-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7b3f]">
                  Founder Account
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-zinc-950">
                  Edit Founder Profile
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setProfileEditorOpen(false)}
                className="rounded-xl border border-zinc-200 p-2.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="Close founder profile"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
                <aside className="rounded-[24px] border border-zinc-200 bg-[#fafaf8] p-5">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[28px] border border-[#c7a96b]/30 bg-[#171714] text-2xl font-semibold text-[#d7ba7d]">
                        {profileDraft.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={profileDraft.avatar}
                            alt={profileDraft.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          getInitials(profileDraft.name)
                        )}
                      </div>

                      <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border-4 border-[#fafaf8] bg-[#c7a96b] text-[#17140f]">
                        <Camera size={17} />
                      </div>
                    </div>

                    <h3 className="mt-5 font-serif text-xl font-semibold text-zinc-950">
                      {profileDraft.name || "Founder Name"}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-[#94743a]">
                      {profileDraft.designation || "Founder & CEO"}
                    </p>

                    <div className="mt-5 w-full space-y-3 border-t border-zinc-200 pt-5 text-left">
                      <div className="flex items-start gap-3">
                        <Mail
                          size={15}
                          className="mt-0.5 shrink-0 text-zinc-400"
                        />
                        <p className="break-all text-xs leading-5 text-zinc-600">
                          {profileDraft.email || "No email provided"}
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone
                          size={15}
                          className="mt-0.5 shrink-0 text-zinc-400"
                        />
                        <p className="text-xs leading-5 text-zinc-600">
                          {profileDraft.phone || "No phone provided"}
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin
                          size={15}
                          className="mt-0.5 shrink-0 text-zinc-400"
                        />
                        <p className="text-xs leading-5 text-zinc-600">
                          {profileDraft.location || "No location provided"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700">
                        <ShieldCheck size={15} />
                        Founder Access Verified
                      </div>
                    </div>
                  </div>
                </aside>

                <div>
                  <div className="mb-5 flex items-center gap-2">
                    <Edit3 size={17} className="text-[#9a7b3f]" />

                    <h3 className="text-sm font-semibold text-zinc-950">
                      Personal and enterprise information
                    </h3>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Full name
                      </span>

                      <input
                        value={profileDraft.name}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        placeholder="Enter founder name"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Founder user ID
                      </span>

                      <input
                        value={profileDraft.userId}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...current,
                            userId: event.target.value,
                          }))
                        }
                        placeholder="Enter founder ID"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Email address
                      </span>

                      <input
                        type="email"
                        value={profileDraft.email}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        placeholder="Enter email address"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Phone number
                      </span>

                      <input
                        value={profileDraft.phone}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...current,
                            phone: event.target.value,
                          }))
                        }
                        placeholder="Enter phone number"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Designation
                      </span>

                      <input
                        value={profileDraft.designation}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...current,
                            designation: event.target.value,
                          }))
                        }
                        placeholder="Enter designation"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Department
                      </span>

                      <input
                        value={profileDraft.department}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...current,
                            department: event.target.value,
                          }))
                        }
                        placeholder="Enter department"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Location
                      </span>

                      <input
                        value={profileDraft.location}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...current,
                            location: event.target.value,
                          }))
                        }
                        placeholder="Enter location"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Joining date
                      </span>

                      <input
                        value={profileDraft.joiningDate}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...current,
                            joiningDate: event.target.value,
                          }))
                        }
                        placeholder="Enter joining date"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>
                  </div>

                  <label className="mt-5 block">
                    <span className="mb-2 block text-xs font-semibold text-zinc-700">
                      Profile image URL
                    </span>

                    <input
                      value={profileDraft.avatar}
                      onChange={(event) =>
                        setProfileDraft((current) => ({
                          ...current,
                          avatar: event.target.value,
                        }))
                      }
                      placeholder="Paste an image URL"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                    />

                    <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                      Paste a direct image URL. Leaving this field empty will
                      display the Founder initials.
                    </p>
                  </label>

                  <label className="mt-5 block">
                    <span className="mb-2 block text-xs font-semibold text-zinc-700">
                      Founder bio
                    </span>

                    <textarea
                      rows={5}
                      value={profileDraft.bio}
                      onChange={(event) =>
                        setProfileDraft((current) => ({
                          ...current,
                          bio: event.target.value,
                        }))
                      }
                      placeholder="Write a short Founder profile"
                      className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#b89655] focus:ring-4 focus:ring-[#c7a96b]/10"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 z-20 flex flex-col-reverse gap-3 border-t border-zinc-200 bg-white/95 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <button
                type="button"
                onClick={handleProfileReset}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                <RotateCcw size={16} />
                Reset default details
              </button>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setProfileEditorOpen(false)}
                  className="rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleProfileSave}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#171714] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#292925]"
                >
                  {profileSaved ? (
                    <>
                      <ShieldCheck size={16} />
                      Profile saved
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save founder profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
