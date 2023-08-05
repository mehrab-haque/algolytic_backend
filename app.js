const express = require('express');
const cors = require('cors')
const swaggarUi=require('swagger-ui-express')
const docs = require('./docs')

const authRoutes=require('./routes/auth')
const problemRoutes=require('./routes/interviewee/problem')
const tagRoutes=require('./routes/interviewee/tag')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1.0.0/docs',swaggarUi.serve,swaggarUi.setup(docs))

app.get("/api/v1.0.0/ping", function (req, res) {
    res.send("hello world 20");
});


app.use('/api/v1.0.0/auth', authRoutes);
app.use('/api/v1.0.0/problem', problemRoutes);
app.use('/api/v1.0.0/tag', tagRoutes);


module.exports = {app};
