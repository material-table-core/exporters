import { ExportPdf } from "./index";

const mockApplyPlugin = jest.fn();
const mockJspdf = jest.fn();
let mockJspdfConstructor;

jest.mock("jspdf", () => {
  mockJspdfConstructor = function (...args) {
    return mockJspdf(...args);
  };

  return {
    __esModule: true,
    default: mockJspdfConstructor,
  };
});

jest.mock("jspdf-autotable", () => ({
  __esModule: true,
  applyPlugin: (...args) => mockApplyPlugin(...args),
}));

describe("Tests pdf export", () => {
  let docMock;

  beforeEach(() => {
    docMock = {
      setFontSize: jest.fn(),
      text: jest.fn(),
      autoTable: jest.fn(),
      save: jest.fn(),
    };
    mockJspdf.mockClear();
    mockApplyPlugin.mockClear();
    mockJspdf.mockReturnValue(docMock);
  });

  it("saves a pdf with the default filename", () => {
    ExportPdf([
      {
        title: "Name",
        field: "name",
      },
    ]);

    expect(mockApplyPlugin).toHaveBeenCalledWith(mockJspdfConstructor);
    expect(mockJspdf).toHaveBeenCalledWith("landscape", "pt", "A4");
    expect(docMock.text).toHaveBeenCalledWith("data", 40, 40);
    expect(docMock.autoTable).toHaveBeenCalledWith({
      startY: 50,
      head: [["Name"]],
      body: [],
    });
    expect(docMock.save).toHaveBeenCalledWith("data.pdf");
  });

  it("transforms object rows and uses exportTransformer", () => {
    ExportPdf(
      [
        { title: "Name", field: "name" },
        {
          title: "Secret",
          field: "secret",
          exportTransformer: (row) => row.hidden || "No hidden",
        },
      ],
      [
        { name: "Alice", secret: "ignored", hidden: "Top Secret" },
        { name: "Bob", secret: "ignored" },
      ],
      "Report"
    );

    expect(docMock.autoTable).toHaveBeenCalledWith({
      startY: 50,
      head: [["Name", "Secret"]],
      body: [["Alice", "Top Secret"], ["Bob", "No hidden"]],
    });
    expect(docMock.text).toHaveBeenCalledWith("Report", 40, 40);
    expect(docMock.save).toHaveBeenCalledWith("Report.pdf");
  });
});
