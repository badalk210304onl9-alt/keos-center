"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Download,
  FileBarChart,
  ImageIcon,
  Layers3,
  Package,
  PackageCheck,
  PackageOpen,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tags,
  UploadCloud,
  X,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ProductModule = {
  id: string;
  title: string;
  description: string;
  features: number;
  icon: IconType;
  metric: string;
  metricLabel: string;
};

type WorkspaceContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  statistics: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  workflows: Array<{
    title: string;
    description: string;
  }>;
};

const productModules: ProductModule[] = [
  {
    id: "products-dashboard",
    title: "Products Dashboard",
    description:
      "Monitor catalogue size, active products, drafts, stock risk and inventory value.",
    features: 10,
    icon: Package,
    metric: "7",
    metricLabel: "Total products",
  },
  {
    id: "product-catalogue",
    title: "Product Catalogue",
    description:
      "Create, edit, organise and publish the complete KRVE product catalogue.",
    features: 12,
    icon: ShoppingBag,
    metric: "7",
    metricLabel: "Catalogue items",
  },
  {
    id: "product-variants",
    title: "Product Variants",
    description:
      "Manage size, colour, material, fit and SKU-level product variations.",
    features: 12,
    icon: Layers3,
    metric: "24",
    metricLabel: "Active variants",
  },
  {
    id: "collections",
    title: "Collections",
    description:
      "Create curated seasonal, campaign and merchandising collections.",
    features: 10,
    icon: Boxes,
    metric: "6",
    metricLabel: "Collections",
  },
  {
    id: "categories",
    title: "Categories",
    description:
      "Manage product categories, subcategories and catalogue hierarchy.",
    features: 10,
    icon: Tags,
    metric: "12",
    metricLabel: "Categories",
  },
  {
    id: "product-media",
    title: "Product Media",
    description:
      "Manage product images, videos, thumbnails and media ordering.",
    features: 11,
    icon: ImageIcon,
    metric: "42",
    metricLabel: "Media assets",
  },
  {
    id: "pricing",
    title: "Pricing",
    description:
      "Manage selling price, cost price, compare-at price and margin controls.",
    features: 12,
    icon: CircleDollarSign,
    metric: "₹7,85,500",
    metricLabel: "Inventory value",
  },
  {
    id: "product-inventory",
    title: "Product Inventory",
    description:
      "Track stock by product, variant, warehouse and commerce channel.",
    features: 12,
    icon: PackageOpen,
    metric: "149",
    metricLabel: "Units available",
  },
  {
    id: "low-stock",
    title: "Low Stock",
    description:
      "Review products below reorder level and initiate stock replenishment.",
    features: 9,
    icon: AlertTriangle,
    metric: "2",
    metricLabel: "Low-stock products",
  },
  {
    id: "out-of-stock",
    title: "Out of Stock",
    description:
      "Monitor unavailable products and restore product availability.",
    features: 9,
    icon: X,
    metric: "1",
    metricLabel: "Unavailable products",
  },
  {
    id: "draft-products",
    title: "Draft Products",
    description:
      "Review incomplete products before approval and publication.",
    features: 10,
    icon: PackageOpen,
    metric: "1",
    metricLabel: "Draft product",
  },
  {
    id: "publishing",
    title: "Publishing Channels",
    description:
      "Control product visibility across website, app and marketplace channels.",
    features: 11,
    icon: UploadCloud,
    metric: "3",
    metricLabel: "Publishing channels",
  },
  {
    id: "product-search",
    title: "Search & Visibility",
    description:
      "Manage product SEO, keywords, search ranking and discoverability.",
    features: 10,
    icon: Search,
    metric: "94%",
    metricLabel: "Search visibility",
  },
  {
    id: "product-reports",
    title: "Product Reports",
    description:
      "Generate catalogue, pricing, inventory and product-performance reports.",
    features: 10,
    icon: FileBarChart,
    metric: "14",
    metricLabel: "Report templates",
  },
];

const workspaceContent: Record<string, WorkspaceContent> = {
  "products-dashboard": {
    eyebrow: "Product Commerce Center",
    title: "Products Dashboard",
    description:
      "Manage the complete KRVE product catalogue, variants, categories, collections, pricing, inventory and publishing channels.",
    primaryAction: "Sync Products",
    secondaryAction: "Add Product",
    statistics: [
      { label: "Total Products", value: "7", note: "Complete catalogue" },
      { label: "Active", value: "5", note: "Published products" },
      { label: "Drafts", value: "1", note: "Not yet published" },
      { label: "Low Stock", value: "2", note: "Reorder required" },
    ],
    workflows: [
      {
        title: "Catalogue Management",
        description:
          "Create and maintain product names, descriptions, categories and media.",
      },
      {
        title: "Variant & Pricing",
        description:
          "Manage size, colour, SKU, price, margin and availability.",
      },
      {
        title: "Inventory Control",
        description:
          "Track stock, low-stock thresholds and channel availability.",
      },
      {
        title: "Publishing & Visibility",
        description:
          "Publish approved products to website, app and marketplace channels.",
      },
    ],
  },
  "product-catalogue": {
    eyebrow: "Catalogue Operations",
    title: "Product Catalogue",
    description:
      "Create, edit, approve and publish the complete KRVE product range.",
    primaryAction: "Sync Products",
    secondaryAction: "Add Product",
    statistics: [
      { label: "Catalogue Items", value: "7", note: "All KRVE products" },
      { label: "Published", value: "5", note: "Visible to customers" },
      { label: "Drafts", value: "1", note: "Pending completion" },
      { label: "Archived", value: "1", note: "Not currently available" },
    ],
    workflows: [
      {
        title: "Product Information",
        description:
          "Manage title, description, brand, category and product attributes.",
      },
      {
        title: "Media & Merchandising",
        description:
          "Upload images and organise product presentation.",
      },
      {
        title: "Approval & Publishing",
        description:
          "Review product completeness and publish to selected channels.",
      },
      {
        title: "Catalogue History",
        description:
          "Review product edits, publishing changes and archived versions.",
      },
    ],
  },
  "product-inventory": {
    eyebrow: "Product Stock Control",
    title: "Product Inventory",
    description:
      "Track product and variant stock across warehouses and sales channels.",
    primaryAction: "Sync Inventory",
    secondaryAction: "Adjust Stock",
    statistics: [
      { label: "Units Available", value: "149", note: "Across all products" },
      { label: "Low Stock", value: "2", note: "Reorder required" },
      { label: "Out of Stock", value: "1", note: "Unavailable product" },
      { label: "Inventory Value", value: "₹7,85,500", note: "Current valuation" },
    ],
    workflows: [
      {
        title: "Stock Directory",
        description:
          "Review quantity by product, variant and warehouse.",
      },
      {
        title: "Stock Adjustment",
        description:
          "Record corrections, damages and manual inventory changes.",
      },
      {
        title: "Reorder Monitoring",
        description:
          "Track low-stock thresholds and replenishment requirements.",
      },
      {
        title: "Channel Availability",
        description:
          "Synchronise available stock across commerce channels.",
      },
    ],
  },
  pricing: {
    eyebrow: "Commercial Pricing",
    title: "Pricing",
    description:
      "Manage product cost, selling price, margins, discounts and price publication.",
    primaryAction: "Update Pricing",
    secondaryAction: "Export Price List",
    statistics: [
      { label: "Inventory Value", value: "₹7,85,500", note: "Current stock value" },
      { label: "Average Margin", value: "42%", note: "Across active products" },
      { label: "Price Changes", value: "3", note: "Pending approval" },
      { label: "Discounted Products", value: "2", note: "Current campaigns" },
    ],
    workflows: [
      {
        title: "Cost & Selling Price",
        description:
          "Maintain cost, MRP, selling and compare-at prices.",
      },
      {
        title: "Margin Control",
        description:
          "Review gross margin and pricing thresholds.",
      },
      {
        title: "Discount Governance",
        description:
          "Approve campaign and product-level discounts.",
      },
      {
        title: "Price Publication",
        description:
          "Publish approved prices to all commerce channels.",
      },
    ],
  },
};

export default function ProductsManagement() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return productModules;
    }

    return productModules.filter((module) =>
      `${module.title} ${module.description}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const activeModule =
    productModules.find((module) => module.id === activeModuleId) ?? null;

  if (activeModule) {
    return (
      <>
        <ProductWorkspace
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
          onSync={() => setShowSyncModal(true)}
          onAdd={() => setShowAddModal(true)}
        />

        {showSyncModal && (
          <SyncProductsModal onClose={() => setShowSyncModal(false)} />
        )}

        {showAddModal && (
          <AddProductModal onClose={() => setShowAddModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <Package size={23} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                  Product Commerce Center
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Product Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Manage the complete KRVE product catalogue, variants, categories,
                collections, pricing, inventory, publishing channels and search visibility.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSyncModal(true)}
                  className="flex min-w-[170px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
                >
                  <RefreshCw size={18} />
                  Sync Products
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
                >
                  <Download size={18} />
                  Export
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
          <SummaryCard
            title="Total Products"
            value="7"
            description="Complete catalogue"
            icon={Package}
            iconClassName="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            title="Active"
            value="5"
            description="Published products"
            icon={PackageCheck}
            iconClassName="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            title="Drafts"
            value="1"
            description="Not yet published"
            icon={PackageOpen}
            iconClassName="bg-orange-50 text-orange-600"
          />
          <SummaryCard
            title="Low Stock"
            value="2"
            description="Reorder required"
            icon={AlertTriangle}
            iconClassName="bg-red-50 text-red-600"
          />
          <SummaryCard
            title="Out of Stock"
            value="1"
            description="Unavailable products"
            icon={X}
            iconClassName="bg-violet-50 text-violet-600"
          />
          <SummaryCard
            title="Inventory Value"
            value="₹7,85,500"
            description="149 units available"
            icon={CircleDollarSign}
            iconClassName="bg-blue-50 text-blue-600"
          />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                Product Control Center
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Catalogue Management Modules
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Open a module to manage its complete catalogue and product workflow.
              </p>
            </div>

            <div className="relative w-full xl:w-[330px]">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search product modules..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <ProductModuleCard
                key={module.id}
                module={module}
                onOpen={() => setActiveModuleId(module.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {showSyncModal && (
        <SyncProductsModal onClose={() => setShowSyncModal(false)} />
      )}

      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
    </>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: string;
  description: string;
  icon: IconType;
  iconClassName: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${iconClassName}`}>
        <Icon size={20} />
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-3 text-xs text-slate-400">{description}</p>
    </article>
  );
}

function ProductModuleCard({
  module,
  onOpen,
}: {
  module: ProductModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <article className="group flex min-h-[255px] flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          <Icon size={21} />
        </div>

        <div className="text-right">
          <p className="text-lg font-black text-slate-950">{module.metric}</p>
          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            {module.metricLabel}
          </p>
        </div>
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">{module.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">{module.description}</p>

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-xs font-bold text-slate-400">
          {module.features} features
        </span>

        <button
          type="button"
          onClick={onOpen}
          className="flex items-center gap-2 text-sm font-black text-blue-600 transition group-hover:gap-3"
        >
          Open
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

function ProductWorkspace({
  module,
  onBack,
  onSync,
  onAdd,
}: {
  module: ProductModule;
  onBack: () => void;
  onSync: () => void;
  onAdd: () => void;
}) {
  const Icon = module.icon;

  const content =
    workspaceContent[module.id] ?? {
      eyebrow: "Product Commerce Center",
      title: module.title,
      description: module.description,
      primaryAction: "Sync Products",
      secondaryAction: "Add Product",
      statistics: [
        {
          label: module.metricLabel,
          value: module.metric,
          note: "Current product status",
        },
        { label: "Active Records", value: "5", note: "Currently published" },
        { label: "Pending Actions", value: "2", note: "Require review" },
        { label: "Catalogue Health", value: "96%", note: "Within target" },
      ],
      workflows: [
        {
          title: "Product Configuration",
          description:
            "Manage product records, attributes, media and organisation.",
        },
        {
          title: "Pricing & Inventory",
          description:
            "Control price, margin, stock and availability.",
        },
        {
          title: "Approval & Publishing",
          description:
            "Review completeness and publish to selected channels.",
        },
        {
          title: "Reporting & Audit",
          description:
            "Generate product reports and retain complete history.",
        },
      ],
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeft size={17} />
        Back to Products
      </button>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white shadow-xl sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={23} />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                {content.eyebrow}
              </p>
            </div>

            <h1 className="mt-6 text-3xl font-black sm:text-4xl">
              {content.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              {content.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onSync}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <RefreshCw size={17} />
              {content.primaryAction}
            </button>

            <button
              type="button"
              onClick={onAdd}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              <Plus size={17} />
              {content.secondaryAction}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {content.statistics.map((statistic, index) => (
          <article
            key={statistic.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div
              className={`grid h-11 w-11 place-items-center rounded-xl ${
                index === 0
                  ? "bg-blue-50 text-blue-600"
                  : index === 1
                    ? "bg-emerald-50 text-emerald-600"
                    : index === 2
                      ? "bg-orange-50 text-orange-600"
                      : "bg-violet-50 text-violet-600"
              }`}
            >
              <Icon size={20} />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              {statistic.label}
            </p>
            <p className="mt-1 text-3xl font-black text-slate-950">
              {statistic.value}
            </p>
            <p className="mt-3 text-xs text-slate-400">{statistic.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
            Operational Workspace
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {module.title} Workflows
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.workflows.map((workflow, index) => (
              <div
                key={workflow.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950">{workflow.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {workflow.description}
                    </p>

                    <button
                      type="button"
                      className="mt-4 flex items-center gap-2 text-xs font-black text-blue-600"
                    >
                      Open Workflow
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600">
              <Sparkles size={22} />
            </div>

            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
              AI Active
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black">
            KRVE AI Product Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Catalogue health is stable. Two low-stock products and one unavailable
            product require inventory action.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow label="Active products" value="5" />
            <InsightRow label="Low stock" value="2" />
            <InsightRow label="Out of stock" value="1" />
            <InsightRow label="Inventory value" value="₹7,85,500" />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Generate Product Analysis
            <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
  );
}

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

function SyncProductsModal({ onClose }: { onClose: () => void }) {
  const [synced, setSynced] = useState(false);

  return (
    <ModalShell
      title="Sync Products"
      description="Synchronise product data across connected commerce channels."
      icon={RefreshCw}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="p-6">
        <SelectField
          label="Commerce Channel"
          options={[
            "All Connected Channels",
            "KRVE Website",
            "KRVE App",
            "Marketplace",
          ]}
        />

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <p className="text-sm leading-6 text-blue-700">
              KEOS will synchronise product information, pricing, stock and publishing status.
            </p>
          </div>
        </div>

        {synced && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <p className="text-sm font-bold text-emerald-700">
              Product synchronisation completed successfully.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => setSynced(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <RefreshCw size={17} />
          Start Sync
        </button>
      </div>
    </ModalShell>
  );
}

function AddProductModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Add Product"
      description="Create a new KRVE catalogue product."
      icon={Plus}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[65vh] overflow-y-auto p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Product Name" placeholder="Enter product name" />
          <FormField label="SKU" placeholder="Example: KRVE-BLZ-001" />
          <SelectField
            label="Category"
            options={[
              "Blazers",
              "Suits",
              "Shirts",
              "Trousers",
              "Shoes",
              "Accessories",
            ]}
          />
          <SelectField
            label="Product Status"
            options={[
              "Draft",
              "Active",
              "Archived",
            ]}
          />
          <FormField
            label="Selling Price"
            placeholder="Enter selling price"
            type="number"
          />
          <FormField
            label="Cost Price"
            placeholder="Enter cost price"
            type="number"
          />
          <FormField
            label="Opening Stock"
            placeholder="Enter opening quantity"
            type="number"
          />
          <SelectField
            label="Publishing Channel"
            options={[
              "KRVE Website",
              "KRVE App",
              "All Channels",
              "Draft Only",
            ]}
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-black text-slate-700">
            Product Description
          </label>
          <textarea
            rows={5}
            placeholder="Enter product description"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center">
          <ImageIcon size={34} className="mx-auto text-blue-600" />
          <h3 className="mt-4 font-black text-slate-950">
            Upload Product Media
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Add product images and videos.
          </p>
          <button
            type="button"
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
          >
            Choose Files
          </button>
        </div>

        {saved && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="text-sm font-bold text-emerald-700">
              Product created successfully.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => setSaved(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          Create Product
        </button>
      </div>
    </ModalShell>
  );
}

function ModalShell({
  title,
  description,
  icon: Icon,
  onClose,
  children,
  maxWidth = "max-w-3xl",
}: {
  title: string;
  description: string;
  icon: IconType;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${maxWidth} overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] px-6 py-5 text-white">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <Icon size={21} />
            </div>

            <div>
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-blue-100">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <select className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}