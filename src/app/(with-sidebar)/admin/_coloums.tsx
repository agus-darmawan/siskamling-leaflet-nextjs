import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./_cell-action";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "PELAPOR",
  },
  {
    accessorKey: "phone",
    header: "NO HP",
  },
  {
    accessorKey: "date",
    header: "TANGGAL",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "status",
    header: "STATUS",
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
  {
    header: "ACTION",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
