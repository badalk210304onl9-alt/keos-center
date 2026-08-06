import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.KRVE_API_URL?.replace(/\/+$/, "");
    const secret = process.env.KEOS_API_SECRET;
    if (!apiUrl || !secret) throw new Error("KRVE_API_URL or KEOS_API_SECRET is missing.");
    const response = await fetch(`${apiUrl}/api/keos/orders`, {
      cache: "no-store",
      headers: { Accept: "application/json", "X-KEOS-API-Key": secret },
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.message || "Unable to load orders.");
    return NextResponse.json({ success: true, source: "store-api", orders: payload.data.orders }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("KEOS_ORDERS_API_ERROR", error);
    return NextResponse.json({ success: false, source: "store-api", orders: [], message: error instanceof Error ? error.message : "Unable to load orders." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
