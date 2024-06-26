import { mongooseConenct } from '@/lib/mongoose';
import {Order} from "@/models/Order";

export default async function handler(req,res) {
  await mongooseConenct();
  res.json(await Order.find().sort({createdAt:-1}));
}