const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes=require('./routes/auth')
const problemRoutes=require('./routes/interviewee/problem')
const tagRoutes=require('./routes/interviewee/tag')

app.get("/api/v1.0.0/ping", function (req, res) {
    res.send("hello world 2");
});

app.use('/api/v1.0.0/auth', authRoutes);
app.use('/api/v1.0.0/problem', problemRoutes);
app.use('/api/v1.0.0/tag', tagRoutes);


module.exports = {app};