const express = require('express')
const router = express.Router()

const auth = require("../middleware/auth")

const user = require("../controllers/UserController")
const role = require("../controllers/RoleController")
const project = require("../controllers/ProjectsController")

//Users
router.post("/create-user", user.create)
router.post("/login-user", user.login)
router.post("/assign-new-user-role", auth, user.assignRole)

//Roles
router.post("/create-role", role.create)

//Projects
router.post("/create-project", project.create)

//Basic routes
router.get("/", (req, res)=>{
    return res.render("login.html")
})

router.get("/home", (req, res)=>{
    return res.render("index.html")
})

module.exports = router