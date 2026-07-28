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
    amount: string;
    status: string;
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
};

export function useKeosFounderData() {
  const [data, setData] = useState<FounderDashboardData>(demoData);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"demo" | "api">("demo");

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/founder/dashboard", {
        cache: "no-store",
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          setData(result.data);
          setSource("api");
        } else {
          setData(demoData);
          setSource("demo");
        }
      } else {
        setData(demoData);
        setSource("demo");
      }
    } catch {
      setData(demoData);
      setSource("demo");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    data,
    loading,
    source,
    refresh,
  };
}
