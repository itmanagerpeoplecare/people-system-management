const router = require("express").Router()
const usuario = require("../controllers/UserController")
const auth = require("../middleware/auth")

//Pages
const create_page = "/usuario/create-page"
const read_page = "/usuario/read-page"
const update_page = "/usuario/update-page"
const delete_page = "/usuario/delete-page"


//Usuarios
router.get("/", (req, res) => {
    return res.render("menu-acoes.html", {create_page, read_page, delete_page, update_page})
})

router.get("/create-page", (req, res) => {
    return res.render("create-page-usuario.html")
})

router.get("/read-page", (req, res)=>{
    return res.render("read-page-usuario.html")
})

router.get("/delete-page", (req, res) => {
    return res.render("delete.html", { delt })
})

router.get("/update-page", (req, res) => {
    return res.render("update-page-usuario.html")
})

/*router.post("/create-usuario", auth, usuario.create)
router.post("/read-usuario", auth, usuario.read)

router.post("/delete-usuario", auth, usuario.delete )*/

router.post("/create-usuario", auth, usuario.create)
router.post("/read-usuario", auth, usuario.read)
router.post("/update-usuario", auth, usuario.update)
router.post("/login-user", usuario.login)
module.exports = router