var dbClient = require('../db/index');
var passwordHash = require('password-hash');

const createUser = async (user, callback) =>  {
    try {
        const users = dbClient.get('users');
        console.log(1)
        const dbUser = await users.findOne({ email: user.email })
        if (dbUser) {
            callback(null, {
                success: false,
                message: 'we already havve a user with this mail',
                err
            });
        }
        else{
        await users.insert({ email: user.email, password: passwordHash.generate(user.password) })
        callback(null, {
            success: true
        });
    }
    } catch (e) {
        console.log(e);
        callback(e, null)
    }
}

module.exports.createUser = createUser;

const verifyUser = async (user, callback) =>  {
    const { email, password } = user;
    try {
        const users = dbClient.get('users');
        const dbUser = await users.findOne({ email: user.email })
        if (dbUser) {
            const isPasswordVerified = passwordHash.verify(password, dbUser.password);
            if (isPasswordVerified) {
                callback(null, {
                    success: true,
                    email
                });
            } else {
                callback(null, {
                    success: false,
                    message: 'Please check your password!'
                });
            }
        } else {
            callback(null, {
                success: false,
                message: 'No user found. Please sign up!'
            });
        }
    } catch (e) {
        console.log(e);
        callback(e, null)
    }
}

module.exports.verifyUser = verifyUser;

const createMeal = async (meal, callback) =>  {
    try {
        const meals = dbClient.get('meals');
        await meals.insert({ calories: meal.calories, name: meal.name,username:meal.username })
        callback(null, {
            success: true
        });
    } catch (e) {
        console.log(e);
        callback(e, null)
    }
}
const readMeals = async (meal, callback) =>  {
    try {
        const meals = dbClient.get('meals');
        const dbmeal = await meals.find({ username: meal.username })
        console.log(dbmeal)
        callback(null, {
            mealdata: dbmeal,
            success:true
        });
    } catch (e) {
        console.log(e);
        callback(e, null)
    }
}
const updateMeal = async (meal, callback) =>  {
    try {
        const meals = dbClient.get('meals');
        const dbmeal = await meals.update(
            {"_id":meal.mealid},
            {$set: {calories:meal.calories,name:meal.name}});
        console.log(dbmeal)
        callback(null, {
            success: true
        });
    } catch (e) {
        console.log(e);
        callback(e, null)
    }
}

const deleteMeal = async (meal, callback) =>  {
    try {
        const meals = dbClient.get('meals');
        await meals.remove({"_id":meal.mealid})
        callback(null, {
            success: true
        });
    } catch (e) {
        console.log(e);
        callback(e, null)
    }
}

module.exports.readMeals=readMeals;
module.exports.createMeal=createMeal;
module.exports.updateMeal=updateMeal;
module.exports.deleteMeal=deleteMeal;