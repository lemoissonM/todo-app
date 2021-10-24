const joi = require('joi');
const { errorMessages } = require('../../app/helpers/message.helpers');
const {failureCodes} = require( '../../app/helpers/statusCodes.helpers');
const { sendErrorResponse, SendSuccessResponse } = require( '../../app/helpers/response.helpers');
const db = require( '../../app/models');
const {badRequest, conflict} =  failureCodes;
const {duplicatedTodo,fieldValidation} = errorMessages;
const todoValidations ={
    register: async (req, res, next)=>{
        const schema = joi.object({
            nom: joi.string().min(3).max(100).required(),
            dateTodo: joi.string().min(8).max(10).required(),
            userId: joi.number().required()
        });
        const {error} = schema.validate(req.body);
        if(error){
            return SendSuccessResponse(res, badRequest, `${error.details[0].message}`)
        }
        const checkTodo = await db.Todo.findOne({
            where: {
                nom: req.body.nom,
                dateTodo: req.body.dateTodo
            }
        }).then().catch(er=>console.error(er));
        if(checkTodo){
            return sendErrorResponse(res, conflict, duplicatedTodo)
        }else{
            return next();
        }
    },
    update: async (req, res, next)=>{
        const schema = joi.object({
            nom: joi.string().min(3).max(100).required(),
            dateTodo: joi.string().min(8).max(10).required(),
            complited: joi.number().required()
        });
        const {error} = schema.validate(req.body);
        if(error){
            return sendErrorResponse(res, badRequest, fieldValidation)
            // return SendSuccessResponse(res, badRequest, `${error.details[0].message}`)
        }else {
            return next();
        }
    }
}

module.exports = todoValidations;