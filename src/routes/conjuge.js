const router = require("express").Router()
const conjuge = require("../controllers/ConjugeController")
const auth = require("../middleware/auth")

//Pages
const create_page = "/conjuge/create-page"
const read_page = "/conjuge/read-page"
const update_page = "/conjuge/update-page"
const delete_page = "/conjuge/delete-page"

const back_page = "/conjuge/"
const delt = "/conjuge/delete-conjuge"
//Titulares
router.get("/", (req, res) => {
    return res.render("menu-acoes.html", { create_page, read_page, delete_page, update_page })
})

router.get("/create-page", (req, res) => {
    return res.render("create-page-conjuge.html")
})

router.get("/read-page", (req, res) => {
    return res.render("read-page-conjuge.html")
})

router.get("/delete-page", (req, res) => {
    return res.render("delete.html", { delt, back_page })
})

router.get("/update-page", (req, res) => {
    return res.render("update-page-conjuge.html")
})

router.post("/create-conjuge", auth, conjuge.create)
router.post("/read-conjuge", auth, conjuge.read)
router.post("/update-conjuge", auth, conjuge.update)
router.post("/delete-conjuge", auth, conjuge.delete)
module.exports = router