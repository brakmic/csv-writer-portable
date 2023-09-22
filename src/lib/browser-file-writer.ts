import { IFileWriter } from './csv-writer';

export class BrowserFileWriter implements IFileWriter {
    constructor(private readonly path: string) {}

    async write(string: string): Promise<void> {
        console.log(`Writing to browser file at path ${this.path}: ${string}`);
        return Promise.resolve();
    }
}
