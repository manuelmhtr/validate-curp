const getCheckDigit = require('../getCheckDigit');

describe('.getVerificationDigit', () => {
  const testCases = {
    SABC560626MDFLRN01: '1',
    MOTR930411HJCRMN03: '3',
    MOTR930411HJCRMG73: '0',
  };

  Object.keys(testCases).forEach((curp) => {
    const digit = testCases[curp];

    it(`returns "${digit}" as verification digit for CURP "${curp}"`, () => {
      expect(getCheckDigit(curp)).toEqual(digit);
    });
  });
});
