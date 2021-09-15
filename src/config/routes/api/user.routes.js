import express from 'express';
import ctrl from '../../../app/controllers/user.controller';
import validation from '../../validations/user.validations';

const route = express.Router()

route
    .post('/register', validation.register, ctrl.register)
    .post('/login', ctrl.login)
    .get('/all', ctrl.view)
    .put('update-user',validation.update, ctrl.update)
    .get('/getById', ctrl.viewById)

export default route;