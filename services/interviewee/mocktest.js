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
            var problems=await mocktestRepository.getTestProblems(req)
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

    submitTest =async (test)=>{
        try{

           let marks=0
           var pids=await mocktestRepository.getTestProblems(test.body["id"])
        //    console.log(pids)

           for(let i=0;i<pids.length;i++){
            var sub=await mocktestRepository.getTestSubmissions(pids[i].get({plain:true}).problemid,test.body["user_id"])
            console.log(sub.r1[0].get({plain:true}).distinct_count)
            let temp=0            
            temp=sub.r1[0].get({plain:true}).distinct_count*10- sub.r2[0].get({plain:true}).count*1
            if(temp<5 && sub.r1[0].get({plain:true}).distinct_count>0)temp=5
            marks+=temp
           }
           console.log(marks)
           
        //    var sub=await mocktestRepository.getTestSubmissions(1,1)

        //    let temp=0
        //    console.log(sub.r1[0].get({plain:true}).distinct_count)
        //    temp=sub.r1[0].get({plain:true}).distinct_count*10- sub.r2[0].get({plain:true}).count*1
        //    if(temp<5)temp=5
        //    console.log(temp)

           var res=await mocktestRepository.submitTest(test.body["id"],marks)
           
            

            return {
                success:true,
                data:sub
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