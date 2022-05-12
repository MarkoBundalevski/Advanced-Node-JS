const Order = require("../models/order.models");
const DishService = require("../services/dish.service");

class OrderService {
    //1. Get all orders
    static async getAllOrders() {
        const orders = await Order.find({});

        return orders;
    }
    //2. Get orders by Id
    static async getOrderById(orderId) {
        const order = await Order.findById(orderId).populate("dishes");
        console.log(order);

        if(!order) return Promise.reject({msg: "Order not found"});

        return order;
    }
    //3. Create an order
    static async createOrder(orderData) {
        const order = new Order(orderData);

        const newOrder = await order.save();
        console.log(newOrder);
        return newOrder;
    }
    //4. Update order
    static async updateOrder(orderId, updateData) {
        const order = this.getOrderById(orderId);

        const orderKeys = Object.keys(order);

        console.log(orderKeys.length);

        const updateKeys = Object.keys(updateData);

        updateKeys.forEach(key => {
            order[key] = updateData[key];
        });

        await order.save();
        return order;
    }
    //5. Delete order
    static async deleteOrder(orderId) {
        await Order.findByIdAndDelete(orderId);
    }
    //6. Update dishes
    static async updateDishes(orderId, dishIds) {
        const order = await this.getOrderById(orderId);

        order.dishes = dishIds;

        order.dishes.forEach(async dishId => {
            await DishService.updateDish(dishId, {order: order._id});
        });

        await order.save();
        return order;
    }
}

module.exports = OrderService;