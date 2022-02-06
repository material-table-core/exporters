import { Column } from "@material-table/core";

export function ExportCsv<T extends object>(
  columns: Array<Column<T>>,
  data: Array<T>,
  filename: string,
  delimiter?: string
): void;
export function ExportPdf<T extends object>(
  columns: Array<Column<T>>,
  data: Array<T>,
  filename: string
): void;
