import express from 'express';
import ctrl from '../../../app/controllers/user.controller';

const route = express.Router()

route
    .post('/register', ctrl.register)
    .post('/login', ctrl.login)

export default route;