import dotenv from 'dotenv'
import User from '../models/User.js'//importando o diretorio de models/User.js
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

dotenv.config()

const jwtScret = process.env.JWT_SECRET

//Função  geradora de tokens 
const generateToken = (id)=>{
    return jwt.sign({id}, jwtScret, {expiresIn: '7d'})
}

//Função que verifica se o usuário passou pela validação e faz cadastro no banco!
const register = async (req, res)=>{
    const {name, email, password} = req.body

    //Checando se o usuário existe
    const user = await User.findOne({email})
    if(user){
        res.status(422).json({errors: ['Email já cadstrado!']})
        return
    }

    //gerando mascara de password para segurança evitando hacker
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //criando usuário
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    if(!newUser){//se usuário não for criado no banco retorne error
        res.status(422).json({errors: ['Houve um erro, tente mais tarde!']})
        return
    }
    
    //se usuário foi criado com sucesso, retorne token
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })

    
}

//Função de validação de login resgata dados do banco para logar no sistema
const login = async (req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    //checando se usuário existe
    if(!user){
        res.status(404).json({errors: ['Usuário não encontrado!']})
        return
    }

    //checando se password digitado pelo usuário é igual o password cadastrado no banco
    if(!( bcrypt.compare(password, user.password))){
        res.status(422).json({errors:['Senha inválida!']})
        return
    }

    //se usuário foi logado com sucesso, retorne token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })

}

//Função que traz os dados do banco e autentica a entrada do ussuário 
const getCurrentUser = async (req, res)=>{
    const user = req.user
    //resposta de ok e trazendo os dados do usuário sem a senha
    res.status(200).json(user)
}


//Função que atualiza imagens no banco
const update = async (req, res)=>{
    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
        const reqUser = req.user
        const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select('-password')

        if(name){
            user.name = name
        }

        if(password){
            //gerando mascara de password para segurança evitando hacker
            const salt = await bcrypt.genSalt()
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        if(profileImage){
            user.profileImage = profileImage
        }

        if(bio){
            user.bio = bio
        }

        await user.save()

        res.status(200).json(user)
    }

}

//Função que encontra usuário pelo id
const getUserId = async (req, res) =>{
    const {id} = req.params

    try {
        const user = await User.findById(mongoose.Types.ObjectId(id)).select('-password')
         //checando se usuario existe
    if(!user){
        res.status(404).json({errors: ['Usuário não encontrado!']})
        return
    }

    res.status(200).json(user)
    } catch (error) {
        res.status(404).json({errors: ['Usuário não encontrado!!']})
        return
    }

   
}

export {
    register, login,
    getCurrentUser,
    update, getUserId
}//Funções foram importadas no arquivo UserRouter.js 
