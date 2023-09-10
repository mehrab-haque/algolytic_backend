const { initializeAll } = require('../repository/initialize')
const axios=require('axios')
const Auth=require('./auth')
const Problem=require('./problem')
const Submission=require('./submission')
const Subscription=require('./subscription')
const Tag=require('./tag')
const Solution=require("./solution")
const Peer=require('./peer')
const Dummy=require('./dummy')
const TestProblem = require('./testproblem')
const TestTag = require('./testtag')
const Test = require('./test')

const syncAll=async ()=>{
    try{
        await Tag.sync({alter:true})
        console.log('tag model synced')
        await Subscription.sync({alter:true})
        console.log('subscription model synced')
        await Auth.sync({alter:true})
        console.log('auth model synced')
        await Problem.sync({alter:true})
        console.log('problem model synced')
        await Submission.sync({alter:true})
        console.log('submission model synced')
        await Solution.sync({alter:true})
        console.log('solution model synced')
        await Peer.sync({alter:true})
        console.log('peer model synced')        
        await Test.sync({alter:true})
        console.log('test model synced')
        await TestProblem.sync({alter:true})
        console.log('testproblem model synced')
        await TestTag.sync({alter:true})
        console.log('testtag model synced')

        await initializeAll()
    }catch(err){
        console.log(err)
    }
}

const notifyDeployed=async ()=>{
    await axios.get('https://9568-37-111-201-223.ngrok-free.app/api/v1.0.0/webhook/prodback')
}

syncAll()
notifyDeployed()


