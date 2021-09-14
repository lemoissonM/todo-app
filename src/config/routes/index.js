import express from 'express';
import todoRoutes from './api/todo.routes';
import userRoutes from './api/user.routes';

const routes = express.Router();

routes
     .use('/todo', todoRoutes)
     .use('/user', userRoutes)

export default routes;