import db from '../models';
import dateFormat from 'dataformat';
import dotenv from 'dotenv';
import { encryptPassword } from '../helpers/passwordEncDec.helpers';
import {sendErrorResponse, SendSuccessResponse} from '../helpers/response.helpers';

dotenv.config();

export default {
    register: async(req, res)=>{
        const {username, email, phone, datastatus} = req.body;
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
            if(isCreated) SendSuccessResponse(res, created, accountCreate, null, isCreated);
            else sendErrorResponse(res, badRequest, accountFailedToCreate)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError )
        }
    },
    login: async(req, res)=>{

    },
    view: async(req, res)=>{

    },
    update: async(req, res)=>{

    },
    viewById: async(req, res)=>{

    }

}