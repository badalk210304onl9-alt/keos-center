"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileBarChart,
  FileText,
  Gift,
  HeartHandshake,
  History,
  IndianRupee,
  Mail,
  MapPin,
  MessageSquare,
  PackageCheck,
  Phone,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tags,
  UserCheck,
  UserPlus,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ModuleId =
  | "customer-dashboard"
  | "customer-directory"
  | "customer-profile"
  | "segmentation"
  | "loyalty"
  | "wallets"
  | "addresses"
  | "purchase-history"
  | "communications"
  | "customer-support"
  | "verification"
  | "customer-value"
  | "retention"
  | "feedback"
  | "referrals"
  | "subscriptions"
  | "privacy-consent"
  | "customer-analytics"
  | "customer-reports"
  | "customer-settings"
  | "krve-ai-customer";

type CustomerModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: CustomerModule[] = [
  {
    id: "customer-dashboard",
    title: "Customer Dashboard",
    description: "View customer KPIs, growth, value and engagement.",
    icon: BarChart3,
    items: [
      "Total Customers",
      "Active Customers",
      "New Customers",
      "Repeat Customers",
      "Loyalty Members",
      "Customer LTV",
      "Churn Risk",
      "Segment Performance",
      "AI Insights",
    ],
  },
  {
    id: "customer-directory",
    title: "Customer Directory",
    description: "Search and manage complete customer records.",
    icon: Users,
    items: [
      "Customer List",
      "Advanced Search",
      "Filters",
      "Customer Status",
      "Bulk Actions",
      "Import Customers",
      "Export Customers",
      "Merge Duplicates",
      "Archived Customers",
    ],
  },
  {
    id: "customer-profile",
    title: "Customer Profile",
    description: "Manage identity, contact, preferences and relationship details.",
    icon: UserCheck,
    items: [
      "Personal Details",
      "Contact Details",
      "Profile Photo",
      "Date of Birth",
      "Gender",
      "Preferred Language",
      "Customer Preferences",
      "Emergency Contact",
      "Notes",
      "Tags",
    ],
  },
  {
    id: "segmentation",
    title: "Customer Segmentation",
    description: "Build dynamic customer groups using behaviour and value.",
    icon: Tags,
    items: [
      "Create Segment",
      "Dynamic Segments",
      "VIP Customers",
      "Repeat Customers",
      "New Customers",
      "High Intent",
      "At-Risk Customers",
      "Inactive Customers",
      "Geographic Segments",
      "Segment Rules",
    ],
  },
  {
    id: "loyalty",
    title: "Loyalty Management",
    description: "Manage tiers, points, rewards and member benefits.",
    icon: Gift,
    items: [
      "Loyalty Dashboard",
      "Loyalty Tiers",
      "Points Earning Rules",
      "Points Redemption",
      "Reward Catalogue",
      "Member Benefits",
      "Bonus Points",
      "Points Expiry",
      "Loyalty History",
      "Loyalty Reports",
    ],
  },
  {
    id: "wallets",
    title: "Customer Wallets",
    description: "Control wallet balances, credits, debits and expiry.",
    icon: WalletCards,
    items: [
      "Wallet Dashboard",
      "Wallet Balance",
      "Add Credit",
      "Debit Wallet",
      "Store Credit",
      "Refund to Wallet",
      "Promotional Credit",
      "Credit Expiry",
      "Wallet Transactions",
      "Wallet Reports",
    ],
  },
  {
    id: "addresses",
    title: "Customer Addresses",
    description: "Manage saved addresses, validation and serviceability.",
    icon: MapPin,
    items: [
      "Saved Addresses",
      "Default Address",
      "Billing Address",
      "Shipping Address",
      "Address Verification",
      "PIN Code Validation",
      "Serviceability Check",
      "Address Correction",
      "Address History",
    ],
  },
  {
    id: "purchase-history",
    title: "Purchase History",
    description: "Review customer orders, spend, products and returns.",
    icon: ShoppingBag,
    items: [
      "Order History",
      "Product History",
      "Total Spend",
      "Average Order Value",
      "Purchase Frequency",
      "Preferred Categories",
      "Returns History",
      "Refund History",
      "Cancelled Orders",
      "Purchase Reports",
    ],
  },
  {
    id: "communications",
    title: "Customer Communications",
    description: "Manage email, WhatsApp, SMS and call interactions.",
    icon: Mail,
    items: [
      "Email History",
      "WhatsApp History",
      "SMS History",
      "Call History",
      "Campaign Messages",
      "Transactional Messages",
      "Communication Preferences",
      "Unsubscribe Requests",
      "Message Templates",
      "Communication Reports",
    ],
  },
  {
    id: "customer-support",
    title: "Customer Support",
    description: "Track tickets, complaints, resolutions and service quality.",
    icon: MessageSquare,
    items: [
      "Support Tickets",
      "Open Complaints",
      "Order Issues",
      "Delivery Issues",
      "Return Issues",
      "Payment Issues",
      "Escalations",
      "Resolution History",
      "Customer Satisfaction",
      "Support Reports",
    ],
  },
  {
    id: "verification",
    title: "Customer Verification",
    description: "Verify email, phone, identity and account risk.",
    icon: ShieldCheck,
    items: [
      "Email Verification",
      "Phone Verification",
      "KYC Verification",
      "Identity Documents",
      "Fraud Risk",
      "Duplicate Detection",
      "Account Review",
      "Blocked Customers",
      "Verification History",
      "Risk Reports",
    ],
  },
  {
    id: "customer-value",
    title: "Customer Value",
    description: "Measure lifetime value, profitability and customer contribution.",
    icon: IndianRupee,
    items: [
      "Customer LTV",
      "Revenue Contribution",
      "Gross Margin",
      "Net Contribution",
      "Average Order Value",
      "Purchase Frequency",
      "Cost to Serve",
      "Discount Dependency",
      "High Value Customers",
      "Value Reports",
    ],
  },
  {
    id: "retention",
    title: "Retention & Churn",
    description: "Monitor retention, inactivity and reactivation opportunities.",
    icon: HeartHandshake,
    items: [
      "Retention Dashboard",
      "Churn Risk",
      "Inactive Customers",
      "Reactivation Campaigns",
      "Win-Back Offers",
      "Repeat Purchase Rate",
      "Cohort Analysis",
      "Retention Segments",
      "Lapse Reasons",
      "Retention Reports",
    ],
  },
  {
    id: "feedback",
    title: "Feedback & Reviews",
    description: "Manage ratings, product reviews and customer feedback.",
    icon: MessageSquare,
    items: [
      "Product Reviews",
      "Order Feedback",
      "Delivery Feedback",
      "Support Feedback",
      "Net Promoter Score",
      "Customer Satisfaction",
      "Review Moderation",
      "Feedback Tags",
      "Action Items",
      "Feedback Reports",
    ],
  },
  {
    id: "referrals",
    title: "Referral Management",
    description: "Manage referral codes, rewards and referred customers.",
    icon: UserPlus,
    items: [
      "Referral Dashboard",
      "Referral Codes",
      "Referral Rewards",
      "Referring Customers",
      "Referred Customers",
      "Reward Approval",
      "Fraud Check",
      "Referral Campaigns",
      "Referral History",
      "Referral Reports",
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions & Memberships",
    description: "Manage paid memberships and recurring customer benefits.",
    icon: BadgeCheck,
    items: [
      "Membership Plans",
      "Active Memberships",
      "Renewals",
      "Benefits",
      "Subscription Payments",
      "Failed Renewals",
      "Cancellations",
      "Pause Membership",
      "Membership History",
      "Membership Reports",
    ],
  },
  {
    id: "privacy-consent",
    title: "Privacy & Consent",
    description: "Manage customer consent, privacy requests and data controls.",
    icon: ShieldCheck,
    items: [
      "Marketing Consent",
      "Email Consent",
      "WhatsApp Consent",
      "SMS Consent",
      "Cookie Consent",
      "Data Access Request",
      "Data Correction Request",
      "Data Deletion Request",
      "Consent History",
      "Privacy Reports",
    ],
  },
  {
    id: "customer-analytics",
    title: "Customer Analytics",
    description: "Analyse acquisition, engagement, retention and value.",
    icon: Activity,
    items: [
      "Customer Growth",
      "Acquisition Analytics",
      "Retention Analytics",
      "Churn Analytics",
      "Segment Analytics",
      "Loyalty Analytics",
      "Wallet Analytics",
      "Purchase Analytics",
      "Support Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "customer-reports",
    title: "Customer Reports",
    description: "Generate customer, loyalty, wallet and retention reports.",
    icon: FileBarChart,
    items: [
      "Customer Master Report",
      "Customer Value Report",
      "Purchase History Report",
      "Segment Report",
      "Loyalty Report",
      "Wallet Report",
      "Retention Report",
      "Churn Report",
      "Verification Report",
      "Communication Report",
    ],
  },
  {
    id: "customer-settings",
    title: "Customer Settings",
    description: "Configure customer identity, loyalty, wallets and communication.",
    icon: Settings2,
    items: [
      "Customer ID Format",
      "Profile Fields",
      "Customer Status Rules",
      "Segment Rules",
      "Loyalty Rules",
      "Wallet Rules",
      "Verification Rules",
      "Communication Preferences",
      "Privacy Rules",
      "Customer Permissions",
    ],
  },
  {
    id: "krve-ai-customer",
    title: "KRVE AI Customer",
    description: "Use AI for customer value, retention and relationship decisions.",
    icon: Sparkles,
    items: [
      "AI Customer Segmentation",
      "AI LTV Prediction",
      "AI Churn Prediction",
      "AI Next Best Offer",
      "AI Product Recommendation",
      "AI Retention Recommendation",
      "AI Support Summary",
      "AI Sentiment Analysis",
      "AI Customer Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Total Customers", "4,294", "1,028 added this year", Users],
  ["Active Customers", "3,516", "Purchased in 90 days", CheckCircle2],
  ["Loyalty Members", "1,842", "43% of customer base", Gift],
  ["Customer LTV", "₹28,640", "Average lifetime value", IndianRupee],
];

export default function CustomersManagement() {
  const [selectedModule, setSelectedModule] =
    useState<CustomerModule | null>(null);
  const [search, setSearch] = useState("");

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return modules;

    return modules.filter((module) =>
      `${module.title} ${module.description} ${module.items.join(" ")}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

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
      <Hero />

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map(([title, value, note, Icon]) => (
          <MetricCard
            key={String(title)}
            title={String(title)}
            value={String(value)}
            note={String(note)}
            icon={Icon as IconType}
          />
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customer modules, features or workflows..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />

          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <X size={16} className="text-slate-400" />
            </button>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Complete Customer Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete customer workspace.
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
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <Users size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Customer Operations
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Customer Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete customer operations covering profiles, segmentation,
            loyalty, wallets, addresses, purchase history, support, retention,
            analytics and KRVE AI Customer.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Tags size={17} />
            Create Segment
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Add Customer
          </button>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
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
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function ModuleCard({
  module,
  onOpen,
}: {
  module: CustomerModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group min-h-[220px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">
        {module.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {module.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">
          {module.items.length} features
        </span>

        <span className="flex items-center gap-2 text-sm font-bold text-blue-600">
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
  module: CustomerModule;
  onBack: () => void;
}) {
  const Icon = module.icon;

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-blue-100 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Customer Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Customer Workspace
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {module.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              {module.description}
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700">
            <Plus size={17} />
            Create New
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric
          title="Active Records"
          value="4,294"
          note="Current module"
          icon={Users}
        />
        <WorkspaceMetric
          title="Pending Actions"
          value="14"
          note="Require attention"
          icon={BellRing}
        />
        <WorkspaceMetric
          title="Completed"
          value="96%"
          note="Current cycle"
          icon={CheckCircle2}
        />
        <WorkspaceMetric
          title="Reports"
          value="8"
          note="Available exports"
          icon={FileBarChart}
        />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its customer workflow.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600">
            <FileBarChart size={17} />
            View Reports
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {module.items.map((item, index) => (
            <FeatureCard key={item} title={item} index={index} />
          ))}
        </div>
      </section>
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
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
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
    UserCheck,
    Tags,
    Gift,
    WalletCards,
    MapPin,
    ShoppingBag,
    Mail,
    MessageSquare,
    ShieldCheck,
    History,
    Phone,
    PackageCheck,
  ];

  const Icon = icons[index % icons.length];

  return (
    <button
      type="button"
      className="group min-h-[175px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-950">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Open and manage the complete {title.toLowerCase()} workflow.
      </p>

      <span className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
        Open
        <ArrowRight
          size={15}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}