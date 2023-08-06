const { authenticateAdmin, authenticateRegularUser } = require("../../repository/authMiddleWares");

const router = require("express-promise-router")();
const ProblemController=require('../../controllers/interviewee/problem').ProblemController

const problemController=new ProblemController()

router.route("/list").get(problemController.list);
router.route("/create").post(authenticateAdmin,problemController.create);
router.route("/update/:id").post(authenticateAdmin,problemController.update);
router.route("/delete/:id").delete(authenticateAdmin,problemController.delete);
router.route("/get/:id").get(problemController.get);
router.route("/submit").post(authenticateRegularUser,problemController.submit);
router.route("/submissions/:id").get(authenticateRegularUser,problemController.getSubmissionsbyProblemId);
router.route("/submissionstats").post(authenticateRegularUser,problemController.getSubmissionStats);
router.route("/filter").get(problemController.getFilteredProblems);

module.exports=router