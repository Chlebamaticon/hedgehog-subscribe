import { parseRawInput } from "./parse-input";
import { Item, ItemReceipt } from "./types";

import { add } from "./math";
import { formatReceipt } from "./format";
import { calculateTax } from "./tax";

export function counter(rawInput: string) {
  const parsedInputResults = parseRawInput(rawInput);

  const items: Item[] = [];
  for (const result of parsedInputResults) {
    const tax = calculateTax(result);
    const receipt: ItemReceipt = {
      tax,
      price: result.price,
      totalPrice: add(result.price, tax.total),
    };
    items.push({ ...result, receipt });
  }

  return formatReceipt(items);
}
