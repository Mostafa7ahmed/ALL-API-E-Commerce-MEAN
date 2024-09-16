import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/auth';
import {
  addProductToWishlist,
  deleteProductFromWishlist,
  getUserWishlist,
} from '../controllers/wishlist';
import {
  addToWishlistValidator,
  removeFromWishlistValidator,
} from '../utils/validators/wishlistValidator';

const wishlistRoute: Router = Router();
wishlistRoute.use(protectRoutes, checkActive, allowedTo('user'));
wishlistRoute
  .route('/')
  .get(getUserWishlist)
  .post(addToWishlistValidator, addProductToWishlist);

wishlistRoute
  .route('/:productId')
  .delete(removeFromWishlistValidator, deleteProductFromWishlist);

export default wishlistRoute;
