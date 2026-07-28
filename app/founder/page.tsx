"use client";

import type { ChangeEvent, ComponentType } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
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

type FounderNotification = {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  relatedSection: string;
};

type FounderRecentOrder = {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
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
          "Department-wise reports and KPIs",
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

const fallbackRecentOrders: FounderRecentOrder[] = [
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

const notificationItems: FounderNotification[] = [
  {
    id: 1,
    title: "Founder approval required",
    message: "Finance submitted a vendor payment request of ₹2,40,000.",
    time: "8 minutes ago",
    unread: true,
    relatedSection: "approvals",
  },
  {
    id: 2,
    title: "Inventory warning",
    message: "Four products have reached their minimum stock level.",
    time: "24 minutes ago",
    unread: true,
    relatedSection: "inventory",
  },
  {
    id: 3,
    title: "New employee onboarding",
    message: "HR created credentials for three new employees.",
    time: "1 hour ago",
    unread: false,
    relatedSection: "hr",
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

  if (
    normalizedStatus.includes("delivered") ||
    normalizedStatus.includes("paid")
  ) {
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
    normalizedStatus.includes("failed") ||
    normalizedStatus.includes("refunded")
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

function isSupportedImage(file: File) {
  return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
}

function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Invalid image data"));
    };

    reader.onerror = () => {
      reject(new Error("Photo could not be loaded"));
    };

    reader.readAsDataURL(file);
  });
}
export default function FounderPage() {
  const router = useRouter();
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

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
  const [selectedNotification, setSelectedNotification] =
    useState<FounderNotification | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);

  const [founderProfile, setFounderProfile] =
    useState<FounderProfile>(defaultFounderProfile);

  const [profileDraft, setProfileDraft] =
    useState<FounderProfile>(defaultFounderProfile);

  const [profileSaved, setProfileSaved] = useState(false);
  const [profileImageError, setProfileImageError] = useState("");
  const [profileImageLoading, setProfileImageLoading] = useState(false);

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
      const parsedProfile = JSON.parse(
        storedProfile
      ) as Partial<FounderProfile>;

      const safeProfile: FounderProfile = {
        ...defaultFounderProfile,
        ...parsedProfile,
      };

      setFounderProfile(safeProfile);
      setProfileDraft(safeProfile);
    } catch {
      window.localStorage.removeItem("keos-founder-profile");
    }
  }, []);

  useEffect(() => {
    function closeMenusOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setNotificationOpen(false);
      setSelectedNotification(null);
      setProfileOpen(false);
      setProfileEditorOpen(false);
      setMobileSidebarOpen(false);
    }

    window.addEventListener("keydown", closeMenusOnEscape);

    return () => {
      window.removeEventListener("keydown", closeMenusOnEscape);
    };
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

  const unreadNotificationCount = useMemo(() => {
    return notificationItems.filter(
      (notification) => notification.unread
    ).length;
  }, []);

  const resolvedDashboardStatistics =
    useMemo<DashboardStatistic[]>(() => {
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
    setSelectedNotification(null);
    setProfileOpen(false);
  }

  function handleLogout() {
    clearStoredSession();
    router.replace("/");
  }

  function handleProfileEdit() {
    setProfileDraft(founderProfile);
    setProfileSaved(false);
    setProfileImageError("");
    setProfileEditorOpen(true);
    setProfileOpen(false);
    setNotificationOpen(false);
  }

  function handleProfileFieldChange(
    field: keyof FounderProfile,
    value: string
  ) {
    setProfileDraft((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));

    setProfileSaved(false);
  }

  function handleProfileImageButtonClick() {
    setProfileImageError("");
    profileImageInputRef.current?.click();
  }

  async function handleProfileImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileImageError("");
    setProfileSaved(false);

    if (!isSupportedImage(file)) {
      setProfileImageError(
        "Only JPG, PNG and WEBP image files are supported."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setProfileImageError(
        "Please select an image smaller than 2 MB."
      );

      event.target.value = "";
      return;
    }

    try {
      setProfileImageLoading(true);

      const imageData = await readImageFile(file);

      setProfileDraft((currentProfile) => ({
        ...currentProfile,
        avatar: imageData,
      }));
    } catch {
      setProfileImageError(
        "The selected photo could not be loaded. Please try another image."
      );
    } finally {
      setProfileImageLoading(false);
      event.target.value = "";
    }
  }

  function handleRemoveProfileImage() {
    setProfileDraft((currentProfile) => ({
      ...currentProfile,
      avatar: "",
    }));

    setProfileImageError("");
    setProfileSaved(false);

    if (profileImageInputRef.current) {
      profileImageInputRef.current.value = "";
    }
  }

  function handleProfileSave() {
    const cleanedProfile: FounderProfile = {
      ...profileDraft,
      name:
        profileDraft.name.trim() || defaultFounderProfile.name,
      userId:
        profileDraft.userId.trim() ||
        defaultFounderProfile.userId,
      email:
        profileDraft.email.trim() ||
        defaultFounderProfile.email,
      phone:
        profileDraft.phone.trim() ||
        defaultFounderProfile.phone,
      designation:
        profileDraft.designation.trim() ||
        defaultFounderProfile.designation,
      department:
        profileDraft.department.trim() ||
        defaultFounderProfile.department,
      location:
        profileDraft.location.trim() ||
        defaultFounderProfile.location,
      joiningDate:
        profileDraft.joiningDate.trim() ||
        defaultFounderProfile.joiningDate,
      bio:
        profileDraft.bio.trim() ||
        defaultFounderProfile.bio,
    };

    try {
      window.localStorage.setItem(
        "keos-founder-profile",
        JSON.stringify(cleanedProfile)
      );

      setFounderProfile(cleanedProfile);
      setProfileDraft(cleanedProfile);
      setProfileSaved(true);
      setProfileImageError("");

      window.setTimeout(() => {
        setProfileEditorOpen(false);
        setProfileSaved(false);
      }, 700);
    } catch {
      setProfileImageError(
        "Profile could not be saved. Try using a smaller image."
      );
    }
  }

  function handleProfileReset() {
    setProfileDraft(defaultFounderProfile);
    setProfileSaved(false);
    setProfileImageError("");

    if (profileImageInputRef.current) {
      profileImageInputRef.current.value = "";
    }
  }

  function handleNotificationClick(
    notification: FounderNotification
  ) {
    setSelectedNotification(notification);
    setNotificationOpen(false);
    setProfileOpen(false);
  }

  function handleOpenNotificationModule() {
    if (!selectedNotification) {
      return;
    }

    handleNavigation(selectedNotification.relatedSection);
    setSelectedNotification(null);
  }

  function handleViewAllNotifications() {
    handleNavigation("notifications");
    setNotificationOpen(false);
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
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/10 bg-[#10100f] text-white transition-all duration-300 lg:flex ${
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

                <p className="text-xs text-zinc-500">
                  No module found
                </p>
              </div>
            )}
          </div>
        </nav>

        <div className="relative shrink-0 border-t border-white/10 p-3">
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
                sidebarOpen
                  ? "left-4 w-[260px]"
                  : "left-20 w-[240px]"
              }`}
            >
              <div className="border-b border-zinc-100 px-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#171714] text-xs font-semibold text-[#d7ba7d]">
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

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {founderProfile.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {founderProfile.email}
                    </p>
                  </div>
                </div>
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

      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close mobile sidebar"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}
            {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[292px] flex-col bg-[#10100f] text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
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

            <div className="min-w-0">
              <p className="truncate font-serif text-lg font-semibold tracking-[0.12em]">
                KEOS
              </p>

              <p className="truncate text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Founder Command
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

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
                            ? "bg-[#c7a96b] text-[#15130f] shadow-[0_10px_25px_rgba(199,169,107,0.18)]"
                            : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.2 : 1.8}
                          className="shrink-0"
                        />

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
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredNavigationGroups.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <Search size={20} className="mx-auto mb-2 text-zinc-600" />

                <p className="text-xs text-zinc-500">
                  No module found
                </p>
              </div>
            )}
          </div>
        </nav>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c7a96b]/40 bg-[#c7a96b]/10">
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

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {founderProfile.name}
              </p>

              <p className="truncate text-[11px] text-zinc-500">
                Founder & CEO
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
              aria-label="Logout"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:pl-[292px]" : "lg:pl-[88px]"
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-[#f6f6f3]/90 backdrop-blur-xl">
          <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-700 shadow-sm transition hover:bg-zinc-50 lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={19} />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-zinc-950 sm:text-base">
                    {activeNavigationItem?.name ?? "Founder Dashboard"}
                  </p>

                  <span className="hidden rounded-full border border-[#c7a96b]/30 bg-[#c7a96b]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8b6c30] sm:inline-flex">
                    Founder Access
                  </span>
                </div>

                <p className="mt-1 hidden max-w-2xl truncate text-xs text-zinc-500 sm:block">
                  {activeNavigationItem?.description ??
                    "Complete enterprise overview and Founder-level operational control"}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-500 shadow-sm xl:flex">
                <span
                  className={`h-2 w-2 rounded-full ${
                    liveDataSource === "api"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />

                <span>
                  {liveDataLoading
                    ? "Syncing data"
                    : liveDataSource === "api"
                      ? "Live system"
                      : "Local data"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleNavigation("krve-ai")}
                className="hidden items-center gap-2 rounded-xl border border-[#c7a96b]/30 bg-[#c7a96b]/10 px-3.5 py-2.5 text-xs font-semibold text-[#7c612c] transition hover:bg-[#c7a96b]/20 md:flex"
              >
                <Sparkles size={15} />
                KRVE AI
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen((current) => !current);
                    setProfileOpen(false);
                  }}
                  className="relative rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-700 shadow-sm transition hover:bg-zinc-50"
                  aria-label="Open notifications"
                >
                  <Bell size={18} />

                  {unreadNotificationCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#f6f6f3] bg-red-500 px-1 text-[9px] font-bold text-white">
                      {unreadNotificationCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 top-14 w-[calc(100vw-32px)] max-w-[380px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-950">
                          Notifications
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {unreadNotificationCount} unread updates
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setNotificationOpen(false)}
                        className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                        aria-label="Close notifications"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="max-h-[360px] overflow-y-auto">
                      {notificationItems.map((notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() =>
                            handleNotificationClick(notification)
                          }
                          className="flex w-full gap-3 border-b border-zinc-100 px-4 py-4 text-left transition last:border-b-0 hover:bg-zinc-50"
                        >
                          <div
                            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                              notification.unread
                                ? "bg-[#b89b5e]"
                                : "bg-zinc-300"
                            }`}
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <p
                                className={`text-sm ${
                                  notification.unread
                                    ? "font-semibold text-zinc-950"
                                    : "font-medium text-zinc-700"
                                }`}
                              >
                                {notification.title}
                              </p>

                              <ArrowRight
                                size={14}
                                className="mt-0.5 shrink-0 text-zinc-400"
                              />
                            </div>

                            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-zinc-500">
                              {notification.message}
                            </p>

                            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                              {notification.time}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-zinc-100 p-3">
                      <button
                        type="button"
                        onClick={handleViewAllNotifications}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#171714] px-4 py-3 text-xs font-semibold text-white transition hover:bg-black"
                      >
                        View all notifications
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleProfileEdit}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-1.5 pr-2.5 shadow-sm transition hover:bg-zinc-50"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-[#171714]">
                  {founderProfile.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founderProfile.avatar}
                      alt={founderProfile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] font-semibold text-[#d7ba7d]">
                      {getInitials(founderProfile.name)}
                    </span>
                  )}
                </div>

                <div className="hidden text-left sm:block">
                  <p className="max-w-[120px] truncate text-xs font-semibold text-zinc-900">
                    {founderProfile.name}
                  </p>

                  <p className="text-[10px] text-zinc-500">
                    Founder
                  </p>
                </div>
              </button>
            </div>
          </div>
        </header>
                <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {activeSection === "dashboard" && (
            <div className="mx-auto max-w-[1600px]">
              <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-[#171714] text-white shadow-sm">
                <div className="relative px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                  <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#c7a96b]/10 blur-3xl" />
                  <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />

                  <div className="relative flex flex-col justify-between gap-8 xl:flex-row xl:items-end">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#c7a96b]/30 bg-[#c7a96b]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7ba7d]">
                          <Sparkles size={13} />
                          Founder Command Center
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-medium text-zinc-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Enterprise operational
                        </span>
                      </div>

                      <h1 className="mt-6 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                        Welcome back, {founderProfile.name.split(" ")[0]}.
                      </h1>

                      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                        Monitor KRVE performance, review critical approvals and
                        control every department from one unified enterprise
                        operating center.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleNavigation("approvals")}
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#c7a96b] px-5 py-3 text-sm font-semibold text-[#17130d] transition hover:bg-[#d4b878]"
                      >
                        Review approvals
                        <ArrowRight size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavigation("enterprise-reports")}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                      >
                        View reports
                        <FileChartColumn size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {resolvedDashboardStatistics.map((statistic) => {
                  const Icon = statistic.icon;
                  const toneClasses = getStatisticToneClasses(
                    statistic.tone
                  );

                  return (
                    <article
                      key={statistic.title}
                      className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses.icon}`}
                        >
                          <Icon size={21} strokeWidth={1.9} />
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold ${toneClasses.change}`}
                        >
                          <TrendingUp size={13} />
                          {statistic.change}
                        </span>
                      </div>

                      <div className="mt-6">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
                          {statistic.title}
                        </p>

                        <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl">
                          {statistic.value}
                        </p>

                        <p className="mt-3 text-xs leading-5 text-zinc-500">
                          {statistic.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </section>
                            <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
                <article className="rounded-[26px] border border-zinc-200 bg-white shadow-sm">
                  <div className="flex flex-col gap-4 border-b border-zinc-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                      <p className="text-sm font-semibold text-zinc-950">
                        Recent Orders
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Latest customer transactions across KRVE sales channels
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleNavigation("orders")}
                      className="inline-flex items-center gap-2 self-start rounded-xl border border-zinc-200 px-3.5 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 sm:self-auto"
                    >
                      View all orders
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50/70">
                          <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                            Order
                          </th>

                          <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                            Customer
                          </th>

                          <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                            Product
                          </th>

                          <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                            Amount
                          </th>

                          <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                            Status
                          </th>

                          <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                            Date
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {resolvedRecentOrders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-zinc-100 transition last:border-b-0 hover:bg-zinc-50/70"
                          >
                            <td className="px-6 py-4">
                              <button
                                type="button"
                                onClick={() => handleNavigation("orders")}
                                className="text-sm font-semibold text-zinc-950 transition hover:text-[#9b7b3f]"
                              >
                                {order.id}
                              </button>
                            </td>

                            <td className="px-6 py-4">
                              <p className="text-sm font-medium text-zinc-800">
                                {order.customer}
                              </p>
                            </td>

                            <td className="max-w-[220px] px-6 py-4">
                              <p className="truncate text-sm text-zinc-600">
                                {order.product}
                              </p>
                            </td>

                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold text-zinc-900">
                                {order.amount}
                              </p>
                            </td>

                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <p className="text-xs text-zinc-500">
                                {order.date}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>

                <article className="rounded-[26px] border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-950">
                      Quick Actions
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Open frequently used Founder controls
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      onClick={() => handleNavigation("approvals")}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-zinc-200 p-4 text-left transition hover:border-[#c7a96b]/50 hover:bg-[#c7a96b]/5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                        <ClipboardCheck size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          Pending Approvals
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Review finance and department requests
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className="shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-[#9b7b3f]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigation("products")}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-zinc-200 p-4 text-left transition hover:border-[#c7a96b]/50 hover:bg-[#c7a96b]/5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <Package size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          Product Catalogue
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Manage products, variants and collections
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className="shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-[#9b7b3f]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigation("finance")}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-zinc-200 p-4 text-left transition hover:border-[#c7a96b]/50 hover:bg-[#c7a96b]/5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                        <ReceiptIndianRupee size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          Finance Center
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Monitor revenue, expenses and accounting
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className="shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-[#9b7b3f]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigation("krve-ai")}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-zinc-200 p-4 text-left transition hover:border-[#c7a96b]/50 hover:bg-[#c7a96b]/5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                        <Sparkles size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          KRVE AI Center
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Open enterprise intelligence and automation
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className="shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-[#9b7b3f]"
                      />
                    </button>
                  </div>
                </article>
              </section>
                            <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <article className="rounded-[26px] border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-950">
                        Department Performance
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Current operational performance across key KRVE departments
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleNavigation("department-reports")}
                      className="inline-flex items-center gap-2 self-start rounded-xl border border-zinc-200 px-3.5 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 sm:self-auto"
                    >
                      Department reports
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="mt-6 space-y-5">
                    {[
                      {
                        name: "Commerce Operations",
                        value: 92,
                        detail: "Orders, inventory and fulfilment",
                      },
                      {
                        name: "Finance",
                        value: 84,
                        detail: "Accounting, cash flow and compliance",
                      },
                      {
                        name: "Human Resources",
                        value: 78,
                        detail: "Employees, recruitment and payroll",
                      },
                      {
                        name: "Marketing",
                        value: 88,
                        detail: "Campaigns, traffic and customer acquisition",
                      },
                      {
                        name: "Customer Support",
                        value: 81,
                        detail: "Tickets, complaints and customer satisfaction",
                      },
                    ].map((department) => (
                      <div key={department.name}>
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-zinc-900">
                              {department.name}
                            </p>

                            <p className="mt-1 truncate text-xs text-zinc-500">
                              {department.detail}
                            </p>
                          </div>

                          <span className="shrink-0 text-sm font-semibold text-zinc-900">
                            {department.value}%
                          </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className="h-full rounded-full bg-[#b89b5e]"
                            style={{
                              width: `${department.value}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-[26px] border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-950">
                      System Health
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      KEOS infrastructure and enterprise service status
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      {
                        name: "KEOS Core System",
                        status: "Operational",
                        icon: Activity,
                      },
                      {
                        name: "Website Integration",
                        status: "Connected",
                        icon: Link2,
                      },
                      {
                        name: "Payment Services",
                        status: "Operational",
                        icon: CreditCard,
                      },
                      {
                        name: "Data Backup",
                        status: "Completed",
                        icon: ShieldCheck,
                      },
                      {
                        name: "KRVE AI Services",
                        status: "Active",
                        icon: Sparkles,
                      },
                    ].map((service) => {
                      const Icon = service.icon;

                      return (
                        <div
                          key={service.name}
                          className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-4"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-zinc-900">
                              {service.name}
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              {service.status}
                            </p>
                          </div>

                          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavigation("security-center")}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 px-4 py-3 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50"
                  >
                    Open Security Center
                    <ArrowRight size={14} />
                  </button>
                </article>
              </section>
            </div>
          )}
                            {activeSection === "analytics" && (
            <BusinessAnalytics />
          )}

          {activeSection === "approvals" && (
            <TasksApprovals />
          )}

          {activeSection === "orders" && (
            <OrdersManagement />
          )}

          {activeSection === "products" && (
            <ProductsManagement />
          )}

          {activeSection === "inventory" && (
            <InventoryManagement />
          )}

          {activeSection === "warehouse" && (
            <WarehouseManagement />
          )}

          {activeSection === "shipping" && (
            <ShippingManagement />
          )}

          {activeSection === "returns-refunds" && (
            <ReturnsRefundsManagement />
          )}

          {activeSection === "pricing" && (
            <PricingManagement />
          )}

          {activeSection === "discounts-promotions" && (
            <DiscountsPromotionsManagement />
          )}

          {activeSection === "sales-channels" && (
            <SalesChannelsManagement />
          )}

          {activeSection === "abandoned-carts" && (
            <AbandonedCartsManagement />
          )}

          {activeSection === "checkout" && (
            <CheckoutManagement />
          )}

          {activeSection === "order-tracking" && (
            <OrderTrackingManagement />
          )}

          {activeSection === "commerce-reports" && (
            <CommerceReportsManagement />
          )}

          {activeSection === "customers" && (
            <CustomersManagement />
          )}

          {activeSection === "finance" && (
            <FinanceManagement />
          )}

          {activeSection === "hr" && (
            <HumanResourcesManagement />
          )}

          {activeSection === "marketing" && (
            <MarketingManagement />
          )}

          {activeSection === "support" && (
            <CustomerSupportManagement />
          )}

          {activeSection === "procurement" && (
            <ProcurementManagement />
          )}

          {activeSection === "crm" && (
            <CRMManagement />
          )}

          {activeSection === "vendors" && (
            <VendorManagement />
          )}

          {activeSection === "projects" && (
            <ProjectsTasksManagement />
          )}

          {activeSection === "documents" && (
            <DocumentsManagement />
          )}

          {activeSection === "legal" && (
            <LegalComplianceManagement />
          )}

          {activeSection === "risk" && (
            <RiskManagement />
          )}

          {activeSection === "assets" && (
            <FacilitiesAssetsManagement />
          )}
                            {/* =========================
              KRVE AI MODULES
          ========================== */}

          {activeSection === "krve-ai" && (
            <KrveAICenterManagement />
          )}

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

          {/* =========================
              REPORTS
          ========================== */}

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

          {/* =========================
              ADMINISTRATION
          ========================== */}

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

        {/* Founder Profile Editor */}
        {profileEditorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
            <button
              type="button"
              aria-label="Close profile editor"
              onClick={() => {
                setProfileEditorOpen(false);
                setProfileImageError("");
                setProfileSaved(false);
              }}
              className="absolute inset-0 cursor-default"
            />

            <section className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[30px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <header className="flex shrink-0 items-start justify-between gap-5 border-b border-zinc-200 bg-[#171714] px-5 py-5 text-white sm:px-7">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#c7a96b]/30 bg-[#c7a96b]/10 text-[#d7ba7d]">
                    <UserRound size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-lg font-semibold">
                      Founder Profile
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-400">
                      Update your KEOS identity, contact details and profile
                      photograph.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setProfileEditorOpen(false);
                    setProfileImageError("");
                    setProfileSaved(false);
                  }}
                  className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close profile editor"
                >
                  <X size={18} />
                </button>
              </header>

              <div className="keos-sidebar-scroll flex-1 overflow-y-auto">
                <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[280px_1fr]">
                  {/* Profile Photograph */}
                  <aside>
                    <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                        Profile Photograph
                      </p>

                      <div className="mt-5 flex flex-col items-center">
                        <div className="relative">
                          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[30px] border-4 border-white bg-[#171714] shadow-lg">
                            {profileDraft.avatar ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={profileDraft.avatar}
                                alt={profileDraft.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="font-serif text-3xl font-semibold text-[#d7ba7d]">
                                {getInitials(profileDraft.name)}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={handleProfileImageButtonClick}
                            disabled={profileImageLoading}
                            className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-zinc-50 bg-[#c7a96b] text-[#17130d] shadow-lg transition hover:bg-[#d4b878] disabled:cursor-not-allowed disabled:opacity-60"
                            aria-label="Upload profile photograph"
                          >
                            {profileImageLoading ? (
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                            ) : (
                              <Camera size={18} />
                            )}
                          </button>
                        </div>

                        <input
                          ref={profileImageInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleProfileImageChange}
                          className="hidden"
                        />

                        <p className="mt-5 text-center text-sm font-semibold text-zinc-900">
                          {profileDraft.name || "Founder"}
                        </p>

                        <p className="mt-1 text-center text-xs text-zinc-500">
                          {profileDraft.designation || "Founder & CEO"}
                        </p>

                        <button
                          type="button"
                          onClick={handleProfileImageButtonClick}
                          disabled={profileImageLoading}
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#171714] px-4 py-3 text-xs font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Camera size={15} />

                          {profileImageLoading
                            ? "Loading photograph..."
                            : profileDraft.avatar
                              ? "Change photograph"
                              : "Upload photograph"}
                        </button>

                        {profileDraft.avatar && (
                          <button
                            type="button"
                            onClick={handleRemoveProfileImage}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            <X size={15} />
                            Remove photograph
                          </button>
                        )}

                        <div className="mt-5 w-full rounded-2xl border border-zinc-200 bg-white p-4">
                          <p className="text-xs font-semibold text-zinc-800">
                            Image requirements
                          </p>

                          <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                            Upload a JPG, PNG or WEBP image. Maximum supported
                            file size is 2 MB.
                          </p>
                        </div>

                        {profileImageError && (
                          <div className="mt-4 flex w-full items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-red-700">
                            <AlertTriangle
                              size={16}
                              className="mt-0.5 shrink-0"
                            />

                            <p className="text-xs leading-5">
                              {profileImageError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </aside>

                  {/* Profile Form */}
                  <div>
                    <div className="mb-5">
                      <p className="text-sm font-semibold text-zinc-950">
                        Personal Information
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        These details will appear across the Founder Command
                        Center.
                      </p>
                    </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-zinc-700">
                          Full Name
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-[#c7a96b] focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                          <UserRound
                            size={17}
                            className="shrink-0 text-zinc-400"
                          />

                          <input
                            type="text"
                            value={profileDraft.name}
                            onChange={(event) =>
                              handleProfileFieldChange(
                                "name",
                                event.target.value
                              )
                            }
                            placeholder="Enter Founder name"
                            className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-zinc-700">
                          Founder User ID
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                          <ShieldCheck
                            size={17}
                            className="shrink-0 text-zinc-400"
                          />

                          <input
                            type="text"
                            value={profileDraft.userId}
                            onChange={(event) =>
                              handleProfileFieldChange(
                                "userId",
                                event.target.value
                              )
                            }
                            placeholder="Enter Founder user ID"
                            className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-zinc-700">
                          Email Address
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-[#c7a96b] focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                          <Mail
                            size={17}
                            className="shrink-0 text-zinc-400"
                          />

                          <input
                            type="email"
                            value={profileDraft.email}
                            onChange={(event) =>
                              handleProfileFieldChange(
                                "email",
                                event.target.value
                              )
                            }
                            placeholder="Enter email address"
                            className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-zinc-700">
                          Phone Number
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-[#c7a96b] focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                          <Phone
                            size={17}
                            className="shrink-0 text-zinc-400"
                          />

                          <input
                            type="tel"
                            value={profileDraft.phone}
                            onChange={(event) =>
                              handleProfileFieldChange(
                                "phone",
                                event.target.value
                              )
                            }
                            placeholder="Enter phone number"
                            className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-zinc-700">
                          Designation
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-[#c7a96b] focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                          <Building2
                            size={17}
                            className="shrink-0 text-zinc-400"
                          />

                          <input
                            type="text"
                            value={profileDraft.designation}
                            onChange={(event) =>
                              handleProfileFieldChange(
                                "designation",
                                event.target.value
                              )
                            }
                            placeholder="Enter designation"
                            className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-zinc-700">
                          Department
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-[#c7a96b] focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                          <Boxes
                            size={17}
                            className="shrink-0 text-zinc-400"
                          />

                          <input
                            type="text"
                            value={profileDraft.department}
                            onChange={(event) =>
                              handleProfileFieldChange(
                                "department",
                                event.target.value
                              )
                            }
                            placeholder="Enter department"
                            className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        </div>
                      </label>
                    </div>

                    <div className="mt-7 border-t border-zinc-200 pt-6">
                      <p className="text-sm font-semibold text-zinc-950">
                        Enterprise Details
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Add office location, joining date and profile
                        description.
                      </p>
                    </div>
                                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-zinc-700">
                          Office Location
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-[#c7a96b] focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                          <MapPin
                            size={17}
                            className="shrink-0 text-zinc-400"
                          />

                          <input
                            type="text"
                            value={profileDraft.location}
                            onChange={(event) =>
                              handleProfileFieldChange(
                                "location",
                                event.target.value
                              )
                            }
                            placeholder="Enter office location"
                            className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-zinc-700">
                          Joining Date
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-[#c7a96b] focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                          <CalendarDays
                            size={17}
                            className="shrink-0 text-zinc-400"
                          />

                          <input
                            type="text"
                            value={profileDraft.joiningDate}
                            onChange={(event) =>
                              handleProfileFieldChange(
                                "joiningDate",
                                event.target.value
                              )
                            }
                            placeholder="Enter joining date"
                            className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                          />
                        </div>
                      </label>
                    </div>

                    <label className="mt-5 block">
                      <span className="mb-2 block text-xs font-semibold text-zinc-700">
                        Founder Bio
                      </span>

                      <textarea
                        value={profileDraft.bio}
                        onChange={(event) =>
                          handleProfileFieldChange(
                            "bio",
                            event.target.value
                          )
                        }
                        rows={5}
                        placeholder="Write a short Founder profile description"
                        className="w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#c7a96b] focus:ring-4 focus:ring-[#c7a96b]/10"
                      />
                    </label>

                    {profileSaved && (
                      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                        <ShieldCheck size={17} />

                        <p className="text-xs font-semibold">
                          Founder profile saved successfully.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-zinc-200 bg-zinc-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <button
                  type="button"
                  onClick={handleProfileReset}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100"
                >
                  <RotateCcw size={15} />
                  Reset profile
                </button>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileEditorOpen(false);
                      setProfileDraft(founderProfile);
                      setProfileImageError("");
                      setProfileSaved(false);
                    }}
                    className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleProfileSave}
                    disabled={profileImageLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#171714] px-5 py-3 text-xs font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={15} />
                    Save profile
                  </button>
                </div>
              </footer>
            </section>
          </div>
        )}
                {/* Notification Detail Popup */}
        {selectedNotification && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
            <button
              type="button"
              aria-label="Close notification details"
              onClick={() => setSelectedNotification(null)}
              className="absolute inset-0 cursor-default"
            />

            <section className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <header className="flex items-start justify-between gap-4 bg-[#171714] px-5 py-5 text-white sm:px-6">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#c7a96b]/30 bg-[#c7a96b]/10 text-[#d7ba7d]">
                    <Bell size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      Notification Details
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      Founder Command Center update
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedNotification(null)}
                  className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close notification"
                >
                  <X size={17} />
                </button>
              </header>

              <div className="px-5 py-6 sm:px-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                      selectedNotification.unread
                        ? "bg-[#b89b5e]"
                        : "bg-zinc-300"
                    }`}
                  />

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-zinc-950">
                      {selectedNotification.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-zinc-600">
                      {selectedNotification.message}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs text-zinc-400">
                      <CalendarDays size={14} />
                      {selectedNotification.time}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                    Related Module
                  </p>

                  <p className="mt-2 text-sm font-semibold text-zinc-900">
                    {navigationGroups
                      .flatMap((group) => group.items)
                      .find(
                        (item) =>
                          item.id === selectedNotification.relatedSection
                      )?.name ?? "KEOS Module"}
                  </p>
                </div>
              </div>

              <footer className="flex flex-col-reverse gap-3 border-t border-zinc-200 bg-zinc-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={() => setSelectedNotification(null)}
                  className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleOpenNotificationModule}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#171714] px-5 py-3 text-xs font-semibold text-white transition hover:bg-black"
                >
                  Open related module
                  <ArrowRight size={15} />
                </button>
              </footer>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
