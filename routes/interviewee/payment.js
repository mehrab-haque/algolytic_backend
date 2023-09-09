const router = require("express-promise-router")();
const PaymentController=require('../../controllers/interviewee/payment').PaymentController

const paymentController=new PaymentController()

router.route("/ipn").post(paymentController.ipn);
router.route("/post-payment/:status").post(paymentController.postPayment);

// module.exports=router
exports.SSLCommerzRouter = router;