const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient

module.exports = {
    async create(req, res){
        const {name, address, route} = req.body
        const project = await prisma.project.create({
            data:{
                name, address, route
            }
        })

        return res.send(project)
    },
    async selectProject(req, res){
        const projects = await prisma.projects.findMany({select:{name:true}})
        return projects
    },
    async read(req, res){},
    async delete(req, res){},
    async read(req, res){}
}