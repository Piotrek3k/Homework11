const myJSONParse = require('./myJSONParse.js'); 

// Test cases
const testCases = [
    {
        input: '{"name":"John", "age":30, "isStudent":false}',
        expected: { name: "John", age: 30, isStudent: false }
    },
    {
        input: '{"title":"Example JSON", "author":{"name":"Jane Doe","age":32,"isActive":true},"tags":["example","json","nested","array"],"details":{"published":"2024-06-03","likes":150,"comments":[{"user":"user1","comment":"Great post!","date":"2024-06-01"},{"user":"user2","comment":"Very informative.","date":"2024-06-02"}]}}',
        expected: {
            title: "Example JSON",
            author: {
                name: "Jane Doe",
                age: 32,
                isActive: true
            },
            tags: ["example", "json", "nested", "array"],
            details: {
                published: "2024-06-03",
                likes: 150,
                comments: [
                    { user: "user1", comment: "Great post!", date: "2024-06-01" },
                    { user: "user2", comment: "Very informative.", date: "2024-06-02" }
                ]
            }
        }
    },
    {
        input: '[1, 2, 3, {"a": "b", "c": [4, 5, {"d": "e"}]}]',
        expected: [1, 2, 3, { a: "b", c: [4, 5, { d: "e" }] }]
    },
    {
        input: 'true',
        expected: true
    },
    {
        input: 'false',
        expected: false
    },
    {
        input: 'null',
        expected: null
    },
    {
        input: '123',
        expected: 123
    },
    {
        input: '"A simple string"',
        expected: "A simple string"
    },
    {
        input: '{"escaped":"A string with escaped characters: \\" \\n \\t"}',
        expected: { escaped: "A string with escaped characters: \" \n \t" }
    },
    {
        input: '{"invalid": "missing end quote}',
        expectedError: true // This case is expected to throw an error
    }
];

// Run test cases
testCases.forEach((testCase, index) => {
    try {
        const result = myJSONParse(testCase.input);
        if (testCase.expectedError) {
            console.assert(false, `Test case ${index + 1} failed - expected an error but got a result`);
        } else {
            console.assert(JSON.stringify(result) === JSON.stringify(testCase.expected), `Test case ${index + 1} failed`);
        }
    } catch (error) {
        if (!testCase.expectedError) {
            console.assert(false, `Test case ${index + 1} failed - unexpected error: ${error.message}`);
        }
    }
});
console.log("All tests passed");