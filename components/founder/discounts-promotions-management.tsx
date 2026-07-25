"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgePercent,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileBarChart,
  Filter,
  Gift,
  History,
  IndianRupee,
  Layers3,
  Package,
  Percent,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Tags,
  TicketPercent,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type PromotionTab =
  | "dashboard"
  | "coupons"
  | "offers"
  | "campaigns"
  | "bundles"
  | "automatic-discounts"
  | "audiences"
  | "budget"
  | "history"
  | "analytics"
  | "reports"
  | "settings";

type PromotionStatus = "Active" | "Draft" | "Scheduled" | "Expired" | "Paused";
type DiscountType = "Percentage" | "Fixed Amount" | "Free Shipping" | "Buy X Get Y";

type Coupon = {
  id: string;
  code: string;
  name: string;
  type: DiscountType;
  value: string;
  uses: number;
  usageLimit: number;
  revenue: number;
  validFrom: string;
  validTo: string;
  status: PromotionStatus;
};

type Offer = {
  id: string;
  name: string;
  scope: string;
  discount: string;
  audience: string;
  budget: number;
  revenue: number;
  startDate: string;
  endDate: string;
  status: PromotionStatus;
};

type Campaign = {
  id: string;
  name: string;
  channel: string;
  audience: string;
  spend: number;
  revenue: number;
  conversions: number;
  status: PromotionStatus;
};

const tabs: Array<{
  id: PromotionTab;
  label: string;
  icon: IconType;
}> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "coupons", label: "Coupons", icon: TicketPercent },
  { id: "offers", label: "Offers", icon: BadgePercent },
  { id: "campaigns", label: "Campaigns", icon: TrendingUp },
  { id: "bundles", label: "Bundles", icon: Package },
  { id: "automatic-discounts", label: "Automatic Discounts", icon: Sparkles },
  { id: "audiences", label: "Audiences", icon: Users },
  { id: "budget", label: "Budget Control", icon: IndianRupee },
  { id: "history", label: "History", icon: History },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const coupons: Coupon[] = [
  {
    id: "CPN-001",
    code: "KRVE10",
    name: "New Customer Welcome",
    type: "Percentage",
    value: "10%",
    uses: 186,
    usageLimit: 500,
    revenue: 284600,
    validFrom: "1 Jul 2026",
    validTo: "31 Aug 2026",
    status: "Active",
  },
  {
    id: "CPN-002",
    code: "NOIR1500",
    name: "Noir Collection Offer",
    type: "Fixed Amount",
    value: "₹1,500",
    uses: 92,
    usageLimit: 200,
    revenue: 418200,
    validFrom: "15 Jul 2026",
    validTo: "31 Jul 2026",
    status: "Active",
  },
  {
    id: "CPN-003",
    code: "APPONLY",
    name: "Mobile App Exclusive",
    type: "Percentage",
    value: "12%",
    uses: 142,
    usageLimit: 300,
    revenue: 326400,
    validFrom: "20 Jul 2026",
    validTo: "20 Aug 2026",
    status: "Active",
  },
  {
    id: "CPN-004",
    code: "FREESHIP",
    name: "Free Shipping Weekend",
    type: "Free Shipping",
    value: "₹0 Shipping",
    uses: 66,
    usageLimit: 250,
    revenue: 198600,
    validFrom: "27 Jul 2026",
    validTo: "28 Jul 2026",
    status: "Scheduled",
  },
];

const offers: Offer[] = [
  {
    id: "OFF-001",
    name: "Midnight Luxury Sale",
    scope: "Selected Premium Products",
    discount: "Up to 20%",
    audience: "All Customers",
    budget: 180000,
    revenue: 684000,
    startDate: "24 Jul 2026",
    endDate: "31 Jul 2026",
    status: "Active",
  },
  {
    id: "OFF-002",
    name: "VIP Private Preview",
    scope: "Noir Collection",
    discount: "15%",
    audience: "Gold & Platinum Members",
    budget: 90000,
    revenue: 426000,
    startDate: "26 Jul 2026",
    endDate: "2 Aug 2026",
    status: "Active",
  },
  {
    id: "OFF-003",
    name: "End of Season Clearance",
    scope: "Overstocked Products",
    discount: "10%–35%",
    audience: "All Customers",
    budget: 260000,
    revenue: 0,
    startDate: "5 Aug 2026",
    endDate: "20 Aug 2026",
    status: "Scheduled",
  },
];

const campaigns: Campaign[] = [
  {
    id: "CMP-001",
    name: "Noir Collection Launch",
    channel: "Instagram + Meta Ads",
    audience: "Luxury Menswear Buyers",
    spend: 124000,
    revenue: 768000,
    conversions: 186,
    status: "Active",
  },
  {
    id: "CMP-002",
    name: "App Install Promotion",
    channel: "Google + Instagram",
    audience: "Mobile Shoppers",
    spend: 86000,
    revenue: 342000,
    conversions: 412,
    status: "Active",
  },
  {
    id: "CMP-003",
    name: "VIP Reactivation",
    channel: "Email + WhatsApp",
    audience: "Inactive VIP Customers",
    spend: 18000,
    revenue: 156000,
    conversions: 42,
    status: "Active",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DiscountsPromotionsManagement() {
  const [activeTab, setActiveTab] = useState<PromotionTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const filteredCoupons = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return coupons;
    }

    return coupons.filter((coupon) =>
      `${coupon.code} ${coupon.name} ${coupon.type} ${coupon.status}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <PromotionHeader
        onCreate={() => setShowCreatePanel(true)}
        onOpenTab={setActiveTab}
      />

      <PromotionTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && (
        <DashboardWorkspace onOpenTab={setActiveTab} />
      )}

      {activeTab === "coupons" && (
        <CouponsWorkspace
          coupons={filteredCoupons}
          search={search}
          setSearch={setSearch}
          onCreate={() => setShowCreatePanel(true)}
        />
      )}

      {activeTab === "offers" && <OffersWorkspace />}

      {activeTab === "campaigns" && <CampaignsWorkspace />}

      {activeTab === "bundles" && <BundlesWorkspace />}

      {activeTab === "automatic-discounts" && <AutomaticDiscountsWorkspace />}

      {activeTab === "audiences" && <AudiencesWorkspace />}

      {activeTab === "budget" && <BudgetWorkspace />}

      {activeTab === "history" && <HistoryWorkspace />}

      {activeTab === "analytics" && <AnalyticsWorkspace />}

      {activeTab === "reports" && <ReportsWorkspace />}

      {activeTab === "settings" && <SettingsWorkspace />}

      {showCreatePanel && (
        <CreateCouponPanel onClose={() => setShowCreatePanel(false)} />
      )}
    </div>
  );
}

function PromotionHeader({
  onCreate,
  onOpenTab,
}: {
  onCreate: () => void;
  onOpenTab: (tab: PromotionTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-950 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <BadgePercent size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Growth & Promotions
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Discounts & Promotions Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Create coupons, offers, bundles, automatic discounts, campaign
            rules, audience targeting and budget controls while protecting
            contribution margin.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("offers")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <Gift size={17} />
            Launch Offer
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={17} />
            Create Coupon
          </button>
        </div>
      </div>
    </section>
  );
}

function PromotionTabBar({
  activeTab,
  onChange,
}: {
  activeTab: PromotionTab;
  onChange: (tab: PromotionTab) => void;
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
  onOpenTab: (tab: PromotionTab) => void;
}) {
  const couponRevenue = coupons.reduce((sum, item) => sum + item.revenue, 0);
  const totalUses = coupons.reduce((sum, item) => sum + item.uses, 0);

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Active Offers"
          value="9"
          note="Currently live"
          icon={BadgePercent}
          tone="blue"
        />
        <MetricCard
          title="Coupon Uses"
          value={String(totalUses)}
          note="Current campaign cycle"
          icon={TicketPercent}
          tone="green"
        />
        <MetricCard
          title="Discount Revenue"
          value={formatCurrency(couponRevenue)}
          note="Attributed sales"
          icon={IndianRupee}
          tone="violet"
        />
        <MetricCard
          title="Expiring Soon"
          value="3"
          note="Within 7 days"
          icon={AlertTriangle}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Active Coupons
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Usage, revenue and validity performance
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("coupons")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Manage Coupons
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {coupons.map((coupon) => (
              <CouponListRow key={coupon.id} coupon={coupon} />
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
            KRVE AI Promotion Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI monitors campaign performance, coupon misuse, margin
            impact, audience response and revenue attribution.
          </p>

          <div className="mt-6 space-y-3">
            <InsightCard
              title="Best-performing promotion"
              detail="NOIR1500 is generating the highest revenue per redemption."
              tone="green"
            />
            <InsightCard
              title="Budget warning"
              detail="The Midnight Luxury Sale has consumed 86% of its approved budget."
              tone="orange"
            />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Promotion Intelligence
            <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Live Offers
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Offer performance and budget status
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenTab("offers")}
              className="text-sm font-bold text-blue-600"
            >
              Open Offers
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {offers.map((offer) => (
              <OfferListRow key={offer.id} offer={offer} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Quick Promotion Operations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start daily growth and promotion workflows
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction
              title="Create Coupon"
              description="Create customer or channel coupon codes"
              icon={TicketPercent}
              onClick={() => onOpenTab("coupons")}
            />
            <QuickAction
              title="Launch Offer"
              description="Create a time-bound promotional offer"
              icon={Gift}
              onClick={() => onOpenTab("offers")}
            />
            <QuickAction
              title="Create Bundle"
              description="Combine products into promotional bundles"
              icon={Package}
              onClick={() => onOpenTab("bundles")}
            />
            <QuickAction
              title="Build Audience"
              description="Target customer segments and loyalty tiers"
              icon={Users}
              onClick={() => onOpenTab("audiences")}
            />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Campaign Performance
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Spend, revenue and conversion summary
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("campaigns")}
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Manage Campaigns
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
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

function CouponListRow({
  coupon,
}: {
  coupon: Coupon;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <TicketPercent size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {coupon.code} · {coupon.name}
          </strong>
          <span className="text-xs text-slate-400">{coupon.validTo}</span>
        </div>

        <p className="mt-1 truncate text-xs text-slate-500">
          {coupon.value} · {coupon.uses}/{coupon.usageLimit} uses · {formatCurrency(coupon.revenue)}
        </p>
      </div>

      <PromotionStatusBadge status={coupon.status} />
    </div>
  );
}

function OfferListRow({
  offer,
}: {
  offer: Offer;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Gift size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">
          {offer.name}
        </strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {offer.discount} · {offer.audience} · Revenue {formatCurrency(offer.revenue)}
        </p>
      </div>

      <PromotionStatusBadge status={offer.status} />
    </div>
  );
}

function CampaignCard({
  campaign,
}: {
  campaign: Campaign;
}) {
  const roas = campaign.spend > 0 ? campaign.revenue / campaign.spend : 0;

  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <TrendingUp size={19} />
        </div>
        <PromotionStatusBadge status={campaign.status} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">
        {campaign.name}
      </h3>

      <p className="mt-1 text-xs text-slate-500">{campaign.channel}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <InfoBox label="Spend" value={formatCurrency(campaign.spend)} />
        <InfoBox label="Revenue" value={formatCurrency(campaign.revenue)} />
        <InfoBox label="ROAS" value={`${roas.toFixed(1)}x`} />
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

function CouponsWorkspace({
  coupons,
  search,
  setSearch,
  onCreate,
}: {
  coupons: Coupon[];
  search: string;
  setSearch: (value: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Coupon Management"
        description="Create, search, monitor and control customer coupon codes."
        buttonLabel="Create Coupon"
        onClick={onCreate}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search coupon code, offer name or status..."
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
          <table className="w-full min-w-[1150px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Coupon</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Value</th>
                <th className="px-5 py-4">Uses</th>
                <th className="px-5 py-4">Revenue</th>
                <th className="px-5 py-4">Valid From</th>
                <th className="px-5 py-4">Valid To</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 font-bold text-blue-600">{coupon.code}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{coupon.name}</td>
                  <td className="px-5 py-4 text-slate-600">{coupon.type}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{coupon.value}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {coupon.uses}/{coupon.usageLimit}
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {formatCurrency(coupon.revenue)}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{coupon.validFrom}</td>
                  <td className="px-5 py-4 text-slate-600">{coupon.validTo}</td>
                  <td className="px-5 py-4">
                    <PromotionStatusBadge status={coupon.status} />
                  </td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-xs font-bold text-blue-600">
                      Edit Coupon
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

function OffersWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Promotional Offers"
        description="Create and manage time-bound offers with margin and budget controls."
        buttonLabel="Launch Offer"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => {
          const roi =
            offer.budget > 0 ? ((offer.revenue - offer.budget) / offer.budget) * 100 : 0;

          return (
            <article
              key={offer.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Gift size={22} />
                </div>
                <PromotionStatusBadge status={offer.status} />
              </div>

              <h2 className="mt-5 text-lg font-black text-slate-950">
                {offer.name}
              </h2>

              <p className="mt-1 text-xs text-slate-500">{offer.scope}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoBox label="Discount" value={offer.discount} />
                <InfoBox label="Audience" value={offer.audience} />
                <InfoBox label="Budget" value={formatCurrency(offer.budget)} />
                <InfoBox label="ROI" value={`${roi.toFixed(0)}%`} />
              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"
              >
                Open Offer
                <ArrowRight size={16} />
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function CampaignsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Promotion Campaigns"
        description="Plan campaign budgets, channels, audiences, conversions and attributed revenue."
        buttonLabel="Create Campaign"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaign) => {
          const roas = campaign.spend > 0 ? campaign.revenue / campaign.spend : 0;

          return (
            <article
              key={campaign.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600">
                  <TrendingUp size={22} />
                </div>
                <PromotionStatusBadge status={campaign.status} />
              </div>

              <h2 className="mt-5 text-lg font-black text-slate-950">
                {campaign.name}
              </h2>

              <p className="mt-1 text-xs text-slate-500">{campaign.channel}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoBox label="Audience" value={campaign.audience} />
                <InfoBox label="Conversions" value={String(campaign.conversions)} />
                <InfoBox label="Spend" value={formatCurrency(campaign.spend)} />
                <InfoBox label="ROAS" value={`${roas.toFixed(1)}x`} />
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function BundlesWorkspace() {
  const bundles = [
    ["Executive Suit Set", "Blazer + Trousers + Shirt", "₹29,999", "₹34,997", "42 sold"],
    ["Noir Essentials", "Blazer + Belt + Wallet", "₹24,999", "₹28,497", "28 sold"],
    ["Weekend Premium", "Polo + Sneakers + Wallet", "₹12,999", "₹14,497", "66 sold"],
    ["Formal Footwear Duo", "Oxford Shoes + Leather Belt", "₹10,499", "₹11,998", "31 sold"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Product Bundles"
        description="Create product bundles with controlled pricing and margin protection."
        buttonLabel="Create Bundle"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {bundles.map((bundle) => (
          <article
            key={bundle[0]}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Package size={22} />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{bundle[0]}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{bundle[1]}</p>

            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Bundle Price" value={bundle[2]} />
              <InfoRow label="Regular Price" value={bundle[3]} />
              <InfoRow label="Performance" value={bundle[4]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function AutomaticDiscountsWorkspace() {
  const rules = [
    ["Cart Value Discount", "Cart above ₹15,000", "Apply 8%", "Active"],
    ["VIP Loyalty Discount", "Gold or Platinum tier", "Apply 5%", "Active"],
    ["Overstock Markdown", "Stock above maximum level", "Apply 10%–20%", "Active"],
    ["Weekend App Offer", "Mobile app orders on weekend", "Apply 7%", "Paused"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Automatic Discounts"
        description="Create rule-based discounts triggered by cart, customer, channel or inventory conditions."
        buttonLabel="Create Automatic Rule"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {rules.map((rule) => (
          <article
            key={rule[0]}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600">
              <Sparkles size={22} />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{rule[0]}</h3>

            <div className="mt-5 space-y-3">
              <InfoBox label="Condition" value={rule[1]} />
              <InfoBox label="Action" value={rule[2]} />
            </div>

            <span
              className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                rule[3] === "Active"
                  ? "bg-green-50 text-green-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {rule[3]}
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}

function AudiencesWorkspace() {
  const audiences = [
    ["All Customers", "4,294", "Complete active customer base"],
    ["VIP Customers", "486", "Gold and Platinum loyalty tiers"],
    ["Inactive Customers", "812", "No purchase in last 90 days"],
    ["High-Intent Visitors", "1,286", "Product or cart activity in last 14 days"],
    ["App Customers", "1,942", "Customers with KRVE mobile app"],
    ["First-Time Buyers", "624", "One completed order"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Promotion Audiences"
        description="Build and manage customer segments for targeted promotions."
        buttonLabel="Create Audience"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {audiences.map((audience) => (
          <article
            key={audience[0]}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Users size={22} />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-900">{audience[0]}</h3>
            <p className="mt-2 text-3xl font-black text-slate-950">{audience[1]}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{audience[2]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function BudgetWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Promotion Budget Control"
        description="Monitor approved budget, spend, committed value and return on promotion investment."
        buttonLabel="Create Budget"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Approved Budget" value="₹8.4L" note="Current month" icon={IndianRupee} tone="blue" />
        <MetricCard title="Spent" value="₹5.2L" note="61.9% utilised" icon={Activity} tone="orange" />
        <MetricCard title="Attributed Revenue" value="₹28.4L" note="Across active promotions" icon={TrendingUp} tone="green" />
        <MetricCard title="Promotion ROAS" value="5.5x" note="Current month" icon={Percent} tone="violet" />
      </section>
    </div>
  );
}

function HistoryWorkspace() {
  const history = [
    ["26 Jul 2026, 12:42 AM", "Coupon Created", "KRVE10", "Commerce Manager"],
    ["25 Jul 2026, 11:18 PM", "Offer Updated", "Midnight Luxury Sale", "Founder Office"],
    ["25 Jul 2026, 09:44 PM", "Budget Increased", "Noir Collection Launch", "Finance Team"],
    ["25 Jul 2026, 08:10 PM", "Campaign Paused", "Weekend App Offer", "Marketing Manager"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Promotion History"
        description="Review coupon, offer, campaign, budget and rule changes."
        buttonLabel="Export History"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Action</th>
                <th className="px-5 py-4">Record</th>
                <th className="px-5 py-4">Changed By</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={`${item[0]}-${item[1]}`} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4 text-xs text-slate-500">{item[0]}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{item[1]}</td>
                  <td className="px-5 py-4 text-slate-600">{item[2]}</td>
                  <td className="px-5 py-4 text-slate-600">{item[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AnalyticsWorkspace() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Promotion Analytics"
        description="Analyse coupon usage, campaign ROAS, revenue attribution and margin impact."
        buttonLabel="Export Analytics"
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Attributed Revenue" value="₹28.4L" note="Current month" icon={IndianRupee} tone="blue" />
        <MetricCard title="Average ROAS" value="5.5x" note="Across active campaigns" icon={TrendingUp} tone="green" />
        <MetricCard title="Redemption Rate" value="18.6%" note="Coupon performance" icon={TicketPercent} tone="violet" />
        <MetricCard title="Margin Impact" value="-4.2%" note="Average discount effect" icon={Percent} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Weekly Coupon Redemptions"
          values={[42, 58, 64, 72, 88, 96, 104]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
        <ChartCard
          title="Campaign ROAS"
          values={campaigns.map((campaign) =>
            Math.min(100, Math.round((campaign.revenue / campaign.spend) * 12)),
          )}
          labels={campaigns.map((campaign) => campaign.name.split(" ")[0])}
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
    ["Coupon Performance Report", "Usage, revenue, limits and expiry"],
    ["Offer Performance Report", "Budget, revenue, ROI and audience"],
    ["Campaign Report", "Spend, conversions, revenue and ROAS"],
    ["Bundle Performance Report", "Bundle sales, discounts and margin"],
    ["Audience Report", "Segments, reach and response"],
    ["Promotion Budget Report", "Approved, spent, committed and ROI"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Promotion Reports"
        description="Generate and export coupon, offer, campaign, audience and budget reports."
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
    ["Coupon Rules", "Configure code format, limits, stacking and eligibility."],
    ["Margin Protection", "Set minimum margin and discount approval thresholds."],
    ["Audience Eligibility", "Control customer, channel and loyalty eligibility."],
    ["Campaign Budget", "Set budget limits, alerts and approval requirements."],
    ["Promotion Calendar", "Configure campaign dates, conflicts and blackout periods."],
    ["Fraud Protection", "Detect coupon abuse, duplicate use and suspicious activity."],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader
        title="Discounts & Promotions Settings"
        description="Configure coupon, offer, margin, audience, budget and fraud-protection rules."
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

function CreateCouponPanel({
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
              Growth & Promotions
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Create Coupon
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Create a new coupon with eligibility, usage and budget controls.
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
          <FormField label="Coupon Code" placeholder="KRVE20" />
          <FormField label="Coupon Name" placeholder="Luxury Weekend Offer" />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Discount Type" placeholder="Percentage / Fixed" />
            <FormField label="Discount Value" placeholder="10%" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Usage Limit" placeholder="500" />
            <FormField label="Minimum Order" placeholder="₹5,000" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Valid From" placeholder="1 Aug 2026" />
            <FormField label="Valid To" placeholder="31 Aug 2026" />
          </div>
          <FormField label="Audience" placeholder="All Customers / VIP / App Users" />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Coupon
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

function PromotionStatusBadge({
  status,
}: {
  status: PromotionStatus;
}) {
  const className =
    status === "Active"
      ? "bg-green-50 text-green-700"
      : status === "Scheduled"
        ? "bg-blue-50 text-blue-700"
        : status === "Expired"
          ? "bg-red-50 text-red-700"
          : status === "Paused"
            ? "bg-orange-50 text-orange-700"
            : "bg-slate-100 text-slate-700";

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}