import { Request, Response } from 'express';
const db = require('../models/index');
import jwt from "jsonwebtoken";

const OrderDetails = db.OrderDetails; // Correctly reference the OrderDetails model

const createOrder = async (req: Request, res: Response) => {
  try {
    const decodedToken: any = jwt.verify(req.body.userId, "MyTypescriptLearning");
    const decodeuserId = (decodedToken.id.toString());
    
    req.body.userId = decodeuserId;
    const order = await OrderDetails.create(req.body); // Use OrderDetails model to create order
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderDetails.findOne({ where: { order_id: req.params.orderId } }); // Use orderId to get order
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get order' });
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await OrderDetails.findAll({ where: { userId: req.params.userId } });
    if (!orders.length) {
      return res.status(404).json({ error: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
};

export { 
  createOrder,
  getOrder,
  getOrdersByUserId,
};