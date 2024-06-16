import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  currency: {
    type: String,
    require: true,
  },
  productImage: {
    type: String,
    require: true,
  },
  productPrice: {
    type: String,
    require: true,
  },
  priceHistory: [
    {
      price: {
        type: String,
        require: true,
      },
      priceDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  category: {
    type: String,
  },
  reviewCount: {
    type: Number,
  },
  stars: {
    type: Number,
  },
});

const ProductModel =
  mongoose.models.PRODUCTS || mongoose.model("PRODUCTS", productSchema);
export default ProductModel;
