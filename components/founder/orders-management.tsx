"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CalendarDays,
  ChevronDown,
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

type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";
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

type StoreOrder = {
  id: string;
  createdAt: string;
  customer: { name: string; email: string; phone: string };
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }>;
  subtotal: number;
  discount: number;
  shippingCharge: number;
  tax: number;
  total: number;
  currency: "INR";
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  orderStatus: OrderStatus;
  channel: string;
  courier?: string;
  trackingNumber?: string;
  notes?: string;
};

type OrdersApiResponse = {
  success: boolean;
  source?: "store-api" | "demo";
  orders: StoreOrder[];
  message?: string;
};

const demoOrders: StoreOrder[] = [
  {
    id: "KRVE-10021",
    createdAt: "2026-08-07T09:25:00.000Z",
    customer: {
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 98765 43210",
    },
    shippingAddress: {
      line1: "B-12, Lanka",
      city: "Varanasi",
      state: "Uttar Pradesh",
      postalCode: "221005",
      country: "India",
    },
    items: [
      {
        id: "item-1",
        name: "KRVE Oversized Signature Tee",
        sku: "KRVE-OST-BLK-L",
        quantity: 2,
        price: 2499,
        size: "L",
        color: "Black",
      },
    ],
    subtotal: 4998,
    discount: 500,
    shippingCharge: 0,
    tax: 0,
    total: 4498,
    currency: "INR",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    orderStatus: "Processing",
    channel: "KRVE Website",
    notes: "Deliver after 5 PM.",
  },
  {
    id: "KRVE-10020",
    createdAt: "2026-08-07T08:10:00.000Z",
    customer: {
      name: "Ananya Singh",
      email: "ananya.singh@example.com",
      phone: "+91 91234 56789",
    },
    shippingAddress: {
      line1: "C-28, Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      postalCode: "201309",
      country: "India",
    },
    items: [
      {
        id: "item-2",
        name: "KRVE Noir Blazer",
        sku: "KRVE-NB-CRM-M",
        quantity: 1,
        price: 18999,
        size: "M",
        color: "Cream",
      },
    ],
    subtotal: 18999,
    discount: 0,
    shippingCharge: 0,
    tax: 0,
    total: 18999,
    currency: "INR",
    paymentStatus: "Paid",
    paymentMethod: "Card",
    orderStatus: "Confirmed",
    channel: "KRVE Website",
  },
  {
    id: "KRVE-10019",
    createdAt: "2026-08-06T18:40:00.000Z",
    customer: {
      name: "Rohan Verma",
      email: "rohan.verma@example.com",
      phone: "+91 99887 77665",
    },
    shippingAddress: {
      line1: "22 Park Street",
      city: "Kolkata",
      state: "West Bengal",
      postalCode: "700016",
      country: "India",
    },
    items: [
      {
        id: "item-3",
        name: "KRVE Icon Sneakers",
        sku: "KRVE-IS-WHT-42",
        quantity: 1,
        price: 8999,
        size: "42",
        color: "White",
      },
    ],
    subtotal: 8999,
    discount: 0,
    shippingCharge: 0,
    tax: 0,
    total: 8999,
    currency: "INR",
    paymentStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    orderStatus: "Pending",
    channel: "KRVE Website",
  },
];

const modules = [
  {
    id: "all-orders",
    title: "All Orders",
    description: "View every order received from the KRVE website.",
    icon: PackageOpen,
  },
  {
    id: "order-processing",
    title: "Order Processing",
    description: "Manage confirmation, verification and processing queues.",
    icon: PackageCheck,
  },
  {
    id: "payments",
    title: "Payments",
    description: "Track paid, pending, failed and refunded orders.",
    icon: WalletCards,
  },
  {
    id: "fulfilment",
    title: "Fulfilment",
    description: "Manage stock allocation, picking and packing.",
    icon: ShoppingBag,
  },
  {
    id: "shipping",
    title: "Shipping",
    description: "Assign couriers and track dispatch.",
    icon: Truck,
  },
];

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function dateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function paymentClass(status: PaymentStatus) {
  if (status === "Paid") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "Pending") return "border-amber-200 bg-amber-50 text-amber-700";
  if (status === "Failed") return "border-red-200 bg-red-50 text-red-700";
  return "border-violet-200 bg-violet-50 text-violet-700";
}

function orderClass(status: OrderStatus) {
  if (status === "Delivered") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "Shipped" || status === "Out for Delivery")
    return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "Cancelled" || status === "Returned")
    return "border-red-200 bg-red-50 text-red-700";
  if (status === "Pending") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-zinc-200 bg-zinc-50 text-zinc-700";
}

export default function OrdersManagement() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [orders, setOrders] = useState<StoreOrder[]>(demoOrders);
  const [selectedOrder, setSelectedOrder] = useState<StoreOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"store-api" | "demo">("demo");
  const [error, setError] = useState("");

  async function loadOrders() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Orders API returned ${response.status}`);
      }

      const result = (await response.json()) as OrdersApiResponse;

      if (!result.success || !Array.isArray(result.orders)) {
        throw new Error(result.message || "Invalid orders response");
      }

      setOrders(result.orders);
      setSource(result.source ?? "store-api");
    } catch (loadError) {
      console.error(loadError);
      setOrders(demoOrders);
      setSource("demo");
      setError("Live store orders are not connected yet. Demo data is shown.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  const metrics = useMemo(() => {
    const totalRevenue = orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + order.total, 0);

    const openOrders = orders.filter(
      (order) => !["Delivered", "Cancelled", "Returned"].includes(order.orderStatus)
    ).length;

    const paymentIssues = orders.filter((order) =>
      ["Pending", "Failed"].includes(order.paymentStatus)
    ).length;

    const readyToShip = orders.filter((order) =>
      ["Confirmed", "Processing", "Packed"].includes(order.orderStatus)
    ).length;

    return { totalRevenue, openOrders, paymentIssues, readyToShip };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        [
          order.id,
          order.customer.name,
          order.customer.email,
          order.customer.phone,
          order.items.map((item) => item.name).join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" || order.orderStatus === statusFilter;
      const matchesPayment =
        paymentFilter === "All" || order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, paymentFilter, searchQuery, statusFilter]);

  function exportOrders() {
    const headers = [
      "Order ID",
      "Date",
      "Customer",
      "Email",
      "Phone",
      "Products",
      "Payment",
      "Order Status",
      "Amount",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      dateTime(order.createdAt),
      order.customer.name,
      order.customer.email,
      order.customer.phone,
      order.items.map((item) => `${item.name} x${item.quantity}`).join(" | "),
      order.paymentStatus,
      order.orderStatus,
      order.total.toString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `krve-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (activeModule && activeModule !== "all-orders") {
    const currentModule = modules.find((module) => module.id === activeModule);

    if (currentModule) {
      return (
        <OrderModuleWorkspace
          module={currentModule}
          orders={orders}
          loading={loading}
          source={source}
          error={error}
          metrics={metrics}
          onBack={() => setActiveModule(null)}
          onRefresh={() => void loadOrders()}
          onExport={exportOrders}
          onOpenAllOrders={() => setActiveModule("all-orders")}
        />
      );
    }
  }

  if (activeModule === "all-orders") {
    return (
      <>
        <div className="p-4 sm:p-6 lg:p-8">
          <button
            type="button"
            onClick={() => setActiveModule(null)}
            className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </button>

          <section className="rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white sm:p-9">
            <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                  Live Order Directory
                </p>
                <h1 className="mt-4 text-3xl font-black sm:text-4xl">All Orders</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                  Search, filter and open complete customer orders received from
                  the KRVE website.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => void loadOrders()}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold"
                >
                  <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={exportOrders}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700"
                >
                  <Download size={17} />
                  Export CSV
                </button>
              </div>
            </div>
          </section>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                source === "store-api"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {source === "store-api" ? "Live website data" : "Demo data mode"}
            </span>
            <span className="text-sm text-slate-500">
              {filteredOrders.length} orders shown
            </span>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {error}
            </div>
          )}

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-3 border-b border-slate-200 p-5 xl:grid-cols-[1fr_220px_220px]">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search order ID, customer, phone, email, product..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  "All",
                  "Pending",
                  "Confirmed",
                  "Processing",
                  "Packed",
                  "Shipped",
                  "Out for Delivery",
                  "Delivered",
                  "Cancelled",
                  "Returned",
                ]}
              />

              <FilterSelect
                value={paymentFilter}
                onChange={setPaymentFilter}
                options={["All", "Paid", "Pending", "Failed", "Refunded"]}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1180px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    {[
                      "Order ID",
                      "Customer",
                      "Products",
                      "Payment",
                      "Order Status",
                      "Courier",
                      "Amount",
                      "Date",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4 text-sm font-black text-slate-950">
                        {order.id}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-900">
                          {order.customer.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {order.customer.phone}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {order.customer.email}
                        </p>
                      </td>
                      <td className="max-w-[250px] px-5 py-4">
                        <p className="truncate text-sm text-slate-800">
                          {order.items.map((item) => item.name).join(", ")}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black ${paymentClass(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                        <p className="mt-2 text-xs text-slate-500">
                          {order.paymentMethod}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black ${orderClass(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {order.courier ?? "Not assigned"}
                      </td>
                      <td className="px-5 py-4 text-sm font-black text-slate-950">
                        {money(order.total)}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500">
                        {dateTime(order.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2.5 text-xs font-black text-white hover:bg-blue-700"
                        >
                          <Eye size={15} />
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!loading && filteredOrders.length === 0 && (
                <div className="p-12 text-center">
                  <PackageOpen size={34} className="mx-auto text-slate-300" />
                  <p className="mt-4 font-bold text-slate-700">No orders found</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
              Commerce Operations
            </p>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              Orders Management
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              Every customer order from the KRVE website will appear here
              through the shared orders API.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void loadOrders()}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
              Sync Orders
            </button>
            <button
              type="button"
              onClick={exportOrders}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700"
            >
              <Download size={17} />
              Export Orders
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard title="Total Orders" value={String(orders.length)} note={source === "store-api" ? "Live store orders" : "Demo data"} icon={ShoppingBag} />
        <MetricCard title="Order Revenue" value={money(metrics.totalRevenue)} note="Paid orders" icon={Banknote} />
        <MetricCard title="Open Orders" value={String(metrics.openOrders)} note="Require processing" icon={CalendarDays} />
        <MetricCard title="Payment Issues" value={String(metrics.paymentIssues)} note="Pending or failed" icon={AlertTriangle} />
        <MetricCard title="Ready to Ship" value={String(metrics.readyToShip)} note="Confirmed to packed" icon={PackageCheck} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
          Orders Control Center
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Commerce Operations Modules
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.id}
                className="group flex min-h-[230px] flex-col rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-lg"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>
                <h3 className="mt-5 text-base font-black text-slate-950">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {module.description}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveModule(module.id)}
                  className="mt-auto flex items-center justify-end gap-2 pt-6 text-sm font-black text-blue-600"
                >
                  Open
                  <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
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
  icon: typeof ShoppingBag;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-3 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function OrderDetailModal({
  order,
  onClose,
}: {
  order: StoreOrder;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close order details"
      />

      <section className="relative z-10 max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <header className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur-xl">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-blue-600">
              Order Record
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{order.id}</h2>
            <p className="mt-1 text-sm text-slate-500">
              Placed {dateTime(order.createdAt)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500"
          >
            <X size={19} />
          </button>
        </header>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <DetailCard title="Products" icon={PackageOpen}>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        SKU: {item.sku}
                        {item.size ? ` · Size: ${item.size}` : ""}
                        {item.color ? ` · ${item.color}` : ""}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-black text-slate-950">
                      {money(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </DetailCard>

            <DetailCard title="Customer" icon={ShoppingBag}>
              <p className="font-bold text-slate-900">{order.customer.name}</p>
              <p className="mt-2 text-sm text-slate-600">{order.customer.email}</p>
              <p className="mt-1 text-sm text-slate-600">{order.customer.phone}</p>
            </DetailCard>

            <DetailCard title="Shipping Address" icon={Truck}>
              <p className="text-sm leading-7 text-slate-700">
                {order.shippingAddress.line1}
                {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </DetailCard>
          </div>

          <div className="space-y-6">
            <DetailCard title="Order Status" icon={PackageCheck}>
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-black ${orderClass(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </DetailCard>

            <DetailCard title="Payment" icon={WalletCards}>
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-black ${paymentClass(
                  order.paymentStatus
                )}`}
              >
                {order.paymentStatus}
              </span>
              <p className="mt-3 text-sm text-slate-600">{order.paymentMethod}</p>
            </DetailCard>

            <DetailCard title="Order Total" icon={Banknote}>
              <PriceRow label="Subtotal" value={money(order.subtotal)} />
              <PriceRow label="Discount" value={`-${money(order.discount)}`} />
              <PriceRow label="Shipping" value={money(order.shippingCharge)} />
              <PriceRow label="Tax" value={money(order.tax)} />
              <div className="mt-4 border-t border-slate-200 pt-4">
                <PriceRow label="Total" value={money(order.total)} bold />
              </div>
            </DetailCard>
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof ShoppingBag;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={18} />
        </div>
        <h3 className="font-black text-slate-950">{title}</h3>
      </div>
      {children}
    </article>
  );
}

function PriceRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className={bold ? "font-black text-slate-950" : "text-sm text-slate-500"}>
        {label}
      </span>
      <span className={bold ? "text-lg font-black text-slate-950" : "text-sm font-bold text-slate-800"}>
        {value}
      </span>
    </div>
  );
}


function OrderModuleWorkspace({
  module,
  orders,
  loading,
  source,
  error,
  metrics,
  onBack,
  onRefresh,
  onExport,
  onOpenAllOrders,
}: {
  module: (typeof modules)[number];
  orders: StoreOrder[];
  loading: boolean;
  source: "store-api" | "demo";
  error: string;
  metrics: {
    totalRevenue: number;
    openOrders: number;
    paymentIssues: number;
    readyToShip: number;
  };
  onBack: () => void;
  onRefresh: () => void;
  onExport: () => void;
  onOpenAllOrders: () => void;
}) {
  const Icon = module.icon;

  const moduleConfig: Record<
    string,
    {
      eyebrow: string;
      title: string;
      description: string;
      primaryLabel: string;
      cards: Array<{ label: string; value: string; note: string }>;
      workflows: Array<{ title: string; description: string }>;
    }
  > = {
    "order-processing": {
      eyebrow: "Order Operations",
      title: "Order Processing",
      description:
        "Verify incoming orders, confirm payment and inventory, then move orders into fulfilment.",
      primaryLabel: "Open Processing Queue",
      cards: [
        {
          label: "Open Orders",
          value: String(metrics.openOrders),
          note: "Awaiting action",
        },
        {
          label: "Confirmed",
          value: String(
            orders.filter((order) => order.orderStatus === "Confirmed").length
          ),
          note: "Ready for processing",
        },
        {
          label: "Processing",
          value: String(
            orders.filter((order) => order.orderStatus === "Processing").length
          ),
          note: "Currently active",
        },
        {
          label: "Payment Issues",
          value: String(metrics.paymentIssues),
          note: "Require review",
        },
      ],
      workflows: [
        {
          title: "Order Verification",
          description:
            "Validate customer information, payment status and order details.",
        },
        {
          title: "Inventory Allocation",
          description:
            "Confirm stock availability and reserve products for the order.",
        },
        {
          title: "Order Confirmation",
          description:
            "Approve eligible orders and notify the customer automatically.",
        },
        {
          title: "Exception Handling",
          description:
            "Review failed payments, invalid addresses and stock conflicts.",
        },
      ],
    },
    payments: {
      eyebrow: "Payment Operations",
      title: "Payments",
      description:
        "Track payment status, methods, failed transactions, refunds and cash-on-delivery orders.",
      primaryLabel: "Open Payment Records",
      cards: [
        {
          label: "Paid Revenue",
          value: money(metrics.totalRevenue),
          note: "Successfully paid",
        },
        {
          label: "Paid Orders",
          value: String(
            orders.filter((order) => order.paymentStatus === "Paid").length
          ),
          note: "Payment completed",
        },
        {
          label: "Pending Payments",
          value: String(
            orders.filter((order) => order.paymentStatus === "Pending").length
          ),
          note: "Awaiting payment",
        },
        {
          label: "Failed Payments",
          value: String(
            orders.filter((order) => order.paymentStatus === "Failed").length
          ),
          note: "Require attention",
        },
      ],
      workflows: [
        {
          title: "Payment Directory",
          description:
            "View payment status, method, order value and customer details.",
        },
        {
          title: "Payment Verification",
          description:
            "Verify gateway transactions before confirming fulfilment.",
        },
        {
          title: "Refund Processing",
          description:
            "Review approved refunds and update order payment status.",
        },
        {
          title: "Reconciliation",
          description:
            "Compare website payments with gateway settlement records.",
        },
      ],
    },
    fulfilment: {
      eyebrow: "Warehouse Operations",
      title: "Fulfilment",
      description:
        "Allocate stock, create pick lists, pack products and prepare orders for courier handover.",
      primaryLabel: "Open Fulfilment Queue",
      cards: [
        {
          label: "Awaiting Fulfilment",
          value: String(metrics.readyToShip),
          note: "Confirmed to packed",
        },
        {
          label: "Confirmed",
          value: String(
            orders.filter((order) => order.orderStatus === "Confirmed").length
          ),
          note: "Ready to allocate",
        },
        {
          label: "Processing",
          value: String(
            orders.filter((order) => order.orderStatus === "Processing").length
          ),
          note: "Picking in progress",
        },
        {
          label: "Packed",
          value: String(
            orders.filter((order) => order.orderStatus === "Packed").length
          ),
          note: "Ready for dispatch",
        },
      ],
      workflows: [
        {
          title: "Stock Allocation",
          description:
            "Reserve available inventory against confirmed customer orders.",
        },
        {
          title: "Picking",
          description:
            "Generate pick lists and confirm collected product quantities.",
        },
        {
          title: "Packing",
          description:
            "Verify products, pack orders and record package details.",
        },
        {
          title: "Dispatch Handover",
          description:
            "Move completed packages into the shipping workflow.",
        },
      ],
    },
    shipping: {
      eyebrow: "Delivery Operations",
      title: "Shipping",
      description:
        "Assign couriers, create shipments, add tracking numbers and monitor dispatch.",
      primaryLabel: "Open Shipping Queue",
      cards: [
        {
          label: "Ready to Ship",
          value: String(metrics.readyToShip),
          note: "Confirmed to packed",
        },
        {
          label: "Shipped",
          value: String(
            orders.filter((order) => order.orderStatus === "Shipped").length
          ),
          note: "In transit",
        },
        {
          label: "Out for Delivery",
          value: String(
            orders.filter(
              (order) => order.orderStatus === "Out for Delivery"
            ).length
          ),
          note: "Final-mile delivery",
        },
        {
          label: "Delivered",
          value: String(
            orders.filter((order) => order.orderStatus === "Delivered").length
          ),
          note: "Completed orders",
        },
      ],
      workflows: [
        {
          title: "Courier Assignment",
          description:
            "Choose a courier based on destination, service and cost.",
        },
        {
          title: "Shipment Creation",
          description:
            "Create package records and generate shipment identifiers.",
        },
        {
          title: "Tracking Management",
          description:
            "Store tracking numbers and monitor shipment movement.",
        },
        {
          title: "Delivery Exceptions",
          description:
            "Handle delays, failed attempts and returned shipments.",
        },
      ],
    },
  };

  const config = moduleConfig[module.id];

  if (!config) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700"
        >
          <ArrowLeft size={17} />
          Back to Orders
        </button>

        <section className="rounded-3xl border border-slate-200 bg-white p-8">
          <h1 className="text-2xl font-black text-slate-950">{module.title}</h1>
          <p className="mt-3 text-sm text-slate-500">{module.description}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeft size={17} />
        Back to Orders
      </button>

      <section className="rounded-3xl bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-7 text-white shadow-xl sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={23} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                {config.eyebrow}
              </p>
            </div>

            <h1 className="mt-6 text-3xl font-black sm:text-4xl">
              {config.title}
            </h1>
            <p className="mt-3 text-sm leading-7 text-blue-100">
              {config.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
            <button
              type="button"
              onClick={onOpenAllOrders}
              className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold transition hover:bg-white/20"
            >
              <PackageOpen size={18} />
              {config.primaryLabel}
            </button>

            <button
              type="button"
              onClick={onExport}
              className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              <Download size={18} />
              Export Orders
            </button>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
            source === "store-api"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          {source === "store-api" ? "Live website data" : "Demo data mode"}
        </span>

        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {error}
        </div>
      )}

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {config.cards.map((card, index) => (
          <article
            key={card.label}
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
              {card.label}
            </p>
            <p className="mt-1 text-3xl font-black text-slate-950">
              {card.value}
            </p>
            <p className="mt-3 text-xs text-slate-400">{card.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
            Operational Workspace
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {config.title} Workflows
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {config.workflows.map((workflow, index) => (
              <div
                key={workflow.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-950">
                      {workflow.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {workflow.description}
                    </p>
                    <button
                      type="button"
                      onClick={onOpenAllOrders}
                      className="mt-4 flex items-center gap-2 text-xs font-black text-blue-600"
                    >
                      Open Orders
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600">
            <Icon size={22} />
          </div>
          <h2 className="mt-6 text-xl font-black">KRVE Operations Insight</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {metrics.openOrders} open orders, {metrics.paymentIssues} payment
            issues and {metrics.readyToShip} orders require fulfilment or
            shipping attention.
          </p>

          <div className="mt-6 space-y-3">
            <WorkspaceInsight label="Total orders" value={String(orders.length)} />
            <WorkspaceInsight
              label="Paid revenue"
              value={money(metrics.totalRevenue)}
            />
            <WorkspaceInsight
              label="Open orders"
              value={String(metrics.openOrders)}
            />
            <WorkspaceInsight
              label="Ready to ship"
              value={String(metrics.readyToShip)}
            />
          </div>

          <button
            type="button"
            onClick={onOpenAllOrders}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open Complete Order Directory
            <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
  );
}

function WorkspaceInsight({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}
