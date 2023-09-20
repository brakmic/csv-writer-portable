import {
    ArrayCsvStringifierParams,
    CsvStringifierFactory,
    ObjectCsvStringifierParams
} from './lib/csv-stringifier-factory'
import { ArrayCsvStringifier } from './lib/csv-stringifiers/array'
import { ObjectCsvStringifier } from './lib/csv-stringifiers/object'
import { CsvWriter } from './lib/csv-writer'
import {ArrayCsvWriterParams, CsvWriterFactory, ObjectCsvWriterParams} from './lib/csv-writer-factory'
import { ObjectMap } from './lib/lang/object'

const csvStringifierFactory = new CsvStringifierFactory()
const csvWriterFactory = new CsvWriterFactory(csvStringifierFactory)

export const createArrayCsvStringifier = (params: ArrayCsvStringifierParams): ArrayCsvStringifier =>
        csvStringifierFactory.createArrayCsvStringifier(params)

export const createObjectCsvStringifier = (params: ObjectCsvStringifierParams): ObjectCsvStringifier =>
        csvStringifierFactory.createObjectCsvStringifier(params)

export const createArrayCsvWriter = (params: ArrayCsvWriterParams): CsvWriter<any[]> =>
        csvWriterFactory.createArrayCsvWriter(params)

export const createObjectCsvWriter = (params: ObjectCsvWriterParams): CsvWriter<ObjectMap<any>> =>
        csvWriterFactory.createObjectCsvWriter(params)
