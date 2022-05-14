const express = require('express')
const router = express.Router()

const auth = require("../middleware/auth")

router.get("/", (req, res)=>{
    return res.render("login.html")
})

module.exports = router