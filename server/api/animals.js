import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

router.get('/animals/feed-list', function (req, res, next) {
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

router.get('/animals/harvest-list', function (req, res, next) {
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

router.post('/animals/feed', bodyParser.json(), function (req, res, next) {
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