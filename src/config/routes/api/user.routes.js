import express from 'express';
import ctrl from '../../../app/controllers/user.controller';

const route = express.Router()

route
    .post('/register', ctrl.register)
    .post('/login', ctrl.login)
    .get('/all', ctrl.view)
    .put('update-user', ctrl.update)
    .get('/getById', ctrl.viewById)

export default route;