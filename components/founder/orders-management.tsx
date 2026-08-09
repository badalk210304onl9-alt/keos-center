"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  PackageCheck,
  PackageOpen,
  RefreshCw,
  Search,
  ShoppingBag,
  Truck,
  WalletCards,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Failed"
  | "Refunded";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned";

type ShippingAddress = {
  recipientName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

type StoreOrder = {
  id: string;
  orderNumber: string;

  createdAt: string;
  updatedAt: string;

  customerId: string | null;

  customer: {
    name: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    phone: string;
  };

  shippingAddress: ShippingAddress;
  billingAddress: ShippingAddress;

  itemCount: number;

  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;

  currency: string;

  couponCode?: string | null;
  notes?: string | null;

  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;

  courier?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  trackingLocation?: string | null;
  shippedAt?: string | null;
  outForDeliveryAt?: string | null;
  deliveredAt?: string | null;
};

type RawApiOrder = {
  id: string;

  orderNumber: string;

  customerId: string | null;

  customer: {
    name: string;

    firstName?: string | null;
    lastName?: string | null;

    email: string;
    phone: string;
  };

  status: string;

  paymentStatus: string;

  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;

  currency: string;

  couponCode?: string | null;

  shippingAddress?: ShippingAddress;
  billingAddress?: ShippingAddress;

  notes?: string | null;

  itemCount?: number;

  createdAt: string;
  updatedAt: string;

  courier?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  trackingLocation?: string | null;
  location?: string | null;
  shippedAt?: string | null;
  outForDeliveryAt?: string | null;
  deliveredAt?: string | null;
};

type OrdersApiResponse = {
  success: boolean;

  message?: string;

  orders?: RawApiOrder[];

  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
};

type ModuleId =
  | "all-orders"
  | "order-processing"
  | "payments"
  | "fulfilment"
  | "shipping";

/* =========================================================
   MODULES
========================================================= */

const modules: Array<{
  id: ModuleId;
  title: string;
  description: string;
  icon: typeof PackageOpen;
}> = [
  {
    id: "all-orders",
    title: "All Orders",
    description:
      "View every live order received from the KRVE website.",
    icon: PackageOpen,
  },

  {
    id: "order-processing",
    title: "Order Processing",
    description:
      "Manage confirmation, verification and processing queues.",
    icon: PackageCheck,
  },

  {
    id: "payments",
    title: "Payments",
    description:
      "Track paid, pending, failed and refunded orders.",
    icon: WalletCards,
  },

  {
    id: "fulfilment",
    title: "Fulfilment",
    description:
      "Monitor confirmed, processing and packed orders.",
    icon: ShoppingBag,
  },

  {
    id: "shipping",
    title: "Shipping",
    description:
      "Monitor shipped and delivered customer orders.",
    icon: Truck,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function money(
  value: number,
  currency = "INR",
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency:
        currency || "INR",
      maximumFractionDigits: 0,
    },
  ).format(
    Number(value || 0),
  );
}

function dateTime(
  value: string,
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

function normalizePaymentStatus(
  value: string,
): PaymentStatus {
  const status =
    value
      ?.trim()
      .toLowerCase();

  if (
    status === "paid"
  ) {
    return "Paid";
  }

  if (
    status === "failed"
  ) {
    return "Failed";
  }

  if (
    status === "refunded" ||
    status ===
      "partially_refunded"
  ) {
    return "Refunded";
  }

  return "Pending";
}

function normalizeOrderStatus(
  value: string,
): OrderStatus {
  const status =
    value
      ?.trim()
      .toLowerCase();

  switch (status) {
    case "confirmed":
      return "Confirmed";

    case "processing":
      return "Processing";

    case "packed":
      return "Packed";

    case "shipped":
      return "Shipped";

    case "out_for_delivery":
    case "out for delivery":
      return "Out for Delivery";

    case "delivered":
      return "Delivered";

    case "cancelled":
    case "canceled":
      return "Cancelled";

    case "returned":
      return "Returned";

    default:
      return "Pending";
  }
}

function paymentClass(
  status: PaymentStatus,
) {
  if (
    status === "Paid"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    status === "Pending"
  ) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (
    status === "Failed"
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-violet-200 bg-violet-50 text-violet-700";
}

function orderClass(
  status: OrderStatus,
) {
  if (
    status === "Delivered"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    status === "Shipped" ||
    status ===
      "Out for Delivery"
  ) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (
    status === "Cancelled" ||
    status === "Returned"
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (
    status === "Pending"
  ) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-zinc-200 bg-zinc-50 text-zinc-700";
}

function mapOrder(
  order: RawApiOrder,
): StoreOrder {
  return {
    id:
      order.id,

    orderNumber:
      order.orderNumber,

    createdAt:
      order.createdAt,

    updatedAt:
      order.updatedAt,

    customerId:
      order.customerId,

    customer: {
      name:
        order.customer?.name ||
        order.customer?.email ||
        "Guest Customer",

      firstName:
        order.customer?.firstName ??
        null,

      lastName:
        order.customer?.lastName ??
        null,

      email:
        order.customer?.email ||
        "",

      phone:
        order.customer?.phone ||
        "",
    },

    shippingAddress:
      order.shippingAddress ||
      {},

    billingAddress:
      order.billingAddress ||
      {},

    itemCount:
      Number(
        order.itemCount ??
        0,
      ),

    subtotal:
      Number(
        order.subtotal ??
        0,
      ),

    discount:
      Number(
        order.discount ??
        0,
      ),

    shipping:
      Number(
        order.shipping ??
        0,
      ),

    tax:
      Number(
        order.tax ??
        0,
      ),

    total:
      Number(
        order.total ??
        0,
      ),

    currency:
      order.currency ||
      "INR",

    couponCode:
      order.couponCode ??
      null,

    notes:
      order.notes ??
      null,

    paymentStatus:
      normalizePaymentStatus(
        order.paymentStatus,
      ),

    orderStatus:
      normalizeOrderStatus(
        order.status,
      ),

    courier:
      order.courier ??
      null,

    trackingNumber:
      order.trackingNumber ??
      null,

    trackingUrl:
      order.trackingUrl ??
      null,

    trackingLocation:
      order.trackingLocation ??
      order.location ??
      null,

    shippedAt:
      order.shippedAt ??
      null,

    outForDeliveryAt:
      order.outForDeliveryAt ??
      null,

    deliveredAt:
      order.deliveredAt ??
      null,
  };
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function OrdersManagement() {
  const [
    activeModule,
    setActiveModule,
  ] =
    useState<ModuleId | null>(
      null,
    );

  const [
    orders,
    setOrders,
  ] =
    useState<StoreOrder[]>(
      [],
    );

  const [
    selectedOrder,
    setSelectedOrder,
  ] =
    useState<StoreOrder | null>(
      null,
    );

  const [
    searchQuery,
    setSearchQuery,
  ] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] =
    useState("All");

  const [
    paymentFilter,
    setPaymentFilter,
  ] =
    useState("All");

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState("");

  const [
    lastUpdated,
    setLastUpdated,
  ] =
    useState<Date | null>(
      null,
    );

  const [
    shipmentForm,
    setShipmentForm,
  ] =
    useState({
      courier: "",
      trackingNumber: "",
      trackingUrl: "",
      location: "",
    });

  const [
    updatingStatus,
    setUpdatingStatus,
  ] =
    useState(false);

  const [
    statusMessage,
    setStatusMessage,
  ] =
    useState("");

  const [
    statusError,
    setStatusError,
  ] =
    useState("");

  const loadOrders =
    useCallback(
      async () => {
        setLoading(true);
        setError("");

        try {
          const response =
            await fetch(
              "/api/orders?limit=100",
              {
                method:
                  "GET",

                headers: {
                  Accept:
                    "application/json",
                },

                cache:
                  "no-store",
              },
            );

          const result =
            (await response.json()) as OrdersApiResponse;

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
              `Orders API returned ${response.status}.`,
            );
          }

          const liveOrders =
            Array.isArray(
              result.orders,
            )
              ? result.orders.map(
                  mapOrder,
                )
              : [];

          setOrders(
            liveOrders,
          );

          setLastUpdated(
            new Date(),
          );
        } catch (loadError) {
          console.error(
            "KEOS_ORDER_LOAD_ERROR",
            loadError,
          );

          /*
            IMPORTANT:
            No fake/demo data here.
            If live API fails, KEOS shows the real error.
          */

          setOrders([]);

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load live KRVE orders.",
          );
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    if (!selectedOrder) {
      setShipmentForm({
        courier: "",
        trackingNumber: "",
        trackingUrl: "",
        location: "",
      });

      setStatusMessage("");
      setStatusError("");
      return;
    }

    setShipmentForm({
      courier:
        selectedOrder.courier ||
        "",
      trackingNumber:
        selectedOrder.trackingNumber ||
        "",
      trackingUrl:
        selectedOrder.trackingUrl ||
        "",
      location:
        selectedOrder.trackingLocation ||
        "",
    });

    setStatusMessage("");
    setStatusError("");
  }, [selectedOrder]);

  const updateOrderStatus =
    useCallback(
      async (
        status:
          | "confirmed"
          | "processing"
          | "packed"
          | "shipped"
          | "out_for_delivery"
          | "delivered"
          | "cancelled",
      ) => {
        if (!selectedOrder) {
          return;
        }

        setUpdatingStatus(true);
        setStatusMessage("");
        setStatusError("");

        try {
          if (
            status === "shipped" &&
            !shipmentForm.courier.trim()
          ) {
            throw new Error(
              "Courier name is required before marking this order as shipped.",
            );
          }

          if (
            status === "shipped" &&
            !shipmentForm.trackingNumber.trim()
          ) {
            throw new Error(
              "Tracking number is required before marking this order as shipped.",
            );
          }

          const response =
            await fetch(
              `/api/orders/${encodeURIComponent(
                selectedOrder.id,
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

                    courier:
                      shipmentForm.courier.trim(),

                    trackingNumber:
                      shipmentForm.trackingNumber.trim(),

                    trackingUrl:
                      shipmentForm.trackingUrl.trim(),

                    location:
                      shipmentForm.location.trim(),
                  }),

                cache:
                  "no-store",
              },
            );

          const result =
            (await response.json()) as {
              success?: boolean;
              message?: string;
            };

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
              `Status API returned ${response.status}.`,
            );
          }

          const nextStatus =
            normalizeOrderStatus(
              status,
            );

          setSelectedOrder(
            (current) =>
              current
                ? {
                    ...current,

                    orderStatus:
                      nextStatus,

                    updatedAt:
                      new Date().toISOString(),

                    courier:
                      shipmentForm.courier.trim() ||
                      current.courier ||
                      null,

                    trackingNumber:
                      shipmentForm.trackingNumber.trim() ||
                      current.trackingNumber ||
                      null,

                    trackingUrl:
                      shipmentForm.trackingUrl.trim() ||
                      current.trackingUrl ||
                      null,

                    trackingLocation:
                      shipmentForm.location.trim() ||
                      current.trackingLocation ||
                      null,
                  }
                : current,
          );

          setStatusMessage(
            `Order updated to ${nextStatus}. Customer tracking will reflect this status.`,
          );

          await loadOrders();
        } catch (updateError) {
          console.error(
            "KEOS_ORDER_STATUS_UPDATE_ERROR",
            updateError,
          );

          setStatusError(
            updateError instanceof Error
              ? updateError.message
              : "Order status could not be updated.",
          );
        } finally {
          setUpdatingStatus(false);
        }
      },
      [
        loadOrders,
        selectedOrder,
        shipmentForm,
      ],
    );

  const metrics =
    useMemo(() => {
      const totalRevenue =
        orders
          .filter(
            (order) =>
              order.paymentStatus ===
              "Paid",
          )
          .reduce(
            (
              sum,
              order,
            ) =>
              sum +
              order.total,
            0,
          );

      const openOrders =
        orders.filter(
          (order) =>
            ![
              "Delivered",
              "Cancelled",
              "Returned",
            ].includes(
              order.orderStatus,
            ),
        ).length;

      const paymentIssues =
        orders.filter(
          (order) =>
            [
              "Pending",
              "Failed",
            ].includes(
              order.paymentStatus,
            ),
        ).length;

      const readyToShip =
        orders.filter(
          (order) =>
            [
              "Confirmed",
              "Processing",
              "Packed",
            ].includes(
              order.orderStatus,
            ),
        ).length;

      return {
        totalRevenue,
        openOrders,
        paymentIssues,
        readyToShip,
      };
    }, [orders]);

  const filteredOrders =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      return orders.filter(
        (order) => {
          const searchable =
            [
              order.orderNumber,
              order.id,
              order.customer.name,
              order.customer.email,
              order.customer.phone,
              order.orderStatus,
              order.paymentStatus,
            ]
              .join(" ")
              .toLowerCase();

          const matchesSearch =
            !query ||
            searchable.includes(
              query,
            );

          const matchesStatus =
            statusFilter ===
              "All" ||
            order.orderStatus ===
              statusFilter;

          const matchesPayment =
            paymentFilter ===
              "All" ||
            order.paymentStatus ===
              paymentFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesPayment
          );
        },
      );
    }, [
      orders,
      paymentFilter,
      searchQuery,
      statusFilter,
    ]);

  function exportOrders() {
    if (
      filteredOrders.length ===
      0
    ) {
      return;
    }

    const headers = [
      "Order Number",
      "Date",
      "Customer",
      "Email",
      "Phone",
      "Items",
      "Payment",
      "Order Status",
      "Subtotal",
      "Discount",
      "Shipping",
      "Tax",
      "Total",
    ];

    const rows =
      filteredOrders.map(
        (order) => [
          order.orderNumber,

          dateTime(
            order.createdAt,
          ),

          order.customer.name,

          order.customer.email,

          order.customer.phone,

          String(
            order.itemCount,
          ),

          order.paymentStatus,

          order.orderStatus,

          order.subtotal.toString(),

          order.discount.toString(),

          order.shipping.toString(),

          order.tax.toString(),

          order.total.toString(),
        ],
      );

    const csv =
      [headers, ...rows]
        .map((row) =>
          row
            .map(
              (cell) =>
                `"${String(
                  cell,
                ).replaceAll(
                  '"',
                  '""',
                )}"`,
            )
            .join(","),
        )
        .join("\n");

    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv;charset=utf-8",
        },
      );

    const url =
      URL.createObjectURL(
        blob,
      );

    const anchor =
      document.createElement(
        "a",
      );

    anchor.href =
      url;

    anchor.download =
      `krve-orders-${new Date()
        .toISOString()
        .slice(
          0,
          10,
        )}.csv`;

    anchor.click();

    URL.revokeObjectURL(
      url,
    );
  }
    if (!activeModule) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Commerce Operations
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Orders Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Monitor live orders received from the KRVE customer website and manage the full order lifecycle from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadOrders()}
            disabled={loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />

            Refresh Live Data
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <ShoppingBag size={20} />
              </div>

              <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                Live
              </span>
            </div>

            <div className="mt-5 text-2xl font-semibold text-slate-950">
              {orders.length}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              Total orders
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <Banknote size={20} />
              </div>

              <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                Paid
              </span>
            </div>

            <div className="mt-5 text-2xl font-semibold text-slate-950">
              {money(metrics.totalRevenue)}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              Revenue recorded
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <PackageOpen size={20} />
              </div>

              <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                Open
              </span>
            </div>

            <div className="mt-5 text-2xl font-semibold text-slate-950">
              {metrics.openOrders}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              Orders in progress
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <AlertCircle size={20} />
              </div>

              <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                Review
              </span>
            </div>

            <div className="mt-5 text-2xl font-semibold text-slate-950">
              {metrics.paymentIssues}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              Payment issues
            </div>
          </div>
        </div>

        {error ? (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-semibold">
                Live orders could not be loaded
              </p>

              <p className="mt-1 text-red-600">
                {error}
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => setActiveModule(module.id)}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-xl bg-slate-100 p-3 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="mt-1 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700"
                  />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-950">
                  {module.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {module.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-950">
                Live Data Status
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {lastUpdated
                  ? `Last refreshed ${lastUpdated.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Waiting for first successful API response"}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  error
                    ? "bg-red-500"
                    : loading
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />

              {error
                ? "Connection issue"
                : loading
                  ? "Syncing"
                  : "Connected"}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const activeTitle =
    modules.find(
      (module) => module.id === activeModule,
    )?.title ?? "Orders";

  let moduleOrders = filteredOrders;

  if (activeModule === "payments") {
    moduleOrders = filteredOrders.filter(
      (order) =>
        order.paymentStatus !== "Paid",
    );
  }

  if (activeModule === "order-processing") {
    moduleOrders = filteredOrders.filter(
      (order) =>
        [
          "Pending",
          "Confirmed",
          "Processing",
        ].includes(order.orderStatus),
    );
  }

  if (activeModule === "fulfilment") {
    moduleOrders = filteredOrders.filter(
      (order) =>
        [
          "Confirmed",
          "Processing",
          "Packed",
        ].includes(order.orderStatus),
    );
  }

  if (activeModule === "shipping") {
    moduleOrders = filteredOrders.filter(
      (order) =>
        [
          "Shipped",
          "Out for Delivery",
          "Delivered",
        ].includes(order.orderStatus),
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <button
            type="button"
            onClick={() => {
              setActiveModule(null);
              setSearchQuery("");
              setStatusFilter("All");
              setPaymentFilter("All");
              setSelectedOrder(null);
            }}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Back to Orders Management
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Live Commerce Operations
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {activeTitle}
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            {moduleOrders.length} live order
            {moduleOrders.length === 1 ? "" : "s"} in this view.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportOrders}
            disabled={moduleOrders.length === 0}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => void loadOrders()}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            Total Orders
          </span>

          <div className="mt-2 text-2xl font-semibold text-slate-950">
            {orders.length}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            Revenue
          </span>

          <div className="mt-2 text-2xl font-semibold text-slate-950">
            {money(metrics.totalRevenue)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            Ready to Ship
          </span>

          <div className="mt-2 text-2xl font-semibold text-slate-950">
            {metrics.readyToShip}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            Payment Issues
          </span>

          <div className="mt-2 text-2xl font-semibold text-slate-950">
            {metrics.paymentIssues}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_190px]">
          <div className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search order number, customer, email or phone..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Packed">
              Packed
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Out for Delivery">
              Out for Delivery
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

            <option value="Returned">
              Returned
            </option>
          </select>

          <select
            value={paymentFilter}
            onChange={(event) =>
              setPaymentFilter(event.target.value)
            }
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
          >
            <option value="All">
              All Payments
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Failed">
              Failed
            </option>

            <option value="Refunded">
              Refunded
            </option>
          </select>
        </div>
      </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <RefreshCw
                size={18}
                className="animate-spin"
              />

              Loading live KRVE orders...
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-[320px] items-center justify-center p-6">
            <div className="max-w-md text-center">
              <AlertCircle
                size={36}
                className="mx-auto text-red-500"
              />

              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                Unable to load orders
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => void loadOrders()}
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          </div>
        ) : moduleOrders.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center p-6">
            <div className="max-w-md text-center">
              <PackageOpen
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                No orders found
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                There are no live KRVE orders matching this view right now.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1180px] w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Order
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Items
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Total
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {moduleOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4 align-top">
                      <div className="font-semibold text-slate-950">
                        {order.orderNumber}
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {order.id}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="font-medium text-slate-900">
                        {order.customer.name}
                      </div>

                      <div className="mt-1 text-xs text-slate-500">
                        {order.customer.email || "No email"}
                      </div>

                      <div className="mt-0.5 text-xs text-slate-400">
                        {order.customer.phone || "No phone"}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />

                        {dateTime(order.createdAt)}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top text-sm font-medium text-slate-700">
                      {order.itemCount}
                    </td>

                    <td className="px-5 py-4 align-top">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${paymentClass(
                          order.paymentStatus,
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${orderClass(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right align-top">
                      <div className="font-semibold text-slate-950">
                        {money(
                          order.total,
                          order.currency,
                        )}
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {order.currency}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right align-top">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrder ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/20 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Order Details
                </p>

                <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                  {selectedOrder.orderNumber}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.13em] text-slate-400">
                    Payment
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${paymentClass(
                        selectedOrder.paymentStatus,
                      )}`}
                    >
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.13em] text-slate-400">
                    Order Status
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${orderClass(
                        selectedOrder.orderStatus,
                      )}`}
                    >
                      {selectedOrder.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.13em] text-slate-400">
                    Items
                  </div>

                  <div className="mt-2 text-xl font-semibold text-slate-950">
                    {selectedOrder.itemCount}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.13em] text-slate-400">
                    Total
                  </div>

                  <div className="mt-2 text-xl font-semibold text-slate-950">
                    {money(
                      selectedOrder.total,
                      selectedOrder.currency,
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-950">
                    Customer
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-900">
                        Name:
                      </span>{" "}
                      {selectedOrder.customer.name}
                    </p>

                    <p>
                      <span className="font-medium text-slate-900">
                        Email:
                      </span>{" "}
                      {selectedOrder.customer.email || "—"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-900">
                        Phone:
                      </span>{" "}
                      {selectedOrder.customer.phone || "—"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-900">
                        Ordered:
                      </span>{" "}
                      {dateTime(
                        selectedOrder.createdAt,
                      )}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-950">
                    Shipping Address
                  </h3>

                  <div className="mt-4 space-y-1.5 text-sm leading-6 text-slate-600">
                    <p>
                      {selectedOrder.shippingAddress
                        .recipientName ||
                        selectedOrder.customer.name}
                    </p>

                    <p>
                      {selectedOrder.shippingAddress
                        .addressLine1 || "—"}
                    </p>

                    {selectedOrder.shippingAddress
                      .addressLine2 ? (
                      <p>
                        {
                          selectedOrder
                            .shippingAddress
                            .addressLine2
                        }
                      </p>
                    ) : null}

                    <p>
                      {[
                        selectedOrder.shippingAddress.city,
                        selectedOrder.shippingAddress.state,
                        selectedOrder.shippingAddress.postalCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>

                    <p>
                      {selectedOrder.shippingAddress.country ||
                        "India"}
                    </p>

                    {selectedOrder.shippingAddress.phone ? (
                      <p>
                        Phone:{" "}
                        {selectedOrder.shippingAddress.phone}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Fulfilment Control
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-950">
                      Update customer order journey
                    </h3>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                      Every status change is sent to KRVE Central API and becomes the source for the customer&apos;s order-tracking page.
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${orderClass(
                      selectedOrder.orderStatus,
                    )}`}
                  >
                    {selectedOrder.orderStatus}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <button
                    type="button"
                    disabled={
                      updatingStatus ||
                      selectedOrder.orderStatus ===
                        "Processing" ||
                      selectedOrder.orderStatus ===
                        "Packed" ||
                      selectedOrder.orderStatus ===
                        "Shipped" ||
                      selectedOrder.orderStatus ===
                        "Out for Delivery" ||
                      selectedOrder.orderStatus ===
                        "Delivered"
                    }
                    onClick={() =>
                      void updateOrderStatus(
                        "processing",
                      )
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <PackageOpen size={16} />
                    Mark Processing
                  </button>

                  <button
                    type="button"
                    disabled={
                      updatingStatus ||
                      selectedOrder.orderStatus ===
                        "Packed" ||
                      selectedOrder.orderStatus ===
                        "Shipped" ||
                      selectedOrder.orderStatus ===
                        "Out for Delivery" ||
                      selectedOrder.orderStatus ===
                        "Delivered"
                    }
                    onClick={() =>
                      void updateOrderStatus(
                        "packed",
                      )
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <PackageCheck size={16} />
                    Mark Packed
                  </button>

                  <button
                    type="button"
                    disabled={
                      updatingStatus ||
                      selectedOrder.orderStatus ===
                        "Out for Delivery" ||
                      selectedOrder.orderStatus ===
                        "Delivered"
                    }
                    onClick={() =>
                      void updateOrderStatus(
                        "out_for_delivery",
                      )
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <Truck size={16} />
                    Out for Delivery
                  </button>

                  <button
                    type="button"
                    disabled={
                      updatingStatus ||
                      selectedOrder.orderStatus ===
                        "Delivered"
                    }
                    onClick={() =>
                      void updateOrderStatus(
                        "delivered",
                      )
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <CheckCircle2 size={16} />
                    Mark Delivered
                  </button>
                </div>

                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-blue-100 p-2.5 text-blue-700">
                      <Truck size={19} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-950">
                        Shipment Details
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Courier and tracking number are required when you mark an order as shipped.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Courier
                      </span>

                      <input
                        type="text"
                        value={
                          shipmentForm.courier
                        }
                        onChange={(event) =>
                          setShipmentForm(
                            (current) => ({
                              ...current,
                              courier:
                                event.target.value,
                            }),
                          )
                        }
                        placeholder="e.g. Delhivery"
                        className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Tracking Number
                      </span>

                      <input
                        type="text"
                        value={
                          shipmentForm.trackingNumber
                        }
                        onChange={(event) =>
                          setShipmentForm(
                            (current) => ({
                              ...current,
                              trackingNumber:
                                event.target.value,
                            }),
                          )
                        }
                        placeholder="Courier tracking ID"
                        className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Tracking URL
                      </span>

                      <input
                        type="url"
                        value={
                          shipmentForm.trackingUrl
                        }
                        onChange={(event) =>
                          setShipmentForm(
                            (current) => ({
                              ...current,
                              trackingUrl:
                                event.target.value,
                            }),
                          )
                        }
                        placeholder="https://courier.com/track/..."
                        className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Current Location
                      </span>

                      <input
                        type="text"
                        value={
                          shipmentForm.location
                        }
                        onChange={(event) =>
                          setShipmentForm(
                            (current) => ({
                              ...current,
                              location:
                                event.target.value,
                            }),
                          )
                        }
                        placeholder="e.g. Varanasi Hub"
                        className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400"
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    disabled={
                      updatingStatus
                    }
                    onClick={() =>
                      void updateOrderStatus(
                        "shipped",
                      )
                    }
                    className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
                  >
                    <Truck size={16} />

                    {updatingStatus
                      ? "Updating..."
                      : "Mark as Shipped"}
                  </button>

                  {selectedOrder.trackingNumber ? (
                    <div className="mt-4 grid gap-2 rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-600 md:grid-cols-2">
                      <div>
                        <span className="text-xs font-medium text-slate-400">
                          Current Courier
                        </span>
                        <div className="mt-1 font-medium text-slate-900">
                          {selectedOrder.courier || "—"}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-medium text-slate-400">
                          Tracking ID
                        </span>
                        <div className="mt-1 font-medium text-slate-900">
                          {selectedOrder.trackingNumber}
                        </div>
                      </div>

                      {selectedOrder.trackingLocation ? (
                        <div>
                          <span className="text-xs font-medium text-slate-400">
                            Location
                          </span>
                          <div className="mt-1 font-medium text-slate-900">
                            {selectedOrder.trackingLocation}
                          </div>
                        </div>
                      ) : null}

                      {selectedOrder.trackingUrl ? (
                        <div>
                          <span className="text-xs font-medium text-slate-400">
                            Tracking Link
                          </span>

                          <a
                            href={
                              selectedOrder.trackingUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block break-all font-medium text-blue-700 hover:underline"
                          >
                            Open courier tracking
                          </a>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {statusError ? (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle
                      size={17}
                      className="mt-0.5 shrink-0"
                    />
                    {statusError}
                  </div>
                ) : null}

                {statusMessage ? (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0"
                    />
                    {statusMessage}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-950">
                  Payment Summary
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-slate-900">
                      {money(
                        selectedOrder.subtotal,
                        selectedOrder.currency,
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Discount
                    </span>

                    <span className="font-medium text-slate-900">
                      -{" "}
                      {money(
                        selectedOrder.discount,
                        selectedOrder.currency,
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Shipping
                    </span>

                    <span className="font-medium text-slate-900">
                      {selectedOrder.shipping === 0
                        ? "Complimentary"
                        : money(
                            selectedOrder.shipping,
                            selectedOrder.currency,
                          )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Tax
                    </span>

                    <span className="font-medium text-slate-900">
                      {money(
                        selectedOrder.tax,
                        selectedOrder.currency,
                      )}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-950">
                        Total
                      </span>

                      <span className="text-xl font-semibold text-slate-950">
                        {money(
                          selectedOrder.total,
                          selectedOrder.currency,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.notes ? (
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-950">
                    Order Notes
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {selectedOrder.notes}
                  </p>
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
                <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />

                  Live data from KRVE Central API
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
