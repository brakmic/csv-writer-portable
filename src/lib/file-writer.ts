import { promisify } from './lang/promise';
import { writeFile } from 'fs';

const writeFilePromise = promisify(writeFile);

const DEFAULT_ENCODING = 'utf8';
const UTF8_BOM = '\uFEFF';

export class FileWriter {
    constructor(
        private readonly path: string,
        private append: boolean,
        private readonly encoding = DEFAULT_ENCODING,
        private readonly useBom = false,
    ) {}

    async write(string: string): Promise<void> {
        const content =
            this.useBom && !this.append ? UTF8_BOM + string : string;
        await writeFilePromise(this.path, content, this.getWriteOption());
        this.append = true;
    }

    private getWriteOption() {
        return {
            encoding: this.encoding,
            flag: this.append ? 'a' : 'w',
        };
    }
}
