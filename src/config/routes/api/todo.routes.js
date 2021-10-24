const express = require( 'express');
const ctrl = require( '../../../app/controllers/todo.controller');
const validation = require( '../../../config/validations/todo.validations');

const route = express.Router();

route 
    .post('/create', validation.register, ctrl.register)
    .get('/view-all', ctrl.viewAll)
    .put('/update/:id', validation.update, ctrl.update)
    .get('/view-completed', ctrl.viewCompletedTodo)
    .get('/view-by-id/:id', ctrl.viewById)
    .delete('/delete-todo/:id', ctrl.delete)
    .post('/search', ctrl.search)
module.exports = route;