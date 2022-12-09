const Tasks = require('../models/Tasks')
const User = require('../models/User')

module.exports = class TaskController{

    static async createTask(req, res){
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId
            },
            plain: true,
        })


        const userRender = user.dataValues
        const renderName = userRender.name
        const name = renderName.toUpperCase()
        console.log(name);

        res.render('tasks/createTask', { name })
    }

    static async createTaskPost(req, res){
        const task = {
            task: req.body.nameTask,
            level: req.body.level,
            UserId: req.session.userid
        }

        Tasks.create(task).then(() => {
            req.session.save(() => {
                res.redirect('/createTask')
            })
        })
    }

    static async myTask(req, res){
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId
            },
            plain: true,
        })


        const userRender = user.dataValues
        const renderName = userRender.name
        const name = renderName.toUpperCase()
        console.log(name);
        
        const idUser = req.session.userid

        const myUser = await User.findOne({
            where: {
                id: idUser
            },
            include: Tasks,
            plain: true,
        })

        const tasks = myUser.Tasks.map((result) => result.dataValues)
        console.log(tasks)

        res.render('tasks/myTask', { tasks, name })
    }

    static excludeTask(req, res){
        const id = req.body.id

        Tasks.destroy({ where: { id: id }}).then(() => {
            req.session.save(() => {
                res.redirect('/myTask') 
            })
        })
    }
}
