const getCheckDigit = require('./getCheckDigit');
const forbiddenWords = require('./forbiddenWords.json');
const validStates = require('./validStates');

const CURP_REGEXP = /^[A-Z][AEIOUX][A-Z]{2}[0-9]{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/;
const INVALID_FORMAT_ERROR = 'INVALID_FORMAT';
const INVALID_DATE_ERROR = 'INVALID_DATE';
const INVALID_STATE_ERROR = 'INVALID_STATE';
const INVALID_CHECK_DIGIT_ERROR = 'INVALID_CHECK_DIGIT';
const FORBIDDEN_WORD_ERROR = 'FORBIDDEN_WORD';

const parseInput = (input) => String(input)
  .trim()
  .toUpperCase()
  .replace(/[^0-9A-Z]/g, '');

const validateDate = (curp) => {
  const dateStr = curp.slice(4, 10);
  const year = dateStr.slice(0, 2);
  const month = dateStr.slice(2, 4);
  const day = dateStr.slice(4, 6);
  const date = new Date(`20${year}-${month}-${day}`);
  return !Number.isNaN(date.getTime());
};

const validateCheckDigit = (curp) => {
  const digit = curp.slice(-1);
  const expected = getCheckDigit(curp);
  return expected === digit;
};

const validateState = (curp) => {
  const state = (curp || '').slice(11, 13);
  return validStates.includes(state);
};

const hasForbiddenWords = (curp) => {
  const prefix = (curp || '').slice(0, 4);
  return forbiddenWords.includes(prefix);
};

const validate = (curp) => {
  const errors = [];
  const hasValidFormat = CURP_REGEXP.test(curp);
  const hasValidDate = hasValidFormat ? validateDate(curp) : true;
  const hasValidState = hasValidFormat ? validateState(curp) : true;
  const hasValidDigit = hasValidFormat ? validateCheckDigit(curp) : true;
  if (!hasValidFormat) errors.push(INVALID_FORMAT_ERROR);
  if (!hasValidDate) errors.push(INVALID_DATE_ERROR);
  if (!hasValidState) errors.push(INVALID_STATE_ERROR);
  if (!hasValidDigit) errors.push(INVALID_CHECK_DIGIT_ERROR);
  if (hasForbiddenWords(curp)) errors.push(FORBIDDEN_WORD_ERROR);
  return errors;
};

const getValidResponse = (curp) => ({
  isValid: true,
  curp,
});

const getInvalidResponse = (errors) => ({
  isValid: false,
  curp: null,
  errors,
});

module.exports = (input) => {
  const curp = parseInput(input);
  const errors = validate(curp);
  const isValid = errors.length === 0;

  return isValid ? getValidResponse(curp) : getInvalidResponse(errors);
};
