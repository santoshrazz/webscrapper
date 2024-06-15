"use server";
import axios from "axios";
import * as cheerio from "cheerio";
export async function scrapAndStoreAmazonProduct(productUrl: string) {
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
    const pricetag = $(".a-price-whole");
    const title = $("#productTitle").text().trim();
  } catch (error: any) {
    console.log(`Error while fetching product`, error.message);
  }
}
