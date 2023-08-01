const { TagService } = require("../../services/interviewee/tag");

const Controller = require("../base").Controller;

const tagService=new TagService()

class TagController extends Controller{
    constructor(){
        super()
    }

    list=async (req,res)=>{
        var result=await tagService.list()
        return res.status(200).json(result)
    }

    create=async (req,res)=>{
        var result=await tagService.create(req.body.name)
        return res.status(200).json(result)
    }
}

module.exports = {TagController}