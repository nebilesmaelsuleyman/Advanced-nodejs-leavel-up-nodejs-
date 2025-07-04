const sharp = require('sharp')

const compressImage = async (input,filename)=>{
const outputpath = `${__dirname}/../../uploads/${filename}`;
sharp(Buffer.from(input)).resize( 600).webp({quality:80}).toFile(outputpath)
}
module.exports = {compressImage}