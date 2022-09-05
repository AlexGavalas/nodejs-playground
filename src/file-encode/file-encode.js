// * Encode file contents

import fs from 'fs';
import crypto from 'crypto';
import { pipeline } from 'stream/promises';

const hashStream = crypto.createHash('sha256').setEncoding('base64');
const inputStream = fs.createReadStream('./lorem.txt');
const outputStream = fs.createWriteStream('./lorem-res.txt');

await pipeline(inputStream, hashStream, outputStream).catch(console.log);
