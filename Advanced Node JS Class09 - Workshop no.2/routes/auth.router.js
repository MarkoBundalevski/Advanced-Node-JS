const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const userValidator = require("../middleware/user-validator.middleware");

router.post("/register", userValidator, AuthController.registerUser);
router.post("/login", userValidator, AuthController.loginUser);


module.exports = router;