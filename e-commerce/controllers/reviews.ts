import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './refactorHandling';
import reviewsModel from '../models/reviewsModel';
import { Reviews } from '../interfaces/reviews';
import { NextFunction, Request, Response } from 'express';
import { FilterData } from '../interfaces/filterData';

export const filterReviews = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let filterData: FilterData = {};
  if (req.params.productId) {
    filterData.product = req.params.productId;
  }
  if (req.user?.role === 'user' && !req.params.productId) {
    filterData.user = req.user._id;
  }
  next();
};
export const setProductAndUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.user) {
    req.body.user = req.user?._id;
  }
  if (!req.body.product) {
    req.body.product = req.params.productId;
  }
  next();
};

export const getAllReviews = getAll<Reviews>(reviewsModel, 'reviews');
export const createReview = createOne<Reviews>(reviewsModel);
export const getReview = getOne<Reviews>(reviewsModel);
export const updateReview = updateOne<Reviews>(reviewsModel);
export const deleteReview = deleteOne<Reviews>(reviewsModel);
