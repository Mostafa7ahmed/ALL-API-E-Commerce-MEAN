import { RequestHandler } from 'express';
import { check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import productsModel from '../../models/productsModel';

export const addToWishlistValidator: RequestHandler[] = [
  check('product')
    .isMongoId()
    .withMessage('invalid product id')
    .custom(async (val: string) => {
      const product = await productsModel.findById(val);
      if (!product) {
        throw new Error('Product Not Found');
      }
      return true;
    }),
  validatorMiddleware,
];

export const removeFromWishlistValidator: RequestHandler[] = [
  check('productId').isMongoId().withMessage('invalid product id'),
  validatorMiddleware,
];
