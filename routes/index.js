var router = require('express').Router();

const authRouter = require('./auth');
const todosRouter = require('./todos');
const adminRouter = require('./admin');

const isAdmin = function(req, res, next) {
    // Using Session
    if (req.session && req.session.role === 'ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
    
    // Using JWT
    // if (req.userDetails.role === 'ADMIN') {
    //     next();
    // } else {
    //     res.sendStatus(401);
    // }
}

const verifyUser = function (req, res, next) {
    // Using session
    if (req.session.email) {
        next();
    } else {
        res.sendStatus(401);
    }

    // Using JWT
    // if (req.headers.authorization) {
    //     const token = req.headers.authorization.split(' ')[1];
    //     const userDetails = jwt.verify(token, 'secret');
    //     if (userDetails.email) {
    //         req.userDetails = userDetails;
    //         next();
    //     } else {
    //         res.sendStatus(401);
    //     }
    // } else {
    //     res.sendStatus(401);
    // }
}

router.use('/auth', authRouter);
router.use('/todos', verifyUser, todosRouter);
router.use('/admin', verifyUser, isAdmin, adminRouter);

module.exports = router;
