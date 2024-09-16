import { Document } from 'mongoose';
import { Users } from './users';
import { Products } from './products';

export interface Carts extends Document {
  items: CartItems[];
  totalPrice: number;
  totalPriceAfterDiscount: number | undefined;
  user: Users;
}

export interface CartItems {
  _id?: string;
  product: Products;
  quantity: number;
  price: number;
}
