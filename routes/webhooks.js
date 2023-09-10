const router = require("express-promise-router")();
const MonitorController=require('../controllers/monitor').MonitorController

const monitorController=new MonitorController()

router.route("/github/backend").post(monitorController.gitBackendWebhook);
router.route("/connect").get(monitorController.connect);
router.route("/initialize").get(monitorController.initialize);

module.exports=router