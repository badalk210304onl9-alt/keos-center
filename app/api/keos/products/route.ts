import {
  createKeosProduct,
  getKeosProducts,
  type ProductCategory,
  type ProductInput,
  type ProductStatus,
} from "@/lib/api";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export const dynamic =
  "force-dynamic";

function errorResponse(
  error: unknown,
) {
  console.error(
    "KEOS_PRODUCTS_ROUTE_ERROR",
    error,
  );

  const message =
    error instanceof Error
      ? error.message
      : "Unable to complete the product request.";

  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status: 500,
    },
  );
}

export async function GET(
  request: NextRequest,
) {
  try {
    const searchParams =
      request.nextUrl.searchParams;

    const category =
      searchParams.get(
        "category",
      ) as
        | ProductCategory
        | null;

    const status =
      searchParams.get(
        "status",
      ) as
        | ProductStatus
        | null;

    const search =
      searchParams.get(
        "search",
      ) ?? undefined;

    const limit =
      Number(
        searchParams.get(
          "limit",
        ) ?? 100,
      );

    const offset =
      Number(
        searchParams.get(
          "offset",
        ) ?? 0,
      );

    const result =
      await getKeosProducts({
        category:
          category || undefined,

        status:
          status || undefined,

        search,

        limit:
          Number.isFinite(limit)
            ? limit
            : 100,

        offset:
          Number.isFinite(offset)
            ? offset
            : 0,
      });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return errorResponse(
      error,
    );
  }
}

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      (await request.json()) as
        ProductInput;

    if (
      !body.name?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product name is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !body.category
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product category is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !Number.isFinite(
        Number(body.price),
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A valid selling price is required.",
        },
        {
          status: 400,
        },
      );
    }

    const product =
      await createKeosProduct(
        {
          ...body,

          name:
            body.name.trim(),

          price:
            Math.max(
              0,
              Number(
                body.price,
              ),
            ),

          stockQuantity:
            Math.max(
              0,
              Math.floor(
                Number(
                  body.stockQuantity ??
                    0,
                ),
              ),
            ),

          currency:
            body.currency ||
            "INR",

          imageUrl:
            body.imageUrl?.trim() ||
            "",

          status:
            body.status ||
            "draft",
        },
        "keos-founder",
      );

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return errorResponse(
      error,
    );
  }
}
