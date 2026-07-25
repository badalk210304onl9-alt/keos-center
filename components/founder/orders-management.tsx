"use client";

import type { ComponentType } from "react";
import { useMemo, useState } from "react";

import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Ban,
  Banknote,
  CalendarDays,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  Download,
  Eye,
  FileDown,
  FileText,
  Filter,
  IndianRupee,
  MapPin,
  MessageSquareText,
  Package,
  PackageCheck,
  PackageOpen,
  Plus,
  Printer,
  ReceiptIndianRupee,
  RefreshCcw,
  RotateCcw,
  Search,
  ShieldAlert,
  ShoppingBag,
  Smartphone,
  Truck,
  Undo2,
  UserRound,
  WalletCards,
  X,
  XCircle,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned";

type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Failed"
  | "Refunded"
  | "Partially Refunded";

type PaymentMethod =
  | "Razorpay"
  | "UPI"
  | "Credit Card"
  | "Debit Card"
  | "Cash on Delivery";

type OrderPriority = "Normal" | "High" | "Critical";

type WorkspaceTab =
  | "Orders"
  | "Fulfilment"
  | "Payments"
  | "Returns"
  | "Analytics";

type OrderItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  size: string;
  price: number;
};

type TimelineEvent = {
  title: string;
  description: string;
  time: string;
  completed: boolean;
};

type Order = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  total: number;
  subtotal: number;
  shippingCharge: number;
  discount: number;
  tax: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentId: string;
  channel: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  trackingId?: string;
  courier?: string;
  estimatedDelivery?: string;
  priority: OrderPriority;
  fraudFlag: boolean;
  codVerified: boolean;
  internalNote: string;
  items: OrderItem[];
  timeline: TimelineEvent[];
};

type ReturnRequest = {
  id: string;
  orderId: string;
  customer: string;
  product: string;
  reason: string;
  requestType: "Return" | "Replacement";
  amount: number;
  status: "Requested" | "Approved" | "Rejected" | "Completed";
  requestedAt: string;
};

const statusOptions: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
];

const initialOrders: Order[] = [
  {
    id: "KRVE-10482",
    customer: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 41082",
    date: "25 Jul 2026, 07:42 PM",
    total: 18999,
    subtotal: 18999,
    shippingCharge: 0,
    discount: 0,
    tax: 2898,
    status: "Confirmed",
    paymentStatus: "Paid",
    paymentMethod: "Razorpay",
    paymentId: "pay_KRVE10482",
    channel: "KRVE Website",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110024",
    address: "12, Defence Colony, New Delhi, Delhi",
    priority: "High",
    fraudFlag: false,
    codVerified: true,
    internalNote: "Premium customer. Handle with priority packaging.",
    items: [
      {
        id: "ITEM-01",
        name: "KRVE Noir Blazer",
        sku: "KRV-NB-001",
        quantity: 1,
        size: "M",
        price: 18999,
      },
    ],
    timeline: [
      {
        title: "Order placed",
        description: "Customer successfully placed the order.",
        time: "25 Jul 2026, 07:42 PM",
        completed: true,
      },
      {
        title: "Payment received",
        description: "Online payment confirmed through Razorpay.",
        time: "25 Jul 2026, 07:43 PM",
        completed: true,
      },
      {
        title: "Order confirmed",
        description: "Order accepted for fulfilment.",
        time: "25 Jul 2026, 07:50 PM",
        completed: true,
      },
      {
        title: "Processing",
        description: "Waiting to enter processing.",
        time: "Pending",
        completed: false,
      },
    ],
  },
  {
    id: "KRVE-10481",
    customer: "Ananya Singh",
    email: "ananya.singh@example.com",
    phone: "+91 98640 32177",
    date: "25 Jul 2026, 06:18 PM",
    total: 8499,
    subtotal: 8499,
    shippingCharge: 0,
    discount: 0,
    tax: 1296,
    status: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    paymentId: "upi_KRVE10481",
    channel: "KRVE Mobile App",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "221005",
    address: "BHU Road, Lanka, Varanasi, Uttar Pradesh",
    priority: "Normal",
    fraudFlag: false,
    codVerified: true,
    internalNote: "Customer requested delivery before 30 July.",
    items: [
      {
        id: "ITEM-02",
        name: "KRVE Icon Sneakers",
        sku: "KRV-IS-021",
        quantity: 1,
        size: "UK 8",
        price: 8499,
      },
    ],
    timeline: [
      {
        title: "Order placed",
        description: "Order placed through the mobile application.",
        time: "25 Jul 2026, 06:18 PM",
        completed: true,
      },
      {
        title: "Payment received",
        description: "UPI payment completed.",
        time: "25 Jul 2026, 06:19 PM",
        completed: true,
      },
      {
        title: "Processing",
        description: "Warehouse team is processing the order.",
        time: "25 Jul 2026, 06:45 PM",
        completed: true,
      },
      {
        title: "Packing",
        description: "Waiting for packing.",
        time: "Pending",
        completed: false,
      },
    ],
  },
  {
    id: "KRVE-10480",
    customer: "Rohan Verma",
    email: "rohan.verma@example.com",
    phone: "+91 98122 87410",
    date: "25 Jul 2026, 04:55 PM",
    total: 12999,
    subtotal: 12999,
    shippingCharge: 0,
    discount: 0,
    tax: 1983,
    status: "Shipped",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    paymentId: "card_KRVE10480",
    channel: "KRVE Website",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    address: "Bandra West, Mumbai, Maharashtra",
    trackingId: "DLV-KRVE-784521",
    courier: "Delhivery",
    estimatedDelivery: "28 Jul 2026",
    priority: "Normal",
    fraudFlag: false,
    codVerified: true,
    internalNote: "Shipment handed over to Delhivery.",
    items: [
      {
        id: "ITEM-03",
        name: "KRVE Signature Blazer",
        sku: "KRV-SB-008",
        quantity: 1,
        size: "L",
        price: 12999,
      },
    ],
    timeline: [
      {
        title: "Order placed",
        description: "Order received through website.",
        time: "25 Jul 2026, 04:55 PM",
        completed: true,
      },
      {
        title: "Packed",
        description: "Order packed and quality checked.",
        time: "25 Jul 2026, 06:40 PM",
        completed: true,
      },
      {
        title: "Shipped",
        description: "Shipment assigned to Delhivery.",
        time: "26 Jul 2026, 09:10 AM",
        completed: true,
      },
      {
        title: "Delivery",
        description: "Estimated delivery by 28 July.",
        time: "Pending",
        completed: false,
      },
    ],
  },
  {
    id: "KRVE-10479",
    customer: "Priya Mehta",
    email: "priya.mehta@example.com",
    phone: "+91 98911 22580",
    date: "25 Jul 2026, 03:26 PM",
    total: 6799,
    subtotal: 6499,
    shippingCharge: 300,
    discount: 0,
    tax: 991,
    status: "Pending",
    paymentStatus: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentId: "COD-10479",
    channel: "KRVE Website",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    address: "C-Scheme, Jaipur, Rajasthan",
    priority: "High",
    fraudFlag: false,
    codVerified: false,
    internalNote: "COD verification call is pending.",
    items: [
      {
        id: "ITEM-04",
        name: "Midnight Essential Shirt",
        sku: "KRV-MES-032",
        quantity: 1,
        size: "M",
        price: 6499,
      },
    ],
    timeline: [
      {
        title: "Order placed",
        description: "Cash-on-delivery order received.",
        time: "25 Jul 2026, 03:26 PM",
        completed: true,
      },
      {
        title: "COD verification",
        description: "Customer confirmation is required.",
        time: "Pending",
        completed: false,
      },
    ],
  },
  {
    id: "KRVE-10478",
    customer: "Kabir Malhotra",
    email: "kabir.malhotra@example.com",
    phone: "+91 99871 32441",
    date: "25 Jul 2026, 01:08 PM",
    total: 37998,
    subtotal: 37998,
    shippingCharge: 0,
    discount: 0,
    tax: 5796,
    status: "Packed",
    paymentStatus: "Paid",
    paymentMethod: "Debit Card",
    paymentId: "card_KRVE10478",
    channel: "KRVE Mobile App",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122009",
    address: "DLF Phase 4, Gurugram, Haryana",
    priority: "Critical",
    fraudFlag: false,
    codVerified: true,
    internalNote: "High-value order. Double quality check required.",
    items: [
      {
        id: "ITEM-05",
        name: "Obsidian Double-Breasted Suit",
        sku: "KRV-OBS-014",
        quantity: 2,
        size: "L",
        price: 18999,
      },
    ],
    timeline: [
      {
        title: "Order placed",
        description: "High-value order received.",
        time: "25 Jul 2026, 01:08 PM",
        completed: true,
      },
      {
        title: "Payment received",
        description: "Debit-card payment completed.",
        time: "25 Jul 2026, 01:09 PM",
        completed: true,
      },
      {
        title: "Packed",
        description: "Products packed after quality verification.",
        time: "25 Jul 2026, 05:45 PM",
        completed: true,
      },
      {
        title: "Dispatch",
        description: "Waiting for courier pickup.",
        time: "Pending",
        completed: false,
      },
    ],
  },
  {
    id: "KRVE-10477",
    customer: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    phone: "+91 97022 54122",
    date: "24 Jul 2026, 09:44 PM",
    total: 25498,
    subtotal: 25498,
    shippingCharge: 0,
    discount: 0,
    tax: 3890,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Razorpay",
    paymentId: "pay_KRVE10477",
    channel: "KRVE Website",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    address: "Indiranagar, Bengaluru, Karnataka",
    trackingId: "BLD-KRVE-541902",
    courier: "Blue Dart",
    estimatedDelivery: "Delivered on 25 Jul 2026",
    priority: "Normal",
    fraudFlag: false,
    codVerified: true,
    internalNote: "Order delivered successfully.",
    items: [
      {
        id: "ITEM-06",
        name: "KRVE Noir Blazer",
        sku: "KRV-NB-001",
        quantity: 1,
        size: "S",
        price: 18999,
      },
      {
        id: "ITEM-07",
        name: "Midnight Essential Shirt",
        sku: "KRV-MES-032",
        quantity: 1,
        size: "S",
        price: 6499,
      },
    ],
    timeline: [
      {
        title: "Order placed",
        description: "Order successfully received.",
        time: "24 Jul 2026, 09:44 PM",
        completed: true,
      },
      {
        title: "Shipped",
        description: "Shipment dispatched through Blue Dart.",
        time: "25 Jul 2026, 08:30 AM",
        completed: true,
      },
      {
        title: "Delivered",
        description: "Customer received the shipment.",
        time: "25 Jul 2026, 06:15 PM",
        completed: true,
      },
    ],
  },
  {
    id: "KRVE-10476",
    customer: "Arjun Nair",
    email: "arjun.nair@example.com",
    phone: "+91 98455 17842",
    date: "24 Jul 2026, 07:20 PM",
    total: 9999,
    subtotal: 9999,
    shippingCharge: 0,
    discount: 0,
    tax: 1525,
    status: "Cancelled",
    paymentStatus: "Refunded",
    paymentMethod: "UPI",
    paymentId: "upi_KRVE10476",
    channel: "Marketplace",
    city: "Kochi",
    state: "Kerala",
    pincode: "682031",
    address: "Marine Drive, Kochi, Kerala",
    priority: "Normal",
    fraudFlag: false,
    codVerified: true,
    internalNote: "Customer cancelled before dispatch. Refund completed.",
    items: [
      {
        id: "ITEM-08",
        name: "KRVE Tailored Trousers",
        sku: "KRV-TT-047",
        quantity: 1,
        size: "32",
        price: 9999,
      },
    ],
    timeline: [
      {
        title: "Order placed",
        description: "Marketplace order received.",
        time: "24 Jul 2026, 07:20 PM",
        completed: true,
      },
      {
        title: "Cancelled",
        description: "Cancelled by customer.",
        time: "24 Jul 2026, 08:00 PM",
        completed: true,
      },
      {
        title: "Refund completed",
        description: "Full payment refunded through UPI.",
        time: "25 Jul 2026, 10:20 AM",
        completed: true,
      },
    ],
  },
  {
    id: "KRVE-10475",
    customer: "Ishita Roy",
    email: "ishita.roy@example.com",
    phone: "+91 98302 66170",
    date: "24 Jul 2026, 05:12 PM",
    total: 16998,
    subtotal: 16998,
    shippingCharge: 0,
    discount: 0,
    tax: 2593,
    status: "Pending",
    paymentStatus: "Failed",
    paymentMethod: "Credit Card",
    paymentId: "failed_KRVE10475",
    channel: "KRVE Website",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700091",
    address: "Salt Lake, Kolkata, West Bengal",
    priority: "High",
    fraudFlag: true,
    codVerified: true,
    internalNote: "Multiple failed payment attempts. Manual review required.",
    items: [
      {
        id: "ITEM-09",
        name: "KRVE Icon Sneakers",
        sku: "KRV-IS-021",
        quantity: 2,
        size: "UK 7",
        price: 8499,
      },
    ],
    timeline: [
      {
        title: "Order initiated",
        description: "Customer initiated checkout.",
        time: "24 Jul 2026, 05:12 PM",
        completed: true,
      },
      {
        title: "Payment failed",
        description: "Credit-card payment was declined.",
        time: "24 Jul 2026, 05:13 PM",
        completed: true,
      },
      {
        title: "Manual review",
        description: "Order flagged for payment review.",
        time: "Pending",
        completed: false,
      },
    ],
  },
];

const initialReturns: ReturnRequest[] = [
  {
    id: "RET-2026-041",
    orderId: "KRVE-10462",
    customer: "Aditya Sharma",
    product: "KRVE Noir Blazer",
    reason: "Size did not fit",
    requestType: "Replacement",
    amount: 18999,
    status: "Requested",
    requestedAt: "25 Jul 2026",
  },
  {
    id: "RET-2026-040",
    orderId: "KRVE-10451",
    customer: "Meera Joshi",
    product: "KRVE Icon Sneakers",
    reason: "Product damaged in transit",
    requestType: "Return",
    amount: 8499,
    status: "Approved",
    requestedAt: "24 Jul 2026",
  },
  {
    id: "RET-2026-039",
    orderId: "KRVE-10442",
    customer: "Rahul Jain",
    product: "Signature Blazer",
    reason: "Colour variation",
    requestType: "Return",
    amount: 12999,
    status: "Completed",
    requestedAt: "22 Jul 2026",
  },
];

const tabItems: {
  id: WorkspaceTab;
  label: string;
  icon: IconType;
}[] = [
  {
    id: "Orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    id: "Fulfilment",
    label: "Fulfilment",
    icon: PackageCheck,
  },
  {
    id: "Payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    id: "Returns",
    label: "Returns & Refunds",
    icon: RotateCcw,
  },
  {
    id: "Analytics",
    label: "Order Analytics",
    icon: CircleDollarSign,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function orderStatusClass(status: OrderStatus) {
  if (status === "Delivered") {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (status === "Cancelled" || status === "Returned") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (status === "Pending") {
    return "border-orange-200 bg-orange-50 text-orange-700";
  }

  if (status === "Shipped") {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }

  return "border-blue-200 bg-blue-50 text-blue-700";
}

function paymentStatusClass(status: PaymentStatus) {
  if (status === "Paid") {
    return "bg-green-50 text-green-700";
  }

  if (status === "Failed") {
    return "bg-red-50 text-red-700";
  }

  if (
    status === "Refunded" ||
    status === "Partially Refunded"
  ) {
    return "bg-violet-50 text-violet-700";
  }

  return "bg-orange-50 text-orange-700";
}

function priorityClass(priority: OrderPriority) {
  if (priority === "Critical") {
    return "bg-red-50 text-red-700";
  }

  if (priority === "High") {
    return "bg-orange-50 text-orange-700";
  }

  return "bg-slate-100 text-slate-600";
}

function returnStatusClass(status: ReturnRequest["status"]) {
  if (status === "Completed") {
    return "bg-green-50 text-green-700";
  }

  if (status === "Rejected") {
    return "bg-red-50 text-red-700";
  }

  if (status === "Approved") {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-orange-50 text-orange-700";
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [returns, setReturns] =
    useState<ReturnRequest[]>(initialReturns);

  const [activeWorkspace, setActiveWorkspace] =
    useState<WorkspaceTab>("Orders");

  const [activeStatus, setActiveStatus] = useState<
    "All" | OrderStatus
  >("All");

  const [paymentFilter, setPaymentFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOrderId, setSelectedOrderId] =
    useState<string | null>(null);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] =
    useState<OrderStatus>("Processing");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) ??
    null;

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return orders.filter((order) => {
      const statusMatch =
        activeStatus === "All" ||
        order.status === activeStatus;

      const paymentMatch =
        paymentFilter === "All" ||
        order.paymentStatus === paymentFilter;

      const channelMatch =
        channelFilter === "All" ||
        order.channel === channelFilter;

      const priorityMatch =
        priorityFilter === "All" ||
        order.priority === priorityFilter;

      const queryMatch =
        !query ||
        `${order.id} ${order.customer} ${order.email} ${order.phone} ${order.city} ${order.state} ${order.paymentId}`
          .toLowerCase()
          .includes(query);

      return (
        statusMatch &&
        paymentMatch &&
        channelMatch &&
        priorityMatch &&
        queryMatch
      );
    });
  }, [
    activeStatus,
    channelFilter,
    orders,
    paymentFilter,
    priorityFilter,
    searchQuery,
  ]);

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((total, order) => total + order.total, 0);

  const openOrders = orders.filter((order) =>
    [
      "Pending",
      "Confirmed",
      "Processing",
      "Packed",
      "Shipped",
    ].includes(order.status),
  ).length;

  const paymentIssues = orders.filter(
    (order) =>
      order.paymentStatus === "Failed" ||
      order.paymentStatus === "Pending",
  ).length;

  const fulfilledOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const averageOrderValue = Math.round(
    orders.reduce((total, order) => total + order.total, 0) /
      Math.max(orders.length, 1),
  );

  function updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              trackingId:
                status === "Shipped" && !order.trackingId
                  ? `KRVE-${Date.now()
                      .toString()
                      .slice(-8)}`
                  : order.trackingId,
              courier:
                status === "Shipped" && !order.courier
                  ? "Delhivery"
                  : order.courier,
              timeline: [
                ...order.timeline,
                {
                  title: `Order ${status.toLowerCase()}`,
                  description: `Order status updated to ${status}.`,
                  time: new Date().toLocaleString("en-IN"),
                  completed: true,
                },
              ],
            }
          : order,
      ),
    );
  }

  function verifyCod(orderId: string) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              codVerified: true,
              status:
                order.status === "Pending"
                  ? "Confirmed"
                  : order.status,
              internalNote:
                "COD verification completed successfully.",
            }
          : order,
      ),
    );
  }

  function updateInternalNote(
    orderId: string,
    note: string,
  ) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              internalNote: note,
            }
          : order,
      ),
    );
  }

  function toggleSelected(orderId: string) {
    setSelectedRows((current) =>
      current.includes(orderId)
        ? current.filter((id) => id !== orderId)
        : [...current, orderId],
    );
  }

  function toggleAll() {
    const visibleIds = filteredOrders.map((order) => order.id);
    const allSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedRows.includes(id));

    if (allSelected) {
      setSelectedRows((current) =>
        current.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      setSelectedRows((current) =>
        Array.from(new Set([...current, ...visibleIds])),
      );
    }
  }

  function applyBulkStatus() {
    setOrders((current) =>
      current.map((order) =>
        selectedRows.includes(order.id)
          ? {
              ...order,
              status: bulkStatus,
            }
          : order,
      ),
    );

    setSelectedRows([]);
  }

  function updateReturnStatus(
    returnId: string,
    status: ReturnRequest["status"],
  ) {
    setReturns((current) =>
      current.map((request) =>
        request.id === returnId
          ? {
              ...request,
              status,
            }
          : request,
      ),
    );
  }

  function refreshOrders() {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  }

  function exportOrders() {
    const rows = [
      [
        "Order ID",
        "Customer",
        "Email",
        "Phone",
        "Date",
        "Total",
        "Order Status",
        "Payment Status",
        "Payment Method",
        "Channel",
        "City",
        "Priority",
      ],
      ...filteredOrders.map((order) => [
        order.id,
        order.customer,
        order.email,
        order.phone,
        order.date,
        formatCurrency(order.total),
        order.status,
        order.paymentStatus,
        order.paymentMethod,
        order.channel,
        order.city,
        order.priority,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map(
            (cell) =>
              `"${String(cell).replaceAll('"', '""')}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "keos-orders-report.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 p-7 text-white shadow-xl shadow-blue-900/10 sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              <ShoppingBag size={16} />
              Commerce Operations
            </div>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              Orders Management
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              Manage orders, payments, fulfilment, shipment,
              delivery, invoices, returns, refunds and customer
              communication from one centralized workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={refreshOrders}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20"
            >
              <RefreshCcw
                size={17}
                className={isRefreshing ? "animate-spin" : ""}
              />

              {isRefreshing ? "Synchronizing..." : "Sync Orders"}
            </button>

            <button
              type="button"
              onClick={exportOrders}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
            >
              <Download size={17} />
              Export Orders
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard
          title="Total Orders"
          value={orders.length.toLocaleString("en-IN")}
          description="All commerce channels"
          icon={ShoppingBag}
          tone="blue"
        />

        <SummaryCard
          title="Order Revenue"
          value={formatCurrency(totalRevenue)}
          description="+18.4% this period"
          icon={CircleDollarSign}
          tone="green"
        />

        <SummaryCard
          title="Open Orders"
          value={String(openOrders).padStart(2, "0")}
          description="Awaiting fulfilment"
          icon={ClockIcon}
          tone="orange"
        />

        <SummaryCard
          title="Payment Issues"
          value={String(paymentIssues).padStart(2, "0")}
          description="Require attention"
          icon={ShieldAlert}
          tone="red"
        />

        <SummaryCard
          title="Fulfilled"
          value={String(fulfilledOrders).padStart(2, "0")}
          description="Delivered successfully"
          icon={CheckCircle2}
          tone="violet"
        />
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabItems.map((tab) => {
            const Icon = tab.icon;
            const active = activeWorkspace === tab.id;

            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveWorkspace(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {activeWorkspace === "Orders" && (
        <OrdersWorkspace
          orders={orders}
          filteredOrders={filteredOrders}
          activeStatus={activeStatus}
          paymentFilter={paymentFilter}
          channelFilter={channelFilter}
          priorityFilter={priorityFilter}
          searchQuery={searchQuery}
          selectedRows={selectedRows}
          bulkStatus={bulkStatus}
          onStatusFilter={setActiveStatus}
          onPaymentFilter={setPaymentFilter}
          onChannelFilter={setChannelFilter}
          onPriorityFilter={setPriorityFilter}
          onSearch={setSearchQuery}
          onSelectOrder={setSelectedOrderId}
          onToggleSelected={toggleSelected}
          onToggleAll={toggleAll}
          onBulkStatus={setBulkStatus}
          onApplyBulkStatus={applyBulkStatus}
          onClearSelection={() => setSelectedRows([])}
          onUpdateStatus={updateOrderStatus}
        />
      )}

      {activeWorkspace === "Fulfilment" && (
        <FulfilmentWorkspace
          orders={orders}
          onSelectOrder={setSelectedOrderId}
          onUpdateStatus={updateOrderStatus}
        />
      )}

      {activeWorkspace === "Payments" && (
        <PaymentsWorkspace
          orders={orders}
          onSelectOrder={setSelectedOrderId}
          onVerifyCod={verifyCod}
        />
      )}

      {activeWorkspace === "Returns" && (
        <ReturnsWorkspace
          requests={returns}
          onUpdateStatus={updateReturnStatus}
        />
      )}

      {activeWorkspace === "Analytics" && (
        <AnalyticsWorkspace
          orders={orders}
          averageOrderValue={averageOrderValue}
        />
      )}

      {selectedOrder && (
        <OrderDetailsPanel
          order={selectedOrder}
          onClose={() => setSelectedOrderId(null)}
          onUpdateStatus={(status) =>
            updateOrderStatus(selectedOrder.id, status)
          }
          onVerifyCod={() => verifyCod(selectedOrder.id)}
          onUpdateNote={(note) =>
            updateInternalNote(selectedOrder.id, note)
          }
        />
      )}
    </div>
  );
}

const ClockIcon = CalendarDays;

function OrdersWorkspace({
  orders,
  filteredOrders,
  activeStatus,
  paymentFilter,
  channelFilter,
  priorityFilter,
  searchQuery,
  selectedRows,
  bulkStatus,
  onStatusFilter,
  onPaymentFilter,
  onChannelFilter,
  onPriorityFilter,
  onSearch,
  onSelectOrder,
  onToggleSelected,
  onToggleAll,
  onBulkStatus,
  onApplyBulkStatus,
  onClearSelection,
  onUpdateStatus,
}: {
  orders: Order[];
  filteredOrders: Order[];
  activeStatus: "All" | OrderStatus;
  paymentFilter: string;
  channelFilter: string;
  priorityFilter: string;
  searchQuery: string;
  selectedRows: string[];
  bulkStatus: OrderStatus;
  onStatusFilter: (status: "All" | OrderStatus) => void;
  onPaymentFilter: (value: string) => void;
  onChannelFilter: (value: string) => void;
  onPriorityFilter: (value: string) => void;
  onSearch: (value: string) => void;
  onSelectOrder: (id: string) => void;
  onToggleSelected: (id: string) => void;
  onToggleAll: () => void;
  onBulkStatus: (status: OrderStatus) => void;
  onApplyBulkStatus: () => void;
  onClearSelection: () => void;
  onUpdateStatus: (
    orderId: string,
    status: OrderStatus,
  ) => void;
}) {
  const visibleStatuses: ("All" | OrderStatus)[] = [
    "All",
    "Pending",
    "Processing",
    "Packed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div className="flex flex-wrap gap-2">
            {visibleStatuses.map((status) => {
              const count =
                status === "All"
                  ? orders.length
                  : orders.filter(
                      (order) => order.status === status,
                    ).length;

              return (
                <button
                  type="button"
                  key={status}
                  onClick={() => onStatusFilter(status)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold ${
                    activeStatus === status
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {status}

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      activeStatus === status
                        ? "bg-white/20"
                        : "bg-white"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex h-11 min-w-[300px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
            <Search size={17} className="text-slate-400" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                onSearch(event.target.value)
              }
              placeholder="Search order, customer, payment ID or city..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearch("")}
              >
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-3">
            <FilterSelect
              icon={CreditCard}
              value={paymentFilter}
              onChange={onPaymentFilter}
              options={[
                ["All", "All Payments"],
                ["Paid", "Paid"],
                ["Pending", "Pending"],
                ["Failed", "Failed"],
                ["Refunded", "Refunded"],
              ]}
            />

            <FilterSelect
              icon={Smartphone}
              value={channelFilter}
              onChange={onChannelFilter}
              options={[
                ["All", "All Channels"],
                ["KRVE Website", "KRVE Website"],
                ["KRVE Mobile App", "KRVE Mobile App"],
                ["Marketplace", "Marketplace"],
              ]}
            />

            <FilterSelect
              icon={AlertTriangle}
              value={priorityFilter}
              onChange={onPriorityFilter}
              options={[
                ["All", "All Priorities"],
                ["Normal", "Normal"],
                ["High", "High"],
                ["Critical", "Critical"],
              ]}
            />
          </div>

          {selectedRows.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3">
              <span className="text-xs font-bold text-blue-800">
                {selectedRows.length} selected
              </span>

              <select
                value={bulkStatus}
                onChange={(event) =>
                  onBulkStatus(
                    event.target.value as OrderStatus,
                  )
                }
                className="h-9 rounded-lg border border-blue-200 bg-white px-3 text-xs font-semibold"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={onApplyBulkStatus}
                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"
              >
                Update Selected
              </button>

              <button
                type="button"
                onClick={onClearSelection}
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1320px] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">
                <input
                  type="checkbox"
                  checked={
                    filteredOrders.length > 0 &&
                    filteredOrders.every((order) =>
                      selectedRows.includes(order.id),
                    )
                  }
                  onChange={onToggleAll}
                  className="h-4 w-4 accent-blue-600"
                />
              </th>

              <th className="px-4 py-4">Order</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Amount</th>
              <th className="px-4 py-4">Payment</th>
              <th className="px-4 py-4">Priority</th>
              <th className="px-4 py-4">Channel</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-5 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-100 text-sm hover:bg-slate-50"
              >
                <td className="px-5 py-5">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(order.id)}
                    onChange={() =>
                      onToggleSelected(order.id)
                    }
                    className="h-4 w-4 accent-blue-600"
                  />
                </td>

                <td className="px-4 py-5">
                  <button
                    type="button"
                    onClick={() => onSelectOrder(order.id)}
                    className="font-black text-blue-600"
                  >
                    {order.id}
                  </button>

                  <span className="mt-1 block text-[10px] text-slate-400">
                    {order.items.length} product(s)
                  </span>

                  {order.fraudFlag && (
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[9px] font-bold text-red-700">
                      <ShieldAlert size={11} />
                      Fraud review
                    </span>
                  )}
                </td>

                <td className="px-4 py-5">
                  <strong className="block text-slate-900">
                    {order.customer}
                  </strong>

                  <span className="mt-1 block text-xs text-slate-500">
                    {order.email}
                  </span>
                </td>

                <td className="px-4 py-5 text-xs text-slate-600">
                  {order.date}
                </td>

                <td className="px-4 py-5 font-black">
                  {formatCurrency(order.total)}
                </td>

                <td className="px-4 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${paymentStatusClass(
                      order.paymentStatus,
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>

                  <span className="mt-2 block text-[10px] text-slate-500">
                    {order.paymentMethod}
                  </span>
                </td>

                <td className="px-4 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${priorityClass(
                      order.priority,
                    )}`}
                  >
                    {order.priority}
                  </span>
                </td>

                <td className="px-4 py-5 text-xs text-slate-600">
                  {order.channel}
                </td>

                <td className="px-4 py-5">
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-bold ${orderStatusClass(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-5 py-5">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectOrder(order.id)}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={16} />
                    </button>

                    <select
                      value={order.status}
                      onChange={(event) =>
                        onUpdateStatus(
                          order.id,
                          event.target.value as OrderStatus,
                        )
                      }
                      className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold"
                    >
                      {statusOptions.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="py-20 text-center">
            <ShoppingBag
              size={30}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-800">
              No orders found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Change the selected filters or search query.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        <span>
          Showing {filteredOrders.length} of {orders.length}{" "}
          orders
        </span>

        <span>Live commerce data</span>
      </div>
    </section>
  );
}

function FulfilmentWorkspace({
  orders,
  onSelectOrder,
  onUpdateStatus,
}: {
  orders: Order[];
  onSelectOrder: (id: string) => void;
  onUpdateStatus: (
    orderId: string,
    status: OrderStatus,
  ) => void;
}) {
  const stages: {
    title: string;
    status: OrderStatus;
    icon: IconType;
  }[] = [
    {
      title: "Confirmed",
      status: "Confirmed",
      icon: BadgeCheck,
    },
    {
      title: "Processing",
      status: "Processing",
      icon: ClipboardCheck,
    },
    {
      title: "Packed",
      status: "Packed",
      icon: PackageCheck,
    },
    {
      title: "Shipped",
      status: "Shipped",
      icon: Truck,
    },
  ];

  return (
    <div className="mt-6">
      <section className="grid gap-5 xl:grid-cols-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const stageOrders = orders.filter(
            (order) => order.status === stage.status,
          );

          return (
            <article
              key={stage.status}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>

                <span className="text-2xl font-black">
                  {stageOrders.length}
                </span>
              </div>

              <h3 className="mt-5 font-black">
                {stage.title}
              </h3>

              <div className="mt-4 space-y-3">
                {stageOrders.map((order) => (
                  <button
                    type="button"
                    key={order.id}
                    onClick={() => onSelectOrder(order.id)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-left hover:border-blue-300"
                  >
                    <strong className="text-xs text-blue-600">
                      {order.id}
                    </strong>

                    <span className="mt-1 block text-xs font-semibold">
                      {order.customer}
                    </span>

                    <span className="mt-1 block text-[10px] text-slate-500">
                      {formatCurrency(order.total)}
                    </span>
                  </button>
                ))}

                {stageOrders.length === 0 && (
                  <p className="py-5 text-center text-xs text-slate-400">
                    No orders
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black">
          Ready for Operational Action
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-500">
                <th className="pb-4">Order</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Current Stage</th>
                <th className="pb-4">Delivery City</th>
                <th className="pb-4">Next Action</th>
              </tr>
            </thead>

            <tbody>
              {orders
                .filter((order) =>
                  [
                    "Confirmed",
                    "Processing",
                    "Packed",
                    "Shipped",
                  ].includes(order.status),
                )
                .map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 text-sm"
                  >
                    <td className="py-4 font-bold text-blue-600">
                      {order.id}
                    </td>

                    <td className="py-4">
                      {order.customer}
                    </td>

                    <td className="py-4">
                      {order.status}
                    </td>

                    <td className="py-4">
                      {order.city}
                    </td>

                    <td className="py-4">
                      <button
                        type="button"
                        onClick={() => {
                          const next:
                            | OrderStatus
                            | undefined =
                            order.status === "Confirmed"
                              ? "Processing"
                              : order.status === "Processing"
                                ? "Packed"
                                : order.status === "Packed"
                                  ? "Shipped"
                                  : order.status === "Shipped"
                                    ? "Delivered"
                                    : undefined;

                          if (next) {
                            onUpdateStatus(order.id, next);
                          }
                        }}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"
                      >
                        Move to Next Stage
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function PaymentsWorkspace({
  orders,
  onSelectOrder,
  onVerifyCod,
}: {
  orders: Order[];
  onSelectOrder: (id: string) => void;
  onVerifyCod: (id: string) => void;
}) {
  const paid = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((total, order) => total + order.total, 0);

  const failed = orders.filter(
    (order) => order.paymentStatus === "Failed",
  ).length;

  const pendingCod = orders.filter(
    (order) =>
      order.paymentMethod === "Cash on Delivery" &&
      !order.codVerified,
  ).length;

  const refunds = orders
    .filter((order) =>
      ["Refunded", "Partially Refunded"].includes(
        order.paymentStatus,
      ),
    )
    .reduce((total, order) => total + order.total, 0);

  return (
    <div className="mt-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Payments Received"
          value={formatCurrency(paid)}
          description="Successfully collected"
          icon={WalletCards}
          tone="green"
        />

        <SummaryCard
          title="Failed Payments"
          value={String(failed).padStart(2, "0")}
          description="Payment recovery required"
          icon={XCircle}
          tone="red"
        />

        <SummaryCard
          title="COD Verification"
          value={String(pendingCod).padStart(2, "0")}
          description="Awaiting customer confirmation"
          icon={Banknote}
          tone="orange"
        />

        <SummaryCard
          title="Refunded"
          value={formatCurrency(refunds)}
          description="Total refunded amount"
          icon={Undo2}
          tone="violet"
        />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black">
          Payment Transactions
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-500">
                <th className="pb-4">Order</th>
                <th className="pb-4">Payment ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Method</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 text-sm"
                >
                  <td className="py-4 font-bold text-blue-600">
                    {order.id}
                  </td>

                  <td className="py-4 text-xs text-slate-500">
                    {order.paymentId}
                  </td>

                  <td className="py-4">
                    {order.customer}
                  </td>

                  <td className="py-4">
                    {order.paymentMethod}
                  </td>

                  <td className="py-4 font-black">
                    {formatCurrency(order.total)}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${paymentStatusClass(
                        order.paymentStatus,
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="py-4">
                    {order.paymentMethod ===
                      "Cash on Delivery" &&
                    !order.codVerified ? (
                      <button
                        type="button"
                        onClick={() => onVerifyCod(order.id)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"
                      >
                        Verify COD
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectOrder(order.id)}
                        className="text-xs font-bold text-blue-600"
                      >
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ReturnsWorkspace({
  requests,
  onUpdateStatus,
}: {
  requests: ReturnRequest[];
  onUpdateStatus: (
    returnId: string,
    status: ReturnRequest["status"],
  ) => void;
}) {
  return (
    <div className="mt-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Return Requests"
          value={String(requests.length).padStart(2, "0")}
          description="Total return and replacement requests"
          icon={RotateCcw}
          tone="blue"
        />

        <SummaryCard
          title="Awaiting Review"
          value={String(
            requests.filter(
              (request) => request.status === "Requested",
            ).length,
          ).padStart(2, "0")}
          description="Founder action required"
          icon={CalendarDays}
          tone="orange"
        />

        <SummaryCard
          title="Approved"
          value={String(
            requests.filter(
              (request) => request.status === "Approved",
            ).length,
          ).padStart(2, "0")}
          description="Approved for processing"
          icon={CheckCircle2}
          tone="green"
        />

        <SummaryCard
          title="Refund Exposure"
          value={formatCurrency(
            requests
              .filter(
                (request) =>
                  request.requestType === "Return",
              )
              .reduce(
                (total, request) =>
                  total + request.amount,
                0,
              ),
          )}
          description="Potential refund amount"
          icon={ReceiptIndianRupee}
          tone="red"
        />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black">
              Return and Replacement Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review customer post-delivery requests
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white"
          >
            <Plus size={16} />
            Create Request
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-500">
                <th className="pb-4">Request</th>
                <th className="pb-4">Order</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Product</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Reason</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-slate-100 text-sm"
                >
                  <td className="py-4 font-bold text-blue-600">
                    {request.id}
                  </td>

                  <td className="py-4">
                    {request.orderId}
                  </td>

                  <td className="py-4">
                    {request.customer}
                  </td>

                  <td className="py-4">
                    {request.product}
                  </td>

                  <td className="py-4">
                    {request.requestType}
                  </td>

                  <td className="py-4 text-xs text-slate-500">
                    {request.reason}
                  </td>

                  <td className="py-4 font-black">
                    {formatCurrency(request.amount)}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${returnStatusClass(
                        request.status,
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td className="py-4">
                    {request.status === "Requested" && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStatus(
                              request.id,
                              "Approved",
                            )
                          }
                          className="grid h-9 w-9 place-items-center rounded-lg bg-green-50 text-green-600"
                        >
                          <Check size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStatus(
                              request.id,
                              "Rejected",
                            )
                          }
                          className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}

                    {request.status === "Approved" && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            request.id,
                            "Completed",
                          )
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AnalyticsWorkspace({
  orders,
  averageOrderValue,
}: {
  orders: Order[];
  averageOrderValue: number;
}) {
  const statusData = statusOptions.map((status) => ({
    status,
    value: orders.filter((order) => order.status === status)
      .length,
  }));

  const channels = Array.from(
    new Set(orders.map((order) => order.channel)),
  ).map((channel) => ({
    channel,
    revenue: orders
      .filter((order) => order.channel === channel)
      .reduce((total, order) => total + order.total, 0),
    orders: orders.filter(
      (order) => order.channel === channel,
    ).length,
  }));

  return (
    <div className="mt-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Average Order Value"
          value={formatCurrency(averageOrderValue)}
          description="+4.8% from previous period"
          icon={IndianRupee}
          tone="blue"
        />

        <SummaryCard
          title="Delivery Success"
          value={`${Math.round(
            (orders.filter(
              (order) => order.status === "Delivered",
            ).length /
              Math.max(orders.length, 1)) *
              100,
          )}%`}
          description="Successfully delivered orders"
          icon={PackageCheck}
          tone="green"
        />

        <SummaryCard
          title="Cancellation Rate"
          value={`${Math.round(
            (orders.filter(
              (order) => order.status === "Cancelled",
            ).length /
              Math.max(orders.length, 1)) *
              100,
          )}%`}
          description="Cancelled customer orders"
          icon={Ban}
          tone="red"
        />

        <SummaryCard
          title="Payment Success"
          value={`${Math.round(
            (orders.filter(
              (order) => order.paymentStatus === "Paid",
            ).length /
              Math.max(orders.length, 1)) *
              100,
          )}%`}
          description="Successful online transactions"
          icon={CreditCard}
          tone="violet"
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black">
            Order Status Distribution
          </h2>

          <div className="mt-7 space-y-5">
            {statusData.map((item) => (
              <div key={item.status}>
                <div className="mb-2 flex justify-between">
                  <strong className="text-xs">
                    {item.status}
                  </strong>

                  <span className="text-xs font-bold">
                    {item.value}
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${Math.max(
                        5,
                        (item.value /
                          Math.max(orders.length, 1)) *
                          100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black">
            Sales Channel Performance
          </h2>

          <div className="mt-6 space-y-4">
            {channels.map((channel) => (
              <div
                key={channel.channel}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex justify-between">
                  <strong>{channel.channel}</strong>

                  <span className="text-sm font-black text-blue-600">
                    {formatCurrency(channel.revenue)}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {channel.orders} orders
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function OrderDetailsPanel({
  order,
  onClose,
  onUpdateStatus,
  onVerifyCod,
  onUpdateNote,
}: {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (status: OrderStatus) => void;
  onVerifyCod: () => void;
  onUpdateNote: (note: string) => void;
}) {
  const [note, setNote] = useState(order.internalNote);

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm"
      />

      <aside className="fixed inset-y-0 right-0 z-[70] w-full max-w-[610px] overflow-y-auto bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Order Details
            </p>

            <h2 className="mt-1 text-xl font-black">
              {order.id}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200"
          >
            <X size={18} />
          </button>
        </header>

        <div className="p-6">
          <section className="rounded-2xl bg-blue-600 p-5 text-white">
            <div className="flex justify-between gap-5">
              <div>
                <p className="text-xs text-blue-100">
                  Order Total
                </p>

                <h3 className="mt-2 text-3xl font-black">
                  {formatCurrency(order.total)}
                </h3>

                <p className="mt-3 text-xs text-blue-100">
                  Placed on {order.date}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${orderStatusClass(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>

                <p className="mt-3 text-xs text-blue-100">
                  {order.channel}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailCard
              icon={UserRound}
              label="Customer"
              value={order.customer}
              description={order.email}
            />

            <DetailCard
              icon={CreditCard}
              label="Payment"
              value={order.paymentStatus}
              description={order.paymentMethod}
            />

            <DetailCard
              icon={MapPin}
              label="Destination"
              value={`${order.city}, ${order.state}`}
              description={order.phone}
            />

            <DetailCard
              icon={AlertTriangle}
              label="Priority"
              value={order.priority}
              description={
                order.fraudFlag
                  ? "Fraud review required"
                  : "No security alert"
              }
            />
          </section>

          {order.paymentMethod === "Cash on Delivery" &&
            !order.codVerified && (
              <section className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-orange-900">
                      COD verification pending
                    </h3>

                    <p className="mt-2 text-xs text-orange-700">
                      Confirm the order with the customer before
                      fulfilment.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onVerifyCod}
                    className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-bold text-white"
                  >
                    Verify COD
                  </button>
                </div>
              </section>
            )}

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">Ordered Products</h3>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Package size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-sm">
                      {item.name}
                    </strong>

                    <span className="mt-1 block text-xs text-slate-500">
                      {item.sku} · Size {item.size} · Qty{" "}
                      {item.quantity}
                    </span>
                  </div>

                  <strong>
                    {formatCurrency(
                      item.price * item.quantity,
                    )}
                  </strong>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">Payment Summary</h3>

            <div className="mt-4 space-y-3 text-sm">
              <PriceRow
                label="Subtotal"
                value={formatCurrency(order.subtotal)}
              />

              <PriceRow
                label="Shipping"
                value={formatCurrency(
                  order.shippingCharge,
                )}
              />

              <PriceRow
                label="Discount"
                value={`-${formatCurrency(order.discount)}`}
              />

              <PriceRow
                label="Included Tax"
                value={formatCurrency(order.tax)}
              />

              <div className="border-t border-slate-200 pt-3">
                <PriceRow
                  label="Order Total"
                  value={formatCurrency(order.total)}
                  strong
                />
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <MapPin size={17} className="text-blue-600" />
              <h3 className="font-black">Shipping Address</h3>
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              {order.address}, {order.pincode}
            </p>
          </section>

          {order.trackingId && (
            <section className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-violet-600" />
                <h3 className="font-black text-violet-900">
                  Shipment Tracking
                </h3>
              </div>

              <p className="mt-3 text-xs text-violet-700">
                Courier: {order.courier}
              </p>

              <p className="mt-2 text-xs font-bold text-violet-800">
                Tracking ID: {order.trackingId}
              </p>

              <p className="mt-2 text-xs text-violet-700">
                {order.estimatedDelivery}
              </p>
            </section>
          )}

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">Order Timeline</h3>

            <div className="mt-5 space-y-5">
              {order.timeline.map((event, index) => (
                <div
                  key={`${event.title}-${index}`}
                  className="flex gap-3"
                >
                  <div
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                      event.completed
                        ? "bg-blue-600"
                        : "bg-slate-300"
                    }`}
                  />

                  <div>
                    <strong className="text-sm">
                      {event.title}
                    </strong>

                    <p className="mt-1 text-xs text-slate-500">
                      {event.description}
                    </p>

                    <span className="mt-1 block text-[10px] text-slate-400">
                      {event.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <label className="text-sm font-bold">
              Internal Order Note
            </label>

            <textarea
              rows={4}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => onUpdateNote(note)}
              className="mt-3 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white"
            >
              Save Internal Note
            </button>
          </section>

          <section className="mt-6">
            <label className="text-sm font-bold">
              Update Order Status
            </label>

            <select
              value={order.status}
              onChange={(event) =>
                onUpdateStatus(
                  event.target.value as OrderStatus,
                )
              }
              className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 font-semibold"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-xs font-bold"
            >
              <Printer size={16} />
              Print
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-xs font-bold"
            >
              <FileDown size={16} />
              Invoice
            </button>

            <button
              type="button"
              onClick={() => onUpdateStatus("Cancelled")}
              disabled={
                order.status === "Delivered" ||
                order.status === "Cancelled"
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-3 text-xs font-bold text-red-700 disabled:opacity-40"
            >
              <XCircle size={16} />
              Cancel
            </button>
          </section>
        </div>
      </aside>
    </>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  icon: IconType;
  tone: "blue" | "green" | "orange" | "red" | "violet";
}) {
  const className =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "orange"
        ? "bg-orange-50 text-orange-600"
        : tone === "red"
          ? "bg-red-50 text-red-600"
          : tone === "violet"
            ? "bg-violet-50 text-violet-600"
            : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${className}`}
        >
          <Icon size={21} />
        </div>

        <ArrowUpRight size={17} className="text-slate-300" />
      </div>

      <p className="mt-5 text-xs font-semibold text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-black">
        {value}
      </h2>

      <span className="mt-2 block text-[11px] text-slate-500">
        {description}
      </span>
    </article>
  );
}

function FilterSelect({
  icon: Icon,
  value,
  onChange,
  options,
}: {
  icon: IconType;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="relative">
      <Icon
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-xs font-semibold text-slate-600"
      >
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: IconType;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <Icon size={18} className="text-blue-600" />

      <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <strong className="mt-2 block text-xs">
        {value}
      </strong>

      <span className="mt-1 block truncate text-[10px] text-slate-500">
        {description}
      </span>
    </article>
  );
}

function PriceRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span
        className={
          strong
            ? "font-black text-slate-900"
            : "text-slate-500"
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "font-black text-slate-900"
            : "font-semibold"
        }
      >
        {value}
      </span>
    </div>
  );
}