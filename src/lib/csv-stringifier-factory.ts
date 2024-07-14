import { ArrayCsvStringifier } from './csv-stringifiers/array';
import { createFieldStringifier } from './field-stringifier';
import { ObjectCsvStringifier } from './csv-stringifiers/object';
import { ObjectStringifierHeader } from './record';

export interface ArrayCsvStringifierParams {
    header?: string[];
    fieldDelimiter?: string;
    recordDelimiter?: string;
    alwaysQuote?: boolean;
    filterFunction?: (str: string) => string;
}

export interface ObjectCsvStringifierParams {
    header: ObjectStringifierHeader;
    fieldDelimiter?: string;
    recordDelimiter?: string;
    headerIdDelimiter?: string;
    alwaysQuote?: boolean;
    filterFunction?: (str: string) => string;
}

export class CsvStringifierFactory {
    createArrayCsvStringifier(
        params: ArrayCsvStringifierParams,
    ): ArrayCsvStringifier {
        const fieldStringifier = createFieldStringifier(
            params.fieldDelimiter,
            params.alwaysQuote,
            params.filterFunction
                ? params.filterFunction
                : (str: string) => str,
        );
        return new ArrayCsvStringifier(
            fieldStringifier,
            params.recordDelimiter,
            params.header,
        );
    }

    createObjectCsvStringifier(
        params: ObjectCsvStringifierParams,
    ): ObjectCsvStringifier {
        const fieldStringifier = createFieldStringifier(
            params.fieldDelimiter,
            params.alwaysQuote,
            params.filterFunction
                ? params.filterFunction
                : (str: string) => str,
        );
        return new ObjectCsvStringifier(
            fieldStringifier,
            params.header,
            params.recordDelimiter,
            params.headerIdDelimiter,
        );
    }
}
