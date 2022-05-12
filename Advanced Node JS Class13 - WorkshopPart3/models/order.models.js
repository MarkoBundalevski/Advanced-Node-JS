const mongoose = require("mongoose");
const { Schema } = mongoose;

//Order schema
const orderSchema = new Schema ({
    dish: {
        type: Schema.Types.ObjectId,
        ref: "Dish",
    },
    status: {
        type: String,
        required: true,
    }
});

//Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;