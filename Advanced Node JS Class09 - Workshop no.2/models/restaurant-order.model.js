const DataService = require("../services/data.service");
const path = require("path");
const {v4: uuid} = require("uuid");


const restaurantOrdersPath = path.join(
  __dirname,
  "..",
  "data",
  "erestaurantOrders.json"
);

class Order {
  static async getAllOrders() {
    return DataService.readJSONFile(restaurantOrdersPath);
  }

  static async getOrderById(orderId) {
    const orders = await this.getAllOrders();
    const foundOrder = orders.find((order) => order.id == orderId);

    if (foundOrder) {
      return foundOrder;
    } else {
      return Promise.reject({ msg: "No such order exists!" });
    }
  }

  static async addNewOrder(newOrderData) {
    const orders = await this.getAllOrders();

    const orderExists = orders.some((order) => order.id == newOrderData.id);

    if (orderExists)
      return Promise.reject({ msg: "The order already exists!" });

    const newOrder = {
      id: uuid(),
      ...newOrderData,
    };
    const updatedOrders = [...orders, newOrder];
    await DataService.saveJSONFile(restaurantOrdersPath, updatedOrders);

    return newOrder;
  }

  static async updateOrder(orderId, updateOrderData) {
    const orders = await this.getAllOrders();
    const foundOrder = await this.getOrderById(orderId);

    const updatedOrder = {
      ...foundOrder,
      ...updateOrderData,
    };

    const updatedOrders = orders.map((order) =>
      order.id == foundOrder.id ? updatedOrder : order
    );
    await DataService.saveJSONFile(restaurantOrdersPath, updatedOrders);
  }
}

module.exports = Order;
