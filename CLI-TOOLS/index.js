const {program}= require('commander');
const generateMVC= require('./action/generateMVC')
program.version('1.0.0').description('A CLI tool to generate an MVC boilerplate code.');

program
.command('generate-MVC')
.description('Clone an mvc')
.action(generateMVC)
    

program.parse(process.argv)