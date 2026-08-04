import {
  updateKeosProductStatus,
  type ProductStatus,
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

type StatusRequest = {
  status?: ProductStatus;
};

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
        StatusRequest;

    if (
      !body.status ||
      ![
        "draft",
        "published",
        "archived",
      ].includes(
        body.status,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A valid product status is required.",
        },
        {
          status: 400,
        },
      );
    }

    const product =
      await updateKeosProductStatus(
        decodeURIComponent(id),
        body.status,
        "keos-founder",
      );

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(
      "KEOS_PRODUCT_STATUS_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to update product status.",
      },
      {
        status: 500,
      },
    );
  }
}
