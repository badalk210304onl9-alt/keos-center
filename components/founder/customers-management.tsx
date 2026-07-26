"use client";

import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Download,
  FileBarChart,
  Filter,
  Gift,
  History,
  IndianRupee,
  Mail,
  MapPin,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tags,
  UserRound,
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

type CustomerTab =
  | "dashboard"
  | "directory"
  | "segments"
  | "loyalty"
  | "wallets"
  | "addresses"
  | "purchase-history"
  | "communications"
  | "verification"
  | "analytics"
  | "reports"
  | "settings";

type CustomerStatus = "Active" | "Inactive" | "VIP" | "Blocked";
type VerificationStatus = "Verified" | "Pending" | "Rejected";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  segment: string;
  orders: number;
  spend: number;
  wallet: number;
  loyaltyPoints: number;
  lastOrder: string;
  status: CustomerStatus;
  verification: VerificationStatus;
};

type Segment = {
  id: string;
  name: string;
  customers: number;
  rule: string;
  revenue: number;
  status: "Active" | "Draft";
};

const tabs: Array<{ id: CustomerTab; label: string; icon: IconType }> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "directory", label: "Customer Directory", icon: Users },
  { id: "segments", label: "Segments", icon: Tags },
  { id: "loyalty", label: "Loyalty", icon: Gift },
  { id: "wallets", label: "Wallets", icon: WalletCards },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "purchase-history", label: "Purchase History", icon: History },
  { id: "communications", label: "Communications", icon: Mail },
  { id: "verification", label: "Verification", icon: ShieldCheck },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const customers: Customer[] = [
  {
    id: "CUS-1001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    city: "Varanasi",
    segment: "VIP",
    orders: 18,
    spend: 186400,
    wallet: 4200,
    loyaltyPoints: 8240,
    lastOrder: "25 Jul 2026",
    status: "VIP",
    verification: "Verified",
  },
  {
    id: "CUS-1002",
    name: "Ananya Singh",
    email: "ananya@example.com",
    phone: "+91 98111 22334",
    city: "New Delhi",
    segment: "Repeat Customer",
    orders: 11,
    spend: 98400,
    wallet: 1800,
    loyaltyPoints: 4860,
    lastOrder: "24 Jul 2026",
    status: "Active",
    verification: "Verified",
  },
  {
    id: "CUS-1003",
    name: "Rohan Verma",
    email: "rohan@example.com",
    phone: "+91 98989 11882",
    city: "Mumbai",
    segment: "New Customer",
    orders: 2,
    spend: 18499,
    wallet: 0,
    loyaltyPoints: 520,
    lastOrder: "22 Jul 2026",
    status: "Active",
    verification: "Pending",
  },
  {
    id: "CUS-1004",
    name: "Priya Mehta",
    email: "priya@example.com",
    phone: "+91 98222 77119",
    city: "Lucknow",
    segment: "VIP",
    orders: 24,
    spend: 248600,
    wallet: 8600,
    loyaltyPoints: 12480,
    lastOrder: "25 Jul 2026",
    status: "VIP",
    verification: "Verified",
  },
  {
    id: "CUS-1005",
    name: "Kabir Malhotra",
    email: "kabir@example.com",
    phone: "+91 97979 66554",
    city: "Jaipur",
    segment: "At Risk",
    orders: 4,
    spend: 32999,
    wallet: 600,
    loyaltyPoints: 1280,
    lastOrder: "12 Apr 2026",
    status: "Inactive",
    verification: "Verified",
  },
];

const segments: Segment[] = [
  {
    id: "SEG-001",
    name: "VIP Customers",
    customers: 286,
    rule: "Lifetime spend above ₹1,00,000",
    revenue: 684000,
    status: "Active",
  },
  {
    id: "SEG-002",
    name: "Repeat Customers",
    customers: 1842,
    rule: "3 or more completed orders",
    revenue: 842000,
    status: "Active",
  },
  {
    id: "SEG-003",
    name: "At-Risk Customers",
    customers: 412,
    rule: "No order in last 90 days",
    revenue: 0,
    status: "Active",
  },
  {
    id: "SEG-004",
    name: "High Intent",
    customers: 628,
    rule: "Cart or product activity in last 14 days",
    revenue: 0,
    status: "Draft",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CustomersManagement() {
  const [activeTab, setActiveTab] = useState<CustomerTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showAddPanel, setShowAddPanel] = useState(false);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;

    return customers.filter((customer) =>
      `${customer.id} ${customer.name} ${customer.email} ${customer.phone} ${customer.city} ${customer.segment}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <Header
        onAdd={() => setShowAddPanel(true)}
        onOpenTab={setActiveTab}
      />

      <TabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && <Dashboard onOpenTab={setActiveTab} />}
      {activeTab === "directory" && (
        <Directory
          customers={filteredCustomers}
          search={search}
          setSearch={setSearch}
          onAdd={() => setShowAddPanel(true)}
        />
      )}
      {activeTab === "segments" && <Segments />}
      {activeTab === "loyalty" && <Loyalty />}
      {activeTab === "wallets" && <Wallets />}
      {activeTab === "addresses" && <Addresses />}
      {activeTab === "purchase-history" && <PurchaseHistory />}
      {activeTab === "communications" && <Communications />}
      {activeTab === "verification" && <Verification />}
      {activeTab === "analytics" && <Analytics />}
      {activeTab === "reports" && <Reports />}
      {activeTab === "settings" && <Settings />}

      {showAddPanel && <AddCustomerPanel onClose={() => setShowAddPanel(false)} />}
    </div>
  );
}

function Header({
  onAdd,
  onOpenTab,
}: {
  onAdd: () => void;
  onOpenTab: (tab: CustomerTab) => void;
}) {
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
            Manage customer profiles, segmentation, loyalty, wallets, addresses,
            purchase history, verification and relationship intelligence.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("segments")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20"
          >
            <Tags size={17} />
            Create Segment
          </button>

          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
          >
            <Plus size={17} />
            Add Customer
          </button>
        </div>
      </div>
    </section>
  );
}

function TabBar({
  activeTab,
  onChange,
}: {
  activeTab: CustomerTab;
  onChange: (tab: CustomerTab) => void;
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

function Dashboard({
  onOpenTab,
}: {
  onOpenTab: (tab: CustomerTab) => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Customers" value="4,294" note="1,028 added this year" icon={Users} tone="blue" />
        <MetricCard title="Active Customers" value="3,516" note="Purchased in 90 days" icon={CheckCircle2} tone="green" />
        <MetricCard title="Loyalty Members" value="1,842" note="43% of customer base" icon={Gift} tone="violet" />
        <MetricCard title="Customer LTV" value="₹28,640" note="Average lifetime value" icon={IndianRupee} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-950">Customer Directory</h2>
              <p className="mt-1 text-sm text-slate-500">Recent customers and relationship value</p>
            </div>
            <button
              type="button"
              onClick={() => onOpenTab("directory")}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Open Directory <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {customers.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} />
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

          <h2 className="mt-6 text-xl font-black">KRVE AI Customer Intelligence</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI analyses customer value, churn risk, purchase frequency,
            loyalty behaviour and next-best actions.
          </p>

          <div className="mt-6 space-y-3">
            <Insight title="Growth opportunity" detail="86 high-value inactive customers could generate ₹3.8L through reactivation." tone="green" />
            <Insight title="Retention risk" detail="42 VIP customers have not purchased in the last 60 days." tone="orange" />
          </div>

          <button
            type="button"
            onClick={() => onOpenTab("analytics")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold hover:bg-blue-700"
          >
            Open Customer Intelligence <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">Customer Segments</h2>
              <p className="mt-1 text-sm text-slate-500">Active customer groups and value</p>
            </div>
            <button onClick={() => onOpenTab("segments")} className="text-sm font-bold text-blue-600">
              Manage Segments
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {segments.map((segment) => (
              <SegmentCard key={segment.id} segment={segment} />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">Quick Customer Operations</h2>
          <p className="mt-1 text-sm text-slate-500">Start daily CRM workflows</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction title="Add Customer" description="Create a new customer profile" icon={UserRound} onClick={() => onOpenTab("directory")} />
            <QuickAction title="Create Segment" description="Build a customer audience" icon={Tags} onClick={() => onOpenTab("segments")} />
            <QuickAction title="Manage Loyalty" description="Configure tiers and rewards" icon={Gift} onClick={() => onOpenTab("loyalty")} />
            <QuickAction title="Review Wallets" description="Manage credits and balances" icon={WalletCards} onClick={() => onOpenTab("wallets")} />
          </div>
        </article>
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
  const toneClass =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "violet"
        ? "bg-violet-50 text-violet-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${toneClass}`}>
        <Icon size={21} />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 hover:bg-slate-50">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <UserRound size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <strong className="block truncate text-sm text-slate-900">{customer.name}</strong>
        <p className="mt-1 truncate text-xs text-slate-500">
          {customer.segment} · {customer.orders} orders · {customer.city}
        </p>
      </div>
      <div className="text-right">
        <strong className="block text-sm text-slate-900">{formatCurrency(customer.spend)}</strong>
        <StatusBadge status={customer.status} />
      </div>
    </div>
  );
}

function SegmentCard({ segment }: { segment: Segment }) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Tags size={18} />
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
          segment.status === "Active" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-700"
        }`}>
          {segment.status}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">{segment.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{segment.rule}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <InfoBox label="Customers" value={String(segment.customers)} />
        <InfoBox label="Revenue" value={formatCurrency(segment.revenue)} />
      </div>
    </article>
  );
}

function Insight({
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
      <strong className={`text-xs ${tone === "green" ? "text-green-300" : "text-orange-300"}`}>
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
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-blue-300 hover:bg-blue-50/40"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <strong className="mt-4 block text-sm text-slate-900">{title}</strong>
      <span className="mt-2 block text-xs leading-5 text-slate-500">{description}</span>
      <span className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
        Open <ChevronRight size={14} />
      </span>
    </button>
  );
}

function Directory({
  customers,
  search,
  setSearch,
  onAdd,
}: {
  customers: Customer[];
  search: string;
  setSearch: (value: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title="Customer Directory" description="Search and manage complete customer records." buttonLabel="Add Customer" onClick={onAdd} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, phone, city or segment..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            {search && <button onClick={() => setSearch("")}><X size={15} /></button>}
          </div>
          <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600">
            <Filter size={17} /> Filters
          </button>
          <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600">
            <Download size={17} /> Export
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">City</th>
                <th className="px-5 py-4">Segment</th>
                <th className="px-5 py-4">Orders</th>
                <th className="px-5 py-4">Spend</th>
                <th className="px-5 py-4">Wallet</th>
                <th className="px-5 py-4">Points</th>
                <th className="px-5 py-4">Last Order</th>
                <th className="px-5 py-4">Verification</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-100 text-sm">
                  <td className="px-5 py-4">
                    <strong className="block text-slate-900">{customer.name}</strong>
                    <span className="text-xs text-blue-600">{customer.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="block text-slate-700">{customer.email}</span>
                    <span className="text-xs text-slate-500">{customer.phone}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{customer.city}</td>
                  <td className="px-5 py-4 text-slate-600">{customer.segment}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{customer.orders}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{formatCurrency(customer.spend)}</td>
                  <td className="px-5 py-4 text-slate-600">{formatCurrency(customer.wallet)}</td>
                  <td className="px-5 py-4 text-slate-600">{customer.loyaltyPoints}</td>
                  <td className="px-5 py-4 text-slate-600">{customer.lastOrder}</td>
                  <td className="px-5 py-4"><VerificationBadge status={customer.verification} /></td>
                  <td className="px-5 py-4"><StatusBadge status={customer.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Segments() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title="Customer Segments" description="Create dynamic customer audiences using behavioural and value rules." buttonLabel="Create Segment" />
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {segments.map((segment) => <SegmentCard key={segment.id} segment={segment} />)}
      </section>
    </div>
  );
}

function Loyalty() {
  const tiers = [
    ["Silver", "1,024 members", "1 point per ₹100", "₹5,000 annual spend"],
    ["Gold", "642 members", "1.5 points per ₹100", "₹25,000 annual spend"],
    ["Platinum", "176 members", "2 points per ₹100", "₹75,000 annual spend"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title="Loyalty Management" description="Manage tiers, points, rewards and member benefits." buttonLabel="Create Loyalty Rule" />
      <section className="grid gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600"><Gift size={22} /></div>
            <h3 className="mt-5 text-lg font-black text-slate-950">{tier[0]}</h3>
            <div className="mt-5 space-y-3 text-xs">
              <InfoRow label="Members" value={tier[1]} />
              <InfoRow label="Earning" value={tier[2]} />
              <InfoRow label="Qualification" value={tier[3]} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function Wallets() {
  return <SimpleCards title="Customer Wallets" description="Manage wallet balances, credits, debits and expiry." items={[
    ["Total Wallet Balance", "₹8.42L", "Across active customers"],
    ["Credits Issued", "₹2.18L", "Current month"],
    ["Credits Redeemed", "₹1.46L", "Current month"],
    ["Expiring Soon", "₹42,600", "Within 30 days"],
  ]} icon={WalletCards} />;
}

function Addresses() {
  return <SimpleCards title="Customer Addresses" description="Manage saved addresses, verification and serviceability." items={[
    ["Saved Addresses", "6,842", "Across all customers"],
    ["Verified", "6,248", "91.3% verified"],
    ["Incomplete", "184", "Require correction"],
    ["Unserviceable", "26", "Current courier network"],
  ]} icon={MapPin} />;
}

function PurchaseHistory() {
  return <SimpleCards title="Purchase History" description="Review customer orders, frequency, spend and product affinity." items={[
    ["Total Orders", "14,862", "Lifetime customer orders"],
    ["Repeat Rate", "42.9%", "Current customer base"],
    ["Average Frequency", "3.4", "Orders per active customer"],
    ["Average LTV", "₹28,640", "Lifetime value"],
  ]} icon={History} />;
}

function Communications() {
  return <SimpleCards title="Customer Communications" description="Manage email, phone and campaign communication history." items={[
    ["Emails Sent", "18,426", "Current month"],
    ["WhatsApp Sent", "6,842", "Current month"],
    ["Delivery Rate", "97.8%", "Across channels"],
    ["Unsubscribed", "84", "Current month"],
  ]} icon={Mail} />;
}

function Verification() {
  return <SimpleCards title="Customer Verification" description="Review profile, phone, email and risk verification." items={[
    ["Verified Customers", "3,986", "92.8% of customer base"],
    ["Pending Verification", "286", "Require follow-up"],
    ["Rejected", "22", "Failed verification"],
    ["High-Risk Accounts", "8", "Under review"],
  ]} icon={ShieldCheck} />;
}

function Analytics() {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title="Customer Analytics" description="Analyse acquisition, retention, value and churn." buttonLabel="Export Analytics" />
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Retention Rate" value="68.4%" note="Current year" icon={CheckCircle2} tone="green" />
        <MetricCard title="Repeat Rate" value="42.9%" note="Current customer base" icon={Users} tone="blue" />
        <MetricCard title="Average LTV" value="₹28,640" note="Lifetime value" icon={IndianRupee} tone="violet" />
        <MetricCard title="Churn Risk" value="9.6%" note="AI-estimated" icon={Activity} tone="orange" />
      </section>
    </div>
  );
}

function Reports() {
  const reports = [
    ["Customer Directory Report", "Profiles, contacts, segments and status"],
    ["Customer Value Report", "Orders, spend, AOV and lifetime value"],
    ["Loyalty Report", "Tiers, points, rewards and redemption"],
    ["Wallet Report", "Credits, debits, balances and expiry"],
    ["Retention Report", "Repeat rate, churn and reactivation"],
    ["Verification Report", "Verified, pending and high-risk accounts"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title="Customer Reports" description="Generate customer, loyalty, wallet and retention reports." buttonLabel="Create Custom Report" />
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <article key={report[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600"><FileBarChart size={22} /></div>
            <h3 className="mt-5 text-base font-black text-slate-900">{report[0]}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{report[1]}</p>
            <button className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
              Generate Report <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function Settings() {
  return <SimpleCards title="Customer Settings" description="Configure customer identity, loyalty, wallets, access and communication rules." items={[
    ["Customer Identity", "Configure profile fields and unique identifiers", "Open"],
    ["Loyalty Rules", "Configure tiers, points and rewards", "Open"],
    ["Wallet Controls", "Configure credits, expiry and usage", "Open"],
    ["Communication Preferences", "Configure consent and channel preferences", "Open"],
  ]} icon={Settings2} />;
}

function SimpleCards({
  title,
  description,
  items,
  icon: Icon,
}: {
  title: string;
  description: string;
  items: string[][];
  icon: IconType;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title={title} description={description} buttonLabel="Configure" />
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article key={item[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Icon size={22} /></div>
            <h3 className="mt-5 text-base font-black text-slate-900">{item[0]}</h3>
            <p className="mt-2 text-3xl font-black text-slate-950">{item[1]}</p>
            <p className="mt-2 text-xs text-slate-500">{item[2]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function AddCustomerPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-slate-950/50 backdrop-blur-sm">
      <button className="absolute inset-0" onClick={onClose} aria-label="Close panel" />
      <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Customer Operations</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Add Customer</h2>
            <p className="mt-2 text-sm text-slate-500">Create a new customer profile.</p>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200"><X size={18} /></button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); onClose(); }}>
          <FormField label="Full Name" placeholder="Customer name" />
          <FormField label="Email Address" placeholder="customer@example.com" />
          <FormField label="Phone Number" placeholder="+91..." />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="City" placeholder="Varanasi" />
            <FormField label="Segment" placeholder="New Customer" />
          </div>
          <FormField label="Address" placeholder="Customer address" />
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white">
            <Plus size={17} /> Add Customer
          </button>
        </form>
      </aside>
    </div>
  );
}

function FormField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <input required placeholder={placeholder} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
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
        <button onClick={onClick} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white">
          <Plus size={17} /> {buttonLabel}
        </button>
      </div>
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <span className="block text-[10px] uppercase tracking-wider text-slate-400">{label}</span>
      <strong className="mt-1 block text-xs text-slate-800">{value}</strong>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <strong className="text-right text-slate-800">{value}</strong>
    </div>
  );
}

function StatusBadge({ status }: { status: CustomerStatus }) {
  const className =
    status === "VIP"
      ? "bg-violet-50 text-violet-700"
      : status === "Active"
        ? "bg-green-50 text-green-700"
        : status === "Blocked"
          ? "bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-700";

  return <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-bold ${className}`}>{status}</span>;
}

function VerificationBadge({ status }: { status: VerificationStatus }) {
  const className =
    status === "Verified"
      ? "bg-green-50 text-green-700"
      : status === "Rejected"
        ? "bg-red-50 text-red-700"
        : "bg-orange-50 text-orange-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>{status}</span>;
}