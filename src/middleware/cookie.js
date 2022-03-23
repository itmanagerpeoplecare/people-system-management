
const cookie = (req, res, next)=>{
    const teste = req.cookies.token

    if (teste) {
        return res.send(teste)
    }
    next()
}