const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient

const checkout = require('../../public/js/checkFunction')

module.exports = {
    async create(req, res){ 
        const { nome, cpf, rg, idade, modeloDeTrabalho, renda, nomeTitular } = req.body
        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }

        if (existUser.user_roles == 0) {
            return res.send("You cant create users")
        }

        const role = existUser.user_roles[0].role_name
        const existRole = await prisma.role.findFirst({
            where: {
                name: role
            }
        })

        if (existRole.create != true) {
            return res.send("You cant create users")
        } 
        const cpfChecked = checkout.checkCPF(cpf)
        const rgChecked = checkout.checkRG(rg)
        const dados = await prisma.residente.upsert({
            where: {
                cpf: cpfChecked
            },
            update: {
                nome,
                cpf: cpfChecked,
                rg: rgChecked,
                idade: parseInt(idade),
                modeloDeTrabalho,
                renda: parseInt(renda),
                nomeTitular
            },
            create:{
                nome,
                cpf: cpfChecked,
                rg: rgChecked,
                idade: parseInt(idade),
                modeloDeTrabalho,
                renda: parseInt(renda),
                nomeTitular
            }
        })
        if (!dados) {
            return res.render("errorPage.html")
        } else {
            return res.render("showNewResidente.html", { dados })
        }
    },
    async read(req, res) {
        const { dado, value } = req.body
        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }

        if (existUser.user_roles == 0) {
            return res.send("You cant read users")
        }

        const role = existUser.user_roles[0].role_name
        const existRole = await prisma.role.findFirst({
            where: {
                name: role
            }
        })

        if (existRole.read != true) {
            return res.send("You cant read users")
        } 
        const cpfChecked = checkout.checkCPF(value)
        const rgChecked = checkout.checkRG(value)
        const nisChecked = checkout.checkNIS(value)

        
        if (dado == "todos") {
            const residente = await prisma.residente.findMany()

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.send(residente)
        } else if (dado == "nome") {
            const dados = await prisma.residente.findFirst({
                where: {
                    nome: value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-residente.html", { dados })
        } else if (dado == "rg") {
            const dados = await prisma.residente.findFirst({
                where: {
                    rg: rgChecked
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-residente.html", { dados })
        } else if (dado == "nis") {
            const dados = await prisma.residente.findFirst({
                where: {
                    nis: nisChecked
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-residente.html", { dados })
        } else if (dado == "cpf") {
            const dados = await prisma.residente.findFirst({
                where: {
                    cpf: cpfChecked
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-residente.html", { dados })
        } else if (dado == "nomeTitular") {
            const dados = await prisma.residente.findFirst({
                where: {
                    nomeTitular: value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-residente.html", { dados })
        }
    },
    async update(req, res){
        const { dado, value, nome } = req.body
        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }

        if (existUser.user_roles == 0) {
            return res.send("You cant update users")
        }

        const role = existUser.user_roles[0].role_name
        const existRole = await prisma.role.findFirst({
            where: {
                name: role
            }
        })

        if (existRole.update != true) {
            return res.send("You cant update users")
        } 
        if (dado == "nome") {
            const dados = await prisma.residente.update({
                where: { nome }, data: { nome: value }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-residente.html", { dados })
        } else if (dado == "rg") {
            const dados = await prisma.residente.update({
                where: {
                    nome
                },
                data: { rg: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-residente.html", { dados })
        }  else if (dado == "cpf") {
            const dados = await prisma.residente.update({
                where: {
                    nome
                },
                data: { cpf: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-residente.html", { dados })
        } else if (dado == "idade") {
            const dados = await prisma.residente.update({
                where: {
                    nome
                },
                data: { idade: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-residente.html", { dados })
        } else if (dado == "renda") {
            const dados = await prisma.residente.update({
                where: {
                    nome
                },
                data: { renda: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-residente.html", { dados })
        } else if (dado == "cnpjCtps") {
            const dados = await prisma.residente.update({
                where: {
                    nome
                },
                data: { cnpjCtps: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-residente.html", { dados })
        } else if (dado == "nomeTitular"){
            const dados = await prisma.residente.update({
                where: {
                    nome
                },
                nomeTitular: { nomeTitular: value }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-residente.html", { dados })
        }
    },
    async delete(req, res) {
        const { nome } = req.body

        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }

        if (existUser.user_roles == 0) {
            return res.send("You cant delete users")
        }

        const role = existUser.user_roles[0].role_name
        const existRole = await prisma.role.findFirst({
            where: {
                name: role
            }
        })

        if (existRole.delt != true) {
            return res.send("You cant delete users")
        } 

        const residente = await prisma.residente.delete({
            where: {
                nome
            }
        })

        if (!residente) {
            const resultado = residente.nome + " não foi deletado!"
            return res.render("delete.html", { resultado })
        } else {
            const resultado = residente.nome + " foi deletado!"
            return res.render("delete.html", { resultado })
        }
    }
}