declare module "@material-table/exporters" {
  export function ExportCsv(columns: Array<any>, data: Array<any>, filename: string, delimeter?: string): void;
  export function ExportPdf(columns: Array<any>, data: Array<any>, filename: string): void;
}
