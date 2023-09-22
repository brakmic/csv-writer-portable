// Mock the FieldStringifier constructor to return the desired mock object
jest.mock("../../lib/field-stringifier", () => {
  return {
    FieldStringifier: jest.fn().mockImplementation(() => {
      return {
        fieldDelimiter: ',',
        stringify: jest.fn(),
        quoteField: jest.fn()
      };
    })
  };
});

// Mock the CsvStringifier constructor to return the desired mock object
jest.mock("../../lib/csv-stringifiers/abstract", () => {
  return {
    CsvStringifier: jest.fn().mockImplementation(() => {
      return {
        recordDelimiter: '\n',
        getHeaderString: jest.fn(),
        stringifyRecords: jest.fn(),
        getRecordAsArray: jest.fn(),
        getHeaderRecord: jest.fn(),
        getCsvLine: jest.fn(),
        joinRecords: jest.fn()
      };
    })
  };
});
