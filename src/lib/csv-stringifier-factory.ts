import { ArrayCsvStringifier } from './csv-stringifiers/array';
import { createFieldStringifier } from './field-stringifier';
import { ObjectCsvStringifier } from './csv-stringifiers/object';
import { Field, ObjectStringifierHeader } from './record';

export interface ArrayCsvStringifierParams {
    header?: string[];
    fieldDelimiter?: string;
    recordDelimiter?: string;
    alwaysQuote?: boolean;
    quoteEmptyFields?: boolean;
    filterFunction?: (value: Field) => Field;
}

export interface ObjectCsvStringifierParams {
    header: ObjectStringifierHeader;
    fieldDelimiter?: string;
    recordDelimiter?: string;
    headerIdDelimiter?: string;
    alwaysQuote?: boolean;
    quoteEmptyFields?: boolean;
    filterFunction?: (value: Field) => Field;
}

export class CsvStringifierFactory {
    createArrayCsvStringifier(
        params: ArrayCsvStringifierParams,
    ): ArrayCsvStringifier {
        const fieldStringifier = createFieldStringifier(
            params.fieldDelimiter,
            params.alwaysQuote,
            params.quoteEmptyFields,
            params.filterFunction
                ? params.filterFunction
                : (value: Field) => value,
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
            params.quoteEmptyFields,
            params.filterFunction
                ? params.filterFunction
                : (value: Field) => value,
        );
        return new ObjectCsvStringifier(
            fieldStringifier,
            params.header,
            params.recordDelimiter,
            params.headerIdDelimiter,
        );
    }
}
