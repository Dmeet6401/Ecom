import mongoose from "mongoose";
import { describe } from "node:test";

const genderCategory = ["Men", "Women", "Kids"];
// id: 2,
//     name: "Basic Tee",
//     color: "Black",
//     price: "$35",
//     imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
//     imageAlt: "Front of men's Basic Tee in black."
 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: genderCategory,
        required: true,
    },
    category: {
        type: String,
        required: true,

    },
    describe: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    
     
})

const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
