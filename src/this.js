// * this keyword demo

const object = {
    a: 42,
    fn: () => {
        console.log(this);
    },
    fun() {
        console.log(this);
    },
};

object.fn();
object.fun();

const bindTarget = { this: 'will log' };

const fnCopy = object.fn.bind(bindTarget);
const funCopy = object.fun.bind(bindTarget);

fnCopy();
funCopy();
