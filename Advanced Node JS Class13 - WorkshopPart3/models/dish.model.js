const mongoose = require("mongoose");
const { Schema } = mongoose;

//Dish schema
const dishSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Name of the dish is required"],
        minlength: 2,
    },
    price: {
        type: Number,
        min: [2, "Price of the dish must be greater than 2"],
        max: 100,
        required: [true, "Price of the dish is required"]
    },
    description: {
        type: String,
        required: [true, "Provide a description for the dish"],
        minlength: 8
    },
    orders: {
        type: Schema.Types.ObjectId,
        ref: "Order",
    },
});

//Dish model
const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;