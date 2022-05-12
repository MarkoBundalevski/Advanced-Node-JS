const DishService = require("../services/dish.service");

class DishController {
  //1. Get all dishes
  static async getAllDishes(req, res) {
    try {
      const dishes = await DishService.getAllDishes();
      res.status(200).send(dishes);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //2. Get dish by Id
  static async getDishById(req, res) {
    try {
      const dishId = req.params.id;
      const dish = await DishService.getDishById(dishId);

      if (!dish) {
        return res
          .status(400)
          .send({ msg: `Dish with id: ${dishId} not found` });
      }
      res.status(200).send(dish);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //3. Create a dish
  static async createDish(req, res) {
    try {
      const dishData = req.body;

      const dish = await DishService.createDish(dishData);

      res.status(201).send(dish);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //4. Update dish
  static async updateDish(req, res) {
    try {
      const updates = req.body;
      const dishId = req.params.id;

      const updatedDish = await DishService.updateDish(dishId, updates);
      res.status(200).send(updatedDish);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //5. Delete dish
  static async deleteDish(req, res) {
    try {
      const dishId = req.params.id;

      await DishService.deleteDish(dishId);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = DishController;
