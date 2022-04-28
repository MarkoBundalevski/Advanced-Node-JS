const router = require("express").Router();
const DishController = require("../controllers/restaurant-dish.controller");

// Dish routes
router.get("/all-dishes", DishController.getAllDishes);
router.get("/:id", DishController.getDishesById);
router.post("/add-dishes", DishController.createNewDish);
router.patch("/:id/update-dishes", DishController.updateDishes);

module.exports = router;