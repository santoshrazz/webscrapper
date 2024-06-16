import { scrapProduct } from "../scrapper";

export async function scrapAndStoreAmazonProduct(searchUrl: string) {
  if (!searchUrl) return;
  const mainUrl = new URL(searchUrl);
  if (
    mainUrl.hostname.includes("amazon.in") ||
    mainUrl.hostname.includes("amzn.in")
  ) {
    try {
      const response = await scrapProduct(searchUrl);
    } catch (error: any) {
      console.log(`An error occured while while fetching data `, error.message);
    }
  }
}
