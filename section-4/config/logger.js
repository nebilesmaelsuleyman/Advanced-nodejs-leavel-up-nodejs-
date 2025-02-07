const winston=require('winston')

const {format, createLogger, transports}= winston;
const {combine, timestamp,printf,colorize,uncolorize}=format;
const config= require('./config')
const winstonFormat= printf(({level, message,timestamp,stack})=>{
    return `${timestamp}:${level}:${stack || message}`
})

const logger= createLogger({
    level:'info',
    format:combine(timestamp(),
    winstonFormat,
    config.env==='development'?colorize():uncolorize()
),
    transports:[new transports.Console()],

});
module.exports = logger;