import {
  getKeosInventoryHistory,
  updateKeosInventory,
  type InventoryTransactionType,
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

type InventoryRequest = {
  quantity?: number;

  transactionType?:
    InventoryTransactionType;

  note?: string;
  referenceId?: string;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const {
      id,
    } =
      await context.params;

    const history =
      await getKeosInventoryHistory(
        decodeURIComponent(id),
      );

    return NextResponse.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error(
      "KEOS_INVENTORY_GET_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load inventory history.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(
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
        InventoryRequest;

    const quantity =
      Number(
        body.quantity,
      );

    if (
      !Number.isFinite(
        quantity,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A valid stock change is required.",
        },
        {
          status: 400,
        },
      );
    }

    const result =
      await updateKeosInventory(
        decodeURIComponent(id),
        {
          quantity:
            Math.trunc(
              quantity,
            ),

          transactionType:
            body.transactionType ||
            "adjustment",

          note:
            body.note,

          referenceId:
            body.referenceId,

          createdBy:
            "keos-founder",
        },
        "keos-founder",
      );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "KEOS_INVENTORY_POST_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to update product inventory.",
      },
      {
        status: 500,
      },
    );
  }
}
