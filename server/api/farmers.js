import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

router.get('/farmers/all', function (req, res, next){
    const query = 'SELECT * FROM Farmer;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(farmers => {
            console.log(farmers)
            res.json(farmers)
        })
})

//fetches all farmers who don't have an account yet
router.get('/farmers/nouser', function(req, res, next){
    const query = `SELECT f.sin, f.firstname, f.lastname
                        FROM Farmer f
                        LEFT JOIN Users u ON u.sin = f.sin
                        WHERE u.sin IS NULL;`
    connection.query(query, {type: connection.QueryTypes.SELECT })
        .then(farmers => {
            console.log(farmers)
            res.json(farmers)
        })
})

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

router.post('/farmers/workers', bodyParser.json(), function (req, res, next) {
    const sin = req.body.data.sin
    const firstname = req.body.data.firstname
    const lastname = req.body.data.lastname
    const manager_sin = req.body.data.manager_sin

    const query = 'INSERT INTO Farmer (firstname, lastname, sin) VALUES (:firstname, :lastname, :sin);'
    const query2 = 'INSERT INTO Worker (sin, manager_sin) VALUES (:sin, :manager_sin);'

    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                sin: sin,
                firstname: firstname,
                lastname: lastname
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            connection.query(query2,
                {
                    type: connection.QueryTypes.INSERT,
                    replacements: {
                        sin: sin,
                        manager_sin: manager_sin
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

router.post('/farmers/managers', bodyParser.json(), function (req, res, next) {
    const sin = req.body.data.sin
    const firstname = req.body.data.firstname
    const lastname = req.body.data.lastname

    const query = 'INSERT INTO Farmer (firstname, lastname, sin) VALUES (:firstname, :lastname, :sin);'
    const query2 = 'INSERT INTO Manager (sin) VALUES (:sin);'

    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                sin: sin,
                firstname: firstname,
                lastname: lastname
            }
        })
        .then(result => {
            connection.query(query2,
                {
                    type: connection.QueryTypes.INSERT,
                    replacements: {
                        sin: sin
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

router.put('/farmers/workers/:sin', bodyParser.json(), function (req, res, next) {
    const sin = req.params.sin
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

router.put('/farmers/managers/:sin', bodyParser.json(), function (req, res, next) {
    const sin = req.params.sin
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

router.delete('/farmers/:sin', bodyParser.json(), function (req, res, next) {
    const sin = req.params.sin

    const query = 'DELETE FROM Farmer WHERE sin = :sin;'

    connection.query(query,
        {
            type: connection.QueryTypes.DELETE,
            replacements: {
                sin: sin
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

export default router