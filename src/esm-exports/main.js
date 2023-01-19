// Named export case
import { thing as importedThing } from './module.js';
const module = await import('./module.js');
const { thing } = await import('./module.js');

setTimeout(() => {
    console.log(importedThing); // "changed"
    console.log(module.thing); // "changed"
    console.log(thing); // "initial"
}, 1000);

// Export default case
// import { thing, default as defaultThing } from './module.js';
// import anotherDefaultThing from './module.js';

// setTimeout(() => {
//     console.log(thing); // "changed"
//     console.log(defaultThing); // "initial"
//     console.log(anotherDefaultThing); // "initial"
// }, 1000);
