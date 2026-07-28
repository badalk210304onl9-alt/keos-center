"use client";

import { useCallback, useEffect, useState } from "react";

export interface FounderDashboardData {
  statistics: {
    totalRevenue: string;
    totalOrders: string;
    totalCustomers: string;
    totalEmployees: string;
  };

  recentOrders: {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
    date: string;
  }[];
}

const demoData: FounderDashboardData = {
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
      product: "KRVE Noir Blazer",
      amount: "₹18,999",
      status: "Paid",
      date: "28 Jul 2026",
    },
    {
      id: "KRVE-10481",
      customer: "Ananya Singh",
      product: "KRVE Icon Sneakers",
      amount: "₹8,499",
      status: "Processing",
      date: "28 Jul 2026",
    },
    {
      id: "KRVE-10480",
      customer: "Rohan Verma",
      product: "Obsidian Double-Breasted Suit",
      amount: "₹12,999",
      status: "Shipped",
      date: "27 Jul 2026",
    },
    {
      id: "KRVE-10479",
      customer: "Priya Mehta",
      product: "Signature Evening Dress",
      amount: "₹6,799",
      status: "Pending",
      date: "27 Jul 2026",
    },
  ],
};

export function useKeosFounderData() {
  const [data, setData] = useState<FounderDashboardData>(demoData);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"demo" | "api">("demo");

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/founder/dashboard", {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Dashboard API returned ${response.status}`);
      }

      const result: {
        success?: boolean;
        data?: FounderDashboardData;
      } = await response.json();

      if (!result.success || !result.data) {
        throw new Error("Invalid dashboard API response");
      }

      setData(result.data);
      setSource("api");
    } catch (error) {
      console.error("Failed to load Founder dashboard data:", error);

      setData(demoData);
      setSource("demo");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    data,
    loading,
    source,
    refresh,
  };
}
