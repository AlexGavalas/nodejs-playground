async function withAwait() {
    console.log(1);

    // This will make nodejs wait for the
    // end of the current loop. Because it
    // "expects" that a promise was given
    // in place of 0
    await 0;

    console.log(2);
}

async function withoutAwait() {
    console.log(3);
}

withAwait();
withoutAwait();
