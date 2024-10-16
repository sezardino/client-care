"use client";

import {
  createColumnHelper,
  DataTable,
  DataTableProps,
} from "@/components/ui/data-table";
import { Typography } from "@/components/ui/typography";
import { DEFAULT_DATE_FORMAT } from "@/const/base";
import { ProjectWidget } from "@/types/widget";
import dayjs from "dayjs";
import { CheckCircle2, XCircle } from "lucide-react";

type OmittedProps = Omit<
  DataTableProps<ProjectWidget>,
  "data" | "columns" | "emptyContent"
>;

type Props = OmittedProps & {
  widgets: ProjectWidget[];
};

const columnHelper = createColumnHelper<ProjectWidget>();

const columns = [
  columnHelper("name", { label: "Name" }),
  columnHelper("type", { label: "Type" }),
  columnHelper("createdAt", {
    label: "Created Date",
    cell: ({ value }) => (
      <Typography styling="xs">
        {dayjs(value).format(DEFAULT_DATE_FORMAT)}
      </Typography>
    ),
  }),
  columnHelper("submissionsCount", { label: "Submissions" }),
  columnHelper("isActive", {
    label: "Is Widget Active",
    cell: ({ value }) =>
      value ? (
        <CheckCircle2 className="text-success-500" />
      ) : (
        <XCircle className="text-danger-500" />
      ),
  }),
  columnHelper("isTest", {
    label: "Is Test Widget",
    cell: ({ value }) =>
      value ? (
        <CheckCircle2 className="text-success-500" />
      ) : (
        <XCircle className="text-danger-500" />
      ),
  }),
];

export const ProjectWidgetsTable = (props: Props) => {
  const { widgets } = props;

  return (
    <DataTable
      {...props}
      columns={columns}
      data={widgets}
      emptyContent="There are no widgets to display"
    />
  );
};
