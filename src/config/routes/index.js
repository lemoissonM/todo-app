import express from 'express';
import todoRoutes from './api/todo.routes';
const routes = express.Router();

routes
     .use('/todo', todoRoutes)

export default routes;