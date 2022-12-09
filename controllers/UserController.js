const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController {
    
    static register(req, res){
        res.render('user/register')
    }

    static async authRegister(req, res){
        const {name, password} = req.body

        const salt = bcrypt.genSaltSync(10)
        const cryptPassword = bcrypt.hashSync(password, salt)

        const user = {
            name: name,
            password: cryptPassword,
        }

        const checkUserExist = await User.findOne({ where: { name: user.name }})

        if(checkUserExist){
            req.flash('message', 'USUÁRIO JÁ EXISTENTE')
            res.render('user/register')

            return
        }else{
        User.create(user)
        .then((user) => {
            req.flash('message', 'USUÁRIO CADASTRADO! LOGUE ABAIXO')
            res.render('user/login')
        })
        .catch((err) =>{
            console.log(err);
        })
        }

    }

    static login(req, res){
        res.render('user/login')
    }

    static async loginPost(req, res){
        const {name, password} = req.body


        //Verificar o Usuário
        const user = await User.findOne({ where: { name: name }})

        const confirmPassword = bcrypt.compareSync(password, user.password)

        if(!confirmPassword){
            req.flash('message', 'SENHÁ INVÁLIDA')
            res.render('user/login')

            return
        }
        

        if(user){
                // auth user
                req.session.userid = user.id

                req.session.save(() => {
                req.flash('message', 'LOGADO')
                res.redirect('/initial')

                return
                })
            }
        else{
            req.flash('message', 'Usuário ou Senha Incorreta')
            res.render('user/login')

            return
        }
        }

    static async inicio(req, res){
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
        res.render('tasks/allTasks',  {name} )
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }

    static first(req, res){
        res.render('user/register')
    }

}