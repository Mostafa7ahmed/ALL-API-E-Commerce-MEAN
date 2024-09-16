import { Document } from 'mongoose';

export interface Coupons extends Document {
  name: string;
  discount: number;
  expireTime: Date;
}
