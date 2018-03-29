import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')
const router = Router()

/* GET pens listing. */
router.get('/pens', function (req, res, next) {
    const query = 'SELECT * FROM Penhouse;'
    connection.query(query, { type: connection.QueryTypes.SELECT })
        .then(pens => {
            console.log(pens)
            res.json(pens)
        })
})


export default router