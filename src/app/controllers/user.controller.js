import db from '../models';
import dateFormat from 'dataformat';
import dotenv from 'dotenv';
import { encryptPassword, isPasswordTrue } from '../helpers/passwordEncDec.helpers';
import {sendErrorResponse, SendSuccessResponse} from '../helpers/response.helpers';
import {successCodes} from '../helpers/statusCodes.helpers';
import {failureCodes} from '../helpers/statusCodes.helpers';
import {successMessages} from '../helpers/message.helpers';
import {errorMessages} from '../helpers/message.helpers';
import {generateToken} from '../helpers/token.helpers';
import bcrypt from 'bcrypt';

dotenv.config();
const {created, ok} = successCodes;
const {badRequest, internalServerError, unAuthorized} = failureCodes;
const {accountCreate, loginSuccess} = successMessages;
const {accountFailedToCreate, interError,loginFail} = errorMessages;

export default {
    register: async(req, res)=>{
        const {username, email, phone, datastatus} = req.body;
        console.log(req.body)
        const now = new Date();
        const createOn = dateFormat('yyyy-MM-dd hh:mm:ss', now);
        const randPass = Math.round(Math.random() * (80000000) + 10000000);
        const password = await encryptPassword(randPass.toString());
        try {      
            const isCreated = await db.User.create({
                username,
                email,
                phone,
                password:password,
                datastatus: process.env.AP_ACTIVE
            });
            if(isCreated){
                isCreated.password = randPass;
                SendSuccessResponse(res, created, accountCreate, generateToken(JSON.stringify(isCreated.id)), isCreated);
            } 
            else sendErrorResponse(res, badRequest, accountFailedToCreate)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError )
        }
    },
    login: async(req, res)=>{
        const {password, email} = req.body;
        try {
            const isSignIn = db.User.findOne({
                where: {
                    email: email,
                    datastatus: process.env.AP_ACTIVE
                }
            })
            if(isSignIn){
                bcrypt.compare(req.body.password, isSignIn.password, (err, result)=>{
                    if(result) SendSuccessResponse(res, ok, loginSuccess, generateToken(JSON.stringify(isSignIn.id)),isSignIn);
                    else SendSuccessResponse(res, unAuthorized, loginFail, null, {email: req.body.email, password: req.body.password});
                })
            }else SendSuccessResponse(res, unAuthorized, loginFail, null,{email: req.body.email, password: req.body.password})
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    },
    view: async(req, res)=>{

    },
    update: async(req, res)=>{

    },
    viewById: async(req, res)=>{

    }

}