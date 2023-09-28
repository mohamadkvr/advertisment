import { Timestamp } from 'mongodb';
import { Document, Schema, model } from 'mongoose';
import { IAdminGroup } from '../adminGroup/model';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface IProvider extends Document {
  _id: string;
  firstName: string;
  lastName:string;
  phoneNumber: string;
  email: string;
  password: string;
  businessDescription:string;
  ban:boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProviderSchema = new Schema<IProvider>({
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
  businessDescription:{type:String},
  ban:{type:Boolean}
},{timestamps:true});

ProviderSchema.plugin(mongoosePaginate)

export default model<IProvider>('provider', ProviderSchema);
