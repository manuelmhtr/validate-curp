const validateCurp = require('../index');

describe('.validateCurp', () => {
  describe('when CURP is valid', () => {
    it('returns true for a valid person CURP', () => {
      const curp = 'MOTR930411HJCRMN03';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp,
        isValid: true,
      });
    });

    it('works with lowercase and symbols', () => {
      const curp = '  motr-930411/HjCR*mn03  ';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: 'MOTR930411HJCRMN03',
        isValid: true,
      });
    });
  });

  describe('support for special cases', () => {
    it('return is valid for "foreign" state (NE)', () => {
      const curp = 'MOTR930411HNERMN03';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp,
        isValid: true,
      });
    });
  });

  describe('when CURP is not valid', () => {
    it('should return false when CURP has Ñ', () => {
      const curp = 'MOTR930411HJCRMÑ03';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: null,
        isValid: false,
        errors: ['INVALID_FORMAT'],
      });
    });

    it('should return not valid and specify errors when input is not a string', () => {
      const curp = null;
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: null,
        isValid: false,
        errors: ['INVALID_FORMAT'],
      });
    });

    it('should return not valid and specify errors when format is incorrect', () => {
      const curp = 'INVALID_CURP';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: null,
        isValid: false,
        errors: ['INVALID_FORMAT'],
      });
    });

    it('should return not valid and specify errors when format is correct but date is not', () => {
      const curp = 'MOTR931311HJCRMN02';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: null,
        isValid: false,
        errors: ['INVALID_DATE'],
      });
    });

    it('should return not valid and specify errors when format is correct but state is not', () => {
      const curp = 'MOTR930411HXXRMN06';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: null,
        isValid: false,
        errors: ['INVALID_STATE'],
      });
    });

    it('should return not valid and specify errors when check digit is not correct', () => {
      const curp = 'MOTR930411HJCRMN06';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: null,
        isValid: false,
        errors: ['INVALID_CHECK_DIGIT'],
      });
    });

    it('should return not valid and specify errors when contains a forbidden word', () => {
      const curp = 'FETO930411HJCRMN01';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: null,
        isValid: false,
        errors: ['FORBIDDEN_WORD'],
      });
    });

    it('should return multiple errors when is required', () => {
      const curp = 'FETO931311HJCRMN06';
      const response = validateCurp(curp);
      expect(response).toEqual({
        curp: null,
        isValid: false,
        errors: ['INVALID_DATE', 'INVALID_CHECK_DIGIT', 'FORBIDDEN_WORD'],
      });
    });
  });
});
