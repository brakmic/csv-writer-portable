import { createFieldStringifier } from '../lib/field-stringifier';
import { Field } from '../lib/record';
import { resolveDelimiterChar } from './helper/delimiter';
import { strictEqual } from 'assert';

describe('DefaultFieldStringifier', () => {
    describe('When field delimiter is comma', generateTestCases(','));

    describe('When field delimiter is semicolon', generateTestCases(';'));

    describe('When field delimiter is pipe', generateTestCases('|'));

    describe('When field delimiter is tab', generateTestCases('\t'));

    describe('When all fields needs to be quoted', () => {
        const stringifier = createFieldStringifier(',', true);

        it('quotes a field', () => {
            strictEqual(stringifier.stringify('VALUE'), '"VALUE"');
        });

        it('does not quote a field of value undefined', () => {
            strictEqual(stringifier.stringify(), '');
        });

        it('does not quote a field of value null', () => {
            strictEqual(stringifier.stringify(null), '');
        });

        it('does not quote a field of value empty string', () => {
            strictEqual(stringifier.stringify(''), '');
        });
    });

    describe('When custom filter function is applied', generateTestCases2(','));

    function generateTestCases(fieldDelimiter: string) {
        const delim = resolveDelimiterChar(fieldDelimiter);
        return () => {
            const stringifier = createFieldStringifier(fieldDelimiter);

            it('returns the same string', () => {
                strictEqual(stringifier.stringify('VALUE'), 'VALUE');
            });

            it('preserves the whitespace characters', () => {
                strictEqual(stringifier.stringify(' VALUE A '), ' VALUE A ');
            });

            it(`wraps a field value with double quotes if the field contains "${delim}"`, () => {
                strictEqual(
                    stringifier.stringify(`VALUE${delim}A`),
                    `"VALUE${delim}A"`,
                );
            });

            it('wraps a field value with double quotes if the field contains carriage return', () => {
                strictEqual(stringifier.stringify('VALUE\rA'), '"VALUE\rA"');
            });

            it('wraps a field value with double quotes if the field contains line feed', () => {
                strictEqual(stringifier.stringify('VALUE\nA'), '"VALUE\nA"');
            });

            it('wraps a field value with double quotes if the field contains carriage return and line feed', () => {
                strictEqual(
                    stringifier.stringify('VALUE\r\nA'),
                    '"VALUE\r\nA"',
                );
            });

            it('wraps a field value with double quotes and escape the double quotes if they are used in the field', () => {
                strictEqual(stringifier.stringify('VALUE"A'), '"VALUE""A"');
            });

            it('escapes double quotes even if double quotes are only on the both edges of the field', () => {
                strictEqual(stringifier.stringify('"VALUE"'), '"""VALUE"""');
            });

            it('converts a number into a string', () => {
                strictEqual(stringifier.stringify(1), '1');
            });

            it('converts undefined into an empty string', () => {
                strictEqual(stringifier.stringify(), '');
            });

            it('converts null into an empty string', () => {
                strictEqual(stringifier.stringify(null), '');
            });

            it('converts an object into toString-ed value', () => {
                const obj = {
                    name: 'OBJECT_NAME',
                    toString: function () {
                        return `Name: ${this.name}`;
                    },
                };
                strictEqual(stringifier.stringify(obj), 'Name: OBJECT_NAME');
            });

            it(`wraps a toString-ed field value with double quote if the value contains "${delim}"`, () => {
                const obj = {
                    name: `OBJECT${delim}NAME`,
                    toString: function () {
                        return `Name: ${this.name}`;
                    },
                };
                strictEqual(
                    stringifier.stringify(obj),
                    `"Name: OBJECT${delim}NAME"`,
                );
            });

            it('escapes double quotes in a toString-ed field value if the value has double quotes', () => {
                const obj = {
                    name: 'OBJECT_NAME"',
                    toString: function () {
                        return `Name: ${this.name}`;
                    },
                };
                strictEqual(
                    stringifier.stringify(obj),
                    '"Name: OBJECT_NAME"""',
                );
            });
        };
    }

    function generateTestCases2(fieldDelimiter: string) {
        const filterFunction = (value: Field) => {
            const str = String(value);
            // a simple regex to remove \r and \n chars
            return str.replace(/[\r\n]/g, '');
        };
        const alwaysQuote = true;
        const quoteEmptyFields = true;
        return () => {
            const stringifier = createFieldStringifier(
                fieldDelimiter,
                alwaysQuote,
                quoteEmptyFields,
                filterFunction,
            );

            it('applies custom function to manipulate field strings', () => {
                strictEqual(stringifier.stringify('VALUE\rA\n'), '"VALUEA"');
            });
        };
    }
});
