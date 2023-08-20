const express = require('express');
const router = express.Router()
const SSLCommerzPayment = require('sslcommerz-lts');
const SubRepository=require('../../repository/subscription').SubRepository

const subRepository=new SubRepository()

var subscriptionPayload=null

const getSubscriptionPayload=()=>{
    return subscriptionPayload
}

const setSubscriptionPayload=data=>{
    subscriptionPayload=data
}

const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false);

//sslcommerz ipn
router.post('/ipn', async (req,res) => {
    session=getSubscriptionPayload()
    const sessionStatus=await sslcz.transactionQueryBySessionId({
        sessionkey:session.sessionKey
    })
    if(sessionStatus.status==='VALID'){
        try{
            await subRepository.subscribe(session)
            console.log(`User ${session.user_id} is subscribed to ${session.sub_id}`)
        }catch(err){
            console.log('error in subscription')
        }
    }
    res.send({})
});

exports.SSLCommerzRouter = router;
exports.setSubscriptionPayload=setSubscriptionPayload