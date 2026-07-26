"use client";

import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileBarChart,
  FileText,
  HardHat,
  KeyRound,
  Laptop,
  MapPin,
  PackageCheck,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tags,
  Truck,
  UserCheck,
  Users,
  Warehouse,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ModuleId =
  | "facilities-dashboard"
  | "facility-directory"
  | "office-management"
  | "asset-register"
  | "asset-allocation"
  | "asset-transfer"
  | "asset-maintenance"
  | "preventive-maintenance"
  | "breakdown-maintenance"
  | "asset-verification"
  | "asset-depreciation"
  | "asset-disposal"
  | "inventory-assets"
  | "it-assets"
  | "furniture-fixtures"
  | "vehicles"
  | "utilities"
  | "security-access"
  | "space-management"
  | "workplace-services"
  | "facility-vendors"
  | "facility-compliance"
  | "health-safety"
  | "facility-projects"
  | "facility-analytics"
  | "facility-reports"
  | "facility-settings"
  | "krve-ai-facilities";

type FacilityModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: FacilityModule[] = [
  {
    id: "facilities-dashboard",
    title: "Facilities Dashboard",
    description: "View assets, maintenance, utilisation and workplace readiness.",
    icon: BarChart3,
    items: [
      "Company Assets",
      "Assigned Assets",
      "Maintenance Due",
      "Open Service Requests",
      "Facility Utilisation",
      "Asset Value",
      "Safety Status",
      "Vendor Performance",
      "AI Insights",
    ],
  },
  {
    id: "facility-directory",
    title: "Facility Directory",
    description: "Manage offices, branches, stores and operational locations.",
    icon: Building2,
    items: [
      "Facility List",
      "Office Locations",
      "Branches",
      "Warehouses",
      "Stores",
      "Workshops",
      "Facility Contacts",
      "Facility Status",
      "Facility Capacity",
      "Facility Documents",
      "Facility History",
      "Facility Reports",
    ],
  },
  {
    id: "office-management",
    title: "Office Management",
    description: "Control office operations, services and workplace readiness.",
    icon: Building2,
    items: [
      "Office Dashboard",
      "Reception",
      "Meeting Rooms",
      "Workstations",
      "Pantry",
      "Housekeeping",
      "Office Supplies",
      "Visitor Management",
      "Parking",
      "Office Events",
      "Office Issues",
      "Office Reports",
    ],
  },
  {
    id: "asset-register",
    title: "Asset Register",
    description: "Maintain the complete master of company-owned assets.",
    icon: PackageCheck,
    items: [
      "Add Asset",
      "Asset Directory",
      "Asset Categories",
      "Asset ID",
      "Serial Number",
      "Purchase Details",
      "Warranty Details",
      "Book Value",
      "Asset Location",
      "Asset Status",
      "Asset Documents",
      "Asset History",
    ],
  },
  {
    id: "asset-allocation",
    title: "Asset Allocation",
    description: "Assign assets to employees, teams and departments.",
    icon: UserCheck,
    items: [
      "Assign Asset",
      "Assigned Assets",
      "Employee Assets",
      "Department Assets",
      "Location Assets",
      "Allocation Approval",
      "Handover Checklist",
      "Acknowledgement",
      "Allocation Date",
      "Return Due Date",
      "Allocation History",
      "Allocation Reports",
    ],
  },
  {
    id: "asset-transfer",
    title: "Asset Transfer",
    description: "Move assets between employees, departments and locations.",
    icon: Truck,
    items: [
      "Create Transfer",
      "Employee Transfer",
      "Department Transfer",
      "Location Transfer",
      "Warehouse Transfer",
      "Transfer Approval",
      "Dispatch",
      "Receipt Confirmation",
      "Transfer Documents",
      "Transfer Status",
      "Transfer History",
      "Transfer Reports",
    ],
  },
  {
    id: "asset-maintenance",
    title: "Asset Maintenance",
    description: "Manage service requests, repairs and maintenance history.",
    icon: Wrench,
    items: [
      "Maintenance Dashboard",
      "Create Service Request",
      "Open Requests",
      "Scheduled Maintenance",
      "Repair Requests",
      "Maintenance Vendor",
      "Spare Parts",
      "Maintenance Cost",
      "Service Approval",
      "Service Completion",
      "Maintenance History",
      "Maintenance Reports",
    ],
  },
  {
    id: "preventive-maintenance",
    title: "Preventive Maintenance",
    description: "Schedule recurring maintenance to prevent failures.",
    icon: CalendarClock,
    items: [
      "Maintenance Calendar",
      "Maintenance Schedule",
      "Recurring Tasks",
      "Inspection Checklist",
      "Service Frequency",
      "Responsible Team",
      "Vendor Assignment",
      "Maintenance Alerts",
      "Completion Status",
      "Overdue Maintenance",
      "Preventive History",
      "Preventive Reports",
    ],
  },
  {
    id: "breakdown-maintenance",
    title: "Breakdown Maintenance",
    description: "Handle urgent failures, downtime and corrective repairs.",
    icon: AlertTriangle,
    items: [
      "Report Breakdown",
      "Critical Breakdowns",
      "Downtime Tracking",
      "Root Cause",
      "Repair Assignment",
      "Spare Parts Used",
      "Repair Cost",
      "Escalation",
      "Service Completion",
      "Asset Restart",
      "Breakdown History",
      "Breakdown Reports",
    ],
  },
  {
    id: "asset-verification",
    title: "Asset Verification",
    description: "Perform physical checks and reconcile asset records.",
    icon: ClipboardCheck,
    items: [
      "Verification Plan",
      "Physical Verification",
      "Barcode Scan",
      "QR Scan",
      "Location Check",
      "Employee Confirmation",
      "Missing Assets",
      "Damaged Assets",
      "Verification Exceptions",
      "Reconciliation",
      "Verification History",
      "Verification Reports",
    ],
  },
  {
    id: "asset-depreciation",
    title: "Asset Depreciation",
    description: "Track depreciation, net book value and finance postings.",
    icon: FileText,
    items: [
      "Depreciation Dashboard",
      "Depreciation Method",
      "Useful Life",
      "Opening Value",
      "Monthly Depreciation",
      "Accumulated Depreciation",
      "Net Book Value",
      "Finance Posting",
      "Depreciation Adjustment",
      "Depreciation History",
      "Depreciation Reports",
    ],
  },
  {
    id: "asset-disposal",
    title: "Asset Disposal",
    description: "Manage sale, scrap, write-off and retirement of assets.",
    icon: Archive,
    items: [
      "Disposal Request",
      "Asset Sale",
      "Asset Scrap",
      "Asset Write-Off",
      "Disposal Approval",
      "Valuation",
      "Buyer Details",
      "Disposal Documents",
      "Finance Clearance",
      "Asset Deactivation",
      "Disposal History",
      "Disposal Reports",
    ],
  },
  {
    id: "inventory-assets",
    title: "Inventory Assets",
    description: "Track operational tools, equipment and reusable inventory.",
    icon: Warehouse,
    items: [
      "Tools Register",
      "Equipment Register",
      "Reusable Items",
      "Issue Items",
      "Return Items",
      "Stock Balance",
      "Condition Tracking",
      "Storage Location",
      "Consumption",
      "Replacement",
      "Inventory History",
      "Inventory Reports",
    ],
  },
  {
    id: "it-assets",
    title: "IT Assets",
    description: "Manage laptops, systems, devices and technology equipment.",
    icon: Laptop,
    items: [
      "Laptop Register",
      "Desktop Register",
      "Mobile Devices",
      "Printers",
      "Network Devices",
      "Software Licences",
      "Device Assignment",
      "Warranty",
      "IT Maintenance",
      "Data Wipe",
      "IT Asset History",
      "IT Asset Reports",
    ],
  },
  {
    id: "furniture-fixtures",
    title: "Furniture & Fixtures",
    description: "Manage office furniture, fixtures and interior assets.",
    icon: Building2,
    items: [
      "Furniture Register",
      "Desks",
      "Chairs",
      "Cabinets",
      "Fixtures",
      "Lighting",
      "Air Conditioning",
      "Interior Assets",
      "Condition Tracking",
      "Repair",
      "Furniture History",
      "Furniture Reports",
    ],
  },
  {
    id: "vehicles",
    title: "Vehicle Management",
    description: "Manage company vehicles, drivers, service and usage.",
    icon: Truck,
    items: [
      "Vehicle Register",
      "Vehicle Assignment",
      "Driver Assignment",
      "Fuel Tracking",
      "Trip Log",
      "Service Schedule",
      "Insurance",
      "Registration",
      "Permit",
      "Vehicle Expenses",
      "Vehicle History",
      "Vehicle Reports",
    ],
  },
  {
    id: "utilities",
    title: "Utilities Management",
    description: "Track electricity, water, internet and facility utilities.",
    icon: Activity,
    items: [
      "Electricity",
      "Water",
      "Internet",
      "Telephone",
      "Generator",
      "Fuel",
      "Utility Bills",
      "Consumption",
      "Meter Readings",
      "Utility Alerts",
      "Utility History",
      "Utility Reports",
    ],
  },
  {
    id: "security-access",
    title: "Security & Access",
    description: "Manage access cards, keys, CCTV and security operations.",
    icon: KeyRound,
    items: [
      "Access Cards",
      "Physical Keys",
      "Visitor Access",
      "Employee Access",
      "Restricted Areas",
      "CCTV Register",
      "Security Guards",
      "Incident Log",
      "Access Revocation",
      "Access Audit",
      "Security History",
      "Security Reports",
    ],
  },
  {
    id: "space-management",
    title: "Space Management",
    description: "Plan seating, rooms and workplace capacity.",
    icon: MapPin,
    items: [
      "Floor Plans",
      "Workspace Layout",
      "Seat Allocation",
      "Cabins",
      "Meeting Rooms",
      "Common Areas",
      "Storage Areas",
      "Capacity Planning",
      "Occupancy",
      "Space Requests",
      "Space History",
      "Space Reports",
    ],
  },
  {
    id: "workplace-services",
    title: "Workplace Services",
    description: "Manage employee-facing facility services.",
    icon: Users,
    items: [
      "Service Requests",
      "Housekeeping Requests",
      "Pantry Requests",
      "Transport Requests",
      "Parking Requests",
      "Meeting Room Requests",
      "Office Supply Requests",
      "Maintenance Requests",
      "Request Assignment",
      "Service SLA",
      "Request History",
      "Service Reports",
    ],
  },
  {
    id: "facility-vendors",
    title: "Facility Vendors",
    description: "Manage maintenance, housekeeping and facility service partners.",
    icon: Building2,
    items: [
      "Vendor Directory",
      "Maintenance Vendors",
      "Security Vendors",
      "Housekeeping Vendors",
      "Transport Vendors",
      "Utility Vendors",
      "Vendor Contracts",
      "Vendor Performance",
      "Vendor Payments",
      "Vendor Compliance",
      "Vendor History",
      "Vendor Reports",
    ],
  },
  {
    id: "facility-compliance",
    title: "Facility Compliance",
    description: "Track licences, inspections and statutory facility obligations.",
    icon: ShieldCheck,
    items: [
      "Compliance Dashboard",
      "Fire Compliance",
      "Building Compliance",
      "Electrical Safety",
      "Lift Certification",
      "Environmental Compliance",
      "Pollution Control",
      "Occupancy Certificate",
      "Compliance Inspections",
      "Renewals",
      "Compliance History",
      "Compliance Reports",
    ],
  },
  {
    id: "health-safety",
    title: "Health & Safety",
    description: "Manage workplace safety, incidents and emergency readiness.",
    icon: HardHat,
    items: [
      "Safety Dashboard",
      "Safety Inspections",
      "Hazard Register",
      "Near Misses",
      "Safety Incidents",
      "Emergency Plan",
      "Fire Drills",
      "First Aid",
      "PPE",
      "Corrective Actions",
      "Safety History",
      "Safety Reports",
    ],
  },
  {
    id: "facility-projects",
    title: "Facility Projects",
    description: "Manage renovation, relocation and infrastructure projects.",
    icon: Wrench,
    items: [
      "Renovation Projects",
      "New Office Setup",
      "Office Relocation",
      "Expansion Projects",
      "Repair Projects",
      "Capital Works",
      "Project Budget",
      "Contractors",
      "Milestones",
      "Handover",
      "Project History",
      "Project Reports",
    ],
  },
  {
    id: "facility-analytics",
    title: "Facilities Analytics",
    description: "Analyse assets, maintenance, space and operating costs.",
    icon: Activity,
    items: [
      "Asset Analytics",
      "Maintenance Analytics",
      "Space Analytics",
      "Utility Analytics",
      "Vendor Analytics",
      "Cost Analytics",
      "Utilisation Analytics",
      "Downtime Analytics",
      "Safety Analytics",
      "Compliance Analytics",
      "Lifecycle Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "facility-reports",
    title: "Facilities Reports",
    description: "Generate asset, maintenance and facility performance reports.",
    icon: FileBarChart,
    items: [
      "Asset Register Report",
      "Allocation Report",
      "Maintenance Report",
      "Depreciation Report",
      "Disposal Report",
      "Facility Report",
      "Utility Report",
      "Vendor Report",
      "Safety Report",
      "Compliance Report",
      "Space Report",
      "Custom Reports",
    ],
  },
  {
    id: "facility-settings",
    title: "Facilities Settings",
    description: "Configure categories, numbering, workflows and permissions.",
    icon: Settings2,
    items: [
      "Asset ID Format",
      "Asset Categories",
      "Facility Types",
      "Asset Status",
      "Maintenance Rules",
      "Depreciation Rules",
      "Approval Matrix",
      "Service SLA",
      "Notification Settings",
      "Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-facilities",
    title: "KRVE AI Facilities",
    description: "Use AI for maintenance, utilisation and asset decisions.",
    icon: Sparkles,
    items: [
      "AI Maintenance Prediction",
      "AI Asset Replacement",
      "AI Space Optimisation",
      "AI Utility Forecast",
      "AI Cost Analysis",
      "AI Vendor Recommendation",
      "AI Safety Risk Detection",
      "AI Asset Verification",
      "AI Lifecycle Forecast",
      "AI Facility Planning",
      "AI Facilities Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Company Assets", "486", "₹1.84Cr book value", PackageCheck],
  ["Assigned Assets", "412", "Across employees", UserCheck],
  ["Maintenance Due", "16", "Within 30 days", Wrench],
  ["Facility Utilisation", "84%", "Across locations", Building2],
];

export default function FacilitiesAssetsManagement() {
  const [selectedModule, setSelectedModule] =
    useState<FacilityModule | null>(null);
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
            placeholder="Search facilities, assets or workflows..."
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
            Complete Facilities & Asset Operations
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete facilities workspace.
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
              <Building2 size={25} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Workplace & Asset Operations
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Facilities & Assets Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete workplace operations covering facilities, asset register,
            allocation, maintenance, verification, utilities, safety,
            compliance, analytics and KRVE AI Facilities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <UserCheck size={17} />
            Assign Asset
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Add Asset
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
  module: FacilityModule;
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
  module: FacilityModule;
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
          Back to Facilities Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Facilities Workspace
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
        <WorkspaceMetric title="Active Records" value="486" note="Current module" icon={Activity} />
        <WorkspaceMetric title="Pending Actions" value="16" note="Require attention" icon={BellRing} />
        <WorkspaceMetric title="Completed" value="84%" note="Current cycle" icon={CheckCircle2} />
        <WorkspaceMetric title="Reports" value="8" note="Available exports" icon={FileBarChart} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its facilities workflow.
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
    Building2,
    PackageCheck,
    UserCheck,
    Truck,
    Wrench,
    CalendarClock,
    ClipboardCheck,
    Laptop,
    KeyRound,
    MapPin,
    ShieldCheck,
    HardHat,
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