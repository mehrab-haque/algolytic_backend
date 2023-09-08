const Service = require('../base').Service;
const RecommendationRepository=require('../../repository/recommendation').RecommendationRepository

const recommendationRepository=new RecommendationRepository()

class RecommendationService extends Service {
    constructor() {
        super();
    }

    systemgeneratedlist =async (req)=>{
        try{
            let problems=await recommendationRepository.getAll(req)
         let solved_problems=await recommendationRepository.getSubmissions(req)
            let sum=0,cnt=solved_problems.length
        //    console.log(solved_problems[1].get({plain:true}).problem.rating)
            for (let index = 0; index < solved_problems.length; index++) {
                console.log(solved_problems[index].get({plain:true}).problem.rating)
                sum+=solved_problems[index].get({plain:true}).problem.rating
                
            }
            sum=sum/cnt
            console.log("rating"+sum)
            const tagmap={}
            var tres=await recommendationRepository.getCountbyTag(req.body['user_id'])
            for (let index = 0; index < tres.length; index++) {
                tagmap[tres[index].get({plain:true}).tag]=tres[index].get({plain:true}).count                
            }
            // console.log(tagmap)
            // console.log(tagmap['dp']==undefined)
            // sum=1300
            let p=[]
            let dict={}
            for (let index = 0; index < problems.length; index++) {

                var check=await recommendationRepository.checkifNewProblem(problems[index].get({plain:true}).problem_id,req.body['user_id'])
                if(check[0].get({plain:true}).count>0)
                {
                    continue;
                }
                
                let score=Math.abs(problems[index].get({plain:true}).rating-sum)
                let cnt=0
                if(tagmap[problems[index].get({plain:true}).tag]!=undefined)
                {
                    cnt=tagmap[problems[index].get({plain:true}).tag]
                }
                
                score=score+(cnt-5)*100
                problems[index].get({plain:true}).rating = score

                p.push(problems[index].get({plain:true}))         

                
            }

            
            p.sort((a,b) => a.rating-b.rating)
            // console.log(p)

            let final_pblms=[]
            for (let index = 0; index < p.length; index++) {

                let temp=0         
                for(let j=0;j<solved_problems.length;j++)
                {
                    if(solved_problems[j].get({plain:true}).problem.problem_id == p[index].problem_id)
                    {
                        // console.log(solved_problems[j].get({plain:true}).problem.id)
                        temp=1
                        break
                    }
                }

                if(temp==0)
                {
                    final_pblms.push(p[index])
                }
                if(final_pblms.length>=4)
                {
                    break
                }
                
            }

            // console.log(final_pblms)


            return {
                success:true,
                data:final_pblms
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

    dummylist =async (req)=>{
        try{
            var data=await recommendationRepository.getDummys(req)
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

    createDummy =async (dummy)=>{
        try{
            var data=await recommendationRepository.createDummy(dummy)
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