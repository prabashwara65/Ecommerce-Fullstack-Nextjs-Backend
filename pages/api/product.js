
import mongoose from 'mongoose';
import React from 'react'
import { mongooseConenct } from '@/lib/mongoose';
import Products from '@/models/Products';

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConenct();

    if(method === 'GET'){
        if(req.query?.id){
            res.json(await Products.findOne({_id:req.query.id}))
        }
        else{
            res.json(await Products.find())
        }
        
    }

    if (method === 'POST') {
        const { title, description, price } = req.body;
        const productDoc = await Products.create({
            title, description, price,
        })
        res.json(productDoc);
    }

    if (method === 'PUT') {
        const {title,description,price,images,category,properties,_id} = req.body;
        await Products.updateOne({_id}, {title,description,price,images,category,properties});
        res.json(true);
      }
    
      if (method === 'DELETE') {
        if (req.query?.id) {
          await Products.deleteOne({_id:req.query?.id});
          res.json(true);
        }
      }
}
