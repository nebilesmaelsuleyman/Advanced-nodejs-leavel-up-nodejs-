const {program}= require('commander');
const { default: inquirer } = require('inquirer');
program.version('1.0.0').description('A simple cli program');

program.command('start').action(async()=>{
    const prompt =inquirer.createPromptModule();
    const answer = await prompt([
        {
            name: 'username',message: 'what is your name', type:'input' },
            {
                name:'experience',
                message:'how many years of experience do you have ?',
                type: 'list',
                choices:['1-3','3-5','5-19']
            }
    ])
    console.log(`hi ${answer.username} you have ${answer.experience}years of experience`)
})
program.parse(process.argv)