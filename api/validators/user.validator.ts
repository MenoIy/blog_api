import Joi from 'joi';

const register = Joi.object().keys({
  username: Joi.string().min(6).max(24).alphanum().required(),
  firstName: Joi.string().min(2).max(24).alphanum().required(),
  lastName: Joi.string().min(2).max(24).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(24)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
    .required()
});

const login = Joi.object().keys({
  username: Joi.string().min(6).max(24).alphanum().required(),
  password: Joi.string()
    .min(8)
    .max(24)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
    .required()
});

const update = Joi.object()
  .keys({
    username: Joi.string().min(6).max(24).alphanum(),
    firstName: Joi.string().min(6).max(24).alphanum(),
    lastName: Joi.string().min(6).max(24).alphanum(),
    email: Joi.string().email(),
    password: Joi.string()
      .min(8)
      .max(24)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
  })
  .or('username', 'firstName', 'lastName', 'email', 'password');


const getUser = Joi.object().keys({
  username : Joi.string().min(6).max(24).alphanum().required()
})

export default { register, login, update, getUser};
