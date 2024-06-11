import { add, floatToTuple, multiply, multiplyByFloat, roundUp } from "./math";
import { Category, ParseInputResult, TaxResult, tuple } from "./types";

const baseTaxInRatio = 0.1;
const dutyTaxInRatio = 0.05;

const taxFreeCategories: (Category | "unknown")[] = ["book", "food", "medical"];
export const calculateTax = ({
  quantity,
  unitPrice,
  category,
  imported,
}: ParseInputResult): TaxResult => {
  const isTaxFree = taxFreeCategories.includes(category);
  const isDutyFree = !imported;

  const baseTaxPerUnit = isTaxFree
    ? tuple(0n, 0)
    : roundUp(multiplyByFloat(unitPrice, baseTaxInRatio));

  const dutyTaxPerUnit = isDutyFree
    ? tuple(0n, 0)
    : roundUp(multiplyByFloat(unitPrice, dutyTaxInRatio));

  const baseTax = tuple(
    baseTaxPerUnit[0] * BigInt(quantity),
    baseTaxPerUnit[1]
  );

  const dutyTax = tuple(
    dutyTaxPerUnit[0] * BigInt(quantity),
    dutyTaxPerUnit[1]
  );

  const totalTax = add(baseTax, dutyTax);
  return {
    base: baseTax,
    duty: dutyTax,
    total: totalTax,
  };
};
