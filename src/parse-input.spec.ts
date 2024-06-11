import { test, expect } from "vitest";
import { parseRawInput } from "./parse-input";

test("should be parsing input string into the key/value object", () => {
  expect(
    parseRawInput(`
        2 book at 12.49
        1 music CD at 14.99
        1 chocolate bar at 0.85
    `)
  ).toMatchObject([
    {
      quantity: 2,
      name: "book",
      unitPrice: [1249n, 2],
      price: [2498n, 2],
      imported: false,
      category: "book",
    },
    {
      quantity: 1,
      name: "music CD",
      unitPrice: [1499n, 2],
      price: [1499n, 2],
      imported: false,
      category: "unknown",
    },
    {
      quantity: 1,
      name: "chocolate bar",
      unitPrice: [85n, 2],
      price: [85n, 2],
      imported: false,
      category: "food",
    },
  ]);
});

test("should parseRawInput extract one item with extracted properties ", () => {
  expect(parseRawInput("2 book at 12.49")).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "book",
        unitPrice: [1249n, 2],
        quantity: 2,
        imported: false,
        category: "book",
      }),
    ])
  );
});
