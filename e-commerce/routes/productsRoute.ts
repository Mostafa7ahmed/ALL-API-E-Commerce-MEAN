import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  resizeProductImages,
  updateProduct,
  uploadProductImages,
} from '../controllers/products';
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from '../utils/validators/productsValidator';
import { allowedTo, checkActive, protectRoutes } from '../controllers/auth';
import reviewsRoute from './reviewsRoute';

const productsRoute: Router = Router();
productsRoute.use('/:productId/reviews', reviewsRoute);
productsRoute
  .route('/')
  .get(getAllProducts)
  .post(
    protectRoutes,
    checkActive,
    allowedTo('manager', 'admin'),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

productsRoute
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    protectRoutes,
    checkActive,
    allowedTo('manager', 'admin'),
    updateProductValidator,
    updateProduct
  )
  .delete(
    protectRoutes,
    checkActive,
    allowedTo('manager', 'admin'),
    deleteProductValidator,
    deleteProduct
  );

export default productsRoute;
