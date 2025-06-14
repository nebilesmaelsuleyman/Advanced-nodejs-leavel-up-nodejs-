const mongooseLoader =require('./mongoose')
const expressLoader =require('./exptess')
const logger = require('../config/logger')
const subscribers = require('../subscribers')
const EventEmitter = require('../utils/EventEmitter')

module.exports =async (app)=>{

await mongooseLoader();
logger.info('mongoose initiated')
await expressLoader(app)
logger.info('Express app initiated')

Object.keys(subscribers).forEach((eventName) => {
 console.log(`📡 Subscribing to event: ${eventName}`);
    EventEmitter.on(eventName, subscribers[eventName]);
})
}

