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
    const query = `SELECT a.id, a.age, a.weight, a.name, a.species, a.pennumber, a.sin, p.location, f.firstname, f.lastname
        FROM Animal a
        JOIN Penhouse p ON p.PenNumber = a.PenNumber
        JOIN Farmer f ON f.SIN = a.SIN;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.get('/animals/pen-farmer-list/choose', function (req, res, next) {
    const age = req.query.age
    const weight = req.query.weight
    const name = req.query.name
    const animal = req.query.animal
    var cond = '';
    if (age) {
        cond = cond + 'a.age, '
    }
    if (name) {
        cond = cond + 'a.name, '
    }
    if (weight) {
        cond = cond + 'a.weight, '
    }
    const query = `SELECT a.id, ${cond}a.species, p.location, f.firstname, f.lastname
        FROM Animal a
        JOIN Penhouse p ON p.PenNumber = a.PenNumber
        JOIN Farmer f ON f.SIN = a.SIN
        WHERE a.species = '${animal}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

/* PUT animal update */
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

/* delete animal */
router.delete('/animals/delete/:id', function (req, res, next) {
    const id = req.params.id
    
    const query = `DELETE FROM Animal WHERE Id = ${id};`
    connection.query(query, { type: connection.QueryTypes.DELETE })
        .then((err, animals) => {
            if(err){
                console.log(err)
                res.json(err)
            }else{
                console.log(animals)
                res.json(animals)
            }
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
    const query = `SELECT DISTINCT ON(a.id) a.id, a.age, a.weight, a.name, a.sin, a.species, a.pennumber, m.quantity, m.size,
        CASE WHEN m.quantity IS NULL AND m.size IS NULL
            THEN false
            ELSE TRUE
        END AS hasHarvested
        FROM Animal a
        LEFT JOIN (
            SELECT * FROM Product p
            INNER JOIN (
                SELECT * FROM Egg
            ) AS g
            ON p.ProductId = g.ProductId 
            WHERE ProductionDate = (NOW() AT TIME ZONE 'US/Pacific')::DATE
        ) AS m
        ON a.id = m.AnimalId
        WHERE a.species = 'CHICKEN'`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.get('/animals/harvest/cow', function (req, res, next) {
    const query = `SELECT DISTINCT ON(a.id) a.id, a.age, a.weight, a.name, a.sin, a.species, a.pennumber, m.volume, m.grade,
        CASE WHEN m.volume IS NULL AND m.grade IS NULL
            THEN false
            ELSE TRUE
        END AS hasHarvested
        FROM Animal a
        LEFT JOIN (
            SELECT * FROM Product p
            INNER JOIN (
                SELECT * FROM Milk
            ) AS g
            ON p.ProductId = g.ProductId 
            WHERE ProductionDate = (NOW() AT TIME ZONE 'US/Pacific')::DATE
        ) AS m
        ON a.id = m.AnimalId
        WHERE a.species = 'COW'`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.get('/animals/harvest/sheep', function (req, res, next) {
    const query = `SELECT DISTINCT ON(a.id) a.id, a.age, a.weight, a.name, a.sin, a.species, a.pennumber, m.weight, m.grade,
        CASE WHEN m.weight IS NULL AND m.grade IS NULL
            THEN false
            ELSE TRUE
        END AS hasHarvested
        FROM Animal a
        LEFT JOIN (
            SELECT * FROM Product p
            INNER JOIN (
                SELECT * FROM Wool
            ) AS g
            ON p.ProductId = g.ProductId 
            WHERE ProductionDate = (NOW() AT TIME ZONE 'US/Pacific')::DATE
        ) AS m
        ON a.id = m.AnimalId
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
    const weight = req.body.data.weight
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
                        weight: weight,
                        grade: grade
                    }
                })
                .then(result => {
                    res.send('SUCCESS')
                })
        })
})

export default router