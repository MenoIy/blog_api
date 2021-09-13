import Joi from 'joi';

const create = Joi.object().keys({
    body: Joi.string().required()
})

const findByUserName = Joi.object().keys({
    userName: Joi.string().required()
})

export default {create, findByUserName};
