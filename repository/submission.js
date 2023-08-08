const Submission = require('../model/submission');
const Repository=require('./base').Repository

class SubmissionRepository extends Repository {
    constructor() {
        super();
    }

    getSubsbyProblem=async id=>{
        var submissions = await Submission.findAll({
            where: {
              problem_id:id 
            }
          });
        return submissions
    }

    postSubmission=async submission=>{
        const sb = Submission.create({            
            problem_id:submission.problem_id,            
            solution:submission.code,
            submission_time:Date.now(),

            
            language:submission.lang,
            user_id:submission.user_id ,
            verdict:submission.verdict      
        })
        return sb
    }

}

module.exports = {SubmissionRepository}
