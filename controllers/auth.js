const Controller = require("./base").Controller;
const AuthService=require("../services/auth").AuthService

const authService=new AuthService()

class AuthController extends Controller{
    constructor(){
        super()
    }

    googleLogin=async (req,res)=>{
        var result=await authService.googleLogin(req.body)
        return res.status(200).json({
            success:result.success,
            token:result.success?result.token:null
        })
    }
}

module.exports = {AuthController}