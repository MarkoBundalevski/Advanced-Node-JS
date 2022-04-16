const express = require("express");
const cors = require("cors");
const globalRouter = require("./const/router.const");

const app = express();

app.use(express.json());
app.use(cors());
app.use(globalRouter);

app.listen(4000, () => {
    console.log("Server is up and listening at port: 4000");
});