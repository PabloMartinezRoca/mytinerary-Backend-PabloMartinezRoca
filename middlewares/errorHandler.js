const errorHandler = (error, request, response, next) => {
    let status = error.status || 500
    
    console.log(error.stack)

    response.status(status).json({
        success: false,
        status: status,
        error: error.message
    })
}

export default errorHandler