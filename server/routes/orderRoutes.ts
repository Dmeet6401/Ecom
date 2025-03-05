import getDataFromToken from "../controller/getDataFromToken";

const OrderController = require("../controller/orderController");
const getOrder = require("../controller/orderController");
const express = require("express");

const router = express.Router();

router.post("/addOrder", OrderController.createOrder);
router.get("/getOrder/:id", OrderController.getOrder);

module.exports = router;
