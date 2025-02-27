"use server";
import axios from "axios";
import * as cheerio from "cheerio";
import { removeNonDigits } from "../lib/utils";
import { STOREDATA } from "../../../types";
export async function scrapProduct(productUrl: string) {
  if (!productUrl) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHTDATA_USERNAME);
  const password = String(process.env.BRIGHTDATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(productUrl, options);
    const data = response.data;
    const $ = cheerio.load(data);
    const productPrice = $(".a-price-whole").text().trim().split(".")[0];
    const title = $("#productTitle").text().trim();
    const noOfRatings = removeNonDigits($("#acrCustomerReviewText").text());
    const actualNoOfRatings = noOfRatings.slice(0, noOfRatings.length / 2);
    const currency = $(".a-price-symbol").text().trim().slice(0, 1);
    const noOfStars = $(".a-size-base .a-color-base")
      .text()
      .trim()
      .split(" ")[0];
    const isInStock = $(".a-color-success").text().trim().includes("In stock");
    const productImage = $("#landingImage").attr("data-a-dynamic-image");
    const productImageUrls = Object.keys(JSON.parse(productImage || "") || "");
    const dataToStore = {
      url: productUrl,
      currency: currency || "₹",
      productImage: productImageUrls[0],
      title,
      productPrice,
      priceHistory: [],
      category: "category",
      instock: isInStock || false,
      reviewCount: noOfRatings || "0",
      stars: noOfStars || "0",
      lowestPrice: productPrice,
      highestPrice: productPrice,
    };
    return dataToStore;
  } catch (error: any) {
    console.log(`Error while fetching product`, error.message);
  }
}
