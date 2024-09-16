import * as all from '../interfaces'
import { Application, NextFunction, Request, Response } from "express";
import categoriesRoute from "./categoriesRoute";
import subcategoriesRoute from "./subcategoriesRoute";
import productsRoute from './productsRoute';
import usersRoute from './usersRoute';
import authRoute from './authRoute';
import globalErrors from '../middlewares/globalErrors';
import ApiErrors from '../utils/apiErrors';
import wishlistRoute from './wishlistRoute';
import addressRoute from './addressRoute';
import couponsRoute from './couponsRoute';
import reviewsRoute from './reviewsRoute';
import cartRoute from './cartRoute';
import ordersRoute from './ordersRoute';

const mountRoutes = (app: Application) => {
  app.use('/api/v1/categories', categoriesRoute)
  app.use('/api/v1/subcategories', subcategoriesRoute)
  app.use('/api/v1/products', productsRoute)
  app.use('/api/v1/coupons', couponsRoute)
  app.use('/api/v1/reviews', reviewsRoute)
  app.use('/api/v1/carts', cartRoute)
  app.use('/api/v1/orders', ordersRoute)
  app.use('/api/v1/users', usersRoute)
  app.use('/api/v1/wishlist', wishlistRoute)
  app.use('/api/v1/address', addressRoute)
  app.use('/api/v1/auth', authRoute)
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new ApiErrors(`the route ${req.originalUrl} not found`, 400))
  })
  app.use(globalErrors);
}

export default mountRoutes;