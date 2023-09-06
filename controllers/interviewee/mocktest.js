const { MocktestService } = require("../../services/interviewee/mocktest");

const Controller = require("../base").Controller;

const mocktestService=new MocktestService()

class MocktestController extends Controller{
    constructor(){
        super()
    }

    getTestProblems=async (req,res)=>{
        // console.log("new",req.body['user_id'])
        var result=await mocktestService.getTestProblems(req)
        return res.status(200).json(result)
    }

    createTest=async (req,res)=>{
        var result=await mocktestService.createTest(req)
        return res.status(200).json(result)
    }
    

    
}

module.exports = {MocktestController}