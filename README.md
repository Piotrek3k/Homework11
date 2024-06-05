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

