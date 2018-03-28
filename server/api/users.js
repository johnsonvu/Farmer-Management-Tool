import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

/* GET users listing. */
router.get('/users', function (req, res, next) {
    const query = 'SELECT * FROM Users;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(users => {
            console.log(users)
            res.json(users)
        })
})

// HERGH

router.get('/animals', function (req, res, next) {
    const query = `SELECT DISTINCT ON(a.id) a.id, a.age, a.weight, a.name, a.sin, a.species, a.pennumber, m.food, m.water,
        CASE WHEN m.date IS NULL
            THEN false
            ELSE TRUE
        END AS hasFed
        FROM Animal a
        LEFT JOIN (
            SELECT * FROM Mealfeeding WHERE date = (NOW() AT TIME ZONE 'US/Pacific')::DATE
        ) AS m
        ON a.id = m.AnimalId`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

/* GET user by ID. */
router.get('/users/:username', function (req, res, next) {
  const username = req.params.username
  const query = 'SELECT * FROM Users WHERE username = :username ;'
  connection.query(query, 
    { 
      type: connection.QueryTypes.SELECT,
      replacements: {
        username: username
      }
    })
    .then(user => {
      if (user.length === 1 ) {
        res.json(user[0])
      } else {
        res.status(404).json({})
      }
    })
})

router.post('/users/update', bodyParser.json(), function (req, res, next) {
  const userid = req.body.data.userid
  const username = req.body.data.username
  const password = req.body.data.password

  const query = 'UPDATE Users SET username = :username, password = :password WHERE userid = :userid ;'
  connection.query(query,
    {
      type: connection.QueryTypes.UPDATE,
      replacements: {
        username: username,
        password: password,
        userid: userid
      }
    })
    .then(result => {
      // result[1] is the number of rows changed
      res.send('/users')
    })
})

router.post('/users/add', bodyParser.json(), function (req, res, next) {
    const userid = req.body.data.userid
    const username = req.body.data.username
    const password = req.body.data.password

    const query = 'INSERT INTO Users (username, password) VALUES (:username, :password) ;'
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                username: username,
                password: password
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send('/users')
        })
})

// HERGH
router.post('/meal-feedings', bodyParser.json(), function (req, res, next) {
    const date = req.body.data.date
    const food = req.body.data.food
    const water = req.body.data.water
    const animalId = req.body.data.animalId
    const sin = req.body.data.sin

    const query = 'INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES (:date, :food, :water, :animalId, :sin);'
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                date: date,
                food: food,
                water: water,
                animalId: animalId,
                sin: sin
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send('SUCCESS')
        })
})

export default router
