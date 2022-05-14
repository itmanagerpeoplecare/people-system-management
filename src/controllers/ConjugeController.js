const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const checkout = require('../../public/js/checkFunction')

module.exports = {
    async create(req, res){
        const {nome, cpf, rg, nis, escolaridade, idade, modeloDeTrabalho, cnpjCtps, renda, nomeTitular} = req.body

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
        const nisChecked = checkout.checkNIS(nis)
        
        const dados = await prisma.conjuge.upsert({
            where:{
                cpf:cpfChecked
            },
            update:{
                nome,
                cpf:cpfChecked,
                rg:rgChecked,
                nis:nisChecked,
                escolaridade,
                idade:parseInt(idade),
                modeloDeTrabalho,
                cnpjCtps: parseInt(cnpjCtps),
                renda: parseInt(renda),
                nomeTitular
            },
            create:{
                nome,
                cpf:cpfChecked,
                rg:rgChecked,
                nis:nisChecked,
                escolaridade,
                idade:parseInt(idade),
                modeloDeTrabalho,
                cnpjCtps: parseInt(cnpjCtps),
                renda: parseInt(renda),
                nomeTitular
            }
        })

        if(!dados){
            return res.render("errorPage.html")
        } else {
            return res.render("show-new-conjuge.html", {dados})
        }
    },
    async read(req, res){
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
            const conjuge = await prisma.conjuge.findMany()

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.send(conjuge)
        } else if (dado == "nome") {
            const dados = await prisma.conjuge.findFirst({
                where: {
                    nome: value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-conjuge.html", {dados})
        } else if (dado == "rg"){
            const dados = await prisma.conjuge.findFirst({
                where: {
                    rg: rgChecked
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-conjuge.html", {dados})
        } else if(dado == "nis"){
            const dados = await prisma.conjuge.findFirst({
                where: {
                    nis: nisChecked
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-conjuge.html", {dados})
        } else if(dado == "cpf"){
            const dados = await prisma.conjuge.findFirst({
                where: {
                    cpf:cpfChecked 
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-conjuge.html", {dados}) 
        } else if (dado == "nomeTitular"){
            const dados = await prisma.conjuge.findFirst({
                where: {
                    nomeTitular: value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-conjuge.html", { dados }) 
        }
    },
    async update(req, res) {
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

        if (existRole.updaet != true) {
            return res.send("You cant update users")
        } 
        if (dado == "nome") {
            const dados = await prisma.conjuge.update({
                where: { nome }, data: { nome: value }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        } else if (dado == "rg") {
            const dados = await prisma.conjuge.update({
                where: {
                    nome
                },
                data: { rg: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        } else if (dado == "nis") {
            const dados = await prisma.conjuge.update({
                where: {
                    nome
                },
                data: { nis: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        } else if (dado == "cnpjCtps") {
            const dados = await prisma.conjuge.update({
                where: {
                    nome
                },
                data: {
                    cnpjCtps: parseInt(value)
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        } else if (dado == "cpf") {
            const dados = await prisma.conjuge.update({
                where: {
                    nome
                },
                data: { cpf: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        } else if (dado == "idade") {
            const dados = await prisma.conjuge.update({
                where: {
                    nome
                },
                data: { idade: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        } else if (dado == "renda") {
            const dados = await prisma.conjuge.update({
                where: {
                    nome
                },
                data: { renda: parseInt(value) }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        } else if (dado == "nomeTitular"){
            const dados = await prisma.conjuge.update({
                where:{nome}, data:{nomeTitular:value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        } else if (dado == "escolaridade"){
            const dados = await prisma.conjuge.update({
                where: { nome }, data: { escolaridade: value }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("show-new-conjuge.html", { dados })
        }
    },
    async delete(req, res){
        const {nome} =req.body
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
        const conjuge = await prisma.conjuge.delete({
            where:{
                nome
            }
        })

        if (!conjuge) {
            const resultado = conjuge.nome + ", não foi deletado!"
            return res.render("delete.html", { resultado })
        } else {
            const resultado = conjuge.nome + ", foi deletado!"
            return res.render("delete.html", { resultado })
        }
    }
}