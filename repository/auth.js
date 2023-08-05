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

    create =async (creds)=>{
        var createResult=await Auth.create(creds)
        return createResult
    }

}

module.exports = {AuthRepository}
