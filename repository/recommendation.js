const Submission = require('../model/submission');
const Auth = require('../model/auth');
const Problem = require('../model/problem');
const Peer = require('../model/peer');
const Repository=require('./base').Repository

class RecommendationRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async (req)=>{
        var problems = await Problem.findAll();
        return problems
    }

    getPeerList=async (req)=>{
        var problems = await Peer.findAll(
            {
                where: {
                    to:req.body["user_id"]             
                  },
                  include:Problem
            }            
        );
        return problems
    }

    getUserList=async (req)=>{
        var users = await Auth.findAll(
            {                
                attributes: ['name', 'login','id']
            }
        );
        return users
    }

    createRecommendation=async (recommendation)=>{

        for (let index = 0; index < recommendation.body["to"].length; index++) {
            // const element = array[index];
            const rec = Peer.create({
                from:recommendation.body["user_id"],
                to:recommendation.body["to"][index],
                problem_id:recommendation.body["problem_id"]
                
            })
            // console.log(recommendation.body["to"][0])
            
        }
        
        return {success : true}
    }

    getSubmissions=async req=>{
        var submissions = await Submission.findAll({             
          
            
            include:{
                
                model:Problem            
            },

            
            where: {              
              user_id:req.body.user_id,
              verdict: "true"
            }
           
        }
       
          
          );
        return submissions
    }

    

}

module.exports = {RecommendationRepository}
