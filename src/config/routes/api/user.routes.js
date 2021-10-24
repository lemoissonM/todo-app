const express = require( 'express');
const ctrl = require( '../../../app/controllers/user.controller');
const validation = require( '../../validations/user.validations');

const route = express.Router()

route
    .post('/register', validation.register, ctrl.register)
    .post('/login', ctrl.login)
    .get('/all', ctrl.view)
    .put('update-user',validation.update, ctrl.update)
    .get('/getById', ctrl.viewById)

module.exports= route;