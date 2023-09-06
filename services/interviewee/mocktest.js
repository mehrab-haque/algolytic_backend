const Service = require('../base').Service;
const MocktestRepository=require('../../repository/mocktest').MocktestRepository
const TagRepository=require('../../repository/tag').TagRepository

const mocktestRepository=new MocktestRepository()
const tagRepository=new TagRepository()

class MocktestService extends Service {
    constructor() {
        super();
    }

    getTestProblems =async (req)=>{
        try{
            var problems=await mocktestRepository.getProblemsbyTag(req)
            return {
                success:true,
                data:problems
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    }

    createTest =async (test)=>{
        try{
            var res1=await mocktestRepository.createTest(test)
            // console.log("testid")
            // console.log(res1.get({plain:true}).test_id)
            var tagids=await tagRepository.getIdFromTag(test.body["tags"])
            let ids=[]
            for(var i=0;i<tagids.length;i++){
                ids.push(tagids[i].get({plain:true}).id)
            }
            
            var res2=await mocktestRepository.createTestTags(ids, res1.get({plain:true}).test_id)

            var problems=await mocktestRepository.getProblemsbyTag(test)
            
            let selected_problems=[]
            for(var i=0;i<Math.min(problems.length,4);i++){
                selected_problems.push(problems[i].get({plain:true}).problem_id)
            }

            var res3=await mocktestRepository.createTestProblems(test,selected_problems)
            

            return {
                success:true,
                data:selected_problems
            }

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
          
    }

}  

module.exports = {MocktestService}