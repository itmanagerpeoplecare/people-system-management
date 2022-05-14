const router = require("express").Router()
const perfil = require("../controllers/RoleController")
const auth = require("../middleware/auth")
const {voltar} = require("../controllers/UserController")
//Pages
const create_page = "/perfil/create-page"
const read_page = "/perfil/read-page"
const update_page = "/perfil/update-page"
const delete_page = "/perfil/delete-page"

const index_page = "/perfil/index"
const back_page = "/perfil/"
const delt = "/perfil/delete-perfil"
//Titulares
router.get("/", (req, res) => {
    return res.render("menu-acoes.html", { create_page, read_page, delete_page, update_page, index_page })
})

router.get("/create-page", (req, res) => {
    return res.render("create-page-perfil.html")
})

router.get("/read-page", (req, res) => {
    return res.render("read-page-perfil.html")
})

router.get("/delete-page", (req, res) => {
    return res.render("delete.html", { delt, back_page })
})

router.get("/update-page", (req, res) => {
    return res.render("update-page-perfil.html")
})

router.get("/index", auth, voltar)

router.post("/create-perfil", auth, perfil.create)
router.post("/read-perfil", auth, perfil.read)
router.post("/update-perfil", auth, perfil.update)
router.post("/delete-perfil", auth, perfil.delete)
module.exports = router