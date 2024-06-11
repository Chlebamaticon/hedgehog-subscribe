import { patternsByCategory } from "./constants";
import { Category, isKnownCategory, ParseInputResult } from "./types";

const INPUT_REGEX =
  /(\d+) (?:(imported) )?([\w ]+) (?:at) ((\d+)(?:\.(\d+)))/gim;

export const assessCategoryByName = (name: string): Category | "unknown" => {
  for (const categoryName of Object.keys(patternsByCategory)) {
    if (isKnownCategory(categoryName)) {
      const patterns = patternsByCategory[categoryName];
      const doesClassify = patterns.some((regex) => regex.test(name));
      if (doesClassify) {
        return categoryName;
      }
    }
  }
  return "unknown" as const;
};

export const parseInputMatch = (
  matchOrNot: RegExpMatchArray | null
): ParseInputResult => {
  if (!matchOrNot) {
    throw new Error(
      "InvalidInputError: input does not match the required pattern"
    );
  }
  const [_, quantity, imported, name, __, integer, fraction] = matchOrNot;
  const precision = fraction.length;
  const unitPrice = BigInt(
    parseInt(integer) * Math.pow(10, precision) + parseInt(fraction)
  );
  return {
    quantity: parseInt(quantity),
    imported: !!imported,
    name,
    category: assessCategoryByName(name),
    price: [unitPrice * BigInt(quantity), precision],
    unitPrice: [unitPrice, precision],
  };
};

export const parseRawInput = (input: string): ParseInputResult[] => {
  const matches = Array.from(input.matchAll(INPUT_REGEX));
  return matches.map((match) => parseInputMatch(match));
};
