var router = require('express').Router();
var dbClient = require('../db/index');
const users = dbClient.get('users');
const meals=dbClient.get('meals')
router.post('/new', (req, res) => {
    console.log('session', req.session);
    const meals=req.body
    meals.insert({ userid:userid, meals:meals,mealid:mealid })
    res.end('Successfully created a task!');
})
router.post('/new', (req, res) => {
    console.log('session', req.session);
    const meals=req.body
    const meal = await meals.findOne({ mealid:mealid})
    meals.update({ userid:userid, meals:meals,mealid:mealid })
    res.end('Successfully updated a task!');
})

router.delete('/:id', (req, res) => {
    res.end('Successfully deleted the task!');
    const meal = await meals.findOne({ mealid:mealid})
    meals.remove(meal)
})

module.exports = router;