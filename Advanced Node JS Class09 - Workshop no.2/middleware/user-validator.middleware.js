const Joi = require("joi");

// User Schema
const userSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().min(13).max(100).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});


const userValidator = (req, res, next) => {
  const userData = req.body;
  
  const validation = userSchema.validate(userData);

  if (validation?.error) {
    res.status(400).send({
      msg: validation.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = userValidator;
