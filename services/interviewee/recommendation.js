const Service = require('../base').Service;
const RecommendationRepository=require('../../repository/recommendation').RecommendationRepository

const recommendationRepository=new RecommendationRepository()

class RecommendationService extends Service {
    constructor() {
        super();
    }

    systemgeneratedlist =async (req)=>{
        try{
            var problems=await recommendationRepository.getAll(req)
            var solved_problems=await recommendationRepository.getSubmissions(req)
            let sum=0,cnt=0
           console.log(solved_problems[1].dataValues.problem.dataValues)
            // for (let index = 0; index < solved_problems.data.length; index++) {
            //     console.log(solved_problems.data[index].title)


                
            // }
            return {
                success:true,
                data:solved_problems
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    }

    peerlist =async (req)=>{
        try{
            var data=await recommendationRepository.getPeerList(req)
            return {
                success:true,
                data:data
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    }

    userlist =async (req)=>{
        try{
            var data=await recommendationRepository.getUserList(req)
            return {
                success:true,
                data:data
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    }

    recommendpblm =async (recommendation)=>{
        try{
            var data=await recommendationRepository.createRecommendation(recommendation)
            return {
                success:true,
                data:data
            }

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
          
    }

    // create =async (data)=>{
    //     try{
    //         var sub=await subRepository.create(data)
    //         return {
    //             success:true,
    //             data:sub
    //         }

    //     }catch(e){
    //         console.log(e)
    //         return {
    //             success:false
    //         }
    //     }
    // }
    // subscribe =async (data)=>{
    //     try{
    //         var sub=await subRepository.subscribe(data)
    //         return {
    //             success:true,
    //             data:sub
    //         }

    //     }catch(e){
    //         console.log(e)
    //         return {
    //             success:false
    //         }
    //     }
    // }
}

module.exports = {RecommendationService}