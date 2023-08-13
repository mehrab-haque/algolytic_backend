const { SubService } = require("../../services/interviewee/subscription");

const Controller = require("../base").Controller;

const subService=new SubService()

class SubController extends Controller{
    constructor(){
        super()
    }

    list=async (req,res)=>{
        var result=await subService.list()
        return res.status(200).json(result)
    }

    create=async (req,res)=>{
        var result=await subService.create(req.body)
        return res.status(200).json(result)
    }
   subscribe=async (req,res)=>{
        var result=await subService.subscribe(req.body)
        return res.status(200).json(result)
    }
}

module.exports = {SubController}