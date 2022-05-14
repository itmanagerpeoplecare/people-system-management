const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const checkout = require('../../public/js/checkFunction')


module.exports={
    async create(req, res) {
        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }

        if(existUser.user_roles == 0){
            return res.send("You do not have permission to do that")
        }

        const role = existUser.user_roles[0].role_name
        
        const existRole = await prisma.role.findFirst({
            where: {
                name: role
            }
        })

        if (existRole.create != true) {
           return res.send("You do not have permission that")
        }

        const { nome, cpf, rg, nis, endereco, modeloDeTrabalho, cnpjCtps, renda, idade, situacao, cell, email, representante, estadoCivil, project } = req.body
        const cpfChecked = checkout.checkCPF(cpf)
        const rgChecked = checkout.checkRG(rg)
        const nisChecked = checkout.checkNIS(nis)
        const cellChecked = checkout.checkCel(cell)

        const dados = await prisma.titular.upsert({
            where: {
                cpf: cpfChecked
            },
            update: {
                nome,
                cpf: cpfChecked,
                rg: rgChecked,
                nis: nisChecked,
                endereco,
                modeloDeTrabalho,
                cnpjCtps: parseInt(cnpjCtps),
                renda: parseInt(renda),
                idade: parseInt(idade),
                situacao,
                cel: cellChecked,
                email,
                representante,
                estadoCivil,
                project: {
                    connect: {
                        name: project
                    }
                }
            },
            create: {
                nome,
                cpf: cpfChecked,
                rg: rgChecked,
                nis: nisChecked,
                endereco,
                modeloDeTrabalho,
                cnpjCtps: parseInt(cnpjCtps),
                renda: parseInt(renda),
                idade: parseInt(idade),
                situacao,
                cel: cellChecked,
                email,
                representante,
                estadoCivil,
                project: {
                    connect: {
                        name: project
                    }
                }
            }
        })

        BigInt.prototype.toJSON = function () {
            return this.toString()
        }

        if (!dados) {
            return res.send("Deu esse erro aqui: ", err)
        } else {
            //return res.send(dados)
            return res.render("show-new-titular.html", { dados })
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
        const cpfChecked = checkout.checkCPF(value)
        const rgChecked = checkout.checkRG(value)
        const nisChecked = checkout.checkNIS(value)
        const cellChecked = checkout.checkCel(value)
        if (dado == "todos") {
            const titular = await prisma.titular.findMany()

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.send(titular)
        } else if (dado == "nome") {
            const dados = await prisma.titular.findFirst({
                where: {
                    nome: value
                },
                include:{
                    filho:{select:{nome:true}},
                    conjuge:{select:{nome:true}},
                    residente:{select:{nome:true}}
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-titular.html", {dados})
        } else if (dado == "rg"){
            const dados = await prisma.titular.findFirst({
                where: {
                    rg:parseInt(rgChecked)
                },
                include: {
                    filho: { select: { nome: true } },
                    conjuge: { select: { nome: true } },
                    residente: { select: { nome: true } }
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-titular.html", {dados})
        } else if(dado == "nis"){
            const dados = await prisma.titular.findFirst({
                where: {
                    nis: parseInt(nisChecked)
                },
                include: {
                    filho: { select: { nome: true } },
                    conjuge: { select: { nome: true } },
                    residente: { select: { nome: true } }
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-titular.html", {dados})
        } else if(dado == "cnpjCtps"){
            const dados = await prisma.titular.findFirst({
                where: {
                    cnpjCtps: parseInt()
                },
                include: {
                    filho: { select: { nome: true } },
                    conjuge: { select: { nome: true } },
                    residente: { select: { nome: true } }
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-titular.html", {dados}) 
        } else if (dado == "cpf"){
            const dados = await prisma.titular.findFirst({
                where: {
                    cpf: parseInt(cpfChecked)
                },
                include: {
                    filho: { select: { nome: true } },
                    conjuge: { select: { nome: true } },
                    residente: { select: { nome: true } }
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("read-page-titular.html", { dados })
        }
    },
    async update(req,res){
        const userName = req.userInfo.name
        const existUser = await prisma.user.findFirst({ where: { name: userName }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }
        const role = existUser.user_roles[0].role_name

        const existRole = await prisma.role.findFirst({
            where: {
                name: role
            }
        })

        if (existRole.update != true) {
            return res.send("You cant update users")
        } 

        const { dado, value, nome } = req.body
        
        const cpfChecked = checkout.checkCPF(value)
        const rgChecked = checkout.checkRG(value)
        const nisChecked = checkout.checkNIS(value)
        if (dado == "nome") {
            const dados = await prisma.titular.update({
                where:{nome}, data:{ nome: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", {dados})
        } else if (dado == "rg"){
            const dados = await prisma.titular.update({
                where: {
                    nome
                },
                data:{ rg: parseInt(rgChecked)}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", {dados})
        } else if(dado == "nis"){
            const dados = await prisma.titular.update({
                where: {
                    nome
                },
                data:{ nis: parseInt(nisChecked)}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", {dados})
        } else if(dado == "cnpjCtps"){
            const dados = await prisma.titular.update({
                where: {
                    nome
                },
                data:{
                    cnpjCtps: parseInt(value)
                }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", {dados}) 
        } else if (dado == "cpf"){
            const dados = await prisma.titular.update({
                where: {
                    nome
                },
                data:{cpf:parseInt(cpfChecked)}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        } else if (dado == "representante"){
            const dados = await prisma.titular.update({
                where: {
                    nome
                },
                data:{representante: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        } else if (dado == "idade"){
            const dados = await prisma.titular.update({
                where: {
                   nome
                },
                data:{idade: parseInt(value)}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        } else if (dado == "cel"){
            const dados = await prisma.titular.update({
                where: {
                   nome
                },
                data:{idade: parseInt(value)}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        } else if (dado == "renda"){
            const dados = await prisma.titular.update({
                where: {
                   nome
                },
                data:{renda: parseInt(value)}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        } else if (dado == "email"){
            const dados = await prisma.titular.update({
                where: {
                   nome
                },
                data:{email:value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        } else if (dado == "cnpjCtps"){
            const dados = await prisma.titular.update({
                where: {
                   nome
                },
                data:{cnpjCtps: parseInt(value)}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        }else if (dado == "estadoCivil"){
            const dados = await prisma.titular.update({
                where: {
                   nome
                },
                data:{estadoCivil: value}
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        } else if (dado == "endereco"){
            const dados = await prisma.titular.update({
                where: {
                    nome
                },
                data: { endereco: value }
            })

            BigInt.prototype.toJSON = function () {
                return this.toString()
            }
            return res.render("showEdit.html", { dados })
        }
    },
    async delete(req, res){
        const userName = req.userInfo.name
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
        const {nome} = req.body
        const titular = await prisma.titular.delete({
            where:{
                nome
            }
        })

        BigInt.prototype.toJSON = function () {
            return this.toString()
        }

        if(!titular){
            const resultado = titular.nome + " não foi deletado!"
            return res.render("delete.html", {resultado})
        } else {
            const resultado = titular.nome + " foi deletado!"
            return res.render("delete.html", { resultado })
        }
    }
}