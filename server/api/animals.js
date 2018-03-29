import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

/* GET animals listing. */
router.get('/animals', function (req, res, next) {
    const query = 'SELECT * FROM Animal;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

/* GET animals listing with pen and farmer */
router.get('/animals/pen-farmer-list', function (req, res, next) {
    const query = `SELECT a.id, a.age, a.weight, a.name, a.species, p.location, f.firstname, f.lastname
        FROM Animal a
        JOIN Penhouse p ON p.PenNumber = a.PenNumber
        JOIN Farmer f ON f.SIN = a.SIN;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.put('/animals/update/:id', bodyParser.json(), function (req, res, next) {
    const id = req.params.id
    const age = req.body.age
    const weight = req.body.weight
    const name = req.body.name
    const sin = req.body.sin
    const pennumber = req.body.pennumber
    
    const query = `UPDATE Animal SET age = ${age}, weight = ${weight}, name = '${name}', sin = ${sin}, pennumber = ${pennumber} WHERE id = ${id};`
    connection.query(query, { type: connection.QueryTypes.UPDATE })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.get('/animals/feed', function (req, res, next) {
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

router.get('/animals/harvest/chicken', function (req, res, next) {
    const query = `SELECT DISTINCT ON(a.id) a.id, a.age, a.weight, a.name, a.sin, a.species, a.pennumber, g.quantity, g.size,
        CASE WHEN m.ProductionDate IS NULL
            THEN false
            ELSE TRUE
        END AS hasHarvested
        FROM Animal a
        LEFT JOIN (
            SELECT * FROM Product p WHERE ProductionDate = (NOW() AT TIME ZONE 'US/Pacific')::DATE
        ) AS m
        ON a.id = m.AnimalId
        LEFT JOIN (
            SELECT * FROM Egg
        ) AS g
        ON m.ProductId = g.ProductId 
        WHERE a.species = 'CHICKEN'`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.get('/animals/harvest/cow', function (req, res, next) {
    const query = `SELECT DISTINCT ON(a.id) a.id, a.age, a.weight, a.name, a.sin, a.species, a.pennumber, g.volume, g.grade,
        CASE WHEN m.ProductionDate IS NULL
            THEN false
            ELSE TRUE
        END AS hasHarvested
        FROM Animal a
        LEFT JOIN (
            SELECT * FROM Product p WHERE ProductionDate = (NOW() AT TIME ZONE 'US/Pacific')::DATE
        ) AS m
        ON a.id = m.AnimalId
        LEFT JOIN (
            SELECT * FROM Milk
        ) AS g
        ON m.ProductId = g.ProductId 
        WHERE a.species = 'COW'`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.get('/animals/harvest/sheep', function (req, res, next) {
    const query = `SELECT DISTINCT ON(a.id) a.id, a.age, a.weight, a.name, a.sin, a.species, a.pennumber, g.weight, g.grade,
        CASE WHEN m.ProductionDate IS NULL
            THEN false
            ELSE TRUE
        END AS hasHarvested
        FROM Animal a
        LEFT JOIN (
            SELECT * FROM Product p WHERE ProductionDate = (NOW() AT TIME ZONE 'US/Pacific')::DATE
        ) AS m
        ON a.id = m.AnimalId
        LEFT JOIN (
            SELECT * FROM Wool
        ) AS g
        ON m.ProductId = g.ProductId 
        WHERE a.species = 'SHEEP'`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.post('/animals/harvest/chicken', bodyParser.json(), function (req, res, next) {
    const quantity = req.body.data.quantity
    const size = req.body.data.size
    const animalId = req.body.data.animalId
    const sin = req.body.data.sin

    const query = 'INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval(\'ProductId_seq\'), (NOW() AT TIME ZONE \'US/Pacific\')::DATE, :animalId, :sin);'
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                animalId: animalId,
                sin: sin
            }
        })
        .then(result => {
            const query2 = 'INSERT INTO Egg (ProductId, Quantity, Size) VALUES (currval(\'ProductId_seq\'), :quantity, :size);'
            connection.query(query2,
                {
                    type: connection.QueryTypes.INSERT,
                    replacements: {
                        quantity: quantity,
                        size: size
                    }
                })
                .then(result => {
                    res.send('SUCCESS')
                })
        })
})

router.post('/animals/harvest/cow', bodyParser.json(), function (req, res, next) {
    const volume = req.body.data.volume
    const grade = req.body.data.grade
    const animalId = req.body.data.animalId
    const sin = req.body.data.sin

    const query = 'INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval(\'ProductId_seq\'), (NOW() AT TIME ZONE \'US/Pacific\')::DATE, :animalId, :sin);'
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                animalId: animalId,
                sin: sin
            }
        })
        .then(result => {
            const query2 = 'INSERT INTO Milk (ProductId, Volume, Grade) VALUES (currval(\'ProductId_seq\'), :volume, :grade);'
            connection.query(query2,
                {
                    type: connection.QueryTypes.INSERT,
                    replacements: {
                        volume: volume,
                        grade: grade
                    }
                })
                .then(result => {
                    res.send('SUCCESS')
                })
        })
})

router.post('/animals/harvest/sheep', bodyParser.json(), function (req, res, next) {
    const volume = req.body.data.weight
    const grade = req.body.data.grade
    const animalId = req.body.data.animalId
    const sin = req.body.data.sin

    const query = 'INSERT INTO Product (ProductId, ProductionDate, AnimalId, SIN) VALUES (nextval(\'ProductId_seq\'), (NOW() AT TIME ZONE \'US/Pacific\')::DATE, :animalId, :sin);'
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                animalId: animalId,
                sin: sin
            }
        })
        .then(result => {
            const query2 = 'INSERT INTO Wool (ProductId, Weight, Grade) VALUES (currval(\'ProductId_seq\'), :weight, :grade);'
            connection.query(query2,
                {
                    type: connection.QueryTypes.INSERT,
                    replacements: {
                        volume: volume,
                        grade: grade
                    }
                })
                .then(result => {
                    res.send('SUCCESS')
                })
        })
})

export default router