import Joi from "joi";

export const schema = Joi.object({
    email: Joi.string()
        .empty()
        .email({ tlds: { allow: false } }) // Customize email validation rules as needed
        .required(),
    password: Joi.string()
        .alphanum()
        .required()
})


