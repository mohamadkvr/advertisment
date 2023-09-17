import { Document, Schema, model } from 'mongoose';
import { FormSectionInterface } from './formSectionModel';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface FormInterface extends Document {
  _id: string;
  title: string;
  sections: [
    {
      sortNumber:number;
      sectionId: FormSectionInterface  | string | null
    }
  ]
  createdAt: Date;
  updatedAt: Date;
}

const formSchema = new Schema<FormInterface>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  sections:[
    {
      sortNumber:{type:Number},
      sectionId: {type: Schema.Types.ObjectId , ref : 'formSection'}
    }
  ]
},{timestamps:true});

formSchema.plugin(mongoosePaginate)

const formModel = model<FormInterface>('form', formSchema);

export default formModel;