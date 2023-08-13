const Service = require('../base').Service;
const SubRepository=require('../../repository/subscription').SubRepository

const subRepository=new SubRepository()

class SubService extends Service {
    constructor() {
        super();
    }

    list =async ()=>{
        try{
            var data=await subRepository.getAll()
            return {
                success:true,
                data:data
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    }

    create =async (data)=>{
        try{
            var sub=await subRepository.create(data)
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
    subscribe =async (data)=>{
        try{
            var sub=await subRepository.subscribe(data)
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

module.exports = {SubService}