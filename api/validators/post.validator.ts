import Joi from 'joi';

const create = Joi.object().keys({
    body: Joi.string().required()
})

export default {create};
