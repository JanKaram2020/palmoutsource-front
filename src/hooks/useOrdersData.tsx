import { useEffect, useState } from "react";
import type { Drink, Order } from "../types.ts";

const useOrdersData = () => {
  const [data, setData] = useState<{ orders: Order[]; drinks: Drink[] } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ordersRes, drinksRes] = await Promise.all([
          fetch("http://localhost:3000/orders"),
          fetch("http://localhost:3000/drinks"),
        ]);
        if (!ordersRes.ok) throw new Error("Failed to fetch orders");
        if (!drinksRes.ok) throw new Error("Failed to fetch drinks");

        const [ordersData, drinksData] = await Promise.all([
          ordersRes.json(),
          drinksRes.json(),
        ]);
        setData({ orders: ordersData, drinks: drinksData });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    loading,
    error,
    data,
  };
};

export default useOrdersData;
