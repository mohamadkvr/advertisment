import Joi from "joi";

export const schema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(10)
        .max(50)
        .required(),
    description: Joi.string()
    .min(10)
    .max(1000),
    parentId:Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
})


