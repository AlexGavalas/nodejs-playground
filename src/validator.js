import * as R from 'ramda';

const NUM_REGEX = /^\d+$/;

// All the validation functions will either return true or an error message
// Here we are making the decision for the error message to be a string

const patternMatch = (errorMessage, regex) =>
    R.either(R.test(regex), R.always(errorMessage));

const minLength = (errorMessage, min) =>
    R.either(R.pipe(R.length, R.gte(R.__, min)), R.always(errorMessage));

const maxLength = (errorMessage, max) =>
    R.either(R.pipe(R.length, R.lte(R.__, max)), R.always(errorMessage));

const apiKeyValidations = {
    get: R.prop('apiKey'),
    validations: [
        minLength('Too short', 2),
        patternMatch('Wrong pattern', NUM_REGEX),
    ],
};

const companyNameValidations = {
    get: R.prop('companyName'),
    validations: [minLength('Too short', 2), maxLength('Too long', 10)],
};

const nesteValidations = {
    get: R.path(['nested', 'value']),
    validations: [minLength('Too short', 2), maxLength('Too long', 10)],
};

const createValidation = (validations, get) =>
    R.pipe(
        // Get the value from the key
        get,
        // Run the validations
        R.juxt(validations),
        // Keep the errors
        R.without([true])
    );

const createSchema = R.pipe(
    // Map the object to an array of key/value pairs
    R.toPairs,
    // Pass the path to the validation function
    R.map(([key, { get, validations }]) => [
        key,
        createValidation(validations, get),
    ]),
    // Convert the array back to an object
    R.fromPairs,
    // Create the schema with the validations
    R.applySpec
);

const createValidator = (schema) =>
    R.pipe(
        // Create a schema from the validations
        createSchema(schema),
        // Keep the keys that have errors
        R.pickBy(R.length),
        R.cond([
            // If there are no errors return a valid object
            [R.isEmpty, R.always({ valid: true })],
            // If there are errors, return an object with the errors
            [R.T, R.objOf('errors')],
        ])
    );

const validate = createValidator({
    apiKey: apiKeyValidations,
    companyName: companyNameValidations,
    nestedValue: nesteValidations,
});

const data = {
    apiKey: '22',
    companyName: '212asdasas',
    nested: {
        value: '1',
    },
};

const result = validate(data);

console.log(JSON.stringify(result, null, 2));
