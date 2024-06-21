export interface PRICEHISTORY {
  price: string;
  priceDate: Date;
}
export interface STOREDATA {
  url: string;
  currency: string;
  productImage: string;
  title: string;
  productPrice: string;
  priceHistory: PRICEHISTORY[];
  category: string;
  instock: boolean;
  reviewCount: string;
  stars: string;
  lowestPrice: string;
  highestPrice: string;
  _id: string | undefined;
}
