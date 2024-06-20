"use server";
import { connectToDb } from "@/Db/Connect.db";
import { STOREDATA } from "../../../types";
import { scrapProduct } from "../scrapper";
import ProductModel from "@/models/data.model";
import { findHighestPrice, findLowestPrice } from "./utils";
import { useRouter } from "next/router";
export async function scrapAndStoreAmazonProduct(searchUrl: string) {
  const router = useRouter();
  connectToDb();
  if (!searchUrl) return;
  const mainUrl = new URL(searchUrl);
  if (
    mainUrl.hostname.includes("amazon.in") ||
    mainUrl.hostname.includes("amzn.in")
  ) {
    try {
      const scrapedProduct = await scrapProduct(searchUrl);
      if (!scrapedProduct) return;
      let product: STOREDATA = scrapedProduct;
      const existingProduct = await ProductModel.findOne({
        url: scrapedProduct?.url,
      });
      console.log(existingProduct);
      console.log(`After existing product`);
      if (existingProduct) {
        const newPrice = {
          price: scrapedProduct.productPrice,
          date: Date.now(),
        };
        existingProduct.priceHistory.push(newPrice);
        existingProduct.lowestPrice = String(
          findLowestPrice(existingProduct.priceHistory)
        );
        existingProduct.highestPrice = String(
          findHighestPrice(existingProduct.priceHistory)
        );
        const updatedExistingProduct = await existingProduct.save();
        console.log(`UpdatedExisting Product is `, updatedExistingProduct);
        return;
      }
      const newProduct = await ProductModel.create({
        url: product.url,
        title: product.title,
        currency: product.currency,
        productImage: product.productImage,
        productPrice: product.productPrice,
        instock: product.instock,
        priceHistory: product.priceHistory,
        lowestPrice: product.lowestPrice,
        highestPrice: product.highestPrice,
        category: product.category,
        reviewCount: product.reviewCount,
        stars: product.stars,
      });
      console.log(newProduct);
      router.push({
        pathname: "/productpage",
        query: newProduct,
      });
    } catch (error: any) {
      console.log(`An error occured while while fetching data `, error);
    }
  }
}
