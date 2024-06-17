// import mongoose from "mongoose";

// console.log(mongoose.models.products);
// const productSchema = new mongoose.Schema(
//   {
//     url: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     currency: {
//       type: String,
//       required: true,
//     },
//     productImage: {
//       type: String,
//       required: true,
//     },
//     productPrice: {
//       type: String,
//       required: true,
//     },
//     instock: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     priceHistory: [
//       {
//         price: {
//           type: String,
//           required: true,
//         },
//         priceDate: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//     lowestPrice: {
//       type: String,
//     },
//     highestPrice: {
//       type: String,
//     },
//     category: {
//       type: String,
//     },
//     reviewCount: {
//       type: String,
//     },
//     stars: {
//       type: String,
//     },
//     users: [
//       {
//         email: {
//           type: String,
//           required: true,
//         },
//         default: [],
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export const ProductModel =
//   mongoose.models.products || mongoose.model("products", productSchema);

// export default ProductModel;
