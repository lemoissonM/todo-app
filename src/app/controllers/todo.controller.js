import db from '../models';
import dotenv from 'dotenv';
import { sendErrorResponse, SendSuccessResponse } from '../helpers/response.helpers';
import { failureCodes, successCodes } from '../helpers/statusCodes.helpers';
import { errorMessages, successMessages } from '../helpers/message.helpers';
dotenv.config();
const {created, ok} = successCodes;
const {todoCreate,recordFound, updateSuccess, deleteRecordSuccess} = successMessages;
const {badRequest, internalServerError, notFound} = failureCodes;
const {todoCreateFail, interError, noRecordFound, updateFail, deleteRecordFail} = errorMessages;

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
        try {
            const isDone = await db.Todo.findAll({
                where: {datastatus: process.env.AP_ACTIVE}
            })
            if(isDone) SendSuccessResponse(res, ok, recordFound, null, isDone);
            else sendErrorResponse(res,notFound,noRecordFound);
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    },
    update: async (req, res)=>{
        const {nom, dateTodo, complited, datastatus, userId} = req.body;
        const id = req.params.id;
        try {
            const todo = await db.Todo.findOne({
                where:{id:id}
            })
            const isUpdated = await todo.update({
                nom: nom || todo.nom,
                dateTodo: dateTodo || todo.dateTodo,
                complited: complited || todo.complited,
                datastatus: datastatus || todo.datastatus
            })
            if(isUpdated) SendSuccessResponse(res, ok, updateSuccess, null, isUpdated);
            else sendErrorResponse(res, badRequest, updateFail)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    },
    viewCompletedTodo: async (req, res)=>{
      try {
        const isCompleted = await db.Todo.findAll({
            where: {
                datastatus: process.env.AP_ACTIVE,
                complited: process.env.AP_ACTIVE
            }
        })
        if(isCompleted) SendSuccessResponse(res, ok, recordFound, null, isCompleted);
        else sendErrorResponse(res, notFound, noRecordFound)
      } catch (error) {
        sendErrorResponse(res, internalServerError, interError)
      }
    },
    viewById: async (req, res)=>{
        try {
            const id = req.params.id;
            const isDone = await db.Todo.findOne({
                where: {id:id}
            })
            if(isDone) SendSuccessResponse(res, ok, recordFound, null, isDone);
            else sendErrorResponse(res, notFound, noRecordFound);
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    },
    delete: async (req, res)=>{
        try {
            const id =req.params.id;
            const isDeleted = await db.Todo.destroy({
                where : {id:id}
            })
            if(isDeleted) SendSuccessResponse(res, ok, deleteRecordSuccess, null, isDeleted);
            else sendErrorResponse(res, badRequest, deleteRecordFail)

        } catch (error) {
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    search: async (req, res)=>{
        const {query} = req.body;
        try {
            const isSearch = await db.Todo.findAndCountAll({
                where: {
                    [Op.or]: [
                        {nom: {[Op.subString]: query}},
                        {dateTodo: {[Op.subString]: query}}
                    ]
                }
            })
            if(isSearch) SendSuccessResponse(res, ok, recordFound, null, isSearch);
            else sendErrorResponse(res, notFound, noRecordFound);
        } catch (error) {
            SendSuccessResponse(res, internalServerError, interError);
        }
    }
}