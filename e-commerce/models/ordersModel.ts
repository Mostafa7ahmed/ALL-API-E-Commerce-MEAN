import { Schema, model } from 'mongoose';
import { Orders } from '../interfaces/orders';

const ordersSchema: Schema = new Schema<Orders>(
  {
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: Number,
        price: Number,
      },
    ],
    totalPrice: Number,
    paymentMethod: { type: String, enum: ['card', 'cash'], default: 'cash' },
    deliveredAt: Date,
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    taxPrice: { type: Number, default: 0 },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
);

ordersSchema.pre<Orders>(/^find/, function (next) {
  this.populate({ path: 'items.product', select: 'name cover' });
  this.populate({ path: 'user', select: 'name image email' });
  next();
});

export default model<Orders>('orders', ordersSchema);
