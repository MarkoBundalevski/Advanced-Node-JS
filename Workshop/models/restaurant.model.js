const DataService = require("../services/data.service");
const path = require("path");
const { v4: uuid } = require("uuid");

const restaurantPath = path.join(
  __dirname,
  "..",
  "data",
  "erestaurantDishes.json"
);

class Dish {
  static async getAllDishes() {
    return DataService.readJSONFile(restaurantPath);
  }

  static async getDishById(dishId) {
    const dishes = await this.getAllDishes();
    const foundDish = dishes.find((dish) => dish.id == dishId);

    if (foundDish) {
      return foundDish;
    } else {
      return Promise.reject({ msg: "No such dish found!" });
    }
  }

  static async addNewDish(newDishData) {
    const dishes = await this.getAllDishes();
    const dishPriceValidator = req.param.price;

    const dishExists = dishes.some((dish) => dish.name == newDishData.name);

    if (dishExists) return Promise.reject({ msg: "The dish already exists!" });

    const newDish = {
      id: uuid(),
      ...newDishData,
    };

    if (dishPriceValidator > 1000 || dishPriceValidator < 1) {
      return Promise.reject({
        msg: "The price hasn't been validated. No prices above 1000 or below 1!",
      });
    }

    const updatedDishes = [...dishes, newDish];
    await DataService.saveJSONFile(restaurantPath, updatedDishes);

    return newDish;
  }

  static async updateDish(dishId, dishUpdateData) {
    const dishes = await this.getAllDishes();
    const foundDish = await this.getDishById(dishId);
    const dishPriceValidator = req.param.price;

    const updatedDish = {
      ...foundDish,
      ...dishUpdateData,
    };

    if (dishPriceValidator > 1000 || dishPriceValidator < 1) {
      return Promise.reject({
        msg: "The price hasn't been validated. No prices above 1000 or below 1!",
      });
    }

    const updatedDishes = dishes.map((dish) =>
      dish.id == foundDish.id ? updatedDish : dish
    );
    await DataService.saveJSONFile(restaurantPath, updatedDishes);
  }
}

module.exports = Dish;
