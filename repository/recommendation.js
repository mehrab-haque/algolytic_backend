const Submission = require('../model/submission');
const Auth = require('../model/auth');
const Problem = require('../model/problem');
const Dummy = require('../model/dummy');
const Peer = require('../model/peer');
const Repository=require('./base').Repository
const Op = require('sequelize').Op;
const sequelize=require('sequelize')

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
                  include:

                    {
                        model:Problem
                    }                
                  
                  }     
        );
        return problems
    }    

    getUserList=async (req)=>{
        var users = await Auth.findAll(
            {                
                attributes: ['name', 'login','id'],
                where:{id:{[Op.ne]:req.body['user_id']}}
            }

        );
        return users
    }

    getCountbyTag=async (user_id)=>{
        var count = await Submission.findAll(
            {               
            
                include:{
                
                    model:Problem,
                    as: 'problem',
                    required: true            
                },
                where:{
                    user_id:user_id,
                    verdict:"true"
                },
                attributes: [
                    [
                        sequelize.literal('COUNT(*)'),
                        'count'
                    ],
                    [sequelize.col('problem.tag'), 'tag']
                ],                
                group: [    
                    sequelize.col('"problem"."tag"'),sequelize.col('"problem"."problem_id"')  
                ]
                }               
            

        );
        return count
    }

    checkifNewProblem=async (problem_id,user_id)=>{
       
        var count = await Submission.findAll(
            {
                attributes: [
                    [
                        sequelize.literal('COUNT(DISTINCT "submission_id")'),
                        'count'
                    ]
                ],
                where: {
                    problem_id:problem_id,
                    submission_time: {
                        [Op.lt]: sequelize.literal('CURRENT_TIMESTAMP') // Select rows with submission_time less than the provided value
                      },
                    user_id:user_id,                             
                  }                        
                  
                  }     
        );
        return count
        
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

    // dummy 

    getDummys=async (req)=>{
        var dummys = await Dummy.findAll(
            // {                
            //     attributes: ['name', 'login','id'],
            //     where:{id:{[Op.ne]:req.body['user_id']}}
            // }

        );
        return dummys
    }

    createDummy=async (dummy)=>{

        for (let index = 0; index < dummy.body["tag"].length; index++) {
            // const element = array[index];
            const rec = Dummy.create({
                title:dummy.body["title"],
                tag:dummy.body["tag"][index],
                rating:dummy.body["rating"]
                
            })
                
            }
            // console.log(recommendation.body["to"][0])
            return {success : true}
            
        }
        
        
    


    

}

module.exports = {RecommendationRepository}
