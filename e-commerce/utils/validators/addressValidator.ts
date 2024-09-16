import { RequestHandler } from 'express';
import { check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatorMiddleware';

export const addAddressValidator: RequestHandler[] = [
  check('address').notEmpty().withMessage('address required'),
  validatorMiddleware,
];

export const removeAddressValidator: RequestHandler[] = [
  check('addressId').isMongoId().withMessage('invalid address id'),
  validatorMiddleware,
];
