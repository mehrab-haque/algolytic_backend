const { SubController } = require("../../controllers/interviewee/subscription");

const {authenticateRegularUser } = require("../../repository/authMiddleWares");
const multer = require('multer');
const upload = multer();

const router = require("express-promise-router")();

const subController=new SubController()

router.route("/list").get(subController.list);
router.route("/subscribe").post(authenticateRegularUser,subController.subscribe);

router.route("/create").post(subController.create);
router.route("/upload").post( upload.single('csvFile'),subController.upload);


module.exports=router