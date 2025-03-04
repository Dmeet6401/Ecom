import mongoose from "mongoose";

const genderCategory = ["Men", "Women", "Kids"];
 
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
