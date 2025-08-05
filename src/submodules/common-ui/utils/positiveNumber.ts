import isPositive from './isPositive';

class PositiveNumber {
  public value: number;

  public constructor(value: number) {
    this.value = value;
    if (!isPositive(value)) {
      throw new PositiveNumberError(value);
    }
  }

  public static create(value: number) {
    return new PositiveNumber(value);
  }
}

class PositiveNumberError extends Error {
  constructor(value: number) {
    super(`Value: ${value} is not a positive number!`);
  }
}

export { PositiveNumber, PositiveNumberError };
