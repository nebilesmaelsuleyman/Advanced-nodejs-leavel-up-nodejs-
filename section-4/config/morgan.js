const morgan =require('morgan')
const fs =require('fs')
const path=require('path')
const config=require('./config')

const getIpFormat=()=>(config.env === "production" ? ":remote-addr -":"");
const format= `${getIpFormat()}:method :url :status:response-time ms :user-agent :date`;

const accessLogstream= fs.createWriteStream(path.join(__dirname,'..','logs/access.log'),
{flag: 'a'})

// morgan : middleware used for logging http requests simplifies the process of tracking and 
//  recording details about incoming requests to your server.
module.exports=morgan('combined',{
    stream:accessLogstream
})