var router = require('express').Router();
var authModel = require('../models/authModel');
var jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
    const user = req.body;
    authModel.createUser(user, (err, data) => {
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'Signup failed!'
            })
        } else {
            res.redirect('/auth/signin')
        }
    })
})

router.get('/signup', (req, res) => {
    res.render('signup');
})
router.get('/Createmeal', (req, res) => {
    res.render('Createmeal');
})
router.get('/Updatemeal', (req, res) => {
    res.render('Updatemeal');
})
router.get('/deletemeal', (req, res) => {
    res.render('deletemeal');
})
router.get('/Readmeals', (req, res) => {
    res.render('Readmeals');
})

router.get('/signin', (req, res) => {
    res.render('signin');
})

router.post('/signin', (req, res) => {
    const user = req.body;
    authModel.verifyUser(user, (err, data) => {
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'Signin failed!'
            })
        } else {
            if (data.success) {
                req.session.email = data.email;
                req.session.role = 'ADMIN';
                res.redirect('/home');
            } else {
                res.json(data);
            }
        }
    })
})

router.post('/signout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/auth/signin');
});

router.post('/Createmeal', (req, res) => {
    const meal = req.body;
    authModel.createMeal(meal, (err, data) => {
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'Adding failed!'
            })
        } else {
            console.log("created")
            console.log(meal)
            res.redirect('/auth/Readmeals')
        }
    })
})

router.post('/Updatemeal', (req, res) => {
    const meal = req.body;
    authModel.updateMeal(meal, (err, data) => {
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'Updating failed!'
            })
        } else {
            console.log("updated")
            res.redirect('/auth/Readmeals')
        }
    })
})


router.post('/Readmeals', (req, res) => {
    const meal = req.body;
    authModel.readMeals(meal, (err, data) => {
        console.log(data.mealdata)
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'reading failed!'
            })
        } else {
           res.redirect('/auth/Updatemeal')
        }
    })
})

router.post('/deletemeal', (req, res) => {
    const meal = req.body;
    authModel.deleteMeal(meal, (err, data) => {
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'reading failed!'
            })
        } else {
           res.redirect('/auth/Readmeals')
        }
    })
})

module.exports = router;