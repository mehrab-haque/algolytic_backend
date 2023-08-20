const Controller = require("./base").Controller;
const AuthService=require("../services/auth").AuthService

const authService=new AuthService()

class AuthController extends Controller{
    constructor(){
        super()
    }

    register=async (req,res)=>{
        var result=await authService.register(req.body)
        return res.status(200).json(result)
    }

    login=async (req,res)=>{
        var result=await authService.login(req.body)
        return res.status(200).json(result)
    }
    status=async (req,res)=>{
        var result=await authService.status(req.body)
        return res.status(200).json(result)
    }
    admin=async (req,res)=>{
        var result=await authService.admin(req.body)
        return res.status(200).json(result)
    }
}

module.exports = {AuthController}