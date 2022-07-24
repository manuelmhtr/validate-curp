export default function validateCurp<T extends string>(curp: T): {
  isValid: boolean,
  curp?: T,
  errors?: ('INVALID_FORMAT' | 'INVALID_DATE' | 'INVALID_STATE' | 'INVALID_VERIFICATION_DIGIT' | 'FORBIDDEN_WORD')[]
};
