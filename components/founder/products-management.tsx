"use client";

import ProductGalleryUpload from "@/components/founder/product-gallery-upload";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  AlertTriangle,
  Archive,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Edit3,
  Eye,
  EyeOff,
  ImageIcon,
  LoaderCircle,
  Package,
  PackageCheck,
  PackageOpen,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  Tags,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ProductCategory =
  | "menswear"
  | "womenswear"
  | "kidswear"
  | "accessories"
  | "footwear";

type ProductStatus =
  | "draft"
  | "published"
  | "archived";

type Product = {
  id: string;
  slug: string;

  name: string;

  shortDescription: string | null;
  description: string | null;

  category: ProductCategory;

  price: number;
  compareAtPrice: number | null;
  currency: string;

  imageUrl: string;
  image: string;
  gallery: string[];

  sizes: string[];
  colours: string[];

  sku: string | null;

  stockQuantity: number;
  inStock: boolean;

  featured: boolean;
  newArrival: boolean;

  status: ProductStatus;

  createdAt: string;
  updatedAt: string;
};

type ProductListResponse = {
  success: boolean;

  data?: {
    products: Product[];

    pagination: {
      total: number;
      limit: number;
      offset: number;
    };
  };

  message?: string;
};

type ProductResponse = {
  success: boolean;
  data?: Product;
  message?: string;
};

type ProductFormState = {
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  category: ProductCategory;

  price: string;
  compareAtPrice: string;
  currency: string;

  imageUrl: string;
  galleryText: string;

  sizesText: string;
  coloursText: string;

  sku: string;
  stockQuantity: string;

  featured: boolean;
  newArrival: boolean;

  status: ProductStatus;
};

type ProductFormErrors = Partial<
  Record<keyof ProductFormState, string>
>;

type ProductModalMode =
  | "create"
  | "edit";

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

/* =========================================================
   CONSTANTS
========================================================= */

const PAGE_SIZE = 12;

const categoryOptions: Array<{
  value: ProductCategory;
  label: string;
}> = [
  {
    value: "menswear",
    label: "Menswear",
  },
  {
    value: "womenswear",
    label: "Womenswear",
  },
  {
    value: "kidswear",
    label: "Kidswear",
  },
  {
    value: "accessories",
    label: "Accessories",
  },
  {
    value: "footwear",
    label: "Footwear",
  },
];

const statusOptions: Array<{
  value: ProductStatus;
  label: string;
}> = [
  {
    value: "published",
    label: "Published",
  },
  {
    value: "draft",
    label: "Draft",
  },
  {
    value: "archived",
    label: "Archived",
  },
];

const initialFormState: ProductFormState = {
  name: "",
  slug: "",

  shortDescription: "",
  description: "",

  category: "menswear",

  price: "",
  compareAtPrice: "",
  currency: "INR",

  imageUrl: "",
  galleryText: "",

  sizesText: "S, M, L, XL",
  coloursText: "Black",

  sku: "",
  stockQuantity: "0",

  featured: false,
  newArrival: false,

  status: "draft",
};

/* =========================================================
   HELPERS
========================================================= */

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function splitCommaValues(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatPrice(
  price: number,
  currency = "INR",
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    },
  ).format(price);
}

function getCategoryLabel(
  category: ProductCategory,
) {
  return (
    categoryOptions.find(
      (option) =>
        option.value === category,
    )?.label ?? "Menswear"
  );
}

function getStatusLabel(
  status: ProductStatus,
) {
  return (
    statusOptions.find(
      (option) =>
        option.value === status,
    )?.label ?? "Draft"
  );
}

function getProductImage(
  product: Product,
) {
  return (
    product.imageUrl ||
    product.image ||
    product.gallery?.[0] ||
    ""
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function productToFormState(
  product: Product,
): ProductFormState {
  return {
    name: product.name,
    slug: product.slug,

    shortDescription:
      product.shortDescription ?? "",

    description:
      product.description ?? "",

    category:
      product.category,

    price:
      String(product.price),

    compareAtPrice:
      product.compareAtPrice === null
        ? ""
        : String(
            product.compareAtPrice,
          ),

    currency:
      product.currency || "INR",

    imageUrl:
      product.imageUrl ||
      product.image ||
      "",

    galleryText:
      product.gallery.join(", "),

    sizesText:
      product.sizes.join(", "),

    coloursText:
      product.colours.join(", "),

    sku:
      product.sku ?? "",

    stockQuantity:
      String(
        product.stockQuantity,
      ),

    featured:
      product.featured,

    newArrival:
      product.newArrival,

    status:
      product.status,
  };
}

function validateForm(
  form: ProductFormState,
) {
  const errors: ProductFormErrors =
    {};

  if (!form.name.trim()) {
    errors.name =
      "Product name is required.";
  }

  if (!form.slug.trim()) {
    errors.slug =
      "Product slug is required.";
  }

  const price =
    Number(form.price);

  if (
    !Number.isFinite(price) ||
    price < 0
  ) {
    errors.price =
      "Enter a valid selling price.";
  }

  if (
    form.compareAtPrice.trim()
  ) {
    const compareAtPrice =
      Number(
        form.compareAtPrice,
      );

    if (
      !Number.isFinite(
        compareAtPrice,
      ) ||
      compareAtPrice < 0
    ) {
      errors.compareAtPrice =
        "Enter a valid compare-at price.";
    }
  }

  const stock =
    Number(
      form.stockQuantity,
    );

  if (
    !Number.isFinite(stock) ||
    stock < 0
  ) {
    errors.stockQuantity =
      "Stock must be zero or greater.";
  }

  return errors;
}

async function readApiResult<T>(
  response: Response,
): Promise<T> {
  let result: {
    success?: boolean;
    message?: string;
    data?: unknown;
  };

  try {
    result =
      (await response.json()) as {
        success?: boolean;
        message?: string;
        data?: unknown;
      };
  } catch {
    throw new Error(
      "Server returned an invalid response.",
    );
  }

  if (
    !response.ok ||
    !result.success
  ) {
    throw new Error(
      result.message ||
        "The request could not be completed.",
    );
  }

  return result as T;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ProductsManagement() {
  const [
    products,
    setProducts,
  ] =
    useState<Product[]>([]);

  const [
    totalProducts,
    setTotalProducts,
  ] =
    useState(0);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    refreshing,
    setRefreshing,
  ] =
    useState(false);

  const [
    currentPage,
    setCurrentPage,
  ] =
    useState(1);

  const [
    searchQuery,
    setSearchQuery,
  ] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] =
    useState("");

  const [
    categoryFilter,
    setCategoryFilter,
  ] =
    useState<
      ProductCategory | "all"
    >("all");

  const [
    statusFilter,
    setStatusFilter,
  ] =
    useState<
      ProductStatus | "all"
    >("all");

  const [
    modalMode,
    setModalMode,
  ] =
    useState<
      ProductModalMode | null
    >(null);

  const [
    selectedProduct,
    setSelectedProduct,
  ] =
    useState<Product | null>(
      null,
    );

  const [
    form,
    setForm,
  ] =
    useState<ProductFormState>(
      initialFormState,
    );

  const [
    formErrors,
    setFormErrors,
  ] =
    useState<ProductFormErrors>(
      {},
    );

  const [
    savingProduct,
    setSavingProduct,
  ] =
    useState(false);

  const [
    actionProductId,
    setActionProductId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    deletingProduct,
    setDeletingProduct,
  ] =
    useState<Product | null>(
      null,
    );

  const [
    stockProduct,
    setStockProduct,
  ] =
    useState<Product | null>(
      null,
    );

  const [
    stockChange,
    setStockChange,
  ] =
    useState("");

  const [
    stockNote,
    setStockNote,
  ] =
    useState("");

  const [
    savingStock,
    setSavingStock,
  ] =
    useState(false);

  const [
    toast,
    setToast,
  ] =
    useState<ToastState>(
      null,
    );

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalProducts /
          PAGE_SIZE,
      ),
    );

  useEffect(() => {
    const timer =
      window.setTimeout(
        () => {
          setDebouncedSearch(
            searchQuery.trim(),
          );

          setCurrentPage(1);
        },
        350,
      );

    return () =>
      window.clearTimeout(
        timer,
      );
  }, [searchQuery]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          setToast(null);
        },
        4000,
      );

    return () =>
      window.clearTimeout(
        timer,
      );
  }, [toast]);

  const loadProducts =
    useCallback(
      async (
        showRefreshLoader =
          false,
      ) => {
        if (
          showRefreshLoader
        ) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        try {
          const parameters =
            new URLSearchParams();

          parameters.set(
            "limit",
            String(PAGE_SIZE),
          );

          parameters.set(
            "offset",
            String(
              (currentPage - 1) *
                PAGE_SIZE,
            ),
          );

          if (
            debouncedSearch
          ) {
            parameters.set(
              "search",
              debouncedSearch,
            );
          }

          if (
            categoryFilter !==
            "all"
          ) {
            parameters.set(
              "category",
              categoryFilter,
            );
          }

          if (
            statusFilter !==
            "all"
          ) {
            parameters.set(
              "status",
              statusFilter,
            );
          }

          const response =
            await fetch(
              `/api/keos/products?${parameters.toString()}`,
              {
                method: "GET",

                headers: {
                  Accept:
                    "application/json",
                },

                cache: "no-store",
              },
            );

          const result =
            await readApiResult<ProductListResponse>(
              response,
            );

          setProducts(
            result.data?.products ??
              [],
          );

          setTotalProducts(
            result.data?.pagination
              .total ?? 0,
          );
        } catch (error) {
          console.error(
            "LOAD_PRODUCTS_ERROR",
            error,
          );

          setProducts([]);
          setTotalProducts(0);

          setToast({
            type: "error",

            message:
              error instanceof Error
                ? error.message
                : "Unable to load products.",
          });
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      },
      [
        categoryFilter,
        currentPage,
        debouncedSearch,
        statusFilter,
      ],
    );

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const statistics =
    useMemo(() => {
      const published =
        products.filter(
          (product) =>
            product.status ===
            "published",
        ).length;

      const drafts =
        products.filter(
          (product) =>
            product.status ===
            "draft",
        ).length;

      const lowStock =
        products.filter(
          (product) =>
            product.stockQuantity >
              0 &&
            product.stockQuantity <=
              5,
        ).length;

      const outOfStock =
        products.filter(
          (product) =>
            product.stockQuantity <=
            0,
        ).length;

      const inventoryValue =
        products.reduce(
          (
            total,
            product,
          ) =>
            total +
            product.price *
              product.stockQuantity,
          0,
        );

      return {
        published,
        drafts,
        lowStock,
        outOfStock,
        inventoryValue,
      };
    }, [products]);

  function openCreateModal() {
    setSelectedProduct(null);

    setForm({
      ...initialFormState,
    });

    setFormErrors({});
    setModalMode("create");
  }

  function openEditModal(
    product: Product,
  ) {
    setSelectedProduct(
      product,
    );

    setForm(
      productToFormState(
        product,
      ),
    );

    setFormErrors({});
    setModalMode("edit");
  }

  function closeProductModal() {
    if (savingProduct) {
      return;
    }

    setModalMode(null);
    setSelectedProduct(null);

    setForm({
      ...initialFormState,
    });

    setFormErrors({});
  }

  function updateForm<
    Key extends keyof ProductFormState,
  >(
    key: Key,
    value: ProductFormState[Key],
  ) {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      }),
    );

    setFormErrors(
      (current) => ({
        ...current,
        [key]: undefined,
      }),
    );
  }

  function updateProductName(
    value: string,
  ) {
    setForm(
      (current) => ({
        ...current,

        name: value,

        slug:
          modalMode ===
            "create"
            ? createSlug(
                value,
              )
            : current.slug,
      }),
    );

    setFormErrors(
      (current) => ({
        ...current,
        name: undefined,
        slug: undefined,
      }),
    );
  }

  async function handleProductSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const errors =
      validateForm(form);

    if (
      Object.keys(errors)
        .length > 0
    ) {
      setFormErrors(
        errors,
      );

      return;
    }

    setSavingProduct(true);

    try {
      const gallery =
        splitCommaValues(
          form.galleryText,
        );

      if (
        form.imageUrl.trim() &&
        !gallery.includes(
          form.imageUrl.trim(),
        )
      ) {
        gallery.unshift(
          form.imageUrl.trim(),
        );
      }

      const payload = {
        name:
          form.name.trim(),

        slug:
          createSlug(
            form.slug,
          ),

        shortDescription:
          form.shortDescription.trim(),

        description:
          form.description.trim(),

        category:
          form.category,

        price:
          Number(form.price),

        compareAtPrice:
          form.compareAtPrice.trim()
            ? Number(
                form.compareAtPrice,
              )
            : null,

        currency:
          form.currency
            .trim()
            .toUpperCase() ||
          "INR",

        imageUrl:
          form.imageUrl.trim(),

        gallery,

        sizes:
          splitCommaValues(
            form.sizesText,
          ),

        colours:
          splitCommaValues(
            form.coloursText,
          ),

        sku:
          form.sku.trim() ||
          null,

        stockQuantity:
          Math.floor(
            Number(
              form.stockQuantity,
            ),
          ),

        featured:
          form.featured,

        newArrival:
          form.newArrival,

        status:
          form.status,
      };

      const editingId =
        selectedProduct?.id;

      const endpoint =
        modalMode === "edit" &&
        editingId
          ? `/api/keos/products/${encodeURIComponent(
              editingId,
            )}`
          : "/api/keos/products";

      const response =
        await fetch(
          endpoint,
          {
            method:
              modalMode ===
              "edit"
                ? "PATCH"
                : "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify(
                payload,
              ),
          },
        );

      const result =
        await readApiResult<ProductResponse>(
          response,
        );

      setToast({
        type: "success",

        message:
          modalMode ===
          "edit"
            ? `${result.data?.name ?? "Product"} updated successfully.`
            : `${result.data?.name ?? "Product"} created successfully.`,
      });

      setModalMode(null);
      setSelectedProduct(null);

      setForm({
        ...initialFormState,
      });

      setFormErrors({});

      await loadProducts(
        true,
      );
    } catch (error) {
      console.error(
        "SAVE_PRODUCT_ERROR",
        error,
      );

      setToast({
        type: "error",

        message:
          error instanceof Error
            ? error.message
            : "Unable to save product.",
      });
    } finally {
      setSavingProduct(false);
    }
  }

  async function updateStatus(
    product: Product,
    status: ProductStatus,
  ) {
    setActionProductId(
      product.id,
    );

    try {
      const response =
        await fetch(
          `/api/keos/products/${encodeURIComponent(
            product.id,
          )}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify({
                status,
              }),
          },
        );

      await readApiResult<ProductResponse>(
        response,
      );

      setToast({
        type: "success",

        message:
          `${product.name} is now ${getStatusLabel(
            status,
          ).toLowerCase()}.`,
      });

      await loadProducts(
        true,
      );
    } catch (error) {
      setToast({
        type: "error",

        message:
          error instanceof Error
            ? error.message
            : "Unable to update status.",
      });
    } finally {
      setActionProductId(
        null,
      );
    }
  }

  async function confirmDeleteProduct() {
    if (!deletingProduct) {
      return;
    }

    setActionProductId(
      deletingProduct.id,
    );

    try {
      const response =
        await fetch(
          `/api/keos/products/${encodeURIComponent(
            deletingProduct.id,
          )}`,
          {
            method: "DELETE",

            headers: {
              Accept:
                "application/json",
            },
          },
        );

      await readApiResult<{
        success: boolean;
      }>(
        response,
      );

      setToast({
        type: "success",

        message:
          `${deletingProduct.name} deleted successfully.`,
      });

      setDeletingProduct(
        null,
      );

      await loadProducts(
        true,
      );
    } catch (error) {
      setToast({
        type: "error",

        message:
          error instanceof Error
            ? error.message
            : "Unable to delete product.",
      });
    } finally {
      setActionProductId(
        null,
      );
    }
  }

  async function submitStockChange(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!stockProduct) {
      return;
    }

    const quantity =
      Number(stockChange);

    if (
      !Number.isFinite(
        quantity,
      ) ||
      quantity === 0
    ) {
      setToast({
        type: "error",

        message:
          "Enter a positive or negative stock adjustment.",
      });

      return;
    }

    setSavingStock(true);

    try {
      const response =
        await fetch(
          `/api/keos/products/${encodeURIComponent(
            stockProduct.id,
          )}/inventory`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify({
                quantity:
                  Math.trunc(
                    quantity,
                  ),

                transactionType:
                  "adjustment",

                note:
                  stockNote.trim() ||
                  "Manual adjustment from KEOS Center.",
              }),
          },
        );

      await readApiResult<{
        success: boolean;
      }>(
        response,
      );

      setToast({
        type: "success",

        message:
          `${stockProduct.name} inventory updated.`,
      });

      setStockProduct(
        null,
      );

      setStockChange("");
      setStockNote("");

      await loadProducts(
        true,
      );
    } catch (error) {
      setToast({
        type: "error",

        message:
          error instanceof Error
            ? error.message
            : "Unable to update inventory.",
      });
    } finally {
      setSavingStock(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <div className="flex flex-col justify-between gap-8 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                  <Package
                    size={23}
                  />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                  Live Product Commerce
                  Center
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black sm:text-4xl">
                Product Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Create, upload, edit,
                publish and manage KRVE
                products. Published
                products automatically
                appear on the customer
                website.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <StatusPill
                  icon={
                    CheckCircle2
                  }
                  label="Central API Connected"
                />

                <StatusPill
                  icon={
                    Sparkles
                  }
                  label="Website Live Sync"
                />

                <StatusPill
                  icon={
                    ImageIcon
                  }
                  label="Cloudinary Upload"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  void loadProducts(
                    true,
                  )
                }
                disabled={
                  refreshing
                }
                className="flex min-w-[160px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20 disabled:opacity-60"
              >
                <RefreshCw
                  size={18}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                {refreshing
                  ? "Syncing..."
                  : "Sync Products"}
              </button>

              <button
                type="button"
                onClick={
                  openCreateModal
                }
                className="flex min-w-[160px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <SummaryCard
            title="Total Products"
            value={String(
              totalProducts,
            )}
            description="Central catalogue"
            icon={Package}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="Published"
            value={String(
              statistics.published,
            )}
            description="Visible on website"
            icon={PackageCheck}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Drafts"
            value={String(
              statistics.drafts,
            )}
            description="Pending publication"
            icon={PackageOpen}
            iconClassName="bg-orange-50 text-orange-600"
          />

          <SummaryCard
            title="Low Stock"
            value={String(
              statistics.lowStock,
            )}
            description="Five units or less"
            icon={AlertTriangle}
            iconClassName="bg-amber-50 text-amber-600"
          />

          <SummaryCard
            title="Out of Stock"
            value={String(
              statistics.outOfStock,
            )}
            description="Unavailable products"
            icon={X}
            iconClassName="bg-red-50 text-red-600"
          />

          <SummaryCard
            title="Inventory Value"
            value={formatPrice(
              statistics.inventoryValue,
            )}
            description="Current page value"
            icon={
              CircleDollarSign
            }
            iconClassName="bg-violet-50 text-violet-600"
          />
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                  Central Product
                  Catalogue
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Live KRVE Products
                </h2>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row">
                <label className="relative block w-full lg:w-[290px]">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="search"
                    value={
                      searchQuery
                    }
                    onChange={(
                      event,
                    ) =>
                      setSearchQuery(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Search products or SKU..."
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <select
                  value={
                    categoryFilter
                  }
                  onChange={(
                    event,
                  ) => {
                    setCategoryFilter(
                      event.target
                        .value as
                        | ProductCategory
                        | "all",
                    );

                    setCurrentPage(
                      1,
                    );
                  }}
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
                >
                  <option value="all">
                    All Categories
                  </option>

                  {categoryOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    ),
                  )}
                </select>

                <select
                  value={
                    statusFilter
                  }
                  onChange={(
                    event,
                  ) => {
                    setStatusFilter(
                      event.target
                        .value as
                        | ProductStatus
                        | "all",
                    );

                    setCurrentPage(
                      1,
                    );
                  }}
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
                >
                  <option value="all">
                    All Statuses
                  </option>

                  {statusOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : products.length ===
            0 ? (
            <EmptyState
              onAdd={
                openCreateModal
              }
            />
          ) : (
            <>
              <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-2 2xl:grid-cols-3">
                {products.map(
                  (product) => (
                    <ProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                      loading={
                        actionProductId ===
                        product.id
                      }
                      onEdit={() =>
                        openEditModal(
                          product,
                        )
                      }
                      onStock={() =>
                        setStockProduct(
                          product,
                        )
                      }
                      onDelete={() =>
                        setDeletingProduct(
                          product,
                        )
                      }
                      onStatusChange={(
                        status,
                      ) =>
                        void updateStatus(
                          product,
                          status,
                        )
                      }
                    />
                  ),
                )}
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                <p className="text-sm text-slate-600">
                  Showing page{" "}
                  <strong>
                    {currentPage}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {totalPages}
                  </strong>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={
                      currentPage <= 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            1,
                            page - 1,
                          ),
                      )
                    }
                    className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 disabled:opacity-40"
                  >
                    <ChevronLeft
                      size={18}
                    />
                  </button>

                  <span className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-700">
                    {currentPage} /{" "}
                    {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={
                      currentPage >=
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.min(
                            totalPages,
                            page + 1,
                          ),
                      )
                    }
                    className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 disabled:opacity-40"
                  >
                    <ChevronRight
                      size={18}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {modalMode && (
        <ProductFormModal
          mode={modalMode}
          form={form}
          errors={formErrors}
          saving={savingProduct}
          onClose={
            closeProductModal
          }
          onSubmit={
            handleProductSubmit
          }
          onNameChange={
            updateProductName
          }
          onChange={
            updateForm
          }
        />
      )}

      {deletingProduct && (
        <ConfirmationModal
          title="Delete Product"
          description={`Delete ${deletingProduct.name} permanently? It will disappear from the KRVE website.`}
          loading={
            actionProductId ===
            deletingProduct.id
          }
          onClose={() =>
            setDeletingProduct(
              null,
            )
          }
          onConfirm={() =>
            void confirmDeleteProduct()
          }
        />
      )}

      {stockProduct && (
        <StockAdjustmentModal
          product={
            stockProduct
          }
          quantity={
            stockChange
          }
          note={
            stockNote
          }
          saving={
            savingStock
          }
          onQuantityChange={
            setStockChange
          }
          onNoteChange={
            setStockNote
          }
          onClose={() => {
            if (!savingStock) {
              setStockProduct(
                null,
              );

              setStockChange(
                "",
              );

              setStockNote(
                "",
              );
            }
          }}
          onSubmit={
            submitStockChange
          }
        />
      )}

      {toast && (
        <Toast
          toast={toast}
          onClose={() =>
            setToast(null)
          }
        />
      )}
    </>
  );
}

/* =========================================================
   PRODUCT FORM MODAL
========================================================= */

function ProductFormModal({
  mode,
  form,
  errors,
  saving,
  onClose,
  onSubmit,
  onNameChange,
  onChange,
}: {
  mode: ProductModalMode;
  form: ProductFormState;
  errors: ProductFormErrors;
  saving: boolean;
  onClose: () => void;
  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
  onNameChange: (
    value: string,
  ) => void;
  onChange: <
    Key extends keyof ProductFormState,
  >(
    key: Key,
    value: ProductFormState[Key],
  ) => void;
}) {
  return (
    <ModalShell
      title={
        mode === "create"
          ? "Add Product"
          : "Edit Product"
      }
      description="Create and publish a live KRVE catalogue product."
      onClose={onClose}
      wide
    >
      <form
        onSubmit={onSubmit}
      >
        <div className="max-h-[72vh] overflow-y-auto bg-slate-50 p-5 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <FormSection
                title="Product identity"
                description="Basic customer-facing product information."
                icon={Package}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="Product Name"
                    value={
                      form.name
                    }
                    placeholder="KRVE Noir Signature Blazer"
                    error={
                      errors.name
                    }
                    required
                    onChange={
                      onNameChange
                    }
                  />

                  <TextField
                    label="Product Slug"
                    value={
                      form.slug
                    }
                    placeholder="krve-noir-signature-blazer"
                    error={
                      errors.slug
                    }
                    required
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "slug",
                        createSlug(
                          value,
                        ),
                      )
                    }
                  />

                  <SelectInput
                    label="Category"
                    value={
                      form.category
                    }
                    options={
                      categoryOptions
                    }
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "category",
                        value as ProductCategory,
                      )
                    }
                  />

                  <TextField
                    label="SKU"
                    value={
                      form.sku
                    }
                    placeholder="KRVE-BLZ-001"
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "sku",
                        value.toUpperCase(),
                      )
                    }
                  />
                </div>

                <div className="mt-5">
                  <TextAreaField
                    label="Short Description"
                    value={
                      form.shortDescription
                    }
                    placeholder="Short summary for product cards."
                    rows={3}
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "shortDescription",
                        value,
                      )
                    }
                  />
                </div>

                <div className="mt-5">
                  <TextAreaField
                    label="Full Description"
                    value={
                      form.description
                    }
                    placeholder="Describe material, fit, craftsmanship and styling."
                    rows={5}
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "description",
                        value,
                      )
                    }
                  />
                </div>
              </FormSection>

              <FormSection
                title="Pricing and stock"
                description="Manage selling price and inventory."
                icon={
                  CircleDollarSign
                }
              >
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <TextField
                    label="Selling Price"
                    value={
                      form.price
                    }
                    placeholder="18999"
                    type="number"
                    error={
                      errors.price
                    }
                    required
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "price",
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Compare Price"
                    value={
                      form.compareAtPrice
                    }
                    placeholder="22999"
                    type="number"
                    error={
                      errors.compareAtPrice
                    }
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "compareAtPrice",
                        value,
                      )
                    }
                  />

                  <SelectInput
                    label="Currency"
                    value={
                      form.currency
                    }
                    options={[
                      {
                        value: "INR",
                        label:
                          "INR — Rupee",
                      },
                    ]}
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "currency",
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Opening Stock"
                    value={
                      form.stockQuantity
                    }
                    placeholder="20"
                    type="number"
                    error={
                      errors.stockQuantity
                    }
                    required
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "stockQuantity",
                        value,
                      )
                    }
                  />
                </div>
              </FormSection>

              <FormSection
                title="Sizes and colours"
                description="Enter comma-separated product variants."
                icon={Tags}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="Sizes"
                    value={
                      form.sizesText
                    }
                    placeholder="S, M, L, XL"
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "sizesText",
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Colours"
                    value={
                      form.coloursText
                    }
                    placeholder="Black, Navy, Ivory"
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "coloursText",
                        value,
                      )
                    }
                  />
                </div>
              </FormSection>

              <FormSection
                title="Product images"
                description="Upload up to 3 customer-facing product views."
                icon={ImageIcon}
              >
                <ProductGalleryUpload
                  primaryImage={
                    form.imageUrl
                  }
                  galleryText={
                    form.galleryText
                  }
                  onPrimaryChange={(
                    imageUrl,
                  ) =>
                    onChange(
                      "imageUrl",
                      imageUrl,
                    )
                  }
                  onGalleryChange={(
                    galleryText,
                  ) =>
                    onChange(
                      "galleryText",
                      galleryText,
                    )
                  }
                />
              </FormSection>
            </div>

            <aside className="space-y-6">
              <FormSection
                title="Publishing"
                description="Control customer website visibility."
                icon={Eye}
              >
                <SelectInput
                  label="Product Status"
                  value={
                    form.status
                  }
                  options={
                    statusOptions
                  }
                  onChange={(
                    value,
                  ) =>
                    onChange(
                      "status",
                      value as ProductStatus,
                    )
                  }
                />

                <div className="mt-5 space-y-3">
                  <SwitchField
                    label="New Arrival"
                    description="Show on homepage New Arrivals."
                    checked={
                      form.newArrival
                    }
                    icon={
                      Sparkles
                    }
                    onChange={(
                      checked,
                    ) =>
                      onChange(
                        "newArrival",
                        checked,
                      )
                    }
                  />

                  <SwitchField
                    label="Featured Product"
                    description="Prioritise in collections."
                    checked={
                      form.featured
                    }
                    icon={Star}
                    onChange={(
                      checked,
                    ) =>
                      onChange(
                        "featured",
                        checked,
                      )
                    }
                  />
                </div>
              </FormSection>

              <ProductPreview
                form={form}
              />
            </aside>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {saving ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Plus size={17} />
                {mode === "create"
                  ? "Create Product"
                  : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  loading,
  onEdit,
  onStock,
  onDelete,
  onStatusChange,
}: {
  product: Product;
  loading: boolean;
  onEdit: () => void;
  onStock: () => void;
  onDelete: () => void;
  onStatusChange: (
    status: ProductStatus,
  ) => void;
}) {
  const image =
    getProductImage(
      product,
    );

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-64 bg-slate-100">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-slate-400">
            <ImageIcon
              size={35}
            />
          </div>
        )}

        <div className="absolute left-3 top-3">
          <StatusBadge
            status={
              product.status
            }
          />
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {product.newArrival && (
            <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black text-white">
              NEW
            </span>
          )}

          {product.featured && (
            <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black text-black">
              FEATURED
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
          {getCategoryLabel(
            product.category,
          )}
        </p>

        <h3 className="mt-2 text-lg font-black text-slate-950">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {product.sku ||
            product.slug}
        </p>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xl font-black text-blue-600">
              {formatPrice(
                product.price,
                product.currency,
              )}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Updated{" "}
              {formatDate(
                product.updatedAt,
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onStock}
            className={`rounded-xl px-3 py-2 text-xs font-black ${
              product.stockQuantity <=
              0
                ? "bg-red-50 text-red-600"
                : product.stockQuantity <=
                    5
                  ? "bg-amber-50 text-amber-600"
                  : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {
              product.stockQuantity
            }{" "}
            STOCK
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onEdit}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700"
          >
            <Edit3 size={15} />
            Edit
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              onStatusChange(
                product.status ===
                  "published"
                  ? "draft"
                  : "published",
              )
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-xs font-bold text-blue-600"
          >
            {loading ? (
              <LoaderCircle
                size={15}
                className="animate-spin"
              />
            ) : product.status ===
              "published" ? (
              <EyeOff size={15} />
            ) : (
              <Eye size={15} />
            )}

            {product.status ===
            "published"
              ? "Draft"
              : "Publish"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              onStatusChange(
                "archived",
              )
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-bold text-slate-600"
          >
            <Archive
              size={15}
            />
            Archive
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600"
          >
            <Trash2
              size={15}
            />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PREVIEW
========================================================= */

function ProductPreview({
  form,
}: {
  form: ProductFormState;
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">
          Live Preview
        </p>

        <h3 className="mt-1 text-lg font-black text-slate-950">
          Product card
        </h3>
      </div>

      <div className="p-5">
        <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-100">
          {form.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={
                form.imageUrl
              }
              alt={
                form.name ||
                "Product preview"
              }
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center text-center text-slate-400">
              <div>
                <ImageIcon
                  size={38}
                  className="mx-auto"
                />

                <p className="mt-3 text-xs font-bold">
                  Upload product
                  image
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-blue-600">
          {getCategoryLabel(
            form.category,
          )}
        </p>

        <h4 className="mt-2 text-lg font-black text-slate-950">
          {form.name ||
            "KRVE Product"}
        </h4>

        <p className="mt-3 text-xl font-black text-blue-600">
          {formatPrice(
            Number(
              form.price || 0,
            ),
            form.currency,
          )}
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   STOCK MODAL
========================================================= */

function StockAdjustmentModal({
  product,
  quantity,
  note,
  saving,
  onQuantityChange,
  onNoteChange,
  onClose,
  onSubmit,
}: {
  product: Product;
  quantity: string;
  note: string;
  saving: boolean;
  onQuantityChange: (
    value: string,
  ) => void;
  onNoteChange: (
    value: string,
  ) => void;
  onClose: () => void;
  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
}) {
  return (
    <ModalShell
      title="Adjust Inventory"
      description={`Update stock for ${product.name}.`}
      onClose={onClose}
    >
      <form
        onSubmit={onSubmit}
      >
        <div className="space-y-5 p-6">
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-xs font-black uppercase text-blue-600">
              Current Stock
            </p>

            <p className="mt-2 text-4xl font-black text-blue-800">
              {
                product.stockQuantity
              }
            </p>
          </div>

          <TextField
            label="Stock Adjustment"
            value={quantity}
            placeholder="10 or -3"
            type="number"
            required
            onChange={
              onQuantityChange
            }
          />

          <TextAreaField
            label="Note"
            value={note}
            placeholder="Reason for this stock adjustment."
            rows={4}
            onChange={
              onNoteChange
            }
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
          >
            {saving && (
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
            )}

            Update Stock
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* =========================================================
   COMMON COMPONENTS
========================================================= */

function FormSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-950">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
  error,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (
    value: string,
  ) => void;
  error?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">
        {label}
        {required && (
          <span className="text-red-500">
            {" "}
            *
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={
          placeholder
        }
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
        className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none focus:ring-4 ${
          error
            ? "border-red-300 focus:ring-red-100"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
        }`}
      />

      {error && (
        <p className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </label>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (
    value: string,
  ) => void;
  rows: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">
        {label}
      </span>

      <textarea
        rows={rows}
        value={value}
        placeholder={
          placeholder
        }
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  onChange: (
    value: string,
  ) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">
        {label}
      </span>

      <select
        value={value}
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm"
      >
        {options.map(
          (option) => (
            <option
              key={
                option.value
              }
              value={
                option.value
              }
            >
              {option.label}
            </option>
          ),
        )}
      </select>
    </label>
  );
}

function SwitchField({
  label,
  description,
  checked,
  onChange,
  icon: Icon,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (
    checked: boolean,
  ) => void;
  icon: LucideIcon;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!checked)
      }
      className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left ${
        checked
          ? "border-blue-300 bg-blue-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex gap-3">
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
            checked
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <Icon size={18} />
        </div>

        <div>
          <p className="text-sm font-black text-slate-900">
            {label}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <span
        className={`relative mt-1 h-6 w-11 shrink-0 rounded-full ${
          checked
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </span>
    </button>
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
  icon: LucideIcon;
  iconClassName: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${iconClassName}`}
      >
        <Icon size={20} />
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">
        {title}
      </p>

      <p className="mt-1 truncate text-2xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-3 text-xs text-slate-400">
        {description}
      </p>
    </article>
  );
}

function StatusPill({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold">
      <Icon size={14} />
      {label}
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: ProductStatus;
}) {
  const className =
    status === "published"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : status === "archived"
        ? "border-slate-300 bg-slate-100 text-slate-600"
        : "border-orange-200 bg-orange-50 text-orange-700";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-black uppercase ${className}`}
    >
      {getStatusLabel(
        status,
      )}
    </span>
  );
}

function LoadingState() {
  return (
    <div className="grid min-h-[420px] place-items-center">
      <div className="text-center">
        <LoaderCircle
          size={42}
          className="mx-auto animate-spin text-blue-600"
        />

        <p className="mt-4 text-sm font-bold text-slate-700">
          Loading products...
        </p>
      </div>
    </div>
  );
}

function EmptyState({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <div className="grid min-h-[430px] place-items-center p-8">
      <div className="max-w-xl text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-blue-50 text-blue-600">
          <PackageOpen
            size={34}
          />
        </div>

        <h3 className="mt-6 text-2xl font-black text-slate-950">
          Create your first KRVE
          product.
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          Upload an image, enable
          New Arrival and select
          Published status.
        </p>

        <button
          type="button"
          onClick={onAdd}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white"
        >
          <Plus size={18} />
          Add First Product
        </button>
      </div>
    </div>
  );
}

function ConfirmationModal({
  title,
  description,
  loading,
  onClose,
  onConfirm,
}: {
  title: string;
  description: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalShell
      title={title}
      description="This action cannot be undone."
      onClose={onClose}
    >
      <div className="p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold leading-7 text-red-800">
          {description}
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white"
        >
          {loading && (
            <LoaderCircle
              size={17}
              className="animate-spin"
            />
          )}

          Delete Product
        </button>
      </div>
    </ModalShell>
  );
}

function Toast({
  toast,
  onClose,
}: {
  toast: NonNullable<ToastState>;
  onClose: () => void;
}) {
  return (
    <div className="fixed bottom-5 right-5 z-[150] flex max-w-md items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
      {toast.type ===
      "success" ? (
        <CheckCircle2
          className="shrink-0 text-emerald-600"
          size={20}
        />
      ) : (
        <AlertTriangle
          className="shrink-0 text-red-600"
          size={20}
        />
      )}

      <p className="flex-1 text-sm font-semibold leading-6 text-slate-700">
        {toast.message}
      </p>

      <button
        type="button"
        onClick={onClose}
      >
        <X size={17} />
      </button>
    </div>
  );
}

function ModalShell({
  title,
  description,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm">
      <div
        className={`w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl ${
          wide
            ? "max-w-6xl"
            : "max-w-xl"
        }`}
      >
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] px-6 py-5 text-white">
          <div>
            <h2 className="text-xl font-black">
              {title}
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"
          >
            <X size={19} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
