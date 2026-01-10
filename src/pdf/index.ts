import JSpdf from "jspdf";
import "jspdf-autotable";
import { Column } from "@material-table/core";
import { applyPlugin } from "jspdf-autotable";

export function ExportPdf<T extends object>(
  columns: Array<Column<T>>,
  data: Array<T> = [],
  filename = "data"
) {
  try {
    if (JSpdf === null) throw new Error("jspdf-autotable not found");
    let finalData = data; // Grab first item for data array, make sure it is also an array.
    // If it is an object, 'flatten' it into an array of strings.

    if (data.length && !Array.isArray(data[0])) {
      if (typeof data[0] === "object") {
        // Turn data into an array of string arrays, without the `tableData` prop
        finalData = data.map((row) =>
          columns.map((col) =>
            col.exportTransformer
              ? col.exportTransformer(row)
              : row[col.field as keyof typeof row]
          )
        ) as typeof finalData;
      }
    }

    const content = {
      startY: 50,
      head: [columns.map((col) => col.title)],
      body: finalData,
    };
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";

    // This is now required in non browser environments to use the old
    // way of calling autoTable on the jspdf doc instance.
    applyPlugin(JSpdf)
    const doc = new JSpdf(orientation, unit, size) as JSpdf & {
      autoTable: (content: object) => void;
    };
    doc.setFontSize(15);
    doc.text(filename, 40, 40);
    doc.autoTable(content);
    doc.save(filename + ".pdf");
  } catch (err) {
    console.error(
      `exporting pdf : unable to import 'jspdf-autotable' : ${err}`
    );
  }
}
