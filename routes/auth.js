const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController
const {authenticateRegularUser } = require("../repository/authMiddleWares");

const authController=new AuthController()

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/status").get(authenticateRegularUser,authController.status);
module.exports=router