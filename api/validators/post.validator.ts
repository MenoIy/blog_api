import Joi from 'joi';

export const addSchema = Joi.object().keys({
  body: Joi.string().required()
});

export const findByUsernameSchema = Joi.object().keys({
  username: Joi.string().required()
});

export const deleteSchema = Joi.object().keys({
  id: Joi.string().required()
});

export const updateSchema = Joi.object().keys({
  params : {id : Joi.string().required()},
  body : {
    body :  Joi.string().required()
  }
})