import ExportCsv from "./index";

describe("Tests the csv export", () => {
  const blobFunction = jest.fn();
  window.navigator.msSaveOrOpenBlob = blobFunction;
  beforeEach(() => {
    blobFunction.mockReset();
  });
  it("works for empty data", async () => {
    ExportCsv([{ title: "test" }]);
    expect(blobFunction).toHaveBeenCalled();
    expect(blobFunction.mock.calls).toHaveLength(1);
    expect(blobFunction.mock.calls[0][1]).toBe("data.csv");
  });
  it("sets the titles", () => {
    ExportCsv([{ title: "test" }], [], "Test_File");
    expect(blobFunction.mock.calls[0][1]).toBe("Test_File.csv");
    ExportCsv([{ title: "test" }], [], "Test_File_2");
    expect(blobFunction.mock.calls[1][1]).toBe("Test_File_2.csv");
    ExportCsv([{ title: "test" }]);
    expect(blobFunction.mock.calls[2][1]).toBe("data.csv");
  });
  it("fills the data", async () => {
    ExportCsv([{ title: "name" }], [{ name: "Dominik" }, { name: "Tim" }]);
    const blob = blobFunction.mock.calls[0][0];
    const blobContent = await readBlob(blob);
    expect(blobFunction.mock.calls[0][1]).toBe("data.csv");
    expect(blobContent).toBe('"name"\r\n"Dominik"\r\n"Tim"');
  });
  it.only("fills complex data", async () => {
    ExportCsv(
      [
        { title: "Name", field: "name" },
        { title: "Age", field: "age" },
        { title: "First Name", field: "firstName" },
      ],
      [
        {
          name: "Engel",
          firstName: "Dominik",
          age: 27,
          hidden: "This should not be displayed",
        },
        { firstName: "Tim", name: "X", age: -20 },
      ]
    );
    const blob = blobFunction.mock.calls[0][0];
    const blobContent = await readBlob(blob);
    console.log(blobContent);
    expect(blobContent).toBe(
      '"Name","Age","First Name"\r\n"Engel",27,"Dominik"\r\n"X",-20,"Tim"'
    );
  });
  it("fills complex data", async () => {
    ExportCsv(
      [
        { title: "Name", field: "name" },
        { title: "Age", field: "age" },
        { title: "First Name", field: "firstName" },
      ],
      [
        {
          name: "Engel",
          firstName: "Dominik",
          age: 27,
          hidden: "This should not be displayed",
        },
        { firstName: "Tim", name: "X", age: -20 },
      ]
    );
    const blob = blobFunction.mock.calls[0][0];
    const blobContent = await readBlob(blob);
    console.log(blobContent);
    expect(blobContent).toBe(
      '"Name","Age","First Name"\r\n"Engel",27,"Dominik"\r\n"X",-20,"Tim"'
    );
  });
  it.only("uses the exportTransformer", async () => {
    ExportCsv(
      [
        { title: "Name", field: "name" },
        {
          title: "Age",
          field: "age",
          exportTransformer: (row) => row.hidden || "No hidden",
        },
        { title: "First Name", field: "firstName" },
      ],
      [
        {
          name: "Engel",
          firstName: "Dominik",
          age: 27,
          hidden: "This should not be displayed",
        },
        { firstName: "Tim", name: "X", age: -20 },
      ]
    );
    const blob = blobFunction.mock.calls[0][0];
    const blobContent = await readBlob(blob);
    expect(blobContent).toBe(
      '"Name","Age","First Name"\r\n"Engel","This should not be displayed","Dominik"\r\n"X","No hidden","Tim"'
    );
  });
});

async function readBlob(blob) {
  const blobContent = await new Promise((res) => {
    var reader = new FileReader();
    reader.addEventListener("loadend", () => {
      res(reader.result);
    });
    reader.readAsText(blob);
  });
  return blobContent;
}
