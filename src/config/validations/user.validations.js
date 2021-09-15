import joi from 'joi';
import { errorMessages } from '../../app/helpers/message.helpers';
import { sendErrorResponse, SendSuccessResponse } from '../../app/helpers/response.helpers';
import { failureCodes } from '../../app/helpers/statusCodes.helpers';
import db from '../../app/models';

const {badRequest} = failureCodes;
const {duplicatedEmail, duplicatedPhone, fieldValidation} = errorMessages;

const userValidations ={
    register: async(req, res, next)=>{
        const schema = joi.object({
            username: joi.string().alphanum().min(3).max(60).required(),
            phone: joi.string().alphanum().min(10).max(13).required(),
            email: joi.string().pattern(new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)).required()
        })
        const {error} = schema.validate(req.body);
        if(error){
            return SendSuccessResponse(res, badRequest, `${error.details[0].message}`)
        }
        const checkPhone = await db.User.findOne({
            where:{
                phone: req.body.phone
            }
        }).then().catch(er=>console.error(er))
        if(req.body.email){
            const checkEmail = await User.findOne({
                where:{
                    email: req.body.email
                }
            })
            if(checkEmail){
                sendErrorResponse(res, badRequest, duplicatedEmail)
            }
        }
        if(checkPhone){
            sendErrorResponse(res, badRequest, duplicatedPhone)
        }else {
            return next();
        }
    },
    update: async (req, res, next)=>{
        const schema = joi.object({
            username: joi.string().alphanum().min(3).max(60).required(),
            phone: joi.string().alphanum().min(10).max(13).required(),
            email: joi.string().pattern(new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)).required()
        });
        const {error} = schema.validate(req.body);
        if(error){
            return sendErrorResponse(res, badRequest, fieldValidation)
        }else{
            return next();
        }
    }
}