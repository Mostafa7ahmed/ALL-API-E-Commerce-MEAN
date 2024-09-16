import { Document } from 'mongoose';
import { Products } from './products';
import { Users } from './users';

export interface Reviews extends Document {
  comment: string;
  rate: number;
  product: Products;
  user: Users;
}
