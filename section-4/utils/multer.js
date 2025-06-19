const multer = require('multer');
const ApiError = require('./ApiError');


const storage= multer.diskStorage({
destination:function(req,files,cb){
const filePath= `${__dirname}/../uploads`
cb(null,filePath)},
filename:function(req,file,cb){
const filename = `${Date.now()}${file.originalname}`;
cb(null,filename)}


})
module.exports = multer({storage,fileFilter(req,file,cb){

const maxFileSize =3* 1024*1024

if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
return cb(new ApiError(400,' only images are allowed'),false)

}else if(file.size> maxFileSize){
new ApiError(400, 'file must be less than 3mb')
}
cb(null, true)
}})