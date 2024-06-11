import { patternsByCategory } from "./constants";

export const isKnownCategory = (name: string): name is Category =>
  name in patternsByCategory;

export type Category = keyof typeof patternsByCategory;
export type PriceTuple = [bigint, number];

export const tuple = (value: bigint, precision: number): PriceTuple => [
  value,
  precision,
];

export type TaxResult = {
  base: PriceTuple;
  duty: PriceTuple;
  total: PriceTuple;
};
export interface ParseInputResult {
  imported: boolean;
  name: string;
  quantity: number;
  price: PriceTuple;
  unitPrice: PriceTuple;
  category: Category | "unknown";
}

export type ItemReceipt = {
  tax: TaxResult;
  price: PriceTuple;
  totalPrice: PriceTuple;
};

export type Item = {
  receipt: ItemReceipt;
} & ParseInputResult;
