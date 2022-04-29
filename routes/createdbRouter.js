const express = require('express')
const router = express.Router()

const db = require('../model/db')

router.post('/', async(req, res) => {
    const result = await db.sync()
    console.log(result)
})

module.exports = router