const router = require("express-promise-router")();
const ProblemController=require('../../controllers/interviewee/problem').ProblemController

const problemController=new ProblemController()

router.route("/list").post(problemController.list);
router.route("/create").post(problemController.create);
router.route("/update/:id").post(problemController.update);
router.route("/get/:id").get(problemController.get);
router.route("/submit").post(problemController.submit);
router.route("/submissions").post(problemController.getSubmissions);
router.route("/submissionstats").post(problemController.getSubmissionStats);

module.exports=router