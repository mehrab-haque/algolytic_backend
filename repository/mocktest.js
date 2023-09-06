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

    getTestProblems=async (req)=>{
        var problems = await TestProblem.findAll(
            {
                where: {
                    testid:req.params.id            
                  },
                  include:{
                    model:Problem,
                    through: { attributes: [] }
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
