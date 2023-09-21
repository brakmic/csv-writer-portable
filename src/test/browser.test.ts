import { CsvWriter } from "../lib/csv-writer";
import { CsvStringifierMock } from "./mocks/csv-stringifier.mock";
import { FileWriterMock } from "./mocks/file-writer.mock";

describe('CsvWriter Browser Compatibility', () => {
    let writer: CsvWriter<string[]>;
    let fileWriterMock: FileWriterMock;
    let csvStringifierMock: typeof CsvStringifierMock;

    beforeEach(() => {
        fileWriterMock = new FileWriterMock();
        csvStringifierMock = CsvStringifierMock;
        writer = new CsvWriter<string[]>(csvStringifierMock as any, '', '', false, fileWriterMock);
    });

    it('should write records without errors', async () => {
        const spy = jest.spyOn(fileWriterMock, 'write');
        await writer.writeRecords([['a', 'b'], ['c', 'd']]);
        expect(spy).toHaveBeenCalled();
    });
});
