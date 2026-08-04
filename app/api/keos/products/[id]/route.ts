import {
  deleteKeosProduct,
  getKeosProduct,
  updateKeosProduct,
  type ProductUpdateInput,
} from "@/lib/api";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export const dynamic =
  "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function errorResponse(
  error: unknown,
) {
  console.error(
    "KEOS_PRODUCT_ROUTE_ERROR",
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
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const {
      id,
    } =
      await context.params;

    const product =
      await getKeosProduct(
        decodeURIComponent(id),
      );

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return errorResponse(
      error,
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const {
      id,
    } =
      await context.params;

    const body =
      (await request.json()) as
        ProductUpdateInput;

    const product =
      await updateKeosProduct(
        decodeURIComponent(id),
        body,
        "keos-founder",
      );

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return errorResponse(
      error,
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const {
      id,
    } =
      await context.params;

    const result =
      await deleteKeosProduct(
        decodeURIComponent(id),
        "keos-founder",
      );

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
