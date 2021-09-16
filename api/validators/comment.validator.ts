import Joi, { string } from 'joi'

export const addSchema = Joi.object().keys({
    body : {
        content : Joi.string().required()
    },
    params : {
        id : Joi.string().required()
    }
})