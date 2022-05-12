const router = require("express").Router();
const { route } = require("express/lib/application");
const DishController = require("../controllers/dish.controller");

//1. Get all dishes
router.get("/", DishController.getAllDishes);
//2. Get dish by Id
router.get("/:id", DishController.getDishById);
//3. Create a dish
router.post("/", DishController.createDish);
//4. Update a dish
router.patch("/:id", DishController.updateDish);
//5. Delete a dish
router.delete("/:id", DishController.deleteDish);


module.exports = router;