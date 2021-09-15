import express from 'express';
import ctrl from '../../../app/controllers/todo.controller';
import validation from '../../../config/validations/todo.validations';

const route = express.Router();

route 
    .post('/create', validation.register, ctrl.register)
    .get('/view-all', ctrl.viewAll)
    .put('/update/:id', validation.update, ctrl.update)
    .get('/view-completed', ctrl.viewCompletedTodo)
    .get('/view-by-id/:id', ctrl.viewById)
    .delete('/delete-todo/:id', ctrl.delete)
    .post('/search', ctrl.search)
export default route;