import { cn, Pagination } from "@nextui-org/react";
import { ComponentPropsWithoutRef } from "react";
import { DataTable, DataTableProps } from "./data-table";
import { LimitSelect } from "./limit-select";

export type TableWidgetProps<T extends object> =
  ComponentPropsWithoutRef<"div"> &
    Pick<DataTableProps<T>, "data" | "columns" | "emptyContent"> & {
      currentPage: number;
      totalPages: number;
      currentLimit: number;
      onPageChange: (page: number) => void;
      onLimitChange: (limit: number) => void;
      tableLabel: string;
      limitLabel: string;
    };

export const TableWidget = <T extends object>(props: TableWidgetProps<T>) => {
  const {
    columns,
    currentLimit,
    totalPages,
    currentPage,
    onLimitChange,
    onPageChange,
    data,
    emptyContent,
    tableLabel,
    limitLabel,
    ...rest
  } = props;

  return (
    <div {...rest} className={cn("flex flex-col gap-4")}>
      <DataTable
        data={data}
        columns={columns}
        emptyContent={emptyContent}
        label={tableLabel}
      />

      {totalPages > 1 && (
        <div className="flex justify-center items-center flex-wrap gap-3">
          <Pagination
            showControls
            total={totalPages}
            color="primary"
            page={currentPage}
            onChange={onPageChange}
          />
          {totalPages > 2 && (
            <LimitSelect
              current={currentLimit}
              onChange={onLimitChange}
              label={limitLabel}
            />
          )}
        </div>
      )}
    </div>
  );
};
