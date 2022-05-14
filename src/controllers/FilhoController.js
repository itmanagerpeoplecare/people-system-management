const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const checkout = require('../../public/js/checkFunction')

module.exports = {
    //CRUD
    async create(req, res) {
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
        const { nome, cpf, rg, escolaridade, cursando, pcd, doencas, idade, modeloDeTrabalho, cnpjCtps, renda, nomeTitular } = req.body

        const cpfChecked = checkout.checkCPF(cpf)
        const rgChecked = checkout.checkRG(rg)

        const dados = await prisma.filho.upsert({
            where:{
                cpf:cpfChecked
            },
            update:{
                nome,
                 cpf:cpfChecked,
                 rg: rgChecked,
                 escolaridade,
                 cursando,
                 pcd,
                 doencas,
                 idade: parseInt(idade),
                 modeloDeTrabalho,
                 cnpjCtps: parseInt(cnpjCtps),
                renda: parseInt(renda), 
                 nomeTitular: nomeTitular
            },
            create: {
                nome,
                cpf: cpfChecked,
                rg: rgChecked,
                escolaridade,
                cursando,
                pcd,
                doencas,
                idade: parseInt(idade),
                modeloDeTrabalho,
                cnpjCtps: parseInt(cnpjCtps),
                renda: parseInt(renda),
                nomeTitular
            }
        })

        if (!dados) {
            return res.send("Deu esse erro aqui: ", err)
        } else {
            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        }
    },
    async read(req, res) {
        const {dado, value} = req.body

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
        if(dado == "todos"){
            const filho = await prisma.filho.findMany()

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.send(filho)
        } else if(dado == "nome") {
            const dados = await prisma.filho.findFirst({
                where:{
                    nome:value
                } 
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render('read-page-filho.html', { dados })
        } else if (dado == "rg"){
            const dados = await prisma.filho.findFirst({
                where: {
                    rg:parseInt(rgChecked)
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render('read-page-filho.html', { dados })
        } else if (dado == "cpf"){
            const dados = await prisma.filho.findFirst({
                where: {
                    cpf:parseInt(cpfChecked)
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render('read-page-filho.html', { dados })
        } else if(dado == "nomeTitular"){
            const dados = await prisma.filho.findFirst({
                where: {
                    nomeTitular: value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render('read-page-filho.html', { dados })
        }
    },
    async update(req, res) {
        const { dado, nome, value} = req.body
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

        const cpfChecked = checkout.checkCPF(value)
        const rgChecked = checkout.checkRG(value)
        const nisChecked = checkout.checkNIS(value)
        if(dado == "nome"){
           const dados = await prisma.filho.update({
                where: {
                    nome: nome
                },
                data: {
                    nome:value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        } else if(dado == "cpf"){
            const dados = await prisma.filho.update({
                where: {
                    nome: nome
                },
                data: {
                    cpf:parseInt(cpfChecked)
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", { dados })
        } else if(dado == "rg"){
             const dados = await prisma.filho.update({
                where: {
                    nome
                },
                data: {
                    rg: parseInt(rgChecked)
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        } else if(dado == "escolaridade"){
            const dados = await prisma.filho.update({
                where: {
                    nome
                },
                data: {
                    escolaridade: value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        } else if(dado == "cursando"){
            const dados = await prisma.filho.update({
                where: {
                    nome
                },
                data: {
                    cursando: value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        } else if(dado == "pcd"){
            const dados = await prisma.filho.update({
                where: {
                    nome
                },
                data: {
                   pcd:value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        }else if (dado == "idade"){
            const dados = await prisma.filho.update({
                where: {
                    nome
                },
                data: {
                    idade: parseInt(value)
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        } else if(dado == "doencas"){
            const dados = await prisma.filho.update({
                where: {
                    nome
                },
                data: {
                   doencas:value
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        } else if(dado == "modeloDeTrabalho"){
            const dados = await prisma.filho.update({
                where: {
                    nome
                },
                data: {
                    modeloDeTrabalho
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
        } else if(dado == "cnpjCtps"){
            const dados = await prisma.filho.update({
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

            return res.render("show-new-filho.html", {dados})
        } else if (dado == "renda"){
            const dados = await prisma.filho.update({
                where: {
                    nome
                },
                data: {
                    renda: parseInt(value)
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }

            return res.render("show-new-filho.html", {dados})
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
        const filho = await prisma.filho.delete({
            where: {
                nome
            }
        })
        if (!filho) {
            const resultado = filho.nome + " não foi deletado!"
            return res.render("deleteTitular.html", { resultado })
        } else {
            const resultado = filho.nome + " foi deletado!"
            return res.render("deleteTitular.html", { resultado })
        }
    }
}