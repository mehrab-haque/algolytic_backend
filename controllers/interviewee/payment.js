const Controller = require("../base").Controller;
const SubRepository=require('../../repository/subscription').SubRepository

const subRepository=new SubRepository()

class PaymentController extends Controller{
    constructor(){
        super()
    }

    ipn=async (req,res)=>{
        if(req.body.status==='VALID'){
            await subRepository.subscribe({
                sub_id:parseInt(req.body.value_a),
                user_id:parseInt(req.body.value_b)
            })
        }
        return res.sendStatus(200)
    }

    postPayment=async (req,res)=>{
        return res.redirect(`${process.env.POST_PAYMENT_URL_FRONTEND}/${req.params.status}`)
    }
}

module.exports = {PaymentController}