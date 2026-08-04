"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
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

type DeleteResponse = {
  success: boolean;

  data?: {
    id: string;
    deleted: boolean;
  };

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
  Record<
    keyof ProductFormState,
    string
  >
>;

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

type ProductModalMode =
  | "create"
  | "edit";

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

function createSlug(
  value: string,
) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function splitCommaValues(
  value: string,
) {
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
      (item) =>
        item.value === category,
    )?.label ?? "Menswear"
  );
}

function getStatusLabel(
  status: ProductStatus,
) {
  return (
    statusOptions.find(
      (item) =>
        item.value === status,
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

  const stockQuantity =
    Number(form.stockQuantity);

  if (
    !Number.isFinite(
      stockQuantity,
    ) ||
    stockQuantity < 0
  ) {
    errors.stockQuantity =
      "Opening stock must be zero or greater.";
  }

  return errors;
}

async function readApiResult<T>(
  response: Response,
): Promise<T> {
  const result =
    (await response.json()) as {
      success?: boolean;
      message?: string;
      data?: unknown;
    };

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
    actionProductId,
    setActionProductId,
  ] =
    useState<string | null>(
      null,
    );

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

  /* =======================================================
     SEARCH DELAY
  ======================================================= */

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

  /* =======================================================
     TOAST AUTO CLOSE
  ======================================================= */

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

  /* =======================================================
     LOAD PRODUCTS
  ======================================================= */

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

  /* =======================================================
     CALCULATED STATISTICS
  ======================================================= */

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

      const archived =
        products.filter(
          (product) =>
            product.status ===
            "archived",
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
        archived,
        lowStock,
        outOfStock,
        inventoryValue,
      };
    }, [products]);

  /* =======================================================
     MODAL CONTROLS
  ======================================================= */

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

  /* =======================================================
     CREATE / UPDATE PRODUCT
  ======================================================= */

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

        gallery:
          splitCommaValues(
            form.galleryText,
          ),

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

      closeProductModal();

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

  /* =======================================================
     STATUS UPDATE
  ======================================================= */

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
      console.error(
        "UPDATE_STATUS_ERROR",
        error,
      );

      setToast({
        type: "error",

        message:
          error instanceof Error
            ? error.message
            : "Unable to update product status.",
      });
    } finally {
      setActionProductId(
        null,
      );
    }
  }

  /* =======================================================
     DELETE PRODUCT
  ======================================================= */

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

      await readApiResult<DeleteResponse>(
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

      if (
        products.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(
          (page) =>
            Math.max(
              1,
              page - 1,
            ),
        );
      } else {
        await loadProducts(
          true,
        );
      }
    } catch (error) {
      console.error(
        "DELETE_PRODUCT_ERROR",
        error,
      );

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

  /* =======================================================
     INVENTORY UPDATE
  ======================================================= */

  function openStockModal(
    product: Product,
  ) {
    setStockProduct(
      product,
    );

    setStockChange("");
    setStockNote("");
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
                  "Manual stock adjustment from KEOS Center.",
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
          `${stockProduct.name} inventory updated successfully.`,
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
      console.error(
        "UPDATE_STOCK_ERROR",
        error,
      );

      setToast({
        type: "error",

        message:
          error instanceof Error
            ? error.message
            : "Unable to update stock.",
      });
    } finally {
      setSavingStock(false);
    }
  }

  /* =======================================================
     MAIN RENDER
  ======================================================= */

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <div className="flex flex-col justify-between gap-8 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Package
                    size={23}
                  />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                  Live Product
                  Commerce Center
                </p>
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Product Management
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Create, edit,
                publish and manage
                KRVE products from
                one place. Published
                products are
                automatically
                available to the KRVE
                customer website.
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
                    PackageCheck
                  }
                  label="D1 Database Active"
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
                className="flex min-w-[160px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
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
            title="Page Inventory"
            value={formatPrice(
              statistics.inventoryValue,
            )}
            description="Visible page value"
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

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Manage product
                  information,
                  visibility, pricing,
                  New Arrival status
                  and inventory.
                </p>
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
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
            <div className="grid min-h-[420px] place-items-center p-8">
              <div className="text-center">
                <LoaderCircle
                  size={42}
                  className="mx-auto animate-spin text-blue-600"
                />

                <p className="mt-4 text-sm font-bold text-slate-700">
                  Loading products...
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Connecting to the KRVE central catalogue.
                </p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="grid min-h-[450px] place-items-center p-8">
              <div className="max-w-xl text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-blue-50 text-blue-600">
                  <PackageOpen size={34} />
                </div>

                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                  No Products Found
                </p>

                <h3 className="mt-3 text-2xl font-black text-slate-950">
                  Create your first live KRVE product.
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Add a product, select Published status and enable New
                  Arrival to display it automatically on the KRVE customer
                  website.
                </p>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <Plus size={18} />
                  Add First Product
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto xl:block">
                <table className="w-full min-w-[1180px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <TableHeading>Product</TableHeading>
                      <TableHeading>Category</TableHeading>
                      <TableHeading>Price</TableHeading>
                      <TableHeading>Stock</TableHeading>
                      <TableHeading>Visibility</TableHeading>
                      <TableHeading>Merchandising</TableHeading>
                      <TableHeading>Updated</TableHeading>
                      <TableHeading align="right">
                        Actions
                      </TableHeading>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => {
                      const productImage =
                        getProductImage(product);

                      const actionRunning =
                        actionProductId === product.id;

                      return (
                        <tr
                          key={product.id}
                          className="border-b border-slate-100 align-middle transition last:border-b-0 hover:bg-slate-50/70"
                        >
                          <td className="px-6 py-5">
                            <div className="flex min-w-[285px] items-center gap-4">
                              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                                {productImage ? (
                                  // External product URLs are intentionally
                                  // rendered with a normal image element.
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={productImage}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="grid h-full w-full place-items-center text-slate-400">
                                    <ImageIcon size={21} />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="max-w-[220px] truncate text-sm font-black text-slate-950">
                                    {product.name}
                                  </p>

                                  {product.newArrival && (
                                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-blue-600">
                                      New
                                    </span>
                                  )}

                                  {product.featured && (
                                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-600">
                                      Featured
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 max-w-[260px] truncate text-xs text-slate-400">
                                  {product.sku
                                    ? `SKU: ${product.sku}`
                                    : `Slug: ${product.slug}`}
                                </p>

                                <p className="mt-1 max-w-[260px] truncate text-xs text-slate-500">
                                  {product.shortDescription ||
                                    product.description ||
                                    "No product description"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                              {getCategoryLabel(product.category)}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div>
                              <p className="text-sm font-black text-slate-950">
                                {formatPrice(
                                  product.price,
                                  product.currency,
                                )}
                              </p>

                              {product.compareAtPrice !== null &&
                                product.compareAtPrice >
                                  product.price && (
                                  <p className="mt-1 text-xs text-slate-400 line-through">
                                    {formatPrice(
                                      product.compareAtPrice,
                                      product.currency,
                                    )}
                                  </p>
                                )}
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <button
                              type="button"
                              onClick={() =>
                                openStockModal(product)
                              }
                              className="group text-left"
                            >
                              <p
                                className={`text-sm font-black ${
                                  product.stockQuantity <= 0
                                    ? "text-red-600"
                                    : product.stockQuantity <= 5
                                      ? "text-amber-600"
                                      : "text-emerald-600"
                                }`}
                              >
                                {product.stockQuantity} units
                              </p>

                              <p className="mt-1 text-xs text-slate-400 transition group-hover:text-blue-600">
                                Adjust inventory
                              </p>
                            </button>
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge status={product.status} />
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex flex-col gap-2">
                              <ToggleIndicator
                                active={product.newArrival}
                                activeLabel="New Arrival"
                                inactiveLabel="Not New"
                                icon={Sparkles}
                              />

                              <ToggleIndicator
                                active={product.featured}
                                activeLabel="Featured"
                                inactiveLabel="Standard"
                                icon={Star}
                              />
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-xs font-semibold text-slate-600">
                              {formatDate(product.updatedAt)}
                            </p>

                            <p className="mt-1 text-[11px] text-slate-400">
                              {formatTime(product.updatedAt)}
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex justify-end gap-2">
                              {product.status === "published" ? (
                                <ActionButton
                                  label="Move to draft"
                                  icon={EyeOff}
                                  disabled={actionRunning}
                                  onClick={() =>
                                    void updateStatus(
                                      product,
                                      "draft",
                                    )
                                  }
                                />
                              ) : (
                                <ActionButton
                                  label="Publish"
                                  icon={Eye}
                                  disabled={actionRunning}
                                  onClick={() =>
                                    void updateStatus(
                                      product,
                                      "published",
                                    )
                                  }
                                />
                              )}

                              <ActionButton
                                label="Edit"
                                icon={Edit3}
                                disabled={actionRunning}
                                onClick={() =>
                                  openEditModal(product)
                                }
                              />

                              {product.status !== "archived" && (
                                <ActionButton
                                  label="Archive"
                                  icon={Archive}
                                  disabled={actionRunning}
                                  onClick={() =>
                                    void updateStatus(
                                      product,
                                      "archived",
                                    )
                                  }
                                />
                              )}

                              <ActionButton
                                label="Delete"
                                icon={Trash2}
                                danger
                                disabled={actionRunning}
                                onClick={() =>
                                  setDeletingProduct(product)
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-4 sm:p-6 xl:hidden">
                {products.map((product) => {
                  const productImage =
                    getProductImage(product);

                  const actionRunning =
                    actionProductId === product.id;

                  return (
                    <article
                      key={product.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <div className="flex gap-4 border-b border-slate-100 p-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          {productImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={productImage}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center text-slate-400">
                              <ImageIcon size={25} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-base font-black text-slate-950">
                                {product.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {product.sku
                                  ? `SKU: ${product.sku}`
                                  : product.slug}
                              </p>
                            </div>

                            <StatusBadge
                              status={product.status}
                            />
                          </div>

                          <p className="mt-3 text-lg font-black text-blue-600">
                            {formatPrice(
                              product.price,
                              product.currency,
                            )}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                              {getCategoryLabel(
                                product.category,
                              )}
                            </span>

                            {product.newArrival && (
                              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                                New Arrival
                              </span>
                            )}

                            {product.featured && (
                              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-px bg-slate-200">
                        <MobileMetric
                          label="Stock"
                          value={`${product.stockQuantity} units`}
                          valueClassName={
                            product.stockQuantity <= 0
                              ? "text-red-600"
                              : product.stockQuantity <= 5
                                ? "text-amber-600"
                                : "text-emerald-600"
                          }
                        />

                        <MobileMetric
                          label="Updated"
                          value={formatDate(product.updatedAt)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
                        <button
                          type="button"
                          disabled={actionRunning}
                          onClick={() =>
                            openEditModal(product)
                          }
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                          <Edit3 size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={actionRunning}
                          onClick={() =>
                            openStockModal(product)
                          }
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                          <Boxes size={15} />
                          Stock
                        </button>

                        <button
                          type="button"
                          disabled={actionRunning}
                          onClick={() =>
                            void updateStatus(
                              product,
                              product.status === "published"
                                ? "draft"
                                : "published",
                            )
                          }
                          className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100 disabled:opacity-50"
                        >
                          {product.status === "published" ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}

                          {product.status === "published"
                            ? "Draft"
                            : "Publish"}
                        </button>

                        <button
                          type="button"
                          disabled={actionRunning}
                          onClick={() =>
                            setDeletingProduct(product)
                          }
                          className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600">
                    Showing{" "}
                    <strong className="text-slate-950">
                      {(currentPage - 1) * PAGE_SIZE + 1}
                    </strong>{" "}
                    to{" "}
                    <strong className="text-slate-950">
                      {Math.min(
                        currentPage * PAGE_SIZE,
                        totalProducts,
                      )}
                    </strong>{" "}
                    of{" "}
                    <strong className="text-slate-950">
                      {totalProducts}
                    </strong>{" "}
                    products
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(1, page - 1),
                      )
                    }
                    className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex h-10 min-w-[92px] items-center justify-center rounded-xl bg-slate-100 px-4 text-xs font-black text-slate-700">
                    Page {currentPage} of {totalPages}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1),
                      )
                    }
                    className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-[150] flex max-w-md items-start gap-3 rounded-2xl border p-4 shadow-2xl ${
            toast.type === "success"
              ? "border-emerald-200 bg-white text-emerald-700"
              : "border-red-200 bg-white text-red-700"
          }`}
        >
          <div
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
              toast.type === "success"
                ? "bg-emerald-50"
                : "bg-red-50"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertTriangle size={20} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-black">
              {toast.type === "success"
                ? "Success"
                : "Action failed"}
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setToast(null)
            }
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {modalMode && (
        <ProductFormModal
          mode={modalMode}
          form={form}
          errors={formErrors}
          saving={savingProduct}
          onClose={closeProductModal}
          onSubmit={handleProductSubmit}
          onNameChange={updateProductName}
          onChange={updateForm}
        />
      )}

      {deletingProduct && (
        <ConfirmationModal
          title="Delete Product"
          description={`Delete ${deletingProduct.name} permanently from the central KRVE catalogue? It will also disappear from the customer website.`}
          confirmLabel="Delete Product"
          danger
          loading={
            actionProductId ===
            deletingProduct.id
          }
          icon={Trash2}
          onClose={() =>
            setDeletingProduct(null)
          }
          onConfirm={() =>
            void confirmDeleteProduct()
          }
        />
      )}

      {stockProduct && (
        <StockAdjustmentModal
          product={stockProduct}
          quantity={stockChange}
          note={stockNote}
          saving={savingStock}
          onQuantityChange={setStockChange}
          onNoteChange={setStockNote}
          onClose={() => {
            if (savingStock) {
              return;
            }

            setStockProduct(null);
            setStockChange("");
            setStockNote("");
          }}
          onSubmit={submitStockChange}
        />
      )}
    </>
  );
}

/* =========================================================
   TABLE AND DISPLAY COMPONENTS
========================================================= */

function TableHeading({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-slate-400 ${
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
      {children}
    </th>
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
  icon: IconType;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-blue-50">
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
      className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] ${className}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

function ToggleIndicator({
  active,
  activeLabel,
  inactiveLabel,
  icon: Icon,
}: {
  active: boolean;
  activeLabel: string;
  inactiveLabel: string;
  icon: IconType;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-bold ${
        active
          ? "text-blue-600"
          : "text-slate-400"
      }`}
    >
      <Icon size={14} />

      <span>
        {active
          ? activeLabel
          : inactiveLabel}
      </span>
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  disabled,
  danger = false,
}: {
  label: string;
  icon: IconType;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid h-9 w-9 place-items-center rounded-xl border transition disabled:cursor-not-allowed disabled:opacity-40 ${
        danger
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {disabled ? (
        <LoaderCircle
          size={16}
          className="animate-spin"
        />
      ) : (
        <Icon size={16} />
      )}
    </button>
  );
}

function MobileMetric({
  label,
  value,
  valueClassName = "text-slate-950",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="bg-slate-50 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-black ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}

function formatDate(
  value: string,
) {
  const date =
    new Date(value);

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

function formatTime(
  value: string,
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(date);
}

/* =========================================================
   SHARED TYPES USED BY DISPLAY COMPONENTS
========================================================= */

type ReactNode =
  import("react").ReactNode;

type IconType =
  typeof Package;

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
  const title =
    mode === "create"
      ? "Add Product"
      : "Edit Product";

  const description =
    mode === "create"
      ? "Create a live KRVE catalogue product and publish it to the customer website."
      : "Update product information, merchandising, inventory and publishing status.";

  return (
    <ModalShell
      title={title}
      description={description}
      icon={
        mode === "create"
          ? Plus
          : Edit3
      }
      onClose={onClose}
      maxWidth="max-w-6xl"
      closeDisabled={saving}
    >
      <form
        onSubmit={onSubmit}
      >
        <div className="max-h-[72vh] overflow-y-auto bg-slate-50 p-5 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <FormSection
                eyebrow="Basic Information"
                title="Product identity"
                description="Add the customer-facing name, URL slug, category and product descriptions."
                icon={Package}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="Product Name"
                    value={form.name}
                    placeholder="Example: KRVE Noir Signature Blazer"
                    error={errors.name}
                    required
                    onChange={
                      onNameChange
                    }
                  />

                  <TextField
                    label="Product Slug"
                    value={form.slug}
                    placeholder="krve-noir-signature-blazer"
                    error={errors.slug}
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
                    value={form.sku}
                    placeholder="KRVE-BLZ-001"
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "sku",
                        value
                          .trimStart()
                          .toUpperCase(),
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
                    placeholder="A concise product summary for cards and search results."
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
                    placeholder="Describe the product design, materials, fit, craftsmanship and styling."
                    rows={6}
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
                eyebrow="Commercial Details"
                title="Pricing and stock"
                description="Control selling price, compare-at price, currency and available inventory."
                icon={
                  CircleDollarSign
                }
              >
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  <TextField
                    label="Selling Price"
                    value={form.price}
                    type="number"
                    placeholder="18999"
                    error={errors.price}
                    required
                    min="0"
                    step="1"
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
                    label="Compare-at Price"
                    value={
                      form.compareAtPrice
                    }
                    type="number"
                    placeholder="22999"
                    error={
                      errors.compareAtPrice
                    }
                    min="0"
                    step="1"
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
                          "INR — Indian Rupee",
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
                    type="number"
                    placeholder="25"
                    error={
                      errors.stockQuantity
                    }
                    min="0"
                    step="1"
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

                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <Boxes
                      size={19}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div>
                      <p className="text-sm font-black text-blue-900">
                        Central inventory
                      </p>

                      <p className="mt-1 text-xs leading-6 text-blue-700">
                        Stock saved here becomes the customer website availability. Future orders will automatically reduce this quantity.
                      </p>
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection
                eyebrow="Product Variants"
                title="Sizes and colours"
                description="Enter comma-separated options that customers can select on the product page."
                icon={Tags}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="Available Sizes"
                    value={
                      form.sizesText
                    }
                    placeholder="S, M, L, XL"
                    helper="Separate every size with a comma."
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
                    label="Available Colours"
                    value={
                      form.coloursText
                    }
                    placeholder="Black, Navy, Ivory"
                    helper="Separate every colour with a comma."
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

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <ValuePreview
                    title="Size Preview"
                    values={splitCommaValues(
                      form.sizesText,
                    )}
                    emptyText="No sizes added"
                  />

                  <ValuePreview
                    title="Colour Preview"
                    values={splitCommaValues(
                      form.coloursText,
                    )}
                    emptyText="No colours added"
                  />
                </div>
              </FormSection>

              <FormSection
                eyebrow="Product Media"
                title="Images and gallery"
                description="Use publicly accessible image URLs. The primary image appears on homepage and collection cards."
                icon={ImageIcon}
              >
                <TextField
                  label="Primary Image URL"
                  value={
                    form.imageUrl
                  }
                  placeholder="https://example.com/product-image.jpg"
                  helper="Paste the final public image URL."
                  onChange={(
                    value,
                  ) =>
                    onChange(
                      "imageUrl",
                      value,
                    )
                  }
                />

                <div className="mt-5">
                  <TextAreaField
                    label="Gallery Image URLs"
                    value={
                      form.galleryText
                    }
                    placeholder="https://...front.jpg, https://...back.jpg, https://...detail.jpg"
                    helper="Separate image URLs with commas."
                    rows={4}
                    onChange={(
                      value,
                    ) =>
                      onChange(
                        "galleryText",
                        value,
                      )
                    }
                  />
                </div>
              </FormSection>
            </div>

            <aside className="space-y-6">
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">
                    Live Preview
                  </p>

                  <h3 className="mt-1 text-lg font-black text-slate-950">
                    Product card
                  </h3>
                </div>

                <div className="p-5">
                  <ProductPreview
                    form={form}
                  />
                </div>
              </section>

              <FormSection
                eyebrow="Publishing"
                title="Website visibility"
                description="Control where and how the product appears."
                icon={Eye}
                compact
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
                    description="Show this product in the homepage New Arrivals section."
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
                    description="Give this product priority in collection sorting."
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

                <PublishingExplanation
                  status={
                    form.status
                  }
                  newArrival={
                    form.newArrival
                  }
                />
              </FormSection>

              <section className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
                    <Sparkles
                      size={20}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.13em] text-blue-300">
                      KRVE Sync
                    </p>

                    <h3 className="mt-1 font-black">
                      Automatic publishing
                    </h3>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <SyncRow
                    label="Central D1 Database"
                    active
                  />

                  <SyncRow
                    label="Collections Page"
                    active={
                      form.status ===
                      "published"
                    }
                  />

                  <SyncRow
                    label="Homepage New Arrivals"
                    active={
                      form.status ===
                        "published" &&
                      form.newArrival
                    }
                  />

                  <SyncRow
                    label="Product Details"
                    active={
                      form.status ===
                      "published"
                    }
                  />
                </div>
              </section>
            </aside>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs leading-5 text-slate-500">
            Published products become visible on the KRVE website automatically.
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex min-w-[175px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                  {mode === "create" ? (
                    <Plus size={17} />
                  ) : (
                    <Edit3
                      size={17}
                    />
                  )}

                  {mode === "create"
                    ? "Create Product"
                    : "Save Changes"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}

/* =========================================================
   FORM SECTIONS AND FIELDS
========================================================= */

function FormSection({
  eyebrow,
  title,
  description,
  icon: Icon,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: IconType;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${
        compact
          ? "p-5"
          : "p-5 sm:p-6"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
            {eyebrow}
          </p>

          <h3 className="mt-1 text-lg font-black text-slate-950">
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
  helper,
  required = false,
  type = "text",
  min,
  step,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (
    value: string,
  ) => void;
  error?: string;
  helper?: string;
  required?: boolean;
  type?: string;
  min?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1 text-sm font-black text-slate-700">
        {label}

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        min={min}
        step={step}
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
        className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        }`}
      />

      {error ? (
        <p className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      ) : helper ? (
        <p className="mt-2 text-xs leading-5 text-slate-400">
          {helper}
        </p>
      ) : null}
    </label>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
  rows,
  helper,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (
    value: string,
  ) => void;
  rows: number;
  helper?: string;
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
        className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      {helper && (
        <p className="mt-2 text-xs leading-5 text-slate-400">
          {helper}
        </p>
      )}
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
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
  icon: IconType;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!checked)
      }
      className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${
        checked
          ? "border-blue-300 bg-blue-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start gap-3">
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
          <p
            className={`text-sm font-black ${
              checked
                ? "text-blue-900"
                : "text-slate-800"
            }`}
          >
            {label}
          </p>

          <p
            className={`mt-1 text-xs leading-5 ${
              checked
                ? "text-blue-700"
                : "text-slate-500"
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      <span
        className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

function ValuePreview({
  title,
  values,
  emptyText,
}: {
  title: string;
  values: string[];
  emptyText: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
        {title}
      </p>

      {values.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map(
            (value) => (
              <span
                key={value}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
              >
                {value}
              </span>
            ),
          )}
        </div>
      ) : (
        <p className="mt-3 text-xs text-slate-400">
          {emptyText}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   PRODUCT PREVIEW
========================================================= */

function ProductPreview({
  form,
}: {
  form: ProductFormState;
}) {
  const previewName =
    form.name.trim() ||
    "KRVE Product Name";

  const previewPrice =
    Number.isFinite(
      Number(form.price),
    )
      ? Number(form.price)
      : 0;

  const previewCompare =
    form.compareAtPrice.trim() &&
    Number.isFinite(
      Number(
        form.compareAtPrice,
      ),
    )
      ? Number(
          form.compareAtPrice,
        )
      : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative h-72 overflow-hidden bg-slate-100">
        {form.imageUrl.trim() ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={
              form.imageUrl.trim()
            }
            alt={previewName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <div className="text-center text-slate-400">
              <ImageIcon
                size={38}
                className="mx-auto"
              />

              <p className="mt-3 text-xs font-semibold">
                Product image preview
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {form.newArrival && (
            <span className="rounded-full bg-blue-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
              New Arrival
            </span>
          )}

          {form.featured && (
            <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-amber-950 shadow-lg">
              Featured
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3">
          <StatusBadge
            status={
              form.status
            }
          />
        </div>
      </div>

      <div className="p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-blue-600">
          {getCategoryLabel(
            form.category,
          )}
        </p>

        <h4 className="mt-2 text-lg font-black text-slate-950">
          {previewName}
        </h4>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
          {form.shortDescription.trim() ||
            form.description.trim() ||
            "Your product description will appear here."}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-black text-blue-600">
              {formatPrice(
                previewPrice,
                form.currency,
              )}
            </p>

            {previewCompare !== null &&
              previewCompare >
                previewPrice && (
                <p className="mt-1 text-xs text-slate-400 line-through">
                  {formatPrice(
                    previewCompare,
                    form.currency,
                  )}
                </p>
              )}
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-black ${
              Number(
                form.stockQuantity,
              ) > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {Number(
              form.stockQuantity,
            ) > 0
              ? `${Math.floor(
                  Number(
                    form.stockQuantity,
                  ),
                )} IN STOCK`
              : "OUT OF STOCK"}
          </span>
        </div>
      </div>
    </article>
  );
}

function PublishingExplanation({
  status,
  newArrival,
}: {
  status: ProductStatus;
  newArrival: boolean;
}) {
  if (
    status === "published" &&
    newArrival
  ) {
    return (
      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0 text-emerald-600"
          />

          <p className="text-xs font-semibold leading-6 text-emerald-800">
            This product will appear in Collections and the homepage New Arrivals section.
          </p>
        </div>
      </div>
    );
  }

  if (
    status === "published"
  ) {
    return (
      <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <Eye
            size={19}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <p className="text-xs font-semibold leading-6 text-blue-800">
            This product will appear in Collections, but not in New Arrivals.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-start gap-3">
        <EyeOff
          size={19}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <p className="text-xs font-semibold leading-6 text-amber-800">
          Draft and archived products remain hidden from customers.
        </p>
      </div>
    </div>
  );
}

function SyncRow({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-xs font-semibold text-slate-300">
        {label}
      </span>

      <span
        className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide ${
          active
            ? "text-emerald-300"
            : "text-slate-500"
        }`}
      >
        {active ? (
          <CheckCircle2
            size={13}
          />
        ) : (
          <X size={13} />
        )}

        {active
          ? "Active"
          : "Hidden"}
      </span>
    </div>
  );
}

/* =========================================================
   STOCK ADJUSTMENT MODAL
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
  const change =
    Number(quantity);

  const projectedStock =
    Number.isFinite(change)
      ? Math.max(
          0,
          product.stockQuantity +
            Math.trunc(change),
        )
      : product.stockQuantity;

  return (
    <ModalShell
      title="Adjust Inventory"
      description={`Update available stock for ${product.name}.`}
      icon={Boxes}
      onClose={onClose}
      maxWidth="max-w-xl"
      closeDisabled={saving}
    >
      <form
        onSubmit={onSubmit}
      >
        <div className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <InventoryValue
              label="Current Stock"
              value={`${product.stockQuantity}`}
              note="Available units"
            />

            <InventoryValue
              label="Projected Stock"
              value={`${projectedStock}`}
              note="After adjustment"
              highlighted
            />
          </div>

          <TextField
            label="Stock Adjustment"
            value={quantity}
            placeholder="Example: 10 or -3"
            type="number"
            step="1"
            required
            helper="Use a positive number to add stock and a negative number to reduce stock."
            onChange={
              onQuantityChange
            }
          />

          <TextAreaField
            label="Adjustment Note"
            value={note}
            placeholder="Example: New warehouse stock received."
            rows={4}
            onChange={
              onNoteChange
            }
          />

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <RefreshCw
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-xs font-semibold leading-6 text-blue-800">
                Saving this adjustment updates website availability and creates an inventory audit transaction.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex min-w-[160px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
                Updating...
              </>
            ) : (
              <>
                <Boxes size={17} />
                Update Stock
              </>
            )}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function InventoryValue({
  label,
  value,
  note,
  highlighted = false,
}: {
  label: string;
  value: string;
  note: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlighted
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p
        className={`text-[10px] font-black uppercase tracking-[0.12em] ${
          highlighted
            ? "text-blue-600"
            : "text-slate-400"
        }`}
      >
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-black ${
          highlighted
            ? "text-blue-700"
            : "text-slate-950"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {note}
      </p>
    </div>
  );
}

/* =========================================================
   CONFIRMATION MODAL
========================================================= */

function ConfirmationModal({
  title,
  description,
  confirmLabel,
  icon: Icon,
  onClose,
  onConfirm,
  loading,
  danger = false,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  icon: IconType;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  danger?: boolean;
}) {
  return (
    <ModalShell
      title={title}
      description="Please review this action carefully."
      icon={Icon}
      onClose={onClose}
      maxWidth="max-w-lg"
      closeDisabled={
        loading
      }
      dangerHeader={
        danger
      }
    >
      <div className="p-6">
        <div
          className={`rounded-2xl border p-5 ${
            danger
              ? "border-red-200 bg-red-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={21}
              className={`mt-0.5 shrink-0 ${
                danger
                  ? "text-red-600"
                  : "text-amber-600"
              }`}
            />

            <p
              className={`text-sm font-semibold leading-7 ${
                danger
                  ? "text-red-800"
                  : "text-amber-800"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`flex min-w-[165px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
            danger
              ? "bg-red-600 hover:bg-red-700"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {loading ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
              Processing...
            </>
          ) : (
            <>
              <Icon size={17} />
              {confirmLabel}
            </>
          )}
        </button>
      </div>
    </ModalShell>
  );
}

/* =========================================================
   MODAL SHELL
========================================================= */

function ModalShell({
  title,
  description,
  icon: Icon,
  onClose,
  children,
  maxWidth = "max-w-3xl",
  closeDisabled = false,
  dangerHeader = false,
}: {
  title: string;
  description: string;
  icon: IconType;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  closeDisabled?: boolean;
  dangerHeader?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`w-full ${maxWidth} overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl`}
      >
        <div
          className={`flex items-start justify-between gap-4 px-5 py-5 text-white sm:px-6 ${
            dangerHeader
              ? "bg-gradient-to-r from-red-600 to-red-800"
              : "bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a]"
          }`}
        >
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <Icon size={21} />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-black">
                {title}
              </h2>

              <p className="mt-1 text-sm leading-6 text-white/75">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={
              closeDisabled
            }
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
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
