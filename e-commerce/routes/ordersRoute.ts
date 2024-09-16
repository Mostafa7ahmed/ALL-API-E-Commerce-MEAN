import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/auth';
import {
  createCashOrder,
  filterOrders,
  getOrder,
  getAllOrders,
  deliverOrder,
  payOrder,
} from '../controllers/orders';
import {
  createOrderValidator,
  getOrderValidator,
} from '../utils/validators/ordersValidator';

const ordersRoute: Router = Router();
ordersRoute.use(protectRoutes, checkActive);

ordersRoute
  .route('/')
  .get(filterOrders, getAllOrders)
  .post(allowedTo('user'), createOrderValidator, createCashOrder);

ordersRoute.route('/:id').get(getOrderValidator, getOrder);

ordersRoute.use(allowedTo('manager', 'admin'));
ordersRoute.route('/:id/paid').put(getOrderValidator, payOrder);
ordersRoute.route('/:id/delivered').put(getOrderValidator, deliverOrder);

export default ordersRoute;
