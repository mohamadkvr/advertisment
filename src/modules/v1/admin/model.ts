import { Timestamp } from 'mongodb';
import { Document, Schema, model } from 'mongoose';
import { IAdminGroup } from '../adminGroup/model';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface IAdmin extends Document {
  _id: string;
  firstName: string;
  lastName:string;
  phoneNumber: string;
  email: string;
  password: string;
  groups: [IAdminGroup] | [string],
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String
  },
  email:{type:String},
  password:{type:String},
  groups:[{type: Schema.Types.ObjectId , ref : 'adminGroup' }]
},{timestamps:true});

AdminSchema.plugin(mongoosePaginate)

export default model<IAdmin>('admin', AdminSchema);
