import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')
const router = Router()

router.get('/stats/animal/performance/:option/:option2', function (req, res, next) {
    const option = req.params.option
    const option2 = req.params.option2
    const query = `WITH production_units AS (
            SELECT p.productid, p.productiondate, p.animalid, m.volume AS unit
            FROM product p
            INNER JOIN milk m
            ON p.productid = m.productid
            UNION
            SELECT p.productid, p.productiondate, p.animalid, e.quantity AS unit
            FROM product p
            INNER JOIN egg e
            ON p.productid = e.productid
            UNION
            SELECT p.productid, p.productiondate, p.animalid, w.weight AS unit
            FROM product p
            INNER JOIN wool w
            ON p.productid = w.productid
        ), production_stat AS (
            SELECT a.id, a.species, 
            ` + option2 + `(CASE WHEN ps.unit IS NULL THEN 0 ELSE ps.unit END)::DECIMAL(16,2) AS unit_stat
            FROM animal a
            LEFT JOIN production_units ps
            ON a.id = ps.animalid
            GROUP BY a.id
            ORDER BY species
        )
        SELECT species, ` + option + `(unit_stat) AS unit
        FROM production_stat 
        GROUP BY species
        ORDER BY species`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.get('/stats/animal/performance', function (req, res, next) {
    const option = req.params.option
    const query = `WITH production_units AS (
            SELECT p.productid, p.productiondate, p.animalid, m.volume AS unit
            FROM product p
            INNER JOIN milk m
            ON p.productid = m.productid
            UNION
            SELECT p.productid, p.productiondate, p.animalid, e.quantity AS unit
            FROM product p
            INNER JOIN egg e
            ON p.productid = e.productid
            UNION
            SELECT p.productid, p.productiondate, p.animalid, w.weight AS unit
            FROM product p
            INNER JOIN wool w
            ON p.productid = w.productid
        ), production_avg AS (
            SELECT a.id, a.species, 
            AVG(CASE WHEN ps.unit IS NULL THEN 0 ELSE ps.unit END)::DECIMAL(16,2) AS unit_avg
            FROM animal a
            LEFT JOIN production_units ps
            ON a.id = ps.animalid
            GROUP BY a.id
            ORDER BY species
        )
        SELECT * FROM production_avg pa JOIN animal a ON pa.id = a.id ORDER BY pa.species`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(animals => {
            console.log(animals)
            res.json(animals)
        })
})

router.get('/stats/farmer/allstars', function (req, res, next) {
    const query = `SELECT f.sin, f.firstname, f.lastname 
        FROM farmer f
        WHERE NOT EXISTS(
            SELECT aa.species 
            FROM animal aa 
            EXCEPT (
                SELECT a.species FROM animal a WHERE f.sin=a.sin
            )
        )`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(farmers => {
            console.log(farmers)
            res.json(farmers)
        })
})

export default router