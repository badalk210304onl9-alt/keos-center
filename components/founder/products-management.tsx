"use client";

import type { ComponentType, FormEvent } from "react";
import { useMemo, useState } from "react";

import {
  AlertTriangle,
  Archive,
  ArrowUpRight,
  BadgeIndianRupee,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Copy,
  Download,
  Edit3,
  Eye,
  FileText,
  Filter,
  ImageIcon,
  IndianRupee,
  Layers3,
  MoreHorizontal,
  Package,
  PackageCheck,
  Plus,
  RefreshCcw,
  Save,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Tags,
  Trash2,
  TrendingUp,
  Upload,
  X,
  XCircle,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ProductStatus = "Active" | "Draft" | "Archived";
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
type ProductTab =
  | "Catalogue"
  | "Collections"
  | "Categories"
  | "Inventory"
  | "Pricing"
  | "SEO";

type Variant = {
  id: string;
  sku: string;
  size: string;
  colour: string;
  stock: number;
  price: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  collection: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number;
  costPrice: number;
  stock: number;
  status: ProductStatus;
  featured: boolean;
  sales: number;
  rating: number;
  image: string;
  tags: string[];
  variants: Variant[];
  seoTitle: string;
  seoDescription: string;
  channels: string[];
  createdAt: string;
  updatedAt: string;
};

type ProductForm = {
  name: string;
  slug: string;
  sku: string;
  category: string;
  collection: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: string;
  compareAtPrice: string;
  costPrice: string;
  stock: string;
  status: ProductStatus;
  featured: boolean;
  tags: string;
  seoTitle: string;
  seoDescription: string;
};

const initialProducts: Product[] = [
  {
    id: "PRD-001",
    name: "KRVE Noir Blazer",
    slug: "krve-noir-blazer",
    sku: "KRV-NB-001",
    category: "Blazers",
    collection: "Noir Collection",
    brand: "KRVE",
    description:
      "A premium tailored blazer designed with a sharp silhouette, luxurious fabric and refined KRVE detailing.",
    shortDescription:
      "Premium tailored black blazer with a luxury structured fit.",
    price: 18999,
    compareAtPrice: 22999,
    costPrice: 8400,
    stock: 42,
    status: "Active",
    featured: true,
    sales: 248,
    rating: 4.8,
    image: "NB",
    tags: ["Luxury", "Blazer", "Black", "Formal"],
    variants: [
      {
        id: "VAR-001",
        sku: "KRV-NB-001-S",
        size: "S",
        colour: "Noir Black",
        stock: 8,
        price: 18999,
      },
      {
        id: "VAR-002",
        sku: "KRV-NB-001-M",
        size: "M",
        colour: "Noir Black",
        stock: 14,
        price: 18999,
      },
      {
        id: "VAR-003",
        sku: "KRV-NB-001-L",
        size: "L",
        colour: "Noir Black",
        stock: 12,
        price: 18999,
      },
      {
        id: "VAR-004",
        sku: "KRV-NB-001-XL",
        size: "XL",
        colour: "Noir Black",
        stock: 8,
        price: 18999,
      },
    ],
    seoTitle: "KRVE Noir Blazer | Premium Luxury Blazer",
    seoDescription:
      "Shop the KRVE Noir Blazer, crafted with a sharp luxury silhouette and premium tailoring.",
    channels: ["Website", "Mobile App"],
    createdAt: "12 Jun 2026",
    updatedAt: "25 Jul 2026",
  },
  {
    id: "PRD-002",
    name: "Obsidian Double-Breasted Suit",
    slug: "obsidian-double-breasted-suit",
    sku: "KRV-OBS-014",
    category: "Suits",
    collection: "Obsidian Collection",
    brand: "KRVE",
    description:
      "A commanding double-breasted suit featuring premium construction, sharp lapels and a structured formal silhouette.",
    shortDescription:
      "Luxury double-breasted formal suit with structured tailoring.",
    price: 18999,
    compareAtPrice: 24999,
    costPrice: 9200,
    stock: 9,
    status: "Active",
    featured: true,
    sales: 184,
    rating: 4.7,
    image: "OS",
    tags: ["Suit", "Formal", "Double Breasted", "Luxury"],
    variants: [
      {
        id: "VAR-005",
        sku: "KRV-OBS-014-M",
        size: "M",
        colour: "Obsidian",
        stock: 2,
        price: 18999,
      },
      {
        id: "VAR-006",
        sku: "KRV-OBS-014-L",
        size: "L",
        colour: "Obsidian",
        stock: 4,
        price: 18999,
      },
      {
        id: "VAR-007",
        sku: "KRV-OBS-014-XL",
        size: "XL",
        colour: "Obsidian",
        stock: 3,
        price: 18999,
      },
    ],
    seoTitle: "Obsidian Double-Breasted Suit | KRVE",
    seoDescription:
      "Discover the KRVE Obsidian Double-Breasted Suit, designed for commanding luxury and refined formal style.",
    channels: ["Website", "Mobile App", "Marketplace"],
    createdAt: "18 Jun 2026",
    updatedAt: "24 Jul 2026",
  },
  {
    id: "PRD-003",
    name: "KRVE Signature Blazer",
    slug: "krve-signature-blazer",
    sku: "KRV-SB-008",
    category: "Blazers",
    collection: "Signature Collection",
    brand: "KRVE",
    description:
      "The KRVE Signature Blazer combines modern tailoring with refined detailing for versatile formal and evening wear.",
    shortDescription:
      "Modern signature blazer with premium KRVE detailing.",
    price: 12999,
    compareAtPrice: 15999,
    costPrice: 5900,
    stock: 24,
    status: "Active",
    featured: true,
    sales: 167,
    rating: 4.6,
    image: "SB",
    tags: ["Signature", "Blazer", "Premium"],
    variants: [
      {
        id: "VAR-008",
        sku: "KRV-SB-008-S",
        size: "S",
        colour: "Midnight Blue",
        stock: 6,
        price: 12999,
      },
      {
        id: "VAR-009",
        sku: "KRV-SB-008-M",
        size: "M",
        colour: "Midnight Blue",
        stock: 8,
        price: 12999,
      },
      {
        id: "VAR-010",
        sku: "KRV-SB-008-L",
        size: "L",
        colour: "Midnight Blue",
        stock: 10,
        price: 12999,
      },
    ],
    seoTitle: "KRVE Signature Blazer | Modern Premium Tailoring",
    seoDescription:
      "Shop the KRVE Signature Blazer with modern tailoring and refined luxury detailing.",
    channels: ["Website", "Mobile App"],
    createdAt: "22 Jun 2026",
    updatedAt: "23 Jul 2026",
  },
  {
    id: "PRD-004",
    name: "KRVE Icon Sneakers",
    slug: "krve-icon-sneakers",
    sku: "KRV-IS-021",
    category: "Footwear",
    collection: "Icon Collection",
    brand: "KRVE",
    description:
      "Minimal luxury sneakers designed for comfort, contemporary styling and everyday premium wear.",
    shortDescription:
      "Minimal premium sneakers for modern everyday luxury.",
    price: 8499,
    compareAtPrice: 9999,
    costPrice: 3700,
    stock: 37,
    status: "Active",
    featured: false,
    sales: 142,
    rating: 4.5,
    image: "IS",
    tags: ["Sneakers", "Footwear", "Casual"],
    variants: [
      {
        id: "VAR-011",
        sku: "KRV-IS-021-7",
        size: "UK 7",
        colour: "White",
        stock: 9,
        price: 8499,
      },
      {
        id: "VAR-012",
        sku: "KRV-IS-021-8",
        size: "UK 8",
        colour: "White",
        stock: 13,
        price: 8499,
      },
      {
        id: "VAR-013",
        sku: "KRV-IS-021-9",
        size: "UK 9",
        colour: "White",
        stock: 10,
        price: 8499,
      },
      {
        id: "VAR-014",
        sku: "KRV-IS-021-10",
        size: "UK 10",
        colour: "White",
        stock: 5,
        price: 8499,
      },
    ],
    seoTitle: "KRVE Icon Sneakers | Premium Minimal Footwear",
    seoDescription:
      "Discover KRVE Icon Sneakers, designed for premium everyday comfort and modern minimal style.",
    channels: ["Website", "Mobile App"],
    createdAt: "28 Jun 2026",
    updatedAt: "22 Jul 2026",
  },
  {
    id: "PRD-005",
    name: "Midnight Essential Shirt",
    slug: "midnight-essential-shirt",
    sku: "KRV-MES-032",
    category: "Shirts",
    collection: "Essential Collection",
    brand: "KRVE",
    description:
      "A refined essential shirt crafted for comfort, versatility and effortless premium styling.",
    shortDescription:
      "Refined premium shirt for versatile formal and evening styling.",
    price: 6499,
    compareAtPrice: 7999,
    costPrice: 2600,
    stock: 6,
    status: "Active",
    featured: false,
    sales: 126,
    rating: 4.4,
    image: "MS",
    tags: ["Shirt", "Essential", "Formal"],
    variants: [
      {
        id: "VAR-015",
        sku: "KRV-MES-032-S",
        size: "S",
        colour: "Midnight",
        stock: 1,
        price: 6499,
      },
      {
        id: "VAR-016",
        sku: "KRV-MES-032-M",
        size: "M",
        colour: "Midnight",
        stock: 2,
        price: 6499,
      },
      {
        id: "VAR-017",
        sku: "KRV-MES-032-L",
        size: "L",
        colour: "Midnight",
        stock: 3,
        price: 6499,
      },
    ],
    seoTitle: "Midnight Essential Shirt | KRVE",
    seoDescription:
      "Shop the KRVE Midnight Essential Shirt for refined premium formal and evening styling.",
    channels: ["Website"],
    createdAt: "02 Jul 2026",
    updatedAt: "24 Jul 2026",
  },
  {
    id: "PRD-006",
    name: "KRVE Tailored Trousers",
    slug: "krve-tailored-trousers",
    sku: "KRV-TT-047",
    category: "Trousers",
    collection: "Tailored Essentials",
    brand: "KRVE",
    description:
      "Premium tailored trousers featuring a clean silhouette, structured construction and refined finish.",
    shortDescription:
      "Premium tailored trousers with a clean modern silhouette.",
    price: 9999,
    compareAtPrice: 11999,
    costPrice: 4300,
    stock: 0,
    status: "Draft",
    featured: false,
    sales: 58,
    rating: 4.3,
    image: "TT",
    tags: ["Trousers", "Tailored", "Formal"],
    variants: [
      {
        id: "VAR-018",
        sku: "KRV-TT-047-30",
        size: "30",
        colour: "Charcoal",
        stock: 0,
        price: 9999,
      },
      {
        id: "VAR-019",
        sku: "KRV-TT-047-32",
        size: "32",
        colour: "Charcoal",
        stock: 0,
        price: 9999,
      },
    ],
    seoTitle: "KRVE Tailored Trousers | Premium Formal Trousers",
    seoDescription:
      "Discover KRVE Tailored Trousers with a clean silhouette and premium formal construction.",
    channels: [],
    createdAt: "08 Jul 2026",
    updatedAt: "21 Jul 2026",
  },
  {
    id: "PRD-007",
    name: "Heritage Leather Belt",
    slug: "heritage-leather-belt",
    sku: "KRV-HLB-052",
    category: "Accessories",
    collection: "Heritage Accessories",
    brand: "KRVE",
    description:
      "A premium leather belt with refined hardware and timeless KRVE craftsmanship.",
    shortDescription:
      "Premium leather belt with refined luxury hardware.",
    price: 4999,
    compareAtPrice: 5999,
    costPrice: 1800,
    stock: 31,
    status: "Archived",
    featured: false,
    sales: 74,
    rating: 4.5,
    image: "HB",
    tags: ["Leather", "Belt", "Accessory"],
    variants: [
      {
        id: "VAR-020",
        sku: "KRV-HLB-052-M",
        size: "M",
        colour: "Black",
        stock: 15,
        price: 4999,
      },
      {
        id: "VAR-021",
        sku: "KRV-HLB-052-L",
        size: "L",
        colour: "Black",
        stock: 16,
        price: 4999,
      },
    ],
    seoTitle: "KRVE Heritage Leather Belt",
    seoDescription:
      "Premium KRVE leather belt featuring refined hardware and timeless craftsmanship.",
    channels: [],
    createdAt: "12 Jul 2026",
    updatedAt: "20 Jul 2026",
  },
];

const emptyForm: ProductForm = {
  name: "",
  slug: "",
  sku: "",
  category: "Blazers",
  collection: "Signature Collection",
  brand: "KRVE",
  description: "",
  shortDescription: "",
  price: "",
  compareAtPrice: "",
  costPrice: "",
  stock: "",
  status: "Draft",
  featured: false,
  tags: "",
  seoTitle: "",
  seoDescription: "",
};

const productTabs: {
  id: ProductTab;
  name: string;
  icon: IconType;
}[] = [
  {
    id: "Catalogue",
    name: "Product Catalogue",
    icon: Package,
  },
  {
    id: "Collections",
    name: "Collections",
    icon: Layers3,
  },
  {
    id: "Categories",
    name: "Categories",
    icon: Tags,
  },
  {
    id: "Inventory",
    name: "Product Inventory",
    icon: Boxes,
  },
  {
    id: "Pricing",
    name: "Pricing",
    icon: BadgeIndianRupee,
  },
  {
    id: "SEO",
    name: "SEO & Publishing",
    icon: Sparkles,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) {
    return "Out of Stock";
  }

  if (stock <= 10) {
    return "Low Stock";
  }

  return "In Stock";
}

function getStatusClasses(status: ProductStatus) {
  if (status === "Active") {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (status === "Archived") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-orange-200 bg-orange-50 text-orange-700";
}

function getStockClasses(stock: number) {
  const status = getStockStatus(stock);

  if (status === "In Stock") {
    return "bg-green-50 text-green-700";
  }

  if (status === "Low Stock") {
    return "bg-orange-50 text-orange-700";
  }

  return "bg-red-50 text-red-700";
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductsManagement() {
  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  const [activeTab, setActiveTab] =
    useState<ProductTab>("Catalogue");

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] =
    useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProductId, setSelectedProductId] =
    useState<string | null>(null);

  const [selectedRows, setSelectedRows] = useState<string[]>(
    [],
  );

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProductId, setEditingProductId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState<ProductForm>(emptyForm);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(products.map((product) => product.category)),
      ),
    [products],
  );

  const collections = useMemo(
    () =>
      Array.from(
        new Set(products.map((product) => product.collection)),
      ),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const statusMatch =
        statusFilter === "All" ||
        product.status === statusFilter;

      const categoryMatch =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const stockStatus = getStockStatus(product.stock);

      const stockMatch =
        stockFilter === "All" ||
        stockStatus === stockFilter;

      const queryMatch =
        !query ||
        `${product.name} ${product.sku} ${product.category} ${product.collection} ${product.tags.join(
          " ",
        )}`
          .toLowerCase()
          .includes(query);

      return (
        statusMatch &&
        categoryMatch &&
        stockMatch &&
        queryMatch
      );
    });
  }, [
    categoryFilter,
    products,
    searchQuery,
    statusFilter,
    stockFilter,
  ]);

  const selectedProduct =
    products.find(
      (product) => product.id === selectedProductId,
    ) ?? null;

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;

  const draftProducts = products.filter(
    (product) => product.status === "Draft",
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 && product.stock <= 10,
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0,
  ).length;

  const totalInventory = products.reduce(
    (total, product) => total + product.stock,
    0,
  );

  const inventoryValue = products.reduce(
    (total, product) =>
      total + product.costPrice * product.stock,
    0,
  );

  function openCreateProduct() {
    setEditingProductId(null);
    setForm(emptyForm);
    setEditorOpen(true);
  }

  function openEditProduct(product: Product) {
    setEditingProductId(product.id);

    setForm({
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      category: product.category,
      collection: product.collection,
      brand: product.brand,
      description: product.description,
      shortDescription: product.shortDescription,
      price: String(product.price),
      compareAtPrice: String(product.compareAtPrice),
      costPrice: String(product.costPrice),
      stock: String(product.stock),
      status: product.status,
      featured: product.featured,
      tags: product.tags.join(", "),
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
    });

    setEditorOpen(true);
  }

  function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const price = Number(form.price);
    const compareAtPrice = Number(form.compareAtPrice);
    const costPrice = Number(form.costPrice);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.sku.trim() ||
      Number.isNaN(price)
    ) {
      return;
    }

    if (editingProductId) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProductId
            ? {
                ...product,
                name: form.name,
                slug:
                  form.slug.trim() ||
                  createSlug(form.name),
                sku: form.sku,
                category: form.category,
                collection: form.collection,
                brand: form.brand,
                description: form.description,
                shortDescription:
                  form.shortDescription,
                price,
                compareAtPrice,
                costPrice,
                stock,
                status: form.status,
                featured: form.featured,
                tags: form.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
                seoTitle: form.seoTitle,
                seoDescription:
                  form.seoDescription,
                updatedAt: new Date().toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                ),
              }
            : product,
        ),
      );
    } else {
      const newProduct: Product = {
        id: `PRD-${String(products.length + 1).padStart(
          3,
          "0",
        )}`,
        name: form.name,
        slug:
          form.slug.trim() || createSlug(form.name),
        sku: form.sku,
        category: form.category,
        collection: form.collection,
        brand: form.brand,
        description: form.description,
        shortDescription: form.shortDescription,
        price,
        compareAtPrice,
        costPrice,
        stock,
        status: form.status,
        featured: form.featured,
        sales: 0,
        rating: 0,
        image: form.name
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        variants: [
          {
            id: `VAR-${Date.now()}`,
            sku: form.sku,
            size: "Default",
            colour: "Default",
            stock,
            price,
          },
        ],
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        channels:
          form.status === "Active"
            ? ["Website"]
            : [],
        createdAt: new Date().toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          },
        ),
        updatedAt: new Date().toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          },
        ),
      };

      setProducts((current) => [
        newProduct,
        ...current,
      ]);
    }

    setEditorOpen(false);
    setEditingProductId(null);
    setForm(emptyForm);
  }

  function duplicateProduct(product: Product) {
    const copyProduct: Product = {
      ...product,
      id: `PRD-${Date.now().toString().slice(-6)}`,
      name: `${product.name} Copy`,
      slug: `${product.slug}-copy`,
      sku: `${product.sku}-COPY`,
      status: "Draft",
      featured: false,
      sales: 0,
      channels: [],
      createdAt: new Date().toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        },
      ),
      updatedAt: new Date().toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        },
      ),
    };

    setProducts((current) => [
      copyProduct,
      ...current,
    ]);
  }

  function deleteProduct(productId: string) {
    setProducts((current) =>
      current.filter(
        (product) => product.id !== productId,
      ),
    );

    setSelectedRows((current) =>
      current.filter((id) => id !== productId),
    );

    if (selectedProductId === productId) {
      setSelectedProductId(null);
    }
  }

  function updateProductStatus(
    productId: string,
    status: ProductStatus,
  ) {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              status,
              channels:
                status === "Active"
                  ? product.channels.length > 0
                    ? product.channels
                    : ["Website"]
                  : [],
            }
          : product,
      ),
    );
  }

  function toggleFeatured(productId: string) {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              featured: !product.featured,
            }
          : product,
      ),
    );
  }

  function toggleSelected(productId: string) {
    setSelectedRows((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  function toggleAllVisible() {
    const ids = filteredProducts.map(
      (product) => product.id,
    );

    const allSelected =
      ids.length > 0 &&
      ids.every((id) => selectedRows.includes(id));

    if (allSelected) {
      setSelectedRows((current) =>
        current.filter((id) => !ids.includes(id)),
      );
    } else {
      setSelectedRows((current) =>
        Array.from(new Set([...current, ...ids])),
      );
    }
  }

  function bulkUpdateStatus(status: ProductStatus) {
    setProducts((current) =>
      current.map((product) =>
        selectedRows.includes(product.id)
          ? {
              ...product,
              status,
              channels:
                status === "Active"
                  ? product.channels.length > 0
                    ? product.channels
                    : ["Website"]
                  : [],
            }
          : product,
      ),
    );

    setSelectedRows([]);
  }

  function refreshProducts() {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  }

  function exportProducts() {
    const rows = [
      [
        "Product ID",
        "Name",
        "SKU",
        "Category",
        "Collection",
        "Price",
        "MRP",
        "Cost",
        "Stock",
        "Status",
        "Featured",
        "Sales",
      ],
      ...filteredProducts.map((product) => [
        product.id,
        product.name,
        product.sku,
        product.category,
        product.collection,
        formatCurrency(product.price),
        formatCurrency(product.compareAtPrice),
        formatCurrency(product.costPrice),
        product.stock,
        product.status,
        product.featured ? "Yes" : "No",
        product.sales,
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
    anchor.download = "keos-products-catalogue.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 p-7 text-white shadow-xl shadow-blue-900/10 sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              <Package size={16} />
              Product Commerce Center
            </div>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              Product Management
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              Manage the complete KRVE product catalogue,
              variants, categories, collections, pricing,
              inventory, publishing channels and search
              visibility.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={refreshProducts}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20"
            >
              <RefreshCcw
                size={17}
                className={
                  isRefreshing ? "animate-spin" : ""
                }
              />

              {isRefreshing
                ? "Synchronizing..."
                : "Sync Products"}
            </button>

            <button
              type="button"
              onClick={exportProducts}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20"
            >
              <Download size={17} />
              Export
            </button>

            <button
              type="button"
              onClick={openCreateProduct}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
        <SummaryCard
          title="Total Products"
          value={String(products.length)}
          description="Complete catalogue"
          icon={Package}
          tone="blue"
        />

        <SummaryCard
          title="Active"
          value={String(activeProducts)}
          description="Published products"
          icon={CheckCircle2}
          tone="green"
        />

        <SummaryCard
          title="Drafts"
          value={String(draftProducts)}
          description="Not yet published"
          icon={FileText}
          tone="orange"
        />

        <SummaryCard
          title="Low Stock"
          value={String(lowStockProducts)}
          description="Reorder required"
          icon={AlertTriangle}
          tone="red"
        />

        <SummaryCard
          title="Out of Stock"
          value={String(outOfStockProducts)}
          description="Unavailable products"
          icon={XCircle}
          tone="violet"
        />

        <SummaryCard
          title="Inventory Value"
          value={formatCurrency(inventoryValue)}
          description={`${totalInventory} units available`}
          icon={IndianRupee}
          tone="blue"
        />
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {productTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={17} />
                {tab.name}
              </button>
            );
          })}
        </div>
      </section>

      {activeTab === "Catalogue" && (
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
              <div className="flex flex-wrap gap-2">
                {["All", "Active", "Draft", "Archived"].map(
                  (status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() =>
                        setStatusFilter(status)
                      }
                      className={`rounded-xl px-4 py-2.5 text-xs font-bold ${
                        statusFilter === status
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {status}
                    </button>
                  ),
                )}
              </div>

              <div className="flex h-11 min-w-[300px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <Search
                  size={17}
                  className="text-slate-400"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search product, SKU, category or tag..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                  >
                    <X
                      size={15}
                      className="text-slate-400"
                    />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-wrap gap-3">
                <FilterSelect
                  icon={Tags}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  options={[
                    ["All", "All Categories"],
                    ...categories.map(
                      (category) =>
                        [category, category] as [
                          string,
                          string,
                        ],
                    ),
                  ]}
                />

                <FilterSelect
                  icon={Boxes}
                  value={stockFilter}
                  onChange={setStockFilter}
                  options={[
                    ["All", "All Stock Levels"],
                    ["In Stock", "In Stock"],
                    ["Low Stock", "Low Stock"],
                    ["Out of Stock", "Out of Stock"],
                  ]}
                />
              </div>

              {selectedRows.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3">
                  <span className="text-xs font-bold text-blue-800">
                    {selectedRows.length} selected
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      bulkUpdateStatus("Active")
                    }
                    className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white"
                  >
                    Publish
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      bulkUpdateStatus("Draft")
                    }
                    className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white"
                  >
                    Draft
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      bulkUpdateStatus("Archived")
                    }
                    className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white"
                  >
                    Archive
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRows([])}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1380px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={
                        filteredProducts.length > 0 &&
                        filteredProducts.every(
                          (product) =>
                            selectedRows.includes(
                              product.id,
                            ),
                        )
                      }
                      onChange={toggleAllVisible}
                      className="h-4 w-4 accent-blue-600"
                    />
                  </th>

                  <th className="px-4 py-4">
                    Product
                  </th>

                  <th className="px-4 py-4">
                    Category
                  </th>

                  <th className="px-4 py-4">Price</th>

                  <th className="px-4 py-4">
                    Cost & Margin
                  </th>

                  <th className="px-4 py-4">Stock</th>

                  <th className="px-4 py-4">
                    Variants
                  </th>

                  <th className="px-4 py-4">Sales</th>

                  <th className="px-4 py-4">
                    Status
                  </th>

                  <th className="px-4 py-4">
                    Channels
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => {
                  const margin =
                    product.price > 0
                      ? Math.round(
                          ((product.price -
                            product.costPrice) /
                            product.price) *
                            100,
                        )
                      : 0;

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-slate-100 text-sm hover:bg-slate-50"
                    >
                      <td className="px-5 py-5">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(
                            product.id,
                          )}
                          onChange={() =>
                            toggleSelected(product.id)
                          }
                          className="h-4 w-4 accent-blue-600"
                        />
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-100 to-slate-100 font-black text-blue-700">
                            {product.image}

                            {product.featured && (
                              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-white">
                                <Star
                                  size={11}
                                  fill="currentColor"
                                />
                              </span>
                            )}
                          </div>

                          <div className="max-w-[260px]">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedProductId(
                                  product.id,
                                )
                              }
                              className="block text-left font-black text-slate-900 hover:text-blue-600"
                            >
                              {product.name}
                            </button>

                            <span className="mt-1 block text-[10px] font-semibold text-blue-600">
                              {product.sku}
                            </span>

                            <span className="mt-1 block truncate text-[10px] text-slate-400">
                              /products/{product.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-5">
                        <strong className="block text-xs">
                          {product.category}
                        </strong>

                        <span className="mt-1 block text-[10px] text-slate-500">
                          {product.collection}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <strong className="block">
                          {formatCurrency(
                            product.price,
                          )}
                        </strong>

                        <span className="mt-1 block text-[10px] text-slate-400 line-through">
                          {formatCurrency(
                            product.compareAtPrice,
                          )}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <span className="block text-xs text-slate-500">
                          Cost:{" "}
                          {formatCurrency(
                            product.costPrice,
                          )}
                        </span>

                        <strong className="mt-1 block text-xs text-green-600">
                          {margin}% margin
                        </strong>
                      </td>

                      <td className="px-4 py-5">
                        <strong className="block text-sm">
                          {product.stock} units
                        </strong>

                        <span
                          className={`mt-2 inline-block rounded-full px-2 py-1 text-[10px] font-bold ${getStockClasses(
                            product.stock,
                          )}`}
                        >
                          {getStockStatus(
                            product.stock,
                          )}
                        </span>
                      </td>

                      <td className="px-4 py-5 font-bold">
                        {product.variants.length}
                      </td>

                      <td className="px-4 py-5">
                        <strong className="block">
                          {product.sales}
                        </strong>

                        <span className="mt-1 flex items-center gap-1 text-[10px] text-orange-600">
                          <Star
                            size={11}
                            fill="currentColor"
                          />
                          {product.rating}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <select
                          value={product.status}
                          onChange={(event) =>
                            updateProductStatus(
                              product.id,
                              event.target
                                .value as ProductStatus,
                            )
                          }
                          className={`rounded-full border px-3 py-1 text-[10px] font-bold outline-none ${getStatusClasses(
                            product.status,
                          )}`}
                        >
                          <option value="Active">
                            Active
                          </option>

                          <option value="Draft">
                            Draft
                          </option>

                          <option value="Archived">
                            Archived
                          </option>
                        </select>
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex flex-wrap gap-1">
                          {product.channels.length >
                          0 ? (
                            product.channels.map(
                              (channel) => (
                                <span
                                  key={channel}
                                  className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-700"
                                >
                                  {channel}
                                </span>
                              ),
                            )
                          ) : (
                            <span className="text-xs text-slate-400">
                              Not published
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedProductId(
                                product.id,
                              )
                            }
                            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                            aria-label="View product"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditProduct(product)
                            }
                            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                            aria-label="Edit product"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              duplicateProduct(product)
                            }
                            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
                            aria-label="Duplicate product"
                          >
                            <Copy size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteProduct(product.id)
                            }
                            className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                            aria-label="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <Package
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-bold text-slate-800">
                  No products found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Change the selected filters or search
                  query.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-200 px-6 py-4 text-xs text-slate-500 sm:flex-row">
            <span>
              Showing {filteredProducts.length} of{" "}
              {products.length} products
            </span>

            <span>
              {totalInventory} total inventory units
            </span>
          </div>
        </section>
      )}

      {activeTab === "Collections" && (
        <CollectionsWorkspace
          products={products}
          collections={collections}
        />
      )}

      {activeTab === "Categories" && (
        <CategoriesWorkspace
          products={products}
          categories={categories}
        />
      )}

      {activeTab === "Inventory" && (
        <InventoryWorkspace products={products} />
      )}

      {activeTab === "Pricing" && (
        <PricingWorkspace products={products} />
      )}

      {activeTab === "SEO" && (
        <SeoWorkspace products={products} />
      )}

      {selectedProduct && (
        <ProductDetailsPanel
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
          onEdit={() => {
            openEditProduct(selectedProduct);
            setSelectedProductId(null);
          }}
          onToggleFeatured={() =>
            toggleFeatured(selectedProduct.id)
          }
          onStatusChange={(status) =>
            updateProductStatus(
              selectedProduct.id,
              status,
            )
          }
        />
      )}

      {editorOpen && (
        <ProductEditor
          form={form}
          editing={Boolean(editingProductId)}
          onChange={setForm}
          onClose={() => {
            setEditorOpen(false);
            setEditingProductId(null);
            setForm(emptyForm);
          }}
          onSubmit={saveProduct}
        />
      )}
    </div>
  );
}

function CollectionsWorkspace({
  products,
  collections,
}: {
  products: Product[];
  collections: string[];
}) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">
            Product Collections
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Organize products into customer-facing
            collections.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white"
        >
          <Plus size={16} />
          New Collection
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection, index) => {
          const collectionProducts = products.filter(
            (product) =>
              product.collection === collection,
          );

          const revenue = collectionProducts.reduce(
            (total, product) =>
              total + product.price * product.sales,
            0,
          );

          return (
            <article
              key={collection}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Layers3 size={22} />
                </div>

                <button type="button">
                  <MoreHorizontal
                    size={18}
                    className="text-slate-400"
                  />
                </button>
              </div>

              <h3 className="mt-5 text-lg font-black">
                {collection}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                {collectionProducts.length} products
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-500">
                    Revenue
                  </p>

                  <strong className="mt-1 block text-sm">
                    {formatCurrency(revenue)}
                  </strong>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-500">
                    Status
                  </p>

                  <strong className="mt-1 block text-sm text-green-600">
                    Active
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                Manage Collection
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CategoriesWorkspace({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">
            Product Categories
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage catalogue navigation and product
            classification.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
              <th className="pb-4">Category</th>
              <th className="pb-4">Products</th>
              <th className="pb-4">Inventory</th>
              <th className="pb-4">Revenue</th>
              <th className="pb-4">Status</th>
              <th className="pb-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => {
              const categoryProducts = products.filter(
                (product) =>
                  product.category === category,
              );

              const inventory =
                categoryProducts.reduce(
                  (total, product) =>
                    total + product.stock,
                  0,
                );

              const revenue =
                categoryProducts.reduce(
                  (total, product) =>
                    total +
                    product.price * product.sales,
                  0,
                );

              return (
                <tr
                  key={category}
                  className="border-b border-slate-100 text-sm"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                        <Tags size={18} />
                      </div>

                      <strong>{category}</strong>
                    </div>
                  </td>

                  <td className="py-4 font-bold">
                    {categoryProducts.length}
                  </td>

                  <td className="py-4">
                    {inventory} units
                  </td>

                  <td className="py-4 font-black">
                    {formatCurrency(revenue)}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      Active
                    </span>
                  </td>

                  <td className="py-4 text-right">
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function InventoryWorkspace({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-black">
          Product Inventory
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review product and variant stock levels.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-500">
              <th className="pb-4">Product</th>
              <th className="pb-4">SKU</th>
              <th className="pb-4">Variants</th>
              <th className="pb-4">Available</th>
              <th className="pb-4">Stock Status</th>
              <th className="pb-4">Inventory Cost</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-100 text-sm"
              >
                <td className="py-4 font-bold">
                  {product.name}
                </td>

                <td className="py-4 text-xs text-blue-600">
                  {product.sku}
                </td>

                <td className="py-4">
                  {product.variants.length}
                </td>

                <td className="py-4 font-black">
                  {product.stock}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getStockClasses(
                      product.stock,
                    )}`}
                  >
                    {getStockStatus(product.stock)}
                  </span>
                </td>

                <td className="py-4 font-bold">
                  {formatCurrency(
                    product.costPrice * product.stock,
                  )}
                </td>

                <td className="py-4">
                  <button
                    type="button"
                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"
                  >
                    Adjust Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PricingWorkspace({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="mt-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Average Selling Price"
          value={formatCurrency(
            Math.round(
              products.reduce(
                (total, product) =>
                  total + product.price,
                0,
              ) / Math.max(products.length, 1),
            ),
          )}
          description="Across complete catalogue"
          icon={IndianRupee}
          tone="blue"
        />

        <SummaryCard
          title="Average Margin"
          value={`${Math.round(
            products.reduce(
              (total, product) =>
                total +
                ((product.price -
                  product.costPrice) /
                  product.price) *
                  100,
              0,
            ) / Math.max(products.length, 1),
          )}%`}
          description="Gross product margin"
          icon={TrendingUp}
          tone="green"
        />

        <SummaryCard
          title="Discounted Products"
          value={String(
            products.filter(
              (product) =>
                product.compareAtPrice >
                product.price,
            ).length,
          )}
          description="Products with active discount"
          icon={BadgeIndianRupee}
          tone="orange"
        />

        <SummaryCard
          title="Highest Price"
          value={formatCurrency(
            Math.max(
              ...products.map(
                (product) => product.price,
              ),
            ),
          )}
          description="Highest catalogue price"
          icon={CircleDollarSign}
          tone="red"
        />
      </div>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black">
          Product Pricing
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-500">
                <th className="pb-4">Product</th>
                <th className="pb-4">Cost Price</th>
                <th className="pb-4">Selling Price</th>
                <th className="pb-4">MRP</th>
                <th className="pb-4">Discount</th>
                <th className="pb-4">Margin</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const discount =
                  product.compareAtPrice > 0
                    ? Math.round(
                        ((product.compareAtPrice -
                          product.price) /
                          product.compareAtPrice) *
                          100,
                      )
                    : 0;

                const margin =
                  product.price > 0
                    ? Math.round(
                        ((product.price -
                          product.costPrice) /
                          product.price) *
                          100,
                      )
                    : 0;

                return (
                  <tr
                    key={product.id}
                    className="border-b border-slate-100 text-sm"
                  >
                    <td className="py-4 font-bold">
                      {product.name}
                    </td>

                    <td className="py-4">
                      {formatCurrency(
                        product.costPrice,
                      )}
                    </td>

                    <td className="py-4 font-black">
                      {formatCurrency(product.price)}
                    </td>

                    <td className="py-4">
                      {formatCurrency(
                        product.compareAtPrice,
                      )}
                    </td>

                    <td className="py-4 font-bold text-red-600">
                      {discount}%
                    </td>

                    <td className="py-4 font-bold text-green-600">
                      {margin}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function SeoWorkspace({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-black">
          SEO & Publishing
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review product search metadata and publishing
          channels.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {products.map((product) => {
          const seoReady =
            Boolean(product.seoTitle.trim()) &&
            Boolean(product.seoDescription.trim());

          return (
            <article
              key={product.id}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <strong className="text-sm">
                      {product.name}
                    </strong>

                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                        seoReady
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {seoReady
                        ? "SEO Ready"
                        : "SEO Incomplete"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-blue-700">
                    {product.seoTitle ||
                      "SEO title missing"}
                  </p>

                  <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-500">
                    {product.seoDescription ||
                      "SEO description is missing."}
                  </p>

                  <p className="mt-2 text-xs text-green-700">
                    krvefashionstudio.in/products/
                    {product.slug}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.channels.length > 0 ? (
                    product.channels.map((channel) => (
                      <span
                        key={channel}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                      >
                        {channel}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                      Not Published
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProductDetailsPanel({
  product,
  onClose,
  onEdit,
  onToggleFeatured,
  onStatusChange,
}: {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
  onToggleFeatured: () => void;
  onStatusChange: (status: ProductStatus) => void;
}) {
  const margin =
    product.price > 0
      ? Math.round(
          ((product.price - product.costPrice) /
            product.price) *
            100,
        )
      : 0;

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm"
        aria-label="Close product details"
      />

      <aside className="fixed inset-y-0 right-0 z-[70] w-full max-w-[620px] overflow-y-auto bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Product Details
            </p>

            <h2 className="mt-1 text-xl font-black">
              {product.name}
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
          <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-900 p-6 text-white">
            <div className="flex items-start gap-5">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-white/15 text-3xl font-black">
                {product.image}
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>

                  {product.featured && (
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-2xl font-black">
                  {formatCurrency(product.price)}
                </h3>

                <p className="mt-2 text-xs text-blue-100">
                  {product.sku} · {product.category}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailCard
              icon={Boxes}
              label="Available Stock"
              value={`${product.stock} units`}
              description={getStockStatus(product.stock)}
            />

            <DetailCard
              icon={TrendingUp}
              label="Product Sales"
              value={`${product.sales} units`}
              description={`${product.rating} customer rating`}
            />

            <DetailCard
              icon={IndianRupee}
              label="Cost Price"
              value={formatCurrency(
                product.costPrice,
              )}
              description={`${margin}% gross margin`}
            />

            <DetailCard
              icon={Layers3}
              label="Collection"
              value={product.collection}
              description={`${product.variants.length} variants`}
            />
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">
              Product Description
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              {product.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-black">
                Product Variants
              </h3>

              <button
                type="button"
                className="text-xs font-bold text-blue-600"
              >
                Add Variant
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[500px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-500">
                    <th className="pb-3">SKU</th>
                    <th className="pb-3">Size</th>
                    <th className="pb-3">Colour</th>
                    <th className="pb-3">Stock</th>
                    <th className="pb-3">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {product.variants.map((variant) => (
                    <tr
                      key={variant.id}
                      className="border-b border-slate-100 text-xs"
                    >
                      <td className="py-3 font-bold text-blue-600">
                        {variant.sku}
                      </td>

                      <td className="py-3">
                        {variant.size}
                      </td>

                      <td className="py-3">
                        {variant.colour}
                      </td>

                      <td className="py-3 font-bold">
                        {variant.stock}
                      </td>

                      <td className="py-3 font-bold">
                        {formatCurrency(
                          variant.price,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">
              SEO Preview
            </h3>

            <p className="mt-4 text-sm font-semibold text-blue-700">
              {product.seoTitle}
            </p>

            <p className="mt-1 text-xs text-green-700">
              krvefashionstudio.in/products/
              {product.slug}
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              {product.seoDescription}
            </p>
          </section>

          <section className="mt-6">
            <label className="text-sm font-bold">
              Product Status
            </label>

            <select
              value={product.status}
              onChange={(event) =>
                onStatusChange(
                  event.target
                    .value as ProductStatus,
                )
              }
              className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 font-semibold"
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">
                Archived
              </option>
            </select>
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onToggleFeatured}
              className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700"
            >
              <Star size={17} />
              {product.featured
                ? "Remove Featured"
                : "Make Featured"}
            </button>

            <button
              type="button"
              onClick={onEdit}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white"
            >
              <Edit3 size={17} />
              Edit Product
            </button>
          </section>
        </div>
      </aside>
    </>
  );
}

function ProductEditor({
  form,
  editing,
  onChange,
  onClose,
  onSubmit,
}: {
  form: ProductForm;
  editing: boolean;
  onChange: (form: ProductForm) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  function updateField<K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K],
  ) {
    onChange({
      ...form,
      [field]: value,
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-slate-950/50 backdrop-blur-sm"
        aria-label="Close product editor"
      />

      <aside className="fixed inset-y-0 right-0 z-[90] w-full max-w-[720px] overflow-y-auto bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Product Editor
            </p>

            <h2 className="mt-1 text-xl font-black">
              {editing
                ? "Edit Product"
                : "Add New Product"}
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

        <form onSubmit={onSubmit} className="p-6">
          <section className="rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
              <ImageIcon size={24} />
            </div>

            <h3 className="mt-4 font-black text-slate-900">
              Product Images
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Upload front, back, side and detailed
              product images.
            </p>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white"
            >
              <Upload size={16} />
              Upload Images
            </button>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">
              Basic Information
            </h3>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <FormField
                label="Product Name"
                value={form.name}
                placeholder="Enter product name"
                required
                onChange={(value) => {
                  updateField("name", value);

                  if (!editing) {
                    updateField(
                      "slug",
                      createSlug(value),
                    );
                  }
                }}
              />

              <FormField
                label="Product Slug"
                value={form.slug}
                placeholder="product-url-slug"
                onChange={(value) =>
                  updateField("slug", value)
                }
              />

              <FormField
                label="SKU"
                value={form.sku}
                placeholder="KRV-PRD-001"
                required
                onChange={(value) =>
                  updateField("sku", value)
                }
              />

              <FormField
                label="Brand"
                value={form.brand}
                placeholder="KRVE"
                onChange={(value) =>
                  updateField("brand", value)
                }
              />

              <SelectField
                label="Category"
                value={form.category}
                options={[
                  "Blazers",
                  "Suits",
                  "Shirts",
                  "Trousers",
                  "Footwear",
                  "Accessories",
                ]}
                onChange={(value) =>
                  updateField("category", value)
                }
              />

              <FormField
                label="Collection"
                value={form.collection}
                placeholder="Collection name"
                onChange={(value) =>
                  updateField("collection", value)
                }
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Short Description
              </label>

              <textarea
                rows={2}
                value={form.shortDescription}
                onChange={(event) =>
                  updateField(
                    "shortDescription",
                    event.target.value,
                  )
                }
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Full Description
              </label>

              <textarea
                rows={5}
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">
              Pricing & Inventory
            </h3>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <FormField
                label="Selling Price"
                value={form.price}
                type="number"
                placeholder="18999"
                required
                onChange={(value) =>
                  updateField("price", value)
                }
              />

              <FormField
                label="Compare-at Price / MRP"
                value={form.compareAtPrice}
                type="number"
                placeholder="22999"
                onChange={(value) =>
                  updateField(
                    "compareAtPrice",
                    value,
                  )
                }
              />

              <FormField
                label="Cost Price"
                value={form.costPrice}
                type="number"
                placeholder="8400"
                onChange={(value) =>
                  updateField("costPrice", value)
                }
              />

              <FormField
                label="Available Stock"
                value={form.stock}
                type="number"
                placeholder="0"
                onChange={(value) =>
                  updateField("stock", value)
                }
              />
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">
              Publishing
            </h3>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Product Status"
                value={form.status}
                options={[
                  "Active",
                  "Draft",
                  "Archived",
                ]}
                onChange={(value) =>
                  updateField(
                    "status",
                    value as ProductStatus,
                  )
                }
              />

              <FormField
                label="Tags"
                value={form.tags}
                placeholder="Luxury, Blazer, Formal"
                onChange={(value) =>
                  updateField("tags", value)
                }
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField(
                    "featured",
                    event.target.checked,
                  )
                }
                className="h-4 w-4 accent-blue-600"
              />

              Feature this product on the homepage
            </label>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-black">
              Search Engine Optimization
            </h3>

            <div className="mt-5">
              <FormField
                label="SEO Title"
                value={form.seoTitle}
                placeholder="Product SEO title"
                onChange={(value) =>
                  updateField("seoTitle", value)
                }
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                SEO Description
              </label>

              <textarea
                rows={4}
                value={form.seoDescription}
                onChange={(event) =>
                  updateField(
                    "seoDescription",
                    event.target.value,
                  )
                }
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </section>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
            >
              <Save size={17} />
              {editing
                ? "Save Changes"
                : "Create Product"}
            </button>
          </div>
        </form>
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
  tone:
    | "blue"
    | "green"
    | "orange"
    | "red"
    | "violet";
}) {
  const toneClass =
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
          className={`grid h-11 w-11 place-items-center rounded-xl ${toneClass}`}
        >
          <Icon size={21} />
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-300"
        />
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
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-xs font-semibold text-slate-600 outline-none"
      >
        {options.map(([optionValue, label]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
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

function FormField({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}