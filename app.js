const express = require('express');
const cors = require('cors')
const bodyParser=require('body-parser')
const swaggarUi=require('swagger-ui-express')
const docs = require('./docs')

const authRoutes=require('./routes/auth')
const problemRoutes=require('./routes/interviewee/problem')
const tagRoutes=require('./routes/interviewee/tag')
const { SSLCommerzRouter } = require('./routes/interviewee/payment');
const subRoutes=require('./routes/interviewee/subscription')
const recommendationRoutes=require('./routes/interviewee/recommendation')
const mocktestRoutes=require('./routes/interviewee/mocktest')
const webhookRoutes=require('./routes/webhooks.js')

require('./model/sync')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api/v1.0.0/docs',swaggarUi.serve,swaggarUi.setup(docs))

app.get("/api/v1.0.0/ping", function (req, res) {
    res.send("hello world");
});


app.use('/api/v1.0.0/auth', authRoutes);
app.use('/api/v1.0.0/problem', problemRoutes);
app.use('/api/v1.0.0/tag', tagRoutes);
app.use('/api/v1.0.0/subscription', subRoutes);
app.use('/api/v1.0.0/recommendation', recommendationRoutes);
app.use('/api/v1.0.0/mocktest', mocktestRoutes);
app.use('/api/v1.0.0/payment', SSLCommerzRouter);
app.use('/api/v1.0.0/webhook', webhookRoutes);

module.exports = {app};
