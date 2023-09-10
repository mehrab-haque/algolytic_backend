const router = require("express-promise-router")();
const MonitorController=require('../controllers/monitor').MonitorController

// const monitorController=new MonitorController()

router.route("/github/backend").post(MonitorController.gitBackendWebhook);
router.route("/prodback").get(MonitorController.awsProdBack);
router.route("/connect").get(MonitorController.connect);
router.route("/initialize").get(MonitorController.initialize);

module.exports=router