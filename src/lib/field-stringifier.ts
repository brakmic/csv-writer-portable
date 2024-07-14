import { Field } from './record';

export const DEFAULT_FIELD_DELIMITER = ',';
export const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';', '|', '\t'];

export abstract class FieldStringifier {
    constructor(
        public readonly fieldDelimiter: string,
        public readonly quoteEmptyFields: boolean = false,
        public readonly filterFunction: (str: string) => string = (str) => str,
    ) {}

    abstract stringify(value?: Field): string;

    protected isEmpty(value?: Field): boolean {
        return typeof value === 'undefined' || value === null || value === '';
    }

    protected quoteField(field: string): string {
        return `"${field.replace(/"/g, '""')}"`;
    }

    protected filterChars(str: string): string {
        return this.filterFunction(str);
    }
}

class DefaultFieldStringifier extends FieldStringifier {
    stringify(value?: Field): string {
        if (this.isEmpty(value)) {
            if (this.quoteEmptyFields) return '""';
            return '';
        }
        let str = String(value);
        str = this.filterChars(str);
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
        if (this.isEmpty(value)) {
            if (this.quoteEmptyFields) return '""';
            return '';
        }
        let str = String(value);
        str = this.filterChars(str);
        return this.quoteField(str);
    }
}

export function createFieldStringifier(
    fieldDelimiter: string = DEFAULT_FIELD_DELIMITER,
    alwaysQuote = false,
    quoteEmptyFields = false,
    filterFunction: (str: string) => string = (str) => str,
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
