import mongoose from "mongoose";

export async function connectToDb() {
  try {
    const MONGODB_URI = `mongodb://127.0.0.1:27017/webScrapper`;
    if (!MONGODB_URI) {
      return console.log(`No mongodb connection url found`);
    }
    const connectionInstance = await mongoose.connect(MONGODB_URI);
    console.log(
      `Connected db successfully`,
      connectionInstance.connection.host
    );
    mongoose.connection.on("error", () => {
      console.log(`DB connection error`);
      process.exit(1);
    });
  } catch (error) {
    console.log(`Error while connecting DB `, error);
  }
}
