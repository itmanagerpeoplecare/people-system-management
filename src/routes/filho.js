const router = require("express").Router()
const filho = require("../controllers/FilhoController")
const auth = require("../middleware/auth")

//Pages
const create_page = "/filho/create-page"
const read_page = "/filho/read-page"
const update_page = "/filho/update-page"
const delete_page = "/filho/delete-page"

const delt = "/filho/delete-filho"

//Filhos
router.get("/", (req, res) => {
    return res.render("menu-acoes.html", { create_page, read_page, delete_page, update_page })
})

router.get("/create-page", (req, res) => {
    return res.render("create-page-filho.html")
})

router.get("/read-page", (req, res) => {
    return res.render("read-page-filho.html")
})

router.get("/delete-page", (req, res) => {
    return res.render("delete.html", { delt })
})

router.get("/update-page", (req, res) => {
    return res.render("update-page-filho.html")
})

router.post("/create-filho", auth, filho.create)
router.post("/read-filho", auth, filho.read)
router.post("/update-filho", auth, filho.update)
router.post("/delete-filho", auth, filho.delete)
module.exports = router