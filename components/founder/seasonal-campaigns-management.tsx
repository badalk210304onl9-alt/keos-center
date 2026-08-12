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
  BadgePercent,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  ImageIcon,
  LoaderCircle,
  Package,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type CampaignStatus =
  | "scheduled"
  | "live"
  | "expired"
  | "archived";

type CampaignProduct = {
  id?: string;
  productId: string;
  productName?: string;
  productSlug?: string;
  imageUrl?: string;
  price?: number;
  discountPercent: number;
};

type Campaign = {
  id: string;
  slug: string;
  name: string;

  description: string | null;
  bannerUrl: string | null;

  status: CampaignStatus;

  startAt: string;
  endAt: string;

  maxDiscountPercent: number;

  createdBy?: string | null;
  createdAt?: string;
  updatedAt?: string;

  products?: CampaignProduct[];
};

type Product = {
  id: string;
  slug: string;
  name: string;

  price: number;
  compareAtPrice?: number | null;

  imageUrl?: string;
  image?: string;

  status?: string;
};

type CampaignFormState = {
  name: string;
  slug: string;
  description: string;
  bannerUrl: string;

  startAt: string;
  endAt: string;

  maxDiscountPercent: string;

  selectedProducts: string[];
};

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

type CampaignListResponse = {
  success: boolean;

  data?:
    | Campaign[]
    | {
        campaigns?: Campaign[];
      };

  message?: string;
};

type CampaignResponse = {
  success: boolean;
  data?: Campaign;
  message?: string;
};

type ProductsResponse = {
  success: boolean;

  data?: {
    products?: Product[];
  };

  message?: string;
};

/* =========================================================
   HELPERS
========================================================= */

function createEmptyForm(): CampaignFormState {
  return {
    name: "",
    slug: "",
    description: "",
    bannerUrl: "",

    startAt: "",
    endAt: "",

    maxDiscountPercent: "60",

    selectedProducts: [],
  };
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normaliseCampaign(
  campaign: Record<string, unknown>,
): Campaign {
  const rawProducts =
    Array.isArray(campaign.products)
      ? campaign.products
      : [];

  return {
    id: String(
      campaign.id ?? "",
    ),

    slug: String(
      campaign.slug ?? "",
    ),

    name: String(
      campaign.name ?? "",
    ),

    description:
      campaign.description
        ? String(
            campaign.description,
          )
        : null,

    bannerUrl:
      campaign.bannerUrl ||
      campaign.banner_url
        ? String(
            campaign.bannerUrl ??
              campaign.banner_url,
          )
        : null,

    status: String(
      campaign.status ??
        "scheduled",
    ) as CampaignStatus,

    startAt: String(
      campaign.startAt ??
        campaign.start_at ??
        "",
    ),

    endAt: String(
      campaign.endAt ??
        campaign.end_at ??
        "",
    ),

    maxDiscountPercent:
      Number(
        campaign.maxDiscountPercent ??
          campaign.max_discount_percent ??
          0,
      ) || 0,

    createdBy:
      campaign.createdBy ||
      campaign.created_by
        ? String(
            campaign.createdBy ??
              campaign.created_by,
          )
        : null,

    createdAt:
      campaign.createdAt ||
      campaign.created_at
        ? String(
            campaign.createdAt ??
              campaign.created_at,
          )
        : undefined,

    updatedAt:
      campaign.updatedAt ||
      campaign.updated_at
        ? String(
            campaign.updatedAt ??
              campaign.updated_at,
          )
        : undefined,

    products:
      rawProducts.map(
        (
          item,
        ): CampaignProduct => {
          const product =
            item as Record<
              string,
              unknown
            >;

          return {
            id:
              product.id
                ? String(
                    product.id,
                  )
                : undefined,

            productId:
              String(
                product.productId ??
                  product.product_id ??
                  "",
              ),

            productName:
              product.productName ||
              product.product_name ||
              product.name
                ? String(
                    product.productName ??
                      product.product_name ??
                      product.name,
                  )
                : undefined,

            productSlug:
              product.productSlug ||
              product.product_slug ||
              product.slug
                ? String(
                    product.productSlug ??
                      product.product_slug ??
                      product.slug,
                  )
                : undefined,

            imageUrl:
              product.imageUrl ||
              product.image_url ||
              product.image
                ? String(
                    product.imageUrl ??
                      product.image_url ??
                      product.image,
                  )
                : undefined,

            price:
              product.price !==
              undefined
                ? Number(
                    product.price,
                  )
                : undefined,

            discountPercent:
              Number(
                product.discountPercent ??
                  product.discount_percent ??
                  0,
              ) || 0,
          };
        },
      ),
  };
}

function formatDateTime(
  value: string,
) {
  if (!value) {
    return "Not set";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

function getComputedStatus(
  campaign: Campaign,
): CampaignStatus {
  if (
    campaign.status ===
    "archived"
  ) {
    return "archived";
  }

  const now = Date.now();

  const start =
    new Date(
      campaign.startAt,
    ).getTime();

  const end =
    new Date(
      campaign.endAt,
    ).getTime();

  if (
    Number.isFinite(end) &&
    now > end
  ) {
    return "expired";
  }

  if (
    Number.isFinite(start) &&
    now < start
  ) {
    return "scheduled";
  }

  if (
    Number.isFinite(start) &&
    Number.isFinite(end) &&
    now >= start &&
    now <= end
  ) {
    return "live";
  }

  return campaign.status;
}

function statusClasses(
  status: CampaignStatus,
) {
  switch (status) {
    case "live":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "scheduled":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "expired":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "archived":
      return "border-slate-200 bg-slate-100 text-slate-600";

    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

function statusLabel(
  status: CampaignStatus,
) {
  switch (status) {
    case "live":
      return "LIVE";

    case "scheduled":
      return "SCHEDULED";

    case "expired":
      return "EXPIRED";

    case "archived":
      return "ARCHIVED";

    default:
      return status;
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function SeasonalCampaignsManagement() {
  const [
    campaigns,
    setCampaigns,
  ] = useState<Campaign[]>(
    [],
  );

  const [
    products,
    setProducts,
  ] = useState<Product[]>(
    [],
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState<
    string | null
  >(null);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    productSearch,
    setProductSearch,
  ] = useState("");

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    editingCampaign,
    setEditingCampaign,
  ] = useState<
    Campaign | null
  >(null);

  const [
    viewingCampaign,
    setViewingCampaign,
  ] = useState<
    Campaign | null
  >(null);

  const [
    form,
    setForm,
  ] =
    useState<CampaignFormState>(
      createEmptyForm(),
    );

  const [
    toast,
    setToast,
  ] =
    useState<ToastState>(
      null,
    );

  /* =======================================================
     LOAD DATA
  ======================================================= */

  const loadCampaigns =
    useCallback(
      async () => {
        try {
          const response =
            await fetch(
              "/api/keos/campaigns",
              {
                method:
                  "GET",

                cache:
                  "no-store",
              },
            );

          const result =
            (await response.json()) as CampaignListResponse;

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
                "Unable to load seasonal campaigns.",
            );
          }

          let rawCampaigns:
            Campaign[] = [];

          if (
            Array.isArray(
              result.data,
            )
          ) {
            rawCampaigns =
              result.data.map(
                (
                  item,
                ) =>
                  normaliseCampaign(
                    item as unknown as Record<
                      string,
                      unknown
                    >,
                  ),
              );
          } else if (
            result.data &&
            Array.isArray(
              result.data
                .campaigns,
            )
          ) {
            rawCampaigns =
              result.data.campaigns.map(
                (
                  item,
                ) =>
                  normaliseCampaign(
                    item as unknown as Record<
                      string,
                      unknown
                    >,
                  ),
              );
          }

          setCampaigns(
            rawCampaigns,
          );
        } catch (
          error
        ) {
          setToast({
            type: "error",

            message:
              error instanceof
              Error
                ? error.message
                : "Unable to load campaigns.",
          });
        }
      },
      [],
    );

  const loadProducts =
    useCallback(
      async () => {
        try {
          const response =
            await fetch(
              "/api/keos/products?limit=100&status=published",
              {
                method:
                  "GET",

                cache:
                  "no-store",
              },
            );

          const result =
            (await response.json()) as ProductsResponse;

          if (
            !response.ok ||
            !result.success
          ) {
            return;
          }

          setProducts(
            result.data
              ?.products ||
              [],
          );
        } catch {
          /*
           * Campaign screen can
           * still load even if
           * products temporarily
           * fail.
           */
        }
      },
      [],
    );

  const refreshAll =
    useCallback(
      async () => {
        setLoading(true);

        await Promise.all([
          loadCampaigns(),
          loadProducts(),
        ]);

        setLoading(false);
      },
      [
        loadCampaigns,
        loadProducts,
      ],
    );

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  /* =======================================================
     COMPUTED DATA
  ======================================================= */

  const filteredCampaigns =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return campaigns;
      }

      return campaigns.filter(
        (campaign) =>
          campaign.name
            .toLowerCase()
            .includes(
              query,
            ) ||
          campaign.slug
            .toLowerCase()
            .includes(
              query,
            ) ||
          (
            campaign.description ||
            ""
          )
            .toLowerCase()
            .includes(
              query,
            ),
      );
    }, [
      campaigns,
      search,
    ]);

  const filteredProducts =
    useMemo(() => {
      const query =
        productSearch
          .trim()
          .toLowerCase();

      if (!query) {
        return products;
      }

      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(
              query,
            ) ||
          product.slug
            .toLowerCase()
            .includes(
              query,
            ),
      );
    }, [
      products,
      productSearch,
    ]);

  const stats =
    useMemo(() => {
      let live = 0;
      let scheduled = 0;
      let expired = 0;

      campaigns.forEach(
        (campaign) => {
          const status =
            getComputedStatus(
              campaign,
            );

          if (
            status ===
            "live"
          ) {
            live += 1;
          }

          if (
            status ===
            "scheduled"
          ) {
            scheduled += 1;
          }

          if (
            status ===
            "expired"
          ) {
            expired += 1;
          }
        },
      );

      return {
        total:
          campaigns.length,
        live,
        scheduled,
        expired,
      };
    }, [campaigns]);

  /* =======================================================
     MODAL
  ======================================================= */

  function openCreateModal() {
    setEditingCampaign(
      null,
    );

    setForm(
      createEmptyForm(),
    );

    setProductSearch(
      "",
    );

    setShowModal(true);
  }

  function openEditModal(
    campaign: Campaign,
  ) {
    setEditingCampaign(
      campaign,
    );

    setForm({
      name:
        campaign.name,

      slug:
        campaign.slug,

      description:
        campaign.description ||
        "",

      bannerUrl:
        campaign.bannerUrl ||
        "",

      startAt:
        campaign.startAt
          ? campaign.startAt.slice(
              0,
              16,
            )
          : "",

      endAt:
        campaign.endAt
          ? campaign.endAt.slice(
              0,
              16,
            )
          : "",

      maxDiscountPercent:
        String(
          campaign.maxDiscountPercent,
        ),

      selectedProducts:
        campaign.products?.map(
          (item) =>
            item.productId,
        ) || [],
    });

    setProductSearch(
      "",
    );

    setShowModal(true);
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setShowModal(false);

    setEditingCampaign(
      null,
    );
  }

  function updateForm<
    K extends keyof CampaignFormState,
  >(
    key: K,
    value: CampaignFormState[K],
  ) {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      }),
    );
  }

  function handleNameChange(
    value: string,
  ) {
    setForm(
      (current) => ({
        ...current,

        name: value,

        slug:
          editingCampaign
            ? current.slug
            : createSlug(
                value,
              ),
      }),
    );
  }

  function toggleProduct(
    productId: string,
  ) {
    setForm(
      (current) => {
        const selected =
          current.selectedProducts.includes(
            productId,
          );

        return {
          ...current,

          selectedProducts:
            selected
              ? current.selectedProducts.filter(
                  (id) =>
                    id !==
                    productId,
                )
              : [
                  ...current.selectedProducts,
                  productId,
                ],
        };
      },
    );
  }

  /* =======================================================
     SAVE
  ======================================================= */

  async function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    const name =
      form.name.trim();

    const slug =
      createSlug(
        form.slug,
      );

    const discount =
      Number(
        form.maxDiscountPercent,
      );

    if (!name) {
      setToast({
        type: "error",
        message:
          "Campaign name is required.",
      });

      return;
    }

    if (!slug) {
      setToast({
        type: "error",
        message:
          "Campaign slug is required.",
      });

      return;
    }

    if (
      !form.startAt ||
      !form.endAt
    ) {
      setToast({
        type: "error",
        message:
          "Campaign start and end date are required.",
      });

      return;
    }

    const startDate =
      new Date(
        form.startAt,
      );

    const endDate =
      new Date(
        form.endAt,
      );

    if (
      endDate.getTime() <=
      startDate.getTime()
    ) {
      setToast({
        type: "error",

        message:
          "Campaign end date must be after the start date.",
      });

      return;
    }

    if (
      !Number.isFinite(
        discount,
      ) ||
      discount < 0 ||
      discount > 100
    ) {
      setToast({
        type: "error",

        message:
          "Maximum discount must be between 0 and 100.",
      });

      return;
    }

    setSaving(true);

    try {
      const payload = {
        name,
        slug,

        description:
          form.description.trim(),

        bannerUrl:
          form.bannerUrl.trim(),

        startAt:
          startDate.toISOString(),

        endAt:
          endDate.toISOString(),

        maxDiscountPercent:
          discount,

        productIds:
          form.selectedProducts,

        products:
          form.selectedProducts.map(
            (
              productId,
            ) => ({
              productId,

              discountPercent:
                discount,
            }),
          ),
      };

      const endpoint =
        editingCampaign
          ? `/api/keos/campaigns/${encodeURIComponent(
              editingCampaign.id,
            )}`
          : "/api/keos/campaigns";

      const response =
        await fetch(
          endpoint,
          {
            method:
              editingCampaign
                ? "PATCH"
                : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload,
              ),
          },
        );

      const result =
        (await response.json()) as CampaignResponse;

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to save campaign.",
        );
      }

      setToast({
        type: "success",

        message:
          editingCampaign
            ? "Campaign updated successfully."
            : "Seasonal campaign created successfully.",
      });

      setShowModal(false);

      setEditingCampaign(
        null,
      );

      await loadCampaigns();
    } catch (
      error
    ) {
      setToast({
        type: "error",

        message:
          error instanceof
          Error
            ? error.message
            : "Unable to save campaign.",
      });
    } finally {
      setSaving(false);
    }
  }

  /* =======================================================
     DELETE
  ======================================================= */

  async function deleteCampaign(
    campaign: Campaign,
  ) {
    const confirmed =
      window.confirm(
        `Delete "${campaign.name}"?\n\nThis will remove the campaign from KEOS. Products themselves should remain in the main KRVE catalogue.`,
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(
      campaign.id,
    );

    try {
      const response =
        await fetch(
          `/api/keos/campaigns/${encodeURIComponent(
            campaign.id,
          )}`,
          {
            method:
              "DELETE",
          },
        );

      const result =
        (await response.json()) as {
          success: boolean;
          message?: string;
        };

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to delete campaign.",
        );
      }

      setCampaigns(
        (current) =>
          current.filter(
            (item) =>
              item.id !==
              campaign.id,
          ),
      );

      setToast({
        type: "success",

        message:
          "Campaign deleted successfully.",
      });
    } catch (
      error
    ) {
      setToast({
        type: "error",

        message:
          error instanceof
          Error
            ? error.message
            : "Unable to delete campaign.",
      });
    } finally {
      setDeletingId(
        null,
      );
    }
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-7 text-white md:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                <Sparkles
                  size={16}
                />

                KRVE Commerce
                Control
              </div>

              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                Seasonal
                Campaigns
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Create and
                control
                time-limited
                KRVE sales,
                festive
                campaigns,
                campaign
                products and
                discounts from
                KEOS Center.
              </p>
            </div>

            <button
              type="button"
              onClick={
                openCreateModal
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              <Plus
                size={18}
              />

              Create Campaign
            </button>
          </div>
        </div>
      </section>

      {/* KPI */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={
            CalendarClock
          }
          label="Total Campaigns"
          value={String(
            stats.total,
          )}
          helper="All seasonal campaigns"
        />

        <StatCard
          icon={
            CheckCircle2
          }
          label="Live Now"
          value={String(
            stats.live,
          )}
          helper="Visible to customers"
        />

        <StatCard
          icon={Clock3}
          label="Scheduled"
          value={String(
            stats.scheduled,
          )}
          helper="Waiting for launch"
        />

        <StatCard
          icon={
            AlertTriangle
          }
          label="Expired"
          value={String(
            stats.expired,
          )}
          helper="Campaign period ended"
        />
      </section>

      {/* CONTROLS */}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(
                event,
              ) =>
                setSearch(
                  event
                    .target
                    .value,
                )
              }
              placeholder="Search campaigns..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              void refreshAll()
            }
            disabled={
              loading
            }
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>
      </section>

      {/* CAMPAIGNS */}

      {loading ? (
        <section className="grid min-h-[320px] place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="text-center">
            <LoaderCircle
              size={36}
              className="mx-auto animate-spin text-blue-600"
            />

            <p className="mt-3 text-sm font-bold text-slate-600">
              Loading
              campaigns...
            </p>
          </div>
        </section>
      ) : filteredCampaigns.length ===
        0 ? (
        <section className="grid min-h-[340px] place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <CalendarClock
                size={30}
              />
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-950">
              No Seasonal
              Campaigns
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create the
              first festive
              or seasonal
              campaign and
              control its
              dates,
              products and
              maximum
              discount from
              KEOS.
            </p>

            <button
              type="button"
              onClick={
                openCreateModal
              }
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700"
            >
              <Plus
                size={18}
              />

              Create First
              Campaign
            </button>
          </div>
        </section>
      ) : (
        <section className="grid gap-5 xl:grid-cols-2">
          {filteredCampaigns.map(
            (
              campaign,
            ) => {
              const status =
                getComputedStatus(
                  campaign,
                );

              return (
                <article
                  key={
                    campaign.id
                  }
                  className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
                >
                  {campaign.bannerUrl ? (
                    <div className="relative h-40 overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          campaign.bannerUrl
                        }
                        alt={
                          campaign.name
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid h-32 place-items-center bg-gradient-to-br from-slate-950 to-blue-950 text-white">
                      <div className="text-center">
                        <Sparkles
                          size={25}
                          className="mx-auto text-amber-400"
                        />

                        <p className="mt-2 text-xs font-black uppercase tracking-[0.18em]">
                          KRVE
                          Seasonal
                          Campaign
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black tracking-wider ${statusClasses(
                            status,
                          )}`}
                        >
                          {statusLabel(
                            status,
                          )}
                        </span>

                        <h2 className="mt-3 truncate text-lg font-black text-slate-950">
                          {
                            campaign.name
                          }
                        </h2>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          /
                          {
                            campaign.slug
                          }
                        </p>
                      </div>

                      <div className="rounded-xl bg-blue-50 px-3 py-2 text-right">
                        <p className="text-xl font-black text-blue-600">
                          {
                            campaign.maxDiscountPercent
                          }
                          %
                        </p>

                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                          Max Off
                        </p>
                      </div>
                    </div>

                    {campaign.description && (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                        {
                          campaign.description
                        }
                      </p>
                    )}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <DateBox
                        label="Starts"
                        value={formatDateTime(
                          campaign.startAt,
                        )}
                      />

                      <DateBox
                        label="Ends"
                        value={formatDateTime(
                          campaign.endAt,
                        )}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Package
                          size={17}
                          className="text-blue-600"
                        />

                        <span className="text-xs font-black text-slate-700">
                          {
                            campaign
                              .products
                              ?.length ||
                            0
                          }{" "}
                          Products
                        </span>
                      </div>

                      {status ===
                        "expired" && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                          Sale
                          Ended
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          setViewingCampaign(
                            campaign,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-50"
                      >
                        <Eye
                          size={
                            15
                          }
                        />

                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            campaign,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700 hover:bg-blue-100"
                      >
                        <Edit3
                          size={
                            15
                          }
                        />

                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          deletingId ===
                          campaign.id
                        }
                        onClick={() =>
                          void deleteCampaign(
                            campaign,
                          )
                        }
                        className="ml-auto inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-black text-red-600 hover:bg-red-100 disabled:opacity-50"
                      >
                        {deletingId ===
                        campaign.id ? (
                          <LoaderCircle
                            size={
                              15
                            }
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={
                              15
                            }
                          />
                        )}

                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </section>
      )}

      {/* CREATE / EDIT MODAL */}

      {showModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="mx-auto my-6 max-w-5xl overflow-hidden rounded-[28px] bg-slate-50 shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-5 text-white">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                  Seasonal
                  Campaign
                </p>

                <h2 className="mt-1 text-xl font-black">
                  {editingCampaign
                    ? "Edit Campaign"
                    : "Create Campaign"}
                </h2>
              </div>

              <button
                type="button"
                onClick={
                  closeModal
                }
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20"
              >
                <X
                  size={20}
                />
              </button>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6 p-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Campaign Name"
                  required
                >
                  <input
                    value={
                      form.name
                    }
                    onChange={(
                      event,
                    ) =>
                      handleNameChange(
                        event
                          .target
                          .value,
                      )
                    }
                    placeholder="Raksha Bandhan Sale"
                    className="form-input"
                  />
                </Field>

                <Field
                  label="Campaign Slug"
                  required
                >
                  <input
                    value={
                      form.slug
                    }
                    onChange={(
                      event,
                    ) =>
                      updateForm(
                        "slug",
                        createSlug(
                          event
                            .target
                            .value,
                        ),
                      )
                    }
                    placeholder="raksha-bandhan-sale"
                    className="form-input"
                  />
                </Field>
              </div>

              <Field label="Campaign Description">
                <textarea
                  value={
                    form.description
                  }
                  onChange={(
                    event,
                  ) =>
                    updateForm(
                      "description",
                      event
                        .target
                        .value,
                    )
                  }
                  rows={3}
                  placeholder="Celebrate Raksha Bandhan with KRVE..."
                  className="form-input min-h-[100px] resize-y"
                />
              </Field>

              <Field label="Banner Image URL">
                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={
                      form.bannerUrl
                    }
                    onChange={(
                      event,
                    ) =>
                      updateForm(
                        "bannerUrl",
                        event
                          .target
                          .value,
                      )
                    }
                    placeholder="https://..."
                    className="form-input form-input-icon"
                  />
                </div>
              </Field>

              <div className="grid gap-5 md:grid-cols-3">
                <Field
                  label="Start Date & Time"
                  required
                >
                  <input
                    type="datetime-local"
                    value={
                      form.startAt
                    }
                    onChange={(
                      event,
                    ) =>
                      updateForm(
                        "startAt",
                        event
                          .target
                          .value,
                      )
                    }
                    className="form-input"
                  />
                </Field>

                <Field
                  label="End Date & Time"
                  required
                >
                  <input
                    type="datetime-local"
                    value={
                      form.endAt
                    }
                    onChange={(
                      event,
                    ) =>
                      updateForm(
                        "endAt",
                        event
                          .target
                          .value,
                      )
                    }
                    className="form-input"
                  />
                </Field>

                <Field
                  label="Maximum Discount %"
                  required
                >
                  <div className="relative">
                    <BadgePercent
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={
                        form.maxDiscountPercent
                      }
                      onChange={(
                        event,
                      ) =>
                        updateForm(
                          "maxDiscountPercent",
                          event
                            .target
                            .value,
                        )
                      }
                      className="form-input form-input-icon"
                    />
                  </div>
                </Field>
              </div>

              {/* PRODUCTS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-black text-slate-950">
                      Campaign
                      Products
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Select
                      products
                      that will
                      participate
                      in this
                      seasonal
                      campaign.
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
                    {
                      form
                        .selectedProducts
                        .length
                    }{" "}
                    Selected
                  </span>
                </div>

                <div className="relative mt-4">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={
                      productSearch
                    }
                    onChange={(
                      event,
                    ) =>
                      setProductSearch(
                        event
                          .target
                          .value,
                      )
                    }
                    placeholder="Search KRVE products..."
                    className="form-input form-input-icon"
                  />
                </div>

                <div className="mt-4 max-h-[320px] space-y-2 overflow-y-auto pr-1">
                  {filteredProducts.length ===
                  0 ? (
                    <div className="rounded-xl bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
                      No
                      published
                      products
                      found.
                    </div>
                  ) : (
                    filteredProducts.map(
                      (
                        product,
                      ) => {
                        const selected =
                          form.selectedProducts.includes(
                            product.id,
                          );

                        return (
                          <button
                            key={
                              product.id
                            }
                            type="button"
                            onClick={() =>
                              toggleProduct(
                                product.id,
                              )
                            }
                            className={`flex w-full items-center gap-4 rounded-xl border p-3 text-left transition ${
                              selected
                                ? "border-blue-400 bg-blue-50"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                          >
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                              {product.imageUrl ||
                              product.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={
                                    product.imageUrl ||
                                    product.image
                                  }
                                  alt={
                                    product.name
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="grid h-full place-items-center text-slate-400">
                                  <Package
                                    size={
                                      20
                                    }
                                  />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-black text-slate-900">
                                {
                                  product.name
                                }
                              </p>

                              <p className="mt-1 text-xs font-semibold text-slate-500">
                                ₹
                                {Number(
                                  product.price,
                                ).toLocaleString(
                                  "en-IN",
                                )}
                              </p>
                            </div>

                            <div
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                                selected
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {selected && (
                                <CheckCircle2
                                  size={
                                    15
                                  }
                                />
                              )}
                            </div>
                          </button>
                        );
                      },
                    )
                  )}
                </div>
              </section>

              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <div className="flex gap-3">
                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <p className="text-xs leading-5 text-amber-800">
                    When the
                    campaign
                    reaches its
                    end date,
                    customers
                    should no
                    longer see
                    the
                    campaign
                    sale. The
                    selected
                    products
                    remain in
                    the normal
                    KRVE
                    catalogue;
                    only their
                    campaign
                    association
                    ends.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    saving
                  }
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? (
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <CheckCircle2
                      size={18}
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : editingCampaign
                      ? "Save Changes"
                      : "Create Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}

      {viewingCampaign && (
        <div className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-[26px] bg-white shadow-2xl">
            {viewingCampaign.bannerUrl && (
              <div className="h-52 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    viewingCampaign.bannerUrl
                  }
                  alt={
                    viewingCampaign.name
                  }
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black ${statusClasses(
                      getComputedStatus(
                        viewingCampaign,
                      ),
                    )}`}
                  >
                    {statusLabel(
                      getComputedStatus(
                        viewingCampaign,
                      ),
                    )}
                  </span>

                  <h2 className="mt-3 text-2xl font-black text-slate-950">
                    {
                      viewingCampaign.name
                    }
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setViewingCampaign(
                      null,
                    )
                  }
                  className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  <X
                    size={19}
                  />
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {viewingCampaign.description ||
                  "No campaign description."}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DateBox
                  label="Campaign Starts"
                  value={formatDateTime(
                    viewingCampaign.startAt,
                  )}
                />

                <DateBox
                  label="Campaign Ends"
                  value={formatDateTime(
                    viewingCampaign.endAt,
                  )}
                />
              </div>

              <div className="mt-4 rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-bold text-blue-600">
                  MAXIMUM
                  CAMPAIGN
                  DISCOUNT
                </p>

                <p className="mt-1 text-3xl font-black text-blue-700">
                  {
                    viewingCampaign.maxDiscountPercent
                  }
                  % OFF
                </p>
              </div>

              <div className="mt-5">
                <p className="text-sm font-black text-slate-900">
                  Campaign
                  Products
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {
                    viewingCampaign
                      .products
                      ?.length ||
                    0
                  }{" "}
                  product(s)
                  attached
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[200] flex max-w-md items-start gap-3 rounded-2xl border px-4 py-4 shadow-xl ${
            toast.type ===
            "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {toast.type ===
          "success" ? (
            <CheckCircle2
              size={20}
              className="shrink-0"
            />
          ) : (
            <AlertTriangle
              size={20}
              className="shrink-0"
            />
          )}

          <p className="text-sm font-bold">
            {toast.message}
          </p>

          <button
            type="button"
            onClick={() =>
              setToast(
                null,
              )
            }
            className="ml-2"
          >
            <X
              size={17}
            />
          </button>
        </div>
      )}

      <style jsx>{`
        .form-input {
          width: 100%;
          min-height: 48px;
          border: 1px solid rgb(226 232 240);
          border-radius: 12px;
          background: white;
          padding: 0.75rem 1rem;
          color: rgb(15 23 42);
          font-size: 0.875rem;
          font-weight: 600;
          outline: none;
          transition: 150ms ease;
        }

        .form-input-icon {
          padding-left: 3rem !important;
        }

        .form-input[type="datetime-local"],
        .form-input[type="number"] {
          line-height: 1.25rem;
        }

        .form-input::placeholder {
          color: rgb(148 163 184);
          opacity: 1;
        }

        .form-input:focus {
          border-color: rgb(59 130 246);
          box-shadow: 0 0 0 4px
            rgb(219 234 254);
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof CalendarClock;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon
            size={21}
          />
        </div>

        <Sparkles
          size={16}
          className="text-slate-300"
        />
      </div>

      <p className="mt-4 text-2xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-sm font-black text-slate-800">
        {label}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {helper}
      </p>
    </article>
  );
}

function DateBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}
