const express = require('express')
const router = express.Router()

const controllerPortaria = require('../controllers/portariaController')

router.get('/', controllerPortaria.get)
router.post('/', controllerPortaria.post)

module.exports = router