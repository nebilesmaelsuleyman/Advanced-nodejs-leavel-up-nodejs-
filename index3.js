const frok =require('child_process')
const app=require('express')

app.get('/isprime',(req,res)=>{

    const childprocess=fork('./nodejsFork/isprime.js');
    childprocess.send({'number':parseInt(req.query.number)})
    childprocess.on('message',message=> res.send(message))

    const jsonResponse =isPrime()
    res.send(jsonResponse)
})
app.listen(8081,()=>console.log('listening on 8081'))
