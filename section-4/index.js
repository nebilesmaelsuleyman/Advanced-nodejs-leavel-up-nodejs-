
const mongoose = require('mongoose');
const config = require('./config/config');
const app= require('./server');
const http=require('http')
const logger=require('./config/logger')

mongoose
.connect(config.dbConnection)
.then(() => {
    logger.info('connected to mongodb');
})
.catch((err) => {
    logger.error(err);
});


const httpServer=http.createServer(app);
const server=httpServer.listen(config.port,()=>{
    logger.info(`server listening on port ${config.port}`)
});



const exitHandler=()=>{
    if(server){
        server.close(()=>{
            logger.info('server closed')
            process.exit(1)
        })
    }else{
        process.exit(1)
    }
}
const unExcpectedErrorHandler =(error)=>{
   logger.error(error)
    exitHandler();
}  



process.on('uncaughtException',unExcpectedErrorHandler)
process.on('unhandleRejection',unExcpectedErrorHandler)

// SIGTERM: A signal requesting graceful process termination, allowing cleanup before exit.
process.on('SIGTERM',()=>{
    logger.info('SIGTERM RECIEVED');
    if(server){
        server.close();
    }
})