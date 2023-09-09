const Submission = require('../model/submission');
const Auth = require('../model/auth');
const Problem = require('../model/problem');
const Dummy = require('../model/dummy');
const Peer = require('../model/peer');
const Repository=require('./base').Repository
const Test=require('../model/test')
const TestProblem=require('../model/testproblem')
const TestTag=require('../model/testtag')
const Op = require('sequelize').Op;
const Sequelize=require('sequelize')

class MocktestRepository extends Repository {
    constructor() {
        super();
    }

    getCompletedTests=async (user_id)=>{
        var problems = await Test.findAll(
            {
                where: {
                    id:user_id,
                    submission_time: {
                        [Sequelize.Op.not]: null,
                      }            
                  }
                           
                  
                  }     
        );
        return problems
    }

    getTestProblems=async (id)=>{
        var problems = await TestProblem.findAll(
            {
                where: {
                    testid:id            
                  }
                //   include:{
                //     model:Problem,
                //     through: { attributes: [] }
                //     }               
                  
                  }     
        );
        return problems
    }

    getProblem=async (id)=>{
        var problem = await Problem.findByPk(id)
        return problem
    }

    checkSubmission=async (problem_id,submission_time,user_id)=>{

        if(submission_time==null)
        {
            var count = await Submission.findAll(
                {
                    attributes: [
                        [
                            Sequelize.literal('COUNT(DISTINCT "submission_id")'),
                            'count'
                        ]
                    ],
                    where: {
                        problem_id:problem_id,                        
                        verdict:"true",
                        user_id:user_id            
                      }                        
                      
                      }     
            );
            return count
        }
        else
        {
            var count = await Submission.findAll(
                {
                    attributes: [
                        [
                            Sequelize.literal('COUNT(DISTINCT "submission_id")'),
                            'count'
                        ]
                    ],
                    where: {
                        problem_id:problem_id,
                        submission_time: {
                            [Op.lt]: submission_time // Select rows with submission_time less than the provided value
                          },
                        verdict:"true",
                        user_id:user_id            
                      }                        
                      
                      }     
            );
            return count
        }
        
    }

    checkifNewProblems=async (problem_id,user_id)=>{
       
        var count = await Submission.findAll(
            {
                attributes: [
                    [
                        Sequelize.literal('COUNT(DISTINCT "submission_id")'),
                        'count'
                    ]
                ],
                where: {
                    problem_id:problem_id,
                    submission_time: {
                        [Op.lt]: Sequelize.literal('CURRENT_TIMESTAMP') // Select rows with submission_time less than the provided value
                      },
                      user_id:user_id                             
                  }                        
                  
                  }     
        );
        return count
        
    }



    getTestInfo=async (id)=>{
        var problems = await Test.findAll(
            {
                attributes: ['marks','submission_time'],
                where: {
                    test_id:id            
                  }                        
                  
                  }     
        );
        return problems
    }

    getProblemsbyTag=async (req)=>{

        var users = await Problem.findAll(
            {                
                attributes: ['problem_id'],
                where:  Sequelize.or(
                    { tag: req.body["tags"] },
                    
                    )
            }

        );
        return users
    }

    createTest=async (test)=>{

        const result = Test.create({
            id: test.body["user_id"]
            
        })
        
        return result
    }

    submitTest=async (id,test_marks)=>{

        const result = Test.update( {
            submission_time: Sequelize.literal('CURRENT_TIMESTAMP'), // Use CURRENT_TIMESTAMP for the current timestamp
            marks: test_marks,
          },
          {
            where: {
              test_id: id,
            },
          })
        
        return result
    }

    createTestProblems=async (test,problems)=>{

        for (let index = 0; index < problems.length; index++) {

            const rec = TestProblem.create({
                testid:test.body["test_id"],
                problemid:problems[index]
                
            })          
        }
        
        return {success : true}
    }

    createTestTags=async (tagids,test_id)=>{

        for (let index = 0; index < tagids.length; index++) {

            const rec = TestTag.create({
                testid:test_id,
                tagid:tagids[index]
                
            })          
        }
        
        return {success : true}
    }

    getTestSubmissions=async(problem_id,user_id)=>{


        try{
        const r1=await Submission.findAll({
            attributes: [
              [
                Sequelize.literal('COUNT(DISTINCT "problem_id")'),
                'distinct_count'
              ]
            ],           
            where: {
              verdict: "true",
              user_id: user_id,
              problem_id: problem_id
            }
           
          })

           const r2=await Submission.findAll({
            attributes: [
              [
                Sequelize.literal('COUNT("problem_id")'),
                'count'
              ]
            ],           
            where: {
              verdict: "false",
              user_id: user_id,
              problem_id: problem_id
            }
           
          })

          return {r1,r2}

        }
        catch(error) {
            console.error(error);
          
          };

        

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

module.exports = {MocktestRepository}
