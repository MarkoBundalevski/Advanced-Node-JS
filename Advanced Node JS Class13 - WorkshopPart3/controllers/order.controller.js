const OrderService = require("../services/order.service");

class OrderController {
  //1. Get all orders
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //2. Get order by Id
  static async getOrderById(req, res) {
    try {
      const { id: courseId } = req.params;
      const order = await OrderService.getOrderById();

      if (!order) {
        return res
          .status(400)
          .send({ msg: `Order with ${orderId} does not exist` });
      }
      res.status(200).send(order);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //3. Create an order
  static async createOrder(req, res) {
    try {
      const orderData = req.body;

      const order = await OrderService.createOrder(orderData);

      res.status(201).send(order);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //4. Update order
  static async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const updateData = req.body;

      const updatedOrder = await OrderService.updateOrder(orderId, updateData);
      res.status(200).send(updatedOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //5. Delete order
  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;

      const deletedOrder = await OrderService.deleteOrder(orderId);

      if (!deletedOrder) {
        return res.status(404).send({ msg: "Order not found" });
      }

      res.status(200).send(deletedOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //6. Update dishes
  static async updateDishes(req, res) {
    try {
      const orderId = req.params.id;
      const dishIds = req.body.dishIds;

      const updatedOrder = await OrderService.updateOrders(orderId, dishIds);
      res.status(200).send(updatedOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = OrderController;
