import { CsvStringifier } from './csv-stringifiers/abstract';
import { FileWriter } from './file-writer';

const DEFAULT_INITIAL_APPEND_FLAG = false;

export interface IFileWriter {
    write(string: string): Promise<void>;
}

export class CsvWriter<T> {
    private readonly fileWriter: IFileWriter;

    constructor(
        private readonly csvStringifier: CsvStringifier<T>,
        path: string,
        encoding?: string,
        private append = DEFAULT_INITIAL_APPEND_FLAG,
        fileWriter?: IFileWriter,
    ) {
        this.fileWriter =
            fileWriter || new FileWriter(path, this.append, encoding);
    }

    async writeRecords(records: T[]): Promise<void> {
        const recordsString = this.csvStringifier.stringifyRecords(records);
        const writeString = this.headerString + recordsString;
        await this.fileWriter.write(writeString);
        this.append = true;
    }

    private get headerString(): string {
        const headerString =
            !this.append && this.csvStringifier.getHeaderString();
        return headerString || '';
    }
}
