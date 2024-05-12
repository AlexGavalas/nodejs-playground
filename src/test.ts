import test from 'node:test';
import assert from 'node:assert';

test('top level TS test', async (t) => {
    // The setTimeout() in the following sub test would cause it to outlive its
    // parent test if 'await' is removed on the next line. Once the parent test
    // completes, it will cancel any outstanding sub tests.
    await t.test('longer running sub test', async (t) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                assert(1 === 1);
                resolve();
            }, 100);
        });
    });
});
