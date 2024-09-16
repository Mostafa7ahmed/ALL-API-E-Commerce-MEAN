import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/auth';
import {
  addAddress,
  deleteAddress,
  getUserAddress,
} from '../controllers/address';
import {
  addAddressValidator,
  removeAddressValidator,
} from '../utils/validators/addressValidator';

const addressRoute: Router = Router();
addressRoute.use(protectRoutes, checkActive, allowedTo('user'));
addressRoute
  .route('/')
  .get(getUserAddress)
  .post(addAddressValidator, addAddress);

addressRoute.route('/:addressId').delete(removeAddressValidator, deleteAddress);

export default addressRoute;
