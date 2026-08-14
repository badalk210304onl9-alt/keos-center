"use client";

import type {
  ChangeEvent,
  ComponentType,
} from "react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useKeosFounderData,
} from "@/hooks/use-keos-founder-data";

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
  CalendarClock,
  Camera,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  Edit3,
  FileChartColumn,
  GraduationCap,
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

import SeasonalCampaignsManagement from "@/components/founder/seasonal-campaigns-management";

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

import LiveProjectsManagement from "@/components/founder/live-projects-management";

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

type IconType =
  ComponentType<{
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

  tone:
    | "blue"
    | "red"
    | "green"
    | "orange";
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

const navigationGroups:
  NavigationGroup[] = [
  {
    title:
      "Command Center",

    items: [
      {
        id:
          "dashboard",

        name:
          "Founder Dashboard",

        description:
          "Complete enterprise overview and Founder-level operational control",

        icon:
          LayoutDashboard,
      },

      {
        id:
          "analytics",

        name:
          "Business Analytics",

        description:
          "Enterprise analytics, performance metrics and business intelligence",

        icon:
          BarChart3,
      },

      {
        id:
          "approvals",

        name:
          "Tasks & Approvals",

        description:
          "Review departmental requests, tasks and Founder approvals",

        icon:
          ClipboardCheck,

        badge:
          "08",
      },
    ],
  },

  {
    title:
      "Commerce",

    items: [
      {
        id:
          "orders",

        name:
          "Orders",

        description:
          "Customer orders, payments, fulfilment, cancellations and order lifecycle",

        icon:
          ShoppingBag,

        badge:
          "19",
      },

      {
        id:
          "products",

        name:
          "Products",

        description:
          "Product catalogue, variants, collections, categories and publishing",

        icon:
          Package,
      },

      {
        id:
          "inventory",

        name:
          "Inventory",

        description:
          "Stock levels, movements, replenishment and inventory controls",

        icon:
          Boxes,
      },

      {
        id:
          "warehouse",

        name:
          "Warehouse",

        description:
          "Warehouse locations, receiving, picking, packing and transfers",

        icon:
          Warehouse,
      },

      {
        id:
          "shipping",

        name:
          "Shipping",

        description:
          "Courier partners, shipments, tracking, labels and delivery operations",

        icon:
          Truck,
      },

      {
        id:
          "returns-refunds",

        name:
          "Returns & Refunds",

        description:
          "Return requests, exchanges, inspections, refunds and reverse logistics",

        icon:
          RotateCcw,

        badge:
          "04",
      },

      {
        id:
          "pricing",

        name:
          "Pricing",

        description:
          "Price lists, margins, cost controls, dynamic pricing and price history",

        icon:
          Tags,
      },

      {
        id:
          "discounts-promotions",

        name:
          "Discounts & Promotions",

        description:
          "Coupons, offers, bundles, campaigns and promotional rules",

        icon:
          BadgePercent,
      },

      {
        id:
          "seasonal-campaigns",

        name:
          "Seasonal Campaigns",

        description:
          "Raksha Bandhan, Diwali and other time-limited sale campaigns",

        icon:
          CalendarClock,
      },

      {
        id:
          "sales-channels",

        name:
          "Sales Channels",

        description:
          "Website, mobile app, marketplaces, stores and channel integrations",

        icon:
          Link2,
      },

      {
        id:
          "abandoned-carts",

        name:
          "Abandoned Carts",

        description:
          "Recover incomplete carts, automate follow-ups and monitor recovery value",

        icon:
          ShoppingCart,
      },

      {
        id:
          "checkout",

        name:
          "Checkout Management",

        description:
          "Checkout configuration, payment methods, addresses and conversion controls",

        icon:
          CreditCard,
      },

      {
        id:
          "order-tracking",

        name:
          "Order Tracking",

        description:
          "Track live fulfilment, courier movement and customer delivery status",

        icon:
          MapPin,
      },

      {
        id:
          "commerce-reports",

        name:
          "Commerce Reports",

        description:
          "Sales, product, customer, inventory and fulfilment reports",

        icon:
          FileChartColumn,
      },
    ],
  },

  {
    title:
      "Enterprise",

    items: [
      {
        id:
          "customers",

        name:
          "Customers",

        description:
          "Customer profiles, loyalty, segmentation and lifetime value",

        icon:
          Users,
      },

      {
        id:
          "finance",

        name:
          "Finance",

        description:
          "Revenue, accounting, GST, invoices, expenses and financial reporting",

        icon:
          ReceiptIndianRupee,
      },

      {
        id:
          "hr",

        name:
          "Human Resources",

        description:
          "Employees, attendance, payroll, recruitment and HR operations",

        icon:
          Building2,
      },

      {
        id:
          "marketing",

        name:
          "Marketing",

        description:
          "Campaigns, email, social media and performance marketing",

        icon:
          Megaphone,
      },

      {
        id:
          "support",

        name:
          "Customer Support",

        description:
          "Support tickets, chat, complaints and customer satisfaction",

        icon:
          Headphones,
      },

      {
        id:
          "procurement",

        name:
          "Procurement",

        description:
          "Purchase orders, vendors and sourcing operations",

        icon:
          ShoppingCart,
      },

      {
        id:
          "crm",

        name:
          "CRM",

        description:
          "Customer relationship management and sales pipeline",

        icon:
          Users,
      },

      {
        id:
          "vendors",

        name:
          "Vendor Management",

        description:
          "Vendor onboarding, contracts and supplier performance",

        icon:
          Truck,
      },

      {
        id:
          "projects",

        name:
          "Projects & Tasks",

        description:
          "Internal projects, milestones and departmental tasks",

        icon:
          CalendarDays,
      },

      {
        id:
          "live-projects",

        name:
          "Live Projects",

        description:
          "Applications, students, project allocation, weekly tasks, performance, sales and certificates",

        icon:
          GraduationCap,
      },

      {
        id:
          "documents",

        name:
          "Documents",

        description:
          "Enterprise document management and digital records",

        icon:
          FileChartColumn,
      },

      {
        id:
          "legal",

        name:
          "Legal & Compliance",

        description:
          "Policies, legal documents, audits and compliance tracking",

        icon:
          ShieldCheck,
      },

      {
        id:
          "risk",

        name:
          "Risk Management",

        description:
          "Business risk monitoring and mitigation planning",

        icon:
          AlertTriangle,
      },

      {
        id:
          "assets",

        name:
          "Facilities & Assets",

        description:
          "Office assets, infrastructure and maintenance",

        icon:
          Building2,
      },
    ],
  },
    {
    title:
      "KRVE AI",

    items: [
      {
        id:
          "krve-ai",

        name:
          "KRVE AI Center",

        description:
          "Central AI operating system and enterprise intelligence",

        icon:
          Sparkles,
      },

      {
        id:
          "ai-assistant",

        name:
          "AI Assistant",

        description:
          "Enterprise AI assistant for Founder and departments",

        icon:
          Sparkles,
      },

      {
        id:
          "automation",

        name:
          "Automation",

        description:
          "Workflow automation and intelligent business processes",

        icon:
          Activity,
      },

      {
        id:
          "forecasting",

        name:
          "Forecasting",

        description:
          "Demand forecasting, revenue prediction and AI planning",

        icon:
          TrendingUp,
      },

      {
        id:
          "anomaly",

        name:
          "Anomaly Detection",

        description:
          "Detect unusual activities and business anomalies",

        icon:
          AlertTriangle,
      },

      {
        id:
          "recommendations",

        name:
          "AI Recommendations",

        description:
          "AI-generated business insights and recommendations",

        icon:
          ArrowUpRight,
      },
    ],
  },

  {
    title:
      "Reports",

    items: [
      {
        id:
          "enterprise-reports",

        name:
          "Enterprise Reports",

        description:
          "Complete enterprise reporting dashboard",

        icon:
          FileChartColumn,
      },

      {
        id:
          "executive-reports",

        name:
          "Executive Reports",

        description:
          "Founder and executive level reports",

        icon:
          BarChart3,
      },

      {
        id:
          "department-reports",

        name:
          "Department Reports",

        description:
          "Department-wise reports and KPIs",

        icon:
          ClipboardCheck,
      },

      {
        id:
          "audit-reports",

        name:
          "Audit Reports",

        description:
          "Audit history and compliance reports",

        icon:
          ShieldCheck,
      },
    ],
  },

  {
    title:
      "Administration",

    items: [
      {
        id:
          "administration",

        name:
          "Administration",

        description:
          "Central administration and enterprise configuration",

        icon:
          Settings,
      },

      {
        id:
          "users-roles",

        name:
          "Users & Roles",

        description:
          "Create users, assign roles and manage employee access",

        icon:
          Users,
      },

      {
        id:
          "departments",

        name:
          "Departments",

        description:
          "Manage departments, reporting structures and department heads",

        icon:
          Building2,
      },

      {
        id:
          "permissions",

        name:
          "Permissions",

        description:
          "Configure role-based access and module-level permissions",

        icon:
          ShieldCheck,
      },

      {
        id:
          "integrations",

        name:
          "Integrations",

        description:
          "Connect website, applications, payment systems and business tools",

        icon:
          Link2,
      },

      {
        id:
          "security-center",

        name:
          "Security Center",

        description:
          "Monitor access, threats, sessions and enterprise security",

        icon:
          ShieldCheck,
      },

      {
        id:
          "audit-logs",

        name:
          "Audit Logs",

        description:
          "Review system actions, login activity and administrative changes",

        icon:
          ClipboardCheck,
      },

      {
        id:
          "data-management",

        name:
          "Data Management",

        description:
          "Enterprise data controls, import, export, backup and retention",

        icon:
          Boxes,
      },

      {
        id:
          "notifications",

        name:
          "Notifications",

        description:
          "Configure enterprise alerts, notifications and communication rules",

        icon:
          Bell,
      },

      {
        id:
          "system-settings",

        name:
          "System Settings",

        description:
          "Configure KEOS preferences and enterprise system settings",

        icon:
          Settings,
      },
    ],
  },
];

const defaultFounderProfile:
  FounderProfile = {
  name:
    "Badal Kumar",

  userId:
    "KRVE-FOUNDER-001",

  email:
    "founder@krvefashionstudio.in",

  phone:
    "+91 98765 43210",

  designation:
    "Founder & Chief Executive Officer",

  department:
    "Founder Office",

  location:
    "Varanasi, Uttar Pradesh, India",

  joiningDate:
    "01 July 2026",

  bio:
    "Founder of KRVE and executive administrator of the KRVE Enterprise Operating System.",

  avatar:
    "",
};

const baseDashboardStatistics:
  DashboardStatistic[] = [
  {
    title:
      "Total Revenue",

    value:
      "₹0",

    change:
      "LIVE",

    description:
      "Revenue from paid KRVE website orders",

    icon:
      CircleDollarSign,

    tone:
      "blue",
  },

  {
    title:
      "Total Orders",

    value:
      "0",

    change:
      "LIVE",

    description:
      "Orders received from KRVE sales channels",

    icon:
      ShoppingBag,

    tone:
      "red",
  },

  {
    title:
      "Total Customers",

    value:
      "0",

    change:
      "LIVE",

    description:
      "Customers recorded in KRVE Central API",

    icon:
      Users,

    tone:
      "green",
  },

  {
    title:
      "Total Employees",

    value:
      "—",

    change:
      "KEOS",

    description:
      "Employee data will come from HR Management",

    icon:
      Building2,

    tone:
      "orange",
  },
];

const notificationItems:
  FounderNotification[] = [
  {
    id:
      1,

    title:
      "Founder approval required",

    message:
      "Finance submitted a vendor payment request of ₹2,40,000.",

    time:
      "8 minutes ago",

    unread:
      true,

    relatedSection:
      "approvals",
  },

  {
    id:
      2,

    title:
      "Inventory warning",

    message:
      "Four products have reached their minimum stock level.",

    time:
      "24 minutes ago",

    unread:
      true,

    relatedSection:
      "inventory",
  },

  {
    id:
      3,

    title:
      "New employee onboarding",

    message:
      "HR created credentials for three new employees.",

    time:
      "1 hour ago",

    unread:
      false,

    relatedSection:
      "hr",
  },
];

function getInitials(
  name: string,
) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(
      0,
      2,
    )
    .map(
      (
        word,
      ) =>
        word
          .charAt(0)
          .toUpperCase(),
    )
    .join("");
}

function getStatusClasses(
  status: string,
) {
  const normalizedStatus =
    status.toLowerCase();

  if (
    normalizedStatus.includes(
      "delivered",
    ) ||
    normalizedStatus.includes(
      "paid",
    )
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    normalizedStatus.includes(
      "shipped",
    )
  ) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (
    normalizedStatus.includes(
      "processing",
    ) ||
    normalizedStatus.includes(
      "confirmed",
    ) ||
    normalizedStatus.includes(
      "packed",
    )
  ) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (
    normalizedStatus.includes(
      "cancelled",
    ) ||
    normalizedStatus.includes(
      "failed",
    ) ||
    normalizedStatus.includes(
      "refunded",
    ) ||
    normalizedStatus.includes(
      "returned",
    )
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-zinc-200 bg-zinc-50 text-zinc-700";
}

function getStatisticToneClasses(
  tone:
    DashboardStatistic["tone"],
) {
  const toneClasses = {
    blue: {
      icon:
        "bg-blue-50 text-blue-700",

      change:
        "text-blue-700",
    },

    red: {
      icon:
        "bg-rose-50 text-rose-700",

      change:
        "text-rose-700",
    },

    green: {
      icon:
        "bg-emerald-50 text-emerald-700",

      change:
        "text-emerald-700",
    },

    orange: {
      icon:
        "bg-amber-50 text-amber-700",

      change:
        "text-amber-700",
    },
  };

  return toneClasses[
    tone
  ];
}

function isSupportedImage(
  file: File,
) {
  return [
    "image/jpeg",
    "image/png",
    "image/webp",
  ].includes(
    file.type,
  );
}

function readImageFile(
  file: File,
) {
  return new Promise<string>(
    (
      resolve,
      reject,
    ) => {
      const reader =
        new FileReader();

      reader.onload =
        () => {
          if (
            typeof reader.result ===
            "string"
          ) {
            resolve(
              reader.result,
            );

            return;
          }

          reject(
            new Error(
              "Invalid image data",
            ),
          );
        };

      reader.onerror =
        () => {
          reject(
            new Error(
              "Photo could not be loaded",
            ),
          );
        };

      reader.readAsDataURL(
        file,
      );
    },
  );
}

export default function FounderPage() {
  const router =
    useRouter();
    const profileImageInputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const {
    data:
      liveFounderData,

    loading:
      liveDataLoading,

    source:
      liveDataSource,

    error:
      liveDataError,

    refresh:
      refreshFounderData,
  } =
    useKeosFounderData();

  const [
    session,
    setSession,
  ] =
    useState<KeosSession | null>(
      null,
    );

  const [
    activeSection,
    setActiveSection,
  ] =
    useState(
      "dashboard",
    );

  const [
    sidebarOpen,
    setSidebarOpen,
  ] =
    useState(
      true,
    );

  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] =
    useState(
      false,
    );

  const [
    searchQuery,
    setSearchQuery,
  ] =
    useState(
      "",
    );

  const [
    notificationOpen,
    setNotificationOpen,
  ] =
    useState(
      false,
    );

  const [
    selectedNotification,
    setSelectedNotification,
  ] =
    useState<FounderNotification | null>(
      null,
    );

  const [
    profileOpen,
    setProfileOpen,
  ] =
    useState(
      false,
    );

  const [
    profileEditorOpen,
    setProfileEditorOpen,
  ] =
    useState(
      false,
    );

  const [
    founderProfile,
    setFounderProfile,
  ] =
    useState<FounderProfile>(
      defaultFounderProfile,
    );

  const [
    profileDraft,
    setProfileDraft,
  ] =
    useState<FounderProfile>(
      defaultFounderProfile,
    );

  const [
    profileSaved,
    setProfileSaved,
  ] =
    useState(
      false,
    );

  const [
    profileImageError,
    setProfileImageError,
  ] =
    useState(
      "",
    );

  const [
    profileImageLoading,
    setProfileImageLoading,
  ] =
    useState(
      false,
    );

  useEffect(
    () => {
      const storedSession =
        getStoredSession();

      if (
        !storedSession
      ) {
        router.replace(
          "/",
        );

        return;
      }

      setSession(
        storedSession,
      );
    },
    [
      router,
    ],
  );

  useEffect(
    () => {
      const storedProfile =
        window.localStorage.getItem(
          "keos-founder-profile",
        );

      if (
        !storedProfile
      ) {
        return;
      }

      try {
        const parsedProfile =
          JSON.parse(
            storedProfile,
          ) as Partial<FounderProfile>;

        const safeProfile:
          FounderProfile = {
          ...defaultFounderProfile,

          ...parsedProfile,
        };

        setFounderProfile(
          safeProfile,
        );

        setProfileDraft(
          safeProfile,
        );
      } catch {
        window.localStorage.removeItem(
          "keos-founder-profile",
        );
      }
    },
    [],
  );

  useEffect(
    () => {
      function closeMenusOnEscape(
        event:
          KeyboardEvent,
      ) {
        if (
          event.key !==
          "Escape"
        ) {
          return;
        }

        setNotificationOpen(
          false,
        );

        setSelectedNotification(
          null,
        );

        setProfileOpen(
          false,
        );

        setProfileEditorOpen(
          false,
        );

        setMobileSidebarOpen(
          false,
        );
      }

      window.addEventListener(
        "keydown",
        closeMenusOnEscape,
      );

      return () => {
        window.removeEventListener(
          "keydown",
          closeMenusOnEscape,
        );
      };
    },
    [],
  );

  const activeNavigationItem =
    useMemo(
      () => {
        return navigationGroups
          .flatMap(
            (
              group,
            ) =>
              group.items,
          )
          .find(
            (
              item,
            ) =>
              item.id ===
              activeSection,
          );
      },
      [
        activeSection,
      ],
    );

  const filteredNavigationGroups =
    useMemo(
      () => {
        const normalizedQuery =
          searchQuery
            .trim()
            .toLowerCase();

        if (
          !normalizedQuery
        ) {
          return navigationGroups;
        }

        return navigationGroups
          .map(
            (
              group,
            ) => ({
              ...group,

              items:
                group.items.filter(
                  (
                    item,
                  ) => {
                    return (
                      item.name
                        .toLowerCase()
                        .includes(
                          normalizedQuery,
                        ) ||
                      item.description
                        .toLowerCase()
                        .includes(
                          normalizedQuery,
                        )
                    );
                  },
                ),
            }),
          )
          .filter(
            (
              group,
            ) =>
              group.items
                .length >
              0,
          );
      },
      [
        searchQuery,
      ],
    );

  const unreadNotificationCount =
    useMemo(
      () => {
        return notificationItems.filter(
          (
            notification,
          ) =>
            notification.unread,
        ).length;
      },
      [],
    );

  /*
    ============================================
    LIVE DASHBOARD STATISTICS
    ============================================

    Fake business values are intentionally
    not used here.

    If Central API has no data:
    Revenue = ₹0
    Orders = 0
    Customers = 0
  */

  const resolvedDashboardStatistics =
    useMemo<
      DashboardStatistic[]
    >(
      () => {
        const statistics =
          liveFounderData
            ?.statistics;

        return [
          {
            ...baseDashboardStatistics[
              0
            ],

            value:
              statistics
                ?.totalRevenue ??
              "₹0",
          },

          {
            ...baseDashboardStatistics[
              1
            ],

            value:
              statistics
                ?.totalOrders ??
              "0",
          },

          {
            ...baseDashboardStatistics[
              2
            ],

            value:
              statistics
                ?.totalCustomers ??
              "0",
          },

          {
            ...baseDashboardStatistics[
              3
            ],

            value:
              statistics
                ?.totalEmployees ??
              "—",
          },
        ];
      },
      [
        liveFounderData,
      ],
    );

  /*
    ============================================
    LIVE RECENT ORDERS
    ============================================

    No demo orders.
  */

  const resolvedRecentOrders =
    useMemo<
      FounderRecentOrder[]
    >(
      () => {
        return (
          liveFounderData
            ?.recentOrders ??
          []
        );
      },
      [
        liveFounderData,
      ],
    );

  function handleNavigation(
    sectionId:
      string,
  ) {
    setActiveSection(
      sectionId,
    );

    setMobileSidebarOpen(
      false,
    );

    setNotificationOpen(
      false,
    );

    setSelectedNotification(
      null,
    );

    setProfileOpen(
      false,
    );
  }

  function handleLogout() {
    clearStoredSession();

    router.replace(
      "/",
    );
  }

  function handleProfileEdit() {
    setProfileDraft(
      founderProfile,
    );

    setProfileSaved(
      false,
    );

    setProfileImageError(
      "",
    );

    setProfileEditorOpen(
      true,
    );

    setProfileOpen(
      false,
    );

    setNotificationOpen(
      false,
    );
  }

  function handleProfileFieldChange(
    field:
      keyof FounderProfile,

    value:
      string,
  ) {
    setProfileDraft(
      (
        currentProfile,
      ) => ({
        ...currentProfile,

        [field]:
          value,
      }),
    );

    setProfileSaved(
      false,
    );
  }

  function handleProfileImageButtonClick() {
    setProfileImageError(
      "",
    );

    profileImageInputRef.current?.click();
  }

  async function handleProfileImageChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileImageError(
      "",
    );

    setProfileSaved(
      false,
    );

    if (
      !isSupportedImage(
        file,
      )
    ) {
      setProfileImageError(
        "Only JPG, PNG and WEBP image files are supported.",
      );

      event.target.value =
        "";

      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      setProfileImageError(
        "Please select an image smaller than 2 MB.",
      );

      event.target.value =
        "";

      return;
    }

    try {
      setProfileImageLoading(
        true,
      );

      const imageData =
        await readImageFile(
          file,
        );

      setProfileDraft(
        (
          currentProfile,
        ) => ({
          ...currentProfile,

          avatar:
            imageData,
        }),
      );
    } catch {
      setProfileImageError(
        "The selected photo could not be loaded. Please try another image.",
      );
    } finally {
      setProfileImageLoading(
        false,
      );

      event.target.value =
        "";
    }
  }

  function handleRemoveProfileImage() {
    setProfileDraft(
      (
        currentProfile,
      ) => ({
        ...currentProfile,

        avatar:
          "",
      }),
    );

    setProfileImageError(
      "",
    );

    setProfileSaved(
      false,
    );

    if (
      profileImageInputRef.current
    ) {
      profileImageInputRef.current.value =
        "";
    }
  }

  function handleProfileSave() {
    const cleanedProfile:
      FounderProfile = {
      ...profileDraft,

      name:
        profileDraft.name.trim() ||
        defaultFounderProfile.name,

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

      avatar:
        profileDraft.avatar,
    };

    setFounderProfile(
      cleanedProfile,
    );

    setProfileDraft(
      cleanedProfile,
    );

    window.localStorage.setItem(
      "keos-founder-profile",
      JSON.stringify(
        cleanedProfile,
      ),
    );

    setProfileSaved(
      true,
    );

    window.setTimeout(
      () => {
        setProfileEditorOpen(
          false,
        );

        setProfileSaved(
          false,
        );
      },
      700,
    );
  }

  function handleProfileReset() {
    setProfileDraft(
      founderProfile,
    );

    setProfileImageError(
      "",
    );

    setProfileSaved(
      false,
    );
  }

  function handleNotificationClick(
    notification:
      FounderNotification,
  ) {
    setSelectedNotification(
      notification,
    );

    setNotificationOpen(
      false,
    );
  }

  function openNotificationSection() {
    if (
      !selectedNotification
    ) {
      return;
    }

    handleNavigation(
      selectedNotification
        .relatedSection,
    );

    setSelectedNotification(
      null,
    );
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Founder Command Center
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Enterprise Overview
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Live business performance, operational activity and executive
              oversight for the KRVE enterprise ecosystem.
            </p>
          </div>
                    <div className="flex flex-wrap items-center gap-3">
            <div
              className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-medium ${
                liveDataError
                  ? "border-red-200 bg-red-50 text-red-700"
                  : liveDataLoading
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  liveDataError
                    ? "bg-red-500"
                    : liveDataLoading
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />

              {liveDataError
                ? "Central API Issue"
                : liveDataLoading
                  ? "Syncing Live Data"
                  : "Central API Connected"}
            </div>

            <button
              type="button"
              onClick={() =>
                void refreshFounderData()
              }
              disabled={liveDataLoading}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Activity
                size={16}
                className={
                  liveDataLoading
                    ? "animate-pulse"
                    : ""
                }
              />

              Refresh
            </button>
          </div>
        </div>

        {liveDataError ? (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <p className="font-semibold text-red-800">
                Live business data could not be loaded
              </p>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {liveDataError}
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {resolvedDashboardStatistics.map(
            (
              statistic,
            ) => {
              const Icon =
                statistic.icon;

              const toneClasses =
                getStatisticToneClasses(
                  statistic.tone,
                );

              return (
                <div
                  key={
                    statistic.title
                  }
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClasses.icon}`}
                    >
                      <Icon
                        size={
                          21
                        }
                      />
                    </div>

                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.14em] ${toneClasses.change}`}
                    >
                      {
                        statistic.change
                      }
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="text-2xl font-semibold tracking-tight text-slate-950">
                      {liveDataLoading &&
                      statistic.title !==
                        "Total Employees"
                        ? "..."
                        : statistic.value}
                    </div>

                    <div className="mt-1 text-sm font-medium text-slate-700">
                      {
                        statistic.title
                      }
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {
                        statistic.description
                      }
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Live Commerce
                </p>

                <h2 className="mt-1 text-lg font-semibold text-slate-950">
                  Recent Orders
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleNavigation(
                    "orders",
                  )
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
              >
                View All Orders
                <ArrowRight
                  size={
                    16
                  }
                />
              </button>
            </div>

            {liveDataLoading ? (
              <div className="flex min-h-[320px] items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Activity
                    size={
                      18
                    }
                    className="animate-pulse"
                  />

                  Loading live orders...
                </div>
              </div>
            ) : resolvedRecentOrders.length ===
              0 ? (
              <div className="flex min-h-[320px] items-center justify-center p-8">
                <div className="max-w-sm text-center">
                  <ShoppingBag
                    size={
                      40
                    }
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 font-semibold text-slate-950">
                    No live orders yet
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Orders successfully received from the KRVE website will
                    automatically appear here.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation(
                        "orders",
                      )
                    }
                    className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Open Orders
                    <ArrowRight
                      size={
                        16
                      }
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Order
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Customer
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Amount
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {resolvedRecentOrders.map(
                      (
                        order,
                      ) => (
                        <tr
                          key={`${order.id}-${order.date}`}
                          className="border-b border-slate-100 last:border-b-0"
                        >
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-950">
                              {
                                order.id
                              }
                            </div>

                            <div className="mt-1 text-xs text-slate-400">
                              {
                                order.product
                              }
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm font-medium text-slate-700">
                            {
                              order.customer
                            }
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                order.status,
                              )}`}
                            >
                              {
                                order.status
                              }
                            </span>
                          </td>

                          <td className="px-5 py-4 text-right text-sm font-semibold text-slate-950">
                            {
                              order.amount
                            }
                          </td>

                          <td className="px-5 py-4 text-right text-sm text-slate-500">
                            {
                              order.date
                            }
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Founder Office
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-slate-950">
                    Executive Profile
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={
                    handleProfileEdit
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <Edit3
                    size={
                      16
                    }
                  />
                </button>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 text-base font-semibold text-white">
                  {founderProfile.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        founderProfile.avatar
                      }
                      alt={
                        founderProfile.name
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(
                      founderProfile.name,
                    )
                  )}
                </div>

                <div className="min-w-0">
                  <div className="truncate font-semibold text-slate-950">
                    {
                      founderProfile.name
                    }
                  </div>

                  <div className="mt-1 truncate text-sm text-slate-500">
                    {
                      founderProfile.designation
                    }
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail
                    size={
                      16
                    }
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate">
                    {
                      founderProfile.email
                    }
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Phone
                    size={
                      16
                    }
                    className="shrink-0 text-slate-400"
                  />

                  <span>
                    {
                      founderProfile.phone
                    }
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin
                    size={
                      16
                    }
                    className="shrink-0 text-slate-400"
                  />

                  <span>
                    {
                      founderProfile.location
                    }
                  </span>
                </div>
              </div>
            </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Sparkles
                    size={
                      19
                    }
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                    KRVE Intelligence
                  </p>

                  <h3 className="mt-1 font-semibold">
                    AI Command Center
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/65">
                Use KRVE AI for enterprise insights, automation, forecasting
                and operational recommendations.
              </p>

              <button
                type="button"
                onClick={() =>
                  handleNavigation(
                    "krve-ai",
                  )
                }
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                Open KRVE AI

                <ArrowRight
                  size={
                    16
                  }
                />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "orders",
              )
            }
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <ShoppingBag
              size={
                22
              }
              className="text-slate-700"
            />

            <h3 className="mt-4 font-semibold text-slate-950">
              Orders Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Monitor live website orders and fulfilment.
            </p>

            <ArrowRight
              size={
                17
              }
              className="mt-4 text-slate-400 transition group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "products",
              )
            }
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <Package
              size={
                22
              }
              className="text-slate-700"
            />

            <h3 className="mt-4 font-semibold text-slate-950">
              Products Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Control catalogue, stock, pricing and publishing.
            </p>

            <ArrowRight
              size={
                17
              }
              className="mt-4 text-slate-400 transition group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "finance",
              )
            }
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <CircleDollarSign
              size={
                22
              }
              className="text-slate-700"
            />

            <h3 className="mt-4 font-semibold text-slate-950">
              Finance
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Accounting, cash, GST, vendors and financial controls.
            </p>

            <ArrowRight
              size={
                17
              }
              className="mt-4 text-slate-400 transition group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "hr",
              )
            }
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <Building2
              size={
                22
              }
              className="text-slate-700"
            />

            <h3 className="mt-4 font-semibold text-slate-950">
              Human Resources
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Employees, recruitment, payroll and workforce controls.
            </p>

            <ArrowRight
              size={
                17
              }
              className="mt-4 text-slate-400 transition group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "live-projects",
              )
            }
            className="group rounded-2xl border border-blue-200 bg-blue-50/60 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <GraduationCap
              size={
                22
              }
              className="text-blue-700"
            />

            <h3 className="mt-4 font-semibold text-slate-950">
              Live Projects
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Applications, students, tasks, performance, sales and certificates.
            </p>

            <ArrowRight
              size={
                17
              }
              className="mt-4 text-blue-500 transition group-hover:translate-x-1"
            />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={
                  19
                }
                className="text-emerald-600"
              />

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  KEOS Enterprise Data Layer
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Founder Dashboard is configured to use KRVE Central API data.
                </p>
              </div>
            </div>

            <span className="text-xs font-medium uppercase tracking-[0.13em] text-slate-400">
              Source:{" "}
              {liveDataSource ===
              "api"
                ? "Live API"
                : "Awaiting API"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  function renderActiveSection() {
    switch (
      activeSection
    ) {
      case "dashboard":
        return renderDashboard();

      case "analytics":
        return (
          <BusinessAnalytics />
        );

      case "approvals":
        return (
          <TasksApprovals />
        );

      case "orders":
        return (
          <OrdersManagement />
        );

      case "products":
        return (
          <ProductsManagement />
        );

      case "inventory":
        return (
          <InventoryManagement />
        );

      case "warehouse":
        return (
          <WarehouseManagement />
        );

      case "shipping":
        return (
          <ShippingManagement />
        );

      case "returns-refunds":
        return (
          <ReturnsRefundsManagement />
        );

      case "pricing":
        return (
          <PricingManagement />
        );

      case "discounts-promotions":
        return (
          <DiscountsPromotionsManagement />
        );

      case "seasonal-campaigns":
        return (
          <SeasonalCampaignsManagement />
        );

      case "sales-channels":
        return (
          <SalesChannelsManagement />
        );

      case "abandoned-carts":
        return (
          <AbandonedCartsManagement />
        );

      case "checkout":
        return (
          <CheckoutManagement />
        );

      case "order-tracking":
        return (
          <OrderTrackingManagement />
        );

      case "commerce-reports":
        return (
          <CommerceReportsManagement />
        );

      case "customers":
        return (
          <CustomersManagement />
        );

      case "finance":
        return (
          <FinanceManagement />
        );

      case "hr":
        return (
          <HumanResourcesManagement />
        );

      case "marketing":
        return (
          <MarketingManagement />
        );

      case "support":
        return (
          <CustomerSupportManagement />
        );

      case "procurement":
        return (
          <ProcurementManagement />
        );

      case "crm":
        return (
          <CRMManagement />
        );

      case "vendors":
        return (
          <VendorManagement />
        );

      case "projects":
        return (
          <ProjectsTasksManagement />
        );

      case "live-projects":
        return (
          <LiveProjectsManagement />
        );

      case "documents":
        return (
          <DocumentsManagement />
        );

      case "legal":
        return (
          <LegalComplianceManagement />
        );

      case "risk":
        return (
          <RiskManagement />
        );

      case "assets":
        return (
          <FacilitiesAssetsManagement />
        );

      case "krve-ai":
        return (
          <KrveAICenterManagement />
        );

      case "ai-assistant":
        return (
          <AIAssistantManagement />
        );

      case "automation":
        return (
          <AIAutomationManagement />
        );

      case "forecasting":
        return (
          <ForecastingManagement />
        );

      case "anomaly":
        return (
          <AnomalyDetectionManagement />
        );

      case "recommendations":
        return (
          <AIRecommendationsManagement />
        );

      case "enterprise-reports":
        return (
          <EnterpriseReportsManagement />
        );

      case "executive-reports":
        return (
          <ExecutiveReportsManagement />
        );

      case "department-reports":
        return (
          <DepartmentReportsManagement />
        );

      case "audit-reports":
        return (
          <AuditReportsManagement />
        );

      case "administration":
        return (
          <AdministrationManagement />
        );

      case "users-roles":
        return (
          <UsersRolesManagement />
        );

      case "departments":
        return (
          <DepartmentsManagement />
        );

      case "permissions":
        return (
          <PermissionsManagement />
        );

      case "integrations":
        return (
          <IntegrationsManagement />
        );

      case "security-center":
        return (
          <SecurityCenterManagement />
        );

      case "audit-logs":
        return (
          <AuditLogsManagement />
        );

      case "data-management":
        return (
          <DataManagement />
        );

      case "notifications":
        return (
          <NotificationsManagement />
        );

      case "system-settings":
        return (
          <SystemSettingsManagement />
        );

      default:
        return renderDashboard();
    }
  }

  if (
    !session
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm">
          Loading KEOS Founder workspace...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
            <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:sticky lg:top-0 lg:h-screen ${
            sidebarOpen
              ? "w-[290px]"
              : "w-[92px]"
          } ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-slate-200 px-5">
            <button
              type="button"
              onClick={() => {
                setActiveSection(
                  "dashboard",
                );

                setMobileSidebarOpen(
                  false,
                );
              }}
              className="flex min-w-0 items-center gap-3 text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-bold tracking-[0.12em] text-white">
                KRVE
              </div>

              {sidebarOpen ? (
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-950">
                    KEOS
                  </div>

                  <div className="truncate text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    Enterprise OS
                  </div>
                </div>
              ) : null}
            </button>

            {sidebarOpen ? (
              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(
                    false,
                  )
                }
                className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950 lg:flex"
              >
                <X
                  size={
                    16
                  }
                />
              </button>
            ) : null}
          </div>

          {!sidebarOpen ? (
            <div className="hidden justify-center border-b border-slate-200 py-3 lg:flex">
              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(
                    true,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <Menu
                  size={
                    17
                  }
                />
              </button>
            </div>
          ) : null}

          {sidebarOpen ? (
            <div className="shrink-0 border-b border-slate-100 p-4">
              <div className="relative">
                <Search
                  size={
                    16
                  }
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={
                    searchQuery
                  }
                  onChange={(
                    event,
                  ) =>
                    setSearchQuery(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Search KEOS..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                />
              </div>
            </div>
          ) : null}

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            {filteredNavigationGroups.map(
              (
                group,
              ) => (
                <div
                  key={
                    group.title
                  }
                  className="mb-6 last:mb-2"
                >
                  {sidebarOpen ? (
                    <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {
                        group.title
                      }
                    </div>
                  ) : null}

                  <div className="space-y-1">
                    {group.items.map(
                      (
                        item,
                      ) => {
                        const Icon =
                          item.icon;

                        const active =
                          activeSection ===
                          item.id;

                        return (
                          <button
                            key={
                              item.id
                            }
                            type="button"
                            onClick={() =>
                              handleNavigation(
                                item.id,
                              )
                            }
                            title={
                              sidebarOpen
                                ? undefined
                                : item.name
                            }
                            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                              active
                                ? "bg-slate-950 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                            } ${
                              sidebarOpen
                                ? ""
                                : "justify-center"
                            }`}
                          >
                            <Icon
                              size={
                                18
                              }
                              className="shrink-0"
                            />

                            {sidebarOpen ? (
                              <>
                                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                                  {
                                    item.name
                                  }
                                </span>

                                {item.badge ? (
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                      active
                                        ? "bg-white/15 text-white"
                                        : "bg-slate-200 text-slate-600"
                                    }`}
                                  >
                                    {
                                      item.badge
                                    }
                                  </span>
                                ) : null}
                              </>
                            ) : null}
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              ),
            )}

            {sidebarOpen &&
            filteredNavigationGroups.length ===
              0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
                No KEOS module found.
              </div>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-slate-200 p-3">
            <button
              type="button"
              onClick={() =>
                setProfileOpen(
                  true,
                )
              }
              className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-slate-100 ${
                sidebarOpen
                  ? ""
                  : "justify-center"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-950 text-xs font-semibold text-white">
                {founderProfile.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      founderProfile.avatar
                    }
                    alt={
                      founderProfile.name
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(
                    founderProfile.name,
                  )
                )}
              </div>

              {sidebarOpen ? (
                <>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-slate-950">
                      {
                        founderProfile.name
                      }
                    </div>

                    <div className="truncate text-xs text-slate-400">
                      Founder
                    </div>
                  </div>

                  <ChevronDown
                    size={
                      16
                    }
                    className="text-slate-400"
                  />
                </>
              ) : null}
            </button>
          </div>
        </aside>

        {mobileSidebarOpen ? (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() =>
              setMobileSidebarOpen(
                false,
              )
            }
            className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[1px] lg:hidden"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-[74px] items-center gap-3 px-4 sm:px-6 xl:px-8">
              <button
                type="button"
                onClick={() =>
                  setMobileSidebarOpen(
                    true,
                  )
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
              >
                <Menu
                  size={
                    19
                  }
                />
              </button>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-950">
                  {activeNavigationItem
                    ?.name ??
                    "Founder Dashboard"}
                </div>

                <div className="mt-0.5 hidden truncate text-xs text-slate-400 sm:block">
                  {activeNavigationItem
                    ?.description ??
                    "KRVE Enterprise Operating System"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen(
                      (
                        current,
                      ) =>
                        !current,
                    );

                    setProfileOpen(
                      false,
                    );
                  }}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <Bell
                    size={
                      18
                    }
                  />

                  {unreadNotificationCount >
                  0 ? (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                      {
                        unreadNotificationCount
                      }
                    </span>
                  ) : null}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(
                      (
                        current,
                      ) =>
                        !current,
                    );

                    setNotificationOpen(
                      false,
                    );
                  }}
                  className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 pr-3 transition hover:bg-slate-50"
                >
                  <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-slate-950 text-[10px] font-semibold text-white">
                    {founderProfile.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          founderProfile.avatar
                        }
                        alt={
                          founderProfile.name
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(
                        founderProfile.name,
                      )
                    )}
                  </div>

                  <span className="hidden max-w-[140px] truncate text-sm font-medium text-slate-700 md:block">
                    {
                      founderProfile.name
                    }
                  </span>

                  <ChevronDown
                    size={
                      15
                    }
                    className="hidden text-slate-400 md:block"
                  />
                </button>
              </div>
            </div>

            {notificationOpen ? (
              <div className="absolute right-4 top-[66px] z-50 w-[min(92vw,390px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6 xl:right-8">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {
                        unreadNotificationCount
                      }{" "}
                      unread
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(
                        false,
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X
                      size={
                        16
                      }
                    />
                  </button>
                </div>

                <div className="max-h-[420px] overflow-y-auto p-2">
                  {notificationItems.map(
                    (
                      notification,
                    ) => (
                      <button
                        key={
                          notification.id
                        }
                        type="button"
                        onClick={() =>
                          handleNotificationClick(
                            notification,
                          )
                        }
                        className="flex w-full gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                      >
                        <div
                          className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                            notification.unread
                              ? "bg-blue-600"
                              : "bg-slate-300"
                          }`}
                        />

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-950">
                            {
                              notification.title
                            }
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {
                              notification.message
                            }
                          </p>

                          <p className="mt-2 text-[11px] font-medium text-slate-400">
                            {
                              notification.time
                            }
                          </p>
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>
            ) : null}
                        {profileOpen ? (
              <div className="absolute right-4 top-[66px] z-50 w-[min(92vw,310px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6 xl:right-8">
                <div className="border-b border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-950 text-xs font-semibold text-white">
                      {founderProfile.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={
                            founderProfile.avatar
                          }
                          alt={
                            founderProfile.name
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials(
                          founderProfile.name,
                        )
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="truncate font-semibold text-slate-950">
                        {
                          founderProfile.name
                        }
                      </div>

                      <div className="mt-0.5 truncate text-xs text-slate-400">
                        {
                          founderProfile.email
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={
                      handleProfileEdit
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <UserRound
                      size={
                        17
                      }
                    />

                    Founder Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleNavigation(
                        "system-settings",
                      );

                      setProfileOpen(
                        false,
                      );
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <Settings
                      size={
                        17
                      }
                    />

                    System Settings
                  </button>

                  <div className="my-2 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut
                      size={
                        17
                      }
                    />

                    Sign Out
                  </button>
                </div>
              </div>
            ) : null}
          </header>

          <div className="px-4 py-6 sm:px-6 xl:px-8">
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {selectedNotification ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Notification
                </p>

                <h2 className="mt-1 text-xl font-semibold text-slate-950">
                  {
                    selectedNotification.title
                  }
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(
                    null,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <X
                  size={
                    17
                  }
                />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm leading-7 text-slate-600">
                {
                  selectedNotification.message
                }
              </p>

              <div className="mt-4 text-xs text-slate-400">
                {
                  selectedNotification.time
                }
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedNotification(
                      null,
                    )
                  }
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={
                    openNotificationSection
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Open Module

                  <ArrowRight
                    size={
                      16
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {profileEditorOpen ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/20 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Founder Account
                </p>

                <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                  Edit Founder Profile
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setProfileEditorOpen(
                    false,
                  );

                  setProfileImageError(
                    "",
                  );

                  setProfileSaved(
                    false,
                  );
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <X
                  size={
                    18
                  }
                />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-slate-950 text-xl font-semibold text-white">
                    {profileDraft.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          profileDraft.avatar
                        }
                        alt={
                          profileDraft.name
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(
                        profileDraft.name,
                      )
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-950">
                      Profile Photo
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Upload a JPG, PNG or WEBP image up to 2 MB.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <input
                        ref={
                          profileImageInputRef
                        }
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={
                          handleProfileImageChange
                        }
                      />

                      <button
                        type="button"
                        onClick={
                          handleProfileImageButtonClick
                        }
                        disabled={
                          profileImageLoading
                        }
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Camera
                          size={
                            16
                          }
                        />

                        {profileImageLoading
                          ? "Loading..."
                          : "Upload Photo"}
                      </button>

                      {profileDraft.avatar ? (
                        <button
                          type="button"
                          onClick={
                            handleRemoveProfileImage
                          }
                          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          <X
                            size={
                              16
                            }
                          />

                          Remove
                        </button>
                      ) : null}
                    </div>

                    {profileImageError ? (
                      <p className="mt-3 text-sm text-red-600">
                        {
                          profileImageError
                        }
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-950">
                  Personal Information
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Full Name
                    </span>

                    <input
                      type="text"
                      value={
                        profileDraft.name
                      }
                      onChange={(
                        event,
                      ) =>
                        handleProfileFieldChange(
                          "name",
                          event.target
                            .value,
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Founder ID
                    </span>

                    <input
                      type="text"
                      value={
                        profileDraft.userId
                      }
                      onChange={(
                        event,
                      ) =>
                        handleProfileFieldChange(
                          "userId",
                          event.target
                            .value,
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Email
                    </span>

                    <input
                      type="email"
                      value={
                        profileDraft.email
                      }
                      onChange={(
                        event,
                      ) =>
                        handleProfileFieldChange(
                          "email",
                          event.target
                            .value,
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Phone
                    </span>

                    <input
                      type="text"
                      value={
                        profileDraft.phone
                      }
                      onChange={(
                        event,
                      ) =>
                        handleProfileFieldChange(
                          "phone",
                          event.target
                            .value,
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-950">
                  KRVE Role
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Designation
                    </span>

                    <input
                      type="text"
                      value={
                        profileDraft.designation
                      }
                      onChange={(
                        event,
                      ) =>
                        handleProfileFieldChange(
                          "designation",
                          event.target
                            .value,
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Department
                    </span>

                    <input
                      type="text"
                      value={
                        profileDraft.department
                      }
                      onChange={(
                        event,
                      ) =>
                        handleProfileFieldChange(
                          "department",
                          event.target
                            .value,
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Location
                    </span>

                    <input
                      type="text"
                      value={
                        profileDraft.location
                      }
                      onChange={(
                        event,
                      ) =>
                        handleProfileFieldChange(
                          "location",
                          event.target
                            .value,
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Joining Date
                    </span>

                    <input
                      type="text"
                      value={
                        profileDraft.joiningDate
                      }
                      onChange={(
                        event,
                      ) =>
                        handleProfileFieldChange(
                          "joiningDate",
                          event.target
                            .value,
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>
                </div>

                <label className="mt-4 block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Founder Bio
                  </span>

                  <textarea
                    value={
                      profileDraft.bio
                    }
                    onChange={(
                      event,
                    ) =>
                      handleProfileFieldChange(
                        "bio",
                        event.target
                          .value,
                      )
                    }
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                  />
                </label>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={
                      20
                    }
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Founder Access
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Founder account has enterprise-wide KEOS access. Role and
                      security permissions should be controlled from Users &
                      Roles and Permissions modules.
                    </p>
                  </div>
                </div>
              </section>

              {profileSaved ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  <ShieldCheck
                    size={
                      17
                    }
                  />

                  Founder profile saved successfully.
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={
                    handleProfileReset
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw
                    size={
                      16
                    }
                  />

                  Reset Changes
                </button>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileEditorOpen(
                        false,
                      );

                      setProfileImageError(
                        "",
                      );

                      setProfileSaved(
                        false,
                      );
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleProfileSave
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    <Save
                      size={
                        16
                      }
                    />

                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
