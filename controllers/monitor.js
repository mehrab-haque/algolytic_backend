const Controller = require("./base").Controller;
const fs=require('fs')


class MonitorController extends Controller{
    constructor(){
        super()
    }

    gitBackendWebhook=async (req,res)=>{
        fs.writeFileSync(`${Date.now()}.json`,JSON.stringify(req.body))
        res.sendStatus(200)
    }
}

module.exports = {MonitorController}