export const SendSuccessResponse = (
    res,
    code,
    message,
    token,
    data
)=>res.status(code).json({
        status: code,
        message,
        token,
        data
})

export const sendErrorResponse = (
    res,
    code,
    err
)=>res.status(code).json({
    status: code,
    err
})