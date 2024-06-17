import { PRICEHISTORY } from "../../../types";

export function removeNonDigits(str: string) {
  return str.replace(/\D/g, "");
}
export function getLowestPrice(priceHistory: PRICEHISTORY[]) {
  if (priceHistory.length === 0) {
    return null; // handle case where the array is empty
  }

  // Initialize the lowest price to the first element's price
  let lowestPrice = parseFloat(priceHistory[0].price);

  // Iterate through the array
  for (let i = 1; i < priceHistory.length; i++) {
    const currentPrice = parseFloat(priceHistory[i].price);
    if (currentPrice < lowestPrice) {
      lowestPrice = currentPrice;
    }
  }

  return lowestPrice;
}
export function highestPrice(priceHistory: PRICEHISTORY[]) {
  if (priceHistory.length === 0) {
    return null; // handle case where the array is empty
  }

  // Initialize the highest price to the first element's price
  let highestPrice = parseFloat(priceHistory[0].price);

  // Iterate through the array
  for (let i = 1; i < priceHistory.length; i++) {
    const currentPrice = parseFloat(priceHistory[i].price);
    if (currentPrice > highestPrice) {
      highestPrice = currentPrice;
    }
  }

  return highestPrice;
}
