"use client";

import type * as React from "react";

import {
  Activity,
  AlertTriangle,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FileBarChart,
  FileText,
  Filter,
  History,
  IndianRupee,
  Layers3,
  MoreHorizontal,
  Package,
  PackageCheck,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  Truck,
  Warehouse,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
  type ComponentType,
  type FormEvent,
  type ReactNode,
} from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type InventoryStatus =
  | "Healthy"
  | "Low Stock"
  | "Out of Stock"
  | "Overstock"
  | "Inactive";

type MovementType =
  | "Stock In"
  | "Stock Out"
  | "Transfer"
  | "Adjustment"
  | "Return";

type PurchaseOrderStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Partially Received"
  | "Received"
  | "Cancelled";

type InventoryTab =
  | "overview"
  | "stock"
  | "movements"
  | "warehouses"
  | "purchase-orders"
  | "suppliers"
  | "analytics"
  | "reports"
  | "ai";

type ModalType =
  | "stock-in"
  | "stock-out"
  | "transfer"
  | "adjustment"
  | "add-item"
  | "purchase-order"
  | "view-item"
  | null;

type InventoryItem = {
  id: number;
  sku: string;
  productName: string;
  variant: string;
  category: string;
  warehouse: string;
  location: string;
  currentStock: number;
  reservedStock: number;
  reorderLevel: number;
  maximumStock: number;
  incomingStock: number;
  unitCost: number;
  sellingPrice: number;
  supplier: string;
  lastUpdated: string;
  status: InventoryStatus;
  imageCode: string;
};

type StockMovement = {
  id: string;
  date: string;
  type: MovementType;
  sku: string;
  productName: string;
  warehouse: string;
  quantity: number;
  reference: string;
  performedBy: string;
  notes: string;
};

type WarehouseRecord = {
  id: string;
  name: string;
  code: string;
  city: string;
  manager: string;
  capacity: number;
  usedCapacity: number;
  totalItems: number;
  inventoryValue: number;
  status: "Operational" | "Maintenance" | "Inactive";
};

type PurchaseOrder = {
  id: string;
  supplier: string;
  orderDate: string;
  expectedDate: string;
  items: number;
  quantity: number;
  totalAmount: number;
  warehouse: string;
  status: PurchaseOrderStatus;
};

type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  suppliedItems: number;
  openOrders: number;
  leadTime: string;
  rating: number;
  totalPurchases: number;
  status: "Active" | "On Hold" | "Inactive";
};

type InventoryForm = {
  sku: string;
  productName: string;
  variant: string;
  category: string;
  warehouse: string;
  location: string;
  currentStock: string;
  reorderLevel: string;
  maximumStock: string;
  unitCost: string;
  sellingPrice: string;
  supplier: string;
};

const inventoryTabs: Array<{
  id: InventoryTab;
  label: string;
  icon: IconType;
}> = [
  {
    id: "overview",
    label: "Overview",
    icon: BarChart3,
  },
  {
    id: "stock",
    label: "Stock",
    icon: Boxes,
  },
  {
    id: "movements",
    label: "Movements",
    icon: History,
  },
  {
    id: "warehouses",
    label: "Warehouses",
    icon: Warehouse,
  },
  {
    id: "purchase-orders",
    label: "Purchase Orders",
    icon: ShoppingCart,
  },
  {
    id: "suppliers",
    label: "Suppliers",
    icon: Building2,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: TrendingUp,
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileBarChart,
  },
  {
    id: "ai",
    label: "KRVE AI",
    icon: Sparkles,
  },
];

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    sku: "KRVE-NB-BLK-M",
    productName: "KRVE Noir Blazer",
    variant: "Black / Medium",
    category: "Blazers",
    warehouse: "KRVE Central Warehouse",
    location: "A-01-04",
    currentStock: 48,
    reservedStock: 8,
    reorderLevel: 15,
    maximumStock: 100,
    incomingStock: 25,
    unitCost: 8400,
    sellingPrice: 18999,
    supplier: "Imperial Garments",
    lastUpdated: "25 Jul 2026, 10:35 PM",
    status: "Healthy",
    imageCode: "NB",
  },
  {
    id: 2,
    sku: "KRVE-OS-BLK-42",
    productName: "Obsidian Oxford Shoes",
    variant: "Black / Size 42",
    category: "Footwear",
    warehouse: "KRVE Central Warehouse",
    location: "B-03-12",
    currentStock: 7,
    reservedStock: 3,
    reorderLevel: 12,
    maximumStock: 60,
    incomingStock: 20,
    unitCost: 3900,
    sellingPrice: 8999,
    supplier: "Regal Footwear Works",
    lastUpdated: "25 Jul 2026, 09:40 PM",
    status: "Low Stock",
    imageCode: "OS",
  },
  {
    id: 3,
    sku: "KRVE-SS-WHT-L",
    productName: "Signature Cotton Shirt",
    variant: "White / Large",
    category: "Shirts",
    warehouse: "Delhi Fulfilment Center",
    location: "C-02-08",
    currentStock: 84,
    reservedStock: 19,
    reorderLevel: 20,
    maximumStock: 150,
    incomingStock: 0,
    unitCost: 1600,
    sellingPrice: 4499,
    supplier: "Aurum Textile House",
    lastUpdated: "25 Jul 2026, 08:25 PM",
    status: "Healthy",
    imageCode: "SS",
  },
  {
    id: 4,
    sku: "KRVE-DB-NVY-XL",
    productName: "Double-Breasted Navy Suit",
    variant: "Navy / Extra Large",
    category: "Suits",
    warehouse: "KRVE Central Warehouse",
    location: "A-04-02",
    currentStock: 0,
    reservedStock: 0,
    reorderLevel: 8,
    maximumStock: 40,
    incomingStock: 12,
    unitCost: 14900,
    sellingPrice: 32999,
    supplier: "Imperial Garments",
    lastUpdated: "25 Jul 2026, 07:10 PM",
    status: "Out of Stock",
    imageCode: "DB",
  },
  {
    id: 5,
    sku: "KRVE-IC-SNK-09",
    productName: "KRVE Icon Sneakers",
    variant: "Ivory / Size 9",
    category: "Footwear",
    warehouse: "Mumbai Distribution Hub",
    location: "D-01-15",
    currentStock: 126,
    reservedStock: 14,
    reorderLevel: 25,
    maximumStock: 100,
    incomingStock: 0,
    unitCost: 3200,
    sellingPrice: 7999,
    supplier: "Regal Footwear Works",
    lastUpdated: "25 Jul 2026, 06:45 PM",
    status: "Overstock",
    imageCode: "IS",
  },
  {
    id: 6,
    sku: "KRVE-LT-BRN-32",
    productName: "Heritage Leather Belt",
    variant: "Brown / 32 Inch",
    category: "Accessories",
    warehouse: "Delhi Fulfilment Center",
    location: "E-05-09",
    currentStock: 32,
    reservedStock: 6,
    reorderLevel: 10,
    maximumStock: 80,
    incomingStock: 15,
    unitCost: 950,
    sellingPrice: 2999,
    supplier: "Artisan Leather Co.",
    lastUpdated: "25 Jul 2026, 05:30 PM",
    status: "Healthy",
    imageCode: "HB",
  },
  {
    id: 7,
    sku: "KRVE-TR-BLK-34",
    productName: "Tailored Wool Trousers",
    variant: "Black / Waist 34",
    category: "Trousers",
    warehouse: "Mumbai Distribution Hub",
    location: "F-02-06",
    currentStock: 11,
    reservedStock: 4,
    reorderLevel: 14,
    maximumStock: 75,
    incomingStock: 30,
    unitCost: 2300,
    sellingPrice: 5999,
    supplier: "Aurum Textile House",
    lastUpdated: "25 Jul 2026, 04:15 PM",
    status: "Low Stock",
    imageCode: "TW",
  },
  {
    id: 8,
    sku: "KRVE-WT-SLV",
    productName: "Chronograph Silver Watch",
    variant: "Silver / Standard",
    category: "Accessories",
    warehouse: "KRVE Central Warehouse",
    location: "G-01-01",
    currentStock: 18,
    reservedStock: 5,
    reorderLevel: 6,
    maximumStock: 35,
    incomingStock: 0,
    unitCost: 7200,
    sellingPrice: 16999,
    supplier: "Crown Timepieces",
    lastUpdated: "25 Jul 2026, 03:05 PM",
    status: "Healthy",
    imageCode: "CW",
  },
  {
    id: 9,
    sku: "KRVE-PL-BLK-M",
    productName: "Executive Polo Shirt",
    variant: "Black / Medium",
    category: "T-Shirts",
    warehouse: "Delhi Fulfilment Center",
    location: "C-05-11",
    currentStock: 64,
    reservedStock: 12,
    reorderLevel: 18,
    maximumStock: 120,
    incomingStock: 0,
    unitCost: 1200,
    sellingPrice: 3499,
    supplier: "Aurum Textile House",
    lastUpdated: "25 Jul 2026, 02:30 PM",
    status: "Healthy",
    imageCode: "EP",
  },
  {
    id: 10,
    sku: "KRVE-WL-BLK",
    productName: "Signature Leather Wallet",
    variant: "Black / Standard",
    category: "Accessories",
    warehouse: "Mumbai Distribution Hub",
    location: "E-02-04",
    currentStock: 3,
    reservedStock: 2,
    reorderLevel: 15,
    maximumStock: 90,
    incomingStock: 40,
    unitCost: 1100,
    sellingPrice: 3499,
    supplier: "Artisan Leather Co.",
    lastUpdated: "25 Jul 2026, 01:20 PM",
    status: "Low Stock",
    imageCode: "SW",
  },
];

const initialMovements: StockMovement[] = [
  {
    id: "MOV-2026-1082",
    date: "25 Jul 2026, 10:35 PM",
    type: "Stock In",
    sku: "KRVE-NB-BLK-M",
    productName: "KRVE Noir Blazer",
    warehouse: "KRVE Central Warehouse",
    quantity: 25,
    reference: "PO-2026-0248",
    performedBy: "Aman Verma",
    notes: "Purchase order received and verified.",
  },
  {
    id: "MOV-2026-1081",
    date: "25 Jul 2026, 09:55 PM",
    type: "Stock Out",
    sku: "KRVE-SS-WHT-L",
    productName: "Signature Cotton Shirt",
    warehouse: "Delhi Fulfilment Center",
    quantity: 4,
    reference: "ORD-10482",
    performedBy: "Rohit Singh",
    notes: "Order fulfilment dispatch.",
  },
  {
    id: "MOV-2026-1080",
    date: "25 Jul 2026, 08:40 PM",
    type: "Transfer",
    sku: "KRVE-IC-SNK-09",
    productName: "KRVE Icon Sneakers",
    warehouse: "Mumbai Distribution Hub",
    quantity: 20,
    reference: "TRF-2026-0091",
    performedBy: "Nikhil Sharma",
    notes: "Transferred from central warehouse.",
  },
  {
    id: "MOV-2026-1079",
    date: "25 Jul 2026, 07:15 PM",
    type: "Adjustment",
    sku: "KRVE-LT-BRN-32",
    productName: "Heritage Leather Belt",
    warehouse: "Delhi Fulfilment Center",
    quantity: 2,
    reference: "ADJ-2026-0038",
    performedBy: "Inventory Admin",
    notes: "Cycle count correction.",
  },
  {
    id: "MOV-2026-1078",
    date: "25 Jul 2026, 06:25 PM",
    type: "Return",
    sku: "KRVE-WT-SLV",
    productName: "Chronograph Silver Watch",
    warehouse: "KRVE Central Warehouse",
    quantity: 1,
    reference: "RET-2026-0072",
    performedBy: "Quality Team",
    notes: "Customer return approved after inspection.",
  },
];

const initialWarehouses: WarehouseRecord[] = [
  {
    id: "WH-001",
    name: "KRVE Central Warehouse",
    code: "KRV-CWH",
    city: "Varanasi",
    manager: "Aman Verma",
    capacity: 12000,
    usedCapacity: 7840,
    totalItems: 1482,
    inventoryValue: 5874500,
    status: "Operational",
  },
  {
    id: "WH-002",
    name: "Delhi Fulfilment Center",
    code: "KRV-DFC",
    city: "New Delhi",
    manager: "Rohit Singh",
    capacity: 8500,
    usedCapacity: 6210,
    totalItems: 986,
    inventoryValue: 3428000,
    status: "Operational",
  },
  {
    id: "WH-003",
    name: "Mumbai Distribution Hub",
    code: "KRV-MDH",
    city: "Mumbai",
    manager: "Nikhil Sharma",
    capacity: 10000,
    usedCapacity: 5890,
    totalItems: 754,
    inventoryValue: 2964000,
    status: "Operational",
  },
];

const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2026-0248",
    supplier: "Imperial Garments",
    orderDate: "22 Jul 2026",
    expectedDate: "25 Jul 2026",
    items: 3,
    quantity: 75,
    totalAmount: 694500,
    warehouse: "KRVE Central Warehouse",
    status: "Received",
  },
  {
    id: "PO-2026-0249",
    supplier: "Regal Footwear Works",
    orderDate: "23 Jul 2026",
    expectedDate: "30 Jul 2026",
    items: 2,
    quantity: 40,
    totalAmount: 142000,
    warehouse: "Mumbai Distribution Hub",
    status: "Approved",
  },
  {
    id: "PO-2026-0250",
    supplier: "Aurum Textile House",
    orderDate: "24 Jul 2026",
    expectedDate: "2 Aug 2026",
    items: 4,
    quantity: 120,
    totalAmount: 228000,
    warehouse: "Delhi Fulfilment Center",
    status: "Pending Approval",
  },
  {
    id: "PO-2026-0251",
    supplier: "Artisan Leather Co.",
    orderDate: "25 Jul 2026",
    expectedDate: "5 Aug 2026",
    items: 2,
    quantity: 55,
    totalAmount: 57250,
    warehouse: "KRVE Central Warehouse",
    status: "Draft",
  },
];

const initialSuppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Imperial Garments",
    contactPerson: "Vikram Malhotra",
    email: "vikram@imperialgarments.in",
    phone: "+91 98765 11234",
    suppliedItems: 18,
    openOrders: 1,
    leadTime: "7–10 days",
    rating: 4.8,
    totalPurchases: 4825000,
    status: "Active",
  },
  {
    id: "SUP-002",
    name: "Regal Footwear Works",
    contactPerson: "Aditya Khanna",
    email: "aditya@regalfootwear.in",
    phone: "+91 98765 22345",
    suppliedItems: 12,
    openOrders: 2,
    leadTime: "10–14 days",
    rating: 4.6,
    totalPurchases: 2840000,
    status: "Active",
  },
  {
    id: "SUP-003",
    name: "Aurum Textile House",
    contactPerson: "Neha Agarwal",
    email: "neha@aurumtextile.in",
    phone: "+91 98765 33456",
    suppliedItems: 26,
    openOrders: 1,
    leadTime: "5–8 days",
    rating: 4.9,
    totalPurchases: 6315000,
    status: "Active",
  },
  {
    id: "SUP-004",
    name: "Artisan Leather Co.",
    contactPerson: "Sameer Qureshi",
    email: "sameer@artisanleather.in",
    phone: "+91 98765 44567",
    suppliedItems: 9,
    openOrders: 1,
    leadTime: "12–15 days",
    rating: 4.5,
    totalPurchases: 1975000,
    status: "Active",
  },
  {
    id: "SUP-005",
    name: "Crown Timepieces",
    contactPerson: "Karan Sethi",
    email: "karan@crowntimepieces.in",
    phone: "+91 98765 55678",
    suppliedItems: 6,
    openOrders: 0,
    leadTime: "15–20 days",
    rating: 4.7,
    totalPurchases: 2360000,
    status: "Active",
  },
];

const emptyInventoryForm: InventoryForm = {
  sku: "",
  productName: "",
  variant: "",
  category: "",
  warehouse: "KRVE Central Warehouse",
  location: "",
  currentStock: "",
  reorderLevel: "",
  maximumStock: "",
  unitCost: "",
  sellingPrice: "",
  supplier: "",
};

export default function InventoryManagement() {
  const [activeTab, setActiveTab] =
    useState<InventoryTab>("overview");

  const [inventory, setInventory] =
    useState<InventoryItem[]>(initialInventory);

  const [movements, setMovements] =
    useState<StockMovement[]>(initialMovements);

  const [warehouses] =
    useState<WarehouseRecord[]>(initialWarehouses);

  const [purchaseOrders, setPurchaseOrders] =
    useState<PurchaseOrder[]>(initialPurchaseOrders);

  const [suppliers] =
    useState<Supplier[]>(initialSuppliers);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] =
    useState("All");
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] =
    useState<number[]>([]);
  const [selectedItem, setSelectedItem] =
    useState<InventoryItem | null>(null);

  const [modalType, setModalType] =
    useState<ModalType>(null);

  const [inventoryForm, setInventoryForm] =
    useState<InventoryForm>(emptyInventoryForm);

  const [actionMenuId, setActionMenuId] =
    useState<number | null>(null);

  const itemsPerPage = 6;

  const categories = useMemo(
    () =>
      Array.from(
        new Set(inventory.map((item) => item.category)),
      ),
    [inventory],
  );

  const warehouseNames = useMemo(
    () =>
      Array.from(
        new Set(inventory.map((item) => item.warehouse)),
      ),
    [inventory],
  );

  const filteredInventory = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return inventory.filter((item) => {
      const matchesSearch =
        !query ||
        `${item.sku} ${item.productName} ${item.variant} ${item.category} ${item.supplier}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesWarehouse =
        warehouseFilter === "All" ||
        item.warehouse === warehouseFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesWarehouse &&
        matchesCategory
      );
    });
  }, [
    inventory,
    searchQuery,
    statusFilter,
    warehouseFilter,
    categoryFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInventory.length / itemsPerPage),
  );

  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const metrics = useMemo(() => {
    const totalUnits = inventory.reduce(
      (sum, item) => sum + item.currentStock,
      0,
    );

    const availableUnits = inventory.reduce(
      (sum, item) =>
        sum +
        Math.max(0, item.currentStock - item.reservedStock),
      0,
    );

    const reservedUnits = inventory.reduce(
      (sum, item) => sum + item.reservedStock,
      0,
    );

    const incomingUnits = inventory.reduce(
      (sum, item) => sum + item.incomingStock,
      0,
    );

    const inventoryValue = inventory.reduce(
      (sum, item) =>
        sum + item.currentStock * item.unitCost,
      0,
    );

    const retailValue = inventory.reduce(
      (sum, item) =>
        sum + item.currentStock * item.sellingPrice,
      0,
    );

    const lowStock = inventory.filter(
      (item) => item.status === "Low Stock",
    ).length;

    const outOfStock = inventory.filter(
      (item) => item.status === "Out of Stock",
    ).length;

    const overstock = inventory.filter(
      (item) => item.status === "Overstock",
    ).length;

    return {
      totalUnits,
      availableUnits,
      reservedUnits,
      incomingUnits,
      inventoryValue,
      retailValue,
      lowStock,
      outOfStock,
      overstock,
    };
  }, [inventory]);

  function determineStatus(
    stock: number,
    reorderLevel: number,
    maximumStock: number,
  ): InventoryStatus {
    if (stock <= 0) {
      return "Out of Stock";
    }

    if (stock <= reorderLevel) {
      return "Low Stock";
    }

    if (stock > maximumStock) {
      return "Overstock";
    }

    return "Healthy";
  }

  function openItem(item: InventoryItem) {
    setSelectedItem(item);
    setModalType("view-item");
    setActionMenuId(null);
  }

  function openOperation(type: ModalType) {
    setModalType(type);
    setActionMenuId(null);
  }

  function closeModal() {
    setModalType(null);
    setSelectedItem(null);
    setInventoryForm(emptyInventoryForm);
  }

  function handleInventoryFormChange(
    field: keyof InventoryForm,
    value: string,
  ) {
    setInventoryForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleAddInventoryItem(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const currentStock = Number(
      inventoryForm.currentStock || 0,
    );

    const reorderLevel = Number(
      inventoryForm.reorderLevel || 0,
    );

    const maximumStock = Number(
      inventoryForm.maximumStock || 0,
    );

    const unitCost = Number(
      inventoryForm.unitCost || 0,
    );

    const sellingPrice = Number(
      inventoryForm.sellingPrice || 0,
    );

    const newItem: InventoryItem = {
      id: Date.now(),
      sku:
        inventoryForm.sku.trim() ||
        `KRVE-SKU-${inventory.length + 1}`,
      productName:
        inventoryForm.productName.trim() ||
        "New Inventory Product",
      variant:
        inventoryForm.variant.trim() || "Standard",
      category:
        inventoryForm.category.trim() || "Uncategorized",
      warehouse: inventoryForm.warehouse,
      location:
        inventoryForm.location.trim() || "Unassigned",
      currentStock,
      reservedStock: 0,
      reorderLevel,
      maximumStock,
      incomingStock: 0,
      unitCost,
      sellingPrice,
      supplier:
        inventoryForm.supplier.trim() || "Not Assigned",
      lastUpdated: "Just now",
      status: determineStatus(
        currentStock,
        reorderLevel,
        maximumStock,
      ),
      imageCode:
        inventoryForm.productName
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .slice(0, 2)
          .toUpperCase() || "KR",
    };

    setInventory((current) => [
      newItem,
      ...current,
    ]);

    setMovements((current) => [
      {
        id: `MOV-2026-${1083 + current.length}`,
        date: "Just now",
        type: "Stock In",
        sku: newItem.sku,
        productName: newItem.productName,
        warehouse: newItem.warehouse,
        quantity: newItem.currentStock,
        reference: "INITIAL-STOCK",
        performedBy: "Founder",
        notes: "Initial inventory item created.",
      },
      ...current,
    ]);

    closeModal();
  }

  function handleDeleteItem(itemId: number) {
    setInventory((current) =>
      current.filter((item) => item.id !== itemId),
    );

    setSelectedItems((current) =>
      current.filter((id) => id !== itemId),
    );

    setActionMenuId(null);
  }

  function handleSelectItem(itemId: number) {
    setSelectedItems((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId],
    );
  }

  function handleSelectPage() {
    const pageIds = paginatedInventory.map(
      (item) => item.id,
    );

    const allSelected = pageIds.every((id) =>
      selectedItems.includes(id),
    );

    if (allSelected) {
      setSelectedItems((current) =>
        current.filter((id) => !pageIds.includes(id)),
      );
      return;
    }

    setSelectedItems((current) =>
      Array.from(new Set([...current, ...pageIds])),
    );
  }

  function clearFilters() {
    setSearchQuery("");
    setStatusFilter("All");
    setWarehouseFilter("All");
    setCategoryFilter("All");
    setCurrentPage(1);
  }

  function exportInventory() {
    const headers = [
      "SKU",
      "Product",
      "Variant",
      "Category",
      "Warehouse",
      "Location",
      "Current Stock",
      "Reserved",
      "Available",
      "Incoming",
      "Reorder Level",
      "Unit Cost",
      "Selling Price",
      "Status",
    ];

    const rows = filteredInventory.map((item) => [
      item.sku,
      item.productName,
      item.variant,
      item.category,
      item.warehouse,
      item.location,
      item.currentStock,
      item.reservedStock,
      Math.max(
        0,
        item.currentStock - item.reservedStock,
      ),
      item.incomingStock,
      item.reorderLevel,
      item.unitCost,
      item.sellingPrice,
      item.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`,
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
    anchor.download = "keos-inventory-export.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <InventoryHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddItem={() => openOperation("add-item")}
        onStockIn={() => openOperation("stock-in")}
        onExport={exportInventory}
      />

      <InventoryTabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "overview" && (
        <OverviewWorkspace
          inventory={inventory}
          movements={movements}
          purchaseOrders={purchaseOrders}
          metrics={metrics}
          onOpenStock={() => setActiveTab("stock")}
          onOpenMovements={() =>
            setActiveTab("movements")
          }
          onOpenPurchaseOrders={() =>
            setActiveTab("purchase-orders")
          }
          onOpenAI={() => setActiveTab("ai")}
          onStockIn={() => openOperation("stock-in")}
          onStockOut={() => openOperation("stock-out")}
          onTransfer={() => openOperation("transfer")}
          onAdjustment={() =>
            openOperation("adjustment")
          }
        />
      )}

      {activeTab === "stock" && (
        <StockWorkspace
          inventory={paginatedInventory}
          totalItems={filteredInventory.length}
          selectedItems={selectedItems}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          warehouseFilter={warehouseFilter}
          categoryFilter={categoryFilter}
          categories={categories}
          warehouses={warehouseNames}
          actionMenuId={actionMenuId}
          setSearchQuery={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          setStatusFilter={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          setWarehouseFilter={(value) => {
            setWarehouseFilter(value);
            setCurrentPage(1);
          }}
          setCategoryFilter={(value) => {
            setCategoryFilter(value);
            setCurrentPage(1);
          }}
          setCurrentPage={setCurrentPage}
          setActionMenuId={setActionMenuId}
          onClearFilters={clearFilters}
          onSelectItem={handleSelectItem}
          onSelectPage={handleSelectPage}
          onOpenItem={openItem}
          onDeleteItem={handleDeleteItem}
          onAddItem={() => openOperation("add-item")}
          onExport={exportInventory}
          onStockIn={() => openOperation("stock-in")}
          onStockOut={() => openOperation("stock-out")}
          onTransfer={() => openOperation("transfer")}
          onAdjustment={() =>
            openOperation("adjustment")
          }
        />
      )}

      {activeTab === "movements" && (
        <MovementsWorkspace movements={movements} />
      )}

      {activeTab === "warehouses" && (
        <WarehousesWorkspace
          warehouses={warehouses}
        />
      )}

      {activeTab === "purchase-orders" && (
        <PurchaseOrdersWorkspace
          purchaseOrders={purchaseOrders}
          setPurchaseOrders={setPurchaseOrders}
          onCreate={() =>
            openOperation("purchase-order")
          }
        />
      )}

      {activeTab === "suppliers" && (
        <SuppliersWorkspace suppliers={suppliers} />
      )}

      {activeTab === "analytics" && (
        <AnalyticsWorkspace inventory={inventory} />
      )}

      {activeTab === "reports" && (
        <ReportsWorkspace
          inventory={inventory}
          movements={movements}
          warehouses={warehouses}
          onExport={exportInventory}
        />
      )}

      {activeTab === "ai" && (
        <AIInventoryWorkspace
          inventory={inventory}
          onOpenPurchaseOrders={() =>
            setActiveTab("purchase-orders")
          }
          onOpenStock={() => setActiveTab("stock")}
        />
      )}

      <InventoryModal
        modalType={modalType}
        selectedItem={selectedItem}
        inventory={inventory}
        warehouses={warehouses}
        suppliers={suppliers}
        inventoryForm={inventoryForm}
        onFormChange={handleInventoryFormChange}
        onAddInventoryItem={handleAddInventoryItem}
        onClose={closeModal}
        setInventory={setInventory}
        setMovements={setMovements}
        setPurchaseOrders={setPurchaseOrders}
      />
    </div>
  );
}
function InventoryHeader({
  activeTab,
  setActiveTab,
  onAddItem,
  onStockIn,
  onExport,
}: {
  activeTab: InventoryTab;
  setActiveTab: (tab: InventoryTab) => void;
  onAddItem: () => void;
  onStockIn: () => void;
  onExport: () => void;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Boxes size={25} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Commerce Operations
              </p>

              <h1 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
                Inventory Management
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
            Control stock levels, warehouse movements, purchase orders,
            suppliers, valuation, replenishment and inventory intelligence
            across the complete KRVE enterprise.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
              activeTab === "reports"
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <FileBarChart size={17} />
            Reports
          </button>

          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Download size={17} />
            Export
          </button>

          <button
            type="button"
            onClick={onStockIn}
            className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
          >
            <PackagePlus size={17} />
            Stock In
          </button>

          <button
            type="button"
            onClick={onAddItem}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Plus size={17} />
            Add Inventory Item
          </button>
        </div>
      </div>
    </section>
  );
}

function InventoryTabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: InventoryTab;
  setActiveTab: (tab: InventoryTab) => void;
}) {
  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="keos-scrollbar flex overflow-x-auto p-2">
        {inventoryTabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <TabIcon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function OverviewWorkspace({
  inventory,
  movements,
  purchaseOrders,
  metrics,
  onOpenStock,
  onOpenMovements,
  onOpenPurchaseOrders,
  onOpenAI,
  onStockIn,
  onStockOut,
  onTransfer,
  onAdjustment,
}: {
  inventory: InventoryItem[];
  movements: StockMovement[];
  purchaseOrders: PurchaseOrder[];
  metrics: {
    totalUnits: number;
    availableUnits: number;
    reservedUnits: number;
    incomingUnits: number;
    inventoryValue: number;
    retailValue: number;
    lowStock: number;
    outOfStock: number;
    overstock: number;
  };
  onOpenStock: () => void;
  onOpenMovements: () => void;
  onOpenPurchaseOrders: () => void;
  onOpenAI: () => void;
  onStockIn: () => void;
  onStockOut: () => void;
  onTransfer: () => void;
  onAdjustment: () => void;
}) {
  const criticalItems = inventory
    .filter(
      (item) =>
        item.status === "Low Stock" ||
        item.status === "Out of Stock" ||
        item.status === "Overstock",
    )
    .slice(0, 5);

  const pendingOrders = purchaseOrders.filter(
    (order) =>
      order.status === "Pending Approval" ||
      order.status === "Approved" ||
      order.status === "Partially Received",
  );

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <InventoryMetricCard
          title="Total Stock Units"
          value={formatNumber(metrics.totalUnits)}
          description={`${formatNumber(
            metrics.availableUnits,
          )} available for fulfilment`}
          change="+8.4%"
          icon={Boxes}
          tone="blue"
        />

        <InventoryMetricCard
          title="Inventory Cost Value"
          value={formatCurrency(metrics.inventoryValue)}
          description={`Retail potential ${formatCurrency(
            metrics.retailValue,
          )}`}
          change="+12.6%"
          icon={IndianRupee}
          tone="green"
        />

        <InventoryMetricCard
          title="Reserved Stock"
          value={formatNumber(metrics.reservedUnits)}
          description="Allocated to active orders"
          change="Live"
          icon={PackageCheck}
          tone="violet"
        />

        <InventoryMetricCard
          title="Incoming Stock"
          value={formatNumber(metrics.incomingUnits)}
          description={`${pendingOrders.length} active purchase orders`}
          change="+20.2%"
          icon={Truck}
          tone="orange"
        />
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <InventoryAlertCard
          title="Low Stock"
          value={metrics.lowStock}
          description="Products below reorder level"
          icon={AlertTriangle}
          tone="orange"
          onClick={onOpenStock}
        />

        <InventoryAlertCard
          title="Out of Stock"
          value={metrics.outOfStock}
          description="Products unavailable for sale"
          icon={PackageMinus}
          tone="red"
          onClick={onOpenStock}
        />

        <InventoryAlertCard
          title="Overstock"
          value={metrics.overstock}
          description="Products above maximum level"
          icon={Layers3}
          tone="violet"
          onClick={onOpenStock}
        />

        <InventoryAlertCard
          title="Pending Purchase Orders"
          value={pendingOrders.length}
          description="Orders awaiting receipt or approval"
          icon={ShoppingCart}
          tone="blue"
          onClick={onOpenPurchaseOrders}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Inventory Distribution
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current stock distribution across categories
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenStock}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View Complete Stock
              <ArrowRight size={16} />
            </button>
          </div>

          <InventoryDistributionChart inventory={inventory} />
        </article>

        <article className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
              <Sparkles size={22} />
            </div>

            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-300">
              AI Active
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black">
            KRVE AI Inventory Intelligence
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            KRVE AI continuously analyses demand, ageing, stock health,
            purchase cycles and warehouse availability.
          </p>

          <div className="mt-6 space-y-3">
            <AIInsightRow
              title="Immediate replenishment"
              description={`${metrics.lowStock + metrics.outOfStock} products require purchasing attention.`}
              tone="red"
            />

            <AIInsightRow
              title="Capital optimisation"
              description={`${metrics.overstock} overstocked product can be redistributed or promoted.`}
              tone="orange"
            />

            <AIInsightRow
              title="Stock availability"
              description={`${formatNumber(
                metrics.availableUnits,
              )} units are currently available for new orders.`}
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={onOpenAI}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold transition hover:bg-blue-700"
          >
            Open AI Inventory Center
            <ArrowRight size={17} />
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Inventory Attention Required
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Items requiring immediate stock action
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenStock}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Manage Stock
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="pb-4 font-semibold">Product</th>
                  <th className="pb-4 font-semibold">Warehouse</th>
                  <th className="pb-4 font-semibold">Stock</th>
                  <th className="pb-4 font-semibold">Available</th>
                  <th className="pb-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {criticalItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 text-sm"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <ProductAvatar code={item.imageCode} />

                        <div>
                          <strong className="block text-sm text-slate-900">
                            {item.productName}
                          </strong>

                          <span className="mt-1 block text-xs text-slate-500">
                            {item.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-xs text-slate-600">
                      {item.warehouse}
                    </td>

                    <td className="py-4 font-bold text-slate-900">
                      {item.currentStock}
                    </td>

                    <td className="py-4 font-bold text-slate-900">
                      {Math.max(
                        0,
                        item.currentStock - item.reservedStock,
                      )}
                    </td>

                    <td className="py-4">
                      <InventoryStatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}

                {criticalItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <CheckCircle2
                        size={30}
                        className="mx-auto text-green-500"
                      />

                      <p className="mt-3 text-sm font-bold text-slate-700">
                        All inventory levels are healthy
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Quick Stock Operations
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Execute daily inventory transactions
              </p>
            </div>

            <Settings2 size={20} className="text-slate-400" />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <OperationButton
              title="Stock In"
              description="Receive new inventory"
              icon={PackagePlus}
              tone="green"
              onClick={onStockIn}
            />

            <OperationButton
              title="Stock Out"
              description="Issue or dispatch stock"
              icon={PackageMinus}
              tone="red"
              onClick={onStockOut}
            />

            <OperationButton
              title="Transfer"
              description="Move between warehouses"
              icon={Truck}
              tone="blue"
              onClick={onTransfer}
            />

            <OperationButton
              title="Adjustment"
              description="Correct stock quantity"
              icon={SlidersHorizontal}
              tone="orange"
              onClick={onAdjustment}
            />
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Recent Stock Movements
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest inventory transactions
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenMovements}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Movement Ledger
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {movements.slice(0, 5).map((movement) => (
              <MovementListItem
                key={movement.id}
                movement={movement}
              />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Purchase Order Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Procurement pipeline summary
              </p>
            </div>

            <ShoppingCart size={20} className="text-slate-400" />
          </div>

          <div className="mt-6 space-y-4">
            <PurchaseOrderSummary
              label="Draft"
              count={
                purchaseOrders.filter(
                  (order) => order.status === "Draft",
                ).length
              }
              tone="slate"
            />

            <PurchaseOrderSummary
              label="Pending Approval"
              count={
                purchaseOrders.filter(
                  (order) =>
                    order.status === "Pending Approval",
                ).length
              }
              tone="orange"
            />

            <PurchaseOrderSummary
              label="Approved"
              count={
                purchaseOrders.filter(
                  (order) => order.status === "Approved",
                ).length
              }
              tone="blue"
            />

            <PurchaseOrderSummary
              label="Received"
              count={
                purchaseOrders.filter(
                  (order) => order.status === "Received",
                ).length
              }
              tone="green"
            />
          </div>

          <button
            type="button"
            onClick={onOpenPurchaseOrders}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Open Purchase Orders
            <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
  );
}

function InventoryMetricCard({
  title,
  value,
  description,
  change,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  change: string;
  icon: IconType;
  tone: "blue" | "green" | "violet" | "orange";
}) {
  const iconClass =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "violet"
        ? "bg-violet-50 text-violet-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>

        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-950">
        {value}
      </h2>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </article>
  );
}

function InventoryAlertCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
  onClick,
}: {
  title: string;
  value: number;
  description: string;
  icon: IconType;
  tone: "blue" | "orange" | "red" | "violet";
  onClick: () => void;
}) {
  const toneClass =
    tone === "red"
      ? "border-red-200 bg-red-50 text-red-700"
      : tone === "orange"
        ? "border-orange-200 bg-orange-50 text-orange-700"
        : tone === "violet"
          ? "border-violet-200 bg-violet-50 text-violet-700"
          : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-md ${toneClass}`}
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/70">
        <Icon size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <strong className="text-sm">{title}</strong>

          <span className="text-xl font-black">{value}</span>
        </div>

        <p className="mt-1 truncate text-xs opacity-75">
          {description}
        </p>
      </div>
    </button>
  );
}

function InventoryDistributionChart({
  inventory,
}: {
  inventory: InventoryItem[];
}) {
  const categoryData = useMemo(() => {
    const grouped = inventory.reduce<Record<string, number>>(
      (accumulator, item) => {
        accumulator[item.category] =
          (accumulator[item.category] || 0) +
          item.currentStock;

        return accumulator;
      },
      {},
    );

    return Object.entries(grouped)
      .map(([category, quantity]) => ({
        category,
        quantity,
      }))
      .sort((first, second) => second.quantity - first.quantity)
      .slice(0, 7);
  }, [inventory]);

  const maximum = Math.max(
    ...categoryData.map((item) => item.quantity),
    1,
  );

  return (
    <div className="mt-8 space-y-5">
      {categoryData.map((item, index) => {
        const width = (item.quantity / maximum) * 100;

        return (
          <div key={item.category}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-xs font-black text-slate-600">
                  {index + 1}
                </span>

                <strong className="text-sm text-slate-800">
                  {item.category}
                </strong>
              </div>

              <span className="text-sm font-black text-slate-900">
                {formatNumber(item.quantity)} units
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-blue-600"
                    : index === 1
                      ? "bg-green-600"
                      : index === 2
                        ? "bg-violet-600"
                        : index === 3
                          ? "bg-orange-500"
                          : "bg-slate-500"
                }`}
                style={{
                  width: `${Math.max(width, 4)}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AIInsightRow({
  title,
  description,
  tone,
}: {
  title: string;
  description: string;
  tone: "red" | "orange" | "green";
}) {
  const dotClass =
    tone === "red"
      ? "bg-red-500"
      : tone === "orange"
        ? "bg-orange-500"
        : "bg-green-500";

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dotClass}`} />

        <strong className="text-xs text-white">{title}</strong>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function OperationButton({
  title,
  description,
  icon: Icon,
  tone,
  onClick,
}: {
  title: string;
  description: string;
  icon: IconType;
  tone: "blue" | "green" | "red" | "orange";
  onClick: () => void;
}) {
  const iconClass =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "red"
        ? "bg-red-50 text-red-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/40"
    >
      <div
        className={`grid h-10 w-10 place-items-center rounded-xl ${iconClass}`}
      >
        <Icon size={19} />
      </div>

      <strong className="mt-4 block text-sm text-slate-900">
        {title}
      </strong>

      <span className="mt-1 block text-xs text-slate-500">
        {description}
      </span>
    </button>
  );
}

function MovementListItem({
  movement,
}: {
  movement: StockMovement;
}) {
  const typeConfig = getMovementTypeConfig(movement.type);
  const MovementIcon = typeConfig.icon;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${typeConfig.className}`}
      >
        <MovementIcon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <strong className="truncate text-sm text-slate-900">
            {movement.productName}
          </strong>

          <span className="text-xs text-slate-400">
            {movement.date}
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>{movement.type}</span>
          <span>•</span>
          <span>{movement.reference}</span>
          <span>•</span>
          <strong
            className={
              movement.type === "Stock Out"
                ? "text-red-600"
                : "text-green-600"
            }
          >
            {movement.type === "Stock Out" ? "-" : "+"}
            {movement.quantity} units
          </strong>
        </div>
      </div>
    </div>
  );
}

function PurchaseOrderSummary({
  label,
  count,
  tone,
}: {
  label: string;
  count: number;
  tone: "slate" | "orange" | "blue" | "green";
}) {
  const className =
    tone === "orange"
      ? "bg-orange-50 text-orange-700"
      : tone === "blue"
        ? "bg-blue-50 text-blue-700"
        : tone === "green"
          ? "bg-green-50 text-green-700"
          : "bg-slate-100 text-slate-700";

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
      <div className="flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            tone === "orange"
              ? "bg-orange-500"
              : tone === "blue"
                ? "bg-blue-500"
                : tone === "green"
                  ? "bg-green-500"
                  : "bg-slate-400"
          }`}
        />

        <span className="text-sm font-semibold text-slate-700">
          {label}
        </span>
      </div>

      <span
        className={`grid h-8 min-w-8 place-items-center rounded-lg px-2 text-sm font-black ${className}`}
      >
        {count}
      </span>
    </div>
  );
}

function StockWorkspace({
  inventory,
  totalItems,
  selectedItems,
  currentPage,
  totalPages,
  searchQuery,
  statusFilter,
  warehouseFilter,
  categoryFilter,
  categories,
  warehouses,
  actionMenuId,
  setSearchQuery,
  setStatusFilter,
  setWarehouseFilter,
  setCategoryFilter,
  setCurrentPage,
  setActionMenuId,
  onClearFilters,
  onSelectItem,
  onSelectPage,
  onOpenItem,
  onDeleteItem,
  onAddItem,
  onExport,
  onStockIn,
  onStockOut,
  onTransfer,
  onAdjustment,
}: {
  inventory: InventoryItem[];
  totalItems: number;
  selectedItems: number[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  statusFilter: string;
  warehouseFilter: string;
  categoryFilter: string;
  categories: string[];
  warehouses: string[];
  actionMenuId: number | null;
  setSearchQuery: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setWarehouseFilter: (value: string) => void;
  setCategoryFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;
  setActionMenuId: (id: number | null) => void;
  onClearFilters: () => void;
  onSelectItem: (id: number) => void;
  onSelectPage: () => void;
  onOpenItem: (item: InventoryItem) => void;
  onDeleteItem: (id: number) => void;
  onAddItem: () => void;
  onExport: () => void;
  onStockIn: () => void;
  onStockOut: () => void;
  onTransfer: () => void;
  onAdjustment: () => void;
}) {
  const hasFilters =
    searchQuery ||
    statusFilter !== "All" ||
    warehouseFilter !== "All" ||
    categoryFilter !== "All";

  const allPageSelected =
    inventory.length > 0 &&
    inventory.every((item) => selectedItems.includes(item.id));

  return (
    <div className="mt-6 space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Stock Register
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage all product inventory, availability and stock
              controls.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <StockActionButton
              label="Stock In"
              icon={PackagePlus}
              onClick={onStockIn}
            />

            <StockActionButton
              label="Stock Out"
              icon={PackageMinus}
              onClick={onStockOut}
            />

            <StockActionButton
              label="Transfer"
              icon={Truck}
              onClick={onTransfer}
            />

            <StockActionButton
              label="Adjustment"
              icon={SlidersHorizontal}
              onClick={onAdjustment}
            />

            <button
              type="button"
              onClick={onAddItem}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Item
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 xl:grid-cols-[1fr_190px_220px_180px_auto]">
          <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
            <Search size={17} className="text-slate-400" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search product, SKU, supplier..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
              >
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "All",
              "Healthy",
              "Low Stock",
              "Out of Stock",
              "Overstock",
              "Inactive",
            ]}
            ariaLabel="Filter inventory status"
          />

          <FilterSelect
            value={warehouseFilter}
            onChange={setWarehouseFilter}
            options={["All", ...warehouses]}
            ariaLabel="Filter warehouse"
          />

          <FilterSelect
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={["All", ...categories]}
            ariaLabel="Filter category"
          />

          <div className="flex gap-2">
            {hasFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="grid h-12 w-12 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                title="Clear filters"
              >
                <RefreshCcw size={17} />
              </button>
            )}

            <button
              type="button"
              onClick={onExport}
              className="grid h-12 w-12 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              title="Export inventory"
            >
              <Download size={17} />
            </button>
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <ClipboardCheck size={18} className="text-blue-600" />

              <strong className="text-sm text-blue-900">
                {selectedItems.length} item
                {selectedItems.length > 1 ? "s" : ""} selected
              </strong>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm"
              >
                Bulk Transfer
              </button>

              <button
                type="button"
                className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm"
              >
                Bulk Adjustment
              </button>

              <button
                type="button"
                className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm"
              >
                Create Purchase Order
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="overflow-visible rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <strong className="text-sm text-slate-900">
              {formatNumber(totalItems)} inventory records
            </strong>

            <span className="ml-2 text-xs text-slate-400">
              Live stock register
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} className="text-green-600" />
            Inventory audit enabled
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1500px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={onSelectPage}
                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                    aria-label="Select current page"
                  />
                </th>

                <th className="px-4 py-4 font-semibold">Product</th>
                <th className="px-4 py-4 font-semibold">SKU</th>
                <th className="px-4 py-4 font-semibold">Warehouse</th>
                <th className="px-4 py-4 font-semibold">Location</th>
                <th className="px-4 py-4 text-center font-semibold">
                  Current
                </th>
                <th className="px-4 py-4 text-center font-semibold">
                  Reserved
                </th>
                <th className="px-4 py-4 text-center font-semibold">
                  Available
                </th>
                <th className="px-4 py-4 text-center font-semibold">
                  Incoming
                </th>
                <th className="px-4 py-4 font-semibold">Stock Value</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => {
                const available = Math.max(
                  0,
                  item.currentStock - item.reservedStock,
                );

                const stockValue =
                  item.currentStock * item.unitCost;

                const isSelected = selectedItems.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    className={`border-b border-slate-100 text-sm transition ${
                      isSelected
                        ? "bg-blue-50/60"
                        : "hover:bg-slate-50/70"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectItem(item.id)}
                        className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                        aria-label={`Select ${item.productName}`}
                      />
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onOpenItem(item)}
                        className="flex items-center gap-3 text-left"
                      >
                        <ProductAvatar code={item.imageCode} />

                        <div className="min-w-0">
                          <strong className="block max-w-[220px] truncate text-sm text-slate-900">
                            {item.productName}
                          </strong>

                          <span className="mt-1 block max-w-[220px] truncate text-xs text-slate-500">
                            {item.variant}
                          </span>
                        </div>
                      </button>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-xs font-bold text-slate-700">
                        {item.sku}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div>
                        <strong className="block max-w-[190px] truncate text-xs text-slate-700">
                          {item.warehouse}
                        </strong>

                        <span className="mt-1 block text-xs text-slate-400">
                          {item.category}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-600">
                        <Warehouse size={13} />
                        {item.location}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <strong className="text-sm text-slate-900">
                        {item.currentStock}
                      </strong>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className="font-semibold text-orange-600">
                        {item.reservedStock}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`font-black ${
                          available <= item.reorderLevel
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {available}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className="font-bold text-blue-600">
                        {item.incomingStock}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <strong className="text-sm text-slate-900">
                        {formatCurrency(stockValue)}
                      </strong>

                      <span className="mt-1 block text-xs text-slate-400">
                        {formatCurrency(item.unitCost)} each
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <InventoryStatusBadge status={item.status} />
                    </td>

                    <td className="relative px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setActionMenuId(
                            actionMenuId === item.id
                              ? null
                              : item.id,
                          )
                        }
                        className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                        aria-label={`Actions for ${item.productName}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {actionMenuId === item.id && (
                        <div className="absolute right-5 top-14 z-30 w-48 rounded-xl border border-slate-200 bg-white p-2 text-left shadow-xl">
                          <ActionMenuButton
                            label="View Details"
                            icon={Eye}
                            onClick={() => onOpenItem(item)}
                          />

                          <ActionMenuButton
                            label="Edit Item"
                            icon={Pencil}
                            onClick={() => onOpenItem(item)}
                          />

                          <ActionMenuButton
                            label="Stock History"
                            icon={History}
                            onClick={() => setActionMenuId(null)}
                          />

                          <div className="my-1 border-t border-slate-100" />

                          <ActionMenuButton
                            label="Delete Item"
                            icon={Trash2}
                            danger
                            onClick={() => onDeleteItem(item.id)}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {inventory.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-20 text-center">
                    <PackageOpen
                      size={36}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 text-base font-black text-slate-700">
                      No inventory item found
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Change your filters or add a new inventory item.
                    </p>

                    <button
                      type="button"
                      onClick={onAddItem}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
                    >
                      <Plus size={17} />
                      Add Inventory Item
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-slate-200 px-6 py-5 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            Page{" "}
            <strong className="text-slate-800">
              {currentPage}
            </strong>{" "}
            of{" "}
            <strong className="text-slate-800">
              {totalPages}
            </strong>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() =>
                setCurrentPage(Math.max(1, currentPage - 1))
              }
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`grid h-10 min-w-10 place-items-center rounded-xl px-3 text-sm font-bold transition ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setCurrentPage(
                  Math.min(totalPages, currentPage + 1),
                )
              }
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StockActionButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: IconType;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  ariaLabel: string;
}) {
  return (
    <div className="relative">
      <Filter
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-xs font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function ActionMenuButton({
  label,
  icon: Icon,
  onClick,
  danger = false,
}: {
  label: string;
  icon: IconType;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold transition ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

function InventoryStatusBadge({
  status,
}: {
  status: InventoryStatus;
}) {
  const className =
    status === "Healthy"
      ? "bg-green-50 text-green-700 ring-green-200"
      : status === "Low Stock"
        ? "bg-orange-50 text-orange-700 ring-orange-200"
        : status === "Out of Stock"
          ? "bg-red-50 text-red-700 ring-red-200"
          : status === "Overstock"
            ? "bg-violet-50 text-violet-700 ring-violet-200"
            : "bg-slate-100 text-slate-600 ring-slate-200";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold ring-1 ring-inset ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Healthy"
            ? "bg-green-500"
            : status === "Low Stock"
              ? "bg-orange-500"
              : status === "Out of Stock"
                ? "bg-red-500"
                : status === "Overstock"
                  ? "bg-violet-500"
                  : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}

function ProductAvatar({
  code,
}: {
  code: string;
}) {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-xs font-black tracking-wider text-white shadow-sm">
      {code}
    </div>
  );
}

function getMovementTypeConfig(type: MovementType): {
  icon: IconType;
  className: string;
} {
  if (type === "Stock In") {
    return {
      icon: ArrowDownLeft,
      className: "bg-green-50 text-green-600",
    };
  }

  if (type === "Stock Out") {
    return {
      icon: ArrowUpRight,
      className: "bg-red-50 text-red-600",
    };
  }

  if (type === "Transfer") {
    return {
      icon: Truck,
      className: "bg-blue-50 text-blue-600",
    };
  }

  if (type === "Adjustment") {
    return {
      icon: SlidersHorizontal,
      className: "bg-orange-50 text-orange-600",
    };
  }

  return {
    icon: RefreshCcw,
    className: "bg-violet-50 text-violet-600",
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}
function MovementsWorkspace({
  movements,
}: {
  movements: StockMovement[];
}) {
  const [movementSearch, setMovementSearch] = useState("");
  const [movementType, setMovementType] = useState("All");

  const filteredMovements = useMemo(() => {
    const query = movementSearch.trim().toLowerCase();

    return movements.filter((movement) => {
      const matchesSearch =
        !query ||
        `${movement.id} ${movement.sku} ${movement.productName} ${movement.reference} ${movement.performedBy}`
          .toLowerCase()
          .includes(query);

      const matchesType =
        movementType === "All" ||
        movement.type === movementType;

      return matchesSearch && matchesType;
    });
  }, [movementSearch, movementType, movements]);

  const stockInUnits = movements
    .filter((movement) => movement.type === "Stock In")
    .reduce((sum, movement) => sum + movement.quantity, 0);

  const stockOutUnits = movements
    .filter((movement) => movement.type === "Stock Out")
    .reduce((sum, movement) => sum + movement.quantity, 0);

  const transferUnits = movements
    .filter((movement) => movement.type === "Transfer")
    .reduce((sum, movement) => sum + movement.quantity, 0);

  const adjustmentUnits = movements
    .filter((movement) => movement.type === "Adjustment")
    .reduce((sum, movement) => sum + movement.quantity, 0);

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SmallMetricCard
          title="Stock In"
          value={`${formatNumber(stockInUnits)} units`}
          description="Received inventory"
          icon={ArrowDownLeft}
          tone="green"
        />

        <SmallMetricCard
          title="Stock Out"
          value={`${formatNumber(stockOutUnits)} units`}
          description="Issued and dispatched"
          icon={ArrowUpRight}
          tone="red"
        />

        <SmallMetricCard
          title="Transfers"
          value={`${formatNumber(transferUnits)} units`}
          description="Warehouse transfers"
          icon={Truck}
          tone="blue"
        />

        <SmallMetricCard
          title="Adjustments"
          value={`${formatNumber(adjustmentUnits)} units`}
          description="Inventory corrections"
          icon={SlidersHorizontal}
          tone="orange"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Stock Movement Ledger
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete history of inventory transactions and
                adjustments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 min-w-[300px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
                <Search size={17} className="text-slate-400" />

                <input
                  value={movementSearch}
                  onChange={(event) =>
                    setMovementSearch(event.target.value)
                  }
                  placeholder="Search movement or reference..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </div>

              <FilterSelect
                value={movementType}
                onChange={setMovementType}
                options={[
                  "All",
                  "Stock In",
                  "Stock Out",
                  "Transfer",
                  "Adjustment",
                  "Return",
                ]}
                ariaLabel="Filter movement type"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Movement</th>
                <th className="px-4 py-4 font-semibold">Date</th>
                <th className="px-4 py-4 font-semibold">Type</th>
                <th className="px-4 py-4 font-semibold">Product</th>
                <th className="px-4 py-4 font-semibold">Warehouse</th>
                <th className="px-4 py-4 text-center font-semibold">
                  Quantity
                </th>
                <th className="px-4 py-4 font-semibold">Reference</th>
                <th className="px-4 py-4 font-semibold">Performed By</th>
                <th className="px-6 py-4 font-semibold">Notes</th>
              </tr>
            </thead>

            <tbody>
              {filteredMovements.map((movement) => {
                const movementConfig =
                  getMovementTypeConfig(movement.type);

                const MovementIcon = movementConfig.icon;

                return (
                  <tr
                    key={movement.id}
                    className="border-b border-slate-100 text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <strong className="font-mono text-xs text-blue-600">
                        {movement.id}
                      </strong>
                    </td>

                    <td className="px-4 py-4 text-xs text-slate-500">
                      {movement.date}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${movementConfig.className}`}
                      >
                        <MovementIcon size={14} />
                        {movement.type}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <strong className="block text-sm text-slate-900">
                        {movement.productName}
                      </strong>

                      <span className="mt-1 block font-mono text-xs text-slate-400">
                        {movement.sku}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-xs text-slate-600">
                      {movement.warehouse}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <strong
                        className={
                          movement.type === "Stock Out"
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {movement.type === "Stock Out" ? "-" : "+"}
                        {movement.quantity}
                      </strong>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-xs text-slate-700">
                        {movement.reference}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-xs font-semibold text-slate-700">
                      {movement.performedBy}
                    </td>

                    <td className="px-6 py-4 text-xs leading-5 text-slate-500">
                      {movement.notes}
                    </td>
                  </tr>
                );
              })}

              {filteredMovements.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-20 text-center">
                    <History
                      size={36}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 text-base font-black text-slate-700">
                      No movement found
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Change your search or movement filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function WarehousesWorkspace({
  warehouses,
}: {
  warehouses: WarehouseRecord[];
}) {
  const totalCapacity = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.capacity,
    0,
  );

  const usedCapacity = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.usedCapacity,
    0,
  );

  const totalItems = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.totalItems,
    0,
  );

  const totalValue = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.inventoryValue,
    0,
  );

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SmallMetricCard
          title="Total Warehouses"
          value={String(warehouses.length)}
          description="Active storage locations"
          icon={Warehouse}
          tone="blue"
        />

        <SmallMetricCard
          title="Total Capacity"
          value={formatNumber(totalCapacity)}
          description={`${formatNumber(usedCapacity)} capacity used`}
          icon={Boxes}
          tone="violet"
        />

        <SmallMetricCard
          title="Stored Units"
          value={formatNumber(totalItems)}
          description="Across all warehouses"
          icon={Package}
          tone="orange"
        />

        <SmallMetricCard
          title="Inventory Value"
          value={formatCurrency(totalValue)}
          description="Warehouse stock value"
          icon={IndianRupee}
          tone="green"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {warehouses.map((warehouse) => {
          const utilisation =
            (warehouse.usedCapacity / warehouse.capacity) *
            100;

          return (
            <article
              key={warehouse.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Warehouse size={23} />
                </div>

                <WarehouseStatusBadge
                  status={warehouse.status}
                />
              </div>

              <h2 className="mt-5 text-lg font-black text-slate-950">
                {warehouse.name}
              </h2>

              <p className="mt-1 text-xs font-bold text-blue-600">
                {warehouse.code}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <WarehouseInfo
                  label="Location"
                  value={warehouse.city}
                />

                <WarehouseInfo
                  label="Manager"
                  value={warehouse.manager}
                />

                <WarehouseInfo
                  label="Stored Items"
                  value={formatNumber(warehouse.totalItems)}
                />

                <WarehouseInfo
                  label="Stock Value"
                  value={formatCurrency(
                    warehouse.inventoryValue,
                  )}
                />
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">
                    Capacity Utilisation
                  </span>

                  <strong className="text-slate-900">
                    {utilisation.toFixed(1)}%
                  </strong>
                </div>

                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      utilisation > 85
                        ? "bg-red-500"
                        : utilisation > 70
                          ? "bg-orange-500"
                          : "bg-blue-600"
                    }`}
                    style={{
                      width: `${Math.min(utilisation, 100)}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  {formatNumber(warehouse.usedCapacity)} of{" "}
                  {formatNumber(warehouse.capacity)} used
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <Eye size={15} />
                  View Details
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  <Truck size={15} />
                  Transfer Stock
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Warehouse Capacity Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Storage capacity and current utilisation
          </p>

          <div className="mt-7 space-y-6">
            {warehouses.map((warehouse) => {
              const percentage =
                (warehouse.usedCapacity /
                  warehouse.capacity) *
                100;

              return (
                <div key={warehouse.id}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <strong className="block text-sm text-slate-800">
                        {warehouse.name}
                      </strong>

                      <span className="mt-1 block text-xs text-slate-400">
                        {warehouse.city}
                      </span>
                    </div>

                    <strong className="text-sm text-slate-900">
                      {percentage.toFixed(1)}%
                    </strong>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Warehouse Controls
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Operational warehouse actions
              </p>
            </div>

            <Settings2 size={20} className="text-slate-400" />
          </div>

          <div className="mt-6 space-y-3">
            <WarehouseControlButton
              icon={Plus}
              title="Add Warehouse"
              description="Create a new storage location"
            />

            <WarehouseControlButton
              icon={Layers3}
              title="Manage Racks & Bins"
              description="Configure warehouse locations"
            />

            <WarehouseControlButton
              icon={ClipboardCheck}
              title="Cycle Count"
              description="Start physical stock verification"
            />

            <WarehouseControlButton
              icon={FileText}
              title="Warehouse Report"
              description="Generate location performance report"
            />
          </div>
        </article>
      </section>
    </div>
  );
}

function PurchaseOrdersWorkspace({
  purchaseOrders,
  setPurchaseOrders,
  onCreate,
}: {
  purchaseOrders: PurchaseOrder[];
  setPurchaseOrders: React.Dispatch<
    React.SetStateAction<PurchaseOrder[]>
  >;
  onCreate: () => void;
}) {
  const totalValue = purchaseOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );

  const pendingApproval = purchaseOrders.filter(
    (order) => order.status === "Pending Approval",
  ).length;

  const approved = purchaseOrders.filter(
    (order) => order.status === "Approved",
  ).length;

  const received = purchaseOrders.filter(
    (order) => order.status === "Received",
  ).length;

  function updateOrderStatus(
    orderId: string,
    status: PurchaseOrderStatus,
  ) {
    setPurchaseOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order,
      ),
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SmallMetricCard
          title="Purchase Order Value"
          value={formatCurrency(totalValue)}
          description="Total procurement value"
          icon={IndianRupee}
          tone="green"
        />

        <SmallMetricCard
          title="Pending Approval"
          value={String(pendingApproval)}
          description="Founder approval required"
          icon={Clock3}
          tone="orange"
        />

        <SmallMetricCard
          title="Approved Orders"
          value={String(approved)}
          description="Awaiting supplier delivery"
          icon={ShieldCheck}
          tone="blue"
        />

        <SmallMetricCard
          title="Received Orders"
          value={String(received)}
          description="Successfully received"
          icon={PackageCheck}
          tone="violet"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 p-6 xl:flex-row xl:items-center">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Purchase Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage procurement, approval and stock receiving.
            </p>
          </div>

          <button
            type="button"
            onClick={onCreate}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Purchase Order
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1300px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">
                  Purchase Order
                </th>
                <th className="px-4 py-4 font-semibold">Supplier</th>
                <th className="px-4 py-4 font-semibold">Order Date</th>
                <th className="px-4 py-4 font-semibold">
                  Expected Date
                </th>
                <th className="px-4 py-4 text-center font-semibold">
                  Items
                </th>
                <th className="px-4 py-4 text-center font-semibold">
                  Quantity
                </th>
                <th className="px-4 py-4 font-semibold">Amount</th>
                <th className="px-4 py-4 font-semibold">Warehouse</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {purchaseOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 text-sm transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <strong className="font-mono text-xs text-blue-600">
                      {order.id}
                    </strong>
                  </td>

                  <td className="px-4 py-4">
                    <strong className="text-sm text-slate-900">
                      {order.supplier}
                    </strong>
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-500">
                    {order.orderDate}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-500">
                    {order.expectedDate}
                  </td>

                  <td className="px-4 py-4 text-center font-bold text-slate-900">
                    {order.items}
                  </td>

                  <td className="px-4 py-4 text-center font-bold text-slate-900">
                    {order.quantity}
                  </td>

                  <td className="px-4 py-4 font-black text-slate-900">
                    {formatCurrency(order.totalAmount)}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-600">
                    {order.warehouse}
                  </td>

                  <td className="px-4 py-4">
                    <PurchaseOrderStatusBadge
                      status={order.status}
                    />
                  </td>

                  <td className="px-6 py-4 text-right">
                    {order.status === "Pending Approval" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            "Approved",
                          )
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"
                      >
                        Approve
                      </button>
                    )}

                    {order.status === "Approved" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateOrderStatus(
                            order.id,
                            "Received",
                          )
                        }
                        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white"
                      >
                        Receive
                      </button>
                    )}

                    {(order.status === "Draft" ||
                      order.status === "Received") && (
                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500"
                      >
                        <MoreHorizontal size={17} />
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

function SuppliersWorkspace({
  suppliers,
}: {
  suppliers: Supplier[];
}) {
  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.status === "Active",
  ).length;

  const openOrders = suppliers.reduce(
    (sum, supplier) => sum + supplier.openOrders,
    0,
  );

  const totalPurchases = suppliers.reduce(
    (sum, supplier) => sum + supplier.totalPurchases,
    0,
  );

  const averageRating =
    suppliers.reduce(
      (sum, supplier) => sum + supplier.rating,
      0,
    ) / Math.max(suppliers.length, 1);

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SmallMetricCard
          title="Active Suppliers"
          value={String(activeSuppliers)}
          description="Approved supplier network"
          icon={Building2}
          tone="blue"
        />

        <SmallMetricCard
          title="Open Orders"
          value={String(openOrders)}
          description="Active procurement orders"
          icon={ShoppingCart}
          tone="orange"
        />

        <SmallMetricCard
          title="Total Purchases"
          value={formatCurrency(totalPurchases)}
          description="Lifetime procurement value"
          icon={IndianRupee}
          tone="green"
        />

        <SmallMetricCard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          description="Supplier quality score"
          icon={ShieldCheck}
          tone="violet"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Supplier Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage vendors, contacts and procurement performance.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
          >
            <Plus size={17} />
            Add Supplier
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Supplier</th>
                <th className="px-4 py-4 font-semibold">
                  Contact Person
                </th>
                <th className="px-4 py-4 font-semibold">
                  Contact Details
                </th>
                <th className="px-4 py-4 text-center font-semibold">
                  Items
                </th>
                <th className="px-4 py-4 text-center font-semibold">
                  Open Orders
                </th>
                <th className="px-4 py-4 font-semibold">
                  Lead Time
                </th>
                <th className="px-4 py-4 font-semibold">Rating</th>
                <th className="px-4 py-4 font-semibold">
                  Total Purchases
                </th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="border-b border-slate-100 text-sm transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-xs font-black text-white">
                        {supplier.name
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <strong className="block text-sm text-slate-900">
                          {supplier.name}
                        </strong>

                        <span className="mt-1 block font-mono text-xs text-slate-400">
                          {supplier.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                    {supplier.contactPerson}
                  </td>

                  <td className="px-4 py-4">
                    <span className="block text-xs text-slate-600">
                      {supplier.email}
                    </span>

                    <span className="mt-1 block text-xs text-slate-400">
                      {supplier.phone}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center font-black text-slate-900">
                    {supplier.suppliedItems}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
                      {supplier.openOrders}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-xs font-semibold text-slate-600">
                    {supplier.leadTime}
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-700">
                      ★ {supplier.rating}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-black text-slate-900">
                    {formatCurrency(supplier.totalPurchases)}
                  </td>

                  <td className="px-4 py-4">
                    <SupplierStatusBadge
                      status={supplier.status}
                    />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500"
                    >
                      <MoreHorizontal size={17} />
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

function AnalyticsWorkspace({
  inventory,
}: {
  inventory: InventoryItem[];
}) {
  const totalCostValue = inventory.reduce(
    (sum, item) =>
      sum + item.currentStock * item.unitCost,
    0,
  );

  const totalRetailValue = inventory.reduce(
    (sum, item) =>
      sum + item.currentStock * item.sellingPrice,
    0,
  );

  const potentialMargin =
    totalRetailValue - totalCostValue;

  const turnoverRatio = 4.8;

  const topValueProducts = [...inventory]
    .sort(
      (first, second) =>
        second.currentStock * second.unitCost -
        first.currentStock * first.unitCost,
    )
    .slice(0, 5);

  const stockHealth = [
    {
      label: "Healthy",
      count: inventory.filter(
        (item) => item.status === "Healthy",
      ).length,
      className: "bg-green-600",
    },
    {
      label: "Low Stock",
      count: inventory.filter(
        (item) => item.status === "Low Stock",
      ).length,
      className: "bg-orange-500",
    },
    {
      label: "Out of Stock",
      count: inventory.filter(
        (item) => item.status === "Out of Stock",
      ).length,
      className: "bg-red-500",
    },
    {
      label: "Overstock",
      count: inventory.filter(
        (item) => item.status === "Overstock",
      ).length,
      className: "bg-violet-600",
    },
  ];

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SmallMetricCard
          title="Inventory Cost"
          value={formatCurrency(totalCostValue)}
          description="Current inventory investment"
          icon={IndianRupee}
          tone="blue"
        />

        <SmallMetricCard
          title="Retail Value"
          value={formatCurrency(totalRetailValue)}
          description="Potential sales value"
          icon={CircleDollarSign}
          tone="green"
        />

        <SmallMetricCard
          title="Potential Margin"
          value={formatCurrency(potentialMargin)}
          description="Before operational expenses"
          icon={TrendingUp}
          tone="violet"
        />

        <SmallMetricCard
          title="Turnover Ratio"
          value={`${turnoverRatio}x`}
          description="Annual inventory turnover"
          icon={Activity}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Inventory Value by Product
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Highest inventory capital concentration
          </p>

          <div className="mt-7 space-y-5">
            {topValueProducts.map((item, index) => {
              const itemValue =
                item.currentStock * item.unitCost;

              const maximumValue =
                topValueProducts[0].currentStock *
                topValueProducts[0].unitCost;

              const percentage =
                (itemValue / Math.max(maximumValue, 1)) *
                100;

              return (
                <div key={item.id}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-black text-slate-600">
                        {index + 1}
                      </span>

                      <div className="min-w-0">
                        <strong className="block truncate text-sm text-slate-800">
                          {item.productName}
                        </strong>

                        <span className="mt-1 block text-xs text-slate-400">
                          {item.currentStock} units
                        </span>
                      </div>
                    </div>

                    <strong className="shrink-0 text-sm text-slate-900">
                      {formatCurrency(itemValue)}
                    </strong>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Stock Health Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Product-level inventory health
          </p>

          <div className="mt-7 space-y-5">
            {stockHealth.map((status) => {
              const percentage =
                (status.count /
                  Math.max(inventory.length, 1)) *
                100;

              return (
                <div key={status.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      {status.label}
                    </span>

                    <strong className="text-sm text-slate-900">
                      {status.count} items
                    </strong>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${status.className}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    {percentage.toFixed(1)}% of catalogue
                  </p>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <AnalysisCard
          title="Fast Moving Stock"
          description="Products with high order velocity and regular replenishment requirements."
          value="18 products"
          icon={TrendingUp}
          tone="green"
        />

        <AnalysisCard
          title="Slow Moving Stock"
          description="Products with reduced demand and increasing holding periods."
          value="7 products"
          icon={TrendingDown}
          tone="orange"
        />

        <AnalysisCard
          title="Dead Stock"
          description="Products with no meaningful movement during the review period."
          value="2 products"
          icon={AlertTriangle}
          tone="red"
        />
      </section>

      <section className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl lg:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
                <Sparkles size={21} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  KRVE AI Analysis
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Inventory Optimisation Opportunity
                </h2>
              </div>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
              Redistributing overstocked inventory, accelerating
              purchase approvals and maintaining category-level safety
              stock can reduce stockout risk and release blocked
              working capital.
            </p>
          </div>

          <button
            type="button"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
          >
            Generate AI Plan
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}

function ReportsWorkspace({
  inventory,
  movements,
  warehouses,
  onExport,
}: {
  inventory: InventoryItem[];
  movements: StockMovement[];
  warehouses: WarehouseRecord[];
  onExport: () => void;
}) {
  const reports = [
    {
      id: "inventory-valuation",
      title: "Inventory Valuation Report",
      description:
        "Cost value, retail value and potential margin by product.",
      icon: IndianRupee,
      frequency: "Real-time",
    },
    {
      id: "stock-ledger",
      title: "Stock Ledger",
      description:
        "Complete chronological stock transaction register.",
      icon: History,
      frequency: `${movements.length} entries`,
    },
    {
      id: "stock-health",
      title: "Stock Health Report",
      description:
        "Healthy, low stock, out-of-stock and overstock analysis.",
      icon: Activity,
      frequency: `${inventory.length} items`,
    },
    {
      id: "warehouse-performance",
      title: "Warehouse Performance",
      description:
        "Capacity, value and operational utilisation by warehouse.",
      icon: Warehouse,
      frequency: `${warehouses.length} warehouses`,
    },
    {
      id: "reorder",
      title: "Reorder Requirement Report",
      description:
        "Products below safety stock and reorder thresholds.",
      icon: AlertTriangle,
      frequency: "Daily",
    },
    {
      id: "audit",
      title: "Inventory Audit Report",
      description:
        "Adjustments, approvals and user-level inventory changes.",
      icon: ShieldCheck,
      frequency: "Audit ready",
    },
  ];

  return (
    <div className="mt-6 space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Inventory Reports Center
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Generate operational, valuation, audit and management
              inventory reports.
            </p>
          </div>

          <button
            type="button"
            onClick={onExport}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
          >
            <Download size={17} />
            Export Current Inventory
          </button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => {
          const ReportIcon = report.icon;

          return (
            <article
              key={report.id}
              className="flex min-h-[245px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <ReportIcon size={21} />
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {report.frequency}
                </span>
              </div>

              <h3 className="mt-5 text-base font-black text-slate-950">
                {report.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {report.description}
              </p>

              <div className="mt-auto flex gap-3 pt-6">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-xs font-bold text-slate-700"
                >
                  <Eye size={15} />
                  Preview
                </button>

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs font-bold text-white"
                >
                  <Download size={15} />
                  Download
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Scheduled Reports
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Automated inventory reporting schedule
          </p>

          <div className="mt-6 space-y-3">
            <ScheduledReportRow
              title="Daily Low Stock Report"
              schedule="Every day at 8:00 AM"
              recipients="Inventory Head, Founder"
              active
            />

            <ScheduledReportRow
              title="Weekly Warehouse Report"
              schedule="Every Monday at 9:00 AM"
              recipients="Operations, Founder"
              active
            />

            <ScheduledReportRow
              title="Monthly Valuation Report"
              schedule="First day of every month"
              recipients="Finance, Founder"
              active
            />

            <ScheduledReportRow
              title="Quarterly Inventory Audit"
              schedule="Every quarter"
              recipients="Finance, Audit Team"
              active={false}
            />
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Custom Report Builder
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create a custom inventory report
              </p>
            </div>

            <FileBarChart
              size={21}
              className="text-slate-400"
            />
          </div>

          <div className="mt-6 space-y-4">
            <CustomReportField label="Report Type">
              <select className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500">
                <option>Inventory Summary</option>
                <option>Inventory Valuation</option>
                <option>Stock Movement</option>
                <option>Warehouse Performance</option>
                <option>Supplier Procurement</option>
              </select>
            </CustomReportField>

            <CustomReportField label="Warehouse">
              <select className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500">
                <option>All Warehouses</option>
                {warehouses.map((warehouse) => (
                  <option
                    key={warehouse.id}
                    value={warehouse.name}
                  >
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </CustomReportField>

            <div className="grid gap-4 sm:grid-cols-2">
              <CustomReportField label="From Date">
                <input
                  type="date"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                />
              </CustomReportField>

              <CustomReportField label="To Date">
                <input
                  type="date"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                />
              </CustomReportField>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              <FileText size={17} />
              Generate Custom Report
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

function AIInventoryWorkspace({
  inventory,
  onOpenPurchaseOrders,
  onOpenStock,
}: {
  inventory: InventoryItem[];
  onOpenPurchaseOrders: () => void;
  onOpenStock: () => void;
}) {
  const lowStockItems = inventory.filter(
    (item) =>
      item.status === "Low Stock" ||
      item.status === "Out of Stock",
  );

  const overstockItems = inventory.filter(
    (item) => item.status === "Overstock",
  );

  const totalReorderValue = lowStockItems.reduce(
    (sum, item) => {
      const requiredQuantity = Math.max(
        0,
        item.maximumStock - item.currentStock,
      );

      return sum + requiredQuantity * item.unitCost;
    },
    0,
  );

  return (
    <div className="mt-6 space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-7 text-white shadow-xl lg:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600">
                <Sparkles size={24} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                  KRVE Intelligence
                </p>

                <h1 className="mt-1 text-2xl font-black sm:text-3xl">
                  AI Inventory Control Center
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
              Predict demand, identify stock risks, create replenishment
              plans and optimise inventory capital using KRVE AI.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold text-blue-300">
              AI System Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <strong className="text-sm text-white">
                Monitoring {inventory.length} inventory items
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <AIKpiCard
          title="Reorder Recommendations"
          value={String(lowStockItems.length)}
          description="Items requiring replenishment"
          icon={ShoppingCart}
          tone="red"
        />

        <AIKpiCard
          title="Estimated Reorder Cost"
          value={formatCurrency(totalReorderValue)}
          description="Maximum stock replenishment"
          icon={IndianRupee}
          tone="orange"
        />

        <AIKpiCard
          title="Overstock Opportunities"
          value={String(overstockItems.length)}
          description="Capital release opportunities"
          icon={TrendingDown}
          tone="violet"
        />

        <AIKpiCard
          title="Forecast Accuracy"
          value="92.4%"
          description="Current demand prediction accuracy"
          icon={Activity}
          tone="green"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                AI Replenishment Plan
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recommended purchasing actions
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenPurchaseOrders}
              className="flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Purchase Orders
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {lowStockItems.map((item) => {
              const suggestedQuantity = Math.max(
                0,
                item.maximumStock - item.currentStock,
              );

              const reorderCost =
                suggestedQuantity * item.unitCost;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <ProductAvatar code={item.imageCode} />

                      <div>
                        <strong className="block text-sm text-slate-900">
                          {item.productName}
                        </strong>

                        <span className="mt-1 block text-xs text-slate-500">
                          {item.sku} • {item.warehouse}
                        </span>
                      </div>
                    </div>

                    <InventoryStatusBadge
                      status={item.status}
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <AIRecommendationData
                      label="Current Stock"
                      value={`${item.currentStock} units`}
                    />

                    <AIRecommendationData
                      label="Suggested Order"
                      value={`${suggestedQuantity} units`}
                    />

                    <AIRecommendationData
                      label="Estimated Cost"
                      value={formatCurrency(reorderCost)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={onOpenPurchaseOrders}
                    className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600"
                  >
                    Create Purchase Order
                    <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}

            {lowStockItems.length === 0 && (
              <div className="rounded-2xl bg-green-50 p-8 text-center">
                <CheckCircle2
                  size={30}
                  className="mx-auto text-green-600"
                />

                <h3 className="mt-3 text-sm font-black text-green-900">
                  No immediate replenishment required
                </h3>
              </div>
            )}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            AI Inventory Alerts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Automated risk and opportunity detection
          </p>

          <div className="mt-6 space-y-4">
            <AIAlertCard
              icon={AlertTriangle}
              title="Stockout Risk"
              description={`${lowStockItems.length} items may affect fulfilment if purchasing is delayed.`}
              tone="red"
              actionLabel="Review Stock"
              onClick={onOpenStock}
            />

            <AIAlertCard
              icon={TrendingDown}
              title="Overstock Capital"
              description={`${overstockItems.length} products may require promotion or warehouse redistribution.`}
              tone="orange"
              actionLabel="Review Overstock"
              onClick={onOpenStock}
            />

            <AIAlertCard
              icon={Truck}
              title="Warehouse Balancing"
              description="Central warehouse has higher inventory concentration than regional fulfilment hubs."
              tone="blue"
              actionLabel="Plan Transfer"
              onClick={onOpenStock}
            />

            <AIAlertCard
              icon={Sparkles}
              title="Demand Opportunity"
              description="Footwear demand is increasing and may require revised safety stock levels."
              tone="green"
              actionLabel="View Forecast"
              onClick={onOpenStock}
            />
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <AIActionCard
          title="Generate Reorder Plan"
          description="Create product-level purchase recommendations based on stock and forecast."
          icon={ShoppingCart}
          buttonLabel="Generate Plan"
          onClick={onOpenPurchaseOrders}
        />

        <AIActionCard
          title="Optimise Warehouse Stock"
          description="Recommend warehouse transfers based on regional demand and availability."
          icon={Warehouse}
          buttonLabel="Optimise Stock"
          onClick={onOpenStock}
        />

        <AIActionCard
          title="Detect Dead Stock"
          description="Identify inventory with low movement, high ageing and blocked capital."
          icon={TrendingDown}
          buttonLabel="Run Detection"
          onClick={onOpenStock}
        />
      </section>
    </div>
  );
}

function SmallMetricCard({
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
  tone:
    | "blue"
    | "green"
    | "red"
    | "orange"
    | "violet";
}) {
  const className =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "red"
        ? "bg-red-50 text-red-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : tone === "violet"
            ? "bg-violet-50 text-violet-600"
            : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${className}`}
      >
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-950">
        {value}
      </h2>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </article>
  );
}

function WarehouseStatusBadge({
  status,
}: {
  status: WarehouseRecord["status"];
}) {
  const className =
    status === "Operational"
      ? "bg-green-50 text-green-700"
      : status === "Maintenance"
        ? "bg-orange-50 text-orange-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}
    >
      {status}
    </span>
  );
}

function WarehouseInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>

      <strong className="mt-2 block truncate text-xs text-slate-800">
        {value}
      </strong>
    </div>
  );
}

function WarehouseControlButton({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <strong className="block text-sm text-slate-900">
          {title}
        </strong>

        <span className="mt-1 block text-xs text-slate-500">
          {description}
        </span>
      </div>
    </button>
  );
}

function PurchaseOrderStatusBadge({
  status,
}: {
  status: PurchaseOrderStatus;
}) {
  const className =
    status === "Received"
      ? "bg-green-50 text-green-700"
      : status === "Approved"
        ? "bg-blue-50 text-blue-700"
        : status === "Pending Approval"
          ? "bg-orange-50 text-orange-700"
          : status === "Partially Received"
            ? "bg-violet-50 text-violet-700"
            : status === "Cancelled"
              ? "bg-red-50 text-red-700"
              : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${className}`}
    >
      {status}
    </span>
  );
}

function SupplierStatusBadge({
  status,
}: {
  status: Supplier["status"];
}) {
  const className =
    status === "Active"
      ? "bg-green-50 text-green-700"
      : status === "On Hold"
        ? "bg-orange-50 text-orange-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}
    >
      {status}
    </span>
  );
}

function AnalysisCard({
  title,
  description,
  value,
  icon: Icon,
  tone,
}: {
  title: string;
  description: string;
  value: string;
  icon: IconType;
  tone: "green" | "orange" | "red";
}) {
  const className =
    tone === "green"
      ? "bg-green-50 text-green-600"
      : tone === "orange"
        ? "bg-orange-50 text-orange-600"
        : "bg-red-50 text-red-600";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${className}`}
      >
        <Icon size={21} />
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <strong className="mt-5 block text-xl text-slate-900">
        {value}
      </strong>
    </article>
  );
}

function ScheduledReportRow({
  title,
  schedule,
  recipients,
  active,
}: {
  title: string;
  schedule: string;
  recipients: string;
  active: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center">
      <div>
        <strong className="block text-sm text-slate-900">
          {title}
        </strong>

        <span className="mt-1 block text-xs text-slate-500">
          {schedule}
        </span>

        <span className="mt-1 block text-xs text-slate-400">
          Recipients: {recipients}
        </span>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-bold ${
          active
            ? "bg-green-50 text-green-700"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {active ? "Active" : "Disabled"}
      </span>
    </div>
  );
}

function CustomReportField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </span>

      {children}
    </label>
  );
}

function AIKpiCard({
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
  tone:
    | "red"
    | "orange"
    | "violet"
    | "green";
}) {
  const className =
    tone === "red"
      ? "bg-red-50 text-red-600"
      : tone === "orange"
        ? "bg-orange-50 text-orange-600"
        : tone === "violet"
          ? "bg-violet-50 text-violet-600"
          : "bg-green-50 text-green-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${className}`}
      >
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>

      <h2 className="mt-2 text-2xl font-black text-slate-950">
        {value}
      </h2>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </article>
  );
}

function AIRecommendationData({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>

      <strong className="mt-2 block text-sm text-slate-900">
        {value}
      </strong>
    </div>
  );
}

function AIAlertCard({
  icon: Icon,
  title,
  description,
  tone,
  actionLabel,
  onClick,
}: {
  icon: IconType;
  title: string;
  description: string;
  tone: "red" | "orange" | "blue" | "green";
  actionLabel: string;
  onClick: () => void;
}) {
  const className =
    tone === "red"
      ? "border-red-200 bg-red-50 text-red-700"
      : tone === "orange"
        ? "border-orange-200 bg-orange-50 text-orange-700"
        : tone === "green"
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <article className={`rounded-2xl border p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/70">
          <Icon size={17} />
        </div>

        <div>
          <strong className="block text-sm">{title}</strong>

          <p className="mt-2 text-xs leading-5 opacity-80">
            {description}
          </p>

          <button
            type="button"
            onClick={onClick}
            className="mt-3 flex items-center gap-1 text-xs font-black"
          >
            {actionLabel}
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

function AIActionCard({
  title,
  description,
  icon: Icon,
  buttonLabel,
  onClick,
}: {
  title: string;
  description: string;
  icon: IconType;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <article className="flex min-h-[245px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-blue-600"
      >
        {buttonLabel}
        <ArrowRight size={15} />
      </button>
    </article>
  );
}
function InventoryModal({
  modalType,
  selectedItem,
  inventory,
  warehouses,
  suppliers,
  inventoryForm,
  onFormChange,
  onAddInventoryItem,
  onClose,
  setInventory,
  setMovements,
  setPurchaseOrders,
}: {
  modalType: ModalType;
  selectedItem: InventoryItem | null;
  inventory: InventoryItem[];
  warehouses: WarehouseRecord[];
  suppliers: Supplier[];
  inventoryForm: InventoryForm;
  onFormChange: (
    field: keyof InventoryForm,
    value: string,
  ) => void;
  onAddInventoryItem: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
  onClose: () => void;
  setInventory: React.Dispatch<
    React.SetStateAction<InventoryItem[]>
  >;
  setMovements: React.Dispatch<
    React.SetStateAction<StockMovement[]>
  >;
  setPurchaseOrders: React.Dispatch<
    React.SetStateAction<PurchaseOrder[]>
  >;
}) {
  if (!modalType) {
    return null;
  }

  const modalTitle =
    modalType === "add-item"
      ? "Add Inventory Item"
      : modalType === "stock-in"
        ? "Stock In"
        : modalType === "stock-out"
          ? "Stock Out"
          : modalType === "transfer"
            ? "Transfer Stock"
            : modalType === "adjustment"
              ? "Stock Adjustment"
              : modalType === "purchase-order"
                ? "Create Purchase Order"
                : "Inventory Item Details";

  const modalDescription =
    modalType === "add-item"
      ? "Create a new product inventory record."
      : modalType === "stock-in"
        ? "Receive inventory into a warehouse."
        : modalType === "stock-out"
          ? "Issue or dispatch inventory from a warehouse."
          : modalType === "transfer"
            ? "Move inventory between warehouse locations."
            : modalType === "adjustment"
              ? "Correct the available physical stock quantity."
              : modalType === "purchase-order"
                ? "Create a supplier purchase order."
                : "Review complete stock and valuation information.";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`max-h-[92vh] w-full overflow-hidden rounded-3xl bg-white shadow-2xl ${
          modalType === "view-item"
            ? "max-w-5xl"
            : modalType === "add-item"
              ? "max-w-4xl"
              : "max-w-2xl"
        }`}
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <ModalHeaderIcon modalType={modalType} />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-950">
                  {modalTitle}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {modalDescription}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        <div className="keos-scrollbar max-h-[calc(92vh-100px)] overflow-y-auto">
          {modalType === "add-item" && (
            <AddInventoryItemForm
              inventoryForm={inventoryForm}
              warehouses={warehouses}
              suppliers={suppliers}
              onFormChange={onFormChange}
              onSubmit={onAddInventoryItem}
              onClose={onClose}
            />
          )}

          {modalType === "stock-in" && (
            <StockInForm
              inventory={inventory}
              warehouses={warehouses}
              setInventory={setInventory}
              setMovements={setMovements}
              onClose={onClose}
            />
          )}

          {modalType === "stock-out" && (
            <StockOutForm
              inventory={inventory}
              setInventory={setInventory}
              setMovements={setMovements}
              onClose={onClose}
            />
          )}

          {modalType === "transfer" && (
            <StockTransferForm
              inventory={inventory}
              warehouses={warehouses}
              setInventory={setInventory}
              setMovements={setMovements}
              onClose={onClose}
            />
          )}

          {modalType === "adjustment" && (
            <StockAdjustmentForm
              inventory={inventory}
              setInventory={setInventory}
              setMovements={setMovements}
              onClose={onClose}
            />
          )}

          {modalType === "purchase-order" && (
            <PurchaseOrderForm
              warehouses={warehouses}
              suppliers={suppliers}
              setPurchaseOrders={setPurchaseOrders}
              onClose={onClose}
            />
          )}

          {modalType === "view-item" && selectedItem && (
            <InventoryItemDetails
              item={selectedItem}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ModalHeaderIcon({
  modalType,
}: {
  modalType: ModalType;
}) {
  if (modalType === "add-item") {
    return <PackagePlus size={21} />;
  }

  if (modalType === "stock-in") {
    return <ArrowDownLeft size={21} />;
  }

  if (modalType === "stock-out") {
    return <ArrowUpRight size={21} />;
  }

  if (modalType === "transfer") {
    return <Truck size={21} />;
  }

  if (modalType === "adjustment") {
    return <SlidersHorizontal size={21} />;
  }

  if (modalType === "purchase-order") {
    return <ShoppingCart size={21} />;
  }

  return <Eye size={21} />;
}

function AddInventoryItemForm({
  inventoryForm,
  warehouses,
  suppliers,
  onFormChange,
  onSubmit,
  onClose,
}: {
  inventoryForm: InventoryForm;
  warehouses: WarehouseRecord[];
  suppliers: Supplier[];
  onFormChange: (
    field: keyof InventoryForm,
    value: string,
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="p-6 sm:p-8">
      <FormSection
        title="Product Information"
        description="Basic product and stock keeping information."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <ModalField
            label="Product Name"
            required
          >
            <input
              required
              value={inventoryForm.productName}
              onChange={(event) =>
                onFormChange(
                  "productName",
                  event.target.value,
                )
              }
              placeholder="Example: KRVE Noir Blazer"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="SKU" required>
            <input
              required
              value={inventoryForm.sku}
              onChange={(event) =>
                onFormChange("sku", event.target.value)
              }
              placeholder="KRVE-NB-BLK-M"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Variant">
            <input
              value={inventoryForm.variant}
              onChange={(event) =>
                onFormChange(
                  "variant",
                  event.target.value,
                )
              }
              placeholder="Black / Medium"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Category" required>
            <select
              required
              value={inventoryForm.category}
              onChange={(event) =>
                onFormChange(
                  "category",
                  event.target.value,
                )
              }
              className={modalInputClass}
            >
              <option value="">Select category</option>
              <option value="Blazers">Blazers</option>
              <option value="Suits">Suits</option>
              <option value="Shirts">Shirts</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Trousers">Trousers</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">
                Accessories
              </option>
            </select>
          </ModalField>
        </div>
      </FormSection>

      <FormSection
        title="Warehouse Allocation"
        description="Assign the item to its initial storage location."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <ModalField label="Warehouse" required>
            <select
              required
              value={inventoryForm.warehouse}
              onChange={(event) =>
                onFormChange(
                  "warehouse",
                  event.target.value,
                )
              }
              className={modalInputClass}
            >
              {warehouses.map((warehouse) => (
                <option
                  key={warehouse.id}
                  value={warehouse.name}
                >
                  {warehouse.name}
                </option>
              ))}
            </select>
          </ModalField>

          <ModalField label="Rack / Bin Location">
            <input
              value={inventoryForm.location}
              onChange={(event) =>
                onFormChange(
                  "location",
                  event.target.value,
                )
              }
              placeholder="A-01-04"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Supplier">
            <select
              value={inventoryForm.supplier}
              onChange={(event) =>
                onFormChange(
                  "supplier",
                  event.target.value,
                )
              }
              className={modalInputClass}
            >
              <option value="">Select supplier</option>

              {suppliers.map((supplier) => (
                <option
                  key={supplier.id}
                  value={supplier.name}
                >
                  {supplier.name}
                </option>
              ))}
            </select>
          </ModalField>
        </div>
      </FormSection>

      <FormSection
        title="Stock Controls"
        description="Configure initial inventory and stock thresholds."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <ModalField label="Opening Stock" required>
            <input
              required
              type="number"
              min="0"
              value={inventoryForm.currentStock}
              onChange={(event) =>
                onFormChange(
                  "currentStock",
                  event.target.value,
                )
              }
              placeholder="0"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Reorder Level" required>
            <input
              required
              type="number"
              min="0"
              value={inventoryForm.reorderLevel}
              onChange={(event) =>
                onFormChange(
                  "reorderLevel",
                  event.target.value,
                )
              }
              placeholder="10"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Maximum Stock" required>
            <input
              required
              type="number"
              min="1"
              value={inventoryForm.maximumStock}
              onChange={(event) =>
                onFormChange(
                  "maximumStock",
                  event.target.value,
                )
              }
              placeholder="100"
              className={modalInputClass}
            />
          </ModalField>
        </div>
      </FormSection>

      <FormSection
        title="Pricing & Valuation"
        description="Set inventory cost and customer selling price."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <ModalField label="Unit Cost" required>
            <CurrencyInputWrapper>
              <input
                required
                type="number"
                min="0"
                value={inventoryForm.unitCost}
                onChange={(event) =>
                  onFormChange(
                    "unitCost",
                    event.target.value,
                  )
                }
                placeholder="0"
                className={currencyInputClass}
              />
            </CurrencyInputWrapper>
          </ModalField>

          <ModalField label="Selling Price" required>
            <CurrencyInputWrapper>
              <input
                required
                type="number"
                min="0"
                value={inventoryForm.sellingPrice}
                onChange={(event) =>
                  onFormChange(
                    "sellingPrice",
                    event.target.value,
                  )
                }
                placeholder="0"
                className={currencyInputClass}
              />
            </CurrencyInputWrapper>
          </ModalField>
        </div>
      </FormSection>

      <ModalFooter
        submitLabel="Create Inventory Item"
        submitIcon={PackagePlus}
        onCancel={onClose}
      />
    </form>
  );
}

function StockInForm({
  inventory,
  warehouses,
  setInventory,
  setMovements,
  onClose,
}: {
  inventory: InventoryItem[];
  warehouses: WarehouseRecord[];
  setInventory: React.Dispatch<
    React.SetStateAction<InventoryItem[]>
  >;
  setMovements: React.Dispatch<
    React.SetStateAction<StockMovement[]>
  >;
  onClose: () => void;
}) {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  const selected = inventory.find(
    (item) => item.id === Number(itemId),
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selected) {
      return;
    }

    const stockQuantity = Math.max(0, Number(quantity));

    if (stockQuantity <= 0) {
      return;
    }

    setInventory((current) =>
      current.map((item) => {
        if (item.id !== selected.id) {
          return item;
        }

        const updatedStock =
          item.currentStock + stockQuantity;

        return {
          ...item,
          currentStock: updatedStock,
          incomingStock: Math.max(
            0,
            item.incomingStock - stockQuantity,
          ),
          warehouse: warehouse || item.warehouse,
          status: calculateInventoryStatus(
            updatedStock,
            item.reorderLevel,
            item.maximumStock,
          ),
          lastUpdated: "Just now",
        };
      }),
    );

    setMovements((current) => [
      {
        id: generateMovementId(current.length),
        date: "Just now",
        type: "Stock In",
        sku: selected.sku,
        productName: selected.productName,
        warehouse:
          warehouse || selected.warehouse,
        quantity: stockQuantity,
        reference:
          reference.trim() ||
          `GRN-${Date.now().toString().slice(-6)}`,
        performedBy: "Founder",
        notes:
          notes.trim() ||
          "Inventory received into warehouse.",
      },
      ...current,
    ]);

    onClose();
  }

  return (
    <form onSubmit={submit} className="p-6 sm:p-8">
      <div className="space-y-5">
        <ModalField label="Inventory Item" required>
          <select
            required
            value={itemId}
            onChange={(event) => {
              setItemId(event.target.value);

              const item = inventory.find(
                (record) =>
                  record.id === Number(event.target.value),
              );

              setWarehouse(item?.warehouse || "");
            }}
            className={modalInputClass}
          >
            <option value="">Select product</option>

            {inventory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.productName} — {item.variant} (
                {item.sku})
              </option>
            ))}
          </select>
        </ModalField>

        {selected && (
          <SelectedInventoryPreview item={selected} />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <ModalField label="Received Quantity" required>
            <input
              required
              type="number"
              min="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(event.target.value)
              }
              placeholder="Enter quantity"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Receiving Warehouse" required>
            <select
              required
              value={warehouse}
              onChange={(event) =>
                setWarehouse(event.target.value)
              }
              className={modalInputClass}
            >
              <option value="">Select warehouse</option>

              {warehouses.map((record) => (
                <option
                  key={record.id}
                  value={record.name}
                >
                  {record.name}
                </option>
              ))}
            </select>
          </ModalField>

          <ModalField label="Reference / GRN">
            <input
              value={reference}
              onChange={(event) =>
                setReference(event.target.value)
              }
              placeholder="PO-2026-0252"
              className={modalInputClass}
            />
          </ModalField>
        </div>

        <ModalField label="Receiving Notes">
          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            placeholder="Add inspection or receiving notes..."
            rows={4}
            className={modalTextareaClass}
          />
        </ModalField>
      </div>

      <ModalFooter
        submitLabel="Confirm Stock In"
        submitIcon={PackagePlus}
        onCancel={onClose}
      />
    </form>
  );
}

function StockOutForm({
  inventory,
  setInventory,
  setMovements,
  onClose,
}: {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<
    React.SetStateAction<InventoryItem[]>
  >;
  setMovements: React.Dispatch<
    React.SetStateAction<StockMovement[]>
  >;
  onClose: () => void;
}) {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("Order Dispatch");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const selected = inventory.find(
    (item) => item.id === Number(itemId),
  );

  const availableStock = selected
    ? Math.max(
        0,
        selected.currentStock - selected.reservedStock,
      )
    : 0;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!selected) {
      return;
    }

    const stockQuantity = Math.max(0, Number(quantity));

    if (stockQuantity <= 0) {
      setError("Quantity must be greater than zero.");
      return;
    }

    if (stockQuantity > selected.currentStock) {
      setError(
        `Only ${selected.currentStock} units are currently available in physical stock.`,
      );
      return;
    }

    const updatedStock =
      selected.currentStock - stockQuantity;

    setInventory((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              currentStock: updatedStock,
              reservedStock: Math.min(
                item.reservedStock,
                updatedStock,
              ),
              status: calculateInventoryStatus(
                updatedStock,
                item.reorderLevel,
                item.maximumStock,
              ),
              lastUpdated: "Just now",
            }
          : item,
      ),
    );

    setMovements((current) => [
      {
        id: generateMovementId(current.length),
        date: "Just now",
        type: "Stock Out",
        sku: selected.sku,
        productName: selected.productName,
        warehouse: selected.warehouse,
        quantity: stockQuantity,
        reference:
          reference.trim() ||
          `ISS-${Date.now().toString().slice(-6)}`,
        performedBy: "Founder",
        notes:
          notes.trim() ||
          `${reason} inventory transaction.`,
      },
      ...current,
    ]);

    onClose();
  }

  return (
    <form onSubmit={submit} className="p-6 sm:p-8">
      <div className="space-y-5">
        <ModalField label="Inventory Item" required>
          <select
            required
            value={itemId}
            onChange={(event) => {
              setItemId(event.target.value);
              setError("");
            }}
            className={modalInputClass}
          >
            <option value="">Select product</option>

            {inventory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.productName} — {item.variant} (
                {item.currentStock} units)
              </option>
            ))}
          </select>
        </ModalField>

        {selected && (
          <>
            <SelectedInventoryPreview item={selected} />

            <div className="grid grid-cols-3 gap-3">
              <MiniStockData
                label="Physical"
                value={selected.currentStock}
              />

              <MiniStockData
                label="Reserved"
                value={selected.reservedStock}
              />

              <MiniStockData
                label="Available"
                value={availableStock}
              />
            </div>
          </>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <ModalField label="Issue Quantity" required>
            <input
              required
              type="number"
              min="1"
              max={selected?.currentStock}
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value);
                setError("");
              }}
              placeholder="Enter quantity"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Transaction Reason" required>
            <select
              value={reason}
              onChange={(event) =>
                setReason(event.target.value)
              }
              className={modalInputClass}
            >
              <option>Order Dispatch</option>
              <option>Damage</option>
              <option>Internal Use</option>
              <option>Supplier Return</option>
              <option>Sample Issue</option>
              <option>Other</option>
            </select>
          </ModalField>

          <ModalField label="Reference">
            <input
              value={reference}
              onChange={(event) =>
                setReference(event.target.value)
              }
              placeholder="ORD-10483"
              className={modalInputClass}
            />
          </ModalField>
        </div>

        <ModalField label="Notes">
          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={4}
            placeholder="Add dispatch or issue notes..."
            className={modalTextareaClass}
          />
        </ModalField>

        {error && (
          <FormErrorMessage message={error} />
        )}
      </div>

      <ModalFooter
        submitLabel="Confirm Stock Out"
        submitIcon={PackageMinus}
        onCancel={onClose}
        danger
      />
    </form>
  );
}

function StockTransferForm({
  inventory,
  warehouses,
  setInventory,
  setMovements,
  onClose,
}: {
  inventory: InventoryItem[];
  warehouses: WarehouseRecord[];
  setInventory: React.Dispatch<
    React.SetStateAction<InventoryItem[]>
  >;
  setMovements: React.Dispatch<
    React.SetStateAction<StockMovement[]>
  >;
  onClose: () => void;
}) {
  const [itemId, setItemId] = useState("");
  const [destination, setDestination] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const selected = inventory.find(
    (item) => item.id === Number(itemId),
  );

  const destinationWarehouses = warehouses.filter(
    (warehouse) =>
      warehouse.name !== selected?.warehouse,
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!selected || !destination) {
      return;
    }

    const transferQuantity = Math.max(
      0,
      Number(quantity),
    );

    if (transferQuantity <= 0) {
      setError("Transfer quantity must be greater than zero.");
      return;
    }

    if (transferQuantity > selected.currentStock) {
      setError(
        `Only ${selected.currentStock} units are available for transfer.`,
      );
      return;
    }

    setInventory((current) =>
      current.map((item) => {
        if (item.id !== selected.id) {
          return item;
        }

        const remainingStock =
          item.currentStock - transferQuantity;

        return {
          ...item,
          currentStock: remainingStock,
          status: calculateInventoryStatus(
            remainingStock,
            item.reorderLevel,
            item.maximumStock,
          ),
          lastUpdated: "Just now",
        };
      }),
    );

    setMovements((current) => [
      {
        id: generateMovementId(current.length),
        date: "Just now",
        type: "Transfer",
        sku: selected.sku,
        productName: selected.productName,
        warehouse: `${selected.warehouse} → ${destination}`,
        quantity: transferQuantity,
        reference:
          reference.trim() ||
          `TRF-${Date.now().toString().slice(-6)}`,
        performedBy: "Founder",
        notes:
          notes.trim() ||
          `Stock transferred to ${destination}.`,
      },
      ...current,
    ]);

    onClose();
  }

  return (
    <form onSubmit={submit} className="p-6 sm:p-8">
      <div className="space-y-5">
        <ModalField label="Inventory Item" required>
          <select
            required
            value={itemId}
            onChange={(event) => {
              setItemId(event.target.value);
              setDestination("");
              setError("");
            }}
            className={modalInputClass}
          >
            <option value="">Select product</option>

            {inventory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.productName} — {item.warehouse}
              </option>
            ))}
          </select>
        </ModalField>

        {selected && (
          <SelectedInventoryPreview item={selected} />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <ModalField label="Source Warehouse">
            <input
              readOnly
              value={selected?.warehouse || ""}
              placeholder="Select inventory item"
              className={`${modalInputClass} bg-slate-100 text-slate-500`}
            />
          </ModalField>

          <ModalField
            label="Destination Warehouse"
            required
          >
            <select
              required
              value={destination}
              onChange={(event) =>
                setDestination(event.target.value)
              }
              className={modalInputClass}
            >
              <option value="">
                Select destination
              </option>

              {destinationWarehouses.map((warehouse) => (
                <option
                  key={warehouse.id}
                  value={warehouse.name}
                >
                  {warehouse.name}
                </option>
              ))}
            </select>
          </ModalField>

          <ModalField
            label="Transfer Quantity"
            required
          >
            <input
              required
              type="number"
              min="1"
              max={selected?.currentStock}
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value);
                setError("");
              }}
              placeholder="Enter quantity"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Transfer Reference">
            <input
              value={reference}
              onChange={(event) =>
                setReference(event.target.value)
              }
              placeholder="TRF-2026-0092"
              className={modalInputClass}
            />
          </ModalField>
        </div>

        <ModalField label="Transfer Notes">
          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={4}
            placeholder="Reason or instructions for transfer..."
            className={modalTextareaClass}
          />
        </ModalField>

        {error && (
          <FormErrorMessage message={error} />
        )}
      </div>

      <ModalFooter
        submitLabel="Confirm Transfer"
        submitIcon={Truck}
        onCancel={onClose}
      />
    </form>
  );
}

function StockAdjustmentForm({
  inventory,
  setInventory,
  setMovements,
  onClose,
}: {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<
    React.SetStateAction<InventoryItem[]>
  >;
  setMovements: React.Dispatch<
    React.SetStateAction<StockMovement[]>
  >;
  onClose: () => void;
}) {
  const [itemId, setItemId] = useState("");
  const [countedStock, setCountedStock] =
    useState("");
  const [reason, setReason] =
    useState("Physical Count Correction");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  const selected = inventory.find(
    (item) => item.id === Number(itemId),
  );

  const difference = selected
    ? Number(countedStock || selected.currentStock) -
      selected.currentStock
    : 0;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selected) {
      return;
    }

    const newStock = Math.max(0, Number(countedStock));

    setInventory((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              currentStock: newStock,
              reservedStock: Math.min(
                item.reservedStock,
                newStock,
              ),
              status: calculateInventoryStatus(
                newStock,
                item.reorderLevel,
                item.maximumStock,
              ),
              lastUpdated: "Just now",
            }
          : item,
      ),
    );

    setMovements((current) => [
      {
        id: generateMovementId(current.length),
        date: "Just now",
        type: "Adjustment",
        sku: selected.sku,
        productName: selected.productName,
        warehouse: selected.warehouse,
        quantity: Math.abs(
          newStock - selected.currentStock,
        ),
        reference:
          reference.trim() ||
          `ADJ-${Date.now().toString().slice(-6)}`,
        performedBy: "Founder",
        notes:
          notes.trim() ||
          `${reason}. Stock changed from ${selected.currentStock} to ${newStock}.`,
      },
      ...current,
    ]);

    onClose();
  }

  return (
    <form onSubmit={submit} className="p-6 sm:p-8">
      <div className="space-y-5">
        <ModalField label="Inventory Item" required>
          <select
            required
            value={itemId}
            onChange={(event) => {
              const value = event.target.value;
              setItemId(value);

              const item = inventory.find(
                (record) =>
                  record.id === Number(value),
              );

              setCountedStock(
                item ? String(item.currentStock) : "",
              );
            }}
            className={modalInputClass}
          >
            <option value="">Select product</option>

            {inventory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.productName} — {item.sku}
              </option>
            ))}
          </select>
        </ModalField>

        {selected && (
          <SelectedInventoryPreview item={selected} />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <ModalField label="System Stock">
            <input
              readOnly
              value={selected?.currentStock ?? ""}
              className={`${modalInputClass} bg-slate-100`}
            />
          </ModalField>

          <ModalField
            label="Physical Counted Stock"
            required
          >
            <input
              required
              type="number"
              min="0"
              value={countedStock}
              onChange={(event) =>
                setCountedStock(event.target.value)
              }
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Adjustment Reason" required>
            <select
              value={reason}
              onChange={(event) =>
                setReason(event.target.value)
              }
              className={modalInputClass}
            >
              <option>Physical Count Correction</option>
              <option>Damaged Inventory</option>
              <option>Expired Inventory</option>
              <option>Lost Inventory</option>
              <option>Data Entry Correction</option>
              <option>Returned Inventory</option>
              <option>Other</option>
            </select>
          </ModalField>

          <ModalField label="Reference">
            <input
              value={reference}
              onChange={(event) =>
                setReference(event.target.value)
              }
              placeholder="COUNT-2026-008"
              className={modalInputClass}
            />
          </ModalField>
        </div>

        {selected && countedStock !== "" && (
          <div
            className={`rounded-2xl border p-4 ${
              difference === 0
                ? "border-green-200 bg-green-50"
                : difference > 0
                  ? "border-blue-200 bg-blue-50"
                  : "border-orange-200 bg-orange-50"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Adjustment Difference
            </span>

            <strong
              className={`mt-2 block text-xl ${
                difference === 0
                  ? "text-green-700"
                  : difference > 0
                    ? "text-blue-700"
                    : "text-orange-700"
              }`}
            >
              {difference > 0 ? "+" : ""}
              {difference} units
            </strong>
          </div>
        )}

        <ModalField label="Adjustment Notes">
          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={4}
            placeholder="Explain the adjustment..."
            className={modalTextareaClass}
          />
        </ModalField>
      </div>

      <ModalFooter
        submitLabel="Apply Adjustment"
        submitIcon={SlidersHorizontal}
        onCancel={onClose}
      />
    </form>
  );
}

function PurchaseOrderForm({
  warehouses,
  suppliers,
  setPurchaseOrders,
  onClose,
}: {
  warehouses: WarehouseRecord[];
  suppliers: Supplier[];
  setPurchaseOrders: React.Dispatch<
    React.SetStateAction<PurchaseOrder[]>
  >;
  onClose: () => void;
}) {
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState(
    warehouses[0]?.name || "",
  );
  const [expectedDate, setExpectedDate] =
    useState("");
  const [items, setItems] = useState("1");
  const [quantity, setQuantity] = useState("");
  const [totalAmount, setTotalAmount] =
    useState("");
  const [status, setStatus] =
    useState<PurchaseOrderStatus>("Draft");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const order: PurchaseOrder = {
      id: `PO-2026-${String(Date.now()).slice(-4)}`,
      supplier,
      orderDate: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
      expectedDate: expectedDate
        ? new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(new Date(expectedDate))
        : "Not Assigned",
      items: Math.max(1, Number(items)),
      quantity: Math.max(1, Number(quantity)),
      totalAmount: Math.max(0, Number(totalAmount)),
      warehouse,
      status,
    };

    setPurchaseOrders((current) => [
      order,
      ...current,
    ]);

    onClose();
  }

  return (
    <form onSubmit={submit} className="p-6 sm:p-8">
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <ModalField label="Supplier" required>
            <select
              required
              value={supplier}
              onChange={(event) =>
                setSupplier(event.target.value)
              }
              className={modalInputClass}
            >
              <option value="">Select supplier</option>

              {suppliers
                .filter(
                  (record) => record.status === "Active",
                )
                .map((record) => (
                  <option
                    key={record.id}
                    value={record.name}
                  >
                    {record.name}
                  </option>
                ))}
            </select>
          </ModalField>

          <ModalField
            label="Receiving Warehouse"
            required
          >
            <select
              required
              value={warehouse}
              onChange={(event) =>
                setWarehouse(event.target.value)
              }
              className={modalInputClass}
            >
              {warehouses.map((record) => (
                <option
                  key={record.id}
                  value={record.name}
                >
                  {record.name}
                </option>
              ))}
            </select>
          </ModalField>

          <ModalField
            label="Expected Delivery Date"
            required
          >
            <input
              required
              type="date"
              value={expectedDate}
              onChange={(event) =>
                setExpectedDate(event.target.value)
              }
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Order Status">
            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as PurchaseOrderStatus,
                )
              }
              className={modalInputClass}
            >
              <option value="Draft">Draft</option>
              <option value="Pending Approval">
                Pending Approval
              </option>
              <option value="Approved">Approved</option>
            </select>
          </ModalField>

          <ModalField
            label="Number of Product Lines"
            required
          >
            <input
              required
              type="number"
              min="1"
              value={items}
              onChange={(event) =>
                setItems(event.target.value)
              }
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Total Quantity" required>
            <input
              required
              type="number"
              min="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(event.target.value)
              }
              placeholder="Enter total units"
              className={modalInputClass}
            />
          </ModalField>

          <ModalField label="Total Order Amount" required>
            <CurrencyInputWrapper>
              <input
                required
                type="number"
                min="0"
                value={totalAmount}
                onChange={(event) =>
                  setTotalAmount(event.target.value)
                }
                placeholder="0"
                className={currencyInputClass}
              />
            </CurrencyInputWrapper>
          </ModalField>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <strong className="block text-sm text-blue-900">
                Purchase Approval Control
              </strong>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                Orders created as pending approval will appear
                in the founder approval queue before being
                released to the supplier.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ModalFooter
        submitLabel="Create Purchase Order"
        submitIcon={ShoppingCart}
        onCancel={onClose}
      />
    </form>
  );
}

function InventoryItemDetails({
  item,
  onClose,
}: {
  item: InventoryItem;
  onClose: () => void;
}) {
  const availableStock = Math.max(
    0,
    item.currentStock - item.reservedStock,
  );

  const inventoryValue =
    item.currentStock * item.unitCost;

  const retailValue =
    item.currentStock * item.sellingPrice;

  const potentialMargin =
    retailValue - inventoryValue;

  const stockPercentage = Math.min(
    100,
    (item.currentStock /
      Math.max(item.maximumStock, 1)) *
      100,
  );

  return (
    <div className="p-6 sm:p-8">
      <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <article className="rounded-3xl bg-slate-950 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/10 text-2xl font-black">
              {item.imageCode}
            </div>

            <InventoryStatusBadge status={item.status} />
          </div>

          <h2 className="mt-6 text-xl font-black">
            {item.productName}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {item.variant}
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="text-xs font-semibold text-slate-400">
              Stock Keeping Unit
            </span>

            <strong className="mt-2 block font-mono text-sm text-blue-300">
              {item.sku}
            </strong>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="text-xs font-semibold text-slate-400">
              Warehouse Location
            </span>

            <strong className="mt-2 block text-sm">
              {item.warehouse}
            </strong>

            <span className="mt-1 block text-xs text-slate-400">
              Rack / Bin: {item.location}
            </span>
          </div>
        </article>

        <article>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DetailMetric
              label="Current Stock"
              value={`${item.currentStock}`}
              description="Physical units"
              tone="blue"
            />

            <DetailMetric
              label="Available"
              value={`${availableStock}`}
              description="Ready for orders"
              tone="green"
            />

            <DetailMetric
              label="Reserved"
              value={`${item.reservedStock}`}
              description="Allocated units"
              tone="orange"
            />

            <DetailMetric
              label="Incoming"
              value={`${item.incomingStock}`}
              description="Expected units"
              tone="violet"
            />
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-950">
                  Stock Level
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Current quantity against configured maximum
                </p>
              </div>

              <strong className="text-sm text-slate-900">
                {stockPercentage.toFixed(1)}%
              </strong>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  item.status === "Out of Stock"
                    ? "bg-red-500"
                    : item.status === "Low Stock"
                      ? "bg-orange-500"
                      : item.status === "Overstock"
                        ? "bg-violet-600"
                        : "bg-green-600"
                }`}
                style={{
                  width: `${stockPercentage}%`,
                }}
              />
            </div>

            <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-slate-500">
              <span>
                Reorder level:{" "}
                <strong className="text-slate-800">
                  {item.reorderLevel}
                </strong>
              </span>

              <span>
                Maximum stock:{" "}
                <strong className="text-slate-800">
                  {item.maximumStock}
                </strong>
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 p-6">
          <h3 className="text-base font-black text-slate-950">
            Product & Procurement
          </h3>

          <div className="mt-5 divide-y divide-slate-100">
            <DetailRow
              label="Category"
              value={item.category}
            />

            <DetailRow
              label="Supplier"
              value={item.supplier}
            />

            <DetailRow
              label="Unit Cost"
              value={formatCurrency(item.unitCost)}
            />

            <DetailRow
              label="Selling Price"
              value={formatCurrency(
                item.sellingPrice,
              )}
            />

            <DetailRow
              label="Last Updated"
              value={item.lastUpdated}
            />
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 p-6">
          <h3 className="text-base font-black text-slate-950">
            Inventory Valuation
          </h3>

          <div className="mt-5 space-y-4">
            <ValuationRow
              label="Cost Inventory Value"
              value={formatCurrency(inventoryValue)}
              icon={IndianRupee}
            />

            <ValuationRow
              label="Potential Retail Value"
              value={formatCurrency(retailValue)}
              icon={CircleDollarSign}
            />

            <ValuationRow
              label="Potential Gross Margin"
              value={formatCurrency(potentialMargin)}
              icon={TrendingUp}
            />
          </div>
        </article>
      </section>

      <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-6 sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Close
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Pencil size={17} />
          Edit Inventory Item
        </button>
      </div>
    </div>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      <div className="mb-5">
        <h3 className="text-base font-black text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function ModalField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </span>

      {children}
    </label>
  );
}

function CurrencyInputWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
        ₹
      </span>

      {children}
    </div>
  );
}

function ModalFooter({
  submitLabel,
  submitIcon: SubmitIcon,
  onCancel,
  danger = false,
}: {
  submitLabel: string;
  submitIcon: IconType;
  onCancel: () => void;
  danger?: boolean;
}) {
  return (
    <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-6 sm:flex-row">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition ${
          danger
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        <SubmitIcon size={17} />
        {submitLabel}
      </button>
    </div>
  );
}

function SelectedInventoryPreview({
  item,
}: {
  item: InventoryItem;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <ProductAvatar code={item.imageCode} />

        <div>
          <strong className="block text-sm text-slate-900">
            {item.productName}
          </strong>

          <span className="mt-1 block text-xs text-slate-500">
            {item.variant} • {item.sku}
          </span>
        </div>
      </div>

      <div className="text-left sm:text-right">
        <span className="block text-xs text-slate-500">
          Current stock
        </span>

        <strong className="mt-1 block text-lg text-blue-700">
          {item.currentStock} units
        </strong>
      </div>
    </div>
  );
}

function MiniStockData({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 text-center">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>

      <strong className="mt-2 block text-lg text-slate-900">
        {value}
      </strong>
    </div>
  );
}

function FormErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
      <AlertTriangle
        size={18}
        className="mt-0.5 shrink-0"
      />

      <span className="text-sm font-semibold">
        {message}
      </span>
    </div>
  );
}

function DetailMetric({
  label,
  value,
  description,
  tone,
}: {
  label: string;
  value: string;
  description: string;
  tone: "blue" | "green" | "orange" | "violet";
}) {
  const className =
    tone === "green"
      ? "bg-green-50 text-green-700"
      : tone === "orange"
        ? "bg-orange-50 text-orange-700"
        : tone === "violet"
          ? "bg-violet-50 text-violet-700"
          : "bg-blue-50 text-blue-700";

  return (
    <div className={`rounded-2xl p-4 ${className}`}>
      <span className="block text-xs font-semibold opacity-75">
        {label}
      </span>

      <strong className="mt-2 block text-2xl">
        {value}
      </strong>

      <span className="mt-1 block text-[11px] opacity-70">
        {description}
      </span>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <strong className="text-right text-sm text-slate-900">
        {value}
      </strong>
    </div>
  );
}

function ValuationRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: IconType;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-blue-600 shadow-sm">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <span className="block text-xs text-slate-500">
          {label}
        </span>

        <strong className="mt-1 block text-base text-slate-950">
          {value}
        </strong>
      </div>
    </div>
  );
}

function calculateInventoryStatus(
  stock: number,
  reorderLevel: number,
  maximumStock: number,
): InventoryStatus {
  if (stock <= 0) {
    return "Out of Stock";
  }

  if (stock <= reorderLevel) {
    return "Low Stock";
  }

  if (stock > maximumStock) {
    return "Overstock";
  }

  return "Healthy";
}

function generateMovementId(
  existingLength: number,
) {
  return `MOV-2026-${1083 + existingLength}`;
}

const modalInputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const currencyInputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const modalTextareaClass =
  "w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";