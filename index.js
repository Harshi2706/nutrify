var express =  require('express');
var app = express();

// Using JWT
// var jwt = require('jsonwebtoken');

// Using session and cookie
var session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

const Logger = function (req, res, next) {
    console.log(`[${new Date()}]: ${req.method} ${req.url}`);
    next();
}

app.use(Logger);

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');

// Server side rendering code

app.get('/',  (req, res) => {
    res.render('main');
})

// Using JWT
// app.get('/home',  (req, res) => {
//     if (req.headers.authorization) {
//         const token = req.headers.authorization.split(' ')[1];
//         const userDetails = jwt.verify(token, 'secret');
//         if (userDetails.email) {
//             res.render('home', { email:  userDetails.email });
//         } else {
//             res.sendStatus(401);
//         }
//     } else {
//         res.sendStatus(401);
//     }
// })


// Using session and cookie
app.get('/home',  (req, res) => {
    if (req.session.email) {
        res.render('home', { email:  req.session.email });
    } else {
        res.sendStatus(401);
    }
})

app.use(indexRouter);

// Integrating with React;
// app.use(express.static('react_frontend/build'));
// app.use('/api/v1', indexRouter);
// app.get('/*', (req, res) => {
//     res.sendFile(__dirname + '/react_frontend/build/index.html')
// })

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use(function(err, req, res, next) {
    if (err) {
        console.log(err);
        res.sendStatus(500);
    } else {
        next();
    }
})