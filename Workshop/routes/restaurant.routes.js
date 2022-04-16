const router = require("express").Router();
const DishController = require("../controllers/restaurant.controller");

// Dish routes
router.get("/all", DishController.getAllDishes);
router.get("/:id", DishController.getDishesById);
router.post("/add", DishController.createNewDish);
router.patch("/:id/update", DishController.updateDishes);

// Order routes


module.exports = router;