"use client";

import { Ingredient } from "@prisma/client";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { useState, useTransition } from "react";
import cx from "classnames";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { editIngredient } from "@/app/(bar)/ingredients/actions";

const columnHelper = createColumnHelper<Ingredient>();

function AvailabilityCell(props) {
  const [isPending, startTransition] = useTransition();

  return (
    <input
      type={"checkbox"}
      disabled={isPending}
      checked={props.getValue()}
      onChange={(e) => {
        startTransition(() =>
          editIngredient(props.row.id, { available: e.target.checked })
        );
      }}
      name={"availability"}
    />
  );
}

const columns = [
  columnHelper.accessor("name", {
    header: () => "Nazwa",
    enableGlobalFilter: true,
    cell: (props) => <span>{props.getValue()}</span>,
  }),
  columnHelper.accessor("available", {
    header: "Mam",
    enableGlobalFilter: false,
    cell: AvailabilityCell,
  }),
];

export function IngredientsTable(props: { ingredients: Ingredient[] }) {
  const [sorting, setSorting] = useState<SortingState>([
    { desc: true, id: "available" },
  ]);

  const table = useReactTable({
    columns,
    data: props.ingredients,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <div className={"h-[85vh] w-full overflow-y-scroll px-2"}>
      <table className={"w-full"}>
        <thead className={"text-lg"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={"grid grid-cols-[3fr_1fr]"}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={cx(
                        {
                          "cursor-pointer select-none":
                            header.column.getCanSort(),
                        },
                        "flex items-center justify-start gap-2"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaSortAmountUp />,
                        desc: <FaSortAmountDown />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={"grid grid-cols-[2fr_1fr]"}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={cx(
                    {
                      "ml-2": cell.column.id === "name",
                      "mr-4 text-end": cell.column.id === "available",
                    },
                    "pt-2"
                  )}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}