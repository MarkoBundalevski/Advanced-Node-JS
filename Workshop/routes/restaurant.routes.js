const router = require("express").Router();
const DishController = require("../controllers/restaurant.controller");

router.get("/all", DishController.getAllDishes);
router.get("/:id", DishController.getDishesById);
router.post("/add", DishController.createNewDish);
router.patch("/:id/update", DishController.updateDishes);

module.exports = router;