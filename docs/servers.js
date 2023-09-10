module.exports = {
    servers:[
        {
            url:'http://43.224.110.132/api/v1.0.0/'
        },//ss
        {
            url:`http://localhost:${process.env.PORT || 4000}/api/v1.0.0/`
        }
    ]
}