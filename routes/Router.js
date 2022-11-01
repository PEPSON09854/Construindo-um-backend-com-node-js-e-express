import express from 'express'
import UserRoutes  from './UserRoutes.js'
import PhotosRouter from './PhotosRoutes.js'


const router = express()//inicializando express

router.use('/api/users', UserRoutes)/*middleware relacionando 
as rotas post, get, put que estão no arquivo UserRoutes.js*/
router.use('/api/photos', PhotosRouter)

router.get('/', (req, res)=>{//rota principal da aplicação
    res.send('API FUNCIONANDO!')
})



export default router//Esse arquivo de rotas está sendo importado no app.js o arquivo principal