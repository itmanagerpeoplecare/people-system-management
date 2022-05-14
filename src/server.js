const express = require('express')
const app = express()

const router = require('./routes/routes')
const titular = require('./routes/titular')
const filho = require('./routes/filho')
const residente = require('./routes/residente')
const conjuge = require('./routes/conjuge')
const usuario = require('./routes/usuario')

const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(express.static("public"))

const nunjucks = require('nunjucks')
nunjucks.configure("./src/views", {
    express: app,
    noCache:true
})

const oneWeek = (1000 * 60 * 60 * 24) * 7
app.use(session({
    secret:"8a1f5764ec2b4572d3721c6ec986110416e0ebfd161be6821175b18ed82e777c",
    saveUninitialized: true,
    cookie: { maxAge:  oneWeek},
    resave: false 
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(cookieParser())

app.use("/titular", titular)
app.use("/filho", filho)
app.use("/conjuge", conjuge)
app.use("/residente", residente)
app.use("/usuario", usuario)

app.listen(process.env.PORT || 3000)