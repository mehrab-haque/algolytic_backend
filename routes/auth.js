const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController
const {authenticateRegularUser,authenticateAdmin } = require("../repository/authMiddleWares");

const authController=new AuthController()

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/status").get(authenticateRegularUser,authController.status);
router.route("/checkAdmin").get(authenticateAdmin,authController.admin);
module.exports=router