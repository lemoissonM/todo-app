import db from '../models';
import dotenv from 'dotenv';
import { sendErrorResponse, SendSuccessResponse } from '../helpers/response.helpers';
import { failureCodes, successCodes } from '../helpers/statusCodes.helpers';
import { errorMessages, successMessages } from '../helpers/message.helpers';
dotenv.config();
const {created} = successCodes;
const {todoCreate} = successMessages;
const {badRequest, internalServerError} = failureCodes;
const {todoCreateFail, interError} = errorMessages;

export default {
    register: async (req, res)=>{
        const {nom, dateTodo, complited, datastatus, userId} = req.body;
        try {
            const todoCreated = await db.Todo.create({
                nom,
                dateTodo,
                complited: process.env.AP_UNACTIVE,
                datastatus: process.env.AP_ACTIVE,
                userId
            })
            if(todoCreated){
                SendSuccessResponse(res,created,todoCreate,null,todoCreated)
            }else sendErrorResponse(res, badRequest, todoCreateFail)
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    viewAll: async (req, res)=>{

    },
    update: async (req, res)=>{

    },
    viewCompleted: async (req, res)=>{

    },
    viewById: async (req, res)=>{

    },
    delete: async (req, res)=>{

    }
}