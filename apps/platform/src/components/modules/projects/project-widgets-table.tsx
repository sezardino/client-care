"use client";

import { createColumnHelper } from "@/components/ui/data-table";
import { TableWidget, TableWidgetProps } from "@/components/ui/table-widget";
import { TextWithEllipsis } from "@/components/ui/text-with-ellipsis";
import { Typography } from "@/components/ui/typography";
import { DEFAULT_DATE_FORMAT } from "@/const/base";
import { WidgetTable } from "@/types/table";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import dayjs from "dayjs";
import {
  AlertOctagon,
  CheckCircle2,
  MoreVertical,
  XCircle,
} from "lucide-react";

type PickerProps = Pick<
  TableWidgetProps<WidgetTable>,
  "currentLimit" | "currentPage" | "onPageChange" | "onLimitChange"
>;

type OmittedProps = Omit<
  TableWidgetProps<WidgetTable>,
  "data" | "columns" | "emptyContent" | "limitLabel" | "tableLabel"
>;

type Props = PickerProps &
  OmittedProps & {
    widgets: WidgetTable[];
    onChangeActiveStateRequest: (id: string) => void;
    onCodeRequest: (id: string) => void;
    onDeleteRequest: (id: string) => void;
    onDuplicateRequest: (id: string) => void;
  };

const columnHelper = createColumnHelper<WidgetTable>();

export const ProjectWidgetsTable = (props: Props) => {
  const {
    widgets,
    onChangeActiveStateRequest,
    onCodeRequest,
    onDeleteRequest,
    onDuplicateRequest,
    ...rest
  } = props;

  const columns = [
    columnHelper("name", {
      label: "Name",
      cell: ({ value, row }) => {
        const valueJSX = (
          <TextWithEllipsis
            text={value}
            level="span"
            styling="xs"
            length={24}
          />
        );

        return row.isTest ? (
          <div className="flex items-center gap-2">
            <Tooltip content="This is test widget">
              <AlertOctagon className="text-warning-400 w-5 h-5" />
            </Tooltip>
            {valueJSX}
          </div>
        ) : (
          valueJSX
        );
      },
    }),
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
    columnHelper("id", {
      label: "",
      cell: ({ value, row }) => (
        <Dropdown aria-label={`Actions on widget ${row.name}`}>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="bordered" className="ml-auto">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="copy" onClick={() => onCodeRequest(value)}>
              Copy Embed Code
            </DropdownItem>
            <DropdownItem
              key="toggle-active"
              onClick={() => onChangeActiveStateRequest(value)}
            >
              Toggle Active
            </DropdownItem>
            <DropdownItem
              key="duplicate"
              onClick={() => onDuplicateRequest(value)}
            >
              Duplicate
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={() => onDeleteRequest(value)}
            >
              Delete Widget
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
      data={widgets}
      tableLabel="Table with all widgets what included in current project"
      emptyContent="There are no widgets to display"
      limitLabel="Change how many widgets can you preview on page"
    />
  );
};
