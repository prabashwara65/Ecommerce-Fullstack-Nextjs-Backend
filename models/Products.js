import mongoose from 'mongoose';
const { Schema, model } = require("mongoose");

const ProductScehema = new Schema({
    title: {type: String , required: true},
    description: String,
    price: {type: Number , required: true},
});

const Products = mongoose.models.Products || mongoose.model('Products', ProductScehema);
export default Products;