import mongoose from "mongoose";

const connectToDb = async () => {
  let isConnected = false;
  if (!process.env.MONGODB_URI) return console.log("No Connection String");
  if (isConnected) return console.log("Db Already Connected");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
  } catch (error: any) {
    console.log(`Error while connecting with DB`, error.message);
  }
};
