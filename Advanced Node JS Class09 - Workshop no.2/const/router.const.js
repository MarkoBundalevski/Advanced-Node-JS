const router = require("express").Router();
const authRouter = require("../routes/auth.router");
const restaurantDishRoutes = require("../routes/restaurant-dish.routes");
const restaurantOrderRoutes = require("../routes/restaurant-order.routes");

router.use(authRouter);

router.use("/dishes", restaurantDishRoutes);
router.use("/orders", restaurantOrderRoutes);

module.exports = router;