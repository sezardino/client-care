"use client";

import { createColumnHelper } from "@/components/ui/data-table";
import { DateBadge } from "@/components/ui/date-badge";
import { TableWidget, TableWidgetProps } from "@/components/ui/table-widget";
import { TextWithEllipsis } from "@/components/ui/text-with-ellipsis";
import { WidgetTable } from "@/types/table";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { WidgetTypeBadge } from "../../ui/project-type-badge";

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
      cell: ({ value }) => (
        <TextWithEllipsis level="span" styling="xs" length={24}>
          {value}
        </TextWithEllipsis>
      ),
    }),
    columnHelper("type", {
      label: "Type",
      cell: ({ value }) => <WidgetTypeBadge type={value} />,
    }),
    columnHelper("createdAt", {
      label: "Created Date",
      cell: ({ value }) => <DateBadge date={value} />,
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
