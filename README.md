# Homework 11 - Custom JSON Parser

## Description
Implementation of a custom JSON parser function that accepts a string in JSON format and returns the corresponding JavaScript object.

## Custom JSON Parse Function
Implementation of a custom JSON parse function consists of a few different functions working together. Provided string is first converted into tokens values and then parsed based on their type.

### Tokenize 
Function to convert a jsonString into an array of tokens. Function matches provided string with regular expression pattern.
Regular expression: `/(".*?(?<!\\)"|null|true|false|[{}\[\],:]|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g`;
Where: 
- `null|true|false` - Boolean values and null
    * `null`: Matches the literal null.
    * `true`: Matches the literal true.
    * `false`: Matches the literal false.
- `".*?(?<!\\)"` - String
    * `"`: Matches the opening double quote of a string.
    * `.*?`: Matches any character (except for line terminators) between zero and unlimited times, as few times as possible (non-greedy).
    * `(?<!\\)"`: Matches a closing double quote that is not preceded by a backslash (to handle escaped quotes correctly).
- `[{}\[\],:]` - Structural characters 
    * `[{}]`: Matches either { or }.
    * `[\[\]]`: Matches either [ or ].
    * `,`: Matches the comma character ,.
    * `:`: Matches the colon character :.
- `\d+(?:\.\d+)?(?:[eE][+-]?\d+)?` - Numbers
    * `\d+`: Matches one or more digits.
    * `(?:\.\d+)?`: Matches an optional decimal point followed by one or more digits.
    * `(?:[eE][+-]?\d+)?`: Matches an optional exponent part, which consists of e or E, optionally followed by a plus or minus sign, followed by one or more digits.

### Parse Object
Function to parse an object token. Works with nested objects as well.

### Parse Array
Function to parse an array token. Works with nested arrays as well.

### Parse String
Function to parse a string.

### Parse Value
Function to parse all the other values as well as to check which type of value is to be parsed.
Function checks whether value matches or is equal to: 
- `{` - return parseObject function
- `[` - return parseArray function
- `true` - return true
- `false` - return false
- `null` - return null
- `/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/` - number - return parseFloat
- `/^"(?:\\.|[^\\"])*"$/` - string - return `value.slice(1,-1).replace` which replaces escaped sequences in the string with their actual characters. The regular expression used here is: `\\(["\\\/bfnrt]|u[0-9a-fA-F]{4})` where:
    * `\\`: A backslash.
    * `["\\\/bfnrt]`: One of `"`, `\`, `/`, `b`, `f`, `n`, `r`, `t`.
    * `u[0-9a-fA-F]{4}`: A Unicode escape sequence
Finally it returns the actual value.

## Tests
Tests are performed in the tests.js file

## Documentation
Documentation is located in docs folder.
