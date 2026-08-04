export type ProductCategory =
  | "menswear"
  | "womenswear"
  | "kidswear"
  | "accessories"
  | "footwear";

export type ProductStatus =
  | "draft"
  | "published"
  | "archived";

export type InventoryTransactionType =
  | "opening"
  | "purchase"
  | "sale"
  | "return"
  | "adjustment"
  | "damage";

export type KrveProduct = {
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

export type ProductInput = {
  id?: string;
  slug?: string;

  name: string;

  shortDescription?: string;
  description?: string;

  category: ProductCategory;

  price: number;
  compareAtPrice?: number | null;

  currency?: string;

  imageUrl: string;
  gallery?: string[];

  sizes?: string[];
  colours?: string[];

  sku?: string | null;

  stockQuantity?: number;

  featured?: boolean;
  newArrival?: boolean;

  status?: ProductStatus;
};

export type ProductUpdateInput =
  Partial<ProductInput>;

export type ProductFilters = {
  category?: ProductCategory;
  status?: ProductStatus;
  search?: string;
  limit?: number;
  offset?: number;
};

export type Pagination = {
  total: number;
  limit: number;
  offset: number;
};

export type ProductListData = {
  products: KrveProduct[];
  pagination: Pagination;
};

export type InventoryUpdateInput = {
  quantity: number;

  transactionType?:
    InventoryTransactionType;

  note?: string;
  referenceId?: string;
  createdBy?: string;
};

export type InventoryUpdateResult = {
  productId: string;
  previousQuantity: number;
  quantityChange: number;
  newQuantity: number;

  transactionType:
    InventoryTransactionType;
};

export type InventoryTransaction = {
  id: string;
  product_id: string;

  transaction_type:
    InventoryTransactionType;

  quantity_change: number;
  previous_quantity: number;
  new_quantity: number;

  reference_id: string | null;
  note: string | null;
  created_by: string | null;

  created_at: string;
};

export type InventoryHistoryData = {
  productId: string;
  currentStock: number;
  transactions: InventoryTransaction[];
};

export type HealthData = {
  application: string;
  environment: string;
  database: string;
  products: number;
  timestamp: string;
};

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  message: string;
  code?: string;
};

type ApiResponse<T> =
  | ApiSuccess<T>
  | ApiFailure;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  actorId?: string;
};

export class KrveApiError extends Error {
  status: number;
  code?: string;

  constructor(
    message: string,
    status: number,
    code?: string,
  ) {
    super(message);

    this.name = "KrveApiError";
    this.status = status;
    this.code = code;
  }
}

function getRequiredEnvironmentVariable(
  name: string,
) {
  const value =
    process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`,
    );
  }

  return value;
}

function getApiUrl() {
  return getRequiredEnvironmentVariable(
    "KRVE_API_URL",
  ).replace(/\/+$/, "");
}

function getKeosApiSecret() {
  return getRequiredEnvironmentVariable(
    "KEOS_API_SECRET",
  );
}

function createQueryString(
  values: Record<
    string,
    string | number | boolean | undefined
  >,
) {
  const parameters =
    new URLSearchParams();

  Object.entries(values).forEach(
    ([key, value]) => {
      if (
        value === undefined ||
        value === ""
      ) {
        return;
      }

      parameters.set(
        key,
        String(value),
      );
    },
  );

  const query =
    parameters.toString();

  return query
    ? `?${query}`
    : "";
}

async function parseApiResponse<T>(
  response: Response,
): Promise<T> {
  let result:
    | ApiResponse<T>
    | undefined;

  try {
    result =
      (await response.json()) as
        ApiResponse<T>;
  } catch {
    throw new KrveApiError(
      "Central API returned an invalid response.",
      response.status,
      "INVALID_API_RESPONSE",
    );
  }

  if (
    !response.ok ||
    !result.success
  ) {
    const message =
      result.success
        ? "The request could not be completed."
        : result.message;

    const code =
      result.success
        ? undefined
        : result.code;

    throw new KrveApiError(
      message,
      response.status,
      code,
    );
  }

  return result.data;
}

async function keosRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  /*
    Security protection:
    Is file ko Client Component me import
    nahi karna hai.
  */

  if (
    typeof window !== "undefined"
  ) {
    throw new Error(
      "KEOS API client can only run on the server.",
    );
  }

  const method =
    options.method ?? "GET";

  const headers =
    new Headers({
      Accept: "application/json",
      "X-KEOS-API-Key":
        getKeosApiSecret(),
    });

  if (options.actorId) {
    headers.set(
      "X-KEOS-Actor-ID",
      options.actorId,
    );
  }

  if (
    options.body !== undefined
  ) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  const response =
    await fetch(
      `${getApiUrl()}${endpoint}`,
      {
        method,
        headers,

        body:
          options.body === undefined
            ? undefined
            : JSON.stringify(
                options.body,
              ),

        cache: "no-store",
      },
    );

  return parseApiResponse<T>(
    response,
  );
}

async function publicRequest<T>(
  endpoint: string,
): Promise<T> {
  const response =
    await fetch(
      `${getApiUrl()}${endpoint}`,
      {
        method: "GET",

        headers: {
          Accept: "application/json",
        },

        cache: "no-store",
      },
    );

  return parseApiResponse<T>(
    response,
  );
}

/* =========================================================
   HEALTH
========================================================= */

export async function getKrveApiHealth() {
  return publicRequest<HealthData>(
    "/api/health",
  );
}

/* =========================================================
   PRODUCTS
========================================================= */

export async function getKeosProducts(
  filters: ProductFilters = {},
) {
  const query =
    createQueryString({
      category:
        filters.category,

      status:
        filters.status,

      search:
        filters.search?.trim(),

      limit:
        filters.limit ?? 100,

      offset:
        filters.offset ?? 0,
    });

  return keosRequest<ProductListData>(
    `/api/keos/products${query}`,
  );
}

export async function getKeosProduct(
  idOrSlug: string,
) {
  const value =
    idOrSlug.trim();

  if (!value) {
    throw new Error(
      "Product ID or slug is required.",
    );
  }

  return keosRequest<KrveProduct>(
    `/api/keos/products/${encodeURIComponent(value)}`,
  );
}

export async function createKeosProduct(
  input: ProductInput,
  actorId?: string,
) {
  return keosRequest<KrveProduct>(
    "/api/keos/products",
    {
      method: "POST",
      body: input,
      actorId,
    },
  );
}

export async function updateKeosProduct(
  idOrSlug: string,
  input: ProductUpdateInput,
  actorId?: string,
) {
  const value =
    idOrSlug.trim();

  if (!value) {
    throw new Error(
      "Product ID or slug is required.",
    );
  }

  return keosRequest<KrveProduct>(
    `/api/keos/products/${encodeURIComponent(value)}`,
    {
      method: "PATCH",
      body: input,
      actorId,
    },
  );
}

export async function deleteKeosProduct(
  idOrSlug: string,
  actorId?: string,
) {
  const value =
    idOrSlug.trim();

  if (!value) {
    throw new Error(
      "Product ID or slug is required.",
    );
  }

  return keosRequest<{
    id: string;
    deleted: boolean;
  }>(
    `/api/keos/products/${encodeURIComponent(value)}`,
    {
      method: "DELETE",
      actorId,
    },
  );
}

/* =========================================================
   PRODUCT PUBLISHING
========================================================= */

export async function updateKeosProductStatus(
  idOrSlug: string,
  status: ProductStatus,
  actorId?: string,
) {
  const value =
    idOrSlug.trim();

  if (!value) {
    throw new Error(
      "Product ID or slug is required.",
    );
  }

  return keosRequest<KrveProduct>(
    `/api/keos/products/${encodeURIComponent(value)}/status`,
    {
      method: "PATCH",

      body: {
        status,
      },

      actorId,
    },
  );
}

export async function publishKeosProduct(
  idOrSlug: string,
  actorId?: string,
) {
  return updateKeosProductStatus(
    idOrSlug,
    "published",
    actorId,
  );
}

export async function moveKeosProductToDraft(
  idOrSlug: string,
  actorId?: string,
) {
  return updateKeosProductStatus(
    idOrSlug,
    "draft",
    actorId,
  );
}

export async function archiveKeosProduct(
  idOrSlug: string,
  actorId?: string,
) {
  return updateKeosProductStatus(
    idOrSlug,
    "archived",
    actorId,
  );
}

/* =========================================================
   INVENTORY
========================================================= */

export async function updateKeosInventory(
  idOrSlug: string,
  input: InventoryUpdateInput,
  actorId?: string,
) {
  const value =
    idOrSlug.trim();

  if (!value) {
    throw new Error(
      "Product ID or slug is required.",
    );
  }

  if (
    !Number.isFinite(
      Number(input.quantity),
    )
  ) {
    throw new Error(
      "A valid inventory quantity is required.",
    );
  }

  return keosRequest<InventoryUpdateResult>(
    `/api/keos/products/${encodeURIComponent(value)}/inventory`,
    {
      method: "POST",
      body: input,
      actorId,
    },
  );
}

export async function getKeosInventoryHistory(
  idOrSlug: string,
) {
  const value =
    idOrSlug.trim();

  if (!value) {
    throw new Error(
      "Product ID or slug is required.",
    );
  }

  return keosRequest<InventoryHistoryData>(
    `/api/keos/products/${encodeURIComponent(value)}/inventory`,
  );
}

/* =========================================================
   PRODUCT HELPERS
========================================================= */

export function formatProductPrice(
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

export function getProductStatusLabel(
  status: ProductStatus,
) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

export function getStockLabel(
  stockQuantity: number,
) {
  if (stockQuantity <= 0) {
    return "Out of stock";
  }

  if (stockQuantity <= 5) {
    return "Low stock";
  }

  return "In stock";
}
