const jwt = require('jsonwebtoken');
const { userTypeMapping } = require('../config/constants');

var authenticateAdmin=(req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    try{
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body['user_id']=decoded.id
        if(decoded.type===userTypeMapping.USER_TYPE_ADMIN)
            next()
        else return res.sendStatus(401)
    }catch(err){
        return res.sendStatus(403)
    }
}

var authenticateRegularUser=(req, res, next)=>{
    console.log(req.headers
        )
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token == null) return res.sendStatus(401)
    try{
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body['user_id']=decoded.id
        console.log(decoded.id)
        if(decoded.type===userTypeMapping.USER_TYPE_REGULAR)
            next()
        else return res.sendStatus(401)
    }catch(err){
        return res.sendStatus(403)
    }
}

module.exports={
    authenticateAdmin,authenticateRegularUser
}