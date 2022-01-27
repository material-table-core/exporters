type IColum<T> = {
  title: string;
  field: string;
  exportTransformer?: (row: T) => unknown;
  // Allow all other params to be present in column
  [x: string]: any;
};

export function ExportCsv<T>(
  columns: Array<IColum<T>>,
  data: Array<T>,
  filename: string,
  delimeter?: string
): void;
export function ExportPdf<T>(
  columns: Array<IColum<T>>,
  data: Array<T>,
  filename: string
): void;
