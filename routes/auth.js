const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController

const authController=new AuthController()

router.route("/google-login").post(authController.googleLogin);

module.exports=router