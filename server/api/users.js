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
        }).catch((err) => {
            res.json(400, {error: 'Error querying users.'})
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
    }).catch((err) => {
      res.json(400, {error: 'Error querying users.'})
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
    }).catch((err) => {
      res.json(400, {error: 'Error updating user.'})
    })
})

router.post('/users/addfarmer', bodyParser.json(), function (req, res, next) {
    const username = req.body.data.username
    const password = req.body.data.password
    const sin = req.body.data.sin

    const query = 'INSERT INTO Users (username, password, sin) VALUES (:username, :password, :sin) ;'
    connection.query(query,
        {
            type: connection.QueryTypes.INSERT,
            replacements: {
                username: username,
                password: password,
                sin: sin
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send(result)
        }).catch((err) => {
            res.json(400, {error: 'Error inserting user.'})
        })
})

router.post('/users/add', bodyParser.json(), function (req, res, next) {
    console.log(req)
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
            res.send(result)
        }).catch((err) => {
            res.json(400, {error: 'Error inserting user.'})
        })
})

router.post('/login', bodyParser.json(), function (req, res, next) {
    const username = req.body.data.username
    const password = req.body.data.password

    const query = 'SELECT * FROM Users WHERE username = :username AND password = :password;'
    connection.query(query,
        {
            type: connection.QueryTypes.SELECT,
            replacements: {
                username: username,
                password: password
            }
        })
        .then(result => {
            // result[1] is the number of rows changed
            res.send(result)
        }).catch((err) => {
            res.json(400, {error: 'Error querying users.'})
        })
})

export default router
