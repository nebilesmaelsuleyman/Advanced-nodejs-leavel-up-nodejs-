const express = require('express');
const app = express();

const mongoose = require('mongoose');
const { errorHandler, errorConverter } = require('./midlwares/errors');
const blogRouter = require('./routes/blogroutes');
const config = require('./config/config');
const ApiError = require('./utils/ApiError');
const httpStatus=require('http-status')

mongoose
.connect(config.dbConnection)
.then(() => {
    console.log('connected to mongodb');
})
.catch((err) => {
    console.error(err);
});

app.use(express.json());
app.use(blogRouter);
app.use(errorConverter)
app.use(errorHandler)
app.use((req,res, next)=>{
    next(new ApiError(404,"NOT FOUND"))
})
app.listen(3000, () => {
console.log('server listening on port 3000');
});

const unExcpectedErrorHandler =(error)=>{
    console.log(error)
    exitHandler();
}  


const exitHandler=()=>{
    if(server){
        server.close(()=>{
            console.log('server closed')
            process.exit(1)
        })
    }else{
        process.exit(1)
    }
}

process.on('uncaughtException',unExcpectedErrorHandler)
process.on('unhandleRejection',unExcpectedErrorHandler)