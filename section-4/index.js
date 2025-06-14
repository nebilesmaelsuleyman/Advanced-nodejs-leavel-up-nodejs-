const  loader =require('./loaders')
const config = require('./config/config');
const http = require('http');
const logger = require('./config/logger');
const express =require('express')


const exitHandler = (server) => {
  if (server) {
    server.close(() => {
      logger.info('server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unExcpectedErrorHandler = (server) => {
 return function (error){
 logger.error(error);
  exitHandler(server);}
};


const startServer = async ()=>{
const app = express();
 await loader(app)

const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
  logger.info(`server listening on port ${config.port}`);
});
process.on('uncaughtException', unExcpectedErrorHandler);
process.on('unhandleRejection', unExcpectedErrorHandler);

// SIGTERM: A signal requesting graceful process termination, allowing cleanup before exit.
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECIEVED');
  if (server) {
    server.close();
  }
});
}


startServer();







