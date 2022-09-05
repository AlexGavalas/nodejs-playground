const curry = (fn) => {
    const handler = (...args) => {
        if (args.length >= fn.length) {
            return fn(...args);
        }

        return (...args2) => handler(...args, ...args2);
    };

    return handler;
};

const sum = (a, b) => a + b;

const curriedSum = curry(sum);

console.assert(typeof curriedSum(1) === 'function', 'Not a fn');
console.assert(curriedSum(1, 2) === 3, '1 + 2 should be 3');
console.assert(curriedSum(2)(3) === 5, '2 + 3 should be 5');

console.log(curriedSum(1, 10));
