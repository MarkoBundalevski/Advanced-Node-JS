const router = require("express").Router();
const restaurantRoutes = require("../routes/restaurant.routes");

router.use("/dishes", restaurantRoutes);
router.use("/orders", restaurantRoutes);

module.exports = router;