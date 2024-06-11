import { add } from "./math";
import { Item, PriceTuple, tuple } from "./types";

const formatUnit = ([value, precision]: PriceTuple) => {
  let valueAsString = value.toString();

  const isNegative = valueAsString.startsWith("-");
  valueAsString = isNegative ? valueAsString.slice(1) : valueAsString;
  valueAsString = valueAsString.padStart(precision, "0");
  const [integer, fraction] = [
    valueAsString.slice(0, valueAsString.length - precision),
    valueAsString.slice(valueAsString.length - precision),
  ];
  return `${isNegative ? "-" : ""}${integer || "0"}${
    fraction ? `.${fraction}` : ""
  }`;
};

export const formatItem = (item: Item): string => {
  return `${[item.quantity, item.imported ? "imported" : null, item.name]
    .filter((value) => value !== null)
    .join(" ")}: ${formatUnit(item.receipt.totalPrice)}`;
};

export const formatReceipt = (items: Item[]): string => {
  const formattedItems = items.map(formatItem);

  const { totalTax, totalPrice } = items.reduce(
    (acc, item) => ({
      ...acc,
      totalTax: add(acc.totalTax, item.receipt.tax.total),
      totalPrice: add(acc.totalPrice, item.receipt.totalPrice),
    }),
    {
      totalTax: tuple(0n, 0),
      totalPrice: tuple(0n, 0),
    }
  );
  const summaryItems = [
    `Sales Taxes: ${formatUnit(totalTax)}`,
    `Total: ${formatUnit(totalPrice)}`,
  ];

  return `${formattedItems.join("\n")}\n${summaryItems.join("\n")}`;
};
