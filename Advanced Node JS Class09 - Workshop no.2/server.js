require("dotenv").config();

console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_TOKEN_SECRET);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalRouter = require("./const/router.const");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(globalRouter);

app.listen(4000, () => {
    console.log("Server is up and listening at port: 4000");
});