const Controller = require("../base").Controller;


class PaymentController extends Controller{
    constructor(){
        super()
    }

    ipn=async (req,res)=>{
        console.log(req.body,req.params,req.query)
        return res.sendStatus(200)
    }
}

module.exports = {PaymentController}