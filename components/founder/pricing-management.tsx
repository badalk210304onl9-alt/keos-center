"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Download,
  FileBarChart,
  Filter,
  History,
  IndianRupee,
  Layers3,
  LineChart,
  Package,
  Percent,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tags,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type PricingTab =
  | "dashboard"
  | "price-lists"
  | "product-pricing"
  | "costs"
  | "margins"
  | "rules"
  | "history"
  | "approvals"
  | "analytics"
  | "reports"
  | "settings";

type PriceStatus = "Active" | "Draft" | "Scheduled" | "Expired";
type ApprovalStatus = "Pending" | "Approved" | "Rejected";
type MarginHealth = "Healthy" | "Low" | "Critical";

type PriceList = {
  id: string;
  name: string;
  channel: string;
  currency: string;
  products: number;
  validFrom: string;
  validTo: string;
  status: PriceStatus;
};

type ProductPrice = {
  id: string;
  sku: string;
  product: string;
  category: string;
  cost: number;
  price: number;
  compareAt: number;
  channel: string;
  margin: number;
  lastUpdated: string;
  health: MarginHealth;
};

type PricingRule = {
  id: string;
  name: string;
  scope: string;
  condition: string;
  action: string;
  priority: number;
  status: "Active" | "Inactive";
};

type PriceApproval = {
  id: string;
  title: string;
  requestedBy: string;
  requestedAt: string;
  affectedProducts: number;
  currentValue: number;
  proposedValue: number;
  impact: string;
  status: ApprovalStatus;
};

const tabs: Array<{
  id: PricingTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "price-lists", label: "Price Lists", icon: Tags },
  { id: "product-pricing", label: "Product Pricing", icon: Package },
  { id: "costs", label: "Cost Management", icon: Calculator },
  { id: "margins", label: "Margins", icon: Percent },
  { id: "rules", label: "Pricing Rules", icon: Layers3 },
  { id: "history", label: "Price History", icon: History },
  { id: "approvals", label: "Approvals", icon: ShieldCheck },
  { id: "analytics", label: "Analytics", icon: LineChart },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const priceLists: PriceList[] = [
  {
    id: "PL-001",
    name: "KRVE Website Retail",
    channel: "Website",
    currency: "INR",
    products: 148,
    validFrom: "1 Jul 2026",
    validTo: "31 Dec 2026",
    status: "Active",
  },
  {
    id: "PL-002",
    name: "Mobile App Exclusive",
    channel: "Mobile App",
    currency: "INR",
    products: 96,
    validFrom: "15 Jul 2026",
    validTo: "30 Sep 2026",
    status: "Active",
  },
  {
    id: "PL-003",
    name: "Marketplace Standard",
    channel: "Marketplaces",
    currency: "INR",
    products: 124,
    validFrom: "1 Aug 2026",
    validTo: "31 Dec 2026",
    status: "Scheduled",
  },
  {
    id: "PL-004",
    name: "Offline Store Premium",
    channel: "Offline Stores",
    currency: "INR",
    products: 82,
    validFrom: "1 Jun 2026",
    validTo: "31 Mar 2027",
    status: "Active",
  },
];

const productPrices: ProductPrice[] = [
  {
    id: "PR-001",
    sku: "KRVE-NB-BLK-M",
    product: "KRVE Noir Blazer",
    category: "Blazers",
    cost: 8400,
    price: 18999,
    compareAt: 21999,
    channel: "Website",
    margin: 55.8,
    lastUpdated: "26 Jul 2026, 12:45 AM",
    health: "Healthy",
  },
  {
    id: "PR-002",
    sku: "KRVE-OS-BLK-42",
    product: "Obsidian Oxford Shoes",
    category: "Footwear",
    cost: 3900,
    price: 8999,
    compareAt: 9999,
    channel: "Website",
    margin: 56.7,
    lastUpdated: "26 Jul 2026, 12:12 AM",
    health: "Healthy",
  },
  {
    id: "PR-003",
    sku: "KRVE-DB-NVY-XL",
    product: "Double-Breasted Navy Suit",
    category: "Suits",
    cost: 14900,
    price: 32999,
    compareAt: 35999,
    channel: "Website",
    margin: 54.8,
    lastUpdated: "25 Jul 2026, 11:42 PM",
    health: "Healthy",
  },
  {
    id: "PR-004",
    sku: "KRVE-IC-SNK-09",
    product: "KRVE Icon Sneakers",
    category: "Footwear",
    cost: 3200,
    price: 6499,
    compareAt: 7999,
    channel: "Mobile App",
    margin: 50.8,
    lastUpdated: "25 Jul 2026, 10:55 PM",
    health: "Low",
  },
  {
    id: "PR-005",
    sku: "KRVE-WL-BLK",
    product: "Signature Leather Wallet",
    category: "Accessories",
    cost: 2100,
    price: 3499,
    compareAt: 3999,
    channel: "Marketplace",
    margin: 40.0,
    lastUpdated: "25 Jul 2026, 09:20 PM",
    health: "Critical",
  },
];

const pricingRules: PricingRule[] = [
  {
    id: "RULE-001",
    name: "Minimum Margin Protection",
    scope: "All Products",
    condition: "Margin below 45%",
    action: "Block discount and require approval",
    priority: 1,
    status: "Active",
  },
  {
    id: "RULE-002",
    name: "App Launch Offer",
    scope: "Mobile App",
    condition: "First app order",
    action: "Apply 10% discount up to ₹1,000",
    priority: 2,
    status: "Active",
  },
  {
    id: "RULE-003",
    name: "Overstock Price Action",
    scope: "Inventory Overstock",
    condition: "Stock above maximum level",
    action: "Recommend markdown between 8% and 15%",
    priority: 3,
    status: "Active",
  },
  {
    id: "RULE-004",
    name: "VIP Customer Pricing",
    scope: "Gold Loyalty Tier",
    condition: "Customer tier is Gold",
    action: "Apply 5% loyalty price",
    priority: 4,
    status: "Inactive",
  },
];

const approvals: PriceApproval[] = [
  {
    id: "APR-2026-084",
    title: "Footwear App Price Revision",
    requestedBy: "Commerce Manager",
    requestedAt: "26 Jul 2026, 12:25 AM",
    affectedProducts: 18,
    currentValue: 8999,
    proposedValue: 8299,
    impact: "Estimated conversion +7.4%, margin -3.1%",
    status: "Pending",
  },
  {
    id: "APR-2026-083",
    title: "Marketplace Commission Adjustment",
    requestedBy: "Finance Team",
    requestedAt: "25 Jul 2026, 10:45 PM",
    affectedProducts: 42,
    currentValue: 12499,
    proposedValue: 13299,
    impact: "Protects 4.2% contribution margin",
    status: "Pending",
  },
  {
    id: "APR-2026-082",
    title: "Noir Collection Premium Pricing",
    requestedBy: "Founder Office",
    requestedAt: "25 Jul 2026, 08:10 PM",
    affectedProducts: 12,
    currentValue: 18999,
    proposedValue: 19999,
    impact: "Revenue opportunity ₹1.8L monthly",
    status: "Approved",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PricingManagement() {
  const [activeTab, setActiveTab] = useState<PricingTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return productPrices;
    }

    return productPrices.filter((item) =>
      `${item.sku} ${item.product} ${item.category} ${item.channel}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <PricingHeader
        onCreate={() => setShowCreatePanel(true)}
        onOpenTab={setActiveTab}
      />

      <PricingTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "price-lists" && (
        <PriceListsWorkspace onCreate={() => setShowCreatePanel(true)} />
      )}

      {activeTab === "product-pricing" && (
        <ProductPricingWorkspace
          products={filteredProducts}
          search={search}
          setSearch={setSearch}
        />
      )}

      {activeTab === "costs" && <CostManagementWorkspace />}

      {activeTab === "margins" && <MarginsWorkspace />}

      {activeTab === "rules" && <PricingRulesWorkspace />}

      {activeTab === "history" && <PriceHistoryWorkspace />}

      {activeTab === "approvals" && <ApprovalsWorkspace />}

      {activeTab === "analytics" && <AnalyticsWorkspace />}

      {activeTab === "reports" && <ReportsWorkspace />}

      {activeTab === "settings" && <SettingsWorkspace />}

      {showCreatePanel && (
        <CreatePriceListPanel onClose={() => setShowCreatePanel(false)} />
      )}
    </div>
  );
}

function PricingHeader({
  onCreate,
  onOpenTab,
}: {
  onCreate: () => void;
  onOpenTab: (tab: PricingTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <Tags size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Commercial Controls
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Pricing Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Control product prices, cost structures, margins, channel price
            lists, approval workflows, dynamic rules and pricing intelligence.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("approvals")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <ShieldCheck size={17} />
            Review Approvals
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Create Price List
          </button>
        </div>
      </div>
    </section>
  );
}

function PricingTabBar({
  activeTab,
  onChange,
}: {
  activeTab: PricingTab;
  onChange: (tab: PricingTab) => void;
}) {
  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="keos-scrollbar flex overflow-x-auto p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DashboardWorkspace({
  onOpenTab,
}: {
  onOpenTab: (tab: PricingTab) => void;
}) {
  const averageMargin =
    productPrices.reduce((sum, item) => sum + item.margin, 0) /
    productPrices.length;

  const lowMarginCount = productPrices.filter(
    (item) => item.health !== "Healthy",
  ).length;

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Active Price Lists"
          value="4"
          note="Retail and channel based"
          icon={Tags}
          tone="blue"
        />
        <MetricCard
          title="Average Margin"
          value={`${averageMargin.toFixed(1)}%`}
          note="Across catalogue"
          icon={TrendingUp}
          tone="green"
        />
        <MetricCard
          title="Price Reviews"
          value="11"
          note="Pending approval"
          icon={ShieldCheck}
          tone="violet"
        />
        <MetricCard
          title="Margin Alerts"
          value={String(lowMarginCount)}
          note="Below approved threshold"
          icon={AlertTriangle}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Product Pricing Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current price, cost and margin health
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("product-pricing")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Manage Product Pricing
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {productPrices.slice(0, 5).map((item) => (
              <ProductPriceRow key={item.id} item={item} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
              <Sparkles size={22} />
            </div>

            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-300">
              AI Active
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black">
            KRVE AI Pricing Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI analyses demand, inventory, conversion, cost, margin and
            competitor signals to recommend safer pricing actions.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Margin protection"
              detail="One marketplace product is below the approved 45% margin threshold."
              tone="orange"
            />
            <InsightCard
              title="Revenue opportunity"
              detail="A 5% price increase on the Noir collection may add ₹1.8L monthly revenue."
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Pricing Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Approval Queue
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Price changes requiring review
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("approvals")}
              className="text-sm font-bold text-blue-600"
            >
              Open Approvals
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {approvals.map((approval) => (
              <ApprovalListRow key={approval.id} approval={approval} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Pricing Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily commercial pricing workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Create Price List"
              description="Create channel or customer price lists"
              icon={Tags}
              onClick={() => onOpenTab("price-lists")}
            />
            <QuickAction
              title="Update Product Price"
              description="Review and change product pricing"
              icon={Package}
              onClick={() => onOpenTab("product-pricing")}
            />
            <QuickAction
              title="Review Margins"
              description="Find low-margin and critical products"
              icon={Percent}
              onClick={() => onOpenTab("margins")}
            />
            <QuickAction
              title="Create Pricing Rule"
              description="Automate safe pricing conditions"
              icon={Layers3}
              onClick={() => onOpenTab("rules")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Active Price Lists
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Channel and customer pricing coverage
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("price-lists")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Manage Price Lists
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {priceLists.map((list) => (
            <PriceListCard key={list.id} list={list} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  title,
  value,
  note,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  note: string;
  icon: IconType;
  tone: "blue" | "green" | "violet" | "orange";
}) {
  const classes =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "violet"
        ? "bg-violet-50 text-violet-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${classes}`}>
        <Icon size={21} />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function ProductPriceRow({
  item,
}: {
  item: ProductPrice;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Package size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {item.product}
          </strong>
          <span className="text-xs text-slate-400">{item.lastUpdated}</span>
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">
          {item.sku} · {item.channel} · Cost {formatCurrency(item.cost)}
        </p>
      </div>

      <div className="text-right">
        <strong className="block text-sm text-slate-900">
          {formatCurrency(item.price)}
        </strong>
        <MarginBadge health={item.health} margin={item.margin} />
      </div>
    </div>
  );
}

function ApprovalListRow({
  approval,
}: {
  approval: PriceApproval;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <ShieldCheck size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">
          {approval.title}
        </strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {approval.requestedBy} · {approval.affectedProducts} products · {approval.impact}
        </p>
      </div>

      <ApprovalBadge status={approval.status} />
    </div>
  );
}

function PriceListCard({
  list,
}: {
  list: PriceList;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Tags size={19} />
        </div>
        <PriceStatusBadge status={list.status} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">{list.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{list.channel}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <InfoBox label="Products" value={String(list.products)} />
        <InfoBox label="Currency" value={list.currency} />
      </div>
    </article>
  );
}

function InsightCard({
  title,
  detail,
  tone,
}: {
  title: string;
  detail: string;
  tone: "green" | "orange";
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <strong
        className={`text-xs ${
          tone === "green" ? "text-green-300" : "text-orange-300"
        }`}
      >
        {title}
      </strong>
      <p className="mt-2 text-xs leading-5 text-slate-400">{detail}</p>
    </div>
  );
}

function QuickAction({
  title,
  description,
  icon: Icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: IconType;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>

      <strong className="mt-4 block text-sm text-slate-900">{title}</strong>
      <span className="mt-2 block text-xs leading-5 text-slate-500">
        {description}
      </span>

      <span className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
        Open
        <ChevronRight
          size={14}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}

function PriceListsWorkspace({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Price Lists"
        description="Manage channel, customer, retail and scheduled price lists."
        buttonLabel="Create Price List"
        onClick={onCreate}
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {priceLists.map((list) => (
          <article
            key={list.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Tags size={22} />
              </div>
              <PriceStatusBadge status={list.status} />
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-950">{list.name}</h2>
            <p className="mt-1 text-xs text-slate-500">{list.channel}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Products" value={String(list.products)} />
              <InfoRow label="Currency" value={list.currency} />
              <InfoRow label="Valid From" value={list.validFrom} />
              <InfoRow label="Valid To" value={list.validTo} />
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Open Price List
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProductPricingWorkspace({
  products,
  search,
  setSearch,
}: {
  products: ProductPrice[];
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Product Pricing Register"
        description="Review and update product prices, compare-at prices, cost and margin."
        buttonLabel="Bulk Price Update"
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product, SKU, category or channel..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")}>
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600"
          >
            <Filter size={17} />
            Filters
          </button>

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600"
          >
            <Download size={17} />
            Export
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">SKU</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Channel</th>
                <th className="px-5 py-4">Cost</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Compare At</th>
                <th className="px-5 py-4">Margin</th>
                <th className="px-5 py-4">Updated</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-slate-900">{item.product}</td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-600">{item.sku}</td>
                  <td className="px-5 py-4 text-slate-600">{item.category}</td>
                  <td className="px-5 py-4 text-slate-600">{item.channel}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{formatCurrency(item.cost)}</td>
                  <td className="px-5 py-4 font-bold text-blue-600">{formatCurrency(item.price)}</td>
                  <td className="px-5 py-4 text-slate-600">{formatCurrency(item.compareAt)}</td>
                  <td className="px-5 py-4">
                    <MarginBadge health={item.health} margin={item.margin} />
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">{item.lastUpdated}</td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-xs font-bold text-blue-600">
                      Edit Price
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function CostManagementWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Cost Management"
        description="Manage landed cost, procurement cost, fulfilment cost and total product cost."
        buttonLabel="Update Cost"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Average Unit Cost" value="₹5,680" note="Across catalogue" icon={Calculator} tone="blue" />
        <MetricCard title="Landed Cost Increase" value="3.8%" note="Current quarter" icon={TrendingUp} tone="orange" />
        <MetricCard title="Cost Reviews Due" value="12" note="Within 30 days" icon={RefreshCcw} tone="violet" />
        <MetricCard title="Cost Savings" value="₹2.14L" note="Current quarter" icon={IndianRupee} tone="green" />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Procurement Cost", "Supplier price, freight and duties", "₹42.8L"],
          ["Fulfilment Cost", "Packaging, handling and warehouse", "₹6.4L"],
          ["Shipping Cost", "Courier and delivery allocation", "₹4.8L"],
          ["Returns Cost", "Reverse logistics and inspection", "₹1.6L"],
        ].map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <CircleDollarSign size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{item[1]}</p>
            <p className="mt-5 text-2xl font-black text-slate-950">{item[2]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function MarginsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Margin Management"
        description="Monitor gross margin, contribution margin and low-margin product alerts."
        buttonLabel="Set Margin Threshold"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Average Gross Margin" value="57.8%" note="Across catalogue" icon={TrendingUp} tone="green" />
        <MetricCard title="Contribution Margin" value="42.6%" note="After fulfilment and marketing" icon={Percent} tone="blue" />
        <MetricCard title="Low Margin Products" value="2" note="Below 50%" icon={TrendingDown} tone="orange" />
        <MetricCard title="Critical Margin" value="1" note="Below 45%" icon={AlertTriangle} tone="violet" />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {productPrices.map((item) => (
          <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Percent size={22} />
              </div>
              <MarginBadge health={item.health} margin={item.margin} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item.product}</h3>
            <p className="mt-1 text-xs text-slate-500">{item.sku}</p>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Cost" value={formatCurrency(item.cost)} />
              <InfoRow label="Selling Price" value={formatCurrency(item.price)} />
              <InfoRow label="Gross Profit" value={formatCurrency(item.price - item.cost)} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function PricingRulesWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Pricing Rules"
        description="Create automated rules for discounts, margin protection and dynamic pricing."
        buttonLabel="Create Rule"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pricingRules.map((rule) => (
          <article key={rule.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Layers3 size={22} />
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                rule.status === "Active"
                  ? "bg-green-50 text-green-700"
                  : "bg-slate-100 text-slate-700"
              }`}>
                {rule.status}
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
              Priority {rule.priority}
            </p>
            <h3 className="mt-2 text-base font-black text-slate-900">{rule.name}</h3>
            <p className="mt-2 text-xs text-slate-500">{rule.scope}</p>

            <div className="mt-5 space-y-3">
              <InfoBox label="Condition" value={rule.condition} />
              <InfoBox label="Action" value={rule.action} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function PriceHistoryWorkspace() {
  const history = [
    ["26 Jul 2026, 12:45 AM", "KRVE Noir Blazer", "₹18,499", "₹18,999", "Founder Office"],
    ["25 Jul 2026, 10:55 PM", "KRVE Icon Sneakers", "₹7,999", "₹6,499", "Commerce Manager"],
    ["25 Jul 2026, 09:20 PM", "Signature Leather Wallet", "₹3,299", "₹3,499", "Marketplace Sync"],
    ["25 Jul 2026, 07:30 PM", "Obsidian Oxford Shoes", "₹8,499", "₹8,999", "Pricing Team"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Price History"
        description="Review every price change with previous value, new value, source and timestamp."
        buttonLabel="Export History"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Previous Price</th>
                <th className="px-5 py-4">New Price</th>
                <th className="px-5 py-4">Changed By</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={`${item[0]}-${item[1]}`} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 text-xs text-slate-500">{item[0]}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{item[1]}</td>
                  <td className="px-5 py-4 text-slate-600">{item[2]}</td>
                  <td className="px-5 py-4 font-bold text-blue-600">{item[3]}</td>
                  <td className="px-5 py-4 text-slate-600">{item[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ApprovalsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Pricing Approvals"
        description="Review, approve or reject price changes affecting margin and revenue."
        buttonLabel="Create Approval Request"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {approvals.map((approval) => (
          <article key={approval.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600">
                <ShieldCheck size={22} />
              </div>
              <ApprovalBadge status={approval.status} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-violet-600">
              {approval.id}
            </p>
            <h3 className="mt-2 text-lg font-black text-slate-950">{approval.title}</h3>
            <p className="mt-2 text-xs text-slate-500">
              {approval.requestedBy} · {approval.affectedProducts} products
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <InfoBox label="Current" value={formatCurrency(approval.currentValue)} />
              <InfoBox label="Proposed" value={formatCurrency(approval.proposedValue)} />
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-600">{approval.impact}</p>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              Review Approval
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function AnalyticsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Pricing Analytics"
        description="Analyse price movement, margin, revenue impact, discounting and channel performance."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Average Selling Price" value="₹14,286" note="Across active catalogue" icon={IndianRupee} tone="blue" />
        <MetricCard title="Price Increase Impact" value="+₹2.8L" note="Forecast monthly revenue" icon={TrendingUp} tone="green" />
        <MetricCard title="Discount Leakage" value="₹42,600" note="Current month" icon={TrendingDown} tone="orange" />
        <MetricCard title="Approval Compliance" value="98.4%" note="Price changes with approval" icon={CheckCircle2} tone="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Average Selling Price Trend"
          values={[52, 58, 61, 64, 67, 72, 76]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
        />
        <ChartCard
          title="Category Margin"
          values={[62, 56, 58, 49, 44]}
          labels={["Blazers", "Shoes", "Suits", "Sneakers", "Wallets"]}
        />
      </section>
    </div>
  );
}

function ChartCard({
  title,
  values,
  labels,
}: {
  title: string;
  values: number[];
  labels: string[];
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">{title}</h2>
      <div className="mt-8 flex h-64 items-end gap-4">
        {values.map((value, index) => (
          <div key={`${labels[index]}-${value}`} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-52 w-full items-end rounded-xl bg-slate-50 p-1">
              <div
                className="w-full rounded-lg bg-blue-600"
                style={{ height: `${Math.max(8, value)}%` }}
              />
            </div>
            <span className="text-xs text-slate-500">{labels[index]}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ReportsWorkspace() {
  const reports = [
    ["Price List Report", "Channel, validity, products and status"],
    ["Product Pricing Report", "Cost, price, compare-at and margin"],
    ["Margin Report", "Gross and contribution margin by product"],
    ["Price Change Report", "Previous value, new value and approval"],
    ["Pricing Rule Report", "Rules, conditions, actions and status"],
    ["Pricing Analytics Report", "Revenue, conversion and margin impact"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Pricing Reports"
        description="Generate and export price, cost, margin, history and approval reports."
        buttonLabel="Create Custom Report"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <article key={report[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <FileBarChart size={22} />
            </div>
            <h3 className="mt-5 text-base font-black text-slate-900">{report[0]}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{report[1]}</p>
            <button type="button" className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
              Generate Report
              <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function SettingsWorkspace() {
  const settings = [
    ["Currency & Rounding", "Configure currency, decimal and rounding behaviour."],
    ["Margin Thresholds", "Set minimum gross and contribution margin levels."],
    ["Approval Rules", "Configure price-change approval limits by role."],
    ["Channel Pricing", "Set website, app, marketplace and offline pricing rules."],
    ["Dynamic Pricing", "Configure inventory, demand and customer pricing signals."],
    ["Audit & History", "Set price history retention and change logging."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Pricing Settings"
        description="Configure currencies, thresholds, approvals, channels and dynamic pricing rules."
        buttonLabel="Save Configuration"
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {settings.map((setting) => (
          <article key={setting[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Settings2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">{setting[0]}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{setting[1]}</p>
                <button type="button" className="mt-4 text-xs font-bold text-blue-600">
                  Configure
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function CreatePriceListPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-slate-950/50 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close panel"
      />

      <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
              Commercial Controls
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Create Price List
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Create a new channel, customer or scheduled price list.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <FormField label="Price List Name" placeholder="KRVE Premium Retail" />
          <FormField label="Channel" placeholder="Website / App / Marketplace" />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Currency" placeholder="INR" />
            <FormField label="Customer Group" placeholder="All Customers" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Valid From" placeholder="1 Aug 2026" />
            <FormField label="Valid To" placeholder="31 Dec 2026" />
          </div>
          <FormField label="Pricing Method" placeholder="Fixed / Markup / Discount" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Price List
          </button>
        </form>
      </aside>
    </div>
  );
}

function FormField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <input
        required
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function WorkspaceHeader({
  title,
  description,
  buttonLabel,
  onClick,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  onClick?: () => void;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={onClick}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <span className="block text-[10px] uppercase tracking-wider text-slate-400">{label}</span>
      <strong className="mt-1 block text-xs text-slate-800">{value}</strong>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <strong className="text-right text-slate-800">{value}</strong>
    </div>
  );
}

function PriceStatusBadge({
  status,
}: {
  status: PriceStatus;
}) {
  const className =
    status === "Active"
      ? "bg-green-50 text-green-700"
      : status === "Scheduled"
        ? "bg-blue-50 text-blue-700"
        : status === "Expired"
          ? "bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function ApprovalBadge({
  status,
}: {
  status: ApprovalStatus;
}) {
  const className =
    status === "Approved"
      ? "bg-green-50 text-green-700"
      : status === "Rejected"
        ? "bg-red-50 text-red-700"
        : "bg-orange-50 text-orange-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

function MarginBadge({
  health,
  margin,
}: {
  health: MarginHealth;
  margin: number;
}) {
  const className =
    health === "Healthy"
      ? "bg-green-50 text-green-700"
      : health === "Low"
        ? "bg-orange-50 text-orange-700"
        : "bg-red-50 text-red-700";

  return (
    <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${className}`}>
      {margin.toFixed(1)}%
    </span>
  );
}