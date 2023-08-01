const Service = require('../base').Service;
const TagRepository=require('../../repository/tag').TagRepository

const tagRepository=new TagRepository()

class TagService extends Service {
    constructor() {
        super();
    }

    list =async ()=>{
        try{
            var tags=await tagRepository.getAll()
            return {
                success:true,
                data:tags
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    }

    create =async (name)=>{
        try{
            var tag=await tagRepository.create(name)
            return {
                success:true,
                data:tag
            }

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
    }
}

module.exports = {TagService}