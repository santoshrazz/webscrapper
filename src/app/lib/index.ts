import { STOREDATA } from "../../../types";
import { scrapProduct } from "../scrapper";
import { connectToDb } from "./connectDb";
import { getLowestPrice, highestPrice } from "./utils";
// import ProductModel from "../Db/mongoose.model";
import { ProductModel } from "../Db/mongoose2.model";

connectToDb();
export async function scrapAndStoreAmazonProduct(searchUrl: string) {
  console.log(`Called scrapandStore funtion`);
  if (!searchUrl) return;
  const mainUrl = new URL(searchUrl);
  if (
    mainUrl.hostname.includes("amazon.in") ||
    mainUrl.hostname.includes("amzn.in")
  ) {
    try {
      const scrapedProduct = await scrapProduct(searchUrl);
      console.log(scrapedProduct);
      if (!scrapedProduct) return;
      let product: STOREDATA = scrapedProduct;
      console.log(`Before existing product`);
      const existingProduct = await ProductModel.findOne({
        url: scrapedProduct?.url,
      });
      console.log(`After existing product`);
      if (existingProduct) {
        const newPrice = {
          price: scrapedProduct.productPrice,
          date: Date.now(),
        };
        existingProduct.priceHistory.push(newPrice);
        existingProduct.lowestPrice = String(
          getLowestPrice(existingProduct.priceHistory)
        );
        existingProduct.highestPrice = String(
          highestPrice(existingProduct.priceHistory)
        );
        const updatedExistingProduct = await existingProduct.save();
        console.log(`UpdatedExisting Product is `, updatedExistingProduct);

        // const updatedPriceHistory = [
        //   ...existingProduct.priceHistory,
        //   { price: scrapedProduct?.productPrice },
        // ];
        // product = {
        //   ...scrapedProduct,
        //   priceHistory: updatedPriceHistory,
        //   lowestPrice: String(getLowestPrice(updatedPriceHistory)),
        //   highestPrice: String(highestPrice(updatedPriceHistory)),
        // };
      }
      const newProduct = await ProductModel.create(scrapProduct);
      console.log(newProduct);
    } catch (error: any) {
      console.log(`An error occured while while fetching data `, error);
    }
  }
}
