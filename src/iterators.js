const pipe = (x0, ...fns) => fns.reduce((x, f) => f(x), x0);

const tap = (effect) =>
    function* tap(iterator) {
        for (let x of iterator) {
            effect(x);
            yield x;
        }
    };

const map = (f) =>
    function* map(iterable) {
        for (let x of iterable) {
            yield f(x);
        }
    };

const take = (n) =>
    function* take(iterable) {
        let i = 0;
        for (let x of iterable) {
            if (i >= n) return;
            yield x;
            i++;
        }
    };

// Convert an iterable to an array
const collect = (iterable) => [...iterable];

const prettyLog = (x) => console.log(`Checking item ${x}`);
const duplicate = (v) => v * 2;
const addTwo = (v) => v + 2;

const processEachToCompletion = (items, n = 3) =>
    pipe(
        items,
        take(n),
        tap(prettyLog),
        map(duplicate),
        map(addTwo),
        // collect kick soff the process
        collect
    );

function* getNaturalSequence() {
    for (let i = 0; true; i++) {
        yield i;
    }
}

console.log(processEachToCompletion(getNaturalSequence(), 3));
