import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './refactorHandling';
import couponsModel from '../models/couponsModel';
import { Coupons } from '../interfaces/coupons';

export const getAllCoupons = getAll<Coupons>(couponsModel, 'coupons');
export const createCoupon = createOne<Coupons>(couponsModel);
export const getCoupon = getOne<Coupons>(couponsModel);
export const updateCoupon = updateOne<Coupons>(couponsModel);
export const deleteCoupon = deleteOne<Coupons>(couponsModel);
