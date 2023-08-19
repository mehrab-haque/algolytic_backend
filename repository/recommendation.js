const Submission = require('../model/submission');
const Auth = require('../model/auth');
const Problem = require('../model/problem');
const Repository=require('./base').Repository

class RecommendationRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var problems = await Problem.findAll();
        return problems
    }

    getSubsbyProblem=async req=>{
        var submissions = await Submission.findAll({

               
          
            
            include:{
                
                model:Auth,
                attributes:['name','login','id','sub_id']

            
            
            },

            
            where: {
              problem_id:req.params.id ,
              user_id:req.body.user_id
            }
           
        }
       
          
          );
        return submissions
    }

    

}

module.exports = {RecommendationRepository}
