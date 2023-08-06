const { TagController } = require("../../controllers/interviewee/tag");
const { authenticateAdmin } = require("../../repository/authMiddleWares");

const router = require("express-promise-router")();

const tagController=new TagController()

router.route("/list").get(tagController.list);
router.route("/add").post(authenticateAdmin,tagController.create);

module.exports=router