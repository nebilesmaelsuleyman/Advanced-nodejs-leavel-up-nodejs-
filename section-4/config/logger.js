const winston=require('winston')
const {format, createLogger, transports}= winston;
const {combine, timestamp,printf}=format;

const winstonFormat= printf(({level, message,timestamp,stack})=>{
    return `${timestamp}:${level}:${stack || message}`
})

const logger= createLogger({
    level:'info',
    format:combine(timestamp(),
    winstonFormat),
    transports:[new transports.Console()],

});
module.exports = logger;