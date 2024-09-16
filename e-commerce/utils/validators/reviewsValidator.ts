import { RequestHandler } from 'express';
import { check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import categoriesModel from '../../models/categoriesModel';
import reviewsModel from '../../models/reviewsModel';

export const createReviewValidator: RequestHandler[] = [
  check('comment')
    .notEmpty()
    .withMessage('Review comment required')
    .isLength({ min: 10, max: 500 })
    .withMessage('invalid comment length'),
  check('rate')
    .notEmpty()
    .withMessage('product rate required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('invalid rate'),
  check('product')
    .notEmpty()
    .withMessage('product required')
    .isMongoId()
    .withMessage('invalid product id'),
  check('user')
    .notEmpty()
    .withMessage('user required')
    .isMongoId()
    .withMessage('invalid user id')
    .custom(async (val: string) => {
      const review = await reviewsModel.findOne({ user: val });
      if (review) {
        throw new Error('you created review before');
      }
      return true;
    }),
  validatorMiddleware,
];

export const getReviewValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  validatorMiddleware,
];

export const updateReviewValidator: RequestHandler[] = [
  check('id')
    .isMongoId()
    .withMessage('invalid mongo id')
    .custom(async (val: string, { req }) => {
      const review = await reviewsModel.findById(val);
      if (review?.user._id!.toString() !== req.user._id.toString()) {
        throw new Error('you can only update your review');
      }
      return true;
    }),
  check('comment')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('invalid comment length'),
  check('rate')
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage('invalid rate'),
  validatorMiddleware,
];

export const deleteReviewValidator: RequestHandler[] = [
  check('id')
    .isMongoId()
    .withMessage('invalid mongo id')
    .custom(async (val: string, { req }) => {
      if (req.user.role === 'user') {
        const review = await reviewsModel.findById(val);
        if (review?.user._id!.toString() !== req.user._id.toString()) {
          throw new Error('you can only delete your review');
        }
      }
      return true;
    }),
  validatorMiddleware,
];
