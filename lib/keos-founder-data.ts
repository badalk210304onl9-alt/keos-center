export type FounderDashboardStatistics = {
  totalRevenue: string;
  totalOrders: string;
  totalCustomers: string;
  totalEmployees: string;
};

export type FounderRecentOrder = {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
};

export type FounderDashboardData = {
  statistics: FounderDashboardStatistics;
  recentOrders: FounderRecentOrder[];
};

export const founderDemoData: FounderDashboardData = {
  statistics: {
    totalRevenue: "₹12.84L",
    totalOrders: "1,486",
    totalCustomers: "4,294",
    totalEmployees: "128",
  },

  recentOrders: [
    {
      id: "KRVE-1048",
      customer: "Aarav Sharma",
      product: "KRVE Noir Blazer",
      amount: "₹18,999",
      status: "Processing",
      date: "28 Jul 2026",
    },
    {
      id: "KRVE-1047",
      customer: "Ananya Singh",
      product: "Signature Evening Dress",
      amount: "₹14,499",
      status: "Shipped",
      date: "28 Jul 2026",
    },
    {
      id: "KRVE-1046",
      customer: "Rohan Verma",
      product: "Obsidian Double-Breasted Suit",
      amount: "₹24,999",
      status: "Delivered",
      date: "27 Jul 2026",
    },
    {
      id: "KRVE-1045",
      customer: "Ishita Mehra",
      product: "KRVE Icon Sneakers",
      amount: "₹8,999",
      status: "Pending",
      date: "27 Jul 2026",
    },
  ],
};
