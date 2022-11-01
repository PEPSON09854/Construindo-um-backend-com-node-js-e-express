import dotenv from 'dotenv'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

dotenv.config()

const jwtScret = process.env.JWT_SECRET

//Função que válida o token que vem da requisição
const authGuard = async (req, res, next)=>{

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(401).json({errors: ['Acesso negado!']})
    }

    try {

        const verified = jwt.verify(token, jwtScret)
        req.user = await User.findById(verified.id).select('-password')
        next()

    } catch (error) {
        res.status(401).json({errors:['Token inválido!']})
        
    }

}

export default authGuard //Função foi importada no arquivo UserRoutes.js