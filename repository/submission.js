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
            solution:submission.solution,
            submission_time:submission.submission_time,
            language:submission.language            
        })
        return sb
    }

}

module.exports = {SubmissionRepository}
