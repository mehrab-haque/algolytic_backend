const Problem = require('../model/problem');
const Auth = require('../model/auth');
const Repository=require('./base').Repository
// const Problem=require('../model/problem')
const sequelize = require('sequelize');
const Submission = require('../model/submission');
const Solution = require('../model/solution');

class ProblemRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var problems = await Problem.findAll();
        return problems
    }
    getSolutions=async (id)=>{
      var sols = await Solution.findAll({where:{problem_id:id},include:Problem});
      return sols
  }
    getStats=async(user_id)=>{


        try{
        const result=await Submission.findAll({
            attributes: [
              [
                sequelize.literal('COUNT(DISTINCT "problem"."problem_id")'),
                'distinct_count'
              ],
              [sequelize.col('problem.difficulty'), 'difficulty']
            ],
            include: [
              {
                model: Problem,
                as: 'problem',
                required: true
              }
            ],
            where: {
              verdict: "true",
              user_id: user_id
            },
            group: [
        
                sequelize.col('"problem"."difficulty"') ,
            sequelize.col('"problem"."problem_id"') 
        ]
          })

          const difficultyCounts = {"easy":0,"medium":0,"hard":0};

          // Loop through the JSON data and count the occurrences of each difficulty level
          result.forEach(item => {
            console.log(item)
            const difficulty = item.dataValues.difficulty;
            if (difficultyCounts[difficulty]) {
              difficultyCounts[difficulty]++;
            } else {
              difficultyCounts[difficulty] = 1;
            }
          });
          
          // Print the difficulty counts
        

          return  difficultyCounts;
        }
        catch(error) {
              console.error(error);
            
            };

        

    }
    
    getFilteredProblems=async (query)=>{

        var fields=['isPremium','tag','difficulty']
        
        var queryObj={}
        fields.map(f=>{
            if(query[f])
                queryObj[f]=query[f]
        })
        console.log(queryObj)
        
        var problems = await Problem.findAll(
          {where:queryObj }
          
          );
        return problems
    }
    
    get=async (id)=>{
        var problem = await Problem.findByPk(id)
        return problem
    }

    getPopularProblems=async ()=>{
      const problems=await Submission.findAll({
        attributes: [
          [
            sequelize.literal('COUNT(*)'),
            'count'
          ]
        ],
        include: [
          {
            model: Problem,
            as: 'problem',
            required: true
          }
        ],       
        group: [    
            sequelize.col('"problem"."problem_id"') 
        ],
        order: [
          [sequelize.literal('"count"'), 'DESC']
        ],
        limit: 5
      })
      return problems
  }

  getLeaderBoard=async (problem_id)=>{
    const subs=await Submission.findAll({  
      include: [
        {
          model: Auth          
        }
      ],   
      where: {
        problem_id:problem_id,
        verdict:"true"
      },
      order: [
        ["time", 'ASC'],
        ["memory", "ASC"],
      ],
      limit: 5
    })
    return subs
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
            acceptance:problem.acceptance,
            rating: problem.rating
            
        })
        return pr
    }

    createSolution=async solution=>{
      const pr = Solution.create({
          problem_id:solution.problem_id,
          language:solution.language,
          solution:solution.solution
    
          
      })
      return pr
  }

}

module.exports = {ProblemRepository}
