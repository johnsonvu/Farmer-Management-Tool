import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

/* GET product listing. */
router.get('/products', function (req, res, next) {
    const query = 'SELECT * FROM Product;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/list', function (req, res, next) {
    const query = `SELECT p.productid, p.productiondate, p.animalid, p.sin
        FROM Product p;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/list/range', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate

    const query = `SELECT p.productid, p.productiondate, p.animalid, p.sin
        FROM Product p
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`

      connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        }, err=> {
            res.send(null);
        })
})

router.get('/products/eggs', function (req, res, next) {
    const query = `SELECT e.productid, e.quantity, e.size, p.productiondate, p.animalid, p.sin
        FROM Product p
        JOIN Egg e ON e.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/milk', function (req, res, next) {
    const query = `SELECT m.productid, m.volume, m.grade, p.productiondate, p.animalid, p.sin
        FROM Product p
        JOIN Milk m ON m.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/wool', function (req, res, next) {
    const query = `SELECT w.productid, w.weight, w.grade, p.productiondate, p.animalid, p.sin
        FROM Product p
        JOIN Wool w ON w.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/eggs/range', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT e.productid, e.quantity, e.size, p.productiondate, p.animalid, p.sin
        FROM Product p
        JOIN Egg e ON e.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/milk/range', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT m.productid, m.volume, m.grade, p.productiondate, p.animalid, p.sin
        FROM Product p
        JOIN Milk m ON m.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/wool/range', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT w.productid, w.weight, w.grade, p.productiondate, p.animalid, p.sin
        FROM Product p
        JOIN Wool w ON w.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/eggs/average', function (req, res, next) {
    const query = `SELECT AVG(e.quantity)::DECIMAL(16,2)
        FROM Product p
        JOIN Egg e ON e.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/milk/average', function (req, res, next) {
    const query = `SELECT AVG(m.volume)::DECIMAL(16,2)
        FROM Product p
        JOIN Milk m ON m.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/wool/average', function (req, res, next) {
    const query = `SELECT AVG(w.weight)::DECIMAL(16,2)
        FROM Product p
        JOIN Wool w ON w.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/eggs/count', function (req, res, next) {
    const query = `SELECT COUNT(*)
        FROM Product p
        JOIN Egg e ON e.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/milk/count', function (req, res, next) {
    const query = `SELECT COUNT(*)
        FROM Product p
        JOIN Milk m ON m.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/wool/count', function (req, res, next) {
    const query = `SELECT COUNT(*)
        FROM Product p
        JOIN Wool w ON w.productid = p.productid;`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})



router.get('/products/eggs/range/average', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT AVG(e.quantity)
        FROM Product p
        JOIN Egg e ON e.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/milk/range/average', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT AVG(m.volume)
        FROM Product p
        JOIN Milk m ON m.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/wool/range/average', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT AVG(w.weight)
        FROM Product p
        JOIN Wool w ON w.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})


router.get('/products/eggs/range/count', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT COUNT(e.quantity)
        FROM Product p
        JOIN Egg e ON e.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/milk/range/count', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT COUNT(m.volume)
        FROM Product p
        JOIN Milk m ON m.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})

router.get('/products/wool/range/count', function (req, res, next) {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    const query = `SELECT COUNT(w.weight)
        FROM Product p
        JOIN Wool w ON w.productid = p.productid
        WHERE p.productiondate >= '${fromDate}' AND p.productiondate <= '${toDate}';`
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        })
})






export default router