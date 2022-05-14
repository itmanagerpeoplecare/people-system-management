const router = require("express").Router()
const titular = require("../controllers/TitularController")
const auth = require("../middleware/auth")

//Pages
const create_page = "/titular/create-page"
const read_page = "/titular/read-page"
const update_page = "/titular/update-page"
const delete_page = "/titular/delete-page"

const back_page = "/titular/"
const delt = "/titular/delete-titular"
const table_page = "/index"

//Titulares
router.get("/", auth, (req, res) => {
    return res.render("menu-acoes.html", {create_page, read_page, delete_page, update_page, table_page})
})

router.get("/create-page", (req, res) => {
    return res.render("create-page-titular.html")
})

router.get("/read-page", (req, res)=>{
    return res.render("read-page-titular.html")
})

router.get("/delete-page", (req, res) => {
    return res.render("delete.html", { delt, back_page })
})

router.get("/update-page", (req, res) => {
    return res.render("update-page-titular.html")
})

router.post("/create-titular", auth, titular.create)
router.post("/read-titular", auth, titular.read)
router.post("/update-titular", auth, titular.update)
router.post("/delete-titular", auth, titular.delete )
module.exports = router