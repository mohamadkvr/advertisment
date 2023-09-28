import { Document, Schema, model } from 'mongoose';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName:string;
  phoneNumber: string;
  password: string;
  ban: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
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
  password:{type:String},
  ban:{type:Boolean}
},{timestamps:true});

UserSchema.plugin(mongoosePaginate)

export default model<IUser>('user', UserSchema);
