import test from 'node:test';
import assert from 'node:assert';

test('top level test', async (t) => {
    // The setTimeout() in the following subtest would cause it to outlive its
    // parent test if 'await' is removed on the next line. Once the parent test
    // completes, it will cancel any outstanding subtests.
    await t.test('longer running subtest', async (t) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                assert(1 === 1);
                resolve();
            }, 100);
        });
    });
});
