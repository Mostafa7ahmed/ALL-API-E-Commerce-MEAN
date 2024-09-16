import { Schema, model } from 'mongoose';
import { Coupons } from '../interfaces/coupons';

const couponsSchema: Schema = new Schema<Coupons>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    discount: { type: Number, required: true, min: 1, max: 100 },
    expireTime: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model<Coupons>('coupons', couponsSchema);
