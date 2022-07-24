# Validate CURP

![](https://img.shields.io/badge/build-passing-green?style=flat)
![](https://img.shields.io/npm/dm/validate-curp)
![](https://img.shields.io/github/license/manuelmhtr/validate-curp?color=blue)

A simple and lightweight library to validate [Mexican CURPs](https://es.wikipedia.org/wiki/Clave_%C3%9Anica_de_Registro_de_Poblaci%C3%B3n) (Personal ID).


## Install

### NodeJS

Use NPM:

```shell
$ npm install --save validate-curp
```

Or YARN:

```shell
$ yarn add validate-curp
```

### Browser

Add the script to your project:

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/validate-curp@latest/dist/index.js" type="text/javascript"></script>

<!-- Or specify a version -->
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/validate-curp@v1.0.0/dist/index.js" type="text/javascript"></script>

<!-- This will export a global function "validateCurp": -->
<script type="text/javascript">
  var data = validateCurp('motr930411hjcrmn03');
  console.log(data);
</script>
```


## API

The library only exposes a single function (`.validateCurp`).


### .validateCurp(curp)


Checks whether a string is a valid CURP and returns validation details.


**Parameters**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`curp`|String|The CURP to be validated.|
|`options`|Object| Settings (Optional).|

**Response**

It returns a plain object with the values:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`isValid`|Boolean|Indicates if the string is a valid CURP.|
|`curp`|String|The formatted CURP (uppercase, with no white spaces or symbols). Returns `null` when input is an invalid CURP.|
|`errors`|Array[String]|In case the CURP is invalid, the reasons why the CURP is invalid will be listed here.|

Possible `errors` values and they description are:

| Error | Descripción |
| ----- | ----------- |
|`INVALID_FORMAT`|The format is invalid, that means, the string does not meet with the required length or expected structure. Eg: `XYZ` because clearly is not an CURP. |
|`INVALID_DATE`|The string may have the correct format, but digits generate an invalid date. Eg: `MOTR935511HJCRMN03` because it refers to month `55`.|
|`INVALID_STATE`|The string may have the correct format, but letters for state don't match with a valid one. Eg: `MOTR9390411HXXRMN03` because it refers to state `XX`, which does not exist. See the valid states list [here](/src/validStates.js).|
|`INVALID_CHECK_DIGIT`|The string has a valid format, but the last character (check digit) is invalid. Eg: `MOTR930411HJCRMN09` ends with `9` but it is expected to end with `3`.|
|`FORBIDDEN_WORD`|The string contains one of the inconvenient words that cannot be included in a CURP. Eg: `FETO930411HJCRMN03` the initials make the word `FETO` (fetus, LOL). Find the full list of words in [this document](http://www.ordenjuridico.gob.mx/Federal/PE/APF/APC/SEGOB/Instructivos/InstructivoNormativo.pdf).|


**Example**

```js
const validateCurp = require('validate-curp');

const response = validateCurp('motr930411hjcrmn03');
console.log(response);

/*
Prints:

{
  isValid: true,
  curp: 'MOTR930411HJCRMN03'
}

*/

const response = validateCurp('This is not a CURP');
console.log(response);

/*
Prints:

{
  isValid: false,
  curp: null,
  errors: ['INVALID_FORMAT']
}

*/
```


## Tests

Run the test with the command:

```shell
$ yarn test
```


## Related

* [validate-rfc](https://github.com/manuelmhtr/validate-rfc)
* You need to check if an RFC is registered in SAT or is blacklisted? Try with [Verifier](https://rapidapi.com/manuelmhtr/api/verifier).

## Licencia

MIT
