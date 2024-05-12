import { parseArgs, styleText } from 'node:util';
import { glob, watch } from 'node:fs/promises';

const { values } = parseArgs({
    args: ['-h', '--flag', 'some flag', '-c'],
    options: {
        help: {
            short: 'h',
            type: 'boolean',
        },
        flag: {
            type: 'string',
        },
        create: {
            type: 'boolean',
            short: 'c',
        },
    },
});

console.log(values);

console.log(styleText(['green', 'underline'], 'some styled text'));

// for await (const file of watch(`${import.meta.dirname}`)) {
for await (const file of glob(`${import.meta.dirname}/*`)) {
    console.log(file);
}
