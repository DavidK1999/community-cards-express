if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const passport = require('passport');
const whitelist=['http://localhost:3000']
const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

require('./db/db.js');

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize())

const authController = require('./controllers/auth');
app.use('/auth', authController)

const cardController = require('./controllers/card');
app.use('/card', cardController)

const userController = require('./controllers/user');
app.use('/user', userController)

app.listen(port, (req, res) => {
    console.log('Listening on port',port);
});