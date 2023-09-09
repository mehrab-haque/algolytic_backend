const Controller = require("../base").Controller;
const ProblemService=require("../../services/interviewee/problem").ProblemService

const problemService=new ProblemService()

class ProblemController extends Controller{
    constructor(){
        super()
    }

    list=async (req,res)=>{
        var result=await problemService.list()
        return res.status(200).json(result)
    }

    getSolutions=async (req,res)=>{
        var result=await problemService.getSolutions(req.params.id)
        return res.status(200).json(result)
    }

    create=async (req,res)=>{
        var result=await problemService.create(req.body)
        return res.status(200).json(result)
    }
    createSolution=async (req,res)=>{
        var result=await problemService.createSolution(req.body)
        return res.status(200).json(result)
    }
    delete=async (req,res)=>{
        var result=await problemService.delete(req.params.id)
        return res.status(200).json(result)
    }

    update=async (req,res)=>{
        var result=await problemService.update(req.params.id,req.body)
        return res.status(200).json(result)
    }

    get=async (req,res)=>{
        var result=await problemService.get(req.params.id)
        return res.status(200).json(result)
    }

    getSubmissionsbyProblemId=async (req,res)=>{
        console.log("new",req.body['user_id'])
        var result=await problemService.getSubmissionsbyProblemId(req)
        return res.status(200).json(result)
    }    

    getFilteredProblems=async (req,res)=>{
        var result=await problemService.getFilteredProblems(req.query)
        return res.status(200).json(result)
    }

    

    submit=async (req,res)=>{
        var result=await problemService.submit(req.body)
        return res.status(200).json(result)
    }


    getSubmissions=async (req,res)=>{
        var result=await problemService.getSubmissions(req.body)
        return res.status(200).json(result)
    }

    getPopularProblems=async (req,res)=>{
        var result=await problemService.getPopularProblems(req)
        return res.status(200).json(result)
    }

    getSubmissionStats=async (req,res)=>{
        var result=await problemService.getSubmissionStats(req.body)
        return res.status(200).json(result)
    }
}

module.exports = {ProblemController}