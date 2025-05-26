import { useMemo } from "react";
import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useOrdersData from "./useOrdersData.tsx";

const useOrdersTable = () => {
  const { data, loading, error } = useOrdersData();

  const drinkMap = useMemo(() => {
    if (!data) return {};
    const obj: Record<
      number,
      { name: string; variants: Record<string, number> }
    > = {};
    data.drinks.forEach((d) => {
      obj[d.id] = { name: d.name, variants: d.variants };
    });
    return obj;
  }, [data]);

  const tableData = useMemo(() => {
    if (!data) return [];
    return data.orders.map((order) => {
      const items = order.items
        .map((item) => {
          const drink = drinkMap[item.id];
          const name = drink?.name ?? `Drink #${item.id}`;
          return `${name} (${item.variant} x${item.quantity})`;
        })
        .join(", ");

      const total = order.items.reduce((sum, item) => {
        const price = drinkMap[item.id]?.variants?.[item.variant] ?? 0;
        return sum + item.quantity * price;
      }, 0);

      return {
        id: order.id,
        created: new Date(order.created).toLocaleString(),
        items,
        price: `$${total.toFixed(2)}`,
      };
    });
  }, [data, drinkMap]);

  const columns = useMemo<ColumnDef<(typeof tableData)[number]>[]>(
    () => [
      { accessorKey: "id", header: "Order ID" },
      { accessorKey: "created", header: "Created" },
      { accessorKey: "items", header: "Items" },
      { accessorKey: "price", header: "Price" },
    ],
    [],
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return {
    table,
    loading,
    error,
  };
};

export default useOrdersTable;
