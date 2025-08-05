import { PositiveNumberError, PositiveNumber } from '../positiveNumber';

const invalidInputs = [0, -5, null, undefined, '', 'hello', {}];

describe('positive number', () => {
  describe('PositiveNumber class', () => {
    it('saves value', () => {
      let num = new PositiveNumber(5);
      expect(num.value).toBe(5);

      num = new PositiveNumber(253);
      expect(num.value).toBe(253);
    });

    test.each(invalidInputs)('throws an error with value: %p', (value: any) => {
      expect(() => new PositiveNumber(value)).toThrowError(PositiveNumberError);
    });
  });
});
