"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileBarChart,
  FileText,
  MapPin,
  PackageCheck,
  Plus,
  Printer,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  Truck,
  Warehouse,
  X,
} from "lucide-react";

type IconType = ComponentType<{ size?: number; className?: string }>;

type ShippingModule = {
  id: string;
  title: string;
  description: string;
  features: number;
  icon: IconType;
  metric: string;
  metricLabel: string;
};

const modules: ShippingModule[] = [
  { id: "dashboard", title: "Shipping Dashboard", description: "Monitor shipment volume, delivery performance, exceptions and courier operations.", features: 10, icon: BarChart3, metric: "86", metricLabel: "Shipments today" },
  { id: "shipments", title: "Shipments", description: "Create, process and manage shipments across all commerce channels.", features: 12, icon: Truck, metric: "142", metricLabel: "In transit" },
  { id: "couriers", title: "Courier Partners", description: "Manage courier integrations, accounts, service levels and performance.", features: 12, icon: Warehouse, metric: "4", metricLabel: "Active couriers" },
  { id: "tracking", title: "Shipment Tracking", description: "Track live shipment events, delivery progress and customer updates.", features: 11, icon: MapPin, metric: "142", metricLabel: "Live shipments" },
  { id: "labels", title: "Shipping Labels", description: "Generate, print and reprint courier labels and package documents.", features: 10, icon: Printer, metric: "86", metricLabel: "Labels today" },
  { id: "manifests", title: "Manifests", description: "Create dispatch manifests and record courier handover confirmation.", features: 10, icon: FileText, metric: "8", metricLabel: "Open manifests" },
  { id: "exceptions", title: "Delivery Exceptions", description: "Review delayed, failed, damaged and address-related exceptions.", features: 12, icon: AlertTriangle, metric: "7", metricLabel: "Require action" },
  { id: "ndr", title: "NDR Management", description: "Manage non-delivery reports, customer contact and reattempt decisions.", features: 11, icon: ClipboardCheck, metric: "5", metricLabel: "Open NDR cases" },
  { id: "rto", title: "RTO Management", description: "Track return-to-origin shipments, costs, reasons and warehouse receipt.", features: 11, icon: RotateCcw, metric: "3", metricLabel: "RTO shipments" },
  { id: "rates", title: "Shipping Rates", description: "Compare courier rates, service levels, zones and delivery timelines.", features: 10, icon: Tags, metric: "24", metricLabel: "Rate cards" },
  { id: "performance", title: "Shipping Performance", description: "Analyse delivery rate, courier SLA, cost, delay and RTO performance.", features: 12, icon: BarChart3, metric: "96.4%", metricLabel: "Delivery rate" },
  { id: "reports", title: "Shipping Reports", description: "Generate shipment, courier, delivery, exception, NDR and RTO reports.", features: 10, icon: FileBarChart, metric: "14", metricLabel: "Report templates" },
];

export default function ShippingManagement() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [shipmentOpen, setShipmentOpen] = useState(false);
  const [labelsOpen, setLabelsOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? modules.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(q)) : modules;
  }, [query]);

  const active = modules.find((item) => item.id === activeId) ?? null;

  if (active) {
    return (
      <>
        <Workspace item={active} onBack={() => setActiveId(null)} onCreate={() => setShipmentOpen(true)} onLabels={() => setLabelsOpen(true)} />
        {shipmentOpen && <CreateShipmentModal onClose={() => setShipmentOpen(false)} />}
        {labelsOpen && <PrintLabelsModal onClose={() => setLabelsOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <Hero onCreate={() => setShipmentOpen(true)} onLabels={() => setLabelsOpen(true)} />

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <Metric title="Shipments Today" value="86" note="Across all couriers" icon={Truck} tone="blue" />
          <Metric title="In Transit" value="142" note="Live shipments" icon={MapPin} tone="green" />
          <Metric title="Delivered" value="96.4%" note="Successful delivery rate" icon={BadgeCheck} tone="violet" />
          <Metric title="Delivery Exceptions" value="7" note="Require attention" icon={AlertTriangle} tone="orange" />
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Shipping Control Center</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">Delivery Operations Modules</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Open a module to manage its complete shipping and delivery workflow.</p>
            </div>
            <div className="relative w-full xl:w-[330px]">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search shipping modules..." className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => <ModuleCard key={item.id} item={item} onOpen={() => setActiveId(item.id)} />)}
          </div>
        </section>
      </div>

      {shipmentOpen && <CreateShipmentModal onClose={() => setShipmentOpen(false)} />}
      {labelsOpen && <PrintLabelsModal onClose={() => setLabelsOpen(false)} />}
    </>
  );
}

function Hero({ onCreate, onLabels }: { onCreate: () => void; onLabels: () => void }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#172554] p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><Truck size={23} /></div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">Delivery Operations</p>
          </div>
          <h1 className="mt-6 text-3xl font-black sm:text-4xl">Shipping Management</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">Manage courier partners, shipments, tracking, labels, manifests, delivery exceptions, RTO, rates and shipping performance.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
          <button onClick={onLabels} className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold hover:bg-white/20"><Printer size={18} />Print Labels</button>
          <button onClick={onCreate} className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-blue-700 hover:bg-blue-50"><Plus size={18} />Create Shipment</button>
        </div>
      </div>
    </section>
  );
}

function Metric({ title, value, note, icon: Icon, tone }: { title: string; value: string; note: string; icon: IconType; tone: "blue" | "green" | "violet" | "orange" }) {
  const tones = { blue: "bg-blue-50 text-blue-600", green: "bg-emerald-50 text-emerald-600", violet: "bg-violet-50 text-violet-600", orange: "bg-orange-50 text-orange-600" };
  return <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}><Icon size={20} /></div><p className="mt-5 text-sm font-semibold text-slate-500">{title}</p><p className="mt-1 text-3xl font-black text-slate-950">{value}</p><p className="mt-3 text-xs text-slate-400">{note}</p></article>;
}

function ModuleCard({ item, onOpen }: { item: ShippingModule; onOpen: () => void }) {
  const Icon = item.icon;
  return <article className="group flex min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg"><div className="flex items-start justify-between gap-4"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"><Icon size={21} /></div><div className="text-right"><p className="text-lg font-black text-slate-950">{item.metric}</p><p className="mt-1 text-[10px] font-semibold text-slate-400">{item.metricLabel}</p></div></div><h3 className="mt-5 text-base font-black text-slate-950">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p><div className="mt-auto flex items-center justify-between pt-6"><span className="text-xs font-bold text-slate-400">{item.features} features</span><button onClick={onOpen} className="flex items-center gap-2 text-sm font-black text-blue-600">Open<ArrowRight size={16} /></button></div></article>;
}

function Workspace({ item, onBack, onCreate, onLabels }: { item: ShippingModule; onBack: () => void; onCreate: () => void; onLabels: () => void }) {
  const Icon = item.icon;
  return <div className="p-4 sm:p-6 lg:p-8"><button onClick={onBack} className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700"><ArrowLeft size={17} />Back to Shipping</button><Hero onCreate={onCreate} onLabels={onLabels} /><section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"><Metric title={item.metricLabel} value={item.metric} note="Current operational status" icon={Icon} tone="blue" /><Metric title="Open Actions" value="7" note="Require processing" icon={AlertTriangle} tone="orange" /><Metric title="Completed Today" value="74" note="Across couriers" icon={PackageCheck} tone="green" /><Metric title="Operational Health" value="96.4%" note="Within target" icon={BadgeCheck} tone="violet" /></section><section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]"><article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Operational Workspace</p><h2 className="mt-2 text-2xl font-black text-slate-950">{item.title} Workflows</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{["Configuration & Setup", "Operational Processing", "Exception Handling", "Reporting & Audit"].map((title, index) => <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"><div className="flex items-start gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white">{index + 1}</div><div><h3 className="font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">Manage the complete {item.title.toLowerCase()} workflow with controlled processing and audit visibility.</p><button className="mt-4 flex items-center gap-2 text-xs font-black text-blue-600">Open Workflow<ArrowRight size={14} /></button></div></div></div>)}</div></article><article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl"><div className="flex items-center justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600"><Sparkles size={22} /></div><span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">AI Active</span></div><h2 className="mt-6 text-xl font-black">KRVE AI Shipping Insight</h2><p className="mt-3 text-sm leading-7 text-slate-400">Delivery performance is stable. Seven exceptions and five NDR cases require attention.</p><div className="mt-6 space-y-3">{[["Delivery rate", "96.4%"], ["In transit", "142"], ["Exceptions", "7"], ["Open NDR", "5"]].map(([label, value]) => <div key={label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"><span className="text-sm text-slate-400">{label}</span><span className="text-sm font-black text-white">{value}</span></div>)}</div></article></section></div>;
}

function CreateShipmentModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);
  return <Modal title="Create Shipment" description="Create a new shipment from a fulfilled order." icon={Truck} onClose={onClose}><div className="grid gap-5 md:grid-cols-2"><Select label="Order" options={["ORD-2026-1001", "ORD-2026-1002", "ORD-2026-1003"]} /><Select label="Courier Partner" options={["Shiprocket", "Delhivery", "Blue Dart", "DTDC"]} /><Input label="Package Weight" placeholder="Weight in kg" /><Input label="Dimensions" placeholder="L × W × H" /><Select label="Service" options={["Standard", "Express", "Same Day", "Surface"]} /><Select label="Payment Type" options={["Prepaid", "Cash on Delivery"]} /></div>{saved && <Success text="Shipment created successfully." />}<Footer onClose={onClose} onSave={() => setSaved(true)} label="Create Shipment" /></Modal>;
}

function PrintLabelsModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);
  return <Modal title="Print Shipping Labels" description="Generate labels for selected shipments." icon={Printer} onClose={onClose}><div className="grid gap-5"><Select label="Shipment Selection" options={["All Ready Shipments", "Today’s Shipments", "Selected Courier", "Selected Shipments"]} /><Select label="Label Format" options={["A4 — 4 Labels", "A4 — 2 Labels", "4 × 6 Thermal", "Courier Default"]} /></div>{saved && <Success text="Shipping labels generated successfully." />}<Footer onClose={onClose} onSave={() => setSaved(true)} label="Generate Labels" /></Modal>;
}

function Modal({ title, description, icon: Icon, onClose, children }: { title: string; description: string; icon: IconType; onClose: () => void; children: ReactNode }) {
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"><div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"><div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#172554] px-6 py-5 text-white"><div className="flex items-start gap-4"><div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><Icon size={21} /></div><div><h2 className="text-xl font-black">{title}</h2><p className="mt-1 text-sm text-blue-100">{description}</p></div></div><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><X size={19} /></button></div><div className="max-h-[65vh] overflow-y-auto p-6">{children}</div></div></div>;
}

function Input({ label, placeholder }: { label: string; placeholder: string }) { return <label className="block"><span className="text-sm font-black text-slate-700">{label}</span><input placeholder={placeholder} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>; }
function Select({ label, options }: { label: string; options: string[] }) { return <label className="block"><span className="text-sm font-black text-slate-700">{label}</span><select className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"><option value="">Select {label}</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
function Success({ text }: { text: string }) { return <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><CheckCircle2 size={20} className="text-emerald-600" /><p className="text-sm font-bold text-emerald-700">{text}</p></div>; }
function Footer({ onClose, onSave, label }: { onClose: () => void; onSave: () => void; label: string }) { return <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end"><button onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Close</button><button onClick={onSave} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"><Plus size={17} />{label}</button></div>; }