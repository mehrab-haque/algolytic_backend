const Submission = require('../model/submission');
const Auth = require('../model/auth');
const Repository=require('./base').Repository

class SubmissionRepository extends Repository {
    constructor() {
        super();
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

    postSubmission=async submission=>{
        const sb = Submission.create({            
            problem_id:submission.problem_id,            
            solution:submission.code,
            submission_time:Date.now(),

            
            language:submission.lang,
            user_id:submission.user_id ,
            verdict:submission.verdict,
            time:submission.time,
            memory:submission.memory      
        })
        return sb
    }

}

module.exports = {SubmissionRepository}
