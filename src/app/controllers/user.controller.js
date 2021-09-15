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
const {badRequest, internalServerError, unAuthorized, forbidden, notFound} = failureCodes;
const {accountCreate, loginSuccess, recordFound,updateSuccess} = successMessages;
const {accountFailedToCreate, interError,loginFail, fieldValidation, noRecordFound, updateFail} = errorMessages;

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
                console.log(randPass)
                isCreated.password = randPass;
                SendSuccessResponse(res, created, accountCreate, generateToken(JSON.stringify(isCreated.id)), isCreated);
            } 
            else sendErrorResponse(res, badRequest, accountFailedToCreate)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError )
        }
    },
    login: async(req, res)=>{
        const {password, email, phone} = req.body;
        try {
            if(email || phone && password){            
                if(email){
                    const isSignIn = await db.User.findOne({
                        where: {
                            email:email,
                            datastatus: process.env.AP_ACTIVE
                        }
                    })
                    if(isSignIn){
                        bcrypt.compare(password, isSignIn.password, (err, result)=>{
                            if(result) SendSuccessResponse(res, ok, loginSuccess, generateToken(JSON.stringify(isSignIn.id)),isSignIn);
                            else SendSuccessResponse(res, unAuthorized, loginFail, null, {email: req.body.email, password:req.body.password+'++++++++++++++'});
                        })
                    }
                }else if(phone){
                    const isSignIn = await db.User.findOne({
                        where: {
                            phone:phone,
                            datastatus: process.env.AP_ACTIVE
                        }
                    })
                    if(isSignIn){
                        bcrypt.compare(password, isSignIn.password, (err, result)=>{
                            if(result) SendSuccessResponse(res, ok, loginSuccess, generateToken(JSON.stringify(isSignIn.id)),isSignIn);
                            else SendSuccessResponse(res, unAuthorized, loginFail, null, {email: req.body.email, password:req.body.password});
                        })
                    }else SendSuccessResponse(res, forbidden, loginFail, null,{email: req.body.email, password:req.body.password})
                }
            } else sendErrorResponse(res,forbidden, fieldValidation)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    },
    view: async(req, res)=>{
        try {
            const viewAll = await db.User.findAll({
                where:{datastatus:process.env.AP_ACTIVE},
                include: ['TODO']
            })
            if(viewAll){
                SendSuccessResponse(res, ok, recordFound, null, viewAll)
            }else{
                sendErrorResponse(res, notFound, noRecordFound)
            }
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    update: async(req, res)=>{
        const id = req.params.id;
        const {username, email, phone, datastatus} = req.body;
        try {
            const user = await db.User.findOne({
                where: {id:id}
            })
            const isUpdated = await user.update({
                username: username || user.username,
                email: email || user.email,
                phone: phone || user.phone,
                datastatus: datastatus || user.datastatus
            })
            if(isUpdated) SendSuccessResponse(res, ok, updateSuccess, null, isUpdated);
            else sendErrorResponse(res, badRequest, updateFail)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    viewById: async(req, res)=>{

    }

}