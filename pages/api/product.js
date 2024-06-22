
import mongoose from 'mongoose';
import React from 'react'
import { mongooseConenct } from '@/lib/mongoose';
import Products from '@/models/Products';

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConenct();

    if(method === 'GET'){
        res.json(await Products.find())
    }

    if (method === 'POST') {
        const { title, description, price } = req.body;
        const productDoc = await Products.create({
            title, description, price,
        })
        res.json(productDoc);
    }
}
