process.on('message',message=>{
    const jsonResponse =isprime(message.number)
    process.send(jsonResponse)
})




function isprime(number){
    let startTime= new Date();
    let endTime= new Date();
    let isprime=true;
    for(let i=3; i<number; i++){

        if(number % i===0){
            endTime= new Date();
            isprime=false;
            break;
        }
    }

    if(isprime) endTime= new Date();

        return{
            'number':number,
            'isprime':isprime,
            'time':endTime.getTime()-startTime.getTime()

        }
}
