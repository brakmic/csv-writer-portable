import { CsvStringifier } from "../../lib/csv-stringifiers/abstract";
import { FieldStringifier } from "../../lib/field-stringifier";
import { Field } from "../../lib/record";

export class TestFieldStringifier extends FieldStringifier {
  stringify(value?: Field): string {
      return value;
  }
}

export class TestCsvStringifier<T> extends CsvStringifier<T> {
  protected getRecordAsArray(_record: T): Field[] {
      return [];
  }

  protected getHeaderRecord(): string[] | null | undefined {
      return null;
  }
}