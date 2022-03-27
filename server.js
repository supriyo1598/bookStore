const express = require('express');
const app = express();
const port = 5000;
const router = require('./routes/route.js');
const session = require('express-session');


app.use(session({
    resave: false, // as it is set to false, now the session will not be resaved everytime a request comes even if the session is not modified at all
    saveUninitialized: false, // won't allow saving uninitialized sessions
    secret: ';kajerghpu9qeghqep98ty135ptlnrfp9q3hqerpghq5pghaero9tq3eguh',
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours in milliseconds
        secure: false, // should not be set to true if https is not in use
    }
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

app.listen(port);