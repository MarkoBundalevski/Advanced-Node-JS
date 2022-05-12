const router = require("express").Router();
const OrderController = require("../controllers/order.controller");

//1. Get all orders
router.get("/", OrderController.getAllOrders);
//2. Get order by Id
router.get("/:id", OrderController.getOrderById);
//3. Create an order
router.post("/", OrderController.createOrder);
//4. Update order
router.patch("/:id", OrderController.updateOrder);
//5. Delete order
router.delete("/:id", OrderController.deleteOrder);
//6. Update orders
router.patch("/:id/dishes", OrderController.updateDishes);

module.exports = router;