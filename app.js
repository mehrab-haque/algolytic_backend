const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes=require('./routes/auth')
const problemRoutes=require('./routes/interviewee/problem')
const tagRoutes=require('./routes/interviewee/tag')

app.get("/ping", function (req, res) {
    res.json({
        message:'hello world changed'
    });
});

app.use('/auth', authRoutes);
app.use('/problem', problemRoutes);
app.use('/tag', tagRoutes);


module.exports = app;