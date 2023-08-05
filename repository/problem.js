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

    getFilteredProblems=async (query)=>{

        var fields=['isPremium','tag','difficulty']
        
        var queryObj={}
        fields.map(f=>{
            if(query[f])
                queryObj[f]=query[f]
        })
        
        var problems = await Problem.findAll({where:queryObj });
        return problems
    }

    delete=async (id)=>{
        var problems = await Problem.destroy({where:{problem_id:id} });
        return problems
    }

    create=async problem=>{
        const pr = Problem.create({
            title:problem.title,
            isLive:problem.isLive,
            isPremium:problem.isPremium,
            author_id:problem.author_id,            
            data_json:problem.data_json,
            logo:problem.logo,
            tag:problem.tag,
            difficulty:problem.difficulty,
            acceptance:problem.acceptance
            
        })
        return pr
    }

    

}

module.exports = {ProblemRepository}
