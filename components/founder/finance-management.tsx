"use client";

import {
  Activity,
  ArrowLeft,
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
  FileBarChart,
  FileText,
  IndianRupee,
  Landmark,
  LineChart,
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

type ModuleId =
  | "finance-dashboard"
  | "general-ledger"
  | "journal-entries"
  | "accounts-receivable"
  | "accounts-payable"
  | "banking-reconciliation"
  | "cash-management"
  | "treasury"
  | "budgeting-forecasting"
  | "payroll-finance"
  | "reimbursements"
  | "taxation"
  | "gst-center"
  | "tds"
  | "fixed-assets"
  | "loans-liabilities"
  | "vendor-finance"
  | "cost-management"
  | "financial-planning"
  | "audit-controls"
  | "finance-analytics"
  | "finance-reports"
  | "finance-settings"
  | "krve-ai-finance";

type FinanceModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: FinanceModule[] = [
  {
    id: "finance-dashboard",
    title: "Finance Dashboard",
    description: "View complete financial position and control KPIs.",
    icon: BarChart3,
    items: [
      "Net Revenue",
      "Cash Position",
      "Receivables",
      "Payables",
      "Profitability",
      "Budget Variance",
      "Tax Liability",
      "Treasury Position",
      "AI Insights",
    ],
  },
  {
    id: "general-ledger",
    title: "General Ledger",
    description: "Manage chart of accounts, balances and account postings.",
    icon: BookOpenCheck,
    items: [
      "Chart of Accounts",
      "Account Groups",
      "Ledger Balances",
      "Opening Balances",
      "Posting Rules",
      "Account Reconciliation",
      "Trial Balance",
      "Ledger Reports",
    ],
  },
  {
    id: "journal-entries",
    title: "Journal Entries",
    description: "Create, approve and post debit-credit transactions.",
    icon: FileText,
    items: [
      "Create Journal",
      "Draft Journals",
      "Journal Approval",
      "Recurring Journals",
      "Adjustment Entries",
      "Reversal Entries",
      "Journal Templates",
      "Journal History",
    ],
  },
  {
    id: "accounts-receivable",
    title: "Accounts Receivable",
    description: "Manage customer invoices, collections and ageing.",
    icon: TrendingUp,
    items: [
      "Customer Invoices",
      "Sales Invoices",
      "Receipts",
      "Credit Notes",
      "Collections",
      "Receivable Ageing",
      "Overdue Follow-up",
      "Customer Statements",
      "AR Reports",
    ],
  },
  {
    id: "accounts-payable",
    title: "Accounts Payable",
    description: "Manage vendor bills, approvals and payment runs.",
    icon: ReceiptIndianRupee,
    items: [
      "Vendor Bills",
      "Bill Approval",
      "Debit Notes",
      "Payment Runs",
      "Advance Payments",
      "Payable Ageing",
      "Payment Scheduling",
      "Vendor Statements",
      "AP Reports",
    ],
  },
  {
    id: "banking-reconciliation",
    title: "Banking & Reconciliation",
    description: "Control bank accounts, transactions and reconciliation.",
    icon: Landmark,
    items: [
      "Bank Accounts",
      "Bank Transactions",
      "Bank Reconciliation",
      "Cheque Management",
      "Payment Gateway Settlement",
      "Bank Charges",
      "Cash Deposits",
      "Bank Statements",
      "Bank Reports",
    ],
  },
  {
    id: "cash-management",
    title: "Cash Management",
    description: "Manage inflows, outflows, liquidity and cash forecasts.",
    icon: Banknote,
    items: [
      "Cash Position",
      "Cash Inflows",
      "Cash Outflows",
      "Petty Cash",
      "Cash Forecast",
      "Cash Transfer",
      "Cash Controls",
      "Daily Cash Report",
    ],
  },
  {
    id: "treasury",
    title: "Treasury",
    description: "Manage liquidity, investments, funding and financial risk.",
    icon: WalletCards,
    items: [
      "Liquidity Planning",
      "Short-Term Investments",
      "Fixed Deposits",
      "Money Market Instruments",
      "Funding Requirements",
      "Interest Income",
      "Foreign Exchange Exposure",
      "Treasury Risk",
      "Treasury Reports",
    ],
  },
  {
    id: "budgeting-forecasting",
    title: "Budgeting & Forecasting",
    description: "Create budgets, forecasts and variance analysis.",
    icon: CalendarClock,
    items: [
      "Annual Budget",
      "Department Budget",
      "Cost Center Budget",
      "Revenue Forecast",
      "Expense Forecast",
      "Rolling Forecast",
      "Budget Approval",
      "Budget Variance",
      "Forecast Accuracy",
    ],
  },
  {
    id: "payroll-finance",
    title: "Payroll Finance",
    description: "Review salary cost, deductions and payroll approvals.",
    icon: CircleDollarSign,
    items: [
      "Payroll Dashboard",
      "Salary Cost",
      "Payroll Approval",
      "Salary Payable",
      "Statutory Deductions",
      "Bonus & Incentives",
      "Arrears",
      "Payroll Journal",
      "Payroll Reports",
    ],
  },
  {
    id: "reimbursements",
    title: "Reimbursements",
    description: "Manage employee claims, approvals and payments.",
    icon: CreditCard,
    items: [
      "Expense Claims",
      "Claim Approval",
      "Travel Claims",
      "Medical Claims",
      "Mobile Claims",
      "Advance Settlement",
      "Rejected Claims",
      "Reimbursement Payment",
      "Claim Reports",
    ],
  },
  {
    id: "taxation",
    title: "Taxation",
    description: "Manage direct and indirect tax compliance.",
    icon: ShieldCheck,
    items: [
      "Tax Dashboard",
      "Advance Tax",
      "Income Tax Provision",
      "Deferred Tax",
      "Tax Payments",
      "Tax Notices",
      "Tax Assessments",
      "Tax Compliance Calendar",
      "Tax Reports",
    ],
  },
  {
    id: "gst-center",
    title: "GST Center",
    description: "Manage GST returns, input credit and reconciliation.",
    icon: ReceiptIndianRupee,
    items: [
      "GST Dashboard",
      "GSTR-1",
      "GSTR-3B",
      "GSTR-9",
      "Input Tax Credit",
      "GST Reconciliation",
      "E-Invoice",
      "E-Way Bill",
      "GST Payments",
      "GST Reports",
    ],
  },
  {
    id: "tds",
    title: "TDS Management",
    description: "Manage deductions, challans, returns and certificates.",
    icon: BadgeIndianRupee,
    items: [
      "TDS Dashboard",
      "TDS Deduction",
      "TDS Payable",
      "Challan Payment",
      "Form 26Q",
      "Form 24Q",
      "Form 16",
      "Form 16A",
      "TDS Reconciliation",
      "TDS Reports",
    ],
  },
  {
    id: "fixed-assets",
    title: "Fixed Assets",
    description: "Manage asset register, depreciation and disposal.",
    icon: Building2,
    items: [
      "Asset Register",
      "Asset Categories",
      "Asset Purchase",
      "Capitalisation",
      "Depreciation",
      "Asset Transfer",
      "Asset Verification",
      "Asset Disposal",
      "Asset Reports",
    ],
  },
  {
    id: "loans-liabilities",
    title: "Loans & Liabilities",
    description: "Manage borrowings, repayments, interest and liabilities.",
    icon: Landmark,
    items: [
      "Loan Register",
      "Working Capital Loans",
      "Term Loans",
      "Repayment Schedule",
      "Interest Calculation",
      "EMI Payments",
      "Liability Ageing",
      "Covenant Monitoring",
      "Loan Reports",
    ],
  },
  {
    id: "vendor-finance",
    title: "Vendor Finance",
    description: "Manage vendor balances, credit terms and settlements.",
    icon: Building2,
    items: [
      "Vendor Master",
      "Vendor Balances",
      "Credit Terms",
      "Vendor Advances",
      "Payment Performance",
      "Vendor Reconciliation",
      "Vendor TDS",
      "Vendor Compliance",
      "Vendor Finance Reports",
    ],
  },
  {
    id: "cost-management",
    title: "Cost Management",
    description: "Analyse product, department and operational costs.",
    icon: LineChart,
    items: [
      "Cost Centers",
      "Cost Allocation",
      "Product Costing",
      "Department Cost",
      "Overhead Allocation",
      "Standard Cost",
      "Actual Cost",
      "Cost Variance",
      "Cost Reports",
    ],
  },
  {
    id: "financial-planning",
    title: "Financial Planning",
    description: "Plan revenue, expenses, profit and capital requirements.",
    icon: TrendingUp,
    items: [
      "Revenue Planning",
      "Expense Planning",
      "Profit Planning",
      "Capital Planning",
      "Working Capital Planning",
      "Scenario Planning",
      "Break-Even Analysis",
      "Sensitivity Analysis",
      "Financial Projections",
    ],
  },
  {
    id: "audit-controls",
    title: "Audit & Controls",
    description: "Manage internal controls, audit trails and compliance review.",
    icon: CheckCircle2,
    items: [
      "Internal Audit",
      "Audit Plan",
      "Audit Checklist",
      "Control Testing",
      "Exception Register",
      "Audit Findings",
      "Corrective Actions",
      "Approval Matrix",
      "Audit Trail",
    ],
  },
  {
    id: "finance-analytics",
    title: "Finance Analytics",
    description: "Analyse profitability, cash flow and financial performance.",
    icon: Activity,
    items: [
      "Profitability Dashboard",
      "Cash Flow Analytics",
      "Revenue Analytics",
      "Expense Analytics",
      "Receivable Analytics",
      "Payable Analytics",
      "Tax Analytics",
      "Budget Analytics",
      "AI Financial Predictions",
    ],
  },
  {
    id: "finance-reports",
    title: "Finance Reports",
    description: "Generate statutory and management financial reports.",
    icon: FileBarChart,
    items: [
      "Profit & Loss Statement",
      "Balance Sheet",
      "Cash Flow Statement",
      "Fund Flow Statement",
      "Trial Balance",
      "General Ledger Report",
      "Receivable Ageing",
      "Payable Ageing",
      "Budget Variance Report",
      "Management Information System",
    ],
  },
  {
    id: "finance-settings",
    title: "Finance Settings",
    description: "Configure accounting, approvals, tax and reporting controls.",
    icon: Settings2,
    items: [
      "Fiscal Year",
      "Base Currency",
      "Chart of Accounts",
      "Numbering Series",
      "Approval Matrix",
      "Tax Rules",
      "Payment Terms",
      "Cost Centers",
      "Financial Permissions",
      "Audit Trail Settings",
    ],
  },
  {
    id: "krve-ai-finance",
    title: "KRVE AI Finance",
    description: "Use AI for financial analysis, forecasting and risk detection.",
    icon: Sparkles,
    items: [
      "AI Cash Flow Forecast",
      "AI Expense Analysis",
      "AI Revenue Forecast",
      "AI Collection Prediction",
      "AI Fraud Detection",
      "AI Tax Risk Detection",
      "AI Budget Recommendation",
      "AI Treasury Recommendation",
      "AI Finance Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Net Revenue", "₹15.86L", "Current month", TrendingUp],
  ["Cash Position", "₹42.18L", "Across bank accounts", Banknote],
  ["Receivables", "₹6.42L", "₹1.18L overdue", IndianRupee],
  ["Payables", "₹8.74L", "Due within 30 days", ReceiptIndianRupee],
];

export default function FinanceManagement() {
  const [selectedModule, setSelectedModule] = useState<FinanceModule | null>(null);
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
            placeholder="Search finance modules, reports or workflows..."
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
            Complete Finance Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete finance workspace.
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
            Complete enterprise finance covering accounting, receivables,
            payables, banking, treasury, budgeting, payroll, taxation, assets,
            liabilities, audit, analytics and KRVE AI Finance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <FileText size={17} />
            Create Journal
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Record Receipt
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
  module: FinanceModule;
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
  module: FinanceModule;
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
          Back to Finance Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Finance Workspace
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
        <WorkspaceMetric title="Active Records" value="128" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Actions" value="14" note="Require attention" icon={CalendarClock} />
        <WorkspaceMetric title="Completed" value="96%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="8" note="Available exports" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its finance workflow.
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
    FileText,
    BookOpenCheck,
    IndianRupee,
    ReceiptIndianRupee,
    Landmark,
    WalletCards,
    ShieldCheck,
    Building2,
    CalendarClock,
    BadgeIndianRupee,
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

      <h3 className="mt-4 text-sm font-black text-slate-950">
        {title}
      </h3>

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