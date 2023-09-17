import { Document, Schema, model } from 'mongoose';
import { FormInterface } from './formModel';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface FormSectionInterface extends Document {
    _id: string;
    title: string;
    hideTitle?: boolean;
    hideBorders?: boolean;
    hideSection?: boolean;
    repeatable?: boolean;
    columnsCount?: number; 
    sortNumber: number;
    isRepeated?: boolean;
    repeatedRefId?: string;
    inputs:[
        {
            type: string;
            name: string;
            title: string;
            placeholder?: string;
            minLength?: number;
            maxLength?:  number;
            unique: boolean;
            disabled: boolean;
            required: boolean;
            value?: string;
            maxSize?:  number;
            fileType?: [string];
            isMobile?: boolean;
            min?:  number;
            max?:  number;
            clockType?: boolean;
            isJalali?: boolean;
            pick?: [string];
            startLabel?: string;
            endLabel?:string;
            maxScore?:  number;
            unit?:  number;
            maxRate?:  number;
            description?: string;
            checkboxLabel?: string;
            checked?: boolean;
            sortNumber: number;
            options:[
                {
                    type: string;
                    name: string;
                    title: string;
                    placeholder?: string;
                    sortNumber: number;
                    isChecked: boolean;
                    disabled: boolean;
                    required:boolean;
                    sections?: [FormSectionInterface]
                }
            ]
        }
    ]  
    createdAt: Date;
    updatedAt: Date;
}

const formSectionSchema = new Schema<FormSectionInterface>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    hideTitle: {type: Boolean},
    hideBorders: {type: Boolean},
    hideSection: {type: Boolean},
    repeatable: {type: Boolean},
    columnsCount: {type: Number},
    sortNumber: {type: Number},
    isRepeated: {type: Boolean},
    repeatedRefId: {type: String, trim: true},
    inputs:[
        {
            type: {type: String, trim: true},
            name: {type: String, trim: true},
            title: {type: String, trim: true},
            placeholder: {type: String, trim: true},
            minLength: {type: Number},
            maxLength: {type: Number},
            unique: {type: Boolean},
            disabled: {type: Boolean,},
            required: {type: Boolean},
            value: {type: Schema.Types.Mixed, trim: true},
            maxSize: {type: Number},
            fileType: [{type: String, trim: true}],
            isMobile: {type: Boolean},
            min: {type: Number},
            max: {type: Number},
            clockType: {type: Boolean},
            isJalali: {type: Boolean},
            pick: [{type: String, trim: true}],
            startLabel: {type: String, trim: true},
            endLabel: {type: String, trim: true},
            maxScore: {type: Number},
            unit: {type: Number},
            maxRate: {type: Number},
            description: {type: String, trim: true},
            checkboxLabel: {type: String, trim: true},
            checked: {type: Boolean},
            sortNumber: {type: Number},
            options: [
                {
                    type: {type: String, trim: true},
                    name: {type: String, trim: true},
                    title: {type: String, trim: true},
                    placeholder: {type: String, trim: true},
                    sortNumber: {type: Number},
                    isChecked: {type: Boolean},
                    disabled: {type: Boolean},
                    required: {type: Boolean},
                    sections: [{type:Object}]
                }
            ]
        }
    ]
},{timestamps:true});

formSectionSchema.plugin(mongoosePaginate)

const formSectionModel = model<FormSectionInterface>('formSection', formSectionSchema);

export default formSectionModel;