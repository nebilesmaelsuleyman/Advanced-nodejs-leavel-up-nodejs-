const simpleGit =require('simple-git');
const { repoUrl } = require('../action/config/config');

const Clone= async (repoUrl,projectName)=>{
    const git =simpleGit();
    console.log(`cloning from ${repoUrl}...`)
    await git.clone(repoUrl, projectName)
    console.log('clone succesfully')
}
module.exports=Clone
