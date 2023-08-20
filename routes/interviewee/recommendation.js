const { RecommendationController } = require("../../controllers/interviewee/recommendation");

const {authenticateRegularUser } = require("../../repository/authMiddleWares");

const router = require("express-promise-router")();

const recommendationController=new RecommendationController()

router.route("/recompblmlist").get(authenticateRegularUser,recommendationController.systemgeneratedlist);
router.route("/peerpblmlist").get(authenticateRegularUser,recommendationController.peerlist);
// router.route("/recompblmlist").get(recommendationController.systemgeneratedlist);
// router.route("/peerpblmlist").get(recommendationController.peerlist);
router.route("/userlist").get(authenticateRegularUser,recommendationController.userlist);
router.route("/recommend").post(authenticateRegularUser,recommendationController.recommendpblm);

module.exports=router