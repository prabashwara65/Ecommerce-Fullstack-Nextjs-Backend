import mongoose from 'mongoose';
import { Category } from './Category';
const { Schema, model } = require("mongoose");

const ProductScehema = new Schema({
    title: {type: String , required: true},
    description: String,
    price: {type: Number , required: true},
    images: [{type: String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: {type: Object},

},{
    timestamps: true,
});

const Products = mongoose.models.Products || mongoose.model('Products', ProductScehema);
export default Products;