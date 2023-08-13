const Subscription=require('../model/subscription')

const initializeSubscriptions=async ()=>{
        await Subscription.create({
            title:'Basic',
            fee:'$0',
            logo:'logo_url'
        })
        await Subscription.create({
            title:'Premium',
            fee:'$5',
            logo:'logo_url'
        })
        await Subscription.create({
            title:'Institutional',
            fee:'$10',
            logo:'logo_url'
        })
}

const initializeAll=async ()=>{
    await initializeSubscriptions()
    console.log("Default subscription schemes initialized...")
}

module.exports={initializeAll}