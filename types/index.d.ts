import { Column } from "@material-table/core";

interface IColum<T extends object> extends Column<T> {
  exportTransformer?: (row: T) => unknown;
}

export function ExportCsv<T extends object>(
  columns: Array<IColum<T>>,
  data: Array<T>,
  filename: string,
  delimeter?: string
): void;
export function ExportPdf<T extends object>(
  columns: Array<IColum<T>>,
  data: Array<T>,
  filename: string
): void;
