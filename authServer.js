require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// app.use(bodyParser.json());
app.use(express.json());

posts =[
    {
    username: 'David',
    body: 'Hey man',
    },
    {
    username: 'Timothy',
    body: 'Hey Dude',
}
]

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
})

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
}

app.post('/login', (req, res) => {
    console.log(req.body);
    const username = req.body.username
    const user = {name: username}

    const accessToken =  generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    res.json({accessToken: accessToken, refreshToken: refreshToken});
})


app.get('/posts', authenticateToken, (req, res)=> {
    res.json(posts.filter(post => post.username === req.user.name));
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
