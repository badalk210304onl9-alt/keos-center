"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Layers3,
  Shirt,
  Users,
  Baby,
  Check,
  X,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";

type Subcategory = {
  id: string;
  name: string;
  visible: boolean;
};

type Category = {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  subcategories: Subcategory[];
};

const initialCategories: Category[] = [
  {
    id: "menswear",
    name: "Menswear",
    description: "Clothing collections for men",
    visible: true,
    subcategories: [
      { id: "m1", name: "T-Shirts", visible: true },
      { id: "m2", name: "Shirts", visible: true },
      { id: "m3", name: "Formal Wear", visible: true },
      { id: "m4", name: "Casual Wear", visible: true },
      { id: "m5", name: "Ethnic Wear", visible: true },
      { id: "m6", name: "Co-ord Sets", visible: true },
    ],
  },
  {
    id: "womenswear",
    name: "Womenswear",
    description: "Clothing collections for women",
    visible: true,
    subcategories: [
      { id: "w1", name: "Tops & T-Shirts", visible: true },
      { id: "w2", name: "Shirts", visible: true },
      { id: "w3", name: "Dresses", visible: true },
      { id: "w4", name: "Co-ord Sets", visible: true },
      { id: "w5", name: "Ethnic Wear", visible: true },
      { id: "w6", name: "Formal Wear", visible: true },
    ],
  },
  {
    id: "kidswear",
    name: "Kidswear",
    description: "Clothing collections for kids",
    visible: true,
    subcategories: [
      { id: "k1", name: "T-Shirts", visible: true },
      { id: "k2", name: "Shirts", visible: true },
      { id: "k3", name: "Casual Wear", visible: true },
      { id: "k4", name: "Ethnic Wear", visible: true },
    ],
  },
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ManageCollectionsManagement() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [activeCategoryId, setActiveCategoryId] =
    useState("menswear");

  const [search, setSearch] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [notice, setNotice] = useState("");

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ??
    categories[0];

  const totalSubcategories = categories.reduce(
    (total, category) => total + category.subcategories.length,
    0
  );

  const visibleCategories = categories.filter(
    (category) => category.visible
  ).length;

  const filteredSubcategories = activeCategory
    ? activeCategory.subcategories.filter((subcategory) =>
        subcategory.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  function updateActiveCategory(updater: (category: Category) => Category) {
    setCategories((current) =>
      current.map((category) =>
        category.id === activeCategoryId ? updater(category) : category
      )
    );
    setNotice("");
  }

  function addSubcategory() {
    const name = newSubcategory.trim();

    if (!name || !activeCategory) return;

    const duplicate = activeCategory.subcategories.some(
      (subcategory) => subcategory.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      setNotice("This subcategory already exists.");
      return;
    }

    updateActiveCategory((category) => ({
      ...category,
      subcategories: [
        ...category.subcategories,
        { id: makeId(), name, visible: true },
      ],
    }));

    setNewSubcategory("");
    setNotice("Subcategory added to the current page session.");
  }

  function addCategory() {
    const name = newCategory.trim();

    if (!name) return;

    if (
      categories.some(
        (category) => category.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      setNotice("This category already exists.");
      return;
    }

    const id = makeId();

    setCategories((current) => [
      ...current,
      {
        id,
        name,
        description: `Clothing collections for ${name}`,
        visible: true,
        subcategories: [],
      },
    ]);

    setActiveCategoryId(id);
    setNewCategory("");
    setShowAddCategory(false);
    setNotice("Category added to the current page session.");
  }

  function startEditing(subcategory: Subcategory) {
    setEditingId(subcategory.id);
    setEditingName(subcategory.name);
  }

  function saveEdit() {
    const name = editingName.trim();

    if (!name || !editingId) return;

    const duplicate = activeCategory?.subcategories.some(
      (subcategory) =>
        subcategory.id !== editingId &&
        subcategory.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      setNotice("A subcategory with this name already exists.");
      return;
    }

    updateActiveCategory((category) => ({
      ...category,
      subcategories: category.subcategories.map((subcategory) =>
        subcategory.id === editingId
          ? { ...subcategory, name }
          : subcategory
      ),
    }));

    setEditingId(null);
    setEditingName("");
    setNotice("Subcategory updated in the current page session.");
  }

  function deleteSubcategory(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );

    if (!confirmed) return;

    updateActiveCategory((category) => ({
      ...category,
      subcategories: category.subcategories.filter(
        (subcategory) => subcategory.id !== id
      ),
    }));

    setNotice("Subcategory removed from the current page session.");
  }

  function moveSubcategory(id: string, direction: -1 | 1) {
    updateActiveCategory((category) => {
      const items = [...category.subcategories];
      const index = items.findIndex((item) => item.id === id);
      const nextIndex = index + direction;

      if (index < 0 || nextIndex < 0 || nextIndex >= items.length) {
        return category;
      }

      [items[index], items[nextIndex]] = [items[nextIndex], items[index]];

      return { ...category, subcategories: items };
    });
  }

  function toggleSubcategory(id: string) {
    updateActiveCategory((category) => ({
      ...category,
      subcategories: category.subcategories.map((subcategory) =>
        subcategory.id === id
          ? { ...subcategory, visible: !subcategory.visible }
          : subcategory
      ),
    }));
  }

  function toggleCategory(id: string) {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? { ...category, visible: !category.visible }
          : category
      )
    );
    setNotice("Category visibility changed in the current page session.");
  }

  function resetDemoCategories() {
    const confirmed = window.confirm(
      "Reset all categories to the original example data?"
    );

    if (!confirmed) return;

    setCategories(initialCategories);
    setActiveCategoryId("menswear");
    setSearch("");
    setNotice("Example categories restored.");
  }

  if (!activeCategory) return null;

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1500px] space-y-6">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 text-white shadow-lg">
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                <Layers3 size={14} />
                KEOS Center
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Manage Collections
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Organize KRVE clothing categories and control the
                subcategory menu displayed to your customers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddCategory((value) => !value)}
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-blue-50 lg:self-center"
            >
              <Plus size={18} />
              Add Category
            </button>
          </div>
        </section>

        {showAddCategory && (
          <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">
              Create a category
            </h2>

            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                addCategory();
              }}
            >
              <input
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                placeholder="Enter category name"
                className="min-h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                autoFocus
              />

              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                <Check size={16} />
                Create Category
              </button>

              <button
                type="button"
                onClick={() => setShowAddCategory(false)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <X size={16} />
                Cancel
              </button>
            </form>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            title="Total Categories"
            value={categories.length}
            subtitle="All clothing categories"
            icon={<Layers3 size={20} />}
          />
          <SummaryCard
            title="Visible Categories"
            value={visibleCategories}
            subtitle="Marked as visible"
            icon={<Eye size={20} />}
          />
          <SummaryCard
            title="Subcategories"
            value={totalSubcategories}
            subtitle="Across all categories"
            icon={<Shirt size={20} />}
          />
        </section>

        {notice && (
          <div className="flex items-start justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Clothing Categories
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Select a category to manage its menu.
                </p>
              </div>

              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                {categories.length}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {categories.map((category) => {
                const selected = category.id === activeCategoryId;

                const CategoryIcon =
                  category.id === "menswear"
                    ? Shirt
                    : category.id === "womenswear"
                      ? Users
                      : category.id === "kidswear"
                        ? Baby
                        : Layers3;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setActiveCategoryId(category.id);
                      setSearch("");
                      setEditingId(null);
                    }}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          selected
                            ? "bg-blue-700 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <CategoryIcon size={19} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-900">
                            {category.name}
                          </span>
                          {selected && (
                            <Check
                              size={17}
                              className="shrink-0 text-blue-700"
                            />
                          )}
                        </span>

                        <span className="mt-1 block text-xs text-slate-500">
                          {category.subcategories.length} subcategories
                        </span>

                        <span
                          className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                            category.visible
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {category.visible ? "Visible" : "Hidden"}
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={resetDemoCategories}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                <RotateCcw size={14} />
                Reset example data
              </button>
            </div>
          </aside>

          <div className="min-w-0 space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {activeCategory.name}
                    </h2>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        activeCategory.visible
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {activeCategory.visible ? "Visible" : "Hidden"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {activeCategory.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleCategory(activeCategory.id)}
                  className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  {activeCategory.visible ? (
                    <>
                      <EyeOff size={16} />
                      Hide Category
                    </>
                  ) : (
                    <>
                      <Eye size={16} />
                      Show Category
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <InfoTile
                  label="Category"
                  value={activeCategory.name}
                />
                <InfoTile
                  label="Subcategories"
                  value={String(activeCategory.subcategories.length)}
                />
                <InfoTile
                  label="Menu Status"
                  value={activeCategory.visible ? "Visible" : "Hidden"}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Subcategory Menu
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Add, rename, reorder or hide menu items.
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800">
                    <Layers3 size={15} />
                    {activeCategory.subcategories.length} items
                  </span>
                </div>

                <form
                  className="mt-5 flex flex-col gap-3 sm:flex-row"
                  onSubmit={(event) => {
                    event.preventDefault();
                    addSubcategory();
                  }}
                >
                  <input
                    value={newSubcategory}
                    onChange={(event) =>
                      setNewSubcategory(event.target.value)
                    }
                    placeholder={`Add subcategory to ${activeCategory.name}`}
                    className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    <Plus size={17} />
                    Add Subcategory
                  </button>
                </form>
              </div>

              <div className="border-b border-slate-100 p-4 sm:px-6">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search subcategories..."
                    className="min-h-10 w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredSubcategories.map((subcategory, index) => (
                  <div
                    key={subcategory.id}
                    className="flex flex-col gap-3 p-4 transition hover:bg-slate-50/80 sm:flex-row sm:items-center sm:px-6"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        {editingId === subcategory.id ? (
                          <form
                            className="flex flex-col gap-2 sm:flex-row"
                            onSubmit={(event) => {
                              event.preventDefault();
                              saveEdit();
                            }}
                          >
                            <input
                              value={editingName}
                              onChange={(event) =>
                                setEditingName(event.target.value)
                              }
                              className="min-h-9 min-w-0 flex-1 rounded-lg border border-blue-300 px-3 text-sm outline-none focus:ring-4 focus:ring-blue-50"
                              autoFocus
                            />
                            <button
                              type="submit"
                              aria-label="Save name"
                              className="inline-flex min-h-9 items-center justify-center gap-1 rounded-lg bg-blue-700 px-3 text-xs font-bold text-white"
                            >
                              <Check size={14} />
                              Save
                            </button>
                            <button
                              type="button"
                              aria-label="Cancel editing"
                              onClick={() => {
                                setEditingId(null);
                                setEditingName("");
                              }}
                              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-slate-600"
                            >
                              <X size={14} />
                            </button>
                          </form>
                        ) : (
                          <>
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {subcategory.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Menu item
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {editingId !== subcategory.id && (
                      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                            subcategory.visible
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {subcategory.visible ? "Visible" : "Hidden"}
                        </span>

                        <button
                          type="button"
                          onClick={() => moveSubcategory(subcategory.id, -1)}
                          disabled={index === 0}
                          aria-label="Move up"
                          title="Move up"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ChevronUp size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveSubcategory(subcategory.id, 1)}
                          disabled={
                            index === activeCategory.subcategories.length - 1
                          }
                          aria-label="Move down"
                          title="Move down"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ChevronDown size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSubcategory(subcategory.id)}
                          aria-label={
                            subcategory.visible ? "Hide item" : "Show item"
                          }
                          title={
                            subcategory.visible ? "Hide item" : "Show item"
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {subcategory.visible ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => startEditing(subcategory)}
                          aria-label="Edit subcategory"
                          title="Edit"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteSubcategory(subcategory.id)}
                          aria-label="Delete subcategory"
                          title="Delete"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {filteredSubcategories.length === 0 && (
                  <div className="px-5 py-14 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <Search size={21} />
                    </span>

                    <h3 className="mt-4 text-sm font-bold text-slate-900">
                      No subcategories found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {search
                        ? "Try another search term."
                        : "Add the first subcategory using the field above."}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span>
                  Showing {filteredSubcategories.length} of{" "}
                  {activeCategory.subcategories.length} subcategories
                </span>
                <span>Use the arrows to change menu order.</span>
              </div>
            </section>

            <p className="text-xs leading-5 text-slate-500">
              Important: this version manages data in the current page session.
              It does not save changes to a database or the live KRVE storefront.
              Permanent saving requires a connected collections API.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          {icon}
        </span>
      </div>
    </div>
  );
}

function InfoTile({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 break-words text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}
