import { Document, Schema, model } from 'mongoose';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface IMedia extends Document {
  _id: string;
  title: string;
  url:string;
  type: string;
  mimeType: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  title: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
    unique: true,
  },
  type: {
    type: String
  },
  alt:{type:String},
  mimeType:{type:String},
},{timestamps:true});

MediaSchema.plugin(mongoosePaginate)

export default model<IMedia>('media', MediaSchema);
