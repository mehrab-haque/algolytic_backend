const { MocktestController } = require("../../controllers/interviewee/mocktest");

const {authenticateRegularUser } = require("../../repository/authMiddleWares");

const router = require("express-promise-router")();

const mocktestController=new MocktestController()

// router.route("/recompblmlist").get(authenticateRegularUser,recommendationController.systemgeneratedlist);
// router.route("/peerpblmlist").get(authenticateRegularUser,recommendationController.peerlist);

// router.route("/userlist").get(authenticateRegularUser,recommendationController.userlist);
// router.route("/recommend").post(authenticateRegularUser,recommendationController.recommendpblm);

// router.route("/dummylist").get(authenticateRegularUser,recommendationController.dummylist);
// router.route("/createdummy").post(authenticateRegularUser,recommendationController.createDummy);

router.route("/testpblmlist/:id").get(authenticateRegularUser,mocktestController.getTestProblems);
router.route("/getCompletedTests").get(authenticateRegularUser,mocktestController.getCompletedTests);
router.route("/createTest").post(authenticateRegularUser,mocktestController.createTest);
router.route("/submitTest").post(authenticateRegularUser,mocktestController.submitTest);

module.exports=router