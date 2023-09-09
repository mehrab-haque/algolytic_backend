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
router.route("/submissionstats").get(authenticateRegularUser,problemController.getSubmissionStats);
router.route("/filter").get(problemController.getFilteredProblems);
router.route("/solution/create").post(problemController.createSolution);
router.route("/solutions/:id").get(authenticateRegularUser,problemController.getSolutions);
router.route("/leaderboard/:id").get(authenticateRegularUser,problemController.getLeaderBoard);
router.route("/getpopularpblms").get(authenticateRegularUser,problemController.getPopularProblems);
module.exports=router