import { Request, Response } from 'express';
const db = require('../models/index');
import getDataFromToken from "./getDataFromToken";

const Order = db.orderDetails;

// console.log("🚀 ~ Order:", Order)


const createOrder = async (req : Request, res: Response) => {
    try {
        const userId = await getDataFromToken(req);
        req.body.userId = userId;

        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

const getOrder = async (req : Request, res: Response) => {
    try {
        
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);    
    } catch (error) {    
        console.error(error);
        res.status(500).json({ error: 'Failed to get order' });
    }
};

export { 
    createOrder,
    getOrder 
};