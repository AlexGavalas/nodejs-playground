const fn = async (id) => {
    if (id) return `Hello ${id}`;

    // return { error: 'No id!' };
    return Promise.resolve({ error: 'No id!' });
};

const v1 = await fn();
const v2 = await fn('alex');
console.log(v1);
console.log(v2);

fn().then(console.log);
fn('alex').then(console.log);
