import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,

    data: {
      statistics: {
        totalRevenue: "₹12.84L",
        totalOrders: "1,486",
        totalCustomers: "4,294",
        totalEmployees: "128",
      },

      recentOrders: [
        {
          id: "KRVE-10482",
          customer: "Aarav Sharma",
          amount: "₹18,999",
          status: "Paid",
        },
        {
          id: "KRVE-10481",
          customer: "Ananya Singh",
          amount: "₹8,499",
          status: "Processing",
        },
        {
          id: "KRVE-10480",
          customer: "Rohan Verma",
          amount: "₹12,999",
          status: "Shipped",
        },
        {
          id: "KRVE-10479",
          customer: "Priya Mehta",
          amount: "₹6,799",
          status: "Pending",
        },
      ],
    },
  });
}
