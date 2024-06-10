import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./_cell-action";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "TANGGAL",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "type",
    header: "JENIS",
  },
  {
    accessorKey: "location",
    header: "LOKASI",
  },
  {
    accessorKey: "description",
    header: "KETERANGAN",
  },
];
