/**
 * Parses a JSON-formatted string and returns the corresponding JavaScript object.
 *
 * @param {string} jsonString - The JSON-formatted string to parse.
 * @returns {Object} The JavaScript object represented by the JSON string.
 * @throws {SyntaxError} If the JSON string contains invalid syntax.
 */
const myJSONParse = (jsonString) => {
    const tokenizedString = tokenize(jsonString); // Tokenize the input JSON string
    let i = 0; // Initialize the token index

    /**
     * Parses a JSON object from the tokenized string.
     *
     * @returns {Object} The parsed JavaScript object.
     * @throws {Error} If the JSON object contains invalid syntax.
     */
    function parseObject() {
        let result = {};
        i++; // Skip '{'
        while (tokenizedString[i] !== '}') {
            if (tokenizedString[i] === undefined) {
                throw new Error("Invalid JSON character");
            }
            if (tokenizedString[i] === ',') {
                i++;
                continue; // Skip commas
            }
            let key = parseString(); // Parse the key as a string
            if (tokenizedString[i] === ':') {
                i++; // Skip ':'
                let value = parseValue(); // Parse the corresponding value
                result[key] = value; // Assign the key-value pair to the result object
            } else {
                throw new SyntaxError("Expected ':' after key");
            }
        }
        i++; // Skip '}'
        return result;
    }

    /**
     * Parses a JSON array from the tokenized string.
     *
     * @returns {Array} The parsed JavaScript array.
     * @throws {Error} If the JSON array contains invalid syntax.
     */
    function parseArray() {
        let result = [];
        i++; // Skip '['
        while (tokenizedString[i] !== ']') {
            if (tokenizedString[i] === undefined) {
                throw new Error("Invalid JSON character");
            }
            if (tokenizedString[i] === ',') {
                i++;
                continue; // Skip commas
            }
            result.push(parseValue()); // Parse and add the value to the array
        }
        i++; // Skip ']'
        return result;
    }

    /**
     * Parses a JSON string from the tokenized string.
     *
     * @returns {string} The parsed JavaScript string.
     * @throws {SyntaxError} If the token is not a valid JSON string.
     */
    function parseString() {
        let token = tokenizedString[i];
        if (token[0] === '"' && token[token.length - 1] === '"') {
            i++; // Skip the string token
            return token.slice(1, -1); // Remove quotes from string
        } else {
            throw new SyntaxError(`Expected string for property key, got: ${token}`);
        }
    }

    /**
     * Parses a JSON value (object, array, string, number, boolean, or null) from the tokenized string.
     *
     * @returns {*} The parsed JavaScript value.
     * @throws {SyntaxError} If the token is not a valid JSON value.
     */
    function parseValue() {
        let value = tokenizedString[i];
        if (value === '{') {
            return parseObject(); // Parse as object
        } else if (value === '[') {
            return parseArray(); // Parse as array
        } else if (value === 'true') {
            i++;
            return true; // Parse as boolean true
        } else if (value === 'false') {
            i++;
            return false; // Parse as boolean false
        } else if (value === 'null') {
            i++;
            return null; // Parse as null
        } else if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(value)) {
            i++;
            return parseFloat(value); // Parse as number
        } else if (/^"(?:\\.|[^\\"])*"$/.test(value)) {
            i++;
            // Unescape and parse the string
            return value.slice(1, -1).replace(/\\(["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, function (match, p1) {
                switch (p1.charAt(0)) {
                    case '"': return '"';
                    case '\\': return '\\';
                    case '/': return '/';
                    case 'b': return '\b';
                    case 'f': return '\f';
                    case 'n': return '\n';
                    case 'r': return '\r';
                    case 't': return '\t';
                    case 'u': return String.fromCharCode(parseInt(p1.slice(1), 16));
                    default: return match;
                }
            });
        } else {
            throw new SyntaxError(`Unexpected token: ${value}`);
        }
    }

    /**
     * Tokenizes the input JSON string into an array of tokens.
     *
     * @param {string} string - The JSON string to tokenize.
     * @returns {Array} The array of tokens.
     */
    function tokenize(string) {
        // Regular expression to match JSON tokens
        const tokenPattern = /null|true|false|(".*?(?<!\\)"|[{}\[\],:]|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
        return string.match(tokenPattern); // Return an array of tokens
    }

    return parseValue(); // Start parsing the JSON string
};

module.exports = myJSONParse

console.log(myJSONParse('{"name":"John", "age":30, "isStudent":false}'));
console.log(JSON.stringify(myJSONParse('{"title":"Example JSON","author":{"name":"Jane Doe","age":32,"isActive":true},"tags":["example","json","nested","array"],"details":{"published":"2024-06-03","likes":150,"comments":[{"user":"user1","comment":"Great post!","date":"2024-06-01"},{"user":"user2","comment":"Very informative.","date":"2024-06-02"}]}}')));