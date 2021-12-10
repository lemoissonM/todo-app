const express =require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require ('../config/routes');
const { SendSuccessResponse } = require ('../app/helpers/response.helpers');
const { successCodes } = require ('../app/helpers/statusCodes.helpers');
const { successMessages } = require ('../app/helpers/message.helpers');

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', routes);

const {ok} = successCodes;
const {welcome} = successMessages;


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