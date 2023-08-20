const { RecommendationService } = require("../../services/interviewee/recommendation");

const Controller = require("../base").Controller;

const recommendationService=new RecommendationService()

class RecommendationController extends Controller{
    constructor(){
        super()
    }

    systemgeneratedlist=async (req,res)=>{
        // console.log("new",req.body['user_id'])
        var result=await recommendationService.systemgeneratedlist(req)
        return res.status(200).json(result)
    }

    peerlist=async (req,res)=>{
        // console.log("new",req.body['user_id'])
        var result=await recommendationService.peerlist(req)
        return res.status(200).json(result)
    }

    userlist=async (req,res)=>{
        // console.log("new",req.body['user_id'])
        var result=await recommendationService.userlist(req)
        return res.status(200).json(result)
    }

    recommendpblm=async (req,res)=>{
        var result=await recommendationService.recommendpblm(req)
        return res.status(200).json(result)
    }

//     create=async (req,res)=>{
//         var result=await subService.create(req.body)
//         return res.status(200).json(result)
//     }
//    subscribe=async (req,res)=>{
//         var result=await subService.subscribe(req.body)
//         return res.status(200).json(result)
//     }
}

module.exports = {RecommendationController}