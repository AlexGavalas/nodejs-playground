import { Worker } from 'worker_threads';
import Fastify from 'fastify';

const THREAD_COUNT = 4;

const app = Fastify({ logger: false });

const createWorker = () => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./multiple-workers.js', {
            workerData: {
                threadCount: THREAD_COUNT,
            },
        });

        worker.on('message', resolve);
        worker.on('error', reject);
    });
};

app.get('/non-blocking', () => 'Non blocking route');

app.get('/blocking', async (_, reply) => {
    const workerPromises = [];

    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }

    const results = await Promise.all(workerPromises);
    const count = results.reduce((a, b) => a + b);

    return `Count is ${count}`;
});

await app.listen(3000);

console.log('App listening on port 3000');
