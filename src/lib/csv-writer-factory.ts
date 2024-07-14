import { CsvWriter } from './csv-writer';
import { CsvStringifierFactory } from './csv-stringifier-factory';
import { ObjectStringifierHeader } from './record';
import { ObjectMap } from './lang/object';

export interface ArrayCsvWriterParams {
    path: string;
    header?: string[];
    fieldDelimiter?: string;
    recordDelimiter?: string;
    alwaysQuote?: boolean;
    encoding?: string;
    append?: boolean;
    filterFunction?: (str: string) => string;
}

export interface ObjectCsvWriterParams {
    path: string;
    header: ObjectStringifierHeader;
    fieldDelimiter?: string;
    recordDelimiter?: string;
    headerIdDelimiter?: string;
    alwaysQuote?: boolean;
    encoding?: string;
    append?: boolean;
    filterFunction?: (str: string) => string;
}

export class CsvWriterFactory {
    constructor(
        private readonly csvStringifierFactory: CsvStringifierFactory,
    ) {}

    createArrayCsvWriter<T = unknown>(
        params: ArrayCsvWriterParams,
    ): CsvWriter<T[]> {
        const csvStringifier =
            this.csvStringifierFactory.createArrayCsvStringifier({
                header: params.header,
                fieldDelimiter: params.fieldDelimiter,
                recordDelimiter: params.recordDelimiter,
                alwaysQuote: params.alwaysQuote,
                filterFunction: params.filterFunction
            });
        return new CsvWriter<T[]>(
            csvStringifier,
            params.path,
            params.encoding,
            params.append,
        );
    }

    createObjectCsvWriter<T = unknown>(
        params: ObjectCsvWriterParams,
    ): CsvWriter<ObjectMap<T>> {
        const csvStringifier =
            this.csvStringifierFactory.createObjectCsvStringifier({
                header: params.header,
                fieldDelimiter: params.fieldDelimiter,
                recordDelimiter: params.recordDelimiter,
                headerIdDelimiter: params.headerIdDelimiter,
                alwaysQuote: params.alwaysQuote,
                filterFunction: params.filterFunction
            });
        return new CsvWriter<ObjectMap<T>>(
            csvStringifier,
            params.path,
            params.encoding,
            params.append,
        );
    }
}
