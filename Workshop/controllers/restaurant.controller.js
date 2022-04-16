const DishModel = require("../models/restaurant.model");

class DishController {
  static async getAllDishes(req, res) {
    try {
      const dishes = await DishModel.getAllDishes();
      res.status(200).send(dishes);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async getDishesById(req, res) {
    try {
      const { id: dishId } = req.params;

      const dish = await DishModel.getDishById(dishId);
      res.status(200).send(dish);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async createNewDish(req, res) {
    try {
      const newDishData = req.body;
      const createdDish = await DishModel.addNewDish(newDishData);
      res.status(201).send(createdDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async updateDishes(req, res) {
    try {
      const dishId = req.params.id;
      const dishUpdates = req.body;

      if (dishUpdates.id) res.status(400).send({ msg: "Invalid update!" });
      await DishModel.updateDish(dishId, dishUpdates);

      res.status(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = DishController;
