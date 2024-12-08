const fs =require('fs');
const os =require('os');

const cpuInfo= JSON.stringify(os.cpus());
const filename='cpu.txt'

if(fs.existsSync(filename)){
    fs.readFile(filename,'utf8',(err,data)=>{
        if(err) throw err;
        console.log('file content:',data)
    })
}else{
    fs.writeFile(filename,cpuInfo,(err)=>{
        if(err)console.error(err);
        console.log('cpu information written to file')
    })
}