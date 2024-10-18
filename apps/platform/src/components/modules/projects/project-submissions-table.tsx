"use client";

import { createColumnHelper } from "@/components/ui/data-table";
import { TableWidget, TableWidgetProps } from "@/components/ui/table-widget";
import { Typography } from "@/components/ui/typography";
import { DEFAULT_DATE_FORMAT } from "@/const/base";
import { SubmissionTable } from "@/types/table";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";

type PickerProps = Pick<
  TableWidgetProps<SubmissionTable>,
  "currentLimit" | "currentPage" | "onPageChange" | "onLimitChange"
>;

type OmittedProps = Omit<
  TableWidgetProps<SubmissionTable>,
  "data" | "columns" | "emptyContent" | "limitLabel" | "tableLabel"
>;

type Props = PickerProps &
  OmittedProps & {
    submissions: SubmissionTable[];
  };

const columnHelper = createColumnHelper<SubmissionTable>();

export const ProjectSubmissionsTable = (props: Props) => {
  const { submissions, ...rest } = props;

  const columns = [
    columnHelper("widget", { label: "Widget" }),
    columnHelper("createdAt", {
      label: "Submission Date",
      cell: ({ value }) => (
        <Typography styling="xs">
          {dayjs(value).format(DEFAULT_DATE_FORMAT)}
        </Typography>
      ),
    }),
    columnHelper("email", { label: "Sender" }),
    columnHelper("widget", {
      label: "Is Widget Active",
      cell: ({ value }) =>
        value ? (
          <CheckCircle2 className="text-success-500" />
        ) : (
          <XCircle className="text-danger-500" />
        ),
    }),

    columnHelper("id", {
      label: "",
      cell: ({ row }) => (
        <Dropdown aria-label={`Actions on submission with id: ${row.id}`}>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="bordered">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="copy">Test</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    }),
  ];

  return (
    <TableWidget
      {...rest}
      columns={columns}
      data={submissions}
      tableLabel="Table with all submissions what included in current project"
      emptyContent="There are no submissions to display"
      limitLabel="Change how many submissions can you preview on page"
    />
  );
};
