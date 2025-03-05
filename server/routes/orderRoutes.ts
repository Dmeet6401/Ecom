const express = require("express");
import getDataFromToken from "../controller/getDataFromToken";

const OrderController = require("../controller/orderController");

const router = express.Router();

router.post("/addOrder", OrderController.createOrder);
router.get("/getOrder/:orderId", OrderController.getOrder); // Update route to use orderId
router.get("/getOrdersByUserId/:userId", OrderController.getOrdersByUserId);

module.exports = router;
