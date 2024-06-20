import { PRICEHISTORY } from "../../../types";

export function removeNonDigits(str: string) {
  return str.replace(/\D/g, "");
}

interface PriceHistory {
  price: string;
  _id: string;
  priceDate: string;
}
const priceHistory: PriceHistory[] = [
  {
    price: "22,999",
    _id: "new ObjectId('66719fdab636014fa111f519')",
    priceDate: " 2024-06-18T14:55:22.015Z",
  },
  {
    price: "22,999",
    _id: "new ObjectId('6671a046b636014fa111f51f'),",
    priceDate: " 2024-06-18T14:57:10.385Z",
  },
  {
    price: "22,999",
    _id: "new ObjectId('6671a051b636014fa111f524'),",
    priceDate: " 2024-06-18T14:57:21.208Z",
  },
];

export function findHighestPrice(priceHistory: PriceHistory[]): number | null {
  let highestPrice: number | null = null;

  priceHistory.forEach((item) => {
    // Remove commas from the price string and convert to number
    const price = parseFloat(item.price.replace(/,/g, ""));

    // Compare and update the highest price
    if (highestPrice === null || price > highestPrice) {
      highestPrice = price;
    }
  });

  return highestPrice;
}

export function findLowestPrice(priceHistory: PriceHistory[]): number | null {
  let lowestPrice: number | null = null;

  priceHistory.forEach((item) => {
    // Remove commas from the price string and convert to number
    const price = parseFloat(item.price.replace(/,/g, ""));

    // Compare and update the lowest price
    if (lowestPrice === null || price < lowestPrice) {
      lowestPrice = price;
    }
  });

  return lowestPrice;
}
