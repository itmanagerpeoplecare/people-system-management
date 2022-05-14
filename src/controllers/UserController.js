const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

module.exports = {
    async create(req, res){
        const {name, email, password} = req.body
        
        const hashedPass = await bcrypt.hash(password, 12)

        const existUser = await prisma.user.findFirst({where:{name}})
        if(existUser){
            return res.send("This user alredy exists")
        }

        const user = await prisma.user.create({
            data:{
                name,
                email, 
                password:hashedPass
            }
        })

        if (!user) {
            return res.render("create-page-usuario.html")
        } else {
            //return res.send(user)
            return res.render("show-new-usuario.html", { user })
        }
    },
    async login(req, res){
        const { email, password } = req.body

        const existUser = await prisma.user.findFirst({ where: { email }, include: { user_roles: true } })
        if (!existUser) { return res.send("This user does not exist") }

        const validPass = await bcrypt.compare(password, existUser.password)
        if (!validPass) { return res.send("Your crendentials are wrong") }

        const token = jwt.sign(existUser, process.env.ACCESS_SECRET_KEY, { expiresIn: '5d' })

        delete existUser.password
        const oneWeek = (1000 * 60 * 60 * 24) * 7
        const cookie = res.cookie('token', token, {
            maxAge: oneWeek,
            secure: true,
            httpOnly: true,
        })
        const role = existUser.user_roles[0].role_name
        if (cookie) {
            //return res.send(token)
            return res.render("index.html", {role})
        } else {
            //return res.send("erro")
            return res.redirect('/')
        }
    },
    async delete(req, res){
        const userName = req.userInfo.name
        const {name} = req.body
        //const user = await prisma.user.delete({where:{name}})

        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }
        const role = existUser.user_roles[0].role_name

        const existRole = await prisma.role.findFirst({
            where: {
                name: role
            }
        })

        if (existRole.delt != true) {
            return res.send("You cant delete users")
        } 
        const usuario = await prisma.user.delete({
            where:{
                nome
            }
        })

        BigInt.prototype.toJSON = function () {
            return this.toString()
        }

        if(!usuario){
            const resultado = usuario.nome + " não foi deletado!"
            return res.render("delete.html", {resultado})
        } else {
            const resultado = usuario.nome + " foi deletado!"
            return res.render("delete.html", { resultado })
        }
    },
    async read(req, res){
        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }
        const role = existUser.user_roles[0].role_name

        const existRole = await prisma.role.findFirst({
            where: {
                name: role
            }
        })

        if (existRole.read != true) {
            return res.send("You cant read users")
        } 
        const { dado, value } = req.body

        if(dado == "name"){
            const dados = await prisma.user.findFirst({
                where: {
                    name: value
                },
                include:{
                    user_roles:{
                        select:{role_name:true}
                    }
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-usuario.html", {dados})
        } else if (dado == "email"){
            const dados = await prisma.user.findFirst({
                where: {
                    email: value
                },include:{
                    user_roles:{
                        select:{role_name:true}
                    }
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-usuario.html", {dados})
        }
    },
    async update(req, res){
        const {dado, value, name} = req.body
        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }
        const roles = existUser.user_roles[0].role_name
        
        if(roles.update == false){
            return res.send("You do not have permission to do that")
        }

        if (dado == "nome") {
            const user = await prisma.user.update({
                where:{name}, data:{ nome: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-usuario.html", {user})
        } else if (dado == "email"){
            const user = await prisma.user.update({
                where: {
                    name
                },
                data:{ email: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-usuario.html", {user})
        } else if (dado == "role"){
            const userAlredyAssigned = await prisma.user.findFirst({
                where:{
                    name
                }, include: { user_roles: true }
            })
    
            if(userAlredyAssigned.user_roles[0].role_name == value){
                return res.send("User alredy has those permissions")
            } else {
                const user = await prisma.user.update({
                    where: {
                        name: name
                    },
                    data: {
                        user_roles: {
                            create: {
                                role_name: value
                            }
                        }
                    }
                })
    
                return res.render("show-new-usuario.html", {user})
            }
        }
    },
    async deniedRoleUser(req, res){
        const { userName, role } = req.body
        const name = req.userInfo.name

        const existUser = await prisma.user.findFirst({ where: { name }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }
        const roles = existUser.user_roles

        if (roles.update == false) {
            return res.send("You do not have permission to do that")
        }

       const userHasPermission = await prisma.user.findFirst({where:{name:userName}, include:{
           user_roles:true
       }})

       if(!userHasPermission){
           return res.send("User does not exist")
       }

       const userRole = userHasPermission.user_roles
       if(userRole[0].role_name != role){
        return res.send("User does not have this role")
       } else{
           const deletedRoleOnUser = await prisma.user_roles.delete({
                where:{
                    user_name_role_name:{
                        role_name:role,
                        user_name:userName
                    }
                }
           })
           return res.send(deletedRoleOnUser)
       }
       
       
    },
    async addNewPeople(req, res){
        //Verifica se o usuário pode

        const userName = req.cookies.token.name
        const {name, email, password} = req.body
        const validPass = await bcrypt.hash(password, 12)
        const existUser = await prisma.user.findFirst({ where: { name:userName }, include: { user_roles: true } })
        if(!existUser){ return res.send("That occours an error") }

        return res.send(existUser)
        /*const roles = existUser.user_roles

        if(roles.create == false){
            return res.send("You cannot create users")
        }

        const newuser = await prisma.user.create({
            data:{
                name,
                email, 
                password:validPass
            }
        })

        if(!newuser){
            return res.send("User cannot be created")
        }

        return res.send(newuser)*/
    },
    async voltar(req, res){
        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }

        const email = existUser.email
        if (!email) { return res.send("Your crendentials are wrong") }

        const role = existUser.user_roles[0].role_name
        if (role) {
            //return res.send(token)
            return res.render("index.html", {role})
        } else {
            //return res.send("erro")
            return res.redirect('/')
        }
    }
}