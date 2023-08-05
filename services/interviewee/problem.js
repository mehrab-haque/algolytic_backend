const axios=require('axios')
const Service = require('../base').Service;
const ProblemRepository=require('../../repository/problem').ProblemRepository
const SubmissionRepository=require('../../repository/submission').SubmissionRepository

const problemRepository=new ProblemRepository()
const subRepository=new SubmissionRepository()
class ProblemService extends Service {
    constructor() {
        super();
    }

    list =async ()=>{

        try{
            var problems=await problemRepository.getAll()
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
    //     var query=`
    //         SELECT * FROM problem
    //         WHERE is_live = true  
    //         ${Object.keys(filter).indexOf('difficulty')>=0?`and difficulty = '${filter.difficulty.toLowerCase()}'`:''}
    //         ${Object.keys(filter).indexOf('is_premium')>=0?`and is_premium = ${filter.is_premium}`:''}
    //         ${Object.keys(filter).indexOf('tag')>=0?`and tag = '${filter.tag}'`:''}
    //         ${Object.keys(filter).indexOf('search')>=0?`and LOWER(title) LIKE '%${filter.search.toLowerCase()}%'`:''}
    //     `;
    //    var params=[] 
    //    var problems=await this.query(query,params);
    //    problems.data=problems.data.map((p,i)=>{return {...p,status:i%2}})
    //     return problems;
    }

    create =async (problem)=>{
        try{
            var pr=await problemRepository.create(problem)
            return {
                success:true,
                data:pr
            }

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
        //     var query=`
    //         INSERT INTO problem
    //         (author_id,title,is_live,is_premium,logo,difficulty,data_json,tag)
    //         VALUES 
    //         ($1,$2,$3,$4,$5,$6,$7,$8)
    //     `;
    //    var params=[author_id,title,is_live,is_premium,logo,difficulty,data_json,tag] 
    //    var res=await this.query(query,params);
    //     return res
    }

    delete =async (id)=>{
        try{
            var pr=await problemRepository.delete(id)
            return {
                success:true,
              
            }

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
    }
    update =async (id,{author_id,title,is_live,tag,is_premium,logo,difficulty,data_json})=>{
        return {success:true}
        //     var query=`
    //         UPDATE problem
    //         SET author_id = $1,
    //             title = $2,
    //             is_live = $3,
    //             is_premium = $4,
    //             logo = $5,
    //             difficulty = $6,
    //             data_json = $7,
    //             tag = $8
    //         WHERE
    //             id = $9    
    //     `;
    //    var params=[author_id,title,is_live,is_premium,logo,difficulty,data_json,tag,id] 
    //    var res=await this.query(query,params);
    //     return res
    }

    get =async (id)=>{
      
        try{
            var problem=await problemRepository.get(id)
            return {
                success:true,
                data:problem
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    //     var query=`
    //         SELECT * FROM problem
    //         WHERE id = $1  
    //     `;
    //    var params=[id] 
    //    var problems=await this.query(query,params);
    //     return problems;
    }

    getSubmissionsbyProblemId =async (id)=>{
        try{
            var submissions=await subRepository.getSubsbyProblem(id)
            return {
                success:true,
                data:submissions
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    //     var query=`
    //         SELECT * FROM problem
    //         WHERE id = $1  
    //     `;
    //    var params=[id] 
    //    var problems=await this.query(query,params);
    //     return problems;
    }

    getFilteredProblems =async (query)=>{
        console.log(query)
        try{
            var problems=await problemRepository.getFilteredProblems(query)
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
    //     var query=`
    //         SELECT * FROM problem
    //         WHERE id = $1  
    //     `;
    //    var params=[id] 
    //    var problems=await this.query(query,params);
    //     return problems;
    }

    getSubmissionStats=async ({user_id})=>{
        // var query=`
        //     select count(distinct p.id), p.difficulty
        //     from submission s, problem p
        //     where s.verdict=true    
        //         and s.user_id=$1
        //     group by p.difficulty
        // `
        // var params=[user_id]
        // var result=await this.query(query,params)

        // var difficulties=['easy','medium','hard']
        // var stats={}
        // difficulties.map(d=>{
        //     var count =0
        //     result.data.map(r=>{
        //         if(r.difficulty===d)
        //             count+=parseInt(r.count)
        //     })
        //     stats[d]=count
        // })

        // return stats
        return {success:true}
    }

    getSubmissions=async ({problem_id})=>{
        // try{
        //     var submissions=await SubmissionRepository.getAll()
        //     return {
        //         success:true,
        //         data:problems
        //     }

        // }catch(e){
        //     console.log(e)
        //     return {
        //         success:false,
        //     }
        // }
        // var query=`
        //     SELECT * FROM submission
        //     WHERE user_id = $1
        //         and problem_id = $2
        // `
        // var params=[user_id,problem_id]
        // var result=await this.query(query,params)
        // return result
        return {success:true}
    }

    submit=async ({problem_id,user_id,code})=>{
        // //var isReady=false
        // //console.log('hi1')

        // var problemArr=await this.query(`SELECT data_json FROM problem WHERE id=$1`,[problem_id])

        // var input=await(problemArr.data[0].data_json.matchInput)
        // var output=await(problemArr.data[0].data_json.matchOutput)

        // var program = {
        //     script : code,
        //     stdin:input,
        //     language: "cpp",
        //     versionIndex: "0",
        //     clientId: "7056f59f69fa61c7754a1738ce0d3cfe",
        //     clientSecret:"9d062338752ce12cc208c6deb00dc1cc7f0bc27a2c6f5ff4e3e692648221bb8e"
        // };

        // var isError=false;
        
        // var compilerResponse=await axios.post('https://api.jdoodle.com/v1/execute',program).catch(err=>{
        //     isError=true;
        // })
        // compilerResponse=compilerResponse.data


        // var verdict=!isError?`${compilerResponse.output}`===`${output}`:false;



        // var insertQuery=`
        //     INSERT INTO submission
        //     (problem_id,user_id,verdict,code,timestamp)
        //     VALUES ($1,$2,$3,$4,$5)
        // `
        // var insertParams=[problem_id,user_id,verdict,code,parseInt(Date.now()/1000)]
        // await this.query(insertQuery,insertParams)
        // return {
        //     success:true,
        //     verdict:verdict
        // }
        return {success:true}
        
    }

    
}

module.exports = {ProblemService}
