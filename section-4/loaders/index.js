const mongooseLoader =require('./mongoose')
const expressLoader =require('./exptess')
const logger = require('../config/logger')


module.exports =async (app)=>{

await mongooseLoader();
logger.info('mongoose initiated')
await expressLoader(app)
logger.info('Express app initiated')
}