import express from 'express';
import ctrl from '../../../app/controllers/todo.controller';

const route = express.Router();

route 
    .post('/create', ctrl.register)
    .get('/view-all', ctrl.viewAll)

export default route;