type IColum<T> = {
  title: string;
  field: string;
  exportTransformer?: (row: T) => unknown;
};

export function ExportCsv<T>(
  columns: Array<IColum<T>>,
  data: Array<T>,
  filename: string,
  delimeter?: string
): void;
export function ExportPdf(
  columns: Array<IColum<T>>,
  data: Array<T>,
  filename: string
): void;
