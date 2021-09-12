import express from 'express';
import dotenv from 'dotenv';
import { SendSuccessResponse } from '../app/helpers/response.helpers';
import { successCodes } from '../app/helpers/statusCodes.helpers';
import { successMessages } from '../app/helpers/message.helpers';
import routes from '../config/routes';

const app = express();
const {ok} = successCodes;
const {welcome} = successMessages;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api', routes);
app.get('/', (req,res)=>{
    SendSuccessResponse(res,ok,welcome,null, null)
})

app.use('*',(req,res)=>{
    res.status(404).json({
        status: 404,
        error: `${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} not found`,
      });
})

const port = process.env.PORT || 7000;
app.listen(port,()=>{
    console.log(`server run on port ${port}...`)
})