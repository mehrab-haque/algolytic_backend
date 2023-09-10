const Controller = require("./base").Controller;


class MonitorController extends Controller{
    constructor(){
        super()
    }

    gitBackendWebhook=async (req,res)=>{
        console.log(req.body.hook)
        res.sendStatus(200)
    }
}

module.exports = {MonitorController}