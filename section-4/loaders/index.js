const fs = require('fs')
const mongooseLoader =require('./mongoose')
const expressLoader =require('./exptess')
const logger = require('../config/logger')
const subscribers = require('../subscribers')
const EventEmitter = require('../utils/EventEmitter')
const path = require('path')
module.exports =async (app)=>{

await mongooseLoader();
logger.info('mongoose initiated')
await expressLoader(app)
logger.info('Express app initiated')

Object.keys(subscribers).forEach((eventName) => {
 console.log(`📡 Subscribing to event: ${eventName}`);
    EventEmitter.on(eventName, subscribers[eventName]);
})
    const uploads = path.join(__dirname, '..','uploads');

try{

 await fs.promises.access(uploadDir);
    logger.info('uploads directory already exists')
    }catch(err){
    await fs.promises.mkdir(uploads, {recursive:true});
    logger.info('uploads directory created')
    }
   
}

