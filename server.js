"use strict";

const restify = require('restify');
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
const config = require('./config');
const user = require('./lib/user');
const app = restify.createServer();

app.use(restify.plugins.queryParser());  
app.use(restify.plugins.bodyParser());
app.use(rjwt(config.jwt).unless({
    path: ['/auth']
}));

app.get('/user', (req, res, next) => {
    res.send(req.user);
});

app.post('/auth', (req, res, next) => {
    let { username, password } = req.body;
    user.authenticate(username, password).then(data => {
        let token = jwt.sign(data, config.jwt.secret, {
            expiresIn: '1m'
        });

        let {iat, exp} = jwt.decode(token);
        res.send({iat, exp, token});
    })
});

app.listen(8080, () => {  
    console.log('%s listening at %s', app.name, app.url);
});
