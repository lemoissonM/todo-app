const express = require( 'express');
const todoRoutes = require( './api/todo.routes');
// const userRoutes = require( './api/user.routes');

const routes = express.Router();

routes
     .use('/todo', todoRoutes)
     // .use('/user', userRoutes)

module.exports = routes;