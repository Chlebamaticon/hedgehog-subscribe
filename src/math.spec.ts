import { expect, test } from "vitest";
import { add, multiply, roundUp } from "./math";
import { tuple } from "./types";

test.each([
  { a: tuple(120n, 2), b: tuple(2400n, 3), expected: [3600n, 3] },
  { a: tuple(24980n, 3), b: tuple(49960n, 4), expected: [299760n, 4] },
])("should add $a and $b to get $expected", ({ a, b, expected }) => {
  expect(add(a, b)).toMatchObject(expected);
});

test.each([
  { a: tuple(120n, 2), b: tuple(2400n, 3), expected: [28800n, 3] },
  { a: tuple(24980n, 3), b: tuple(49960n, 4), expected: [124800080n, 4] },
])("should multiply $a and $b to get $expected", ({ a, b, expected }) => {
  expect(multiply(a, b)).toMatchObject(expected);
});

test.each([
  { input: tuple(100n, 4), output: [100n, 4] },
  { input: tuple(101n, 4), output: [105n, 4] },
  { input: tuple(102n, 4), output: [105n, 4] },
  { input: tuple(103n, 4), output: [105n, 4] },
  { input: tuple(104n, 4), output: [105n, 4] },
  { input: tuple(105n, 4), output: [105n, 4] },
  { input: tuple(106n, 4), output: [110n, 4] },
  { input: tuple(107n, 4), output: [110n, 4] },
  { input: tuple(108n, 4), output: [110n, 4] },
  { input: tuple(109n, 4), output: [110n, 4] },
  { input: tuple(110n, 4), output: [110n, 4] },
])("should round $input to $output", ({ input, output }) => {
  expect(roundUp(input)).toEqual(output);
});
