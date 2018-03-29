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

router.put('/farmers/workers', bodyParser.json(), function (req, res, next) {
    const sin = req.body.data.sin
    const firstname = req.body.data.firstname
    const lastname = req.body.data.lastname
    const manager_sin = req.body.data.manager_sin

    const query = 'UPDATE Worker SET manager_sin = :manager_sin WHERE sin = :sin;'
    const query2 = 'UPDATE Farmer SET firstname = :firstname, lastname = :lastname WHERE sin = :sin;'

    connection.query(query,
        {
            type: connection.QueryTypes.UPDATE,
            replacements: {
                sin: sin,
                manager_sin: manager_sin
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            connection.query(query2,
                {
                    type: connection.QueryTypes.UPDATE,
                    replacements: {
                        sin: sin,
                        firstname: firstname,
                        lastname: lastname
                    }
                })
                .then(result => {
                    res.send('SUCCESS')
                })
        })
        .catch(err => {
            console.log('Error is: ')
            console.log(err)
        })
})

router.put('/farmers/managers', bodyParser.json(), function (req, res, next) {
    const sin = req.body.data.sin
    const firstname = req.body.data.firstname
    const lastname = req.body.data.lastname

    const query = 'UPDATE Farmer SET firstname = :firstname, lastname = :lastname WHERE sin = :sin;'

    connection.query(query,
        {
            type: connection.QueryTypes.UPDATE,
            replacements: {
                sin: sin,
                firstname: firstname,
                lastname: lastname
            }
        })
        .then(result => {
            res.send('SUCCESS')
        })
        .catch(err => {
            console.log('Error is: ')
            console.log(err)
        })
})

router.get('/farmers/all', function (req, res, next){
    const query = 'SELECT * FROM Farmer;'
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