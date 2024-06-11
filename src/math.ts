import { PriceTuple } from "./types";
const FLOAT_REGEX = /(\d*)(?:\.(\d+))?/im;

export const pow = (base: number, exponent: number): bigint =>
  BigInt(Math.pow(base, exponent));

export const floatToTuple = (float: number): PriceTuple => {
  const matchOrNot = `${float}`.match(FLOAT_REGEX);
  if (!matchOrNot) {
    throw new Error("Invalid number");
  }
  const [, integer, fraction] = matchOrNot;
  const precision = fraction?.length ?? 0;
  const equator = 10n ** BigInt(precision);
  const integerBigInt = BigInt(integer);
  const fractionBigInt = fraction ? BigInt(fraction) : 0n;
  const amount =
    integerBigInt > 0
      ? integerBigInt * equator + fractionBigInt
      : fractionBigInt;

  return [amount, precision];
};

export const multiplyByFloat = (a: PriceTuple, bFloat: number): PriceTuple => {
  const b = floatToTuple(bFloat);

  return multiply(a, b);
};

export const multiply = (
  [aPrice, aPrecision]: PriceTuple,
  [bPrice, bPrecision]: PriceTuple
): PriceTuple => {
  if (aPrecision > bPrecision) {
    const exponent = pow(10, aPrecision - bPrecision);
    return [(aPrice * bPrice) / exponent, aPrecision];
  } else if (bPrecision > aPrecision) {
    const exponent = pow(10, bPrecision - aPrecision);
    return [(aPrice * bPrice) / exponent, bPrecision];
  } else {
    return [(aPrice * bPrice) / pow(10, aPrecision), aPrecision];
  }
};

export const add = (
  [aPrice, aPrecision]: PriceTuple,
  [bPrice, bPrecision]: PriceTuple
): PriceTuple => {
  if (aPrecision > bPrecision) {
    return [aPrice + bPrice * pow(10, aPrecision - bPrecision), aPrecision];
  } else if (bPrecision > aPrecision) {
    return [aPrice * pow(10, bPrecision - aPrecision) + bPrice, bPrecision];
  } else {
    return [aPrice + bPrice, aPrecision];
  }
};

export const roundUp = ([value, precision]: PriceTuple): PriceTuple => {
  const lastDigit = value % 10n;
  const mod = lastDigit % 5n;
  if (mod > 0) {
    return [value + (5n - mod), precision];
  } else {
    return [value, precision];
  }
};
