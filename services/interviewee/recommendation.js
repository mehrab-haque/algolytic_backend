const Auth = require('../../model/auth');
const { AuthRepository } = require('../../repository/auth');

const Service = require('../base').Service;
const RecommendationRepository=require('../../repository/recommendation').RecommendationRepository

const recommendationRepository=new RecommendationRepository()
const authRepository=new AuthRepository()
class RecommendationService extends Service {
    constructor() {
        super();
    }

    systemgeneratedlist =async (req)=>{
        try{
            let problems=await recommendationRepository.getAll(req)
         let solved_problems=await recommendationRepository.getSubmissions(req)
         let authData=await authRepository.status(req.body);
       
       

           let user=authData[0].get({plain:true})
         
            let sum=0,cnt=solved_problems.length
        //    console.log(solved_problems[1].get({plain:true}).problem.rating)
            for (let index = 0; index < solved_problems.length; index++) {
                
                sum+=solved_problems[index].get({plain:true}).problem.rating

                
            }
            if(cnt !=0)
            sum=sum/cnt
        
            // sum=1300
            let p=[]
            let dict={}
            for (let index = 0; index < problems.length; index++) {
                p.push(problems[index].get({plain:true}))          

                
            }

            
            p.sort((a,b) => Math.abs(a.rating-sum)-Math.abs(b.rating-sum))
            // console.log(p)

            let final_pblms=[]
            for (let index = 0; index < p.length; index++) {

                let temp=0         
                for(let j=0;j<solved_problems.length;j++)
                {
                    if(solved_problems[j].get({plain:true}).problem.problem_id == p[index].problem_id )
                    {
                        // console.log(solved_problems[j].get({plain:true}).problem.id)
                        temp=1
                        break
                    }
                    console.log(user.sub_id)
                    if(p[index].isPremium==1 && user.sub_id<2){
                        temp=1;break;
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
            var users=await authRepository.getUsers()
            var data2=[]


            for(let i=0;i<data.length;i++){
                let obj=data[i].get({plain:true})
                for(let j=0;j<users.length;j++){
                    if(data[i].get({plain:true}).from==users[j].get({plain:true}).id){
                       
                        obj["from_name"]=users[j].get({plain:true})["name"]
                        data2.push(obj)
                       
                    }
                }

              
            }





            return {
                success:true,
                data:data2
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