import { isNonNegative } from './isNonNegative';

class NonNegativeNumber {
  public value: number;

  public constructor(value: number) {
    this.value = value;
    if (!isNonNegative(value)) {
      throw new NonNegativeNumberError(value);
    }
  }

  public static create(value: number) {
    return new NonNegativeNumber(value);
  }
}

class NonNegativeNumberError extends Error {
  constructor(value: number) {
    super(`Value: ${value} is not a 'non-negative' number!`);
  }
}

export { NonNegativeNumber, NonNegativeNumberError };
