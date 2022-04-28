const OrderModel = require("../models/restaurant-order.model");

class OrderController {
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderModel.getAllOrders();
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async getOrdersById(req, res) {
    try {
      const { id: orderId } = req.params;

      const order = await OrderModel.getOrderById(orderId);
      res.status(200).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async createNewOrder(req, res) {
    try {
      const newOrderData = req.body;
      const createdOrder = await OrderModel.addNewOrder(newOrderData);
      res.status(201).send(createdOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async updateOrders(req, res) {
    try {
      const orderId = req.params.id;
      const orderUpdates = req.body;

      if (orderUpdates.id) res.status(400).send({ msg: "Invalid update!" });
      await OrderModel.updateOrder(orderId, orderUpdates);

      res.status(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = OrderController;