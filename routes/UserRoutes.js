import express from 'express'//impotação do express

//importação dos controllers
import  { register,
    login, 
    getCurrentUser,
    update, getUserId 
} from '../controllers/UserController.js'

//importação dos middlewares
import validate from '../middlewares/handleValidation.js'
import authGuard from '../middlewares/authGuard.js'
import imageUpload from '../middlewares/imageUpload.js'
import { 
    userCreateValidadtion,
    loginValidation,
    userUploadValidation 
} from '../middlewares/userValidations.js'



//Sistema de rotas do site
const UserRoutes = express.Router()
/*As funções de criação e validação de usuário 
 se utiliza depois do primeiro argumento de rota da função de post, get, put */
UserRoutes.post('/register', userCreateValidadtion(), validate, register)
UserRoutes.post('/login', loginValidation(), validate, login)   
UserRoutes.get('/profile', authGuard, getCurrentUser)   
UserRoutes.put('/',
 authGuard, 
 userUploadValidation(),
 validate, 
 imageUpload.single('profileImage'), 
 update
 )
 
 UserRoutes.get('/:id', getUserId)

export default UserRoutes//esse arquivo está sendo importado no Router.js 