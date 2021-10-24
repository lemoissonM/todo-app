module.exports ={
    SendSuccessResponse:(res,code,message,token,data)=>res.status(code).json({
        status: code,
        message,
        token,
        data
    }),
    sendErrorResponse: (
        res,
        code,
        err
    )=>res.status(code).json({
        status: code,
        err
    })
}
