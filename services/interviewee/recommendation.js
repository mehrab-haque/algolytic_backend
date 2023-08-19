const Service = require('../base').Service;
const RecommendationRepository=require('../../repository/recommendation').RecommendationRepository

const recommendationRepository=new RecommendationRepository()

class RecommendationService extends Service {
    constructor() {
        super();
    }

    systemgeneratedlist =async ()=>{
        try{
            var data=await recommendationRepository.getAll()
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