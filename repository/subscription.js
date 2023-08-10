const Sub = require('../model/subscription');
const Repository=require('./base').Repository
const Auth = require('../model/auth');

class SubRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var subs = await Sub.findAll();
        return subs
    }

    create=async data=>{
        const sub = Sub.create({
            title:data.title,
            fee:data.fee,
            logo:data.logo


        })
        return sub
    }
    subscribe=async data=>{
        const sub = Auth.update({
            
            sub_id:data.sub_id


        },
        
        {
            where:{

                id:data.user_id
            }
        })
        return sub
    }

}

module.exports = {SubRepository}
