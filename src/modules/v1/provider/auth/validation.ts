import Joi from "joi";

export const schema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .required(),
    lastName: Joi.string()
        .alphanum()
        .required(),
    nationalNumber: Joi.string()
        .alphanum()
        .required(),
    phoneNumber: Joi.string()
        .alphanum()
        .required(),    
    email: Joi.string(), 
    businessDescription: Joi.string()
    .min(10)
    .max(5000)
})


