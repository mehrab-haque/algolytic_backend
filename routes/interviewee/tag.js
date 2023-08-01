const { TagController } = require("../../controllers/interviewee/tag");

const router = require("express-promise-router")();

const tagController=new TagController()

router.route("/list").get(tagController.list);
router.route("/add").post(tagController.create);

module.exports=router