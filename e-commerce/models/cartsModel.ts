import { Schema, model } from 'mongoose';
import { Carts } from '../interfaces/cart';

const cartsSchema: Schema = new Schema<Carts>(
  {
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number, default: 1 },
        price: Number,
      },
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
);

cartsSchema.pre<Carts>(/^find/, function (next) {
  this.populate({ path: 'items.product', select: 'name cover' });
  next();
});

export default model<Carts>('carts', cartsSchema);
