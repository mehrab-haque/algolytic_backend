const express = require('express');
const router = express.Router()

//sslcommerz ipn
router.post('/ipn', (req,res) => {
    console.log(req.headers)
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)
    res.send({})
});

exports.SSLCommerzRouter = router;