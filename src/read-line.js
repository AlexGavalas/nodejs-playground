// * Read line from stream util

import * as fs from 'node:fs';
import { Readable } from 'node:stream';

class ChunksToLinesTransformer {
    #previous = '';

    transform(chunk, controller) {
        let startSearch = this.#previous.length;

        this.#previous += chunk;

        while (true) {
            const eolIndex = this.#previous.indexOf('\n', startSearch);

            if (eolIndex < 0) break;

            // line includes the EOL
            const line = this.#previous.slice(0, eolIndex + 1);

            controller.enqueue(line);

            this.#previous = this.#previous.slice(eolIndex + 1);

            startSearch = 0;
        }
    }

    flush(controller) {
        if (this.#previous.length > 0) {
            controller.enqueue(this.#previous);
        }
    }
}

// ! TransformStream requires Node version >= 18
class ChunksToLinesStream extends TransformStream {
    constructor() {
        super(new ChunksToLinesTransformer());
    }
}

const lorem = await import.meta.resolve('./file-encode/lorem.txt');

const nodeReadable = fs.createReadStream(lorem.replace('file://', ''), {
    encoding: 'utf-8',
});

const webReadableStream = Readable.toWeb(nodeReadable);

const lineStream = webReadableStream.pipeThrough(new ChunksToLinesStream());

for await (const line of lineStream) {
    console.log(line);
}
