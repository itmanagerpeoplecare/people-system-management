const router = require("express").Router()
const residente = require("../controllers/ResidenteController")
const auth = require("../middleware/auth")

//Pages
const create_page = "/residente/create-page"
const read_page = "/residente/read-page"
const update_page = "/residente/update-page"
const delete_page = "/residente/delete-page"

const delt = "/residente/delete-residente"

//Residentes
router.get("/", (req, res) => {
    return res.render("menu-acoes.html", { create_page, read_page, delete_page, update_page })
})

router.get("/create-page", (req, res) => {
    return res.render("create-page-residente.html")
})

router.get("/read-page", (req, res) => {
    return res.render("read-page-residente.html")
})

router.get("/delete-page", (req, res) => {
    return res.render("delete.html", { delt })
})

router.get("/update-page", (req, res) => {
    return res.render("update-page-residente.html")
})

router.post("/create-residente", auth, residente.create)
router.post("/read-residente", auth, residente.read)
router.post("/update-residente", auth, residente.update)
router.post("/delete-residente", auth, residente.delete)
module.exports = router