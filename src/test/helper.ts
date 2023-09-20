import {strictEqual} from 'assert'
import {readFileSync} from 'fs'

export const testFilePath = (id: string) => `./test-tmp/${id}.csv`

export const assertFile = (path: string, expectedContents: string, encoding?: BufferEncoding) => {
    const actualContents = readFileSync(path, encoding ?? 'utf8')
    strictEqual(actualContents, expectedContents)
}
// eslint-disable-next-line
export const assertRejected = (p: Promise<any>, message: string) => {
    return p.then(
        () => new Error('Should not have been called'),
        (e: Error) => { strictEqual(e.message, message) }
    )
}
