import { Timestamp } from 'mongodb';
import { Document, Schema, model } from 'mongoose';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface ICategory extends Document {
  _id: string;
  title: string;
  slug:string;
  description?: string;
  parentId?: ICategory;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String
  },
  parentId:{type: Schema.Types.ObjectId , ref : 'Category' }
},{timestamps:true});

CategorySchema.plugin(mongoosePaginate)

const CategoryModel = model<ICategory>('Category', CategorySchema);

export default CategoryModel;