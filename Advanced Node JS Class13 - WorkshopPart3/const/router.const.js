const router = require("express").Router();

const dishRouter = require("../routes/dish.routes");
const orderRouter = require("../routes/order.routes");

router.use("/dishes", dishRouter);
router.use("/orders", orderRouter);


module.exports = router;