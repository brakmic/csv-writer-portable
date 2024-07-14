import { Field } from './record';

const DEFAULT_FIELD_DELIMITER = ',';
const VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';'];

export abstract class FieldStringifier {
    constructor(
        public readonly fieldDelimiter: string,
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
        if (this.isEmpty(value)) return '';
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
        if (this.isEmpty(value)) return '';
        let str = String(value);
        str = this.filterChars(str);
        return this.quoteField(str);
    }
}

export function createFieldStringifier(
    fieldDelimiter: string = DEFAULT_FIELD_DELIMITER,
    alwaysQuote = false,
    filterFunction: (str: string) => string = (str) => str,
) {
    _validateFieldDelimiter(fieldDelimiter);
    return alwaysQuote
        ? new ForceQuoteFieldStringifier(fieldDelimiter, filterFunction)
        : new DefaultFieldStringifier(fieldDelimiter, filterFunction);
}

function _validateFieldDelimiter(delimiter: string): void {
    if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error(
            `Invalid field delimiter \`${delimiter}\` is specified`,
        );
    }
}
