import { CsvStringifier } from "../../lib/csv-stringifiers/abstract";

export const CsvStringifierMock = {
  fieldStringifier: {
    fieldDelimiter: ',',
    stringify: jest.fn(),
    quoteField: jest.fn(),
  },
  recordDelimiter: '\n',
  getHeaderString: jest.fn(),
  stringifyRecords: jest.fn(),
  getRecordAsArray: jest.fn(),
  getHeaderRecord: jest.fn(),
} as unknown as CsvStringifier<any>;
