"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  BellRing,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileBarChart,
  FileText,
  IndianRupee,
  PackageCheck,
  PackageSearch,
  Plus,
  ReceiptIndianRupee,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Tags,
  Truck,
  Users,
  Warehouse,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ModuleId =
  | "procurement-dashboard"
  | "purchase-requisition"
  | "rfq-management"
  | "supplier-management"
  | "vendor-onboarding"
  | "quotation-comparison"
  | "purchase-orders"
  | "contract-management"
  | "goods-receipt"
  | "quality-inspection"
  | "vendor-bills"
  | "payment-coordination"
  | "category-management"
  | "strategic-sourcing"
  | "inventory-procurement"
  | "service-procurement"
  | "capital-procurement"
  | "procurement-budget"
  | "approval-workflows"
  | "supplier-performance"
  | "risk-compliance"
  | "procurement-analytics"
  | "procurement-reports"
  | "procurement-settings"
  | "krve-ai-procurement";

type ProcurementModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: ProcurementModule[] = [
  {
    id: "procurement-dashboard",
    title: "Procurement Dashboard",
    description: "View purchase orders, approvals, suppliers and delivery performance.",
    icon: BarChart3,
    items: [
      "Open Purchase Orders",
      "Pending Approvals",
      "Active Suppliers",
      "On-Time Delivery",
      "Purchase Spend",
      "Savings",
      "Open RFQs",
      "Contract Status",
      "AI Insights",
    ],
  },
  {
    id: "purchase-requisition",
    title: "Purchase Requisition",
    description: "Create, review and approve internal purchase requests.",
    icon: ClipboardCheck,
    items: [
      "Create Requisition",
      "Draft Requisitions",
      "Submitted Requisitions",
      "Requisition Approval",
      "Department Requests",
      "Budget Check",
      "Priority Requests",
      "Emergency Requests",
      "Requisition History",
      "Requisition Reports",
    ],
  },
  {
    id: "rfq-management",
    title: "RFQ Management",
    description: "Create requests for quotation and manage supplier responses.",
    icon: FileText,
    items: [
      "Create RFQ",
      "Open RFQs",
      "Supplier Invitations",
      "RFQ Templates",
      "Technical Specifications",
      "Commercial Terms",
      "Supplier Responses",
      "RFQ Deadlines",
      "RFQ Approval",
      "RFQ History",
      "RFQ Reports",
    ],
  },
  {
    id: "supplier-management",
    title: "Supplier Management",
    description: "Manage supplier records, contacts, categories and status.",
    icon: Building2,
    items: [
      "Supplier Directory",
      "Supplier Master",
      "Supplier Contacts",
      "Supplier Categories",
      "Approved Suppliers",
      "Blocked Suppliers",
      "Supplier Documents",
      "Supplier Bank Details",
      "Supplier Tax Details",
      "Supplier Status",
      "Supplier Reports",
    ],
  },
  {
    id: "vendor-onboarding",
    title: "Vendor Onboarding",
    description: "Handle supplier registration, verification and approval.",
    icon: Users,
    items: [
      "Vendor Registration",
      "KYC Documents",
      "GST Verification",
      "PAN Verification",
      "Bank Verification",
      "Compliance Check",
      "Commercial Evaluation",
      "Technical Evaluation",
      "Approval Workflow",
      "Vendor Activation",
      "Onboarding History",
    ],
  },
  {
    id: "quotation-comparison",
    title: "Quotation Comparison",
    description: "Compare supplier quotes, terms and total landed cost.",
    icon: Tags,
    items: [
      "Quotation Register",
      "Price Comparison",
      "Technical Comparison",
      "Commercial Comparison",
      "Delivery Comparison",
      "Payment Terms",
      "Warranty Terms",
      "Landed Cost",
      "Recommendation",
      "Approval",
      "Comparison Reports",
    ],
  },
  {
    id: "purchase-orders",
    title: "Purchase Orders",
    description: "Create and manage purchase orders, amendments and closures.",
    icon: ShoppingCart,
    items: [
      "Create Purchase Order",
      "Draft Purchase Orders",
      "Pending Approval",
      "Approved Purchase Orders",
      "PO Amendments",
      "Blanket Purchase Orders",
      "Scheduled Purchase Orders",
      "PO Acknowledgement",
      "PO Closure",
      "PO History",
      "PO Reports",
    ],
  },
  {
    id: "contract-management",
    title: "Contract Management",
    description: "Manage supplier contracts, terms, renewals and obligations.",
    icon: FileText,
    items: [
      "Contract Register",
      "Create Contract",
      "Contract Templates",
      "Commercial Terms",
      "Service Levels",
      "Contract Approval",
      "Contract Renewal",
      "Contract Expiry",
      "Obligation Tracking",
      "Contract Amendments",
      "Contract Reports",
    ],
  },
  {
    id: "goods-receipt",
    title: "Goods Receipt",
    description: "Record material receipt, quantity and warehouse acceptance.",
    icon: PackageCheck,
    items: [
      "Create GRN",
      "Pending Receipts",
      "Partial Receipts",
      "Over Receipts",
      "Short Receipts",
      "Warehouse Receipt",
      "Receipt Against PO",
      "Receipt Documents",
      "Receipt History",
      "GRN Reports",
    ],
  },
  {
    id: "quality-inspection",
    title: "Quality Inspection",
    description: "Inspect received goods and record acceptance or rejection.",
    icon: ShieldCheck,
    items: [
      "Inspection Queue",
      "Inspection Checklist",
      "Sample Inspection",
      "Quality Parameters",
      "Accepted Quantity",
      "Rejected Quantity",
      "Non-Conformance",
      "Return to Vendor",
      "Inspection Approval",
      "Inspection History",
      "Quality Reports",
    ],
  },
  {
    id: "vendor-bills",
    title: "Vendor Bills",
    description: "Manage supplier invoices, matching and finance submission.",
    icon: ReceiptIndianRupee,
    items: [
      "Vendor Bill Register",
      "Create Vendor Bill",
      "PO Matching",
      "GRN Matching",
      "Three-Way Match",
      "Tax Validation",
      "Bill Approval",
      "Credit Notes",
      "Debit Notes",
      "Finance Submission",
      "Bill Reports",
    ],
  },
  {
    id: "payment-coordination",
    title: "Payment Coordination",
    description: "Coordinate vendor payments with finance and treasury.",
    icon: IndianRupee,
    items: [
      "Payment Requests",
      "Due Payments",
      "Advance Payments",
      "Payment Scheduling",
      "Payment Approval",
      "Payment Hold",
      "Payment Release",
      "Supplier Confirmation",
      "Payment History",
      "Payment Reports",
    ],
  },
  {
    id: "category-management",
    title: "Category Management",
    description: "Manage procurement categories, spend and category strategies.",
    icon: Tags,
    items: [
      "Category Dashboard",
      "Category Master",
      "Subcategories",
      "Category Owners",
      "Spend by Category",
      "Supplier by Category",
      "Category Strategy",
      "Category Savings",
      "Category Contracts",
      "Category Reports",
    ],
  },
  {
    id: "strategic-sourcing",
    title: "Strategic Sourcing",
    description: "Plan sourcing events, negotiations and long-term supplier strategy.",
    icon: Workflow,
    items: [
      "Sourcing Dashboard",
      "Sourcing Events",
      "Market Assessment",
      "Supplier Discovery",
      "RFI",
      "RFP",
      "Reverse Auction",
      "Negotiation",
      "Award Recommendation",
      "Sourcing Approval",
      "Sourcing Reports",
    ],
  },
  {
    id: "inventory-procurement",
    title: "Inventory Procurement",
    description: "Procure stock using demand, reorder and inventory signals.",
    icon: Warehouse,
    items: [
      "Reorder Requests",
      "Low Stock Procurement",
      "Safety Stock Planning",
      "Demand-Based Purchase",
      "Seasonal Procurement",
      "Warehouse Requirements",
      "Inventory Transfer Buy",
      "Open Stock Orders",
      "Stock Procurement History",
      "Inventory Procurement Reports",
    ],
  },
  {
    id: "service-procurement",
    title: "Service Procurement",
    description: "Manage procurement of professional and operational services.",
    icon: BriefcaseBusiness,
    items: [
      "Service Requisition",
      "Service RFQ",
      "Service Providers",
      "Statement of Work",
      "Service Contracts",
      "Milestone Approval",
      "Service Entry Sheet",
      "Service Invoice",
      "Service Performance",
      "Service Procurement Reports",
    ],
  },
  {
    id: "capital-procurement",
    title: "Capital Procurement",
    description: "Manage machinery, equipment and capital purchase workflows.",
    icon: Building2,
    items: [
      "Capital Requisition",
      "CAPEX Budget Check",
      "Technical Evaluation",
      "Commercial Evaluation",
      "Capital PO",
      "Installation Tracking",
      "Asset Capitalisation",
      "Warranty Tracking",
      "Commissioning",
      "Capital Procurement Reports",
    ],
  },
  {
    id: "procurement-budget",
    title: "Procurement Budget",
    description: "Control procurement budgets, commitments and variance.",
    icon: IndianRupee,
    items: [
      "Budget Dashboard",
      "Annual Procurement Budget",
      "Department Budget",
      "Category Budget",
      "Committed Spend",
      "Actual Spend",
      "Available Budget",
      "Budget Approval",
      "Budget Variance",
      "Budget Reports",
    ],
  },
  {
    id: "approval-workflows",
    title: "Approval Workflows",
    description: "Configure requisition, RFQ, PO and contract approvals.",
    icon: CheckCircle2,
    items: [
      "Requisition Approval",
      "RFQ Approval",
      "Quotation Approval",
      "PO Approval",
      "Contract Approval",
      "Bill Approval",
      "Payment Approval",
      "Emergency Approval",
      "Delegation",
      "Approval Matrix",
      "Approval History",
    ],
  },
  {
    id: "supplier-performance",
    title: "Supplier Performance",
    description: "Measure delivery, quality, cost and service performance.",
    icon: Activity,
    items: [
      "Supplier Scorecard",
      "On-Time Delivery",
      "Quality Rating",
      "Price Competitiveness",
      "Service Rating",
      "Response Time",
      "Contract Compliance",
      "Issue History",
      "Corrective Actions",
      "Supplier Ranking",
      "Performance Reports",
    ],
  },
  {
    id: "risk-compliance",
    title: "Risk & Compliance",
    description: "Monitor procurement risk, fraud, policy and supplier compliance.",
    icon: AlertTriangle,
    items: [
      "Supplier Risk",
      "Financial Risk",
      "Delivery Risk",
      "Quality Risk",
      "Compliance Documents",
      "Conflict of Interest",
      "Fraud Indicators",
      "Policy Exceptions",
      "Risk Mitigation",
      "Audit Trail",
      "Risk Reports",
    ],
  },
  {
    id: "procurement-analytics",
    title: "Procurement Analytics",
    description: "Analyse spend, savings, suppliers and delivery performance.",
    icon: Activity,
    items: [
      "Spend Analytics",
      "Supplier Analytics",
      "Category Analytics",
      "Savings Analytics",
      "PO Analytics",
      "Delivery Analytics",
      "Quality Analytics",
      "Budget Analytics",
      "Contract Analytics",
      "Payment Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "procurement-reports",
    title: "Procurement Reports",
    description: "Generate purchasing, supplier, spend and compliance reports.",
    icon: FileBarChart,
    items: [
      "Procurement Summary",
      "Requisition Report",
      "RFQ Report",
      "PO Report",
      "Supplier Report",
      "Spend Report",
      "Savings Report",
      "Delivery Report",
      "Quality Report",
      "Contract Report",
      "Compliance Report",
      "Custom Reports",
    ],
  },
  {
    id: "procurement-settings",
    title: "Procurement Settings",
    description: "Configure numbering, approvals, categories and permissions.",
    icon: Settings2,
    items: [
      "Requisition Numbering",
      "RFQ Numbering",
      "PO Numbering",
      "Supplier Categories",
      "Approval Matrix",
      "Payment Terms",
      "Delivery Terms",
      "Tax Rules",
      "Procurement Policies",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-procurement",
    title: "KRVE AI Procurement",
    description: "Use AI for supplier selection, pricing, risk and sourcing decisions.",
    icon: Sparkles,
    items: [
      "AI Supplier Recommendation",
      "AI Quote Comparison",
      "AI Price Benchmarking",
      "AI Demand Forecast",
      "AI Reorder Recommendation",
      "AI Contract Analysis",
      "AI Supplier Risk Detection",
      "AI Savings Opportunity",
      "AI Fraud Detection",
      "AI Negotiation Assistant",
      "AI Procurement Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Open Purchase Orders", "18", "₹14.82L committed", ShoppingCart],
  ["Pending Approvals", "6", "Founder or finance review", CheckCircle2],
  ["Active Suppliers", "24", "5 strategic vendors", Building2],
  ["On-Time Delivery", "91.8%", "Current quarter", Truck],
];

export default function ProcurementManagement() {
  const [selectedModule, setSelectedModule] =
    useState<ProcurementModule | null>(null);
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
            placeholder="Search procurement modules, suppliers or workflows..."
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
            Complete Procurement Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete procurement workspace.
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
              <ClipboardCheck size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Procurement Operations
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Procurement Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete procurement covering requisitions, RFQs, suppliers,
            quotations, purchase orders, contracts, receipts, quality, bills,
            sourcing, risk, analytics and KRVE AI Procurement.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <FileText size={17} />
            Create RFQ
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Create Purchase Order
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
  module: ProcurementModule;
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
  module: ProcurementModule;
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
          Back to Procurement Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Procurement Workspace
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
        <WorkspaceMetric title="Pending Actions" value="14" note="Require attention" icon={BellRing} />
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
              Tap any feature to open its procurement workflow.
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
    ClipboardCheck,
    FileText,
    Building2,
    Tags,
    ShoppingCart,
    PackageCheck,
    ShieldCheck,
    ReceiptIndianRupee,
    IndianRupee,
    Workflow,
    Truck,
    Warehouse,
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