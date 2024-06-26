
import mongoose from 'mongoose';
import React from 'react'
import { mongooseConenct } from '@/lib/mongoose';
import Products from '@/models/Products';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConenct();

    await isAdminRequest(req , res)

    if(method === 'GET'){
        if(req.query?.id){
            res.json(await Products.findOne({_id:req.query.id}))
        }
        else{
            res.json(await Products.find())
        }
        
    }

   
    if (method === 'PUT') {
        const {title,description,price,properties,images,category,_id} = req.body;
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
