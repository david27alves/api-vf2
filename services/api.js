const axios = require("axios")
require('dotenv').config()

const api = axios.create({

    baseURL: process.env.API_URL,
    headers: {'x-api-key': process.env.API_KEY}

})

module.exports = api