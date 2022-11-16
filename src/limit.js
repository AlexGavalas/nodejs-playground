import { setTimeout } from 'node:timers/promises';

async function limit(tasks, concurrency) {
    const results = [];

    async function runTasks(tasksIterator) {
        for (const [index, task] of tasksIterator) {
            try {
                // Artificial delay to see the limit
                await setTimeout(500);
                console.log(`Running task ${task}`);

                results[index] =
                    typeof task === 'function' ? await task() : await task;
            } catch (error) {
                results[index] = new Error(`Failed with: ${error.message}`);
            }
        }
    }

    const workers = new Array(concurrency).fill(tasks.entries()).map(runTasks);

    await Promise.allSettled(workers);

    return results;
}

const tasks = [1, 2, 3, 4, 5, 6, 7, 8];

limit(tasks, 2).then(console.log);
