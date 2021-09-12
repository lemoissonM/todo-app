import express from 'express';
import dotenv from 'dotenv';

const app = express();

app.get('/', (req,res)=>{

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