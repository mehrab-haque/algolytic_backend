const Service = require('./base').Service;
const jwt_decode = require('jwt-decode');
const constants= require('../config/constants')
const bcrypt=require('bcryptjs')
const JWT = require('jsonwebtoken');
const { userTypeMapping } = require('../config/constants');
const AuthRepository=require('../repository/auth').AuthRepository

const authRepository=new AuthRepository()

class AuthService extends Service {
    constructor() {
        super();
    }

    signToken = user =>{
        return JWT.sign(user.get({ plain: true }), process.env.JWT_SECRET);
    }

 register=async creds=>{

        const lookupResult=await authRepository.checkIfLoginExists(creds.login)
      
        if(lookupResult){
            return {
                success:false,
                message:'user already exists'
            }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(creds.password,salt)
        const insertResult=await authRepository.create({...creds,password:hashedPass,type:userTypeMapping.USER_TYPE_REGULAR})
        return {
            success:true,
            result:insertResult
        }

    }

    admin =async (data)=>{
        try{
            var status=await authRepository.admin(data)
       
            return {
                success:true,
                data:status.type=="AUTH_ADMIN"?true:false
            }

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
    }
    status =async (data)=>{
        try{
            var status=await authRepository.status(data)
            return {
                success:true,
                data:status
            }

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
    }
    login=async creds=>{
        const lookupResult=await authRepository.getUserByLogin(creds.login)
        if(lookupResult.length===0){
            return {
                success:false,
                message:'user does not exist'
            }
        }
        var hashedPass=lookupResult[0].password
        const isPassValid=await bcrypt.compare(creds.password,hashedPass)
        if(!isPassValid)
            return{
                success:false,
                error:'wrong password'
            }
        const token=this.signToken(lookupResult[0])
        return{
            success:true,
            token
        }

    }

    
}
module.exports = {AuthService}