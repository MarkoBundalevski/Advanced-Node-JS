const Dish = require("../models/dish.model");

class DishService {
    //1. Get all dishes
    static async getAllDishes() {
        const dishes = await Dish.find({});

        return dishes;
    }
    //2. Get dish by Id
    static async getDishById(dishId) {
        const dish = await Dish.findById(dishId);
        console.log(dish);

        return dish;
    }
    //3. Create a dish
    static async createDish(dishData) {
        const dish = new Dish(dishData);

        const response = await dish.save();
        console.log(response);
        return dish;
    }
    //4. Update a dish
    static async updateDish(dishId, updateData) {
        const dish = await Dish.findById(dishId);

        if(!dish) return Promise.reject({msg: "Dish not found"});

        const updateKeys = Object.keys(updateData);

        updateKeys.forEach((key) => {
            if(key !== "_id") {
                dish[key] = updateData[key];
            }
        });

        const updatedDish = await dish.save();
        return updatedDish;
    }
    //5. Delete dish
    static async deleteDish(dishId) {
        await Dish.findByIdAndDelete(dishId);
    }
}

module.exports = DishService;