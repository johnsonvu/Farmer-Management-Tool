import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

router.get('/farmers/workers', function (req, res, next) {
    const query = `WITH manager_name AS (
            SELECT * FROM manager m NATURAL JOIN farmer
        ), 
        worker_name AS (
            SELECT * FROM worker w NATURAL JOIN farmer
        ) 
        SELECT wn.sin, wn.firstname, wn.lastname, mn.sin AS manager_sin, mn.firstname AS manager_firstname, mn.lastname AS manager_lastname 
        FROM worker_name wn LEFT JOIN manager_name mn ON wn.manager_sin = mn.sin`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(farmers => {
            console.log(farmers)
            res.json(farmers)
        })
})

router.get('/farmers/managers', function (req, res, next) {
    const query = 'SELECT * FROM Manager NATURAL LEFT JOIN Farmer;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(farmers => {
            console.log(farmers)
            res.json(farmers)
        })
})

// router.post('/animals/feed', bodyParser.json(), function (req, res, next) {
//     const date = req.body.data.date
//     const food = req.body.data.food
//     const water = req.body.data.water
//     const animalId = req.body.data.animalId
//     const sin = req.body.data.sin
//
//     const query = 'INSERT INTO MealFeeding (Date, Food, Water, AnimalId, SIN) VALUES (:date, :food, :water, :animalId, :sin);'
//     connection.query(query,
//         {
//             type: connection.QueryTypes.INSERT,
//             replacements: {
//                 date: date,
//                 food: food,
//                 water: water,
//                 animalId: animalId,
//                 sin: sin
//             }
//         })
//         .then(result => {
//             // result[1] is the number of rows changed
//             res.send('SUCCESS')
//         })
// })



export default router