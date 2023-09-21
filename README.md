# CSV Writer Portable

## Introduction

This repository serves as an enhanced version of an existing project, [ryu1kn/csv-writer](https://github.com/ryu1kn/csv-writer).

## Rationale

The original project appeared to be unmaintained, leaving issues such as TypeScript compilation errors unresolved.

---

## Features

This library enables the conversion of JavaScript objects and arrays to CSV strings or writes them directly to a file. The generated CSV complies with [RFC 4180](https://tools.ietf.org/html/rfc4180).

## Prerequisites

- Node.js (Version 8 or higher)

## Quick Start

### Writing Records as Array of Objects to a File

The following code snippet demonstrates how to write records, defined as an array of objects, to a file.

```ts
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// Configuration
// ... code here
csvWriter.writeRecords(records).then(() => {
    console.log('...Done');
});
```

The generated CSV file will contain the following:

```csv
NAME,LANGUAGE
Bob,"French, English"
Mary,English
```

### Multiple Writes to the Same File

To append more records, simply call `writeRecords` again after the promise from the previous call is fulfilled.

```ts
// Usage in an `async` function
await csvWriter.writeRecords(records1);
await csvWriter.writeRecords(records2);
```

### Writing Large Data Sets

For large data sets, you may want to create a Node.js transform stream and use `CsvStringifier`. This enables you to pipe the stream to a file write stream.

### Skipping Header Line

To omit the header line, provide only the field IDs without titles.

```ts
const csvWriter = createCsvWriter({
    path: 'path/to/file.csv',
    header: ['name', 'lang']
});
```

## API Documentation

| Method | Description | Return Type | Link |
|--------|-------------|-------------|------|
| `createObjectCsvWriter(params)` | Creates a new CsvWriter instance. | [CsvWriter](https://github.com/brakmic/csv-writer-portable/blob/main/src/lib/csv-writer.ts#L6) instance | [Source](https://github.com/brakmic/csv-writer-portable/blob/main/src/lib/csv-writer-factory.ts#L40) |

### Parameters for `createObjectCsvWriter`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `params`  | Object | N/A | Configuration Object |
| `params.path` | String | N/A | File path |
| `params.header` | Array<{id, title}\|string> | N/A | Header configuration |
| `params.fieldDelimiter` | String | `,` | Field delimiter |
| `params.recordDelimiter` | String | `\\n` | Record delimiter |
| `params.encoding` | String | `utf8` | Encoding type |
| `params.append` | Boolean | `false` | Append mode |

---

| Method | Description | Return Type | Link |
|--------|-------------|-------------|------|
| `CsvWriter.writeRecords(records)` | Writes records to the CSV file. | Promise<void> | [Source](https://github.com/brakmic/csv-writer-portable/blob/main/src/lib/csv-writer.ts#L16) |

### Parameters for `CsvWriter.writeRecords`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `records` | Iterable collection of objects or arrays | N/A | Data records to write |

---

| Method | Description | Return Type | Link |
|--------|-------------|-------------|------|
| `createObjectCsvStringifier(params)` | Creates a new ObjectCsvStringifier instance. | [ObjectCsvStringifier](https://github.com/brakmic/csv-writer-portable/blob/main/src/lib/csv-stringifiers/object.ts#L6) instance | [Source](https://github.com/brakmic/csv-writer-portable/blob/main/src/lib/csv-stringifier-factory.ts#L28) |

### Parameters for `createObjectCsvStringifier`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `params`  | Object | N/A | Configuration Object |
| `params.header` | Array<{id, title}\|string> | N/A | Header configuration |
| `params.fieldDelimiter` | String | `,` | Field delimiter |
| `params.recordDelimiter` | String | `\\n` | Record delimiter |

## Contribute

If you'd like to contribute by either proposing new features or reporting bugs, please visit: [GitHub Issues](https://github.com/brakmic/csv-writer-portable/issues)

### Guidelines

- **Feature Requests**: Context is key. Please provide a detailed explanation of why you need the specific feature and how it could benefit the users.
  
- **Bug Reports**: Reproducible code snippets are greatly appreciated.

## Development Setup

### Requirements

- Node.js (Version 8 or higher)
- Docker

## License

Licensed under the [MIT License](./LICENSE).
