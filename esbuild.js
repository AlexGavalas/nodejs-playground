import { buildSync } from 'esbuild';

buildSync({
    entryPoints: ['server.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
    format: 'esm',
    banner: {
        js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
    },
    logLevel: 'info',
});
