import { Timestamp } from 'mongodb';
import { Document, Schema, model } from 'mongoose';
import { IProvider } from '../provider/model';
import { ICategory } from '../category/model';
import  mongoosePaginate from 'mongoose-paginate-v2';

export interface IBusinessLocation extends Document {
  _id: string;
  providerId:IProvider | string;
  categories:[ICategory] | [string];
  lat: number,
  lng:number,
  information: string,
  images:[object],
  introductionVideo:object,
  active: boolean,
  ban:boolean,
  isVisible: boolean;
  confirmation: boolean;
  address: string;
  businessContactNumber: [string];
  body: string;
  logo: object; 
  markerIcon: object;
  links: [string];
  createdAt: Date;
  updatedAt: Date;
}

const businessLocationSchema = new Schema<IBusinessLocation>({
  providerId:{type: Schema.Types.ObjectId , ref : 'provider' },
  categories:[{type: Schema.Types.ObjectId , ref : 'Category' }],
  lat: {type:Number},
  lng:{type:Number},
  information: {
    type: String
  },
  images:[{type:Object}],
  introductionVideo:{type:Object},
  active: {type:Boolean},
  ban:{type:Boolean},
  isVisible: {type:Boolean},
  confirmation: {type:Boolean},
  address:{
    type: String
  },
  businessContactNumber: [{
    type: String
  }],
  body: {
    type: String
  },
  logo: {type:Object},
  markerIcon: {type:Object},
  links: [
    {
      type: String
    },
  ]
},{timestamps:true});

businessLocationSchema.plugin(mongoosePaginate)

export default model<IBusinessLocation>('businessLocation', businessLocationSchema);
