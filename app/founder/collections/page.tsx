"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowUp, Check, ChevronDown, ChevronRight, CirclePlus,
  FolderTree, Layers3, LoaderCircle, Pencil, Plus, Search, Shirt,
  Sparkles, Tags, Trash2, X,
} from "lucide-react";

type Subcategory = { id: string; name: string; active: boolean; sortOrder: number };
type CategoryGroup = { id: string; name: string; active: boolean; sortOrder: number; subcategories: Subcategory[] };
type MainCategory = { id: string; name: string; slug: string; active: boolean; sortOrder: number; groups: CategoryGroup[] };

const starterCollections: MainCategory[] = [
  { id: "menswear", name: "Men's Wear", slug: "menswear", active: true, sortOrder: 1, groups: [
    { id: "mens-topwear", name: "Top Wear", active: true, sortOrder: 1, subcategories: [
      { id: "mens-tshirts", name: "T-Shirts", active: true, sortOrder: 1 },
      { id: "mens-formal-shirts", name: "Formal Shirts", active: true, sortOrder: 2 },
      { id: "mens-casual-shirts", name: "Casual Shirts", active: true, sortOrder: 3 },
    ] },
    { id: "mens-bottomwear", name: "Bottom Wear", active: true, sortOrder: 2, subcategories: [
      { id: "mens-jeans", name: "Jeans", active: true, sortOrder: 1 },
      { id: "mens-casual-trousers", name: "Casual Trousers", active: true, sortOrder: 2 },
      { id: "mens-formal-trousers", name: "Formal Trousers", active: true, sortOrder: 3 },
      { id: "mens-track-pants", name: "Track Pants", active: true, sortOrder: 4 },
      { id: "mens-shorts", name: "Shorts", active: true, sortOrder: 5 },
    ] },
    { id: "mens-winterwear", name: "Winter Wear", active: true, sortOrder: 3, subcategories: [
      { id: "mens-sweatshirts", name: "Sweatshirts", active: true, sortOrder: 1 },
      { id: "mens-jackets", name: "Jackets", active: true, sortOrder: 2 },
      { id: "mens-sweaters", name: "Sweaters", active: true, sortOrder: 3 },
    ] },
    { id: "mens-ethnicwear", name: "Ethnic Wear", active: true, sortOrder: 4, subcategories: [
      { id: "mens-kurta", name: "Kurta", active: true, sortOrder: 1 },
      { id: "mens-ethnic-sets", name: "Ethnic Sets", active: true, sortOrder: 2 },
      { id: "mens-sherwanis", name: "Sherwanis", active: true, sortOrder: 3 },
    ] },
  ] },
  { id: "womenswear", name: "Women's Wear", slug: "womenswear", active: true, sortOrder: 2, groups: [
    { id: "womens-topwear", name: "Top Wear", active: true, sortOrder: 1, subcategories: [
      { id: "womens-tops", name: "Tops", active: true, sortOrder: 1 },
      { id: "womens-shirts", name: "Shirts & Blouses", active: true, sortOrder: 2 },
    ] },
    { id: "womens-bottomwear", name: "Bottom Wear", active: true, sortOrder: 2, subcategories: [
      { id: "womens-jeans", name: "Jeans", active: true, sortOrder: 1 },
      { id: "womens-trousers", name: "Trousers", active: true, sortOrder: 2 },
    ] },
    { id: "womens-ethnicwear", name: "Ethnic Wear", active: true, sortOrder: 3, subcategories: [
      { id: "womens-kurtis", name: "Kurtis", active: true, sortOrder: 1 },
      { id: "womens-coords", name: "Co-ord Sets", active: true, sortOrder: 2 },
    ] },
  ] },
  { id: "kidswear", name: "Kids' Wear", slug: "kidswear", active: true, sortOrder: 3, groups: [
    { id: "kids-everyday", name: "Everyday Wear", active: true, sortOrder: 1, subcategories: [
      { id: "kids-tshirts", name: "T-Shirts", active: true, sortOrder: 1 },
      { id: "kids-shirts", name: "Shirts", active: true, sortOrder: 2 },
      { id: "kids-sets", name: "Sets & Co-ords", active: true, sortOrder: 3 },
    ] },
    { id: "kids-bottomwear", name: "Bottom Wear", active: true, sortOrder: 2, subcategories: [
      { id: "kids-jeans", name: "Jeans", active: true, sortOrder: 1 },
      { id: "kids-shorts", name: "Shorts", active: true, sortOrder: 2 },
    ] },
  ] },
];

const makeId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function ManageCollectionsPage() {
  const [collections, setCollections] = useState<MainCategory[]>(starterCollections);
  const [selectedId, setSelectedId] = useState("menswear");
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["mens-topwear", "mens-bottomwear"]);
  const [search, setSearch] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showAddSubcategory, setShowAddSubcategory] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [editing, setEditing] = useState<{ type: "category" | "group" | "subcategory"; categoryId: string; groupId?: string; itemId: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/keos/collections", { cache: "no-store" });
        if (!response.ok) throw new Error("Collections API is not connected yet");
        const payload = await response.json();
        const data = payload?.data?.collections ?? payload?.data;
        if (!cancelled && Array.isArray(data) && data.length) setCollections(data);
        if (!cancelled) setApiReady(true);
      } catch {
        if (!cancelled) setNotice("Preview mode: collections API ko abhi connect karna baaki hai. Changes abhi permanently save nahi honge.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const selected = collections.find((item) => item.id === selectedId) ?? collections[0];
  const totalGroups = collections.reduce((sum, item) => sum + item.groups.length, 0);
  const totalSubcategories = collections.reduce((sum, item) => sum + item.groups.reduce((n, group) => n + group.subcategories.length, 0), 0);
  const filteredGroups = useMemo(() => {
    if (!selected) return [];
    const term = search.trim().toLowerCase();
    if (!term) return selected.groups;
    return selected.groups.map((group) => ({ ...group, subcategories: group.subcategories.filter((item) => item.name.toLowerCase().includes(term)) }))
      .filter((group) => group.name.toLowerCase().includes(term) || group.subcategories.length > 0);
  }, [selected, search]);

  function updateCollections(updater: (current: MainCategory[]) => MainCategory[]) {
    setCollections((current) => updater(current));
    setNotice(apiReady ? "Unsaved changes — click Save Changes." : "Preview mode: changes are temporary until the Collections API is connected.");
  }

  function addCategory() {
    const name = newName.trim(); if (!name) return;
    const id = slugify(name) || makeId("category");
    const item: MainCategory = { id: makeId(id), name, slug: id, active: true, sortOrder: collections.length + 1, groups: [] };
    updateCollections((current) => [...current, item]); setSelectedId(item.id); setNewName(""); setShowAddCategory(false);
  }
  function addGroup() {
    if (!selected || !newGroupName.trim()) return;
    const item: CategoryGroup = { id: makeId("group"), name: newGroupName.trim(), active: true, sortOrder: selected.groups.length + 1, subcategories: [] };
    updateCollections((current) => current.map((category) => category.id === selected.id ? { ...category, groups: [...category.groups, item] } : category));
    setExpandedGroups((current) => [...current, item.id]); setNewGroupName(""); setShowAddGroup(false);
  }
  function addSubcategory(groupId: string) {
    if (!selected || !newName.trim()) return;
    updateCollections((current) => current.map((category) => category.id !== selected.id ? category : ({ ...category, groups: category.groups.map((group) => group.id !== groupId ? group : ({ ...group, subcategories: [...group.subcategories, { id: makeId("subcategory"), name: newName.trim(), active: true, sortOrder: group.subcategories.length + 1 }] })) })));
    setExpandedGroups((current) => current.includes(groupId) ? current : [...current, groupId]); setNewName(""); setShowAddSubcategory(null);
  }
  function saveEdit() {
    if (!editing || !editing.name.trim()) return;
    updateCollections((current) => current.map((category) => {
      if (category.id !== editing.categoryId) return category;
      if (editing.type === "category") return { ...category, name: editing.name.trim(), slug: slugify(editing.name) };
      return { ...category, groups: category.groups.map((group) => {
        if (editing.type === "group" && group.id === editing.itemId) return { ...group, name: editing.name.trim() };
        if (editing.type === "subcategory" && group.id === editing.groupId) return { ...group, subcategories: group.subcategories.map((sub) => sub.id === editing.itemId ? { ...sub, name: editing.name.trim() } : sub) };
        return group;
      }) };
    }));
    setEditing(null);
  }
  function toggleActive(type: "category" | "group" | "subcategory", categoryId: string, itemId: string, groupId?: string) {
    updateCollections((current) => current.map((category) => {
      if (category.id !== categoryId) return category;
      if (type === "category") return { ...category, active: !category.active };
      return { ...category, groups: category.groups.map((group) => {
        if (type === "group" && group.id === itemId) return { ...group, active: !group.active };
        if (type === "subcategory" && group.id === groupId) return { ...group, subcategories: group.subcategories.map((sub) => sub.id === itemId ? { ...sub, active: !sub.active } : sub) };
        return group;
      }) };
    }));
  }
  function deleteItem(type: "category" | "group" | "subcategory", categoryId: string, itemId: string, groupId?: string) {
    const label = type === "category" ? "category" : type === "group" ? "group" : "subcategory";
    if (!window.confirm(`Delete this ${label}? This will remove it from the collection structure.`)) return;
    updateCollections((current) => current.flatMap((category) => {
      if (category.id !== categoryId) return [category];
      if (type === "category") return [];
      return [{ ...category, groups: category.groups.flatMap((group) => {
        if (type === "group" && group.id === itemId) return [];
        if (type === "subcategory" && group.id === groupId) return [{ ...group, subcategories: group.subcategories.filter((sub) => sub.id !== itemId) }];
        return [group];
      }) }];
    }));
    if (type === "category" && selectedId === categoryId) setSelectedId(collections.find((item) => item.id !== categoryId)?.id ?? "");
  }
  function moveGroup(groupId: string, direction: -1 | 1) {
    if (!selected) return;
    updateCollections((current) => current.map((category) => {
      if (category.id !== selected.id) return category;
      const groups = [...category.groups]; const index = groups.findIndex((group) => group.id === groupId); const target = index + direction;
      if (index < 0 || target < 0 || target >= groups.length) return category;
      [groups[index], groups[target]] = [groups[target], groups[index]];
      return { ...category, groups: groups.map((group, i) => ({ ...group, sortOrder: i + 1 })) };
    }));
  }
  async function saveAll() {
    setSaving(true); setNotice("");
    try {
      const response = await fetch("/api/keos/collections", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collections }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload?.success === false) throw new Error(payload?.message || "Save failed");
      setApiReady(true); setNotice("Collections saved successfully.");
    } catch (error) {
      setNotice(error instanceof Error ? `${error.message}. Backend connect hone tak changes permanently save nahi honge.` : "Could not save collections.");
    } finally { setSaving(false); }
  }

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] text-slate-900">
      <aside className="hidden w-[350px] shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-[92px] items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black tracking-wide text-white">KRVE</div>
          <div><div className="font-bold tracking-tight">KEOS</div><div className="text-xs tracking-[.18em] text-slate-400">ENTERPRISE OS</div></div>
        </div>
        <div className="border-b border-slate-100 p-5"><div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-400"><Search className="mr-2 inline" size={16}/>Search KEOS...</div></div>
        <nav className="flex-1 space-y-2 overflow-y-auto p-4 text-[15px]">
          <div className="px-2 pb-2 pt-1 text-[11px] font-bold tracking-[.2em] text-slate-400">COMMAND CENTER</div>
          <a href="/founder" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100"><Layers3 size={19}/> Founder Dashboard</a>
          <div className="px-2 pb-2 pt-5 text-[11px] font-bold tracking-[.2em] text-slate-400">COMMERCE</div>
          <a href="/founder" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100"><FolderTree size={19}/> Products</a>
          <a href="/founder/collections" className="flex items-center gap-3 rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white"><Tags size={19}/> Manage Collections</a>
          <a href="/founder" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100"><Layers3 size={19}/> Inventory</a>
          <a href="/founder" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100"><FolderTree size={19}/> Warehouse</a>
          <a href="/founder" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100"><FolderTree size={19}/> Shipping</a>
        </nav>
        <div className="border-t border-slate-100 p-5"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">BK</div><div><div className="font-semibold">Badal Kumar</div><div className="text-xs text-slate-400">Founder</div></div></div></div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-[92px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div><div className="text-lg font-bold">Manage Collections</div><div className="mt-1 text-sm text-slate-400">Product catalogue, categories and publishing</div></div>
          <div className="flex items-center gap-3"><div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:block">● Central API Connected</div><div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white">BK</span><span className="hidden sm:block">Badal Kumar</span></div></div>
        </header>
      <main className="min-h-[calc(100vh-92px)] bg-[#f5f7fb] text-slate-900">
      <div className="mx-auto max-w-[1700px] px-4 py-6 sm:px-7 lg:px-10">
        <header className="mb-7 flex flex-col justify-between gap-5 rounded-[28px] bg-[#101216] px-6 py-7 text-white shadow-xl sm:flex-row sm:items-center sm:px-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.24em] text-amber-300"><Sparkles size={15}/> KEOS · CATALOGUE CONTROL</div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Manage Collections</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Control main categories, menu groups and subcategories that customers browse on KRVE.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { setNewName(""); setShowAddCategory(true); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold hover:bg-white/10"><Plus size={17}/> Add category</button>
            <button onClick={saveAll} disabled={saving || loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-200 disabled:opacity-60">{saving ? <LoaderCircle className="animate-spin" size={17}/> : <Check size={17}/>} Save Changes</button>
          </div>
        </header>

        {notice && <div className={`mb-5 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${apiReady ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-900"}`}><span className="mt-0.5"><Sparkles size={16}/></span><span>{notice}</span><button onClick={() => setNotice("")} className="ml-auto"><X size={16}/></button></div>}

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          {[{label:"Main categories", value:collections.length, icon:Layers3},{label:"Menu groups", value:totalGroups, icon:FolderTree},{label:"Subcategories", value:totalSubcategories, icon:Shirt}].map((stat) => <div key={stat.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="rounded-xl bg-amber-50 p-3 text-amber-700"><stat.icon size={22}/></div><div><p className="text-sm text-slate-500">{stat.label}</p><p className="mt-1 text-2xl font-semibold">{stat.value}</p></div></div>)}
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5"><h2 className="font-semibold">Main categories</h2><p className="mt-1 text-sm text-slate-500">Choose a collection to manage.</p></div>
            <div className="space-y-2 p-3">
              {collections.map((category) => <button key={category.id} onClick={() => setSelectedId(category.id)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${selectedId === category.id ? "border-amber-300 bg-amber-50" : "border-transparent hover:bg-slate-50"}`}><div className={`rounded-lg p-2 ${selectedId === category.id ? "bg-amber-200 text-amber-900" : "bg-slate-100 text-slate-600"}`}><Shirt size={18}/></div><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{category.name}</span><span className="mt-1 block text-xs text-slate-500">{category.groups.length} groups · {category.groups.reduce((n, g) => n + g.subcategories.length, 0)} subcategories</span></span><ChevronRight size={16} className="text-slate-400"/></button>)}
              {!collections.length && <p className="p-3 text-sm text-slate-500">No categories yet. Add your first category.</p>}
            </div>
            {selected && <div className="border-t border-slate-100 p-4"><div className="flex items-center justify-between gap-3"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selected status</span><button onClick={() => toggleActive("category", selected.id, selected.id)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${selected.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>{selected.active ? "Active" : "Hidden"}</button></div><div className="mt-3 flex gap-2"><button onClick={() => setEditing({type:"category", categoryId:selected.id, itemId:selected.id, name:selected.name})} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"><Pencil size={14}/> Rename</button><button onClick={() => deleteItem("category", selected.id, selected.id)} className="rounded-lg border border-red-100 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button></div></div>}
          </aside>

          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
              <div><div className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">Collection structure</div><h2 className="mt-2 text-2xl font-semibold">{selected?.name ?? "Select a category"}</h2><p className="mt-1 text-sm text-slate-500">Organise the customer-facing menu in the order you want.</p></div>
              <div className="flex flex-wrap gap-2"><button onClick={() => { setNewGroupName(""); setShowAddGroup(true); }} disabled={!selected} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"><CirclePlus size={16}/> Add menu group</button></div>
            </div>
            <div className="border-b border-slate-100 p-4 sm:px-6"><label className="flex max-w-md items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5"><Search size={17} className="text-slate-400"/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search groups or subcategories" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"/></label></div>
            <div className="space-y-3 p-4 sm:p-6">
              {loading && <div className="flex items-center gap-2 py-8 text-sm text-slate-500"><LoaderCircle className="animate-spin" size={18}/> Loading saved collections…</div>}
              {!loading && selected && filteredGroups.map((group) => {
                const expanded = expandedGroups.includes(group.id);
                return <article key={group.id} className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-4"><button onClick={() => setExpandedGroups((current) => expanded ? current.filter((id) => id !== group.id) : [...current, group.id])} className="rounded-lg p-1 hover:bg-slate-200">{expanded ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}</button><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{group.name}</h3><span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-500">{group.subcategories.length} items</span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${group.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>{group.active ? "Active" : "Hidden"}</span></div><p className="mt-1 text-xs text-slate-500">Menu group · Order {group.sortOrder}</p></div><div className="flex items-center gap-1"><button title="Move up" onClick={() => moveGroup(group.id, -1)} className="rounded-lg p-2 hover:bg-white"><ArrowUp size={15}/></button><button title="Move down" onClick={() => moveGroup(group.id, 1)} className="rounded-lg p-2 hover:bg-white"><ArrowDown size={15}/></button><button title="Rename group" onClick={() => setEditing({type:"group", categoryId:selected.id, itemId:group.id, name:group.name})} className="rounded-lg p-2 hover:bg-white"><Pencil size={15}/></button><button title="Toggle group" onClick={() => toggleActive("group", selected.id, group.id)} className="rounded-lg px-2 py-2 text-xs font-semibold hover:bg-white">{group.active ? "Hide" : "Show"}</button><button title="Delete group" onClick={() => deleteItem("group", selected.id, group.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button></div></div>
                  {expanded && <div className="p-3 sm:p-4"><div className="space-y-2">{group.subcategories.filter((item) => !search.trim() || item.name.toLowerCase().includes(search.trim().toLowerCase()) || group.name.toLowerCase().includes(search.trim().toLowerCase())).map((sub) => <div key={sub.id} className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3"><div className="rounded-lg bg-slate-100 p-2 text-slate-500"><Shirt size={16}/></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{sub.name}</p><p className="mt-0.5 text-xs text-slate-500">Order {sub.sortOrder}</p></div><button onClick={() => toggleActive("subcategory", selected.id, sub.id, group.id)} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${sub.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>{sub.active ? "Active" : "Hidden"}</button><button title="Rename subcategory" onClick={() => setEditing({type:"subcategory", categoryId:selected.id, groupId:group.id, itemId:sub.id, name:sub.name})} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"><Pencil size={15}/></button><button title="Delete subcategory" onClick={() => deleteItem("subcategory", selected.id, sub.id, group.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button></div>)}
                  {showAddSubcategory === group.id ? <form onSubmit={(event) => { event.preventDefault(); addSubcategory(group.id); }} className="mt-3 flex flex-col gap-2 rounded-xl border border-amber-200 bg-amber-50/50 p-3 sm:flex-row"><input autoFocus value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="e.g. Overshirts" className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"/><button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add subcategory</button><button type="button" onClick={() => setShowAddSubcategory(null)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">Cancel</button></form> : <button onClick={() => { setNewName(""); setShowAddSubcategory(group.id); }} className="mt-3 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50"><Plus size={16}/> Add subcategory</button>}</div></div>}
                </article>;
              })}
              {!loading && selected && filteredGroups.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center"><FolderTree className="mx-auto text-slate-400" size={28}/><h3 className="mt-3 font-semibold">No menu groups found</h3><p className="mt-1 text-sm text-slate-500">Add a group or change your search.</p></div>}
            </div>
            <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Changes need to be saved before they can be used on the KRVE storefront.</span><span className="font-semibold">{apiReady ? "API connected" : "API connection pending"}</span></div>
          </section>
        </div>
      </div>

      {(showAddCategory || showAddGroup || editing) && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><h2 className="text-xl font-semibold">{editing ? "Rename item" : showAddCategory ? "Add main category" : "Add menu group"}</h2><p className="mt-1 text-sm text-slate-500">Use a clear customer-facing name.</p></div><button onClick={() => { setEditing(null); setShowAddCategory(false); setShowAddGroup(false); }} className="rounded-lg p-2 hover:bg-slate-100"><X size={18}/></button></div>
        {editing ? <form onSubmit={(event) => { event.preventDefault(); saveEdit(); }}><label className="mb-2 block text-sm font-semibold">Name</label><input autoFocus value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-amber-400"/><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Save name</button></div></form> : showAddCategory ? <form onSubmit={(event) => { event.preventDefault(); addCategory(); }}><label className="mb-2 block text-sm font-semibold">Category name</label><input autoFocus value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="e.g. Men's Wear" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-amber-400"/><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setShowAddCategory(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Create category</button></div></form> : <form onSubmit={(event) => { event.preventDefault(); addGroup(); }}><label className="mb-2 block text-sm font-semibold">Menu group name</label><input autoFocus value={newGroupName} onChange={(event) => setNewGroupName(event.target.value)} placeholder="e.g. Formal Wear" className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-amber-400"/><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setShowAddGroup(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Create group</button></div></form>}</div></div>}
      </main>
      </div>
    </div>
  );
}
