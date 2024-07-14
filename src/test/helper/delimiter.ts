import { VALID_FIELD_DELIMITERS } from "../../lib/field-stringifier";

export const resolveDelimiterChar = (char: string) => {
    if (VALID_FIELD_DELIMITERS.includes(char)) return char;
    throw new Error('Invalid field delimiter');
}
