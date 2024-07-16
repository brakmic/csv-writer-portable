import { CsvWriter } from '../lib/csv-writer';
import { FileWriterMock } from './mocks/file-writer.mock';
import { FieldStringifier } from '../lib/field-stringifier';
import { CsvStringifier } from '../lib/csv-stringifiers/abstract';
import { TestFieldStringifier, TestCsvStringifier } from './impl/stringifiers';

describe('CsvWriter', () => {
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
            'some_path.csv',
            'utf8',
            false,
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
