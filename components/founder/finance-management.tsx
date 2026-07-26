"use client";

import {
  Activity,
  ArrowRight,
  BadgeIndianRupee,
  Banknote,
  BarChart3,
  BookOpenCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Download,
  FileBarChart,
  FileText,
  IndianRupee,
  Landmark,
  Plus,
  ReceiptIndianRupee,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type FinanceTab =
  | "dashboard"
  | "general-ledger"
  | "journal-entries"
  | "accounts-receivable"
  | "accounts-payable"
  | "banking"
  | "cash-management"
  | "treasury"
  | "budgeting"
  | "payroll"
  | "reimbursements"
  | "taxation"
  | "gst"
  | "tds"
  | "assets"
  | "loans"
  | "vendors"
  | "reports"
  | "settings";

type FinanceStatus = "Active" | "Pending" | "Overdue" | "Approved" | "Draft";

type FinanceRecord = {
  id: string;
  title: string;
  party: string;
  amount: number;
  dueDate: string;
  status: FinanceStatus;
};

const tabs: Array<{ id: FinanceTab; label: string; icon: IconType }> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "general-ledger", label: "General Ledger", icon: BookOpenCheck },
  { id: "journal-entries", label: "Journal Entries", icon: FileText },
  { id: "accounts-receivable", label: "Accounts Receivable", icon: TrendingUp },
  { id: "accounts-payable", label: "Accounts Payable", icon: ReceiptIndianRupee },
  { id: "banking", label: "Banking", icon: Landmark },
  { id: "cash-management", label: "Cash Management", icon: Banknote },
  { id: "treasury", label: "Treasury", icon: WalletCards },
  { id: "budgeting", label: "Budgeting", icon: CalendarClock },
  { id: "payroll", label: "Payroll", icon: CircleDollarSign },
  { id: "reimbursements", label: "Reimbursements", icon: CreditCard },
  { id: "taxation", label: "Taxation", icon: ShieldCheck },
  { id: "gst", label: "GST Center", icon: ReceiptIndianRupee },
  { id: "tds", label: "TDS", icon: BadgeIndianRupee },
  { id: "assets", label: "Fixed Assets", icon: Building2 },
  { id: "loans", label: "Loans & Liabilities", icon: Landmark },
  { id: "vendors", label: "Vendor Finance", icon: Building2 },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const receivables: FinanceRecord[] = [
  { id: "INV-1048", title: "Website Sales Settlement", party: "Razorpay", amount: 284600, dueDate: "28 Jul 2026", status: "Pending" },
  { id: "INV-1047", title: "Marketplace Settlement", party: "Amazon India", amount: 342600, dueDate: "29 Jul 2026", status: "Pending" },
  { id: "INV-1046", title: "Corporate Order", party: "Nexa Retail", amount: 118000, dueDate: "25 Jul 2026", status: "Overdue" },
];

const payables: FinanceRecord[] = [
  { id: "BILL-0842", title: "Fabric Procurement", party: "Aarav Textiles", amount: 268400, dueDate: "27 Jul 2026", status: "Pending" },
  { id: "BILL-0841", title: "Logistics Charges", party: "Delhivery", amount: 84600, dueDate: "30 Jul 2026", status: "Approved" },
  { id: "BILL-0840", title: "Cloud Infrastructure", party: "Vercel", amount: 28900, dueDate: "26 Jul 2026", status: "Overdue" },
];

const ledgerRows = [
  ["1001", "Cash and Bank", "Asset", "₹42,18,000", "Debit"],
  ["1101", "Accounts Receivable", "Asset", "₹6,42,000", "Debit"],
  ["2001", "Accounts Payable", "Liability", "₹8,74,000", "Credit"],
  ["4001", "Sales Revenue", "Income", "₹15,86,000", "Credit"],
  ["5001", "Cost of Goods Sold", "Expense", "₹6,69,000", "Debit"],
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FinanceManagement() {
  const [activeTab, setActiveTab] = useState<FinanceTab>("dashboard");
  const [search, setSearch] = useState("");
  const [showJournalPanel, setShowJournalPanel] = useState(false);

  const filteredLedger = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return ledgerRows;
    return ledgerRows.filter((row) => row.join(" ").toLowerCase().includes(query));
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <Header
        onCreateJournal={() => setShowJournalPanel(true)}
        onOpenTab={setActiveTab}
      />

      <TabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dashboard" && <Dashboard onOpenTab={setActiveTab} />}
      {activeTab === "general-ledger" && <GeneralLedger rows={filteredLedger} search={search} setSearch={setSearch} />}
      {activeTab === "journal-entries" && <JournalEntries />}
      {activeTab === "accounts-receivable" && <RecordWorkspace title="Accounts Receivable" description="Manage invoices, collections, ageing and customer balances." records={receivables} />}
      {activeTab === "accounts-payable" && <RecordWorkspace title="Accounts Payable" description="Manage vendor bills, approvals, payment runs and ageing." records={payables} />}
      {activeTab === "banking" && <Banking />}
      {activeTab === "cash-management" && <CashManagement />}
      {activeTab === "treasury" && <Treasury />}
      {activeTab === "budgeting" && <Budgeting />}
      {activeTab === "payroll" && <Payroll />}
      {activeTab === "reimbursements" && <Reimbursements />}
      {activeTab === "taxation" && <Taxation />}
      {activeTab === "gst" && <GSTCenter />}
      {activeTab === "tds" && <TDS />}
      {activeTab === "assets" && <Assets />}
      {activeTab === "loans" && <Loans />}
      {activeTab === "vendors" && <VendorFinance />}
      {activeTab === "reports" && <Reports />}
      {activeTab === "settings" && <Settings />}

      {showJournalPanel && <CreateJournalPanel onClose={() => setShowJournalPanel(false)} />}
    </div>
  );
}

function Header({
  onCreateJournal,
  onOpenTab,
}: {
  onCreateJournal: () => void;
  onOpenTab: (tab: FinanceTab) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <CircleDollarSign size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Financial Control Center
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Finance Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Control accounting, receivables, payables, banking, cash, treasury,
            budgeting, payroll, taxation, assets, liabilities and enterprise reporting.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenTab("accounts-receivable")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20"
          >
            <ArrowRight size={17} />
            Record Receipt
          </button>

          <button
            type="button"
            onClick={onCreateJournal}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
          >
            <Plus size={17} />
            Create Journal
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
  activeTab: FinanceTab;
  onChange: (tab: FinanceTab) => void;
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

function Dashboard({ onOpenTab }: { onOpenTab: (tab: FinanceTab) => void }) {
  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Net Revenue" value="₹15.86L" note="Current month" icon={TrendingUp} tone="blue" />
        <MetricCard title="Cash Position" value="₹42.18L" note="Across bank accounts" icon={Banknote} tone="green" />
        <MetricCard title="Receivables" value="₹6.42L" note="₹1.18L overdue" icon={IndianRupee} tone="violet" />
        <MetricCard title="Payables" value="₹8.74L" note="Due within 30 days" icon={ReceiptIndianRupee} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-950">Finance Operations</h2>
              <p className="mt-1 text-sm text-slate-500">Receivables, payables and treasury position</p>
            </div>
            <button onClick={() => onOpenTab("general-ledger")} className="flex items-center gap-2 text-sm font-bold text-blue-600">
              Open Ledger <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <QuickAction title="General Ledger" description="Review account balances and postings" icon={BookOpenCheck} onClick={() => onOpenTab("general-ledger")} />
            <QuickAction title="Journal Entries" description="Post debit and credit entries" icon={FileText} onClick={() => onOpenTab("journal-entries")} />
            <QuickAction title="Accounts Receivable" description="Manage invoices and collections" icon={TrendingUp} onClick={() => onOpenTab("accounts-receivable")} />
            <QuickAction title="Accounts Payable" description="Manage bills and payment runs" icon={ReceiptIndianRupee} onClick={() => onOpenTab("accounts-payable")} />
            <QuickAction title="Banking" description="Bank accounts and reconciliation" icon={Landmark} onClick={() => onOpenTab("banking")} />
            <QuickAction title="Treasury" description="Liquidity, investments and funding" icon={WalletCards} onClick={() => onOpenTab("treasury")} />
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

          <h2 className="mt-6 text-xl font-black">KRVE AI Finance Intelligence</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI monitors cash flow, overdue balances, expense leakage,
            tax exposure and budget variance.
          </p>

          <div className="mt-6 space-y-3">
            <Insight title="Cash opportunity" detail="₹4.8L of idle cash can be moved to short-term treasury instruments." tone="green" />
            <Insight title="Collection risk" detail="Three receivables are overdue and require immediate follow-up." tone="orange" />
          </div>

          <button onClick={() => onOpenTab("reports")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold hover:bg-blue-700">
            Open Finance Intelligence <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <RecordSummary title="Receivables Snapshot" records={receivables} onOpen={() => onOpenTab("accounts-receivable")} />
        <RecordSummary title="Payables Snapshot" records={payables} onOpen={() => onOpenTab("accounts-payable")} />
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
  const cls =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "violet"
        ? "bg-violet-50 text-violet-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${cls}`}><Icon size={21} /></div>
      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
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
    <button onClick={onClick} className="rounded-2xl border border-slate-200 p-5 text-left hover:border-blue-300 hover:bg-blue-50/40">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={20} /></div>
      <strong className="mt-4 block text-sm text-slate-900">{title}</strong>
      <span className="mt-2 block text-xs leading-5 text-slate-500">{description}</span>
      <span className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">Open <ChevronRight size={14} /></span>
    </button>
  );
}

function Insight({ title, detail, tone }: { title: string; detail: string; tone: "green" | "orange" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <strong className={`text-xs ${tone === "green" ? "text-green-300" : "text-orange-300"}`}>{title}</strong>
      <p className="mt-2 text-xs leading-5 text-slate-400">{detail}</p>
    </div>
  );
}

function RecordSummary({ title, records, onOpen }: { title: string; records: FinanceRecord[]; onOpen: () => void }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">Current finance records</p>
        </div>
        <button onClick={onOpen} className="text-sm font-bold text-blue-600">Open</button>
      </div>
      <div className="mt-6 space-y-3">
        {records.map((record) => (
          <div key={record.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><IndianRupee size={18} /></div>
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-sm text-slate-900">{record.title}</strong>
              <p className="mt-1 text-xs text-slate-500">{record.party} · Due {record.dueDate}</p>
            </div>
            <div className="text-right">
              <strong className="block text-sm text-slate-900">{formatCurrency(record.amount)}</strong>
              <StatusBadge status={record.status} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function GeneralLedger({ rows, search, setSearch }: { rows: string[][]; search: string; setSearch: (value: string) => void }) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title="General Ledger" description="Review chart of accounts, balances and posting direction." buttonLabel="Create Account" />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
          <Search size={17} className="text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search account code or name..." className="flex-1 bg-transparent text-sm outline-none" />
          {search && <button onClick={() => setSearch("")}><X size={15} /></button>}
        </div>
      </section>
      <DataTable headers={["Code", "Account", "Type", "Balance", "Normal Side"]} rows={rows} />
    </div>
  );
}

function JournalEntries() {
  const rows = [
    ["JV-2026-184", "25 Jul 2026", "Sales settlement posting", "₹2,84,600", "Posted"],
    ["JV-2026-183", "25 Jul 2026", "Inventory adjustment", "₹42,800", "Posted"],
    ["JV-2026-182", "24 Jul 2026", "Payroll accrual", "₹4,82,000", "Draft"],
  ];
  return <GenericTable title="Journal Entries" description="Create, review and post debit-credit transactions." buttonLabel="Create Journal" headers={["Entry", "Date", "Narration", "Amount", "Status"]} rows={rows} />;
}

function RecordWorkspace({ title, description, records }: { title: string; description: string; records: FinanceRecord[] }) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title={title} description={description} buttonLabel="Create Record" />
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Outstanding" value={formatCurrency(records.reduce((s, r) => s + r.amount, 0))} note="Current records" icon={IndianRupee} tone="blue" />
        <MetricCard title="Overdue" value={String(records.filter((r) => r.status === "Overdue").length)} note="Require attention" icon={CalendarClock} tone="orange" />
        <MetricCard title="Approved" value={String(records.filter((r) => r.status === "Approved").length)} note="Ready for processing" icon={CheckCircle2} tone="green" />
        <MetricCard title="Pending" value={String(records.filter((r) => r.status === "Pending").length)} note="Awaiting action" icon={Activity} tone="violet" />
      </section>
      <DataTable
        headers={["Reference", "Description", "Party", "Amount", "Due Date", "Status"]}
        rows={records.map((r) => [r.id, r.title, r.party, formatCurrency(r.amount), r.dueDate, r.status])}
      />
    </div>
  );
}

function Banking() {
  return <SimpleModule title="Banking & Reconciliation" description="Manage bank accounts, transactions and reconciliation." cards={[
    ["Bank Accounts", "5", "All active"],
    ["Cash Position", "₹42.18L", "Across accounts"],
    ["Unreconciled", "18", "Transactions"],
    ["Bank Charges", "₹18,420", "Current month"],
  ]} icon={Landmark} />;
}

function CashManagement() {
  return <SimpleModule title="Cash Management" description="Control cash inflows, outflows, forecasts and liquidity." cards={[
    ["Opening Cash", "₹38.42L", "Current month"],
    ["Inflows", "₹18.24L", "Current month"],
    ["Outflows", "₹14.48L", "Current month"],
    ["Closing Cash", "₹42.18L", "Projected"],
  ]} icon={Banknote} />;
}

function Treasury() {
  return <SimpleModule title="Treasury Management" description="Manage liquidity, short-term investments and funding." cards={[
    ["Available Liquidity", "₹12.86L", "Uncommitted"],
    ["Short-Term Investments", "₹4.80L", "Treasury instruments"],
    ["Funding Requirement", "₹2.40L", "Next 30 days"],
    ["Weighted Yield", "6.8%", "Current portfolio"],
  ]} icon={WalletCards} />;
}

function Budgeting() {
  return <SimpleModule title="Budgeting & Forecasting" description="Create budgets, forecasts and variance analysis." cards={[
    ["Annual Budget", "₹2.48Cr", "FY 2026-27"],
    ["Actual Spend", "₹1.12Cr", "Year to date"],
    ["Variance", "-4.8%", "Below budget"],
    ["Forecast Accuracy", "94.2%", "Rolling forecast"],
  ]} icon={CalendarClock} />;
}

function Payroll() {
  return <SimpleModule title="Payroll Finance" description="Review payroll cost, approval and statutory deductions." cards={[
    ["Gross Payroll", "₹4.82L", "Current month"],
    ["Net Payroll", "₹4.12L", "After deductions"],
    ["Statutory Deductions", "₹70,000", "PF, ESI and TDS"],
    ["Pending Approval", "8", "Employees"],
  ]} icon={CircleDollarSign} />;
}

function Reimbursements() {
  return <SimpleModule title="Reimbursements" description="Manage employee claims, approvals and payment." cards={[
    ["Open Claims", "26", "Awaiting action"],
    ["Claim Value", "₹1.42L", "Current month"],
    ["Approved", "18", "Ready for payment"],
    ["Rejected", "3", "Current month"],
  ]} icon={CreditCard} />;
}

function Taxation() {
  return <SimpleModule title="Taxation Control" description="Manage direct and indirect tax compliance." cards={[
    ["Tax Liability", "₹2.86L", "Current period"],
    ["Advance Tax", "₹1.20L", "Paid"],
    ["Compliance Tasks", "12", "Open"],
    ["Tax Notices", "0", "No active notice"],
  ]} icon={ShieldCheck} />;
}

function GSTCenter() {
  return <SimpleModule title="GST Center" description="Manage GST returns, input credit and reconciliation." cards={[
    ["Output GST", "₹2.84L", "Current period"],
    ["Input Credit", "₹1.46L", "Eligible ITC"],
    ["Net GST Payable", "₹1.38L", "Current period"],
    ["Mismatch Items", "6", "Require review"],
  ]} icon={ReceiptIndianRupee} />;
}

function TDS() {
  return <SimpleModule title="TDS Management" description="Manage deductions, challans, returns and certificates." cards={[
    ["TDS Deducted", "₹68,400", "Current quarter"],
    ["TDS Deposited", "₹54,200", "Current quarter"],
    ["Pending Deposit", "₹14,200", "Due soon"],
    ["Certificates Pending", "8", "Form 16A"],
  ]} icon={BadgeIndianRupee} />;
}

function Assets() {
  return <SimpleModule title="Fixed Assets" description="Manage asset register, depreciation and disposal." cards={[
    ["Gross Asset Value", "₹28.60L", "All assets"],
    ["Accumulated Depreciation", "₹6.42L", "Till date"],
    ["Net Book Value", "₹22.18L", "Current"],
    ["Assets Due for Verification", "12", "This month"],
  ]} icon={Building2} />;
}

function Loans() {
  return <SimpleModule title="Loans & Liabilities" description="Manage borrowings, repayment schedules and interest." cards={[
    ["Outstanding Loans", "₹18.40L", "Current principal"],
    ["Monthly EMI", "₹1.28L", "Next due"],
    ["Interest Cost", "₹42,600", "Current month"],
    ["Upcoming Payments", "3", "Next 30 days"],
  ]} icon={Landmark} />;
}

function VendorFinance() {
  return <SimpleModule title="Vendor Finance" description="Manage vendor balances, credit terms and payment performance." cards={[
    ["Active Vendors", "84", "Finance enabled"],
    ["Vendor Payables", "₹8.74L", "Outstanding"],
    ["Average Credit Period", "32 days", "Current"],
    ["Blocked Vendors", "2", "Compliance hold"],
  ]} icon={Building2} />;
}

function Reports() {
  const rows = [
    ["Profit & Loss Statement", "Monthly", "Ready"],
    ["Balance Sheet", "Monthly", "Ready"],
    ["Cash Flow Statement", "Monthly", "Ready"],
    ["Receivables Ageing", "Weekly", "Ready"],
    ["Payables Ageing", "Weekly", "Ready"],
    ["GST Reconciliation", "Monthly", "Generating"],
  ];
  return <GenericTable title="Finance Reports" description="Generate statutory, management and operational finance reports." buttonLabel="Create Report" headers={["Report", "Frequency", "Status"]} rows={rows} />;
}

function Settings() {
  return <SimpleModule title="Finance Settings" description="Configure accounting, approvals, tax and reporting controls." cards={[
    ["Fiscal Year", "2026-27", "Current"],
    ["Base Currency", "INR", "Enterprise default"],
    ["Approval Matrix", "Active", "Role based"],
    ["Audit Trail", "Enabled", "All transactions"],
  ]} icon={Settings2} />;
}

function SimpleModule({
  title,
  description,
  cards,
  icon: Icon,
}: {
  title: string;
  description: string;
  cards: string[][];
  icon: IconType;
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title={title} description={description} buttonLabel="Create / Configure" />
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Icon size={22} /></div>
            <h3 className="mt-5 text-base font-black text-slate-900">{card[0]}</h3>
            <p className="mt-2 text-3xl font-black text-slate-950">{card[1]}</p>
            <p className="mt-2 text-xs text-slate-500">{card[2]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function GenericTable({
  title,
  description,
  buttonLabel,
  headers,
  rows,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-6 space-y-6">
      <WorkspaceHeader title={title} description={description} buttonLabel={buttonLabel} />
      <DataTable headers={headers} rows={rows} />
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              {headers.map((header) => <th key={header} className="px-5 py-4">{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`} className="border-b border-slate-100 text-sm">
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className={`px-5 py-4 ${cellIndex === 0 ? "font-bold text-blue-600" : "text-slate-700"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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

function StatusBadge({ status }: { status: FinanceStatus }) {
  const cls =
    status === "Approved" || status === "Active"
      ? "bg-green-50 text-green-700"
      : status === "Overdue"
        ? "bg-red-50 text-red-700"
        : status === "Draft"
          ? "bg-slate-100 text-slate-700"
          : "bg-orange-50 text-orange-700";

  return <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-bold ${cls}`}>{status}</span>;
}

function CreateJournalPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-slate-950/50 backdrop-blur-sm">
      <button className="absolute inset-0" onClick={onClose} aria-label="Close panel" />
      <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Financial Control Center</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Create Journal Entry</h2>
            <p className="mt-2 text-sm text-slate-500">Post a balanced debit and credit transaction.</p>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200"><X size={18} /></button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); onClose(); }}>
          <FormField label="Entry Date" placeholder="26 Jul 2026" />
          <FormField label="Narration" placeholder="Transaction description" />
          <FormField label="Debit Account" placeholder="Select debit account" />
          <FormField label="Credit Account" placeholder="Select credit account" />
          <FormField label="Amount" placeholder="₹0" />
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white">
            <Plus size={17} /> Post Journal
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