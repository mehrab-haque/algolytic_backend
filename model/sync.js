const { initializeAll } = require('../repository/initialize')
const Auth=require('./auth')
const Problem=require('./problem')
const Submission=require('./submission')
const Subscription=require('./subscription')
const Tag=require('./tag')
const Solution=require("./solution")
const Peer=require('./peer')

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
     //   await initializeAll()
    }catch(err){
        console.log(err)
    }
}

syncAll()