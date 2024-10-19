"use client";

import { createColumnHelper } from "@/components/ui/data-table";
import { TableWidget, TableWidgetProps } from "@/components/ui/table-widget";
import { TextWithEllipsis } from "@/components/ui/text-with-ellipsis";
import { Typography } from "@/components/ui/typography";
import { DEFAULT_DATE_FORMAT } from "@/const/base";
import { SubmissionTable } from "@/types/table";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { AlertOctagon, MoreVertical, PowerOff } from "lucide-react";

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
    onSelectSubmission: (id: string) => void;
  };

const columnHelper = createColumnHelper<SubmissionTable>();

export const ProjectSubmissionsTable = (props: Props) => {
  const { submissions, onSelectSubmission, ...rest } = props;

  const columns = [
    columnHelper("widget", {
      label: "Widget",
      cell: ({ value }) => (
        <div className="flex items-center gap-2">
          {!value.isTest && !value.isActive ? (
            <Tooltip content="This widget is disabled">
              <PowerOff className="text-red-500 w-5 h-5" />
            </Tooltip>
          ) : null}
          {value.isTest ? (
            <Tooltip content="This is test widget">
              <AlertOctagon className="text-warning-500 w-5 h-5" />
            </Tooltip>
          ) : null}
          <TextWithEllipsis text={value.name} length={24} styling="xs" />
        </div>
      ),
    }),
    columnHelper("createdAt", {
      label: "Submission Date",
      cell: ({ value }) => (
        <Typography styling="xs">
          {dayjs(value).format(DEFAULT_DATE_FORMAT)}
        </Typography>
      ),
    }),
    columnHelper("widget", {
      label: "Widget type",
      cell: ({ value }) => <Typography styling="xs">{value.type}</Typography>,
    }),
    columnHelper("email", {
      label: "Sender",
      cell: ({ value }) => (
        <TextWithEllipsis text={value} length={16} styling="xs" />
      ),
    }),

    columnHelper("id", {
      label: "",
      cell: ({ value, row }) => (
        <Dropdown aria-label={`Actions on submission with id: ${row.id}`}>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="bordered">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions on selected submission">
            <DropdownItem
              key="details"
              onClick={() => onSelectSubmission(value)}
            >
              See details
            </DropdownItem>
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
