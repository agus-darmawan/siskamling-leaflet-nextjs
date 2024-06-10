import DataTable from "@/components/DataTable";
import { columns } from "./_coloums";

type TReportTableProps = {
  report: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function RepportTable({ report, pageCount }: TReportTableProps) {
  return (
    <>
      {report && (
        <DataTable columns={columns} data={report} pageCount={pageCount} />
      )}
    </>
  );
}
