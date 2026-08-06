import { NextResponse } from "next/server";

const demoOrders = [
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
  },
];

export async function GET() {
  const storeApiUrl = process.env.KRVE_STORE_ORDERS_API_URL;
  const storeApiKey = process.env.KRVE_STORE_API_KEY;

  if (!storeApiUrl) {
    return NextResponse.json(
      {
        success: true,
        source: "demo",
        orders: demoOrders,
        message: "Live KRVE store API is not configured yet.",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const response = await fetch(storeApiUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(storeApiKey
          ? { Authorization: `Bearer ${storeApiKey}` }
          : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Store API returned ${response.status}`);
    }

    const payload = await response.json();
    const orders = Array.isArray(payload) ? payload : payload.orders;

    if (!Array.isArray(orders)) {
      throw new Error("Store API response does not contain an orders array");
    }

    return NextResponse.json(
      { success: true, source: "store-api", orders },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to load KRVE store orders:", error);

    return NextResponse.json(
      {
        success: true,
        source: "demo",
        orders: demoOrders,
        message: "Live store API could not be reached.",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
