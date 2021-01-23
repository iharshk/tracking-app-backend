const Router = require("express");
const routes = new Router();
const auth = require('./src/controller/auth')
const connections = require('./src/controller/connections')
const { validateUser } = require('./src/common/utils');

module.exports = function(app, http) {

    app.use((req, res, next) => {
    
        if(req.url === '/signup' || req.url === '/login') next();
        else validateUser(req, res, next);
    });
    app.use('', routes);

    app.all('*', (req, res) => {
        res.send({
            error: true,
            status: 404,
            message: "API not found"
        })
    });
};

routes.post('/signup', auth.signup);
routes.post('/login', auth.login);
routes.post('/reqSend', connections.reqSend);
routes.post('/reqAccept', connections.reqAccept);
routes.post('/reqReject', connections.reqReject);





