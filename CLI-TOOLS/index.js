const {program}= require('commander');
program.version('1.0.0').description('A simple cli program');

program.command('greet <name>').action((name)=>{
    console.log(`hi ${name}`);
})
program.parse(process.argv)