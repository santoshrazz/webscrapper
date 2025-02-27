"use server";
import { connectToDb } from "@/Db/Connect.db";
import { STOREDATA } from "../../../types";
import { scrapProduct } from "../scrapper";
import ProductModel from "@/models/data.model";
import { findHighestPrice, findLowestPrice } from "./utils";
export async function scrapAndStoreAmazonProduct(searchUrl: string) {
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
      let product = scrapedProduct;
      const existingProduct = await ProductModel.findOne({
        url: scrapedProduct?.url,
      });
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
        const updatedExistingProduct = await existingProduct.save().lean();
        return updatedExistingProduct;
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
      return newProduct.toObject();
    } catch (error: any) {
      console.log(
        `An error occur
        ed while while fetching data `,
        error
      );
    }
  }
}
export async function getAllProduct() {
  connectToDb();
  try {
    const product = await ProductModel.find({});
    return product;
  } catch (error) {
    console.log(
      `An error occur
      ed while while fetching data `,
      error
    );
  }
}

export async function getSingleProduct(productId: string) {
  connectToDb();
  try {
    const singleProduct = await ProductModel.findById(productId);

    if (!singleProduct) {
      return {
        message: "Error finding single product",
      };
    }

    return singleProduct;
  } catch (error: any) {
    console.error("Error while fetching single product", error.message);
    return {
      message: "Error while fetching single product",
      error: error.message,
    };
  }
}
