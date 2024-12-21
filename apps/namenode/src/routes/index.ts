import express from 'express';

import authRoute from './core/auth.route';

import userRoute from './core/user.route';
import namenodeRoute from './namenode/namenode.route';

import config from '../config/config';

// import artistRoute from './music/artist.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/namenode',
    route: namenodeRoute,
  },

];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  // You can add other dev-specific routes here if needed
}
export default router;
