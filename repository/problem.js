const Problem = require('../model/problem');
const Repository=require('./base').Repository

class ProblemRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var problems = await Problem.findAll();
        return problems
    }

    create=async problem=>{
        const pr = Problem.create({
            title:problem.title,
            isLive:problem.isLive,
            isPremium:problem.isPremium,
            author_id:problem.author_id,            
            data_json:problem.data_json,
            logo:problem.logo
        })
        return pr
    }

}

module.exports = {ProblemRepository}
