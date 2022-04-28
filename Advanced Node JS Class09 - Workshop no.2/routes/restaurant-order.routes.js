const router = require("express").Router();
const OrderController = require("../controllers/restaurant-order.controller");

// Order routes
router.get("/all-orders", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrdersById);
router.post("/add-orders", OrderController.createNewOrder);
router.patch("/:id/update-orders", OrderController.updateOrders);


module.exports = router;