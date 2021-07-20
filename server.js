let express = require('express');
let cors=require('cors')
let app = express();
let port = process.env.PORT || 2888;
let routes = require('./api/routers');
routes(app);
app.use(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(404).send({url: req.originalUrl + ' not found'});
})
app.listen(port);

console.log('RESTful API server started on: ' + port);