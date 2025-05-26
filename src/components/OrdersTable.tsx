import { flexRender } from "@tanstack/react-table";
import useOrdersTable from "../hooks/useOrdersTable.tsx";

export default function OrdersTable() {
  const { table, loading, error } = useOrdersTable();

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Loading orders...
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500 dark:text-red-400">
        Error: {error}
      </div>
    );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  onClick={h.column.getToggleSortingHandler()}
                  className="px-6 py-3 cursor-pointer select-none"
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {h.column.getIsSorted() === "asc" && " ↑"}
                  {h.column.getIsSorted() === "desc" && " ↓"}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
