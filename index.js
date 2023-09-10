const app = require ('./app').app;

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    // console.log(`Server running on port ${port}`);
});
module.exports={server}