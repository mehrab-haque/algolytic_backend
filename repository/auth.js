const Auth = require('../model/auth');
const Repository=require('./base').Repository

class AuthRepository extends Repository {
    constructor() {
        super();
    }

    checkIfLoginExists=async (login)=>{
        var searchResult=await Auth.findAll({
            where: {
              login:login
            }
          })
        return searchResult.length>0
    }

    getUserByLogin=async (login)=>{
        var searchResult=await Auth.findAll({
            where: {
              login:login
            }
          })
        return searchResult
    }
    status=async (body)=>{
      var searchResult=await Auth.findAll({
          where: {
            id:body.user_id
          },
          attributes:['sub_id']
        })
      return searchResult
  }


    create =async (creds)=>{
        console.log(creds);
        creds={...creds,sub_id:1}
        console.log(creds);
        var createResult=await Auth.create(creds)
        return createResult
    }

}

module.exports = {AuthRepository}
