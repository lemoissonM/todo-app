import joi from 'joi';
import { errorMessages } from '../../app/helpers/message.helpers';
import {failureCodes} from '../../app/helpers/statusCodes.helpers';
import { sendErrorResponse, SendSuccessResponse } from '../../app/helpers/response.helpers';
import db from '../../app/models';
const {badRequest, conflict} =  failureCodes;
const {duplicatedTodo} = errorMessages;
const todoValidations ={
    register: async (req, res, next)=>{
        const schema = joi.object({
            nom: joi.string().min(3).max(100).required(),
            dateTodo: joi.string().min(8).max(10).required()
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
    }
}

export default todoValidations;