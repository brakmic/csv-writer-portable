import { Field } from './record';

export const DEFAULT_FIELD_DELIMITER = ',';
export const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';', '|', '\t'];

export abstract class FieldStringifier {
    constructor(
        public readonly fieldDelimiter: string,
        public readonly quoteEmptyFields: boolean = false,
        public readonly filterFunction: (value: any) => any = (value) => value,
    ) {}

    abstract stringify(value?: Field): string;

    protected isEmpty(value?: Field): boolean {
        return typeof value === 'undefined' || value === null || value === '';
    }

    protected quoteField(field: string): string {
        return `"${field.replace(/"/g, '""')}"`;
    }

    protected filterValue(value: any): any {
        return this.filterFunction(value);
    }
}

class DefaultFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        let filteredValue = this.filterValue(value);
        if (this.isEmpty(filteredValue)) {
            if (this.quoteEmptyFields) return '""';
            return '';
        }
        let str = String(filteredValue);
        return this.needsQuote(str) ? this.quoteField(str) : str;
    }

    private needsQuote(str: string): boolean {
        return (
            str.includes(this.fieldDelimiter) ||
            str.includes('\r') ||
            str.includes('\n') ||
            str.includes('"')
        );
    }
}

class ForceQuoteFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        let filteredValue = this.filterValue(value);
        if (this.isEmpty(filteredValue)) {
            if (this.quoteEmptyFields) return '""';
            return '';
        }
        let str = String(filteredValue);
        return this.quoteField(str);
    }
}

export function createFieldStringifier(
    fieldDelimiter: string = DEFAULT_FIELD_DELIMITER,
    alwaysQuote = false,
    quoteEmptyFields = false,
    filterFunction: (value: any) => any = (value) => value,
) {
    _validateFieldDelimiter(fieldDelimiter);
    return alwaysQuote
        ? new ForceQuoteFieldStringifier(
              fieldDelimiter,
              quoteEmptyFields,
              filterFunction,
          )
        : new DefaultFieldStringifier(
              fieldDelimiter,
              quoteEmptyFields,
              filterFunction,
          );
}

function _validateFieldDelimiter(delimiter: string): void {
    if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(
            `Invalid field delimiter \`${delimiter}\` is specified`,
        );
    }
}

