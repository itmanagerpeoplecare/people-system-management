const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient

module.exports = {
    async create(req, res) {
        const { name, description, create, read, update, delt } = req.body

        const existRole = await prisma.role.findFirst({
            where: {
                name
            }
        })

        const createValue = (create === 'true')
        const readValue = (read === 'true')
        const updateValue = (update === 'true')
        const deltValue = (delt === 'true')

        if (existRole) {
            return res.send("this role alredy exists")
        }
        const role = await prisma.role.create({
            data: {
                name,
                description,
                create:createValue,
                read:readValue,
                update:updateValue,
                delt:deltValue
            }
        })

        if(!role){
            return res.render("create-page-role.html")
        } else {
            return res.render("show-new-role.html", {role})
        }
    },
    async read(req, res) {
        const { dado, value} = req.body

        if(dado == "name"){
            const role = await prisma.role.findFirst({
                where:{
                    name:value
                }
            })
            if(!role){
                return res.render("read-page-perfil.html")
            } else {
                return res.render("read-page-perfil.html", {role})
            }
        } else if(dado == "description"){
            const role = await prisma.role.findFirst({
                where:{
                    name:value
                }
            })
            if(!role){
                return res.render("read-page-perfil.html")
            } else {
                return res.render("read-page-perfil.html", {role})
            }
        }
    },
    async delete(req, res) {
        //Verificar role do usuário
        const { nome } = req.body
        const name = req.userInfo.name

        const user = await prisma.user.findFirst({ where: { name } })

        if (!user) { return res.send("Something was wrong") }

        const deleteRole = await prisma.role.delete({ where: { name: nome } })

        BigInt.prototype.toJSON = function () {
            return this.toString()
        }

        if(!deleteRole){
            const resultado = deleteRole.name + " não foi deletado!"
            return res.render("delete.html", {resultado})
        } else {
            const resultado = deleteRole.name + " foi deletado!"
            return res.render("delete.html", { resultado })
        }
    },
    async update(req, res){
        const {dado, value, nome} = req.body
        if (dado == "name") {
            const role = await prisma.role.update({
                where:{name:nome}, data:{ name: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-role.html", {role})
        } else if (dado == "description"){
            const role = await prisma.role.update({
                where:{name:nome}, data:{ description: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-role.html", {role})
        } else if (dado == "description"){
            const role = await prisma.role.update({
                where:{name:nome}, data:{ description: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-role.html", {role})
        } else if (dado == "create"){
            const role = await prisma.role.update({
                where:{name:nome}, data:{ create: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-role.html", {role})
        }
        else if (dado == "create"){
            const role = await prisma.role.update({
                where:{name:nome}, data:{ create: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-role.html", {role})
        }
        else if (dado == "read"){
            const role = await prisma.role.update({
                where:{name:nome}, data:{ read: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-role.html", {role})
        }
        else if (dado == "update"){
            const role = await prisma.role.update({
                where:{name:nome}, data:{ update: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-role.html", {role})
        }
        else if (dado == "delt"){
            const role = await prisma.role.update({
                where:{name:nome}, data:{ delt: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-role.html", {role})
        }

    }
}