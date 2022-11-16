// * Encode file contents

import fs from 'node:fs';
import crypto from 'node:crypto';
import { pipeline } from 'node:stream/promises';

const hashStream = crypto.createHash('sha256').setEncoding('base64');
const inputStream = fs.createReadStream('./lorem.txt');
const outputStream = fs.createWriteStream('./lorem-res.txt');

await pipeline(inputStream, hashStream, outputStream).catch(console.log);
