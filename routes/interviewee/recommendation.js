const { RecommendationController } = require("../../controllers/interviewee/recommendation");

const {authenticateRegularUser } = require("../../repository/authMiddleWares");

const router = require("express-promise-router")();

const recommendationController=new RecommendationController()

router.route("/recompblmlist").get(recommendationController.systemgeneratedlist);

module.exports=router