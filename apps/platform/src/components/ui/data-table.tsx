"use client";

import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { Typography } from "./typography";

interface ColumnConfig<RowType, ValueType> {
  label: string;
  cell?: (cellData: { value: ValueType; row: RowType }) => ReactNode;
}

type Column<Row extends object, Value> = {
  key: keyof Row;
  label: string;
  cell?: (cell: { value: Value; row: Row }) => ReactNode;
};

export const createColumnHelper = <RowType extends object>() => {
  return <Key extends keyof RowType>(
    key: Key,
    config: ColumnConfig<RowType, RowType[Key]>
  ): Column<RowType, RowType[Key]> => ({
    key,
    label: config.label,
    cell: config.cell,
  });
};

export type DataTableProps<T extends object> = TableProps & {
  data: T[];
  columns: Column<T, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  emptyContent: string;
};

export const DataTable = <T extends object>(props: DataTableProps<T>) => {
  const { columns, data, emptyContent, ...rest } = props;

  return (
    <Table {...rest}>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key as string}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={emptyContent} isLoading>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={column.key as string}>
                {typeof column.cell === "function" &&
                  column.cell({
                    value: getKeyValue(row, column.key as string),
                    row,
                  })}
                {typeof column.cell === "undefined" && (
                  <Typography styling="xs">
                    {String(getKeyValue(row, column.key as string))}
                  </Typography>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
