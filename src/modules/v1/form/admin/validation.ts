import Joi from "joi";

export const Sectionschema = Joi.object({
    title: Joi.string().alphanum().min(10).max(50).required(),
    hideTitle:Joi.boolean(),
    hideBorders: Joi.boolean(),
    hideSection: Joi.boolean(),
    repeatable: Joi.boolean(),
    columnsCount:Joi.number(),
    sortNumber: Joi.number().required(),
    isRepeated: Joi.boolean(),
    repeatedRefId: Joi.string(),
    inputs:Joi.array().items(Joi.object(
        {
            type: Joi.string().required(),
            name: Joi.string().required(),
            title: Joi.string().required(),
            placeholder:Joi.string(),
            minLength: Joi.number(),
            maxLength:Joi.number(),
            unique: Joi.boolean(),
            disabled: Joi.boolean(),
            required: Joi.boolean(),
            value: Joi.string(),
            maxSize:Joi.number(),
            fileType: [Joi.string()],
            isMobile: Joi.boolean(),
            min:  Joi.number(),
            max:  Joi.number(),
            clockType: Joi.boolean(),
            isJalali: Joi.boolean(),
            pick: [Joi.string()],
            startLabel: Joi.string(),
            endLabel:Joi.string(),
            maxScore:  Joi.number(),
            unit: Joi.number(),
            maxRate:  Joi.number(),
            description: Joi.string(),
            checkboxLabel: Joi.string(),
            checked: Joi.boolean(),
            sortNumber: Joi.number(),
            options:Joi.array().items(Joi.object(
                {
                    type: Joi.string(),
                    name: Joi.string(),
                    title: Joi.string(),
                    placeholder: Joi.string(),
                    sortNumber: Joi.number(),
                    isChecked: Joi.boolean(),
                    disabled: Joi.boolean(),
                    required:Joi.boolean(),
                    sections: [Joi.object()]
                }
            ))
        }
    ))
})


export const FormSchema = Joi.object({  
    title: Joi.string().alphanum().min(10).max(50).required(),
    sections:Joi.array().items(Joi.object(
        {
            sortNumber:Joi.number(),
            sectionId: Joi.string()
        }
    ))
})

