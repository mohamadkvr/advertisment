import { Timestamp } from 'mongodb';
import { Document, Schema, model } from 'mongoose';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface IAdminGroup extends Document {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminGroupSchema = new Schema<IAdminGroup>({
  title: {
    type: String,
    required: true,
    unique: true,
  }
},{timestamps:true});

AdminGroupSchema.plugin(mongoosePaginate)

export default model<IAdminGroup>('adminGroup', AdminGroupSchema);