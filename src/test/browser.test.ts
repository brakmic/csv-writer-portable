import { CsvWriter } from '../lib/csv-writer';
import { FieldStringifier } from '../lib/field-stringifier';
import { CsvStringifier } from '../lib/csv-stringifiers/abstract';
import { FileWriterMock } from './mocks/file-writer.mock';
import { TestFieldStringifier, TestCsvStringifier } from './impl/stringifiers';

describe('CsvWriter Browser Compatibility', () => {
    let writer: CsvWriter<string[]>;
    let fileWriterMock: FileWriterMock;
    let fieldStringifier: FieldStringifier;
    let csvStringifier: CsvStringifier<string[]>;

    beforeEach(() => {
        fileWriterMock = new FileWriterMock();
        fieldStringifier = new TestFieldStringifier(',');
        csvStringifier = new TestCsvStringifier(fieldStringifier, '\n');
        writer = new CsvWriter<string[]>(
            csvStringifier,
            '',
            '',
            false,
            fileWriterMock,
        );
    });

    it('should write records without errors', async () => {
        const spy = jest.spyOn(fileWriterMock, 'write');
        await writer.writeRecords([
            ['a', 'b'],
            ['c', 'd'],
        ]);
        expect(spy).toHaveBeenCalled();
    });
});
